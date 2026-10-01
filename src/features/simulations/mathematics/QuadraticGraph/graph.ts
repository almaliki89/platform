import { Point2D } from './types';

export interface GraphBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export const DEFAULT_GRAPH_BOUNDS: GraphBounds = {
  minX: -8,
  maxX: 8,
  minY: -10,
  maxY: 15,
};

export function createCoordinateMapper(
  svgWidth: number,
  svgHeight: number,
  bounds: GraphBounds = DEFAULT_GRAPH_BOUNDS
) {
  const { minX, maxX, minY, maxY } = bounds;

  const toSvgX = (mathX: number) => {
    return ((mathX - minX) / (maxX - minX)) * svgWidth;
  };

  const toSvgY = (mathY: number) => {
    // Invert Y for SVG coordinates
    return svgHeight - ((mathY - minY) / (maxY - minY)) * svgHeight;
  };

  return { toSvgX, toSvgY };
}

export function generateCurvePoints(
  a: number,
  b: number,
  c: number,
  bounds: GraphBounds = DEFAULT_GRAPH_BOUNDS,
  steps: number = 200
): Point2D[] {
  const points: Point2D[] = [];
  const dx = (bounds.maxX - bounds.minX) / steps;

  for (let i = 0; i <= steps; i++) {
    const x = bounds.minX + i * dx;
    const y = a * x * x + b * x + c;
    points.push({ x, y });
  }

  return points;
}
