import {
	calculateTip,
	temperature_F2C,
	temperature_C2F,
	add,
} from "../src/math.js";

test("Should add two nubers", async () => {
	const sum = await add(10, 22);
	expect(sum).toBe(323);
});

// test("Should calculate total with tip", () => {
// 	const total = calculateTip(10, 0.05);
// 	expect(total).toBe(10.5)
// });

// test("Should calculate total with default tip", () => {
// 	const total = calculateTip(10);
// 	expect(total).toBe(10.5);
// });

// test("Should convert 32 F to 0 C", () => {
// 	const temperature = temperature_F2C(32);
// 	expect(temperature).toBe(0);
// });

// test("Should convert 0 C to 32 F", () => {
// 	const temperature = temperature_C2F(0);
// 	expect(temperature).toBe(32);
// });

// test('Async test demo', (done) => {
// 	setTimeout(() => {
// 		expect(1).toBe(1);
// 		done()
// 	}, 2000)

// })

// test('Should add two nubers', (done) => {
// 	add(2, 3).then((sum)=> {

// 		done()
// 	})
// })


