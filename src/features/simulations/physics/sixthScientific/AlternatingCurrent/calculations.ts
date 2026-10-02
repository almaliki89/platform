import { SeriesRlcResult, PureComponentResult, PureComponentType } from './types';

/**
 * Solves a series RLC AC circuit:
 * XL = 2π f L
 * XC = 1 / (2π f C)
 * Z = √(R² + (XL - XC)²)
 * I_max = V_max / Z
 * tan(φ) = (XL - XC) / R
 * fr = 1 / (2π √(L C))
 */
export function calculateSeriesRlc(
  frequencyHz: number,
  voltagePeakV: number,
  resistanceOhm: number,
  inductanceH: number,
  capacitanceMicroF: number
): SeriesRlcResult {
  const safeFreq = Math.max(0.1, frequencyHz);
  const safeR = Math.max(0.5, resistanceOhm);
  const safeL = Math.max(1e-4, inductanceH);
  const safeC_F = Math.max(1e-9, capacitanceMicroF * 1e-6);

  const omega = 2 * Math.PI * safeFreq;
  const vRms = voltagePeakV / Math.SQRT2;

  const xl = omega * safeL;
  const xc = 1 / (omega * safeC_F);
  const netX = xl - xc;
  const z = Math.sqrt(Math.pow(safeR, 2) + Math.pow(netX, 2));

  const iPeak = voltagePeakV / z;
  const iRms = iPeak / Math.SQRT2;

  const phaseRad = Math.atan2(netX, safeR);
  const phaseDeg = (phaseRad * 180) / Math.PI;

  const powerFactor = safeR / z; // cos(φ)
  const realPower = iRms * vRms * powerFactor;
  const apparentPower = iRms * vRms;

  const fr = 1 / (2 * Math.PI * Math.sqrt(safeL * safeC_F));

  let nature = 'حالة رنين كهربائي (خواص مقاومة أومية صرفة)';
  if (phaseDeg > 1.0) {
    nature = 'خواص حثية (فولتية الدائرة تسبق التيار بزاوية φ+)';
  } else if (phaseDeg < -1.0) {
    nature = 'خواص سعوية (تيار الدائرة يسبق الفولتية بزاوية φ-)';
  }

  return {
    frequencyHz: safeFreq,
    omegaRad_s: omega,
    voltagePeakV,
    voltageRmsV: vRms,
    resistanceOhm: safeR,
    inductanceH: safeL,
    capacitanceMicroF,
    inductiveReactanceX_L: xl,
    capacitiveReactanceX_C: xc,
    netReactanceX: netX,
    impedanceZ: z,
    currentPeakA: iPeak,
    currentRmsA: iRms,
    phaseAngleRad: phaseRad,
    phaseAngleDeg: phaseDeg,
    powerFactor,
    realPowerWatts: realPower,
    apparentPowerVA: apparentPower,
    circuitNatureAr: nature,
    resonanceFrequencyHz: fr,
  };
}

/**
 * Pure AC components: R only, L only, C only
 */
export function calculatePureComponent(
  type: PureComponentType,
  frequencyHz: number,
  voltagePeakV: number,
  value: number // R in Ω, L in H, or C in μF
): PureComponentResult {
  const safeFreq = Math.max(0.1, frequencyHz);
  const omega = 2 * Math.PI * safeFreq;
  const vRms = voltagePeakV / Math.SQRT2;

  let opposition = 0;
  let phaseDeg = 0;
  let power = 0;

  if (type === 'resistor') {
    opposition = Math.max(0.5, value);
    phaseDeg = 0;
    const iRms = vRms / opposition;
    power = Math.pow(iRms, 2) * opposition;
    return {
      type,
      frequencyHz: safeFreq,
      voltageRmsV: vRms,
      currentRmsA: iRms,
      reactanceOrResistanceOhm: opposition,
      phaseShiftDeg: phaseDeg,
      powerDissipatedWatts: power,
    };
  } else if (type === 'inductor') {
    opposition = omega * Math.max(1e-4, value); // XL = ω L
    phaseDeg = 90; // V leads I by 90°
    const iRms = vRms / opposition;
    power = 0; // Pure inductor consumes no real power
    return {
      type,
      frequencyHz: safeFreq,
      voltageRmsV: vRms,
      currentRmsA: iRms,
      reactanceOrResistanceOhm: opposition,
      phaseShiftDeg: phaseDeg,
      powerDissipatedWatts: power,
    };
  } else {
    // Capacitor
    const cF = Math.max(1e-9, value * 1e-6);
    opposition = 1 / (omega * cF); // XC = 1 / (ω C)
    phaseDeg = -90; // I leads V by 90°
    const iRms = vRms / opposition;
    power = 0; // Pure capacitor consumes no real power
    return {
      type,
      frequencyHz: safeFreq,
      voltageRmsV: vRms,
      currentRmsA: iRms,
      reactanceOrResistanceOhm: opposition,
      phaseShiftDeg: phaseDeg,
      powerDissipatedWatts: power,
    };
  }
}
