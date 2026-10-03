import {
  PLANCK_H,
  SPEED_OF_LIGHT_C,
  ELEMENTARY_CHARGE_E,
  BOHR_GROUND_ENERGY_EV,
} from '../constants';
import {
  HydrogenSeries,
  HydrogenTransitionResult,
  XRayResult,
  LaserState,
} from './types';

/**
 * Calculates Bohr Hydrogen energy levels and spectral transitions:
 * E_n = -13.6 / n^2 eV
 * ΔE = E_i - E_f
 * λ = hc / ΔE
 */
export function calculateHydrogenTransition(
  nInitial: number,
  nFinal: number
): HydrogenTransitionResult {
  const ni = Math.max(2, nInitial);
  const nf = Math.max(1, Math.min(ni - 1, nFinal));

  const eInitialEv = BOHR_GROUND_ENERGY_EV / (ni * ni);
  const eFinalEv = BOHR_GROUND_ENERGY_EV / (nf * nf);
  const deltaEEv = eInitialEv - eFinalEv; // Positive for emission
  const deltaEJoules = deltaEEv * ELEMENTARY_CHARGE_E;

  const frequencyHz = deltaEJoules / PLANCK_H;
  const wavelengthM = (SPEED_OF_LIGHT_C * PLANCK_H) / deltaEJoules;
  const wavelengthNm = wavelengthM * 1e9;

  let seriesNameAr = '';
  let spectralRegionAr = '';
  let colorHex = '#60a5fa';

  if (nf === 1) {
    seriesNameAr = 'سلسلة لايمان (Lyman Series)';
    spectralRegionAr = 'المنطقة فوق البنفسجية (UV)';
    colorHex = '#a855f7';
  } else if (nf === 2) {
    seriesNameAr = 'سلسلة بالمر (Balmer Series)';
    spectralRegionAr = 'المنطقة المرئية (Visible Light)';
    // Colors for Balmer lines
    if (ni === 3) colorHex = '#ef4444'; // H-alpha 656.3 nm Red
    else if (ni === 4) colorHex = '#06b6d4'; // H-beta 486.1 nm Cyan
    else if (ni === 5) colorHex = '#3b82f6'; // H-gamma 434 nm Blue
    else colorHex = '#8b5cf6'; // H-delta 410 nm Violet
  } else if (nf === 3) {
    seriesNameAr = 'سلسلة باشن (Paschen Series)';
    spectralRegionAr = 'المنطقة تحت الحمراء القريبة (Near IR)';
    colorHex = '#f87171';
  } else if (nf === 4) {
    seriesNameAr = 'سلسلة براكت (Brackett Series)';
    spectralRegionAr = 'المنطقة تحت الحمراء المتوسطة (Mid IR)';
    colorHex = '#dc2626';
  } else {
    seriesNameAr = 'سلسلة فوند (Pfund Series)';
    spectralRegionAr = 'المنطقة تحت الحمراء البعيدة (Far IR)';
    colorHex = '#b91c1c';
  }

  return {
    nInitial: ni,
    nFinal: nf,
    eInitialEv,
    eFinalEv,
    deltaEEv,
    deltaEJoules,
    frequencyHz,
    wavelengthNm,
    spectralRegionAr,
    seriesNameAr,
    colorHex,
  };
}

/**
 * Calculates continuous and characteristic X-ray spectrum:
 * λ_min = hc / (e * V)
 * f_max = (e * V) / h
 */
export function calculateXRay(
  acceleratingVoltageKv: number,
  targetMaterial: 'tungsten' | 'molybdenum' | 'copper'
): XRayResult {
  const voltageV = Math.max(1, acceleratingVoltageKv) * 1000;
  const maxEnergyJoules = ELEMENTARY_CHARGE_E * voltageV;
  const maxPhotonEnergyKev = acceleratingVoltageKv;

  const maxFrequencyHz = maxEnergyJoules / PLANCK_H;
  const minWavelengthM = (PLANCK_H * SPEED_OF_LIGHT_C) / maxEnergyJoules;
  const minWavelengthNm = minWavelengthM * 1e9;

  let characteristicKAlphaNm = 0.0213;
  let characteristicKBetaNm = 0.0185;

  if (targetMaterial === 'molybdenum') {
    characteristicKAlphaNm = 0.071;
    characteristicKBetaNm = 0.063;
  } else if (targetMaterial === 'copper') {
    characteristicKAlphaNm = 0.154;
    characteristicKBetaNm = 0.139;
  }

  return {
    acceleratingVoltageKv,
    minWavelengthNm,
    maxFrequencyHz,
    maxPhotonEnergyKev,
    targetMaterial,
    characteristicKAlphaNm,
    characteristicKBetaNm,
  };
}

/**
 * Calculates Laser population dynamics:
 * Population inversion condition: N_upper > N_lower
 */
export function calculateLaserState(
  systemType: '3-level' | '4-level',
  pumpIntensity: number
): LaserState {
  const pumpFrac = Math.min(1, Math.max(0, pumpIntensity / 100));

  if (systemType === '3-level') {
    // 3-level system: Ruby laser (harder to invert, needs > 50% pump)
    const n3 = pumpFrac * 65; // Metastable level
    const n1 = Math.max(5, 100 - n3); // Ground level
    const isPopulationInverted = n3 > n1;
    const laserOutputPowerMw = isPopulationInverted ? (n3 - n1) * 12 : 0;

    return {
      systemType,
      pumpIntensity,
      populationN1: n1,
      populationN2: 0,
      populationN3: n3,
      isPopulationInverted,
      stimulatedEmissionRate: isPopulationInverted ? (n3 - n1) * 0.8 : 0,
      laserOutputPowerMw,
    };
  } else {
    // 4-level system: Nd:YAG / He-Ne (easier to invert, N2 is rapidly emptied)
    const n3 = pumpFrac * 70; // Upper lasing level
    const n2 = Math.max(2, 10 * (1 - pumpFrac)); // Lower lasing level (fast decay to N1)
    const n1 = 100 - n3 - n2;
    const isPopulationInverted = n3 > n2;
    const laserOutputPowerMw = isPopulationInverted ? (n3 - n2) * 18 : 0;

    return {
      systemType,
      pumpIntensity,
      populationN1: n1,
      populationN2: n2,
      populationN3: n3,
      isPopulationInverted,
      stimulatedEmissionRate: isPopulationInverted ? (n3 - n2) * 0.95 : 0,
      laserOutputPowerMw,
    };
  }
}
