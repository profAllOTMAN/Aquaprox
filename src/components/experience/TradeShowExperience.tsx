"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Droplets, FlaskConical, Gauge, Maximize2, RotateCcw, ShieldCheck, Wind, Wrench, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { boilerRoomScenarios, type BoilerRoomScenario } from "@/data/boilerRoomScenarios";

type Scene = "building" | "buildingZoom" | "entry" | "room" | "question" | "diagnosis" | "reveal" | "complete";

export const BUILDING_ZONES = [
  { id: "logements", label: "Logements", x: 25, y: 33 },
  { id: "gaines", label: "Gaines techniques", x: 50, y: 31 },
  { id: "toiture", label: "Toiture", x: 72, y: 18 },
  { id: "chaufferie", label: "Chaufferie", x: 52, y: 78 },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

function ScenarioIcon({ id, size = 21 }: { id: string; size?: number }) {
  if (id === "corrosion-boues") return <ShieldCheck size={size} />;
  if (id === "air-degazage") return <Wind size={size} />;
  if (id === "entartrage") return <Droplets size={size} />;
  return <FlaskConical size={size} />;
}

function Brand() {
  return <div className="trade-brand" aria-label="AQUAPROX"><span className="trade-brand-name">AQUA<strong>PROX</strong></span><span>Diagnostic réseau</span></div>;
}

function Progress({ count }: { count: number }) {
  const complete = count === boilerRoomScenarios.length;
  return <div className={`trade-progress ${complete ? "is-complete" : ""}`}><span>{complete ? <Check size={15} strokeWidth={3} /> : <Gauge size={16} />}</span><strong>{count} / {boilerRoomScenarios.length}</strong> risques identifiés</div>;
}

function ZoneMarker({ zone, completedCount, onSelect, onHover }: { zone: (typeof BUILDING_ZONES)[number]; completedCount: number; onSelect: () => void; onHover: (active: boolean) => void }) {
  const active = zone.id === "chaufferie";
  const complete = active && completedCount > 0;
  return (
    <button className={`trade-zone ${active ? "is-active" : ""} ${complete ? "is-complete" : ""}`} style={{ left: `${zone.x}%`, top: `${zone.y}%` }} onClick={onSelect} onPointerEnter={() => active && onHover(true)} onPointerLeave={() => active && onHover(false)} onFocus={() => active && onHover(true)} onBlur={() => active && onHover(false)} type="button" aria-label={complete ? `${zone.label}, ${completedCount} risques identifiés` : zone.label}>
      <span className="trade-zone-pulse" /><span className="trade-zone-core">{complete ? <Check size={17} strokeWidth={3} /> : "+"}</span><span className="trade-zone-label">{complete ? `✓ ${zone.label}` : zone.label}</span>
    </button>
  );
}

function BuildingScene({ scene, completedCount, onEnter }: { scene: Scene; completedCount: number; onEnter: () => void }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => { videoRef.current?.play().catch(() => undefined); }, []);
  return (
    <motion.section className="trade-scene trade-building" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .48 }}>
      <motion.div className="trade-media-wrap" animate={scene === "buildingZoom" ? { scale: 1.16, x: "-2%", y: "-9%" } : { scale: 1, x: 0, y: 0 }} transition={{ duration: .82, ease }}><video ref={videoRef} className="trade-media" autoPlay muted loop playsInline preload="auto"><source src="/assets/tradeshow/building-loop.mp4" type="video/mp4" /></video></motion.div>
      <div className="trade-vignette" /><motion.div className="trade-basement-focus" animate={{ opacity: hovered ? 1 : 0 }} /><Brand />
      <div className="trade-scene-title"><span>{completedCount ? "Diagnostic en cours" : "Vue d’ensemble"}</span><h1>{completedCount ? "Poursuivez le diagnostic du bâtiment" : "Explorez les zones techniques du bâtiment"}</h1></div>
      <AnimatePresence>{scene === "building" && <motion.div className="trade-zone-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{BUILDING_ZONES.map((zone) => <ZoneMarker key={zone.id} zone={zone} completedCount={completedCount} onHover={setHovered} onSelect={() => zone.id === "chaufferie" && onEnter()} />)}</motion.div>}</AnimatePresence>
      {completedCount > 0 && <div className="trade-building-score"><CheckCircle2 size={18} /> {completedCount} / {boilerRoomScenarios.length} risques identifiés</div>}
      <div className="trade-hint"><span /> Touchez une zone pour l’explorer</div><motion.div className="trade-zoom-shade" animate={{ opacity: scene === "buildingZoom" ? .26 : 0 }} transition={{ duration: .6, ease }} />
    </motion.section>
  );
}

