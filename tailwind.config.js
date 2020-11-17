module.exports = {
	purge: [
		'./source/**/*.njk',
		'./includes/**/*.njk',
	],
	plugins: [],
	variants: {},
	theme: {
		extend: {
			borderRadius: {
				'4xl': "3rem",
				'5xl': "6rem"
			}
		}
	}
}
