// Source register and methodological notes.

export interface Source {
  org: string;
  title: string;
  note: string;
  url?: string;
}

export const sources: Source[] = [
  { org: "World Bank", title: "Unlivable: What the Urban Heat Island Effect Means for LAC", note: "Extreme-heat-day projections and within-city UHI stratification.", url: "https://www.worldbank.org/" },
  { org: "World Bank", title: "Economics of Climate Adaptation (ECA) — Heat", note: "Cooling demand, labor productivity and adaptation cost framing." },
  { org: "IPCC", title: "AR6 WGI & WGII", note: "SSP scenario temperature ranges, committed warming, reversibility." },
  { org: "CMIP6 / SSP", title: "Scenario ensemble", note: "SSP2-4.5 (middle) and SSP5-8.5 (weak) used for band ranges." },
  { org: "Scientific Reports (2025)", title: "City mean-annual-temperature niche exceedance", note: "Cities and population crossing >29°C MAT by period." },
  { org: "SALURBAL", title: "Salud Urbana en América Latina", note: "Urban heat and health across Latin American cities." },
  { org: "Nature Sustainability", title: "Human climate niche", note: "Population pushed outside the historical temperature niche." },
  { org: "WHO", title: "Ambient air quality guidelines (2021)", note: "PM₂.₅ 5 µg/m³ guideline; ~94% of population above it." },
  { org: "Lancet Countdown", title: "Health and climate change", note: "Heat mortality, labor-hour loss, aging interaction." },
  { org: "Frontiers", title: "Urban heatwave exposure projections", note: "Compound exposure under SSP pathways." },
];

export const methodNotes = [
  {
    h: "What the scores are",
    p: "HCPI dimension scores (0–10) are structured analytical judgments synthesizing the sources above — not measured quantities. They are designed to make coupling and medium-impact legible, not to assert decimal precision.",
  },
  {
    h: "Why coupling and medium are weighted highest",
    p: "A narrow tail risk that hits one system ranks below a problem that breaks grids, schools, farms and finance at once. Weights (K 0.25, M 0.20) encode that a coupled, productivity-eroding problem is structurally worse than an isolated one.",
  },
  {
    h: "Temperature bands, not points",
    p: "All late-century figures are ranges across a middle (SSP2-4.5) and weak (SSP5-8.5) path. \u201cFeels-like\u201d uses heat-index; WBGT is the work-safety metric; MAT is the chronic-niche metric. They answer different questions and are not interchangeable.",
  },
  {
    h: "Population-weighting",
    p: "Regional figures are weighted toward where people actually live (lowland megacities), not land-area averages — which is why population-weighted MAT runs hotter than territorial means.",
  },
  {
    h: "Uncertainty",
    p: "Ranges widen with time horizon and weaken with path certainty. Treat post-2060 figures as scenario envelopes, not forecasts. Figures are rounded; see each chart for the metric used.",
  },
];
