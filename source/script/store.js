// Global store
Spruce.store('global', {
	loaded: false,
	language: null,
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
		this.data = translation
		/**/

		// set language for the store and local storage
		this.language = language
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

		// Re-create the Tippy.js instances on language change
		tooltips.forEach(instance => {
			instance.forEach(element => {
				element.destroy()
			})
		})
		initialiseTooltips()

		router.navigate(url, { callHandler: false })
	}
})


// Activity store
Spruce.store('activity', {
	random: null,
	activities: [
		{
			en: {
				content: '<span class="mt-0.5">Website project for MMT company completed in Q3/2020</span><img src="/images/activity/checkmark-emoji.svg">',
				url: '/project/mmt',
			},
			cs: {
				content: '<span class="mt-0.5">Web pro společnost MMT s.r.o. dokončen na podzim roku 2020</span><img src="/images/activity/checkmark-emoji.svg">',
				url: '/projekt/mmt'
			},
		},
		{
			en: {
				content: '<span class="mt-0.5">We are an official partner of ApostrophCMS</span><img src="/images/activity/apostrophecms-logo.svg">',
				url: 'https://apostrophecms.com/',
				target: '_blank'
			},
			cs: {
				content: '<span class="mt-0.5">Jsme oficiálními partnery ApostropheCMS</span><img src="/images/activity/apostrophecms-logo.svg">',
				url: 'https://apostrophecms.com/',
				target: '_blank'
			}
		},
	],
	get getContent() {
		if (!!Spruce.stores.global.language && (!this.random || this.random !== 0)) {
			return this.activities[this.random][Spruce.stores.global.language].content
		}
	},
	get getUrl() {
		if (!!Spruce.stores.global.language && (!this.random || this.random !== 0)) {
			if (this.activities[this.random][Spruce.stores.global.language].url.includes('://')) {
				return this.activities[this.random][Spruce.stores.global.language].url
			}
			else {
				// LOG
				console.log(window.router.generate('project-' + Spruce.stores.global.language, {
					language: Spruce.stores.global.language,
					name: 'mmt'
				}))
				return window.router.generate('project-' + Spruce.stores.global.language, {
					language: Spruce.stores.global.language,
					name: 'mmt'
				})
			}
		}
	}
})

Spruce.starting(function () {
	console.log('Spruce starting', Spruce.stores, Math.floor(Math.random() * Spruce.stores.activity.activities.length))

	Spruce.stores.activity.random = Math.floor(Math.random() * Spruce.stores.activity.activities.length)
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
				this.setHTML = html
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
	openSlideover(file) {

		console.log(file)

		this.showSlideover = true

		anime({
			targets: document.querySelector('#slideover'),
			translateY: '0%',
			duration: 640,
			easing: 'easeOutQuart',
			begin: (() => {
				console.log('opening slideover')
				this.showSlideoverUnderlay = true
			})
		})
	},
	closeSlideover() {
		anime({
			targets: document.querySelector('#slideover'),
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
	},
})
