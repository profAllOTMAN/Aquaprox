"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, ArrowRight, Check, FlaskConical, Gauge, Search, ShieldCheck, Sparkles, Wrench, X } from "lucide-react";
import type { RiskHotspot } from "@/types/experience";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

const steps = [
  { label: "Auditer", icon: Search },
  { label: "Formuler", icon: FlaskConical },
  { label: "Concevoir", icon: Wrench },
  { label: "Exploiter", icon: Activity },
];

function RiskAnimation({ id, solved }: { id: RiskHotspot["id"]; solved: boolean }) {
  return <div className={`risk-animation ${id} ${solved ? "solved" : ""}`}>
    <div className="risk-pipe"><div className="water-flow"/><div className="risk-effect">{id === "temperature" ? <><i/><i/><i/></> : id === "desequilibre" ? <><span/><span/><span/></> : null}</div></div>
    <div className="animation-caption"><Gauge size={15}/>{solved ? "Flux stabilisé" : id === "stagnation" ? "Circulation insuffisante" : id === "temperature" ? "Zone thermique sensible" : id === "desequilibre" ? "Écarts de débit détectés" : id === "entartrage" ? "Dépôt progressif" : "Altération interne"}</div>
  </div>;
}

export function RiskPanel({ risk, solved, onSolve, onClose }: { risk: RiskHotspot; solved: boolean; onSolve: () => void; onClose: () => void }) {
  return <AnimatePresence mode="wait"><motion.aside key={risk.id} className="risk-panel" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: .42, ease: [0.22,1,0.36,1] }}>
    <button className="panel-close" onClick={onClose} aria-label="Fermer"><X/></button>
    <div className="risk-meta"><span>Risque invisible · {risk.index}</span><span className={`severity ${risk.severity}`}>Vigilance {risk.severity === "elevee" ? "élevée" : "modérée"}</span></div>
    <p className="zone">{risk.zone}</p><h2>{risk.title}</h2>
    <RiskAnimation id={risk.id} solved={solved}/>
    {!solved ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }}><p className="risk-description">{risk.description}</p><PrimaryButton onClick={onSolve}>Comment maîtriser ce risque&nbsp;?</PrimaryButton></motion.div> : <motion.div className="solution-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="solution-heading"><span><ShieldCheck/></span><div><small>Intervention AQUAPROX</small><h3>Un réseau maîtrisé</h3></div></div>
      <p>{risk.solution}</p><div className="value-impact"><Sparkles/><div><small>Valeur pour votre site</small><strong>{risk.value}</strong></div></div><div className="process-label">Chaîne de valeur intégrée</div><div className="process-row">{steps.map(({ label, icon: Icon }, i) => <div className="process-step" key={label}><span><Icon/></span><small>{label}</small>{i < steps.length - 1 && <ArrowRight/>}</div>)}</div>
      <div className="expertise"><Check/> Expertise mobilisée <strong>{risk.expertise}</strong></div>
      <PrimaryButton variant="ghost" onClick={onClose}>Poursuivre l’exploration</PrimaryButton>
    </motion.div>}
  </motion.aside></AnimatePresence>;
}
