export interface Point2D {
  x: number;
  y: number;
}

export type RootType = 'two_real' | 'one_real' | 'complex' | 'linear';

export interface QuadraticRootsResult {
  type: RootType;
  discriminant: number;
  roots: number[];
  explanationAr: string;
}

export interface QuadraticAnalysis {
  isQuadratic: boolean;
  vertex: Point2D | null;
  axisOfSymmetry: number | null;
  direction: 'upward' | 'downward' | 'linear';
  yIntercept: Point2D;
  rootsResult: QuadraticRootsResult;
  equationString: string;
}
