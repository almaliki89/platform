export type ModernPhysicsMode = 'photoelectric' | 'photon-energy' | 'de-broglie' | 'uncertainty';

export interface WorkFunctionPreset {
  id: string;
  nameAr: string;
  nameEn: string;
  workFunctionEv: number; // W0 in eV
  thresholdWavelengthNm: number;
}

export interface PhotoelectricResult {
  wavelengthNm: number;
  frequencyHz: number;
  photonEnergyEv: number; // E = hf in eV
  photonEnergyJoules: number;
  workFunctionEv: number; // W0
  thresholdFreqHz: number; // f0
  thresholdWavelengthNm: number; // λ0
  isEmissionOccurring: boolean; // E >= W0
  maxKineticEnergyEv: number; // Kmax = hf - W0
  maxKineticEnergyJoules: number;
  stoppingPotentialVs: number; // Vs = Kmax / e
  maxElectronVelocityM_s: number; // v = √(2 Kmax / me)
  photoelectricCurrentRelative: number;
}

export interface DeBroglieResult {
  massKg: number;
  velocityM_s: number;
  momentumKgM_s: number; // p = m * v
  deBroglieWavelengthM: number; // λ = h / p
  deBroglieWavelengthNm: number;
  kineticEnergyEv: number;
}

export interface UncertaintyResult {
  positionUncertaintyM: number; // Δx
  minMomentumUncertaintyKgM_s: number; // Δp >= h / (4π Δx)
  minVelocityUncertaintyM_s: number; // Δv = Δp / m
  massKg: number;
}
