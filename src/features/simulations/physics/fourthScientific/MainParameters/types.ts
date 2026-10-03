export type MainParametersMode = 'units' | 'dimensions' | 'error-analysis';

export interface BaseUnitInfo {
  quantityAr: string;
  quantityEn: string;
  symbol: string;
  unitAr: string;
  unitEn: string;
  unitSymbol: string;
  dimensionSymbol: string;
  standardDefinitionAr: string;
}

export interface DimensionalEquation {
  id: string;
  nameAr: string;
  formulaTex: string;
  lhsDimension: string;
  rhsDimension: string;
  isDimensionallyConsistent: boolean;
  stepExplanationAr: string;
}

export interface MeasurementErrorResult {
  measuredValue: number;
  acceptedValue: number;
  absoluteError: number;
  relativeError: number;
  percentageError: number;
  accuracyGradeAr: string;
  explanationAr: string;
}
