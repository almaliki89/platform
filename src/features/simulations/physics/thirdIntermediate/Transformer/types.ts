export type TransformerType = 'step-up' | 'step-down' | 'isolation';

export interface TransformerState {
  primaryVoltageV1: number; // V
  primaryTurnsN1: number; // turns
  secondaryTurnsN2: number; // turns
  primaryCurrentI1: number; // A
  efficiencyPercent: number; // % (50% to 100%)
}

export interface TransformerResult {
  secondaryVoltageV2: number;
  secondaryCurrentI2: number;
  turnsRatio: number; // N2 / N1
  transformerType: TransformerType;
  transformerTypeAr: string;
  powerInW: number;
  powerOutW: number;
  powerLostW: number;
  formulaSummaryAr: string;
  explanationAr: string;
}
