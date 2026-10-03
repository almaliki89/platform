export type NuclearMode = 'nuclear-structure' | 'binding-energy' | 'radioactive-decay';

export type IsotopePresetId =
  | 'helium-4'
  | 'carbon-12'
  | 'iron-56'
  | 'uranium-235'
  | 'uranium-238'
  | 'radium-226'
  | 'cobalt-60'
  | 'carbon-14';

export interface IsotopeInfo {
  id: IsotopePresetId;
  nameAr: string;
  symbol: string;
  Z: number;
  A: number;
  atomicMassU: number;
  halfLifeYears?: number;
  halfLifeDays?: number;
  decayTypeAr?: string;
}

export interface NuclearStructureResult {
  Z: number;
  N: number;
  A: number;
  chargeCoulombs: number;
  radiusFm: number; // R = 1.2 * A^(1/3) fm
  volumeM3: number;
  densityKgM3: number;
}

export interface BindingEnergyResult {
  massDefectU: number; // Δm in atomic mass units (u)
  bindingEnergyMev: number; // Eb = Δm * 931.494 MeV
  bindingEnergyPerNucleonMev: number; // Eb / A
  stabilityClassificationAr: string; // عالية الاستقرار / متوسطة / ثقيلة غير مستقرة
}

export interface DecayLawResult {
  halfLifeSeconds: number;
  decayConstantPerSec: number; // λ = ln(2) / T1/2
  initialCountN0: number;
  elapsedTimeSeconds: number;
  remainingCountN: number;
  decayedCount: number;
  activityBq: number;
}
