const STORAGE_KEY = "godspeed-war-room-v1";

const courseFields = [
  ["sprint", "Sprint finish"],
  ["surge", "Repeated surges"],
  ["bridge", "Bridge/break demand"],
  ["sustained", "Sustained power"],
  ["technical", "Technical handling"],
  ["positioning", "Positioning"],
  ["wind", "Wind exposure"],
  ["climb", "Climbing/punch"],
];

const defaults = {
  raceName: "Hyde Park Blast",
  teamObjective: "protected-sprint",
  raceNotes: "Key-shaped course with early hairpin, long straight, hard left into uphill narrow alley, then downhill recovery road. Long out-and-back straight makes the finish deceptively long.",
  finishCue: "Do not open the sprint from too far out. Be top 8–12 late, carry speed, launch hard from draft when the long sprint becomes winnable.",
  course: { sprint: 5, surge: 4, bridge: 3, sustained: 2, technical: 5, positioning: 5, wind: 3, climb: 3 },
  riders: [
    { id: crypto.randomUUID(), name: "Ken", weight: 171, ftp: 240, p5s: 1150, p15s: 920, p30s: 780, p1m: 500, p5m: 300, freshness: 4, sprintTrait: 5, surgeTrait: 5, bridgeTrait: 3, sustainedTrait: 2, positioning: 4, cornering: 4, raceIq: 4, communication: 3, notes: "Puncheur-sprinter. Protect for finish. Avoid long chase duty." },
    { id: crypto.randomUUID(), name: "Josh", weight: 175, ftp: 285, p5s: 1050, p15s: 850, p30s: 690, p1m: 520, p5m: 390, freshness: 4, sprintTrait: 4, surgeTrait: 4, bridgeTrait: 5, sustainedTrait: 4, positioning: 4, cornering: 4, raceIq: 4, communication: 4, notes: "All-around card. Use for real danger, not early wind control." },
    { id: crypto.randomUUID(), name: "Mitch", weight: 168, ftp: 260, p5s: 980, p15s: 790, p30s: 650, p1m: 500, p5m: 355, freshness: 4, sprintTrait: 3, surgeTrait: 5, bridgeTrait: 4, sustainedTrait: 3, positioning: 3, cornering: 4, raceIq: 3, communication: 3, notes: "Freedom early, discipline late. Cover and counter." },
    { id: crypto.randomUUID(), name: "Zach", weight: 180, ftp: 270, p5s: 900, p15s: 760, p30s: 680, p1m: 510, p5m: 340, freshness: 3, sprintTrait: 3, surgeTrait: 4, bridgeTrait: 3, sustainedTrait: 4, positioning: 5, cornering: 4, raceIq: 4, communication: 4, notes: "Late positioning, leadout, pack shepherd." }
  ]
};

let state = loadState();

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : structuredClone(defaults);
  } catch {
    return structuredClone(defaults);
  }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
