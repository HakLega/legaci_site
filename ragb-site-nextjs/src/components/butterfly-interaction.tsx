"use client";

import { useState } from "react";
import ButterflyMark from "./butterfly-mark";

type OrbitState = "idle" | "running" | "paused";

export default function ButterflyInteraction() {
  const [orbitState, setOrbitState] = useState<OrbitState>("idle");

  function toggleOrbit() {
    setOrbitState((state) => state === "running" ? "paused" : "running");
  }

  const hasStarted = orbitState !== "idle";
  const label = orbitState === "idle"
    ? "Iniciar rotação das esferas"
    : orbitState === "running"
      ? "Pausar rotação das esferas"
      : "Continuar rotação das esferas";

  return (
    <div className={`hero-art${hasStarted ? " has-started" : ""}${orbitState === "running" ? " is-spinning" : ""}${orbitState === "paused" ? " is-paused" : ""}`}>
      <div className="art-ring art-ring-one" aria-hidden="true" />
      <div className="art-ring art-ring-two" aria-hidden="true" />
      <div className="art-orbit" aria-hidden="true">
        <span className="art-label art-label-bottom">MAPA</span>
      </div>
      <button
        className="butterfly-control"
        type="button"
        aria-pressed={orbitState === "running"}
        aria-label={label}
        onClick={toggleOrbit}
      >
        <ButterflyMark className="butterfly-illustration" />
        <span className="butterfly-caption">Regulação<br />com direção</span>
      </button>
    </div>
  );
}
