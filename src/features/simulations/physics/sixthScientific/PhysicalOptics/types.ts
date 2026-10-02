export type OpticsMode = 'young-double-slit' | 'diffraction-grating' | 'polarization' | 'scattering';

export interface YoungSlitResult {
  wavelengthNm: number; // λ in nm
  slitSeparationMm: number; // d in mm
  screenDistanceM: number; // L in m
  orderM: number; // m
  fringeSpacingMm: number; // Δy = λ * L / d
  brightFringePositionMm: number; // ym = m * λ * L / d
  darkFringePositionMm: number; // ym = (m + 0.5) * λ * L / d
  colorHex: string;
}

export interface DiffractionGratingResult {
  wavelengthNm: number;
  linesPerMm: number; // N lines/mm
  gratingSpacingMicrons: number; // d = 1 / N in μm
  orderM: number;
  diffractionAngleDeg: number; // θ = asin(m * λ / d)
  maxObservableOrder: number;
}

export interface PolarizationResult {
  initialIntensity: number; // I0
  analyzerAngleDeg: number; // θ
  transmittedIntensity: number; // I = I0 * cos^2(θ)
  transmissionPercent: number;
}

export interface ScatteringResult {
  wavelengthNm: number;
  relativeScatteringIntensity: number; // I ∝ 1 / λ^4 normalized to 550nm
  colorDescriptionAr: string;
}
