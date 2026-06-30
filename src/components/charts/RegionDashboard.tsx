import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { regions } from "../../data/regions";
import { palette, axisStyle, gridStyle } from "./theme";

export default function RegionDashboard() {
  const [active, setActive] = useState(regions[0].id);
  const region = regions.find((r) => r.id === active)!;

  const data = regions.map((r) => ({
    name: r.name.replace(" & Southeast Asia", " Asia"),
    "Pollution (PM₂.₅)": r.pmUnsafe,
    "Functional heat": r.heatUnsafe,
    "Any serious layer": r.combined,
    id: r.id,
  }));

  return (
    <div>
      <div className="chart-card">
        <div className="chart-title">Population in &ldquo;unsafe&rdquo; conditions by region · ~2050 middle path</div>
        <div className="chart-sub">Share of regional population exposed to each layer (overlapping, not additive).</div>
        <div style={{ width: "100%", height: 340 }}>
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 8, right: 16, bottom: 40, left: 0 }} barCategoryGap="16%">
              <CartesianGrid {...gridStyle} vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ ...axisStyle, fontSize: 10 }}
                angle={-22}
                textAnchor="end"
                interval={0}
                height={56}
                tickLine={false}
                axisLine={{ stroke: palette.rule }}
              />
              <YAxis tick={axisStyle} tickLine={false} axisLine={false} unit="%" domain={[0, 100]} />
              <Tooltip cursor={{ fill: "rgba(15,42,67,0.05)" }} formatter={(v: number) => `${v}%`} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
              <Bar dataKey="Pollution (PM₂.₅)" fill={palette.slate} radius={[2, 2, 0, 0]} />
              <Bar dataKey="Functional heat" fill={palette.amber} radius={[2, 2, 0, 0]} />
              <Bar dataKey="Any serious layer" fill={palette.signal} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-src">Illustrative synthesis. &ldquo;Unsafe&rdquo; per tier definitions in Methodology.</div>
      </div>

      <div className="chart-controls" style={{ marginTop: 20 }}>
        {regions.map((r) => (
          <button key={r.id} className={active === r.id ? "active" : ""} onClick={() => setActive(r.id)}>
            {r.name}
          </button>
        ))}
      </div>

      <div className="region-detail">
        <div className="rd-head">
          <h3 style={{ margin: 0 }}>{region.name}</h3>
          <span className="tag">{region.pop2100Share} of 2100 population</span>
        </div>
        <div className="rd-grid">
          <div>
            <div className="eyebrow">Binding constraint</div>
            <p>{region.binding}</p>
          </div>
          <div>
            <div className="eyebrow">Worst-exposed</div>
            <p>{region.worst}</p>
          </div>
          <div>
            <div className="eyebrow">Buffer zone</div>
            <p>{region.buffer}</p>
          </div>
        </div>
        <div className="callout navy" style={{ margin: "4px 0 0" }}>
          <div className="co-label">Verdict</div>
          <p>{region.verdict}</p>
        </div>
      </div>
    </div>
  );
}
