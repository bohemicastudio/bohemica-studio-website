// Sends the contact form to Formspark in the background and shows the result in place.
// Without JavaScript the form still posts normally and Formspark redirects to /thanks/.

export function initContactForm() {
	const form = document.querySelector("[data-contact-form]");
	if (!form) {
		return;
	}
	const button = form.querySelector("button[type=submit]");
	const error = form.querySelector("[data-contact-error]");
	const success = form.parentElement.querySelector("[data-contact-success]");

	form.addEventListener("submit", async (event) => {
		event.preventDefault();
		const label = button.textContent;
		button.disabled = true;
		button.textContent = button.dataset.sending;
		error.hidden = true;

		try {
			const response = await fetch(form.action, {
				method: "POST",
				headers: { Accept: "application/json" },
				body: new URLSearchParams(new FormData(form)),
			});
			if (!response.ok) {
				throw new Error(`HTTP ${response.status}`);
			}
			form.hidden = true;
			success.hidden = false;
			success.focus();
			window.sa_event?.("contact_form_submit");
		} catch (reason) {
			console.warn("[contact form] Could not send the message:", reason);
			error.hidden = false;
		} finally {
			button.disabled = false;
			button.textContent = label;
		}
	});
}
