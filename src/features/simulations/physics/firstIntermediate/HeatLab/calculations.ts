/**
 * Pure thermodynamic calculations for Heat Transfer & Equilibrium
 * Assumes isolated 2-body system: Q_lost = Q_gained
 * m_A * c_A * (T_A - T_eq) = m_B * c_B * (T_eq - T_B)
 */
export function calculateEquilibriumTemperature(
  tempA: number,
  tempB: number,
  massA: number,
  massB: number,
  specificHeatA: number = 1,
  specificHeatB: number = 1
): number {
  const capA = massA * specificHeatA;
  const capB = massB * specificHeatB;
  return (capA * tempA + capB * tempB) / (capA + capB);
}

/**
 * Single step thermal conduction: Newton's law of cooling / heat transfer
 * dT_A / dt = -k * (T_A - T_B) / capA
 */
export function stepThermalConduction(
  tempA: number,
  tempB: number,
  massA: number,
  massB: number,
  rateConstantK: number = 0.35,
  dt: number = 0.1
): { nextTempA: number; nextTempB: number; heatFlowRate: number } {
  const diff = tempA - tempB;
  const heatFlow = rateConstantK * diff * dt;

  const nextTempA = tempA - heatFlow / Math.max(0.1, massA);
  const nextTempB = tempB + heatFlow / Math.max(0.1, massB);

  return {
    nextTempA,
    nextTempB,
    heatFlowRate: Math.abs(heatFlow / dt),
  };
}
