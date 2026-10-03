"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { RiskHotspot, RiskId } from "@/types/experience";

type Props = {
  risks: RiskHotspot[];
  activeRisk?: RiskId | null;
  revealed?: Set<RiskId>;
  onSelect?: (risk: RiskHotspot) => void;
  ambient?: boolean;
};

const floors = [
  { y: 154, label: "NIVEAU 04", use: "Logements" },
  { y: 254, label: "NIVEAU 03", use: "Logements" },
  { y: 354, label: "NIVEAU 02", use: "Logements" },
  { y: 454, label: "NIVEAU 01", use: "Logements" },
];

function ApartmentFloor({ y, index }: { y: number; index: number }) {
  return (
    <g className="apartment-floor">
      <rect x="155" y={y} width="610" height="86" rx="2" className="floor-shell" />
      <rect x="155" y={y} width="610" height="7" className="floor-slab" />
      <path d={`M315 ${y + 7}v79M505 ${y + 7}v79M652 ${y + 7}v79`} className="partition" />

      <g className="room living" transform={`translate(174 ${y + 22})`}>
        <rect width="105" height="42" rx="3" className="sofa" />
        <rect x="11" y="8" width="83" height="4" rx="2" className="sofa-line" />
        <circle cx="128" cy="28" r="15" className="table" />
        <circle cx="128" cy="28" r="5" className="table-core" />
      </g>

      <g className="room kitchen" transform={`translate(332 ${y + 18})`}>
        <rect width="145" height="20" rx="2" className="cabinet" />
        <circle cx="20" cy="10" r="5" className="sink" />
        <path d="M18 6v-5h9" className="tap" />
        <rect x="91" y="4" width="36" height="12" rx="2" className="cooktop" />
        <path d="M103 4v12M115 4v12" className="detail-line" />
      </g>

      <g className="room bathroom" transform={`translate(521 ${y + 15})`}>
        <rect width="112" height="56" rx="2" className="wet-zone" />
        <rect x="11" y="9" width="42" height="28" rx="14" className="bath" />
        <circle cx="82" cy="22" r="10" className="basin" />
        <path d="M80 12V5h11" className="tap" />
      </g>

      <g className="room service" transform={`translate(672 ${y + 18})`}>
        <rect width="72" height="50" rx="3" className="service-box" />
        <circle cx="36" cy="25" r="15" className="service-dial" />
        <path d="M29 25h14M36 18v14" className="detail-line" />
      </g>

      <text x="780" y={y + 25} className="floor-index">0{4 - index}</text>
    </g>
  );
}

