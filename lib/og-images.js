import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

import projects from "../source/data/projects.js";

const WIDTH = 1200;
const HEIGHT = 630;
const BACKGROUND = "#f1f5f9"; // blue-gray-100

async function homeImage(file) {
	const logo = await sharp("source/images/brand/logo-full-colour.svg", { density: 300 })
		.resize({ width: 640 })
		.toBuffer();
	await sharp("source/images/warp-background.png")
		.resize(WIDTH, HEIGHT, { fit: "cover" })
		.composite([{ input: logo, gravity: "center" }])
		.png()
		.toFile(file);
}

// A photo fills the whole image
async function coverImage(source, file) {
	await sharp(source).resize({ width: WIDTH, height: HEIGHT, fit: "cover" }).png().toFile(file);
}

async function projectImage(source, file) {
	const preview = await sharp(source)
		.resize({ width: WIDTH - 120, height: HEIGHT - 80, fit: "inside" })
		.toBuffer();
	await sharp({ create: { width: WIDTH, height: HEIGHT, channels: 4, background: BACKGROUND } })
		.composite([{ input: preview, gravity: "center" }])
		.png()
		.toFile(file);
}

// Social preview images (og:image) - generated once, kept between builds
export async function buildOgImages({ outputDir }) {
	const dir = path.join(outputDir, "og");
	await mkdir(dir, { recursive: true });

	const jobs = [];
	const home = path.join(dir, "home.png");
	if (!existsSync(home)) {
		jobs.push(homeImage(home));
	}
	for (const project of projects) {
		const file = path.join(dir, `${project.key}.png`);
		if (existsSync(file)) {
			continue;
		}
		const preview = `source/images/project/${project.key}/preview-3d.png`;
		if (existsSync(preview)) {
			jobs.push(projectImage(preview, file));
		} else if (project.cover) {
			jobs.push(coverImage(`source/images/project/${project.key}/${project.cover}`, file));
		}
	}
	await Promise.all(jobs);
}
