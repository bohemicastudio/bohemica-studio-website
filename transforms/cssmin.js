const postcss = require("postcss")
const tailwindcss = require("tailwindcss")
const autoprefixer = require("autoprefixer")
const cleancss = require("clean-css")

module.exports = async (content, outputPath) => {
	console.log('content:', content)
	const processed = await postcss([tailwindcss, autoprefixer]).process(content, { from: undefined })
	/*console.log('processed:', processed)*/
	const minified = await new cleancss({ returnPromise: true }).minify(processed.css)

	/*new cleancss({ returnPromise: true })
		.minify(processed.css)
		.then(function (minified) {
			console.log(minified)
			return minified.styles
		})*/

	/*console.log('minified', minified)*/
	return minified.styles
}
