"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Lightbulb, Pause, Play, Plus, Snowflake, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { boilerRoomScenarios, type BoilerRoomScenario } from "@/data/boilerRoomScenarios";
import { BOILER_ROOM_REGIONS, BOILER_ROOM_SCENE } from "@/data/boilerRoomScene";
import { buildingZoneScenarios, type BuildingZoneId } from "@/data/buildingZoneScenarios";
import { ROOF_REGIONS, ROOF_SCENE } from "@/data/roofScene";
import { GAINES_REGIONS, GAINES_SCENE, LOGEMENT_REGIONS, LOGEMENT_SCENE } from "@/data/otherZoneScenes";
import "./BoilerRoomGame.css";

const ease = [0.22, 1, 0.36, 1] as const;
type Phase = "question" | "feedback" | "treatment" | "treatmentFeedback" | "action" | "installed";

const inquiries: Record<string, { explanation: string; treatment: string; choices: string[]; answer: string; hint: string; treatmentWhy: string }> = {
  "corrosion-boues": {
    explanation: "Ces dépôts noirs adhèrent aux barreaux aimantés : ce sont des particules ferreuses issues de la corrosion du réseau. Elles forment des boues qui perturbent la circulation.",
    treatment: "Comment traiter ces dépôts durablement ?",
    choices: ["Installer uniquement un adoucisseur", "Désembouer, puis filtrer et protéger le réseau", "Augmenter la température"],
    answer: "Désembouer, puis filtrer et protéger le réseau",
    hint: "Il faut d’abord retirer les boues déjà présentes, puis limiter leur réapparition.",
    treatmentWhy: "Le désembouage retire les dépôts existants. Les barreaux aimantés captent ensuite les particules ferreuses et la poche retient les autres boues ; le traitement filmogène complète la protection du métal.",
  },
  "air-degazage": {
    explanation: "Les gouttelettes et les coulures autour du purgeur signalent une perte d’eau à contrôler. Dans ce scénario, elle s’accompagne d’une pression insuffisante ou instable ; la mesure de pression confirme le diagnostic.",
    treatment: "Quelle intervention stabilise ce réseau ?",
    choices: ["Contrôler le purgeur, puis installer un maintien de pression", "Installer un adoucisseur", "Ajouter seulement un filtre magnétique"],
    answer: "Contrôler le purgeur, puis installer un maintien de pression",
    hint: "La solution doit compenser les variations de volume et maintenir la pression de fonctionnement.",
    treatmentWhy: "Le purgeur est contrôlé et la perte supprimée. Le groupe de maintien de pression régule ensuite la pression du circuit : il ne remplace pas la réparation d’une fuite.",
  },
  entartrage: {
    explanation: "La couche claire et dure est un dépôt de calcaire. Elle réduit le passage de l’eau et freine le transfert de chaleur dans les équipements de production ECS.",
    treatment: "Que faut-il faire, et dans quel ordre ?",
    choices: ["Poser un adoucisseur sans nettoyer", "Détartrer, puis adoucir l’eau en amont", "Installer un groupe de maintien de pression"],
    answer: "Détartrer, puis adoucir l’eau en amont",
    hint: "L’adoucisseur limite les nouveaux dépôts, mais ne retire pas le tartre déjà formé.",
    treatmentWhy: "Le détartrage enlève le calcaire déjà présent. L’adoucisseur traite ensuite l’eau en amont du préparateur ECS pour limiter la formation de nouveaux dépôts.",
  },
  conditionnement: {
    explanation: "Les piqûres et les traces de rouille montrent que le métal est attaqué. La manchette témoin rend cette corrosion observable et permet de vérifier l’efficacité du traitement d’eau.",
    treatment: "Quelle protection agit sur les parois métalliques ?",
    choices: ["Un adoucisseur seul", "Un groupe de maintien de pression", "Un traitement filmogène suivi et dosé"],
    answer: "Un traitement filmogène suivi et dosé",
    hint: "Cherchez une protection qui agit directement sur les surfaces métalliques.",
    treatmentWhy: "Le traitement filmogène forme une barrière protectrice sur le métal. Le poste de dosage assure son injection ; le suivi de l’eau et des manchettes permet d’ajuster la protection.",
  },
  "glycol-caramelise": {
    explanation: "Le fluide noir, opaque et visqueux est un glycol solaire dégradé. Le rejet à la soupape et le voyant rouge signalent une station à contrôler et à remettre en état.",
    treatment: "Comment remettre cette boucle solaire en état ?",
    choices: ["Ajouter de l’eau sans nettoyer", "Nettoyer le circuit, puis renouveler le glycol", "Installer un adoucisseur"],
    answer: "Nettoyer le circuit, puis renouveler le glycol",
    hint: "Le fluide dégradé et les dépôts doivent être retirés avant de remettre un fluide adapté.",
    treatmentWhy: "Le dégraissage et le désembouage éliminent les résidus. Le glycol est renouvelé, la soupape est contrôlée et la circulation vérifiée avant la remise en service.",
  },
  "pac-hybridation": {
    explanation: "Le voyant rouge indique une PAC en défaut. Il ne suffit pas à en connaître la cause : dans cette enquête, le contrôle hydraulique révèle un échangeur emboué et un débit dégradé.",
    treatment: "Le contrôle révèle un échangeur emboué. Que faire ?",
    choices: ["Augmenter uniquement la température", "Changer le glycol solaire", "Désembouer le circuit PAC, puis prévenir par dégazage"],
    answer: "Désembouer le circuit PAC, puis prévenir par dégazage",
    hint: "Il faut restaurer l’échange thermique, puis limiter l’air et l’oxygène qui favorisent la corrosion.",
    treatmentWhy: "Le désembouage restaure le débit et le transfert de chaleur. Une centrale de dégazage adaptée limite ensuite l’air et l’oxygène dans le circuit.",
  },
  "radiateur-emboue": {
    explanation: "La vue thermique révèle une partie basse froide alors que le haut chauffe. Dans ce scénario, les dépôts de boues limitent la circulation dans le radiateur.",
    treatment: "Comment retrouver une chaleur homogène ?",
    choices: ["Monter seulement le thermostat", "Désembouer, puis protéger le réseau", "Remplacer le vitrage"],
    answer: "Désembouer, puis protéger le réseau",
    hint: "Il faut retirer les dépôts qui gênent la circulation, puis limiter leur retour.",
    treatmentWhy: "Le désembouage évacue les boues présentes. La filtration en chaufferie et le suivi de l’eau contribuent ensuite à préserver la circulation et le confort.",
  },
  "douche-entartrage": {
    explanation: "Les traces blanches sur la paroi sont des dépôts de calcaire laissés par une eau dure. Les équipements ECS peuvent aussi s’entartrer.",
    treatment: "Comment traiter le dépôt et limiter son retour ?",
    choices: ["Augmenter la pression", "Détartrer, puis adoucir l’eau en amont", "Purger le radiateur"],
    answer: "Détartrer, puis adoucir l’eau en amont",
    hint: "Une action retire le dépôt existant ; une autre réduit la dureté de l’eau.",
    treatmentWhy: "Le détartrage élimine les dépôts déjà formés. L’adoucisseur agit ensuite en amont pour limiter leur réapparition et protéger les équipements ECS.",
  },
  "lavabo-legionelle": {
    explanation: "Une eau qui reste froide malgré la commande chaude signale un défaut à vérifier sur la production ou la distribution ECS. Une température insuffisante favorise le risque bactérien ; elle ne prouve pas, à elle seule, une contamination.",
    treatment: "Le contrôle confirme une contamination. Que faire ?",
    choices: ["Installer uniquement un filtre magnétique", "Désinfecter puis corriger et suivre la production ECS", "Augmenter la pression"],
    answer: "Désinfecter puis corriger et suivre la production ECS",
    hint: "La désinfection traite la contamination ; il faut aussi corriger sa cause et suivre l’installation.",
    treatmentWhy: "Le kit de chloration PROBIO permet une désinfection pilotée. La cause de la température insuffisante doit être corrigée et la qualité d’eau suivie : le dosage ne remplace pas la remise en état de la production ECS.",
  },
  "desequilibre-colonnes": {
    explanation: "Une branche est à 10 L/h avec une vanne réglée à 0,1 ; les logements voisins reçoivent environ 350 L/h. La répartition des débits est déséquilibrée.",
    treatment: "Quelle intervention rétablit une bonne répartition ?",
    choices: ["Ouvrir toutes les vannes au maximum", "Mesurer et équilibrer chaque logement et chaque colonne", "Ajouter un adoucisseur"],
    answer: "Mesurer et équilibrer chaque logement et chaque colonne",
    hint: "Chaque branche doit recevoir son débit calculé, pas nécessairement le débit maximal.",
    treatmentWhy: "La mallette d’équilibrage mesure les débits. Le technicien règle les vannes logement par logement et colonne par colonne, puis vérifie les valeurs obtenues.",
  },
};

