export const LOGEMENT_SCENE = {
  transitionVideo: "/assets/tradeshow/motion/building-to-logement-matched-3s.mp4",
  before: "/assets/tradeshow/zones/logement-diagnostic-before-v2.png",
  after: "/assets/tradeshow/zones/logement-diagnostic-after-v2.png",
  width: 1672, height: 941,
} as const;
export const LOGEMENT_REGIONS = {
  "radiateur-emboue": { x: 30.5, y: 56.5, marker: { x: 35.5, y: 45.5 }, zoom: 2.2, patches: ["inset(40% 61% 20% 24%)"] },
  "douche-entartrage": { x: 66, y: 57, marker: { x: 70.5, y: 46 }, zoom: 1.9, patches: ["inset(0% 23% 17% 49%)"] },
  "lavabo-legionelle": { x: 91.8, y: 45.5, marker: { x: 87, y: 36.5 }, zoom: 2.1, patches: ["inset(35% 0% 23% 77%)"] },
};
export const GAINES_SCENE = {
  transitionVideo: "/assets/tradeshow/motion/building-to-gaines-matched-3s.mp4",
  before: "/assets/tradeshow/zones/gaines-before-v3.png",
  after: "/assets/tradeshow/zones/gaines-after-v3.png",
  width: 1672, height: 941,
} as const;
export const GAINES_REGIONS = {
  "desequilibre-colonnes": { x: 27, y: 53.3, zoom: 1.8, patches: ["inset(0% 0% 0% 0%)"] },
};
