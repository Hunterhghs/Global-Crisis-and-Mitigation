// Mitigation framework — five universal levers applied per Tier I core.

export type Lever = "Path" | "Stock" | "Medium" | "D" | "Allocation";

export const leverMeta: Record<Lever, string> = {
  Path: "Cut emissions fast enough to fork late-century exposure (Tw / WBGT / MAT bands)",
  Stock: "Install physical capacity — MW, water, cooling, filtration, storage — before curves sync",
  Medium: "Protect labor hours, cognition, learning, health — the productive coefficient",
  D: "Finance, procurement, enforcement, skills so diffusion compounds instead of evaporating into pilots",
  Allocation: "Decide who gets buffers — not whether stratification exists (default: unequal)",
};

export interface MitigationItem {
  problemId: string;
  problem: string;
  hcpi: number;
  tier: string;
  statement: string;
  levers: Record<Lever, string>;
  wrong: string;
  right: string;
}

export const mitigations: MitigationItem[] = [
  {
    problemId: "development-d-trap",
    problem: "Development & D trap",
    hcpi: 8.7,
    tier: "I",
    statement: "Growth and adaptation compete for the same fiscal space; LMICs stall mid-climb.",
    levers: {
      Path: "Tie finance to verified abatement (transport, power, industry) — not GDP alone.",
      Stock: "Parallel install: grid + water + urban cooling as one bundled capital stack, not sequential \u201cdevelop then green.\u201d",
      Medium: "Formalize informal-labor heat / PM protection — otherwise development metrics lie.",
      D: "Procurement capacity, anti-corruption enforcement, utility governance, sovereign green bonds with MW-delivered covenants.",
      Allocation: "Late-mover finance at scale (MDBs, climate funds) conditional on absorption metrics, not announcements.",
    },
    wrong: "FDI and AI prestige without electrons.",
    right: "$/MW delivered × PM trend × productive hours retained.",
  },
  {
    problemId: "chronic-heat-envelope",
    problem: "Chronic heat & humidity envelope",
    hcpi: 8.2,
    tier: "I",
    statement: "Billions face months of functional heat exposure that erodes labor and cognition.",
    levers: {
      Path: "Strong mitigation + land stewardship (Amazon, Sahel) — land use accelerates heat as much as CO\u2082 locally.",
      Stock: "District cooling where possible; retrofit building envelopes; cool roofs/pavement; shade infrastructure; WBGT-based work/rest protocols.",
      Medium: "School calendars + indoor air standards; impact-based heat warnings tied to work stoppage, not just temperature.",
      D: "Urban planning authority to rezone for green/blue corridors; enforce construction codes.",
      Allocation: "Target slums / panel blocks first — highest UHI + lowest buffer.",
    },
    wrong: "Eliminating warm seasons in the tropics.",
    right: "Functional exposure — months of safe outdoor labor and indoor cognition retained.",
  },
  {
    problemId: "grid-power-compute",
    problem: "Grid · power · compute thermal",
    hcpi: 8.2,
    tier: "I",
    statement: "Cooling demand spikes as drought cuts supply; blackouts remove cooling and compute together.",
    levers: {
      Path: "Decarbonize and derisk drought (don\u2019t rely ~45% on one hydro basin).",
      Stock: "Distributed storage + redundancy; transformer/grid hardening; datacenter siting in cooler zones or liquid cooling; solar + storage outage islands.",
      Medium: "Treat uptime during heatwaves as public-health infrastructure.",
      D: "Utility reform; cross-border power pools (Africa, LAC, Asia); skilled maintenance workforce.",
      Allocation: "Prioritize hospitals, schools, water pumps in load-shedding protocols — not discretionary first.",
    },
    wrong: "GW pipeline without heatwave reliability.",
    right: "Hours of 27°C-inlet-equivalent compute + zero-blackout hospital zones.",
  },
  {
    problemId: "institutional-fracture",
    problem: "Institutional fracture · conflict",
    hcpi: 8.3,
    tier: "I",
    statement: "War and state failure destroy D, grid and the human medium overnight.",
    levers: {
      Path: "Climate diplomacy where it reduces resource wars (water, food).",
      Stock: "Distributed, hard-to-target infrastructure (solar microgrids, decentralized water).",
      Medium: "Protect schooling and health continuity through shocks — the recoverable core.",
      D: "Anti-corruption, rule of law, civil-service capacity as climate adaptation, not separate agendas.",
      Allocation: "Refugee / displacement planning treated as baseline, not contingency.",
    },
    wrong: "Treating conflict as exogenous to climate budgets.",
    right: "Institutional continuity index through shocks — D retained per year.",
  },
  {
    problemId: "buffer-allocation",
    problem: "Stratified buffer allocation",
    hcpi: 8.3,
    tier: "I",
    statement: "Who gets cooling, filtration, power and relocation determines outcomes more than the hazard.",
    levers: {
      Path: "Mitigation lowers the ceiling everyone is stratified beneath.",
      Stock: "Public cooling centers, clean-air shelters, universal-minimum service guarantees.",
      Medium: "Heat / air as labor-rights and public-health entitlements, not amenities.",
      D: "Transparent allocation rules; data on who sits inside vs outside the buffer.",
      Allocation: "Explicitly fund the chronic-risk envelope first — default allocation is regressive.",
    },
    wrong: "Pretending universal protection is automatic.",
    right: "Buffer-coverage gap — share of the exposed population inside protected zones.",
  },
];

// Universal rule rows (applies to all 12).
export const universalRule: { lever: Lever; meaning: string }[] = (
  ["Path", "Stock", "Medium", "D", "Allocation"] as Lever[]
).map((l) => ({ lever: l, meaning: leverMeta[l] }));

export const mitigationCeiling = {
  timing: "Front-load the 2020s–2030s. Reacting inside the danger window means paying the complexity tax at peak prices.",
  beyondControl: "Committed warming, demographic weight in hot zones, and default inequality are beyond control — mitigation is navigation, not reset.",
};
