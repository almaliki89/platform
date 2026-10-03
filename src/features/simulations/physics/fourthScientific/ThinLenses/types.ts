export type LensType = 'converging' | 'diverging';

export interface LensCalculationResult {
  lensType: LensType;
  focalLengthCm: number; // positive for converging, negative for diverging
  powerDiopter: number; // P = 1 / f(m)
  objectDistanceCm: number; // u
  objectHeightCm: number; // h_o
  imageDistanceCm: number; // v (positive = real opposite side, negative = virtual same side)
  imageHeightCm: number; // h_i
  magnification: number; // M = -v / u
  isReal: boolean;
  isInverted: boolean;
  imageNatureAr: string;
}
