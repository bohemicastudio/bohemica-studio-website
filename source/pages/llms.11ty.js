// /llms.txt - a plain-text summary of the studio for AI assistants and agents (https://llmstxt.org)

const stripTags = (html) => html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ");

export const data = {
	permalink: "/llms.txt",
	layout: false,
	eleventyExcludeFromCollections: true,
};

export function render({ i18n, site, routes, projects }) {
	const en = i18n.en;
	const url = (path) => new URL(path, site.url).href;
	const list = (items) => items.map((item) => `- ${item}`).join("\n");

	return `# ${site.name}

> ${en.meta.description}

${site.name} is a small remote-first team of full-stack programmers and visual designers with offices in ${site.locations.map((location) => location.name).join(" and ")}, working with clients worldwide in English and Czech.

${list([
	`Website: ${url("/")} (English: ${url(routes.home("en"))}, Czech: ${url(routes.home("cs"))})`,
	`Contact: ${site.email}, or the contact form at ${url(`${routes.home("en")}#contact`)}`,
	`Book a 30-minute call with ${site.callHost.name} (${site.callHost.jobTitle.toLowerCase()}): ${site.scheduleCallUrl}`,
	`LinkedIn: ${site.social.linkedin}`,
	`Source code of this website: ${site.repository}`,
	`Company: ${site.name} is a brand of ${site.company.name} (Company ID ${site.company.id}, ${site.company.street}, ${site.company.postalCode} ${site.company.locality}, Czech Republic)`,
	`Privacy policy: ${url(routes.privacy("en"))}`,
])}

## Services

${list(Object.values(en.specialisation).map((service) => `**${service.title}**: ${service.subtitle} (${service.keywords.join(", ")})`))}

## How we work

${[1, 2, 3].map((step) => `${step}. **${en.processSteps[step].title}** – ${en.processSteps[step].description.join(" ")}`).join("\n")}

## Pricing

${stripTags(en.sectionHowMuch.pricingInfo2).replace(/^Hence, o/, "O")}

${list([
	...en.sectionHowMuch.pricingInfo3,
	`Example proposal for a website (research, design, development, completion): 101–174 hours, 3,960–6,780 GBP/EUR/USD at 30–40 per hour – ${url(routes.project("project-proposal", "en"))}`,
])}

## Technologies

JavaScript, TypeScript, PHP, Laravel, C#, Swift, SwiftUI, Kotlin, Vue, Nuxt, React, Next.js, Node.js, Electron, Ionic, Capacitor, Tailwind CSS, Alpine.js, GSAP, Anime.js, Barba.js, Framer Motion, Spline, Apostrophe CMS (official partner), Strapi, Firebase, WordPress, Figma, Framer, Webflow, Elementor.

## Case studies

${list(
	projects.map((project) => {
		const meta = en.projects.list[project.key];
		return `[${meta.client} – ${meta.type}](${url(routes.project(project.key, "en"))}): ${en.projectPages[project.key].summary} Stack: ${meta.stack}.`;
	}),
)}

## What clients say

${list(Object.values(en.sectionWho.testimonials).map((item) => `"${item.review}" – ${item.company}${item.country ? ` (${item.country})` : ""}`))}

## Optional

${list([
	`[Project library](${url(routes.project("overview", "en"))})`,
	`[Czech version of the website](${url(routes.home("cs"))})`,
	`[Brand assets](${url(routes.project("brand", "en"))})`,
	`[Sitemap](${url("/sitemap.xml")})`,
])}
`;
}
