// initialise Navigo inside window.router
window.router = new Navigo('/')


// Global store
Spruce.store('global', {
	loaded: false,
	language: null,
	sectionInView: '',
	openSectionClue: false,
	windowUnderlayShow: false,
	onlyWhySection: false,
	sectionInfo: {
		en: {
			what: 'What we do',
			how: 'How we do it'
		},
		cs: {
			what: 'What we do',
			how: 'How we do it'
		}
	},
	get sectionInViewInfo() {
		return Spruce.stores['translation.sectionIntro'].return(this.sectionInView + '.title')
	},
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
			url = url.split('/').reduce((accumulator, currentValue, index) => {
				// LOG
				// console.log(accumulator, currentValue, index)
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
		window.initialiseTooltips()

		router.navigate(url, { callHandler: false })
	},
	mobileMenuOpen: false,
	openMobileMenu() {
		this.mobileMenuOpen = true
		return new Promise((resolve) => {
			anime({
				targets: '#mobileMenu',
				translateY: '0%',
				duration: 600,
				easing: 'easeOutQuart',
				begin: (() => {
					console.log('opening mobileMenu')
				}),
				complete: (() => {
					anime({
						targets: '#windowUnderlay',
						opacity: 1,
						duration: 200,
						easing: 'linear',
					})
				})
			}).finished.then(() => {
				resolve()
			})
		})
	},
	closeMobileMenu() {
		window.router.navigate(Spruce.stores.global.language, { callHandler: false })
		anime({
			targets: '#mobileMenu',
			translateY: '-100%',
			duration: 400,
			easing: 'easeInQuart',
			complete: (() => {
				anime({
					targets: '#windowUnderlay',
					opacity: 0,
					duration: 200,
					easing: 'linear',
					complete: (() => {
						this.mobileMenuOpen = false
					})
				})
			})
		})
	}
})


// Activity store
Spruce.store('activity', {
	random: null,
	activities: [
		{
			en: {
				content: '<span class="mt-0.5">Website project for MMT company completed in Q3/2020</span><img class="max-w-none" src="/images/activity/checkmark-emoji.svg">',
				url: '/project/mmt',
			},
			cs: {
				content: '<span class="mt-0.5">Web pro společnost MMT s.r.o. dokončen na podzim roku 2020</span><img class="max-w-none" src="/images/activity/checkmark-emoji.svg">',
				url: '/projekt/mmt'
			},
		},
		{
			en: {
				content: '<span class="mt-0.5">We are an official partner of ApostrophCMS</span><img class="max-w-none" src="/images/activity/apostrophecms-logo.svg">',
				url: 'https://apostrophecms.com/',
				target: '_blank'
			},
			cs: {
				content: '<span class="mt-0.5">Jsme oficiálními partnery ApostropheCMS</span><img class="max-w-none" src="/images/activity/apostrophecms-logo.svg">',
				url: 'https://apostrophecms.com/',
				target: '_blank'
			}
		},
		{
			en: {
				content: '<span class="mt-0.5">We open-sourced our website on GitHub</span><img class="max-w-none" src="/images/activity/github-logo.svg">',
				url: 'https://github.com/',
				target: '_blank'
			},
			cs: {
				content: '<span class="mt-0.5">Vypustili jsme kód našeho webu GitHub komunitě</span><img class="max-w-none" src="/images/activity/github-logo.svg">',
				url: 'https://github.com/',
				target: '_blank'
			}
		},
	],
	get getContent() {
		console.log('getContent for activity box')
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
				/*console.log(window.router.generate('project-' + Spruce.stores.global.language, {
					language: Spruce.stores.global.language,
					name: 'mmt'
				}))*/
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
	loadContent(name) {
		return fetch(`./projects/${ name }.html`)
			.then(response => response.text())
			.then(html => {
				document.querySelector('#slideoverContent').innerHTML = html
			})
	}
})

// Slideover store
Spruce.store('slideover', {
	open: false,
	animationFinished: false,
})

// Badge store
Spruce.store('translation.badge', {
	en: {
		officialPartner: 'Official partner'
	},
	cs: {
		officialPartner: 'Oficiální partner'
	},
	return: function (data) {
		return Object.getProperty(Spruce.stores['translation.badge'], Spruce.stores.global.language + '.' + data)
	}
})