function EntryScene() {
  return <motion.section className="trade-scene trade-entry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .5 }}><motion.img className="trade-media" src="/assets/tradeshow/chaufferie-entry.png" alt="Coupe technique du bâtiment menant à la chaufferie" initial={{ scale: 1.005 }} animate={{ scale: 1.075, y: "-4%" }} transition={{ duration: 1.45, ease: [0.65, 0, 0.35, 1] }} /><div className="trade-vignette trade-vignette-soft" /><div className="trade-entry-label"><span>Zone centrale du parcours</span><strong>Chaufferie</strong><i /></div></motion.section>;
}

function RoomHeader({ count, onBack }: { count: number; onBack: () => void }) {
  return <div className="trade-room-header"><button className="trade-back" onClick={onBack} type="button"><ArrowLeft size={21} /> Retour au bâtiment</button><div className="trade-flow-name"><span>Parcours diagnostic</span><strong>Chauffage collectif</strong></div><Progress count={count} /></div>;
}

function QuestionDrawer({ scenario, mode, onDiagnosis, onSolution }: { scenario: BoilerRoomScenario; mode: "question" | "diagnosis"; onDiagnosis: () => void; onSolution: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const validate = () => selected === scenario.correctAnswer ? onDiagnosis() : setError(true);
  return (
    <motion.aside className="trade-drawer" initial={{ x: "105%", opacity: .65 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "105%", opacity: .5 }} transition={{ duration: .52, ease }}>
      <AnimatePresence mode="wait">
        {mode === "question" ? <motion.div key={`question-${scenario.id}`} className="trade-drawer-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}>
          <span className="trade-flow-rail"><b>Risque identifié</b><i /><b>Diagnostic</b><i />Solution<i />Révélation</span><span className="trade-drawer-step">Diagnostic visuel · {scenario.index}</span><div className="trade-drawer-icon"><ScenarioIcon id={scenario.id} size={26} /></div><h2>{scenario.question}</h2><p>{scenario.prompt}</p>
          <div className="trade-answers" role="radiogroup" aria-label="Réponses possibles">{scenario.answers.map((answer, index) => <button key={answer} className={selected === answer ? "is-selected" : ""} onClick={() => { setSelected(answer); setError(false); }} role="radio" aria-checked={selected === answer} type="button"><span>{String(index + 1).padStart(2, "0")}</span>{answer}<i /></button>)}</div>
          <AnimatePresence>{error && <motion.p className="trade-answer-error" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>{scenario.retryMessage}</motion.p>}</AnimatePresence><button className="trade-primary" onClick={validate} disabled={!selected} type="button">Confirmer le diagnostic <ArrowRight size={20} /></button>
        </motion.div> : <motion.div key={`diagnosis-${scenario.id}`} className="trade-drawer-content trade-diagnosis" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}>
          <span className="trade-status"><i /><strong>Diagnostic confirmé</strong></span><span className="trade-drawer-step">Risque {scenario.index}</span><h2>{scenario.diagnosis}</h2><p>{scenario.description}</p>
          <div className="trade-consequences">{scenario.consequences.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</div>
          <div className="trade-solution-preview"><img src={scenario.equipmentImage} alt={scenario.equipment} style={{ objectPosition: scenario.imagePosition }} /><div><span>Action corrective AQUAPROX</span><strong>{scenario.equipment}</strong><p>{scenario.solution}</p></div></div>
          <button className="trade-primary" onClick={onSolution} type="button">Faire apparaître la solution <ArrowRight size={20} /></button>
        </motion.div>}
      </AnimatePresence>
    </motion.aside>
  );
}

function BoilerRoomScene({ scene, active, solved, onBack, onHotspot, onDiagnosis, onSolution }: { scene: Scene; active: BoilerRoomScenario; solved: Set<string>; onBack: () => void; onHotspot: (scenario: BoilerRoomScenario) => void; onDiagnosis: () => void; onSolution: () => void }) {
  const drawerOpen = scene === "question" || scene === "diagnosis";
  return (
    <motion.section className="trade-scene trade-room" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .48 }}>
      <img className="trade-media" src="/assets/tradeshow/chaufferie-before.png" alt="Chaufferie avant actions correctives" /><div className={`trade-room-shade ${drawerOpen ? "is-open" : ""}`} /><RoomHeader count={solved.size} onBack={onBack} />
      <AnimatePresence>{!drawerOpen && boilerRoomScenarios.map((scenario) => <motion.button key={scenario.id} className={`trade-risk-hotspot ${solved.has(scenario.id) ? "is-solved" : ""}`} style={{ left: `${scenario.x}%`, top: `${scenario.y}%` }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => onHotspot(scenario)} type="button" aria-label={`Inspecter : ${scenario.signalLabel}`}><span className="trade-risk-radar" /><span className="trade-risk-core">{solved.has(scenario.id) ? <Check size={23} /> : <ScenarioIcon id={scenario.id} />}</span><strong><small>{scenario.index}</small>{scenario.signalLabel}</strong></motion.button>)}</AnimatePresence>
      {!drawerOpen && <div className="trade-room-instruction"><span>{String(boilerRoomScenarios.length).padStart(2, "0")}</span><div><strong>Diagnostic visuel</strong><p>Repérez un signe, comprenez le risque, révélez la correction</p></div></div>}
      <AnimatePresence>{drawerOpen && <QuestionDrawer scenario={active} mode={scene === "question" ? "question" : "diagnosis"} onDiagnosis={onDiagnosis} onSolution={onSolution} />}</AnimatePresence>
    </motion.section>
  );
}

