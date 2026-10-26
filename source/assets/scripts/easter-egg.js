// Click "Drama" in the tools grid to add some drama
function addDrama() {
	const elements = document.querySelectorAll("div, span, button, img, p, a, li");
	elements.forEach((element) => {
		element.style.transition = `all ${Math.random() * 3}s ease-in-out`;
	});
	setInterval(() => {
		elements.forEach((element) => {
			element.style.transform = `rotate3d(1, 1, 1, ${Math.random() * 5 - 2.5}deg) translate(${-10 + Math.random() * 20}px, ${-10 + Math.random() * 20}px)`;
		});
	}, 951);
}

export function initEasterEgg() {
	document.querySelector("[data-easter-egg]")?.addEventListener("click", addDrama, { once: true });
}
