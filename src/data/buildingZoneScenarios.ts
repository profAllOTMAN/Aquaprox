import type { BoilerRoomScenario } from "./boilerRoomScenarios";

export type BuildingZoneId = "logements" | "gaines" | "toiture";

export type BuildingZoneScenario = BoilerRoomScenario & {
  zoneId: BuildingZoneId;
  zoneLabel: string;
  roomTitle: string;
  instruction: string;
  beforeSceneImage: string;
};

export const buildingZoneScenarios: BuildingZoneScenario[] = [
  {
    zoneId: "logements", zoneLabel: "Logement", roomTitle: "Confort dans le logement", instruction: "Observez la répartition de chaleur sur le radiateur.",
    id: "radiateur-emboue", index: "01", shortLabel: "Radiateur emboué", signalLabel: "Zone froide en partie basse", x: 61, y: 48, solutionX: 61, solutionY: 48,
    question: "Que révèle cette zone froide ?", prompt: "La partie supérieure chauffe, mais le bas du radiateur reste froid. Identifiez la cause la plus probable.",
    answers: ["Embouage du radiateur", "Fenêtre ouverte", "Excès de pression", "Eau trop dure"], correctAnswer: "Embouage du radiateur",
    retryMessage: "Bien essayé. Une zone froide persistante en partie basse indique que l’eau circule mal dans le radiateur.", assistedHint: "Les dépôts lourds s’accumulent en bas : cherchez la réponse liée aux boues du réseau.",
    diagnosis: "Circulation dégradée par les boues", description: "Les boues s’accumulent dans la partie basse du radiateur. La surface d’émission diminue et le logement chauffe moins bien.",
    consequences: ["Confort réduit", "Consommation accrue", "Réseau déséquilibré"], equipment: "Désembouage du réseau de chauffage", mechanism: "Restauration de la circulation", benefit: "Une chaleur homogène et un meilleur confort",
    curativeAction: "Désembouer le réseau et le radiateur", preventiveAction: "Filtrer les particules ferreuses et suivre la qualité d’eau",
    solution: "Le désembouage retire les dépôts existants. La filtration magnétique en chaufferie limite ensuite leur retour dans les radiateurs.",
    equipmentImage: "/assets/tradeshow/equipment/technical/magnetic-filter.png", beforeSceneImage: "/assets/tradeshow/zones/logement-before.png",
    afterSceneImage: "/assets/tradeshow/zones/logement-after.png", motionVideo: "", detailImage: "/assets/tradeshow/zones/logement-before.png", imagePosition: "center",
    proofLabel: "Signe visible", proofValue: "Bas du radiateur froid", processSteps: ["Observer", "Désembouer", "Protéger"], technicalFacts: ["Confort restauré", "Débit amélioré", "Filtration en chaufferie"],
    correctionSteps: [
      { phase: "curative", title: "Évacuer les boues accumulées", description: "Le désembouage décroche et évacue les dépôts qui bloquent la partie basse du radiateur.", image: "/assets/tradeshow/zones/logement-before.png", actionLabel: "Lancer le désembouage" },
      { phase: "preventive", title: "Protéger durablement le réseau", description: "La filtration magnétique installée en chaufferie capte ensuite les particules ferreuses avant qu’elles ne reviennent dans le logement.", image: "/assets/tradeshow/zones/logement-after.png", actionLabel: "Vérifier la chaleur homogène" },
    ],
  },
  {
    zoneId: "gaines", zoneLabel: "Gaines techniques", roomTitle: "Distribution verticale", instruction: "Comparez les débits des colonnes de chauffage.",
    id: "desequilibre-colonnes", index: "01", shortLabel: "Débits déséquilibrés", signalLabel: "Débit différent entre colonnes", x: 50, y: 71, solutionX: 50, solutionY: 71,
    question: "Quelle anomalie observez-vous ?", prompt: "Une branche reçoit nettement moins de débit que les colonnes voisines.",
    answers: ["Défaut d’équilibrage", "Entartrage du ballon", "Fuite en toiture", "Surchauffe générale"], correctAnswer: "Défaut d’équilibrage",
    retryMessage: "Regardez les indicateurs de débit et la position des vannes : les branches ne distribuent pas la même quantité d’eau.", assistedHint: "Cherchez la réponse qui concerne la répartition hydraulique entre plusieurs colonnes.",
    diagnosis: "Déséquilibre hydraulique", description: "Une vanne mal réglée répartit inégalement le débit entre les colonnes. Certains logements sont suralimentés tandis que d’autres restent insuffisamment chauffés.",
    consequences: ["Écarts de température", "Inconfort entre logements", "Pompage inutile"], equipment: "Vannes d’équilibrage hydrauliques", mechanism: "Répartition contrôlée des débits", benefit: "Le bon débit au bon endroit",
    curativeAction: "Mesurer et régler chaque branche", preventiveAction: "Conserver des points de mesure accessibles et contrôlables",
    solution: "Le réglage des vannes aligne les débits des colonnes. La distribution devient homogène du pied de colonne jusqu’aux logements.",
    equipmentImage: "/assets/tradeshow/zones/gaines-after.png", beforeSceneImage: "/assets/tradeshow/zones/gaines-before.png",
    afterSceneImage: "/assets/tradeshow/zones/gaines-after.png", motionVideo: "", detailImage: "/assets/tradeshow/zones/gaines-before.png", imagePosition: "center 70%",
    proofLabel: "Contrôle", proofValue: "Débits comparés par colonne", processSteps: ["Mesurer", "Régler", "Vérifier"], technicalFacts: ["Vannes accessibles", "Débits homogènes", "Confort réparti"],
    correctionSteps: [
      { phase: "curative", title: "Mesurer chaque colonne", description: "Les indicateurs permettent de comparer les débits et d’identifier immédiatement la branche insuffisamment alimentée.", image: "/assets/tradeshow/zones/gaines-before.png", actionLabel: "Comparer les débits" },
      { phase: "preventive", title: "Régler et sécuriser l’équilibrage", description: "Le réglage des vannes distribue le débit utile de façon homogène et conserve des points de contrôle accessibles.", image: "/assets/tradeshow/zones/gaines-after.png", actionLabel: "Valider l’équilibrage" },
    ],
  },
  {
    zoneId: "toiture", zoneLabel: "Toiture", roomTitle: "Production en toiture", instruction: "Contrôlez la circulation de la boucle solaire.",
    id: "circulation-solaire", index: "01", shortLabel: "Circulation insuffisante", signalLabel: "Bulles d’air et débit faible", x: 65, y: 57, solutionX: 65, solutionY: 57,
    question: "Que signale ce voyant de débit ?", prompt: "Le débit est presque nul et des bulles sont visibles dans la section de contrôle.",
    answers: ["Circulation perturbée", "Production normale", "Excès de calcaire", "Surpression sanitaire"], correctAnswer: "Circulation perturbée",
    retryMessage: "Observez la section transparente : la présence d’air et le débit presque nul empêchent le transport correct de la chaleur.", assistedHint: "Cherchez la réponse liée au mouvement du fluide dans la boucle solaire.",
    diagnosis: "Défaut de circulation sur la boucle solaire", description: "L’air et le débit insuffisant réduisent le transfert d’énergie entre les capteurs solaires et l’installation du bâtiment.",
    consequences: ["Production solaire réduite", "Pompe sollicitée", "Énergie renouvelable perdue"], equipment: "Boucle solaire et groupe de circulation", mechanism: "Purge et débit stabilisé", benefit: "Une production renouvelable réellement disponible",
    curativeAction: "Purger la boucle et rétablir le débit", preventiveAction: "Contrôler le fluide, les purgeurs et les indicateurs de circulation",
    solution: "Après purge et réglage du groupe de circulation, le fluide transporte de nouveau correctement la chaleur produite par les capteurs.",
    equipmentImage: "/assets/tradeshow/zones/toiture-after.png", beforeSceneImage: "/assets/tradeshow/zones/toiture-before.png",
    afterSceneImage: "/assets/tradeshow/zones/toiture-after.png", motionVideo: "", detailImage: "/assets/tradeshow/zones/toiture-before.png", imagePosition: "center",
    proofLabel: "Contrôle", proofValue: "Débit stable · absence d’air", processSteps: ["Observer", "Purger", "Stabiliser"], technicalFacts: ["Capteurs thermiques", "Groupe de circulation", "Débit contrôlé"],
    correctionSteps: [
      { phase: "curative", title: "Purger la boucle solaire", description: "L’air piégé est évacué afin de rétablir la circulation du fluide entre les capteurs et le bâtiment.", image: "/assets/tradeshow/zones/toiture-before.png", actionLabel: "Purger la boucle" },
      { phase: "preventive", title: "Stabiliser le groupe de circulation", description: "Le débit et les organes de purge sont contrôlés pour maintenir le transfert d’énergie solaire dans le temps.", image: "/assets/tradeshow/zones/toiture-after.png", actionLabel: "Confirmer le débit" },
    ],
  },
];
