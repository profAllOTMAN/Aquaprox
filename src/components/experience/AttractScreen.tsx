"use client";

import { motion } from "framer-motion";
import { Hand } from "lucide-react";
import { Brand } from "@/components/ui/Brand";
import { BuildingVisual } from "@/components/building/BuildingVisual";
import { risks } from "@/data/risks";

export function AttractScreen({ onStart, passive = false }: { onStart: () => void; passive?: boolean }) {
  return (
    <motion.section className="screen attract-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.02 }} onClick={passive ? undefined : onStart}>
      <div className="attract-top"><Brand /><span className="live-signal"><i /> {passive ? "Démonstration automatique" : "Expérience interactive"}</span></div>
      <div className="attract-copy">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}>Acteur intégré du traitement de l’eau en Europe</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3 }}>Et si les principaux risques<br/>de votre réseau d’eau<br/><em>étaient invisibles&nbsp;?</em></motion.h1>
        <motion.p className="lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55 }}>Du puisage au rejet vers le milieu naturel, explorez les points qui méritent votre vigilance.</motion.p>
        {passive ? <motion.div className="touch-cta passive-indicator"><span className="touch-icon"><Hand /></span><span><small>Parcours automatique</small>La révélation commence</span><i /></motion.div> : <motion.button className="touch-cta" whileTap={{ scale: .97 }} aria-label="Toucher pour explorer">
          <span className="touch-icon"><Hand /></span><span><small>Commencer l’expérience</small>Toucher pour explorer</span><i />
        </motion.button>}
      </div>
      <div className="attract-building"><div className="building-aura"/><BuildingVisual risks={risks} ambient /></div>
      <div className="attract-footer"><span>Audit &amp; conseil</span><i/><span>Production &amp; formulation</span><i/><span>Ingénierie &amp; assemblage</span><i/><span>Exploitation &amp; assistance</span></div>
    </motion.section>
  );
}
