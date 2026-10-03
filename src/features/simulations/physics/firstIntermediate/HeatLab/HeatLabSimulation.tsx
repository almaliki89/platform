import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { LabSurface } from '../../../visuals/LabSurface';
import { SimulationStatus } from '../../../visuals/SimulationStatus';
import { calculateEquilibriumTemperature, stepThermalConduction } from './calculations';
import { ThermalHistoryPoint } from './types';
import { Flame, Thermometer, TrendingUp, Info, ArrowLeft, ArrowRight, Play, Pause, RotateCcw } from 'lucide-react';

export const HeatLabSimulation: React.FC = () => {
  const [initTempA, setInitTempA] = useState<number>(85); // Hot
  const [initTempB, setInitTempB] = useState<number>(15); // Cold
  const [massA, setMassA] = useState<number>(1);
  const [massB, setMassB] = useState<number>(1);
  const [inContact, setInContact] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [currentTempA, setCurrentTempA] = useState<number>(85);
  const [currentTempB, setCurrentTempB] = useState<number>(15);
  const [timeSec, setTimeSec] = useState<number>(0);
  const [history, setHistory] = useState<ThermalHistoryPoint[]>([
    { time: 0, tempA: 85, tempB: 15 },
  ]);

  const animRef = useRef<number | null>(null);

  const eqTemp = calculateEquilibriumTemperature(initTempA, initTempB, massA, massB);
  const isEquilibriumReached = Math.abs(currentTempA - currentTempB) < 0.2;

  // Thermal Conduction Loop
  useEffect(() => {
    if (!isPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.08, (now - lastTime) / 1000);
      lastTime = now;

      if (inContact) {
        setTimeSec((prevT) => {
          const nextT = prevT + dt;

          setCurrentTempA((tA) => {
            setCurrentTempB((tB) => {
              const step = stepThermalConduction(tA, tB, massA, massB, 0.45, dt);

              setHistory((prevH) => {
                const lastPoint = prevH[prevH.length - 1];
                if (!lastPoint || nextT - lastPoint.time >= 0.2) {
                  return [
                    ...prevH.slice(-80),
                    {
                      time: Number(nextT.toFixed(1)),
                      tempA: Number(step.nextTempA.toFixed(1)),
                      tempB: Number(step.nextTempB.toFixed(1)),
                    },
                  ];
                }
                return prevH;
              });

              return step.nextTempB;
            });
            return tA;
          });

          return nextT;
        });
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, inContact, massA, massB]);

  const handleReset = () => {
    setIsPlaying(false);
    setTimeSec(0);
    setCurrentTempA(initTempA);
    setCurrentTempB(initTempB);
    setHistory([{ time: 0, tempA: initTempA, tempB: initTempB }]);
  };

  const getTemperatureColor = (t: number) => {
    const ratio = Math.max(0, Math.min(1, (t - 10) / 90));
    if (ratio > 0.6) return 'from-rose-600 to-amber-600';
    if (ratio > 0.35) return 'from-amber-600 to-teal-600';
    return 'from-blue-600 to-cyan-600';
  };

  const metrics: HUDMetric[] = [
    {
      label: 'حرارة الجسم A (الساخن)',
      value: currentTempA.toFixed(1),
      unit: '°C',
      color: 'text-rose-500 dark:text-rose-400',
    },
    {
      label: 'حرارة الجسم B (البارد)',
      value: currentTempB.toFixed(1),
      unit: '°C',
      color: 'text-blue-500 dark:text-blue-400',
    },
    {
      label: 'درجة الاتزان النظري',
      value: eqTemp.toFixed(1),
      unit: '°C',
      color: 'text-emerald-500 dark:text-emerald-400',
      formula: 'T_eq',
    },
    {
      label: 'حالة النظام الحراري',
      value: isEquilibriumReached ? 'اتزان حراري تام ✓' : inContact ? 'تبادل حراري مستمر ⇄' : 'معزولان حرارياً',
      color: isEquilibriumReached ? 'text-emerald-500' : 'text-amber-500',
    },
  ];

  // SVG Temperature vs Time Graph
  const renderThermalGraph = () => {
    const width = 500;
    const height = 180;
    const padding = { top: 20, right: 30, bottom: 30, left: 40 };

    const maxT = Math.max(10, timeSec);
    const getX = (t: number) => padding.left + (t / maxT) * (width - padding.left - padding.right);
    const getY = (temp: number) => height - padding.bottom - (temp / 100) * (height - padding.top - padding.bottom);

    const pointsA = history.map((h) => `${getX(h.time)},${getY(h.tempA)}`);
    const pointsB = history.map((h) => `${getX(h.time)},${getY(h.tempB)}`);

    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>منحنى تغير درجة الحرارة مع الزمن (الوصول إلى الاتزان)</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> الجسم A
            </span>
            <span className="flex items-center gap-1 text-cyan-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> الجسم B
            </span>
          </div>
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-36">
          {/* Axes */}
          <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} stroke="#475569" strokeWidth="1.5" />
          <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="#475569" strokeWidth="1.5" />

          {/* Equilibrium Guide Line */}
          <line
            x1={padding.left}
            y1={getY(eqTemp)}
            x2={width - padding.right}
            y2={getY(eqTemp)}
            stroke="#10b981"
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />
          <text x={width - padding.right - 5} y={getY(eqTemp) - 4} fill="#34d399" fontSize="10" textAnchor="end">
            T_eq = {eqTemp.toFixed(1)}°C
          </text>

          {/* Temperature Curves */}
          {pointsA.length > 1 && (
            <polyline fill="none" stroke="#f43f5e" strokeWidth="2.5" points={pointsA.join(' ')} />
          )}
          {pointsB.length > 1 && (
            <polyline fill="none" stroke="#38bdf8" strokeWidth="2.5" points={pointsB.join(' ')} />
          )}
        </svg>
      </div>
    );
  };

  return (
    <SimulationShell
      title="مختبر انتقال الحرارة والاتزان الحراري"
      subjectTitle="الفيزياء • الأول المتوسط"
      topic="الفصل الرابع: الحرارة"
      grade="الصف الأول المتوسط"
      description="مختبر تفاعلي يوضح سريان الطاقة الحرارية من الجسم الأعلى حرارة إلى الجسم الأقل حرارة حتى تتساوى درجتا حرارتهما ويتحقق الاتزان الحراري."
      learningObjectives={[
        'التمييز العلمي الدقيق بين مفهومي "الحرارة" (طاقة منتقلة) و "درجة الحرارة" (مقياس لمعدل الطاقة الحركية)',
        'استيعاب اتجاه السريان التلقائي للحرارة من الجسم الساخن إلى البارد',
        'ملاحظة ثبوت درجة الحرارة عند نقطة الاتزان الحراري (Thermal Equilibrium)',
      ]}
      educationalNote={
        <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <p className="font-bold text-slate-900 dark:text-white">
            تعريف الاتزان الحراري الوزاري:
          </p>
          <p className="leading-relaxed">
            «الحالة التي تتساوى فيها درجة حرارة جسمين عند تلامسهما، حيث تكون كمية الحرارة المفقودة من الجسم الساخن مساوية تماماً لكمية الحرارة المكتسبة في الجسم البارد».
          </p>
        </div>
      }
      visualization={
        <div className="space-y-4">
          {/* Thermal Conduction Blocks Simulation */}
          <LabSurface type="dark">
            <div className="relative w-full h-64 bg-slate-950 border border-slate-850 rounded-2xl p-4 overflow-hidden flex flex-col justify-between select-none shadow-inner">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                  {inContact ? 'الجسمان في حالة تلامس حراري مباشر' : 'الجسمان معزولان'}
                </span>
                <span className="font-mono text-cyan-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                  الزمن: {timeSec.toFixed(1)} ثانية
                </span>
              </div>

              {/* Blocks in Contact */}
              <div className="flex items-center justify-center gap-2 sm:gap-4 my-auto">
                {/* Body A */}
                <div
                  className={`w-32 sm:w-40 h-32 bg-gradient-to-br ${getTemperatureColor(currentTempA)} rounded-2xl shadow-xl flex flex-col items-center justify-center text-white border-2 border-white/20 transition-all duration-300`}
                >
                  <span className="text-xs font-bold text-white/80">الجسم (A)</span>
                  <span className="text-2xl font-black font-mono mt-1">{currentTempA.toFixed(1)}°C</span>
                  <span className="text-[10px] text-white/70 mt-1">{massA} kg</span>
                </div>

                {/* Conduction Energy Flow Animation */}
                {inContact && !isEquilibriumReached && (
                  <div className="flex flex-col items-center gap-1 text-amber-400 animate-pulse">
                    <span className="text-[10px] font-bold">انتقال حرارة Q</span>
                    <div className="flex items-center text-lg font-bold">
                      {currentTempA > currentTempB ? '⇄' : '⇆'}
                    </div>
                  </div>
                )}

                {/* Body B */}
                <div
                  className={`w-32 sm:w-40 h-32 bg-gradient-to-br ${getTemperatureColor(currentTempB)} rounded-2xl shadow-xl flex flex-col items-center justify-center text-white border-2 border-white/20 transition-all duration-300`}
                >
                  <span className="text-xs font-bold text-white/80">الجسم (B)</span>
                  <span className="text-2xl font-black font-mono mt-1">{currentTempB.toFixed(1)}°C</span>
                  <span className="text-[10px] text-white/70 mt-1">{massB} kg</span>
                </div>
              </div>

              {/* Status Bottom Pill */}
              <div className="text-center">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    isEquilibriumReached
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-slate-900 text-slate-300 border border-slate-800'
                  }`}
                >
                  {isEquilibriumReached
                    ? 'تم الوصول إلى الاتزان الحراري التام (T = ' + eqTemp.toFixed(1) + '°C)'
                    : 'جاري انتقال الطاقة الحرارية...'}
                </span>
              </div>
            </div>
          </LabSurface>

          {/* Cause and effect feedback area */}
          <SimulationStatus
            status={isEquilibriumReached ? 'nominal' : 'warning'}
            message={`ما الذي تغيّر؟ عند تلامس الجسمين، تنتقل الطاقة الحرارية تلقائياً من الجسم الساخن (A = ${currentTempA.toFixed(1)}°C) إلى الجسم البارد (B = ${currentTempB.toFixed(1)}°C) حتى تتساوى الدرجتان وتصلا إلى درجة حرارة الاتزان T_eq = ${eqTemp.toFixed(1)}°C.`}
          />
        </div>
      }
      controls={
        <SimulationControls
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onReset={handleReset}
        >
          {/* Initial Temp A */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="temp-a">حرارة الجسم A الابتدائية:</label>
              <span className="font-mono text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded text-sm font-black">
                {initTempA} °C
              </span>
            </div>
            <input
              id="temp-a"
              type="range"
              aria-label="حرارة الجسم A الابتدائية"
              min="20"
              max="100"
              step="5"
              value={initTempA}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setInitTempA(val);
                if (!isPlaying) setCurrentTempA(val);
              }}
              className="w-full accent-rose-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Initial Temp B */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="temp-b">حرارة الجسم B الابتدائية:</label>
              <span className="font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded text-sm font-black">
                {initTempB} °C
              </span>
            </div>
            <input
              id="temp-b"
              type="range"
              aria-label="حرارة الجسم B الابتدائية"
              min="0"
              max="60"
              step="5"
              value={initTempB}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setInitTempB(val);
                if (!isPlaying) setCurrentTempB(val);
              }}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Contact Toggle */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">التلامس الحراري:</span>
            <button
              onClick={() => setInContact(!inContact)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                inContact
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {inContact ? 'متلامسان (سريان نشط)' : 'منفصلان'}
            </button>
          </div>
        </SimulationControls>
      }
      outputs={<SimulationHUD metrics={metrics} />}
      extraPanels={renderThermalGraph()}
      onReset={handleReset}
    />
  );
};
