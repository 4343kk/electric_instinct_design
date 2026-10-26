import { recordAnswer, select } from "../core/state.js";
import { getTargetFromEvent } from "../core/target.js";
import { clearHighlight, highlightTarget } from "../core/highlight.js";

export function initReverse({ boardSvg, caseData }) {
  const board = document.querySelector("#reverse-board");
  const panel = document.querySelector("#reverse-panel");
  board.innerHTML = boardSvg;
  board.classList.add("hide-labels"); // 核心：隐藏丝印

  const targets = new Map(caseData.reverse.targets.map(t => [t.id, t]));
  const solved = new Set();

  const renderStatus = () => {
    panel.innerHTML = `
      <h3>逆向抄板：识别位号</h3>
      <p>丝印已隐藏。点击载体上的元件，根据<b>封装形态</b>与<b>连接网络</b>猜测其位号。</p>
      <ul class="progress">${caseData.reverse.targets.map(t =>
        `<li>${solved.has(t.id) ? "✅" : "・"} ${t.id}</li>`).join("")}</ul>
      <div id="quiz"></div>`;
  };
  renderStatus();

  board.addEventListener("click", e => {
    const t = getTargetFromEvent(e);
    if (!t || t.type !== "component" || solved.has(t.id)) return;

    select(t, "reverse");
    clearHighlight(board); highlightTarget(board, t);

    const quiz = panel.querySelector("#quiz");
    if (!targets.has(t.id)) { quiz.innerHTML = "<p>非目标元件</p>"; return; }

    const data = targets.get(t.id);
    quiz.innerHTML = `
      <h4>该元件最可能是哪个位号？</h4>
      <div class="opts">${data.options.map(o => `<button class="opt" data-ans="${o}">${o}</button>`).join("")}</div>
      <div id="fb" class="feedback"></div>
    `;
    quiz.querySelectorAll(".opt").forEach(btn => btn.onclick = () => check(btn.dataset.ans, t.id, data));
  });

  function check(ans, id, data) {
    const correct = ans === id;
    recordAnswer({ module: "reverse", target: id, ans, correct });
    const el = board.querySelector(`[data-component="${id}"]`);
    const fb = panel.querySelector("#fb");

    if (correct) {
      solved.add(id); el.classList.add("is-correct");
      fb.className = "feedback success"; fb.innerHTML = `正确！(提示: ${data.hint})`;
      // 更新进度列表
      panel.querySelectorAll(".progress li").forEach(li => {
        const key = li.textContent.replace(/^[^A-Za-z0-9]*/, "").trim();
        if (solved.has(key)) li.textContent = `✅ ${key}`;
      });
      if (solved.size === targets.size) fb.innerHTML += "<br><b>全部识别完成！</b>";
    } else {
      el.classList.add("is-wrong"); setTimeout(() => el.classList.remove("is-wrong"), 800);
      fb.className = "feedback error"; fb.textContent = "错误，请观察封装形态与连接网络。";
    }
  }
}
