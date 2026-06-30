import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ReferenceLine,
} from "recharts";
import {
  airPM25,
  whoPM25Guideline,
  airSources,
  waterAccess,
  foodContaminants,
  pollutionTrend,
} from "../../data/pollution";
import { palette, axisStyle, gridStyle, useIsMobile } from "./theme";

type View = "air" | "sources" | "water" | "food" | "trend";

const views: { key: View; label: string }[] = [
  { key: "air", label: "Air (PM₂.₅)" },
  { key: "sources", label: "Air sources" },
  { key: "water", label: "Water access" },
  { key: "food", label: "Food contamination" },
  { key: "trend", label: "Trajectory" },
];

function pmColor(pm: number) {
  if (pm >= 35) return palette.signal;
  if (pm >= 15) return palette.amber;
  if (pm >= 10) return palette.teal;
  return palette.green;
}

export default function PollutionDashboard() {
  const [view, setView] = useState<View>("air");
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

      {view === "air" && (
        <div className="chart-card">
          <div className="chart-title">Population-weighted PM₂.₅ by region (µg/m³)</div>
          <div className="chart-sub">
            Dashed line = WHO guideline of {whoPM25Guideline} µg/m³. Almost every region sits multiples above it.
          </div>
          <div style={{ width: "100%", height: 360 }}>
            <ResponsiveContainer>
              <BarChart data={airPM25} margin={{ top: 8, right: 16, bottom: 64, left: 0 }}>
                <CartesianGrid {...gridStyle} vertical={false} />
                <XAxis
                  dataKey="region"
                  tick={{ ...axisStyle, fontSize: 9.5 }}
                  angle={-32}
                  textAnchor="end"
                  interval={0}
                  height={74}
                  tickLine={false}
                  axisLine={{ stroke: palette.rule }}
                />
                <YAxis tick={axisStyle} tickLine={false} axisLine={false} unit="" />
                <Tooltip
                  cursor={{ fill: "rgba(15,42,67,0.05)" }}
                  formatter={(v: number) => [`${v} µg/m³`, "PM₂.₅"]}
                />
                <ReferenceLine
                  y={whoPM25Guideline}
                  stroke={palette.ink}
                  strokeDasharray="4 3"
                  label={{ value: "WHO 5", position: "insideTopRight", fontSize: 10, fill: palette.ink }}
                />
                <Bar dataKey="pm" radius={[2, 2, 0, 0]}>
                  {airPM25.map((d) => (
                    <Cell key={d.region} fill={pmColor(d.pm)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Source: WHO / State of Global Air. ~94% of people breathe air above the guideline.</div>
        </div>
      )}

      {view === "sources" && (
        <div className="chart-card">
          <div className="chart-title">Where ambient PM₂.₅ comes from (global share)</div>
          <div className="chart-sub">Combustion dominates — the same fossil sources that drive heat.</div>
          <div style={{ width: "100%", height: 340 }}>
            <ResponsiveContainer>
              <BarChart data={airSources} layout="vertical" margin={{ top: 4, right: 28, bottom: 4, left: 8 }}>
                <CartesianGrid {...gridStyle} horizontal={false} />
                <XAxis type="number" unit="%" tick={axisStyle} tickLine={false} axisLine={{ stroke: palette.rule }} />
                <YAxis
                  type="category"
                  dataKey="source"
                  width={isMobile ? 118 : 210}
                  tick={{ ...axisStyle, fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip cursor={{ fill: "rgba(15,42,67,0.05)" }} formatter={(v: number) => `${v}%`} />
                <Bar dataKey="share" fill={palette.navy} radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Indicative global mix; composition varies sharply by city and season.</div>
        </div>
      )}

      {view === "water" && (
        <div className="chart-card">
          <div className="chart-title">Safely managed drinking water (% of population)</div>
          <div className="chart-sub">The share with — and without — reliably safe water at home.</div>
          <div style={{ width: "100%", height: 360 }}>
            <ResponsiveContainer>
              <BarChart data={waterAccess} margin={{ top: 8, right: 16, bottom: 64, left: 0 }} barCategoryGap="22%">
                <CartesianGrid {...gridStyle} vertical={false} />
                <XAxis
                  dataKey="region"
                  tick={{ ...axisStyle, fontSize: 9.5 }}
                  angle={-32}
                  textAnchor="end"
                  interval={0}
                  height={74}
                  tickLine={false}
                  axisLine={{ stroke: palette.rule }}
                />
                <YAxis tick={axisStyle} tickLine={false} axisLine={false} unit="%" domain={[0, 100]} />
                <Tooltip cursor={{ fill: "rgba(15,42,67,0.05)" }} formatter={(v: number) => `${v}%`} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar dataKey="safe" name="Safely managed" stackId="w" fill={palette.teal} />
                <Bar dataKey="unsafe" name="Unsafe / unmanaged" stackId="w" fill={palette.signal} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Source: WHO / UNICEF Joint Monitoring Programme.</div>
        </div>
      )}

      {view === "food" && (
        <div className="chart-card">
          <div className="chart-title">Food-chain contamination load (relative)</div>
          <div className="chart-sub">How pervasive each contaminant is across the global food supply.</div>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <BarChart data={foodContaminants} layout="vertical" margin={{ top: 4, right: 28, bottom: 4, left: 8 }}>
                <CartesianGrid {...gridStyle} horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={axisStyle} tickLine={false} axisLine={{ stroke: palette.rule }} />
                <YAxis
                  type="category"
                  dataKey="contaminant"
                  width={isMobile ? 112 : 180}
                  tick={{ ...axisStyle, fontSize: 9.5 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(15,42,67,0.05)" }}
                  formatter={(v: number, _n, item: any) => [item.payload.route, "Route"]}
                />
                <Bar dataKey="load" fill={palette.plum} radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Hover for the contamination route. Heavy metals and microplastics are the most pervasive.</div>
        </div>
      )}

      {view === "trend" && (
        <div className="chart-card">
          <div className="chart-title">PM₂.₅ trajectory — developed vs developing (index, 2000 = 100)</div>
          <div className="chart-sub">Rich economies have cut air pollution; developing exposure peaked later and falls slower.</div>
          <div style={{ width: "100%", height: 340 }}>
            <ResponsiveContainer>
              <LineChart data={pollutionTrend} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                <CartesianGrid {...gridStyle} vertical={false} />
                <XAxis dataKey="year" tick={axisStyle} tickLine={false} axisLine={{ stroke: palette.rule }} />
                <YAxis tick={axisStyle} tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Line type="monotone" dataKey="developed" name="Developed" stroke={palette.teal} strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="developing" name="Developing" stroke={palette.signal} strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Illustrative index. Convergence depends on the clean-energy transition in developing economies.</div>
        </div>
      )}
    </div>
  );
}
