export type MechanicalMode = 'spring' | 'wire';

export interface MaterialElasticity {
  id: string;
  nameAr: string;
  nameEn: string;
  youngModulusPa: number; // N/m²
  elasticLimitStressPa: number; // Yield strength
  typicalDensityKg_m3: number;
  color: string;
}

export interface MechanicalPropertiesState {
  mode: MechanicalMode;
  appliedForceN: number;
  springConstantK: number; // N/m (for spring mode)
  originalLengthM: number; // L0 (for wire mode)
  crossSectionAreaMm2: number; // A in mm²
  materialId: string;
}

export interface MechanicalPropertiesResult {
  extensionM: number;
  extensionMm: number;
  stressPa: number;
  stressMPa: number;
  strain: number; // dimensionless (ΔL / L0)
  strainPercent: number;
  youngModulusPa: number;
  isWithinElasticLimit: boolean;
  elasticStateAr: string;
  statusExplanationAr: string;
}
