"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Gauge, LockKeyhole, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Scene = "building" | "buildingZoom" | "entry" | "room" | "question" | "diagnosis" | "reveal" | "complete";

export const BUILDING_ZONES = [
  { id: "logements", label: "Logements", x: 25, y: 33 },
  { id: "gaines", label: "Gaines techniques", x: 50, y: 31 },
  { id: "toiture", label: "Toiture", x: 72, y: 18 },
  { id: "chaufferie", label: "Chaufferie", x: 52, y: 78 },
] as const;

export const RISK_HOTSPOTS = [{ id: "pressure-risk", x: 46.2, y: 38.5 }] as const;

const ANSWERS = ["Pression normale", "Pression trop basse", "Température élevée", "Présence d’air dans le réseau"];
const ease = [0.22, 1, 0.36, 1] as const;

function Brand() {
  return <div className="trade-brand" aria-label="AQUAPROX"><span className="trade-brand-name">AQUA<strong>PROX</strong></span><span>Diagnostic réseau</span></div>;
}

function Progress({ complete = false }: { complete?: boolean }) {
  return <div className={`trade-progress ${complete ? "is-complete" : ""}`}><span>{complete ? <Check size={15} strokeWidth={3} /> : <Gauge size={16} />}</span><strong>{complete ? "1 / 1" : "0 / 1"}</strong> risque identifié</div>;
}

function ZoneMarker({ zone, complete, onSelect, onHover }: { zone: (typeof BUILDING_ZONES)[number]; complete: boolean; onSelect: () => void; onHover: (active: boolean) => void }) {
  const active = zone.id === "chaufferie";
  return (
    <button className={`trade-zone ${active ? "is-active" : ""} ${active && complete ? "is-complete" : ""}`} style={{ left: `${zone.x}%`, top: `${zone.y}%` }} onClick={onSelect} onPointerEnter={() => active && onHover(true)} onPointerLeave={() => active && onHover(false)} onFocus={() => active && onHover(true)} onBlur={() => active && onHover(false)} type="button" aria-label={active && complete ? `${zone.label}, risque identifié` : zone.label}>
      <span className="trade-zone-pulse" /><span className="trade-zone-core">{active && complete ? <Check size={17} strokeWidth={3} /> : "+"}</span><span className="trade-zone-label">{active && complete ? `✓ ${zone.label}` : zone.label}</span>
    </button>
  );
}

