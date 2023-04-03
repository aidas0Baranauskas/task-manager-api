//external imports
import express from "express";

//local imports
import "./db/mongoose.js";
import userRouter from "./routers/user.js";
import taskRouter from "./routers/task.js";

//other stuff
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
	console.log("Server is up on port " + port);
});

import Task from "./models/task.js";
import User from "./models/user.js";

// console.log(Task.deleteMany({}))
