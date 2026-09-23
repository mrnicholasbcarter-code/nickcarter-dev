import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} · AI infrastructure & decision systems`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "76px", background: "#07111f", color: "#eaf1fb", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", color: "#74e3c1", fontSize: 25, letterSpacing: "0.16em", textTransform: "uppercase" }}>AI infrastructure · decision systems</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700 }}>{site.name}</div>
        <div style={{ display: "flex", marginTop: "22px", color: "#aebdd0", fontSize: 34 }}>Software systems that make uncertainty explicit.</div>
      </div>
      <div style={{ display: "flex", color: "#7f93aa", fontSize: 24 }}>nickcarter.dev</div>
    </div>,
    size,
  );
}
