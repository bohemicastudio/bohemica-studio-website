/* https://stackoverflow.com/a/16270434/11035513 */
function isElementInViewport(el) {
	var rect = el.getBoundingClientRect();

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
