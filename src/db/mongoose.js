//external imports
import mongoose from "mongoose";
import validator from "validator";
import * as dotenv from "dotenv";

//setupdthis is a change gosh darn it
dotenv.config();
// const uri = process.env.LOCAL_SHORT_URI + "task-manager-api"
const uri = "mongodb://127.0.0.1:27017/task-manager-api";

mongoose.connect(uri);
