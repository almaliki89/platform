export type ElectromagnetismMode = 'oersted-wire' | 'solenoid-core';

export interface ElectromagnetismState {
  mode: ElectromagnetismMode;
  currentA: number; // -10A to +10A
  coilTurns: number; // 10 to 100 turns
  hasIronCore: boolean;
  compassDistancePx: number;
}

export interface ElectromagnetismResult {
  fieldStrengthRelative: number;
  fieldDirectionAr: string;
  northPoleSideAr: string; // 'right' | 'left' | 'none'
  compassAngleDeg: number;
  permeabilityMultiplier: number;
  rightHandRuleExplanationAr: string;
}
