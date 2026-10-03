import { TransformerResult, TransformerType } from './types';

/**
 * Pure calculation for Electric Transformer:
 * V2 = V1 * (N2 / N1)
 * P_in = V1 * I1
 * P_out = P_in * (efficiency / 100)
 * I2 = P_out / V2 (if V2 > 0)
 */
export function calculateTransformer(
  primaryVoltageV1: number,
  primaryTurnsN1: number,
  secondaryTurnsN2: number,
  primaryCurrentI1: number,
  efficiencyPercent: number
): TransformerResult {
  const safeV1 = Math.max(0, primaryVoltageV1);
  const safeN1 = Math.max(1, primaryTurnsN1);
  const safeN2 = Math.max(1, secondaryTurnsN2);
  const safeI1 = Math.max(0, primaryCurrentI1);
  const safeEta = Math.min(100, Math.max(10, efficiencyPercent));

  const turnsRatio = safeN2 / safeN1;
  const secondaryVoltageV2 = safeV1 * turnsRatio;
  const powerInW = safeV1 * safeI1;
  const powerOutW = powerInW * (safeEta / 100);
  const powerLostW = Math.max(0, powerInW - powerOutW);

  const secondaryCurrentI2 = secondaryVoltageV2 > 0 ? powerOutW / secondaryVoltageV2 : 0;

  let transformerType: TransformerType = 'isolation';
  let transformerTypeAr = 'محولة عازلة (Isolation Transformer)';
  let explanationAr = '';

  if (safeN2 > safeN1) {
    transformerType = 'step-up';
    transformerTypeAr = 'محولة رافعة للفولتية (Step-up Transformer)';
    explanationAr = `محولة رافعة: عدد لفات الملف الثانوي (${safeN2}) أكبر من عدد لفات الملف الابتدائي (${safeN1}). بالتالي الفولتية الثانوية V₂ = ${secondaryVoltageV2.toFixed(1)} V أكبر من الابتدائية V₁ = ${safeV1} V، بينما يقل التيار الثانوي I₂ = ${secondaryCurrentI2.toFixed(2)} A (رافع للفولتية، خافض للتيار).`;
  } else if (safeN2 < safeN1) {
    transformerType = 'step-down';
    transformerTypeAr = 'محولة خافضة للفولتية (Step-down Transformer)';
    explanationAr = `محولة خافضة: عدد لفات الملف الثانوي (${safeN2}) أقل من عدد لفات الملف الابتدائي (${safeN1}). بالتالي الفولتية الثانوية V₂ = ${secondaryVoltageV2.toFixed(1)} V أقل من الابتدائية V₁ = ${safeV1} V، بينما يزداد التيار الثانوي I₂ = ${secondaryCurrentI2.toFixed(2)} A (خافض للفولتية، رافع للتيار كشاحن الموبايل).`;
  } else {
    transformerType = 'isolation';
    transformerTypeAr = 'محولة عازلة (N₁ = N₂)';
    explanationAr = `محولة عازلة: عدد لفات الملفين متساوٍ (N₂ = N₁)، وبالتالي V₂ = V₁ = ${safeV1} V. تُستخدم لعزل الدوائر الكهربائية لحماية الأجهزة والأشخاص.`;
  }

  const formulaSummaryAr = 'V₂ / V₁ = N₂ / N₁ | η = (P_out / P_in) × 100%';

  return {
    secondaryVoltageV2,
    secondaryCurrentI2,
    turnsRatio,
    transformerType,
    transformerTypeAr,
    powerInW,
    powerOutW,
    powerLostW,
    formulaSummaryAr,
    explanationAr,
  };
}
