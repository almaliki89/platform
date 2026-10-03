export type ThermalMode = 'calorimetry' | 'phase-change' | 'ideal-gas';

export interface SubstancePreset {
  id: string;
  nameAr: string;
  nameEn: string;
  specificHeatJ_kgK: number; // c in J/(kg·K) or J/(kg·°C)
  densityKg_m3?: number;
  meltingPointC?: number;
  latentHeatFusionJ_kg?: number;
}

export interface CalorimetryResult {
  finalEquilibriumTempC: number;
  heatExchangedJ: number;
  tempChangeWaterC: number;
  tempChangeSubstanceC: number;
  isBoiling: boolean;
  isFreezing: boolean;
}

export interface PhaseChangeResult {
  currentTempC: number;
  currentPhaseAr: string;
  totalEnergySuppliedJ: number;
  energyToReach0C: number;
  energyToMelt: number;
  energyToReach100C: number;
  energyToVaporize: number;
  stateFraction: number; // 0 to 1 during phase change
}

export interface GasLawResult {
  pressureKPa: number;
  volumeLiters: number;
  temperatureK: number;
  temperatureC: number;
  moles: number;
}
