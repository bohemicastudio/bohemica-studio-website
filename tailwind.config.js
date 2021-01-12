const colors = require('tailwindcss/colors')

module.exports = {
	purge: [
		'./source/**/*.njk',
		'./includes/**/*.njk',
	],
	plugins: [
		require('@tailwindcss/aspect-ratio'),
	],
	variants: {
		extend: {
			backgroundColor: ['group-focus'],
			translate: ['group-hover'],
		}
	},
	theme: {
		screens: {
			xs: '400px',
			sm: '640px',
			md: '960px',
			lg: '1280px',
			xl: '1600px',
		},
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
			'teal2': {
				50: '#edfafa',
				100: '#d5f5f6',
				200: '#afecef',
				300: '#7edce2',
				400: '#16bdca',
				500: '#0694a2',
				600: '#047481',
				700: '#036672',
				800: '#05505c',
				900: '#014451',
			}
		},
		extend: {
			fontFamily: {
				'dm-sans': 'DM Sans',
				'dm-mono': 'DM Mono',
				'optician-sans': 'Optician Sans',
			},
			fontSize: {
				'2.5xl': ['1.75rem', {
					lineHeight: '2.25rem',
				}]
			},
			borderRadius: {
				'2.5xl': '1.25rem',
				'4xl': '3rem',
				'5xl': '6rem'
			},
			boxShadow: {
				'tooltip': '0px 0px 0px 1px ' + colors.blueGray["500"]
			},
			transitionDuration: {
				'320': '320ms',
				'640': '640ms',
			},
			height: {
				'1/12': '8.333333%',
				'2/12': '16.666667%',
				'3/12': '25%',
				'4/12': '33.333333%',
				'5/12': '41.666667%',
				'6/12': '50%',
				'7/12': '58.333333%',
				'8/12': '66.666667%',
				'9/12': '75%',
				'10/12': '83.333333%',
				'11/12': '91.666667%',
			},
			cursor: {
				'ne-resize': 'ne-resize',
				's-resize': 's-resize'
			}
		}
	}
}
