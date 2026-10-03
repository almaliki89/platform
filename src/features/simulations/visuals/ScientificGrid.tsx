import React from 'react';

interface ScientificGridProps {
  width: number;
  height: number;
  gridSize?: number;
  color?: string;
  showAxes?: boolean;
}

export const ScientificGrid: React.FC<ScientificGridProps> = ({
  width,
  height,
  gridSize = 25,
  color = 'rgba(255, 255, 255, 0.05)',
  showAxes = true,
}) => {
  const columns = Math.ceil(width / gridSize);
  const rows = Math.ceil(height / gridSize);

  return (
    <g className="select-none pointer-events-none">
      {/* Grid Lines */}
      {Array.from({ length: columns + 1 }).map((_, i) => (
        <line
          key={`col-${i}`}
          x1={i * gridSize}
          y1={0}
          x2={i * gridSize}
          y2={height}
          stroke={color}
          strokeWidth="0.5"
        />
      ))}
      {Array.from({ length: rows + 1 }).map((_, j) => (
        <line
          key={`row-${j}`}
          x1={0}
          y1={j * gridSize}
          x2={width}
          y2={j * gridSize}
          stroke={color}
          strokeWidth="0.5"
        />
      ))}
      {/* Optional Central Axes */}
      {showAxes && (
        <>
          <line
            x1={width / 2}
            y1={0}
            x2={width / 2}
            y2={height}
            stroke="rgba(148, 163, 184, 0.15)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <line
            x1={0}
            y1={height / 2}
            x2={width}
            y2={height / 2}
            stroke="rgba(148, 163, 184, 0.15)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </>
      )}
    </g>
  );
};
