import React, { ReactNode } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export interface SimulationControlsProps {
  title?: string;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  onReset?: () => void;
  children?: ReactNode;
  actions?: ReactNode;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  title,
  isPlaying,
  onTogglePlay,
  onReset,
  children,
  actions,
}) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-2xl space-y-4">
      {/* Title & Primary Action Buttons */}
      {(title || onTogglePlay || onReset || actions) && (
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          {title ? (
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">{title}</h3>
          ) : (
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
              {actions}
            </div>
          )}

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              aria-label="إعادة ضبط المتغيرات"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط</span>
            </button>
          )}
        </div>
      )}

      {/* Sliders and custom form controls */}
      {children && <div className="space-y-4">{children}</div>}
    </div>
  );
};