function RevealScene({ scenario }: { scenario: BoilerRoomScenario }) {
  return <motion.section className="trade-scene trade-reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.img className="trade-media" src="/assets/tradeshow/chaufferie-before.png" alt="Chaufferie avant correction" animate={{ scale: 1.018 }} transition={{ duration: .7, ease }} /><motion.img className="trade-media trade-after" src="/assets/tradeshow/chaufferie-after.png" alt="Chaufferie après correction AQUAPROX" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.35, delay: .24, ease }} /><div className="trade-reveal-glow" /><div className="trade-reveal-track"><span>Avant</span><i><b /></i><span>Après</span></div><motion.div className="trade-equipment-reveal" initial={{ opacity: 0, scale: .92, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: .72, duration: .5, ease }}><motion.div className="trade-equipment-object" initial={{ rotateY: 12, rotateX: -3 }} animate={{ rotateY: -3, rotateX: 1 }} transition={{ delay: .75, duration: .85, ease }}><img src={scenario.equipmentImage} alt={scenario.equipment} style={{ objectPosition: scenario.imagePosition }} /><i /></motion.div><div className="trade-equipment-copy"><span>Équipement révélé</span><strong>{scenario.equipment}</strong><small>Action corrective AQUAPROX</small></div></motion.div></motion.section>;
}

