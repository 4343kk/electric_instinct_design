import { select } from "../core/state.js";
import { getTargetFromEvent } from "../core/target.js";
import { clearHighlight, highlightTarget } from "../core/highlight.js";

export function initDual({ schematicSvg, boardSvg }) {
  const schView = document.querySelector("#schematic-view");
  const brdView = document.querySelector("#board-view");
  schView.innerHTML = schematicSvg;
  brdView.innerHTML = boardSvg;

  const bind = (root) => root.addEventListener("click", e => {
    const t = getTargetFromEvent(e);
    if (t) select(t, "dual");
  });
  bind(schView); bind(brdView);

  document.addEventListener("selection:changed", ({ detail: { target, source } }) => {
    if (source !== "dual") return;
    clearHighlight(schView); clearHighlight(brdView);
    highlightTarget(schView, target); highlightTarget(brdView, target);
  });
}
