// Regional exposure synthesis — PM, heat, and combined "unsafe" population shares.

export interface RegionProfile {
  id: string;
  name: string;
  pop2100Share: string;
  binding: string;
  worst: string;
  buffer: string;
  // share (%) in "unsafe" conditions by definition, ~2050 middle path
  pmUnsafe: number; // PM2.5 > WHO 5 µg/m³
  heatUnsafe: number; // functional outdoor heat stress
  combined: number; // any serious layer
  verdict: string;
}

export const regions: RegionProfile[] = [
  {
    id: "latam",
    name: "Latin America",
    pop2100Share: "~7–9%",
    binding: "PM basins + drought-power + informality",
    worst: "N. Brazil, Caribbean, Central America",
    buffer: "Andes, Southern Cone",
    pmUnsafe: 50,
    heatUnsafe: 40,
    combined: 85,
    verdict:
      "Warming taxes development but does not foreclose it. Stratified region — buffered upland cities versus a lowland chronic-risk envelope. Elevation buys time on physiology, not on basin PM.",
  },
  {
    id: "africa",
    name: "Sub-Saharan Africa",
    pop2100Share: "~20–25%",
    binding: "Agriculture labor + weak grid + low cooling",
    worst: "Sahel-adjacent, East Africa lowlands, coastal W. Africa",
    buffer: "Highland East Africa, selected capitals",
    pmUnsafe: 60,
    heatUnsafe: 55,
    combined: 88,
    verdict:
      "Highest exposure growth × lowest buffer. Adaptation IS development here — where D and power do not compound early, warming can eat the development window before middle income.",
  },
  {
    id: "south-asia",
    name: "South & Southeast Asia",
    pop2100Share: "~35–40%",
    binding: "Scale + humid heat + PM",
    worst: "Indo-Gangetic plain, coastal SE Asia",
    buffer: "Highland nodes, high-D coastal corridors",
    pmUnsafe: 70,
    heatUnsafe: 60,
    combined: 90,
    verdict:
      "The global ceiling on exposed population — and on adaptation if India and the region deploy grid and cooling at scale. The worst wet-bulb belt globally on weak paths.",
  },
  {
    id: "east-asia",
    name: "East Asia",
    pop2100Share: "~18–22%",
    binding: "Industrial PM + datacenter thermal + coastal heat + aging",
    worst: "N. China plains, poor coastal zones",
    buffer: "High-D coastal corridors (China coast, Korea, Japan)",
    pmUnsafe: 55,
    heatUnsafe: 45,
    combined: 82,
    verdict:
      "Sharpest within-continent inequality. Strong stock in places makes heat costly-but-mitigable; interior and poorer coasts lag. Determines whether the century's growth is shared.",
  },
  {
    id: "eastern-europe",
    name: "Eastern Europe",
    pop2100Share: "~3–4%",
    binding: "Coal/solid-fuel PM + fastest interior heat rise",
    worst: "S. Romania, Bulgaria, Moldova, Pannonian basin",
    buffer: "Carpathians, Baltic rim",
    pmUnsafe: 50,
    heatUnsafe: 30,
    combined: 84,
    verdict:
      "Does not develop a tropical uninhabitability belt — it Mediterraneanizes inward. Pollution–industrial trap + steep heatwave growth; Ukraine/Belarus/Moldova fork dominates the map.",
  },
];

// "Unsafe" tier definitions used across the resource.
export const unsafeTiers = [
  { tier: "A — Cognitive / pollution", def: "Annual PM₂.₅ above WHO 5 µg/m³ + heat that degrades attention, memory, learning", today: "~80–98% urban" },
  { tier: "B — Functional heat", def: "WBGT > 30.5°C in sun — unsafe for sustained outdoor / informal labor", today: "~70% of workers episodic" },
  { tier: "C — Infrastructural", def: "Grid, transit, cooling chain and compute fail under peak demand", today: "~10–20% urban, rising" },
  { tier: "D — Physiological", def: "Noncompensable / wet-bulb ~35°C — body cannot thermoregulate unprotected", today: "<1–2%, episodic" },
];