function SinkObservation({ corrected = false }: { corrected?: boolean }) {
  return <g data-water-state={corrected ? "restored" : "cold"} aria-label={corrected ? "Production ECS remise en état et contrôlée" : "Commande chaude, jet froid et main sous l’eau : observation illustrée"}>
    <path d="M1518 436 L1518 475" className="boiler-water-stream" stroke="#c6e5f0" strokeWidth="1.8" fill="none" />
  </g>;
}

function ProbioEquipment({ image }: { image: string }) {
  const [full, setFull] = useState(false);
  return <div className="boiler-probio-media">
    <svg className="boiler-probio-sheet" viewBox={full ? "0 0 2970 2100" : "35 35 855 1130"} role="img" aria-label={full ? "Schéma client complet du kit PROBIO avec régulation REDOX et réseau ECS" : "Équipement PROBIO du client : coffret de régulation, deux pompes d’injection et chambre d’analyse"}><defs><clipPath id="probio-equipment-window" clipPathUnits="userSpaceOnUse"><rect x={full ? 0 : 35} y={full ? 0 : 35} width={full ? 2970 : 855} height={full ? 2100 : 1130} /></clipPath></defs><image href={image} width="2970" height="2100" clipPath="url(#probio-equipment-window)" /></svg>
    <button className="boiler-probio-view" type="button" aria-pressed={full} onClick={() => setFull(!full)}>{full ? "Voir le kit en détail" : "Voir le schéma complet"}</button>
  </div>;
}

