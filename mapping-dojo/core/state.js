export const state = { caseId: "ldo-basic", module: "dual", selection: null, answers: [] };

export function select(target, source = "unknown") {
  state.selection = target;
  state.module = source;
  document.dispatchEvent(new CustomEvent("selection:changed", { detail: { target, source } }));
}

export function recordAnswer(entry) {
  state.answers.push({ caseId: state.caseId, ts: Date.now(), ...entry });
}
