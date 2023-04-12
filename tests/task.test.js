import request from "supertest";
import app from "../src/app.js";
import User from "../src/models/task.js";
import {
	userOneId,
	userOne,
	userTwoId,
	userTwo,
	setupDatabase,
	taskOne,
	taskTwo,
	taskThree,
} from "./fixtures/db.js";
import Task from "../src/models/task.js";

beforeEach(setupDatabase);

test("Should create a task for user", async () => {
	const response = await request(app)
		.post("/tasks")
		.set("Authorization", "Bearer " + userOne.tokens[0].token)
		.send({
			description: "From my test",
		})
		.expect(201);
	const task = await Task.findById(response.body._id);
	expect(task).not.toBeNull();
	expect(task.completed).toEqual(false);
});

test("Should get all tasks for user one", async () => {
	const response = await request(app)
		.get("/tasks")
		.set("Authorization", "Bearer " + userOne.tokens[0].token)
		.send()
		.expect(200);
	expect(response.body.length).toEqual(2);
});

test("User 2 Should fail to delete task 2 of user 1", async () => {
	const response = await request(app)
		.delete("/tasks/" + taskOne._id)
		.set("Authorization", "Bearer " + userTwo.tokens[0].token)
		.send()
		.expect(404);
	expect(response.body).not.toBeNull();
});

test("Should fail to delete task if unautherized", async () => {
	await request(app)
		.delete("/tasks/" + taskOne._id)
		.send()
		.expect(401);
	expect(taskOne.body).not.toBeNull();
});
