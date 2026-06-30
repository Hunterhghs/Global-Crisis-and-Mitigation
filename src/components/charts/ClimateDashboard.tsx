import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import { warmingPaths, emissionsByRegion, seaLevel } from "../../data/climate";
import { palette, axisStyle, gridStyle, useIsMobile } from "./theme";

type View = "warming" | "emissions" | "sea";

const views: { key: View; label: string }[] = [
  { key: "warming", label: "Warming paths" },
  { key: "emissions", label: "Emissions by region" },
  { key: "sea", label: "Sea-level rise" },
];

export default function ClimateDashboard() {
  const [view, setView] = useState<View>("warming");
  const isMobile = useIsMobile();

  return (
    <div>
      <div className="chart-controls">
        {views.map((v) => (
          <button key={v.key} className={view === v.key ? "active" : ""} onClick={() => setView(v.key)}>
            {v.label}
          </button>
        ))}
      </div>

      {view === "warming" && (
        <div className="chart-card">
          <div className="chart-title">Global mean warming above pre-industrial (°C)</div>
          <div className="chart-sub">History plus low (strong cuts), middle, and high (weak) emission paths.</div>
          <div style={{ width: "100%", height: 360 }}>
            <ResponsiveContainer>
              <LineChart data={warmingPaths} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                <CartesianGrid {...gridStyle} vertical={false} />
                <XAxis dataKey="year" tick={axisStyle} tickLine={false} axisLine={{ stroke: palette.rule }} />
                <YAxis tick={axisStyle} tickLine={false} axisLine={false} unit="°C" domain={[0, 5]} />
                <Tooltip formatter={(v: number) => (v == null ? "—" : `+${v}°C`)} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <ReferenceLine y={1.5} stroke={palette.amber} strokeDasharray="4 3" label={{ value: "1.5°C", position: "insideTopLeft", fontSize: 10, fill: palette.amber }} />
                <ReferenceLine y={2} stroke={palette.signal} strokeDasharray="4 3" label={{ value: "2°C", position: "insideTopLeft", fontSize: 10, fill: palette.signal }} />
                <Line type="monotone" dataKey="history" name="Observed" stroke={palette.ink} strokeWidth={3} dot={{ r: 3 }} connectNulls />
                <Line type="monotone" dataKey="low" name="Strong cuts" stroke={palette.teal} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="mid" name="Middle" stroke={palette.amber} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="high" name="Weak / high" stroke={palette.signal} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Source: IPCC AR6 scenario ranges. The 1.5°C and 2°C lines mark the Paris thresholds.</div>
        </div>
      )}

      {view === "emissions" && (
        <div className="chart-card">
          <div className="chart-title">CO₂ emissions by region (Gt/yr)</div>
          <div className="chart-sub">Where today's emissions come from — the forcing behind the warming paths.</div>
          <div style={{ width: "100%", height: 360 }}>
            <ResponsiveContainer>
              <BarChart data={emissionsByRegion} layout="vertical" margin={{ top: 4, right: 30, bottom: 4, left: 8 }}>
                <CartesianGrid {...gridStyle} horizontal={false} />
                <XAxis type="number" tick={axisStyle} tickLine={false} axisLine={{ stroke: palette.rule }} unit="Gt" />
                <YAxis
                  type="category"
                  dataKey="region"
                  width={isMobile ? 112 : 160}
                  tick={{ ...axisStyle, fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip cursor={{ fill: "rgba(15,42,67,0.05)" }} formatter={(v: number, _n, item: any) => [`${v} Gt (${item.payload.share}%)`, "CO₂"]} />
                <Bar dataKey="current" fill={palette.navy} radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Source: Global Carbon Project. Per-capita emissions differ sharply from these totals.</div>
        </div>
      )}

      {view === "sea" && (
        <div className="chart-card">
          <div className="chart-title">Sea-level rise above 2000 (cm)</div>
          <div className="chart-sub">Range between strong-cut (low) and weak (high) paths — locked in for centuries.</div>
          <div style={{ width: "100%", height: 360 }}>
            <ResponsiveContainer>
              <AreaChart data={seaLevel} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                <defs>
                  <linearGradient id="seaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={palette.teal} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={palette.teal} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid {...gridStyle} vertical={false} />
                <XAxis dataKey="year" tick={axisStyle} tickLine={false} axisLine={{ stroke: palette.rule }} />
                <YAxis tick={axisStyle} tickLine={false} axisLine={false} unit="cm" />
                <Tooltip formatter={(v: number) => `${v} cm`} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Area type="monotone" dataKey="high" name="Weak path" stroke={palette.signal} strokeWidth={2} fill="url(#seaFill)" />
                <Area type="monotone" dataKey="low" name="Strong cuts" stroke={palette.teal} strokeWidth={2} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Source: IPCC AR6. Rise continues for centuries even after temperatures stabilize.</div>
        </div>
      )}
    </div>
  );
}
