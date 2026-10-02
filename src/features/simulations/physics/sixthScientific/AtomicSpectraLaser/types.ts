export type AtomicSpectraMode = 'bohr-hydrogen' | 'x-rays' | 'laser-principle';

export type HydrogenSeries = 'lyman' | 'balmer' | 'paschen' | 'brackett' | 'pfund';

export interface HydrogenTransitionResult {
  nInitial: number;
  nFinal: number;
  eInitialEv: number;
  eFinalEv: number;
  deltaEEv: number; // in eV
  deltaEJoules: number;
  frequencyHz: number;
  wavelengthNm: number;
  spectralRegionAr: string; // فوق البنفسجية / مرئي / تحت الحمراء
  seriesNameAr: string;
  colorHex: string;
}

export interface XRayResult {
  acceleratingVoltageKv: number; // kV
  minWavelengthNm: number; // λ_min = hc / (e*V)
  maxFrequencyHz: number;
  maxPhotonEnergyKev: number;
  targetMaterial: 'tungsten' | 'molybdenum' | 'copper';
  characteristicKAlphaNm: number;
  characteristicKBetaNm: number;
}

export interface LaserState {
  systemType: '3-level' | '4-level';
  pumpIntensity: number; // 0 to 100%
  populationN1: number; // Ground state population
  populationN2: number; // Lower lasing / intermediate
  populationN3: number; // Metastable / upper lasing level
  populationN4?: number; // Pump level
  isPopulationInverted: boolean; // N3 > N2 or N3 > N1
  stimulatedEmissionRate: number;
  laserOutputPowerMw: number;
}
