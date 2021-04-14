window.initialiseTooltips = function () {
	window.tooltips = []

	window.tooltips = window.tooltips.concat(
		window.tooltips.concat(
			tippy('.top-menu [data-tippy-content]', {
				placement: 'bottom',
				arrow: false,
				followCursor: false,
				offset: [0, 16],
				theme: 'bohemica',
				touch: false,
			}))
	)

	window.tooltips = window.tooltips.concat(
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
		})
	)
}
