import {
  PLANCK_H,
  SPEED_OF_LIGHT_C,
  ELEMENTARY_CHARGE_E,
  ELECTRON_MASS_KG,
} from '../constants';
import {
  WorkFunctionPreset,
  PhotoelectricResult,
  DeBroglieResult,
  UncertaintyResult,
} from './types';

export const WORK_FUNCTION_PRESETS: WorkFunctionPreset[] = [
  {
    id: 'cesium',
    nameAr: 'السيزيوم (Cesium)',
    nameEn: 'Cesium',
    workFunctionEv: 2.14,
    thresholdWavelengthNm: 580,
  },
  {
    id: 'potassium',
    nameAr: 'البوتاسيوم (Potassium)',
    nameEn: 'Potassium',
    workFunctionEv: 2.30,
    thresholdWavelengthNm: 539,
  },
  {
    id: 'sodium',
    nameAr: 'الصوديوم (Sodium)',
    nameEn: 'Sodium',
    workFunctionEv: 2.75,
    thresholdWavelengthNm: 451,
  },
  {
    id: 'zinc',
    nameAr: 'الخارصين / الزنك (Zinc)',
    nameEn: 'Zinc',
    workFunctionEv: 4.31,
    thresholdWavelengthNm: 288,
  },
  {
    id: 'platinum',
    nameAr: 'البلاتين (Platinum)',
    nameEn: 'Platinum',
    workFunctionEv: 6.35,
    thresholdWavelengthNm: 195,
  },
];

/**
 * Einstein's Photoelectric Equation:
 * E = hf = hc / λ
 * K_max = hf - W0 = e * Vs
 */
export function calculatePhotoelectric(
  wavelengthNm: number,
  workFunctionEv: number,
  intensityPercent: number
): PhotoelectricResult {
  const safeLambda = Math.max(10, wavelengthNm);
  const lambdaM = safeLambda * 1e-9;
  const freq = SPEED_OF_LIGHT_C / lambdaM;

  const photonEnergyJ = PLANCK_H * freq;
  const photonEnergyEv = photonEnergyJ / ELEMENTARY_CHARGE_E;

  const workFunctionJ = workFunctionEv * ELEMENTARY_CHARGE_E;
  const thresholdFreq = workFunctionJ / PLANCK_H;
  const thresholdLambdaNm = (SPEED_OF_LIGHT_C / thresholdFreq) * 1e9;

  const isEmission = photonEnergyEv >= workFunctionEv;
  const kMaxEv = isEmission ? photonEnergyEv - workFunctionEv : 0;
  const kMaxJ = kMaxEv * ELEMENTARY_CHARGE_E;
  const vs = isEmission ? kMaxEv : 0; // In volts, Vs = Kmax(eV)
  const maxVelocity = isEmission
    ? Math.sqrt((2 * kMaxJ) / ELECTRON_MASS_KG)
    : 0;

  // Photoelectric current proportional to intensity when emission occurs
  const currentRel = isEmission ? (intensityPercent / 100) * 10 : 0;

  return {
    wavelengthNm: safeLambda,
    frequencyHz: freq,
    photonEnergyEv,
    photonEnergyJoules: photonEnergyJ,
    workFunctionEv,
    thresholdFreqHz: thresholdFreq,
    thresholdWavelengthNm: thresholdLambdaNm,
    isEmissionOccurring: isEmission,
    maxKineticEnergyEv: kMaxEv,
    maxKineticEnergyJoules: kMaxJ,
    stoppingPotentialVs: vs,
    maxElectronVelocityM_s: maxVelocity,
    photoelectricCurrentRelative: currentRel,
  };
}

/**
 * de Broglie Wavelength:
 * λ = h / p = h / (m * v)
 */
export function calculateDeBroglie(
  massKg: number,
  velocityM_s: number
): DeBroglieResult {
  const safeM = Math.max(1e-35, massKg);
  const safeV = Math.max(0.1, velocityM_s);
  const p = safeM * safeV;
  const lambda = PLANCK_H / p;
  const keJ = 0.5 * safeM * Math.pow(safeV, 2);
  const keEv = keJ / ELEMENTARY_CHARGE_E;

  return {
    massKg: safeM,
    velocityM_s: safeV,
    momentumKgM_s: p,
    deBroglieWavelengthM: lambda,
    deBroglieWavelengthNm: lambda * 1e9,
    kineticEnergyEv: keEv,
  };
}

/**
 * Heisenberg Uncertainty Principle:
 * Δx * Δp >= h / (4π)
 */
export function calculateUncertainty(
  positionUncertaintyM: number,
  massKg: number = ELECTRON_MASS_KG
): UncertaintyResult {
  const safeDx = Math.max(1e-15, positionUncertaintyM);
  const minDp = PLANCK_H / (4 * Math.PI * safeDx);
  const minDv = minDp / massKg;

  return {
    positionUncertaintyM: safeDx,
    minMomentumUncertaintyKgM_s: minDp,
    minVelocityUncertaintyM_s: minDv,
    massKg,
  };
}
