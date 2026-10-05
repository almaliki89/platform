import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateElectromagnetism } from './calculations';
import { ElectromagnetismMode } from './types';
import { Magnet, Compass, Zap, Sparkles, Layers, RotateCcw } from 'lucide-react';
import { LabSurface } from '../../../visuals/LabSurface';
import { ScientificGrid } from '../../../visuals/ScientificGrid';
import { FieldLine } from '../../../visuals/FieldLine';
import { CompassIndicator } from '../../../visuals/CompassIndicator';
import { FormulaSubstitution } from '../../../visuals/FormulaSubstitution';
import { SimulationStatus } from '../../../visuals/SimulationStatus';
import { ValueBadge } from '../../../visuals/ValueBadge';

export const ElectromagnetismSimulation: React.FC = () => {
  const [mode, setMode] = useState<ElectromagnetismMode>('solenoid-core');
  const [currentA, setCurrentA] = useState<number>(5); // Amperes
  const [coilTurns, setCoilTurns] = useState<number>(30);
  const [hasIronCore, setHasIronCore] = useState<boolean>(true);

  const result = calculateElectromagnetism(mode, currentA, coilTurns, hasIronCore, 50);

  const handleReset = () => {
    setCurrentA(5);
    setCoilTurns(30);
    setHasIronCore(true);
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'شدة المجال (B)',
      value: `${result.fieldStrengthRelative} %`,
      color: 'cyan',
    },
    {
      label: 'القطبية الشمالية',
      value: result.northPoleSideAr,
      color: 'amber',
    },
    {
      label: 'مضاعف النفاذية',
      value: `${result.permeabilityMultiplier}x`,
      color: 'emerald',
    },
    {
      label: 'التيار (I)',
      value: `${currentA} A`,
      color: 'slate',
    },
  ];

  const width = 600;
  const height = 300;
  const cx = width / 2;
  const cy = height / 2;

  return (
    <SimulationShell
      title="مختبر الكهربائية والمغناطيسية"
      subtitle="الفصل السادس — تجربة أورستد، المجال المغناطيسي للتيار الكهربائي، وقاعدة الكف اليمنى للمغناطيس الكهربائي"
      badge="الصف الثالث المتوسط"
      topic="الكهربائية والمغناطيسية"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            type="button" onClick={() => setMode('solenoid-core')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              mode === 'solenoid-core' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Magnet className="w-4 h-4" />
            <span>المغناطيس الكهربائي</span>
          </button>
          <button
            type="button" onClick={() => setMode('oersted-wire')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              mode === 'oersted-wire' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>تجربة أورستد</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <LabSurface type="metallic" className="aspect-[600/300] p-0 relative overflow-hidden" data-testid="physics-visualization">
              <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                <ScientificGrid width={width} height={height} />
                
                {mode === 'solenoid-core' ? (
                  <g>
                    {/* Field Loops */}
                    {Math.abs(currentA) > 0.1 && [1, 2, 3].map(i => (
                      <ellipse 
                        key={i} cx={cx} cy={cy} rx={180 + i * 20} ry={40 + i * 30} 
                        fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity={0.15 + (hasIronCore ? 0.2 : 0)} 
                      />
                    ))}

                    {/* Iron Core */}
                    {hasIronCore && (
                      <g>
                        <rect x={cx - 130} y={cy - 25} width={260} height={50} fill="#475569" stroke="#94a3b8" strokeWidth="2" rx="4" />
                        <text x={cx} y={cy + 4} fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">Soft Iron Core</text>
                      </g>
                    )}

                    {/* Solenoid Wires */}
                    {Array.from({ length: coilTurns }).map((_, i) => {
                      const x = cx - 130 + (i + 1) * (260 / (coilTurns + 1));
                      return <ellipse key={i} cx={x} cy={cy} rx={6} ry={hasIronCore ? 35 : 45} fill="none" stroke="#f59e0b" strokeWidth="3" />;
                    })}

                    {/* Polarity Indicators */}
                    {Math.abs(currentA) > 0.1 && (
                      <>
                        <g transform={`translate(${cx - 160}, ${cy})`}>
                          <circle r="18" fill={currentA > 0 ? '#3b82f6' : '#ef4444'} />
                          <text fill="white" fontSize="14" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">{currentA > 0 ? 'S' : 'N'}</text>
                        </g>
                        <g transform={`translate(${cx + 160}, ${cy})`}>
                          <circle r="18" fill={currentA > 0 ? '#ef4444' : '#3b82f6'} />
                          <text fill="white" fontSize="14" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">{currentA > 0 ? 'N' : 'S'}</text>
                        </g>
                      </>
                    )}
                  </g>
                ) : (
                  <g>
                    {/* Cardboard Sheet */}
                    <path d={`M ${cx-160} ${cy-50} L ${cx+160} ${cy-50} L ${cx+110} ${cy+50} L ${cx-210} ${cy+50} Z`} fill="rgba(30, 41, 59, 0.7)" stroke="#475569" strokeWidth="1.5" />
                    
                    {/* Concentric Field Rings */}
                    {Math.abs(currentA) > 0.1 && [40, 70, 100].map(r => (
                      <ellipse key={r} cx={cx - 50} cy={cy} rx={r} ry={r * 0.45} fill="none" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.4" />
                    ))}

                    {/* Straight Wire */}
                    <line x1={cx - 50} y1="20" x2={cx - 50} y2={height - 20} stroke="#f59e0b" strokeWidth="8" />
                    {Math.abs(currentA) > 0.1 && (
                      <text x={cx - 50} y={currentA > 0 ? 40 : height - 35} fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">
                        {currentA > 0 ? '▲ I' : '▼ I'}
                      </text>
                    )}
                  </g>
                )}
              </svg>

              <div className="absolute top-4 right-4">
                <SimulationStatus status="nominal" message={currentA !== 0 ? 'تيار نشط' : 'تيار صفر'} />
              </div>

              <div className="absolute bottom-10 right-10 pointer-events-none">
                <CompassIndicator 
                  x={0} y={0} 
                  angle={result.compassAngleDeg} 
                  size={40} 
                  label="بوصلة" 
                />
              </div>
            </LabSurface>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormulaSubstitution
                formula={mode === 'solenoid-core' ? 'B = μ · (N/L) · I' : 'B = (μ₀ · I) / (2π · r)'}
                substitutions={[
                  { symbol: 'I', value: Math.abs(currentA), unit: 'A' },
                  { symbol: 'N', value: mode === 'solenoid-core' ? coilTurns : '1', unit: 'turns' },
                  { symbol: 'μ', value: hasIronCore ? '2000μ₀' : 'μ₀' },
                ]}
                result={result.fieldStrengthRelative}
                unit="%"
              />
              
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 space-y-2">
                <p className="font-bold flex items-center gap-1.5 text-cyan-900 dark:text-cyan-200 text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>تطبيق قاعدة الكف اليمنى:</span>
                </p>
                <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  {result.rightHandRuleExplanationAr}
                </p>
              </div>
            </div>

            <SimulationHUD metrics={hudMetrics} />
          </div>

          <div className="space-y-4">
            <SimulationControls title="المعاملات" onReset={handleReset}>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>شدة التيار (I)</span>
                    <span className="text-cyan-600 font-mono">{currentA} A</span>
                  </div>
                  <input
                    type="range" min={-10} max={10} step={1}
                    value={currentA}
                    onChange={(e) => setCurrentA(Number(e.target.value))}
                    className="w-full accent-cyan-600"
                  />
                </div>

                {mode === 'solenoid-core' && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span>عدد اللفات (N)</span>
                        <span className="text-amber-500 font-mono">{coilTurns} لفة</span>
                      </div>
                      <input
                        type="range" min={10} max={60} step={5}
                        value={coilTurns}
                        onChange={(e) => setCoilTurns(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                      <label className="flex items-center justify-between text-xs font-bold cursor-pointer">
                        <span>قلب حديد مطاوع</span>
                        <input
                          type="checkbox" checked={hasIronCore}
                          onChange={(e) => setHasIronCore(e.target.checked)}
                          className="rounded accent-cyan-600 w-4 h-4"
                        />
                      </label>
                    </div>
                  </>
                )}

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block mb-2">قوانين المغناطيس الكهربائي:</span>
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl space-y-2 text-[10px] leading-relaxed">
                    <p>• يزداد المجال بزيادة التيار <b>I</b></p>
                    <p>• يزداد المجال بزيادة عدد اللفات <b>N</b></p>
                    <p>• يزيد قلب الحديد من تركيز خطوط المجال</p>
                  </div>
                </div>
              </div>
            </SimulationControls>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};

