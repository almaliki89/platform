export interface MotionHistoryPoint {
  time: number;
  position: number;
  distance: number;
  velocity: number;
}

export interface MotionCalculations {
  distance: number; // m
  displacement: number; // m
  velocity: number; // m/s
  speed: number; // m/s
  acceleration: number; // m/s^2
}
