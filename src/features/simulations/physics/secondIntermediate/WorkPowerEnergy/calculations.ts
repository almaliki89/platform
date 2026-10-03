import { EnergyCalculations } from './types';

export const GRAVITY_G = 9.8; // m/s^2

/**
 * Pure Physics Calculations for Work, Power, KE & PE
 */
export function calculateWork(forceN: number, distanceM: number): number {
  return Math.max(0, forceN) * Math.max(0, distanceM);
}

export function calculatePower(workJ: number, timeSec: number): number {
  const safeTime = Math.max(0.1, timeSec);
  return workJ / safeTime;
}

export function calculateKineticEnergy(massKg: number, velocityMs: number): number {
  return 0.5 * Math.max(0, massKg) * velocityMs * velocityMs;
}

export function calculatePotentialEnergy(
  massKg: number,
  heightM: number,
  g: number = GRAVITY_G
): number {
  return Math.max(0, massKg) * g * Math.max(0, heightM);
}

export function calculateAllEnergyMetrics(
  forceN: number,
  distanceM: number,
  timeSec: number,
  massKg: number,
  heightM: number,
  velocityMs: number
): EnergyCalculations {
  const workJ = calculateWork(forceN, distanceM);
  const powerW = calculatePower(workJ, timeSec);
  const kineticEnergyJ = calculateKineticEnergy(massKg, velocityMs);
  const potentialEnergyJ = calculatePotentialEnergy(massKg, heightM);
  const totalMechanicalEnergyJ = kineticEnergyJ + potentialEnergyJ;

  return {
    workJ,
    powerW,
    kineticEnergyJ,
    potentialEnergyJ,
    totalMechanicalEnergyJ,
  };
}
