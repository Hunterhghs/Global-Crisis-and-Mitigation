// Human Century Problem Index (HCPI)
// Coupling-weighted multidimensional index of century-scale problems.
// Scores are illustrative analytical judgments, not empirical measurements.

export type Dimension = "E" | "U" | "L" | "K" | "M" | "D";

export interface DimensionDef {
  code: Dimension;
  name: string;
  question: string;
  weight: number;
}

export const dimensions: DimensionDef[] = [
  { code: "E", name: "Exposure", question: "What share of humanity is hit?", weight: 0.15 },
  { code: "U", name: "Urgency", question: "When does damage peak / lock in?", weight: 0.15 },
  { code: "L", name: "Lock-in", question: "How reversible? (10 = permanent)", weight: 0.1 },
  { code: "K", name: "Coupling", question: "How many other systems does it drag down?", weight: 0.25 },
  { code: "M", name: "Medium", question: "Impact on labor, cognition, health, learning", weight: 0.2 },
  { code: "D", name: "D-gap", question: "Institutional need minus installed stock", weight: 0.15 },
];

export type Tier = "I" | "II" | "III";

export interface Problem {
  id: string;
  rank: number;
  name: string;
  short: string;
  tier: Tier;
  scores: Record<Dimension, number>;
  hcpi: number;
  rationale: string;
}

// Composite: weighted by dimension weights above.
function composite(s: Record<Dimension, number>): number {
  const w = dimensions.reduce((acc, d) => acc + s[d.code] * d.weight, 0);
  return Math.round(w * 10) / 10;
}

