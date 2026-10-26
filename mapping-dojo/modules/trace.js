import { recordAnswer, select } from "../core/state.js";
import { getTargetFromEvent } from "../core/target.js";
import { clearHighlight, highlightTarget } from "../core/highlight.js";

export function initTrace({ boardSvg, caseData }) {
  const board = document.querySelector("#trace-board");
  const panel = document.querySelector("#trace-panel");
  board.innerHTML = boardSvg;
  let step = 0;

  const render = () => {
    panel.innerHTML = `<h3>电源路径追踪</h3><ol>${caseData.trace.steps.map((s, i) =>
      `<li>${i < step ? '✅' : i === step ? '▶' : '・'} ${s.task}</li>`
    ).join("")}</ol><div id="fb" class="feedback"></div>`;
  };
  render();

  board.addEventListener("click", e => {
    const t = getTargetFromEvent(e);
    if (!t || step >= caseData.trace.steps.length) return;

    select(t, "trace");

    const expected = caseData.trace.steps[step].expected;
    const match = (expected.type === t.type) &&
                  (expected.id === t.id || (expected.component === t.component && expected.pin === t.pin));

    recordAnswer({ module: "trace", step, target: t, expected, correct: match });

    if (match) {
      clearHighlight(board); highlightTarget(board, t, "is-correct");
      step++; render();
      if (step === caseData.trace.steps.length) panel.querySelector("#fb").innerHTML = "<b>追踪完成！</b>";
    } else {
      const el = e.target.closest("[data-component], [data-net], [data-pin]");
      el?.classList.add("is-wrong"); setTimeout(() => el?.classList.remove("is-wrong"), 800);
      panel.querySelector("#fb").className = "feedback error";
      panel.querySelector("#fb").textContent = "错误，请寻找符合网络约束的节点。";
    }
  });
}
