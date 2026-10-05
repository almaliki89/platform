import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  SUBSTANCE_PRESETS,
  calculateCalorimetry,
  calculatePhaseChange,
  calculateGasLaw,
} from './calculations';
import { ThermalMode } from './types';
import { Flame, Thermometer, Gauge, Sparkles } from 'lucide-react';
import { ScientificGrid } from '../../../visuals/ScientificGrid';
import { ThermometerGauge } from '../../../visuals/ThermometerGauge';
import { FormulaSubstitution } from '../../../visuals/FormulaSubstitution';
import { ScientificGraph } from '../../../visuals/ScientificGraph';
import { DiagramLabel } from '../../../visuals/DiagramLabel';

export const ThermalPropertiesSimulation: React.FC = () => {
  const [mode, setMode] = useState<ThermalMode>('calorimetry');

  // Mode 1: Calorimetry
  const [substanceId, setSubstanceId] = useState<string>('copper');
  const [substanceMassKg, setSubstanceMassKg] = useState<number>(0.2);
  const [substanceTempC, setSubstanceTempC] = useState<number>(95);
  const [waterMassKg, setWaterMassKg] = useState<number>(0.3);
  const [waterTempC, setWaterTempC] = useState<number>(20);

  // Mode 2: Phase change
  const [iceMassKg, setIceMassKg] = useState<number>(0.5);
  const [initialIceTempC, setInitialIceTempC] = useState<number>(-20);
  const [heatSuppliedKJ, setHeatSuppliedKJ] = useState<number>(180);

  // Mode 3: Ideal gas
  const [gasMoles, setGasMoles] = useState<number>(1.0);
  const [gasTempC, setGasTempC] = useState<number>(27);
  const [gasVolumeL, setGasVolumeL] = useState<number>(20);

  const activeSubstance =
    SUBSTANCE_PRESETS.find((s) => s.id === substanceId) || SUBSTANCE_PRESETS[0];

  const calResult = calculateCalorimetry(
    waterMassKg,
    waterTempC,
    substanceMassKg,
    substanceTempC,
    activeSubstance.specificHeatJ_kgK
  );

  const phaseResult = calculatePhaseChange(
    iceMassKg,
    initialIceTempC,
    heatSuppliedKJ * 1000
  );

  const gasResult = calculateGasLaw(gasMoles, gasTempC, gasVolumeL);

  const handleReset = () => {
    setMode('calorimetry');
    setSubstanceId('copper');
    setSubstanceMassKg(0.2);
    setSubstanceTempC(95);
    setWaterMassKg(0.3);
    setWaterTempC(20);
    setIceMassKg(0.5);
    setInitialIceTempC(-20);
    setHeatSuppliedKJ(180);
    setGasMoles(1.0);
    setGasTempC(27);
    setGasVolumeL(20);
  };

  const hudMetrics: HUDMetric[] =
    mode === 'calorimetry'
      ? [
          {
            label: 'حرارة الاتزان (T_eq)',
            value: `${calResult.finalEquilibriumTempC.toFixed(1)} °C`,
            color: 'cyan',
          },
          {
            label: 'الحرارة المتبادلة (Q)',
            value: `${(calResult.heatExchangedJ / 1000).toFixed(2)} kJ`,
            color: 'amber',
          },
          {
            label: 'تغير حرارة الماء',
            value: `+${calResult.tempChangeWaterC.toFixed(1)} °C`,
            color: 'emerald',
          },
          {
            label: 'الحرارة النوعية',
            value: `${activeSubstance.specificHeatJ_kgK} J/kg·K`,
            color: 'slate',
          },
        ]
      : mode === 'phase-change'
      ? [
          {
            label: 'الحرارة الحالية (T)',
            value: `${phaseResult.currentTempC.toFixed(1)} °C`,
            color: 'cyan',
          },
          {
            label: 'الحالة الفيزيائية',
            value: phaseResult.currentPhaseAr.split('(')[0],
            color: 'amber',
          },
          {
            label: 'حرارة الانصهار',
            value: '333 kJ/kg',
            color: 'emerald',
          },
          {
            label: 'حرارة التبخر',
            value: '2260 kJ/kg',
            color: 'purple',
          },
        ]
      : [
          {
            label: 'الضغط (P)',
            value: `${gasResult.pressureKPa.toFixed(1)} kPa`,
            color: 'cyan',
          },
          {
            label: 'الحجم (V)',
            value: `${gasResult.volumeLiters.toFixed(1)} L`,
            color: 'amber',
          },
          {
            label: 'الحرارة المطلقة (T)',
            value: `${gasResult.temperatureK.toFixed(1)} K`,
            color: 'emerald',
          },
          {
            label: 'عدد المولات (n)',
            value: `${gasResult.moles.toFixed(2)} mol`,
            color: 'slate',
          },
        ];

  return (
    <SimulationShell
      title="مختبر الخصائص الحرارية للمادة والاتزان الحراري"
      subtitle="الفصل الرابع — السعة الحرارية، الحرارة النوعية، التحولات الطورية، وقوانين الغازات"
      badge="الصف الرابع العلمي"
      topic="الخصائص الحرارية للمادة"
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setMode('calorimetry')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'calorimetry'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Thermometer className="w-4 h-4" />
            <span>المسعر الحراري</span>
          </button>
          <button
            onClick={() => setMode('phase-change')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'phase-change'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>تحول الطور</span>
          </button>
          <button
            onClick={() => setMode('ideal-gas')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'ideal-gas'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>قوانين الغاز المثالي</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex items-center justify-center p-4">
              <svg viewBox="0 0 600 300" className="w-full h-full">
                <ScientificGrid width={600} height={300} />

                {mode === 'calorimetry' && (
                  <g>
                    {/* Vessel */}
                    <rect x="200" y="100" width="200" height="150" fill="#1e293b" stroke="#475569" strokeWidth="4" rx="10" />
                    <rect x="210" y="120" width="180" height="120" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2" />
                    
                    {/* Metal Block */}
                    <motion.rect 
                      animate={{ y: 150 }}
                      x="260" y="0" width="80" height="60" 
                      fill={substanceTempC > 50 ? "#f97316" : "#a855f7"} 
                      stroke="white" strokeWidth="2" 
                    />
                    <text x="300" y="185" textAnchor="middle" fill="white" className="text-[10px] font-bold">{activeSubstance.nameEn}</text>
                    
                    <DiagramLabel x={300} y={265} text="Insulated Calorimeter" color="slate" />
                  </g>
                )}

                {mode === 'ideal-gas' && (
                  <g>
                    {/* Cylinder */}
                    <rect x="220" y="50" width="160" height="200" fill="none" stroke="#94a3b8" strokeWidth="4" />
                    <motion.rect 
                      animate={{ height: gasVolumeL * 4, y: 250 - gasVolumeL * 4 }}
                      x="222" width="156" fill="#38bdf8" fillOpacity="0.1" 
                    />
                    
                    {/* Piston */}
                    <motion.g animate={{ y: 250 - gasVolumeL * 4 }}>
                      <rect x="222" y="-15" width="156" height="15" fill="#64748b" stroke="#e2e8f0" strokeWidth="2" />
                      <rect x="292" y="-65" width="16" height="50" fill="#94a3b8" />
                    </motion.g>

                    {/* Flame */}
                    {gasTempC > 50 && (
                      <motion.path 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        d="M 270 270 Q 300 240 330 270 Q 300 280 270 270" fill="#f97316" 
                      />
                    )}
                  </g>
                )}

                {mode === 'phase-change' && (
                  <g transform="translate(50, 50)">
                    <ScientificGraph 
                      data={[]} // Handled by visual logic if needed or just empty for background
                      xLabel="Heat Q (kJ)" yLabel="Temp T (°C)" 
                      xRange={[0, 1000]} yRange={[-30, 130]} 
                      height={200}
                    />
                    {/* Phase curve manual draw */}
                    <path d="M 50 180 L 150 150 L 250 150 L 350 50 L 450 50" fill="none" stroke="#fbbf24" strokeWidth="3" />
                  </g>
                )}
              </svg>

              {/* Overlaid Gauges */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                {mode === 'calorimetry' && (
                  <ThermometerGauge value={calResult.finalEquilibriumTempC} label="Equilibrium" />
                )}
                {mode === 'ideal-gas' && (
                  <div className="flex flex-col items-center gap-4">
                     <ThermometerGauge value={gasTempC} label="Gas Temp" max={200} />
                     <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl text-center">
                        <span className="text-[10px] text-slate-400 block font-bold">PRESSURE</span>
                        <span className="text-xl font-black font-mono text-cyan-400">{gasResult.pressureKPa.toFixed(0)} kPa</span>
                     </div>
                  </div>
                )}
                {mode === 'phase-change' && (
                  <ThermometerGauge value={phaseResult.currentTempC} label="Current" min={-30} max={130} />
                )}
              </div>
            </div>

            <SimulationHUD metrics={hudMetrics} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormulaSubstitution
                formula={mode === 'calorimetry' ? 'Q = m·c·ΔT' : mode === 'phase-change' ? 'Q = m·L_f' : 'P·V = n·R·T'}
                substitutions={mode === 'calorimetry' ? [
                  { symbol: 'm', value: substanceMassKg, unit: 'kg' },
                  { symbol: 'c', value: activeSubstance.specificHeatJ_kgK, unit: 'J/kgK' },
                  { symbol: 'ΔT', value: (substanceTempC - calResult.finalEquilibriumTempC).toFixed(1), unit: 'K' },
                ] : mode === 'phase-change' ? [
                  { symbol: 'm', value: iceMassKg, unit: 'kg' },
                  { symbol: 'L_f', value: 333, unit: 'kJ/kg' },
                ] : [
                  { symbol: 'n', value: gasMoles, unit: 'mol' },
                  { symbol: 'T', value: gasResult.temperatureK.toFixed(1), unit: 'K' },
                  { symbol: 'V', value: gasVolumeL, unit: 'L' },
                ]}
                result={mode === 'calorimetry' ? `${(calResult.heatExchangedJ / 1000).toFixed(2)} kJ` : mode === 'phase-change' ? `${phaseResult.energyToMelt.toFixed(0)} kJ` : `${gasResult.pressureKPa.toFixed(1)} kPa`}
              />
              
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-center">
                 <p className="text-[11px] text-slate-400 font-bold mb-2">الشرح العلمي:</p>
                 <p className="text-xs text-slate-300 leading-relaxed">
                   {mode === 'calorimetry' && 'يحدث الاتزان الحراري عندما تفقد المادة الساخنة حرارة يكتسبها المسعر ومحتوياته.'}
                   {mode === 'phase-change' && 'أثناء تحول الطور (انصهار أو تبخر)، تستهلك المادة الطاقة الكامنة دون ارتفاع في درجة حرارتها.'}
                   {mode === 'ideal-gas' && 'يتناسب ضغط الغاز طردياً مع حرارته المطلقة وعكسياً مع حجم الإناء.'}
                 </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <SimulationControls onReset={handleReset}>
              {mode === 'calorimetry' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300">نوع المعدن الساخن:</label>
                    <select
                      value={substanceId}
                      onChange={(e) => setSubstanceId(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      {SUBSTANCE_PRESETS.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.nameAr}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                      <span>كتلة المعدن (kg)</span>
                      <span className="text-cyan-400 font-mono">{substanceMassKg.toFixed(2)}</span>
                    </div>
                    <input type="range" min="0.05" max="1.0" step="0.05" value={substanceMassKg} onChange={(e) => setSubstanceMassKg(parseFloat(e.target.value))} className="w-full accent-cyan-500" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                      <span>حرارة المعدن (°C)</span>
                      <span className="text-amber-500 font-mono">{substanceTempC}</span>
                    </div>
                    <input type="range" min="30" max="100" step="1" value={substanceTempC} onChange={(e) => setSubstanceTempC(parseInt(e.target.value))} className="w-full accent-amber-500" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                      <span>كتلة الماء (kg)</span>
                      <span className="text-cyan-400 font-mono">{waterMassKg.toFixed(2)}</span>
                    </div>
                    <input type="range" min="0.1" max="1.0" step="0.05" value={waterMassKg} onChange={(e) => setWaterMassKg(parseFloat(e.target.value))} className="w-full accent-cyan-500" />
                  </div>
                </div>
              )}

              {mode === 'phase-change' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                      <span>كتلة الجليد (kg)</span>
                      <span className="text-cyan-400 font-mono">{iceMassKg.toFixed(2)}</span>
                    </div>
                    <input type="range" min="0.1" max="2.0" step="0.1" value={iceMassKg} onChange={(e) => setIceMassKg(parseFloat(e.target.value))} className="w-full accent-cyan-500" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                      <span>الحرارة المجهزة (kJ)</span>
                      <span className="text-amber-500 font-mono">{heatSuppliedKJ}</span>
                    </div>
                    <input type="range" min="0" max="1800" step="20" value={heatSuppliedKJ} onChange={(e) => setHeatSuppliedKJ(parseInt(e.target.value))} className="w-full accent-amber-500" />
                  </div>
                </div>
              )}

              {mode === 'ideal-gas' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                      <span>عدد المولات (mol)</span>
                      <span className="text-cyan-400 font-mono">{gasMoles.toFixed(2)}</span>
                    </div>
                    <input type="range" min="0.2" max="3.0" step="0.1" value={gasMoles} onChange={(e) => setGasMoles(parseFloat(e.target.value))} className="w-full accent-emerald-500" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                      <span>درجة الحرارة (°C)</span>
                      <span className="text-amber-500 font-mono">{gasTempC}</span>
                    </div>
                    <input type="range" min="-50" max="200" step="5" value={gasTempC} onChange={(e) => setGasTempC(parseInt(e.target.value))} className="w-full accent-amber-500" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                      <span>حجم الإناء (L)</span>
                      <span className="text-cyan-400 font-mono">{gasVolumeL.toFixed(1)}</span>
                    </div>
                    <input type="range" min="5" max="40" step="1" value={gasVolumeL} onChange={(e) => setGasVolumeL(parseFloat(e.target.value))} className="w-full accent-cyan-500" />
                  </div>
                </div>
              )}
            </SimulationControls>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};

export default ThermalPropertiesSimulation;