const num = (v, fallback = 0) => Number.isFinite(Number(v)) ? Number(v) : fallback;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
function wattsPerKg(watts, weightLb) {
  const kg = num(weightLb) / 2.20462;
  return kg > 0 ? num(watts) / kg : 0;
}
function normalizedPowerScore(value, low, high) {
  if (!value) return 0;
  return clamp(((value - low) / (high - low)) * 5, 0, 5);
}
function riderScores(r) {
  const sprintPower = normalizedPowerScore(wattsPerKg(r.p15s || r.p5s, r.weight), 8, 16);
  const longSprintPower = normalizedPowerScore(wattsPerKg(r.p30s, r.weight), 6, 11);
  const oneMinPower = normalizedPowerScore(wattsPerKg(r.p1m, r.weight), 4.5, 8);
  const fiveMinPower = normalizedPowerScore(wattsPerKg(r.p5m, r.weight), 3.5, 6.5);
  const ftpPower = normalizedPowerScore(wattsPerKg(r.ftp, r.weight), 2.5, 5);
  const fresh = num(r.freshness, 3) / 5;

  return {
    sprint: ((sprintPower * 0.45) + (longSprintPower * 0.25) + (num(r.sprintTrait,3) * 0.2) + (num(r.positioning,3) * 0.1)) * fresh,
    surge: ((oneMinPower * 0.4) + (longSprintPower * 0.25) + (num(r.surgeTrait,3) * 0.25) + (num(r.cornering,3) * 0.1)) * fresh,
    bridge: ((fiveMinPower * 0.35) + (oneMinPower * 0.25) + (ftpPower * 0.15) + (num(r.bridgeTrait,3) * 0.25)) * fresh,
    sustained: ((ftpPower * 0.45) + (fiveMinPower * 0.2) + (num(r.sustainedTrait,3) * 0.25) + (num(r.communication,3) * 0.1)) * fresh,
    shepherd: ((num(r.positioning,3) * 0.35) + (num(r.cornering,3) * 0.25) + (num(r.communication,3) * 0.2) + (num(r.raceIq,3) * 0.2)) * fresh,
    captain: ((num(r.raceIq,3) * 0.45) + (num(r.communication,3) * 0.35) + (num(r.positioning,3) * 0.2)) * fresh
  };
}
function recommendRole(r) {
  const s = riderScores(r);
  const entries = [
    ["Protected sprinter", s.sprint * (state.course.sprint / 5) + s.shepherd * .15],
    ["Bridge / break card", s.bridge * (state.course.bridge / 5) + s.surge * .2],
    ["Leadout / pack shepherd", s.shepherd * (state.course.positioning / 5) + s.surge * .25],
    ["Tempo / chase support", s.sustained * ((state.course.sustained + state.course.wind) / 10) + s.captain * .15],
    ["Early opportunist", s.surge * (state.course.surge / 5) + s.bridge * .25]
  ].sort((a,b) => b[1] - a[1]);
  return { primary: entries[0][0], secondary: entries[1][0], scores: s };
}
function roleAdvice(role, name) {
  const map = {
    "Protected sprinter": `${name} should be preserved for the last decisive acceleration. Keep them out of long chases and avoid asking them to patrol early moves.`,
    "Bridge / break card": `${name} should respond only when the move is real: strong riders, committed teams, or field hesitation.`,
    "Leadout / pack shepherd": `${name} should keep the protected rider out of trouble and spend effort late, not early.`,
    "Tempo / chase support": `${name} can help stabilize pace, close manageable gaps, or keep the team from panic-chasing.`,
    "Early opportunist": `${name} gets freedom early, but should stop gambling once the team commits to the finish plan.`
  };
  return map[role] || `${name} should ride according to the team objective.`;
}

function renderCourseSliders() {
  const wrap = document.getElementById("courseSliders");
  wrap.innerHTML = "";
  courseFields.forEach(([key, label]) => {
    const el = document.createElement("div");
    el.className = "slider-card";
    el.innerHTML = `<header><span>${label}</span><span id="${key}Val">${state.course[key]}</span></header><input type="range" min="1" max="5" value="${state.course[key]}" data-course="${key}" />`;
    wrap.appendChild(el);
  });
}

function renderRiders() {
  const list = document.getElementById("riderList");
  const tpl = document.getElementById("riderTemplate");
  list.innerHTML = "";
  state.riders.forEach((rider) => {
    const node = tpl.content.cloneNode(true);
    const card = node.querySelector(".rider-card");
    card.dataset.id = rider.id;
    node.querySelector(".rider-name").value = rider.name || "";
    node.querySelectorAll(".metric").forEach(input => {
      const key = input.dataset.key;
      if (rider[key] !== undefined) input.value = rider[key];
    });
    list.appendChild(node);
  });
}

function objectiveText() {
  const obj = state.teamObjective;
  if (obj === "protected-sprint") return "Deliver the protected finisher to the final lap with enough freshness and position to win the sprint.";
  if (obj === "selective-break") return "Place the right rider in the right move without dragging the field or wasting the team.";
  if (obj === "chaos") return "Use repeated counters and selective pressure to make other teams chase and create a winning split.";
  return "Survive the decisive pressure, keep options open, and sprint from the best remaining group.";
}

