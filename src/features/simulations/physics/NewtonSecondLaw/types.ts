export interface NewtonSimulationState {
  mass: number; // kg
  force: number; // N
  frictionCoefficient: number; // mu
  time: number; // seconds
  position: number; // meters
  velocity: number; // m/s
  acceleration: number; // m/s^2
  isPlaying: boolean;
}

export interface KinematicsHistoryPoint {
  time: number;
  velocity: number;
  position: number;
  acceleration: number;
}
