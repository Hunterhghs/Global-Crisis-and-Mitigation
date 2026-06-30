import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { metricBands, extremeHeatDays, popWeightedMAT, cToF } from "../../data/heat";
import { palette, axisStyle, gridStyle } from "./theme";

type Unit = "C" | "F";
type View = "peak" | "days" | "mat";

const metricKeys = [
  { key: "air", label: "Air temp", color: palette.navy },
  { key: "feels", label: "Feels-like", color: palette.signal },
  { key: "wbgt", label: "WBGT (work-safety)", color: palette.amber },
] as const;

export default function HeatDashboard() {
  const [unit, setUnit] = useState<Unit>("C");
  const [view, setView] = useState<View>("peak");
  const [metric, setMetric] = useState<(typeof metricKeys)[number]["key"]>("feels");

  const conv = (c: number) => (unit === "F" ? cToF(c) : c);
  const u = unit === "F" ? "°F" : "°C";

  const peakData = metricBands.map((b) => ({
    region: b.region,
    low: conv((b as any)[metric][0]),
    high: conv((b as any)[metric][1]),
    range: conv((b as any)[metric][1]) - conv((b as any)[metric][0]),
    base: conv((b as any)[metric][0]),
  }));

  const matData = popWeightedMAT.map((m) => ({
    region: m.region,
    Today: conv(m.today),
    "~2090 middle": conv(m.mid),
    "~2090 weak": conv(m.weak),
  }));

  return (
    <div>
      <div className="chart-controls" style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className={view === "peak" ? "active" : ""} onClick={() => setView("peak")}>
            Late-century peaks
          </button>
          <button className={view === "days" ? "active" : ""} onClick={() => setView("days")}>
            Extreme heat days
          </button>
          <button className={view === "mat" ? "active" : ""} onClick={() => setView("mat")}>
            Lived mean temp
          </button>
        </div>
        {view !== "days" && (
          <div style={{ display: "flex", gap: 8 }}>
            <button className={unit === "C" ? "active" : ""} onClick={() => setUnit("C")}>
              °C
            </button>
            <button className={unit === "F" ? "active" : ""} onClick={() => setUnit("F")}>
              °F
            </button>
          </div>
        )}
      </div>

      {view === "peak" && (
        <div className="chart-card">
          <div className="chart-title">Peak late-century urban temperature — weak path (~2090)</div>
          <div className="chart-sub">Bands span plausible peak across cities in each region.</div>
          <div className="chart-controls">
            {metricKeys.map((m) => (
              <button
                key={m.key}
                className={metric === m.key ? "active" : ""}
                onClick={() => setMetric(m.key)}
              >
                {m.label}
              </button>
            ))}
          </div>
          <div style={{ width: "100%", height: 360 }}>
            <ResponsiveContainer>
              <BarChart data={peakData} margin={{ top: 8, right: 16, bottom: 60, left: 0 }}>
                <CartesianGrid {...gridStyle} vertical={false} />
                <XAxis
                  dataKey="region"
                  tick={{ ...axisStyle, fontSize: 9.5 }}
                  angle={-32}
                  textAnchor="end"
                  interval={0}
                  height={70}
                  tickLine={false}
                  axisLine={{ stroke: palette.rule }}
                />
                <YAxis
                  tick={axisStyle}
                  tickLine={false}
                  axisLine={false}
                  unit={u}
                  domain={[unit === "F" ? 60 : 20, "auto"]}
                />
                <Tooltip
                  cursor={{ fill: "rgba(15,42,67,0.05)" }}
                  formatter={(_v, _n, item: any) =>
                    [`${item.payload.low}–${item.payload.high}${u}`, "Peak range"]
                  }
                />
                <Bar dataKey="base" stackId="a" fill="transparent" />
                <Bar dataKey="range" stackId="a" radius={[2, 2, 0, 0]}>
                  {peakData.map((_, i) => (
                    <Cell key={i} fill={metricKeys.find((m) => m.key === metric)!.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">
            Air = dry-bulb · Feels-like = heat index · WBGT = wet-bulb globe (work safety). Ranges across
            SSP scenarios; illustrative.
          </div>
        </div>
      )}

      {view === "days" && (
        <div className="chart-card">
          <div className="chart-title">Extreme heat days per year · present vs ~2050</div>
          <div className="chart-sub">Days with WBGT &gt; 30.5°C in sun — unsafe for sustained outdoor labor.</div>
          <div style={{ width: "100%", height: 380 }}>
            <ResponsiveContainer>
              <ComposedChart
                data={extremeHeatDays}
                layout="vertical"
                margin={{ top: 8, right: 24, bottom: 4, left: 8 }}
              >
                <CartesianGrid {...gridStyle} horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 365]}
                  tick={axisStyle}
                  tickLine={false}
                  axisLine={{ stroke: palette.rule }}
                />
                <YAxis
                  type="category"
                  dataKey="city"
                  width={130}
                  tick={{ ...axisStyle, fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip cursor={{ fill: "rgba(15,42,67,0.05)" }} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar dataKey="present" name="Present" fill={palette.slate} radius={[0, 2, 2, 0]} barSize={9} />
                <Bar dataKey="y2050" name="~2050" fill={palette.signal} radius={[0, 2, 2, 0]} barSize={9} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">Source: World Bank, Unlivable (LAC heat). Belém already exceeds 250 days.</div>
        </div>
      )}

      {view === "mat" && (
        <div className="chart-card">
          <div className="chart-title">Temperature where the median person lives ({u})</div>
          <div className="chart-sub">Population-weighted mean annual temperature — today vs ~2090.</div>
          <div style={{ width: "100%", height: 360 }}>
            <ResponsiveContainer>
              <BarChart data={matData} margin={{ top: 8, right: 16, bottom: 60, left: 0 }} barCategoryGap="18%">
                <CartesianGrid {...gridStyle} vertical={false} />
                <XAxis
                  dataKey="region"
                  tick={{ ...axisStyle, fontSize: 9.5 }}
                  angle={-32}
                  textAnchor="end"
                  interval={0}
                  height={70}
                  tickLine={false}
                  axisLine={{ stroke: palette.rule }}
                />
                <YAxis tick={axisStyle} tickLine={false} axisLine={false} unit={u} />
                <Tooltip cursor={{ fill: "rgba(15,42,67,0.05)" }} formatter={(v: number) => `${v}${u}`} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar dataKey="Today" fill={palette.slate} radius={[2, 2, 0, 0]} />
                <Bar dataKey="~2090 middle" fill={palette.amber} radius={[2, 2, 0, 0]} />
                <Bar dataKey="~2090 weak" fill={palette.signal} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-src">
            Population-weighted MAT runs hotter than land-area means because people cluster in lowland cities.
          </div>
        </div>
      )}
    </div>
  );
}
