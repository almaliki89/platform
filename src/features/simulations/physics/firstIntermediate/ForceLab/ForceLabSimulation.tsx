import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { LabSurface } from '../../../visuals/LabSurface';
import { SimulationStatus } from '../../../visuals/SimulationStatus';
import { calculateNetForce } from './calculations';
import { ArrowLeft, ArrowRight, Zap, Info, Play, Pause, RotateCcw } from 'lucide-react';

export const ForceLabSimulation: React.FC = () => {
  const [leftForce, setLeftForce] = useState<number>(30);
  const [rightForce, setRightForce] = useState<number>(50);
  const [mass, setMass] = useState<number>(5);
  const [positionX, setPositionX] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const animRef = useRef<number | null>(null);
  const velocityRef = useRef<number>(0);

  const result = calculateNetForce(leftForce, rightForce, mass);

  // Animation Loop
  useEffect(() => {
    if (!isPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    let lastTime = performance.now();
    const loop = (time: number) => {
      const dt = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;

      const rawNet = rightForce - leftForce;
      const accel = rawNet / mass;

      velocityRef.current += accel * dt;
      setPositionX((prev) => {
        const next = prev + velocityRef.current * dt * 25;
        // Dampen or wrap around [-180, 180]
        if (next > 180 || next < -180) {
          velocityRef.current = 0;
          return Math.max(-180, Math.min(180, next));
        }
        return next;
      });

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, leftForce, rightForce, mass]);

  const handleReset = () => {
    setIsPlaying(false);
    setPositionX(0);
    velocityRef.current = 0;
    setLeftForce(30);
    setRightForce(50);
    setMass(5);
  };

  const metrics: HUDMetric[] = [
    {
      label: 'محصلة القوى (F_net)',
      value: result.netForce.toFixed(1),
      unit: 'N',
      color: result.isBalanced ? 'text-emerald-500' : 'text-amber-500 dark:text-amber-400',
      formula: 'F_net = |F₁ - F₂|',
    },
    {
      label: 'حالة الاتزان',
      value: result.isBalanced ? 'متزنة (ساكن)' : 'غير متزنة (متحرك)',
      color: result.isBalanced ? 'text-emerald-500' : 'text-rose-500 dark:text-rose-400',
    },
    {
      label: 'اتجاه الحركة',
      value: result.directionAr,
      color: 'text-cyan-500 dark:text-cyan-400',
    },
    {
      label: 'التعجيل الناتج (a)',
      value: result.acceleration.toFixed(2),
      unit: 'm/s²',
      color: 'text-violet-500 dark:text-violet-400',
      formula: 'a = F_net / m',
    },
  ];

  return (
    <SimulationShell
      title="مختبر القوة ومحصلة القوى المتجهة"
      subjectTitle="الفيزياء • الأول المتوسط"
      topic="الفصل الثاني: القوة"
      grade="الصف الأول المتوسط"
      description="مختبر تفاعلي لتطبيق مفهوم القوة كسحب ودفع، واستكشاف القوى المتزنة وغير المتزنة وتأثير محصلة القوى على حركة الأجسام."
      learningObjectives={[
        'فهم أن القوة كمية متجهة تمتلك مقداراً واتجاهاً ونقطة تأثير',
        'التمييز بين القوى المتزنة (المحصلة = 0) والقوى غير المتزنة (المحصلة ≠ 0)',
        'حساب محصلة قوتين تعملان على خط فعل واحد في اتجاهين متعاكسين',
      ]}
      educationalNote={
        <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <p className="font-bold text-slate-900 dark:text-white">
            قاعدة حساب محصلة القوى (F_net):
          </p>
          <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900 font-mono text-center text-indigo-600 dark:text-indigo-400 font-bold">
            F_net = F_right - F_left
          </div>
          <p className="text-[11px] leading-relaxed">
            إذا كانت القوتان متساويتين في المقدار ومتعاكستين في الاتجاه: <strong>F_net = 0</strong> وتكون القوى متزنة ولا تسبب تغيراً في حركة الجسم.
          </p>
        </div>
      }
      visualization={
        <div className="space-y-4">
          {/* Visual Interactive Canvas */}
          <LabSurface type="dark">
            <div className="relative w-full h-64 sm:h-72 bg-slate-950 border border-slate-850 rounded-2xl p-4 overflow-hidden flex flex-col justify-between select-none shadow-inner">
              {/* Track Floor */}
              <div className="absolute bottom-12 left-0 right-0 h-3 bg-slate-800 border-t border-slate-700">
                <div className="w-full h-full flex justify-between px-4 opacity-40">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="w-1 h-2 bg-slate-400" />
                  ))}
                </div>
              </div>

              {/* Force Direction HUD */}
              <div className="flex justify-between items-center z-10 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-blue-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-blue-900/50">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>قوة اليسار F₁ = {leftForce} N</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-amber-900/50">
                  <span>قوة اليمين F₂ = {rightForce} N</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Block Object with attached Force Arrows */}
              <div className="relative flex-1 flex items-center justify-center">
                <div
                  className="relative flex items-center justify-center transition-transform duration-75"
                  style={{ transform: `translateX(${positionX}px)` }}
                >
                  {/* Left Vector Arrow */}
                  {leftForce > 0 && (
                    <div
                      className="absolute right-full mr-1 h-3 bg-blue-500 rounded-l flex items-center"
                      style={{ width: `${Math.min(120, leftForce * 1.5)}px` }}
                    >
                      <div className="absolute -left-2 border-y-4 border-y-transparent border-r-8 border-r-blue-500" />
                      <span className="absolute -top-4 right-1 text-[10px] text-blue-400 font-bold whitespace-nowrap">
                        {leftForce} N
                      </span>
                    </div>
                  )}

                  {/* The Mass Block */}
                  <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl shadow-xl border-2 border-indigo-400 flex flex-col items-center justify-center text-white z-10">
                    <span className="text-[10px] text-indigo-200">الكتلة (m)</span>
                    <span className="text-base font-black">{mass} kg</span>
                  </div>

                  {/* Right Vector Arrow */}
                  {rightForce > 0 && (
                    <div
                      className="absolute left-full ml-1 h-3 bg-amber-500 rounded-r flex items-center"
                      style={{ width: `${Math.min(120, rightForce * 1.5)}px` }}
                    >
                      <div className="absolute -right-2 border-y-4 border-y-transparent border-l-8 border-l-amber-500" />
                      <span className="absolute -top-4 left-1 text-[10px] text-amber-400 font-bold whitespace-nowrap">
                        {rightForce} N
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Net Force Result Indicator */}
              <div className="text-center z-10">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    result.isBalanced
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>المحصلة: {result.directionAr}</span>
                </span>
              </div>
            </div>
          </LabSurface>

          {/* Live Formula Display */}
          <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-1.5 text-xs text-slate-300">
            <span className="font-bold text-slate-400 block">العلاقة الرياضية المطبقة حالياً:</span>
            <div className="font-mono text-cyan-400 font-semibold bg-slate-950 p-2.5 rounded-xl text-center">
              ΣF = F₂ (اليمين) - F₁ (اليسار) = {rightForce} N - {leftForce} N = {rightForce - leftForce} N
              {rightForce - leftForce !== 0 && ` (${rightForce - leftForce > 0 ? '← اتجاه الحركة لليمين' : '→ اتجاه الحركة لليسار'})`}
              {rightForce - leftForce === 0 && ' (متزنة - سكون)'}
            </div>
          </div>

          {/* Cause and effect feedback area */}
          <SimulationStatus
            status={result.isBalanced ? 'nominal' : 'warning'}
            message={`ما الذي تغيّر؟ القوى الحالية ${
              result.isBalanced
                ? 'متزنة تماماً (ΣF = 0)، مما يحافظ على سكون الكتلة دون نشوء أي تعجيل.'
                : `غير متزنة وتسبب تسارع الكتلة بتعجيل قدره a = F_net / m = ${result.netForce.toFixed(2)} N / ${mass} kg = ${result.acceleration.toFixed(2)} m/s².`
            }`}
          />
        </div>
      }
      controls={
        <SimulationControls
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onReset={handleReset}
        >
          {/* Left Force Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="left-force">القوة نحو اليسار (F₁):</label>
              <span className="font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded text-sm font-black">
                {leftForce} N
              </span>
            </div>
            <input
              id="left-force"
              type="range"
              aria-label="القوة نحو اليسار F1"
              min="0"
              max="100"
              step="5"
              value={leftForce}
              onChange={(e) => setLeftForce(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Right Force Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="right-force">القوة نحو اليمين (F₂):</label>
              <span className="font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded text-sm font-black">
                {rightForce} N
              </span>
            </div>
            <input
              id="right-force"
              type="range"
              aria-label="القوة نحو اليمين F2"
              min="0"
              max="100"
              step="5"
              value={rightForce}
              onChange={(e) => setRightForce(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Mass Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="mass-slider">كتلة الجسم (m):</label>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                {mass} kg
              </span>
            </div>
            <input
              id="mass-slider"
              type="range"
              aria-label="كتلة الجسم m"
              min="1"
              max="20"
              step="1"
              value={mass}
              onChange={(e) => setMass(parseInt(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>
        </SimulationControls>
      }
      outputs={<SimulationHUD metrics={metrics} />}
      extraPanels={
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl text-xs space-y-2">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-500" />
            <span>التفسير الفيزيائي للحركة:</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {result.explanationAr}
          </p>
        </div>
      }
      onReset={handleReset}
    />
  );
};
