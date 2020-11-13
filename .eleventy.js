const minifiers = require("./transforms/minify")

module.exports = function (eleventyConfig) {

	eleventyConfig.setUseGitIgnore(false)

	eleventyConfig.addWatchTarget("./includes/")

	eleventyConfig.addWatchTarget("./temporary/style.css")

	eleventyConfig.addPassthroughCopy({ "./temporary/style.css": "./style.css" })

	/*eleventyConfig.addPassthroughCopy({
		"./node_modules/alpinejs/dist/alpine.js": "../script/alpine.js",
	})*/

	eleventyConfig.addShortcode("version", function () {
		return String(Date.now())
	})

	eleventyConfig.addTransform("minify", minifiers);

	return {
		dir: {
			input: "./source",
			includes: "./includes",
			output: "./build",
		}
	}
}
