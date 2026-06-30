// Climate / global-warming data — synthesis from IPCC AR6, NASA/NOAA, Global Carbon
// Project, and Climate Action Tracker. Rounded analytical synthesis, not primary data.

export const climateHeadline = [
  { num: "+1.3°C", label: "global mean warming above pre-industrial, today", src: "IPCC / NASA GISS" },
  { num: "~420ppm", label: "atmospheric CO₂ — highest in ~3 million years", src: "NOAA" },
  { num: "~40Gt", label: "CO₂ emitted per year and still rising", src: "Global Carbon Project" },
  { num: "+2.7°C", label: "projected warming on current policies by 2100", src: "Climate Action Tracker" },
];

// Global mean temperature anomaly above pre-industrial (°C), historical + SSP scenarios
export const warmingPaths = [
  { year: 2000, history: 0.6, low: 0.6, mid: 0.6, high: 0.6 },
  { year: 2020, history: 1.1, low: 1.1, mid: 1.1, high: 1.1 },
  { year: 2040, history: null, low: 1.5, mid: 1.7, high: 1.9 },
  { year: 2060, history: null, low: 1.6, mid: 2.2, high: 2.9 },
  { year: 2080, history: null, low: 1.5, mid: 2.6, high: 3.8 },
  { year: 2100, history: null, low: 1.4, mid: 2.7, high: 4.4 },
];

// CO2 emissions by region (Gt CO2/yr, approx)
export const emissionsByRegion = [
  { region: "East Asia", current: 14.5, share: 36 },
  { region: "North America", current: 6.0, share: 15 },
  { region: "South & SE Asia", current: 5.2, share: 13 },
  { region: "Europe", current: 4.5, share: 11 },
  { region: "Middle East / N. Africa", current: 3.4, share: 9 },
  { region: "Eastern Europe / C. Asia", current: 3.0, share: 7 },
  { region: "Latin America", current: 2.2, share: 5 },
  { region: "Sub-Saharan Africa", current: 1.6, share: 4 },
];

// Sea-level rise projection (cm above 2000), by path
export const seaLevel = [
  { year: 2000, low: 0, high: 0 },
  { year: 2030, low: 9, high: 12 },
  { year: 2050, low: 18, high: 27 },
  { year: 2070, low: 28, high: 48 },
  { year: 2100, low: 38, high: 82 },
];

// Climate tipping elements and their approximate threshold (°C)
export const tippingPoints = [
  { element: "Greenland ice sheet", threshold: "~1.5°C", impact: "~7m sea level over centuries", sev: "crit" },
  { element: "West Antarctic ice sheet", threshold: "~1.5°C", impact: "~3-5m sea level over centuries", sev: "crit" },
  { element: "Warm-water coral reefs", threshold: "~1.5°C", impact: "Near-total loss; fisheries collapse", sev: "crit" },
  { element: "Amazon rainforest dieback", threshold: "~3.5°C", impact: "Savannization; carbon release; regional drying", sev: "high" },
  { element: "Permafrost thaw", threshold: "~1.5°C+", impact: "Methane & CO₂ feedback; self-amplifying", sev: "high" },
  { element: "AMOC ocean circulation", threshold: "~4°C (uncertain)", impact: "European cooling, monsoon disruption", sev: "high" },
];

export const climateCoupling =
  "Global warming is the forcing function beneath most of the index. The same fossil combustion that warms the planet emits the PM₂.₅ that pollutes the air, and the warming it drives intensifies heat, drought, sea-level rise and crop stress simultaneously. It is the rare lever where one action — decarbonization — bends many curves at once.";
