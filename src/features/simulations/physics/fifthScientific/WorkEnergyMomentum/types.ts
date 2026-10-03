export type WorkEnergyMode = 'work-energy' | 'impulse-momentum' | 'collisions';

export type CollisionType = 'elastic' | 'inelastic';

export interface WorkEnergyState {
  massKg: number;
  appliedForceN: number;
  forceAngleDeg: number;
  displacementM: number;
  initialVelocityM_s: number;
  frictionCoeff: number; // mu_k
  workAppliedJ: number;
  workFrictionJ: number;
  workNetJ: number;
  initialKeJ: number;
  finalKeJ: number;
  finalVelocityM_s: number;
}

export interface ImpulseMomentumState {
  massKg: number;
  initialVelocityM_s: number;
  appliedForceN: number;
  durationSec: number;
  initialMomentumKgM_s: number;
  impulseN_s: number;
  finalMomentumKgM_s: number;
  finalVelocityM_s: number;
  initialKeJ: number;
  finalKeJ: number;
}

export interface CollisionState {
  m1Kg: number;
  v1InitialM_s: number;
  m2Kg: number;
  v2InitialM_s: number;
  collisionType: CollisionType;
  v1FinalM_s: number;
  v2FinalM_s: number;
  totalMomentumBeforeKgM_s: number;
  totalMomentumAfterKgM_s: number;
  totalKeBeforeJ: number;
  totalKeAfterJ: number;
  keLostJ: number;
}
