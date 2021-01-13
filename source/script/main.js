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

		// Scroll to top of the document before page is unloaded
		window.addEventListener('beforeunload', function (event) {
			document.querySelector('body').classList.add('invisible')
			window.scrollTo(0, 0)
		})

		// Initialise Tippy.js library
		initialiseTooltips()

	})
