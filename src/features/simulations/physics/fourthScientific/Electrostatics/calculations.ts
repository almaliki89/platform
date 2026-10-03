import { ParticlePreset, ParallelPlatesResult, ChargedParticleType } from './types';

export const ELEMENTARY_CHARGE = 1.602176634e-19; // Coulombs

export const PARTICLE_PRESETS: Record<ChargedParticleType, ParticlePreset> = {
  electron: {
    id: 'electron',
    nameAr: 'إلكترون (Electron - e⁻)',
    nameEn: 'Electron',
    chargeCoulombs: -ELEMENTARY_CHARGE,
    massKg: 9.1093837e-31,
    chargeSign: -1,
    color: '#38bdf8',
  },
  proton: {
    id: 'proton',
    nameAr: 'بروتون (Proton - p⁺)',
    nameEn: 'Proton',
    chargeCoulombs: ELEMENTARY_CHARGE,
    massKg: 1.6726219e-27,
    chargeSign: 1,
    color: '#ef4444',
  },
  alpha: {
    id: 'alpha',
    nameAr: 'جسيم ألفا (Alpha Particle - α²⁺)',
    nameEn: 'Alpha Particle',
    chargeCoulombs: 2 * ELEMENTARY_CHARGE,
    massKg: 6.6446572e-27,
    chargeSign: 2,
    color: '#fbbf24',
  },
};

/**
 * Calculates uniform electric field between parallel plates:
 * E = Delta V / d
 * F = q * E
 * a = F / m
 * y = 0.5 * a * t^2 where t = L / v_0
 */
export function calculateParallelPlates(
  particleType: ChargedParticleType,
  voltageV: number,
  plateSeparationM: number,
  initialVelocityKm_s: number,
  plateLengthM: number = 0.1
): ParallelPlatesResult {
  const particle = PARTICLE_PRESETS[particleType];
  const d = Math.max(0.01, plateSeparationM);
  const L = Math.max(0.02, plateLengthM);
  const v0 = Math.max(10, initialVelocityKm_s * 1000); // m/s

  const electricFieldStrengthV_m = voltageV / d; // E in V/m
  const forceOnParticleN = Math.abs(particle.chargeCoulombs) * Math.abs(electricFieldStrengthV_m);
  const accelerationM_s2 = forceOnParticleN / particle.massKg;

  const timeOfFlightSec = L / v0;
  const timeOfFlightNs = timeOfFlightSec * 1e9;

  // Deflection in meters: y = 0.5 * a * t^2
  const deflectionM = 0.5 * accelerationM_s2 * (timeOfFlightSec * timeOfFlightSec);
  const verticalDeflectionMm = deflectionM * 1000;

  // Energy gained
  const deltaVTraversed = Math.abs(electricFieldStrengthV_m * deflectionM);
  const kineticEnergyGainedJ = Math.abs(particle.chargeCoulombs) * deltaVTraversed;
  const kineticEnergyGainedEv = deltaVTraversed * Math.abs(particle.chargeSign);

  return {
    electricFieldStrengthV_m,
    forceOnParticleN,
    accelerationM_s2,
    kineticEnergyGainedEv,
    kineticEnergyGainedJ,
    verticalDeflectionMm,
    timeOfFlightNs,
  };
}
