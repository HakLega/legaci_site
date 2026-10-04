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
          <svg width="112" height="112" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g fill="#d6a18a">
              <path d="M56 77C54 60 50 41 35 25 27 17 18 11 8 8c8 18 8 37 19 48 8 9 19 11 27 16 4 2 6 4 2 5Z" />
              <path d="M55 73c-8-8-17-12-26-9C15 68 9 80 10 98c17-1 31-6 41-16 4-4 6-7 4-9Z" />
              <path d="M55 82c12-15 20-32 17-51M58 82c15-12 25-25 31-39" fill="none" stroke="#d6a18a" strokeWidth="3.6" strokeLinecap="round" />
              <circle cx="72" cy="29" r="3.5" />
              <circle cx="90" cy="41" r="3.5" />
            </g>
          </svg>
        </div>
      </div>
    ),
    { ...size },
  );
}
