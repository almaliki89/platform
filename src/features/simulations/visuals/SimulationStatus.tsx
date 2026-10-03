import React from 'react';
import { CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react';

interface SimulationStatusProps {
  status: 'nominal' | 'warning' | 'error';
  message: string;
}

export const SimulationStatus: React.FC<SimulationStatusProps> = ({
  status,
  message,
}) => {
  const getStyles = () => {
    switch (status) {
      case 'warning':
        return {
          bg: 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300',
          icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
        };
      case 'error':
        return {
          bg: 'bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-300',
          icon: <AlertOctagon className="w-4 h-4 text-rose-500" />,
        };
      case 'nominal':
      default:
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300',
          icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
        };
    }
  };

  const currentStyles = getStyles();

  return (
    <div
      className={`flex items-center gap-2 p-3 rounded-2xl border text-xs font-semibold ${currentStyles.bg}`}
    >
      {currentStyles.icon}
      <span>{message}</span>
    </div>
  );
};
