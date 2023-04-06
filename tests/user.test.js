import request from "supertest";
import app from "../src/app";

test("Should signup a new user", async () => {
	await request(app).post("/users").send({
			name: "Aidas",
			email: "aidas5@gmail.com",
			password: "passw0rd123",
		})
		.expect(201);
});
