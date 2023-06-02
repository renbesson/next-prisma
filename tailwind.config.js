/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./node_modules/flowbite/**/*.js',
		'./node_modules/flowbite-react/**/*.js',
		'./public/**/*.html',
	],
	theme: {
		colors: {
			primary: {
				light: '#F069F2',
				DEFAULT: '#E81EEB',
				dark: '#A60FA9',
			},
			secondary: {
				light: '#0EFB71',
				DEFAULT: '#03B54D',
				dark: '#02642B',
			},
			contrast: '#F4F4ED',
		},
		extend: {
			fontFamily: {
				default: ['var(--font-inter)'],
			},
		},
	},
	plugins: [require('flowbite/plugin')],
};
