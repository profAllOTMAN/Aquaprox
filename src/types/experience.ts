export type ExperienceStep =
  | "attract"
  | "building-selection"
  | "exploration"
  | "score"
  | "conversion";

export type Severity = "faible" | "moderee" | "elevee";

export type RiskId =
  | "corrosion"
  | "stagnation"
  | "temperature"
  | "entartrage"
  | "desequilibre";

export interface RiskHotspot {
  id: RiskId;
  index: string;
  zone: string;
  title: string;
  severity: Severity;
  description: string;
  clue: string;
  clueDetail: string;
  solution: string;
  value: string;
  expertise: string;
  x: number;
  y: number;
}

export interface BuildingType {
  id: string;
  title: string;
  eyebrow: string;
  available: boolean;
  icon: "habitat" | "sante" | "tertiaire" | "hotel";
}
