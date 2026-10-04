"use client";

import { useState, type PointerEvent } from "react";
import ButterflyMark from "./butterfly-mark";

export default function ButterflyInteraction() {
  const [isSpinning, setIsSpinning] = useState(false);

  function moveLight(event: PointerEvent<HTMLButtonElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (bounds.left + bounds.width / 2);
    const dy = event.clientY - (bounds.top + bounds.height / 2);
    const distance = Math.hypot(dx, dy) || 1;
    const radius = Math.min(bounds.width, bounds.height) / 2 + 1;
    const inset = 8;
    const x = ((bounds.width / 2 + (dx / distance) * radius + inset) / (bounds.width + inset * 2)) * 100;
    const y = ((bounds.height / 2 + (dy / distance) * radius + inset) / (bounds.height + inset * 2)) * 100;
    event.currentTarget.style.setProperty("--rim-x", `${x}%`);
    event.currentTarget.style.setProperty("--rim-y", `${y}%`);
  }

  return (
    <div
      className={`hero-art${isSpinning ? " is-spinning" : ""}`}
    >
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
        onPointerMove={moveLight}
        onClick={() => setIsSpinning((spinning) => !spinning)}
      >
        <ButterflyMark className="butterfly-illustration" />
        <span className="butterfly-caption">Regulação<br />com direção</span>
      </button>
    </div>
  );
}
