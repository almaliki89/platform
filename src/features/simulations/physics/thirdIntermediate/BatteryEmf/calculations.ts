import { BatteryEmfResult } from './types';

/**
 * Pure calculation for Battery EMF and Terminal Voltage:
 * When switch is open:
 *   I = 0
 *   V_terminal = emf
 *   Internal drop = 0
 * When switch is closed:
 *   I = emf / (R + r)
 *   V_terminal = emf - I * r = I * R
 *   Internal drop = I * r
 *   P_load = I^2 * R
 *   P_internal = I^2 * r
 */
export function calculateBatteryCircuit(
  emfV: number,
  internalResistanceOhm: number,
  loadResistanceOhm: number,
  isSwitchClosed: boolean
): BatteryEmfResult {
  const safeEmf = Math.max(0, emfV);
  const safer = Math.max(0.01, internalResistanceOhm);
  const safeR = Math.max(0.1, loadResistanceOhm);

  if (!isSwitchClosed) {
    return {
      currentA: 0,
      terminalVoltageV: safeEmf,
      internalDropV: 0,
      powerLoadW: 0,
      powerWastedW: 0,
      efficiencyPercent: 100,
      stateExplanationAr:
        'الدائرة مفتوحة: لا يمر تيار كهربائي (I = 0)، وفرق الجهد بين قطبي البطارية (قراءة الفولطميتر) يساوي تماماً القوة الدافعة الكهربائية (V_terminal = ε).',
    };
  }

  const currentA = safeEmf / (safeR + safer);
  const internalDropV = currentA * safer;
  const terminalVoltageV = Math.max(0, safeEmf - internalDropV);
  const powerLoadW = currentA * currentA * safeR;
  const powerWastedW = currentA * currentA * safer;
  const totalPower = powerLoadW + powerWastedW;
  const efficiencyPercent = totalPower > 0 ? (powerLoadW / totalPower) * 100 : 0;

  const stateExplanationAr = `الدائرة مغلقة: يتدفق تيار مقداره ${currentA.toFixed(2)} A. يحدث هبوط في الجهد داخل البطارية بسبب مقاومتها الداخلية (I·r = ${internalDropV.toFixed(2)} V)، مما يجعل الجهد على طرفي الحمل الخارجي (${terminalVoltageV.toFixed(2)} V) أقل من القوة الدافعة الكهربائية للبطارية (${safeEmf.toFixed(1)} V).`;

  return {
    currentA,
    terminalVoltageV,
    internalDropV,
    powerLoadW,
    powerWastedW,
    efficiencyPercent,
    stateExplanationAr,
  };
}
