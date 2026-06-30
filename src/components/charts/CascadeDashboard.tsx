import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { ewasteTrend, feelsLikeCities, compoundStress } from "../../data/cascades";
import { palette, axisStyle, gridStyle, useIsMobile } from "./theme";

type View = "ewaste" | "feels" | "compound";

const views: { key: View; label: string }[] = [
  { key: "ewaste", label: "Battery & e-waste" },
  { key: "feels", label: "Feels-like cities" },
  { key: "compound", label: "Compound stress" },
];

const compoundColor: Record<string, string> = {
  "Heat only": palette.amber,
  "Pollution only": palette.slate,
  "Heat + pollution": palette.salmon,
  "Heat + pollution + water": palette.signal,
  "Buffered (low stress)": palette.teal,
};

export default function CascadeDashboard() {
  const [view, setView] = useState<View>("ewaste");
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

      {view === "ewaste" && (
        <div className="chart-card">
          <div className="chart-title">E-waste & battery waste (Mt / year)</div>
          <div className="chart-sub">The transition that cuts emissions creates its own waste stream — battery waste grows fastest.</div>
          <div style={{ width: "100%", height: 360 }}>
            <ResponsiveContainer>
              <AreaChart data={ewasteTrend} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                <defs>
                  <linearGradient id="ewFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={palette.slate} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={palette.slate} stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="batFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={palette.signal} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={palette.signal} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid {...gridStyle} vertical={false} />
                <XAxis dataKey="year" tick={axisStyle} tickLine={false} axisLine={{ stroke: palette.rule }} />
                <YAxis tick={axisStyle} tickLine={false} axisLine={false} unit="Mt" />
                <Tooltip formatter={(v: number) => `${v} Mt`} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Area type="monotone" dataKey="ewaste" name="All e-waste" stroke={palette.slate} strokeWidth={2} fill="url(#ewFill)" />
                <Area type="monotone" dataKey="batteries" name="Battery waste" stroke={palette.signal} strokeWidth={2.5} fill="url(#batFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Source: Global E-waste Monitor / IEA. Only ~22% of e-waste is formally recycled today.</div>
        </div>
      )}

      {view === "feels" && (
        <div className="chart-card">
          <div className="chart-title">Air vs feels-like peak in major cities (°C)</div>
          <div className="chart-sub">Humidity pushes the "feels-like" heat index far above the air temperature.</div>
          <div style={{ width: "100%", height: 360 }}>
            <ResponsiveContainer>
              <BarChart data={feelsLikeCities} margin={{ top: 8, right: 16, bottom: 64, left: 0 }} barCategoryGap="20%">
                <CartesianGrid {...gridStyle} vertical={false} />
                <XAxis
                  dataKey="city"
                  tick={{ ...axisStyle, fontSize: 9 }}
                  angle={-32}
                  textAnchor="end"
                  interval={0}
                  height={74}
                  tickLine={false}
                  axisLine={{ stroke: palette.rule }}
                />
                <YAxis tick={axisStyle} tickLine={false} axisLine={false} unit="°C" />
                <Tooltip cursor={{ fill: "rgba(15,42,67,0.05)" }} formatter={(v: number) => `${v}°C`} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar dataKey="air" name="Air temp" fill={palette.navy} radius={[2, 2, 0, 0]} />
                <Bar dataKey="feels" name="Feels-like" fill={palette.signal} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Late-century weak-path peaks. Feels-like above ~55°C is dangerous for sustained exposure.</div>
        </div>
      )}

      {view === "compound" && (
        <div className="chart-card">
          <div className="chart-title">Compound stress — share of population by exposure mix (%)</div>
          <div className="chart-sub">Most people face more than one stressor at once. Heat + pollution is the dominant combination.</div>
          <div style={{ width: "100%", height: 340 }}>
            <ResponsiveContainer>
              <BarChart data={compoundStress} layout="vertical" margin={{ top: 4, right: 30, bottom: 4, left: 8 }}>
                <CartesianGrid {...gridStyle} horizontal={false} />
                <XAxis type="number" unit="%" domain={[0, 60]} tick={axisStyle} tickLine={false} axisLine={{ stroke: palette.rule }} />
                <YAxis
                  type="category"
                  dataKey="combo"
                  width={isMobile ? 118 : 190}
                  tick={{ ...axisStyle, fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip cursor={{ fill: "rgba(15,42,67,0.05)" }} formatter={(v: number) => `${v}% of population`} />
                <Bar dataKey="share" radius={[0, 2, 2, 0]}>
                  {compoundStress.map((d) => (
                    <Cell key={d.combo} fill={compoundColor[d.combo] ?? palette.navy} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Illustrative synthesis. ~85% face heat and/or pollution stress in combination late century.</div>
        </div>
      )}
    </div>
  );
}
