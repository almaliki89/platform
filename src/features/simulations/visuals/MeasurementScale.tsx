import React from 'react';

interface MeasurementScaleProps {
  x: number;
  y: number;
  width: number;
  minVal?: number;
  maxVal?: number;
  unit?: string;
  step?: number;
  color?: string;
}

export const MeasurementScale: React.FC<MeasurementScaleProps> = ({
  x,
  y,
  width,
  minVal = 0,
  maxVal = 10,
  unit = 'cm',
  step = 1,
  color = '#94a3b8',
}) => {
  const stepsCount = (maxVal - minVal) / step;
  const tickGap = width / stepsCount;

  return (
    <g className="select-none pointer-events-none">
      {/* Base Line */}
      <line x1={x} y1={y} x2={x + width} y2={y} stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Tick marks and labels */}
      {Array.from({ length: stepsCount + 1 }).map((_, index) => {
        const tickX = x + index * tickGap;
        const value = minVal + index * step;
        const isMajor = index % 5 === 0 || stepsCount <= 10;
        const tickHeight = isMajor ? 12 : 6;

        return (
          <g key={index}>
            <line
              x1={tickX}
              y1={y}
              x2={tickX}
              y2={y + tickHeight}
              stroke={color}
              strokeWidth={isMajor ? '1.5' : '1'}
            />
            {isMajor && (
              <text
                x={tickX}
                y={y + tickHeight + 12}
                fill={color}
                fontSize="10"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {value.toFixed(0)}
                {index === stepsCount ? ` ${unit}` : ''}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
};
