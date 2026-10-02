import {
  SpringShmResult,
  PendulumResult,
  WaveResult,
  DopplerResult,
} from './types';

export const GRAVITY_G = 9.8; // m/s^2
export const SOUND_SPEED_AIR = 343; // m/s at 20°C

/**
 * Spring Simple Harmonic Motion:
 * T = 2π √(m/k)
 */
export function calculateSpringShm(
  massKg: number,
  springConstantK: number,
  amplitudeM: number
): SpringShmResult {
  const safeM = Math.max(0.1, massKg);
  const safeK = Math.max(1, springConstantK);
  const omega = Math.sqrt(safeK / safeM);
  const period = (2 * Math.PI) / omega;
  const frequency = 1 / period;
  const maxV = omega * amplitudeM;
  const maxA = Math.pow(omega, 2) * amplitudeM;
  const energy = 0.5 * safeK * Math.pow(amplitudeM, 2);

  return {
    massKg: safeM,
    springConstantK_N_m: safeK,
    amplitudeM,
    periodSec: period,
    frequencyHz: frequency,
    angularFrequencyRad_s: omega,
    maxVelocityM_s: maxV,
    maxAccelerationM_s2: maxA,
    totalEnergyJ: energy,
  };
}

/**
 * Simple Pendulum:
 * T = 2π √(L/g)
 */
export function calculatePendulum(
  lengthM: number,
  massKg: number,
  angleDeg: number
): PendulumResult {
  const safeL = Math.max(0.1, lengthM);
  const omega = Math.sqrt(GRAVITY_G / safeL);
  const period = 2 * Math.PI * Math.sqrt(safeL / GRAVITY_G);
  const frequency = 1 / period;
  const smallAngleValid = Math.abs(angleDeg) <= 15;

  return {
    lengthM: safeL,
    massKg,
    angleInitialDeg: angleDeg,
    periodSec: period,
    frequencyHz: frequency,
    angularFrequencyRad_s: omega,
    smallAngleValid,
  };
}

/**
 * Traveling and Standing Wave Kinematics:
 * v = f * λ
 */
export function calculateWave(
  frequencyHz: number,
  wavelengthM: number,
  harmonicNumber: number = 1
): WaveResult {
  const speed = frequencyHz * wavelengthM;
  const period = 1 / Math.max(0.01, frequencyHz);

  return {
    frequencyHz,
    wavelengthM,
    waveSpeedM_s: speed,
    periodSec: period,
    harmonicNumber,
  };
}

/**
 * Doppler Effect in Sound:
 * f' = f * (v ± vo) / (v ∓ vs)
 */
export function calculateDoppler(
  sourceFreqHz: number,
  sourceSpeedM_s: number,
  observerSpeedM_s: number,
  sourceMovingToward: boolean,
  observerMovingToward: boolean
): DopplerResult {
  // Sign convention:
  // Observer moving towards source increases frequency (+)
  // Source moving towards observer increases frequency (-) in denominator
  const voSigned = observerMovingToward ? observerSpeedM_s : -observerSpeedM_s;
  const vsSigned = sourceMovingToward ? -sourceSpeedM_s : sourceSpeedM_s;

  const numerator = SOUND_SPEED_AIR + voSigned;
  const denominator = Math.max(1, SOUND_SPEED_AIR + vsSigned);
  const observedFreq = sourceFreqHz * (numerator / denominator);
  const shiftPercent = ((observedFreq - sourceFreqHz) / sourceFreqHz) * 100;

  return {
    sourceFreqHz,
    soundSpeedM_s: SOUND_SPEED_AIR,
    sourceSpeedM_s,
    observerSpeedM_s,
    sourceMovingToward,
    observerMovingToward,
    observedFrequencyHz: observedFreq,
    frequencyShiftPercent: shiftPercent,
  };
}