function buildPlan() {
  const riders = state.riders.map(r => ({ ...r, rec: recommendRole(r) }));
  const sortedSprint = [...riders].sort((a,b) => b.rec.scores.sprint - a.rec.scores.sprint);
  const sortedBridge = [...riders].sort((a,b) => b.rec.scores.bridge - a.rec.scores.bridge);
  const sortedShepherd = [...riders].sort((a,b) => b.rec.scores.shepherd - a.rec.scores.shepherd);
  const sprinter = sortedSprint[0];
  const bridge = sortedBridge.find(r => r.id !== sprinter?.id) || sortedBridge[0];
  const shepherd = sortedShepherd.find(r => r.id !== sprinter?.id) || sortedShepherd[0];

  const rows = riders.sort((a,b) => Math.max(...Object.values(b.rec.scores)) - Math.max(...Object.values(a.rec.scores))).map(r => `
    <tr>
      <td><strong>${r.name || "Unnamed"}</strong><div class="small">${r.notes || "No notes"}</div></td>
      <td><span class="badge">${r.rec.primary}</span><div class="small">Secondary: ${r.rec.secondary}</div></td>
      <td>${roleAdvice(r.rec.primary, r.name || "This rider")}</td>
    </tr>`).join("");

  if (!riders.length) return `<div class="empty">Add riders to generate a plan.</div>`;

  return `
    <div class="plan-grid">
      <div class="card">
        <h3>${state.raceName || "Race Plan"}</h3>
        <p><strong>Objective:</strong> ${objectiveText()}</p>
        <p><strong>Course notes:</strong> ${state.raceNotes || "No course notes entered."}</p>
        <p><strong>Finish cue:</strong> ${state.finishCue || "No finish cue entered."}</p>
        <div class="small">Suggested protected finisher: <strong>${sprinter?.name || "TBD"}</strong> · Danger-move card: <strong>${bridge?.name || "TBD"}</strong> · Positioning support: <strong>${shepherd?.name || "TBD"}</strong></div>
      </div>
      <div class="card">
        <h3>Rules of Engagement</h3>
        <ul class="rules-list">
          <li><strong>No wasted hero pulls.</strong><span class="small">Only chase when it protects the plan or covers real danger.</span></li>
          <li><strong>Protect the selected card.</strong><span class="small">Do not ask the sprinter to solve early-race problems.</span></li>
          <li><strong>Use the all-around rider selectively.</strong><span class="small">The best bridge rider moves for decisive threats, not noise.</span></li>
          <li><strong>Spend positioning riders late.</strong><span class="small">Leadout value increases as laps run out.</span></li>
          <li><strong>Have a switch trigger.</strong><span class="small">If Plan A is out of position late, move to the next best card without panic.</span></li>
        </ul>
      </div>
    </div>
    <div class="card" style="margin-top:1rem; overflow:auto;">
      <h3>Role Assignments</h3>
      <table class="role-table"><thead><tr><th>Rider</th><th>Role</th><th>Instruction</th></tr></thead><tbody>${rows}</tbody></table>
    </div>
    <div class="plan-grid" style="margin-top:1rem;">
      <div class="card">
        <h3>Phase Plan</h3>
        <ul class="phase-list">
          <li><strong>Early race</strong><span class="small">Move up with patience. Opportunists may cover early moves. Protected riders conserve.</span></li>
          <li><strong>Middle race</strong><span class="small">Let weak moves dangle. Cover only represented, committed, dangerous moves.</span></li>
          <li><strong>Final 5 laps</strong><span class="small">Stop gambling unless covering danger. Consolidate around the finish plan and move the protected rider into the top 15.</span></li>
          <li><strong>Final lap</strong><span class="small">Position first, sprint second. Enter the decisive section near the front with speed, not panic.</span></li>
        </ul>
      </div>
      <div class="card">
        <h3>If / Then Scenarios</h3>
        <ul class="scenario-list">
          <li><strong>If a dangerous break goes...</strong><span class="small">${bridge?.name || "Bridge card"} covers if the field hesitates. ${sprinter?.name || "Sprinter"} stays protected.</span></li>
          <li><strong>If the field is together late...</strong><span class="small">Commit to ${sprinter?.name || "the sprinter"}; ${shepherd?.name || "positioning support"} helps hold position.</span></li>
          <li><strong>If Plan A misses position...</strong><span class="small">Switch to the next best finisher instead of burning the team rescuing a lost plan.</span></li>
          <li><strong>If a Godspeed rider is up the road...</strong><span class="small">Everyone else sits on unless the move is doomed and a better move is forming.</span></li>
        </ul>
      </div>
    </div>`;
}

