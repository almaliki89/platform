import {
  ParticleKind,
  ChargedParticleResult,
  ConductorForceResult,
  ParallelWiresResult,
} from './types';

export const ELEMENTARY_CHARGE = 1.602176634e-19; // Coulombs
export const MU_0 = 4 * Math.PI * 1e-7; // T·m/A

export const PARTICLE_SPECS: Record<
  ParticleKind,
  { nameAr: string; charge: number; mass: number; color: string }
> = {
  proton: {
    nameAr: 'بروتون (Proton, +e)',
    charge: ELEMENTARY_CHARGE,
    mass: 1.67262192e-27,
    color: '#ef4444',
  },
  electron: {
    nameAr: 'إلكترون (Electron, -e)',
    charge: -ELEMENTARY_CHARGE,
    mass: 9.1093837e-31,
    color: '#06b6d4',
  },
  alpha: {
    nameAr: 'جسيم ألفا (Alpha, +2e)',
    charge: 2 * ELEMENTARY_CHARGE,
    mass: 6.64465723e-27,
    color: '#f59e0b',
  },
};

/**
 * Lorentz Magnetic Force on a moving charge:
 * F_B = q * (v × B) = q * v * B * sin(θ)
 * Radius in uniform B (perpendicular θ = 90°): r = (m * v) / (|q| * B)
 */
export function calculateChargedParticleMotion(
  particle: ParticleKind,
  velocityM_s: number,
  bFieldTesla: number,
  angleDeg: number = 90
): ChargedParticleResult {
  const spec = PARTICLE_SPECS[particle];
  const rad = (angleDeg * Math.PI) / 180;
  const sinVal = Math.sin(rad);

  const force = Math.abs(spec.charge) * velocityM_s * bFieldTesla * Math.abs(sinVal);
  const qAbs = Math.abs(spec.charge);
  const safeB = Math.max(0.001, bFieldTesla);

  // Perpendicular radius component
  const r = (spec.mass * (velocityM_s * Math.abs(sinVal))) / (qAbs * safeB);
  const period = (2 * Math.PI * spec.mass) / (qAbs * safeB);
  const freq = 1 / period;

  return {
    particle,
    chargeC: spec.charge,
    massKg: spec.mass,
    velocityM_s,
    bFieldTesla,
    angleDeg,
    forceLorentzN: force,
    cyclotronRadiusM: r,
    periodSec: period,
    cyclotronFreqHz: freq,
  };
}

/**
 * Magnetic force on a current-carrying wire:
 * F = I * L * B * sin(θ)
 */
export function calculateConductorForce(
  currentA: number,
  wireLengthM: number,
  bFieldTesla: number,
  angleDeg: number
): ConductorForceResult {
  const rad = (angleDeg * Math.PI) / 180;
  const force = currentA * wireLengthM * bFieldTesla * Math.sin(rad);

  return {
    currentA,
    wireLengthM,
    bFieldTesla,
    angleDeg,
    magneticForceN: force,
  };
}

/**
 * Mutual force between two parallel currents:
 * F = (μ0 * I1 * I2 * L) / (2π * d)
 */
export function calculateParallelWires(
  current1A: number,
  current2A: number,
  sameDirection: boolean,
  distanceM: number,
  wireLengthM: number
): ParallelWiresResult {
  const safeD = Math.max(0.01, distanceM);
  // B1 at wire 2
  const b1At2 = (MU_0 * current1A) / (2 * Math.PI * safeD);
  const mutualForce = (MU_0 * current1A * current2A * wireLengthM) / (2 * Math.PI * safeD);

  return {
    current1A,
    current2A,
    sameDirection,
    distanceM: safeD,
    wireLengthM,
    mutualForceN: mutualForce,
    forceTypeAr: sameDirection ? 'تجاذب (Attractive)' : 'تنافر (Repulsive)',
    bField1At2Tesla: b1At2,
  };
}
