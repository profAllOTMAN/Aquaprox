// Display values are pedagogical, not sizing instructions. Four apartments share two column pairs.
export const GAINES_APARTMENTS = [
  { id: "A1", label: "Logement 1", meter: { x: 452, y: 215 }, frame: "322 52 225 225", beforeFlow: 352, afterFlow: 351, beforeSetting: "3,5", afterSetting: "3,5" },
  { id: "A2", label: "Logement 2", meter: { x: 1237, y: 215 }, frame: "1110 52 235 225", beforeFlow: 348, afterFlow: 349, beforeSetting: "3,5", afterSetting: "3,5" },
  { id: "A3", label: "Logement 3", meter: { x: 452, y: 501 }, frame: "322 345 225 225", beforeFlow: 10, afterFlow: 350, beforeSetting: "0,1", afterSetting: "3,5" },
  { id: "A4", label: "Logement 4", meter: { x: 1237, y: 501 }, frame: "1110 345 235 225", beforeFlow: 362, afterFlow: 352, beforeSetting: "3,5", afterSetting: "3,5" },
] as const;

export const GAINES_EQUIPMENT_COUNTS = { columnPairs: 2, apartmentMeters: 4, columnValves: 2, branchValves: 4, measuringCasesBefore: 0, measuringCasesAfter: 1 } as const;
