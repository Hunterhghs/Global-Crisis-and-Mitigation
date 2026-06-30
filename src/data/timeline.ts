// Long-run timeline of the survivability regime, and the danger window framing.

export interface Era {
  period: string;
  label: string;
  body: string;
  state: "stress" | "fork" | "settle";
}

export const eras: Era[] = [
  {
    period: "2025–2040",
    label: "Layering",
    body: "Crisis curves rise but rarely sync. Cognitive/pollution exposure already near-universal; functional heat episodic. The cheapest decades to install stock.",
    state: "stress",
  },
  {
    period: "2040–2060",
    label: "Danger window",
    body: "Heat, water, grid, demographic and institutional curves synchronize. Trajectories bottleneck or fork here — the decisions that lock in buffer vs envelope.",
    state: "fork",
  },
  {
    period: "2060–2100",
    label: "Stratified settle",
    body: "Outcomes resolve into a survivability regime: buffered zones with managed heat, and a chronic-risk envelope of months-long functional exposure. Not uniform collapse, not restoration.",
    state: "settle",
  },
  {
    period: "2100–2300",
    label: "Committed plateau",
    body: "Even with deep cuts, committed warming and sea-level rise persist for centuries. Populations have redistributed toward buffered latitudes and elevations.",
    state: "settle",
  },
  {
    period: "2300–3000",
    label: "Slow reversion",
    body: "On strong paths, temperatures slowly draw down over centuries-to-millennia; ice and sea level lag far behind. The Holocene envelope is not restored on any human-planning horizon.",
    state: "settle",
  },
];

export const dangerWindow = {
  start: 2040,
  end: 2060,
  curves: [
    { name: "Functional heat (WBGT)", peak: 2055 },
    { name: "Water / hydropower stress", peak: 2050 },
    { name: "Grid & cooling demand", peak: 2052 },
    { name: "Demographic aging × heat", peak: 2050 },
    { name: "Institutional strain", peak: 2048 },
  ],
};

// Coupling hub — how Tier I problems drag each other.
export const couplingLinks = [
  ["grid-power-compute", "chronic-heat-envelope"],
  ["grid-power-compute", "water-drought"],
  ["chronic-heat-envelope", "buffer-allocation"],
  ["water-drought", "ag-food-landuse"],
  ["development-d-trap", "grid-power-compute"],
  ["institutional-fracture", "development-d-trap"],
  ["buffer-allocation", "development-d-trap"],
  ["chronic-heat-envelope", "aging-heat"],
];
