import { Vector2D, VectorResult, VectorMode } from './types';

/**
 * Resolves a 2D vector into its orthogonal components:
 * Ax = A * cos(theta)
 * Ay = A * sin(theta)
 */
export function resolveVectorComponents(magnitude: number, angleDeg: number): Vector2D {
  const mag = Math.max(0, magnitude);
  const rad = (angleDeg * Math.PI) / 180;
  const x = mag * Math.cos(rad);
  const y = mag * Math.sin(rad);

  return {
    magnitude: mag,
    angleDeg: ((angleDeg % 360) + 360) % 360,
    x,
    y,
  };
}

/**
 * Calculates vector resultant:
 * Rx = Ax +/- Bx
 * Ry = Ay +/- By
 * R = sqrt(Rx^2 + Ry^2)
 * theta = atan2(Ry, Rx)
 */
export function calculateVectorResultant(
  a: Vector2D,
  b: Vector2D,
  operation: 'add' | 'subtract'
): Vector2D {
  const sign = operation === 'add' ? 1 : -1;
  const rx = a.x + sign * b.x;
  const ry = a.y + sign * b.y;

  const magnitude = Math.sqrt(rx * rx + ry * ry);
  let angleRad = Math.atan2(ry, rx);
  let angleDeg = (angleRad * 180) / Math.PI;
  if (angleDeg < 0) angleDeg += 360;

  return {
    magnitude,
    angleDeg,
    x: rx,
    y: ry,
  };
}

/**
 * Dot product: A · B = Ax * Bx + Ay * By = |A||B| cos(theta)
 */
export function calculateDotProduct(a: Vector2D, b: Vector2D): number {
  return a.x * b.x + a.y * b.y;
}

/**
 * Cross product in 2D (z-component magnitude):
 * |A x B| = |Ax * By - Ay * Bx| = |A||B| sin(theta)
 */
export function calculateCrossProductMagnitude(
  a: Vector2D,
  b: Vector2D
): { magnitude: number; zComponent: number; directionAr: string } {
  const z = a.x * b.y - a.y * b.x;
  const magnitude = Math.abs(z);

  let directionAr = 'عمودي خارج من الصفحة ⊙ (+z)';
  if (z < -1e-6) {
    directionAr = 'عمودي داخل إلى الصفحة ⊗ (-z)';
  } else if (Math.abs(z) <= 1e-6) {
    directionAr = 'معدوم (المتجهان متوازيان θ = 0° أو 180°)';
  }

  return {
    magnitude,
    zComponent: z,
    directionAr,
  };
}

/**
 * Complete vector calculation model
 */
export function calculateVectorsState(
  magA: number,
  angleA: number,
  magB: number,
  angleB: number,
  mode: VectorMode
): VectorResult {
  const vectorA = resolveVectorComponents(magA, angleA);
  const vectorB = resolveVectorComponents(magB, angleB);

  const operation = mode === 'subtraction' ? 'subtract' : 'add';
  const resultant = calculateVectorResultant(vectorA, vectorB, operation);

  // Angle between A and B
  let diff = Math.abs(vectorA.angleDeg - vectorB.angleDeg);
  if (diff > 180) diff = 360 - diff;
  const angleBetweenDeg = diff;

  const dotProduct = calculateDotProduct(vectorA, vectorB);
  const cross = calculateCrossProductMagnitude(vectorA, vectorB);

  return {
    vectorA,
    vectorB,
    resultant,
    angleBetweenDeg,
    dotProduct,
    crossProductMagnitude: cross.magnitude,
    crossProductDirectionAr: cross.directionAr,
  };
}
