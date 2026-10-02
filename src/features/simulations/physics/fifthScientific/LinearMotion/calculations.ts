import { LinearMotionState, ProjectileSummary, LinearMotionMode, MotionDataPoint } from './types';

export const GRAVITY_G = 9.8; // m/s^2

/**
 * Pure calculation for 1D uniform acceleration:
 * v = v0 + a * t
 * x = x0 + v0 * t + 0.5 * a * t^2
 */
export function calculateLinearMotion(
  v0: number,
  a: number,
  t: number,
  x0: number = 0
): LinearMotionState {
  const time = Math.max(0, t);
  const velX = v0 + a * time;
  const posX = x0 + v0 * time + 0.5 * a * time * time;

  return {
    timeSec: time,
    posX,
    posY: 0,
    velX,
    velY: 0,
    speed: Math.abs(velX),
    accelX: a,
    accelY: 0,
  };
}

/**
 * Pure calculation for Free Fall (1D vertical motion under gravity):
 * v = v0 - g * t
 * y = y0 + v0 * t - 0.5 * g * t^2
 */
export function calculateFreeFall(
  v0: number,
  t: number,
  y0: number = 0,
  g: number = GRAVITY_G
): LinearMotionState {
  const time = Math.max(0, t);
  const velY = v0 - g * time;
  const posY = Math.max(0, y0 + v0 * time - 0.5 * g * time * time);

  return {
    timeSec: time,
    posX: 0,
    posY,
    velX: 0,
    velY,
    speed: Math.abs(velY),
    accelX: 0,
    accelY: -g,
  };
}

/**
 * Pure calculation for 2D Projectile Motion:
 * x = v0 * cos(theta) * t
 * y = y0 + v0 * sin(theta) * t - 0.5 * g * t^2
 * vx = v0 * cos(theta)
 * vy = v0 * sin(theta) - g * t
 */
export function calculateProjectileMotion(
  v0: number,
  angleDeg: number,
  t: number,
  y0: number = 0,
  g: number = GRAVITY_G
): LinearMotionState {
  const time = Math.max(0, t);
  const rad = (angleDeg * Math.PI) / 180;
  const vx0 = v0 * Math.cos(rad);
  const vy0 = v0 * Math.sin(rad);

  const posX = vx0 * time;
  const rawY = y0 + vy0 * time - 0.5 * g * time * time;
  const posY = Math.max(0, rawY);

  const velX = vx0;
  const velY = posY === 0 && time > 0.05 ? 0 : vy0 - g * time;
  const speed = Math.sqrt(velX * velX + velY * velY);

  return {
    timeSec: time,
    posX,
    posY,
    velX,
    velY,
    speed,
    accelX: 0,
    accelY: posY > 0 ? -g : 0,
  };
}

/**
 * Calculates theoretical trajectory parameters for a projectile
 */
export function calculateProjectileSummary(
  v0: number,
  angleDeg: number,
  y0: number = 0,
  g: number = GRAVITY_G
): ProjectileSummary {
  const rad = (angleDeg * Math.PI) / 180;
  const vx0 = v0 * Math.cos(rad);
  const vy0 = v0 * Math.sin(rad);

  // Peak time tp = vy0 / g
  const tp = Math.max(0, vy0 / g);
  const maxHeightM = y0 + (vy0 * vy0) / (2 * g);

  // Total flight time from quadratic: y0 + vy0 * t - 0.5 * g * t^2 = 0
  // 0.5 * g * t^2 - vy0 * t - y0 = 0
  const discriminant = vy0 * vy0 + 2 * g * y0;
  const flightTimeSec = (vy0 + Math.sqrt(discriminant)) / g;

  const rangeM = vx0 * flightTimeSec;
  const impactVy = vy0 - g * flightTimeSec;
  const impactSpeedM_s = Math.sqrt(vx0 * vx0 + impactVy * impactVy);

  return {
    maxHeightM,
    flightTimeSec,
    rangeM,
    impactSpeedM_s,
  };
}

/**
 * Generates sample points for plotting graphs (x-t, v-t)
 */
export function generateMotionGraphData(
  mode: LinearMotionMode,
  v0: number,
  accel: number,
  angleDeg: number,
  y0: number,
  totalTime: number
): MotionDataPoint[] {
  const points: MotionDataPoint[] = [];
  const dt = Math.max(0.05, totalTime / 40);

  for (let t = 0; t <= totalTime + 1e-4; t += dt) {
    if (mode === 'uniform-acceleration') {
      const s = calculateLinearMotion(v0, accel, t, 0);
      points.push({ t, x: s.posX, y: 0, v: s.velX, a: accel });
    } else if (mode === 'free-fall') {
      const s = calculateFreeFall(v0, t, y0);
      points.push({ t, x: 0, y: s.posY, v: s.velY, a: -GRAVITY_G });
    } else {
      const s = calculateProjectileMotion(v0, angleDeg, t, y0);
      points.push({ t, x: s.posX, y: s.posY, v: s.speed, a: -GRAVITY_G });
    }
  }

  return points;
}
