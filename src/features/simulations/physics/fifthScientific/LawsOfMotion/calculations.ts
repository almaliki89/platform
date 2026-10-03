import { MotionForcesResult } from './types';

export const GRAVITY_G = 9.8; // m/s^2

/**
 * Calculates friction force and sliding state:
 * - If driving force magnitude <= fs_max = mu_s * N: object is static, f = -drivingForce
 * - If driving force magnitude > fs_max: object slides, fk = mu_k * N in opposite direction
 */
export function calculateFriction(
  normalForce: number,
  muStatic: number,
  muKinetic: number,
  drivingForce: number
): { friction: number; isSliding: boolean; maxStatic: number } {
  const n = Math.max(0, normalForce);
  const muS = Math.max(0, muStatic);
  const muK = Math.min(muS, Math.max(0, muKinetic));

  const maxStatic = muS * n;

  if (Math.abs(drivingForce) <= maxStatic) {
    // Static equilibrium: friction balances driving force exactly
    return {
      friction: -drivingForce,
      isSliding: false,
      maxStatic,
    };
  }

  // Kinetic friction opposes motion direction
  const direction = drivingForce > 0 ? -1 : 1;
  const kinetic = direction * (muK * n);

  return {
    friction: kinetic,
    isSliding: true,
    maxStatic,
  };
}

/**
 * Calculates complete dynamics on an inclined plane:
 * Positive direction is UP the plane.
 * Driving force parallel to plane = F_applied - mg * sin(theta)
 */
export function calculateInclinedPlaneForces(
  massKg: number,
  appliedForceN: number,
  angleDeg: number,
  muStatic: number,
  muKinetic: number
): MotionForcesResult {
  const m = Math.max(0.1, massKg);
  const angleClamped = Math.max(0, Math.min(85, angleDeg));
  const rad = (angleClamped * Math.PI) / 180;

  const weightN = m * GRAVITY_G;
  const gravityParallelN = weightN * Math.sin(rad); // pulls DOWN plane
  const gravityPerpendicularN = weightN * Math.cos(rad);
  const normalForceN = gravityPerpendicularN;

  // Net driving force before friction (positive = up plane, negative = down plane)
  const drivingForce = appliedForceN - gravityParallelN;

  const frictionRes = calculateFriction(normalForceN, muStatic, muKinetic, drivingForce);

  const netForceN = frictionRes.isSliding
    ? drivingForce + frictionRes.friction
    : 0;

  const accelerationM_s2 = netForceN / m;

  let motionStateAr = 'ساكن في حالة اتزان استاتيكي (F_net = 0)';
  if (frictionRes.isSliding) {
    if (accelerationM_s2 > 0) {
      motionStateAr = `متسارع للأعلى بتعجيل (+${accelerationM_s2.toFixed(2)} m/s²)`;
    } else {
      motionStateAr = `منزلق للأسفل بتعجيل (${accelerationM_s2.toFixed(2)} m/s²)`;
    }
  }

  return {
    massKg: m,
    inclineAngleDeg: angleClamped,
    appliedForceN,
    muStatic,
    muKinetic,
    weightN,
    gravityParallelN,
    gravityPerpendicularN,
    normalForceN,
    maxStaticFrictionN: frictionRes.maxStatic,
    actualFrictionN: frictionRes.friction,
    isSliding: frictionRes.isSliding,
    netForceN,
    accelerationM_s2,
    motionStateAr,
  };
}
