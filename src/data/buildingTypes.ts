import type { BuildingType } from "@/types/experience";

export const buildingTypes: BuildingType[] = [
  { id: "habitat", title: "Habitat collectif", eyebrow: "Résidences & copropriétés", available: true, icon: "habitat" },
  { id: "sante", title: "Établissement de santé", eyebrow: "Hôpitaux & cliniques", available: false, icon: "sante" },
  { id: "tertiaire", title: "Bâtiment tertiaire", eyebrow: "Bureaux & sièges", available: false, icon: "tertiaire" },
  { id: "hotel", title: "Hôtellerie", eyebrow: "Hôtels & résidences", available: false, icon: "hotel" },
];
