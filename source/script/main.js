// Initial setup

const projects = [
	{
		name: 'Project 1',
		date: '08/2020'
	}
]

/*document.addEventListener("visibilitychange", function () {
	console.log('visibilitychange')
	document.title = document.hidden ? "I'm away" : "I'm here"
})*/

/* check on load if tab is active, if not wait with animation */
if (document.hasFocus()) console.log('Tab is active')

// TODO DELETE ??


window.addEventListener('load', // the listener here is not necessary as the script is below the code (keeping it here just in case it is put in the <head> again)
	function () {

		document.querySelector('body').classList.remove('initialising')

		window.addEventListener ('beforeunload', function (event) {
			document.querySelector('body').classList.add('invisible')
			window.scrollTo(0, 0)
		})

		/* Scroll handler - for parallax mostly */

		/*function inView(entries, observer) {

			entries.forEach(entry => {
				console.log(entry)

				let elementTop = entry.boundingClientRect.top

				let parallaxAnimation = null, raf = null, scrollPercent = 0;

				const updateAnims = function () {
					let animProgressPercent = parallaxAnimation.progress / 100
					let diff = scrollPercent - animProgressPercent

					/!*console.log('diff:' + diff)*!/
					animProgressPercent += (scrollPercent - animProgressPercent) * 0.05

					parallaxAnimation.seek(animProgressPercent * parallaxAnimation.duration)

					// console.log('animProgressPercent:' + animProgressPercent * parallaxAnimation.duration, animProgressPercent, parallaxAnimation.duration);

					if (Math.abs(diff) > 0.000005) {
						raf = requestAnimationFrame(updateAnims)
					}
					else if (raf) {
						console.log('cancelling')
						cancelAnimationFrame(raf)
						raf = null
					}
				}

				const scrollHandler = function () {
					/!*let documentHeight = document.documentElement.scrollHeight*!/
					let windowHeight = window.innerHeight

					let scrollTop = window.pageYOffset || document.documentElement.scrollTop

					elementTop = entry.target.getBoundingClientRect().top
					scrollPercent = Math.max(Math.abs(scrollTop - elementTop) / windowHeight, 0)
					console.log(scrollTop, elementTop, windowHeight, scrollPercent)
					/!*scrollPercent = Math.max(scrollTop / (documentHeight - windowHeight), 0)*!/

					// console.log(documentHeight, windowHeight, scrollTop)
					// console.log('scrolling: ' + scrollPercent)


					if (raf === null) {
						raf = requestAnimationFrame(updateAnims);
					}
				}

				if (entry.isIntersecting === true) {

					console.log('intersecting')


					/!* Parallax animations *!/

					if (entry.target.id === 'greenHand') {
						parallaxAnimation = anime({
							targets: '#greenHand',
							translateY: [0, 200],
							autoplay: false,
							easing: 'linear'
						})
					}

					_window.addEventListener("scroll", scrollHandler)
				}
				else {
					console.log('not intersecting')
					_window.removeEventListener("scroll", scrollHandler)
				}
			})
		}*/


		/* Intersection observer for parallax animations */

		/*let options = {
			root: null, // relative to document viewport
			rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
			threshold: 0 // 0 - as soon as even one pixel is visible, 1 - until every pixel is visible
		}

		let observer = new IntersectionObserver(inView, options)

		observer.observe(document.querySelector('#greenHand'))*/
	})
