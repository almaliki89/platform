import React, { ReactNode } from 'react';

export interface HUDMetricItem {
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
  formula?: string;
  highlight?: boolean;
}

export type HUDMetric = HUDMetricItem;

export interface HUDMetricProps {
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
  formula?: string;
  highlight?: boolean;
  className?: string;
}

export const HUDMetric: React.FC<HUDMetricProps> = ({
  label,
  value,
  unit,
  color,
  formula,
  highlight,
  className = '',
}) => {
  return (
    <div
      className={`bg-white dark:bg-slate-900/90 border p-3 sm:p-4 rounded-xl shadow-sm backdrop-blur-md flex flex-col justify-between transition-all ${
        highlight
          ? 'border-cyan-500/50 bg-cyan-50/20 dark:bg-cyan-950/20 ring-1 ring-cyan-500/30'
          : 'border-slate-200 dark:border-slate-800'
      } ${className}`}
    >
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
        <span>{label}</span>
        {formula && (
          <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300">
            {formula}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className={`text-lg sm:text-2xl font-black font-mono tracking-tight ${
            color || (highlight ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-900 dark:text-white')
          }`}
        >
          {value}
        </span>
        {unit && (
          <span className="text-xs font-semibold text-slate-400">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};

interface SimulationHUDProps {
  metrics?: HUDMetricItem[];
  children?: ReactNode;
  className?: string;
}

export const SimulationHUD: React.FC<SimulationHUDProps> = ({
  metrics,
  children,
  className = '',
}) => {
  if (children) {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 ${className}`}>
        {children}
      </div>
    );
  }

  if (metrics && metrics.length > 0) {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 ${className}`}>
        {metrics.map((metric, idx) => (
          <HUDMetric
            key={idx}
            label={metric.label}
            value={metric.value}
            unit={metric.unit}
            color={metric.color}
            formula={metric.formula}
            highlight={metric.highlight}
          />
        ))}
      </div>
    );
  }

  return null;
};
