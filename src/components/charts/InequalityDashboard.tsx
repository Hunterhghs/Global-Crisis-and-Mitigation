import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { wealthShare, incomeTop10, povertyTrend, climateEquity } from "../../data/inequality";
import { palette, axisStyle, gridStyle, seriesColors, useIsMobile } from "./theme";

type View = "wealth" | "income" | "poverty" | "climate";

const views: { key: View; label: string }[] = [
  { key: "wealth", label: "Wealth share" },
  { key: "income", label: "Income by region" },
  { key: "poverty", label: "Poverty trend" },
  { key: "climate", label: "Emit vs exposed" },
];

export default function InequalityDashboard() {
  const [view, setView] = useState<View>("wealth");
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

      {view === "wealth" && (
        <div className="chart-card">
          <div className="chart-title">Global wealth held by each group (%)</div>
          <div className="chart-sub">The bottom half of humanity holds about 2% of global wealth.</div>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={wealthShare}
                  dataKey="share"
                  nameKey="group"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  innerRadius={55}
                  paddingAngle={1.5}
                  label={(e: any) => `${e.group}: ${e.share}%`}
                  labelLine={false}
                  fontSize={11}
                >
                  {wealthShare.map((_, i) => (
                    <Cell key={i} fill={seriesColors[i % seriesColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Source: World Inequality Report.</div>
        </div>
      )}

      {view === "income" && (
        <div className="chart-card">
          <div className="chart-title">Income captured by the top 10% (% of regional income)</div>
          <div className="chart-sub">Higher bars = more concentrated income.</div>
          <div style={{ width: "100%", height: 340 }}>
            <ResponsiveContainer>
              <BarChart data={incomeTop10} layout="vertical" margin={{ top: 4, right: 28, bottom: 4, left: 8 }}>
                <CartesianGrid {...gridStyle} horizontal={false} />
                <XAxis type="number" unit="%" domain={[0, 70]} tick={axisStyle} tickLine={false} axisLine={{ stroke: palette.rule }} />
                <YAxis
                  type="category"
                  dataKey="region"
                  width={isMobile ? 112 : 170}
                  tick={{ ...axisStyle, fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip cursor={{ fill: "rgba(15,42,67,0.05)" }} formatter={(v: number) => `${v}%`} />
                <Bar dataKey="top10" fill={palette.navy} radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Source: World Inequality Report. MENA, Sub-Saharan Africa and Latin America are most concentrated.</div>
        </div>
      )}

      {view === "poverty" && (
        <div className="chart-card">
          <div className="chart-title">Extreme poverty rate (% of world population, &lt;$2.15/day)</div>
          <div className="chart-sub">Decades of decline stalled — and reversed — around 2020.</div>
          <div style={{ width: "100%", height: 340 }}>
            <ResponsiveContainer>
              <LineChart data={povertyTrend} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                <CartesianGrid {...gridStyle} vertical={false} />
                <XAxis dataKey="year" tick={axisStyle} tickLine={false} axisLine={{ stroke: palette.rule }} />
                <YAxis tick={axisStyle} tickLine={false} axisLine={false} unit="%" />
                <Tooltip formatter={(v: number) => `${v}%`} />
                <Line type="monotone" dataKey="rate" name="Extreme poverty" stroke={palette.signal} strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Source: World Bank. The 2020 uptick reflects the pandemic shock.</div>
        </div>
      )}

      {view === "climate" && (
        <div className="chart-card">
          <div className="chart-title">Who causes vs who carries the climate burden (%)</div>
          <div className="chart-sub">Carbon emissions versus exposure to climate harm, by global income group.</div>
          <div style={{ width: "100%", height: 340 }}>
            <ResponsiveContainer>
              <BarChart data={climateEquity} margin={{ top: 8, right: 16, bottom: 8, left: 0 }} barCategoryGap="22%">
                <CartesianGrid {...gridStyle} vertical={false} />
                <XAxis dataKey="group" tick={{ ...axisStyle, fontSize: 10 }} tickLine={false} axisLine={{ stroke: palette.rule }} />
                <YAxis tick={axisStyle} tickLine={false} axisLine={false} unit="%" />
                <Tooltip cursor={{ fill: "rgba(15,42,67,0.05)" }} formatter={(v: number) => `${v}%`} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar dataKey="emissions" name="Share of emissions" fill={palette.slate} radius={[2, 2, 0, 0]} />
                <Bar dataKey="exposure" name="Share of exposure" fill={palette.signal} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Illustrative. The bottom 50% emit least but absorb most of the harm.</div>
        </div>
      )}
    </div>
  );
}
