import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  SI_BASE_UNITS,
  DIMENSIONAL_EQUATIONS,
  calculateMeasurementError,
} from './calculations';
import { MainParametersMode } from './types';
import { Ruler, Scale, Percent, CheckCircle2, Sparkles } from 'lucide-react';
import { MeasurementScale } from '../../../visuals/MeasurementScale';
import { ScientificGrid } from '../../../visuals/ScientificGrid';
import { FormulaSubstitution } from '../../../visuals/FormulaSubstitution';

export const MainParametersSimulation: React.FC = () => {
  const [mode, setMode] = useState<MainParametersMode>('error-analysis');

  // Mode B state
  const [selectedEqId, setSelectedEqId] = useState<string>('force');

  // Mode C state (Error Analysis)
  const [acceptedVal, setAcceptedVal] = useState<number>(9.8); // e.g. g = 9.8 m/s^2
  const [measuredVal, setMeasuredVal] = useState<number>(9.65);

  const errorResult = calculateMeasurementError(measuredVal, acceptedVal);
  const activeEq =
    DIMENSIONAL_EQUATIONS.find((eq) => eq.id === selectedEqId) || DIMENSIONAL_EQUATIONS[0];

  const handleReset = () => {
    setMode('error-analysis');
    setSelectedEqId('force');
    setAcceptedVal(9.8);
    setMeasuredVal(9.65);
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'الخطأ المطلق (Δx)',
      value: errorResult.absoluteError.toFixed(4),
      color: 'cyan',
    },
    {
      label: 'الخطأ النسبي (Relative Error)',
      value: errorResult.relativeError.toFixed(5),
      color: 'amber',
    },
    {
      label: 'الخطأ المئوي (Percentage Error)',
      value: `${errorResult.percentageError.toFixed(2)} %`,
      color: errorResult.percentageError <= 3 ? 'emerald' : errorResult.percentageError <= 8 ? 'amber' : 'red',
    },
    {
      label: 'مستوى الدقة التجريبية',
      value: errorResult.accuracyGradeAr.split('(')[0],
      color: 'slate',
    },
  ];

  return (
    <SimulationShell
      title="مختبر القياس والمعلمات الفيزيائية ومعادلات الأبعاد"
      subtitle="الفصل الأول — النظام الدولي للوحدات SI، معادلات الأبعاد، وحساب نسبة الخطأ التجريبي في القياس"
      badge="الصف الرابع العلمي"
      topic="معلمات رئيسة في الفيزياء"
    >
      <div className="space-y-6">
        {/* Mode Selector */}
        <div className="flex overflow-x-auto pb-1 gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 no-scrollbar">
          <button
            type="button"
            onClick={() => setMode('error-analysis')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'error-analysis'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Percent className="w-4 h-4" />
            <span>حساب الخطأ في القياس</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('dimensions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'dimensions'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>معادلات الأبعاد</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('units')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'units'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Ruler className="w-4 h-4" />
            <span>النظام الدولي للوحدات</span>
          </button>
        </div>

        {mode === 'error-analysis' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Visual Error Gauge Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-inner text-white space-y-6 overflow-hidden">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                      <Percent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-100">
                        مقياس الدقة والخطأ التجريبي في القياس
                      </h3>
                      <p className="text-xs text-slate-400">
                        مقارنة القيمة المقاسة عملياً مع القيمة النظرية المقبولة
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-2xl text-center">
                    <span className="text-[11px] text-slate-400 block">نسبة الخطأ المئوي</span>
                    <span
                      className={`text-2xl font-black font-mono ${
                        errorResult.percentageError <= 3
                          ? 'text-emerald-400'
                          : errorResult.percentageError <= 8
                          ? 'text-amber-400'
                          : 'text-red-400'
                      }`}
                    >
                      {errorResult.percentageError.toFixed(2)} %
                    </span>
                  </div>
                </div>

                {/* Error Scale SVG */}
                <div className="relative aspect-[4/1] w-full bg-slate-900 rounded-2xl border border-slate-800 p-4 overflow-hidden">
                  <svg viewBox="0 0 400 100" className="w-full h-full">
                    <ScientificGrid width={400} height={100} />
                    <MeasurementScale x={50} y={60} width={300} minVal={acceptedVal * 0.8} maxVal={acceptedVal * 1.2} step={acceptedVal * 0.04} color="#64748b" />
                    
                    {/* Accepted Value Marker */}
                    <g transform="translate(200, 60)">
                      <line x1="0" y1="-30" x2="0" y2="0" stroke="#10b981" strokeWidth="3" />
                      <circle cx="0" cy="-30" r="4" fill="#10b981" />
                      <text y="-40" textAnchor="middle" fill="#10b981" className="text-[10px] font-bold">Accepted</text>
                    </g>

                    {/* Measured Value Marker */}
                    {(() => {
                      const range = acceptedVal * 0.4; // 0.8 to 1.2
                      const diff = measuredVal - acceptedVal;
                      const xOffset = (diff / range) * 300;
                      return (
                        <motion.g 
                          animate={{ x: 200 + xOffset }}
                          transition={{ type: 'spring', damping: 15 }}
                        >
                          <line x1="0" y1="-15" x2="0" y2="0" stroke="#06b6d4" strokeWidth="3" />
                          <circle cx="0" cy="-15" r="4" fill="#06b6d4" />
                          <text y="-25" textAnchor="middle" fill="#06b6d4" className="text-[10px] font-bold">Measured</text>
                        </motion.g>
                      );
                    })()}
                  </svg>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormulaSubstitution
                    formula="Δx = |x - x₀|"
                    substitutions={[
                      { symbol: 'x', value: measuredVal },
                      { symbol: 'x₀', value: acceptedVal },
                    ]}
                    result={errorResult.absoluteError.toFixed(4)}
                  />
                  <FormulaSubstitution
                    formula="Err% = (Δx / x₀) × 100"
                    substitutions={[
                      { symbol: 'Δx', value: errorResult.absoluteError.toFixed(4) },
                      { symbol: 'x₀', value: acceptedVal },
                    ]}
                    result={`${errorResult.percentageError.toFixed(2)}%`}
                  />
                </div>
              </div>

              <SimulationHUD metrics={hudMetrics} />

              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-900 dark:text-cyan-200 space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                  <span>التحليل العلمي للقياس:</span>
                </p>
                <p>{errorResult.explanationAr}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  حسب منهاج الفيزياء للصف الرابع العلمي: كلما قل الخطأ المئوي زادت دقة القياس (Accuracy)، وتعتمد الدقة على مهارة المجرب وجودة ومعايرة أداة القياس.
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              <SimulationControls
                title="معاملات القياس وقيم التجربة"
                onReset={handleReset}
              >
                <div className="space-y-4">
                  {/* Presets */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                      تجارب قياس منهجية شائعة:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'التعجيل الأرضي (g)', acc: 9.8, meas: 9.65 },
                        { label: 'سرعة الصوت (v)', acc: 340, meas: 348 },
                        { label: 'غليان الماء (T)', acc: 100, meas: 102.5 },
                        { label: 'كثافة الماء (ρ)', acc: 1000, meas: 992 },
                      ].map((p, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setAcceptedVal(p.acc);
                            setMeasuredVal(p.meas);
                          }}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-right hover:bg-slate-200 transition-colors"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span>القيمة المقبولة الحقيقية (x₀)</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400">
                        {acceptedVal}
                      </span>
                    </div>
                    <input
                      type="number"
                      step={0.1}
                      value={acceptedVal}
                      onChange={(e) => setAcceptedVal(Number(e.target.value) || 0.1)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span>القيمة المقاسة في التجربة (x)</span>
                      <span className="font-mono text-cyan-600 dark:text-cyan-400">
                        {measuredVal}
                      </span>
                    </div>
                    <input
                      type="number"
                      step={0.05}
                      value={measuredVal}
                      onChange={(e) => setMeasuredVal(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs"
                    />
                  </div>
                </div>
              </SimulationControls>
            </div>
          </div>
        )}

        {mode === 'dimensions' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                صيغ ومعادلات الأبعاد (Dimensional Analysis)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                تُستعمل صيغة الأبعاد لمعرفة وحدات الكميات المشتقة واختبار صحة المعادلات الفيزيائية بالتحقق من تجانس أبعاد الطرفين.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {DIMENSIONAL_EQUATIONS.map((eq) => (
                <button
                  key={eq.id}
                  type="button"
                  onClick={() => setSelectedEqId(eq.id)}
                  className={`p-3 rounded-2xl border text-right transition-all cursor-pointer ${
                    selectedEqId === eq.id
                      ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <p className="font-bold text-xs text-slate-900 dark:text-white">{eq.nameAr}</p>
                  <p className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 mt-1">
                    {eq.formulaTex}
                  </p>
                </button>
              ))}
            </div>

            {/* Active Equation Detailed Analysis Card */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-cyan-600 text-white">
                  {activeEq.nameAr}
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>متجانسة بعدياً (صحيحة)</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block mb-1 font-sans">أبعاد الطرف الأيسر (LHS):</span>
                  <span className="text-base font-bold text-cyan-600 dark:text-cyan-400">
                    {activeEq.lhsDimension}
                  </span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block mb-1 font-sans">أبعاد الطرف الأيمن (RHS):</span>
                  <span className="text-base font-bold text-amber-500">
                    {activeEq.rhsDimension}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans pt-1">
                {activeEq.stepExplanationAr}
              </p>
            </div>
          </div>
        )}

        {mode === 'units' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                الوحدات الأساسية السبع في النظام الدولي (SI)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                جميع الكميات الفيزيائية الأخرى هي كميات مشتقة تُعرّف بدلالة هذه الوحدات الأساسية السبع.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {SI_BASE_UNITS.map((u, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {u.quantityAr}
                      </span>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                        {u.dimensionSymbol}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono">{u.quantityEn} ({u.symbol})</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {u.unitAr} ({u.unitSymbol})
                    </span>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {u.standardDefinitionAr}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SimulationShell>
  );
};
