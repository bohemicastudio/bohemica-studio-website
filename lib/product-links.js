// Links to our own products carry utm_source, so the products' analytics show visits that came from this website.
// Applied to the generated HTML, so it covers links from templates, data files and translations alike.

const PRODUCT_HOSTS = ["bohemicasignage.com", "amphi.cc", "wotm.cc"];
const UTM_SOURCE = "bohemicastudio.com";

const hrefPattern = /\bhref=(["'])(https?:\/\/[^"']+)\1/g;

function isProduct(url) {
	return PRODUCT_HOSTS.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`));
}

export function tagProductLinks(html) {
	return html.replace(hrefPattern, (match, quote, href) => {
		let url;
		try {
			url = new URL(href.replaceAll("&amp;", "&"));
		} catch {
			return match;
		}
		if (!isProduct(url) || url.searchParams.has("utm_source")) {
			return match;
		}
		url.searchParams.set("utm_source", UTM_SOURCE);
		return `href=${quote}${url.href.replaceAll("&", "&amp;")}${quote}`;
	});
}
