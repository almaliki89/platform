export type EnergySourceType = 'solar' | 'wind' | 'hydro' | 'fossil' | 'biomass';

export interface EnergySourceInfo {
  id: EnergySourceType;
  titleAr: string;
  categoryAr: 'متجددة (نظيفة)' | 'غير متجددة (أحفورية)';
  isRenewable: boolean;
  conversionChainAr: string[];
  dependabilityAr: string;
  environmentalImpactAr: string;
  sustainabilityRating: number; // 1 to 5 stars
  formulaNoteAr: string;
}

export interface EnergySourceResult {
  outputPowerKW: number;
  outputPowerMW: number;
  dailyEnergyMWh: number;
  annualCO2AvoidedTons: number;
  efficiencyPercent: number;
  statusDescriptionAr: string;
}
