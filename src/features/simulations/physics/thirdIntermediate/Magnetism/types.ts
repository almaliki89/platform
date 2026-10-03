export type MagnetInteraction = 'attraction' | 'repulsion' | 'none';

export type MaterialType = 'ferromagnetic' | 'paramagnetic' | 'diamagnetic';

export interface MagnetState {
  magnet1AngleDeg: number; // 0 = N right, S left; 180 = S right, N left
  hasSecondMagnet: boolean;
  magnet2DistancePx: number;
  magnet2AngleDeg: number;
  compassX: number;
  compassY: number;
  showFieldLines: boolean;
  selectedMaterial: MaterialType;
}

export interface MagneticFieldPoint {
  x: number;
  y: number;
  bx: number;
  by: number;
  magnitude: number;
  angleDeg: number;
}

export interface MagnetismResult {
  interaction: MagnetInteraction;
  forceDescriptionAr: string;
  compassAngleDeg: number;
  fieldStrengthRelative: number;
  materialResponseAr: string;
}
