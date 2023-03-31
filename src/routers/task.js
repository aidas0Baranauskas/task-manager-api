// external imports
import express from "express";

// local imports
import Task from "../models/task.js";
import auth from "../middleware/auth.js";

const router = new express.Router();

//CREATE
router.post("/tasks", auth, async (req, res) => {
	const task = new Task({
		...req.body,
		owner: req.user._id,
	});

	try {
		await task.save();
		res.status(201).send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});

//READ ALL
router.get("/tasks", auth, async (req, res) => {
	try {
		res.send(await Task.find({ owner: req.user._id }));
	} catch (e) {
		res.status(500).send();
	}
});

//READ BY ID
router.get("/tasks/:id", auth, async (req, res) => {
	const _id = req.params.id;

	try {
		const task = await Task.findOne({ _id, owner: req.user._id });

		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (e) {
		res.status(500).send();
	}
});

//UPDATE TASK
const allowedUpdates = ["description", "completed"];

router.patch("/tasks/:id", auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: "Error: invalid updates" });
	}

	try {
		const task = await Task.findOne({
			_id: req.params.id,
			owner: req.user._id,
		});
		if (!task) return res.status(404).send();

		updates.forEach((update) => (task[update] = req.body[update]));
		await task.save();
		res.send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});

//DELETE BY ID
router.delete("/tasks/:id", auth, async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({
			_id: req.params.id,
			owner: req.user._id,
		});

		if (!task) {
			return res.status(404).send();
		}

		res.send(task);
	} catch (e) {
		res.status(500).send();
	}
});

export default router;
