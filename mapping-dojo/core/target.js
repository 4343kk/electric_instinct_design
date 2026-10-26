export function getTargetFromEvent(event) {
  const pinEl = event.target.closest("[data-component][data-pin]");
  if (pinEl) return { type: "pin", id: `${pinEl.dataset.component}.${pinEl.dataset.pin}`, component: pinEl.dataset.component, pin: pinEl.dataset.pin, net: pinEl.dataset.net };

  const compEl = event.target.closest("[data-component]");
  if (compEl) return { type: "component", id: compEl.dataset.component };

  const netEl = event.target.closest("[data-net]");
  if (netEl) return { type: "net", id: netEl.dataset.net };

  return null;
}
