import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  FLUID_PRESETS,
  calculateFluidPressure,
  calculatePascalOutputForce,
  calculateFloatingState,
} from './calculations';
import { StaticFluidsMode } from './types';
import { Droplets, ArrowDown, Scale, Sparkles } from 'lucide-react';
import { ScientificGrid } from '../../../visuals/ScientificGrid';
import { MeasurementScale } from '../../../visuals/MeasurementScale';
import { FormulaSubstitution } from '../../../visuals/FormulaSubstitution';
import { DiagramLabel } from '../../../visuals/DiagramLabel';
import { PhysicsVector } from '../../../visuals/PhysicsVector';

export const StaticFluidsSimulation: React.FC = () => {
  const [mode, setMode] = useState<StaticFluidsMode>('hydrostatic-pressure');

  // Mode A state (Hydrostatic Pressure)
  const [selectedFluidId, setSelectedFluidId] = useState<string>('water');
  const [depthM, setDepthM] = useState<number>(3.5); // meters

  // Mode B state (Pascal Press)
  const [inputForceN, setInputForceN] = useState<number>(100);
  const [area1Cm2, setArea1Cm2] = useState<number>(5);
  const [area2Cm2, setArea2Cm2] = useState<number>(50);

  // Mode C state (Archimedes)
  const [objectDensityKg_m3, setObjectDensityKg_m3] = useState<number>(650); // e.g. wood
  const [objectVolumeCm3, setObjectVolumeCm3] = useState<number>(500);

  const activeFluid =
    FLUID_PRESETS.find((f) => f.id === selectedFluidId) || FLUID_PRESETS[0];

  const pressureResult = calculateFluidPressure(activeFluid.densityKg_m3, depthM);
  const pascalResult = calculatePascalOutputForce(inputForceN, area1Cm2, area2Cm2);
  const archimedesResult = calculateFloatingState(
    objectDensityKg_m3,
    activeFluid.densityKg_m3,
    objectVolumeCm3
  );

  const handleReset = () => {
    setSelectedFluidId('water');
    setDepthM(3.5);
    setInputForceN(100);
    setArea1Cm2(5);
    setArea2Cm2(50);
    setObjectDensityKg_m3(650);
    setObjectVolumeCm3(500);
  };

  const hudMetrics: HUDMetric[] =
    mode === 'hydrostatic-pressure'
      ? [
          {
            label: 'الضغط القياسي (Gauge P)',
            value: `${pressureResult.gaugePressureKPa.toFixed(2)} kPa`,
            color: 'cyan',
          },
          {
            label: 'الضغط الكلي (Total P)',
            value: `${pressureResult.totalPressureKPa.toFixed(2)} kPa`,
            color: 'amber',
          },
          {
            label: 'عمق النقطة (h)',
            value: `${depthM.toFixed(1)} m`,
            color: 'slate',
          },
          {
            label: 'كثافة السائل (ρ)',
            value: `${activeFluid.densityKg_m3} kg/m³`,
            color: 'emerald',
          },
        ]
      : mode === 'pascal-press'
      ? [
          {
            label: 'القوة الناتجة (F₂)',
            value: `${pascalResult.outputForceN.toFixed(0)} N`,
            color: 'emerald',
          },
          {
            label: 'الفائدة الميكانيكية (M.A)',
            value: `${pascalResult.mechanicalAdvantage.toFixed(1)}x`,
            color: 'amber',
          },
          {
            label: 'قوة الدخل (F₁)',
            value: `${inputForceN} N`,
            color: 'cyan',
          },
          {
            label: 'نسبة المساحتين (A₂/A₁)',
            value: `${(area2Cm2 / area1Cm2).toFixed(1)}`,
            color: 'slate',
          },
        ]
      : [
          {
            label: 'قوة الطفو (Fb)',
            value: `${archimedesResult.buoyantForceN.toFixed(2)} N`,
            color: 'cyan',
          },
          {
            label: 'وزن الجسم (w)',
            value: `${archimedesResult.objectWeightN.toFixed(2)} N`,
            color: 'amber',
          },
          {
            label: 'حالة الجسم',
            value: archimedesResult.stateAr.split('(')[0],
            color: archimedesResult.state === 'floating' ? 'emerald' : 'red',
          },
          {
            label: 'الجزء المغمور',
            value: `${(archimedesResult.submergedFraction * 100).toFixed(0)} %`,
            color: 'slate',
          },
        ];

  return (
    <SimulationShell
      title="مختبر الموائع الساكنة (ضغط السائل، باسكال، وأرخميدس)"
      subtitle="الفصل الثالث — ضغط السائل P = ρgh، مبدأ باسكال والمكبس الهيدروليكي، وقاعدة أرخميدس وقوة الطفو"
      badge="الصف الرابع العلمي"
      topic="الموائع الساكنة"
    >
      <div className="space-y-6">
        {/* Mode Selector */}
        <div className="flex overflow-x-auto pb-1 gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 no-scrollbar">
          <button
            type="button"
            onClick={() => setMode('hydrostatic-pressure')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'hydrostatic-pressure'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Droplets className="w-4 h-4" />
            <span>ضغط السائل الساكن</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('pascal-press')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'pascal-press'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <ArrowDown className="w-4 h-4" />
            <span>مبدأ باسكال</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('archimedes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'archimedes'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>قاعدة أرخميدس</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Visual Display */}
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex flex-col items-center justify-center p-4">
              <svg viewBox="0 0 600 300" className="w-full h-full">
                <ScientificGrid width={600} height={300} />

                {mode === 'hydrostatic-pressure' && (
                  <g>
                    {/* Tank */}
                    <rect x="100" y="50" width="400" height="200" fill={activeFluid.color} fillOpacity="0.2" stroke="#64748b" strokeWidth="3" />
                    <line x1="100" y1="50" x2="500" y2="50" stroke={activeFluid.color} strokeWidth="3" />
                    
                    {/* Depth Gauge */}
                    <MeasurementScale x={80} y={50} width={200} minVal={0} maxVal={10} unit="m" color="#94a3b8" />
                    
                    {/* Probe */}
                    <motion.g animate={{ y: 50 + depthM * 20 }}>
                      <line x1="280" y1="-100" x2="280" y2="0" stroke="#e2e8f0" strokeWidth="3" />
                      <circle cx="280" cy="0" r="8" fill="#ef4444" />
                      <rect x="300" y="-20" width="140" height="40" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" rx="8" />
                      <text x="310" y="5" fill="#38bdf8" className="text-[12px] font-mono font-bold">
                        P = {pressureResult.gaugePressureKPa.toFixed(2)} kPa
                      </text>
                    </motion.g>
                    <DiagramLabel x={300} y={260} text={activeFluid.nameAr.split('(')[0]} color="cyan" />
                  </g>
                )}

                {mode === 'pascal-press' && (
                  <g>
                    {/* Pascal Press U-tube approximation */}
                    <path d="M 150 100 L 150 250 L 450 250 L 450 100" fill="none" stroke="#64748b" strokeWidth="40" strokeLinecap="round" />
                    <path d="M 150 110 L 150 250 L 450 250 L 450 110" fill="none" stroke={activeFluid.color} strokeWidth="30" strokeOpacity="0.3" />
                    
                    {/* Piston 1 */}
                    <motion.g animate={{ y: 110 }}>
                      <rect x="130" y="-10" width="40" height="15" fill="#f59e0b" rx="2" />
                      <PhysicsVector startX={150} startY={-40} endX={150} endY={-10} color="#f59e0b" label="F1" />
                    </motion.g>

                    {/* Piston 2 */}
                    <motion.g animate={{ y: 110 }}>
                      <rect x="420" y="-10" width="60" height="20" fill="#10b981" rx="2" />
                      <PhysicsVector startX={450} startY={-10} endX={450} endY={-70} color="#10b981" label="F2" />
                      <rect x="430" y="-35" width="40" height="25" fill="#334155" rx="2" />
                      <text x="450" y="-20" textAnchor="middle" fill="white" className="text-[8px] font-bold">Load</text>
                    </motion.g>

                    <DiagramLabel x={150} y={150} text="A1" color="amber" />
                    <DiagramLabel x={450} y={150} text="A2" color="emerald" />
                  </g>
                )}

                {mode === 'archimedes' && (
                  <g>
                    {/* Beaker */}
                    <rect x="200" y="50" width="200" height="200" fill={activeFluid.color} fillOpacity="0.2" stroke="#64748b" strokeWidth="3" />
                    <line x1="200" y1="80" x2="400" y2="80" stroke={activeFluid.color} strokeWidth="2" />

                    {/* Object Cube */}
                    {(() => {
                      const cubeSize = 60;
                      const surfaceY = 80;
                      let cubeY = surfaceY - cubeSize * (1 - archimedesResult.submergedFraction);
                      if (archimedesResult.state === 'sinking') {
                        cubeY = 250 - cubeSize;
                      }
                      return (
                        <motion.g animate={{ y: cubeY }}>
                          <rect x="270" y="0" width={cubeSize} height={cubeSize} fill={objectDensityKg_m3 < 900 ? "#b45309" : "#475569"} stroke="white" strokeWidth="2" />
                          <text x="300" y={cubeSize/2 + 5} textAnchor="middle" fill="white" className="text-[10px] font-bold">{objectDensityKg_m3} kg/m³</text>
                          
                          {/* Force Vectors */}
                          <PhysicsVector startX={270} startY={cubeSize/2} endX={270} endY={cubeSize/2 + archimedesResult.objectWeightN * 10} color="#ef4444" label="w" />
                          <PhysicsVector startX={330} startY={cubeSize/2} endX={330} endY={cubeSize/2 - archimedesResult.buoyantForceN * 10} color="#38bdf8" label="Fb" />
                        </motion.g>
                      );
                    })()}
                  </g>
                )}
              </svg>

              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-400">
                {mode === 'hydrostatic-pressure'
                  ? 'P = ρ · g · h'
                  : mode === 'pascal-press'
                  ? 'F₁ / A₁ = F₂ / A₂'
                  : 'Fb = ρ · g · V'}
              </div>
            </div>

            <SimulationHUD metrics={hudMetrics} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormulaSubstitution
                formula={mode === 'hydrostatic-pressure' ? 'P = ρ · g · h' : mode === 'pascal-press' ? 'F₂ = F₁ · (A₂ / A₁)' : 'Fb = ρ · g · V_sub'}
                substitutions={mode === 'hydrostatic-pressure' ? [
                  { symbol: 'ρ', value: activeFluid.densityKg_m3, unit: 'kg/m³' },
                  { symbol: 'g', value: 9.8, unit: 'm/s²' },
                  { symbol: 'h', value: depthM, unit: 'm' },
                ] : mode === 'pascal-press' ? [
                  { symbol: 'F₁', value: inputForceN, unit: 'N' },
                  { symbol: 'A₁', value: area1Cm2, unit: 'cm²' },
                  { symbol: 'A₂', value: area2Cm2, unit: 'cm²' },
                ] : [
                  { symbol: 'ρ', value: activeFluid.densityKg_m3, unit: 'kg/m³' },
                  { symbol: 'g', value: 9.8, unit: 'm/s²' },
                  { symbol: 'V_sub', value: (objectVolumeCm3 * archimedesResult.submergedFraction).toFixed(0), unit: 'cm³' },
                ]}
                result={mode === 'hydrostatic-pressure' ? `${pressureResult.gaugePressureKPa.toFixed(2)} kPa` : mode === 'pascal-press' ? `${pascalResult.outputForceN.toFixed(0)} N` : `${archimedesResult.buoyantForceN.toFixed(2)} N`}
              />
              
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-center">
                 <p className="text-[11px] text-slate-400 font-bold mb-2">الاستنتاج العلمي:</p>
                 <p className="text-xs text-slate-300 leading-relaxed">
                   {mode === 'hydrostatic-pressure' && 'يزداد ضغط السائل طردياً مع العمق h ومع كثافة السائل ρ ولا يعتمد على شكل الإناء.'}
                   {mode === 'pascal-press' && 'الضغط المسلط على مائع محصور ينتقل بالتساوي إلى جميع أجزاء المائع وجدران الإناء.'}
                   {mode === 'archimedes' && 'قاعدة أرخميدس: يفقد الجسم المغمور من وزنه بقدر وزن المائع المزاح.'}
                 </p>
              </div>
            </div>

            {/* Educational Callout */}
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-900 dark:text-cyan-200 space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>التحليل العلمي المنهجي:</span>
              </p>
              <p>
                {mode === 'hydrostatic-pressure' && pressureResult.formulaNoteAr}
                {mode === 'pascal-press' && pascalResult.formulaNoteAr}
                {mode === 'archimedes' && archimedesResult.explanationAr}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <SimulationControls
              title="معاملات تجربة الموائع"
              onReset={handleReset}
            >
              <div className="space-y-4">
                {/* Fluid Selector */}
                {mode !== 'pascal-press' && (
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                      نوع السائل المستخدم:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-xs font-bold">
                      {FLUID_PRESETS.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setSelectedFluidId(f.id)}
                          className={`p-2 rounded-xl text-right transition-all ${
                            selectedFluidId === f.id
                              ? 'bg-cyan-600 text-white shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <p>{f.nameAr.split('(')[0]}</p>
                          <span className="text-[10px] font-mono opacity-80">{f.densityKg_m3} kg/m³</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {mode === 'hydrostatic-pressure' && (
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span>عمق نقطة القياس (h)</span>
                      <span className="font-mono text-cyan-600 dark:text-cyan-400">{depthM.toFixed(1)} m</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      step={0.5}
                      value={depthM}
                      onChange={(e) => setDepthM(Number(e.target.value))}
                      className="w-full accent-cyan-600 cursor-pointer"
                    />
                  </div>
                )}

                {mode === 'pascal-press' && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>القوة المسلطة (F₁)</span>
                        <span className="font-mono text-amber-500">{inputForceN} N</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={500}
                        step={10}
                        value={inputForceN}
                        onChange={(e) => setInputForceN(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>المساحة (A₁)</span>
                        <span className="font-mono text-cyan-600 dark:text-cyan-400">{area1Cm2} cm²</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={20}
                        step={1}
                        value={area1Cm2}
                        onChange={(e) => setArea1Cm2(Number(e.target.value))}
                        className="w-full accent-cyan-600 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>المساحة (A₂)</span>
                        <span className="font-mono text-emerald-500">{area2Cm2} cm²</span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={200}
                        step={5}
                        value={area2Cm2}
                        onChange={(e) => setArea2Cm2(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                  </>
                )}

                {mode === 'archimedes' && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>كثافة الجسم (ρ_obj)</span>
                        <span className="font-mono text-amber-500">{objectDensityKg_m3} kg/m³</span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={3000}
                        step={50}
                        value={objectDensityKg_m3}
                        onChange={(e) => setObjectDensityKg_m3(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>حجم الجسم (V_obj)</span>
                        <span className="font-mono text-cyan-600 dark:text-cyan-400">{objectVolumeCm3} cm³</span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={2000}
                        step={100}
                        value={objectVolumeCm3}
                        onChange={(e) => setObjectVolumeCm3(Number(e.target.value))}
                        className="w-full accent-cyan-600 cursor-pointer"
                      />
                    </div>
                  </>
                )}
              </div>
            </SimulationControls>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
