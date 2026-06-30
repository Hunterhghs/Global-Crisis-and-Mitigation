// Inequality & poverty data — synthesis from World Bank, World Inequality Report,
// UNDP, Oxfam, and Our World in Data. Rounded analytical synthesis.

export const inequalityHeadline = [
  { num: "~700M", label: "people still live in extreme poverty (<$2.15/day)", src: "World Bank" },
  { num: "~1%", label: "richest hold nearly half of all global wealth", src: "World Inequality Report" },
  { num: "10×", label: "income gap: top vs bottom 50% of earners globally", src: "WIR 2022" },
  { num: "~3.3B", label: "live in countries that spend more on debt interest than health or education", src: "UNDP" },
];

// Global wealth distribution by group (% of total wealth)
export const wealthShare = [
  { group: "Top 1%", share: 38 },
  { group: "Next 9%", share: 38 },
  { group: "Middle 40%", share: 22 },
  { group: "Bottom 50%", share: 2 },
];

// Income share top 10% by region (%)
export const incomeTop10 = [
  { region: "Middle East / N. Africa", top10: 58 },
  { region: "Sub-Saharan Africa", top10: 56 },
  { region: "Latin America", top10: 55 },
  { region: "South & SE Asia", top10: 52 },
  { region: "North America", top10: 46 },
  { region: "East Asia", top10: 43 },
  { region: "Europe", top10: 36 },
];

// Extreme poverty rate trajectory (% of world population)
export const povertyTrend = [
  { year: 1990, rate: 38 },
  { year: 2000, rate: 29 },
  { year: 2010, rate: 16 },
  { year: 2015, rate: 10.1 },
  { year: 2019, rate: 8.5 },
  { year: 2020, rate: 9.7 },
  { year: 2024, rate: 8.5 },
  { year: 2030, rate: 7.3 },
];

// Climate–inequality coupling: who emits vs who's exposed
export const climateEquity = [
  { group: "Top 10% emitters", emissions: 48, exposure: 12 },
  { group: "Middle 40%", emissions: 42, exposure: 38 },
  { group: "Bottom 50%", emissions: 12, exposure: 75 },
];

export const inequalityCoupling =
  "Inequality is the multiplier on every other crisis in the index. The same heat, pollution and water stress produce radically different outcomes depending on who can buy cooling, filtration, clean water and relocation. The bottom 50% emit ~12% of carbon but absorb the majority of the exposure — stratification, not the hazard alone, decides who survives well.";

// Dimensions of deprivation (multidimensional poverty), share of poor affected
export const deprivations = [
  { dim: "Cooking fuel", share: 84 },
  { dim: "Sanitation", share: 71 },
  { dim: "Housing", share: 68 },
  { dim: "Drinking water", share: 44 },
  { dim: "Electricity", share: 40 },
  { dim: "Nutrition", share: 53 },
  { dim: "School attendance", share: 28 },
];
