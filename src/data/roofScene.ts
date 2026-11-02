export const ROOF_SCENE = {
  before: "/assets/tradeshow/zones/toiture-unified-before-v3.png",
  after: "/assets/tradeshow/zones/toiture-operational-after-v4.png",
  transitionVideo: "/assets/tradeshow/motion/building-to-toiture-matched-3s.mp4",
  width: 1672,
  height: 941,
} as const;

export const ROOF_REGIONS = {
  "glycol-caramelise": { x: 61.5, y: 69.5, zoom: 2.1, patches: ["inset(38% 25% 18% 51%)"] },
  "pac-hybridation": { x: 34.3, y: 27.8, zoom: 2.2, patches: ["inset(22% 62% 62% 31%)", "inset(45% 54% 26% 35%)"] },
};
