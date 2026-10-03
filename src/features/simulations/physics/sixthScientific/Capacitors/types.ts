export type CapacitorMode = 'parallel-plate' | 'series-parallel' | 'stored-energy' | 'rc-circuit';

export type CombinationType = 'series' | 'parallel';

export interface DielectricMaterialPreset {
  id: string;
  nameAr: string;
  nameEn: string;
  dielectricConstantK: number; // k
  breakdownFieldV_m?: number;
  color: string;
}

export interface ParallelPlateResult {
  plateAreaM2: number; // A
  separationM: number; // d
  dielectricK: number; // k
  appliedVoltageV: number; // V
  capacitanceFarads: number; // C = k * ε0 * A / d
  capacitancePicoFarads: number; // pF
  chargeCoulombs: number; // Q = C * V
  chargeMicroCoulombs: number; // μC
  storedEnergyJoules: number; // PE = 0.5 * C * V^2
  storedEnergyMicroJoules: number; // μJ
  electricFieldV_m: number; // E = V / d
}

export interface CapacitorCombinationResult {
  type: CombinationType;
  c1MicroF: number;
  c2MicroF: number;
  c3MicroF?: number;
  voltageV: number;
  cEquivalentMicroF: number;
  totalChargeMicroC: number;
  totalEnergyMicroJ: number;
  branches: {
    id: string;
    labelAr: string;
    cMicroF: number;
    voltageV: number;
    chargeMicroC: number;
    energyMicroJ: number;
  }[];
}

export interface RcCircuitResult {
  resistanceOhms: number; // R
  capacitanceMicroF: number; // C
  sourceVoltageV: number; // V0
  timeConstantSec: number; // τ = R * C
  timeSec: number; // t
  isCharging: boolean;
  capacitorVoltageV: number; // V_c(t)
  currentAmperes: number; // I(t)
  chargeMicroC: number; // Q(t)
  energyMicroJ: number;
}
