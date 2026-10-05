import React from 'react';
import { motion } from 'framer-motion';

interface MagnetProps {
  x: number;
  y: number;
  angle?: number; // degrees
  width?: number;
  height?: number;
  label?: string;
}

export const BarMagnet: React.FC<MagnetProps> = ({
  x,
  y,
  angle = 0,
  width = 120,
  height = 40,
  label,
}) => {
  return (
    <motion.div
      className="absolute pointer-events-none flex flex-col items-center"
      style={{
        left: x,
        top: y,
        x: '-50%',
        y: '-50%',
      }}
      animate={{ left: x, top: y, rotate: angle }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
    >
      <div 
        className="relative flex overflow-hidden rounded-md border-2 border-white shadow-xl"
        style={{ width, height }}
      >
        {/* South Pole (Blue) */}
        <div className="flex-1 bg-blue-600 flex items-center justify-center border-r border-white/30">
          <span className="text-white font-bold text-lg select-none">S</span>
        </div>
        
        {/* North Pole (Red) */}
        <div className="flex-1 bg-red-600 flex items-center justify-center">
          <span className="text-white font-bold text-lg select-none">N</span>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      </div>

      {label && (
        <div className="mt-6 bg-slate-800/80 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-slate-300 transform -rotate-0" style={{ transform: `rotate(${-angle}deg)` }}>
          {label}
        </div>
      )}
    </motion.div>
  );
};
