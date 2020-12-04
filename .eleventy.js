const minifiers = require("./transforms/minify")
const historyFallback = require("connect-history-api-fallback")

module.exports = function (config) {

	// BrowserSync config (with SPA routing)
	// https://thomastuts.com/blog/browsersync-spa-routing-pretty-urls.html
	config.setBrowserSyncConfig({
		server: {
			baseDir: './build',
			middleware: [
				historyFallback()
			]
		}
	})

	config.setUseGitIgnore(false)

	// Watch targets
	/*config.addWatchTarget("./includes/")
	config.addWatchTarget("./temporary/style.css")*/
	config.addWatchTarget("./")

	// Pass-through files
	config.addPassthroughCopy({ "./temporary/style.css": "./style.css" })
	config.addPassthroughCopy("./source/langs")

	/* Includes, but without js formatting/minification */
	/*config.addPassthroughCopy({ "./node_modules/@ryangjchandler/spruce/dist/spruce.umd.js": "./script/spruce.js" })
		config.addPassthroughCopy({ "./node_modules/alpinejs/dist/alpine.js": "./script/alpine.js" })
		config.addPassthroughCopy({ "./node_modules/animejs/lib/anime.es.js": "./script/anime.js" })*/

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
