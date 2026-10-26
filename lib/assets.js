import { createHash } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import esbuild from "esbuild";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

const CSS_ENTRY = "source/assets/styles/main.css";
const JS_ENTRY = "source/assets/scripts/main.js";

// name -> public path of the fingerprinted file, e.g. "main.js" -> "/assets/main.3f9a1c2b.js"
const manifest = new Map();

function fingerprint(contents) {
	return createHash("sha256").update(contents).digest("hex").slice(0, 10);
}

async function emit(outputDir, name, contents) {
	const ext = path.extname(name);
	const file = `${path.basename(name, ext)}.${fingerprint(contents)}${ext}`;
	await mkdir(path.join(outputDir, "assets"), { recursive: true });
	await writeFile(path.join(outputDir, "assets", file), contents);
	manifest.set(name, `/assets/${file}`);
}

async function buildCss({ outputDir, minify }) {
	const source = await readFile(CSS_ENTRY, "utf8");
	const result = await postcss([tailwindcss({ optimize: minify ? { minify: true } : false })]).process(source, {
		from: CSS_ENTRY,
	});
	await emit(outputDir, "main.css", result.css);
}

async function buildJs({ outputDir, minify }) {
	const result = await esbuild.build({
		entryPoints: [JS_ENTRY],
		bundle: true,
		format: "esm",
		target: "es2020",
		minify,
		write: false,
		legalComments: "none",
	});
	await emit(outputDir, "main.js", result.outputFiles[0].contents);
}

export async function buildAssets({ outputDir, minify }) {
	await rm(path.join(outputDir, "assets"), { recursive: true, force: true });
	await Promise.all([buildCss({ outputDir, minify }), buildJs({ outputDir, minify })]);
}

export function assetPath(name) {
	if (!manifest.has(name)) {
		throw new Error(`Unknown asset "${name}"`);
	}
	return manifest.get(name);
}
