const colors = require('tailwindcss/colors')

const screenSizes = { xs: 400, sm: 640, md: 960, lg: 1280, xl: 1600 }

const screens = {
	// Basic min-width breakpoints (mobile-first)
	'xs': screenSizes.xs + 'px',
	'sm': screenSizes.sm + 'px',
	'md': screenSizes.md + 'px',
	'lg': screenSizes.lg + 'px',
	'xl': screenSizes.xl + 'px',

	// Desktop-first breakpoints
	'to-xs': { max: screenSizes.xs + 'px' },
	'to-sm': { max: screenSizes.sm + 'px' },
	'to-md': { max: screenSizes.md + 'px' },
	'to-lg': { max: screenSizes.lg + 'px' },
	'to-xl': { max: screenSizes.xl + 'px' },

	// Breakpoints that apply at one breakpoint only
	'only-sm': { min: screenSizes.sm + 'px', max: screenSizes.md + 1 + 'px' },
	'only-md': { min: screenSizes.md + 'px', max: screenSizes.lg + 1 + 'px' },
	'only-lg': { min: screenSizes.lg + 'px', max: screenSizes.xl + 1 + 'px' },
}

module.exports = {
	purge: [
		'./build/*.html',
		'./build/**/*.html'
		/*'./source/!**!/!*.njk',
		'./includes/!**!/!*.njk',*/
	],
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/typography')
	],
	variants: {
		extend: {
			backgroundColor: ['group-focus'],
			translate: ['group-hover'],
			maxWidth: ['responsive'],
			borderWidth: ['first'],
		}
	},
	theme: {
		screens: screens,
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
			'gray-legacy': {
				'50': '#f9fafb',
				'100': '#f4f5f7',
				'200': '#e5e7eb',
				'300': '#d2d6dc',
				'400': '#9fa6b2',
				'500': '#6b7280',
				'600': '#4b5563',
				'700': '#374151',
				'800': '#252f3f',
				'900': '#161e2e',
			},
			'cool-gray-legacy': {
				'50': '#fbfdfe',
				'100': '#f1f5f9',
				'200': '#e2e8f0',
				'300': '#cfd8e3',
				'400': '#97a6ba',
				'500': '#64748b',
				'600': '#475569',
				'700': '#364152',
				'800': '#27303f',
				'900': '#1a202e',
			},
			'red-legacy': {
				'50': '#fdf2f2',
				'100': '#fde8e8',
				'200': '#fbd5d5',
				'300': '#f8b4b4',
				'400': '#f98080',
				'500': '#f05252',
				'600': '#e02424',
				'700': '#c81e1e',
				'800': '#9b1c1c',
				'900': '#771d1d',
			},
			'orange-legacy': {
				'50': '#fff8f1',
				'100': '#feecdc',
				'200': '#fcd9bd',
				'300': '#fdba8c',
				'400': '#ff8a4c',
				'500': '#ff5a1f',
				'600': '#d03801',
				'700': '#b43403',
				'800': '#8a2c0d',
				'900': '#771d1d',
			},
			'yellow-legacy': {
				'50': '#fdfdea',
				'100': '#fdf6b2',
				'200': '#fce96a',
				'300': '#faca15',
				'400': '#e3a008',
				'500': '#c27803',
				'600': '#9f580a',
				'700': '#8e4b10',
				'800': '#723b13',
				'900': '#633112',
			},
			'green-legacy': {
				'50': '#f3faf7',
				'100': '#def7ec',
				'200': '#bcf0da',
				'300': '#84e1bc',
				'400': '#31c48d',
				'500': '#0e9f6e',
				'600': '#057a55',
				'700': '#046c4e',
				'800': '#03543f',
				'900': '#014737',
			},
			'teal-legacy': {
				'50': '#edfafa',
				'100': '#d5f5f6',
				'200': '#afecef',
				'300': '#7edce2',
				'400': '#16bdca',
				'500': '#0694a2',
				'600': '#047481',
				'700': '#036672',
				'800': '#05505c',
				'900': '#014451',
			},
			'blue-legacy': {
				'50': '#ebf5ff',
				'100': '#e1effe',
				'200': '#c3ddfd',
				'300': '#a4cafe',
				'400': '#76a9fa',
				'500': '#3f83f8',
				'600': '#1c64f2',
				'700': '#1a56db',
				'800': '#1e429f',
				'900': '#233876',
			},
			'indigo-legacy': {
				'50': '#f0f5ff',
				'100': '#e5edff',
				'200': '#cddbfe',
				'300': '#b4c6fc',
				'400': '#8da2fb',
				'500': '#6875f5',
				'600': '#5850ec',
				'700': '#5145cd',
				'800': '#42389d',
				'900': '#362f78',
			},
			'purple-legacy': {
				'50': '#f6f5ff',
				'100': '#edebfe',
				'200': '#dcd7fe',
				'300': '#cabffd',
				'400': '#ac94fa',
				'500': '#9061f9',
				'600': '#7e3af2',
				'700': '#6c2bd9',
				'800': '#5521b5',
				'900': '#4a1d96',
			},
			'pink-legacy': {
				'50': '#fdf2f8',
				'100': '#fce8f3',
				'200': '#fad1e8',
				'300': '#f8b4d9',
				'400': '#f17eb8',
				'500': '#e74694',
				'600': '#d61f69',
				'700': '#bf125d',
				'800': '#99154b',
				'900': '#751a3d',
			}
		},
		extend: {
			fontFamily: {
				'dm-sans': 'DM Sans',
				'dm-mono': 'DM Mono',
				'optician-sans': 'Optician Sans',
			},
			fontSize: {
				'2.25xl': ['1.625rem', {
					lineHeight: '2.125rem',
				}],
				'2.5xl': ['1.75rem', {
					lineHeight: '2.25rem',
				}],
				'10xl': '10rem',
				'11xl': '15rem',
			},
			borderRadius: {
				'2.5xl': '1.25rem',
				'4xl': '3rem',
				'5xl': '4rem',
				'6xl': '5rem',
				'7xl': '6rem'
			},
			boxShadow: {
				'tooltip': '0px 0px 0px 1px ' + colors.blueGray["500"]
			},
			transitionDuration: {},
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
				'screen-50': '50vh',
				'screen-75': '75vh',
				'screen-125': '125vh'
			},
			letterSpacing: {
				'wide': '0.05em',
				'wider': '.15em',
				'widest': '.25em'
			},
			/*minHeight: {
				xs: '600px',
				sm: '1080px',
				md: '1600px',
			},*/
			maxHeight: {
				'xs': '400px',
				'sm': '640px',
				'md': '960px',
				'lg': '1280px',
				'xl': '1600px',
			},
			cursor: {
				'ne-resize': 'ne-resize',
				's-resize': 's-resize',
				'zoom-in': 'zoom-in',
				'zoom-out': 'zoom-out',
				'nesw-resize': 'nesw-resize'
			},
			aspectRatio: {
				'21': '21'
			}
		}
	},
	corePlugins: {
		container: false,
	}
}
