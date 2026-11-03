// Two-boiler room requested by the client; retain the current diagnostic journey.
export const BOILER_ROOM_SCENE = {
  before: "/assets/tradeshow/scenes-v3/pression-anormale-before.png",
  after: "/assets/tradeshow/scenes-v3/chaufferie-organized-before.png",
  // Stop before the source video's dissolve into a different boiler room.
  videoStopTime: 3.2,
  width: 1672,
  height: 941,
} as const;

export const BOILER_ROOM_REGIONS: Record<string, {
  x: number; y: number; zoom: number; patches: string[];
}> = {
  "corrosion-boues": { x: 78.2, y: 63.5, zoom: 2.3, patches: ["inset(54% 12.5% 24% 71.5%)"] },
  "air-degazage": { x: 90.5, y: 35.2, zoom: 2.3, patches: ["polygon(61.8% 57.2%, 64.9% 57.2%, 64.9% 55%, 67% 55%, 67% 60.8%, 68.6% 61%, 69.3% 63%, 69.3% 76%, 61.8% 76%)", "inset(21% 6% 51% 86%)"] },
  entartrage: { x: 20, y: 65, zoom: 2.5, patches: ["inset(43% 87.5% 21% 1%)"] },
  conditionnement: { x: 33.1, y: 55.2, zoom: 2.5, patches: ["inset(38% 64.5% 24% 25.5%)"] },
};
