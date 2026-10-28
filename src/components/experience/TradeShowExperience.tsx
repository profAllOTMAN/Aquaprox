"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Droplets, FlaskConical, Gauge, Plus, RotateCcw, ShieldCheck, Wrench } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { boilerRoomScenarios, type BoilerRoomScenario } from "@/data/boilerRoomScenarios";
import { buildingZoneScenarios, type BuildingZoneId } from "@/data/buildingZoneScenarios";

type Scene = "building" | "buildingFocus" | "buildingZoom" | "entry" | "room" | "question" | "diagnosis" | "correction" | "reveal" | "complete";

export const BUILDING_ZONES = [
  { id: "logements", label: "Logements", x: 64, y: 29 },
  { id: "gaines", label: "Gaines techniques", x: 51, y: 39 },
  { id: "toiture", label: "Toiture", x: 49, y: 15 },
  { id: "chaufferie", label: "Chaufferie", x: 54, y: 82 },
] as const;

type ZoneId = BuildingZoneId | "chaufferie";

const ZONE_META: Record<ZoneId, { label: string; flowLabel: string; video: string }> = {
  chaufferie: { label: "Chaufferie", flowLabel: "Chauffage collectif", video: "/assets/tradeshow/motion/building-to-chaufferie.mp4" },
  logements: { label: "Logement", flowLabel: "Confort du logement", video: "/assets/tradeshow/motion/building-to-logement.mp4" },
  gaines: { label: "Gaines techniques", flowLabel: "Distribution verticale", video: "/assets/tradeshow/motion/building-to-gaines.mp4" },
  toiture: { label: "Toiture", flowLabel: "Production en toiture", video: "/assets/tradeshow/motion/building-to-toiture.mp4" },
};
const ENABLED_ZONES = new Set<ZoneId>(["chaufferie", "logements", "gaines"]);

const ease = [0.22, 1, 0.36, 1] as const;
const BOILER_ROOM_BEFORE = "/assets/tradeshow/scenes-v3/chaufferie-organized-before.png";

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

function ProtectedEquipmentCard({ scenario, compact = false }: { scenario: BoilerRoomScenario; compact?: boolean }) {
  if (!scenario.protectedEquipmentImage || !scenario.protectedEquipmentTitle || !scenario.protectedEquipmentDescription) return null;
  return <div className={`trade-protected-equipment ${compact ? "is-compact" : ""}`}><img src={scenario.protectedEquipmentImage} alt={scenario.protectedEquipmentTitle} /><div><small>Installation protégée</small><strong>{scenario.protectedEquipmentTitle}</strong><p>{scenario.protectedEquipmentDescription}</p></div></div>;
}

