import { useEffect, useState } from "react";

/** Tracks whether the viewport is in a narrow (mobile) range so charts can
 *  adapt fixed pixel dimensions (e.g. category-axis width) for small screens. */
export function useIsMobile(breakpoint = 560): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [breakpoint]);
  return isMobile;
}

export const palette = {
  navy: "#0f2a43",
  teal: "#237e8b",
  amber: "#c2891b",
  slate: "#6b7a87",
  salmon: "#c4604f",
  green: "#3f7d5a",
  plum: "#7a4b6b",
  signal: "#b3142b",
  ink: "#15191c",
  muted: "#66707a",
  rule: "#ddd7cc",
  paper: "#fbfaf6",
};

export const axisStyle = {
  fontFamily: "Inter, system-ui, sans-serif",
  fontSize: 11,
  fill: "#66707a",
};

export const gridStyle = { stroke: "#ddd7cc", strokeDasharray: "2 3" };

export const seriesColors = [
  palette.navy,
  palette.signal,
  palette.teal,
  palette.amber,
  palette.plum,
  palette.green,
  palette.slate,
];
