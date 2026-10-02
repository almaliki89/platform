import {
  FluxResult,
  FaradayResult,
  MotionalEmfResult,
  GeneratorResult,
  SelfInductionResult,
} from './types';

/**
 * Magnetic Flux: Φ = B * A * cos(θ)
 * where θ is the angle between B and the normal vector of the coil area.
 */
export function calculateMagneticFlux(
  bFieldTesla: number,
  areaCm2: number,
  angleDeg: number
): FluxResult {
  const areaM2 = Math.max(1e-6, areaCm2 * 1e-4);
  const rad = (angleDeg * Math.PI) / 180;
  const flux = bFieldTesla * areaM2 * Math.cos(rad);

  return {
    bFieldTesla,
    areaM2,
    angleDeg,
    magneticFluxWebers: flux,
  };
}

/**
 * Faraday's Law of Induction & Lenz's Law:
 * ε = -N * (ΔΦ / Δt)
 */
export function calculateFaradayInduction(
  turnsN: number,
  deltaFluxWb: number,
  deltaTimeSec: number,
  isApproaching: boolean
): FaradayResult {
  const safeDt = Math.max(0.001, deltaTimeSec);
  const inducedEmf = -turnsN * (deltaFluxWb / safeDt);

  let lenzDescription = '';
  if (isApproaching) {
    lenzDescription = 'الفيض المغناطيسي متزايد (ΔΦ > 0): يتولد قطب مشابه للمغترب لمقاومة الاقتراب (تنافر)';
  } else {
    lenzDescription = 'الفيض المغناطيسي متناقص (ΔΦ < 0): يتولد قطب مخالف للمبتعد لمقاومة الابتعاد (تجاذب)';
  }

  return {
    turnsN,
    deltaFluxWb,
    deltaTimeSec: safeDt,
    inducedEmfVolts: inducedEmf,
    lenzDirectionAr: lenzDescription,
  };
}

/**
 * Motional EMF on a sliding conducting rod:
 * ε = v * B * L
 * I = ε / R
 * F_drag = I * L * B
 * P = I^2 * R
 */
export function calculateMotionalEmf(
  velocityM_s: number,
  bFieldTesla: number,
  rodLengthM: number,
  resistanceOhms: number
): MotionalEmfResult {
  const safeR = Math.max(0.1, resistanceOhms);
  const emf = velocityM_s * bFieldTesla * rodLengthM;
  const current = emf / safeR;
  const brakingForce = current * rodLengthM * bFieldTesla;
  const power = Math.pow(current, 2) * safeR;

  return {
    bFieldTesla,
    rodLengthM,
    velocityM_s,
    resistanceOhms: safeR,
    motionalEmfVolts: emf,
    inducedCurrentAmperes: current,
    magneticBrakingForceN: brakingForce,
    dissipatedPowerWatts: power,
  };
}

/**
 * AC Generator / Rotating Coil:
 * ε_max = N * B * A * ω
 * ε(t) = ε_max * sin(ω * t)
 */
export function calculateGenerator(
  turnsN: number,
  bFieldTesla: number,
  areaCm2: number,
  rpm: number,
  timeSec: number
): GeneratorResult {
  const areaM2 = Math.max(1e-6, areaCm2 * 1e-4);
  const omega = (rpm * 2 * Math.PI) / 60; // rad/s
  const freq = omega / (2 * Math.PI);
  const peakEmf = turnsN * bFieldTesla * areaM2 * omega;
  const instantEmf = peakEmf * Math.sin(omega * timeSec);

  return {
    turnsN,
    bFieldTesla,
    areaM2,
    angularSpeedRad_s: omega,
    peakEmfVolts: peakEmf,
    frequencyHz: freq,
    timeSec,
    instantaneousEmfVolts: instantEmf,
  };
}

/**
 * Self-Induction & Energy in Inductor:
 * ε_L = -L * (ΔI / Δt)
 * U_L = 0.5 * L * I^2
 */
export function calculateSelfInduction(
  inductanceH: number,
  currentA: number,
  deltaIA: number,
  deltaTimeSec: number
): SelfInductionResult {
  const safeL = Math.max(0.001, inductanceH);
  const safeDt = Math.max(0.001, deltaTimeSec);
  const emfL = -safeL * (deltaIA / safeDt);
  const energy = 0.5 * safeL * Math.pow(currentA, 2);

  return {
    inductanceHenrys: safeL,
    currentAmperes: currentA,
    deltaICurrentA: deltaIA,
    deltaTimeSec: safeDt,
    selfInducedEmfVolts: emfL,
    storedMagneticEnergyJoules: energy,
  };
}
