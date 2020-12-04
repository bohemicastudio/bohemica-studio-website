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
	}
})

const getTranslation = async (lang) => {
	const response = await fetch(`./langs/${ lang }.json`)
	const json = await response.json()
	console.log('json:', json)
	return json
}

console.log('hello', lang)
// Internationalization
Spruce.store('home', {
	data: { lang: 'en' },
	set setData(data) {
		this.data = data
	},
	async switchTranslation(lang) {
		let translation = await getTranslation(lang)
		console.log('translation', translation)
		this.setData = translation
	}
})
