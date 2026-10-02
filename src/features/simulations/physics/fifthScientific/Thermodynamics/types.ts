export type ThermoMode = 'first-law' | 'pv-processes' | 'heat-engine';

export type GasProcessType = 'isobaric' | 'isochoric' | 'isothermal' | 'adiabatic';

export interface FirstLawResult {
  heatAddedQ_J: number; // Q: positive if heat added to system, negative if removed
  workDoneBySystemW_J: number; // W: positive if work done by system (expansion), negative if work done on system (compression)
  deltaInternalEnergyU_J: number; // ΔU = Q - W
  systemStateDescriptionAr: string;
}

export interface PvProcessResult {
  processType: GasProcessType;
  pInitialKPa: number;
  vInitialL: number;
  pFinalKPa: number;
  vFinalL: number;
  workDoneJ: number;
  heatTransferredJ: number;
  deltaInternalEnergyJ: number;
  pvCurvePoints: { v: number; p: number }[];
}

export interface HeatEngineResult {
  tHotK: number;
  tColdK: number;
  heatInputQh_J: number;
  carnotEfficiencyPercent: number; // η_carnot = (1 - Tc/Th) * 100
  actualWorkOutputJ: number; // W = η * Qh
  heatExhaustQc_J: number; // Qc = Qh - W
}