function Evidence({ scenario, sceneImage, corrected = false }: { scenario: BoilerRoomScenario; sceneImage: string; corrected?: boolean }) {
  const pressure = scenario.id === "air-degazage";
  const roof = scenario.id === "glycol-caramelise" || scenario.id === "pac-hybridation";
  const radiator = scenario.id === "radiateur-emboue";
  const detailFrames: Record<string, { frame: string; label: string }> = {
    "douche-entartrage": { frame: "825 130 460 630", label: "Gros plan de la paroi de douche : dépôts blancs visibles sur le verre" },
    "lavabo-legionelle": { frame: "1430 365 230 200", label: corrected ? "Mitigeur et distribution ECS après remise en état et contrôle" : "Gros plan du mitigeur, réglage chaud mais eau distribuée froide" },
    "desequilibre-colonnes": { frame: "620 580 430 290", label: "Comparaison des quatre compteurs : une branche à 10 L/h et une vanne réglée à 0,1" },
  };
  const detail = detailFrames[scenario.id];
  const viewBox = radiator ? "395 360 280 410" : detail?.frame ?? (pressure ? "1355 185 235 245" : scenario.id === "glycol-caramelise" ? "870 320 400 440" : "460 170 265 260");
  return <div className="boiler-evidence-media" data-evidence-state={corrected ? "after" : "before"} data-water-state={scenario.id === "lavabo-legionelle" ? corrected ? "restored" : "cold" : undefined}>
    {radiator || (scenario.id === "lavabo-legionelle" && scenario.resultImage) ? <img className={radiator ? "boiler-radiator-thermal" : "boiler-sink-photo"} src={corrected ? scenario.resultImage ?? scenario.detailImage : scenario.detailImage} alt={radiator ? corrected ? "Même radiateur après désembouage : chaleur répartie sur toute sa surface" : "Radiateur en vue thermique pédagogique : chaud en haut et froid en bas, les couleurs suivent ses reliefs" : corrected ? "Même mitigeur après remise en état et contrôle de l’ECS : eau claire dans le lavabo" : "Main sous le jet du mitigeur positionné sur le chaud : constat d’une eau qui reste froide"} /> : pressure || roof || detail ? <svg className="boiler-scene-detail" viewBox={viewBox} role="img" aria-label={radiator ? corrected ? "Vue thermique pédagogique après intervention : chaleur homogène" : "Vue thermique pédagogique du radiateur : partie haute chaude et partie basse froide" : detail?.label ?? (corrected ? "Station solaire remise en service : voyant vert et bac nettoyé, sans rejet" : pressure ? "Gros plan du purgeur de cette scène : gouttelettes, traces humides et coulures sur le ballon" : scenario.id === "glycol-caramelise" ? "Gros plan de la station solaire : voyant rouge et glycol noir dans le bac de récupération" : "Gros plan de l’écran de la pompe à chaleur : alarme rouge")}>
      <image href={sceneImage} width={1672} height={941} />

    </svg> : <img src={scenario.detailImage} alt={scenario.id === "conditionnement" ? "Intérieur d’une manchette témoin avec rouille et piqûres de corrosion" : scenario.id === "entartrage" ? "Coupe d’une canalisation avec une couche de dépôt minéral" : "Barreaux magnétiques sortis d’un pot à boues, couverts de dépôt noir"} />}
    {scenario.id === "lavabo-legionelle" && <div className="boiler-measurement">{corrected ? <CheckCircle2 size={22} /> : <Snowflake size={22} />}<div><small>{corrected ? "Production et distribution vérifiées" : "Commande sur chaud · observation illustrée"}</small><strong>{corrected ? "ECS rétablie · suivi à maintenir" : "L’eau reste froide"}</strong></div></div>}
    {radiator && <div className="boiler-measurement"><div><small>Vue thermique pédagogique</small><strong>{corrected ? "Chaleur homogène après intervention" : "Haut chaud · bas froid"}</strong></div></div>}
  </div>;
}

