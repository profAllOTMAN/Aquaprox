import { GAINES_APARTMENTS } from "@/data/gainesEquipment";

export function GainesReadings({ corrected, only }: { corrected: boolean; only?: string }) {
  return <g className="gaines-readings" data-readings={corrected ? "balanced" : "unbalanced"}>
    {GAINES_APARTMENTS.filter((item) => !only || item.id === only).map((item) => <g key={item.id} data-apartment={item.id}>
      <text x={item.meter.x} y={item.meter.y + 1} textAnchor="middle" fill={item.beforeFlow === 10 && !corrected ? "#ffdf9c" : "#dcf8ff"} fontSize="13" fontWeight="700" fontFamily="Arial">{corrected ? item.afterFlow : item.beforeFlow}</text>
      <text x={item.meter.x} y={item.meter.y + 11} textAnchor="middle" fill="#c2e1ed" fontSize="7" fontFamily="Arial">L/h</text>
      <rect x={item.meter.x - 47} y={item.meter.y + 39} width="94" height="24" rx="2" fill="#081d30" stroke={item.beforeFlow === 10 && !corrected ? "#e5bc77" : "#8dc5dd"} strokeWidth="1" />
      <text x={item.meter.x} y={item.meter.y + 55} textAnchor="middle" fill="#eaf9ff" fontSize="12" fontFamily="Arial">Réglage {corrected ? item.afterSetting : item.beforeSetting}</text>
    </g>)}
  </g>;
}

export function GainesEvidence({ source, corrected = false }: { source: string; corrected?: boolean }) {
  return <div className="gaines-evidence-grid">{GAINES_APARTMENTS.map((item) => <div key={item.id} className={item.beforeFlow === 10 && !corrected ? "is-low-flow" : ""}>
    <strong>{item.label}</strong>
    <svg viewBox={item.frame} role="img" aria-label={`${item.label} : ${corrected ? item.afterFlow : item.beforeFlow} litres par heure, vanne réglée à ${corrected ? item.afterSetting : item.beforeSetting}`}>
      <image href={source} width="1672" height="941" />
      <GainesReadings corrected={corrected} only={item.id} />
    </svg>
    <span>{corrected ? item.afterFlow : item.beforeFlow} L/h</span>
  </div>)}</div>;
}
