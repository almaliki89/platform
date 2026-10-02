export type RefractionMode = 'snell-law' | 'critical-angle' | 'optical-fiber';

export interface OpticalMedium {
  id: string;
  nameAr: string;
  nameEn: string;
  refractiveIndex: number; // n
  colorTintRgba: string;
}

export interface RefractionResult {
  thetaIncidentDeg: number;
  thetaReflectedDeg: number;
  thetaRefractedDeg: number | null; // null if Total Internal Reflection
  isTotalInternalReflection: boolean;
  criticalAngleDeg: number | null; // null if n1 <= n2
  speedMedium1Km_s: number;
  speedMedium2Km_s: number;
  wavelengthRatio: number; // lambda2 / lambda1 = n1 / n2
}
