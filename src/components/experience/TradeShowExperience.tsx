"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Droplets, FlaskConical, Gauge, RotateCcw, ShieldCheck, Wrench } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { boilerRoomScenarios, type BoilerRoomScenario } from "@/data/boilerRoomScenarios";

type Scene = "building" | "buildingFocus" | "buildingZoom" | "entry" | "room" | "question" | "diagnosis" | "reveal" | "complete";

export const BUILDING_ZONES = [
  { id: "logements", label: "Logements", x: 64, y: 29 },
  { id: "gaines", label: "Gaines techniques", x: 51, y: 39 },
  { id: "toiture", label: "Toiture", x: 60, y: 9 },
  { id: "chaufferie", label: "Chaufferie", x: 54, y: 82 },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;
const BOILER_ROOM_BEFORE = "/assets/tradeshow/chaufferie-before.jpg";
const BOILER_ROOM_AFTER_FILTER = "/assets/tradeshow/chaufferie-after.jpg";

function ScenarioIcon({ id, size = 21 }: { id: string; size?: number }) {
  if (id === "corrosion-boues") return <ShieldCheck size={size} />;
  if (id === "air-degazage") return <Gauge size={size} />;
  if (id === "entartrage") return <Droplets size={size} />;
  return <FlaskConical size={size} />;
}

function ImpactGraph({ scenario, compact = false }: { scenario: BoilerRoomScenario; compact?: boolean }) {
  const nodes = [
    { label: "Signal observé", value: scenario.signalLabel },
    { label: "Action AQUAPROX", value: scenario.mechanism },
    { label: "Bénéfice réseau", value: scenario.benefit },
  ];
  return <div className={`trade-impact-graph ${compact ? "is-compact" : ""}`} aria-label="Chaîne du diagnostic et de la correction">{nodes.map((node, index) => <div className="trade-impact-step" key={node.label}><span>0{index + 1}</span><div><small>{node.label}</small><strong>{node.value}</strong></div>{index < nodes.length - 1 && <i><b /></i>}</div>)}</div>;
}

function EquipmentMedia({ scenario, className = "" }: { scenario: BoilerRoomScenario; className?: string }) {
  if (!scenario.motionVideo) return <motion.img className={className} src={scenario.equipmentImage} alt={scenario.equipment} animate={{ scale: [1, 1.035, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />;
  return <video className={className} src={scenario.motionVideo} poster={scenario.equipmentImage} aria-label={`Animation technique : ${scenario.equipment}`} autoPlay muted loop playsInline preload="metadata" />;
}

function InstalledEquipment({ scenario, active = false, onSelect }: { scenario: BoilerRoomScenario; active?: boolean; onSelect?: () => void }) {
  return (
    <motion.button
      className={`trade-installed-equipment ${active ? "is-active" : ""}`}
      style={{ left: `${scenario.x}%`, top: `${scenario.y}%` }}
      initial={{ opacity: 0, scale: .75, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: .55, ease }}
      onClick={onSelect}
      type="button"
      aria-label={`Solution installée : ${scenario.equipment}`}
    >
      <span className="trade-installed-video"><EquipmentMedia scenario={scenario} /></span>
      <span className="trade-installed-copy"><small>Solution active</small><strong>{scenario.equipment}</strong></span>
      <i />
    </motion.button>
  );
}

function Brand() {
  return <div className="trade-brand" aria-label="AQUAPROX"><img src="/assets/brand/aquaprox-logo-official.png" alt="AQUAPROX" /></div>;
}

function Progress({ count }: { count: number }) {
  const complete = count === boilerRoomScenarios.length;
  return <div className={`trade-progress ${complete ? "is-complete" : ""}`}><span>{complete ? <Check size={15} strokeWidth={3} /> : <Gauge size={16} />}</span><strong>{count} / {boilerRoomScenarios.length}</strong> risques identifiés</div>;
}

function ZoneMarker({ zone, completedCount, focused, onSelect, onHover }: { zone: (typeof BUILDING_ZONES)[number]; completedCount: number; focused: boolean; onSelect: () => void; onHover: (active: boolean) => void }) {
  const active = zone.id === "chaufferie";
  const complete = active && completedCount > 0;
  return (
    <motion.button className={`trade-zone ${active ? "is-active" : ""} ${complete ? "is-complete" : ""} ${focused ? "is-focused" : ""}`} style={{ left: `${zone.x}%`, top: `${zone.y}%` }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .32, ease }} onClick={onSelect} onPointerEnter={() => active && onHover(true)} onPointerLeave={() => active && onHover(false)} onFocus={() => active && onHover(true)} onBlur={() => active && onHover(false)} disabled={focused} type="button" aria-label={complete ? `${zone.label}, ${completedCount} risques identifiés` : zone.label}>
      <span className="trade-zone-pulse" /><span className="trade-zone-core">{focused || complete ? <Check size={17} strokeWidth={3} /> : "+"}</span><span className="trade-zone-label">{focused ? "Accès chaufferie" : complete ? `✓ ${zone.label}` : zone.label}</span>
    </motion.button>
  );
}

function BuildingScene({ scene, completedCount, onEnter, onVideoComplete }: { scene: Scene; completedCount: number; onEnter: () => void; onVideoComplete: () => void }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const selecting = scene !== "building";
  const holdOpeningFrame = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (scene === "buildingZoom") {
      video.currentTime = 0;
      video.play().catch(onVideoComplete);
      return;
    }
    holdOpeningFrame();
  }, [holdOpeningFrame, onVideoComplete, scene]);
  const visibleZones = scene === "buildingFocus" ? BUILDING_ZONES.filter((zone) => zone.id === "chaufferie") : BUILDING_ZONES;
  return (
    <motion.section className={`trade-scene trade-building ${selecting ? "is-selecting" : ""} ${scene === "buildingZoom" ? "is-zooming" : ""}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .48 }}>
      <motion.div className="trade-media-wrap" animate={{ scale: 1, x: 0, y: 0 }}><video ref={videoRef} className="trade-media" poster="/assets/tradeshow/building-overview.jpg" muted playsInline preload="auto" onLoadedData={() => scene !== "buildingZoom" && holdOpeningFrame()} onEnded={onVideoComplete} onError={onVideoComplete}><source src="/assets/tradeshow/motion/building-to-chaufferie.mp4" type="video/mp4" /></video></motion.div>
      <div className="trade-vignette" /><motion.div className="trade-basement-focus" animate={{ opacity: hovered || selecting ? 1 : 0 }} transition={{ duration: .38, ease }} /><Brand />
      <div className="trade-scene-title"><span>{completedCount ? "Diagnostic en cours" : "Mission AQUAPROX"}</span><h1>{completedCount ? "Poursuivez le diagnostic du bâtiment" : "Saurez-vous repérer les risques cachés dans ce bâtiment ?"}</h1><p>Explorez les zones techniques et révélez les solutions adaptées.</p></div>
      {(scene === "building" || scene === "buildingFocus") && <div className="trade-zone-layer"><AnimatePresence>{visibleZones.map((zone) => <ZoneMarker key={zone.id} zone={zone} completedCount={completedCount} focused={scene === "buildingFocus"} onHover={setHovered} onSelect={() => zone.id === "chaufferie" && onEnter()} />)}</AnimatePresence></div>}
      {completedCount > 0 && <div className="trade-building-score"><CheckCircle2 size={18} /> {completedCount} / {boilerRoomScenarios.length} risques identifiés</div>}
      <div className="trade-hint"><span /> Touchez une zone pour l’explorer</div><motion.div className="trade-zoom-shade" animate={{ opacity: scene === "buildingZoom" ? .05 : scene === "buildingFocus" ? .08 : 0 }} transition={{ duration: .6, ease }} />
    </motion.section>
  );
}

function EntryScene() {
  return <motion.section className="trade-scene trade-entry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .42 }}><motion.img className="trade-media" src={BOILER_ROOM_BEFORE} alt="Arrivée dans la chaufferie collective avant intervention" fetchPriority="high" initial={{ scale: 1.01 }} animate={{ scale: 1.035 }} transition={{ duration: 1.1, ease }} /><div className="trade-vignette trade-vignette-soft" /><div className="trade-entry-label"><span>Mission diagnostic</span><strong>Chaufferie</strong><i /></div></motion.section>;
}

function RoomHeader({ count, onBack }: { count: number; onBack: () => void }) {
  return <div className="trade-room-header"><button className="trade-back" onClick={onBack} type="button"><ArrowLeft size={21} /> Retour au bâtiment</button><div className="trade-flow-name"><span>Parcours diagnostic</span><strong>Chauffage collectif</strong></div><Progress count={count} /></div>;
}

function QuestionDrawer({ scenario, mode, onBackToRoom, onDiagnosis, onSolution }: { scenario: BoilerRoomScenario; mode: "question" | "diagnosis"; onBackToRoom: () => void; onDiagnosis: () => void; onSolution: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<Set<string>>(new Set());
  const validate = () => {
    if (selected === scenario.correctAnswer) {
      onDiagnosis();
      return;
    }
    if (selected) setWrongAnswers((current) => new Set(current).add(selected));
    setWrongAttempts((current) => current + 1);
    setSelected(null);
    setError(true);
  };
  return (
    <motion.aside className="trade-drawer" initial={{ x: "105%", opacity: .65 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "105%", opacity: .5 }} transition={{ duration: .52, ease }}>
      <AnimatePresence mode="wait">
        {mode === "question" ? <motion.div key={`question-${scenario.id}`} className="trade-drawer-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}>
          <button className="trade-drawer-back" onClick={onBackToRoom} type="button"><ArrowLeft size={18} /> Retour à la chaufferie</button><span className="trade-flow-rail"><b>Risque identifié</b><i /><b>Diagnostic</b><i />Solution<i />Révélation</span><span className="trade-drawer-step">Diagnostic visuel · {scenario.index}</span><figure className="trade-evidence"><img src={scenario.detailImage ?? scenario.equipmentImage} alt={`Indice visuel : ${scenario.signalLabel}`} style={{ objectPosition: scenario.imagePosition }} /><figcaption><small>Indice à observer</small><strong>{scenario.signalLabel}</strong></figcaption></figure><div className="trade-drawer-icon"><ScenarioIcon id={scenario.id} size={26} /></div><h2>{scenario.question}</h2><p>{scenario.prompt}</p>
          <div className="trade-answers" role="radiogroup" aria-label="Réponses possibles">{scenario.answers.map((answer, index) => {
            const wasWrong = wrongAnswers.has(answer);
            const guided = wrongAttempts >= 2 && answer === scenario.correctAnswer;
            return <button key={answer} className={`${selected === answer ? "is-selected" : ""} ${wasWrong ? "is-wrong" : ""} ${guided ? "is-guided" : ""}`} onClick={() => { setSelected(answer); setError(false); }} role="radio" aria-checked={selected === answer} disabled={wasWrong} type="button"><span>{String(index + 1).padStart(2, "0")}</span>{answer}{guided && <small>Indice</small>}<i /></button>;
          })}</div>
          <AnimatePresence>{error && <motion.div className="trade-answer-help" initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}><span>Indice {Math.min(wrongAttempts, 2)} / 2</span><strong>{wrongAttempts >= 2 ? "On vous guide" : "Bien essayé"}</strong><p>{wrongAttempts >= 2 ? scenario.assistedHint : scenario.retryMessage}</p></motion.div>}</AnimatePresence><button className="trade-primary" onClick={validate} disabled={!selected} type="button">Confirmer le diagnostic <ArrowRight size={20} /></button>
        </motion.div> : <motion.div key={`diagnosis-${scenario.id}`} className="trade-drawer-content trade-diagnosis" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}>
          <button className="trade-drawer-back" onClick={onBackToRoom} type="button"><ArrowLeft size={18} /> Retour à la chaufferie</button><span className="trade-status"><i /><strong>Diagnostic confirmé</strong></span><span className="trade-drawer-step">Risque {scenario.index}</span><h2>{scenario.diagnosis}</h2><p>{scenario.description}</p>
          <div className="trade-consequences">{scenario.consequences.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</div>
          <div className="trade-solution-preview"><img src={scenario.equipmentImage} alt={scenario.equipment} style={{ objectPosition: scenario.imagePosition }} /><div><span>Réponse AQUAPROX</span><strong>{scenario.equipment}</strong><p>{scenario.benefit}</p></div></div>
          <button className="trade-primary" onClick={onSolution} type="button">Faire apparaître la solution <ArrowRight size={20} /></button>
        </motion.div>}
      </AnimatePresence>
    </motion.aside>
  );
}

function BoilerRoomScene({ scene, active, solved, onBack, onCloseScenario, onHotspot, onDiagnosis, onSolution }: { scene: Scene; active: BoilerRoomScenario; solved: Set<string>; onBack: () => void; onCloseScenario: () => void; onHotspot: (scenario: BoilerRoomScenario) => void; onDiagnosis: () => void; onSolution: () => void }) {
  const drawerOpen = scene === "question" || scene === "diagnosis";
  const filterInstalled = solved.has("corrosion-boues");
  return (
    <motion.section className="trade-scene trade-room" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .48 }}>
      <AnimatePresence initial={false}><motion.img key={filterInstalled ? "room-after" : "room-before"} className="trade-media trade-room-state-image" src={filterInstalled ? BOILER_ROOM_AFTER_FILTER : BOILER_ROOM_BEFORE} alt={filterInstalled ? "Chaufferie avec filtre magnétique AQUAPROX installé" : "Chaufferie avant actions correctives"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .65, ease }} /></AnimatePresence><div className={`trade-room-shade ${drawerOpen ? "is-open" : ""}`} /><RoomHeader count={solved.size} onBack={onBack} />
      <AnimatePresence>{!drawerOpen && boilerRoomScenarios.map((scenario) => solved.has(scenario.id)
        ? <InstalledEquipment key={`installed-${scenario.id}`} scenario={scenario} onSelect={() => onHotspot(scenario)} />
        : <motion.button key={scenario.id} className="trade-risk-hotspot" style={{ left: `${scenario.x}%`, top: `${scenario.y}%` }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => onHotspot(scenario)} type="button" aria-label={`Inspecter : ${scenario.signalLabel}`}><span className="trade-risk-radar" /><span className="trade-risk-core"><ScenarioIcon id={scenario.id} /></span><strong><small>{scenario.index}</small>{scenario.signalLabel}</strong></motion.button>)}</AnimatePresence>
      {!drawerOpen && <div className="trade-room-instruction"><span>{String(boilerRoomScenarios.length).padStart(2, "0")}</span><div><strong>Diagnostic visuel</strong><p>Repérez un signe, comprenez le risque, révélez la correction</p></div></div>}
      <AnimatePresence>{drawerOpen && <QuestionDrawer scenario={active} mode={scene === "question" ? "question" : "diagnosis"} onBackToRoom={onCloseScenario} onDiagnosis={onDiagnosis} onSolution={onSolution} />}</AnimatePresence>
    </motion.section>
  );
}

function RevealScene({ scenario, filterInstalled }: { scenario: BoilerRoomScenario; filterInstalled: boolean }) {
  const hasPhotographicAfter = scenario.id === "corrosion-boues";
  const startingRoomImage = !hasPhotographicAfter && filterInstalled ? BOILER_ROOM_AFTER_FILTER : BOILER_ROOM_BEFORE;
  return (
    <motion.section className="trade-scene trade-reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <img className="trade-media trade-scene-image-layer" src={startingRoomImage} alt="Chaufferie avant installation de la correction AQUAPROX" />
      {hasPhotographicAfter && <motion.img className="trade-media trade-scene-image-layer trade-after-scene" src={BOILER_ROOM_AFTER_FILTER} alt="Même chaufferie avec le filtre magnétique AQUAPROX installé" initial={{ opacity: .15, clipPath: "inset(0 100% 0 0)" }} animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 1.35, ease }} />}
      <div className="trade-complete-vignette" />
      <motion.div className="trade-after-wash" initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 1.35, ease }} />
      <div className="trade-reveal-track"><span>Avant · risque identifié</span><i><b /></i><span>Après · réseau protégé</span></div>
      <motion.div className="trade-install-beacon" style={{ left: `${scenario.x}%`, top: `${scenario.y}%` }} initial={{ opacity: 0, scale: .7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .55, duration: .7, ease }}>
        <span><EquipmentMedia scenario={scenario} /></span><i /><b />
      </motion.div>
      <motion.div className="trade-install-status" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .72, duration: .5, ease }}>
        <span>Correction synchronisée</span><strong>{scenario.equipment}</strong><small>La solution est ajoutée à la chaufferie</small>
      </motion.div>
    </motion.section>
  );
}

function CompleteScene({ scenario, count, allSolved, filterInstalled, onExplore, onBack }: { scenario: BoilerRoomScenario; count: number; allSolved: boolean; filterInstalled: boolean; onExplore: () => void; onBack: () => void }) {
  const [view, setView] = useState<"before" | "after">("after");
  const hasPhotographicAfter = scenario.id === "corrosion-boues";
  const roomImage = hasPhotographicAfter
    ? (view === "after" ? BOILER_ROOM_AFTER_FILTER : BOILER_ROOM_BEFORE)
    : (filterInstalled ? BOILER_ROOM_AFTER_FILTER : BOILER_ROOM_BEFORE);
  return (
    <motion.section className={`trade-scene trade-complete is-${view}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <AnimatePresence initial={false}><motion.img key={`${scenario.id}-${view}`} className="trade-media trade-room-state-image" src={roomImage} alt={view === "after" ? "Chaufferie avec solution AQUAPROX installée" : "Chaufferie avant correction"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .58, ease }} /></AnimatePresence>
      <div className="trade-complete-vignette" />
      <RoomHeader count={count} onBack={onBack} />
      <div className="trade-compare" role="group" aria-label="Comparer la chaufferie avant et après la correction">
        <button className={view === "before" ? "is-active" : ""} onClick={() => setView("before")} type="button"><small>01</small> Avant</button>
        <button className={view === "after" ? "is-active" : ""} onClick={() => setView("after")} type="button"><small>02</small> Après</button>
      </div>
      <AnimatePresence mode="wait">
        {view === "before" ? (
          <motion.div key="before" className="trade-before-callout" style={{ left: `${Math.min(scenario.x, 54)}%`, top: `${scenario.y}%` }} initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <span><ScenarioIcon id={scenario.id} /></span><div><small>Avant correction</small><strong>{scenario.signalLabel}</strong><p>{scenario.diagnosis}</p></div>
          </motion.div>
        ) : (
          <div className="trade-complete-install"><InstalledEquipment key="after" scenario={scenario} active /></div>
        )}
      </AnimatePresence>
      <motion.aside className="trade-learning-console" initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: .58, ease }}>
        <div className="trade-console-kicker"><span className={view === "after" ? "is-live" : ""} /> {view === "after" ? "Solution en fonctionnement" : "État initial du réseau"}</div>
        <div className="trade-console-media">
          {view === "after" ? <EquipmentMedia scenario={scenario} /> : scenario.detailImage && <img src={scenario.detailImage} alt={`Détail du risque : ${scenario.signalLabel}`} />}
          <div className="trade-console-grid" /><span className="trade-console-scan" />
          <div className="trade-media-caption"><small>{view === "after" ? "Vue animée" : "Indice observé"}</small><strong>{view === "after" ? scenario.equipment : scenario.signalLabel}</strong></div>
        </div>
        <div className="trade-console-content">
          <span className="trade-drawer-step">{view === "after" ? "Comprendre la correction" : "Comprendre le problème"}</span>
          <h2>{view === "after" ? scenario.equipment : scenario.diagnosis}</h2>
          <p>{view === "after" ? scenario.solution : scenario.description}</p>
          {view === "after" ? (
            <>
              <div className="trade-benefit"><ShieldCheck size={22} /><div><small>Ce que cela améliore</small><strong>{scenario.benefit}</strong></div></div>
              <div className="trade-actions-pair"><div><small>Action curative</small><strong>{scenario.curativeAction}</strong></div><div><small>Protection préventive</small><strong>{scenario.preventiveAction}</strong></div></div>
            </>
          ) : <div className="trade-before-consequences">{scenario.consequences.map((item) => <span key={item}>{item}</span>)}</div>}
          <div className="trade-console-actions">
            <button className="trade-secondary is-enabled" onClick={onExplore} type="button"><Wrench size={17} /> {allSolved ? "Revoir la chaufferie" : "Retour à la chaufferie"}</button>
            <button className="trade-primary" onClick={onBack} type="button"><RotateCcw size={18} /> Bâtiment</button>
          </div>
        </div>
      </motion.aside>
    </motion.section>
  );
}

