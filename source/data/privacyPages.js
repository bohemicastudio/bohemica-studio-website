import routes from "./routes.js";
import site from "./site.js";

// Privacy policy in every language, used for pagination in pages/privacy.njk
export default site.languages.map(({ code: lang }) => ({ lang, page: "privacy", url: routes.privacy(lang) }));
