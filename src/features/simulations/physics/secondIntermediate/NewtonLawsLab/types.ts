export type NewtonLawScenario = 'inertia' | 'f_ma' | 'action_reaction';

export interface NewtonLawResult {
  scenario: NewtonLawScenario;
  accelerationA: number;
  accelerationB?: number;
  explanationAr: string;
  lawNameAr: string;
}
