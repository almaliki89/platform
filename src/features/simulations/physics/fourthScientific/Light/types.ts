export type LightMode = 'inverse-square' | 'photometer' | 'lamp-comparison';

export interface LampPreset {
  id: string;
  nameAr: string;
  nameEn: string;
  luminousIntensityCd: number; // candela (cd)
  luminousFluxLm: number; // lumen (lm) = 4 * pi * I (for isotropic)
  powerWatts: number;
  efficacyLm_W: number;
}

export interface PhotometryResult {
  luminousIntensityCd: number;
  luminousFluxLm: number;
  distanceM: number;
  incidenceAngleDeg: number;
  illuminanceLux: number; // E = I * cos(theta) / r^2
  recommendedEnvironmentAr: string;
}

export interface InverseSquarePoint {
  distanceMultiplier: number;
  areaMultiplier: number;
  relativeIlluminance: number; // 1, 1/4, 1/9, 1/16
}
