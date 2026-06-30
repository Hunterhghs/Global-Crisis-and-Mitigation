// Pollution cycle data — air, water, soil/food contamination, and how they connect.
// Synthesis from WHO, State of Global Air / HEI, UNEP, FAO, World Bank,
// Lancet Commission on Pollution and Health, and IQAir.
// Figures are rounded analytical synthesis, not primary measurements.

// ---- Headline burden ----
export const pollutionHeadline = [
  { num: "~9M", label: "premature deaths a year linked to all pollution", src: "Lancet Commission on Pollution & Health" },
  { num: "~94%", label: "of the world breathes PM₂.₅ above the WHO guideline", src: "WHO / State of Global Air" },
  { num: "~2B", label: "people lack safely managed drinking water", src: "WHO / UNICEF JMP" },
  { num: "~1 in 6", label: "deaths globally attributable to pollution", src: "Lancet Commission" },
];

// ---- The pollution cycle: pollutants move between media ----
export interface CycleStage {
  id: string;
  stage: string;
  icon: string;
  body: string;
  flowsTo: string;
}

export const pollutionCycle: CycleStage[] = [
  {
    id: "air",
    stage: "Air",
    icon: "◆",
    body: "Combustion, industry, traffic and agriculture load the atmosphere with PM₂.₅, NOₓ, SO₂ and ozone. Particles travel hundreds of kilometres before settling.",
    flowsTo: "Deposits into water and soil",
  },
  {
    id: "water",
    stage: "Water",
    icon: "≈",
    body: "Airborne deposition, industrial discharge, sewage and agricultural runoff carry nitrates, heavy metals, microplastics and PFAS into rivers, aquifers and oceans.",
    flowsTo: "Irrigates crops, enters the food chain",
  },
  {
    id: "soil",
    stage: "Soil",
    icon: "▦",
    body: "Contaminated water and fallout accumulate lead, cadmium, arsenic and persistent chemicals in farmland. Soil holds them for decades — a slow-release reservoir.",
    flowsTo: "Taken up by plants and livestock",
  },
  {
    id: "food",
    stage: "Food",
    icon: "✦",
    body: "Crops, fish and livestock concentrate contaminants. Heavy metals and microplastics bioaccumulate up the food chain, ending on the plate far from the original source.",
    flowsTo: "Ingested, inhaled, absorbed",
  },
  {
    id: "body",
    stage: "Body",
    icon: "✚",
    body: "Pollutants enter the bloodstream via lungs, gut and skin — driving cardiovascular disease, cancer, cognitive loss and developmental harm, then re-excreting back into the system.",
    flowsTo: "Returns to air, water and soil",
  },
];

// ---- Air pollution: PM2.5 population-weighted (µg/m³) by region, vs WHO guideline 5 ----
export const airPM25 = [
  { region: "South Asia", pm: 52, deathsPer100k: 95 },
  { region: "Sub-Saharan Africa", pm: 35, deathsPer100k: 78 },
  { region: "Middle East / N. Africa", pm: 41, deathsPer100k: 70 },
  { region: "East Asia", pm: 32, deathsPer100k: 88 },
  { region: "Southeast Asia", pm: 24, deathsPer100k: 64 },
  { region: "Latin America", pm: 14, deathsPer100k: 31 },
  { region: "Eastern Europe", pm: 16, deathsPer100k: 52 },
  { region: "Western Europe", pm: 11, deathsPer100k: 28 },
  { region: "North America", pm: 8, deathsPer100k: 22 },
];
export const whoPM25Guideline = 5;

// ---- Air pollution sources (share of ambient PM2.5, global approx) ----
export const airSources = [
  { source: "Residential / solid-fuel cooking & heating", share: 24 },
  { source: "Industry", share: 18 },
  { source: "Road transport", share: 14 },
  { source: "Power generation", share: 13 },
  { source: "Agriculture (ammonia, burning)", share: 13 },
  { source: "Natural (dust, sea salt, wildfire)", share: 12 },
  { source: "Waste burning", share: 6 },
];

// ---- Water: safely managed drinking water access (% of population) ----
export const waterAccess = [
  { region: "Sub-Saharan Africa", safe: 31, unsafe: 69 },
  { region: "South Asia", safe: 58, unsafe: 42 },
  { region: "Southeast Asia", safe: 64, unsafe: 36 },
  { region: "Middle East / N. Africa", safe: 74, unsafe: 26 },
  { region: "Latin America", safe: 76, unsafe: 24 },
  { region: "East Asia", safe: 85, unsafe: 15 },
  { region: "Eastern Europe", safe: 88, unsafe: 12 },
  { region: "Western Europe", safe: 98, unsafe: 2 },
];

// ---- Water contaminants of concern ----
export const waterContaminants = [
  { name: "Fecal / pathogens", exposed: "~2.0B", harm: "Diarrheal disease — a leading cause of child death", sev: "crit" },
  { name: "Nitrates (fertilizer runoff)", exposed: "~1.0B", harm: "Methemoglobinemia, ecosystem dead zones", sev: "high" },
  { name: "Arsenic (geogenic + industrial)", exposed: "~140M", harm: "Cancer, skin lesions, cardiovascular disease", sev: "high" },
  { name: "Lead (pipes, solder)", exposed: "~800M children", harm: "Irreversible cognitive loss in children", sev: "crit" },
  { name: "PFAS \u201cforever chemicals\u201d", exposed: "rising", harm: "Immune, hormonal, cancer links; near-indestructible", sev: "high" },
  { name: "Microplastics", exposed: "~universal", harm: "Detected in blood, placenta, organs; effects emerging", sev: "med" },
];

// ---- Food contamination ----
export const foodContaminants = [
  { contaminant: "Heavy metals (Cd, Pb, As)", route: "Soil & water uptake by staple crops (rice, wheat, veg)", load: 82 },
  { contaminant: "Mycotoxins (aflatoxin)", route: "Mold on grains/nuts, worsened by heat & poor storage", load: 60 },
  { contaminant: "Pesticide residues", route: "Direct application; persistent organics in soil", load: 68 },
  { contaminant: "Microplastics & nanoplastics", route: "Water, packaging, marine bioaccumulation", load: 71 },
  { contaminant: "PFAS", route: "Contaminated water, soil, food packaging", load: 55 },
  { contaminant: "Antibiotic / AMR residues", route: "Intensive livestock and aquaculture", load: 64 },
];

// ---- Lead exposure spotlight ----
export const leadFacts = [
  { num: "~800M", label: "children with blood-lead levels high enough to harm development" },
  { num: "~5.5M", label: "adult deaths a year from lead-linked cardiovascular disease" },
  { num: "~$6T", label: "estimated annual economic loss from lead exposure" },
];

// ---- Pollution + heat coupling ----
export const pollutionHeatCoupling =
  "Pollution and heat are not separate crises — they amplify each other. Heat accelerates ground-level ozone formation; stagnant heatwave air traps PM₂.₅; wildfires triple particulate loads; and warming raises mycotoxin growth on stored food. The same fossil combustion drives both. Cutting it is the rare lever that bends both curves at once.";

// ---- Trajectory: PM2.5 trend illustrative (index, 2000 = 100) ----
export const pollutionTrend = [
  { year: 2000, developed: 100, developing: 100 },
  { year: 2010, developed: 82, developing: 121 },
  { year: 2020, developed: 64, developing: 128 },
  { year: 2030, developed: 52, developing: 118 },
  { year: 2040, developed: 44, developing: 102 },
  { year: 2050, developed: 38, developing: 86 },
];
