import React from 'react';
import { motion } from 'framer-motion';

interface CompassProps {
  x: number;
  y: number;
  angle: number; // degrees
  size?: number;
  label?: string;
  onDrag?: (pos: { x: number; y: number }) => void;
}

export const CompassIndicator: React.FC<CompassProps> = ({
  x,
  y,
  angle,
  size = 50,
  label,
  onDrag,
}) => {
  return (
    <motion.div
      className={`absolute cursor-move z-20 flex flex-col items-center ${onDrag ? 'pointer-events-auto' : 'pointer-events-none'}`}
      style={{
        left: x,
        top: y,
        x: '-50%',
        y: '-50%',
      }}
      drag={!!onDrag}
      dragMomentum={false}
      onDrag={(_, info) => {
        if (onDrag) {
          onDrag({ x: x + info.delta.x, y: y + info.delta.y });
        }
      }}
      animate={{ left: x, top: y }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      <div 
        className="relative flex items-center justify-center rounded-full bg-slate-900 border-2 border-slate-700 shadow-lg"
        style={{ width: size, height: size }}
      >
        {/* Pivot */}
        <div className="absolute w-1.5 h-1.5 rounded-full bg-slate-500 z-10 shadow-sm" />
        
        {/* Needle */}
        <motion.div 
          className="absolute w-full h-1"
          animate={{ rotate: angle }}
          transition={{ type: 'spring', damping: 15, stiffness: 80 }}
        >
          {/* North (Red) */}
          <div className="absolute left-[50%] right-1 top-0 bottom-0 bg-red-500 rounded-r-full" />
          {/* South (Silver) */}
          <div className="absolute right-[50%] left-1 top-0 bottom-0 bg-slate-200 rounded-l-full" />
        </motion.div>

        {/* Dial markings */}
        <div className="absolute inset-0 border-[1px] border-slate-800/50 rounded-full" />
      </div>

      {label && (
        <div className="mt-1 bg-slate-900/60 backdrop-blur px-1.5 py-0.5 rounded text-[9px] font-bold text-cyan-400 whitespace-nowrap">
          {label}
        </div>
      )}
    </motion.div>
  );
};
