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
    const artBounds = heroArt.getBoundingClientRect();
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
    const contactX = direction.x * radius;
    const contactY = direction.y * radius;

    heroArt.style.setProperty("--light-contact-x", `${contactX}px`);
    heroArt.style.setProperty("--light-contact-y", `${contactY}px`);
    heroArt.style.setProperty("--light-bloom-x", `${contactX + direction.x * 90}px`);
    heroArt.style.setProperty("--light-bloom-y", `${contactY + direction.y * 90}px`);
    heroArt.style.setProperty("--pointer-x", `${event.clientX - artBounds.left}px`);
    heroArt.style.setProperty("--pointer-y", `${event.clientY - artBounds.top}px`);
    heroArt.style.setProperty("--light-local-x", localX);
    heroArt.style.setProperty("--light-local-y", localY);
    heroArt.style.setProperty("--light-angle", `${angle}deg`);
    heroArt.style.setProperty("--light-intensity", `${intensity}`);
    heroArt.style.setProperty("--light-scale", `${0.9 + intensity * 0.1}`);
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
        <span className="hero-light-field-glow" />
        <span className="hero-light-bloom" />
        <span className="hero-light-wrap" />
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
