import React from 'react';

interface Point {
  x: number;
  y: number;
}

interface ScientificGraphProps {
  data: Point[];
  xLabel: string;
  yLabel: string;
  xRange: [number, number];
  yRange: [number, number];
  currentPoint?: Point;
  color?: string;
  height?: number;
}

export const ScientificGraph: React.FC<ScientificGraphProps> = ({
  data,
  xLabel,
  yLabel,
  xRange,
  yRange,
  currentPoint,
  color = '#06b6d4',
  height = 120,
}) => {
  const width = 400;
  const padding = { top: 10, right: 20, bottom: 25, left: 35 };
  
  const mapX = (x: number) => padding.left + ((x - xRange[0]) / (xRange[1] - xRange[0])) * (width - padding.left - padding.right);
  const mapY = (y: number) => (height - padding.bottom) - ((y - yRange[0]) / (yRange[1] - yRange[0])) * (height - padding.top - padding.bottom);

  const pointsString = data
    .map(p => `${mapX(p.x)},${mapY(p.y)}`)
    .join(' ');

  return (
    <div className="bg-slate-950/50 backdrop-blur rounded-2xl border border-slate-800 p-4 space-y-2">
      <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
        <span>{yLabel} vs {xLabel}</span>
      </div>
      
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        {/* Axes */}
        <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="#475569" strokeWidth="1" />
        <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} stroke="#475569" strokeWidth="1" />
        
        {/* Labels */}
        <text x={width - padding.right} y={height - 5} fill="#94a3b8" fontSize="9" textAnchor="end">{xLabel}</text>
        <text x={5} y={padding.top + 5} fill="#94a3b8" fontSize="9" transform={`rotate(-90, 5, ${padding.top + 5})`} textAnchor="end">{yLabel}</text>

        {/* Data Line */}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={pointsString}
          strokeLinejoin="round"
        />

        {/* Current Point */}
        {currentPoint && (
          <g>
            <circle 
              cx={mapX(currentPoint.x)} 
              cy={mapY(currentPoint.y)} 
              r="4" 
              fill="#ef4444" 
              className="animate-pulse"
            />
            <text 
              x={mapX(currentPoint.x)} 
              y={mapY(currentPoint.y) - 8} 
              fill="#ef4444" 
              fontSize="8" 
              fontWeight="bold" 
              textAnchor="middle"
            >
              ({currentPoint.x.toFixed(1)}, {currentPoint.y.toFixed(2)})
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
