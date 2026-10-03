"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, AlertTriangle, ArrowRight, Check, FlaskConical, Gauge, HelpCircle, Search, ShieldCheck, Sparkles, Wrench, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { RiskHotspot } from "@/types/experience";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ImmersivePlantScene } from "@/components/experience/ImmersivePlantScene";

const steps = [
  { label: "Auditer", icon: Search },
  { label: "Diagnostiquer", icon: FlaskConical },
  { label: "Corriger", icon: Wrench },
  { label: "Suivre", icon: Activity },
];

const signalByRisk: Record<RiskHotspot["id"], string> = {
  embouage: "ΔT radiateur · 14 °C",
  air: "Pression · instable",
  equilibrage: "Débits · 22 / 9 l·min⁻¹",
  ecs: "Retour ECS · 46 °C",
  entartrage: "Rendement · −18 %",
};

function PlantRoomReveal({ risk, solved }: { risk: RiskHotspot; solved: boolean }) {
  const renderedRequested = process.env.NEXT_PUBLIC_VISUAL_MODE === "rendered";
  const [renderAvailable, setRenderAvailable] = useState(renderedRequested);
  useEffect(() => setRenderAvailable(renderedRequested), [renderedRequested, risk.id, solved]);

  return <div className={`plant-reveal ${risk.id} ${solved ? "solved" : ""}`}>
    <div className="plant-reveal-top">
      <span>{solved ? "APRÈS · INSTALLATION TRAITÉE" : "AVANT · SIGNAL DÉTECTÉ"}</span>
      <b><i /> {solved ? "Réseau stabilisé" : signalByRisk[risk.id]}</b>
    </div>
    {risk.id === "air" ? <ImmersivePlantScene solved={solved} /> : <div className={`plant-scene ${renderedRequested && renderAvailable ? "rendered-scene-active" : ""}`} aria-label={solved ? `Solution ${risk.equipment}` : `Signal ${risk.title}`}>
      {renderedRequested && <img className="plant-render" src={`/assets/scenes/risks/${risk.id}/${solved ? "after" : "before"}.webp`} alt="" onError={() => setRenderAvailable(false)} />}
      <div className="plant-pipe pipe-a"><span /></div>
      <div className="plant-pipe pipe-b"><span /></div>
      <div className="plant-boiler"><i /><i /><strong>PRODUCTION</strong></div>
      <div className="plant-pump"><span /></div>
      <div className="plant-gauge"><Gauge /><small>{risk.id === "ecs" ? "46°" : "Δ"}</small></div>
      {!solved && <div className="plant-warning"><AlertTriangle /><span>{risk.title}</span></div>}
      <AnimatePresence>{solved && <motion.div className={`solution-equipment equipment-${risk.id}`} initial={{ opacity: 0, scale: .65, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}>
        <span><ShieldCheck /></span><strong>{risk.equipment}</strong><small>Ajout AQUAPROX</small>
      </motion.div>}</AnimatePresence>
      <div className="plant-floor" />
    </div>}
  </div>;
}

export function RiskPanel({ risk, solved, onSolve, onClose }: { risk: RiskHotspot; solved: boolean; onSolve: () => void; onClose: () => void }) {
  const [answer, setAnswer] = useState<number | null>(null);
  useEffect(() => setAnswer(null), [risk.id]);

  return <AnimatePresence mode="wait"><motion.aside key={risk.id} className={`risk-panel ${risk.id === "air" ? "immersive-risk-panel" : ""}`} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: .42, ease: [0.22,1,0.36,1] }}>
    <button className="panel-close" onClick={onClose} aria-label="Fermer"><X/></button>
    <div className="risk-meta"><span>Diagnostic · {risk.index}</span><span className={`severity ${risk.severity}`}>Vigilance {risk.severity === "elevee" ? "élevée" : "modérée"}</span></div>
    <p className="zone">{risk.zone}</p><h2>{risk.title}</h2>
    <PlantRoomReveal risk={risk} solved={solved}/>

    {!solved ? <motion.div className="diagnostic-question" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .15 }}>
      <div className="question-label"><HelpCircle /> Question diagnostic</div>
      <h3>{risk.question}</h3>
      <div className="answer-grid">
        {risk.answers.map((label, index) => <button key={label} className={answer === index ? (index === risk.correctAnswer ? "selected correct" : "selected incorrect") : ""} onClick={() => setAnswer(index)}><span>{String.fromCharCode(65 + index)}</span>{label}</button>)}
      </div>
      <AnimatePresence>{answer !== null && <motion.div className={`answer-feedback ${answer === risk.correctAnswer ? "correct" : "incorrect"}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <strong>{answer === risk.correctAnswer ? "Signal correctement interprété" : "Ce signal oriente vers un autre diagnostic"}</strong>
        <p>{risk.description}</p>
        <div><AlertTriangle /> <span><small>Conséquence possible</small>{risk.consequence}</span></div>
        <PrimaryButton onClick={onSolve}>Révéler la solution AQUAPROX</PrimaryButton>
      </motion.div>}</AnimatePresence>
    </motion.div> : <motion.div className="solution-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="solution-heading"><span><ShieldCheck/></span><div><small>Solution AQUAPROX</small><h3>{risk.equipment}</h3></div></div>
      <p>{risk.solution}</p>
      <div className="equipment-detail"><Wrench /><span><small>Rôle de l’équipement</small>{risk.equipmentDetail}</span></div>
      <div className="value-impact"><Sparkles/><div><small>Valeur pour votre bâtiment</small><strong>{risk.value}</strong></div></div>
      <div className="process-label">Du diagnostic au suivi</div><div className="process-row">{steps.map(({ label, icon: Icon }, i) => <div className="process-step" key={label}><span><Icon/></span><small>{label}</small>{i < steps.length - 1 && <ArrowRight/>}</div>)}</div>
      <div className="expertise"><Check/> Expertise mobilisée <strong>{risk.expertise}</strong></div>
      <PrimaryButton variant="ghost" onClick={onClose}>Poursuivre l’exploration</PrimaryButton>
    </motion.div>}
  </motion.aside></AnimatePresence>;
}
