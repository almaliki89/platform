export type AcMode = 'series-rlc' | 'resonance' | 'pure-components' | 'wave-explorer';

export type PureComponentType = 'resistor' | 'inductor' | 'capacitor';

export interface SeriesRlcResult {
  frequencyHz: number;
  omegaRad_s: number; // ω = 2π f
  voltagePeakV: number;
  voltageRmsV: number;
  resistanceOhm: number;
  inductanceH: number;
  capacitanceMicroF: number;
  inductiveReactanceX_L: number; // XL = ω L
  capacitiveReactanceX_C: number; // XC = 1 / (ω C)
  netReactanceX: number; // X = XL - XC
  impedanceZ: number; // Z = √(R^2 + (XL - XC)^2)
  currentPeakA: number; // Imax = Vmax / Z
  currentRmsA: number; // Irms = Imax / √2
  phaseAngleRad: number; // φ = atan2(XL - XC, R)
  phaseAngleDeg: number;
  powerFactor: number; // pf = cos(φ) = R / Z
  realPowerWatts: number; // Preal = Irms * Vrms * cos(φ)
  apparentPowerVA: number; // Papp = Irms * Vrms
  circuitNatureAr: string; // حثية / سعوية / مقاومة صرفة (رنين)
  resonanceFrequencyHz: number; // fr = 1 / (2π √(LC))
}

export interface PureComponentResult {
  type: PureComponentType;
  frequencyHz: number;
  voltageRmsV: number;
  currentRmsA: number;
  reactanceOrResistanceOhm: number;
  phaseShiftDeg: number; // 0 for R, +90 for L (V leads I), -90 for C (I leads V)
  powerDissipatedWatts: number;
}
