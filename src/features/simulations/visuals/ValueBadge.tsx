import React from 'react';

interface ValueBadgeProps {
  label: string;
  value: string | number;
  unit?: string;
  color?: 'cyan' | 'amber' | 'emerald' | 'rose' | 'indigo' | 'slate';
  className?: string;
}

export const ValueBadge: React.FC<ValueBadgeProps> = ({
  label,
  value,
  unit,
  color = 'slate',
  className = '',
}) => {
  const getColorStyles = () => {
    switch (color) {
      case 'cyan':
        return 'bg-cyan-500/10 border-cyan-500/20 text-cyan-700 dark:text-cyan-300';
      case 'amber':
        return 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300';
      case 'emerald':
        return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300';
      case 'rose':
        return 'bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-300';
      case 'indigo':
        return 'bg-indigo-500/10 border-indigo-500/20 text-indigo-700 dark:text-indigo-300';
      case 'slate':
      default:
        return 'bg-slate-500/10 border-slate-500/20 text-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold ${getColorStyles()} ${className}`}
    >
      <span className="opacity-80">{label}</span>
      <span className="font-mono font-bold tracking-tight text-[13px] tabular-nums">{value}</span>
      {unit && <span className="text-[10px] opacity-70 font-mono font-normal">{unit}</span>}
    </div>
  );
};
