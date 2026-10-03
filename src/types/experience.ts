export type ExperienceStep =
  | "attract"
  | "exploration"
  | "score"
  | "conversion";

export type Severity = "faible" | "moderee" | "elevee";

export type RiskId =
  | "embouage"
  | "air"
  | "equilibrage"
  | "ecs"
  | "entartrage";

export interface RiskHotspot {
  id: RiskId;
  index: string;
  zone: string;
  title: string;
  severity: Severity;
  description: string;
  clue: string;
  clueDetail: string;
  question: string;
  answers: [string, string];
  correctAnswer: number;
  consequence: string;
  solution: string;
  equipment: string;
  equipmentDetail: string;
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
