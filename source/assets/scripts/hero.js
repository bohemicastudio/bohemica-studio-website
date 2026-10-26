import { animate, easeOutQuart, prefersReducedMotion } from "./motion.js";

// Hands in the hero: they fade + rotate in once loaded, then follow the scroll position (parallax).
// Each <img data-hand> carries its own values, e.g.
//   data-enter="400,1200,4,-12"   -> delay, duration, rotate from, rotate to
//   data-parallax="12.5vh,17.5vh,-12,-24" -> translateY from/to, rotate from/to (over the scroll range)

function parseHand(element) {
	const [delay, duration, rotateFrom, rotateTo] = element.dataset.enter.split(",").map(Number);
	const [yFrom, yTo, parallaxRotateFrom, parallaxRotateTo] = element.dataset.parallax.split(",");
	return {
		element,
		x: element.dataset.x || "0",
		enter: { delay, duration, rotateFrom, rotateTo },
		parallax: {
			y: [parseFloat(yFrom), parseFloat(yTo)],
			unit: yFrom.replace(/[-\d.]/g, ""),
			rotate: [Number(parallaxRotateFrom), Number(parallaxRotateTo)],
		},
		progress: 0,
		target: 0,
		frame: null,
	};
}

function whenLoaded(image) {
	if (image.complete && image.naturalWidth) {
		return Promise.resolve();
	}
	return new Promise((resolve) => {
		image.addEventListener("load", resolve, { once: true });
		image.addEventListener("error", resolve, { once: true });
	});
}

function isVisible(element) {
	return element.offsetParent !== null;
}

function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	return rect.bottom > 0 && rect.right > 0 && rect.left < window.innerWidth && rect.top < window.innerHeight;
}

function render(hand) {
	const { y, unit, rotate } = hand.parallax;
	const t = hand.progress;
	hand.element.style.translate = `${hand.x} ${y[0] + (y[1] - y[0]) * t}${unit}`;
	hand.element.style.rotate = `${rotate[0] + (rotate[1] - rotate[0]) * t}deg`;
}

// Scroll progress of the element: 0 when it starts leaving its initial position, 1 when it has left the viewport
function scrollTarget(element) {
	const windowHeight = window.innerHeight;
	const scrollTop = window.scrollY;
	const rect = element.getBoundingClientRect();
	const topAbsolute = rect.top + scrollTop;
	if (topAbsolute < windowHeight) {
		return Math.max((windowHeight - rect.top - (windowHeight - topAbsolute)) / (windowHeight + rect.height - (windowHeight - topAbsolute)), 0);
	}
	return Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0);
}

function startParallax(hands) {
	const step = (hand) => {
		hand.progress += (hand.target - hand.progress) * 0.06;
		render(hand);
		if (Math.abs(hand.target - hand.progress) > 0.006 && isInViewport(hand.element)) {
			hand.frame = requestAnimationFrame(() => step(hand));
		} else {
			hand.frame = null;
		}
	};

	const onScroll = () => {
		for (const hand of hands) {
			if (!hand.entered || !isVisible(hand.element) || !isInViewport(hand.element)) {
				continue;
			}
			hand.target = scrollTarget(hand.element);
			if (hand.frame === null) {
				hand.frame = requestAnimationFrame(() => step(hand));
			}
		}
	};

	window.addEventListener("scroll", onScroll, { passive: true });
}

export function initHero() {
	const hands = [...document.querySelectorAll("[data-hand]")].map(parseHand);
	if (!hands.length) {
		return;
	}

	const enter = async (hand) => {
		const { element, enter, parallax, x } = hand;
		element.style.translate = `${x} ${parallax.y[0]}${parallax.unit}`;
		await whenLoaded(element);
		await Promise.all([
			animate(element, [{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: enter.delay, easing: "linear" }),
			animate(element, [{ rotate: `${enter.rotateFrom}deg` }, { rotate: `${enter.rotateTo}deg` }], {
				duration: enter.duration,
				delay: enter.delay,
				easing: easeOutQuart,
			}),
		]);
		hand.entered = true;
	};

	// Each breakpoint has its own set of hands; only the displayed set loads (lazy) and animates.
	// The observer also covers hands that become visible later, e.g. after resizing the window.
	const observer = new IntersectionObserver((entries) => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				observer.unobserve(entry.target);
				enter(hands.find((hand) => hand.element === entry.target));
			}
		}
	});
	hands.forEach((hand) => observer.observe(hand.element));

	if (!prefersReducedMotion()) {
		startParallax(hands);
	}
}
