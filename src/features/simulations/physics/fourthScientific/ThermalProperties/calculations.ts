import {
  SubstancePreset,
  CalorimetryResult,
  PhaseChangeResult,
  GasLawResult,
} from './types';

export const SUBSTANCE_PRESETS: SubstancePreset[] = [
  {
    id: 'aluminum',
    nameAr: 'الألمنيوم (Aluminum)',
    nameEn: 'Aluminum',
    specificHeatJ_kgK: 900,
    densityKg_m3: 2700,
  },
  {
    id: 'iron',
    nameAr: 'الحديد (Iron)',
    nameEn: 'Iron',
    specificHeatJ_kgK: 450,
    densityKg_m3: 7870,
  },
  {
    id: 'copper',
    nameAr: 'النحاس (Copper)',
    nameEn: 'Copper',
    specificHeatJ_kgK: 386,
    densityKg_m3: 8960,
  },
  {
    id: 'lead',
    nameAr: 'الرصاص (Lead)',
    nameEn: 'Lead',
    specificHeatJ_kgK: 128,
    densityKg_m3: 11340,
  },
  {
    id: 'glass',
    nameAr: 'الزجاج (Glass)',
    nameEn: 'Glass',
    specificHeatJ_kgK: 840,
    densityKg_m3: 2500,
  },
];

export const WATER_SPECIFIC_HEAT = 4186; // J/(kg·°C)
export const ICE_SPECIFIC_HEAT = 2090; // J/(kg·°C)
export const STEAM_SPECIFIC_HEAT = 2010; // J/(kg·°C)
export const LATENT_HEAT_FUSION = 333000; // J/kg (انصهار الجليد)
export const LATENT_HEAT_VAPORIZATION = 2260000; // J/kg (تبخر الماء)
export const IDEAL_GAS_CONSTANT_R = 8.314; // J/(mol·K)

/**
 * Calculates thermal equilibrium for calorimeter:
 * m_w * c_w * (T_f - T_w) = m_s * c_s * (T_s - T_f)
 */
export function calculateCalorimetry(
  waterMassKg: number,
  waterInitialTempC: number,
  substanceMassKg: number,
  substanceInitialTempC: number,
  substanceSpecificHeat: number
): CalorimetryResult {
  const mw = Math.max(0.01, waterMassKg);
  const cw = WATER_SPECIFIC_HEAT;
  const ms = Math.max(0.01, substanceMassKg);
  const cs = Math.max(1, substanceSpecificHeat);

  const numerator = mw * cw * waterInitialTempC + ms * cs * substanceInitialTempC;
  const denominator = mw * cw + ms * cs;
  const finalEquilibriumTempC = numerator / denominator;

  const heatExchangedJ = mw * cw * Math.abs(finalEquilibriumTempC - waterInitialTempC);
  const tempChangeWaterC = finalEquilibriumTempC - waterInitialTempC;
  const tempChangeSubstanceC = finalEquilibriumTempC - substanceInitialTempC;

  return {
    finalEquilibriumTempC,
    heatExchangedJ,
    tempChangeWaterC,
    tempChangeSubstanceC,
    isBoiling: finalEquilibriumTempC >= 100,
    isFreezing: finalEquilibriumTempC <= 0,
  };
}

/**
 * Calculates phase and temperature when heat energy Q is added to mass m of ice starting at initialTempC (< 0)
 */
export function calculatePhaseChange(
  massKg: number,
  initialTempC: number,
  energyAddedJ: number
): PhaseChangeResult {
  const m = Math.max(0.01, massKg);
  const startT = Math.min(0, initialTempC);

  const energyToReach0C = m * ICE_SPECIFIC_HEAT * (0 - startT);
  const energyToMelt = m * LATENT_HEAT_FUSION;
  const energyToReach100C = m * WATER_SPECIFIC_HEAT * 100;
  const energyToVaporize = m * LATENT_HEAT_VAPORIZATION;

  let remainingQ = energyAddedJ;
  let currentTempC = startT;
  let currentPhaseAr = 'جليد صلب (Solid Ice)';
  let stateFraction = 0;

  if (remainingQ < energyToReach0C) {
    // Heating ice below 0°C
    currentTempC = startT + remainingQ / (m * ICE_SPECIFIC_HEAT);
    currentPhaseAr = 'جليد صلب (Solid Ice)';
    stateFraction = 0;
  } else {
    remainingQ -= energyToReach0C;
    currentTempC = 0;

    if (remainingQ < energyToMelt) {
      // Melting ice at 0°C
      stateFraction = remainingQ / energyToMelt;
      currentPhaseAr = `مزيج جليد وماء عند الانصهار (${(stateFraction * 100).toFixed(0)}% ماء)`;
    } else {
      remainingQ -= energyToMelt;
      stateFraction = 1;

      if (remainingQ < energyToReach100C) {
        // Heating liquid water
        currentTempC = remainingQ / (m * WATER_SPECIFIC_HEAT);
        currentPhaseAr = 'ماء سائل (Liquid Water)';
        stateFraction = 0;
      } else {
        remainingQ -= energyToReach100C;
        currentTempC = 100;

        if (remainingQ < energyToVaporize) {
          // Vaporizing at 100°C
          stateFraction = remainingQ / energyToVaporize;
          currentPhaseAr = `غليان وتبخر الماء (${(stateFraction * 100).toFixed(0)}% بخار)`;
        } else {
          remainingQ -= energyToVaporize;
          currentTempC = 100 + remainingQ / (m * STEAM_SPECIFIC_HEAT);
          currentPhaseAr = 'بخار ماء غازي (Superheated Steam)';
          stateFraction = 1;
        }
      }
    }
  }

  return {
    currentTempC,
    currentPhaseAr,
    totalEnergySuppliedJ: energyAddedJ,
    energyToReach0C,
    energyToMelt,
    energyToReach100C,
    energyToVaporize,
    stateFraction,
  };
}

/**
 * Calculates Ideal Gas state: PV = nRT
 */
export function calculateGasLaw(
  moles: number,
  temperatureC: number,
  volumeLiters: number
): GasLawResult {
  const n = Math.max(0.1, moles);
  const tempK = Math.max(1, temperatureC + 273.15);
  const vM3 = Math.max(0.0001, volumeLiters * 1e-3);

  // P = n R T / V (in Pa) -> / 1000 for kPa
  const pressurePa = (n * IDEAL_GAS_CONSTANT_R * tempK) / vM3;
  const pressureKPa = pressurePa / 1000;

  return {
    pressureKPa,
    volumeLiters,
    temperatureK: tempK,
    temperatureC,
    moles: n,
  };
}
