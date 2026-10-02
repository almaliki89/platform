import { MirrorType, MirrorCalculationResult } from './types';

/**
 * Pure calculation for spherical and plane mirrors:
 * 1/f = 1/u + 1/v => v = (f * u) / (u - f)
 * M = -v / u = h_i / h_o
 */
export function calculateMirrorOptics(
  mirrorType: MirrorType,
  focalLengthCm: number,
  objectDistanceCm: number,
  objectHeightCm: number
): MirrorCalculationResult {
  const u = Math.max(1, objectDistanceCm);
  const ho = Math.max(1, objectHeightCm);

  if (mirrorType === 'flat') {
    return {
      mirrorType,
      focalLengthCm: Infinity,
      radiusCurvatureCm: Infinity,
      objectDistanceCm: u,
      objectHeightCm: ho,
      imageDistanceCm: -u,
      imageHeightCm: ho,
      magnification: 1.0,
      isReal: false,
      isInverted: false,
      imageNatureAr: 'خيالية (تقديرية)، معتدلة، مساوية للجسم في الحجم، تقع خلف المرآة بنفس البعد',
    };
  }

  const fAbs = Math.max(5, Math.abs(focalLengthCm));
  const f = mirrorType === 'concave' ? fAbs : -fAbs;
  const r = 2 * f;

  // Handle object at focal point (u === f)
  if (Math.abs(u - f) < 0.2) {
    return {
      mirrorType,
      focalLengthCm: f,
      radiusCurvatureCm: r,
      objectDistanceCm: u,
      objectHeightCm: ho,
      imageDistanceCm: 9999,
      imageHeightCm: 9999,
      magnification: 999,
      isReal: true,
      isInverted: true,
      imageNatureAr: 'الجسم في البؤرة تماماً: تتكون الصورة في المالانهاية (أشعة منعكسة متوازية)',
    };
  }

  const v = (f * u) / (u - f);
  const M = -v / u;
  const hi = M * ho;

  const isReal = v > 0;
  const isInverted = M < 0;

  // Nature description in Arabic
  let sizeText = 'مساوية للجسم';
  if (Math.abs(M) > 1.05) sizeText = 'مكبرة';
  else if (Math.abs(M) < 0.95) sizeText = 'مصغرة';

  const realText = isReal ? 'حقيقية (أمام المرآة)' : 'خيالية / تقديرية (خلف المرآة)';
  const invText = isInverted ? 'مقلوبة' : 'معتدلة';

  const imageNatureAr = `${realText}، ${invText}، ${sizeText} (التكبير = ${Math.abs(M).toFixed(2)}x)`;

  return {
    mirrorType,
    focalLengthCm: f,
    radiusCurvatureCm: r,
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
