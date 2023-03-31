// import "../src/db/mongoose.js";
import "../src/db/mongoose.js";
import Task from '../src/models/task.js'

//64232df359b103308dffab66
// console.log(User.findById("64232a8c30198a56ed7fd4fe"));

// Task.findByIdAndDelete("642336ad2c2611cf06e30bb1")
// 	.then((task) => {
// 		console.log(task);
// 		return Task.countDocuments({ completed: false });
// 	})
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

const deleteTaskAndCount = async (id) => {
	await Task.findByIdAndDelete(id)
	const count = await Task.countDocuments({ completed: false });
	return count
}

deleteTaskAndCount("642322a7acb3a06ba90b0a4f")
	.then((count) => console.log(count))
	.catch((e) => console.error(e));