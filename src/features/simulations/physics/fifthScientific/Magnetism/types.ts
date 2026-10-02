export type MagnetismMode = 'charged-particle' | 'conductor-force' | 'parallel-wires';

export type ParticleKind = 'proton' | 'electron' | 'alpha';

export interface ChargedParticleResult {
  particle: ParticleKind;
  chargeC: number;
  massKg: number;
  velocityM_s: number;
  bFieldTesla: number;
  angleDeg: number;
  forceLorentzN: number; // F = q * v * B * sin(θ)
  cyclotronRadiusM: number; // r = m*v / (|q|*B)
  periodSec: number; // T = 2π*m / (|q|*B)
  cyclotronFreqHz: number;
}

export interface ConductorForceResult {
  currentA: number;
  wireLengthM: number;
  bFieldTesla: number;
  angleDeg: number;
  magneticForceN: number; // F = I * L * B * sin(θ)
}

export interface ParallelWiresResult {
  current1A: number;
  current2A: number;
  sameDirection: boolean;
  distanceM: number;
  wireLengthM: number;
  mutualForceN: number; // F = (μ0 * I1 * I2 * L) / (2π * d)
  forceTypeAr: string; // تجاذب / تنافر
  bField1At2Tesla: number; // B = μ0 * I1 / (2π * d)
}
