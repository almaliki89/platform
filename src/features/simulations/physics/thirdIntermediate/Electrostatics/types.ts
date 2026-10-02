export type ChargingMethod = 'friction' | 'contact' | 'induction' | 'coulomb-law';

export interface CoulombState {
  q1MicroC: number; // in microcoulombs
  q2MicroC: number; // in microcoulombs
  distanceM: number; // in meters (0.02m to 0.50m)
  visualizationMode: 'vectors' | 'field-lines';
}

export interface CoulombResult {
  forceN: number;
  isRepulsive: boolean;
  isAttractive: boolean;
  isZero: boolean;
  descriptionAr: string;
  fieldAtMidpointN_C: number;
}

export interface ChargingMethodInfo {
  id: ChargingMethod;
  titleAr: string;
  subtitleAr: string;
  stepDescriptionAr: string;
  chargeCarrierAr: string;
  finalStateAr: string;
}
