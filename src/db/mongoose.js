//external imports
import mongoose from "mongoose";

//setupdthis is a change gosh darn it
// const uri = process.env.LOCAL_SHORT_URI + "task-manager-api"
const uri = process.env.MONGODB_URL;

mongoose.connect(uri);
