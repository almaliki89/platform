import { ThermalMaterial, ExpansionResult } from './types';

export const THERMAL_MATERIALS: ThermalMaterial[] = [
  {
    id: 'aluminum',
    nameAr: 'الألمنيوم',
    nameEn: 'Aluminum',
    linearCoeff: 23e-6,
    color: '#94a3b8',
    descriptionAr: 'معامل تمدد طولي عالي (يتمدد بمقدار ملحوظ عند التسخين).',
  },
  {
    id: 'copper',
    nameAr: 'النحاس',
    nameEn: 'Copper',
    linearCoeff: 17e-6,
    color: '#f97316',
    descriptionAr: 'معامل تمدد متوسط وموصل ممتاز للحرارة.',
  },
  {
    id: 'iron',
    nameAr: 'الحديد والصلب',
    nameEn: 'Iron / Steel',
    linearCoeff: 12e-6,
    color: '#64748b',
    descriptionAr: 'معامل تمدد معتدل، وتترك فواصل تمدد بين سكك القطار لتفادي تقوسها.',
  },
  {
    id: 'pyrex',
    nameAr: 'زجاج بايركس',
    nameEn: 'Pyrex Glass',
    linearCoeff: 3e-6,
    color: '#38bdf8',
    descriptionAr: 'تمدد ضئيل جداً مما يجعله مقاوماً للكسر بالصدمات الحرارية.',
  },
];

/**
 * Pure calculation for linear thermal expansion:
 * Delta L = alpha * L_0 * Delta T
 */
export function calculateLinearExpansion(
  initialLengthM: number,
  tempC: number,
  refTempC: number = 20,
  linearCoeff: number = 17e-6
): ExpansionResult {
  const deltaT = tempC - refTempC;
  const deltaL_m = linearCoeff * initialLengthM * deltaT;
  const deltaL_mm = deltaL_m * 1000;
  const finalLength_m = initialLengthM + deltaL_m;
  const percentageExpansion = (deltaL_m / initialLengthM) * 100;

  return {
    deltaL_m,
    deltaL_mm,
    finalLength_m,
    percentageExpansion,
  };
}
