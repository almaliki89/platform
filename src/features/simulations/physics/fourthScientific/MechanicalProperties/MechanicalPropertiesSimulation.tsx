import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  ELASTIC_MATERIALS,
  calculateMechanicalProperties,
} from './calculations';
import { MechanicalMode } from './types';
import { Activity, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';
import { ScientificGrid } from '../../../visuals/ScientificGrid';
import { MeasurementScale } from '../../../visuals/MeasurementScale';
import { FormulaSubstitution } from '../../../visuals/FormulaSubstitution';
import { ScientificGraph } from '../../../visuals/ScientificGraph';
import { DiagramLabel } from '../../../visuals/DiagramLabel';

export const MechanicalPropertiesSimulation: React.FC = () => {
  const [mode, setMode] = useState<MechanicalMode>('spring');
  const [appliedForceN, setAppliedForceN] = useState<number>(40);
  const [springConstantK, setSpringConstantK] = useState<number>(50); // N/m
  const [originalLengthM, setOriginalLengthM] = useState<number>(2.0); // m
  const [crossSectionAreaMm2, setCrossSectionAreaMm2] = useState<number>(1.5); // mm²
  const [materialId, setSelectedMaterialId] = useState<string>('steel');

  const result = calculateMechanicalProperties(
    mode,
    appliedForceN,
    springConstantK,
    originalLengthM,
    crossSectionAreaMm2,
    materialId
  );

  const currentMat =
    ELASTIC_MATERIALS.find((m) => m.id === materialId) || ELASTIC_MATERIALS[0];

  const handleReset = () => {
    setAppliedForceN(40);
    setSpringConstantK(50);
    setOriginalLengthM(2.0);
    setCrossSectionAreaMm2(1.5);
    setSelectedMaterialId('steel');
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: mode === 'spring' ? 'الاستطالة (Δx)' : 'استطالة السلك (ΔL)',
      value: `${result.extensionMm.toFixed(2)} mm`,
      color: 'cyan',
    },
    {
      label: 'الإجهاد الواقع (Stress)',
      value: `${result.stressMPa.toFixed(1)} MPa`,
      color: result.isWithinElasticLimit ? 'amber' : 'red',
    },
    {
      label: 'المطاوعة النسبية (Strain)',
      value: result.strain.toExponential(3),
      color: 'slate',
    },
    {
      label: 'حالة المرونة',
      value: result.isWithinElasticLimit ? 'ضمن حد المرونة ✓' : 'تجاوز حد المرونة ⚠',
      color: result.isWithinElasticLimit ? 'emerald' : 'red',
    },
  ];

  const getGraphData = () => {
    const data = [];
    const maxStress = currentMat.elasticLimitStressPa * 1.5;
    const maxStrain = maxStress / currentMat.youngModulusPa;
    for (let i = 0; i <= 20; i++) {
      const strain = (i / 20) * maxStrain;
      let stress = strain * currentMat.youngModulusPa;
      if (stress > currentMat.elasticLimitStressPa) {
        stress = currentMat.elasticLimitStressPa + (stress - currentMat.elasticLimitStressPa) * 0.2;
      }
      data.push({ x: strain * 1000, y: stress / 1e6 });
    }
    return data;
  };

  return (
    <SimulationShell
      title="مختبر الخصائص الميكانيكية للمادة وقانون هوك"
      subtitle="الفصل الثاني — المرونة، قانون هوك، الإجهاد والمطاوعة، ومعامل يونك للمواد"
      badge="الصف الرابع العلمي"
      topic="الخصائص الميكانيكية للمادة"
    >
      <div className="space-y-6">
        {/* Mode Selector */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            type="button"
            onClick={() => setMode('spring')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'spring'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            تجربة النابض الحلزوني
          </button>
          <button
            type="button"
            onClick={() => setMode('wire')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'wire'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            شد الأسلاك ومعامل يونك
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Visual Scene */}
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex flex-col items-center justify-center p-4">
              <svg viewBox="0 0 600 300" className="w-full h-full">
                <ScientificGrid width={600} height={300} />
                
                {/* Ceiling Support */}
                <rect x="230" y="10" width="140" height="15" fill="#475569" rx="2" />
                {Array.from({ length: 12 }).map((_, i) => (
                  <line key={i} x1={235 + i * 11} y1="10" x2={243 + i * 11} y2="0" stroke="#64748b" strokeWidth="2" />
                ))}

                {mode === 'spring' ? (
                  <g>
                    {/* Spring Visual */}
                    {(() => {
                      const baseLen = 100;
                      const ext = result.extensionM * 50; 
                      const totalLen = baseLen + ext;
                      const coils = 12;
                      const points = Array.from({ length: coils * 10 }).map((_, i) => {
                        const t = i / (coils * 10 - 1);
                        const angle = t * coils * Math.PI * 2;
                        const x = 300 + Math.sin(angle) * 15;
                        const y = 25 + t * totalLen;
                        return `${x},${y}`;
                      }).join(' ');

                      return (
                        <>
                          <polyline 
                            points={points} 
                            fill="none" 
                            stroke={result.isWithinElasticLimit ? "#38bdf8" : "#ef4444"} 
                            strokeWidth="3" 
                            strokeLinejoin="round"
                          />
                          <motion.g animate={{ y: 25 + totalLen }}>
                            <rect x="275" y="0" width="50" height="40" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                            <text x="300" y="25" textAnchor="middle" fill="#f59e0b" className="text-[12px] font-bold">{appliedForceN} N</text>
                          </motion.g>
                        </>
                      );
                    })()}
                  </g>
                ) : (
                  <g>
                    {/* Wire Visual */}
                    {(() => {
                      const baseLen = 150;
                      const ext = result.extensionMm * 10; 
                      const totalLen = baseLen + ext;
                      return (
                        <>
                          <line 
                            x1="300" y1="25" x2="300" y2={25 + totalLen} 
                            stroke={currentMat.color} 
                            strokeWidth={Math.max(2, crossSectionAreaMm2 * 2)} 
                          />
                          <motion.g animate={{ y: 25 + totalLen }}>
                            <rect x="270" y="0" width="60" height="50" fill="#334155" stroke="#f59e0b" strokeWidth="2" />
                            <text x="300" y="30" textAnchor="middle" fill="#f59e0b" className="text-[12px] font-bold">{appliedForceN} N</text>
                          </motion.g>
                        </>
                      );
                    })()}
                  </g>
                )}

                <MeasurementScale x={350} y={25} width={200} minVal={0} maxVal={50} unit="mm" color="#94a3b8" />
                <DiagramLabel x={300} y={150} text={mode === 'spring' ? 'Spring' : currentMat.nameAr.split('(')[0]} color="cyan" />
              </svg>

              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-400">
                {mode === 'spring' ? 'F = k · Δx' : 'Y = (F · L₀) / (A · ΔL)'}
              </div>
            </div>

            <SimulationHUD metrics={hudMetrics} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormulaSubstitution
                formula={mode === 'spring' ? 'Δx = F / k' : 'σ = F / A'}
                substitutions={mode === 'spring' ? [
                  { symbol: 'F', value: appliedForceN, unit: 'N' },
                  { symbol: 'k', value: springConstantK, unit: 'N/m' },
                ] : [
                  { symbol: 'F', value: appliedForceN, unit: 'N' },
                  { symbol: 'A', value: (crossSectionAreaMm2 * 1e-6).toExponential(2), unit: 'm²' },
                ]}
                result={mode === 'spring' ? `${result.extensionMm.toFixed(2)} mm` : `${result.stressMPa.toFixed(1)} MPa`}
              />
              <ScientificGraph
                data={getGraphData()}
                xLabel="Strain (x10^-3)"
                yLabel="Stress (MPa)"
                xRange={[0, (currentMat.elasticLimitStressPa * 1.5 / currentMat.youngModulusPa) * 1000]}
                yRange={[0, currentMat.elasticLimitStressPa * 1.5 / 1e6]}
                currentPoint={{ x: result.strain * 1000, y: result.stressMPa }}
              />
            </div>

            {/* Educational Callout */}
            <div
              className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                result.isWithinElasticLimit
                  ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-900 dark:text-cyan-200'
                  : 'bg-red-500/10 border-red-500/20 text-red-900 dark:text-red-200'
              }`}
            >
              <p className="font-bold flex items-center gap-1.5">
                {result.isWithinElasticLimit ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                )}
                <span>التحليل المنهجي للخصائص الميكانيكية:</span>
              </p>
              <p>{result.statusExplanationAr}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                قانون هوك: تتناسب الاستطالة طردياً مع القوة المؤثرة ضمن حدود المرونة. خارج حد المرونة تعاني المادة تشوهاً لزجاً دائماً ولا تعود لشكلها الأصلي.
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <SimulationControls
              title="معاملات القوة والمادة"
              onReset={handleReset}
            >
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>القوة المؤثرة المسلطة (F)</span>
                    <span className="font-mono text-amber-500">{appliedForceN} N</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={200}
                    step={5}
                    value={appliedForceN}
                    onChange={(e) => setAppliedForceN(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                {mode === 'spring' ? (
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span>ثابت صلابة النابض (k)</span>
                      <span className="font-mono text-cyan-600 dark:text-cyan-400">{springConstantK} N/m</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={150}
                      step={5}
                      value={springConstantK}
                      onChange={(e) => setSpringConstantK(Number(e.target.value))}
                      className="w-full accent-cyan-600 cursor-pointer"
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>الطول الأصلي للسلك (L₀)</span>
                        <span className="font-mono text-cyan-600 dark:text-cyan-400">{originalLengthM} m</span>
                      </div>
                      <input
                        type="range"
                        min={0.5}
                        max={5}
                        step={0.5}
                        value={originalLengthM}
                        onChange={(e) => setOriginalLengthM(Number(e.target.value))}
                        className="w-full accent-cyan-600 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>مساحة المقطع العرضي للسلك (A)</span>
                        <span className="font-mono text-indigo-500">{crossSectionAreaMm2} mm²</span>
                      </div>
                      <input
                        type="range"
                        min={0.2}
                        max={5}
                        step={0.2}
                        value={crossSectionAreaMm2}
                        onChange={(e) => setCrossSectionAreaMm2(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>
                  </>
                )}

                {/* Material Presets */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 block">نوع مادة السلك:</span>
                  <div className="grid grid-cols-2 gap-1.5 text-xs font-bold">
                    {ELASTIC_MATERIALS.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedMaterialId(m.id)}
                        className={`p-2 rounded-xl text-right transition-all ${
                          materialId === m.id
                            ? 'bg-cyan-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <p>{m.nameAr.split('(')[0]}</p>
                        <span className="text-[10px] font-mono opacity-80">
                          {(m.youngModulusPa / 1e9).toFixed(0)} GPa
                        </span>
                      </button>
                    ))}
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
