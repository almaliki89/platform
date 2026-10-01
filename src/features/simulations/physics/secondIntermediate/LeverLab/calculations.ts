import { LeverCalculations, LeverClassType } from './types';

/**
 * Pure calculations for Lever Torque & Mechanical Advantage:
 * Torque = Force * Arm Distance
 * Effort * EffortArm = Load * ResistanceArm
 */
export function calculateLever(
  effortForceN: number,
  effortArmM: number,
  loadForceN: number,
  loadArmM: number,
  leverClass: LeverClassType = 'class1'
): LeverCalculations {
  const torqueLeft = effortForceN * effortArmM; // Effort torque
  const torqueRight = loadForceN * loadArmM; // Load torque
  const diff = torqueRight - torqueLeft;

  const isBalanced = Math.abs(diff) < 0.1;
  const mechanicalAdvantage = effortForceN > 0 ? loadForceN / effortForceN : 1;

  // Visual tilt angle (capped at +/- 15 deg)
  const rawAngle = Math.max(-15, Math.min(15, (diff / Math.max(1, torqueLeft + torqueRight)) * 18));
  const tiltAngleDeg = isBalanced ? 0 : rawAngle;

  let balanceStateAr = 'متزنة تماماً (القوة × ذراعها = المقاومة × ذراعها)';
  if (!isBalanced) {
    balanceStateAr = diff > 0 ? 'مائلة نحو جهة المقاومة (اليمين)' : 'مائلة نحو جهة القوة (اليسار)';
  }

  let leverClassAr = 'النوع الأول (الارتكاز في الوسط مثل المقص والميزان)';
  if (leverClass === 'class2') {
    leverClassAr = 'النوع الثاني (المقاومة في الوسط مثل عربة الحديقة وكسارة البندق)';
  } else if (leverClass === 'class3') {
    leverClassAr = 'النوع الثالث (القوة في الوسط مثل الملقط والسنارة)';
  }

  return {
    torqueLeft,
    torqueRight,
    isBalanced,
    tiltAngleDeg,
    mechanicalAdvantage,
    balanceStateAr,
    leverClassAr,
  };
}
