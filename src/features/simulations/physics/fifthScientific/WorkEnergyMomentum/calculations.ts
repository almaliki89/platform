import {
  WorkEnergyState,
  ImpulseMomentumState,
  CollisionState,
  CollisionType,
} from './types';

export const GRAVITY_G = 9.8; // m/s^2

/**
 * Work-Energy Theorem: W_net = ΔKE
 * W = F * d * cos(θ)
 */
export function calculateWorkEnergy(
  massKg: number,
  appliedForceN: number,
  forceAngleDeg: number,
  displacementM: number,
  initialVelocityM_s: number,
  frictionCoeff: number
): WorkEnergyState {
  const rad = (forceAngleDeg * Math.PI) / 180;
  const fParallel = appliedForceN * Math.cos(rad);
  const fPerpendicular = appliedForceN * Math.sin(rad);

  const workApplied = fParallel * displacementM;

  // Normal force N = mg - F*sin(θ) (cannot be negative)
  const normalForce = Math.max(0, massKg * GRAVITY_G - fPerpendicular);
  const frictionForce = frictionCoeff * normalForce;
  const workFriction = -frictionForce * displacementM;

  const workNet = workApplied + workFriction;

  const initialKe = 0.5 * massKg * Math.pow(initialVelocityM_s, 2);
  const finalKe = Math.max(0, initialKe + workNet);
  const finalVelocity = Math.sqrt((2 * finalKe) / massKg);

  return {
    massKg,
    appliedForceN,
    forceAngleDeg,
    displacementM,
    initialVelocityM_s,
    frictionCoeff,
    workAppliedJ: workApplied,
    workFrictionJ: workFriction,
    workNetJ: workNet,
    initialKeJ: initialKe,
    finalKeJ: finalKe,
    finalVelocityM_s: finalVelocity,
  };
}

/**
 * Impulse & Momentum: J = F * Δt = Δp
 * p = m * v
 */
export function calculateImpulseMomentum(
  massKg: number,
  initialVelocityM_s: number,
  appliedForceN: number,
  durationSec: number
): ImpulseMomentumState {
  const initialMomentum = massKg * initialVelocityM_s;
  const impulse = appliedForceN * durationSec;
  const finalMomentum = initialMomentum + impulse;
  const finalVelocity = finalMomentum / massKg;

  const initialKe = 0.5 * massKg * Math.pow(initialVelocityM_s, 2);
  const finalKe = 0.5 * massKg * Math.pow(finalVelocity, 2);

  return {
    massKg,
    initialVelocityM_s,
    appliedForceN,
    durationSec,
    initialMomentumKgM_s: initialMomentum,
    impulseN_s: impulse,
    finalMomentumKgM_s: finalMomentum,
    finalVelocityM_s: finalVelocity,
    initialKeJ: initialKe,
    finalKeJ: finalKe,
  };
}

/**
 * 1D Collisions: Elastic and Perfectly Inelastic
 * Conserves momentum: m1*v1_i + m2*v2_i = m1*v1_f + m2*v2_f
 */
export function calculateCollision(
  m1Kg: number,
  v1InitialM_s: number,
  m2Kg: number,
  v2InitialM_s: number,
  collisionType: CollisionType
): CollisionState {
  const totalMomentumBefore = m1Kg * v1InitialM_s + m2Kg * v2InitialM_s;
  const totalKeBefore =
    0.5 * m1Kg * Math.pow(v1InitialM_s, 2) + 0.5 * m2Kg * Math.pow(v2InitialM_s, 2);

  let v1Final = 0;
  let v2Final = 0;
  let totalKeAfter = 0;

  if (collisionType === 'elastic') {
    // 1D perfectly elastic collision formulas
    v1Final =
      ((m1Kg - m2Kg) * v1InitialM_s + 2 * m2Kg * v2InitialM_s) / (m1Kg + m2Kg);
    v2Final =
      (2 * m1Kg * v1InitialM_s + (m2Kg - m1Kg) * v2InitialM_s) / (m1Kg + m2Kg);
    totalKeAfter =
      0.5 * m1Kg * Math.pow(v1Final, 2) + 0.5 * m2Kg * Math.pow(v2Final, 2);
  } else {
    // Perfectly inelastic: stick together
    const vCommon = totalMomentumBefore / (m1Kg + m2Kg);
    v1Final = vCommon;
    v2Final = vCommon;
    totalKeAfter = 0.5 * (m1Kg + m2Kg) * Math.pow(vCommon, 2);
  }

  const totalMomentumAfter = m1Kg * v1Final + m2Kg * v2Final;
  const keLost = Math.max(0, totalKeBefore - totalKeAfter);

  return {
    m1Kg,
    v1InitialM_s,
    m2Kg,
    v2InitialM_s,
    collisionType,
    v1FinalM_s: v1Final,
    v2FinalM_s: v2Final,
    totalMomentumBeforeKgM_s: totalMomentumBefore,
    totalMomentumAfterKgM_s: totalMomentumAfter,
    totalKeBeforeJ: totalKeBefore,
    totalKeAfterJ: totalKeAfter,
    keLostJ: keLost,
  };
}
