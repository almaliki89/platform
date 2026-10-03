import React from 'react';

interface LabSurfaceProps {
  type?: 'wooden' | 'metallic' | 'dark' | 'grid';
  className?: string;
  children?: React.ReactNode;
}

export const LabSurface: React.FC<LabSurfaceProps> = ({
  type = 'dark',
  className = '',
  children,
}) => {
  const getBgStyle = () => {
    switch (type) {
      case 'wooden':
        return 'bg-amber-950/20 border-amber-900/30';
      case 'metallic':
        return 'bg-slate-900 border-slate-800 shadow-inner';
      case 'dark':
      default:
        return 'bg-slate-950 border-slate-900 shadow-2xl';
    }
  };

  return (
    <div
      className={`relative w-full rounded-3xl border overflow-hidden p-4 sm:p-6 transition-all duration-300 ${getBgStyle()} ${className}`}
    >
      {/* Visual lab details */}
      {type === 'dark' && (
        <div className="absolute inset-0 bg-radial-gradient from-slate-900/30 via-transparent to-transparent pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
