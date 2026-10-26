import projects from "./projects.js";
import routes from "./routes.js";
import site from "./site.js";

// One entry per project page and language, used for pagination in pages/project.njk
export default site.languages.flatMap(({ code: lang }) =>
	[...routes.pageKeys, ...projects.map((project) => project.key)].map((key) => ({
		key,
		lang,
		project: projects.find((project) => project.key === key) || null,
		url: routes.project(key, lang),
	})),
);
