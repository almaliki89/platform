import React from 'react';

interface LegendItem {
  color: string;
  label: string;
  isDashed?: boolean;
}

interface PhysicsLegendProps {
  items: LegendItem[];
  className?: string;
}

export const PhysicsLegend: React.FC<PhysicsLegendProps> = ({
  items,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-wrap gap-x-4 gap-y-1.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 ${className}`}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {/* Indicator */}
          <span
            className={`block w-4 h-1.5 rounded-full ${item.isDashed ? 'border-t-2 border-dashed' : ''}`}
            style={{
              backgroundColor: item.isDashed ? 'transparent' : item.color,
              borderColor: item.color,
            }}
          />
          <span className="font-medium text-slate-300">{item.label}</span>
        </div>
      ))}
    </div>
  );
};
