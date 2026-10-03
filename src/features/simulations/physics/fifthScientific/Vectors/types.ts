export type VectorMode = 'components' | 'addition' | 'subtraction' | 'dot-product' | 'cross-product';

export interface Vector2D {
  magnitude: number;
  angleDeg: number;
  x: number;
  y: number;
}

export interface VectorResult {
  vectorA: Vector2D;
  vectorB: Vector2D;
  resultant: Vector2D;
  angleBetweenDeg: number;
  dotProduct: number;
  crossProductMagnitude: number;
  crossProductDirectionAr: string; // خارج من الصفحة ⊙ أو داخل إلى الصفحة ⊗
}
