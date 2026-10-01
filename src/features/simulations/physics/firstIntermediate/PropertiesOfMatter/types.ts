export type MatterState = 'solid' | 'liquid' | 'gas';

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
}

export interface MatterProperties {
  state: MatterState;
  stateAr: string;
  shapeAr: string;
  volumeAr: string;
  intermolecularDistanceAr: string;
  cohesiveForceAr: string;
  kineticEnergyLevelAr: string;
  particleSpeedMultiplier: number;
  vibrationRadius: number;
}
