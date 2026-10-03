export type LinearMotionMode = 'uniform-acceleration' | 'free-fall' | 'projectile';

export interface LinearMotionState {
  timeSec: number;
  posX: number;
  posY: number;
  velX: number;
  velY: number;
  speed: number;
  accelX: number;
  accelY: number;
}

export interface ProjectileSummary {
  maxHeightM: number;
  flightTimeSec: number;
  rangeM: number;
  impactSpeedM_s: number;
}

export interface MotionDataPoint {
  t: number;
  x: number;
  y: number;
  v: number;
  a: number;
}
