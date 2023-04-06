import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app";

// test("Should signup a new user", async () => {
// 	await request(app).post("/users").send({
// 			name: "Aidas",
// 			email: "b8@gmail.com",
// 			password: "attemptingstuff"
// 		})
// 		.expect(201);
// });
test("Should login", async () => {
	await request(app)
		.post("/users/login")
		.send({
			email: "current@gmail.com",
			password: "strongslaptazodis",
		})
		.expect(200);
});

afterAll(async () => {
	await mongoose.connection.close();
});
