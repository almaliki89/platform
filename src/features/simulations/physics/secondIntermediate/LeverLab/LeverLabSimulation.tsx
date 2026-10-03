import React, { useState } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { LabSurface } from '../../../visuals/LabSurface';
import { SimulationStatus } from '../../../visuals/SimulationStatus';
import { calculateLever } from './calculations';
import { LeverClassType } from './types';
import { Scale, Info, Sparkles, RotateCcw } from 'lucide-react';

export const LeverLabSimulation: React.FC = () => {
  const [effortForce, setEffortForce] = useState<number>(30); // N (F1)
  const [effortArm, setEffortArm] = useState<number>(2.0); // m (d1)
  const [loadForce, setLoadForce] = useState<number>(60); // N (F2)
  const [loadArm, setLoadArm] = useState<number>(1.0); // m (d2)
  const [leverClass, setLeverClass] = useState<LeverClassType>('class1');

  const result = calculateLever(effortForce, effortArm, loadForce, loadArm, leverClass);

  const handleReset = () => {
    setEffortForce(30);
    setEffortArm(2.0);
    setLoadForce(60);
    setLoadArm(1.0);
    setLeverClass('class1');
  };

  const metrics: HUDMetric[] = [
    {
      label: 'عزم القوة (F₁ × d₁)',
      value: result.torqueLeft.toFixed(1),
      unit: 'N·m',
      color: 'text-cyan-500 dark:text-cyan-400',
    },
    {
      label: 'عزم المقاومة (F₂ × d₂)',
      value: result.torqueRight.toFixed(1),
      unit: 'N·m',
      color: 'text-amber-500 dark:text-amber-400',
    },
    {
      label: 'حالة اتزان العتلة',
      value: result.isBalanced ? 'متزنة ✓' : 'غير متزنة',
      color: result.isBalanced ? 'text-emerald-500' : 'text-rose-500 dark:text-rose-400',
    },
    {
      label: 'الفائدة الميكانيكية (MA)',
      value: result.mechanicalAdvantage.toFixed(2),
      unit: '',
      color: 'text-violet-500 dark:text-violet-400',
      formula: 'Load / Effort',
    },
  ];

  return (
    <SimulationShell
      title="مختبر العتلات وقانون الاتزان الميكانيكي"
      subjectTitle="الفيزياء • الثاني المتوسط"
      topic="الفصل الرابع: العتلات والآلات البسيطة"
      grade="الصف الثاني المتوسط"
      description="مختبر تفاعلي لتطبيق قانون العتلات: (القوة × ذراعها = المقاومة × ذراعها)، وحساب الفائدة الميكانيكية، واستكشاف أنواع العتلات الثلاث في الحياة اليومية."
      learningObjectives={[
        'استيعاب قانون العتلات الفيزيائي: F₁ · d₁ = F₂ · d₂',
        'التمييز بين ذراع القوة وذراع المقاومة ونقطة الارتكاز (Fulcrum)',
        'حساب الفائدة الميكانيكية (MA) ومعرفة متى توفر العتلة قوة أو سرعة أو مسافة',
        'التعرف على الأنواع الثلاثة للعتلات وتطبيقاتها في الأدوات الشائعة',
      ]}
      educationalNote={
        <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <p className="font-bold text-slate-900 dark:text-white">
            قانون العتلات الوزاري:
          </p>
          <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900 font-mono text-center text-indigo-600 dark:text-indigo-400 font-bold">
            القوة × ذراعها = المقاومة × ذراعها &nbsp; ⟺ &nbsp; F₁ × d₁ = F₂ × d₂
          </div>
          <p className="text-[11px] leading-relaxed">
            عندما يكون <strong>ذراع القوة (d₁) أكبر من ذراع المقاومة (d₂)</strong>، نحصل على فائدة ميكانيكية أكبر من 1 (ربح قوة: نبذل قوة صغيرة لرفع ثقل كبير).
          </p>
        </div>
      }
      visualization={
        <div className="space-y-3">
          {/* Lever Type Presets */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-2 rounded-xl">
            <span className="text-xs text-slate-500 font-medium px-1">نوع العتلة:</span>
            <button
              onClick={() => {
                setLeverClass('class1');
                setEffortForce(30);
                setEffortArm(2.0);
                setLoadForce(60);
                setLoadArm(1.0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                leverClass === 'class1'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              النوع الأول (الارتكاز بالوسط)
            </button>
            <button
              onClick={() => {
                setLeverClass('class2');
                setEffortForce(25);
                setEffortArm(2.4);
                setLoadForce(50);
                setLoadArm(1.2);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                leverClass === 'class2'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              النوع الثاني (ربح قوة)
            </button>
            <button
              onClick={() => {
                setLeverClass('class3');
                setEffortForce(80);
                setEffortArm(0.8);
                setLoadForce(40);
                setLoadArm(1.6);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                leverClass === 'class3'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              النوع الثالث (ربح سرعة)
            </button>
          </div>

          {/* Interactive Lever Beam Scene */}
          <LabSurface type="dark">
            <div className="relative w-full h-72 bg-slate-950 border border-slate-850 rounded-2xl p-4 overflow-hidden flex flex-col justify-between select-none shadow-inner">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                  {result.leverClassAr}
                </span>
                <span className="font-mono text-cyan-300 font-bold bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                  {result.balanceStateAr}
                </span>
              </div>

              {/* Lever Beam & Fulcrum Pivot */}
              <div className="relative flex-1 flex flex-col items-center justify-center">
                {/* Rotating Beam with dynamic tilt */}
                <div
                  className="relative w-72 sm:w-96 h-4 bg-gradient-to-r from-cyan-600 via-slate-400 to-amber-600 rounded shadow-2xl transition-transform duration-300 origin-center flex items-center justify-between px-2"
                  style={{ transform: `rotate(${result.tiltAngleDeg}deg)` }}
                >
                  {/* Effort Load Left */}
                  <div className="absolute -top-14 left-4 flex flex-col items-center">
                    <div className="w-12 h-10 bg-cyan-700 border-2 border-cyan-400 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                      {effortForce}N
                    </div>
                    <div className="w-0.5 h-4 bg-cyan-400" />
                    <span className="text-[9px] text-cyan-300 font-bold">القوة F₁</span>
                  </div>

                  {/* Resistance Load Right */}
                  <div className="absolute -top-14 right-4 flex flex-col items-center">
                    <div className="w-12 h-10 bg-amber-700 border-2 border-amber-400 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                      {loadForce}N
                    </div>
                    <div className="w-0.5 h-4 bg-amber-400" />
                    <span className="text-[9px] text-amber-300 font-bold">المقاومة F₂</span>
                  </div>
                </div>

                {/* Fulcrum Triangle Pivot */}
                <div className="w-0 h-0 border-x-[20px] border-x-transparent border-b-[36px] border-b-indigo-500 drop-shadow-lg" />
                <div className="w-24 h-2 bg-slate-700 rounded-full mt-0.5" />
              </div>

              {/* Arm Length Distance Indicator */}
              <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 flex justify-between text-[10px] font-mono text-slate-400">
                <span className="text-cyan-400">ذراع القوة d₁ = {effortArm.toFixed(1)} m</span>
                <span className="text-slate-500">نقطة الارتكاز (Fulcrum)</span>
                <span className="text-amber-400">ذراع المقاومة d₂ = {loadArm.toFixed(1)} m</span>
              </div>
            </div>
          </LabSurface>

          {/* Live Formula Display */}
          <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-1.5 text-xs text-slate-300">
            <span className="font-bold text-slate-400 block">العلاقة الرياضية المطبقة حالياً:</span>
            <div className="font-mono text-cyan-400 font-semibold bg-slate-950 p-2.5 rounded-xl text-center">
              F₁ × d₁ = F₂ × d₂ &nbsp;⟹&nbsp; ({effortForce} N × {effortArm} m) = ({loadForce} N × {loadArm} m) &nbsp;⟹&nbsp; {result.torqueLeft.toFixed(1)} N·m = {result.torqueRight.toFixed(1)} N·m
            </div>
          </div>

          {/* Cause and effect feedback area */}
          <SimulationStatus
            status={result.isBalanced ? 'nominal' : 'warning'}
            message={`ما الذي تغيّر؟ عزم القوة (F₁·d₁ = ${result.torqueLeft.toFixed(1)} N·m) ${
              result.isBalanced
                ? 'يساوي عزم المقاومة تماماً، فالعتلة في حالة اتزان ميكانيكي.'
                : result.torqueLeft > result.torqueRight
                ? 'أكبر من عزم المقاومة، مما يسبب ميلان العتلة نحو جهة القوة.'
                : 'أقل من عزم المقاومة، مما يسبب ميلان العتلة نحو جهة الحمل.'
            } الفائدة الميكانيكية MA = ${result.mechanicalAdvantage.toFixed(2)}.`}
          />
        </div>
      }
      controls={
        <SimulationControls onReset={handleReset}>
          {/* Effort Force */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="lev-f1">القوة المبذولة (F₁):</label>
              <span className="font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded text-sm font-black">
                {effortForce} N
              </span>
            </div>
            <input
              id="lev-f1"
              type="range"
              aria-label="القوة المبذولة F1"
              min="5"
              max="120"
              step="5"
              value={effortForce}
              onChange={(e) => setEffortForce(parseInt(e.target.value))}
              className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Effort Arm */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="lev-d1">ذراع القوة (d₁):</label>
              <span className="font-mono text-cyan-600 dark:text-cyan-400 text-xs font-bold">
                {effortArm.toFixed(1)} متر
              </span>
            </div>
            <input
              id="lev-d1"
              type="range"
              aria-label="ذراع القوة d1"
              min="0.5"
              max="3.0"
              step="0.1"
              value={effortArm}
              onChange={(e) => setEffortArm(parseFloat(e.target.value))}
              className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Load Force */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="lev-f2">المقاومة / الحمل (F₂):</label>
              <span className="font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded text-sm font-black">
                {loadForce} N
              </span>
            </div>
            <input
              id="lev-f2"
              type="range"
              aria-label="المقاومة والحمل F2"
              min="5"
              max="150"
              step="5"
              value={loadForce}
              onChange={(e) => setLoadForce(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Load Arm */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="lev-d2">ذراع المقاومة (d₂):</label>
              <span className="font-mono text-amber-600 dark:text-amber-400 text-xs font-bold">
                {loadArm.toFixed(1)} متر
              </span>
            </div>
            <input
              id="lev-d2"
              type="range"
              aria-label="ذراع المقاومة d2"
              min="0.5"
              max="3.0"
              step="0.1"
              value={loadArm}
              onChange={(e) => setLoadArm(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>
        </SimulationControls>
      }
      outputs={<SimulationHUD metrics={metrics} />}
      onReset={handleReset}
    />
  );
};
