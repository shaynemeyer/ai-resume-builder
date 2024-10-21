export interface Skill {
  id?: number;
  resumeId?: number;
  name: string;
  level: string;
}

export const skillLevels = [
  { label: "Poor", value: 1 },
  { label: "Basic", value: 2 },
  { label: "Moderate", value: 3 },
  { label: "Advanced", value: 4 },
  { label: "Expert", value: 5 },
];
