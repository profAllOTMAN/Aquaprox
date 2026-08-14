"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, CircleGauge, Info, Minus, Plus, RotateCcw, Search, ZoomIn } from "lucide-react";
import { useEffect, useState } from "react";
import { BuildingVisual } from "@/components/building/BuildingVisual";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { RiskPanel } from "@/components/risks/RiskPanel";
import { risks } from "@/data/risks";
import type { RiskHotspot, RiskId } from "@/types/experience";

type Props = {
  activeRisk: RiskHotspot | null;
  revealed: Set<RiskId>;
  solved: Set<RiskId>;
  onRisk: (risk: RiskHotspot) => void;
  onSolve: (risk: RiskHotspot) => void;
  onClose: () => void;
  onScore: () => void;
  onBack: () => void;
};

const zoomStops = [1, 1.28, 1.58];

export function ExplorationScreen({ activeRisk, revealed, solved, onRisk, onSolve, onClose, onScore, onBack }: Props) {
  const [focusedRisk, setFocusedRisk] = useState<RiskHotspot | null>(null);
  const [zoomIndex, setZoomIndex] = useState(0);
  const focus = activeRisk ?? focusedRisk;
  const zoom = zoomStops[zoomIndex];

  useEffect(() => {
    if (activeRisk) setZoomIndex(2);
  }, [activeRisk]);

  const resetView = () => {
    setFocusedRisk(null);
    setZoomIndex(0);
  };

  const selectRisk = (risk: RiskHotspot) => {
    if (activeRisk || focusedRisk?.id === risk.id) {
      setFocusedRisk(risk);
      setZoomIndex(2);
      onRisk(risk);
      return;
    }
    setFocusedRisk(risk);
    setZoomIndex(2);
  };

  const closePanel = () => {
    onClose();
    resetView();
  };

  const panX = focus ? (50 - focus.x) * (zoom - 1) * .72 : 0;
  const panY = focus ? (50 - focus.y) * (zoom - 1) * .62 : 0;

  return <motion.section className="screen exploration-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <ScreenHeader label="02 — Habitat collectif · Exploration" onBack={onBack}/>
    <div className="explore-heading">
      <div><p className="eyebrow">Révélez l’invisible</p><h1>Explorez le <em>réseau d’eau</em></h1></div>
      <div className="experience-promise"><strong>Depuis 1989</strong><span>Audit · Ingénierie · Exploitation</span></div>
      <div className="instruction"><span><Info/></span><p><strong>Choisissez un indice</strong> puis zoomez pour comprendre ce qu’il peut révéler.</p></div>
    </div>
    <div className={`explore-layout ${activeRisk ? "panel-open" : ""}`}>
      <div className={`building-stage ${focus ? "is-focused" : ""}`}>
        <div className="stage-label inlet">Arrivée d’eau</div>
        <div className="stage-label tech">Local technique</div>
        <motion.div
          className="stage-camera"
          animate={{ scale: zoom, x: `${panX}%`, y: `${panY}%` }}
          transition={{ duration: .7, ease: [0.22, 1, 0.36, 1] }}
        >
          <BuildingVisual risks={risks} activeRisk={focus?.id} revealed={revealed} onSelect={selectRisk}/>
        </motion.div>

        <div className="zoom-controls" aria-label="Contrôles de zoom">
          <button onClick={() => setZoomIndex((value) => Math.max(0, value - 1))} disabled={zoomIndex === 0} aria-label="Dézoomer"><Minus/></button>
          <output aria-live="polite">×{zoom.toFixed(2)}</output>
          <button onClick={() => setZoomIndex((value) => Math.min(zoomStops.length - 1, value + 1))} disabled={zoomIndex === zoomStops.length - 1} aria-label="Zoomer"><Plus/></button>
          <button className="reset-zoom" onClick={resetView} disabled={!focus && zoomIndex === 0} aria-label="Revenir à la vue d’ensemble"><RotateCcw/></button>
        </div>

        <AnimatePresence>
          {focusedRisk && !activeRisk && <motion.aside
            className={`clue-card ${focusedRisk.x > 55 ? "clue-left" : "clue-right"}`}
            initial={{ opacity: 0, y: 18, scale: .98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            aria-live="polite"
          >
            <div className="clue-meta"><span><Search/> Indice {focusedRisk.index}</span><small>{focusedRisk.zone}</small></div>
            <h2>Regardez de plus près.</h2>
            <p>{focusedRisk.clue}</p>
            <div className="clue-detail"><ZoomIn/>{focusedRisk.clueDetail}</div>
            <button className="reveal-risk" onClick={() => onRisk(focusedRisk)}>Révéler ce risque <ChevronRight/></button>
            <small className="clue-disclaimer">Indice de sensibilisation — à confirmer par un audit AQUAPROX.</small>
          </motion.aside>}
        </AnimatePresence>

        <div className="stage-floor"><span>Réseau d’eau sanitaire</span><span>Bâtiment A — 48 logements</span></div>
      </div>
      <AnimatePresence>{activeRisk && <RiskPanel risk={activeRisk} solved={solved.has(activeRisk.id)} onSolve={() => onSolve(activeRisk)} onClose={closePanel}/>}</AnimatePresence>
    </div>
    <div className="explore-footer">
      <div className="progress-block"><span><b>{revealed.size}</b> risque{revealed.size > 1 ? "s" : ""} révélé{revealed.size > 1 ? "s" : ""} sur 5</span><div className="progress-track"><motion.i animate={{ width: `${revealed.size * 20}%` }}/></div></div>
      <button className={`score-shortcut ${revealed.size >= 2 ? "enabled" : ""}`} disabled={revealed.size < 2} onClick={onScore}><CircleGauge/><span><small>Votre simulation</small>Voir mon score de vigilance</span><ChevronRight/></button>
    </div>
  </motion.section>;
}
