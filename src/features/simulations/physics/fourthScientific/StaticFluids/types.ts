export type StaticFluidsMode = 'hydrostatic-pressure' | 'pascal-press' | 'archimedes';

export interface FluidTypeInfo {
  id: string;
  nameAr: string;
  densityKg_m3: number;
  color: string;
}

export interface HydrostaticResult {
  gaugePressurePa: number;
  gaugePressureKPa: number;
  totalPressureKPa: number;
  depthM: number;
  densityKg_m3: number;
  formulaNoteAr: string;
}

export interface PascalResult {
  inputForceN: number;
  outputForceN: number;
  area1Cm2: number;
  area2Cm2: number;
  mechanicalAdvantage: number;
  pressurePa: number;
  formulaNoteAr: string;
}

export interface ArchimedesResult {
  buoyantForceN: number;
  objectWeightN: number;
  netForceN: number;
  state: 'floating' | 'submerged-neutral' | 'sinking';
  stateAr: string;
  submergedFraction: number; // 0 to 1
  displacedVolumeM3: number;
  explanationAr: string;
}
