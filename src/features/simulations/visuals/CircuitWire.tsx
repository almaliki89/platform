import React from 'react';
import { motion } from 'framer-motion';

interface CircuitWireProps {
  points: { x: number; y: number }[];
  currentA: number;
  color?: string;
  showElectrons?: boolean;
}

export const CircuitWire: React.FC<CircuitWireProps> = ({
  points,
  currentA,
  color = '#38bdf8',
  showElectrons = true,
}) => {
  const pathData = points.length > 0 
    ? `M ${points[0].x} ${points[0].y} ${points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')}`
    : '';

  // Speed proportional to current
  const duration = Math.max(0.5, 5 / (Math.abs(currentA) || 0.1));

  return (
    <g>
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]"
      />
      
      {showElectrons && currentA !== 0 && (
        <path
          d={pathData}
          fill="none"
          stroke="#fef08a"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1, 15"
          className="animate-[dash_linear_infinite]"
          style={{ 
            animationDuration: `${duration}s`,
            animationDirection: currentA > 0 ? 'normal' : 'reverse'
          } as any}
        />
      )}
    </g>
  );
};