export function BuildingVisual({ risks, activeRisk, revealed = new Set(), onSelect, ambient = false }: Props) {
  const renderedRequested = process.env.NEXT_PUBLIC_VISUAL_MODE === "rendered";
  const [renderAvailable, setRenderAvailable] = useState(renderedRequested);
  const renderedActive = renderedRequested && renderAvailable;

  return (
    <div className={`building-visual building-cutaway ${ambient ? "ambient" : ""} ${renderedActive ? "rendered-environment" : "vector-environment-active"}`}>
      <svg viewBox="0 0 1000 660" role="img" aria-label="Immeuble collectif en coupe montrant la toiture, les logements, les gaines techniques et la chaufferie">
        <defs>
          <linearGradient id="technicalBackdrop" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#153c50" />
            <stop offset="1" stopColor="#071d2d" />
          </linearGradient>
          <linearGradient id="roomLight" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#183f53" />
            <stop offset="1" stopColor="#0d2b3d" />
          </linearGradient>
          <filter id="cutawayGlow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="cutawayShadow"><feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#001019" floodOpacity=".65"/></filter>
          <pattern id="technicalGrid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#62d8e9" strokeOpacity=".055"/></pattern>
        </defs>

        {renderedRequested && <image className="rendered-overview" href="/assets/scenes/building/overview.webp" width="1000" height="660" preserveAspectRatio="xMidYMid meet" onError={() => setRenderAvailable(false)} />}

        <g className="vector-environment">
        <rect width="1000" height="660" fill="url(#technicalGrid)" />
        <path d="M80 604H920" className="ground-line" />
        <path d="M113 621H873" className="ground-line secondary" />

        <motion.g
          filter="url(#cutawayShadow)"
          animate={activeRisk ? { scale: 1.018, x: activeRisk === "ecs" || activeRisk === "entartrage" ? -9 : 8 } : { scale: 1, x: 0 }}
          transition={{ duration: .48, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "48% 56%" }}
        >
          <path d="M130 132L458 53 808 126 765 154H155Z" className="roof" />
          <path d="M458 53L808 126 765 154 457 90Z" className="roof-side" />
          <g className="roof-equipment" transform="translate(535 77) skewY(11)">
            <rect width="105" height="38" rx="2" className="solar-panel" />
            <path d="M26 0v38M52 0v38M78 0v38M0 19h105" />
          </g>
          <g className="heat-pump" transform="translate(682 100)">
            <rect width="54" height="35" rx="3" />
            <circle cx="20" cy="17" r="10" /><path d="M20 8v18M11 17h18" />
          </g>
          <path d="M130 132L155 154V540L130 524Z" className="left-wall" />
          <path d="M765 154L808 126V523L765 540Z" className="right-wall" />

          {floors.map((floor, index) => <ApartmentFloor key={floor.y} y={floor.y} index={index} />)}

          <g className="technical-room">
            <rect x="155" y="554" width="610" height="45" rx="2" fill="url(#technicalBackdrop)" />
            <rect x="155" y="540" width="610" height="14" className="floor-slab basement" />
            <g transform="translate(560 558)">
              <rect width="74" height="34" rx="4" className="plant-unit" />
              <circle cx="18" cy="17" r="9" className="plant-gauge" />
              <path d="M37 12h26M37 20h19" className="plant-screen" />
            </g>
            <g transform="translate(650 559)">
              <rect width="82" height="32" rx="16" className="tank" />
              <path d="M12 16h58" className="tank-level" />
            </g>
            <text x="178" y="582" className="technical-label">LOCAL TECHNIQUE · TRAITEMENT</text>
          </g>

          <g className="zone-callouts">
            <text x="824" y="118">TOITURE</text>
            <text x="824" y="270">LOGEMENTS</text>
            <text x="824" y="420">GAINES TECHNIQUES</text>
            <text x="824" y="575">CHAUFFERIE</text>
            <path d="M812 114h-27M812 266h-27M812 416h-27M812 571h-45" />
          </g>

          <g className="cold-network">
            <path d="M93 583H352V132" className="network-pipe cold main-riser" />
            <path d="M352 191H418M352 291H418M352 391H418M352 491H418" className="network-pipe cold branches" />
            <path d="M418 191H565M418 291H565M418 391H565M418 491H565" className="network-pipe cold micro" />
            <circle cx="99" cy="583" r="10" className="inlet-node" />
          </g>
          <g className="hot-network">
            <path d="M528 572V132" className="network-pipe hot main-riser" />
            <path d="M528 208H603M528 308H603M528 408H603M528 508H603" className="network-pipe hot branches" />
            <path d="M603 208H695M603 308H695M603 408H695M603 508H695" className="network-pipe hot micro" />
          </g>

          <g className="flow-particles cold-flow">
            <circle r="5"><animateMotion dur="3.6s" repeatCount="indefinite" path="M100 583H352V145" /></circle>
            <circle r="4"><animateMotion dur="3.6s" begin="-1.8s" repeatCount="indefinite" path="M100 583H352V145" /></circle>
          </g>
          <g className="flow-particles hot-flow">
            <circle r="4"><animateMotion dur="4s" repeatCount="indefinite" path="M528 570V145" /></circle>
            <circle r="3"><animateMotion dur="4s" begin="-2s" repeatCount="indefinite" path="M528 570V145" /></circle>
          </g>

          <g className="sensor-cluster" transform="translate(446 560)">
            <circle r="18" className="sensor-ring" />
            <circle r="6" className="sensor-core" />
            <path d="M-27 0h9M18 0h9M0-27v9M0 18v9" />
          </g>
        </motion.g>

        <g className="building-legend" transform="translate(130 628)">
          <circle cx="0" cy="0" r="4" className="legend-cold"/><text x="12" y="4">CHAUFFAGE</text>
          <circle cx="102" cy="0" r="4" className="legend-hot"/><text x="114" y="4">BOUCLAGE ECS</text>
          <circle cx="226" cy="0" r="4" className="legend-sensor"/><text x="238" y="4">POINT DE MESURE</text>
        </g>
        </g>

        {!ambient && risks.map((risk) => {
          const active = activeRisk === risk.id;
          const dimmed = Boolean(activeRisk && !active);
          const discovered = revealed.has(risk.id);
          const label = discovered ? risk.title : `INDICE ${risk.index}`;
          return (
            <g
              key={risk.id}
              className={`hotspot ${active ? "active" : ""} ${dimmed ? "dimmed" : ""} ${revealed.has(risk.id) ? "revealed" : ""}`}
              transform={`translate(${risk.x * 10} ${risk.y * 6.6})`}
              onClick={() => onSelect?.(risk)}
              role="button"
              tabIndex={0}
              aria-label={discovered ? `Explorer le risque : ${risk.title}` : `Observer l’indice ${risk.index}, ${risk.zone}`}
              onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onSelect?.(risk); }}
            >
              <circle r="44" className="hotspot-hit" />
              <circle r="29" className="hotspot-pulse" />
              <circle r="16" className="hotspot-core" />
              <text x="0" y="5" textAnchor="middle">{discovered ? "✓" : active ? "·" : "+"}</text>
              <g className="hotspot-label" transform="translate(38 -19)">
                <rect width={label.length * 8.4 + 42} height="38" rx="5" />
                <text x="20" y="24">{label}</text>
              </g>
            </g>
          );
        })}

        {ambient && <g className="ambient-orbits"><circle cx="310" cy="290" r="8"/><circle cx="686" cy="215" r="7"/><circle cx="700" cy="480" r="9"/></g>}
      </svg>
    </div>
  );
}
