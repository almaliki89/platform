export type OscillationMode = 'spring' | 'pendulum' | 'traveling-wave' | 'standing-wave' | 'doppler';

export interface SpringShmResult {
  massKg: number;
  springConstantK_N_m: number;
  amplitudeM: number;
  periodSec: number; // T = 2π √(m/k)
  frequencyHz: number; // f = 1/T
  angularFrequencyRad_s: number; // ω = √(k/m)
  maxVelocityM_s: number; // vmax = ω * A
  maxAccelerationM_s2: number; // amax = ω^2 * A
  totalEnergyJ: number; // E = 0.5 * k * A^2
}

export interface PendulumResult {
  lengthM: number;
  massKg: number;
  angleInitialDeg: number;
  periodSec: number; // T = 2π √(L/g)
  frequencyHz: number;
  angularFrequencyRad_s: number;
  smallAngleValid: boolean; // θ <= 15°
}

export interface WaveResult {
  frequencyHz: number;
  wavelengthM: number;
  waveSpeedM_s: number; // v = f * λ
  periodSec: number;
  harmonicNumber: number; // n for standing waves
}

export interface DopplerResult {
  sourceFreqHz: number;
  soundSpeedM_s: number; // v ≈ 343 m/s in air
  sourceSpeedM_s: number; // vs
  observerSpeedM_s: number; // vo
  sourceMovingToward: boolean;
  observerMovingToward: boolean;
  observedFrequencyHz: number; // f' = f * (v ± vo) / (v ∓ vs)
  frequencyShiftPercent: number;
}
