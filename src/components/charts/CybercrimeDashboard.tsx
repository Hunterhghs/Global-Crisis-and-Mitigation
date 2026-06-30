import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { cyberCostTrend, attackTypes, digitalDivide, targetedSectors } from "../../data/cybercrime";
import { palette, axisStyle, gridStyle, useIsMobile } from "./theme";

type View = "cost" | "types" | "sectors" | "divide";

const views: { key: View; label: string }[] = [
  { key: "cost", label: "Cost trajectory" },
  { key: "types", label: "Attack types" },
  { key: "sectors", label: "Targeted sectors" },
  { key: "divide", label: "Digital divide" },
];

export default function CybercrimeDashboard() {
  const [view, setView] = useState<View>("cost");
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

      {view === "cost" && (
        <div className="chart-card">
          <div className="chart-title">Global cost of cybercrime (US$ trillions / year)</div>
          <div className="chart-sub">Growing ~30% a year — faster than almost any legitimate sector.</div>
          <div style={{ width: "100%", height: 340 }}>
            <ResponsiveContainer>
              <AreaChart data={cyberCostTrend} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                <defs>
                  <linearGradient id="cyberFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={palette.signal} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={palette.signal} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid {...gridStyle} vertical={false} />
                <XAxis dataKey="year" tick={axisStyle} tickLine={false} axisLine={{ stroke: palette.rule }} />
                <YAxis tick={axisStyle} tickLine={false} axisLine={false} unit="T" />
                <Tooltip formatter={(v: number) => [`$${v}T`, "Annual cost"]} />
                <Area type="monotone" dataKey="cost" stroke={palette.signal} strokeWidth={2.5} fill="url(#cyberFill)" dot={{ r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Source: Cybersecurity Ventures. Would rank as the world's 3rd-largest economy.</div>
        </div>
      )}

      {view === "types" && (
        <div className="chart-card">
          <div className="chart-title">Share of reported losses by attack type (%)</div>
          <div className="chart-sub">Fraud and scams now outweigh ransomware in dollar terms.</div>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <BarChart data={attackTypes} layout="vertical" margin={{ top: 4, right: 28, bottom: 4, left: 8 }}>
                <CartesianGrid {...gridStyle} horizontal={false} />
                <XAxis type="number" unit="%" tick={axisStyle} tickLine={false} axisLine={{ stroke: palette.rule }} />
                <YAxis
                  type="category"
                  dataKey="type"
                  width={isMobile ? 120 : 210}
                  tick={{ ...axisStyle, fontSize: 9.5 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip cursor={{ fill: "rgba(15,42,67,0.05)" }} formatter={(v: number) => `${v}%`} />
                <Bar dataKey="share" fill={palette.navy} radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Source: FBI IC3 / industry synthesis.</div>
        </div>
      )}

      {view === "sectors" && (
        <div className="chart-card">
          <div className="chart-title">Most-targeted sectors (relative index)</div>
          <div className="chart-sub">Critical services — health, finance, infrastructure — draw the most attacks.</div>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <BarChart data={targetedSectors} margin={{ top: 8, right: 16, bottom: 50, left: 0 }}>
                <CartesianGrid {...gridStyle} vertical={false} />
                <XAxis
                  dataKey="sector"
                  tick={{ ...axisStyle, fontSize: 9.5 }}
                  angle={-22}
                  textAnchor="end"
                  interval={0}
                  height={64}
                  tickLine={false}
                  axisLine={{ stroke: palette.rule }}
                />
                <YAxis tick={axisStyle} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip cursor={{ fill: "rgba(15,42,67,0.05)" }} />
                <Bar dataKey="idx" radius={[2, 2, 0, 0]}>
                  {targetedSectors.map((d) => (
                    <Cell key={d.sector} fill={d.idx >= 80 ? palette.signal : palette.amber} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Indicative targeting index; healthcare and finance lead.</div>
        </div>
      )}

      {view === "divide" && (
        <div className="chart-card">
          <div className="chart-title">Internet penetration by region (% online)</div>
          <div className="chart-sub">The flip side of cyber-risk: ~2.6B people remain offline.</div>
          <div style={{ width: "100%", height: 340 }}>
            <ResponsiveContainer>
              <BarChart data={digitalDivide} layout="vertical" margin={{ top: 4, right: 28, bottom: 4, left: 8 }}>
                <CartesianGrid {...gridStyle} horizontal={false} />
                <XAxis type="number" unit="%" domain={[0, 100]} tick={axisStyle} tickLine={false} axisLine={{ stroke: palette.rule }} />
                <YAxis
                  type="category"
                  dataKey="region"
                  width={isMobile ? 110 : 150}
                  tick={{ ...axisStyle, fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip cursor={{ fill: "rgba(15,42,67,0.05)" }} formatter={(v: number) => `${v}% online`} />
                <Bar dataKey="online" fill={palette.teal} radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Source: ITU. Connectivity without resilience widens the attack surface.</div>
        </div>
      )}
    </div>
  );
}
