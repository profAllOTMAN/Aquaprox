export type BoilerRoomScenario = {
  id: string;
  index: string;
  shortLabel: string;
  signalLabel: string;
  x: number;
  y: number;
  question: string;
  prompt: string;
  answers: string[];
  correctAnswer: string;
  retryMessage: string;
  diagnosis: string;
  description: string;
  consequences: string[];
  equipment: string;
  solution: string;
  equipmentImage: string;
  detailImage?: string;
  imagePosition?: string;
};

export const boilerRoomScenarios: BoilerRoomScenario[] = [
  {
    id: "corrosion-boues",
    index: "01",
    shortLabel: "Boues & corrosion",
    signalLabel: "Dépôts ferreux",
    x: 51,
    y: 48,
    question: "Que révèle ce dépôt ?",
    prompt: "Identifiez la matière captée sur les barreaux du filtre.",
    answers: ["Calcaire", "Particules ferreuses", "Sable", "Condensation"],
    correctAnswer: "Particules ferreuses",
    retryMessage: "Observez la couleur et la texture du dépôt.",
    diagnosis: "Corrosion et embouage",
    description: "Les particules ferreuses témoignent d’une corrosion du réseau et peuvent dégrader les performances hydrauliques.",
    consequences: ["Circulation ralentie", "Rendement dégradé", "Usure des équipements"],
    equipment: "Filtre à barreaux magnétiques inox",
    solution: "Il capte les particules ferreuses et contribue à préserver le bon fonctionnement de l’installation.",
    equipmentImage: "/assets/tradeshow/equipment/magnetic-filter.jpg",
    detailImage: "/assets/tradeshow/equipment/magnetic-bars.jpg",
    imagePosition: "center",
  },
  {
    id: "air-degazage",
    index: "02",
    shortLabel: "Air & pression",
    signalLabel: "Pression anormale",
    x: 46.2,
    y: 38.5,
    question: "Que remarquez-vous ?",
    prompt: "Observez le manomètre et identifiez le signe visible.",
    answers: ["Pression normale", "Pression trop basse", "Température élevée", "Présence de tartre"],
    correctAnswer: "Pression trop basse",
    retryMessage: "Regardez de nouveau le manomètre.",
    diagnosis: "Présence d’air dans le réseau",
    description: "Un défaut de pression peut signaler la présence d’air et perturber durablement la circulation du réseau.",
    consequences: ["Circulation perturbée", "Débits anormaux", "Corrosion favorisée par l’oxygène"],
    equipment: "Centrale de dégazage",
    solution: "Elle extrait l’air du réseau afin de stabiliser la circulation et de limiter les phénomènes de corrosion.",
    equipmentImage: "/assets/tradeshow/equipment/degassing-unit.jpg",
    imagePosition: "center 58%",
  },
  {
    id: "entartrage",
    index: "03",
    shortLabel: "Tartre",
    signalLabel: "Dépôt calcaire",
    x: 78,
    y: 57,
    question: "Quel désordre observez-vous ?",
    prompt: "Examinez l’intérieur de la canalisation.",
    answers: ["Corrosion", "Dépôt calcaire", "Présence d’air", "Pression excessive"],
    correctAnswer: "Dépôt calcaire",
    retryMessage: "Observez la matière claire qui réduit le passage de l’eau.",
    diagnosis: "Entartrage de l’installation",
    description: "L’accumulation de calcaire réduit la section utile des canalisations et pénalise les échanges thermiques.",
    consequences: ["Débit réduit", "Consommation accrue", "Équipements fragilisés"],
    equipment: "Adoucisseur",
    solution: "Il traite l’eau en amont pour limiter les dépôts et protéger durablement les installations de production.",
    equipmentImage: "/assets/tradeshow/equipment/water-softener.jpg",
    detailImage: "/assets/tradeshow/equipment/scale-deposit.jpg",
    imagePosition: "center",
  },
  {
    id: "conditionnement",
    index: "04",
    shortLabel: "Qualité d’eau",
    signalLabel: "Traitement absent",
    x: 66,
    y: 31,
    question: "Que manque-t-il au traitement ?",
    prompt: "Identifiez l’action nécessaire pour protéger la qualité de l’eau.",
    answers: ["Une ventilation", "Un poste de dosage", "Un vase d’expansion", "Un compteur"],
    correctAnswer: "Un poste de dosage",
    retryMessage: "Cherchez l’équipement qui injecte précisément le produit de traitement.",
    diagnosis: "Conditionnement insuffisant",
    description: "Sans dosage adapté, la qualité d’eau peut évoluer et réduire la protection globale des installations.",
    consequences: ["Protection incomplète", "Qualité d’eau instable", "Performance non maîtrisée"],
    equipment: "Poste de dosage",
    solution: "Il ajuste le traitement de l’eau pour soutenir la protection et la performance de l’installation.",
    equipmentImage: "/assets/tradeshow/equipment/dosing-station.jpg",
    imagePosition: "center 35%",
  },
];
