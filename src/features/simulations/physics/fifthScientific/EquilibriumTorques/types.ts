export interface ForceApplied {
  id: string;
  nameAr: string;
  magnitudeN: number;
  positionM: number; // distance from left end of beam (0 to beamLengthM)
  angleDeg: number; // 90 = downward perpendicular, 270 = upward
  color: string;
}

export interface TorqueItem {
  id: string;
  nameAr: string;
  forceN: number;
  leverArmM: number;
  torqueN_m: number; // positive = counter-clockwise (عكس عقارب الساعة), negative = clockwise
}

export interface EquilibriumResult {
  beamLengthM: number;
  pivotPositionM: number;
  torques: TorqueItem[];
  sumTorqueN_m: number;
  sumForceVerticalN: number;
  isEquilibrium: boolean;
  rotationTendencyAr: string;
}
