"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Check, CircleDashed } from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import type { RiskId } from "@/types/experience";
import { risks } from "@/data/risks";

export function ScoreScreen({ revealed, onContinue, onBack }: { revealed: Set<RiskId>; onContinue: () => void; onBack: () => void }) {
  const score = revealed.size;
  return <motion.section className="screen score-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <button className="round-button score-back" onClick={onBack} aria-label="Retour"><ArrowLeft/></button>
    <div className="score-intro"><p className="eyebrow">Bilan de vigilance</p><h1>Vous avez identifié<br/><em>{score} risque{score > 1 ? "s" : ""} sur 5.</em></h1><p>Chaque signal observé relie un symptôme concret à un diagnostic et à une solution AQUAPROX.</p></div>
    <div className="score-gauge"><svg viewBox="0 0 260 260"><circle cx="130" cy="130" r="105"/><motion.circle className="value" cx="130" cy="130" r="105" initial={{ pathLength: 0 }} animate={{ pathLength: score / 5 }} transition={{ duration: 1.2, ease: "easeOut" }}/></svg><div><motion.strong initial={{ opacity: 0, scale: .7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .5 }}>{score}</motion.strong><span>/ 5</span><small>Risques identifiés</small></div></div>
    <div className="score-detail"><div className="metric-list risk-checklist">{risks.map((risk, i) => { const found = revealed.has(risk.id); return <motion.div className={`metric ${found ? "found" : ""}`} key={risk.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .25 + i * .08 }}><span>{found ? <Check/> : <CircleDashed/>}</span><div><div><strong>{risk.title}</strong><b>{found ? "Identifié" : "À explorer"}</b></div><small>{risk.zone}</small></div></motion.div>; })}</div><div className="score-summary"><span>Et dans votre propre bâtiment ?</span><h2>Emportez votre <em>bilan de vigilance.</em></h2><p>Retrouvez les risques découverts, les expertises associées et un accès direct à un expert.</p><PrimaryButton onClick={onContinue}>Recevoir mon bilan</PrimaryButton></div></div>
    <p className="disclaimer">Expérience de sensibilisation — seul un audit technique permet d’établir un diagnostic.</p>
  </motion.section>;
}
