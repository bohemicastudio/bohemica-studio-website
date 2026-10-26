import projects from "./projects.js";

const segment = { en: "projects", cs: "projekty" };
const privacySlug = { en: "privacy", cs: "ochrana-osobnich-udaju" };

// Project-library pages that are not case studies
const pages = {
	overview: { en: "overview", cs: "prehled" },
	brand: { en: "bohemica-brand", cs: "bohemica-brand" },
	"project-proposal": { en: "proposal-example", cs: "nabidka-priklad" },
};

function projectSlug(key, lang) {
	const slugs = pages[key] || projects.find((project) => project.key === key)?.slug;
	if (!slugs) {
		throw new Error(`Unknown project "${key}"`);
	}
	return slugs[lang];
}

export default {
	home: (lang) => `/${lang}/`,
	project: (key, lang) => `/${lang}/${segment[lang]}/${projectSlug(key, lang)}/`,
	privacy: (lang) => `/${lang}/${privacySlug[lang]}/`,
	pageKeys: Object.keys(pages),
};