function InstalledEquipment({ scenario, active = false, onSelect }: { scenario: BoilerRoomScenario; active?: boolean; onSelect?: () => void }) {
  return (
    <motion.button
      className={`trade-installed-equipment ${active ? "is-active" : ""}`}
      style={{ left: `${scenario.solutionX}%`, top: `${scenario.solutionY}%` }}
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

function Progress({ count, total }: { count: number; total: number }) {
  const complete = count === total;
  return <div className={`trade-progress ${complete ? "is-complete" : ""}`}><span>{complete ? <Check size={15} strokeWidth={3} /> : <Gauge size={16} />}</span><strong>{count} / {total}</strong> risques identifiés</div>;
}

function ZoneMarker({ zone, completedCount, focused, onSelect, onHover }: { zone: (typeof BUILDING_ZONES)[number]; completedCount: number; focused: boolean; onSelect: () => void; onHover: (active: boolean) => void }) {
  const enabled = ENABLED_ZONES.has(zone.id);
  const complete = completedCount > 0;
  return (
    <motion.button className={`trade-zone ${enabled ? "is-active" : ""} ${complete ? "is-complete" : ""} ${focused ? "is-focused" : ""}`} style={{ left: `${zone.x}%`, top: `${zone.y}%` }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .32, ease }} onClick={onSelect} onPointerEnter={() => enabled && onHover(true)} onPointerLeave={() => enabled && onHover(false)} onFocus={() => enabled && onHover(true)} onBlur={() => enabled && onHover(false)} disabled={focused || !enabled} type="button" aria-label={enabled ? (complete ? `${zone.label}, ${completedCount} risques identifiés` : zone.label) : `${zone.label}, bientôt disponible`}>
      <span className="trade-zone-pulse" /><span className="trade-zone-core">{focused || complete ? <Check size={17} strokeWidth={3} /> : "+"}</span><span className="trade-zone-label">{focused ? `Accès ${zone.label}` : complete ? `✓ ${zone.label}` : zone.label}</span>
    </motion.button>
  );
}

function BuildingScene({ scene, selectedZone, completedByZone, onEnter, onVideoComplete }: { scene: Scene; selectedZone: ZoneId; completedByZone: Record<ZoneId, number>; onEnter: (zone: ZoneId) => void; onVideoComplete: () => void }) {
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
  const visibleZones = scene === "buildingFocus" ? BUILDING_ZONES.filter((zone) => zone.id === selectedZone) : BUILDING_ZONES;
  const completedCount = Object.values(completedByZone).reduce((total, value) => total + value, 0);
  return (
    <motion.section className={`trade-scene trade-building ${selecting ? "is-selecting" : ""} ${scene === "buildingZoom" ? "is-zooming" : ""}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .48 }}>
      <motion.div className="trade-media-wrap" animate={{ scale: 1, x: 0, y: 0 }}>
        {scene === "buildingZoom"
          ? <video ref={videoRef} className="trade-media" poster="/assets/tradeshow/building-overview-v2.png" muted playsInline preload="auto" onEnded={onVideoComplete} onError={onVideoComplete}><source src={ZONE_META[selectedZone].video} type="video/mp4" /></video>
          : <img className="trade-media trade-building-overview" src="/assets/tradeshow/building-overview-v2.png" alt="Immeuble collectif en coupe avec logements, gaines techniques, chaufferie et équipements de toiture visibles" />}
      </motion.div>
      <div className="trade-vignette" /><motion.div className="trade-basement-focus" animate={{ opacity: hovered || selecting ? 1 : 0 }} transition={{ duration: .38, ease }} /><Brand />
      <div className="trade-scene-title"><span>{completedCount ? "Diagnostic en cours" : "Mission AQUAPROX"}</span><h1>{completedCount ? "Poursuivez le diagnostic du bâtiment" : "Saurez-vous repérer les risques cachés dans ce bâtiment ?"}</h1><p>Explorez les zones techniques et révélez les solutions adaptées.</p></div>
      {(scene === "building" || scene === "buildingFocus") && <div className="trade-zone-layer"><AnimatePresence>{visibleZones.map((zone) => <ZoneMarker key={zone.id} zone={zone} completedCount={completedByZone[zone.id]} focused={scene === "buildingFocus"} onHover={setHovered} onSelect={() => onEnter(zone.id)} />)}</AnimatePresence></div>}
      {completedCount > 0 && <div className="trade-building-score"><CheckCircle2 size={18} /> {completedCount} diagnostics complétés</div>}
      <div className="trade-hint"><span /> Touchez une zone pour l’explorer</div><motion.div className="trade-zoom-shade" animate={{ opacity: scene === "buildingZoom" ? .05 : scene === "buildingFocus" ? .08 : 0 }} transition={{ duration: .6, ease }} />
    </motion.section>
  );
}

function EntryScene({ zone, image }: { zone: ZoneId; image: string }) {
  return <motion.section className="trade-scene trade-entry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .42 }}><motion.img className="trade-media" src={image} alt={`Arrivée dans la zone ${ZONE_META[zone].label} avant intervention`} fetchPriority="high" initial={{ scale: 1.01 }} animate={{ scale: 1.035 }} transition={{ duration: 1.1, ease }} /><div className="trade-vignette trade-vignette-soft" /><div className="trade-entry-label"><span>Mission diagnostic</span><strong>{ZONE_META[zone].label}</strong><i /></div></motion.section>;
}

function RoomHeader({ count, total, flowLabel, onBack }: { count: number; total: number; flowLabel: string; onBack: () => void }) {
  return <div className="trade-room-header"><button className="trade-back" onClick={onBack} type="button"><ArrowLeft size={21} /> Retour au bâtiment</button><div className="trade-flow-name"><span>Parcours diagnostic</span><strong>{flowLabel}</strong></div><Progress count={count} total={total} /></div>;
}

function QuestionDrawer({ scenario, mode, onBackToRoom, onDiagnosis, onSolution, backLabel = "Retour à la chaufferie" }: { scenario: BoilerRoomScenario; mode: "question" | "diagnosis"; onBackToRoom: () => void; onDiagnosis: () => void; onSolution: () => void; backLabel?: string }) {
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
    <motion.aside className={`trade-drawer ${mode === "question" ? "is-question" : ""}`} initial={{ x: "105%", opacity: .65 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "105%", opacity: .5 }} transition={{ duration: .52, ease }}>
      <AnimatePresence mode="wait">
        {mode === "question" ? <motion.div key={`question-${scenario.id}`} className="trade-drawer-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}>
          <button className="trade-drawer-back" onClick={onBackToRoom} type="button"><ArrowLeft size={18} /> {backLabel}</button><span className="trade-flow-rail"><b>Risque identifié</b><i /><b>Diagnostic</b><i />Solution<i />Révélation</span>
          <div className="trade-question-shell">
            <figure className="trade-evidence"><img src={scenario.detailImage ?? scenario.equipmentImage} alt={`Indice visuel : ${scenario.signalLabel}`} style={{ objectPosition: scenario.imagePosition }} /><figcaption><small>Indice à observer</small><strong>{scenario.signalLabel}</strong></figcaption></figure>
            <div className="trade-question-main"><span className="trade-drawer-step">Diagnostic visuel · {scenario.index}</span><h2>{scenario.question}</h2><p>{scenario.prompt}</p>
              <div className="trade-answers" role="radiogroup" aria-label="Réponses possibles">{scenario.answers.map((answer, index) => {
                const wasWrong = wrongAnswers.has(answer);
                const guided = wrongAttempts >= 2 && answer === scenario.correctAnswer;
                return <button key={answer} className={`${selected === answer ? "is-selected" : ""} ${wasWrong ? "is-wrong" : ""} ${guided ? "is-guided" : ""}`} onClick={() => { setSelected(answer); setError(false); }} role="radio" aria-checked={selected === answer} disabled={wasWrong} type="button"><span>{String(index + 1).padStart(2, "0")}</span>{answer}{guided && <small>Indice</small>}<i /></button>;
              })}</div>
              <AnimatePresence>{error && <motion.div className="trade-answer-help" initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}><span>Indice {Math.min(wrongAttempts, 2)} / 2</span><strong>{wrongAttempts >= 2 ? "On vous guide" : "Bien essayé"}</strong><p>{wrongAttempts >= 2 ? scenario.assistedHint : scenario.retryMessage}</p></motion.div>}</AnimatePresence>
              <button className="trade-primary" onClick={validate} disabled={!selected} type="button">Confirmer le diagnostic <ArrowRight size={20} /></button>
            </div>
          </div>
        </motion.div> : <motion.div key={`diagnosis-${scenario.id}`} className="trade-drawer-content trade-diagnosis" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}>
          <button className="trade-drawer-back" onClick={onBackToRoom} type="button"><ArrowLeft size={18} /> {backLabel}</button><span className="trade-status"><i /><strong>Diagnostic confirmé</strong></span><span className="trade-drawer-step">Risque {scenario.index}</span><h2>{scenario.diagnosis}</h2><p>{scenario.description}</p>
          {scenario.diagnosticMethod && <div className="trade-diagnostic-method"><Gauge size={20} /><div><small>Méthode de diagnostic</small><strong>{scenario.diagnosticMethod}</strong></div></div>}
          <div className="trade-consequences">{scenario.consequences.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</div>
          <ProtectedEquipmentCard scenario={scenario} compact />
          <div className="trade-solution-preview"><img src={scenario.equipmentImage} alt={scenario.equipment} style={{ objectPosition: scenario.imagePosition }} /><div><span>Réponse AQUAPROX</span><strong>{scenario.equipment}</strong><p>{scenario.benefit}</p></div></div>
          <button className="trade-primary" onClick={onSolution} type="button">Faire apparaître la solution <ArrowRight size={20} /></button>
        </motion.div>}
      </AnimatePresence>
    </motion.aside>
  );
}

function DiagnosticRoomScene({ scene, active, scenarios, solved, zone, onBack, onCloseScenario, onHotspot, onDiagnosis, onSolution }: { scene: Scene; active: BoilerRoomScenario; scenarios: BoilerRoomScenario[]; solved: Set<string>; zone: ZoneId; onBack: () => void; onCloseScenario: () => void; onHotspot: (scenario: BoilerRoomScenario) => void; onDiagnosis: () => void; onSolution: () => void }) {
  const drawerOpen = scene === "question" || scene === "diagnosis";
  const roomStateImage = solved.has(active.id) ? active.afterSceneImage : (active.beforeSceneImage ?? BOILER_ROOM_BEFORE);
  return (
    <motion.section className="trade-scene trade-room" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .48 }}>
      <AnimatePresence initial={false}><motion.img key={roomStateImage} className="trade-media trade-room-state-image" src={roomStateImage} alt={solved.has(active.id) ? `${ZONE_META[zone].label} après correction : ${active.equipment}` : `${ZONE_META[zone].label} avant actions correctives`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .65, ease }} /></AnimatePresence><div className={`trade-room-shade ${drawerOpen ? "is-open" : ""}`} /><RoomHeader count={solved.size} total={scenarios.length} flowLabel={ZONE_META[zone].flowLabel} onBack={onBack} />
      <AnimatePresence>{!drawerOpen && scenarios.map((scenario) => solved.has(scenario.id)
        ? <InstalledEquipment key={`installed-${scenario.id}`} scenario={scenario} onSelect={() => onHotspot(scenario)} />
        : <motion.button key={scenario.id} className="trade-risk-hotspot" style={{ left: `${scenario.x}%`, top: `${scenario.y}%` }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => onHotspot(scenario)} type="button" aria-label={`Inspecter : ${scenario.signalLabel}`}><span className="trade-risk-radar" /><span className="trade-risk-core"><Plus size={27} strokeWidth={2.4} /></span><strong><small>{scenario.index}</small>{scenario.signalLabel}</strong></motion.button>)}</AnimatePresence>
      {!drawerOpen && <div className="trade-room-instruction"><span>{String(scenarios.length).padStart(2, "0")}</span><div><strong>Diagnostic visuel</strong><p>Repérez un signe, comprenez le risque, révélez la correction</p></div></div>}
      <AnimatePresence>{drawerOpen && <QuestionDrawer scenario={active} mode={scene === "question" ? "question" : "diagnosis"} onBackToRoom={onCloseScenario} onDiagnosis={onDiagnosis} onSolution={onSolution} backLabel={`Retour à ${ZONE_META[zone].label.toLowerCase()}`} />}</AnimatePresence>
    </motion.section>
  );
}

function RevealScene({ scenario }: { scenario: BoilerRoomScenario }) {
  return (
    <motion.section className="trade-scene trade-reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <img className="trade-media trade-scene-image-layer" src={scenario.beforeSceneImage ?? BOILER_ROOM_BEFORE} alt="Chaufferie avant installation de la correction AQUAPROX" />
      <motion.img className="trade-media trade-scene-image-layer trade-after-scene" src={scenario.afterSceneImage} alt={`Même chaufferie avec ${scenario.equipment} installé`} initial={{ opacity: .15, clipPath: "inset(0 100% 0 0)" }} animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 1.35, ease }} />
      <div className="trade-complete-vignette" />
      <motion.div className="trade-after-wash" initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 1.35, ease }} />
      <div className="trade-reveal-track"><span>Avant · risque identifié</span><i><b /></i><span>Après · réseau protégé</span></div>
      <motion.div className="trade-install-beacon" style={{ left: `${scenario.solutionX}%`, top: `${scenario.solutionY}%` }} initial={{ opacity: 0, scale: .7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .55, duration: .7, ease }}>
        <span><EquipmentMedia scenario={scenario} /></span><i /><b />
      </motion.div>
      <motion.div className="trade-install-status" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .72, duration: .5, ease }}>
        <span>Correction synchronisée</span><strong>{scenario.equipment}</strong><small>La solution est ajoutée à la chaufferie</small>
      </motion.div>
    </motion.section>
  );
}

function CorrectionScene({ scenario, onBack, onComplete }: { scenario: BoilerRoomScenario; onBack: () => void; onComplete: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);
  const step = scenario.correctionSteps[stepIndex];
  const isLast = stepIndex === scenario.correctionSteps.length - 1;
  const advance = () => isLast ? onComplete() : setStepIndex((value) => value + 1);
  return (
    <motion.section className="trade-scene trade-correction" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <img className="trade-media trade-room-state-image" src={scenario.beforeSceneImage ?? BOILER_ROOM_BEFORE} alt="Chaufferie avant l’intervention AQUAPROX" />
      <div className="trade-correction-shade" />
      <Brand />
      <button className="trade-correction-back" onClick={onBack} type="button"><ArrowLeft size={18} /> Retour au diagnostic</button>
      <div className="trade-correction-progress" aria-label={`Étape ${stepIndex + 1} sur ${scenario.correctionSteps.length}`}>
        {scenario.correctionSteps.map((item, index) => <span key={item.phase} className={index <= stepIndex ? "is-active" : ""}><i>{index + 1}</i><b>{item.phase === "curative" ? "Traiter l’existant" : "Prévenir le retour"}</b></span>)}
      </div>
      <AnimatePresence mode="wait">
        <motion.article key={`${scenario.id}-${stepIndex}`} className="trade-correction-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .42, ease }}>
          <div className="trade-correction-visual"><img src={step.image} alt={step.title} /><span>{step.phase === "curative" ? "Action 01 · Curatif" : "Action 02 · Préventif"}</span><i /></div>
          <div className="trade-correction-copy">
            <small>{scenario.diagnosis}</small>
            <h2>{step.title}</h2>
            <p>{step.description}</p>
            <div className="trade-correction-result"><CheckCircle2 size={20} /><div><span>Résultat de cette étape</span><strong>{step.phase === "curative" ? "Le défaut existant est traité" : scenario.benefit}</strong></div></div>
            <button className="trade-primary" onClick={advance} type="button">{step.actionLabel}<ArrowRight size={20} /></button>
          </div>
        </motion.article>
      </AnimatePresence>
      <div className="trade-correction-note">Même chaufferie · même point de vue · correction progressive</div>
    </motion.section>
  );
}

function CompleteScene({ scenario, count, total, zone, allSolved, onExplore, onBack }: { scenario: BoilerRoomScenario; count: number; total: number; zone: ZoneId; allSolved: boolean; onExplore: () => void; onBack: () => void }) {
  const [view, setView] = useState<"before" | "after">("after");
  const roomImage = view === "after" ? scenario.afterSceneImage : (scenario.beforeSceneImage ?? BOILER_ROOM_BEFORE);
  return (
    <motion.section className={`trade-scene trade-complete is-${view}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <AnimatePresence initial={false}><motion.img key={`${scenario.id}-${view}`} className="trade-media trade-room-state-image" src={roomImage} alt={view === "after" ? "Chaufferie avec solution AQUAPROX installée" : "Chaufferie avant correction"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .58, ease }} /></AnimatePresence>
      <div className="trade-complete-vignette" />
      <RoomHeader count={count} total={total} flowLabel={ZONE_META[zone].flowLabel} onBack={onBack} />
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
          {view === "before" && scenario.diagnosticMethod && <div className="trade-diagnostic-method"><Gauge size={20} /><div><small>Comment le vérifier</small><strong>{scenario.diagnosticMethod}</strong></div></div>}
          {view === "after" ? (
            <>
              <div className="trade-benefit"><ShieldCheck size={22} /><div><small>Ce que cela améliore</small><strong>{scenario.benefit}</strong></div></div>
              <ProtectedEquipmentCard scenario={scenario} compact />
              <div className="trade-actions-pair"><div><small>Action curative</small><strong>{scenario.curativeAction}</strong></div><div><small>Protection préventive</small><strong>{scenario.preventiveAction}</strong></div></div>
            </>
          ) : <div className="trade-before-consequences">{scenario.consequences.map((item) => <span key={item}>{item}</span>)}</div>}
          <div className="trade-console-actions">
            <button className="trade-secondary is-enabled" onClick={onExplore} type="button"><Wrench size={17} /> {allSolved ? `Revoir ${ZONE_META[zone].label.toLowerCase()}` : `Retour à ${ZONE_META[zone].label.toLowerCase()}`}</button>
            <button className="trade-primary" onClick={onBack} type="button"><RotateCcw size={18} /> Bâtiment</button>
          </div>
        </div>
      </motion.aside>
    </motion.section>
  );
}

export function TradeShowExperience() {
  const [scene, setScene] = useState<Scene>("building");
  const [selectedZone, setSelectedZone] = useState<ZoneId>("chaufferie");
  const [activeId, setActiveId] = useState(boilerRoomScenarios[1].id);
  const [solved, setSolved] = useState<Set<string>>(new Set());
  const currentScenarios: BoilerRoomScenario[] = selectedZone === "chaufferie" ? boilerRoomScenarios : buildingZoneScenarios.filter((item) => item.zoneId === selectedZone);
  const active = currentScenarios.find((item) => item.id === activeId) ?? currentScenarios[0];
  const zoneSolved = new Set(currentScenarios.filter((item) => solved.has(item.id)).map((item) => item.id));
  const completedByZone: Record<ZoneId, number> = {
    chaufferie: boilerRoomScenarios.filter((item) => solved.has(item.id)).length,
    logements: buildingZoneScenarios.filter((item) => item.zoneId === "logements" && solved.has(item.id)).length,
    gaines: buildingZoneScenarios.filter((item) => item.zoneId === "gaines" && solved.has(item.id)).length,
    toiture: buildingZoneScenarios.filter((item) => item.zoneId === "toiture" && solved.has(item.id)).length,
  };
  useEffect(() => {
    [BOILER_ROOM_BEFORE, ...[...boilerRoomScenarios, ...buildingZoneScenarios].flatMap((scenario) => [scenario.beforeSceneImage, scenario.afterSceneImage].filter(Boolean) as string[])].forEach((source) => {
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
  const showSolution = () => setScene("correction");
  const completeCorrection = () => { setSolved((current) => new Set(current).add(active.id)); setScene("reveal"); };
  const enterZone = (zone: ZoneId) => {
    const scenarios = zone === "chaufferie" ? boilerRoomScenarios : buildingZoneScenarios.filter((item) => item.zoneId === zone);
    setSelectedZone(zone);
    setActiveId(scenarios[0].id);
    setScene("buildingFocus");
  };
  return <main className="trade-experience"><AnimatePresence mode="sync" initial={false}>
    {(scene === "building" || scene === "buildingFocus" || scene === "buildingZoom") && <BuildingScene key="building" scene={scene} selectedZone={selectedZone} completedByZone={completedByZone} onEnter={enterZone} onVideoComplete={() => setScene("entry")} />}
    {scene === "entry" && <EntryScene key="entry" zone={selectedZone} image={currentScenarios[0].beforeSceneImage ?? BOILER_ROOM_BEFORE} />}
    {(scene === "room" || scene === "question" || scene === "diagnosis") && <DiagnosticRoomScene key={`room-${selectedZone}`} scene={scene} active={active} scenarios={currentScenarios} solved={zoneSolved} zone={selectedZone} onBack={() => setScene("building")} onCloseScenario={() => setScene("room")} onHotspot={openScenario} onDiagnosis={() => setScene("diagnosis")} onSolution={showSolution} />}
    {scene === "correction" && <CorrectionScene key={`correction-${active.id}`} scenario={active} onBack={() => setScene("diagnosis")} onComplete={completeCorrection} />}
    {scene === "reveal" && <RevealScene key={`reveal-${active.id}`} scenario={active} />}
    {scene === "complete" && <CompleteScene key={`complete-${active.id}`} scenario={active} count={zoneSolved.size} total={currentScenarios.length} zone={selectedZone} allSolved={zoneSolved.size === currentScenarios.length} onExplore={() => setScene("room")} onBack={() => setScene("building")} />}
  </AnimatePresence></main>;
}
