/* Parallax animations */
const parallaxAnimations = [
	/* Desktop */
	{
		anime: anime({
			targets: '#blueHand',
			translateY: ['17.5', '22.5vh'],
			rotate: [12, 0],
			autoplay: false,
			easing: 'linear',
		}),
		raf: null,
		scrollPercent: 0
	},
	{
		anime: anime({
			targets: '#greenHand',
			translateY: ['12.5vh', '17.5vh'],
			rotate: [-12, -24],
			autoplay: false,
			easing: 'linear'
		}),
		raf: null,
		scrollPercent: 0
	},
	{
		anime: anime({
			targets: '#purpleHand',
			translateY: ['12.5vh', '17.5vh'],
			rotate: [18, 32],
			autoplay: false,
			easing: 'linear'
		}),
		raf: null,
		scrollPercent: 0
	},
	{
		anime: anime({
			targets: '#yellowHand',
			translateY: ['8.5vh', '13.5vh'],
			rotate: [-4, 8],
			autoplay: false,
			easing: 'linear'
		}),
		raf: null,
		scrollPercent: 0
	},
	/* Tablet */
	{
		anime: anime({
			targets: '#blueHandTablet',
			translateY: ['17.5%', '22.5%'],
			rotate: [12, 0],
			autoplay: false,
			easing: 'linear',
		}),
		raf: null,
		scrollPercent: 0
	},
	{
		anime: anime({
			targets: '#greenHandTablet',
			translateY: ['12.5%', '17.5%'],
			rotate: [-6, -18],
			autoplay: false,
			easing: 'linear'
		}),
		raf: null,
		scrollPercent: 0
	},
	{
		anime: anime({
			targets: '#purpleHandTablet',
			translateY: ['12.5%', '17.5%'],
			rotate: [-18, -6],
			autoplay: false,
			easing: 'linear'
		}),
		raf: null,
		scrollPercent: 0
	},
	/* Mobile */
	{
		anime: anime({
			targets: '#greenHandMobile',
			translateY: ['27.5vh', '32.5vh'],
			rotate: [-12, -18],
			autoplay: false,
			easing: 'linear'
		}),
		raf: null,
		scrollPercent: 0
	},
	{
		anime: anime({
			targets: '#purpleHandMobile',
			translateY: ['27.5vh', '32.5vh'],
			rotate: [18, 26],
			autoplay: false,
			easing: 'linear'
		}),
		raf: null,
		scrollPercent: 0
	},
]

/* Callback function for scroll event */
/* Inspired by https://codepen.io/raineng/pen/bGEMdPy?editors=1111 */
const scrollHandler = function () {

	// LOG - all currently running animations
	// console.log(anime.running)

	let windowHeight = window.innerHeight
	let scrollTop = window.pageYOffset || document.documentElement.scrollTop

	parallaxAnimations.forEach(parallaxAnimation => {

		const updateAnimation = function () {

			let animationProgressPercent = parallaxAnimation.anime.progress / 100

			animationProgressPercent += (parallaxAnimation.scrollPercent - animationProgressPercent) * 0.06

			// Jump to a specific time of the animation (in milliseconds)
			parallaxAnimation.anime.seek(animationProgressPercent * parallaxAnimation.anime.duration)

			// LOG
			// console.log(animationProgressPercent, parallaxAnimation.anime.progress, parallaxAnimation.anime.duration, parallaxAnimation);

			let diff = parallaxAnimation.scrollPercent - animationProgressPercent

			if (Math.abs(diff) > 0.006 && isElementInViewport(parallaxAnimation.anime.animatables[0].target)) {
				parallaxAnimation.raf = requestAnimationFrame(updateAnimation)
			}
			else if (parallaxAnimation.raf) {
				console.log('cancelling animation')
				cancelAnimationFrame(parallaxAnimation.raf)
				parallaxAnimation.raf = null
			}
		}

		// check if element is in the browser window and no other anime.js animation is running (to wait for initial animations)
		if (isElementInViewport(parallaxAnimation.anime.animatables[0].target) && anime.running.length === 0) {

			// element position relative to the document
			let elementTopAbsolute = parallaxAnimation.anime.animatables[0].target.getBoundingClientRect().top + scrollTop
			// element position  relative to the browser window
			let elementTop = parallaxAnimation.anime.animatables[0].target.getBoundingClientRect().top
			let elementHeight = parallaxAnimation.anime.animatables[0].target.getBoundingClientRect().height

			// if element is initially in the viewport i.e. at the top
			if (elementTopAbsolute < windowHeight) {
				parallaxAnimation.scrollPercent = Math.max(((windowHeight - elementTop) - (windowHeight - elementTopAbsolute)) / ((windowHeight + elementHeight) - (windowHeight - elementTopAbsolute)), 0)
			}
			else {
				parallaxAnimation.scrollPercent = Math.max((windowHeight - elementTop) / (windowHeight + elementHeight), 0)
			}

			// LOG
			// console.log('elementHeight', elementHeight, 'elementTopAbsolute < windowHeight', elementTopAbsolute < windowHeight, 'windowHeight', windowHeight, 'elementTopAbsolute', elementTopAbsolute, 'scrollTop', scrollTop, 'elementTop', elementTop, 'parallaxAnimation.scrollPercent', parallaxAnimation.scrollPercent, (windowHeight - elementTop), (windowHeight + elementHeight), (windowHeight - elementTopAbsolute), '//', elementTop / -Math.abs(elementHeight))

			if (parallaxAnimation.raf === null) {
				parallaxAnimation.raf = requestAnimationFrame(updateAnimation)
			}
		}
	})
}

/* Scroll event listener */
window.addEventListener("scroll", scrollHandler)
