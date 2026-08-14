"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Building2, HeartPulse, Hotel, House } from "lucide-react";
import { buildingTypes } from "@/data/buildingTypes";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import type { BuildingType } from "@/types/experience";

const icons = { habitat: House, sante: HeartPulse, tertiaire: Building2, hotel: Hotel };

function Architecture({ type }: { type: BuildingType["icon"] }) {
  const count = type === "habitat" ? 5 : type === "tertiaire" ? 3 : 4;
  return <div className={`architecture ${type}`}><div className="architecture-sky"/>{Array.from({ length: count }).map((_, i) => <span key={i} style={{ "--i": i } as React.CSSProperties}/>)}</div>;
}

export function BuildingSelection({ onSelect, onBack }: { onSelect: () => void; onBack: () => void }) {
  return (
    <motion.section className="screen selection-screen" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
      <ScreenHeader label="01 — Choisissez votre environnement" onBack={onBack}/>
      <div className="selection-title"><p className="eyebrow">Chaque bâtiment possède son propre équilibre</p><h1>Quel réseau souhaitez-vous <em>explorer&nbsp;?</em></h1></div>
      <div className="building-grid">
        {buildingTypes.map((building, index) => {
          const Icon = icons[building.icon];
          return <motion.button key={building.id} className={`building-choice ${building.available ? "available" : ""}`} onClick={building.available ? onSelect : undefined} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 + index * .07 }} whileTap={building.available ? { scale: .985 } : undefined}>
            <Architecture type={building.icon}/>
            <div className="choice-content"><div className="choice-icon"><Icon/></div><div><small>{building.eyebrow}</small><strong>{building.title}</strong></div>{building.available ? <span className="choice-arrow"><ArrowUpRight/></span> : <span className="soon">Prochainement</span>}</div>
          </motion.button>;
        })}
      </div>
      <p className="selection-hint">Sélectionnez une typologie pour explorer ses risques invisibles.</p>
    </motion.section>
  );
}
