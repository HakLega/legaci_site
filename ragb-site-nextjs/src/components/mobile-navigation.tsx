"use client";

import { useEffect, useState } from "react";

type NavigationItem = { href: string; label: string };

export default function MobileNavigation({ items }: { items: NavigationItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <div className="mobile-navigation">
      <button
        className="mobile-toggle"
        type="button"
        aria-label={isOpen ? "Fechar navegação" : "Abrir navegação"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-links"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{isOpen ? "Fechar" : "Menu"}</span>
        <span className={`menu-lines${isOpen ? " menu-lines-open" : ""}`} aria-hidden="true">
          <span />
          <span />
        </span>
      </button>
      {isOpen && (
        <nav id="mobile-navigation-links" aria-label="Navegação móvel">
          {items.map((item) => (
            <a href={item.href} key={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="#contato" onClick={() => setIsOpen(false)}>Fale com a Leggare</a>
        </nav>
      )}
    </div>
  );
}
