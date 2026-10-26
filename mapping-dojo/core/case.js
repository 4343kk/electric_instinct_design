export async function loadCase(caseId) {
  const res = await fetch(`./cases/${caseId}/case.json`);
  if (!res.ok) throw new Error(`Failed to load case ${caseId}: ${res.status}`);
  return res.json();
}

export async function loadAsset(caseId, fileName) {
  const res = await fetch(`./cases/${caseId}/${fileName}`);
  if (!res.ok) throw new Error(`Failed to load asset ${fileName}: ${res.status}`);
  return res.text();
}
