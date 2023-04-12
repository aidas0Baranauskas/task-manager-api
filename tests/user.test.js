import request from "supertest";
import app from "../src/app.js";
import User from "../src/models/user.js";

import {userOneId, userOne, setupDatabase} from './fixtures/db.js'

beforeEach(setupDatabase);

test("Should signup a new user", async () => {
	const response = await request(app)
		.post("/users")
		.send({
			name: "Aidas",
			email: "b9@gmail.com",
			password: "attemptingstuff",
		})
		.expect(201);

	// Assert that the database was changed correctly
	const user = await User.findById(response.body.user._id);
	expect(user).not.toBeNull();

	// assertions about the response
	expect(response.body).toMatchObject({
		user: {
			name: "Aidas",
			email: "b9@gmail.com",
		},
		token: user.tokens[0].token,
	});
	expect(user.password).not.toBe("attemptingstuff");
});
test("Should login", async () => {
	const response = await request(app)
		.post("/users/login")
		.send({
			email: userOne.email,
			password: userOne.password,
		})
		.expect(200);

	const user = await User.findById(userOneId);
	expect(response.body.token).toBe(user.tokens[1].token);
});
test("Should fail to login due to bad password", async () => {
	await request(app)
		.post("/users/login")
		.send({
			email: userOne.email,
			password: "brotwurst",
		})
		.expect(400);
});

test("Should get profile for auth-ted user", async () => {
	await request(app)
		.get("/users/me")
		.set("Authorization", "Bearer " + userOne.tokens[0].token)
		.send()
		.expect(200);
});
test("Should fail to get profile for un-auth-ted user", async () => {
	await request(app).get("/users/me").send().expect(401);
});

test("Should delete auth-ted user", async () => {
	await request(app)
		.delete("/users/me")
		.set("Authorization", "Bearer " + userOne.tokens[0].token)
		.send()
		.expect(200);

	const user = await User.findById(userOneId);
	expect(user).toBeNull();
});
test("Should fail to delete unauth-ted user", async () => {
	await request(app).delete("/users/me").send().expect(401);
});

test("Should upload avatar image auth-ted user", async () => {
	await request(app)
		.post("/users/me/avatar")
		.set("Authorization", "Bearer " + userOne.tokens[0].token)
		.attach("avatar", "tests/fixtures/aang.jpg")
		.expect(200);
	const user = await User.findById(userOneId);
	expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
	await request(app)
		.patch("/users/me")
		.set("Authorization", "Bearer " + userOne.tokens[0].token)
		.send({
			name: "Bob",
		})
		.expect(200);
	const user = await User.findById(userOneId);
	expect(user.name).toEqual("Bob");
});

test("Should fail to update invalid user fields", async () => {
	await request(app)
		.patch("/users/me")
		.set("Authorization", "Bearer " + userOne.tokens[0].token)
		.send({
			location: "bratwurst",
		})
		.expect(400);
});
