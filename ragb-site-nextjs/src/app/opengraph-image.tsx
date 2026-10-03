import { ImageResponse } from "next/og";

export const alt = "Leggare — Consultoria regulatória";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "76px 88px",
          color: "#f7f5ef",
          background: "#163733",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", maxWidth: 760, flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#d6a18a", fontFamily: "Arial, sans-serif", fontSize: 20, letterSpacing: 5, textTransform: "uppercase" }}>
            <span style={{ width: 40, height: 1, background: "#d6a18a" }} />
            Consultoria regulatória
          </div>
          <div style={{ display: "flex", marginTop: 44, fontSize: 76, lineHeight: 1.08, letterSpacing: -3 }}>
            Clareza regulatória para avançar com segurança.
          </div>
          <div style={{ display: "flex", marginTop: 36, color: "#cbd8cf", fontFamily: "Arial, sans-serif", fontSize: 25 }}>
            Leggare
          </div>
        </div>
        <div style={{ display: "flex", width: 220, height: 220, alignItems: "center", justifyContent: "center", border: "1px solid #91aaa0", borderRadius: "50%" }}>
          <div style={{ display: "flex", width: 140, height: 140, alignItems: "center", justifyContent: "center", border: "1px dashed #d6a18a", borderRadius: "50%", color: "#d6a18a", fontSize: 56 }}>
            LG
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
