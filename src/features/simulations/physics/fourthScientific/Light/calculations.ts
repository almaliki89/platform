import { LampPreset, PhotometryResult, InverseSquarePoint } from './types';

export const LAMP_PRESETS: LampPreset[] = [
  {
    id: 'candle',
    nameAr: 'شمعة قياسية (Standard Candle)',
    nameEn: 'Standard Candle',
    luminousIntensityCd: 1.0,
    luminousFluxLm: 12.57,
    powerWatts: 80,
    efficacyLm_W: 0.16,
  },
  {
    id: 'incandescent-60w',
    nameAr: 'مصباح توهج 60 واط (Incandescent Bulb)',
    nameEn: '60W Incandescent',
    luminousIntensityCd: 65,
    luminousFluxLm: 817,
    powerWatts: 60,
    efficacyLm_W: 13.6,
  },
  {
    id: 'led-10w',
    nameAr: 'مصباح ليد اقتصادي 10 واط (LED 10W)',
    nameEn: '10W LED Bulb',
    luminousIntensityCd: 85,
    luminousFluxLm: 1068,
    powerWatts: 10,
    efficacyLm_W: 106.8,
  },
  {
    id: 'halogen-500w',
    nameAr: 'كشاف هالوجين قوي 500 واط (Halogen Floodlight)',
    nameEn: '500W Halogen',
    luminousIntensityCd: 750,
    luminousFluxLm: 9425,
    powerWatts: 500,
    efficacyLm_W: 18.8,
  },
];

export function getRecommendedEnvironment(lux: number): string {
  if (lux < 20) return 'إضاءة خافتة جداً (ممرات مظلمة)';
  if (lux < 100) return 'إضاءة ممرات ومخازن';
  if (lux < 300) return 'إضاءة عامة لغرفة المعيشة أو الفصول الدراسية';
  if (lux < 750) return 'إضاءة مثالية للمكتب والقراءة المركزة والمختبر';
  if (lux < 2000) return 'إضاءة غرف العمليات والمهام الدقيقة جداً';
  return 'إضاءة شديدة جداً شبيهة بنور الشمس الساطع المباشر';
}

/**
 * Calculates illuminance E = I * cos(theta) / r^2
 * Distance clamped to minimum 0.1 m to prevent division by zero.
 */
export function calculateIlluminance(
  intensityCd: number,
  distanceM: number,
  angleDeg: number = 0
): PhotometryResult {
  const r = Math.max(0.1, distanceM);
  const I = Math.max(0.1, intensityCd);
  const rad = (Math.max(0, Math.min(85, angleDeg)) * Math.PI) / 180;

  const fluxLm = 4 * Math.PI * I;
  const illuminanceLux = (I * Math.cos(rad)) / (r * r);

  return {
    luminousIntensityCd: I,
    luminousFluxLm: fluxLm,
    distanceM: r,
    incidenceAngleDeg: angleDeg,
    illuminanceLux,
    recommendedEnvironmentAr: getRecommendedEnvironment(illuminanceLux),
  };
}

export function getInverseSquarePoints(): InverseSquarePoint[] {
  return [
    { distanceMultiplier: 1, areaMultiplier: 1, relativeIlluminance: 1.0 },
    { distanceMultiplier: 2, areaMultiplier: 4, relativeIlluminance: 0.25 },
    { distanceMultiplier: 3, areaMultiplier: 9, relativeIlluminance: 1 / 9 },
    { distanceMultiplier: 4, areaMultiplier: 16, relativeIlluminance: 1 / 16 },
  ];
}