function CompleteScene({ scenario, count, allSolved, onExplore, onBack }: { scenario: BoilerRoomScenario; count: number; allSolved: boolean; onExplore: () => void; onBack: () => void }) {
  const [focused, setFocused] = useState(false);
  return <motion.section className="trade-scene trade-complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><img className="trade-media" src="/assets/tradeshow/chaufferie-after.png" alt="Solution AQUAPROX installée dans la chaufferie" /><div className="trade-complete-vignette" /><RoomHeader count={count} onBack={onBack} /><motion.div className="trade-confirmation" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18, ease }}><div className="trade-confirmation-head"><span className="trade-confirmation-icon"><CheckCircle2 size={29} /></span><button className="trade-equipment-focus-button" onClick={() => setFocused(true)} type="button"><img src={scenario.equipmentImage} alt={scenario.equipment} style={{ objectPosition: scenario.imagePosition }} /><span><Maximize2 size={13} /> Agrandir</span></button></div><span className="trade-drawer-step">Risque → Diagnostic → Correction</span><h2>{scenario.equipment}</h2><p>{scenario.solution}</p><div className="trade-value-chain"><span><Check size={14} /> Risque compris</span><span><Wrench size={14} /> Action visible</span><span><ShieldCheck size={14} /> Réseau protégé</span></div><div className="trade-confirmation-actions"><button className="trade-secondary is-enabled" onClick={onExplore} disabled={allSolved} type="button"><ScenarioIcon id={scenario.id} size={17} /> {allSolved ? "Tous les risques identifiés" : "Explorer un autre risque"}</button><button className="trade-primary" onClick={onBack} type="button"><RotateCcw size={18} /> Retour au bâtiment</button></div></motion.div><AnimatePresence>{focused && <motion.div className="trade-equipment-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFocused(false)}><button className="trade-equipment-close" onClick={() => setFocused(false)} type="button" aria-label="Fermer"><X size={22} /></button><motion.div className="trade-equipment-modal-card" initial={{ opacity: 0, scale: .9, rotateY: 10 }} animate={{ opacity: 1, scale: 1, rotateY: -2 }} exit={{ opacity: 0, scale: .94 }} transition={{ duration: .45, ease }} onClick={(event) => event.stopPropagation()}><div className="trade-equipment-modal-image"><img src={scenario.equipmentImage} alt={scenario.equipment} style={{ objectPosition: scenario.imagePosition }} /><i /></div><div><span>Vue équipement · AQUAPROX</span><h3>{scenario.equipment}</h3><p>{scenario.solution}</p><small>Image technique issue du document de cadrage</small></div></motion.div></motion.div>}</AnimatePresence></motion.section>;
}

export function TradeShowExperience() {
  const [scene, setScene] = useState<Scene>("building");
  const [activeId, setActiveId] = useState(boilerRoomScenarios[1].id);
  const [solved, setSolved] = useState<Set<string>>(new Set());
  const active = boilerRoomScenarios.find((item) => item.id === activeId) ?? boilerRoomScenarios[0];
  useEffect(() => {
    if (scene !== "buildingZoom" && scene !== "entry" && scene !== "reveal") return;
    const durations: Partial<Record<Scene, number>> = { buildingZoom: 820, entry: 1450, reveal: 1900 };
    const next: Partial<Record<Scene, Scene>> = { buildingZoom: "entry", entry: "room", reveal: "complete" };
    const timer = window.setTimeout(() => setScene(next[scene]!), durations[scene]);
    return () => window.clearTimeout(timer);
  }, [scene]);
  const openScenario = (scenario: BoilerRoomScenario) => { setActiveId(scenario.id); setScene("question"); };
  const showSolution = () => { setSolved((current) => new Set(current).add(active.id)); setScene("reveal"); };
  return <main className="trade-experience"><AnimatePresence mode="sync" initial={false}>
    {(scene === "building" || scene === "buildingZoom") && <BuildingScene key="building" scene={scene} completedCount={solved.size} onEnter={() => setScene("buildingZoom")} />}
    {scene === "entry" && <EntryScene key="entry" />}
    {(scene === "room" || scene === "question" || scene === "diagnosis") && <BoilerRoomScene key="room" scene={scene} active={active} solved={solved} onBack={() => setScene("building")} onHotspot={openScenario} onDiagnosis={() => setScene("diagnosis")} onSolution={showSolution} />}
    {scene === "reveal" && <RevealScene key={`reveal-${active.id}`} scenario={active} />}
    {scene === "complete" && <CompleteScene key={`complete-${active.id}`} scenario={active} count={solved.size} allSolved={solved.size === boilerRoomScenarios.length} onExplore={() => setScene("room")} onBack={() => setScene("building")} />}
  </AnimatePresence></main>;
}
