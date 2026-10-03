import { CircuitMode, CircuitResult, VIPoint } from './types';

/**
 * Pure calculation for Ohm's Law: I = V / R, P = V * I
 * Clamps resistance to minimum 0.1 Ohm to prevent division by zero.
 */
export function calculateOhmsLaw(
  voltageV: number,
  resistanceOhm: number
): { currentA: number; powerW: number } {
  const safeR = Math.max(0.1, Math.abs(resistanceOhm));
  const currentA = voltageV / safeR;
  const powerW = voltageV * currentA;
  return { currentA, powerW };
}

/**
 * Series Resistance: R_eq = R1 + R2 + ...
 */
export function calculateSeriesResistance(resistances: number[]): number {
  return resistances.reduce((acc, r) => acc + Math.max(0.1, r), 0);
}

/**
 * Parallel Resistance: 1 / R_eq = 1/R1 + 1/R2 + ...
 */
export function calculateParallelResistance(resistances: number[]): number {
  const validResistances = resistances.map((r) => Math.max(0.1, r));
  const sumInverses = validResistances.reduce((acc, r) => acc + 1 / r, 0);
  return sumInverses > 0 ? 1 / sumInverses : 0.1;
}

/**
 * Complete circuit calculations for Single, Series, and Parallel circuits.
 */
export function calculateCircuit(
  mode: CircuitMode,
  voltageV: number,
  resistances: number[]
): CircuitResult {
  const safeV = Math.max(0, voltageV);
  const cleanR = resistances.map((r) => Math.max(0.1, r));

  let req = 0;
  let branchCurrentsA: number[] = [];
  let resistorVoltagesV: number[] = [];
  let formulaSummaryAr = '';
  let descriptionAr = '';

  if (mode === 'single') {
    req = cleanR[0];
    const { currentA, powerW } = calculateOhmsLaw(safeV, req);
    branchCurrentsA = [currentA];
    resistorVoltagesV = [safeV];
    formulaSummaryAr = 'I = V / R (قانون أوم)';
    descriptionAr = `دائرة بمقاومة منفردة R = ${req.toFixed(1)} Ω؛ يمر تيار كلي مقداره ${currentA.toFixed(2)} A وفرق الجهد على طرفي المقاومة ${safeV.toFixed(1)} V.`;

    return {
      equivalentResistanceOhm: req,
      totalCurrentA: currentA,
      totalPowerW: powerW,
      branchCurrentsA,
      resistorVoltagesV,
      formulaSummaryAr,
      descriptionAr,
    };
  }

  if (mode === 'series') {
    req = calculateSeriesResistance(cleanR);
    const totalCurrentA = safeV / req;
    const totalPowerW = safeV * totalCurrentA;

    // In series: current is identical through all resistors, voltages divide
    branchCurrentsA = cleanR.map(() => totalCurrentA);
    resistorVoltagesV = cleanR.map((r) => totalCurrentA * r);

    formulaSummaryAr = 'R_eq = R₁ + R₂ (+ R₃) | I_total = I₁ = I₂';
    descriptionAr = `ربط توالي: التيار متساوٍ في جميع أجزاء الدائرة (I = ${totalCurrentA.toFixed(2)} A)، والمقاومة المكافئة R_eq = ${req.toFixed(1)} Ω (أكبر من أكبر مقاومة). يتجزأ فرق الجهد الكلي على المقاومات.`;

    return {
      equivalentResistanceOhm: req,
      totalCurrentA,
      totalPowerW,
      branchCurrentsA,
      resistorVoltagesV,
      formulaSummaryAr,
      descriptionAr,
    };
  }

  // Parallel mode
  req = calculateParallelResistance(cleanR);
  const totalCurrentA = safeV / req;
  const totalPowerW = safeV * totalCurrentA;

  // In parallel: voltage is identical across all branches, currents divide
  resistorVoltagesV = cleanR.map(() => safeV);
  branchCurrentsA = cleanR.map((r) => safeV / r);

  formulaSummaryAr = '1/R_eq = 1/R₁ + 1/R₂ (+ 1/R₃) | V_total = V₁ = V₂';
  descriptionAr = `ربط توازي: فرق الجهد متساوٍ على طرفي كل مقاومة (V = ${safeV.toFixed(1)} V)، والمقاومة المكافئة R_eq = ${req.toFixed(1)} Ω (أصغر من أصغر مقاومة). يتجزأ التيار الكلي I_total = ${totalCurrentA.toFixed(2)} A عبر الفروع.`;

  return {
    equivalentResistanceOhm: req,
    totalCurrentA,
    totalPowerW,
    branchCurrentsA,
    resistorVoltagesV,
    formulaSummaryAr,
    descriptionAr,
  };
}

/**
 * Generates data points for the V-I Characteristic Graph.
 */
export function generateVICharacteristic(resistanceOhm: number, maxV: number = 24): VIPoint[] {
  const safeR = Math.max(0.1, resistanceOhm);
  const points: VIPoint[] = [];
  const steps = 8;
  for (let i = 0; i <= steps; i++) {
    const v = (maxV / steps) * i;
    const current = v / safeR;
    points.push({ voltage: v, current });
  }
  return points;
}
