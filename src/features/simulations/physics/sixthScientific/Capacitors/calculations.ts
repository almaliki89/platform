import { EPSILON_0 } from '../constants';
import {
  DielectricMaterialPreset,
  ParallelPlateResult,
  CapacitorCombinationResult,
  RcCircuitResult,
  CombinationType,
} from './types';

export const DIELECTRIC_PRESETS: DielectricMaterialPreset[] = [
  {
    id: 'air',
    nameAr: 'الفراغ / الهواء (Air/Vacuum)',
    nameEn: 'Air / Vacuum',
    dielectricConstantK: 1.0,
    color: 'rgba(56, 189, 248, 0.1)',
  },
  {
    id: 'paper',
    nameAr: 'الورق المشمع (Waxed Paper)',
    nameEn: 'Waxed Paper',
    dielectricConstantK: 3.5,
    color: 'rgba(251, 191, 36, 0.4)',
  },
  {
    id: 'mica',
    nameAr: 'الميكا (Mica)',
    nameEn: 'Mica',
    dielectricConstantK: 5.4,
    color: 'rgba(168, 85, 247, 0.4)',
  },
  {
    id: 'glass',
    nameAr: 'الزجاج (Glass)',
    nameEn: 'Glass',
    dielectricConstantK: 7.0,
    color: 'rgba(6, 182, 212, 0.45)',
  },
  {
    id: 'ceramic',
    nameAr: 'الخزف / السيراميك (Ceramic)',
    nameEn: 'Ceramic / Titanate',
    dielectricConstantK: 80.0,
    color: 'rgba(239, 68, 68, 0.45)',
  },
];

/**
 * Pure calculation for Parallel Plate Capacitor:
 * C = k * ε0 * A / d
 * Q = C * V
 * PE = 0.5 * C * V^2 = 0.5 * Q * V
 */
export function calculateParallelPlate(
  plateAreaCm2: number,
  separationMm: number,
  dielectricK: number,
  voltageV: number
): ParallelPlateResult {
  // Convert units to SI (m^2 and m)
  const areaM2 = Math.max(1e-6, plateAreaCm2 * 1e-4);
  const sepM = Math.max(1e-5, separationMm * 1e-3);
  const safeK = Math.max(1.0, dielectricK);
  const safeV = Math.max(0, voltageV);

  const capacitanceFarads = (safeK * EPSILON_0 * areaM2) / sepM;
  const capacitancePicoFarads = capacitanceFarads * 1e12;

  const chargeCoulombs = capacitanceFarads * safeV;
  const chargeMicroCoulombs = chargeCoulombs * 1e6;

  const storedEnergyJoules = 0.5 * capacitanceFarads * Math.pow(safeV, 2);
  const storedEnergyMicroJoules = storedEnergyJoules * 1e6;

  const electricFieldV_m = safeV / sepM;

  return {
    plateAreaM2: areaM2,
    separationM: sepM,
    dielectricK: safeK,
    appliedVoltageV: safeV,
    capacitanceFarads,
    capacitancePicoFarads,
    chargeCoulombs,
    chargeMicroCoulombs,
    storedEnergyJoules,
    storedEnergyMicroJoules,
    electricFieldV_m,
  };
}

/**
 * Series and Parallel Capacitor Combinations:
 * Series: 1/Ceq = 1/C1 + 1/C2 + 1/C3, Q1 = Q2 = Q3 = Qtotal
 * Parallel: Ceq = C1 + C2 + C3, V1 = V2 = V3 = Vtotal
 */
export function calculateCombination(
  type: CombinationType,
  c1MicroF: number,
  c2MicroF: number,
  c3MicroF: number = 0,
  voltageV: number
): CapacitorCombinationResult {
  const caps = [
    { id: 'c1', labelAr: 'المتسعة الأولى C₁', c: Math.max(0.1, c1MicroF) },
    { id: 'c2', labelAr: 'المتسعة الثانية C₂', c: Math.max(0.1, c2MicroF) },
  ];
  if (c3MicroF > 0) {
    caps.push({ id: 'c3', labelAr: 'المتسعة الثالثة C₃', c: c3MicroF });
  }

  let cEqMicroF = 0;
  let totalQMicroC = 0;

  if (type === 'series') {
    const sumInv = caps.reduce((sum, item) => sum + 1 / item.c, 0);
    cEqMicroF = 1 / sumInv;
    totalQMicroC = cEqMicroF * voltageV;

    const branches = caps.map((item) => {
      const v = totalQMicroC / item.c;
      const energy = 0.5 * item.c * Math.pow(v, 2);
      return {
        id: item.id,
        labelAr: item.labelAr,
        cMicroF: item.c,
        voltageV: v,
        chargeMicroC: totalQMicroC,
        energyMicroJ: energy,
      };
    });

    const totalEnergy = 0.5 * cEqMicroF * Math.pow(voltageV, 2);

    return {
      type,
      c1MicroF,
      c2MicroF,
      c3MicroF,
      voltageV,
      cEquivalentMicroF: cEqMicroF,
      totalChargeMicroC: totalQMicroC,
      totalEnergyMicroJ: totalEnergy,
      branches,
    };
  } else {
    // Parallel
    cEqMicroF = caps.reduce((sum, item) => sum + item.c, 0);
    totalQMicroC = cEqMicroF * voltageV;

    const branches = caps.map((item) => {
      const q = item.c * voltageV;
      const energy = 0.5 * item.c * Math.pow(voltageV, 2);
      return {
        id: item.id,
        labelAr: item.labelAr,
        cMicroF: item.c,
        voltageV,
        chargeMicroC: q,
        energyMicroJ: energy,
      };
    });

    const totalEnergy = 0.5 * cEqMicroF * Math.pow(voltageV, 2);

    return {
      type,
      c1MicroF,
      c2MicroF,
      c3MicroF,
      voltageV,
      cEquivalentMicroF: cEqMicroF,
      totalChargeMicroC: totalQMicroC,
      totalEnergyMicroJ: totalEnergy,
      branches,
    };
  }
}

/**
 * RC Charging / Discharging Transient Circuit:
 * τ = R * C
 * Charging: V(t) = V0 * (1 - e^(-t/τ))
 * Discharging: V(t) = V0 * e^(-t/τ)
 */
export function calculateRcCircuit(
  resistanceOhms: number,
  capacitanceMicroF: number,
  sourceVoltageV: number,
  timeSec: number,
  isCharging: boolean
): RcCircuitResult {
  const safeR = Math.max(10, resistanceOhms);
  const safeC_F = Math.max(1e-9, capacitanceMicroF * 1e-6);
  const tau = safeR * safeC_F; // seconds

  let vc = 0;
  let currentA = 0;

  if (isCharging) {
    vc = sourceVoltageV * (1 - Math.exp(-timeSec / tau));
    currentA = (sourceVoltageV / safeR) * Math.exp(-timeSec / tau);
  } else {
    vc = sourceVoltageV * Math.exp(-timeSec / tau);
    currentA = -(sourceVoltageV / safeR) * Math.exp(-timeSec / tau);
  }

  const chargeMicroC = vc * capacitanceMicroF;
  const energyMicroJ = 0.5 * capacitanceMicroF * Math.pow(vc, 2);

  return {
    resistanceOhms: safeR,
    capacitanceMicroF,
    sourceVoltageV,
    timeConstantSec: tau,
    timeSec,
    isCharging,
    capacitorVoltageV: vc,
    currentAmperes: currentA,
    chargeMicroC,
    energyMicroJ,
  };
}
