import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { problems, dimensions, tierMeta, type Problem, type Tier } from "../../data/hcpi";
import { palette, axisStyle, gridStyle } from "./theme";

const tierColor: Record<Tier, string> = {
  I: palette.signal,
  II: palette.amber,
  III: palette.teal,
};

export default function HcpiDashboard() {
  const [activeTier, setActiveTier] = useState<Tier | "all">("all");
  const [selected, setSelected] = useState<Problem>(problems[0]);

  const filtered = useMemo(
    () => (activeTier === "all" ? problems : problems.filter((p) => p.tier === activeTier)),
    [activeTier]
  );

  const barData = filtered.map((p) => ({
    name: p.name,
    hcpi: p.hcpi,
    tier: p.tier,
    id: p.id,
  }));

  const radarData = dimensions.map((d) => ({
    dim: d.name,
    value: selected.scores[d.code],
  }));

  return (
    <div className="hcpi-dash">
      <div className="chart-controls">
        {(["all", "I", "II", "III"] as const).map((t) => (
          <button
            key={t}
            className={activeTier === t ? "active" : ""}
            onClick={() => setActiveTier(t)}
          >
            {t === "all" ? "All tiers" : `Tier ${t}`}
          </button>
        ))}
      </div>

      <div className="hcpi-grid">
        <div className="chart-card">
          <div className="chart-title">Coupling-weighted HCPI ranking</div>
          <div className="chart-sub">Click a bar to inspect its dimension profile →</div>
          <div style={{ width: "100%", height: Math.max(280, barData.length * 38) }}>
            <ResponsiveContainer>
              <BarChart
                data={barData}
                layout="vertical"
                margin={{ top: 4, right: 28, bottom: 4, left: 4 }}
                barCategoryGap={6}
              >
                <CartesianGrid {...gridStyle} horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 10]}
                  tick={axisStyle}
                  tickLine={false}
                  axisLine={{ stroke: palette.rule }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={150}
                  tick={{ ...axisStyle, fontSize: 10.5 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(15,42,67,0.05)" }}
                  formatter={(v: number) => [v.toFixed(1), "HCPI"]}
                />
                <Bar
                  dataKey="hcpi"
                  radius={[0, 2, 2, 0]}
                  onClick={(d: any) => {
                    const p = problems.find((x) => x.id === d.id);
                    if (p) setSelected(p);
                  }}
                  cursor="pointer"
                >
                  {barData.map((d) => (
                    <Cell
                      key={d.id}
                      fill={tierColor[d.tier as Tier]}
                      fillOpacity={selected.id === d.id ? 1 : 0.78}
                      stroke={selected.id === d.id ? palette.ink : "none"}
                      strokeWidth={selected.id === d.id ? 1.5 : 0}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">
            HCPI = 0.15E + 0.15U + 0.10L + 0.25K + 0.20M + 0.15ΔD · scores are analytical judgments
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-title">{selected.name}</div>
          <div className="chart-sub">
            <span
              className={`tag t-${selected.tier === "I" ? "crit" : selected.tier === "II" ? "med" : "low"}`}
            >
              Tier {selected.tier}
            </span>{" "}
            <span style={{ marginLeft: 8 }}>HCPI {selected.hcpi.toFixed(1)}</span>
          </div>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <RadarChart data={radarData} outerRadius="72%">
                <PolarGrid stroke={palette.rule} />
                <PolarAngleAxis dataKey="dim" tick={{ ...axisStyle, fontSize: 10 }} />
                <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
                <Radar
                  dataKey="value"
                  stroke={tierColor[selected.tier]}
                  fill={tierColor[selected.tier]}
                  fillOpacity={0.28}
                  strokeWidth={2}
                />
                <Tooltip formatter={(v: number) => [`${v}/10`, ""]} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p style={{ fontSize: "0.86rem", color: "var(--ink-2)", marginTop: 6, marginBottom: 0 }}>
            {selected.rationale}
          </p>
        </div>
      </div>

      <div className="hcpi-legend">
        {(Object.keys(tierMeta) as Tier[]).map((t) => (
          <div key={t} className="hcpi-leg-item">
            <span className="dot" style={{ background: tierColor[t] }} />
            <strong>{tierMeta[t].label}</strong>
            <span className="fade">{tierMeta[t].blurb}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
