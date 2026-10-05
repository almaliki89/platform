import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  PARTICLE_PRESETS,
  calculateParallelPlates,
} from './calculations';
import { FourthElectrostaticsMode, ChargedParticleType } from './types';
import { Zap, Sparkles } from 'lucide-react';
import { ScientificGrid } from '../../../visuals/ScientificGrid';
import { FormulaSubstitution } from '../../../visuals/FormulaSubstitution';
import { DiagramLabel } from '../../../visuals/DiagramLabel';
import { ElectricCharge } from '../../../visuals/ElectricCharge';

export const ElectrostaticsSimulation: React.FC = () => {
  const [mode, setMode] = useState<FourthElectrostaticsMode>('parallel-plates');
  const [particleType, setParticleType] = useState<ChargedParticleType>('electron');
  const [voltageV, setVoltageV] = useState<number>(200); // Top plate positive, bottom negative
  const [plateSeparationCm, setPlateSeparationCm] = useState<number>(4.0); // 4 cm
  const [velocityKm_s, setVelocityKm_s] = useState<number>(1500); // 1500 km/s for electron

  const activeParticle = PARTICLE_PRESETS[particleType];
  const plateSeparationM = plateSeparationCm / 100;

  const result = calculateParallelPlates(
    particleType,
    voltageV,
    plateSeparationM,
    velocityKm_s,
    0.1
  );

  const handleReset = () => {
    setMode('parallel-plates');
    setParticleType('electron');
    setVoltageV(200);
    setPlateSeparationCm(4.0);
    setVelocityKm_s(1500);
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'شدة المجال (E)',
      value: `${result.electricFieldStrengthV_m.toFixed(0)} V/m`,
      color: 'cyan',
    },
    {
      label: 'القوة المؤثرة (F)',
      value: `${result.forceOnParticleN.toExponential(2)} N`,
      color: 'amber',
    },
    {
      label: 'التعجيل (a)',
      value: `${result.accelerationM_s2.toExponential(2)} m/s²`,
      color: 'emerald',
    },
    {
      label: 'الانحراف الرأسي (y)',
      value: `${result.verticalDeflectionMm.toFixed(2)} mm`,
      color: 'purple',
    },
  ];

  const plateWidth = 400;
  const plateX = 100;
  const centerY = 150;

  return (
    <SimulationShell
      title="مختبر المجال والجهد الكهربائي"
      subtitle="الفصل التاسع — شدة المجال الكهربائي المنتظم، حركة الجسيمات المشحونة، وسطوح تساوي الجهد"
      badge="الصف الرابع العلمي"
      topic="المجال والجهد الكهربائي"
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setMode('parallel-plates')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'parallel-plates' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>المجال المنتظم والانحراف</span>
          </button>
          <button
            onClick={() => setMode('equipotential')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'equipotential' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>توزيع الشحنات</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex items-center justify-center p-4">
              <svg viewBox="0 0 600 300" className="w-full h-full">
                <ScientificGrid width={600} height={300} />

                {mode === 'parallel-plates' ? (
                  <g>
                    {/* Plates */}
                    <rect x={plateX} y={centerY - plateSeparationCm * 10 - 10} width={plateWidth} height="10" fill="#dc2626" rx="2" />
                    <rect x={plateX} y={centerY + plateSeparationCm * 10} width={plateWidth} height="10" fill="#2563eb" rx="2" />
                    
                    {/* Field Lines */}
                    {Array.from({ length: 9 }).map((_, i) => (
                      <line 
                        key={i} 
                        x1={plateX + 20 + i * 45} y1={centerY - plateSeparationCm * 10} 
                        x2={plateX + 20 + i * 45} y2={centerY + plateSeparationCm * 10} 
                        stroke="rgba(251, 191, 36, 0.3)" strokeWidth="1" strokeDasharray="4 2" 
                      />
                    ))}

                    {/* Equipotential Surface */}
                    <line x1={plateX} y1={centerY} x2={plateX + plateWidth} y2={centerY} stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" strokeDasharray="5 5" />
                    <text x={plateX - 5} y={centerY + 3} textAnchor="end" fill="#38bdf8" className="text-[8px] font-mono">V=0</text>

                    {/* Particle Gun */}
                    <rect x="20" y={centerY - 15} width="40" height="30" fill="#475569" rx="4" />
                    <rect x="60" y={centerY - 5} width="20" height="10" fill="#64748b" rx="2" />

                    {/* Trajectory */}
                    {(() => {
                      const points = [];
                      const qSign = activeParticle.chargeSign;
                      const bendDir = voltageV >= 0 ? -qSign : qSign;
                      const maxDef = result.verticalDeflectionMm * 2; // Scaling
                      
                      for (let i = 0; i <= 20; i++) {
                         const x = 80 + i * (plateWidth + 20) / 20;
                         let y = centerY;
                         if (x > plateX && x < plateX + plateWidth) {
                            const prog = (x - plateX) / plateWidth;
                            y += maxDef * prog * prog * bendDir;
                         } else if (x >= plateX + plateWidth) {
                            y += maxDef * bendDir;
                         }
                         points.push(`${x},${y}`);
                      }
                      return (
                        <polyline points={points.join(' ')} fill="none" stroke={activeParticle.color} strokeWidth="2" strokeDasharray="3 3" />
                      );
                    })()}

                    {/* Animated Particle */}
                    <motion.g
                      animate={{ 
                        x: [80, 550],
                        y: [centerY, centerY, centerY + (result.verticalDeflectionMm * 2 * (voltageV >= 0 ? -activeParticle.chargeSign : activeParticle.chargeSign))]
                      }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    >
                      <circle r="6" fill={activeParticle.color} stroke="white" strokeWidth="1.5" />
                      <text y="15" textAnchor="middle" fill="white" className="text-[8px] font-bold">{activeParticle.nameEn}</text>
                    </motion.g>

                    <DiagramLabel x={300} y={260} text="Parallel Plate Capacitor" color="blue" />
                  </g>
                ) : (
                  <g>
                    {/* Pointed Conductor */}
                    <path 
                      d="M 150 150 C 150 80 250 80 450 150 C 250 220 150 220 150 150" 
                      fill="#1e293b" stroke="#94a3b8" strokeWidth="4" 
                    />
                    {/* Charges distribution */}
                    <g fill="#ef4444" fontSize="14" fontWeight="bold">
                       <text x="170" y="130">+</text>
                       <text x="170" y="180">+</text>
                       <text x="250" y="110">+</text>
                       <text x="250" y="200">+</text>
                       <text x="350" y="130">++</text>
                       <text x="350" y="180">++</text>
                       <text x="430" y="155">+++</text>
                    </g>
                    <DiagramLabel x={300} y={260} text="Pointed Conductor Charge Distribution" color="amber" />
                  </g>
                )}
              </svg>

              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-400">
                E = ΔV / d
              </div>
            </div>

            <SimulationHUD metrics={hudMetrics} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormulaSubstitution
                formula="E = ΔV / d"
                substitutions={[
                  { symbol: 'ΔV', value: voltageV, unit: 'V' },
                  { symbol: 'd', value: plateSeparationM, unit: 'm' },
                ]}
                result={`${result.electricFieldStrengthV_m.toFixed(0)} V/m`}
              />
              
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-center">
                 <p className="text-[11px] text-slate-400 font-bold mb-2">ملاحظة علمية:</p>
                 <p className="text-xs text-slate-300 leading-relaxed">
                   تتوزع الشحنات على سطح الموصل بكثافة أكبر عند الرؤوس المدببة، مما يؤدي لزيادة شدة المجال الكهربائي عندها.
                 </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <SimulationControls onReset={handleReset}>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">نوع الجسيم:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['electron', 'proton', 'alpha'] as ChargedParticleType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setParticleType(type)}
                      className={`py-2 rounded-lg text-[10px] font-bold transition-all ${
                        particleType === type ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {type === 'electron' ? 'e⁻' : type === 'proton' ? 'p⁺' : 'α²⁺'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>فرق الجهد (V)</span>
                  <span className="text-amber-500 font-mono">{voltageV}</span>
                </div>
                <input type="range" min="0" max="600" step="20" value={voltageV} onChange={(e) => setVoltageV(parseInt(e.target.value))} className="w-full accent-amber-500" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>البعد (cm)</span>
                  <span className="text-cyan-400 font-mono">{plateSeparationCm.toFixed(1)}</span>
                </div>
                <input type="range" min="2.0" max="8.0" step="0.5" value={plateSeparationCm} onChange={(e) => setPlateSeparationCm(parseFloat(e.target.value))} className="w-full accent-cyan-500" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>السرعة (km/s)</span>
                  <span className="text-emerald-400 font-mono">{velocityKm_s}</span>
                </div>
                <input type="range" min={particleType === 'electron' ? 500 : 10} max={particleType === 'electron' ? 4000 : 200} step={10} value={velocityKm_s} onChange={(e) => setVelocityKm_s(parseInt(e.target.value))} className="w-full accent-emerald-500" />
              </div>
            </SimulationControls>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};

export default ElectrostaticsSimulation;
