import { ElectromagnetismMode, ElectromagnetismResult } from './types';

/**
 * Pure calculation for Electromagnetism:
 * - Straight wire: B = (mu_0 * I) / (2 * pi * r)
 * - Solenoid / Electromagnet: B = mu * (N / L) * I
 * Iron core boosts permeability by up to 20x.
 */
export function calculateElectromagnetism(
  mode: ElectromagnetismMode,
  currentA: number,
  coilTurns: number,
  hasIronCore: boolean,
  compassDistancePx: number
): ElectromagnetismResult {
  const isZeroCurrent = Math.abs(currentA) < 0.05;
  const permeabilityMultiplier = hasIronCore ? 15 : 1;

  if (isZeroCurrent) {
    return {
      fieldStrengthRelative: 0,
      fieldDirectionAr: 'معدوم (لا يمر تيار كهربائي)',
      northPoleSideAr: 'لا يوجد قطب',
      compassAngleDeg: 0,
      permeabilityMultiplier: 1,
      rightHandRuleExplanationAr:
        'عند انقطاع التيار الكهربائي ينعدم المجال المغناطيسي فوراً وتعود إبرة البوصلة إلى وضع الاستقرار الجغرافي.',
    };
  }

  if (mode === 'oersted-wire') {
    // Concentric circles around wire
    const isClockwise = currentA > 0;
    const rawStrength = (Math.abs(currentA) * 100) / Math.max(20, compassDistancePx);
    const fieldStrengthRelative = Math.min(100, Math.round(rawStrength));
    const compassAngleDeg = isClockwise ? 90 : -90;

    const rightHandRuleExplanationAr =
      'قاعدة الكف اليمنى للسلك المستقيم: نقبض على السلك بالكف اليمنى بحيث يشير الإبهام إلى اتجاه التيار الكهربائي، فيكون اتجاه لَف الأصابع هو اتجاه خطوط المجال المغناطيسي الدائرية المتحدة المركز.';

    return {
      fieldStrengthRelative,
      fieldDirectionAr: isClockwise ? 'مع اتجاه عقارب الساعة' : 'عكس اتجاه عقارب الساعة',
      northPoleSideAr: 'حلقات مغناطيسية دائرية مغلقة حول السلك',
      compassAngleDeg,
      permeabilityMultiplier: 1,
      rightHandRuleExplanationAr,
    };
  }

  // Solenoid / Electromagnet Mode
  const rawStrength = (Math.abs(currentA) * coilTurns * permeabilityMultiplier) / 40;
  const fieldStrengthRelative = Math.min(100, Math.round(rawStrength));
  const isNorthRight = currentA > 0;
  const compassAngleDeg = isNorthRight ? 0 : 180;

  const rightHandRuleExplanationAr =
    'قاعدة الكف اليمنى للملف الحلزوني (المغناطيس الكهربائي): نلف أصابع الكف اليمنى حول الملف بحيث تدل على اتجاه التيار في اللفات، فيشير الإبهام المتعامد دائماً إلى اتجاه القطب الشمالي (N) للمغناطيس المتولد.';

  return {
    fieldStrengthRelative,
    fieldDirectionAr: isNorthRight ? 'من اليمين (N) نحو اليسار (S)' : 'من اليسار (N) نحو اليمين (S)',
    northPoleSideAr: isNorthRight ? 'الطرف الأيمن قطب شمالي (N)' : 'الطرف الأيسر قطب شمالي (N)',
    compassAngleDeg,
    permeabilityMultiplier,
    rightHandRuleExplanationAr,
  };
}
