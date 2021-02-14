window.initialiseTooltips = function () {
	window.tooltips = [
		tippy('.top-menu [data-tippy-content]', {
			placement: 'bottom',
			arrow: false,
			followCursor: false,
			offset: [0, 16],
			theme: 'bohemica',
			touch: false,
		}),
		tippy('.hero [data-tippy-content]', {
			placement: 'auto',
			arrow: false,
			followCursor: false,
			offset: [0, 12],
			theme: 'bohemica',
			touch: false,
			/*animation: 'scale-subtle',
			inertia: true,
			duration: [100, 150]*/
		}),
		/*tippy('#what [data-tippy-content]', {
			placement: 'auto',
			arrow: false,
			followCursor: false,
			offset: [0, 24],
			theme: 'bohemica',
			touch: false
		})*/
	]
}
