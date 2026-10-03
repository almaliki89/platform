import React from 'react';

interface FieldLineProps {
  d: string;
  color?: string;
  opacity?: number;
  animated?: boolean;
}

export const FieldLine: React.FC<FieldLineProps> = ({
  d,
  color = '#38bdf8',
  opacity = 0.35,
  animated = false,
}) => {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeOpacity={opacity}
      strokeDasharray={animated ? '4 4' : undefined}
      className={animated ? 'animate-[dash_20s_linear_infinite]' : undefined}
    />
  );
};
