const minifiers = require("./transforms/minify")

module.exports = function (config) {

	config.setUseGitIgnore(false)

	// Watch targets
	config.addWatchTarget("./includes/")
	config.addWatchTarget("./temporary/style.css")

	// Pass-through files
	config.addPassthroughCopy({ "./temporary/style.css": "./style.css" })
	config.addPassthroughCopy("./source/langs")

	/*config.addPassthroughCopy({
		"./node_modules/alpinejs/dist/alpine.js": "../script/alpine.js",
	})*/

	// Shortcodes
	config.addShortcode("version", function () {
		return String(Date.now())
	})

	// Transforms
	config.addTransform("minify", minifiers);

	// Base config
	return {
		dir: {
			input: "./source",
			includes: "./includes",
			/*data: "./data",*/
			output: "./build",
		}
	}
}
