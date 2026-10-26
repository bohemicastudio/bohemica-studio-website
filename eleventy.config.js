import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { minify } from "html-minifier-terser";

import { buildAssets, assetPath } from "./lib/assets.js";
import { buildOgImages } from "./lib/og-images.js";
import { tagProductLinks } from "./lib/product-links.js";

const isProduction = process.env.ELEVENTY_RUN_MODE === "build";

export default function (config) {
	// Compile CSS (Tailwind) + JS (esbuild) and OG images before every build
	config.on("eleventy.before", async ({ directories }) => {
		await buildAssets({ outputDir: directories.output, minify: isProduction });
		await buildOgImages({ outputDir: directories.output });
	});

	config.addWatchTarget("./source/assets/");
	config.addWatchTarget("./lib/");

	// Responsive images: every local raster <img> becomes <picture> with AVIF/WebP, width/height and lazy loading
	config.addPlugin(eleventyImageTransformPlugin, {
		formats: ["avif", "webp", "auto"],
		widths: ["auto"],
		urlPath: "/img/",
		outputDir: "./build/img/",
		svgShortCircuit: true,
		sharpWebpOptions: { quality: 82 },
		sharpAvifOptions: { quality: 60 },
		failOnError: false,
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
			},
		},
	});

	// Static files that are not processed by the image pipeline
	config.addPassthroughCopy("source/images/**/*.{svg,ico,mp4,xml}");
	config.addPassthroughCopy("source/images/**/*-poster.jpg");
	config.addPassthroughCopy("source/images/favicon/*.png");
	config.addPassthroughCopy({
		"source/email": "email",
		"source/assets/fonts": "fonts",
		"node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin{,-ext}-wght-normal.woff2": "fonts",
		"node_modules/@fontsource/dm-mono/files/dm-mono-latin{,-ext}-{300,400,500}-normal.woff2": "fonts",
	});
	config.setServerPassthroughCopyBehavior("passthrough");

	// Shortcodes & filters
	config.addShortcode("asset", (name) => assetPath(name));
	config.addFilter("json", (value) => JSON.stringify(value));
	config.addFilter("findBy", (items, property, value) => items.find((item) => item[property] === value));
	config.addFilter("compactNumber", (value) =>
		new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value),
	);
	config.addFilter("absoluteUrl", (path, base) => new URL(path, base).href);

	config.addTransform("product-links", function (content) {
		return (this.page.outputPath || "").endsWith(".html") ? tagProductLinks(content) : content;
	});

	// Minify HTML in production builds
	if (isProduction) {
		config.addTransform("htmlmin", async function (content) {
			if (!(this.page.outputPath || "").endsWith(".html")) {
				return content;
			}
			return minify(content, {
				collapseWhitespace: true,
				conservativeCollapse: true,
				removeComments: true,
				minifyJS: true,
				minifyCSS: false,
				decodeEntities: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
			});
		});
	}

	config.setNunjucksEnvironmentOptions({ throwOnUndefined: false, trimBlocks: true, lstripBlocks: true });

	return {
		dir: {
			input: "source",
			includes: "includes",
			layouts: "includes/layouts",
			data: "data",
			output: "build",
		},
		templateFormats: ["njk", "11ty.js"],
		htmlTemplateEngine: "njk",
	};
}
