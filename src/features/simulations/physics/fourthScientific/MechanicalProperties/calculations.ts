import { MaterialElasticity, MechanicalMode, MechanicalPropertiesResult } from './types';

export const ELASTIC_MATERIALS: MaterialElasticity[] = [
  {
    id: 'steel',
    nameAr: 'الفولاذ (Steel)',
    nameEn: 'Steel',
    youngModulusPa: 200e9, // 200 GPa
    elasticLimitStressPa: 250e6, // 250 MPa
    typicalDensityKg_m3: 7850,
    color: '#94a3b8',
  },
  {
    id: 'copper',
    nameAr: 'النحاس (Copper)',
    nameEn: 'Copper',
    youngModulusPa: 110e9, // 110 GPa
    elasticLimitStressPa: 70e6, // 70 MPa
    typicalDensityKg_m3: 8960,
    color: '#f97316',
  },
  {
    id: 'aluminum',
    nameAr: 'الألمنيوم (Aluminum)',
    nameEn: 'Aluminum',
    youngModulusPa: 70e9, // 70 GPa
    elasticLimitStressPa: 95e6, // 95 MPa
    typicalDensityKg_m3: 2700,
    color: '#cbd5e1',
  },
  {
    id: 'rubber',
    nameAr: 'المطاط الصناعي (Rubber)',
    nameEn: 'Rubber',
    youngModulusPa: 0.05e9, // 50 MPa
    elasticLimitStressPa: 15e6, // 15 MPa
    typicalDensityKg_m3: 1100,
    color: '#334155',
  },
];

/**
 * Hooke's Law extension for a spring:
 * F = k * Δx  =>  Δx = F / k
 */
export function calculateHookeExtension(forceN: number, springConstantK: number): number {
  const safeK = Math.max(0.1, springConstantK);
  return Math.max(0, forceN) / safeK;
}

/**
 * Stress = Force / Area (Pa)
 */
export function calculateStress(forceN: number, areaM2: number): number {
  const safeA = Math.max(1e-9, areaM2);
  return Math.max(0, forceN) / safeA;
}

/**
 * Strain = ΔL / L0 (dimensionless)
 */
export function calculateStrain(extensionM: number, originalLengthM: number): number {
  const safeL0 = Math.max(1e-4, originalLengthM);
  return Math.max(0, extensionM) / safeL0;
}

/**
 * Wire extension under tension:
 * Y = (F * L0) / (A * ΔL)  =>  ΔL = (F * L0) / (A * Y)
 */
export function calculateWireExtension(
  forceN: number,
  originalLengthM: number,
  areaM2: number,
  youngModulusPa: number
): number {
  const safeL0 = Math.max(0.01, originalLengthM);
  const safeA = Math.max(1e-9, areaM2);
  const safeY = Math.max(1e6, youngModulusPa);
  return (Math.max(0, forceN) * safeL0) / (safeA * safeY);
}

/**
 * Full mechanical calculations for Spring and Wire modes.
 */
export function calculateMechanicalProperties(
  mode: MechanicalMode,
  appliedForceN: number,
  springConstantK: number,
  originalLengthM: number,
  crossSectionAreaMm2: number,
  materialId: string
): MechanicalPropertiesResult {
  const mat = ELASTIC_MATERIALS.find((m) => m.id === materialId) || ELASTIC_MATERIALS[0];
  const areaM2 = Math.max(1e-8, crossSectionAreaMm2 * 1e-6);

  let extensionM = 0;
  let stressPa = 0;
  let strain = 0;
  let youngModulusPa = mat.youngModulusPa;

  if (mode === 'spring') {
    extensionM = calculateHookeExtension(appliedForceN, springConstantK);
    // For spring, stress/strain is conceptualized with effective spring geometry
    stressPa = appliedForceN / areaM2;
    strain = calculateStrain(extensionM, originalLengthM);
    youngModulusPa = strain > 0 ? stressPa / strain : mat.youngModulusPa;
  } else {
    // Wire mode
    extensionM = calculateWireExtension(appliedForceN, originalLengthM, areaM2, mat.youngModulusPa);
    stressPa = calculateStress(appliedForceN, areaM2);
    strain = calculateStrain(extensionM, originalLengthM);
  }

  const extensionMm = extensionM * 1000;
  const stressMPa = stressPa / 1e6;
  const strainPercent = strain * 100;
  const isWithinElasticLimit = stressPa <= mat.elasticLimitStressPa;

  const elasticStateAr = isWithinElasticLimit
    ? 'ضمن حد المرونة (يعود الجسم لشكله الأصلي بزوال القوة)'
    : 'تجاوز حد المرونة (تشوه دائم / خضوع للمادة)';

  const statusExplanationAr = isWithinElasticLimit
    ? `الإجهاد الواقع (${stressMPa.toFixed(1)} MPa) أقل من حد المرونة (${(mat.elasticLimitStressPa / 1e6).toFixed(0)} MPa). ينطبق قانون هوك طردياً.`
    : `تحذير: الإجهاد الواقع (${stressMPa.toFixed(1)} MPa) تجاوز حد المرونة (${(mat.elasticLimitStressPa / 1e6).toFixed(0)} MPa) لمادة ${mat.nameAr.split('(')[0]}، مما يسبب تشوهاً دائماً.`;

  return {
    extensionM,
    extensionMm,
    stressPa,
    stressMPa,
    strain,
    strainPercent,
    youngModulusPa,
    isWithinElasticLimit,
    elasticStateAr,
    statusExplanationAr,
  };
}
