import Alpine from "alpinejs";

import { animate } from "./motion.js";

const element = () => document.getElementById("window-underlay");

export async function showUnderlay(ui) {
	ui.underlay = true;
	await Alpine.nextTick();
	await animate(element(), [{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: "linear" });
}

export async function hideUnderlay(ui) {
	await animate(element(), [{ opacity: 1 }, { opacity: 0 }], { duration: 200, easing: "linear" });
	ui.underlay = false;
}
