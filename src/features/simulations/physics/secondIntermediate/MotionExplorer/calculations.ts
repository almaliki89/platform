import { MotionCalculations } from './types';

/**
 * Pure Kinematics Step Integration
 */
export function stepMotion(
  currentPos: number,
  currentVel: number,
  accumulatedDistance: number,
  initialPos: number,
  acceleration: number,
  dt: number
): { nextPos: number; nextVel: number; nextDistance: number; calculations: MotionCalculations } {
  const nextVel = currentVel + acceleration * dt;
  const deltaX = currentVel * dt + 0.5 * acceleration * dt * dt;
  const nextPos = currentPos + deltaX;
  const nextDistance = accumulatedDistance + Math.abs(deltaX);
  const displacement = nextPos - initialPos;

  return {
    nextPos,
    nextVel,
    nextDistance,
    calculations: {
      distance: nextDistance,
      displacement,
      velocity: nextVel,
      speed: Math.abs(nextVel),
      acceleration,
    },
  };
}
