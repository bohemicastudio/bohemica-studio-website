let tooltips

function initialiseTooltips() {
	tooltips = [
		tippy('.top-menu [data-tippy-content]', {
			placement: 'bottom',
			arrow: false,
			followCursor: true,
			offset: [0, 32],
			theme: 'bohemica',
			touch: false,
		}),
		tippy('.hero [data-tippy-content]', {
			placement: 'auto',
			arrow: false,
			followCursor: true,
			offset: [0, 24],
			theme: 'bohemica',
			touch: false,
			/*animation: 'scale-subtle',
			inertia: true,
			duration: [100, 150]*/
		})
	]
}
