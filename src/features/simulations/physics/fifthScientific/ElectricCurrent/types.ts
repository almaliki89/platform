export type ElectricCurrentMode = 'kirchhoff' | 'resistivity' | 'wheatstone';

export interface WireMaterialPreset {
  id: string;
  nameAr: string;
  nameEn: string;
  resistivityOhmM: number; // ρ in Ω·m at 20°C
  tempCoeffPerC: number; // α in 1/°C
  colorHex: string;
}

export interface ResistivityResult {
  material: WireMaterialPreset;
  lengthM: number;
  crossSectionAreaM2: number; // A in m^2
  diameterMm: number;
  temperatureC: number;
  resistanceOhm: number; // R = ρ * (L / A)
  conductanceSiemens: number; // G = 1 / R
}

export interface KirchhoffTwoLoopResult {
  emf1V: number;
  emf2V: number;
  r1Ohm: number;
  r2Ohm: number;
  r3Ohm: number; // shared branch
  i1CurrentA: number; // branch 1
  i2CurrentA: number; // branch 2
  i3CurrentA: number; // branch 3 (i3 = i1 + i2 or i1 - i2)
  vDrop1V: number;
  vDrop2V: number;
  vDrop3V: number;
}

export interface WheatstoneBridgeResult {
  r1Ohm: number;
  r2Ohm: number;
  r3Ohm: number; // variable resistor
  rxUnknownOhm: number; // unknown resistor
  inputVoltageV: number;
  bridgeBalanced: boolean;
  galvanometerCurrentMicroA: number;
  calculatedRxOhm: number;
}