function SolutionMedia({ scenario, explanation = false }: { scenario: BoilerRoomScenario; explanation?: boolean }) {
  const reducedMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(!reducedMotion);
  const videoRef = useRef<HTMLVideoElement>(null);
  const source = explanation ? scenario.motionVideo : scenario.productVideo ?? (scenario.motionPoster ? "" : scenario.motionVideo);
  const poster = explanation ? scenario.motionPoster ?? scenario.equipmentImage : scenario.equipmentImage;
  if (!explanation && scenario.id === "lavabo-legionelle") return <ProbioEquipment image={scenario.equipmentImage} />;
  if (!source || failed) return <img className="boiler-product-image" src={poster} alt={scenario.equipment} />;
  return <div className={`boiler-solution-media ${explanation && scenario.motionPoster ? "has-explainer" : ""}`}>
    <img src={poster} alt="" aria-hidden="true" />
    <video ref={videoRef} src={source} poster={poster} autoPlay={!reducedMotion} muted loop playsInline preload="auto" style={{ opacity: ready ? 1 : 0 }} onError={() => setFailed(true)} onPlaying={() => { setReady(true); setPlaying(true); }} onPause={() => setPlaying(false)} onCanPlay={(event) => { if (!reducedMotion && playing) event.currentTarget.play().catch(() => setPlaying(false)); }} aria-label={`${explanation ? "Fonctionnement" : "Présentation de l’équipement"} : ${scenario.equipment}`} />
    <button className="boiler-animation-control" type="button" aria-label={playing ? "Mettre l’animation en pause" : "Lire l’animation"} onClick={() => { const video = videoRef.current; if (!video) return; if (playing) video.pause(); else video.play().catch(() => setPlaying(false)); }}>{playing ? <Pause size={15} /> : <Play size={15} />}{playing ? "Pause" : "Lire"}</button>
  </div>;
}

