export type WaveType = 'transverse' | 'longitudinal';

export interface WaveCalculations {
  waveSpeed: number; // m/s
  period: number; // s
  frequency: number; // Hz
  wavelength: number; // m
  amplitudeCm: number; // cm
  soundPitchAr: string;
  soundLoudnessAr: string;
}
