const calculateTip = (total, tipPercent = 0.05) => total * (1 + tipPercent);

const temperature_F2C = (temp) => (temp - 32) / 1.8;
const temperature_C2F = (temp) => (temp * 1.8) + 32;

const add = (a, b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (a < 0 || b < 0) {
				return reject("Numbers must be non-negative");
			}

			resolve(a + b);
		}, 2000);
	});
};

export {
	calculateTip,
	temperature_F2C,
	temperature_C2F,
	add
};
