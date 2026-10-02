export type FourthElectrostaticsMode = 'parallel-plates' | 'potential-work' | 'equipotential';

export type ChargedParticleType = 'electron' | 'proton' | 'alpha';

export interface ParticlePreset {
  id: ChargedParticleType;
  nameAr: string;
  nameEn: string;
  chargeCoulombs: number; // e.g. -1.6e-19 for electron
  massKg: number; // e.g. 9.11e-31 for electron
  chargeSign: number; // -1, +1, +2
  color: string;
}

export interface ParallelPlatesResult {
  electricFieldStrengthV_m: number; // E = Delta V / d
  forceOnParticleN: number; // F = q * E
  accelerationM_s2: number; // a = F / m
  kineticEnergyGainedEv: number; // eV
  kineticEnergyGainedJ: number; // Joules
  verticalDeflectionMm: number; // y at exit of plates
  timeOfFlightNs: number; // nanoseconds
}
