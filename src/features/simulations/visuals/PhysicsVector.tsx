import React from 'react';

interface PhysicsVectorProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color?: string;
  label?: string;
  magnitude?: string | number;
  unit?: string;
  lineWidth?: number;
  dashed?: boolean;
}

export const PhysicsVector: React.FC<PhysicsVectorProps> = ({
  startX,
  startY,
  endX,
  endY,
  color = '#3b82f6',
  label,
  magnitude,
  unit,
  lineWidth = 3,
  dashed = false,
}) => {
  const dx = endX - startX;
  const dy = endY - startY;
  const angle = Math.atan2(dy, dx);
  const length = Math.sqrt(dx * dx + dy * dy);

  if (length < 2) return null;

  // Arrowhead math
  const headLength = Math.min(15, length * 0.3 + 4);
  const arrowAngle = Math.PI / 6; // 30 degrees

  const arrowLeftX = endX - headLength * Math.cos(angle - arrowAngle);
  const arrowLeftY = endY - headLength * Math.sin(angle - arrowAngle);
  const arrowRightX = endX - headLength * Math.cos(angle + arrowAngle);
  const arrowRightY = endY - headLength * Math.sin(angle + arrowAngle);

  // Text positioning
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  const offsetDistance = 14;
  const textX = midX - offsetDistance * Math.sin(angle);
  const textY = midY + offsetDistance * Math.cos(angle);

  return (
    <g className="select-none pointer-events-none">
      {/* Vector Line */}
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={color}
        strokeWidth={lineWidth}
        strokeDasharray={dashed ? '4 4' : undefined}
        strokeLinecap="round"
      />
      {/* Arrowhead */}
      <polygon
        points={`${endX},${endY} ${arrowLeftX},${arrowLeftY} ${arrowRightX},${arrowRightY}`}
        fill={color}
      />
      {/* Label and Magnitude */}
      {(label || magnitude !== undefined) && (
        <text
          x={textX}
          y={textY}
          fill={color}
          fontSize="11"
          fontWeight="bold"
          fontFamily="sans-serif"
          textAnchor="middle"
          dominantBaseline="central"
          className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] filter"
        >
          {label ? `${label}: ` : ''}
          {magnitude !== undefined ? magnitude : ''}
          {unit ? ` ${unit}` : ''}
        </text>
      )}
    </g>
  );
};
