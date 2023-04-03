//external imports
import express from "express";

//internal immports
import User from "../models/user.js";
import auth from "../middleware/auth.js";

const router = new express.Router();

// CREATE OR SIGNUP
router.post("/users", async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (e) {
		res.status(400).send(e);
	}
});

// LOGIN
router.post("/users/login", async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);
		const token = await user.generateAuthToken();
		res.send({ user: user, token });
	} catch (e) {
		res.status(400).send();
	}
});

// LOGOUT
router.post("/users/logout", auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token != req.token;
		});
		await req.user.save();

		res.send();
	} catch (e) {
		res.status(500).send();
	}
});

// LOGOUT ALL
router.post("/users/logoutALL", auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (e) {
		res.status(500).send();
	}
});

// READ SELF
router.get("/users/me", auth, async (req, res) => {
	res.send(req.user);
});

// UPDATE USER
const allowedUpdates = ["name", "email", "password", "age"];

router.patch("/users/me", auth, async (req, res) => {
	const updates = Object.keys(req.body);

	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: "invalid updates!" });
	}

	try {
		updates.forEach((update) => (req.user[update] = req.body[update]));
		await req.user.save();

		res.send(req.user);
	} catch (e) {
		res.status(400).send(e);
	}
});

// DELETE USER BY ID
router.delete("/users/me", auth, async (req, res) => {
	try {
		// await req.user.remove()
		await req.user.deleteOne({ _id: req.user._id });
		res.send(req.user);
	} catch (e) {
		res.status(500).send();
	}
});

export default router;
