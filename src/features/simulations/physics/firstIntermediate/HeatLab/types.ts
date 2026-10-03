export interface ThermalState {
  tempA: number; // °C
  tempB: number; // °C
  massA: number; // kg
  massB: number; // kg
  isConnected: boolean;
}

export interface ThermalHistoryPoint {
  time: number;
  tempA: number;
  tempB: number;
}
