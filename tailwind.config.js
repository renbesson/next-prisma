/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./node_modules/flowbite/**/*.js',
		"./node_modules/flowbite-react/**/*.js",
    "./public/**/*.html",
	],
	theme: {
		extend: {
			fontFamily: {
				default: ['var(--font-inter)'],
			},
		},
	},
	plugins: [require('flowbite/plugin')],
};
