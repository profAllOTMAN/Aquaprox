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
  assistedHint: string;
  diagnosis: string;
  description: string;
  consequences: string[];
  equipment: string;
  mechanism: string;
  benefit: string;
  curativeAction: string;
  preventiveAction: string;
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
    retryMessage: "Bien essayé. Observez sa couleur sombre et sa texture : ce dépôt vient du métal du réseau.",
    assistedHint: "Pensez à ce qu’un aimant peut retenir : cherchez la réponse liée au fer.",
    diagnosis: "Corrosion et embouage",
    description: "La présence de boues et de particules ferreuses révèle une corrosion active et dégrade progressivement les performances du réseau.",
    consequences: ["Corrosion et embouage", "Rendement dégradé", "Usure prématurée des équipements"],
    equipment: "Filtre à barreaux magnétiques inox",
    mechanism: "Capture magnétique",
    benefit: "Des performances durables et moins d’interventions correctives",
    curativeAction: "Désembouage du réseau pour retirer les dépôts existants",
    preventiveAction: "Filtration magnétique inox et traitement filmogène à base de tanins",
    solution: "Après le désembouage, le filtre retient les particules ferreuses. Le traitement filmogène complète la protection pour limiter le retour de la corrosion.",
    equipmentImage: "/assets/tradeshow/equipment/technical/magnetic-filter.png",
    motionVideo: "/assets/tradeshow/motion/magnetic-filter.mp4",
    detailImage: "/assets/tradeshow/equipment/magnetic-bars.jpg",
    imagePosition: "center",
    proofLabel: "Plage d’utilisation",
    proofValue: "90 °C · 10 bar max.",
    processSteps: ["Désembouer", "Capter les particules", "Protéger durablement"],
    technicalFacts: ["Action curative + préventive", "Captation ferreuse", "Maintenance accessible"],
  },
  {
    id: "air-degazage",
    index: "02",
    shortLabel: "Air & pression",
    signalLabel: "Pression anormale",
    x: 46.2,
    y: 38.5,
    question: "Que remarquez-vous ?",
    prompt: "Observez le purgeur au-dessus du ballon : gouttelettes, légère vapeur et traces au plafond signalent une anomalie.",
    answers: ["Pression normale", "Pression trop basse", "Température élevée", "Présence de tartre"],
    correctAnswer: "Pression trop basse",
    retryMessage: "Bien essayé. Les gouttelettes et les traces autour du purgeur indiquent que l’équilibre du réseau n’est plus assuré.",
    assistedHint: "Cherchez la réponse liée à une pression insuffisante ou instable, pas à la température.",
    diagnosis: "Pression insuffisante ou instable",
    description: "Les pertes au niveau du purgeur et les variations de volume déséquilibrent le réseau de chauffage.",
    consequences: ["Pression instable", "Circulation perturbée", "Risque d’appoints d’eau répétés"],
    equipment: "Groupe de maintien de pression",
    mechanism: "Maintien automatique de la pression",
    benefit: "Une pression stable et un réseau de chauffage fiable",
    curativeAction: "Contrôle du purgeur et remise à niveau de la pression",
    preventiveAction: "Installation d’un groupe de maintien de pression adapté",
    solution: "Le groupe de maintien de pression absorbe les variations de volume et maintient automatiquement le réseau dans sa plage de fonctionnement.",
    equipmentImage: "/assets/tradeshow/chaufferie-network.jpg",
    motionVideo: "",
    detailImage: "/assets/tradeshow/chaufferie-before.jpg",
    imagePosition: "86% 26%",
    proofLabel: "Valeur pour l’exploitant",
    proofValue: "Stabilité et continuité de service",
    processSteps: ["Contrôler la fuite", "Rétablir la pression", "Maintenir automatiquement"],
    technicalFacts: ["Action curative + préventive", "Pression régulée", "Appoints d’eau limités"],
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
    retryMessage: "Bien tenté. Observez la matière claire et dure qui réduit le passage de l’eau.",
    assistedHint: "Ce dépôt minéral est produit par une eau dure : cherchez la réponse liée au calcaire.",
    diagnosis: "Entartrage de l’installation",
    description: "Le tartre recouvre les surfaces d’échange, dégrade le transfert de chaleur et augmente la consommation d’énergie.",
    consequences: ["Échange thermique dégradé", "Consommation accrue", "Équipements fragilisés"],
    equipment: "Adoucisseur d’eau",
    mechanism: "Échange ionique",
    benefit: "Un meilleur échange thermique et une consommation maîtrisée",
    curativeAction: "Détartrage des surfaces et équipements déjà touchés",
    preventiveAction: "Installation ou remplacement de l’adoucisseur",
    solution: "Le détartrage restaure l’échange thermique. L’adoucisseur traite ensuite l’eau en amont pour prévenir la formation de nouveaux dépôts.",
    equipmentImage: "/assets/tradeshow/equipment/technical/water-softener.jpg",
    motionVideo: "/assets/tradeshow/motion/water-softener.mp4",
    detailImage: "/assets/tradeshow/equipment/scale-deposit.jpg",
    imagePosition: "center",
    proofLabel: "Valeur pour le site",
    proofValue: "Moins d’énergie perdue",
    processSteps: ["Détartrer", "Adoucir l’eau", "Préserver l’échange"],
    technicalFacts: ["Action curative + préventive", "Échange thermique restauré", "Dépôts limités"],
  },
  {
    id: "conditionnement",
    index: "04",
    shortLabel: "Qualité d’eau",
    signalLabel: "Coupons corrodés",
    x: 66,
    y: 31,
    question: "Que révèlent ces coupons ?",
    prompt: "Observez les témoins métalliques : leur surface rend visible l’action de la corrosion dans le réseau.",
    answers: ["Une protection chimique insuffisante", "Un excès de pression", "Un défaut d’isolation", "Une ventilation insuffisante"],
    correctAnswer: "Une protection chimique insuffisante",
    retryMessage: "Bonne réflexion. La dégradation est directement visible sur le métal des coupons.",
    assistedHint: "Cherchez la réponse liée à l’absence d’un film protecteur sur les surfaces métalliques.",
    diagnosis: "Protection chimique insuffisante",
    description: "Les coupons montrent que les surfaces métalliques restent exposées lorsque la protection chimique est insuffisante.",
    consequences: ["Corrosion visible", "Boues métalliques", "Durée de vie réduite"],
    equipment: "Traitement filmogène ECO²Protect L",
    mechanism: "Film protecteur sur les métaux",
    benefit: "Des surfaces protégées et une corrosion suivie dans le temps",
    curativeAction: "Contrôle des coupons et correction de la qualité d’eau",
    preventiveAction: "Traitement filmogène suivi, injecté par le poste de dosage",
    solution: "Le traitement filmogène forme une barrière protectrice sur les surfaces internes. Les coupons rendent son efficacité observable ; le poste de dosage reste le moyen d’injection, pas le cœur du message.",
    equipmentImage: "/assets/tradeshow/equipment/dosing-station.jpg",
    motionVideo: "/assets/tradeshow/motion/dosing-station.mp4",
    detailImage: "/assets/tradeshow/equipment/technical/eco-protect-filter.png",
    imagePosition: "center 35%",
    proofLabel: "Bénéfice réseau",
    proofValue: "Protection multi-métaux suivie",
    processSteps: ["Observer les coupons", "Corriger le traitement", "Maintenir le film"],
    technicalFacts: ["Coupons de contrôle", "Film protecteur", "Dosage suivi"],
  },
];
