import React from 'react';
import { motion } from 'framer-motion';

interface EnergyFlowProps {
  sourceLabel: string;
  loadLabel: string;
  powerW: number;
  energyJ?: number;
  active?: boolean;
}

export const EnergyFlow: React.FC<EnergyFlowProps> = ({
  sourceLabel,
  loadLabel,
  powerW,
  energyJ,
  active = true,
}) => {
  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-slate-950/40 rounded-3xl border border-slate-800">
      <div className="flex items-center justify-between w-full max-w-md">
        {/* Source */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <span className="font-bold text-xs uppercase">{sourceLabel}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Input</span>
        </div>

        {/* Flow Line */}
        <div className="flex-1 relative h-1 mx-4">
          <div className="absolute inset-0 bg-slate-800 rounded-full" />
          {active && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-full"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1 }}
            />
          )}
          {active && (
            <div className="absolute inset-0 flex justify-around items-center">
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]"
                  animate={{ x: [0, 100] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: i * 0.5
                  }}
                />
              ))}
            </div>
          )}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-amber-400">
            {powerW} Watts
          </div>
        </div>

        {/* Load */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <span className="font-bold text-xs uppercase">{loadLabel}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Load</span>
        </div>
      </div>

      {energyJ !== undefined && (
        <div className="w-full max-w-xs bg-slate-900 border border-slate-700 rounded-xl p-3 text-center">
          <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Accumulated Energy</div>
          <div className="text-xl font-black font-mono text-emerald-400">
            {energyJ >= 1e6 ? `${(energyJ/1e6).toFixed(3)} MJ` : `${energyJ.toLocaleString()} J`}
          </div>
        </div>
      )}
    </div>
  );
};
