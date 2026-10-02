import { OpticalMedium, RefractionResult } from './types';

export const SPEED_OF_LIGHT_VACUUM_KM_S = 299792; // km/s

export const OPTICAL_MEDIA: OpticalMedium[] = [
  {
    id: 'air',
    nameAr: 'الهواء (Air)',
    nameEn: 'Air',
    refractiveIndex: 1.0,
    colorTintRgba: 'rgba(255, 255, 255, 0.02)',
  },
  {
    id: 'water',
    nameAr: 'الماء (Water)',
    nameEn: 'Water',
    refractiveIndex: 1.333,
    colorTintRgba: 'rgba(56, 189, 248, 0.15)',
  },
  {
    id: 'perspex',
    nameAr: 'البرسبكس / الأكريليك (Acrylic)',
    nameEn: 'Acrylic',
    refractiveIndex: 1.49,
    colorTintRgba: 'rgba(168, 85, 247, 0.15)',
  },
  {
    id: 'crown-glass',
    nameAr: 'زجاج كراون (Crown Glass)',
    nameEn: 'Crown Glass',
    refractiveIndex: 1.52,
    colorTintRgba: 'rgba(52, 211, 153, 0.15)',
  },
  {
    id: 'flint-glass',
    nameAr: 'زجاج فلنت كثيف (Flint Glass)',
    nameEn: 'Flint Glass',
    refractiveIndex: 1.66,
    colorTintRgba: 'rgba(251, 191, 36, 0.15)',
  },
  {
    id: 'diamond',
    nameAr: 'الماس (Diamond)',
    nameEn: 'Diamond',
    refractiveIndex: 2.42,
    colorTintRgba: 'rgba(244, 63, 94, 0.15)',
  },
];

/**
 * Pure calculation for Snell's Law and Total Internal Reflection:
 * n1 * sin(theta1) = n2 * sin(theta2)
 */
export function calculateRefraction(
  n1: number,
  n2: number,
  thetaIncidentDeg: number
): RefractionResult {
  const safeN1 = Math.max(1e-4, n1);
  const safeN2 = Math.max(1e-4, n2);
  const theta1Clamped = Math.max(0, Math.min(89.9, thetaIncidentDeg));
  const theta1Rad = (theta1Clamped * Math.PI) / 180;

  const sinTheta1 = Math.sin(theta1Rad);
  const sinTheta2 = (safeN1 / safeN2) * sinTheta1;

  let criticalAngleDeg: number | null = null;
  if (safeN1 > safeN2) {
    const criticalRad = Math.asin(Math.min(1.0, safeN2 / safeN1));
    criticalAngleDeg = (criticalRad * 180) / Math.PI;
  }

  let isTotalInternalReflection = false;
  let thetaRefractedDeg: number | null = null;

  if (sinTheta2 > 1.0) {
    isTotalInternalReflection = true;
    thetaRefractedDeg = null;
  } else {
    const theta2Rad = Math.asin(Math.max(-1.0, Math.min(1.0, sinTheta2)));
    thetaRefractedDeg = (theta2Rad * 180) / Math.PI;
  }

  const speedMedium1Km_s = SPEED_OF_LIGHT_VACUUM_KM_S / safeN1;
  const speedMedium2Km_s = SPEED_OF_LIGHT_VACUUM_KM_S / safeN2;
  const wavelengthRatio = safeN1 / safeN2;

  return {
    thetaIncidentDeg: theta1Clamped,
    thetaReflectedDeg: theta1Clamped, // Angle of incidence = angle of reflection
    thetaRefractedDeg,
    isTotalInternalReflection,
    criticalAngleDeg,
    speedMedium1Km_s,
    speedMedium2Km_s,
    wavelengthRatio,
  };
}
