import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Playbox · Oynamaya hazır mısın?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(at 20% 20%, rgba(232,117,39,0.45) 0%, transparent 55%), radial-gradient(at 85% 85%, rgba(168,90,142,0.40) 0%, transparent 50%), #1a1f3a",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 14, height: 14, borderRadius: 9999, background: "#e87527" }} />
          <span style={{ fontSize: 22, letterSpacing: 6, color: "rgba(255,255,255,0.7)" }}>PLAYBOX TÜRKİYE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 180, lineHeight: 0.9, fontWeight: 900, letterSpacing: -4, textTransform: "uppercase" }}>
            OYNAMAYA
          </span>
          <span style={{ fontSize: 180, lineHeight: 0.9, fontWeight: 900, letterSpacing: -4, textTransform: "uppercase" }}>
            HAZIR <span style={{ color: "#e87527" }}>MISIN?</span>
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={{ fontSize: 32, color: "rgba(255,255,255,0.7)", fontStyle: "italic", maxWidth: 700 }}>
            Şehrin her köşesinde, cebinden çıkan bir spor sahası.
          </span>
          <span style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", letterSpacing: 4 }}>
            PLAYBOX.COM.TR
          </span>
        </div>
      </div>
    ),
    size
  );
}
