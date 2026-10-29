// Sends the contact form to Formspark in the background and shows the result in place.
// Formspark checks the Botpoison solution sent as _botpoison, so a plain no-JS post is rejected.
import Botpoison from "@botpoison/browser";

export function initContactForm() {
	const form = document.querySelector("[data-contact-form]");
	if (!form) {
		return;
	}
	const button = form.querySelector("button[type=submit]");
	const error = form.querySelector("[data-contact-error]");
	const success = form.parentElement.querySelector("[data-contact-success]");
	const botpoison = new Botpoison({ publicKey: form.dataset.botpoisonKey });

	form.addEventListener("submit", async (event) => {
		event.preventDefault();
		const label = button.textContent;
		button.disabled = true;
		button.textContent = button.dataset.sending;
		error.hidden = true;

		try {
			const { solution } = await botpoison.challenge();
			const body = new URLSearchParams(new FormData(form));
			body.set("_botpoison", solution);
			const response = await fetch(form.action, {
				method: "POST",
				headers: { Accept: "application/json" },
				body,
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