const raw: Omit<Problem, "hcpi" | "rank">[] = [
  {
    id: "development-d-trap",
    name: "Development & D trap",
    short: "Adaptation competes with growth; LMIC convergence stalls",
    tier: "I",
    scores: { E: 8, U: 9, L: 8, K: 9, M: 8, D: 10 },
    rationale:
      "Growth and adaptation draw on the same fiscal space. Where absorptive capacity (D) does not compound, inherited cascades — solar, DPI, AI — evaporate into pilots instead of installed stock. The deepest D-gap of any problem.",
  },
  {
    id: "chronic-heat-envelope",
    name: "Chronic heat & humidity envelope",
    short: "Billions face months of functional heat exposure",
    tier: "I",
    scores: { E: 9, U: 8, L: 6, K: 9, M: 9, D: 8 },
    rationale:
      "Tropical and subtropical cities move toward year-round extreme WBGT. The binding loss is functional — outdoor labor hours, cognition, learning — long before physiological wet-bulb limits.",
  },
  {
    id: "grid-power-compute",
    name: "Grid · power · compute thermal",
    short: "Cooling demand, blackouts, throttled compute",
    tier: "I",
    scores: { E: 8, U: 8, L: 7, K: 10, M: 8, D: 8 },
    rationale:
      "The central coupling hub. Heat raises cooling demand while drought cuts hydropower; blackouts remove cooling and compute together. Every other adaptation runs through the grid.",
  },
  {
    id: "institutional-fracture",
    name: "Institutional fracture · conflict",
    short: "War and state failure destroy D overnight",
    tier: "I",
    scores: { E: 5, U: 8, L: 8, K: 10, M: 9, D: 10 },
    rationale:
      "Conflict destroys absorptive capacity, grid, and the human medium faster than climate builds them. Lower exposure share, but maximal coupling and D-gap where it strikes.",
  },
  {
    id: "buffer-allocation",
    name: "Stratified buffer allocation",
    short: "Who gets cooling, filtration, power, relocation",
    tier: "I",
    scores: { E: 9, U: 8, L: 8, K: 8, M: 8, D: 9 },
    rationale:
      "Stratification is the default, not the exception. The mitigable question is who sits inside the buffer zone versus the chronic-risk envelope — allocation, not whether inequality exists.",
  },
  {
    id: "water-drought",
    name: "Water stress · drought · hydrology",
    short: "Aquifer decline, drought, hydropower loss",
    tier: "II",
    scores: { E: 7, U: 8, L: 7, K: 9, M: 7, D: 9 },
    rationale:
      "Water couples to food, power, and health. Hydropower-dependent grids (≈45% of LAC generation) turn drought into fiscal and electricity crises.",
  },
  {
    id: "pm-pollution",
    name: "Ambient PM₂.₅ air pollution",
    short: "Near-universal urban exposure; cognitive tax",
    tier: "II",
    scores: { E: 9, U: 7, L: 5, K: 8, M: 8, D: 7 },
    rationale:
      "~94% of the world breathes air above the WHO PM₂.₅ guideline. More tractable than heat physically, but a persistent cognitive and health tax that suppresses the development climb.",
  },
  {
    id: "aging-heat",
    name: "Demographic aging × heat",
    short: "Aging populations magnify heat mortality",
    tier: "II",
    scores: { E: 7, U: 7, L: 9, K: 7, M: 8, D: 6 },
    rationale:
      "Heat mortality is projected to roughly double by 2050 in some regions even under strong mitigation, driven heavily by aging. A locked-in demographic curve, not just a climate one.",
  },
  {
    id: "ag-food-landuse",
    name: "Agriculture · food · land-use feedback",
    short: "Crop stress, deforestation, regional drying",
    tier: "II",
    scores: { E: 7, U: 7, L: 6, K: 8, M: 7, D: 7 },
    rationale:
      "Land-use change (Amazon savannization, Sahel) can add local heat stress comparable to the climate signal itself. Food affordability in heat zones is a stability variable.",
  },
  {
    id: "wet-bulb-tail",
    name: "Wet-bulb · physiological tail",
    short: "Episodic noncompensable heat in humid belts",
    tier: "II",
    scores: { E: 4, U: 6, L: 9, K: 6, M: 10, D: 7 },
    rationale:
      "Lower exposure share but maximal medium impact for affected populations. Episodic today in the Gulf, South Asia and coastal Central America; seasonal patches by late century on weak paths.",
  },
  {
    id: "materials-complexity",
    name: "Materials · complexity tax",
    short: "Copper, grid metals, mandatory added layers",
    tier: "III",
    scores: { E: 6, U: 7, L: 7, K: 9, M: 5, D: 7 },
    rationale:
      "Each decade of delay adds mandatory layers — grid, storage, cooking, adaptation, finance — at higher commodity prices. An amplifier on every other lever.",
  },
  {
    id: "ai-diffusion",
    name: "AI · diffusion bottleneck",
    short: "Conditional on grid, cooling, institutions",
    tier: "III",
    scores: { E: 5, U: 8, L: 4, K: 8, M: 6, D: 8 },
    rationale:
      "A multiplier when D permits, a distraction when D binds. AI capability is downstream of electrons, cooling and institutions — the bottleneck is deployment, not invention.",
  },
];

export const problems: Problem[] = raw
  .map((p) => ({ ...p, hcpi: composite(p.scores) }))
  .sort((a, b) => b.hcpi - a.hcpi)
  .map((p, i) => ({ ...p, rank: i + 1 }));

export const tierMeta: Record<Tier, { label: string; blurb: string; color: string }> = {
  I: { label: "Tier I — Systemic cores", blurb: "Highest coupling-weighted scores. These problems drag the most systems at once.", color: "var(--signal)" },
  II: { label: "Tier II — Medium eroders", blurb: "Sustained erosion of labor, cognition and health across large populations.", color: "var(--d-amber)" },
  III: { label: "Tier III — Amplifiers", blurb: "Force multipliers and tail risks that scale the cost of the cores.", color: "var(--d-teal)" },
};

export const dimColor: Record<Dimension, string> = {
  E: "#0f2a43",
  U: "#237e8b",
  L: "#6b7a87",
  K: "#b3142b",
  M: "#c2891b",
  D: "#7a4b6b",
};

// extra tail items for context (not scored on full matrix)
export const tailProblems = [
  { name: "Sea-level rise", note: "Slow, largely locked-in", hcpi: 6.0 },
  { name: "Pandemic / biological", note: "Episodic, high variance", hcpi: 5.0 },
  { name: "Nuclear tail", note: "Low probability, extreme severity", hcpi: 4.0 },
];
