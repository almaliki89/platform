export interface MotionForcesResult {
  massKg: number;
  inclineAngleDeg: number;
  appliedForceN: number;
  muStatic: number;
  muKinetic: number;
  weightN: number; // W = mg
  gravityParallelN: number; // mg * sin(theta)
  gravityPerpendicularN: number; // mg * cos(theta)
  normalForceN: number; // N = mg * cos(theta)
  maxStaticFrictionN: number; // fs_max = mu_s * N
  actualFrictionN: number;
  isSliding: boolean;
  netForceN: number;
  accelerationM_s2: number;
  motionStateAr: string;
}
