//dependencies
import express from "express";
import * as mongoose from "mongoose";
import mongodb from "mongodb";
import * as dotenv from "dotenv";

//local imports
import Human from "./schemas/User.js";
import Task from "./schemas/Task.js";
import User from "./schemas/User.js";
dotenv.config();

//active code
const db_name = "/latest"
const uri = process.env.LOCAL_SHORT_URI + db_name;
const app = express();
app.use(express.json());

mongoose
	.connect(uri) //"mongodb://localhost/latest")
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

const filter = { description: "masdasdasdasdake a new collection" };
	
await Task.deleteOne(filter)
	.then((result) => {
		console.log(result);
	}).catch((error) => {
		console.log(error)
	})


// console.log(await User.findById("6421b4ea5e00d7a5e2b86421"));

