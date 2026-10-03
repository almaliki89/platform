export type MirrorType = 'concave' | 'convex' | 'flat';

export interface MirrorCalculationResult {
  mirrorType: MirrorType;
  focalLengthCm: number; // positive for concave, negative for convex, Infinity for flat
  radiusCurvatureCm: number;
  objectDistanceCm: number; // u
  objectHeightCm: number; // h_o
  imageDistanceCm: number; // v (positive = real in front, negative = virtual behind)
  imageHeightCm: number; // h_i
  magnification: number; // M = -v / u
  isReal: boolean;
  isInverted: boolean;
  imageNatureAr: string;
}