function renderPlan() { document.getElementById("planOutput").innerHTML = buildPlan(); }
function renderAll() {
  document.getElementById("raceName").value = state.raceName || "";
  document.getElementById("teamObjective").value = state.teamObjective || "protected-sprint";
  document.getElementById("raceNotes").value = state.raceNotes || "";
  document.getElementById("finishCue").value = state.finishCue || "";
  renderCourseSliders(); renderRiders(); renderPlan(); saveState();
}
function bindEvents() {
  ["raceName","teamObjective","raceNotes","finishCue"].forEach(id => {
    document.getElementById(id).addEventListener("input", e => { state[id] = e.target.value; saveState(); renderPlan(); });
  });
  document.getElementById("courseSliders").addEventListener("input", e => {
    const key = e.target.dataset.course;
    if (!key) return;
    state.course[key] = num(e.target.value, 3);
    document.getElementById(`${key}Val`).textContent = state.course[key];
    saveState(); renderPlan();
  });
  document.getElementById("addRiderBtn").addEventListener("click", () => {
    state.riders.push({ id: crypto.randomUUID(), name: "", weight: 170, ftp: 240, p5s: 900, p15s: 750, p30s: 600, p1m: 450, p5m: 300, freshness: 3, sprintTrait: 3, surgeTrait: 3, bridgeTrait: 3, sustainedTrait: 3, positioning: 3, cornering: 3, raceIq: 3, communication: 3, notes: "" });
    renderAll();
  });
  document.getElementById("riderList").addEventListener("input", e => {
    const card = e.target.closest(".rider-card");
    if (!card) return;
    const rider = state.riders.find(r => r.id === card.dataset.id);
    if (!rider) return;
    if (e.target.classList.contains("rider-name")) rider.name = e.target.value;
    if (e.target.classList.contains("metric")) {
      const key = e.target.dataset.key;
      rider[key] = e.target.type === "number" || e.target.type === "range" || e.target.tagName === "SELECT" ? num(e.target.value, 0) : e.target.value;
    }
    saveState(); renderPlan();
  });
  document.getElementById("riderList").addEventListener("click", e => {
    if (!e.target.classList.contains("remove-rider")) return;
    const id = e.target.closest(".rider-card").dataset.id;
    state.riders = state.riders.filter(r => r.id !== id);
    renderAll();
  });
  document.getElementById("resetBtn").addEventListener("click", () => {
    if (confirm("Reset to demo data?")) { state = structuredClone(defaults); renderAll(); }
  });
  document.getElementById("printBtn").addEventListener("click", () => window.print());
  document.getElementById("exportBtn").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${(state.raceName || "godspeed-plan").toLowerCase().replace(/[^a-z0-9]+/g,"-")}.json`;
    a.click(); URL.revokeObjectURL(url);
  });
  document.getElementById("importFile").addEventListener("change", async e => {
    const file = e.target.files?.[0]; if (!file) return;
    try { state = JSON.parse(await file.text()); renderAll(); }
    catch { alert("Could not import that JSON file."); }
    e.target.value = "";
  });
}

bindEvents();
renderAll();
