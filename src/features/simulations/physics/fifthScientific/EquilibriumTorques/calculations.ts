import { ForceApplied, TorqueItem, EquilibriumResult } from './types';

/**
 * Calculates torque for each force around the pivot.
 * Sign convention:
 * - Counter-Clockwise (عكس عقارب الساعة) = Positive (+)
 * - Clockwise (مع عقارب الساعة) = Negative (-)
 */
export function calculateEquilibriumState(
  beamLengthM: number,
  pivotPositionM: number,
  forces: ForceApplied[]
): EquilibriumResult {
  let sumTorque = 0;
  let sumForceVertical = 0;

  const torques: TorqueItem[] = forces.map((f) => {
    // lever arm distance from pivot: signed (positive to the right, negative to the left)
    const displacementFromPivot = f.positionM - pivotPositionM;
    const rad = (f.angleDeg * Math.PI) / 180;
    
    // Vertical component (pointing downward if angle is 90 deg)
    const fVertical = f.magnitudeN * Math.sin(rad);
    sumForceVertical += fVertical;

    // A downward force (fVertical > 0) to the right (displacement > 0) produces CLOCKWISE torque (-)
    // A downward force (fVertical > 0) to the left (displacement < 0) produces COUNTER-CLOCKWISE torque (+)
    const torque = -displacementFromPivot * fVertical;
    sumTorque += torque;

    return {
      id: f.id,
      nameAr: f.nameAr,
      forceN: f.magnitudeN,
      leverArmM: Math.abs(displacementFromPivot),
      torqueN_m: torque,
    };
  });

  const isEquilibrium = Math.abs(sumTorque) < 0.05;

  let rotationTendencyAr = 'متزن تماماً (سكوني)';
  if (sumTorque > 0.05) {
    rotationTendencyAr = 'يميل للدوران عكس اتجاه عقارب الساعة (موجب)';
  } else if (sumTorque < -0.05) {
    rotationTendencyAr = 'يميل للدوران مع اتجاه عقارب الساعة (سالب)';
  }

  return {
    beamLengthM,
    pivotPositionM,
    torques,
    sumTorqueN_m: sumTorque,
    sumForceVerticalN: sumForceVertical,
    isEquilibrium,
    rotationTendencyAr,
  };
}

export const DEFAULT_FORCES: ForceApplied[] = [
  {
    id: 'f1',
    nameAr: 'القوة الأولى F₁ (اليسار)',
    magnitudeN: 20,
    positionM: 1.0,
    angleDeg: 90,
    color: '#06b6d4', // cyan
  },
  {
    id: 'f2',
    nameAr: 'القوة الثانية F₂ (اليمين)',
    magnitudeN: 10,
    positionM: 4.0,
    angleDeg: 90,
    color: '#f59e0b', // amber
  },
];
