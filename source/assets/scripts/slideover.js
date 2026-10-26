import Alpine from "alpinejs";

import { animate, easeInQuart, easeOutQuart } from "./motion.js";
import { hideUnderlay, showUnderlay } from "./underlay.js";
import { attachZoom } from "./zoom.js";

// Project pages are real pages (/en/projects/<slug>/). On the homepage, links to them
// (<a data-project>) open the page content in a slide-over panel instead, keeping the URL in sync.

const parser = new DOMParser();
const cache = new Map();

function fetchProject(url) {
	if (!cache.has(url)) {
		cache.set(
			url,
			fetch(url)
				.then((response) => {
					if (!response.ok) {
						throw new Error(`HTTP ${response.status}`);
					}
					return response.text();
				})
				.then((html) => {
					const doc = parser.parseFromString(html, "text/html");
					return { title: doc.title, content: doc.getElementById("project-content")?.innerHTML ?? "" };
				})
				.catch((error) => {
					cache.delete(url);
					throw error;
				}),
		);
	}
	return cache.get(url);
}

export function initSlideover(ui) {
	const slideover = document.getElementById("slideover");
	if (!slideover) {
		return;
	}
	const scroller = document.getElementById("slideover-scroller");
	const content = document.getElementById("slideover-content");
	const homeUrl = slideover.dataset.homeUrl;
	const homeTitle = document.title;
	let returnFocus = null;
	let busy = Promise.resolve();

	const fadeOutContent = () =>
		Promise.all([
			animate(content, [{ transform: "translateY(0rem)" }, { transform: "translateY(2rem)" }], { duration: 400, easing: easeInQuart }),
			animate(content, [{ opacity: 1 }, { opacity: 0 }], { duration: 300, delay: 100, easing: "linear" }),
		]);

	const fadeInContent = () =>
		Promise.all([
			animate(content, [{ transform: "translateY(-2rem)" }, { transform: "translateY(0rem)" }], { duration: 400, easing: easeOutQuart }),
			animate(content, [{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 100, easing: "linear" }),
		]);

	async function load(url) {
		try {
			const project = await fetchProject(url);
			content.innerHTML = project.content;
			document.title = project.title;
			attachZoom(content);
		} catch {
			// Fall back to a regular page load
			window.location.href = url;
		}
	}

	async function open(url) {
		if (ui.slideover) {
			await fadeOutContent();
			scroller.scrollTo(0, 0);
			await load(url);
			await fadeInContent();
			return;
		}
		returnFocus = document.activeElement;
		const loading = fetchProject(url).catch(() => null);
		ui.slideover = true;
		await Alpine.nextTick();
		await animate(slideover, [{ transform: "translateY(100%)" }, { transform: "translateY(0%)" }], { duration: 600, easing: easeOutQuart });
		showUnderlay(ui);
		scroller.scrollTo(0, 0);
		await loading;
		await load(url);
		scroller.focus({ preventScroll: true });
		await fadeInContent();
	}

	async function close() {
		if (!ui.slideover) {
			return;
		}
		await animate(slideover, [{ transform: "translateY(0%)" }, { transform: "translateY(100%)" }], { duration: 400, easing: easeInQuart });
		ui.slideover = false;
		content.innerHTML = "";
		content.style.opacity = "0";
		document.title = homeTitle;
		await hideUnderlay(ui);
		returnFocus?.focus({ preventScroll: true });
	}

	// Serialise transitions so quick clicks do not overlap animations
	const queue = (task) => (busy = busy.then(task, task));

	document.addEventListener("click", (event) => {
		const link = event.target.closest("a[data-project], a[data-slideover-close]");
		if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
			return;
		}
		event.preventDefault();
		if (link.hasAttribute("data-slideover-close")) {
			// The link may point to a section of the homepage, e.g. the contact form
			const { hash } = new URL(link.href);
			history.pushState({}, "", homeUrl + hash);
			queue(async () => {
				await close();
				const target = hash && document.getElementById(hash.slice(1));
				if (target) {
					target.scrollIntoView({ behavior: "smooth" });
					// Keyboard users continue from the target, not from the link that opened the slide-over
					target.setAttribute("tabindex", "-1");
					target.focus({ preventScroll: true });
				}
			});
			return;
		}
		const url = link.getAttribute("href");
		if (url !== location.pathname) {
			history.pushState({ project: url }, "", url);
		}
		queue(() => open(url));
	});

	window.addEventListener("popstate", () => {
		if (location.pathname === homeUrl || location.pathname === "/") {
			queue(close);
		} else if (document.querySelector(`a[data-project][href="${location.pathname}"]`) || history.state?.project) {
			queue(() => open(location.pathname));
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && ui.slideover) {
			history.pushState({}, "", homeUrl);
			queue(close);
		}
	});
}
