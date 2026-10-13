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
  mechanism: string;
  benefit: string;
  solution: string;
  equipmentImage: string;
  motionVideo: string;
  detailImage?: string;
  imagePosition?: string;
  proofLabel: string;
  proofValue: string;
  processSteps: string[];
  technicalFacts: string[];
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
    description: "Les oxydes métalliques et les boues freinent la circulation et finissent par pénaliser les émetteurs.",
    consequences: ["Circulation ralentie", "Rendement dégradé", "Usure des équipements"],
    equipment: "Filtre à barreaux magnétiques inox",
    mechanism: "Capture magnétique",
    benefit: "Hydraulique préservée",
    solution: "Installé sur le retour du réseau, il ralentit l’eau, capture les oxydes métalliques par aimantation puis retient les boues dans sa poche filtrante.",
    equipmentImage: "/assets/tradeshow/equipment/technical/magnetic-filter.png",
    motionVideo: "/assets/tradeshow/motion/magnetic-filter.mp4",
    detailImage: "/assets/tradeshow/equipment/magnetic-bars.jpg",
    imagePosition: "center",
    proofLabel: "Plage d’utilisation",
    proofValue: "90 °C · 10 bar max.",
    processSteps: ["L’eau ralentit", "Les oxydes sont aimantés", "Les boues sont filtrées"],
    technicalFacts: ["Montage sur le retour", "Inox 304", "Maintenance accessible"],
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
    description: "L’air libre et les gaz dissous perturbent la circulation, génèrent du bruit et favorisent la corrosion par l’oxygène.",
    consequences: ["Circulation perturbée", "Débits anormaux", "Corrosion favorisée par l’oxygène"],
    equipment: "SpiroVent Superior S250",
    mechanism: "Dégazage sous vide",
    benefit: "Circulation stabilisée",
    solution: "La boucle Venturi abaisse progressivement la pression, libère les gaz dissous puis réinjecte une eau sous-saturée dans le réseau.",
    equipmentImage: "/assets/tradeshow/equipment/technical/degassing-unit.png",
    motionVideo: "/assets/tradeshow/motion/degassing-unit.mp4",
    detailImage: "/assets/tradeshow/equipment/technical/degassing-cutaway.png",
    imagePosition: "center 58%",
    proofLabel: "Fonctionnement discret",
    proofValue: "41 dB(A) · 74 l/h max.",
    processSteps: ["L’eau est prélevée", "Le vide libère les gaz", "L’eau dégazée retourne"],
    technicalFacts: ["Réseaux jusqu’à 5 m³", "15 à 70 °C", "Pompe à vitesse variable"],
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
    description: "Le calcium et le magnésium présents dans l’eau dure peuvent former du tartre, réduire le passage utile et isoler les surfaces d’échange.",
    consequences: ["Débit réduit", "Consommation accrue", "Équipements fragilisés"],
    equipment: "Adoucisseur Premium DN50",
    mechanism: "Échange ionique",
    benefit: "Échanges thermiques préservés",
    solution: "La résine retient les ions responsables de la dureté avant leur entrée dans l’installation, afin d’éviter la formation de nouveaux dépôts.",
    equipmentImage: "/assets/tradeshow/equipment/technical/water-softener.jpg",
    motionVideo: "/assets/tradeshow/motion/water-softener.mp4",
    detailImage: "/assets/tradeshow/equipment/scale-deposit.jpg",
    imagePosition: "center",
    proofLabel: "Débit continu DN50",
    proofValue: "26 m³/h · ΔP 1 bar",
    processSteps: ["L’eau dure entre", "La résine capte Ca/Mg", "L’eau adoucie ressort"],
    technicalFacts: ["Pression 2 à 8 bar", "Température 2 à 40 °C", "Résine agréée alimentaire"],
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
    diagnosis: "Protection chimique insuffisante",
    description: "Sans concentration maîtrisée, le réseau reste exposé à la corrosion, aux boues et aux dépôts qui réduisent l’échange thermique.",
    consequences: ["Protection incomplète", "Qualité d’eau instable", "Performance non maîtrisée"],
    equipment: "Poste de dosage",
    mechanism: "Conditionnement contrôlé",
    benefit: "Protection multimétaux",
    solution: "Il injecte avec précision le traitement prescrit. Avec ECO²Protect L, les dépôts se dispersent progressivement et un film protecteur se maintient sur les surfaces métalliques.",
    equipmentImage: "/assets/tradeshow/equipment/dosing-station.jpg",
    motionVideo: "/assets/tradeshow/motion/dosing-station.mp4",
    detailImage: "/assets/tradeshow/equipment/technical/water-cutaway.png",
    imagePosition: "center 35%",
    proofLabel: "Exemple ECO²Protect L",
    proofValue: "Contrôle en 2 min",
    processSteps: ["Le produit est dosé", "Les dépôts se dispersent", "Le film protège le métal"],
    technicalFacts: ["Dosage précis", "Protection multi-métaux", "Suivi de concentration"],
  },
];
