"use client";

import { useRef, useState, type PointerEvent } from "react";
import ButterflyMark from "./butterfly-mark";

type OrbitState = "idle" | "running" | "paused";

const LIGHT_REACH = 280;

export default function ButterflyInteraction() {
  const [orbitState, setOrbitState] = useState<OrbitState>("idle");
  const controlRef = useRef<HTMLButtonElement>(null);
  const lastDirection = useRef({ x: 1, y: 0 });

  function moveLight(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || !controlRef.current) return;

    const control = controlRef.current;
    const heroArt = event.currentTarget;
    const bounds = control.getBoundingClientRect();
    const dx = event.clientX - (bounds.left + bounds.width / 2);
    const dy = event.clientY - (bounds.top + bounds.height / 2);
    const distance = Math.hypot(dx, dy);
    const radius = Math.min(bounds.width, bounds.height) / 2;

    if (distance > 0.5) {
      lastDirection.current = { x: dx / distance, y: dy / distance };
    }

    const proximity = Math.max(0, Math.min(1, 1 - distance / (radius + LIGHT_REACH)));
    const intensity = proximity * proximity * (3 - 2 * proximity);
    const direction = lastDirection.current;
    const angle = Math.atan2(direction.y, direction.x) * (180 / Math.PI);
    const localX = `${(0.5 + direction.x * 0.5) * 100}%`;
    const localY = `${(0.5 + direction.y * 0.5) * 100}%`;

    heroArt.style.setProperty("--light-x", `${direction.x * radius}px`);
    heroArt.style.setProperty("--light-y", `${direction.y * radius}px`);
    heroArt.style.setProperty("--light-dir-x", `${direction.x}`);
    heroArt.style.setProperty("--light-dir-y", `${direction.y}`);
    heroArt.style.setProperty("--light-local-x", localX);
    heroArt.style.setProperty("--light-local-y", localY);
    heroArt.style.setProperty("--light-angle", `${angle}deg`);
    heroArt.style.setProperty("--light-distance", `${distance}px`);
    heroArt.style.setProperty("--light-intensity", `${intensity}`);
    heroArt.style.setProperty("--light-scale", `${0.82 + intensity * 0.18}`);
  }

  function clearLight(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "touch") {
      event.currentTarget.style.setProperty("--light-intensity", "0");
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
      <div className="hero-light-field" aria-hidden="true">
        <span className="hero-light-ambient" />
        <span className="hero-light-bloom" />
        <span className="hero-light-contact" />
      </div>
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