export function TradeShowExperience() {
  const [scene, setScene] = useState<Scene>("building");
  const [activeId, setActiveId] = useState(boilerRoomScenarios[1].id);
  const [solved, setSolved] = useState<Set<string>>(new Set());
  const active = boilerRoomScenarios.find((item) => item.id === activeId) ?? boilerRoomScenarios[0];
  useEffect(() => {
    [BOILER_ROOM_BEFORE, BOILER_ROOM_AFTER_FILTER].forEach((source) => {
      const image = new Image();
      image.decoding = "async";
      image.src = source;
      image.decode().catch(() => undefined);
    });
  }, []);
  useEffect(() => {
    if (scene !== "buildingFocus" && scene !== "entry" && scene !== "reveal") return;
    const durations: Partial<Record<Scene, number>> = { buildingFocus: 480, entry: 1100, reveal: 3000 };
    const next: Partial<Record<Scene, Scene>> = { buildingFocus: "buildingZoom", entry: "room", reveal: "complete" };
    const timer = window.setTimeout(() => setScene(next[scene]!), durations[scene]);
    return () => window.clearTimeout(timer);
  }, [scene]);
  const openScenario = (scenario: BoilerRoomScenario) => { setActiveId(scenario.id); setScene(solved.has(scenario.id) ? "complete" : "question"); };
  const showSolution = () => { setSolved((current) => new Set(current).add(active.id)); setScene("reveal"); };
  return <main className="trade-experience"><AnimatePresence mode="sync" initial={false}>
    {(scene === "building" || scene === "buildingFocus" || scene === "buildingZoom") && <BuildingScene key="building" scene={scene} completedCount={solved.size} onEnter={() => setScene("buildingFocus")} onVideoComplete={() => setScene("entry")} />}
    {scene === "entry" && <EntryScene key="entry" />}
    {(scene === "room" || scene === "question" || scene === "diagnosis") && <BoilerRoomScene key="room" scene={scene} active={active} solved={solved} onBack={() => setScene("building")} onCloseScenario={() => setScene("room")} onHotspot={openScenario} onDiagnosis={() => setScene("diagnosis")} onSolution={showSolution} />}
    {scene === "reveal" && <RevealScene key={`reveal-${active.id}`} scenario={active} filterInstalled={solved.has("corrosion-boues")} />}
    {scene === "complete" && <CompleteScene key={`complete-${active.id}`} scenario={active} count={solved.size} allSolved={solved.size === boilerRoomScenarios.length} filterInstalled={solved.has("corrosion-boues")} onExplore={() => setScene("room")} onBack={() => setScene("building")} />}
  </AnimatePresence></main>;
}
