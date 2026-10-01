import { NEWTON_CONSTANTS } from './constants';

/**
 * Pure function to calculate acceleration based on Newton's Second Law: F = m * a -> a = F / m
 * Supports optional friction: F_net = max(0, F - frictionCoeff * mass * g)
 */
export function calculateAcceleration(
  force: number,
  mass: number,
  frictionCoeff: number = 0,
  g: number = NEWTON_CONSTANTS.GRAVITY
): number {
  if (mass <= 0) {
    throw new Error('Mass must be greater than 0');
  }

  const validForce = Math.max(0, force);
  const frictionForce = frictionCoeff * mass * g;
  const netForce = Math.max(0, validForce - frictionForce);

  return netForce / mass;
}

/**
 * Kinematics velocity calculation: v(t + dt) = v(t) + a * dt
 */
export function calculateNextVelocity(currentVelocity: number, acceleration: number, dt: number): number {
  return Math.max(0, currentVelocity + acceleration * dt);
}

/**
 * Kinematics position integration: x(t + dt) = x(t) + v * dt + 0.5 * a * dt^2
 */
export function calculateNextPosition(
  currentPosition: number,
  currentVelocity: number,
  acceleration: number,
  dt: number
): number {
  return currentPosition + currentVelocity * dt + 0.5 * acceleration * dt * dt;
}

/**
 * Kinetic energy: E_k = 1/2 * m * v^2
 */
export function calculateKineticEnergy(mass: number, velocity: number): number {
  return 0.5 * mass * velocity * velocity;
}

/**
 * Momentum: p = m * v
 */
export function calculateMomentum(mass: number, velocity: number): number {
  return mass * velocity;
}
