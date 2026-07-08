import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Playbox · Sahaya İn. Gerisi Bizde.";
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
            "radial-gradient(at 15% 20%, rgba(214,251,60,0.16) 0%, transparent 50%), radial-gradient(at 88% 88%, rgba(255,92,57,0.16) 0%, transparent 50%), #17181c",
          color: "#f4f3ee",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 14, height: 14, borderRadius: 9999, background: "#d6fb3c" }} />
          <span style={{ fontSize: 22, letterSpacing: 8, color: "rgba(154,154,166,0.9)" }}>PLAYBOX · TÜRKİYE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 112, lineHeight: 0.9, fontWeight: 900, letterSpacing: 2, textTransform: "uppercase" }}>
            SAHAYA İN.
          </span>
          <span
            style={{
              fontSize: 112,
              lineHeight: 0.9,
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#d6fb3c",
            }}
          >
            GERİSİ BİZDE.
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={{ fontSize: 30, color: "rgba(154,154,166,0.95)", maxWidth: 720 }}>
            Sahaların yanında akıllı spor istasyonları.
          </span>
          <span style={{ fontSize: 18, color: "rgba(154,154,166,0.6)", letterSpacing: 4 }}>PLAYBOXSPORT.COM</span>
        </div>
      </div>
    ),
    size
  );
}
