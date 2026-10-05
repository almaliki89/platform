import React from 'react';
import { motion } from 'framer-motion';

interface ThermometerGaugeProps {
  value: number;
  min?: number;
  max?: number;
  unit?: string;
  label?: string;
  height?: number;
  color?: string;
}

export const ThermometerGauge: React.FC<ThermometerGaugeProps> = ({
  value,
  min = 0,
  max = 100,
  unit = '°C',
  label,
  height = 200,
  color = '#ef4444',
}) => {
  const range = max - min;
  const percentage = Math.max(0, Math.min(1, (value - min) / range));
  const bulbSize = 25;
  const tubeWidth = 12;
  const tubeHeight = height - bulbSize;
  const fillHeight = percentage * tubeHeight;

  return (
    <div className="flex flex-col items-center gap-2">
      {label && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>}
      <div style={{ height }} className="relative w-12 flex flex-col items-center">
        {/* Scale Ticks */}
        <div className="absolute -left-6 inset-y-0 flex flex-col justify-between py-2 text-[8px] font-mono text-slate-500">
          <span>{max}</span>
          <span>{min + range * 0.75}</span>
          <span>{min + range * 0.5}</span>
          <span>{min + range * 0.25}</span>
          <span>{min}</span>
        </div>

        {/* Outer Tube */}
        <div 
          className="absolute bottom-0 w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center"
          style={{ bottom: 0 }}
        />
        <div 
          className="absolute w-4 bg-slate-800 border-2 border-slate-700 rounded-t-full"
          style={{ bottom: bulbSize / 2, height: tubeHeight + bulbSize / 2 }}
        />

        {/* Fill */}
        <motion.div 
          className="absolute bottom-0 rounded-full"
          style={{ 
            width: bulbSize - 6, 
            height: bulbSize - 6, 
            backgroundColor: color,
            bottom: 3,
            boxShadow: `0 0 10px ${color}66`
          }}
        />
        <motion.div 
          className="absolute w-2 rounded-t-full"
          style={{ 
            bottom: bulbSize / 2, 
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}44`
          }}
          animate={{ height: fillHeight }}
          transition={{ type: 'spring', damping: 20 }}
        />
        
        {/* Readout */}
        <div className="absolute -right-12 top-0 bg-slate-900 border border-slate-700 px-2 py-1 rounded text-[10px] font-mono font-bold text-white whitespace-nowrap">
          {value.toFixed(1)} {unit}
        </div>
      </div>
    </div>
  );
};
