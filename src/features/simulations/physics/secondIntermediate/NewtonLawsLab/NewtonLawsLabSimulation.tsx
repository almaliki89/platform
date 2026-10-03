import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { NewtonLawScenario } from './types';
import { calculateNewtonLawScenario } from './calculations';
import { Zap, Shield, Repeat, ArrowLeft, ArrowRight, Play, Pause, RotateCcw } from 'lucide-react';
import { LabSurface } from '../../../visuals/LabSurface';
import { ScientificGrid } from '../../../visuals/ScientificGrid';
import { PhysicsVector } from '../../../visuals/PhysicsVector';
import { ValueBadge } from '../../../visuals/ValueBadge';
import { SimulationStatus } from '../../../visuals/SimulationStatus';
import { usePrefersReducedMotion } from '../../../core/usePrefersReducedMotion';

export const NewtonLawsLabSimulation: React.FC = () => {
  const [scenario, setScenario] = useState<NewtonLawScenario>('f_ma');
  const [force, setForce] = useState<number>(40);
  const [massA, setMassA] = useState<number>(5);
  const [massB, setMassB] = useState<number>(8);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [posA, setPosA] = useState<number>(0);
  const [posB, setPosB] = useState<number>(0);

  const animRef = useRef<number | null>(null);
  const velARef = useRef<number>(0);
  const velBRef = useRef<number>(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const result = calculateNewtonLawScenario(scenario, force, massA, massB);

  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    let lastTime = performance.now();
    const loop = (time: number) => {
      const dt = Math.min(0.06, (time - lastTime) / 1000);
      lastTime = time;

      if (scenario === 'inertia') {
        // Inertia: moves at constant speed (no acceleration)
        setPosA((prev) => (prev > 160 ? -160 : prev + 40 * dt));
      } else if (scenario === 'f_ma') {
        velARef.current += result.accelerationA * dt;
        setPosA((prev) => {
          const next = prev + velARef.current * dt * 15;
          return next > 180 ? -180 : next;
        });
      } else if (scenario === 'action_reaction') {
        // Skater A moves left, Skater B moves right
        velARef.current += result.accelerationA * dt;
        velBRef.current += (result.accelerationB || 0) * dt;

        setPosA((prev) => Math.max(-180, prev - velARef.current * dt * 15));
        setPosB((prev) => Math.min(180, prev + velBRef.current * dt * 15));
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, scenario, result, prefersReducedMotion]);

  const handleReset = () => {
    setIsPlaying(false);
    setPosA(0);
    setPosB(0);
    velARef.current = 0;
    velBRef.current = 0;
  };

  const metrics: HUDMetric[] = [
    {
      label: 'القانون المطبق',
      value: scenario === 'inertia' ? 'القانون الأول' : scenario === 'f_ma' ? 'القانون الثاني' : 'القانون الثالث',
      color: 'text-indigo-500 dark:text-indigo-400',
    },
    {
      label: 'القوة المؤثرة (F)',
      value: scenario === 'inertia' ? '0' : force,
      unit: 'N',
      color: 'text-amber-500 dark:text-amber-400',
      formula: scenario === 'f_ma' ? 'F = m·a' : scenario === 'action_reaction' ? 'F₁ = -F₂' : 'ΣF = 0',
    },
    {
      label: 'تعجيل الجسم الأول (a₁)',
      value: result.accelerationA.toFixed(2),
      unit: 'm/s²',
      color: 'text-cyan-500 dark:text-cyan-400',
    },
    {
      label: scenario === 'action_reaction' ? 'تعجيل الجسم الثاني (a₂)' : 'الكتلة (m)',
      value: scenario === 'action_reaction' ? (result.accelerationB || 0).toFixed(2) : massA,
      unit: scenario === 'action_reaction' ? 'm/s²' : 'kg',
      color: 'text-emerald-500 dark:text-emerald-400',
    },
  ];

  return (
    <SimulationShell
      title="مختبر قوانين الحركة لنيوتن (القصور، F=ma، الفعل رد الفعل)"
      subjectTitle="الفيزياء • الثاني المتوسط"
      topic="الفصل الثاني: قوانين الحركة"
      grade="الصف الثاني المتوسط"
      description="مختبر تفاعلي شامل يدمج القوانين الثلاثة لإسحاق نيوتن في الحركة من خلال سيناريوهات تفاعلية عملية توضح القصور الذاتي والتسارع والتفاعل المتبادل."
      learningObjectives={[
        'تطبيق قانون نيوتن الأول: بقاء الجسم على حالته الحركية عند انعدام محصلة القوى',
        'تطبيق قانون نيوتن الثاني: العلاقة الرياضية بين القوة والكتلة والتعجيل (F = m · a)',
        'تطبيق قانون نيوتن الثالث: لكل قوة فعل قوة رد فعل مساوية بالمقدار ومعاكسة بالاتجاه (F_action = -F_reaction)',
      ]}
      educationalNote={
        <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <p className="font-bold text-slate-900 dark:text-white">
            {result.lawNameAr}:
          </p>
          <p className="leading-relaxed">{result.explanationAr}</p>
        </div>
      }
      visualization={
        <div className="space-y-4">
          {/* Scenario Tabs */}
          <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                setScenario('inertia');
                handleReset();
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                scenario === 'inertia'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>القصور الذاتي (الأول)</span>
            </button>
            <button
              onClick={() => {
                setScenario('f_ma');
                handleReset();
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                scenario === 'f_ma'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>القوة والتعجيل (الثاني)</span>
            </button>
            <button
              onClick={() => {
                setScenario('action_reaction');
                handleReset();
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                scenario === 'action_reaction'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Repeat className="w-3.5 h-3.5" />
              <span>الفعل ورد الفعل (الثالث)</span>
            </button>
          </div>

          {/* Interactive Simulation Scene using LabSurface */}
          <LabSurface type="metallic" className="select-none">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
                {result.lawNameAr}
              </span>
              <ValueBadge
                label="التعجيل المحسوب a ="
                value={result.accelerationA.toFixed(2)}
                unit="m/s²"
                color="cyan"
              />
            </div>

            {/* Visual physics playground */}
            <div className="relative w-full h-48 overflow-hidden flex flex-col justify-end">
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <ScientificGrid width={600} height={192} gridSize={25} showAxes={false} />

                {/* Physics force vectors with real components on screen */}
                {scenario === 'f_ma' && force > 0 && (
                  <PhysicsVector
                    startX={300 + posA}
                    startY={96}
                    endX={300 + posA + Math.min(120, force * 2.2)}
                    endY={96}
                    color="#f59e0b"
                    label="F"
                    magnitude={force}
                    unit="N"
                    lineWidth={3}
                  />
                )}

                {scenario === 'action_reaction' && (
                  <>
                    {/* Action Vector on Body B */}
                    <PhysicsVector
                      startX={300 + posB}
                      startY={96}
                      endX={300 + posB + Math.min(90, force * 1.5)}
                      endY={96}
                      color="#ef4444"
                      label="Action (F₂)"
                      magnitude={force}
                      unit="N"
                      lineWidth={3}
                    />
                    {/* Reaction Vector on Body A */}
                    <PhysicsVector
                      startX={300 + posA}
                      startY={96}
                      endX={300 + posA - Math.min(90, force * 1.5)}
                      endY={96}
                      color="#3b82f6"
                      label="Reaction (-F₁)"
                      magnitude={force}
                      unit="N"
                      lineWidth={3}
                    />
                  </>
                )}
              </svg>

              {/* Bodies Render */}
              <div className="relative flex-1 flex items-center justify-center z-10">
                {scenario !== 'action_reaction' ? (
                  /* Single Body Scenario */
                  <div
                    className="relative transition-transform duration-75 flex items-center"
                    style={{ transform: `translateX(${posA}px)` }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl shadow-xl border-2 border-indigo-400 flex flex-col items-center justify-center text-white">
                      <span className="text-[10px] text-indigo-200">الكتلة</span>
                      <span className="text-sm font-black">{massA} kg</span>
                    </div>
                  </div>
                ) : (
                  /* Dual Action-Reaction Scenario (e.g. 2 skaters/carts pushing apart) */
                  <div className="flex items-center justify-center gap-4">
                    {/* Body A */}
                    <div
                      className="relative transition-transform duration-75 flex items-center"
                      style={{ transform: `translateX(${posA}px)` }}
                    >
                      <div className="w-18 h-18 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl border-2 border-blue-400 flex flex-col items-center justify-center text-white">
                        <span className="text-[10px] text-blue-200">الجسم 1</span>
                        <span className="text-xs font-bold">{massA} kg</span>
                      </div>
                    </div>

                    {/* Body B */}
                    <div
                      className="relative transition-transform duration-75 flex items-center"
                      style={{ transform: `translateX(${posB}px)` }}
                    >
                      <div className="w-18 h-18 bg-gradient-to-br from-rose-600 to-rose-800 rounded-2xl shadow-xl border-2 border-rose-400 flex flex-col items-center justify-center text-white">
                        <span className="text-[10px] text-rose-200">الجسم 2</span>
                        <span className="text-xs font-bold">{massB} kg</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Track Footer */}
              <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 flex justify-center text-[10px] font-mono text-slate-400">
                مسار عديم الاحتكاك (سطح أملس مثالي)
              </div>
            </div>
          </LabSurface>

          {/* Dynamic Formula substitution output */}
          <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl space-y-1.5 text-xs text-slate-300">
            <span className="font-bold text-slate-400 block">التعويض بالقيم الرقمية المباشرة في القوانين:</span>
            {scenario === 'inertia' && (
              <div className="font-mono text-indigo-400 font-semibold bg-slate-950 p-2 rounded-lg text-center">
                ΣF = 0 &nbsp;&rarr;&nbsp; a = 0 m/s² (السرعة ثابتة والتعجيل صفر)
              </div>
            )}
            {scenario === 'f_ma' && (
              <div className="font-mono text-amber-400 font-semibold bg-slate-950 p-2 rounded-lg text-center">
                a = F / m = {force} N / {massA} kg = {result.accelerationA.toFixed(2)} m/s²
              </div>
            )}
            {scenario === 'action_reaction' && (
              <div className="font-mono text-rose-400 font-semibold bg-slate-950 p-2 rounded-lg text-center">
                F_action = -F_reaction = {force} N &nbsp;|&nbsp; a₁ = {result.accelerationA.toFixed(2)} m/s², a₂ = {(result.accelerationB || 0).toFixed(2)} m/s²
              </div>
            )}
          </div>

          {/* Live Cause & Effect Statement */}
          <SimulationStatus
            status={isPlaying ? 'nominal' : 'warning'}
            message={
              scenario === 'f_ma'
                ? `عند ثبوت الكتلة (${massA} kg)، كلما زادت القوة تضاعف التعجيل طردياً. وبزيادة الكتلة يقل التعجيل بنسبة عكسية.`
                : scenario === 'action_reaction'
                ? `الفعل ورد الفعل: قوة الفعل ${force} N تولد قوة رد فعل معاكسة ${force} N بالاتجاه. السرير/الكتلة الأكبر تتسارع بشكل أقل.`
                : 'القصور الذاتي: يستمر الجسم بالحركة بسرعة ثابتة بنفس الاتجاه ما لم تؤثر عليه قوة خارجية تغير حالته.'
            }
          />
        </div>
      }
      controls={
        <SimulationControls
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onReset={handleReset}
        >
          {scenario !== 'inertia' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <label htmlFor="n-force">القوة المتبادلة (F):</label>
                <span className="font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded text-sm font-black">
                  {force} N
                </span>
              </div>
              <input
                id="n-force"
                aria-label="القوة المتبادلة"
                type="range"
                min="5"
                max="100"
                step="5"
                value={force}
                onChange={(e) => setForce(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
            </div>
          )}

          {/* Mass A Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="n-mass-a">كتلة الجسم الأول (m₁):</label>
              <span className="font-mono text-cyan-600 dark:text-cyan-400 text-xs font-bold">
                {massA} kg
              </span>
            </div>
            <input
              id="n-mass-a"
              aria-label="كتلة الجسم الأول"
              type="range"
              min="1"
              max="20"
              step="1"
              value={massA}
              onChange={(e) => setMassA(parseInt(e.target.value))}
              className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {scenario === 'action_reaction' && (
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <label htmlFor="n-mass-b">كتلة الجسم الثاني (m₂):</label>
                <span className="font-mono text-rose-600 dark:text-rose-400 text-xs font-bold">
                  {massB} kg
                </span>
              </div>
              <input
                id="n-mass-b"
                aria-label="كتلة الجسم الثاني"
                type="range"
                min="1"
                max="20"
                step="1"
                value={massB}
                onChange={(e) => setMassB(parseInt(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
            </div>
          )}
        </SimulationControls>
      }
      outputs={<SimulationHUD metrics={metrics} />}
      onReset={handleReset}
    />
  );
};
