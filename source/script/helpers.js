/* https://stackoverflow.com/a/16270434/11035513 */
function isElementInViewport(el) {
	let rect = el.getBoundingClientRect()

	return rect.bottom > 0 &&
		rect.right > 0 &&
		rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
		rect.top < (window.innerHeight || document.documentElement.clientHeight)
}

/* https://it.knightnet.org.uk/kb/node-js/get-properties/ */
Object.getProperty = function (obj, prop) {
	if (typeof obj !== 'object') throw 'Object.getProperty: obj is not an object'
	if (typeof prop !== 'string') throw 'Object.getProperty: prop is not a string'

	// Replace [] notation with dot notation
	prop = prop.replace(/\[["'`](.*)["'`]\]/g, ".$1")

	return prop.split('.').reduce(function (prev, curr) {
		return prev ? prev[curr] : undefined
	}, obj || self)
}

/* https://stackoverflow.com/a/52652681/11035513 */
function waitFor(conditionFunction) {

	const poll = resolve => {

		if (conditionFunction()) resolve()
		else setTimeout(() => poll(resolve), 50)
	}

	return new Promise(poll)
}

/* https://gist.github.com/nmsdvid/8807205 */
function debounce(func, wait, immediate) {
	let timeout
	return function () {
		let context = this, args = arguments
		clearTimeout(timeout)
		timeout = setTimeout(function () {
			timeout = null
			if (!immediate) func.apply(context, args)
		}, wait)
		if (immediate && !timeout) func.apply(context, args)
	}
}

/*const debounce = (callback, time = 250, interval) => (...args) => clearTimeout(interval, interval = setTimeout(() => callback(...args), time))*/

/*
* Code: https://davidwalsh.name/javascript-debounce-function
* Demo: http://demo.nimius.net/debounce_throttle/
* Throttling will delay executing a function. It will reduce the notifications of an event that fires multiple times.
* Debouncing will bunch a series of sequential calls to a function into a single call to that function. It ensures that one notification is made for an event that fires multiple times.
*/
function debounceThrottle(func, debounceWait, throttleWait, callAtStart, callAtEnd) {
	let debounceTimeout, throttleTimeout

	return function () {
		let context = this, args = arguments

		if (callAtStart && !debounceTimeout) func.apply(context, [].concat(args, 'start'))

		if (!throttleTimeout && throttleWait > 0) {
			throttleTimeout = setInterval(function () {
				func.apply(context, [].concat(args, 'during'))
			}, throttleWait)
		}

		clearTimeout(debounceTimeout)
		debounceTimeout = setTimeout(function () {
			clearTimeout(throttleTimeout)
			throttleTimeout = null
			debounceTimeout = null

			if (callAtEnd) func.apply(context, [].concat(args, 'end'))
		}, debounceWait)
	}
}

/* https://stackoverflow.com/a/9462382/11035513 */
function nFormatter(num, digits) {
	let si = [
		{ value: 1, symbol: "" },
		{ value: 1E3, symbol: "k" },
		{ value: 1E6, symbol: "M" },
		{ value: 1E9, symbol: "G" },
		{ value: 1E12, symbol: "T" },
		{ value: 1E15, symbol: "P" },
		{ value: 1E18, symbol: "E" }
	]
	let rx = '/\.0+$|(\.[0-9]*[1-9])0+$/'
	let i
	for (i = si.length - 1; i > 0; i--) {
		if (Math.abs(num) >= si[i].value) {
			break
		}
	}
	if (i === 0) {
		return num
	}
	else {
		return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol
	}
}
