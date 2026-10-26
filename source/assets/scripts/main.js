import Alpine from "alpinejs";

import { initHero } from "./hero.js";
import { initNavigation } from "./navigation.js";
import { initSlideover } from "./slideover.js";
import { initZoom } from "./zoom.js";
import { initContactForm } from "./contact-form.js";
import { initEasterEgg } from "./easter-egg.js";

Alpine.store("ui", {
	onlyWhy: false, // "Why" mode shows only the five "Why" panels
	sectionInView: "",
	sectionClue: false,
	mobileMenu: false,
	slideover: false,
	underlay: false,
});

window.Alpine = Alpine;
Alpine.start();

initHero();
initNavigation(Alpine.store("ui"));
initSlideover(Alpine.store("ui"));
initZoom();
initContactForm();
initEasterEgg();

console.log("%cWelcome to the virtual home of Bohemica Studio! 🌐", "color: rgb(96, 165, 250); font-weight: bold;");
