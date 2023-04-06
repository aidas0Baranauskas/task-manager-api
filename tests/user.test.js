import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app";

test("Should signup a new user", async () => {
	await request(app).post("/users").send({
			name: "Aidas",
			email: "b6@gmail.com",
			password: "attemptingstuff"
		})
		.expect(201);
});
afterAll(async () => {
	await mongoose.connection.close();
});