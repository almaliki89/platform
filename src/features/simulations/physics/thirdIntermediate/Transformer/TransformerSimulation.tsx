import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateTransformer } from './calculations';
import { Layers, Activity, Sparkles, ArrowUpDown, RotateCcw } from 'lucide-react';
import { LabSurface } from '../../../visuals/LabSurface';
import { ValueBadge } from '../../../visuals/ValueBadge';
import { SimulationStatus } from '../../../visuals/SimulationStatus';
import { ScientificGrid } from '../../../visuals/ScientificGrid';
import { FormulaSubstitution } from '../../../visuals/FormulaSubstitution';
import { usePrefersReducedMotion } from '../../../core/usePrefersReducedMotion';

export const TransformerSimulation: React.FC = () => {
  const [primaryVoltageV1, setPrimaryVoltageV1] = useState<number>(220);
  const [primaryTurnsN1, setPrimaryTurnsN1] = useState<number>(200);
  const [secondaryTurnsN2, setSecondaryTurnsN2] = useState<number>(40);
  const [primaryCurrentI1, setPrimaryCurrentI1] = useState<number>(2);
  const [efficiencyPercent, setEfficiencyPercent] = useState<number>(95);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [fluxPhase, setFluxPhase] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    let frame: number;
    const animate = () => {
      setFluxPhase(p => (p + 0.05) % (Math.PI * 2));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [prefersReducedMotion]);

  const result = calculateTransformer(
    primaryVoltageV1,
    primaryTurnsN1,
    secondaryTurnsN2,
    primaryCurrentI1,
    efficiencyPercent
  );

  const handleReset = () => {
    setPrimaryVoltageV1(220);
    setPrimaryTurnsN1(200);
    setSecondaryTurnsN2(40);
    setPrimaryCurrentI1(2);
    setEfficiencyPercent(95);
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'فولتية الثانوي (V₂)',
      value: `${result.secondaryVoltageV2.toFixed(1)} V`,
      color: 'cyan',
    },
    {
      label: 'نوع المحولة',
      value: result.transformerType === 'step-up' ? 'رافعة' : result.transformerType === 'step-down' ? 'خافضة' : 'عازلة',
      color: result.transformerType === 'step-up' ? 'amber' : 'emerald',
    },
    {
      label: 'نسبة التحويل',
      value: result.turnsRatio.toFixed(2),
      color: 'slate',
    },
    {
      label: 'الكفاءة (η)',
      value: `${efficiencyPercent}%`,
      color: 'emerald',
    },
  ];

  const width = 600;
  const height = 300;
  const cx = width / 2;
  const cy = height / 2;
  const coreW = 320;
  const coreH = 180;
  const coreT = 40;

  return (
    <SimulationShell
      title="مختبر المحولة الكهربائية والحث المتبادل"
      subtitle="الفصل السابع — المحولة الخافضة والرافعة، كفاءة المحولة، ونسبة عدد اللفات"
      badge="الصف الثالث المتوسط"
      topic="المحولة الكهربائية"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <LabSurface type="metallic" className="aspect-[600/300] p-0 relative overflow-hidden" data-testid="physics-visualization">
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
              <ScientificGrid width={width} height={height} />
              
              {/* Iron Core */}
              <rect x={cx - coreW/2} y={cy - coreH/2} width={coreW} height={coreH} fill="#1e293b" stroke="#475569" strokeWidth="2" rx="4" />
              <rect x={cx - (coreW - coreT*2)/2} y={cy - (coreH - coreT*2)/2} width={coreW - coreT*2} height={coreH - coreT*2} fill="#020617" stroke="#475569" strokeWidth="2" rx="2" />

              {/* Flux Path */}
              <rect 
                x={cx - (coreW - coreT)/2} y={cy - (coreH - coreT)/2} 
                width={coreW - coreT} height={coreH - coreT} 
                fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="8 8" 
                strokeOpacity={0.2 + 0.3 * Math.abs(Math.sin(fluxPhase))}
                rx="3"
              />

              {/* Primary Coil */}
              {Array.from({ length: 10 }).map((_, i) => (
                <ellipse 
                  key={i} 
                  cx={cx - coreW/2 + coreT/2} 
                  cy={cy - (coreH - coreT*2)/2 + (i + 1) * ((coreH - coreT*2) / 11)} 
                  rx={coreT * 0.7} ry={5} 
                  fill="none" stroke="#f87171" strokeWidth="4" 
                />
              ))}

              {/* Secondary Coil */}
              {Array.from({ length: Math.min(15, Math.max(5, Math.round(secondaryTurnsN2 / 20))) }).map((_, i) => (
                <ellipse 
                  key={i} 
                  cx={cx + coreW/2 - coreT/2} 
                  cy={cy - (coreH - coreT*2)/2 + (i + 1) * ((coreH - coreT*2) / (Math.min(15, Math.max(5, Math.round(secondaryTurnsN2 / 20))) + 1))} 
                  rx={coreT * 0.7} ry={5} 
                  fill="none" stroke="#38bdf8" strokeWidth="4" 
                />
              ))}

              {/* Labels */}
              <text x={cx - coreW/2 - 10} y={cy - 40} fill="#f87171" fontSize="12" fontWeight="bold" textAnchor="end">Primary (V₁)</text>
              <text x={cx + coreW/2 + 10} y={cy - 40} fill="#38bdf8" fontSize="12" fontWeight="bold">Secondary (V₂)</text>
              <text x={cx} y={cy - coreH/2 - 10} fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" opacity={0.6}>Laminated Soft Iron Core</text>
            </svg>

            <div className="absolute top-4 right-4">
              <SimulationStatus 
                status={result.transformerType === 'step-up' ? 'warning' : 'nominal'} 
                message={result.transformerType === 'step-up' ? 'محولة رافعة' : 'محولة خافضة'} 
              />
            </div>
          </LabSurface>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormulaSubstitution
              formula="V₂ / V₁ = N₂ / N₁"
              substitutions={[
                { symbol: 'V₁', value: primaryVoltageV1, unit: 'V' },
                { symbol: 'N₁', value: primaryTurnsN1, unit: 'turns' },
                { symbol: 'N₂', value: secondaryTurnsN2, unit: 'turns' },
              ]}
              result={result.secondaryVoltageV2.toFixed(1)}
              unit="V"
            />
            
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 space-y-2">
              <p className="font-bold flex items-center gap-1.5 text-cyan-900 dark:text-cyan-200 text-sm">
                <Sparkles className="w-4 h-4" />
                <span>التحليل العلمي:</span>
              </p>
              <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                {result.explanationAr}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <ValueBadge label="القدرة المفقودة" value={`${result.powerLostW.toFixed(1)} W`} color="rose" />
                <ValueBadge label="نسبة التحويل" value={result.turnsRatio.toFixed(2)} color="slate" />
              </div>
            </div>
          </div>

          <SimulationHUD metrics={hudMetrics} />
        </div>

        <div className="space-y-4">
          <SimulationControls title="المعاملات" onReset={handleReset}>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span>فولتية الابتدائي (V₁)</span>
                  <span className="text-red-500 font-mono">{primaryVoltageV1} V</span>
                </div>
                <input
                  type="range" min={12} max={240} step={4}
                  value={primaryVoltageV1}
                  onChange={(e) => setPrimaryVoltageV1(Number(e.target.value))}
                  className="w-full accent-red-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>لفات الابتدائي (N₁)</span>
                    <span className="text-cyan-600 font-mono">{primaryTurnsN1}</span>
                  </div>
                  <input
                    type="range" min={50} max={500} step={10}
                    value={primaryTurnsN1}
                    onChange={(e) => setPrimaryTurnsN1(Number(e.target.value))}
                    className="w-full accent-cyan-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>لفات الثانوي (N₂)</span>
                    <span className="text-cyan-600 font-mono">{secondaryTurnsN2}</span>
                  </div>
                  <input
                    type="range" min={20} max={800} step={10}
                    value={secondaryTurnsN2}
                    onChange={(e) => setSecondaryTurnsN2(Number(e.target.value))}
                    className="w-full accent-cyan-600"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span>كفاءة المحولة (η)</span>
                  <span className="text-emerald-500 font-mono">{efficiencyPercent}%</span>
                </div>
                <input
                  type="range" min={60} max={100} step={5}
                  value={efficiencyPercent}
                  onChange={(e) => setEfficiencyPercent(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">القدرة الكهربائية:</span>
                <div className="space-y-1.5 text-[10px]">
                  <div className="flex justify-between p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                    <span>الداخلة (P₁)</span>
                    <span className="font-bold">{result.powerInW.toFixed(1)} W</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                    <span>الخارجة (P₂)</span>
                    <span className="font-bold text-emerald-600">{result.powerOutW.toFixed(1)} W</span>
                  </div>
                </div>
              </div>
            </div>
          </SimulationControls>
        </div>
      </div>
    </SimulationShell>
  );
};

