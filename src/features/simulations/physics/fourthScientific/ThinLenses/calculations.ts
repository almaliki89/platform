import { LensType, LensCalculationResult } from './types';

/**
 * Pure calculation for thin lenses:
 * 1/f = 1/u + 1/v => v = (f * u) / (u - f)
 * M = -v / u = h_i / h_o
 * Power (Diopters) = 1 / f(m) = 100 / f(cm)
 */
export function calculateThinLensOptics(
  lensType: LensType,
  focalLengthCm: number,
  objectDistanceCm: number,
  objectHeightCm: number
): LensCalculationResult {
  const u = Math.max(1, objectDistanceCm);
  const ho = Math.max(1, objectHeightCm);

  const fAbs = Math.max(5, Math.abs(focalLengthCm));
  const f = lensType === 'converging' ? fAbs : -fAbs;
  const powerDiopter = 100 / f;

  // Handle object exactly at focal point (u === f for converging)
  if (lensType === 'converging' && Math.abs(u - f) < 0.2) {
    return {
      lensType,
      focalLengthCm: f,
      powerDiopter,
      objectDistanceCm: u,
      objectHeightCm: ho,
      imageDistanceCm: 9999,
      imageHeightCm: 9999,
      magnification: 999,
      isReal: true,
      isInverted: true,
      imageNatureAr: 'الجسم في البؤرة تماماً: تتكون الصورة في المالانهاية (أشعة منكسرة متوازية)',
    };
  }

  const v = (f * u) / (u - f);
  const M = -v / u;
  const hi = M * ho;

  const isReal = v > 0;
  const isInverted = M < 0;

  let sizeText = 'مساوية للجسم';
  if (Math.abs(M) > 1.05) sizeText = 'مكبرة';
  else if (Math.abs(M) < 0.95) sizeText = 'مصغرة';

  const realText = isReal ? 'حقيقية (الجهة الأخرى من العدسة)' : 'خيالية / تقديرية (في نفس جهة الجسم)';
  const invText = isInverted ? 'مقلوبة' : 'معتدلة';

  const imageNatureAr = `${realText}، ${invText}، ${sizeText} (التكبير = ${Math.abs(M).toFixed(2)}x)`;

  return {
    lensType,
    focalLengthCm: f,
    powerDiopter,
    objectDistanceCm: u,
    objectHeightCm: ho,
    imageDistanceCm: v,
    imageHeightCm: hi,
    magnification: M,
    isReal,
    isInverted,
    imageNatureAr,
  };
}
