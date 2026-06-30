// Demographic shifts — the great divergence between an aging, shrinking Global North
// (esp. Europe & East Asia) and a young, growing Sub-Saharan Africa.
// Synthesis from UN World Population Prospects. Rounded analytical synthesis.

export const demoHeadline = [
  { num: "~10.3B", label: "projected global population peak around the 2080s", src: "UN WPP" },
  { num: "×2", label: "Sub-Saharan Africa's population roughly doubles by 2070", src: "UN WPP" },
  { num: "−25%", label: "many European & East Asian nations shrink this share by 2100", src: "UN WPP" },
  { num: "1 in 4", label: "people in Africa by 2100 — up from ~1 in 6 today", src: "UN WPP" },
];

// Population by region, indexed and in billions (1950–2100)
export const populationByRegion = [
  { year: 1950, africa: 0.23, europe: 0.55, eastAsia: 0.67, southAsia: 0.5 },
  { year: 1980, africa: 0.48, europe: 0.69, eastAsia: 1.18, southAsia: 0.9 },
  { year: 2000, africa: 0.81, europe: 0.73, eastAsia: 1.5, southAsia: 1.4 },
  { year: 2024, africa: 1.5, europe: 0.74, eastAsia: 1.65, southAsia: 2.0 },
  { year: 2050, africa: 2.5, europe: 0.7, eastAsia: 1.45, southAsia: 2.4 },
  { year: 2075, africa: 3.2, europe: 0.65, eastAsia: 1.2, southAsia: 2.5 },
  { year: 2100, africa: 3.8, europe: 0.59, eastAsia: 1.0, southAsia: 2.4 },
];

// Median age by region, today vs 2100
export const medianAge = [
  { region: "Sub-Saharan Africa", today: 19, y2100: 35 },
  { region: "South & SE Asia", today: 28, y2100: 45 },
  { region: "Latin America", today: 31, y2100: 50 },
  { region: "North America", today: 38, y2100: 47 },
  { region: "East Asia", today: 40, y2100: 55 },
  { region: "Europe", today: 43, y2100: 51 },
];

// Old-age dependency: people 65+ per 100 working-age (15-64)
export const dependencyRatio = [
  { region: "Europe", y2024: 33, y2050: 49, y2075: 58 },
  { region: "East Asia", y2024: 24, y2050: 52, y2075: 67 },
  { region: "North America", y2024: 28, y2050: 40, y2075: 47 },
  { region: "Latin America", y2024: 15, y2050: 30, y2075: 45 },
  { region: "South & SE Asia", y2024: 11, y2050: 21, y2075: 35 },
  { region: "Sub-Saharan Africa", y2024: 6, y2050: 7, y2075: 10 },
];

export const divergenceNarrative =
  "The century's demography splits in two. Europe and East Asia age and shrink — fewer workers supporting more retirees, with labor shortages and fiscal strain. Sub-Saharan Africa stays young and roughly triples, concentrating the next two billion people in exactly the regions facing the worst heat, water and grid exposure. Where that youth meets jobs, grid and schooling, it is a demographic dividend; where it meets the development trap, it is the century's sharpest pressure.";

export const demoCoupling =
  "Demography multiplies every other curve. Africa's growth lands in the hottest, lowest-buffer regions — so population and exposure rise together. Meanwhile aging in the North raises heat-mortality risk (the elderly are most vulnerable) even as it drains the workforce needed to build adaptation. The two divergent curves strain the same global system from opposite ends.";
