const extname = require("path").extname;

const htmlmin = require("./htmlmin");
/*const cssmin = require("./cssmin")*/
const jsmin = require("./jsmin");

module.exports = async (content, outputPath) => {
	const ext = extname(outputPath);
	/*console.log('minify', outputPath, ext)*/
	switch (ext) {
		case ".html":
			return htmlmin(content, outputPath);
		/*case ".css":
			console.log(cssmin(content, outputPath))
			return cssmin(content, outputPath);*/
		case ".js":
			return jsmin(content, outputPath);
		default:
			return content;
	}
};
