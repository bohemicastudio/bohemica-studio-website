// schema.org JSON-LD for search engines and AI agents

const KNOWS_ABOUT = [
	"Web application development",
	"Mobile application development",
	"UI/UX design",
	"Branding",
	"Digital signage",
	"Internet of Things",
	"JavaScript",
	"TypeScript",
	"Vue.js",
	"Nuxt",
	"React",
	"Next.js",
	"Node.js",
	"Laravel",
	"PHP",
	"Swift",
	"Kotlin",
	"Tailwind CSS",
	"Strapi",
	"Apostrophe CMS",
	"Figma",
];

const absolute = (site, path) => new URL(path, site.url).href;

export function organization({ site, lang }, t) {
	return {
		"@context": "https://schema.org",
		"@type": "ProfessionalService",
		"@id": `${site.url}/#organization`,
		name: site.name,
		legalName: site.company.name,
		identifier: { "@type": "PropertyValue", propertyID: "IČO", value: site.company.id },
		vatID: site.company.vatId,
		url: absolute(site, `/${lang}/`),
		logo: absolute(site, "/images/brand/logo-full-colour.svg"),
		image: absolute(site, "/og/home.png"),
		description: t.meta.description,
		email: site.email,
		founder: [{ "@type": "Person", name: site.callHost.name, jobTitle: site.callHost.jobTitle }],
		address: site.locations.map((location) => ({
			"@type": "PostalAddress",
			addressLocality: location.locality,
			addressCountry: location.country,
		})),
		areaServed: "Worldwide",
		knowsLanguage: ["en", "cs"],
		knowsAbout: KNOWS_ABOUT,
		sameAs: Object.values(site.social),
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: t.sections.what.title,
			itemListElement: Object.values(t.specialisation).map((service) => ({
				"@type": "Offer",
				itemOffered: { "@type": "Service", name: service.title, description: service.subtitle },
			})),
		},
	};
}

export function website({ site, lang }, t) {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": `${site.url}/#website`,
		name: site.name,
		url: absolute(site, "/"),
		inLanguage: lang,
		description: t.meta.description,
		publisher: { "@id": `${site.url}/#organization` },
	};
}

export function projectStructuredData({ site, entry, routes }, t) {
	const page = t.projectPages[entry.key];
	const meta = t.projects.list[entry.key];
	const url = absolute(site, entry.url);
	const breadcrumbs = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: site.name, item: absolute(site, routes.home(entry.lang)) },
			{ "@type": "ListItem", position: 2, name: t.projects.projectLibrary, item: absolute(site, routes.project("overview", entry.lang)) },
			...(entry.key === "overview" ? [] : [{ "@type": "ListItem", position: 3, name: meta?.client ?? page.title, item: url }]),
		],
	};
	if (!entry.project) {
		return [breadcrumbs];
	}
	return [
		breadcrumbs,
		{
			"@context": "https://schema.org",
			"@type": "CreativeWork",
			name: `${meta.client} – ${meta.type}`,
			description: page.summary,
			url,
			inLanguage: entry.lang,
			image: absolute(site, `/og/${entry.key}.png`),
			...(entry.project.year ? { dateCreated: String(entry.project.year) } : {}),
			keywords: [...meta.categories, ...meta.stack.split(",").map((item) => item.trim())].filter((item) => item && item !== "..."),
			creator: { "@id": `${site.url}/#organization` },
		},
	];
}
