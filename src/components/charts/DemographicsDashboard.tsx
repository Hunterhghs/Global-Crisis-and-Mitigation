import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { populationByRegion, medianAge, dependencyRatio } from "../../data/demographics";
import { palette, axisStyle, gridStyle } from "./theme";

type View = "population" | "age" | "dependency";

const views: { key: View; label: string }[] = [
  { key: "population", label: "Population divergence" },
  { key: "age", label: "Median age" },
  { key: "dependency", label: "Old-age dependency" },
];

export default function DemographicsDashboard() {
  const [view, setView] = useState<View>("population");

  return (
    <div>
      <div className="chart-controls">
        {views.map((v) => (
          <button key={v.key} className={view === v.key ? "active" : ""} onClick={() => setView(v.key)}>
            {v.label}
          </button>
        ))}
      </div>

      {view === "population" && (
        <div className="chart-card">
          <div className="chart-title">Population by region, 1950–2100 (billions)</div>
          <div className="chart-sub">Africa rises as Europe and East Asia plateau and decline — the great divergence.</div>
          <div style={{ width: "100%", height: 360 }}>
            <ResponsiveContainer>
              <LineChart data={populationByRegion} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                <CartesianGrid {...gridStyle} vertical={false} />
                <XAxis dataKey="year" tick={axisStyle} tickLine={false} axisLine={{ stroke: palette.rule }} />
                <YAxis tick={axisStyle} tickLine={false} axisLine={false} unit="B" />
                <Tooltip formatter={(v: number) => `${v}B`} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Line type="monotone" dataKey="africa" name="Sub-Saharan Africa" stroke={palette.signal} strokeWidth={2.5} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="southAsia" name="South & SE Asia" stroke={palette.amber} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="eastAsia" name="East Asia" stroke={palette.teal} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="europe" name="Europe" stroke={palette.navy} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Source: UN World Population Prospects. Africa roughly triples while Europe contracts.</div>
        </div>
      )}

      {view === "age" && (
        <div className="chart-card">
          <div className="chart-title">Median age by region — today vs 2100</div>
          <div className="chart-sub">Aging is near-universal, but Africa stays decades younger than Europe and East Asia.</div>
          <div style={{ width: "100%", height: 360 }}>
            <ResponsiveContainer>
              <BarChart data={medianAge} margin={{ top: 8, right: 16, bottom: 50, left: 0 }} barCategoryGap="22%">
                <CartesianGrid {...gridStyle} vertical={false} />
                <XAxis
                  dataKey="region"
                  tick={{ ...axisStyle, fontSize: 9.5 }}
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                  height={60}
                  tickLine={false}
                  axisLine={{ stroke: palette.rule }}
                />
                <YAxis tick={axisStyle} tickLine={false} axisLine={false} unit="y" />
                <Tooltip cursor={{ fill: "rgba(15,42,67,0.05)" }} formatter={(v: number) => `${v} yrs`} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar dataKey="today" name="Today" fill={palette.slate} radius={[2, 2, 0, 0]} />
                <Bar dataKey="y2100" name="2100" fill={palette.navy} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Source: UN WPP. Africa's median age is ~19 today; Europe's is ~43.</div>
        </div>
      )}

      {view === "dependency" && (
        <div className="chart-card">
          <div className="chart-title">Old-age dependency — people 65+ per 100 working-age</div>
          <div className="chart-sub">Europe and East Asia face a sharp rise; Sub-Saharan Africa stays low.</div>
          <div style={{ width: "100%", height: 360 }}>
            <ResponsiveContainer>
              <BarChart data={dependencyRatio} margin={{ top: 8, right: 16, bottom: 50, left: 0 }} barCategoryGap="18%">
                <CartesianGrid {...gridStyle} vertical={false} />
                <XAxis
                  dataKey="region"
                  tick={{ ...axisStyle, fontSize: 9.5 }}
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                  height={60}
                  tickLine={false}
                  axisLine={{ stroke: palette.rule }}
                />
                <YAxis tick={axisStyle} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: "rgba(15,42,67,0.05)" }} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar dataKey="y2024" name="2024" fill={palette.slate} radius={[2, 2, 0, 0]} />
                <Bar dataKey="y2050" name="2050" fill={palette.amber} radius={[2, 2, 0, 0]} />
                <Bar dataKey="y2075" name="2075" fill={palette.signal} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Source: UN WPP. A rising ratio means fewer workers supporting more retirees.</div>
        </div>
      )}
    </div>
  );
}
