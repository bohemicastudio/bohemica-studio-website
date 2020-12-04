module.exports = {
	purge: [
		'./source/**/*.njk',
		'./includes/**/*.njk',
	],
	plugins: [],
	variants: {},
	theme: {
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
