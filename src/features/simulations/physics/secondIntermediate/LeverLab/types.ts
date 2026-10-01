export type LeverClassType = 'class1' | 'class2' | 'class3' | 'custom';

export interface LeverCalculations {
  torqueLeft: number; // N.m
  torqueRight: number; // N.m
  isBalanced: boolean;
  tiltAngleDeg: number;
  mechanicalAdvantage: number;
  balanceStateAr: string;
  leverClassAr: string;
}
