import {
  ELEMENTARY_CHARGE_E,
  PROTON_MASS_U,
  NEUTRON_MASS_U,
  ATOMIC_MASS_UNIT_MEV,
} from '../constants';
import {
  IsotopeInfo,
  NuclearStructureResult,
  BindingEnergyResult,
  DecayLawResult,
} from './types';

export const ISOTOPE_PRESETS: IsotopeInfo[] = [
  {
    id: 'helium-4',
    nameAr: 'الهيليوم (He-4) جسيمة ألفا',
    symbol: '⁴₂He',
    Z: 2,
    A: 4,
    atomicMassU: 4.001506,
    stabilityClassificationAr: 'نواة خفيفة شديدة الاستقرار',
  } as any,
  {
    id: 'carbon-12',
    nameAr: 'الكربون (C-12) معيار الكتلة',
    symbol: '¹²₆C',
    Z: 6,
    A: 12,
    atomicMassU: 12.00000,
    stabilityClassificationAr: 'نواة مستقرة جداً',
  } as any,
  {
    id: 'iron-56',
    nameAr: 'الحديد (Fe-56) قمة الاستقرار النووي',
    symbol: '⁵⁶₂₆Fe',
    Z: 26,
    A: 56,
    atomicMassU: 55.93494,
    stabilityClassificationAr: 'أعلى طاقة ارتباط لكل نيوكليون (أكثر الأنوية استقراراً بالكون)',
  } as any,
  {
    id: 'radium-226',
    nameAr: 'الراديوم (Ra-226)',
    symbol: '²²⁶₈₈Ra',
    Z: 88,
    A: 226,
    atomicMassU: 226.02540,
    halfLifeYears: 1600,
    decayTypeAr: 'انحلال ألفا (Alpha Decay)',
  },
  {
    id: 'carbon-14',
    nameAr: 'الكربون المشع (C-14)',
    symbol: '¹⁴₆C',
    Z: 6,
    A: 14,
    atomicMassU: 14.003241,
    halfLifeYears: 5730,
    decayTypeAr: 'انحلال بيتا السالبة (Beta- Decay)',
  },
  {
    id: 'cobalt-60',
    nameAr: 'الكوبالت المشع (Co-60)',
    symbol: '⁶⁰₂₇Co',
    Z: 27,
    A: 60,
    atomicMassU: 59.93382,
    halfLifeYears: 5.27,
    decayTypeAr: 'انبعاث بيتا وغاما (Beta & Gamma)',
  },
  {
    id: 'uranium-235',
    nameAr: 'اليورانيوم القابل للانشطار (U-235)',
    symbol: '²³⁵₉₂U',
    Z: 92,
    A: 235,
    atomicMassU: 235.04393,
    halfLifeYears: 7.04e8,
    decayTypeAr: 'انشطار نووي وانحلال ألفا',
  },
  {
    id: 'uranium-238',
    nameAr: 'اليورانيوم (U-238)',
    symbol: '²³⁸₉₂U',
    Z: 92,
    A: 238,
    atomicMassU: 238.05079,
    halfLifeYears: 4.468e9,
    decayTypeAr: 'انحلال ألفا المتسلسل',
  },
];

export const R0_FM = 1.2; // R0 in femtometers (10^-15 m)

/**
 * Calculates nuclear size, radius, volume, and charge
 */
export function calculateNuclearStructure(Z: number, A: number): NuclearStructureResult {
  const safeZ = Math.max(1, Z);
  const safeA = Math.max(safeZ, A);
  const N = safeA - safeZ;

  const chargeCoulombs = safeZ * ELEMENTARY_CHARGE_E;
  const radiusFm = R0_FM * Math.cbrt(safeA);
  const radiusM = radiusFm * 1e-15;
  const volumeM3 = (4 / 3) * Math.PI * Math.pow(radiusM, 3);

  // Approximate mass = A * 1.66e-27 kg
  const massKg = safeA * 1.660539e-27;
  const densityKgM3 = massKg / volumeM3; // ≈ 2.3e17 kg/m^3 (constant for all nuclei)

  return {
    Z: safeZ,
    N,
    A: safeA,
    chargeCoulombs,
    radiusFm,
    volumeM3,
    densityKgM3,
  };
};

/**
 * Calculates Mass Defect and Nuclear Binding Energy:
 * Δm = (Z * m_H + N * m_n) - M_nucleus
 * Eb = Δm * 931.5 MeV
 * Eb' = Eb / A
 */
export function calculateBindingEnergy(
  Z: number,
  A: number,
  atomicMassU: number
): BindingEnergyResult {
  const N = A - Z;
  const protonTotalMass = Z * PROTON_MASS_U;
  const neutronTotalMass = N * NEUTRON_MASS_U;
  const constituentsMass = protonTotalMass + neutronTotalMass;

  // Mass defect in u
  const massDefectU = Math.max(0, constituentsMass - atomicMassU);
  const bindingEnergyMev = massDefectU * ATOMIC_MASS_UNIT_MEV;
  const bindingEnergyPerNucleonMev = bindingEnergyMev / A;

  let stabilityClassificationAr = '';
  if (bindingEnergyPerNucleonMev >= 8.5) {
    stabilityClassificationAr = 'نواة عالية الاستقرار (منطقة قمة المنحنى حول الحديد)';
  } else if (bindingEnergyPerNucleonMev >= 7.5) {
    stabilityClassificationAr = 'نواة متوسطة الاستقرار';
  } else {
    stabilityClassificationAr = 'نواة خفيفة أو ثقيلة قابلة للاندماج أو الانشطار';
  }

  return {
    massDefectU,
    bindingEnergyMev,
    bindingEnergyPerNucleonMev,
    stabilityClassificationAr,
  };
};

/**
 * Calculates Radioactive Decay Law:
 * N(t) = N0 * e^(-λ * t)
 * λ = ln(2) / T_1/2
 */
export function calculateDecayLaw(
  initialCountN0: number,
  halfLifeYears: number,
  elapsedTimeYears: number
): DecayLawResult {
  const safeT12Sec = Math.max(0.001, halfLifeYears) * 365.25 * 24 * 3600;
  const elapsedSec = Math.max(0, elapsedTimeYears) * 365.25 * 24 * 3600;
  const decayConstantPerSec = Math.LN2 / safeT12Sec;

  const remainingCountN = initialCountN0 * Math.exp(-decayConstantPerSec * elapsedSec);
  const decayedCount = initialCountN0 - remainingCountN;
  const activityBq = decayConstantPerSec * remainingCountN;

  return {
    halfLifeSeconds: safeT12Sec,
    decayConstantPerSec,
    initialCountN0,
    elapsedTimeSeconds: elapsedSec,
    remainingCountN,
    decayedCount,
    activityBq,
  };
};
