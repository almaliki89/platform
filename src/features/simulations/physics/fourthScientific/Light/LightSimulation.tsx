import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  LAMP_PRESETS,
  calculateIlluminance,
} from './calculations';
import { LightMode } from './types';
import { Sun, Lightbulb, Compass, Sparkles } from 'lucide-react';
import { ScientificGrid } from '../../../visuals/ScientificGrid';
import { FormulaSubstitution } from '../../../visuals/FormulaSubstitution';
import { DiagramLabel } from '../../../visuals/DiagramLabel';

export const LightSimulation: React.FC = () => {
  const [mode, setMode] = useState<LightMode>('inverse-square');

  const [selectedLampId, setSelectedLampId] = useState<string>('led-10w');
  const [customIntensityCd, setCustomIntensityCd] = useState<number>(85);
  const [distanceM, setDistanceM] = useState<number>(1.5);
  const [incidenceAngleDeg, setIncidenceAngleDeg] = useState<number>(0);

  const activeLamp =
    LAMP_PRESETS.find((l) => l.id === selectedLampId) || LAMP_PRESETS[0];

  const intensityCd =
    mode === 'lamp-comparison' ? activeLamp.luminousIntensityCd : customIntensityCd;

  const result = calculateIlluminance(intensityCd, distanceM, incidenceAngleDeg);

  const handleReset = () => {
    setMode('inverse-square');
    setSelectedLampId('led-10w');
    setCustomIntensityCd(85);
    setDistanceM(1.5);
    setIncidenceAngleDeg(0);
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'شدة الاستضاءة (E)',
      value: `${result.illuminanceLux.toFixed(1)} Lux`,
      color: 'cyan',
    },
    {
      label: 'شدة الإضاءة (I)',
      value: `${intensityCd} cd`,
      color: 'amber',
    },
    {
      label: 'السيل الضوئي (Φ)',
      value: `${result.luminousFluxLm.toFixed(0)} lm`,
      color: 'emerald',
    },
    {
      label: 'البعد (r)',
      value: `${distanceM.toFixed(2)} m`,
      color: 'purple',
    },
  ];

  return (
    <SimulationShell
      title="مختبر الضوء وشدة الاستضاءة وقانون التربيع العكسي"
      subtitle="الفصل الخامس — السيل الضوئي، شدة الإضاءة، وقانون التربيع العكسي للاستضاءة (E = I / r²)"
      badge="الصف الرابع العلمي"
      topic="الضوء وشدة الاستضاءة"
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setMode('inverse-square')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'inverse-square'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>قانون التربيع العكسي</span>
          </button>
          <button
            onClick={() => setMode('photometer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'photometer'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>مقياس الاستضاءة</span>
          </button>
          <button
            onClick={() => setMode('lamp-comparison')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'lamp-comparison'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>كفاءة المصابيح</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex items-center justify-center p-4">
              <svg viewBox="0 0 600 300" className="w-full h-full">
                <ScientificGrid width={600} height={300} />
                
                {/* Source */}
                <g transform="translate(50, 150)">
                  <circle r="40" fill="url(#lightGlow)" />
                  <circle r="10" fill="white" stroke="#f59e0b" strokeWidth="2" />
                  <defs>
                    <radialGradient id="lightGlow">
                      <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
                      <stop offset="30%" stopColor="rgba(251, 191, 36, 0.6)" />
                      <stop offset="100%" stopColor="rgba(251, 191, 36, 0)" />
                    </radialGradient>
                  </defs>
                </g>

                {mode === 'inverse-square' ? (
                  <g>
                    {/* Projection Cones */}
                    <path d="M 50 150 L 550 50 L 550 250 Z" fill="rgba(251, 191, 36, 0.05)" stroke="rgba(251, 191, 36, 0.3)" strokeDasharray="4 4" />
                    
                    {/* Screens at 1m, 2m, 3m */}
                    {[1, 2, 3].map(d => {
                      const x = 50 + d * 150;
                      const size = d * 20;
                      return (
                        <g key={d}>
                          <rect x={x - 2} y={150 - size} width="4" height={size * 2} fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="1" />
                          <text x={x} y={150 - size - 10} textAnchor="middle" fill="white" className="text-[10px] font-bold">{d}m</text>
                          <text x={x} y={150 + size + 20} textAnchor="middle" fill="#94a3b8" className="text-[8px] font-mono">Area: {d*d}A</text>
                          <text x={x} y={150 + size + 32} textAnchor="middle" fill="#fbbf24" className="text-[8px] font-mono">E/{d*d}</text>
                        </g>
                      );
                    })}
                  </g>
                ) : (
                  <g>
                    {/* Lux Meter Probe */}
                    <motion.g animate={{ x: 50 + distanceM * 120 }}>
                      <g transform={`rotate(${incidenceAngleDeg})`}>
                        <rect x="-5" y="-40" width="10" height="80" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <rect x="-4" y="-35" width="3" height="70" fill="#0284c7" />
                        <line x1="0" y1="0" x2="-30" y2="0" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 2" />
                      </g>
                      <rect x="20" y="-20" width="100" height="40" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" rx="8" />
                      <text x="30" y="5" fill="#38bdf8" className="text-[10px] font-mono font-bold">{result.illuminanceLux.toFixed(1)} Lux</text>
                    </motion.g>
                    
                    {/* Rays */}
                    {Array.from({ length: 7 }).map((_, i) => (
                      <line 
                        key={i}
                        x1="50" y1="150" 
                        x2={50 + distanceM * 120} y2={150 + (i - 3) * 15} 
                        stroke="rgba(251, 191, 36, 0.2)" 
                        strokeWidth="1" 
                      />
                    ))}
                  </g>
                )}
                
                <DiagramLabel x={50} y={200} text="Light Source" color="amber" />
              </svg>

              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-400">
                E = I / r²
              </div>
            </div>

            <SimulationHUD metrics={hudMetrics} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormulaSubstitution
                formula={incidenceAngleDeg > 0 ? 'E = (I · cos θ) / r²' : 'E = I / r²'}
                substitutions={[
                  { symbol: 'I', value: intensityCd, unit: 'cd' },
                  { symbol: 'r', value: distanceM, unit: 'm' },
                  ...(incidenceAngleDeg > 0 ? [{ symbol: 'θ', value: incidenceAngleDeg, unit: '°' }] : []),
                ]}
                result={`${result.illuminanceLux.toFixed(1)} Lux`}
              />
              
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-center">
                 <p className="text-[11px] text-slate-400 font-bold mb-2">مبدأ الانتشار الضوئي:</p>
                 <p className="text-xs text-slate-300 leading-relaxed">
                   تتوزع الطاقة الضوئية الصادرة من المصدر على مساحة تزداد طردياً مع مربع المسافة، مما يؤدي لنقصان شدة الاستضاءة بنسبة عكسية (قانون التربيع العكسي).
                 </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-900 dark:text-cyan-200 space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>التحليل العلمي المنهجي:</span>
              </p>
              <p>ملاءمة الإضاءة: <strong className="text-emerald-500">{result.recommendedEnvironmentAr}</strong></p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                حسب منهاج الرابع العلمي: شدة الاستضاءة (E) تقاس بوحدة (Lux)، وهي تساوي السيل الضوئي الساقط عمودياً على وحدة المساحة.
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <SimulationControls onReset={handleReset}>
              {mode === 'lamp-comparison' ? (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300">نوع المصباح:</label>
                  <select
                    value={selectedLampId}
                    onChange={(e) => setSelectedLampId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    {LAMP_PRESETS.map((lamp) => (
                      <option key={lamp.id} value={lamp.id}>
                        {lamp.nameAr} ({lamp.powerWatts}W)
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-400">
                    <span>شدة الإضاءة (I)</span>
                    <span className="text-amber-500 font-mono">{customIntensityCd} cd</span>
                  </div>
                  <input type="range" min="10" max="500" step="5" value={customIntensityCd} onChange={(e) => setCustomIntensityCd(parseInt(e.target.value))} className="w-full accent-amber-500" />
                </div>
              )}

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>المسافة (r)</span>
                  <span className="text-cyan-400 font-mono">{distanceM.toFixed(2)} m</span>
                </div>
                <input type="range" min="0.5" max="4.0" step="0.1" value={distanceM} onChange={(e) => setDistanceM(parseFloat(e.target.value))} className="w-full accent-cyan-500" />
              </div>

              {mode === 'photometer' && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-400">
                    <span>زاوية السقوط (θ)</span>
                    <span className="text-rose-400 font-mono">{incidenceAngleDeg}°</span>
                  </div>
                  <input type="range" min="0" max="75" step="5" value={incidenceAngleDeg} onChange={(e) => setIncidenceAngleDeg(parseInt(e.target.value))} className="w-full accent-rose-500" />
                </div>
              )}
            </SimulationControls>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};

export default LightSimulation;
