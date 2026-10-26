import { organization, projectStructuredData, website } from "../../lib/structured-data.js";

// Shared computed data for paginated pages. Each page paginates over entries that carry `lang`
// (plus `key` for project pages, or `page` for other pages such as the privacy policy), aliased as `entry`.
export default {
	layout: "base.njk",
	eleventyComputed: {
		pageTitle: (data) => {
			const { entry } = data;
			if (!entry) {
				return data.pageTitle;
			}
			const t = data.i18n[entry.lang];
			if (entry.page) {
				return `${t[entry.page].title} | ${data.site.name}`;
			}
			if (!entry.key) {
				return t.meta.title;
			}
			const meta = t.projects.list[entry.key];
			return `${meta ? `${meta.client} – ${meta.type}` : t.projectPages[entry.key].title} | ${data.site.name}`;
		},
		pageDescription: (data) => {
			const { entry } = data;
			if (!entry) {
				return data.pageDescription;
			}
			const t = data.i18n[entry.lang];
			if (entry.page) {
				return t[entry.page].summary;
			}
			return entry.key ? t.projectPages[entry.key].summary : t.meta.description;
		},
		canonicalPath: (data) => {
			const { entry } = data;
			if (!entry) {
				return data.canonicalPath;
			}
			return entry.key || entry.page ? entry.url : data.routes.home(entry.lang);
		},
		redirectByLanguage: (data) => Boolean(data.entry?.root),
		ogImage: (data) => (data.entry?.project ? `/og/${data.entry.key}.png` : data.ogImage),
		ogType: (data) => (data.entry?.project ? "article" : "website"),
		lang: (data) => data.entry?.lang ?? data.lang ?? "en",
		t: (data) => data.i18n[data.entry?.lang ?? data.lang ?? "en"],
		language: (data) => data.site.languages.find((language) => language.code === (data.entry?.lang ?? data.lang ?? "en")),
		alternates: (data) => {
			if (!data.entry) {
				return [];
			}
			const { key, page } = data.entry;
			const urlFor = (lang) => {
				if (key) {
					return data.routes.project(key, lang);
				}
				return page ? data.routes[page](lang) : data.routes.home(lang);
			};
			return [
				...data.site.languages.map((language) => ({ hreflang: language.hreflang, url: urlFor(language.code) })),
				{ hreflang: "x-default", url: key || page ? urlFor("en") : "/" },
			];
		},
		structuredData: (data) => {
			if (!data.entry || data.entry.page) {
				return null;
			}
			// Eleventy first calls computed data with placeholder values to discover dependencies
			try {
				const t = data.i18n[data.entry.lang];
				if (data.entry.key) {
					return projectStructuredData(data, t);
				}
				return [organization(data, t), website(data, t)];
			} catch {
				return null;
			}
		},
	},
};
