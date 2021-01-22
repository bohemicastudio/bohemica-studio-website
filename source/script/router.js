// initialise Navigo inside window.router
window.router = new Navigo('/')

// set language in Spruce for global use
Spruce.stores.global.language = typeof localStorage.language === 'undefined' || localStorage.language === null || !Spruce.stores.global.languages.some(language => language.code === localStorage.language) ? 'en' : localStorage.language

// set language in the local storage
localStorage.setItem('language', Spruce.stores.global.language)

// check language setting before each load
window.router.hooks({
	before: function (done, match) {
		console.log('before', match, router)
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
		console.log('after', match, router)

		console.log(match.route.name.substr(0, match.route.name.lastIndexOf('-')))

		if (router.paths.some(path => path.route === match.route.name.substr(0, match.route.name.lastIndexOf('-')))) {
			console.log('matched')
			/*router.current[0].file = */
		}
	}
})

/*

Idea for multilang router

paths:
	{ name_path_lang1
	name_path_lang2
	route_name
	file_name }

getPath(file_name) {

	route_name according to currentLang (= lang1)
	name_path_ to currentLang (= lang1)

	window.router.generate(route_name + '-' + Spruce.stores.global.language, { language: Spruce.stores.global.language, name: name_path_lang1} )

	?? add file_name into the router for later retriaval - window.Navigo / router.matched ??

	return route_name/name_path_lang1
}

getFile() {
	may not be necessary
}

???

end - router.navigate(getPath(file_name)) -> router.navigate('generated/url')

*/

console.log(window, router)

window.router.paths = [
	{
		file: 'overview',
		path: {
			en: 'overview',
			cs: 'prehled'
		},
		route: 'project'
	}
]

window.router.getPath = function (file) {
	let route = router.paths.find(path => path.file === file).route + '-' + Spruce.stores.global.language
	let path = router.paths.find(path => path.file === file).path[Spruce.stores.global.language]

	return router.generate(route, { language: Spruce.stores.global.language, name: path })
}

// routes
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

			projectHandler(data.name)

		}
	},
	'*': function ({ data }) {
		console.log('Root - no language;', 'data:', data, !data)

		if (!data && Spruce.stores.global.language) {
			console.log('redirecting with language from local storage')
			window.router.navigate(Spruce.stores.global.language, { callHandler: false })

		}
		else {
			console.log('redirecting without language from local storage')
			window.router.navigate('en', { callHandler: false })
		}
	},
}).resolve()

// helper methods
function projectHandler(name) {
	console.log('projectHandler', name, Spruce.stores.slideover.slideoverAnimationFinished)

	if (Spruce.stores.slideover.slideoverAnimationFinished) {
		fadeOutContent().then(() => {
			Spruce.stores.project.loadContent(name).then(() => {
				fadeInContent()

				if(name === 'overview' || name ===  'seznam') {
					// find element by id and begin animation with anime.js + animate font-size
				}

			})
		})
	}
	else {
		Spruce.stores.slideover.openSlideover().then(() => {
			Spruce.stores.project.loadContent(name).then(() => {
				fadeInContent()
			})
		})
	}
}

const fadeInContent = function () {
	anime.timeline({ targets: '#slideoverContent', }).add({
		translateY: ['-2rem', '0rem'],
		duration: 400,
		easing: 'easeOutQuart',
	}).add({
		duration: 300,
		opacity: [0, 1],
		easing: 'linear',
	}, '-=300')
}

const fadeOutContent = function () {
	return new Promise((resolve) => {
		anime.timeline({ targets: '#slideoverContent', }).add({
			translateY: ['0rem', '2rem'],
			duration: 400,
			easing: 'easeInQuart',
		}).add({
			duration: 300,
			opacity: [1, 0],
			easing: 'linear',
		}, '-=300').finished.then(() => {
			resolve()
		})
	})
}
