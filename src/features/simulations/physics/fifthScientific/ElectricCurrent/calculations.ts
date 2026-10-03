import {
  WireMaterialPreset,
  ResistivityResult,
  KirchhoffTwoLoopResult,
  WheatstoneBridgeResult,
} from './types';

export const WIRE_MATERIALS: WireMaterialPreset[] = [
  {
    id: 'copper',
    nameAr: 'النحاس (Copper)',
    nameEn: 'Copper',
    resistivityOhmM: 1.68e-8,
    tempCoeffPerC: 0.0039,
    colorHex: '#b45309',
  },
  {
    id: 'aluminum',
    nameAr: 'الألمنيوم (Aluminum)',
    nameEn: 'Aluminum',
    resistivityOhmM: 2.65e-8,
    tempCoeffPerC: 0.0038,
    colorHex: '#94a3b8',
  },
  {
    id: 'silver',
    nameAr: 'الفضة (Silver)',
    nameEn: 'Silver',
    resistivityOhmM: 1.59e-8,
    tempCoeffPerC: 0.0038,
    colorHex: '#cbd5e1',
  },
  {
    id: 'tungsten',
    nameAr: 'التنغستن (Tungsten)',
    nameEn: 'Tungsten',
    resistivityOhmM: 5.6e-8,
    tempCoeffPerC: 0.0045,
    colorHex: '#64748b',
  },
  {
    id: 'nichrome',
    nameAr: 'النيكروم (Nichrome)',
    nameEn: 'Nichrome',
    resistivityOhmM: 1.1e-6,
    tempCoeffPerC: 0.0004,
    colorHex: '#d97706',
  },
];

/**
 * Calculates wire resistance: R = ρ * (L / A) * (1 + α * ΔT)
 */
export function calculateResistivity(
  materialId: string,
  lengthM: number,
  diameterMm: number,
  temperatureC: number
): ResistivityResult {
  const mat = WIRE_MATERIALS.find((m) => m.id === materialId) || WIRE_MATERIALS[0];

  // Cross-sectional area: A = π * (d/2)^2 in m^2
  const radiusM = (diameterMm / 2) / 1000;
  const areaM2 = Math.PI * Math.pow(radiusM, 2);

  // Temperature correction: ρ_T = ρ_20 * (1 + α * (T - 20))
  const tempFactor = 1 + mat.tempCoeffPerC * (temperatureC - 20);
  const effectiveRho = mat.resistivityOhmM * Math.max(0.1, tempFactor);

  const resistance = effectiveRho * (lengthM / Math.max(1e-10, areaM2));
  const conductance = 1 / Math.max(1e-6, resistance);

  return {
    material: mat,
    lengthM,
    crossSectionAreaM2: areaM2,
    diameterMm,
    temperatureC,
    resistanceOhm: resistance,
    conductanceSiemens: conductance,
  };
}

/**
 * Solves a 2-mesh Kirchhoff circuit:
 * Loop 1: E1 - I1*R1 - (I1 + I2)*R3 = 0  =>  I1*(R1 + R3) + I2*R3 = E1
 * Loop 2: E2 - I2*R2 - (I1 + I2)*R3 = 0  =>  I1*R3 + I2*(R2 + R3) = E2
 */
export function calculateKirchhoffTwoLoop(
  emf1V: number,
  emf2V: number,
  r1Ohm: number,
  r2Ohm: number,
  r3Ohm: number
): KirchhoffTwoLoopResult {
  const safeR1 = Math.max(0.5, r1Ohm);
  const safeR2 = Math.max(0.5, r2Ohm);
  const safeR3 = Math.max(0.5, r3Ohm);

  // Determinant
  const det = (safeR1 + safeR3) * (safeR2 + safeR3) - Math.pow(safeR3, 2);

  // Cramer's rule
  const i1 = (emf1V * (safeR2 + safeR3) - emf2V * safeR3) / det;
  const i2 = (emf2V * (safeR1 + safeR3) - emf1V * safeR3) / det;
  const i3 = i1 + i2;

  return {
    emf1V,
    emf2V,
    r1Ohm: safeR1,
    r2Ohm: safeR2,
    r3Ohm: safeR3,
    i1CurrentA: i1,
    i2CurrentA: i2,
    i3CurrentA: i3,
    vDrop1V: i1 * safeR1,
    vDrop2V: i2 * safeR2,
    vDrop3V: i3 * safeR3,
  };
}

/**
 * Wheatstone Bridge:
 * Balanced condition: R1 / R2 = R3 / Rx  =>  Rx = R3 * (R2 / R1)
 */
export function calculateWheatstoneBridge(
  r1Ohm: number,
  r2Ohm: number,
  r3Ohm: number,
  rxUnknownOhm: number,
  inputVoltageV: number
): WheatstoneBridgeResult {
  // Potentials at divider nodes
  const vc = inputVoltageV * (r2Ohm / (r1Ohm + r2Ohm));
  const vd = inputVoltageV * (rxUnknownOhm / (r3Ohm + rxUnknownOhm));
  const vGalv = vc - vd;

  // Internal resistance of galvanometer ~ 100 ohms
  const rg = 100;
  // Thevenin equivalent resistance seen by galvanometer
  const rth = (r1Ohm * r2Ohm) / (r1Ohm + r2Ohm) + (r3Ohm * rxUnknownOhm) / (r3Ohm + rxUnknownOhm);
  const iGalvA = vGalv / (rg + rth);
  const iGalvMicroA = iGalvA * 1e6;

  const isBalanced = Math.abs(iGalvMicroA) < 1.0; // less than 1 μA
  const calculatedRx = r3Ohm * (r2Ohm / Math.max(0.1, r1Ohm));

  return {
    r1Ohm,
    r2Ohm,
    r3Ohm,
    rxUnknownOhm,
    inputVoltageV,
    bridgeBalanced: isBalanced,
    galvanometerCurrentMicroA: iGalvMicroA,
    calculatedRxOhm: calculatedRx,
  };
}
