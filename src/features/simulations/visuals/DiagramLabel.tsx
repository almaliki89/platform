import React from 'react';

interface DiagramLabelProps {
  x: number;
  y: number;
  text: string;
  color?: string;
  bgColor?: string;
  fontSize?: number;
  anchor?: 'start' | 'middle' | 'end';
}

export const DiagramLabel: React.FC<DiagramLabelProps> = ({
  x,
  y,
  text,
  color = '#cbd5e1',
  bgColor = 'rgba(15, 23, 42, 0.85)',
  fontSize = 11,
  anchor = 'middle',
}) => {
  return (
    <g className="select-none pointer-events-none">
      {/* Label background card */}
      <rect
        x={x - (anchor === 'middle' ? 45 : anchor === 'end' ? 90 : 5)}
        y={y - 10}
        width={90}
        height={20}
        rx={4}
        fill={bgColor}
        stroke="rgba(255, 255, 255, 0.05)"
        strokeWidth="0.5"
      />
      <text
        x={x}
        y={y}
        fill={color}
        fontSize={fontSize}
        fontFamily="sans-serif"
        fontWeight="semibold"
        textAnchor={anchor}
        dominantBaseline="central"
      >
        {text}
      </text>
    </g>
  );
};
