import { BOILER_ROOM_REGIONS, BOILER_ROOM_SCENE } from "./boilerRoomScene";

export type BoilerRoomScenario = {
  id: string;
  index: string;
  shortLabel: string;
  signalLabel: string;
  x: number;
  y: number;
  solutionX: number;
  solutionY: number;
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
  correctionSteps: {
    phase: "curative" | "preventive";
    title: string;
    description: string;
    image: string;
    actionLabel: string;
  }[];
  solution: string;
  equipmentImage: string;
  beforeSceneImage?: string;
  afterSceneImage: string;
  motionVideo: string;
  detailImage?: string;
  diagnosticImage?: string;
  imagePosition?: string;
  diagnosticMethod?: string;
  protectedEquipmentImage?: string;
  protectedEquipmentTitle?: string;
  protectedEquipmentDescription?: string;
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
    x: BOILER_ROOM_REGIONS["corrosion-boues"].x,
    y: BOILER_ROOM_REGIONS["corrosion-boues"].y,
    solutionX: 76,
    solutionY: 63,
    question: "Que révèle ce dépôt ?",
    prompt: "Le pot à boues est ouvert. Observez la couleur et la texture de la matière retenue sur les barreaux.",
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
    correctionSteps: [
      { phase: "curative", title: "Retirer les boues présentes", description: "Le désembouage évacue les dépôts déjà accumulés pour rétablir la circulation et préparer le réseau.", image: "/assets/tradeshow/equipment/magnetic-bars.jpg", actionLabel: "Lancer le désembouage" },
      { phase: "preventive", title: "Bloquer leur retour", description: "Le filtre magnétique capte les particules ferreuses. Le traitement filmogène protège ensuite durablement les métaux.", image: "/assets/tradeshow/equipment/technical/magnetic-filter.png", actionLabel: "Installer la protection" },
    ],
    solution: "Après le désembouage, le filtre retient les particules ferreuses. Le traitement filmogène complète la protection pour limiter le retour de la corrosion.",
    equipmentImage: "/assets/tradeshow/equipment/technical/magnetic-filter.png",
    beforeSceneImage: BOILER_ROOM_SCENE.before,
    afterSceneImage: BOILER_ROOM_SCENE.after,
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
    shortLabel: "Pression réseau",
    signalLabel: "Pression anormale",
    x: BOILER_ROOM_REGIONS["air-degazage"].x,
    y: BOILER_ROOM_REGIONS["air-degazage"].y,
    solutionX: 77,
    solutionY: 63,
    question: "À quoi correspondent les taches, gouttelettes et coulures ?",
    prompt: "Observez les traces et les gouttelettes autour du purgeur, en partie haute du ballon de chauffage.",
    answers: ["Présence de tartre", "Température élevée", "Problème de pression"],
    correctAnswer: "Problème de pression",
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
    correctionSteps: [
      { phase: "curative", title: "Supprimer la perte", description: "Le purgeur et les points de fuite sont contrôlés, puis la pression correcte du réseau est rétablie.", image: BOILER_ROOM_SCENE.before, actionLabel: "Rétablir la pression" },
      { phase: "preventive", title: "Stabiliser le réseau", description: "Le groupe de maintien de pression absorbe les variations de volume et évite les appoints d’eau répétés.", image: "/assets/tradeshow/equipment/technical/pressure-maintenance-group.png", actionLabel: "Installer le groupe" },
    ],
    solution: "Le groupe de maintien de pression absorbe les variations de volume et maintient automatiquement le réseau dans sa plage de fonctionnement.",
    equipmentImage: "/assets/tradeshow/equipment/technical/pressure-maintenance-group.png",
    beforeSceneImage: BOILER_ROOM_SCENE.before,
    afterSceneImage: BOILER_ROOM_SCENE.after,
    motionVideo: "",
    detailImage: BOILER_ROOM_SCENE.before,
    imagePosition: "92% 20%",
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
    x: BOILER_ROOM_REGIONS.entartrage.x,
    y: BOILER_ROOM_REGIONS.entartrage.y,
    solutionX: 9,
    solutionY: 62,
    question: "Quel désordre observez-vous ?",
    prompt: "Observez la manchette test démontable et l’intérieur de la canalisation : quel dépôt réduit le passage de l’eau ?",
    answers: ["Corrosion", "Dépôt calcaire", "Présence d’air", "Pression excessive"],
    correctAnswer: "Dépôt calcaire",
    retryMessage: "Bien tenté. Observez la matière claire et dure qui réduit le passage de l’eau.",
    assistedHint: "Ce dépôt minéral est produit par une eau dure : cherchez la réponse liée au calcaire.",
    diagnosis: "Entartrage de l’installation",
    description: "La manchette test démontable rend le dépôt visible. Le tartre réduit le diamètre utile des canalisations et recouvre les surfaces d’échange, ce qui augmente la consommation d’énergie.",
    consequences: ["Échange thermique dégradé", "Consommation accrue", "Équipements fragilisés"],
    equipment: "Adoucisseur d’eau",
    mechanism: "Échange ionique",
    benefit: "Un meilleur échange thermique et une consommation maîtrisée",
    curativeAction: "Détartrage des surfaces et équipements déjà touchés",
    preventiveAction: "Installation ou remplacement de l’adoucisseur",
    correctionSteps: [
      { phase: "curative", title: "Enlever le calcaire existant", description: "Le détartrage nettoie d’abord l’échangeur à plaques et les surfaces déjà recouvertes afin de restaurer le transfert de chaleur.", image: "/assets/tradeshow/equipment/client-reference/manchette-test-entartrage.png", actionLabel: "Détartrer l’installation" },
      { phase: "preventive", title: "Traiter l’eau en amont", description: "L’adoucisseur réduit ensuite la dureté de l’eau avant le préparateur ECS pour limiter la formation de nouveaux dépôts.", image: "/assets/tradeshow/equipment/technical/water-softener-hero.png", actionLabel: "Installer l’adoucisseur" },
    ],
    solution: "Le détartrage restaure l’échange thermique. Installé en amont, l’adoucisseur réduit la dureté de l’eau et limite la formation de nouveaux dépôts dans les canalisations et le préparateur ECS.",
    equipmentImage: "/assets/tradeshow/equipment/technical/water-softener-hero.png",
    beforeSceneImage: BOILER_ROOM_SCENE.before,
    afterSceneImage: BOILER_ROOM_SCENE.after,
    motionVideo: "/assets/tradeshow/motion/water-softener.mp4",
    detailImage: "/assets/tradeshow/equipment/client-reference/manchette-test-entartrage.png",
    imagePosition: "30% center",
    diagnosticMethod: "Une manchette test démontable permet d’observer directement l’entartrage et d’évaluer l’intérêt d’un traitement adapté.",
    protectedEquipmentImage: "/assets/tradeshow/equipment/client-reference/preparateur-ecs-1500l.png",
    protectedEquipmentTitle: "Préparateur ECS · échangeur à plaques + ballon 1 500 L",
    protectedEquipmentDescription: "L’échangeur à plaques transfère la chaleur et le ballon stocke l’eau chaude. Le tartre sur les plaques freine l’échange thermique : l’adoucisseur protège cette production en traitant l’eau en amont.",
    proofLabel: "Valeur pour le site",
    proofValue: "Moins d’énergie perdue",
    processSteps: ["Détartrer", "Adoucir l’eau", "Préserver l’échange"],
    technicalFacts: ["Action curative + préventive", "Échange thermique restauré", "Dépôts limités"],
  },
  {
    id: "conditionnement",
    index: "04",
    shortLabel: "Qualité d’eau",
    signalLabel: "Manchette corrodée",
    x: BOILER_ROOM_REGIONS.conditionnement.x,
    y: BOILER_ROOM_REGIONS.conditionnement.y,
    solutionX: 29,
    solutionY: 62,
    question: "Que révèle la manchette témoin ?",
    prompt: "Observez la corrosion visible dans la manchette placée sur le départ ECS.",
    answers: ["Absence ou insuffisance de traitement d’eau / traitement inadapté", "Un excès de pression", "Un défaut d’isolation"],
    correctAnswer: "Absence ou insuffisance de traitement d’eau / traitement inadapté",
    retryMessage: "Regardez la rouille et les piqûres : c’est la surface métallique de la manchette qui est attaquée.",
    assistedHint: "Cherchez la réponse liée à l’absence d’un film protecteur sur les surfaces métalliques.",
    diagnosis: "Protection chimique insuffisante",
    description: "La manchette témoin montre que les surfaces métalliques restent exposées lorsque le traitement d’eau est absent, insuffisant ou inadapté.",
    consequences: ["Corrosion visible", "Boues métalliques", "Durée de vie réduite"],
    equipment: "Traitement filmogène et poste de dosage",
    mechanism: "Film protecteur sur les métaux",
    benefit: "Des surfaces protégées et une corrosion suivie dans le temps",
    curativeAction: "Contrôle des coupons et correction de la qualité d’eau",
    preventiveAction: "Traitement filmogène suivi, injecté par le poste de dosage",
    correctionSteps: [
      { phase: "preventive", title: "Former un film protecteur", description: "Le traitement filmogène forme une barrière protectrice sur les surfaces internes. Le poste de dosage assure une injection adaptée et suivie.", image: "/assets/tradeshow/equipment/technical/film-dosing-station-v2.png", actionLabel: "Activer le traitement filmogène" },
    ],
    solution: "Le traitement filmogène protège les parois internes. Le poste de dosage assure une injection adaptée ; le contrôle des manchettes et de l’eau permet de suivre l’efficacité de la protection.",
    equipmentImage: "/assets/tradeshow/equipment/technical/film-dosing-station-v2.png",
    beforeSceneImage: BOILER_ROOM_SCENE.before,
    afterSceneImage: BOILER_ROOM_SCENE.after,
    motionVideo: "",
    detailImage: "/assets/tradeshow/equipment/technical/corrosion-witness-v2.png",
    imagePosition: "center 35%",
    proofLabel: "Bénéfice réseau",
    proofValue: "Protection multi-métaux suivie",
    processSteps: ["Observer les coupons", "Corriger le traitement", "Maintenir le film"],
    technicalFacts: ["Coupons de contrôle", "Film protecteur", "Dosage suivi"],
  },
];
