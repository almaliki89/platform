import React from 'react';

interface Point {
  x: number;
  y: number;
}

interface MotionTrailProps {
  points: Point[];
  color?: string;
  maxPoints?: number;
  lineWidth?: number;
}

export const MotionTrail: React.FC<MotionTrailProps> = ({
  points,
  color = 'rgba(56, 189, 248, 0.4)',
  maxPoints = 20,
  lineWidth = 3,
}) => {
  if (points.length < 2) return null;

  const renderPoints = points.slice(-maxPoints);

  return (
    <g className="select-none pointer-events-none">
      {renderPoints.map((point, index) => {
        if (index === 0) return null;
        const prev = renderPoints[index - 1];
        const opacity = index / renderPoints.length;

        return (
          <line
            key={index}
            x1={prev.x}
            y1={prev.y}
            x2={point.x}
            y2={point.y}
            stroke={color}
            strokeWidth={lineWidth}
            strokeOpacity={opacity}
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
};
