// Navigo (router)

const root = location.origin
const useHash = false
const hash = '#!'
const router = new Navigo(root, useHash, hash)

// Replace URL without page reload
router.setPath = (to => {
	console.log('setPath', to, router._lastRouteResolved.url, router._lastRouteResolved.params)

	router.historyAPIUpdateMethod('replaceState')
	router.navigate('/' + to)
	router.historyAPIUpdateMethod('pushState')
})

router.pushPath = (to => {
	router.pause()
	router.navigate('/' + to);
	router.resume()
})
/*router.on(':lang', params => {
	let lang = params.lang

	/!*title.textContent = `${ title.text } | Naxi`;*!/

	console.log('lang', lang, params)
}).resolve()*/

let lang = localStorage.lang || 'en'

console.log('lang', lang)
localStorage.setItem('lang', lang)

router.hooks({
	before: function (done, params) {
		console.log('before', params)
		done()
	},
	after: function (params) {
		console.log('after', params)
	}
})

console.log(location.origin)

router.on({
	':lang': function (params) {

		console.log('Root - has param;', 'params:', params, !params)

		const langList = ['en', 'cs']

		// check if language param is in the list + redirect to the right language
		if (langList.some(langItem => langItem === params.lang)) {
			lang = params.lang
			localStorage.setItem('lang', lang)
		}
		else {
			router.setPath(lang)
		}

	},
	'*': function (params) {
		console.log('Root - no lang;', 'params:', params, !params)

		if (!params) {
			console.log('redirecting..')

			router.setPath('en')
		}
	},
	/*':lang/!*': function (params) {
		console.log('Root;', 'params:', params)
	},*/
	':lang/projects/:name': function (params) {
		console.log('Project detail;', 'params:', params)
	},
	':lang/projects': function () {
		console.log('Projects;')
	}
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
	iso.lang = slug

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