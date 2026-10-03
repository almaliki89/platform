export type ElectronicsMode = 'energy-bands' | 'doping' | 'pn-junction' | 'diode-bias';

export type MaterialType = 'silicon' | 'germanium' | 'copper' | 'glass';

export type DopingType = 'intrinsic' | 'n-type' | 'p-type';

export type BiasType = 'forward' | 'reverse' | 'unbiased';

export interface EnergyBandResult {
  material: MaterialType;
  materialNameAr: string;
  valenceBandFilled: boolean;
  energyGapEv: number; // Eg in eV
  conductionBandOccupancy: string;
  classificationAr: string; // موصل / شبه موصل / عازل
}

export interface DopingResult {
  dopingType: DopingType;
  baseMaterial: 'silicon' | 'germanium';
  impurityNameAr: string;
  dopantValence: number; // 5 for n-type donor, 3 for p-type acceptor
  majorityCarriersAr: string; // إلكترونات / فجوات
  minorityCarriersAr: string;
  extraEnergyLevelAr: string; // مستوى مانح / مستوى قابل
}

export interface PnJunctionResult {
  baseSemiconductor: 'silicon' | 'germanium';
  barrierPotentialV0: number; // 0.7V for Si, 0.3V for Ge
  biasType: BiasType;
  appliedVoltageV: number;
  depletionWidthMicrons: number;
  netCurrentMa: number;
  conductionStateAr: string;
}
