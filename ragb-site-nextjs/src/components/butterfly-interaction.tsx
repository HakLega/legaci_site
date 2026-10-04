"use client";

import { useRef, useState, type PointerEvent } from "react";
import ButterflyMark from "./butterfly-mark";

type OrbitState = "idle" | "running" | "paused";

const HALO_SPREAD = 160;

export default function ButterflyInteraction() {
  const [orbitState, setOrbitState] = useState<OrbitState>("idle");
  const controlRef = useRef<HTMLButtonElement>(null);
  const lastDirection = useRef({ x: 1, y: 0 });

  function moveLight(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || !controlRef.current) return;

    const control = controlRef.current;
    const bounds = control.getBoundingClientRect();
    const dx = event.clientX - (bounds.left + bounds.width / 2);
    const dy = event.clientY - (bounds.top + bounds.height / 2);
    const distance = Math.hypot(dx, dy);
    const radius = Math.min(bounds.width, bounds.height) / 2;

    if (distance > 1) {
      lastDirection.current = { x: dx / distance, y: dy / distance };
    }

    const proximity = Math.max(0, Math.min(1, 1 - Math.max(0, distance - radius) / HALO_SPREAD));
    const intensity = proximity * proximity * (3 - 2 * proximity);
    const direction = lastDirection.current;
    const edge = HALO_SPREAD + radius;
    const focusX = edge + direction.x * radius;
    const focusY = edge + direction.y * radius;
    const haloX = focusX + direction.x * 18;
    const haloY = focusY + direction.y * 18;

    control.style.setProperty("--glow-x", `${focusX}px`);
    control.style.setProperty("--glow-y", `${focusY}px`);
    control.style.setProperty("--glow-halo-x", `${haloX}px`);
    control.style.setProperty("--glow-halo-y", `${haloY}px`);
    control.style.setProperty("--glow-direction-x", `${direction.x}`);
    control.style.setProperty("--glow-direction-y", `${direction.y}`);
    control.style.setProperty("--glow-intensity", `${intensity}`);
  }

  function clearLight(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "touch") {
      controlRef.current?.style.setProperty("--glow-intensity", "0");
    }
  }

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
    <div
      className={`hero-art${hasStarted ? " has-started" : ""}${orbitState === "running" ? " is-spinning" : ""}${orbitState === "paused" ? " is-paused" : ""}`}
      onPointerMove={moveLight}
      onPointerLeave={clearLight}
      onPointerCancel={clearLight}
    >
      <div className="art-ring art-ring-one" aria-hidden="true" />
      <div className="art-ring art-ring-two" aria-hidden="true" />
      <div className="art-orbit" aria-hidden="true">
        <span className="art-label art-label-top">ANVISA</span>
        <span className="art-label art-label-bottom">MAPA</span>
      </div>
      <button
        ref={controlRef}
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
