import React from 'react';
import { motion } from 'framer-motion';

interface ElectricChargeProps {
  charge: number; // in microCoulombs or relative
  label?: string;
  position: { x: number; y: number };
  size?: number;
}

export const ElectricCharge: React.FC<ElectricChargeProps> = ({
  charge,
  label,
  position,
  size = 40,
}) => {
  const isPositive = charge > 0;
  const isNegative = charge < 0;
  const isZero = charge === 0;

  const color = isZero ? 'slate' : isPositive ? 'red' : 'blue';
  const sign = isZero ? '0' : isPositive ? '+' : '−';

  return (
    <motion.div
      className="absolute flex flex-col items-center pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        x: '-50%',
        y: '-50%',
      }}
      initial={false}
      animate={{ left: position.x, top: position.y }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
    >
      {label && (
        <span className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
          {label}
        </span>
      )}
      
      <div 
        className={`relative flex items-center justify-center rounded-full border-2 border-white shadow-lg transition-colors duration-300 ${
          isZero 
            ? 'bg-slate-500 shadow-slate-500/50' 
            : isPositive 
              ? 'bg-red-500 shadow-red-500/50' 
              : 'bg-blue-500 shadow-blue-500/50'
        }`}
        style={{ width: size, height: size }}
      >
        <span className="text-white font-bold text-xl select-none">{sign}</span>
        
        {/* Glow effect */}
        {!isZero && (
          <div 
            className={`absolute inset-[-8px] rounded-full opacity-20 blur-md animate-pulse ${
              isPositive ? 'bg-red-500' : 'bg-blue-500'
            }`}
          />
        )}
      </div>

      <div className="mt-1 px-1.5 py-0.5 rounded bg-slate-800/80 backdrop-blur text-[10px] font-mono text-white whitespace-nowrap">
        {charge > 0 ? '+' : ''}{charge} μC
      </div>
    </motion.div>
  );
};
