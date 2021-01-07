const colors = require('tailwindcss/colors')

module.exports = {
	purge: [
		'./source/**/*.njk',
		'./includes/**/*.njk',
	],
	plugins: [],
	variants: {},
	theme: {
		colors: {
			'transparent': 'transparent',
			'current': 'currentColor',
			'black': colors.black,
			'white': colors.white,
			'blue-gray': colors.blueGray,
			'cool-gray': colors.coolGray,
			'gray': colors.gray,
			'true-gray': colors.trueGray,
			'warm-gray': colors.warmGray,
			'red': colors.red,
			'orange': colors.orange,
			'amber': colors.amber,
			'yellow': colors.yellow,
			'lime': colors.lime,
			'green': colors.green,
			'emerald': colors.emerald,
			'teal': colors.teal,
			'cyan': colors.cyan,
			'light-blue': colors.lightBlue,
			'blue': colors.blue,
			'indigo': colors.indigo,
			'violet': colors.violet,
			'purple': colors.purple,
			'fuchsia': colors.fuchsia,
			'pink': colors.pink,
			'rose': colors.rose,
		},
		extend: {
			fontFamily: {
				'dm-sans': 'DM Sans',
				'dm-mono': 'DM Mono',
				'optician-sans': 'Optician Sans',
			},
			borderRadius: {
				'4xl': "3rem",
				'5xl': "6rem"
			},
			transitionDuration: {
				'320': '320ms',
				'640': '640ms',
			}
		}
	}
}
