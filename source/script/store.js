// Global store
Spruce.store('global', {
	loaded: false,
	language: String,
	languages: [
		{
			code: 'en',
			name: 'English'
		},
		{
			code: 'cs',
			name: 'Čeština'
		}
	],
	data: { language: 'en' },
	async switchTranslation(language) {

		/* TODO What to do about this ?? */
		let translation = await getTranslationFile(language)
		console.log('translation', translation)
		Spruce.stores.global.data = translation
		/**/

		// set language for the store and local storage
		Spruce.stores.global.language = language
		localStorage.setItem('language', language)

		let url = router.current[0].url

		if (url.includes('/')) {
			console.log(url.split('/'))
			url = url.split('/').reduce((accumulator, currentValue, index) => {
				console.log(accumulator, currentValue, index)
				if (index === 0) {
					return language
				}
				else {
					return accumulator + '/' + currentValue
				}
			}, language)
		}
		else {
			url = language
		}

		router.navigate(url, { callHandler: false })
	}
})

const getTranslationFile = async (language) => {
	const response = await fetch(`./langs/${ language }.json`)
	const json = await response.json()
	console.log('json:', json)
	return json
}

// Project store
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

// Slideover store
Spruce.store('slideover', {
	showSlideover: false,
	showSlideoverUnderlay: false,
	processFiles: function (event) {
		console.log(this.$refs, this.fieldName)
		if (event.dataTransfer.files.length > 0) {
			this.$refs[this.fieldName + '-file'].files = event.dataTransfer.files
			this.$refs[this.fieldName + '-file'].dispatchEvent(new Event('change', { 'bubbles': true }))

			return true
		}

		return false
	},
	openSlideover() {
		console.log('open slideover', Spruce)

		console.log('window', window)

		Spruce.stores.slideover.showSlideover = true
		console.log(Spruce)

		anime({
			targets: document.querySelector('#slideover'),
			translateY: '0%',
			duration: 640,
			easing: 'easeOutQuart',
			begin: (() => {
				this.showSlideoverUnderlay = true
			})
		})

		/*this.showSlideover = true*/
		/*Spruce.stores.slideover.$nextTick(() => {
			anime({
				targets: this.$refs.slideover,
				translateY: '0%',
				duration: 640,
				easing: 'easeOutQuart',
				begin: (() => {
					this.showSlideoverUnderlay = true
				})
			})
		})*/
	},
	closeSlideover() {
		anime({
			targets: document.querySelector('#slideover'),
			translateY: '100%',
			duration: 320,
			easing: 'easeInQuart',
			begin: (() => {
				Spruce.stores.slideover.showSlideoverUnderlay = false
			}),
			complete: (() => {
				Spruce.stores.slideover.showSlideover = false
			})
		})
	},
	animateSlideover: function (event, element) {
		/*console.log(element, this.$refs.slideover)*/
		console.log(event.detail)

		if (event.detail.showSlideover === true) {
			anime({
				targets: element,
				translateY: '0%',
				duration: 640,
				easing: 'easeOutQuart',
				begin: (() => {
					this.showSlideoverUnderlay = true
				})
			})
		}
		else if (event.detail.showSlideover === false) {
			anime({
				targets: element,
				translateY: '100%',
				duration: 320,
				easing: 'easeInQuart',
				begin: (() => {
					this.showSlideoverUnderlay = false
				}),
				complete: (() => {
					this.showSlideover = false
				})
			})
		}
	}
})


/* TODO watcher for localStorage.language */


// Internationalization DELETE
Spruce.store('home', {
	data: { language: 'en' },
	set setData(data) {
		this.data = data
	},
	async switchTranslation(language) {
		let translation = await getTranslationFile(language)
		console.log('translation', translation)
		this.setData = translation
		localStorage.setItem('language', language)
		/*router.setPath(language)*/

		let url = router._lastRouteResolved.url.split('/').reduce((accumulator, currentValue, index) => {
			console.log(accumulator + '/' + currentValue, index)

			if (index === 1) {
				return accumulator + '/' + language
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
