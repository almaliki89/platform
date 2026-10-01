import { WaveCalculations, WaveType } from './types';

/**
 * Pure physics calculations for wave motion and sound:
 * v = f * lambda
 * T = 1 / f
 */
export function calculateWaveProperties(
  frequencyHz: number,
  wavelengthM: number,
  amplitudeCm: number
): WaveCalculations {
  const safeFreq = Math.max(0.1, frequencyHz);
  const safeLambda = Math.max(0.1, wavelengthM);

  const waveSpeed = safeFreq * safeLambda;
  const period = 1 / safeFreq;

  let soundPitchAr = 'صوت غليظ (تردد منخفض)';
  if (safeFreq > 12) {
    soundPitchAr = 'صوت حاد رفيع (تردد مرتفع)';
  } else if (safeFreq > 6) {
    soundPitchAr = 'صوت متوسط الطبقة';
  }

  let soundLoudnessAr = 'شدة صوت خافتة';
  if (amplitudeCm > 3.5) {
    soundLoudnessAr = 'شدة صوت عالية جداً (طاقة اهتزاز كبيرة)';
  } else if (amplitudeCm > 1.8) {
    soundLoudnessAr = 'شدة صوت مسموعة ومعتدلة';
  }

  return {
    waveSpeed,
    period,
    frequency: safeFreq,
    wavelength: safeLambda,
    amplitudeCm,
    soundPitchAr,
    soundLoudnessAr,
  };
}
