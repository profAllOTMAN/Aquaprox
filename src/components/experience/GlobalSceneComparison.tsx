"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { GainesReadings } from "./GainesReadings";

export type SceneComparisonPlan = {
  before: string;
  layers: { id: string; image: string; patches: string[] }[];
  location: string;
  note: string;
  gaines?: boolean;
};

export function GlobalSceneComparison({ plan, equipment, onClose }: { plan: SceneComparisonPlan; equipment: string; onClose: () => void }) {
  const [after, setAfter] = useState(true);
  const closeRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); event.stopImmediatePropagation(); onClose(); }
      if (event.key === "Tab") {
        const buttons = [...(rootRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? [])];
        const first = buttons[0], last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", handler, true);
    return () => document.removeEventListener("keydown", handler, true);
  }, [onClose]);
  return <section ref={rootRef} className="global-scene-comparison" role="dialog" aria-modal="true" aria-labelledby="global-comparison-title" data-view={after ? "after" : "before"}>
    <header><div><small>AQUAPROX · scène globale</small><h2 id="global-comparison-title">{plan.location}</h2></div><button ref={closeRef} type="button" className="global-comparison-close" onClick={onClose} aria-label="Revenir à la solution"><X size={22} /></button></header>
    <div className="global-comparison-frame" aria-label={after ? "Même environnement avec la solution AQUAPROX" : "Environnement avant intervention, équipements existants conservés"}>
      <img className="global-comparison-base" src={plan.before} alt="Scène globale avant intervention, avec ses équipements existants" />
      <div className="global-comparison-layers" style={{ opacity: after ? 1 : 0 }} aria-hidden={!after}>{plan.layers.flatMap((layer) => layer.patches.map((patch, index) => <img key={`${layer.id}-${index}`} src={layer.image} alt="" style={{ clipPath: patch }} data-global-equipment={layer.id} />))}</div>
      {plan.gaines && <svg className="global-comparison-readings" viewBox="0 0 1672 941" aria-label="Débits et réglages par logement"><GainesReadings corrected={after} /></svg>}
    </div>
    <footer><div className="global-comparison-tabs" role="group" aria-label="Avant et après de la scène globale"><button type="button" aria-pressed={!after} onClick={() => setAfter(false)}>Avant</button><button type="button" aria-pressed={after} onClick={() => setAfter(true)}>Après</button></div><div className="global-comparison-caption" aria-live="polite"><strong>{after ? equipment : "Avant l’intervention AQUAPROX"}</strong><p>{after ? plan.note : "Les équipements déjà présents restent en place. La solution ajoutée par AQUAPROX n’est pas encore intégrée."}</p></div></footer>
  </section>;
}
