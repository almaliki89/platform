export interface ThermalMaterial {
  id: string;
  nameAr: string;
  nameEn: string;
  linearCoeff: number; // 1/°C
  color: string;
  descriptionAr: string;
}

export interface ExpansionResult {
  deltaL_m: number;
  deltaL_mm: number;
  finalLength_m: number;
  percentageExpansion: number;
}
