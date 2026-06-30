// Secondary & tertiary effects — the cascades that follow the primary crises.
// Battery & e-waste, feels-like city peaks, compound heat-pollution stress, and more.
// Synthesis from Global E-waste Monitor, IEA, WHO, and research literature.

export const cascadeHeadline = [
  { num: "~62Mt", label: "e-waste generated per year — only ~22% formally recycled", src: "Global E-waste Monitor" },
  { num: "~85%", label: "of humanity will face compound heat + pollution stress by late century", src: "Synthesis" },
  { num: "×4", label: "battery demand growth this decade — and the waste that follows", src: "IEA" },
  { num: "58–72°C", label: "peak feels-like temperatures projected in the hottest cities", src: "Heat-index synthesis" },
];

// Battery & e-waste trajectory (Mt/yr)
export const ewasteTrend = [
  { year: 2010, ewaste: 34, batteries: 2 },
  { year: 2019, ewaste: 54, batteries: 5 },
  { year: 2024, ewaste: 62, batteries: 9 },
  { year: 2030, ewaste: 82, batteries: 18 },
  { year: 2040, ewaste: 110, batteries: 38 },
];

// Battery waste chain — secondary effects of the energy transition
export const batteryChain = [
  { stage: "Mining (Li, Co, Ni)", effect: "Water-intensive extraction; tailings; local pollution in supply regions", sev: "high" },
  { stage: "Heat degradation", effect: "High ambient temperatures shorten battery life, accelerating replacement", sev: "med" },
  { stage: "Spent cells", effect: "Fire risk, heavy-metal leaching when landfilled instead of recycled", sev: "high" },
  { stage: "Informal recycling", effect: "Acid leaching and burning expose workers to lead, cobalt, acids", sev: "crit" },
  { stage: "Recovered material", effect: "Closed-loop recycling can recover most metals — the mitigable path", sev: "low" },
];

// Feels-like peak in major cities (°C) — air vs feels-like, late century weak path
export const feelsLikeCities = [
  { city: "Jacobabad (PAK)", air: 52, feels: 72 },
  { city: "Dubai (UAE)", air: 50, feels: 68 },
  { city: "Kolkata (IND)", air: 45, feels: 66 },
  { city: "Basra (IRQ)", air: 53, feels: 70 },
  { city: "Lagos (NGA)", air: 41, feels: 58 },
  { city: "Manila (PHL)", air: 40, feels: 57 },
  { city: "Houston (USA)", air: 44, feels: 57 },
  { city: "Guayaquil (ECU)", air: 38, feels: 54 },
];

// Compound stress: share of population facing each combination (late century)
export const compoundStress = [
  { combo: "Heat only", share: 12 },
  { combo: "Pollution only", share: 9 },
  { combo: "Heat + pollution", share: 48 },
  { combo: "Heat + pollution + water", share: 22 },
  { combo: "Buffered (low stress)", share: 9 },
];

// Other cascade effects (qualitative register)
export const otherCascades = [
  { effect: "Cooling-demand spiral", note: "AC use raises grid load and outdoor heat, demanding still more AC — a positive feedback." },
  { effect: "Data-center thermal load", note: "AI and cloud compute add heat and power demand exactly where grids are most stressed." },
  { effect: "Learning loss", note: "Heat and PM₂.₅ measurably lower test scores and school attendance — a slow human-capital tax." },
  { effect: "Migration pressure", note: "Compound exposure drives rural-urban and cross-border movement, straining receiving cities." },
  { effect: "Insurance retreat", note: "Insurers withdraw from high-risk zones, stranding assets and shifting cost to households." },
  { effect: "Food-price volatility", note: "Heat, drought and mycotoxins raise staple prices — a stability variable in hot regions." },
];

export const cascadeNarrative =
  "Primary crises rarely arrive alone. Each spawns secondary and tertiary effects that often outweigh the original: the clean-energy transition that cuts emissions creates a battery-waste stream; the cooling that protects people loads the grid and warms the street; the compute that powers adaptation adds heat where it can least be absorbed. Mapping these cascades is how mitigation avoids solving one problem by creating the next.";
