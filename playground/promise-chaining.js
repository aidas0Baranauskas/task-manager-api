import "../src/db/mongoose.js";
import User from '../src/models/user.js'

//64232df359b103308dffab66
// console.log(User.findById("64232a8c30198a56ed7fd4fe"));

// User.findByIdAndUpdate("64232a8c30198a56ed7fd4fe", { age: 1 })
// 	.then((user) => {
// 		console.log(user);
// 		return User.countDocuments({ age: 1 });
// 	})
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

const updateAgeAndCount = async (id, age) => {
	const user = await User.findByIdAndUpdate(id, { age })
	const count = await User.countDocuments({ age })
	return count
}

updateAgeAndCount("642331d069cb20ef3cce2a9f", 10)
	.then((count) => {
		console.log(count);
	})
	.catch((e) => {
		console.error(e);
	});