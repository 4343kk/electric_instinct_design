export function clearHighlight(root) {
  root.querySelectorAll(".is-selected, .is-correct, .is-wrong").forEach(el => el.classList.remove("is-selected", "is-correct", "is-wrong"));
}

export function targetSelector(target) {
  if (!target) return null;
  if (target.type === "component") return `[data-component="${CSS.escape(target.id)}"]`;
  if (target.type === "net") return `[data-net="${CSS.escape(target.id)}"]`;
  if (target.type === "pin") return `[data-component="${CSS.escape(target.component)}"][data-pin="${CSS.escape(target.pin)}"]`;
  return null;
}

export function highlightTarget(root, target, className = "is-selected") {
  const selector = targetSelector(target);
  if (selector) root.querySelectorAll(selector).forEach(el => el.classList.add(className));
}