export function BoilerRoomGame({ solved, onSolved, onBack, zone = "chaufferie", prepared = new Set<string>(), onPrepared }: { prepared?: Set<string>; onPrepared?: (id: string) => void; solved: Set<string>; onSolved: (id: string) => void; onBack: () => void; zone?: "chaufferie" | BuildingZoneId }) {
  const direct = zone === "chaufferie" || zone === "logements";
  const rooftop = zone === "toiture";
  const scenarios: BoilerRoomScenario[] = zone === "chaufferie" ? boilerRoomScenarios : buildingZoneScenarios.filter((scenario) => scenario.zoneId === zone);
  const sceneAsset = zone === "logements" ? LOGEMENT_SCENE : zone === "gaines" ? GAINES_SCENE : rooftop ? ROOF_SCENE : BOILER_ROOM_SCENE;
  const regions: typeof BOILER_ROOM_REGIONS = zone === "logements" ? LOGEMENT_REGIONS : zone === "gaines" ? GAINES_REGIONS : rooftop ? ROOF_REGIONS : BOILER_ROOM_REGIONS;
  const roomLabel = { chaufferie: "Chaufferie", toiture: "Toiture", logements: "Logement", gaines: "Gaines techniques" }[zone];
  const returnLabel = zone === "gaines" ? "aux gaines techniques" : zone === "logements" ? "au logement" : `à la ${roomLabel.toLowerCase()}`;
  const completionTitle = { chaufferie: "Une chaufferie mieux protégée.", toiture: "Une toiture technique remise en service.", logements: "Un logement plus confortable et mieux protégé.", gaines: "Une distribution mieux équilibrée." }[zone];
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState<BoilerRoomScenario | null>(null);
  const [approaching, setApproaching] = useState(false);
  const [phase, setPhase] = useState<Phase>("question");
  const [choice, setChoice] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [step, setStep] = useState(0);
  const [comparison, setComparison] = useState<"before" | "after">("after");
  const [installing, setInstalling] = useState(false);
  const [revealAfter, setRevealAfter] = useState(false);
  const [explanation, setExplanation] = useState(false);
  const [resultPreview, setResultPreview] = useState(true);
  const count = scenarios.filter((s) => solved.has(s.id)).length;
  const inquiry = active ? inquiries[active.id] : null;

  useEffect(() => {
    for (const scenario of (zone === "chaufferie" ? boilerRoomScenarios : buildingZoneScenarios.filter((item) => item.zoneId === zone))) {
      for (const src of [scenario.detailImage, scenario.resultImage, scenario.equipmentImage, scenario.afterSceneImage]) {
        if (src) { const img = new Image(); img.src = src; img.decode().catch(() => undefined); }
      }
    }
  }, [zone]);
  useEffect(() => {
    if (!active || approaching) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setActive(null); setInstalling(false); setExplanation(false); }
      if (event.key === "Tab") {
        const buttons = [...document.querySelectorAll<HTMLButtonElement>('.boiler-investigation button:not([disabled])')];
        const first = buttons[0]; const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const focus = requestAnimationFrame(() => document.querySelector<HTMLButtonElement>('.boiler-close, .boiler-reveal-status button')?.focus({ preventScroll: true }));
    window.addEventListener("keydown", close);
    return () => { cancelAnimationFrame(focus); window.removeEventListener("keydown", close); };
  }, [active, approaching, installing]);
  useEffect(() => {
    if (!approaching) return;
    const timer = window.setTimeout(() => setApproaching(false), reducedMotion ? 0 : 720);
    return () => window.clearTimeout(timer);
  }, [approaching, reducedMotion]);
  useEffect(() => {
    if (!installing) return;
    const reveal = window.setTimeout(() => setRevealAfter(true), reducedMotion ? 0 : 1000);
    const timer = window.setTimeout(() => {
      setInstalling(false);
      if (direct) { setActive(null); setApproaching(false); setExplanation(false); }
    }, reducedMotion ? 0 : direct ? 3400 : 1150);
    return () => { window.clearTimeout(reveal); window.clearTimeout(timer); };
  }, [installing, reducedMotion, direct]);

  const open = (scenario: BoilerRoomScenario) => {
    setActive(scenario); setChoice(null); setWrong([]); setShowHint(false); setStep(direct && prepared.has(scenario.id) ? Math.min(1, scenario.correctionSteps.length - 1) : 0); setComparison("after");
    setApproaching(!reducedMotion); setExplanation(false); setResultPreview(true); setInstalling(false);
    setPhase(solved.has(scenario.id) ? "installed" : direct && prepared.has(scenario.id) ? "action" : "question");
  };
  const next = (value: Phase) => { setExplanation(false); setPhase(value); setChoice(null); setWrong([]); setShowHint(false); };
  const checkAnswer = () => {
    if (!active || !inquiry || !choice) return;
    const correct = phase === "question" ? active.correctAnswer : inquiry.answer;
    if (choice === correct) next(phase === "question" ? "feedback" : "treatmentFeedback");
    else { setWrong((items) => [...items, choice]); setChoice(null); setShowHint(true); }
  };
  const applyAction = () => {
    if (!active) return;
    if (step < active.correctionSteps.length - 1) { onPrepared?.(active.id); setStep((value) => value + 1); }
    else { onSolved(active.id); setRevealAfter(false); setInstalling(true); setExplanation(false); setComparison("after"); next("installed"); }
  };
  const quiz = phase === "question" || phase === "treatment";
  const feedback = phase === "feedback" || phase === "treatmentFeedback";
  const answers = active && inquiry ? (phase === "question" ? active.answers : inquiry.choices) : [];
  const action = active?.correctionSteps[step];
  const before = (phase === "installed" || (direct && phase === "action")) && comparison === "before";
  // The solar solution must show the operational station, not repeat its leaking diagnostic image.
  const solarSolutionPreview = active?.id === "glycol-caramelise" && (phase === "treatmentFeedback" || phase === "action");
  const learningVisual = phase === "feedback" ? active?.diagnosticImage : undefined;
  const productPhase = (direct && phase === "action" && explanation) || solarSolutionPreview || (Boolean(active?.motionPoster) && phase === "treatmentFeedback") || (phase === "installed" && comparison === "after") || (phase === "action" && action?.phase === "preventive");
  const showingProduct = active?.id === "lavabo-legionelle" && phase === "action" && !explanation ? step === 0 : productPhase;
  const roomResult = zone === "logements" && phase === "installed" && comparison === "after" && !explanation && resultPreview;
  const returnVisualLabel = zone === "logements" && phase === "installed" && resultPreview ? "Revenir au résultat" : "Revenir à l’équipement";
  const region = active ? direct && (installing || (phase === "installed" && comparison === "after")) ? { ...regions[active.id], x: active.solutionX, y: active.solutionY, zoom: 1.65 } : regions[active.id] : null;
  const cameraOffset = (position: number, zoom: number) => Math.max(-50 * (zoom - 1), Math.min(50 * (zoom - 1), (50 - position) * zoom));
  const hotspot = (scenario: BoilerRoomScenario) => {
    if (direct) return solved.has(scenario.id) ? { x: scenario.solutionX, y: scenario.solutionY } : regions[scenario.id];
    return { x: regions[scenario.id].x + 3.3, y: regions[scenario.id].y - 5.5 };
  };
  const closeInvestigation = () => { setActive(null); setApproaching(false); setExplanation(false); setInstalling(false); };

  return <motion.section className={`trade-scene boiler-game ${active && !approaching && !(direct && installing) ? "has-investigation" : ""} ${direct && installing ? "is-revealing" : ""} ${approaching ? "is-approaching" : ""}`} data-zone={zone} aria-label={`Jeu de diagnostic : ${roomLabel.toLowerCase()}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .5, ease }}>
    <div className="boiler-stage" aria-hidden="true">
      <motion.div className="boiler-camera" data-focus={active?.id ?? "overview"} animate={{ scale: region ? region.zoom : 1, x: region ? `${cameraOffset(region.x, region.zoom)}%` : "0%", y: region ? `${cameraOffset(region.y, region.zoom)}%` : "0%" }} transition={{ duration: reducedMotion ? 0 : .72, ease }}>
      <img className="boiler-stage-image" src={sceneAsset.before} alt="" fetchPriority="high" />
      {scenarios.filter((s) => (solved.has(s.id) || (solarSolutionPreview && active?.id === s.id)) && !((before || (direct && installing && !revealAfter)) && active?.id === s.id)).flatMap((scenario) => regions[scenario.id].patches.map((patch, index) => <motion.img key={`${scenario.id}-${index}`} className="boiler-stage-image boiler-installed-layer" data-correction={scenario.id} src={zone === "chaufferie" ? scenario.afterSceneImage : sceneAsset.after} alt="" style={{ clipPath: patch }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 1.1, ease }} />))}
      {zone === "logements" && solved.has("lavabo-legionelle") && !(active?.id === "lavabo-legionelle" && (before || (installing && !revealAfter))) && <svg className="boiler-stage-observation" viewBox="0 0 1672 941" aria-hidden="true"><SinkObservation corrected /></svg>}
      {direct && installing && active && !reducedMotion && <motion.div className="boiler-result-glow" style={{ left: `${active.solutionX}%`, top: `${active.solutionY}%`, x: "-50%", y: "-50%" }} initial={{ opacity: 0, scale: .8 }} animate={{ opacity: [0, .8, 0], scale: [1, 1.15, 1.35] }} transition={{ duration: 2.5, ease }} />}
      {approaching && region && <div className="boiler-focus-ring" style={{ left: `${region.x}%`, top: `${region.y}%` }} />}
      </motion.div>
    </div>
    <div className="boiler-shade" />
    <header className="boiler-header">
      <button className="boiler-back" type="button" onClick={active ? closeInvestigation : onBack}><ArrowLeft size={19} />{active ? roomLabel : "Bâtiment"}</button>
      <div className="boiler-room-title"><span>AQUAPROX</span><strong>{roomLabel}</strong></div>
      <div className="boiler-score" aria-live="polite"><CheckCircle2 size={19} /><strong>{count} / {scenarios.length}</strong><span>risques traités</span></div>
    </header>
    {!active && <>
      <div className="boiler-stage boiler-hotspots">
        {!direct && <svg className="boiler-hotspot-leaders" aria-hidden="true">{scenarios.map((scenario) => { const point = regions[scenario.id]; return <g key={scenario.id}><line x1={`${point.x}%`} y1={`${point.y}%`} x2={`${point.x + 3.3}%`} y2={`${point.y - 5.5}%`} /><circle cx={`${point.x}%`} cy={`${point.y}%`} r="4" /></g>; })}</svg>}
        {scenarios.map((scenario) => <button key={scenario.id} type="button" className={`boiler-plus ${solved.has(scenario.id) ? "is-solved" : ""}`} style={{ left: `${hotspot(scenario).x}%`, top: `${hotspot(scenario).y}%` }} onClick={() => open(scenario)} aria-label={solved.has(scenario.id) ? `Revoir la correction ${scenario.index}` : `Explorer le point ${scenario.index}`}><span />{direct || !solved.has(scenario.id) ? <Plus size={27} /> : <Check size={25} />}</button>)}
      </div>
      <div className="boiler-mission"><span>{count === scenarios.length ? "Mission accomplie" : "À vous d’enquêter"}</span><h1>{count === scenarios.length ? completionTitle : direct ? "Identifiez le risque, appliquez la solution." : "Que se cache-t-il dans cette installation ?"}</h1><p>{count === scenarios.length ? direct ? "Touchez un + pour revoir le problème et sa correction." : "Touchez une coche pour revoir le problème et sa correction." : direct ? "Touchez un +, trouvez la cause et découvrez l’équipement adapté." : "Touchez un +, observez l’indice et trouvez la cause."}</p></div>
    </>}
    {direct && installing && active && <motion.div className="boiler-reveal-status" style={{ x: "-50%" }} role="status" aria-live="polite" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><span>{revealAfter ? "Après intervention" : "Avant intervention"}</span><strong>{revealAfter ? active.equipment : active.diagnosis}</strong><p>{revealAfter ? active.benefit : "Observez la zone : la solution va apparaître."}</p><button type="button" onClick={() => setInstalling(false)}>Voir le résultat<ArrowRight size={16} /></button></motion.div>}
    <AnimatePresence mode="wait">{active && inquiry && !approaching && !(direct && installing) && <motion.div key={active.id} className={`boiler-investigation ${phase === "installed" ? "is-installed" : ""}`} role="dialog" aria-modal="true" aria-labelledby="boiler-question-title" initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: .3, ease }}>
      <button className="boiler-close" type="button" onClick={closeInvestigation} aria-label={`Fermer et revenir ${returnLabel}`}><X size={23} /></button>
      <div className="boiler-visual">
        <AnimatePresence initial={false}><motion.div key={roomResult ? "room-result" : learningVisual ? "diagnostic" : showingProduct ? "product" : "evidence"} className="boiler-visual-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .4 }}>{roomResult ? <Evidence scenario={active} sceneImage={sceneAsset.after} corrected /> : learningVisual ? <><img className="boiler-product-image" src={learningVisual} alt="Coupe pédagogique d’un mitigeur et des canalisations : illustration du risque bactérien" /><div className="boiler-diagnostic-note">Illustration du risque · contrôle nécessaire</div></> : showingProduct ? active.id === "glycol-caramelise" ? <Evidence scenario={active} sceneImage={sceneAsset.after} corrected /> : <SolutionMedia key={`${active.id}-${explanation}`} scenario={active} explanation={direct ? explanation : true} /> : <Evidence scenario={active} sceneImage={sceneAsset.before} />}</motion.div></AnimatePresence>
        <div className="boiler-visual-caption"><small>{roomResult ? "Résultat dans le logement" : direct && showingProduct ? explanation ? "Fonctionnement · animation pédagogique" : active.equipmentLocation ?? (phase === "installed" ? "Solution installée" : "Équipement proposé") : solarSolutionPreview ? "Résultat de l’intervention" : phase === "installed" ? comparison === "after" ? "Solution AQUAPROX" : "Avant intervention" : phase === "action" ? `Action ${step + 1} / ${active.correctionSteps.length}` : `Point d’observation ${active.index}`}</small><strong>{roomResult ? ({"radiateur-emboue": "Radiateur · chaleur homogène", "douche-entartrage": "Paroi de douche nettoyée", "lavabo-legionelle": "Production et distribution ECS rétablies"}[active.id] ?? active.equipment) : direct && showingProduct ? active.equipmentMediaLabel ?? active.equipment : active.id === "glycol-caramelise" && showingProduct ? "Station opérationnelle · aucun rejet" : phase === "installed" ? comparison === "after" ? active.equipment : active.diagnosis : phase === "action" ? action?.title : "Observez les détails"}</strong></div>
      </div>
      <div className="boiler-panel">
        <div className="boiler-progress-rail" aria-label="Progression de l’enquête"><span className="is-current">01 Observer</span><i /><span className={phase !== "question" ? "is-current" : ""}>02 Comprendre</span><i /><span className={phase === "action" || phase === "installed" ? "is-current" : ""}>03 Corriger</span></div>
        <AnimatePresence mode="wait"><motion.div className="boiler-panel-body" key={`${phase}-${step}-${comparison}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .18 }}>
          {quiz && <>
            <span className="boiler-eyebrow">Question {phase === "question" ? "1" : "2"} / 2</span>
            <h2 id="boiler-question-title">{phase === "question" ? active.question : inquiry.treatment}</h2>
            <p>{phase === "question" ? active.prompt : "Choisissez l’intervention la plus adaptée au problème observé."}</p>
            {active.id === "lavabo-legionelle" && phase === "treatment" && <div className="boiler-control-result"><CheckCircle2 size={17} /><span>Dans cette enquête, le contrôle a confirmé la contamination du réseau ECS.</span></div>}
            <div className="boiler-answers" role="radiogroup" aria-label="Réponses possibles">{answers.map((answer, index) => <button key={answer} type="button" role="radio" aria-checked={choice === answer} disabled={wrong.includes(answer)} className={`${choice === answer ? "is-selected" : ""} ${wrong.includes(answer) ? "is-eliminated" : ""}`} onClick={() => { setChoice(answer); setShowHint(false); }}><span>{String.fromCharCode(65 + index)}</span><strong>{answer}</strong><i /></button>)}</div>
            {showHint && <div className="boiler-hint" role="status"><Lightbulb size={20} /><div><strong>Presque ! Regardez encore.</strong><p>{phase === "question" ? wrong.length > 1 ? active.assistedHint : active.retryMessage : inquiry.hint}</p></div></div>}
            <button className="boiler-primary" type="button" disabled={!choice} onClick={checkAnswer}>Vérifier ma réponse<ArrowRight size={20} /></button>
          </>}
          {feedback && <>
            <span className="boiler-correct" role="status"><CheckCircle2 size={21} /> Bonne réponse !</span>
            <h2 id="boiler-question-title">{phase === "feedback" ? active.diagnosis : "La bonne action, au bon moment."}</h2>
            <div className="boiler-explanation"><small>Pourquoi ?</small><p>{phase === "feedback" ? inquiry.explanation : inquiry.treatmentWhy}</p></div>
            <div className="boiler-outcome"><small>{phase === "feedback" ? "Ce que cela provoque" : "Ce que vous améliorez"}</small><strong>{phase === "feedback" ? active.consequences.slice(0, 2).join(" · ") : active.benefit}</strong></div>
            {direct && phase === "treatmentFeedback" && <button className="boiler-how boiler-feedback-how" type="button" aria-pressed={explanation} onClick={() => setExplanation(!explanation)}><Play size={16} />{explanation ? "Revenir à l’équipement" : "Voir comment ça fonctionne"}</button>}
            <button className="boiler-primary" type="button" onClick={() => next(phase === "feedback" ? "treatment" : "action")}>{phase === "feedback" ? "Comment corriger ce problème ?" : "Passer à l’intervention"}<ArrowRight size={20} /></button>
          </>}
          {phase === "action" && action && <>
            <span className="boiler-eyebrow">{direct ? active.correctionSteps.length > 1 ? `Action ${step + 1} / ${active.correctionSteps.length} · ${action.title}` : "Une action pour protéger le réseau" : `${action.phase === "curative" ? "Traiter le défaut existant" : "Protéger durablement"} · ${step + 1} / ${active.correctionSteps.length}`}</span>
            <h2 id="boiler-question-title">{direct ? active.equipment : action.title}</h2>
            {direct && <div className="boiler-direct-diagnosis"><small>Diagnostic confirmé</small><strong>{active.diagnosis}</strong></div>}
            {direct && active.correctionSteps.length > 1 && <ol className="boiler-treatment-sequence" aria-label="Les deux interventions nécessaires">{active.correctionSteps.map((item, index) => <li key={item.phase} className={index < step ? "is-done" : index === step ? "is-current" : ""} aria-current={index === step ? "step" : undefined}><span>{index < step ? <Check size={14} /> : index + 1}</span><div><strong>{item.title}</strong><small>{index < step ? "Réalisé" : index === step ? "À appliquer" : "Ensuite"}</small></div></li>)}</ol>}
            <p>{action.description}</p>
            {direct && <button className="boiler-how" type="button" aria-pressed={explanation} onClick={() => { setExplanation(!explanation); setComparison("after"); }}><Play size={16} />{explanation ? "Revenir à l’équipement" : "Voir comment ça fonctionne"}</button>}
            <div className="boiler-outcome"><small>{direct ? "Le bénéfice" : action.phase === "curative" ? "D’abord" : "Ensuite"}</small><strong>{direct ? active.benefit : action.phase === "curative" ? active.curativeAction : active.preventiveAction}</strong></div>
            <button className="boiler-primary" type="button" onClick={applyAction}>{action.actionLabel}<ArrowRight size={20} /></button>
          </>}
          {phase === "installed" && <>
            <span className="boiler-correct" role="status"><CheckCircle2 size={21} />{installing ? "Installation de la solution…" : "Correction réalisée"}</span>
            <h2 id="boiler-question-title">{comparison === "after" ? active.equipment : active.diagnosis}</h2>
            <p>{comparison === "after" ? active.solution : inquiry.explanation}</p>
            <div className="boiler-outcome"><small>{comparison === "after" ? "Le bénéfice pour votre installation" : "Le problème avant intervention"}</small><strong>{comparison === "after" ? active.benefit : active.consequences.slice(0, 2).join(" · ")}</strong></div>
            {direct && comparison === "after" && <div className="boiler-result-actions">{zone === "logements" && <button className="boiler-how" type="button" aria-pressed={!resultPreview} onClick={() => { setExplanation(false); setResultPreview(!resultPreview); }}>{resultPreview ? "Voir l’équipement" : "Voir le résultat"}</button>}<button className="boiler-how" type="button" aria-pressed={explanation} onClick={() => setExplanation(!explanation)}><Play size={16} />{explanation ? returnVisualLabel : "Voir comment ça fonctionne"}</button><button className="boiler-how" type="button" onClick={() => { setRevealAfter(false); setExplanation(false); setInstalling(true); }}>Rejouer l’avant / après</button></div>}
            <div className="boiler-comparison" role="group" aria-label="Comparer avant et après"><button type="button" aria-pressed={comparison === "before"} onClick={() => setComparison("before")}>Avant</button><button type="button" aria-pressed={comparison === "after"} onClick={() => setComparison("after")}>Après</button></div>
            <button className="boiler-primary" type="button" onClick={closeInvestigation}>{count === scenarios.length ? "Voir les corrections" : "Continuer l’enquête"}<ArrowRight size={20} /></button>
          </>}
        </motion.div></AnimatePresence>
      </div>
    </motion.div>}</AnimatePresence>
  </motion.section>;
}
