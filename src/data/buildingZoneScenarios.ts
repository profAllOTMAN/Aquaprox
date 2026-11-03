import type { BoilerRoomScenario } from "./boilerRoomScenarios";
import { ROOF_REGIONS, ROOF_SCENE } from "./roofScene";
import { GAINES_SCENE, GAINES_REGIONS, LOGEMENT_REGIONS, LOGEMENT_SCENE } from "./otherZoneScenes";
import { LOGEMENT_MEDIA } from "./logementMedia";

export type BuildingZoneId = "logements" | "gaines" | "toiture";

export type BuildingZoneScenario = BoilerRoomScenario & {
  zoneId: BuildingZoneId;
  zoneLabel: string;
  roomTitle: string;
  instruction: string;
  beforeSceneImage: string;
};

const LOGEMENT_BEFORE = LOGEMENT_SCENE.before;
const LOGEMENT_AFTER = LOGEMENT_SCENE.after;

export const buildingZoneScenarios: BuildingZoneScenario[] = [
  {
    zoneId: "logements", zoneLabel: "Logement", roomTitle: "Confort et eau chaude sanitaire", instruction: "Inspectez le radiateur, la douche et le lavabo.",
    id: "radiateur-emboue", index: "01", shortLabel: "Radiateur emboué", signalLabel: "Bas du radiateur froid", x: LOGEMENT_REGIONS["radiateur-emboue"].x, y: LOGEMENT_REGIONS["radiateur-emboue"].y, solutionX: 30.5, solutionY: 56.5,
    question: "Que révèle cette zone froide ?", prompt: "L’émetteur est blanc dans la scène. Après sélection, la vue thermique montre que sa partie basse reste froide.",
    answers: ["Embouage du radiateur", "Fenêtre ouverte", "Excès de pression", "Eau trop dure"], correctAnswer: "Embouage du radiateur",
    retryMessage: "Bien essayé. Une zone froide persistante en partie basse indique que l’eau circule mal dans le radiateur.", assistedHint: "Les dépôts lourds s’accumulent en bas : cherchez la réponse liée aux boues du réseau.",
    diagnosis: "Circulation dégradée par les boues", description: "Les boues s’accumulent dans la partie basse du radiateur. La surface d’émission diminue et le logement chauffe moins bien.",
    consequences: ["Confort réduit", "Consommation accrue", "Réseau déséquilibré"], equipment: "Désembouage puis filtration en chaufferie", mechanism: "Restauration de la circulation", benefit: "Une chaleur homogène et un meilleur confort",
    curativeAction: "Désembouer le réseau et le radiateur", preventiveAction: "Filtrer les particules ferreuses et suivre la qualité d’eau",
    solution: "Le désembouage retire les dépôts existants. La filtration magnétique en chaufferie limite ensuite leur retour dans les radiateurs.",
    equipmentImage: LOGEMENT_MEDIA["radiateur-emboue"].preventive.image, beforeSceneImage: LOGEMENT_BEFORE, afterSceneImage: LOGEMENT_AFTER, motionVideo: "/assets/tradeshow/motion/explainers/radiator.mp4", motionPoster: "/assets/tradeshow/motion/explainers/radiator.jpg", productVideo: "/assets/tradeshow/motion/magnetic-filter.mp4", equipmentLocation: "Filtration préventive · chaufferie", equipmentMediaLabel: "Filtre magnétique de protection", detailImage: "/assets/tradeshow/zones/radiator-thermal-before-v3.png", resultImage: "/assets/tradeshow/zones/radiator-thermal-after-v3.png", imagePosition: "center",
    proofLabel: "Signe visible", proofValue: "Bas froid en thermographie", processSteps: ["Observer", "Désembouer", "Protéger"], technicalFacts: ["Confort restauré", "Débit amélioré", "Filtration en chaufferie"],
    correctionSteps: [
      { phase: "curative", title: "Évacuer les boues accumulées", description: "Le désembouage décroche et évacue les dépôts qui bloquent la partie basse du radiateur.", image: LOGEMENT_MEDIA["radiateur-emboue"].curative.image, media: LOGEMENT_MEDIA["radiateur-emboue"].curative, actionLabel: "Lancer le désembouage" },
      { phase: "preventive", title: "Protéger durablement le réseau", description: "La filtration magnétique installée en chaufferie capte ensuite les particules ferreuses avant leur retour dans le logement.", image: LOGEMENT_MEDIA["radiateur-emboue"].preventive.image, media: LOGEMENT_MEDIA["radiateur-emboue"].preventive, actionLabel: "Protéger le réseau et vérifier le radiateur" },
    ],
  },
  {
    zoneId: "logements", zoneLabel: "Logement", roomTitle: "Confort et eau chaude sanitaire", instruction: "Inspectez le radiateur, la douche et le lavabo.",
    id: "douche-entartrage", index: "02", shortLabel: "Douche entartrée", signalLabel: "Dépôts sur la paroi", x: LOGEMENT_REGIONS["douche-entartrage"].x, y: LOGEMENT_REGIONS["douche-entartrage"].y, solutionX: 66, solutionY: 57,
    question: "Que révèle la paroi de douche ?", prompt: "Observez les traces blanches et le dépôt minéral fortement visible sur le verre.",
    answers: ["Dépôt calcaire", "Corrosion", "Présence d’air", "Pression insuffisante"], correctAnswer: "Dépôt calcaire",
    retryMessage: "Regardez la matière blanche et dure déposée par l’eau sur la paroi.", assistedHint: "Une eau dure laisse du calcaire sur les surfaces chaudes et les équipements sanitaires.",
    diagnosis: "Entartrage de l’eau chaude sanitaire", description: "Le dépôt visible sur la douche signale une eau dure. Le même phénomène peut réduire les performances des équipements ECS.",
    consequences: ["Surfaces entartrées", "Entretien plus fréquent", "Équipements ECS exposés"], equipment: "Détartrage puis adoucissement", mechanism: "Retrait du dépôt et réduction de la dureté", benefit: "Des surfaces propres et des équipements protégés",
    curativeAction: "Éliminer les dépôts déjà présents", preventiveAction: "Installer ou régler l’adoucisseur en amont",
    solution: "Le détartrage traite le dépôt existant. L’adoucisseur réduit ensuite la dureté pour limiter sa réapparition dans le logement et le réseau ECS.",
    equipmentImage: LOGEMENT_MEDIA["douche-entartrage"].preventive.image, beforeSceneImage: LOGEMENT_BEFORE, afterSceneImage: LOGEMENT_AFTER, motionVideo: "/assets/tradeshow/motion/explainers/softener.mp4", motionPoster: "/assets/tradeshow/motion/explainers/softener.jpg", productVideo: "/assets/tradeshow/motion/water-softener-product-loop-v2.mp4", equipmentLocation: "Adoucissement en amont · local technique", equipmentMediaLabel: "Adoucisseur d’eau", detailImage: LOGEMENT_BEFORE, imagePosition: "64% 48%",
    proofLabel: "Constat visuel", proofValue: "Dépôt blanc sur le verre", processSteps: ["Constater", "Détartrer", "Adoucir"], technicalFacts: ["Action curative", "Prévention durable", "Protection ECS"],
    correctionSteps: [
      { phase: "curative", title: "Retirer le tartre existant", description: "Le détartrage élimine les dépôts déjà formés sur les surfaces et dans les équipements touchés.", image: LOGEMENT_MEDIA["douche-entartrage"].curative.image, media: LOGEMENT_MEDIA["douche-entartrage"].curative, actionLabel: "Détartrer" },
      { phase: "preventive", title: "Limiter sa réapparition", description: "L’adoucisseur réduit la dureté de l’eau avant sa distribution dans le réseau ECS.", image: LOGEMENT_MEDIA["douche-entartrage"].preventive.image, media: LOGEMENT_MEDIA["douche-entartrage"].preventive, actionLabel: "Activer l’adoucissement" },
    ],
  },
  {
    zoneId: "logements", zoneLabel: "Logement", roomTitle: "Confort et eau chaude sanitaire", instruction: "Inspectez le radiateur, la douche et le lavabo.",
    id: "lavabo-legionelle", index: "03", shortLabel: "ECS trop froide", signalLabel: "Eau froide malgré le réglage chaud", x: LOGEMENT_REGIONS["lavabo-legionelle"].x, y: LOGEMENT_REGIONS["lavabo-legionelle"].y, solutionX: 91.8, solutionY: 45.5,
    question: "Que signifie cette eau froide au réglage maximal ?", prompt: "Le mitigeur est positionné sur le chaud, mais l’eau distribuée reste froide.",
    answers: ["Risque sanitaire lié à une ECS insuffisamment chaude", "Fonctionnement normal", "Excès de pression", "Entartrage du radiateur"], correctAnswer: "Risque sanitaire lié à une ECS insuffisamment chaude",
    retryMessage: "Le réglage est déjà au maximum : le problème vient de la production ou de la distribution ECS.", assistedHint: "Une eau insuffisamment chaude peut favoriser le développement bactérien dans le réseau.",
    diagnosis: "Défaut de production ou de distribution ECS", description: "Une eau qui reste froide malgré la commande chaude révèle un défaut ECS à contrôler. Une température insuffisante peut favoriser un risque bactérien ; elle ne démontre pas une contamination.",
    consequences: ["Risque sanitaire", "Production ECS défaillante", "Réseau à sécuriser"], equipment: "Kit de chloration PROBIO", mechanism: "Désinfection curative pilotée par sonde REDOX", benefit: "Un réseau traité, une production ECS rétablie et un suivi adapté",
    curativeAction: "Mettre en œuvre une désinfection par chloration", preventiveAction: "Rétablir puis suivre une température ECS suffisante",
    solution: "Après confirmation de la contamination dans cette enquête, le kit PROBIO permet une désinfection pilotée par mesure REDOX. La production ou la distribution ECS est ensuite remise en état et contrôlée. La chloration seule ne réchauffe pas l’eau et ne remplace pas le suivi sanitaire.",
    equipmentImage: LOGEMENT_MEDIA["lavabo-legionelle"].curative.image, productVideo: LOGEMENT_MEDIA["lavabo-legionelle"].curative.productVideo, observationVideo: "/assets/tradeshow/motion/logement-higgsfield/sink-cold-observation-5s.mp4", beforeSceneImage: LOGEMENT_BEFORE, afterSceneImage: LOGEMENT_AFTER, motionVideo: "/assets/tradeshow/motion/explainers/probio.mp4", motionPoster: "/assets/tradeshow/motion/explainers/probio.jpg", equipmentLocation: "Kit de chloration · local technique ECS", equipmentMediaLabel: "Kit PROBIO · désinfection pilotée", detailImage: "/assets/tradeshow/zones/sink-observation-before-v3.png", resultImage: "/assets/tradeshow/zones/sink-observation-after-v3.png", diagnosticImage: "/assets/tradeshow/equipment/technical/legionella-cutaway.png", imagePosition: "88% 48%",
    proofLabel: "Constat", proofValue: "Mitigeur chaud · eau froide", processSteps: ["Constater", "Désinfecter", "Sécuriser"], technicalFacts: ["Sonde REDOX", "Pompes d’injection", "Boucle ECS"],
    correctionSteps: [
      { phase: "curative", title: "Désinfecter après contrôle", description: "Le contrôle de cette enquête confirme une contamination. Une intervention de désinfection est réalisée avec le kit PROBIO sous contrôle REDOX, selon le protocole adapté au site.", image: LOGEMENT_MEDIA["lavabo-legionelle"].curative.image, media: LOGEMENT_MEDIA["lavabo-legionelle"].curative, actionLabel: "Lancer la désinfection curative" },
      { phase: "preventive", title: "Rétablir et suivre la production ECS", description: "La cause du défaut de production ou de distribution est corrigée. La température et les contrôles de l’eau sont vérifiés et suivis avant de considérer l’intervention terminée.", image: LOGEMENT_MEDIA["lavabo-legionelle"].preventive.image, media: LOGEMENT_MEDIA["lavabo-legionelle"].preventive, actionLabel: "Rétablir l’ECS et vérifier les contrôles" },
    ],
  },
  {
    zoneId: "gaines", zoneLabel: "Gaines techniques", roomTitle: "Distribution verticale", instruction: "Comparez les débits et les réglages des quatre logements.",
    id: "desequilibre-colonnes", index: "01", shortLabel: "Débits déséquilibrés", signalLabel: "Une branche à 10 L/h", x: GAINES_REGIONS["desequilibre-colonnes"].x, y: GAINES_REGIONS["desequilibre-colonnes"].y, solutionX: 32.5, solutionY: 88.5,
    question: "Quelle anomalie observez-vous ?", prompt: "Un logement reçoit nettement moins de débit que les logements voisins.",
    answers: ["Défaut d’équilibrage", "Entartrage du ballon", "Fuite en toiture", "Surchauffe générale"], correctAnswer: "Défaut d’équilibrage",
    retryMessage: "Comparez les compteurs et les réglages : une branche est à 10 L/h et sa vanne à 0,1.", assistedHint: "Cherchez la réponse liée à la répartition hydraulique entre plusieurs logements.",
    diagnosis: "Déséquilibre hydraulique", description: "Une vanne presque fermée limite le débit d’un logement tandis que les branches voisines reçoivent environ 350 L/h.",
    consequences: ["Écarts de température", "Inconfort entre logements", "Pompage inutile"], equipment: "Prestation d’équilibrage hydraulique", mechanism: "Mesure et réglage de chaque logement et colonne", benefit: "Le bon débit au bon endroit",
    curativeAction: "Mesurer et régler chaque branche", preventiveAction: "Conserver des points de mesure accessibles et contrôlables",
    solution: "La prestation d’équilibrage utilise une mallette de mesure raccordée aux prises des vannes. Chaque logement et chaque colonne sont réglés, puis contrôlés. Les quatre compteurs et les six vannes existants sont conservés ; la mallette est un outil temporaire de la prestation.",
    equipmentImage: "/assets/tradeshow/equipment/technical/balancing-kit.png", beforeSceneImage: GAINES_SCENE.before, afterSceneImage: GAINES_SCENE.after, motionVideo: "", detailImage: GAINES_SCENE.before, imagePosition: "center 72%",
    proofLabel: "Valeurs comparées", proofValue: "352 · 348 · 10 · 362 L/h", processSteps: ["Mesurer", "Réaliser l’équilibrage", "Vérifier"], technicalFacts: ["Deux couples bleu/rouge", "Quatre compteurs individuels", "Mallette de mesure temporaire"],
    correctionSteps: [
      { phase: "curative", title: "Réaliser l’équilibrage", description: "La mallette mesure les écarts. Chaque logement et chaque colonne sont ensuite réglés jusqu’à obtenir les débits calculés.", image: "/assets/tradeshow/equipment/technical/balancing-kit.png", actionLabel: "Réaliser l’équilibrage" },
    ],
  },
  {
    zoneId: "toiture", zoneLabel: "Toiture", roomTitle: "Production en toiture", instruction: "Inspectez la station solaire puis la pompe à chaleur.",
    id: "glycol-caramelise", index: "01", shortLabel: "Glycol dégradé", signalLabel: "Liquide noir à la soupape", x: ROOF_REGIONS["glycol-caramelise"].x, y: ROOF_REGIONS["glycol-caramelise"].y, solutionX: 67, solutionY: 58,
    question: "Que révèle ce liquide noir et visqueux ?", prompt: "La centrale d’échange est en défaut et la soupape déborde dans le bac de récupération.",
    answers: ["Glycol ancien et caramélisé", "Eau de pluie", "Fonctionnement normal", "Excès de chlore"], correctAnswer: "Glycol ancien et caramélisé",
    retryMessage: "Observez la couleur sombre et la viscosité du fluide rejeté par la soupape.", assistedHint: "Le fluide caloporteur solaire se dégrade lorsqu’il vieillit ou surchauffe.",
    diagnosis: "Glycol solaire dégradé", description: "Le fluide ancien et caramélisé circule mal, encrasse la station d’échange et réduit la production solaire thermique.",
    consequences: ["Station en défaut", "Échange thermique réduit", "Production solaire perdue"], equipment: "Remise en état du réseau glycolé", mechanism: "Dégraissage et désembouage du circuit solaire", benefit: "Une station propre et de nouveau opérationnelle",
    curativeAction: "Dégraisser et désembouer le réseau glycolé", preventiveAction: "Renouveler puis contrôler le fluide solaire",
    solution: "Le circuit est dégraissé et désemboué, puis rempli avec un glycol adapté. Après contrôle de la soupape et de la circulation, la station fonctionne : voyant vert, aucun rejet et bac de récupération vide et propre.",
    equipmentImage: ROOF_SCENE.after, beforeSceneImage: ROOF_SCENE.before, afterSceneImage: ROOF_SCENE.after, motionVideo: "", detailImage: ROOF_SCENE.before, imagePosition: "65% 60%",
    proofLabel: "Signal visible", proofValue: "Alarme rouge · glycol noir", processSteps: ["Diagnostiquer", "Nettoyer", "Remettre en service"], technicalFacts: ["Circuit solaire", "Soupape contrôlée", "Station opérationnelle"],
    correctionSteps: [
      { phase: "curative", title: "Nettoyer le réseau glycolé", description: "Le dégraissage et le désembouage retirent le glycol caramélisé avant le remplissage avec un fluide neuf.", image: ROOF_SCENE.before, actionLabel: "Remettre la station en état" },
    ],
  },
  {
    zoneId: "toiture", zoneLabel: "Toiture", roomTitle: "Production en toiture", instruction: "Inspectez la station solaire puis la pompe à chaleur.",
    id: "pac-hybridation", index: "02", shortLabel: "PAC en défaut", signalLabel: "Alarme rouge sur la PAC", x: ROOF_REGIONS["pac-hybridation"].x, y: ROOF_REGIONS["pac-hybridation"].y, solutionX: 29, solutionY: 43,
    question: "Que signale cet écran ?", prompt: "Observez le voyant et le symbole affiché sur la pompe à chaleur.",
    answers: ["La PAC est en défaut", "La PAC fonctionne normalement", "Le glycol solaire est neuf", "L’eau est adoucie"], correctAnswer: "La PAC est en défaut",
    retryMessage: "Observez le triangle lumineux rouge : il signale une alarme sur l’équipement.", assistedHint: "Un écran d’alarme demande un contrôle de l’installation avant sa remise en service.",
    diagnosis: "Échangeur PAC emboué", description: "L’encrassement réduit le transfert thermique, provoque l’arrêt de la PAC et sollicite davantage la relève chaudière ou électrique.",
    consequences: ["PAC arrêtée", "Relève plus coûteuse", "Dépenses énergétiques en hausse"], equipment: "Désembouage et dégazage du circuit PAC", mechanism: "Restauration du débit puis extraction de l’air", benefit: "Une PAC disponible et une hybridation performante",
    curativeAction: "Désembouer le circuit et l’échangeur PAC", preventiveAction: "Installer une centrale de dégazage adaptée",
    solution: "Le désembouage restaure l’échange thermique. La centrale de dégazage limite ensuite l’air et la corrosion qui favorisent de nouveaux dépôts.",
    equipmentImage: "/assets/tradeshow/equipment/technical/degassing-unit.png", beforeSceneImage: ROOF_SCENE.before, afterSceneImage: ROOF_SCENE.after, motionVideo: "/assets/tradeshow/motion/degassing-unit.mp4", detailImage: ROOF_SCENE.before, imagePosition: "25% 35%",
    proofLabel: "Signal visible", proofValue: "PAC arrêtée · alarme rouge", processSteps: ["Désembouer", "Rétablir l’échange", "Dégazer"], technicalFacts: ["Action curative", "Prévention par dégazage", "Relève limitée"],
    correctionSteps: [
      { phase: "curative", title: "Désembouer le circuit PAC", description: "Le nettoyage restaure le débit et le transfert thermique dans l’échangeur.", image: ROOF_SCENE.before, actionLabel: "Nettoyer l’échangeur" },
      { phase: "preventive", title: "Éliminer l’air du réseau", description: "La centrale de dégazage limite l’oxygène, la corrosion et la formation de nouveaux dépôts.", image: "/assets/tradeshow/equipment/technical/degassing-unit.png", actionLabel: "Installer le dégazage" },
    ],
  },
];
