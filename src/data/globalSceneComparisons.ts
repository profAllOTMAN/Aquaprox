import { BOILER_ROOM_REGIONS, BOILER_ROOM_SCENE } from "./boilerRoomScene";

export type GlobalSceneComparison = {
  before: string;
  after: string;
  patches: string[];
  location: string;
  note: string;
  focus: { x: number; y: number };
};

// The apartment is the observation location. Treatment equipment belongs in the shared plant room.
export const LOGEMENT_INTERVENTIONS: Record<string, GlobalSceneComparison> = {
  "radiateur-emboue": {
    before: BOILER_ROOM_SCENE.before,
    after: "/assets/tradeshow/scenes-v3/corrosion-boues-after.png",
    patches: BOILER_ROOM_REGIONS["corrosion-boues"].patches,
    location: "Chaufferie commune · protection du chauffage",
    focus: { x: 76.5, y: 63 },
    note: "Le désembouage traite le radiateur. Le filtre est installé sur le retour du réseau en chaufferie.",
  },
  "douche-entartrage": {
    before: BOILER_ROOM_SCENE.before,
    after: "/assets/tradeshow/scenes-v3/entartrage-simplex-after-v4.png",
    patches: BOILER_ROOM_REGIONS.entartrage.patches,
    location: "Local technique commun · adoucissement en amont",
    focus: { x: 8, y: 65 },
    note: "Une bouteille de résine et un bac à sel sont ajoutés. Le grand ballon bleu existant est conservé.",
  },
  "lavabo-legionelle": {
    before: BOILER_ROOM_SCENE.before,
    after: "/assets/tradeshow/scenes-v3/chaufferie-probio-after-v2.png",
    patches: ["inset(38% 64% 20% 20%)"],
    location: "Local ECS commun · désinfection pilotée",
    focus: { x: 29, y: 60 },
    note: "Un kit PROBIO : un coffret, deux pompes d’injection, une chambre d’analyse et un bac produit.",
  },
};
