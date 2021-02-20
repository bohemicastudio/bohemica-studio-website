// Global store
Spruce.store('global', {
	loaded: false,
	language: null,
	sectionInView: '',
	openSectionClue: false,
	showWindowUnderlay: false,
	onlyWhySection: false,
	showRepos: true,
	translation: {
		en: {
			sections: {
				'what': {
					name: 'What',
					title: 'What we do',
					subtitle: 'Individuals, startups and established firms entrust us with crafting functional web & mobile based applications and eye-catching brand identities that support their specific business aims.'
				},
				'how': {
					name: 'How',
					title: 'How we do it',
					subtitle: 'Every client & project have a unique set of requirements and priorities.There is no universal process or workflow. Clear communication, personal experience and reliable technological stack are part of our tested formula for finding the right solution.'
				},
				'how-much': {
					name: 'How much',
					title: 'How much we charge',
					subtitle: '???',
				},
				'why': {
					name: 'Why',
					title: 'Why to work with us',
					subtitle: false
				},
				'who': {
					name: 'Who',
					title: 'Who we have worked with',
					subtitle: false
				},
				'where': {
					name: 'Where',
					title: 'Where to reach us',
					subtitle: 'We are a small team of hard-working geeks & nerds scattered across the European continent, although we operate in any corner of the internet space.'
				}
			},
			head: {
				title: 'Hello there!',
				subtitle: 'We are a friendly team of qualified full-stack programmers and visual designers'
			},
			tooltip: {
				scheduleCall: 'Schedule a call',
				changeLanguage: 'Change language',
				twitter: 'See what we have to say on Twitter',
				linkedin: 'Connect with us on LinkedIn'
			},
			recentActivity: 'Recent activity',
			lastUpdated: 'Last updated',
			loading: 'Loading...',
			backToTop: 'Back to top',
			backToProjectOverview: 'Back to the project overview',
		},
		cs: {
			sections: {
				'what': {
					name: 'Co',
					title: 'Co umíme',
					subtitle: ''
				},
				'how': {
					name: 'Jak',
					title: 'Jak pracujeme',
					subtitle: ''
				},
				'how-much': {
					name: 'Kolik',
					title: 'Kolik to stojí',
					subtitle: ''
				},
				'why': {
					name: 'Proč',
					title: 'Proč si vybrat nás',
					subtitle: false
				},
				'who': {
					name: 'Kdo',
					title: 'Kdo s námi spolupracuje',
					subtitle: false
				},
				'where': {
					name: 'Kde',
					title: 'Kde se nacházíme',
					subtitle: ''
				}
			},
			head: {
				title: 'Nazdárek!',
				subtitle: 'Jsme přátelský tým kvalifikovaných programátorů a designerů informačních technologií'
			},
			tooltip: {
				scheduleCall: 'Zarezervovat online schůzku',
				changeLanguage: 'Změnit jazyk',
				twitter: 'Koukni, co máme na srdci na Twitteru',
				linkedin: 'Spoj se s námi na síti LinkedIn'
			},
			recentActivity: 'Nedávná aktivita',
			lastUpdated: 'Naposledy aktualizováno',
			loading: 'Načítám...',
			backToTop: 'Zpět nahoru',
			backToProjectOverview: 'Zpět na přehled projektů',
		}
	},
	return: function (data) {
		return Object.getProperty(Spruce.stores['global'], 'translation.' + Spruce.stores.global.language + '.' + data)
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
		// set language for the store and local storage
		this.language = language
		localStorage.setItem('language', language)

		console.log('router', router)
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
		window.tooltips.forEach(instance => {
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
					Spruce.stores.global.showWindowUnderlay = true
					window.animation.showWindowUnderlay.play()
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
				window.animation.showWindowUnderlay.reverse()
				window.animation.showWindowUnderlay.play()
				window.animation.showWindowUnderlay.finished.then(() => {
					window.animation.showWindowUnderlay.reverse()
					this.mobileMenuOpen = false
					setTimeout(() => {
						Spruce.stores.global.showWindowUnderlay = false
					}, 50)
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
				content: '<span class="mt-0.5">Website project for MMT company completed in Q3/2020</span><img class="max-w-none" src="./images/activity/checkmark-emoji.svg">',
				url: '/project/mmt',
			},
			cs: {
				content: '<span class="mt-0.5">Web pro společnost MMT s.r.o. dokončen na podzim roku 2020</span><img class="max-w-none" src="./images/activity/checkmark-emoji.svg">',
				url: '/projekt/mmt'
			},
		},
		{
			en: {
				content: '<span class="mt-0.5">We are an official partner of ApostrophCMS</span><img class="max-w-none" src="./images/activity/apostrophecms-logo.svg">',
				url: 'https://apostrophecms.com/',
				target: '_blank'
			},
			cs: {
				content: '<span class="mt-0.5">Jsme oficiálními partnery ApostropheCMS</span><img class="max-w-none" src="./images/activity/apostrophecms-logo.svg">',
				url: 'https://apostrophecms.com/',
				target: '_blank'
			}
		},
		{
			en: {
				content: '<span class="mt-0.5">We open-sourced our website on GitHub</span><img class="max-w-none" src="./images/activity/github-logo.svg">',
				url: 'https://github.com/',
				target: '_blank'
			},
			cs: {
				content: '<span class="mt-0.5">Vypustili jsme kód našeho webu GitHub komunitě</span><img class="max-w-none" src="./images/activity/github-logo.svg">',
				url: 'https://github.com/',
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

// Project store
Spruce.store('project', {
	loadContent(name) {
		/*${window.router.root}*/
		return fetch(`/projects/${ name }.html`)
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
		officialPartner: 'Official partner',
		sourceCode: 'Source code available',
		latestProject: 'Latest project'
	},
	cs: {
		officialPartner: 'Oficiální partner',
		sourceCode: 'Zdrojový kód k dostání',
		latestProject: 'Nejnovější project'
	},
	return: function (data) {
		return Object.getProperty(Spruce.stores['translation.badge'], Spruce.stores.global.language + '.' + data)
	}
})

