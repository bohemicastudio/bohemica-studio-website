import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import Fetch from "@11ty/eleventy-fetch";

// Open-source projects this website is built with (shown in the "repos" section).
// Fetched at build time and cached for a day, so visitors never hit the GitHub API rate limit.
// If GitHub cannot be reached (e.g. rate-limited without GITHUB_TOKEN), the last snapshot is used.
// Refresh the snapshot with `pnpm repos:snapshot`.
export const REPOSITORIES = [
	"11ty/eleventy",
	"alpinejs/alpine",
	"tailwindlabs/tailwindcss",
	"11ty/eleventy-img",
	"francoischalifour/medium-zoom",
	"evanw/esbuild",
];

const SNAPSHOT = new URL("./repos-snapshot.json", import.meta.url);

function readSnapshot() {
	try {
		return JSON.parse(readFileSync(SNAPSHOT, "utf8"));
	} catch {
		return [];
	}
}

async function fetchRepository(name) {
	const data = await Fetch(`https://api.github.com/repos/${name}`, {
		duration: "1d",
		type: "json",
		fetchOptions: {
			headers: {
				"User-Agent": "bohemica-studio-website",
				...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
			},
		},
	});
	return {
		id: name, // as requested - GitHub follows renames, so `owner/name` may differ
		name: data.name,
		owner: data.owner.login,
		avatar: `${data.owner.avatar_url}${data.owner.avatar_url.includes("?") ? "&" : "?"}s=128`,
		url: data.html_url,
		description: data.description,
		language: data.language,
		stars: data.stargazers_count,
		forks: data.forks_count,
	};
}

export async function getRepositories() {
	const snapshot = readSnapshot();
	const repositories = await Promise.all(
		REPOSITORIES.map(async (name) => {
			try {
				return await fetchRepository(name);
			} catch (error) {
				const fallback = snapshot.find((repository) => repository.id === name);
				console.warn(`[repos] Could not fetch ${name} (${error.message})${fallback ? ", using the snapshot" : ""}`);
				return fallback ?? null;
			}
		}),
	);
	return repositories.filter(Boolean);
}

// Run directly (`pnpm repos:snapshot`) to refresh the snapshot
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	const repositories = await getRepositories();
	writeFileSync(SNAPSHOT, `${JSON.stringify(repositories, null, "\t")}\n`);
	console.log(`[repos] Saved ${repositories.length} repositories to lib/repos-snapshot.json`);
}
