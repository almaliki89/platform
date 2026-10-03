import {
  FirstLawResult,
  PvProcessResult,
  HeatEngineResult,
  GasProcessType,
} from './types';

/**
 * First Law of Thermodynamics: ΔU = Q - W
 * Sign convention:
 * Q > 0: Heat added to system
 * Q < 0: Heat released from system
 * W > 0: Work done by system (expansion)
 * W < 0: Work done on system (compression)
 */
export function calculateFirstLaw(heatQ: number, workW: number): FirstLawResult {
  const deltaU = heatQ - workW;

  let description = '';
  if (deltaU > 0) {
    description = 'زيادة في الطاقة الداخلية للنظام (ارتفاع درجة الحرارة)';
  } else if (deltaU < 0) {
    description = 'نقصان في الطاقة الداخلية للنظام (انخفاض درجة الحرارة)';
  } else {
    description = 'ثبوت الطاقة الداخلية للنظام (عملية متساوية درجة الحرارة Isothermal)';
  }

  return {
    heatAddedQ_J: heatQ,
    workDoneBySystemW_J: workW,
    deltaInternalEnergyU_J: deltaU,
    systemStateDescriptionAr: description,
  };
}

/**
 * Thermodynamic Processes:
 * Units note: 1 kPa * 1 L = 10^3 Pa * 10^-3 m^3 = 1 Joule (J)
 */
export function calculatePvProcess(
  processType: GasProcessType,
  pInitialKPa: number,
  vInitialL: number,
  vTargetL: number,
  pTargetKPa: number
): PvProcessResult {
  const gamma = 1.4; // adiabatic index for air/diatomic gas

  let pFinal = pInitialKPa;
  let vFinal = vTargetL;
  let workDone = 0;
  let deltaU = 0;
  let heatTransferred = 0;

  const points: { v: number; p: number }[] = [];
  const steps = 30;

  if (processType === 'isobaric') {
    // Constant Pressure: P_final = P_initial
    pFinal = pInitialKPa;
    vFinal = vTargetL;
    workDone = pInitialKPa * (vFinal - vInitialL); // 1 kPa * 1 L = 1 J
    deltaU = 1.5 * workDone; // for ideal monatomic/simple gas ΔU = 3/2 nRΔT = 1.5 PΔV
    heatTransferred = deltaU + workDone; // Q = ΔU + W

    for (let i = 0; i <= steps; i++) {
      const v = vInitialL + ((vFinal - vInitialL) * i) / steps;
      points.push({ v, p: pFinal });
    }
  } else if (processType === 'isochoric') {
    // Constant Volume: V_final = V_initial
    vFinal = vInitialL;
    pFinal = pTargetKPa;
    workDone = 0;
    deltaU = 1.5 * vInitialL * (pFinal - pInitialKPa);
    heatTransferred = deltaU;

    for (let i = 0; i <= steps; i++) {
      const p = pInitialKPa + ((pFinal - pInitialKPa) * i) / steps;
      points.push({ v: vFinal, p });
    }
  } else if (processType === 'isothermal') {
    // Constant Temperature: P * V = const
    vFinal = vTargetL;
    pFinal = (pInitialKPa * vInitialL) / Math.max(0.1, vFinal);
    workDone = pInitialKPa * vInitialL * Math.log(vFinal / vInitialL);
    deltaU = 0;
    heatTransferred = workDone;

    for (let i = 0; i <= steps; i++) {
      const v = vInitialL + ((vFinal - vInitialL) * i) / steps;
      const p = (pInitialKPa * vInitialL) / v;
      points.push({ v, p });
    }
  } else if (processType === 'adiabatic') {
    // Adiabatic: Q = 0, P * V^γ = const
    vFinal = vTargetL;
    pFinal = pInitialKPa * Math.pow(vInitialL / Math.max(0.1, vFinal), gamma);
    // W = (P_i*V_i - P_f*V_f) / (γ - 1)
    workDone = (pInitialKPa * vInitialL - pFinal * vFinal) / (gamma - 1);
    heatTransferred = 0;
    deltaU = -workDone;

    for (let i = 0; i <= steps; i++) {
      const v = vInitialL + ((vFinal - vInitialL) * i) / steps;
      const p = pInitialKPa * Math.pow(vInitialL / v, gamma);
      points.push({ v, p });
    }
  }

  return {
    processType,
    pInitialKPa,
    vInitialL,
    pFinalKPa: pFinal,
    vFinalL: vFinal,
    workDoneJ: workDone,
    heatTransferredJ: heatTransferred,
    deltaInternalEnergyJ: deltaU,
    pvCurvePoints: points,
  };
}

/**
 * Heat Engine & Carnot Efficiency:
 * η_Carnot = 1 - (Tc / Th)
 */
export function calculateHeatEngine(
  tHotK: number,
  tColdK: number,
  heatInputQh_J: number
): HeatEngineResult {
  const safeTh = Math.max(tColdK + 10, tHotK);
  const efficiency = 1 - tColdK / safeTh;
  const workOutput = efficiency * heatInputQh_J;
  const heatExhaust = heatInputQh_J - workOutput;

  return {
    tHotK: safeTh,
    tColdK,
    heatInputQh_J,
    carnotEfficiencyPercent: efficiency * 100,
    actualWorkOutputJ: workOutput,
    heatExhaustQc_J: heatExhaust,
  };
}
