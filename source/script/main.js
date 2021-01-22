/*document.addEventListener("visibilitychange", function () {
	console.log('visibilitychange')
	document.title = document.hidden ? "I'm away" : "I'm here"
})*/

// check on load if tab is active, if not wait with animation
if (document.hasFocus()) console.log('Tab is active')

// triggered when local storage changes - in a different window/tab
window.addEventListener('storage',
	function (event) {
		console.log('storage change', event)
		/*Spruce.stores.global.language*/
	})

// executed once page is loaded
window.addEventListener('load',
	function () {

		// Disable cursor loading
		window.Spruce.stores.global.loaded = true

		// Scroll to top of the document before page is unloaded
		/* TODO Enable for production ??? */
		/*window.addEventListener('beforeunload', function (event) {
			document.querySelector('body').classList.add('invisible')
			window.scrollTo(0, 0)
		})*/

		// Initialise Tippy.js library
		window.initialiseTooltips()

		// Re-initialise Navigo on links after page is loaded
		window.router.updatePageLinks()

		// Loading order: 1. Router (Navigo); 2. Store (Spruce - using router); 3. Alpine.js (once page is loaded)
		// When Navigo is initialized before page/DOM load, the links are not initialised

		window.mediumZoom = mediumZoom('[data-zoom]', {
			margin: 24,
			background: 'rgba(0, 0, 0, 0.75)',
			scrollOffset: 0
		})

		/*document.arrive(".medium-zoom-image", function () {
			console.log('new element with class .medium-zoom-image')
			let mediumZoom = mediumZoom('img.medium-zoom-image', {
				margin: 24,
				background: 'rgba(0, 0, 0, 0.75)',
				scrollOffset: 0
			})
		})*/

	})
