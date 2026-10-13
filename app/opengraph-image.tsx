import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} · ${site.jobTitle} · Taking contract work`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 76px", background: "#f4f0e8", color: "#25241f", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ccc5b8", paddingBottom: 24, fontSize: 20 }}><span>NC / SENIOR AI &amp; FULL-STACK ENGINEER</span><span>REMOTE · US EASTERN</span></div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 88, letterSpacing: "-0.055em", fontFamily: "serif" }}>{site.name}</div>
        <div style={{ display: "flex", marginTop: 26, fontSize: 34, color: "#555247", maxWidth: 980 }}>{`${site.headline} ${site.headlineAccent}`}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#934329", fontSize: 24 }}><span>Taking contract work · 20 years of delivery</span><span>nickcarter.dev ↗</span></div>
    </div>,
    size,
  );
}
