"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import ButterflyMark from "./butterfly-mark";

type OrbitState = "idle" | "running" | "paused";

const LIGHT_REACH = 280;
const LIGHT_SMOOTHING_MS = 115;

type LightMotion = {
  pointerX: number;
  pointerY: number;
  directionX: number;
  directionY: number;
  intensity: number;
};

function applyLightStyles(heroArt: HTMLDivElement, radius: number, light: LightMotion) {
  const contactX = light.directionX * radius;
  const contactY = light.directionY * radius;
  const angle = Math.atan2(light.directionY, light.directionX) * (180 / Math.PI);
  heroArt.style.setProperty("--pointer-x", `${light.pointerX}px`);
  heroArt.style.setProperty("--pointer-y", `${light.pointerY}px`);
  heroArt.style.setProperty("--light-contact-x", `${contactX}px`);
  heroArt.style.setProperty("--light-contact-y", `${contactY}px`);
  heroArt.style.setProperty("--light-bloom-x", `${contactX + light.directionX * 90}px`);
  heroArt.style.setProperty("--light-bloom-y", `${contactY + light.directionY * 90}px`);
  heroArt.style.setProperty("--light-local-x", `${(0.5 + light.directionX * 0.5) * 100}%`);
  heroArt.style.setProperty("--light-local-y", `${(0.5 + light.directionY * 0.5) * 100}%`);
  heroArt.style.setProperty("--light-angle", `${angle}deg`);
  heroArt.style.setProperty("--light-intensity", `${light.intensity}`);
  heroArt.style.setProperty("--light-scale", `${0.9 + light.intensity * 0.1}`);
}

export default function ButterflyInteraction() {
  const [orbitState, setOrbitState] = useState<OrbitState>("idle");
  const controlRef = useRef<HTMLButtonElement>(null);
  const lastDirection = useRef({ x: 1, y: 0 });
  const currentLight = useRef<LightMotion>({ pointerX: 0, pointerY: 0, directionX: 1, directionY: 0, intensity: 0 });
  const targetLight = useRef<LightMotion>({ pointerX: 0, pointerY: 0, directionX: 1, directionY: 0, intensity: 0 });
  const hasLightPosition = useRef(false);
  const lightFrame = useRef<number | null>(null);
  const previousFrameTime = useRef(0);

  useEffect(() => () => {
    if (lightFrame.current !== null) cancelAnimationFrame(lightFrame.current);
  }, []);

  function animateLight(heroArt: HTMLDivElement, radius: number) {
    if (lightFrame.current !== null) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      currentLight.current = { ...targetLight.current };
      applyLightStyles(heroArt, radius, currentLight.current);
      return;
    }

    const updateLight = (time: number) => {
      const delta = previousFrameTime.current === 0 ? 16.67 : Math.min(time - previousFrameTime.current, 40);
      previousFrameTime.current = time;
      const amount = 1 - Math.exp(-delta / LIGHT_SMOOTHING_MS);
      const current = currentLight.current;
      const target = targetLight.current;
      current.pointerX += (target.pointerX - current.pointerX) * amount;
      current.pointerY += (target.pointerY - current.pointerY) * amount;
      current.intensity += (target.intensity - current.intensity) * amount;

      const currentAngle = Math.atan2(current.directionY, current.directionX);
      const targetAngle = Math.atan2(target.directionY, target.directionX);
      const angleDelta = Math.atan2(Math.sin(targetAngle - currentAngle), Math.cos(targetAngle - currentAngle));
      const smoothedAngle = currentAngle + angleDelta * amount;
      current.directionX = Math.cos(smoothedAngle);
      current.directionY = Math.sin(smoothedAngle);

      applyLightStyles(heroArt, radius, current);

      const settled = Math.abs(target.pointerX - current.pointerX) < 0.08
        && Math.abs(target.pointerY - current.pointerY) < 0.08
        && Math.abs(target.intensity - current.intensity) < 0.001
        && Math.abs(angleDelta) < 0.001;

      if (settled) {
        current.pointerX = target.pointerX;
        current.pointerY = target.pointerY;
        current.directionX = target.directionX;
        current.directionY = target.directionY;
        current.intensity = target.intensity;
        previousFrameTime.current = 0;
        lightFrame.current = null;
        return;
      }

      lightFrame.current = requestAnimationFrame(updateLight);
    };

    lightFrame.current = requestAnimationFrame(updateLight);
  }

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
    const pointerX = event.clientX - artBounds.left;
    const pointerY = event.clientY - artBounds.top;
    targetLight.current = {
      pointerX,
      pointerY,
      directionX: direction.x,
      directionY: direction.y,
      intensity,
    };

    if (!hasLightPosition.current) {
      currentLight.current.pointerX = pointerX;
      currentLight.current.pointerY = pointerY;
      currentLight.current.directionX = direction.x;
      currentLight.current.directionY = direction.y;
      hasLightPosition.current = true;
    }

    animateLight(heroArt, radius);
  }

  function clearLight(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "touch") {
      targetLight.current.intensity = 0;
      animateLight(event.currentTarget, controlRef.current ? controlRef.current.offsetWidth / 2 : 105);
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
