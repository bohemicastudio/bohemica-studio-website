// Navigo (window.router)
window.router = new Navigo('/')

// set language in the local storage
console.log(typeof localStorage.language === 'undefined', localStorage.language === null, !Spruce.stores.global.languages.some(language => language.code === localStorage.language))

Spruce.stores.global.language = typeof localStorage.language === 'undefined' || localStorage.language === null || !Spruce.stores.global.languages.some(language => language.code === localStorage.language) ? 'en' : localStorage.language

console.log('language', Spruce.stores.global.language, Spruce)
localStorage.setItem('language', Spruce.stores.global.language)

window.router.hooks({
	before: function (done, match) {
		console.log('before', match)
		// check if language param is in the list + redirect to the right language
		if (match.data?.language) {
			if (Spruce.stores.global.languages.some(language => language.code === match.data.language)) {
				Spruce.stores.global.language = match.data.language
				localStorage.setItem('language', Spruce.stores.global.language)
			}
			else {
				window.router.navigate(Spruce.stores.global.language, { callHandler: false })
			}
			done()
		}
		else {
			window.router.navigate('en', { callHandler: false })
		}
	},
	after: function (match) {
		console.log('after', match)
	}
})

function projectHandler(name) {
	Spruce.stores.slideover.openSlideover(name)

	/*
	0. open slideover or keep open

	1. fade out #slideoverContent
	2. set the correct html content in Spruce slideover store
	3. fade in #slideoverContent
	*/
}

window.router.on({
	':language': function ({ data }) {
		console.log('Root - has param;', 'params:', data)
	},
	':language/projects/:name': {
		as: 'project-en',
		uses: ({ data }) => {
			console.log('Project; en', 'params:', data)

			projectHandler(data.name)

		}
	},
	':language/projekty/:name': {
		as: 'project-cs',
		uses: ({ data, params }) => {
			console.log('Projekt; cs', 'params:', params, data)

		}
	},
	'*': function ({ data }) {
		console.log('Root - no language;', 'data:', data, !data)

		if (!data && localStorage.language) {
			console.log('redirecting with language from local storage')
			window.router.navigate(localStorage.language, { callHandler: false })

		}
		else {
			console.log('redirecting without language from local storage')
			window.router.navigate('en', { callHandler: false })
		}
	},
}).resolve()

/*if (Spruce.stores.global.language === 'en') {

}
else {
	window.router.on({
		':language': function ({ data }) {

			console.log('Root - has param;', 'params:', data)

			// check if language param is in the list + redirect to the right language
			if (Spruce.stores.global.languages.some(language => language.code === data.language)) {
				Spruce.stores.global.language = data.language
				localStorage.setItem('language', Spruce.stores.global.language)
			}
			else {
				window.router.navigate(Spruce.stores.global.language, { callHandler: false })
			}

		},
		/!*':language/!*': function (params) {
			console.log('Root;', 'params:', params)
		},*!/
		':language/project/:name': {
			as: 'project',
			uses: ({ data, params }) => {
				console.log('Project detail;', 'params:', params, data)
				Spruce.stores.slideover.openSlideover(params.name)
				window.router.navigate(Spruce.stores.global.language, { callHandler: false })
			}
		},
		':language/projects': function () {
			console.log('Projects;')
		},
		'*': function ({ data }) {
			console.log('Root - no language;', 'data:', data, !data)

			if (!data) {
				console.log('redirecting..')

				window.router.navigate('en', { callHandler: false })

				/!*window.router.setPath('en')*!/
			}
		},
	}).resolve()
}*/
