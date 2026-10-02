import {
  ArchimedesResult,
  FluidTypeInfo,
  HydrostaticResult,
  PascalResult,
} from './types';

export const FLUID_PRESETS: FluidTypeInfo[] = [
  {
    id: 'water',
    nameAr: 'الماء العذب (Water)',
    densityKg_m3: 1000,
    color: '#38bdf8',
  },
  {
    id: 'seawater',
    nameAr: 'مياه البحر المالحة (Seawater)',
    densityKg_m3: 1025,
    color: '#0284c7',
  },
  {
    id: 'oil',
    nameAr: 'الزيت النباتي (Oil)',
    densityKg_m3: 800,
    color: '#eab308',
  },
  {
    id: 'mercury',
    nameAr: 'الزئبق (Mercury)',
    densityKg_m3: 13600,
    color: '#94a3b8',
  },
];

export const ATMOSPHERIC_PRESSURE_PA = 101325; // 1 atm ≈ 101.3 kPa
export const STANDARD_GRAVITY = 9.8; // m/s²

/**
 * Pure calculation: Fluid Pressure at depth h
 * P = rho * g * h
 */
export function calculateFluidPressure(
  densityKg_m3: number,
  depthM: number,
  gravity: number = STANDARD_GRAVITY
): HydrostaticResult {
  const safeDensity = Math.max(1, densityKg_m3);
  const safeDepth = Math.max(0, depthM);
  const safeG = Math.max(0.1, gravity);

  const gaugePressurePa = safeDensity * safeG * safeDepth;
  const gaugePressureKPa = gaugePressurePa / 1000;
  const totalPressureKPa = (gaugePressurePa + ATMOSPHERIC_PRESSURE_PA) / 1000;

  const formulaNoteAr = `P = ρ · g · h = ${safeDensity} × ${safeG} × ${safeDepth} = ${gaugePressurePa.toFixed(0)} Pa`;

  return {
    gaugePressurePa,
    gaugePressureKPa,
    totalPressureKPa,
    depthM: safeDepth,
    densityKg_m3: safeDensity,
    formulaNoteAr,
  };
}

/**
 * Pure calculation: Pascal Hydraulic Press
 * F1 / A1 = F2 / A2  =>  F2 = F1 * (A2 / A1)
 */
export function calculatePascalOutputForce(
  inputForceN: number,
  area1Cm2: number,
  area2Cm2: number
): PascalResult {
  const safeF1 = Math.max(0, inputForceN);
  const safeA1 = Math.max(0.1, area1Cm2);
  const safeA2 = Math.max(0.1, area2Cm2);

  const mechanicalAdvantage = safeA2 / safeA1;
  const outputForceN = safeF1 * mechanicalAdvantage;
  const pressurePa = (safeF1 / (safeA1 * 1e-4)); // convert cm² to m²

  const formulaNoteAr = `F₂ = F₁ · (A₂ / A₁) = ${safeF1} × (${safeA2} / ${safeA1}) = ${outputForceN.toFixed(1)} N`;

  return {
    inputForceN: safeF1,
    outputForceN,
    area1Cm2: safeA1,
    area2Cm2: safeA2,
    mechanicalAdvantage,
    pressurePa,
    formulaNoteAr,
  };
}

/**
 * Pure calculation: Archimedes Buoyancy Principle
 * Buoyant Force Fb = rho_fluid * g * V_displaced
 */
export function calculateFloatingState(
  objectDensityKg_m3: number,
  fluidDensityKg_m3: number,
  objectVolumeCm3: number,
  gravity: number = STANDARD_GRAVITY
): ArchimedesResult {
  const safeObjDensity = Math.max(1, objectDensityKg_m3);
  const safeFluidDensity = Math.max(1, fluidDensityKg_m3);
  const safeObjVolM3 = Math.max(1e-6, objectVolumeCm3 * 1e-6);

  // Object weight = m * g = rho_obj * V_obj * g
  const objectWeightN = safeObjDensity * safeObjVolM3 * gravity;

  let state: 'floating' | 'submerged-neutral' | 'sinking' = 'floating';
  let stateAr = '';
  let submergedFraction = 1;
  let displacedVolumeM3 = safeObjVolM3;
  let buoyantForceN = 0;

  if (safeObjDensity < safeFluidDensity) {
    // Floating
    state = 'floating';
    submergedFraction = safeObjDensity / safeFluidDensity;
    displacedVolumeM3 = safeObjVolM3 * submergedFraction;
    // In equilibrium, buoyant force balances weight exactly
    buoyantForceN = objectWeightN;
    stateAr = `يطفو على السطح (الجزء المغمور = ${(submergedFraction * 100).toFixed(1)}%)`;
  } else if (Math.abs(safeObjDensity - safeFluidDensity) < 5) {
    // Neutral buoyancy
    state = 'submerged-neutral';
    submergedFraction = 1;
    displacedVolumeM3 = safeObjVolM3;
    buoyantForceN = objectWeightN;
    stateAr = 'معلق كلياً داخل السائل (اتزان تام ρ_obj ≈ ρ_fluid)';
  } else {
    // Sinking
    state = 'sinking';
    submergedFraction = 1;
    displacedVolumeM3 = safeObjVolM3;
    buoyantForceN = safeFluidDensity * displacedVolumeM3 * gravity;
    stateAr = 'يغوص إلى القاع (الوزن أكبر من قوة الطفو القصوى)';
  }

  const netForceN = Math.abs(objectWeightN - buoyantForceN);
  const explanationAr =
    state === 'floating'
      ? `كثافة الجسم (${safeObjDensity} kg/m³) أقل من كثافة السائل (${safeFluidDensity} kg/m³)، فيطفو بحيث يزيح حجماً من السائل وزنه يساوي وزن الجسم كلياً.`
      : state === 'sinking'
      ? `كثافة الجسم (${safeObjDensity} kg/m³) أكبر من كثافة السائل (${safeFluidDensity} kg/m³)، فتكون قوة الطفو القصوى (${buoyantForceN.toFixed(2)} N) غير كافية لرفع وزن الجسم (${objectWeightN.toFixed(2)} N).`
      : 'كثافة الجسم مساوية لكثافة السائل، فيبقى معلقاً عند أي عمق يوضع فيه.';

  return {
    buoyantForceN,
    objectWeightN,
    netForceN,
    state,
    stateAr,
    submergedFraction,
    displacedVolumeM3,
    explanationAr,
  };
}
