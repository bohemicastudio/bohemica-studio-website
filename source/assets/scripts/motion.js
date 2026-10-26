export const easeOutQuart = "cubic-bezier(0.25, 1, 0.5, 1)";
export const easeInQuart = "cubic-bezier(0.5, 0, 0.75, 0)";

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Runs a Web Animation and keeps its final state as inline style, so later animations start from there
export function animate(element, keyframes, options) {
	if (!element) {
		return Promise.resolve();
	}
	const animation = element.animate(keyframes, {
		fill: "forwards",
		...options,
		duration: prefersReducedMotion() ? 0 : options.duration,
		delay: prefersReducedMotion() ? 0 : options.delay || 0,
	});
	return animation.finished.then(() => {
		try {
			animation.commitStyles();
		} catch {
			// element is not rendered (display: none) - nothing to keep
		}
		animation.cancel();
	});
}
