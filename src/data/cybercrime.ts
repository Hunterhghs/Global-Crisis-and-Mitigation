// Cybercrime & digital-harm data — synthesis from Cybersecurity Ventures,
// FBI IC3, Chainalysis, ITU, Statista and ENISA. Rounded analytical synthesis.

export const cyberHeadline = [
  { num: "~$10.5T", label: "projected annual cost of cybercrime by 2025", src: "Cybersecurity Ventures" },
  { num: "3rd", label: "if it were a country, cybercrime would be the 3rd-largest economy", src: "Cybersecurity Ventures" },
  { num: "~2.6B", label: "people still offline — the other side of the digital divide", src: "ITU" },
  { num: "~30%", label: "annual growth rate of cybercrime cost this decade", src: "Industry estimates" },
];

// Cost of cybercrime trajectory (US$ trillions/year)
export const cyberCostTrend = [
  { year: 2015, cost: 3 },
  { year: 2018, cost: 5 },
  { year: 2021, cost: 6 },
  { year: 2023, cost: 8 },
  { year: 2025, cost: 10.5 },
  { year: 2028, cost: 13.8 },
];

// Attack-type share of reported losses (%)
export const attackTypes = [
  { type: "Business email compromise / fraud", share: 28 },
  { type: "Investment / crypto scams", share: 22 },
  { type: "Ransomware", share: 18 },
  { type: "Identity theft", share: 12 },
  { type: "Phishing / social engineering", share: 11 },
  { type: "Data breach & extortion", share: 9 },
];

// Digital divide: internet penetration by region (%)
export const digitalDivide = [
  { region: "Western Europe", online: 93 },
  { region: "North America", online: 92 },
  { region: "Latin America", online: 81 },
  { region: "Eastern Europe", online: 84 },
  { region: "Middle East / N. Africa", online: 76 },
  { region: "East Asia", online: 78 },
  { region: "South & SE Asia", online: 62 },
  { region: "Sub-Saharan Africa", online: 43 },
];

// Most-targeted sectors (relative index)
export const targetedSectors = [
  { sector: "Healthcare", idx: 92 },
  { sector: "Finance", idx: 88 },
  { sector: "Government / public", idx: 81 },
  { sector: "Critical infrastructure / energy", idx: 78 },
  { sector: "Education", idx: 64 },
  { sector: "Manufacturing", idx: 71 },
];

export const cyberCoupling =
  "Cybercrime is the friction tax on the digital layer that adaptation depends on. Grids, water utilities, hospitals and payment systems are increasingly software — and increasingly targeted. As AI lowers the cost of attacks, the same digital public infrastructure meant to help low- and middle-income countries leapfrog becomes a new attack surface. Resilience, not just connectivity, is the missing variable.";
