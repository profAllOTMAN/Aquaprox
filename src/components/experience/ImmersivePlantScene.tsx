"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Focus, Gauge, Maximize2, MousePointer2, Move, ScanSearch, ShieldCheck, Waves } from "lucide-react";
import { useEffect, useState } from "react";

type Mode = "before" | "after";

const points = {
  before: [
    { id: "pressure", x: 18, y: 24, title: "Pression instable", detail: "L’aiguille varie lorsque l’air perturbe la circulation.", icon: Gauge },
    { id: "flow", x: 69, y: 56, title: "Débit perturbé", detail: "Le circulateur ne retrouve pas un régime hydraulique stable.", icon: Waves },
    { id: "missing", x: 50, y: 50, title: "Traitement absent", detail: "La zone centrale reste disponible pour une action corrective.", icon: ScanSearch },
  ],
  after: [
    { id: "separator", x: 52, y: 48, title: "Séparateur magnétique", detail: "L’équipement apparaît dans la même installation et au même point de vue.", icon: ShieldCheck },
    { id: "monitoring", x: 31, y: 23, title: "Pilotage et suivi", detail: "Le contrôle permet de suivre le fonctionnement après intervention.", icon: Gauge },
    { id: "protected", x: 74, y: 58, title: "Circuit protégé", detail: "Pompes, vannes et équipements restent intégrés au réseau existant.", icon: Focus },
  ],
};

export function ImmersivePlantScene({ solved }: { solved: boolean }) {
  const [mode, setMode] = useState<Mode>(solved ? "after" : "before");
  const [active, setActive] = useState<string | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMode(solved ? "after" : "before");
    setActive(null);
  }, [solved]);

  const scenePoints = points[mode];
  const activePoint = scenePoints.find((point) => point.id === active);
  const ActiveIcon = activePoint?.icon;
  const image = mode === "before" ? "/assets/scenes/risks/air/immersive-before-v1.png" : "/assets/scenes/risks/air/immersive-v1.png";

  return <div className="immersive-plant">
    <div className="immersive-toolbar">
      <div className="immersive-state-switch">
        <button className={mode === "before" ? "active" : ""} onClick={() => { setMode("before"); setActive(null); }}>Installation actuelle</button>
        <button className={mode === "after" ? "active" : ""} disabled={!solved} onClick={() => { setMode("after"); setActive(null); }}>Solution AQUAPROX</button>
      </div>
      <button className="immersive-zoom" onClick={() => { setZoomed((value) => !value); setPan({ x: 0, y: 0 }); }}><Maximize2 /> {zoomed ? "Vue complète" : "Explorer"}</button>
    </div>

    <div
      className={`immersive-stage ${zoomed ? "is-zoomed" : ""}`}
      onPointerMove={(event) => {
        if (!zoomed) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        setPan({ x: ((event.clientX - bounds.left) / bounds.width - .5) * -6, y: ((event.clientY - bounds.top) / bounds.height - .5) * -4 });
      }}
      onPointerLeave={() => setPan({ x: 0, y: 0 })}
    >
      <AnimatePresence mode="wait">
        <motion.img key={image} src={image} alt={mode === "before" ? "Chaufferie avant traitement AQUAPROX" : "Chaufferie équipée de la solution AQUAPROX"} initial={{ opacity: .35, scale: 1.015 }} animate={{ opacity: 1, scale: zoomed ? 1.12 : 1.01, x: `${pan.x}%`, y: `${pan.y}%` }} exit={{ opacity: .2 }} transition={{ duration: .6, ease: [0.22, 1, 0.36, 1] }} />
      </AnimatePresence>
      <div className="immersive-shade" />
      <div className="immersive-caption"><i /> CHAUFFERIE · VUE IMMERSIVE <span>{mode === "before" ? "DIAGNOSTIC" : "APRÈS INTERVENTION"}</span></div>

      {scenePoints.map(({ id, x, y, title, icon: Icon }) => <button key={id} className={`immersive-point ${active === id ? "active" : ""}`} style={{ left: `${x}%`, top: `${y}%` }} onClick={() => setActive((current) => current === id ? null : id)} aria-label={title}>
        <span><Icon /></span><small>{title}</small>
      </button>)}

      <AnimatePresence>{activePoint && ActiveIcon && <motion.div className="immersive-detail" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
        <ActiveIcon /><div><strong>{activePoint.title}</strong><span>{activePoint.detail}</span></div>
      </motion.div>}</AnimatePresence>

      <div className="immersive-help"><Move /> Déplacer le regard <MousePointer2 /> Toucher les points de diagnostic</div>
    </div>
  </div>;
}
