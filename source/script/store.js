// Project data
Spruce.store('project', {
	name: 'MMT',
	html: '<div>Init</div>',
	get firstName() {
		return this.name
	},
	set setHTML(data) {
		this.html = data
	},
	initHTML() {
		fetch('./projects/mmt.html')
			.then(response => response.text())
			.then(html => {
				console.log('html', html)
				Spruce.store('project').setHTML = html
			})
	},
	handAnimTest(element) {
		console.log(element)
			anime.timeline({
				targets: element,
				duration: 2560,
				opacity: 1,
				easing: 'linear',
			}).add({
				rotate: 15,
				easing: 'easeOutQuart',
				duration: 1280
			})
	},
})

const getTranslationFile = async (lang) => {
	const response = await fetch(`./langs/${ lang }.json`)
	const json = await response.json()
	console.log('json:', json)
	return json
}

/* TODO watcher for localStorage.lang */

console.log('hello', lang)
// Internationalization
Spruce.store('home', {
	data: { lang: 'en' },
	set setData(data) {
		this.data = data
	},
	async switchTranslation(lang) {
		let translation = await getTranslationFile(lang)
		console.log('translation', translation)
		this.setData = translation
		localStorage.setItem('lang', lang)
		/*router.setPath(lang)*/

		let url = router._lastRouteResolved.url.split('/').reduce((accumulator, currentValue, index) => {
			console.log(accumulator + '/' + currentValue, index)

			if (index === 1) {
				return accumulator + '/' + lang
			}
			else {
				return accumulator + '/' + currentValue
			}
		})

		router.historyAPIUpdateMethod('replaceState')
		router.navigate(url)
		router.historyAPIUpdateMethod('pushState')
	}
})
