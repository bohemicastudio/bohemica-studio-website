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
					subtitle: 'The project cost is derived from the given requirements and task complexity as well as our expertise and experience in the field. We offer competitive pricing corresponding with the required output quality.',
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
			lastUpdated: 'Last updated on',
			loading: 'Loading...',
			backToTop: 'Back to top',
			backToProjectOverview: 'Back to the project overview',
			openProjectLibrary: 'Open a project library',
			available: 'Available for new projects',
			scheduleCall: 'Schedule a call',
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
				title: 'Zdravíme!',
				subtitle: 'Jsme přátelský tým kvalifikovaných programátorů a designerů informačních nástrojů'
			},
			tooltip: {
				scheduleCall: 'Zabukovat online schůzku',
				changeLanguage: 'Změnit jazyk',
				twitter: 'Koukni, co máme na srdci na Twitteru',
				linkedin: 'Spoj se s námi na síti LinkedIn'
			},
			recentActivity: 'Nedávná aktivita',
			lastUpdated: 'Naposledy aktualizováno',
			loading: 'Načítám...',
			backToTop: 'Zpět nahoru',
			backToProjectOverview: 'Zpět na přehled projektů',
			openProjectLibrary: 'Otevřít knihovnu projektů',
			available: 'Jsme otevřeni novým projektům',
			scheduleCall: 'Zabukovat online schůzku',
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

		let url = router?.current?.[0]?.url

		if (url?.includes('/')) {
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
		window?.tooltips?.forEach(instance => {
			instance.destroy()
		})
		if (window.tooltips) {
			window.tooltips.length = 0
		}
		window?.initialiseTooltips?.()

		router.navigate(url, { callHandler: false })
	},
	mobileMenuOpen: false,
	openMobileMenu() {
		this.mobileMenuOpen = true
		return new Promise((resolve) => {
			anime({
				targets: '#mobileMenu',
				translateY: '0%',
				translateZ: 0,
				duration: 600,
				easing: 'easeOutQuart',
				begin: (() => {
					/*console.log('opening mobileMenu')*/
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
			translateZ: 0,
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
		/*{
			en: {
				content: '<span class="mt-0.5">Website project for MMT company completed in Q3/2020</span><img alt="Finished!" class="max-w-none" src="./images/activity/checkmark-emoji.svg">',
				url: '/project/mmt',
			},
			cs: {
				content: '<span class="mt-0.5">Web pro společnost MMT s.r.o. dokončen na podzim roku 2020</span><img alt="Finished!" class="max-w-none" src="./images/activity/checkmark-emoji.svg">',
				url: '/projekt/mmt'
			},
		},*/
		{
			en: {
				content: '<span class="mt-0.5">Check out our most recent project - Digital signage application (T-Mobile)</span><img alt="Fresh project" class="w-6 h-auto" src="./images/activity/sparkles.png">',
				project: 't-mobile',
			},
			cs: {
				content: '<span class="mt-0.5">Podívejte se na náš nejnovější projekt - pokročilý přehrávač mediálního obsahu (T-Mobile)</span><img alt="Fresh project" class="w-6 h-auto" src="./images/activity/sparkles.png">',
				project: 't-mobile'
			},
		},
		{
			en: {
				content: '<span class="mt-0.5">We are an official partner of ApostropheCMS</span><img alt="Logo apostrophe" class="max-w-none" src="./images/activity/apostrophecms-logo.svg">',
				url: 'https://apostrophecms.com/',
				target: '_blank'
			},
			cs: {
				content: '<span class="mt-0.5">Jsme oficiálními partnery ApostropheCMS</span><img alt="Logo apostrophe" class="max-w-none" src="./images/activity/apostrophecms-logo.svg">',
				url: 'https://apostrophecms.com/',
				target: '_blank'
			}
		},
		{
			en: {
				content: '<span class="mt-0.5">We open-sourced our website on GitHub</span><img alt="Logo image" class="max-w-none" src="./images/activity/github-logo.svg">',
				url: 'https://github.com/bohemicastudio/bohemica-studio-website',
				target: '_blank'
			},
			cs: {
				content: '<span class="mt-0.5">Vypustili jsme kód našeho webu GitHub komunitě</span><img alt="Logo image" class="max-w-none" src="./images/activity/github-logo.svg">',
				url: 'https://github.com/bohemicastudio/bohemica-studio-website',
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
			// redirect to an URL
			if (this.activities[this.random][Spruce.stores.global.language].url?.includes('://')) {
				return this.activities[this.random][Spruce.stores.global.language].url
			}
			// redirect to a project page
			else {
				// LOG
				/*console.log(window.router.generate('project-' + Spruce.stores.global.language, {
					language: Spruce.stores.global.language,
					name: 'mmt'
				}))*/
				return window.router.generate('project-' + Spruce.stores.global.language, {
					language: Spruce.stores.global.language,
					name: this.activities[this.random][Spruce.stores.global.language].project
				})
			}
		}
	}
})

Spruce.starting(function () {
	/*console.log('Spruce starting', Spruce.stores, Math.floor(Math.random() * Spruce.stores.activity.activities.length))*/
	Spruce.stores.activity.random = Math.floor(Math.random() * Spruce.stores.activity.activities.length)
})

// Project store
Spruce.store('project', {
	loadContent(name) {
		/*${window.router.root}*/
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
		officialPartner: 'Official partner',
		sourceCode: 'Source code available',
		latestProject: 'Latest project',
		saasProduct: 'SaaS product',
	},
	cs: {
		officialPartner: 'Oficiální partner',
		sourceCode: 'Zdrojový kód k dostání',
		latestProject: 'Nejnovější project',
		saasProduct: 'SaaS produkt',
	},
	return: function (data) {
		return Object.getProperty(Spruce.stores['translation.badge'], Spruce.stores.global.language + '.' + data)
	}
})

