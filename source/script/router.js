// initialise Navigo
console.log('window.location', window.location, window.location.hostname === 'bohemicastudio.github.io')
window.router = new Navigo(window.location.hostname === 'bohemicastudio.github.io' ? '/bohemica-studio-website' : '/', {
	strategy: 'ONE',
	hash: false,
	noMatchWarning: false
})

// set language in Spruce for global use
Spruce.stores.global.language = typeof localStorage.language === 'undefined' || localStorage.language === null || !Spruce.stores.global.languages.some(language => language.code === localStorage.language) ? 'en' : localStorage.language

// set language in the local storage
localStorage.setItem('language', Spruce.stores.global.language)

// check language setting before each load
window.router.hooks({
	before: function (done, match) {
		console.log('before', match, router)

		done(false) // <-- this will make dirty=false and will allow the subsequent navigation

		// hide section clue
		window.Spruce.stores.global.openSectionClue = false

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
			console.log('NO PARAM')
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

window.router.paths = [
	{
		file: 'overview',
		path: {
			en: 'overview',
			cs: 'prehled'
		},
		route: 'project'
	},
	{
		file: 'media-server',
		path: {
			en: 't-mobile',
			cs: 't-mobile'
		},
		route: 'project'
	},
	{
		file: 'mmt',
		path: {
			en: 'mmt',
			cs: 'mmt'
		},
		route: 'project'
	},
	{
		file: 'lancaster-maloney',
		path: {
			en: 'lancaster-maloney',
			cs: 'lancaster-maloney'
		},
		route: 'project'
	},
	{
		file: 'subtitle-editor',
		path: {
			en: 'slideslive',
			cs: 'slideslive'
		},
		route: 'project'
	},
	{
		file: 'superflow',
		path: {
			en: 'superflow',
			cs: 'superflow'
		},
		route: 'project'
	},
	{
		file: 'landing-pages',
		path: {
			en: 'landing-pages',
			cs: 'webove-stranky'
		},
		route: 'project'
	},
	{
		file: 'branding',
		path: {
			en: 'branding',
			cs: 'firemni-identita'
		},
		route: 'project'
	},
	{
		file: 'project-proposal',
		path: {
			en: 'proposal-example',
			cs: 'nabidka-priklad'
		},
		route: 'project'
	}
]

window.router.getPath = function (file) {

	let route, path

	if (router.paths.find(path => path.file === file)) {
		route = router.paths.find(path => path.file === file).route + '-' + Spruce.stores.global.language
		path = router.paths.find(path => path.file === file).path[Spruce.stores.global.language]
		// console.log('file:', file, 'route:', route, 'path:', path)
	}
	else {
		console.error('getPath:', file, '(Path does not exist)')
	}

	console.log(route, path, router.generate(route, { language: Spruce.stores.global.language, name: path }))
	return router.generate(route, { language: Spruce.stores.global.language, name: path })
}

window.router.getFile = function (path) {
	return router.paths.find(paths => paths.path[Spruce.stores.global.language] === path).file
}

// routes
window.router.on({
	':language': function ({ data }) {
		console.log('Root - has param;', 'params:', data)

		if (Spruce.stores.slideover.open === true) {
			window.animation.slideoverClose.play()
			window.animation.slideoverClose.finished.then(() => {
				Spruce.stores.slideover.open = false

				window.animation.showWindowUnderlay.reverse()
				window.animation.showWindowUnderlay.play()
				window.animation.showWindowUnderlay.finished.then(() => {
					window.animation.slideoverFadeOutContent.play()
					window.animation.showWindowUnderlay.reverse()
					setTimeout(() => {
						Spruce.stores.global.showWindowUnderlay = false
					}, 50)
				})

				// unset project HTML content
				Spruce.stores.project.content = ''
			})
		}
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
		uses: ({ data }) => {
			console.log('Projekt; cs', 'params:', data)

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

console.log(window.router.match("/en/projects/overview"))

// handler function for slideover router changes
function projectHandler(name) {
	console.log('projectHandler', name)
	console.log('projectHandler/getFile', window.router.getFile(name))

	if (Spruce.stores.slideover.open === true) {
		// switching between pages in the slideover
		window.animation.slideoverFadeOutContent.play()
		window.animation.slideoverFadeOutContent.finished.then(() => {
			document.querySelector('#slideoverContentWrapper').scrollTo(0, 0)
			setTimeout(() => {
				Spruce.stores.project.loadContent(window.router.getFile(name)).then(() => {
					window.animation.slideoverFadeInContent.play()
					// Re-initialise Navigo links after new content is loaded
					window.router.updatePageLinks()
				})
			}, 50)
		})
	}
	else {
		// open slideover and load content
		// wait for the slideover element to load and animations initialised
		waitFor(() => window.animation.ready === true).then(() => {
			Spruce.stores.slideover.open = true
			setTimeout(() => {
				window.animation.slideoverOpen.play()
				window.animation.slideoverOpen.finished.then(() => {
					Spruce.stores.global.showWindowUnderlay = true
					setTimeout(() => {
						window.animation.showWindowUnderlay.play()
					}, 50)
					document.querySelector('#slideoverContentWrapper').scrollTo(0, 0)
					setTimeout(() => {
						Spruce.stores.project.loadContent(window.router.getFile(name)).then(() => {
							window.animation.slideoverFadeInContent.play()
							// Re-initialise Navigo links after new content is loaded
							window.router.updatePageLinks()
						})
					}, 50)
				})
			}, 50)
		})
	}
}
