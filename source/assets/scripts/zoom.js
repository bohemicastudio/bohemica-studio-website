import mediumZoom from "medium-zoom";

let zoom = null;

export function attachZoom(root = document) {
	zoom?.attach(root.querySelectorAll("img[data-zoom]"));
}

export function initZoom() {
	zoom = mediumZoom({ margin: 24, background: "rgba(0, 0, 0, 0.75)", scrollOffset: 0 });
	attachZoom();

	// "Expand" buttons next to a preview open the zoom directly
	document.addEventListener("click", (event) => {
		const button = event.target.closest("[data-zoom-target]");
		const image = button && document.getElementById(button.dataset.zoomTarget);
		if (image) {
			zoom.open({ target: image });
		}
	});
}
