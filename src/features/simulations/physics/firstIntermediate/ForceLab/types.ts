export interface ForceState {
  leftForce: number; // N
  rightForce: number; // N
  mass: number; // kg
  position: number; // visual offset in px
  velocity: number;
}

export interface ForceResult {
  netForce: number; // N
  direction: 'left' | 'right' | 'balanced';
  directionAr: string;
  isBalanced: boolean;
  acceleration: number; // m/s^2
  explanationAr: string;
}
