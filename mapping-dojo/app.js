import { loadCase, loadAsset } from "./core/case.js";
import { initDual } from "./modules/dual.js";
import { initReverse } from "./modules/reverse.js";
import { initTrace } from "./modules/trace.js";

const data = await loadCase("ldo-basic");
const schSvg = await loadAsset("ldo-basic", data.assets.schematic);
const brdSvg = await loadAsset("ldo-basic", data.assets.board);

initDual({ schematicSvg: schSvg, boardSvg: brdSvg });
initReverse({ boardSvg: brdSvg, caseData: data });
initTrace({ boardSvg: brdSvg, caseData: data });

document.querySelectorAll(".tab").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".view").forEach(v => v.hidden = true);
    document.querySelector(`#module-${btn.dataset.module}`).hidden = false;
  };
});
