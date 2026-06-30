// Heat & temperature data encoded from research synthesis.
// Sources: World Bank (Unlivable, ECA Heat), CMIP6/SSP, SALURBAL, Nature Sustainability,
// Scientific Reports 2025 (city MAT), Frontiers urban heatwave exposure.

// Late-century (~2090) urban peak air temperature by city tier (°C), middle vs high path.
export interface PeakTier {
  tier: string;
  examples: string;
  mid: [number, number]; // SSP2-4.5 range
  high: [number, number]; // SSP5-8.5 range
}

export const peakAirByTier: PeakTier[] = [
  { tier: "Humid tropics", examples: "Belém, Lagos, Dhaka, Manila", mid: [38, 42], high: [42, 48] },
  { tier: "South Asia / MENA", examples: "Delhi, Karachi, Riyadh, Baghdad", mid: [45, 50], high: [48, 54] },
  { tier: "Amazon / Caribbean", examples: "Manaus, Barranquilla, Kingston", mid: [38, 43], high: [42, 47] },
  { tier: "Southern / E. Europe", examples: "Athens, Bucharest, Sofia", mid: [42, 46], high: [45, 50] },
  { tier: "Temperate", examples: "Warsaw, Milan, Beijing", mid: [38, 42], high: [40, 46] },
  { tier: "High-latitude", examples: "Moscow, Helsinki", mid: [32, 38], high: [35, 42] },
];

// Three metrics that matter — peak late-century, weak path (°C). Used for the metric explainer.
export const metricBands = [
  { region: "Gulf / Persian Gulf", air: [48, 54], feels: [58, 72], wbgt: [36, 42] },
  { region: "South Asia", air: [45, 52], feels: [55, 68], wbgt: [34, 40] },
  { region: "Sub-Saharan Africa", air: [42, 48], feels: [52, 62], wbgt: [34, 38] },
  { region: "Latin America (tropical)", air: [38, 45], feels: [50, 60], wbgt: [35, 39] },
  { region: "Latin America (Andes/temperate)", air: [32, 40], feels: [38, 50], wbgt: [28, 34] },
  { region: "Eastern / Southern Europe", air: [42, 48], feels: [48, 58], wbgt: [33, 37] },
  { region: "East Asia", air: [40, 46], feels: [48, 58], wbgt: [32, 38] },
  { region: "North America (S/SW)", air: [45, 50], feels: [50, 60], wbgt: [34, 38] },
];

// Extreme heat days per year (WBGT > 30.5°C in sun) — present vs ~2050, World Bank LAC.
export const extremeHeatDays = [
  { city: "Belém (BRA)", present: 252, y2050: 343 },
  { city: "São Luís (BRA)", present: 240, y2050: 325 },
  { city: "Barranquilla (COL)", present: 190, y2050: 278 },
  { city: "Guayaquil (ECU)", present: 95, y2050: 200 },
  { city: "Santo Domingo (DOM)", present: 70, y2050: 146 },
  { city: "Havana (CUB)", present: 58, y2050: 125 },
  { city: "Monterrey (MEX)", present: 52, y2050: 111 },
  { city: "San Salvador (SLV)", present: 22, y2050: 59 },
  { city: "Buenos Aires (ARG)", present: 2, y2050: 9 },
  { city: "São Paulo (BRA)", present: 1, y2050: 7 },
];

// Population-weighted mean annual temperature (°C) where the median person lives, by region.
// Today vs ~2090 middle (SSP2-4.5) vs ~2090 weak (SSP5-8.5).
export const popWeightedMAT = [
  { region: "South Asia", today: 27, mid: 30, weak: 31.5 },
  { region: "Southeast Asia", today: 27.5, mid: 30.5, weak: 32 },
  { region: "Sub-Saharan Africa", today: 26.5, mid: 29, weak: 30 },
  { region: "Middle East / N. Africa", today: 24, mid: 27, weak: 29 },
  { region: "Latin America", today: 23, mid: 25.5, weak: 27.5 },
  { region: "East Asia", today: 17.5, mid: 20.5, weak: 22.5 },
  { region: "Eastern Europe", today: 11, mid: 15, weak: 17.5 },
];

// City mean-annual-temperature niche exceedance (>29°C MAT), Scientific Reports 2025.
export const nicheExceedance = [
  { period: "2011–2040", cities: 17, pop: 30 },
  { period: "2041–2070", cities: 57, pop: 105 },
  { period: "2071–2100", cities: 217, pop: 320 },
];

// Device / compute thermal thresholds (ambient °C).
export const deviceThermal = [
  { band: "< 25°C", effect: "Normal charge speed, full boost clocks", sev: "low" },
  { band: "28–32°C", effect: "Fans max; sustained workloads start throttling", sev: "med" },
  { band: "32–35°C", effect: "Charging throttled or paused; sustained compute below spec", sev: "high" },
  { band: "35–40°C", effect: "Heavy throttling; many phones stop fast charging", sev: "high" },
  { band: "> 40°C", effect: "Protective shutdown risk; battery chemistry degrades", sev: "crit" },
];

// °C → °F helper for display toggles
export const cToF = (c: number) => Math.round((c * 9) / 5 + 32);
