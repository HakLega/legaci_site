"use client";

import { useState, type PointerEvent } from "react";
import ButterflyMark from "./butterfly-mark";

export default function ButterflyInteraction() {
  const [isAwake, setIsAwake] = useState(false);

  function moveLight(event: PointerEvent<HTMLButtonElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    event.currentTarget.style.setProperty("--pointer-x", `${x}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${y}%`);
  }

  return (
    <button
      className={`butterfly-control${isAwake ? " is-awake" : ""}`}
      type="button"
      aria-pressed={isAwake}
      aria-label={isAwake ? "Desativar brilho da borboleta" : "Ativar brilho da borboleta"}
      onPointerMove={moveLight}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--pointer-x", "50%");
        event.currentTarget.style.setProperty("--pointer-y", "44%");
      }}
      onClick={() => setIsAwake((awake) => !awake)}
    >
      <span className="butterfly-light" aria-hidden="true" />
      <ButterflyMark className="butterfly-illustration" />
      <span className="butterfly-caption">Regulação<br />com direção</span>
      <span className="butterfly-hint" aria-hidden="true">Clique ou toque para iluminar</span>
    </button>
  );
}
