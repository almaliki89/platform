import {
  YoungSlitResult,
  DiffractionGratingResult,
  PolarizationResult,
  ScatteringResult,
} from './types';

/**
 * Converts visible wavelength (nm) to Hex Color
 */
export function wavelengthToHex(wavelengthNm: number): string {
  if (wavelengthNm < 420) return '#8b5cf6'; // Violet
  if (wavelengthNm < 490) return '#3b82f6'; // Blue
  if (wavelengthNm < 560) return '#10b981'; // Green
  if (wavelengthNm < 590) return '#eab308'; // Yellow
  if (wavelengthNm < 635) return '#f97316'; // Orange
  return '#ef4444'; // Red
}

/**
 * Young's Double Slit Interference:
 * Δy = (λ * L) / d
 * y_m = m * Δy (Bright fringe)
 * y_m = (m + 0.5) * Δy (Dark fringe)
 */
export function calculateYoungDoubleSlit(
  wavelengthNm: number,
  slitSeparationMm: number,
  screenDistanceM: number,
  orderM: number = 1
): YoungSlitResult {
  const lambdaM = wavelengthNm * 1e-9;
  const dM = Math.max(1e-5, slitSeparationMm * 1e-3);
  const lM = Math.max(0.1, screenDistanceM);

  const fringeSpacingM = (lambdaM * lM) / dM;
  const fringeSpacingMm = fringeSpacingM * 1e3;

  const brightPosMm = orderM * fringeSpacingMm;
  const darkPosMm = (orderM + 0.5) * fringeSpacingMm;

  return {
    wavelengthNm,
    slitSeparationMm,
    screenDistanceM: lM,
    orderM,
    fringeSpacingMm,
    brightFringePositionMm: brightPosMm,
    darkFringePositionMm: darkPosMm,
    colorHex: wavelengthToHex(wavelengthNm),
  };
}

/**
 * Diffraction Grating:
 * d * sin(θ) = m * λ  =>  sin(θ) = (m * λ) / d
 */
export function calculateDiffractionGrating(
  wavelengthNm: number,
  linesPerMm: number,
  orderM: number = 1
): DiffractionGratingResult {
  const safeLines = Math.max(10, linesPerMm);
  // Grating constant d in meters
  const dM = (1e-3) / safeLines;
  const dMicrons = dM * 1e6;
  const lambdaM = wavelengthNm * 1e-9;

  const sinTheta = (orderM * lambdaM) / dM;
  const angleDeg = sinTheta <= 1.0 ? (Math.asin(sinTheta) * 180) / Math.PI : 90;
  const maxOrder = Math.floor(dM / lambdaM);

  return {
    wavelengthNm,
    linesPerMm: safeLines,
    gratingSpacingMicrons: dMicrons,
    orderM,
    diffractionAngleDeg: angleDeg,
    maxObservableOrder: maxOrder,
  };
}

/**
 * Malus's Law of Polarization:
 * I = I0 * cos^2(θ)
 */
export function calculatePolarization(
  initialIntensity: number,
  analyzerAngleDeg: number
): PolarizationResult {
  const rad = (analyzerAngleDeg * Math.PI) / 180;
  const factor = Math.pow(Math.cos(rad), 2);
  const transmitted = initialIntensity * factor;

  return {
    initialIntensity,
    analyzerAngleDeg,
    transmittedIntensity: transmitted,
    transmissionPercent: factor * 100,
  };
}

/**
 * Rayleigh Scattering Law:
 * I ∝ 1 / λ^4
 */
export function calculateScattering(wavelengthNm: number): ScatteringResult {
  // Relative to reference green light 550nm
  const relativeI = Math.pow(550 / wavelengthNm, 4);

  let desc = 'استطارة متوسطة';
  if (wavelengthNm < 450) {
    desc = 'استطارة عالية جداً (السبب الفيزيائي لزرقة السماء نهاراً)';
  } else if (wavelengthNm > 620) {
    desc = 'استطارة ضعيفة جداً ونفاذية عالية (السبب في حمرة قرص الشمس عند الغروب)';
  }

  return {
    wavelengthNm,
    relativeScatteringIntensity: relativeI,
    colorDescriptionAr: desc,
  };
}
