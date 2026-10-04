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
          <svg width="112" height="112" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#d6a18a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M39 39C27 15 12 11 9 24c-3 13 10 24 28 22" />
              <path d="M41 39c12-24 27-28 30-15 3 13-10 24-28 22" />
              <path d="M38 43C23 36 15 42 19 53c4 10 14 12 21-3" />
              <path d="M42 43c15-7 23-1 19 10-4 10-14 12-21-3" />
              <path d="M40 36v22M39 35c-3-7-7-10-12-11M41 35c3-7 7-10 12-11" />
            </g>
          </svg>
        </div>
      </div>
    ),
    { ...size },
  );
}
