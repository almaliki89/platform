import { Point2D, QuadraticRootsResult, QuadraticAnalysis } from './types';

/**
 * Calculates the discriminant Delta = b^2 - 4ac
 */
export function calculateDiscriminant(a: number, b: number, c: number): number {
  return b * b - 4 * a * c;
}

/**
 * Calculates the vertex (h, k) where h = -b / (2a), k = f(h)
 */
export function calculateVertex(a: number, b: number, c: number): Point2D | null {
  if (a === 0) return null;
  const h = -b / (2 * a);
  const k = a * h * h + b * h + c;
  return { x: h, y: k };
}

/**
 * Calculates the axis of symmetry x = -b / (2a)
 */
export function calculateAxisOfSymmetry(a: number, b: number): number | null {
  if (a === 0) return null;
  return -b / (2 * a);
}

/**
 * Calculates real roots or classifies complex roots
 */
export function calculateRoots(a: number, b: number, c: number): QuadraticRootsResult {
  if (a === 0) {
    if (b === 0) {
      return {
        type: 'linear',
        discriminant: 0,
        roots: [],
        explanationAr: 'معادلة ثابتة y = ' + c,
      };
    }
    const root = -c / b;
    return {
      type: 'linear',
      discriminant: 0,
      roots: [root],
      explanationAr: `معادلة خطية، الجذر الفردي x = ${root.toFixed(2)}`,
    };
  }

  const delta = calculateDiscriminant(a, b, c);

  if (delta > 0) {
    const sqrtDelta = Math.sqrt(delta);
    const r1 = (-b + sqrtDelta) / (2 * a);
    const r2 = (-b - sqrtDelta) / (2 * a);
    const sortedRoots = [r1, r2].sort((x, y) => x - y);
    return {
      type: 'two_real',
      discriminant: delta,
      roots: sortedRoots,
      explanationAr: `المميز موجب (Δ = ${delta.toFixed(2)} > 0): يوجد جذران حقيقيان متمايزان. المنحنى يقطع محور السينات في نقطتين.`,
    };
  } else if (Math.abs(delta) < 1e-9) {
    const root = -b / (2 * a);
    return {
      type: 'one_real',
      discriminant: 0,
      roots: [root],
      explanationAr: `المميز يساوي صفراً (Δ = 0): يوجد جذر حقيقي مكرر (نقطة تماس واحدة مع محور السينات).`,
    };
  } else {
    return {
      type: 'complex',
      discriminant: delta,
      roots: [],
      explanationAr: `المميز سالب (Δ = ${delta.toFixed(2)} < 0): لا توجد جذور حقيقية في ℝ (المنحنى لا يقطع محور السينات).`,
    };
  }
}

/**
 * Complete Quadratic Analysis
 */
export function analyzeQuadratic(a: number, b: number, c: number): QuadraticAnalysis {
  const isQuadratic = a !== 0;
  const vertex = calculateVertex(a, b, c);
  const axis = calculateAxisOfSymmetry(a, b);
  const rootsResult = calculateRoots(a, b, c);

  let direction: 'upward' | 'downward' | 'linear' = 'linear';
  if (a > 0) direction = 'upward';
  else if (a < 0) direction = 'downward';

  // Format equation string
  let eq = 'y = ';
  if (a !== 0) {
    if (a === 1) eq += 'x²';
    else if (a === -1) eq += '-x²';
    else eq += `${a}x²`;
  }

  if (b !== 0) {
    const sign = b > 0 ? (a !== 0 ? ' + ' : '') : ' - ';
    const absB = Math.abs(b);
    eq += `${sign}${absB === 1 ? 'x' : absB + 'x'}`;
  }

  if (c !== 0 || (a === 0 && b === 0)) {
    const sign = c >= 0 ? (a !== 0 || b !== 0 ? ' + ' : '') : ' - ';
    eq += `${sign}${Math.abs(c)}`;
  }

  return {
    isQuadratic,
    vertex,
    axisOfSymmetry: axis,
    direction,
    yIntercept: { x: 0, y: c },
    rootsResult,
    equationString: eq,
  };
}
