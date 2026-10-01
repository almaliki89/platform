import React, { ReactNode } from 'react';

export interface HUDMetric {
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
  formula?: string;
}

interface SimulationHUDProps {
  metrics: HUDMetric[];
  className?: string;
}

export const SimulationHUD: React.FC<SimulationHUDProps> = ({ metrics, className = '' }) => {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 ${className}`}>
      {metrics.map((metric, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-3 sm:p-4 rounded-xl shadow-sm backdrop-blur-md flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
            <span>{metric.label}</span>
            {metric.formula && (
              <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300">
                {metric.formula}
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-1">
            <span
              className={`text-lg sm:text-2xl font-black font-mono tracking-tight ${
                metric.color || 'text-slate-900 dark:text-white'
              }`}
            >
              {metric.value}
            </span>
            {metric.unit && (
              <span className="text-xs font-semibold text-slate-400">
                {metric.unit}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
