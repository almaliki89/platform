export type RotationalMode = 'circular-kinematics' | 'centripetal-force' | 'rotational-dynamics';

export type RotatingBodyShape = 'disk' | 'ring' | 'sphere' | 'rod';

export interface RotatingBodyPreset {
  id: RotatingBodyShape;
  nameAr: string;
  nameEn: string;
  inertiaFactor: number; // e.g. 0.5 for disk (1/2 MR^2), 1.0 for ring, 0.4 for solid sphere (2/5 MR^2)
  formulaAr: string;
}

export interface CircularMotionResult {
  radiusM: number;
  massKg: number;
  angularVelocityRad_s: number; // ω
  angularVelocityRpm: number;
  tangentialVelocityM_s: number; // v = ω * r
  centripetalAccelerationM_s2: number; // a_c = ω^2 * r = v^2 / r
  centripetalForceN: number; // F_c = m * a_c
  periodSec: number; // T = 2π / ω
  frequencyHz: number; // f = 1 / T
}

export interface RotationalDynamicsResult {
  shape: RotatingBodyShape;
  massKg: number;
  radiusM: number;
  momentOfInertiaKg_m2: number; // I
  appliedTorqueN_m: number; // τ
  angularAccelerationRad_s2: number; // α = τ / I
  angularVelocityRad_s: number; // ω
  angularMomentumKg_m2_s: number; // L = I * ω
  rotationalKineticEnergyJ: number; // KE_rot = 0.5 * I * ω^2
}
