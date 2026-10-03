export type InductionMode = 'magnet-coil' | 'sliding-rod' | 'rotating-coil' | 'self-induction';

export interface FluxResult {
  bFieldTesla: number;
  areaM2: number;
  angleDeg: number;
  magneticFluxWebers: number; // Φ = B * A * cos(θ)
}

export interface FaradayResult {
  turnsN: number;
  deltaFluxWb: number;
  deltaTimeSec: number;
  inducedEmfVolts: number; // ε = -N * ΔΦ / Δt
  lenzDirectionAr: string;
}

export interface MotionalEmfResult {
  bFieldTesla: number;
  rodLengthM: number;
  velocityM_s: number;
  resistanceOhms: number;
  motionalEmfVolts: number; // ε = v * B * L
  inducedCurrentAmperes: number; // I = ε / R
  magneticBrakingForceN: number; // F_b = I * L * B
  dissipatedPowerWatts: number; // P = I^2 * R
}

export interface GeneratorResult {
  turnsN: number;
  bFieldTesla: number;
  areaM2: number;
  angularSpeedRad_s: number; // ω
  peakEmfVolts: number; // ε_max = N * B * A * ω
  frequencyHz: number;
  timeSec: number;
  instantaneousEmfVolts: number; // ε(t) = ε_max * sin(ω*t)
}

export interface SelfInductionResult {
  inductanceHenrys: number; // L
  currentAmperes: number; // I
  deltaICurrentA: number;
  deltaTimeSec: number;
  selfInducedEmfVolts: number; // ε_L = -L * (ΔI / Δt)
  storedMagneticEnergyJoules: number; // U_L = 0.5 * L * I^2
}
