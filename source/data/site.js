import { execSync } from "node:child_process";

function lastCommitDate() {
	try {
		return new Date(execSync("git log -1 --format=%cI", { encoding: "utf8" }).trim());
	} catch {
		return new Date();
	}
}

const updated = lastCommitDate();

export default {
	name: "Bohemica Studio",
	url: process.env.SITE_URL || "https://www.bohemicastudio.com",
	email: "team@bohemicastudio.com",
	// Bohemica Studio is a brand of this company
	company: {
		name: "Poweron s.r.o.",
		id: "06205712",
		idFormatted: "062 05 712",
		vatId: "CZ06205712",
		street: "Palachova 504/7",
		postalCode: "460 01",
		locality: "Liberec",
		country: "CZ",
		register: "C 39873/KSUL",
	},
	repository: "https://github.com/bohemicastudio/bohemica-studio-website",
	scheduleCallUrl: "https://calendly.com/jakub-bohemicastudio/30min",
	// Who takes the booked calls
	callHost: { name: "Jakub Miřejovský", jobTitle: "Co-founder" },
	// Formspark endpoint of the contact form
	contactFormUrl: "https://submit-form.com/GH6F1WYC5",
	// Botpoison public key, the spam protection Formspark checks on the contact form
	botpoisonPublicKey: "pk_d861614c-5514-4cc4-835e-6fa7888c652c",
	signageUrl: "https://www.bohemicasignage.com/",
	social: {
		linkedin: "https://linkedin.com/company/bohemicastudio",
		github: "https://github.com/bohemicastudio",
	},
	locations: [
		{ locality: "Prague", country: "CZ", name: "Prague (Czech Republic)" },
		{ locality: "Manchester", country: "GB", name: "Manchester (United Kingdom)" },
	],
	languages: [
		{ code: "en", name: "English", hreflang: "en", ogLocale: "en_GB" },
		{ code: "cs", name: "Čeština", hreflang: "cs", ogLocale: "cs_CZ" },
	],
	updated: updated.toISOString(),
	updatedLabel: updated.toISOString().slice(0, 19).replace("T", " "),
	year: new Date().getFullYear(),
	// security.txt must expire (RFC 9116); every deploy pushes it a year ahead
	securityTxtExpires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
};
