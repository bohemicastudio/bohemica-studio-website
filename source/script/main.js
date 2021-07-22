/*document.addEventListener("visibilitychange", function () {
	console.log('visibilitychange')
	document.title = document.hidden ? "I'm away" : "I'm here"
})*/

// check on load if tab is active, if not wait with animation
/*if (document.hasFocus()) console.log('Tab is active')*/

// triggered when local storage changes - in a different window/tab
/*window.addEventListener('storage',
    function (event) {
        console.log('storage change', event)
        /!*Spruce.stores.global.language*!/
    })*/

console.log("%c" + `Welcome to the virtual home of Bohemica Studio! 🌐`, "color:" + 'rgb(96, 165, 250)' + ";font-weight:bold;");

// executed once page is loaded
window.addEventListener('load',
    function () {

        // Disable cursor loading
        window.Spruce.stores.global.loaded = true

        // Scroll to top of the document before page is unloaded
        window.addEventListener('beforeunload', function (event) {
            document.querySelector('body').classList.add('invisible')
            window.scrollTo(0, 0)
        })

        // Initialise Tippy.js library
        window.initialiseTooltips()

        // Loading order: 1. Router (Navigo); 2. Store (Spruce - using router); 3. Alpine.js (once page is loaded)
        // When Navigo is initialized before page/DOM load, the links are not initialised

        window.mediumZoom = mediumZoom('[data-zoom]', {
            margin: 24,
            background: 'rgba(0, 0, 0, 0.75)',
            scrollOffset: 0
        })

        /* Intersection observer */
        let options = {
            root: null, // relative to document viewport
            rootMargin: '-50% 0% -50% 0%', // margin around root. Values are similar to css property. Unitless values not allowed
            threshold: 0 // 0 - as soon as even one pixel is visible, 1 - until every pixel is visible
        }

        let inView = (entry) => {
            /*console.log(entry[0].target.id)*/
            if (entry[0].target.id === 'intro') {
                window.Spruce.stores.global.openSectionClue = false
            }
            /*else if (entry[0].target.id === 'bottom') {
                window.Spruce.stores.global.openSectionClue = false
                window.Spruce.stores.global.onlyWhySection = false
            }*/
            else {
                window.Spruce.stores.global.sectionInView = entry[0].target.id
                window.Spruce.stores.global.openSectionClue = true
            }
        }

        let observer = new IntersectionObserver((entry) => {
            inView(entry)
        }, options)

        observer.observe(document.querySelector('#intro'))
        observer.observe(document.querySelector('#what'))
        observer.observe(document.querySelector('#how'))
        observer.observe(document.querySelector('#how-much'))
        observer.observe(document.querySelector('#who'))
        observer.observe(document.querySelector('#where'))
    })

/*
let updateNavigoLinks = debounce(() => {
			window.router.updatePageLinks()
		}, 100)
*/

/* Update Navigo links when new [data-navigo] element is in the DOM */
document.arrive("[data-navigo]", function () {
    /*console.log('new [data-navigo] in the DOM')*/
    window.router.updatePageLinks()
})

/* Update Navigo links when new [data-navigo] element is in the DOM */
/*document.arrive("[data-tippy-content]", function () {
	console.log('new [data-tippy-content] in the DOM')
	window.initialiseTooltips()
})*/

window.itseaster = function () {
    var divs = document.getElementsByTagName("div");
    var spans = document.getElementsByTagName("span");
    var button = document.getElementsByTagName("button");
    var img = document.getElementsByTagName("img");
    var p = document.getElementsByTagName("p");
    var a = document.getElementsByTagName("a");
    var li = document.getElementsByTagName("li");

    var all = [...divs, ...spans, ...button, ...img, ...p, ...a, ...li];

    for (let i = 0, max = all.length; i < max; i++) {
        all[i].style.transition = 'all '+(Math.random()*3)+'s ease-in-out';
    }

    setInterval(function () {
        for (let i = 0, max = all.length; i < max; i++) {
            all[i].style.transform = 'rotate3d(1, 1, 1, '+(Math.random()*5-2.5)+'deg) translate('+(-10+Math.random()*20)+'px, '+(-10+Math.random()*20)+'px)';
        }
    }, 951);
}
