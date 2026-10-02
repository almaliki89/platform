export type CircuitMode = 'single' | 'series' | 'parallel';

export interface ResistorConfig {
  id: string;
  nameAr: string;
  resistanceOhm: number;
  colorCode?: string;
}

export interface ElectricCurrentState {
  mode: CircuitMode;
  voltageV: number;
  r1Ohm: number;
  r2Ohm: number;
  r3Ohm: number;
  activeResistorsCount: number; // 2 or 3 in series/parallel
}

export interface CircuitResult {
  equivalentResistanceOhm: number;
  totalCurrentA: number;
  totalPowerW: number;
  branchCurrentsA: number[];
  resistorVoltagesV: number[];
  formulaSummaryAr: string;
  descriptionAr: string;
}

export interface VIPoint {
  voltage: number;
  current: number;
}
