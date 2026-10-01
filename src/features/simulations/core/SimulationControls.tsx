import React, { ReactNode } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface SimulationControlsProps {
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  onReset?: () => void;
  children?: ReactNode;
  actions?: ReactNode;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onReset,
  children,
  actions,
}) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-2xl space-y-4">
      {/* Primary Action Buttons */}
      {(onTogglePlay || onReset || actions) && (
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            {onTogglePlay && (
              <button
                type="button"
                onClick={onTogglePlay}
                aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل المحاكاة'}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-sm transition-all transform active:scale-95 ${
                  isPlaying
                    ? 'bg-amber-600 hover:bg-amber-500'
                    : 'bg-emerald-600 hover:bg-emerald-500'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'إيقاف مؤقت' : 'تشغيل التجربة'}</span>
              </button>
            )}

            {onReset && (
              <button
                type="button"
                onClick={onReset}
                aria-label="إعادة ضبط التجربة"
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة ضبط</span>
              </button>
            )}
          </div>

          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      {/* Parameter Sliders / Custom Inputs */}
      {children && <div className="space-y-4">{children}</div>}
    </div>
  );
};
