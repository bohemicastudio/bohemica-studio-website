import Alpine from "alpinejs";

import { animate, easeInQuart, easeOutQuart } from "./motion.js";
import { hideUnderlay, showUnderlay } from "./underlay.js";

const SECTIONS = ["intro", "what", "how", "how-much", "who", "where"];

async function openMobileMenu(ui) {
	ui.mobileMenu = true;
	await Alpine.nextTick();
	const menu = document.getElementById("mobile-menu");
	await animate(menu, [{ transform: "translateY(-100%)" }, { transform: "translateY(0%)" }], { duration: 600, easing: easeOutQuart });
	await showUnderlay(ui);
	menu.querySelector("a, button")?.focus();
}

async function closeMobileMenu(ui) {
	const menu = document.getElementById("mobile-menu");
	await animate(menu, [{ transform: "translateY(0%)" }, { transform: "translateY(-100%)" }], { duration: 400, easing: easeInQuart });
	await hideUnderlay(ui);
	ui.mobileMenu = false;
}

// Links like <a href="#what-intro" data-scroll-to> scroll the section into the middle of the screen.
// The "Why" link switches to the mode where only the five "Why" panels are shown.
function initScrollLinks(ui) {
	document.addEventListener("click", async (event) => {
		const link = event.target.closest("[data-scroll-to]");
		if (!link) {
			return;
		}
		const id = link.getAttribute("href").slice(1);
		const target = document.getElementById(id);
		if (!target) {
			return;
		}
		event.preventDefault();
		if (ui.mobileMenu) {
			closeMobileMenu(ui);
		}
		ui.onlyWhy = link.hasAttribute("data-only-why");
		await Alpine.nextTick();
		target.scrollIntoView({ behavior: "smooth", block: "center" });
	});
}

// Shows the floating "current section" menu once the visitor scrolls past the intro
function initSectionObserver(ui) {
	const elements = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
	if (!elements.length) {
		return;
	}
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) {
					continue;
				}
				if (entry.target.id === "intro" || ui.onlyWhy) {
					ui.sectionClue = false;
				} else {
					ui.sectionInView = entry.target.id;
					ui.sectionClue = true;
				}
			}
		},
		{ rootMargin: "-50% 0% -50% 0%", threshold: 0 },
	);
	elements.forEach((element) => observer.observe(element));
}

// Remember an explicit language choice, so "/" sends the visitor to their language next time
function initLanguageLinks() {
	document.addEventListener("click", (event) => {
		const link = event.target.closest("[data-language]");
		if (link) {
			try {
				localStorage.setItem("language", link.dataset.language);
			} catch {
				// storage unavailable (private mode) - nothing to remember
			}
		}
	});
}

export function initNavigation(ui) {
	ui.openMobileMenu = () => openMobileMenu(ui);
	ui.closeMobileMenu = () => closeMobileMenu(ui);

	initScrollLinks(ui);
	initSectionObserver(ui);
	initLanguageLinks();

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && ui.mobileMenu) {
			closeMobileMenu(ui);
		}
	});
}
