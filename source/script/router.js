// Navigo (router)
const router = new Navigo('/')

// set language in the local storage
console.log(typeof localStorage.language === 'undefined', localStorage.language === null, !Spruce.stores.global.languages.some(language => language.code === localStorage.language))

Spruce.stores.global.language = typeof localStorage.language === 'undefined' || localStorage.language === null || !Spruce.stores.global.languages.some(language => language.code === localStorage.language) ? 'en' : localStorage.languag

console.log('language', Spruce.stores.global.language)
localStorage.setItem('language', Spruce.stores.global.language)

router.hooks({
	before: function (done, params) {
		console.log('before', params)
		done()
	},
	after: function (params) {
		console.log('after', params)
	}
})

router.on({
	':language': function ({ data }) {

		console.log('Root - has param;', 'params:', data)

		// check if language param is in the list + redirect to the right language
		if (Spruce.stores.global.languages.some(language => language.code === data.language)) {
			Spruce.stores.global.language = data.language
			localStorage.setItem('language', Spruce.stores.global.language)
		}
		else {
			router.navigate(Spruce.stores.global.language, { callHandler: false })
		}

	},
	/*':language/!*': function (params) {
		console.log('Root;', 'params:', params)
	},*/
	':language/projects/:name': function (params) {
		console.log('Project detail;', 'params:', params)
	},
	':language/projects': function () {
		console.log('Projects;')
	},
	'*': function ({ data }) {
			console.log('Root - no language;', 'data:', data, !data)

			if (!data) {
				console.log('redirecting..')

				router.navigate('en', { callHandler: false })

				/*router.setPath('en')*/
			}
		},
}).resolve()


/*const router = franxx.createBrowserRouter()*/

/*// Routes
let title = document.querySelector('title'),
	iso = document.querySelector('html')

var router = new Navigo(location.origin, false)

router.on(() => {
	HTML('naxi')
	HB('naxi')
	Stations()
	Facebook('sr_RS')
	i18n('sr')
})

router.on(':iso', params => {
	let slug = params.iso
	title.textContent = `${title.text} | Naxi`

	// Grab the query
	iso.language = slug

	Stations()

	// Load the view
	if (slug === 'topfm') {
		HTML('topfm')
		HB('topfm')
	} else {
		HTML('naxi')
		HB('naxi')
	}

	// Load the language
	i18n(slug)

	// Facebook
	if (slug === 'en')
		Facebook('en_GB')
	else if (slug === 'sr')
		Facebook('sr_RS')
	else if (slug === 'ru')
		Facebook('ru_RU')
	else if (slug === 'nl')
		Facebook('nl_NL')
	else if (slug === 'hu')
		Facebook('hu_HU')
}).resolve()

router.notFound(() => {
	HTML('notfound')
}).resolve()*/
