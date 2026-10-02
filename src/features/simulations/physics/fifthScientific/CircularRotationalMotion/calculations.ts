import {
  RotatingBodyShape,
  RotatingBodyPreset,
  CircularMotionResult,
  RotationalDynamicsResult,
} from './types';

export const ROTATING_BODY_PRESETS: RotatingBodyPreset[] = [
  {
    id: 'disk',
    nameAr: 'قرص مصمت / أسطوانة (Solid Disk)',
    nameEn: 'Solid Disk / Cylinder',
    inertiaFactor: 0.5,
    formulaAr: 'I = ½ M R²',
  },
  {
    id: 'ring',
    nameAr: 'حلقة دائرية رقيقة (Thin Hoop)',
    nameEn: 'Thin Hoop / Ring',
    inertiaFactor: 1.0,
    formulaAr: 'I = M R²',
  },
  {
    id: 'sphere',
    nameAr: 'كرة مصمتة (Solid Sphere)',
    nameEn: 'Solid Sphere',
    inertiaFactor: 0.4,
    formulaAr: 'I = ⅖ M R²',
  },
  {
    id: 'rod',
    nameAr: 'ساق رفيعة حول المركز (Thin Rod)',
    nameEn: 'Thin Rod (Center Axis)',
    inertiaFactor: 1 / 12,
    formulaAr: 'I = ⅟₁₂ M L²',
  },
];

/**
 * Pure circular kinematics and centripetal dynamics
 */
export function calculateCircularMotion(
  radiusM: number,
  massKg: number,
  angularVelocityRad_s: number
): CircularMotionResult {
  const safeOmega = Math.max(0.01, angularVelocityRad_s);
  const tangentialV = safeOmega * radiusM;
  const ac = Math.pow(safeOmega, 2) * radiusM;
  const fc = massKg * ac;
  const period = (2 * Math.PI) / safeOmega;
  const frequency = 1 / period;
  const rpm = (safeOmega * 60) / (2 * Math.PI);

  return {
    radiusM,
    massKg,
    angularVelocityRad_s: safeOmega,
    angularVelocityRpm: rpm,
    tangentialVelocityM_s: tangentialV,
    centripetalAccelerationM_s2: ac,
    centripetalForceN: fc,
    periodSec: period,
    frequencyHz: frequency,
  };
}

/**
 * Rotational dynamics: Torque, Moment of Inertia, Angular Momentum
 */
export function calculateRotationalDynamics(
  shape: RotatingBodyShape,
  massKg: number,
  radiusM: number,
  appliedTorqueN_m: number,
  angularVelocityRad_s: number
): RotationalDynamicsResult {
  const preset =
    ROTATING_BODY_PRESETS.find((p) => p.id === shape) || ROTATING_BODY_PRESETS[0];

  const momentOfInertia = preset.inertiaFactor * massKg * Math.pow(radiusM, 2);
  const angularAcceleration = appliedTorqueN_m / momentOfInertia;
  const angularMomentum = momentOfInertia * angularVelocityRad_s;
  const keRotational = 0.5 * momentOfInertia * Math.pow(angularVelocityRad_s, 2);

  return {
    shape,
    massKg,
    radiusM,
    momentOfInertiaKg_m2: momentOfInertia,
    appliedTorqueN_m,
    angularAccelerationRad_s2: angularAcceleration,
    angularVelocityRad_s,
    angularMomentumKg_m2_s: angularMomentum,
    rotationalKineticEnergyJ: keRotational,
  };
}