function BuildingScene({ scene, completed, onEnter }: { scene: Scene; completed: boolean; onEnter: () => void }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => { videoRef.current?.play().catch(() => undefined); }, []);

  return (
    <motion.section className={`trade-scene trade-building ${hovered ? "is-basement-hovered" : ""}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .42 }}>
      <motion.div className="trade-media-wrap" animate={scene === "buildingZoom" ? { scale: 1.18, x: "-2%", y: "-10%" } : { scale: 1, x: 0, y: 0 }} transition={{ duration: .74, ease }}>
        <video ref={videoRef} className="trade-media" autoPlay muted loop playsInline preload="auto"><source src="/assets/tradeshow/building-loop.mp4" type="video/mp4" /></video>
      </motion.div>
      <div className="trade-vignette" /><motion.div className="trade-basement-focus" animate={{ opacity: hovered ? 1 : 0 }} />
      <Brand />
      <div className="trade-scene-title"><span>{completed ? "Parcours complété" : "Vue d’ensemble"}</span><h1>{completed ? "Continuez à explorer le bâtiment" : "Explorez les zones techniques du bâtiment"}</h1></div>
      <AnimatePresence>{scene === "building" && <motion.div className="trade-zone-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{BUILDING_ZONES.map((zone) => <ZoneMarker key={zone.id} zone={zone} complete={completed} onHover={setHovered} onSelect={() => zone.id === "chaufferie" && onEnter()} />)}</motion.div>}</AnimatePresence>
      {completed && <div className="trade-building-score"><CheckCircle2 size={18} /> 1 risque identifié</div>}
      <div className="trade-hint"><span /> Touchez une zone pour l’explorer</div><motion.div className="trade-zoom-shade" animate={{ opacity: scene === "buildingZoom" ? .42 : 0 }} />
    </motion.section>
  );
}

function EntryScene() {
  return (
    <motion.section className="trade-scene trade-entry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .36 }}>
      <motion.img className="trade-media" src="/assets/tradeshow/chaufferie-entry.png" alt="Coupe technique du bâtiment menant à la chaufferie" initial={{ scale: 1.01, x: "0%", y: "0%" }} animate={{ scale: 1.09, x: "0%", y: "-5%" }} transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }} />
      <div className="trade-vignette trade-vignette-soft" /><div className="trade-entry-label"><span>Accès zone technique</span><strong>Chaufferie</strong><i /></div>
    </motion.section>
  );
}

function RoomHeader({ complete, onBack }: { complete?: boolean; onBack: () => void }) {
  return <div className="trade-room-header"><button className="trade-back" onClick={onBack} type="button"><ArrowLeft size={21} /> Retour au bâtiment</button><Progress complete={complete} /></div>;
}

function QuestionDrawer({ mode, onDiagnosis, onSolution }: { mode: "question" | "diagnosis"; onDiagnosis: () => void; onSolution: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const validate = () => selected === "Pression trop basse" ? onDiagnosis() : setError(true);
  return (
    <motion.aside className="trade-drawer" initial={{ x: "105%" }} animate={{ x: 0 }} exit={{ x: "105%" }} transition={{ duration: .44, ease }}>
      <AnimatePresence mode="wait">
        {mode === "question" ? (
          <motion.div key="question" className="trade-drawer-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}>
            <span className="trade-drawer-step">Diagnostic · 01</span><div className="trade-drawer-icon"><Gauge size={26} /></div><h2>Que remarquez-vous&nbsp;?</h2><p>Observez le manomètre et identifiez l’anomalie.</p>
            <div className="trade-answers" role="radiogroup" aria-label="Réponses possibles">{ANSWERS.map((answer, index) => <button key={answer} className={selected === answer ? "is-selected" : ""} onClick={() => { setSelected(answer); setError(false); }} role="radio" aria-checked={selected === answer} type="button"><span>{String(index + 1).padStart(2, "0")}</span>{answer}<i /></button>)}</div>
            <AnimatePresence>{error && <motion.p className="trade-answer-error" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>Regardez de nouveau le manomètre.</motion.p>}</AnimatePresence>
            <button className="trade-primary" onClick={validate} disabled={!selected} type="button">Valider <ArrowRight size={20} /></button>
          </motion.div>
        ) : (
          <motion.div key="diagnosis" className="trade-drawer-content trade-diagnosis" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}>
            <span className="trade-status"><i /><strong>Anomalie détectée</strong></span><span className="trade-drawer-step">Résultat du diagnostic</span><h2>Pression insuffisante</h2><p>Une pression insuffisante peut perturber la circulation du réseau et réduire les performances de l’installation.</p>
            <div className="trade-consequences">{["Circulation perturbée", "Performance réduite", "Risque de dysfonctionnement"].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</div>
            <button className="trade-primary" onClick={onSolution} type="button">Voir la solution AQUAPROX <ArrowRight size={20} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}

function BoilerRoomScene({ scene, onBack, onHotspot, onDiagnosis, onSolution }: { scene: Scene; onBack: () => void; onHotspot: () => void; onDiagnosis: () => void; onSolution: () => void }) {
  const drawerOpen = scene === "question" || scene === "diagnosis";
  return (
    <motion.section className="trade-scene trade-room" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .44 }}>
      <img className="trade-media" src="/assets/tradeshow/chaufferie-before.png" alt="Chaufferie avant correction" /><div className={`trade-room-shade ${drawerOpen ? "is-open" : ""}`} /><RoomHeader onBack={onBack} />
      <AnimatePresence>{!drawerOpen && RISK_HOTSPOTS.map((hotspot) => <motion.button key={hotspot.id} className="trade-risk-hotspot" style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onHotspot} type="button" aria-label="Inspecter le manomètre"><span className="trade-risk-radar" /><span className="trade-risk-core"><Gauge size={23} /></span><strong>Inspecter</strong></motion.button>)}</AnimatePresence>
      {!drawerOpen && <div className="trade-room-instruction"><span>01</span><div><strong>Mode inspection</strong><p>Touchez un élément pour identifier un risque</p></div></div>}
      <AnimatePresence>{drawerOpen && <QuestionDrawer mode={scene === "question" ? "question" : "diagnosis"} onDiagnosis={onDiagnosis} onSolution={onSolution} />}</AnimatePresence>
    </motion.section>
  );
}

function RevealScene() {
  return (
    <motion.section className="trade-scene trade-reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.img className="trade-media" src="/assets/tradeshow/chaufferie-before.png" alt="Chaufferie avant correction" animate={{ scale: 1.02 }} transition={{ duration: .45, ease }} /><motion.img className="trade-media trade-after" src="/assets/tradeshow/chaufferie-after.png" alt="Chaufferie après installation de la solution AQUAPROX" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, delay: .18, ease }} />
      <div className="trade-reveal-glow" /><div className="trade-reveal-track"><span>Avant</span><i><b /></i><span>Après</span></div><motion.div className="trade-reveal-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .72 }}><Check size={17} /> Correction AQUAPROX</motion.div>
    </motion.section>
  );
}

function CompleteScene({ onBack }: { onBack: () => void }) {
  return (
    <motion.section className="trade-scene trade-complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <img className="trade-media" src="/assets/tradeshow/chaufferie-after.png" alt="Solution AQUAPROX installée dans la chaufferie" /><div className="trade-complete-vignette" /><RoomHeader complete onBack={onBack} />
      <motion.div className="trade-confirmation" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18, ease }}><span className="trade-confirmation-icon"><CheckCircle2 size={29} /></span><span className="trade-drawer-step">Intervention terminée</span><h2>Solution installée</h2><p>L’équipement de traitement contribue à protéger le réseau et à maintenir les performances de l’installation.</p><div className="trade-confirmation-actions"><button className="trade-secondary" disabled type="button"><LockKeyhole size={17} /> Explorer un autre risque <small>Bientôt disponible</small></button><button className="trade-primary" onClick={onBack} type="button"><RotateCcw size={18} /> Retour au bâtiment</button></div></motion.div>
    </motion.section>
  );
}

export function TradeShowExperience() {
  const [scene, setScene] = useState<Scene>("building");
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    if (scene !== "buildingZoom" && scene !== "entry" && scene !== "reveal") return;
    const durations: Partial<Record<Scene, number>> = { buildingZoom: 740, entry: 1300, reveal: 1550 };
    const next: Partial<Record<Scene, Scene>> = { buildingZoom: "entry", entry: "room", reveal: "complete" };
    const timer = window.setTimeout(() => setScene(next[scene]!), durations[scene]);
    return () => window.clearTimeout(timer);
  }, [scene]);
  const backToBuilding = () => { if (scene === "complete") setCompleted(true); setScene("building"); };
  return (
    <main className="trade-experience"><AnimatePresence mode="sync" initial={false}>
      {(scene === "building" || scene === "buildingZoom") && <BuildingScene key="building" scene={scene} completed={completed} onEnter={() => setScene("buildingZoom")} />}
      {scene === "entry" && <EntryScene key="entry" />}
      {(scene === "room" || scene === "question" || scene === "diagnosis") && <BoilerRoomScene key="room" scene={scene} onBack={backToBuilding} onHotspot={() => setScene("question")} onDiagnosis={() => setScene("diagnosis")} onSolution={() => setScene("reveal")} />}
      {scene === "reveal" && <RevealScene key="reveal" />}{scene === "complete" && <CompleteScene key="complete" onBack={backToBuilding} />}
    </AnimatePresence></main>
  );
}
