export const LOGEMENT_SCENE = {
  before: "/assets/tradeshow/zones/logement-diagnostic-before-v2.png",
  after: "/assets/tradeshow/zones/logement-diagnostic-after-v2.png",
  width: 1672, height: 941,
} as const;
export const LOGEMENT_REGIONS = {
  "radiateur-emboue": { x: 30.5, y: 56.5, zoom: 2.2, patches: ["inset(40% 61% 20% 24%)"] },
  "douche-entartrage": { x: 66, y: 57, zoom: 1.9, patches: ["inset(0% 23% 17% 49%)"] },
  "lavabo-legionelle": { x: 92.5, y: 44.5, zoom: 2.1, patches: ["inset(35% 0% 23% 77%)"] },
};
export const GAINES_SCENE = {
  before: "/assets/tradeshow/zones/gaines-before-v2.png",
  after: "/assets/tradeshow/zones/gaines-after-v2.png",
  width: 1672, height: 941,
} as const;
export const GAINES_REGIONS = {
  "desequilibre-colonnes": { x: 47.5, y: 79.5, zoom: 2, patches: ["inset(63% 35% 9% 38%)"] },
};
