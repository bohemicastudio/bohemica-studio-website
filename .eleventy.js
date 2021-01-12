const minifiers = require("./transforms/minify")
const moment = require("moment")
const historyFallback = require("connect-history-api-fallback")

module.exports = function (config) {

	// Merge data instead of overriding
	config.setDataDeepMerge(true);

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

	/* TODO support for responsive images https://github.com/11ty/eleventy-img
	* https://mahmoudashraf.dev/blog/how-to-optimize-and-lazyloading-images-on-eleventy/
	* */

	/*// Copy Image Folder to /_site
	  eleventyConfig.addPassthroughCopy("./src/static/img");*/

	config.setUseGitIgnore(false)

	// Watch targets
	config.addWatchTarget("./temporary/style.css")
	config.addWatchTarget("./source")

	// Pass-through files
	config.addPassthroughCopy({ "./temporary/style.css": "./style.css" })
	config.addPassthroughCopy("./source/images")

	// Pass-through files from node_modules
	config.addPassthroughCopy("./source/langs") // TODO Keep or delete?

	// Shortcodes
	config.addShortcode("version", function () {
		return String(Date.now())
	})

	// Filters
	config.addNunjucksFilter("date", function (date, format, locale) {
		locale = locale ? locale : "en";
		moment.locale(locale);
		return moment(date).format(format);
	});

	// Transforms
	config.addTransform("minify", minifiers);

	// Base config
	return {
		dir: {
			input: "./source",
			includes: "./includes",
			/*data: "./data",*/
			output: "./build",
		},
	}
}
