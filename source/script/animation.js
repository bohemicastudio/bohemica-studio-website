// Slideover animations
(function () {

	window.animation = {}
	window.animation.ready = false

	document.arrive("#slideover", { existing: true }, function () {

		window.animation.showWindowUnderlay = anime({
			targets: '#windowUnderlay',
			opacity: [0, 1],
			translateZ: 0,
			duration: 200,
			easing: 'linear',
			autoplay: false
		})

		window.animation.slideoverClose = anime({
			targets: '#slideover',
			translateY: ['0%', '100%'],
			translateZ: 0,
			duration: 400,
			easing: 'easeInQuart',
			autoplay: false
		})

		window.animation.slideoverOpen = anime({
			targets: '#slideover',
			translateY: ['100%', '0%'],
			translateZ: 0,
			duration: 600,
			easing: 'easeOutQuart',
			autoplay: false
		})

		window.animation.slideoverFadeOutContent = anime.timeline(
			{ targets: '#slideoverContent', autoplay: false })
			.add({
				translateY: ['0rem', '2rem'],
				translateZ: 0,
				duration: 400,
				easing: 'easeInQuart',
			}).add({
				duration: 300,
				opacity: [1, 0],
				easing: 'linear',
			}, '-=300')

		window.animation.slideoverFadeInContent = anime.timeline(
			{ targets: '#slideoverContent', autoplay: false })
			.add({
				translateY: ['-2rem', '0rem'],
				translateZ: 0,
				duration: 400,
				easing: 'easeOutQuart',
			}).add({
				duration: 300,
				opacity: [0, 1],
				easing: 'linear',
			}, '-=300')

		window.animation.ready = true
	})
})()
