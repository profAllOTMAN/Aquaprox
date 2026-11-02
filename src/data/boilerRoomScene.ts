// Shared scene coordinates keep the video stop, camera and touchpoints aligned.
export const BOILER_ROOM_SCENE = {
  before: "/assets/tradeshow/scenes-v3/chaufferie-reference-before-v4.png",
  after: "/assets/tradeshow/scenes-v3/chaufferie-reference-after-v4.png",
  // Stop before the source video's dissolve into a different boiler room.
  videoStopTime: 3.2,
  width: 1672,
  height: 941,
} as const;

export const BOILER_ROOM_REGIONS: Record<string, {
  x: number; y: number; zoom: number; patches: string[];
}> = {
  "corrosion-boues": { x: 72.7, y: 56.5, zoom: 2.3, patches: ["inset(49% 21% 30% 69%)"] },
  "air-degazage": { x: 88.9, y: 28.5, zoom: 2.3, patches: ["inset(43% 29% 32% 61.5%)", "inset(21% 5% 59% 83%)"] },
  entartrage: { x: 47.7, y: 44.3, zoom: 2.5, patches: ["inset(42% 84% 32% 2%)", "inset(41% 49% 52% 46%)"] },
  conditionnement: { x: 37.9, y: 44.3, zoom: 2.5, patches: ["inset(46% 63% 32% 28%)", "inset(41% 60% 52% 36%)"] },
};
