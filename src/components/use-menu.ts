"use client";

import { useEffect, useRef, useState } from "react";

/** Menu déroulant : se ferme sur un clic à l'extérieur ou avec Échap (pas sur la perte de focus, qui annulait les clics). */
export function useMenu<T extends HTMLElement = HTMLDivElement>() {
  const [ouvert, setOuvert] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ouvert) return;
    const clic = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOuvert(false);
    };
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("mousedown", clic);
    document.addEventListener("keydown", touche);
    return () => {
      document.removeEventListener("mousedown", clic);
      document.removeEventListener("keydown", touche);
    };
  }, [ouvert]);

  return { ouvert, setOuvert, ref, basculer: () => setOuvert((v) => !v), fermer: () => setOuvert(false) };
}
