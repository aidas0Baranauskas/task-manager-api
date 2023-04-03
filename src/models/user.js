// external imports
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// local imports
import Task from "./task.js";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minLength: [6, "Must be at least 6 long"],
			validate(value) {
				if (value.toLowerCase().includes("password"))
					throw new Error("You know damn well what you did wrong");
			},
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("Email is invalid");
				}
			},
		},
		age: {
			type: Number,
			default: 0,
			min: [
				0,
				"You're either prematurely born and already sapient, or lied about being negative years old",
			],
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

userSchema.virtual("tasks", {
	ref: "Task",
	localField: "_id",
	foreignField: "owner",
});

userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, "thisismynewcourse");

	user.tokens = user.tokens.concat({ token });
	await user.save();

	return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) throw new Error("Unable to login");

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) throw new Error("Unable to login");

	return user;
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
	const user = this;

	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

// CASCADE DELETE OF TASKS FROM USER DELETION
// userSchema.pre("remove", async function (next) {

userSchema.pre("deleteOne", { document: true }, async function (next) {
	const user = this;
	await Task.deleteMany({ owner: user._id });
	next();
});

const User = mongoose.model("User", userSchema);

export default User;
