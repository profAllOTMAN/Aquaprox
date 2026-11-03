import type { ScenarioStepMedia } from "./boilerRoomScenarios";
import { LOGEMENT_SCENE } from "./otherZoneScenes";

// Client backlog, Logement rows 8–11. Keep observation, curative service and preventive equipment distinct.
export const LOGEMENT_MEDIA = {
  "radiateur-emboue": {
    curative: {
      kind: "equipment",
      image: "/assets/tradeshow/zones/radiator-thermal-before-v3.png",
      label: "Désembouage du radiateur",
      location: "Logement · nettoyage du réseau de chauffage",
      productVideo: "/assets/tradeshow/motion/logement-higgsfield/radiator-flushing-5s.mp4",
      motionVideo: "/assets/tradeshow/motion/logement-higgsfield/radiator-flushing-5s.mp4",
      motionPoster: "/assets/tradeshow/motion/explainers/radiator.jpg",
    },
    preventive: {
      kind: "equipment",
      image: "/assets/tradeshow/equipment/technical/magnetic-filter-loop-poster.jpg",
      label: "Filtre magnétique de protection",
      location: "Chaufferie commune · filtration après désembouage",
      productVideo: "/assets/tradeshow/motion/magnetic-filter.mp4",
      motionVideo: "/assets/tradeshow/motion/explainers/filter.mp4",
      motionPoster: "/assets/tradeshow/motion/explainers/filter.jpg",
    },
  },
  "douche-entartrage": {
    curative: {
      kind: "equipment",
      image: LOGEMENT_SCENE.before,
      label: "Détartrage des dépôts existants",
      location: "Salle de bain · paroi de douche",
      productVideo: "/assets/tradeshow/motion/logement-higgsfield/shower-descaling-5s.mp4",
      motionVideo: "/assets/tradeshow/motion/logement-higgsfield/shower-descaling-5s.mp4",
      motionPoster: "/assets/tradeshow/motion/explainers/descaling.jpg",
    },
    preventive: {
      kind: "equipment",
      image: "/assets/tradeshow/equipment/technical/water-softener-simplex-loop-poster.jpg",
      label: "Adoucisseur d’eau simplex",
      location: "Local technique commun · adoucissement en amont",
      productVideo: "/assets/tradeshow/motion/water-softener-product-loop-v2.mp4",
      motionVideo: "/assets/tradeshow/motion/explainers/softener.mp4",
      motionPoster: "/assets/tradeshow/motion/explainers/softener.jpg",
    },
  },
  "lavabo-legionelle": {
    curative: {
      kind: "equipment",
      image: "/assets/tradeshow/equipment/technical/probio-physical-v2.png",
      productVideo: "/assets/tradeshow/motion/logement-higgsfield/probio-equipment-5s.mp4",
      label: "Kit PROBIO · désinfection curative",
      location: "Local ECS commun · kit de chloration du client",
      motionVideo: "/assets/tradeshow/motion/explainers/probio.mp4",
      motionPoster: "/assets/tradeshow/motion/explainers/probio.jpg",
    },
    preventive: {
      kind: "equipment",
      image: "/assets/tradeshow/equipment/client-reference/preparateur-ecs-1500l.png",
      label: "Production ECS · échangeur et ballon",
      location: "Local technique commun · production et distribution ECS",
      motionVideo: "/assets/tradeshow/motion/explainers/ecs-recovery.mp4",
      motionPoster: "/assets/tradeshow/motion/explainers/ecs-recovery.jpg",
    },
  },
} satisfies Record<string, { curative: ScenarioStepMedia; preventive: ScenarioStepMedia }>;
