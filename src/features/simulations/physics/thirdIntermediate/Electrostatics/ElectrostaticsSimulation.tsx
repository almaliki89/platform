import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateCoulombForce, CHARGING_METHODS, COULOMB_CONSTANT } from './calculations';
import { ChargingMethod } from './types';
import { Zap, RotateCcw, ArrowLeftRight, Layers, Sparkles, ShieldAlert } from 'lucide-react';
import { LabSurface } from '../../../visuals/LabSurface';
import { ScientificGrid } from '../../../visuals/ScientificGrid';
import { PhysicsVector } from '../../../visuals/PhysicsVector';
import { ElectricCharge } from '../../../visuals/ElectricCharge';
import { FormulaSubstitution } from '../../../visuals/FormulaSubstitution';
import { ValueBadge } from '../../../visuals/ValueBadge';
import { SimulationStatus } from '../../../visuals/SimulationStatus';

export const ElectrostaticsSimulation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'coulomb' | 'charging'>('coulomb');

  // Coulomb controls
  const [q1MicroC, setQ1MicroC] = useState<number>(5);
  const [q2MicroC, setQ2MicroC] = useState<number>(-5);
  const [distanceM, setDistanceM] = useState<number>(0.15); // 15 cm
  const [showFieldLines, setShowFieldLines] = useState<boolean>(true);

  // Charging methods state
  const [selectedMethod, setSelectedMethod] = useState<ChargingMethod>('induction');
  const [inductionStep, setInductionStep] = useState<number>(1);

  const coulombResult = calculateCoulombForce(q1MicroC, q2MicroC, distanceM);

  const handleReset = () => {
    setQ1MicroC(5);
    setQ2MicroC(-5);
    setDistanceM(0.15);
    setShowFieldLines(true);
    setInductionStep(1);
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'القوة المتبادلة (F)',
      value:
        coulombResult.forceN >= 1000
          ? `${coulombResult.forceN.toExponential(2)} N`
          : `${coulombResult.forceN.toFixed(2)} N`,
      color: coulombResult.isRepulsive ? 'amber' : 'cyan',
    },
    {
      label: 'طبيعة القوة',
      value: coulombResult.isZero ? 'معدومة' : coulombResult.isRepulsive ? 'تنافر (Repulsion)' : 'تجاذب (Attraction)',
      color: coulombResult.isRepulsive ? 'red' : 'emerald',
    },
    {
      label: 'المسافة الفاصلة (r)',
      value: `${(distanceM * 100).toFixed(1)} cm`,
      color: 'slate',
    },
    {
      label: 'شدة المجال بالمنتصف',
      value: `${(coulombResult.fieldAtMidpointN_C / 1000).toFixed(1)} kN/C`,
      color: 'cyan',
    },
  ];

  const currentMethod = CHARGING_METHODS.find((m) => m.id === selectedMethod) || CHARGING_METHODS[0];

  // Map distance to pixels for visualization
  const width = 600;
  const height = 320;
  const centerY = height / 2;
  const minM = 0.02;
  const maxM = 0.5;
  const minPx = 90;
  const maxPx = width - 120;
  const pixelDistance = minPx + ((distanceM - minM) / (maxM - minM)) * (maxPx - minPx);

  const x1 = width / 2 - pixelDistance / 2;
  const x2 = width / 2 + pixelDistance / 2;

  return (
    <SimulationShell
      title="مختبر الكهربائية الساكنة وقانون كولوم"
      subtitle="الفصل الأول — استكشاف تفاعل الشحنات الكهربائية، طرائق الشحن، وقانون كولوم"
      badge="الصف الثالث المتوسط"
      topic="الكهربائية الساكنة"
    >
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('coulomb')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'coulomb'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>قانون كولوم وخطوط المجال</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('charging')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'charging'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>طرائق الشحن الكهربائي</span>
          </button>
        </div>

        {activeTab === 'coulomb' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <LabSurface type="dark" className="aspect-[600/320] flex items-center justify-center p-0 overflow-hidden relative" data-testid="physics-visualization">
                <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                  <ScientificGrid width={width} height={height} />
                  
                  {/* Distance Line */}
                  <line 
                    x1={x1} y1={centerY + 60} 
                    x2={x2} y2={centerY + 60} 
                    stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" 
                  />
                  <line x1={x1} y1={centerY + 55} x2={x1} y2={centerY + 65} stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1={x2} y1={centerY + 55} x2={x2} y2={centerY + 65} stroke="#94a3b8" strokeWidth="1.5" />
                  <text 
                    x={(x1 + x2) / 2} y={centerY + 80} 
                    fill="#cbd5e1" fontSize="12" textAnchor="middle" fontWeight="bold"
                  >
                    r = {(distanceM * 100).toFixed(1)} cm
                  </text>

                  {/* Force Vectors */}
                  {!coulombResult.isZero && (
                    <>
                      <PhysicsVector
                        startX={x1} startY={centerY}
                        endX={x1 + (coulombResult.isRepulsive ? -1 : 1) * (40 + Math.min(60, coulombResult.forceN / 5))}
                        endY={centerY}
                        color="#eab308"
                        label="F₁₂"
                        magnitude={coulombResult.forceN.toFixed(2)}
                        unit="N"
                      />
                      <PhysicsVector
                        startX={x2} startY={centerY}
                        endX={x2 + (coulombResult.isRepulsive ? 1 : -1) * (40 + Math.min(60, coulombResult.forceN / 5))}
                        endY={centerY}
                        color="#eab308"
                        label="F₂₁"
                        magnitude={coulombResult.forceN.toFixed(2)}
                        unit="N"
                      />
                    </>
                  )}
                </svg>

                {/* Charges as separate overlay components for better visual depth */}
                <div className="absolute inset-0 pointer-events-none">
                  <ElectricCharge
                    charge={q1MicroC}
                    label="q₁"
                    position={{ x: (x1 / width) * 100 + '%', y: '50%' } as any}
                    size={50}
                  />
                  <ElectricCharge
                    charge={q2MicroC}
                    label="q₂"
                    position={{ x: (x2 / width) * 100 + '%', y: '50%' } as any}
                    size={50}
                  />
                </div>

                <div className="absolute top-4 right-4">
                  <SimulationStatus 
                    status="nominal" 
                    message={coulombResult.isZero ? 'نظام متزن' : 'تفاعل كهروسكوني'}
                  />
                </div>
              </LabSurface>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormulaSubstitution
                  formula="F = k · |q₁ · q₂| / r²"
                  substitutions={[
                    { symbol: 'k', value: '9 × 10⁹', unit: 'N·m²/C²' },
                    { symbol: 'q₁', value: `${q1MicroC} × 10⁻⁶`, unit: 'C' },
                    { symbol: 'q₂', value: `${q2MicroC} × 10⁻⁶`, unit: 'C' },
                    { symbol: 'r', value: distanceM.toFixed(2), unit: 'm' },
                  ]}
                  result={coulombResult.forceN >= 1000 ? coulombResult.forceN.toExponential(3) : coulombResult.forceN.toFixed(3)}
                  unit="N"
                />
                
                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 space-y-3">
                  <h4 className="text-sm font-bold text-cyan-900 dark:text-cyan-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>التحليل الفيزيائي:</span>
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {coulombResult.descriptionAr}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <ValueBadge label="ثابت كولوم" value="9 × 10⁹" color="slate" />
                    <ValueBadge 
                      label="نوع القوة" 
                      value={coulombResult.isAttractive ? 'تجاذب' : coulombResult.isRepulsive ? 'تنافر' : 'صفر'} 
                      color={coulombResult.isAttractive ? 'emerald' : 'amber'} 
                    />
                  </div>
                </div>
              </div>

              <SimulationHUD metrics={hudMetrics} />
            </div>

            <div className="space-y-4">
              <SimulationControls title="معاملات التجربة" onReset={handleReset}>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <span>الشحنة الأولى (q₁)</span>
                      <span className="text-cyan-600">{q1MicroC} μC</span>
                    </div>
                    <input
                      type="range" min={-20} max={20} step={1}
                      value={q1MicroC}
                      onChange={(e) => setQ1MicroC(Number(e.target.value))}
                      className="w-full accent-cyan-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <span>الشحنة الثانية (q₂)</span>
                      <span className="text-cyan-600">{q2MicroC} μC</span>
                    </div>
                    <input
                      type="range" min={-20} max={20} step={1}
                      value={q2MicroC}
                      onChange={(e) => setQ2MicroC(Number(e.target.value))}
                      className="w-full accent-cyan-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <span>المسافة (r)</span>
                      <span className="text-cyan-600">{(distanceM * 100).toFixed(0)} cm</span>
                    </div>
                    <input
                      type="range" min={0.05} max={0.45} step={0.01}
                      value={distanceM}
                      onChange={(e) => setDistanceM(Number(e.target.value))}
                      className="w-full accent-cyan-600"
                    />
                  </div>
                </div>
              </SimulationControls>
            </div>
          </div>
        ) : (
          /* Charging Methods Visualizer */
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {CHARGING_METHODS.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => {
                    setSelectedMethod(method.id);
                    setInductionStep(1);
                  }}
                  className={`p-4 rounded-2xl border text-right transition-all cursor-pointer ${
                    selectedMethod === method.id
                      ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/30 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                    {method.titleAr}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {method.subtitleAr}
                  </p>
                </button>
              ))}
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-cyan-600 text-white">
                  {currentMethod.titleAr}
                </span>
                <span className="text-xs text-slate-400 font-medium">منهاج الفيزياء العراقي</span>
              </div>

              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-r-4 border-cyan-500 pr-4">
                <p className="font-bold text-slate-900 dark:text-white">آلية الشحن:</p>
                <p>{currentMethod.stepDescriptionAr}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 text-xs">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">حاملات الشحنة:</span>
                  <span className="text-slate-600 dark:text-slate-400">{currentMethod.chargeCarrierAr}</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">النتيجة النهائية:</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">{currentMethod.finalStateAr}</span>
                </div>
              </div>

              {selectedMethod === 'induction' && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700/60">
                  <p className="font-bold text-xs text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <Zap className="w-3 h-3 text-amber-500" />
                    <span>خطوات الشحن بالحَث:</span>
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { step: 1, text: '١. تقريب الساق' },
                      { step: 2, text: '٢. التأريض' },
                      { step: 3, text: '٣. قطع الأرض' },
                      { step: 4, text: '٤. إبعاد الساق' },
                    ].map((s) => (
                      <button
                        key={s.step}
                        type="button"
                        onClick={() => setInductionStep(s.step)}
                        className={`p-2.5 rounded-xl text-[10px] font-bold text-center transition-all ${
                          inductionStep === s.step
                            ? 'bg-cyan-600 text-white shadow-sm'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        {s.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </SimulationShell>
  );
};

