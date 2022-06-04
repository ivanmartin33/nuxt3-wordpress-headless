const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
};
