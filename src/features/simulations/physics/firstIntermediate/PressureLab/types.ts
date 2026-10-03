export interface PressurePreset {
  id: string;
  nameAr: string;
  descriptionAr: string;
  defaultForce: number; // N
  defaultArea: number; // m^2
}

export interface PressureResult {
  pressurePa: number;
  pressureKPa: number;
  effectDescriptionAr: string;
  relativePenetration: number; // 0 to 1
}
