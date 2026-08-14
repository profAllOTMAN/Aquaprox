"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Droplets, Gauge, Network, ShieldCheck, Waves } from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import type { RiskId } from "@/types/experience";

const metrics = [
  { label: "Qualité de l’eau", value: 74, icon: Droplets },
  { label: "État du réseau", value: 61, icon: Network },
  { label: "Maîtrise sanitaire", value: 68, icon: ShieldCheck },
  { label: "Performance", value: 78, icon: Gauge },
  { label: "Surveillance", value: 56, icon: Waves },
];

export function ScoreScreen({ revealed, onContinue, onBack }: { revealed: Set<RiskId>; onContinue: () => void; onBack: () => void }) {
  const score = Math.max(58, 84 - revealed.size * 4);
  return <motion.section className="screen score-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <button className="round-button score-back" onClick={onBack} aria-label="Retour"><ArrowLeft/></button>
    <div className="score-intro"><p className="eyebrow">Simulation de sensibilisation</p><h1>Votre Score<br/>de <em>Vigilance</em></h1><p>Les risques révélés dessinent un premier niveau d’attention pour votre réseau.</p></div>
    <div className="score-gauge"><svg viewBox="0 0 260 260"><circle cx="130" cy="130" r="105"/><motion.circle className="value" cx="130" cy="130" r="105" initial={{ pathLength: 0 }} animate={{ pathLength: score / 100 }} transition={{ duration: 1.2, ease: "easeOut" }}/></svg><div><motion.strong initial={{ opacity: 0, scale: .7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .5 }}>{score}</motion.strong><span>/ 100</span><small>Vigilance requise</small></div></div>
    <div className="score-detail"><div className="metric-list">{metrics.map(({ label, value, icon: Icon }, i) => <motion.div className="metric" key={label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .25 + i * .08 }}><span><Icon/></span><div><div><strong>{label}</strong><b>{value}%</b></div><i><em style={{ width: `${value}%` }}/></i></div></motion.div>)}</div><div className="score-summary"><span>À retenir</span><h2>Votre réseau mérite peut-être <em>plus d’attention.</em></h2><p>Un échange avec un expert permet d’identifier les priorités spécifiques à votre bâtiment.</p><PrimaryButton onClick={onContinue}>Découvrir la prochaine étape</PrimaryButton></div></div>
    <p className="disclaimer">Simulation indicative — un diagnostic technique nécessite une analyse dédiée.</p>
  </motion.section>;
}
