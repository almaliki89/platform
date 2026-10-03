export interface BatteryEmfState {
  emfV: number; // Electromotive force in Volts (ε)
  internalResistanceOhm: number; // r in Ohms
  loadResistanceOhm: number; // R in Ohms
  isSwitchClosed: boolean;
}

export interface BatteryEmfResult {
  currentA: number;
  terminalVoltageV: number;
  internalDropV: number;
  powerLoadW: number;
  powerWastedW: number;
  efficiencyPercent: number;
  stateExplanationAr: string;
}
