"use client";

import { useState, type PointerEvent } from "react";
import ButterflyMark from "./butterfly-mark";

export default function ButterflyInteraction() {
  const [isSpinning, setIsSpinning] = useState(false);

  function moveLight(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    event.currentTarget.style.setProperty("--light-x", `${x}%`);
    event.currentTarget.style.setProperty("--light-y", `${y}%`);
  }

  return (
    <div
      className={`hero-art${isSpinning ? " is-spinning" : ""}`}
      onPointerMove={moveLight}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--light-x", "84%");
        event.currentTarget.style.setProperty("--light-y", "15%");
      }}
    >
      <span className="art-light" aria-hidden="true" />
      <div className="art-ring art-ring-one" aria-hidden="true" />
      <div className="art-ring art-ring-two" aria-hidden="true" />
      <div className="art-orbit" aria-hidden="true">
        <span className="art-label art-label-top">ANVISA</span>
        <span className="art-label art-label-bottom">MAPA</span>
      </div>
      <button
        className="butterfly-control"
        type="button"
        aria-pressed={isSpinning}
        aria-label={isSpinning ? "Parar rotação das esferas" : "Girar esferas ao redor da borboleta"}
        onClick={() => setIsSpinning((spinning) => !spinning)}
      >
        <ButterflyMark className="butterfly-illustration" />
        <span className="butterfly-caption">Regulação<br />com direção</span>
      </button>
    </div>
  );
}
