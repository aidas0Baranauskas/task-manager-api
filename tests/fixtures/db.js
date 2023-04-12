import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../../src/models/user.js";
import Task from "../../src/models/task.js";

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
	_id: userOneId,
	name: "Mike",
	email: "mike@gmail.com",
	password: "7894561",
	age: 10,
	tokens: [
		{
			token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
		},
	],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
	_id: userTwoId,
	name: "Mac",
	email: "mac@gmail.com",
	password: "987894561",
	age: 10,
	tokens: [
		{
			token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
		},
	],
};

const taskOne = {
	_id: new mongoose.Types.ObjectId(),
	description: "First Task",
	completed: false,
	owner: userOne._id
}

const taskTwo = {
	_id: new mongoose.Types.ObjectId(),
	description: "Second Task",
	completed: true,
	owner: userOne._id,
};

const taskThree = {
	_id: new mongoose.Types.ObjectId(),
	description: "Third Task",
	completed: false,
	owner: userTwo._id,
};

const setupDatabase = async () => {
	await User.deleteMany();
	await Task.deleteMany();

	await new User(userOne).save();
	await new User(userTwo).save();

	await new Task(taskOne).save()
	await new Task(taskTwo).save()
	await new Task(taskThree).save();
};

export {
	userOneId,
	userOne,
	userTwo,
	setupDatabase,
	taskOne,
	taskTwo,
	taskThree,
};