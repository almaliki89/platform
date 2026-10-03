import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { stepMotion } from './calculations';
import { MotionHistoryPoint } from './types';
import { TrendingUp, Info, ArrowLeft, ArrowRight, Play, Pause, RotateCcw } from 'lucide-react';

export const MotionExplorerSimulation: React.FC = () => {
  const [initVelocity, setInitVelocity] = useState<number>(5); // m/s
  const [acceleration, setAcceleration] = useState<number>(0); // m/s^2
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [position, setPosition] = useState<number>(0);
  const [velocity, setVelocity] = useState<number>(5);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [timeSec, setTimeSec] = useState<number>(0);
  const [history, setHistory] = useState<MotionHistoryPoint[]>([
    { time: 0, position: 0, distance: 0, velocity: 5 },
  ]);

  const animRef = useRef<number | null>(null);

  // Motion integration loop
  useEffect(() => {
    if (!isPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.08, (now - lastTime) / 1000);
      lastTime = now;

      setTimeSec((prevT) => {
        const nextT = prevT + dt;

        setPosition((prevX) => {
          setVelocity((prevV) => {
            setTotalDistance((prevD) => {
              const res = stepMotion(prevX, prevV, prevD, 0, acceleration, dt);

              setHistory((prevH) => {
                const lastPoint = prevH[prevH.length - 1];
                if (!lastPoint || nextT - lastPoint.time >= 0.2) {
                  return [
                    ...prevH.slice(-80),
                    {
                      time: Number(nextT.toFixed(1)),
                      position: Number(res.nextPos.toFixed(1)),
                      distance: Number(res.nextDistance.toFixed(1)),
                      velocity: Number(res.nextVel.toFixed(1)),
                    },
                  ];
                }
                return prevH;
              });

              return res.nextDistance;
            });
            return prevV + acceleration * dt;
          });
          return prevX + prevVelocityRef.current * dt;
        });

        return nextT;
      });

      animRef.current = requestAnimationFrame(loop);
    };

    const prevVelocityRef = { current: velocity };
    prevVelocityRef.current = velocity;

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, acceleration, velocity]);

  const handleReset = () => {
    setIsPlaying(false);
    setPosition(0);
    setVelocity(initVelocity);
    setTotalDistance(0);
    setTimeSec(0);
    setHistory([{ time: 0, position: 0, distance: 0, velocity: initVelocity }]);
  };

  const displacement = position;

  const metrics: HUDMetric[] = [
    {
      label: 'الإزاحة (Displacement - x)',
      value: (displacement >= 0 ? '+' : '') + displacement.toFixed(1),
      unit: 'm',
      color: 'text-cyan-500 dark:text-cyan-400',
      formula: 'كمية اتجاهية',
    },
    {
      label: 'المسافة الكلية (Distance - d)',
      value: totalDistance.toFixed(1),
      unit: 'm',
      color: 'text-emerald-500 dark:text-emerald-400',
      formula: 'كمية مقدارية',
    },
    {
      label: 'السرعة الآنية (v)',
      value: velocity.toFixed(1),
      unit: 'm/s',
      color: 'text-amber-500 dark:text-amber-400',
      formula: 'v = Δx / Δt',
    },
    {
      label: 'التعجيل (a)',
      value: acceleration.toFixed(1),
      unit: 'm/s²',
      color: 'text-violet-500 dark:text-violet-400',
      formula: 'a = Δv / t',
    },
  ];

  // SVG Position vs Time Graph
  const renderGraph = () => {
    const width = 500;
    const height = 180;
    const padding = { top: 20, right: 30, bottom: 30, left: 40 };

    const maxT = Math.max(10, timeSec);
    const maxPos = Math.max(20, Math.abs(position), ...history.map((h) => Math.abs(h.position)));

    const getX = (t: number) => padding.left + (t / maxT) * (width - padding.left - padding.right);
    const getY = (pos: number) =>
      height / 2 - (pos / maxPos) * ((height - padding.top - padding.bottom) / 2);

    const points = history.map((h) => `${getX(h.time)},${getY(h.position)}`);

    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>الرسم البياني: الموقع بدلالة الزمن (x - t)</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            الميل يمثل السرعة المتجهة (Slope = v)
          </span>
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-36">
          {/* Grid & Zero Center Line */}
          <line x1={padding.left} y1={height / 2} x2={width - padding.right} y2={height / 2} stroke="#475569" strokeWidth="1.5" />
          <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} stroke="#475569" strokeWidth="1.5" />

          {/* Labels */}
          <text x={padding.left - 6} y={padding.top + 10} fill="#94a3b8" fontSize="10" textAnchor="end">
            +{maxPos.toFixed(0)}m
          </text>
          <text x={padding.left - 6} y={height - padding.bottom} fill="#94a3b8" fontSize="10" textAnchor="end">
            -{maxPos.toFixed(0)}m
          </text>

          {/* Position Path */}
          {points.length > 1 && (
            <polyline fill="none" stroke="#38bdf8" strokeWidth="2.5" points={points.join(' ')} />
          )}
        </svg>
      </div>
    );
  };

  // Car visual pixel offset clamped to container width
  const visualCarX = Math.max(-160, Math.min(160, position * 6));

  return (
    <SimulationShell
      title="مستكشف الحركة: المسافة والإزاحة والسرعة"
      subjectTitle="الفيزياء • الثاني المتوسط"
      topic="الفصل الأول: الحركة"
      grade="الصف الثاني المتوسط"
      description="مختبر تفاعلي للتمييز العملي بين المسافة والإزاحة، وفهم دلالة السرعة المتجهة والانطلاق والتعجيل الخطي مع التمثيل البياني المباشر."
      learningObjectives={[
        'التمييز بين المسافة (كمية قياسية مقدارية) والإزاحة (كمية متجهة من نقطة البداية إلى النهاية)',
        'استيعاب مفهوم التعجيل كتغير في مقدار أو اتجاه السرعة خلال وحدة الزمن',
        'قراءة وتحليل المخطط البياني للإزاحة والزمن واستنتاج السرعة من الميل',
      ]}
      educationalNote={
        <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <p className="font-bold text-slate-900 dark:text-white">
            المفاهيم المنهجية الأساسية:
          </p>
          <ul className="list-disc list-inside space-y-1 text-[11px]">
            <li><strong>المسافة (d):</strong> طول المسار الكلي الذي يسلكه الجسم (موجبة دائماً).</li>
            <li><strong>الإزاحة (x):</strong> أقصر خط مستقيم موجه بين نقطتي البداية والنهاية.</li>
            <li><strong>التعجيل (a):</strong> المعدل الزمني لتغير السرعة (a = Δv / t).</li>
          </ul>
        </div>
      }
      visualization={
        <div className="space-y-3">
          {/* Motion Track Canvas */}
          <div className="relative w-full h-64 bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-hidden flex flex-col justify-between select-none">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                المسار الخطي المستقيم
              </span>
              <span className="font-mono text-cyan-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                t = {timeSec.toFixed(1)} s
              </span>
            </div>

            {/* Vehicle on track */}
            <div className="relative flex-1 flex items-center justify-center">
              <div
                className="relative transition-transform duration-75"
                style={{ transform: `translateX(${visualCarX}px)` }}
              >
                {/* Velocity Vector Arrow */}
                {velocity !== 0 && (
                  <div
                    className={`absolute -top-7 ${
                      velocity > 0 ? 'left-1/2 bg-amber-500' : 'right-1/2 bg-rose-500'
                    } h-2 rounded flex items-center`}
                    style={{ width: `${Math.min(80, Math.abs(velocity) * 6)}px` }}
                  >
                    <span className="absolute -top-4 text-[10px] font-bold text-amber-400 whitespace-nowrap">
                      v = {velocity.toFixed(1)} m/s
                    </span>
                  </div>
                )}

                {/* Car Body */}
                <div className="w-24 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl shadow-lg border border-cyan-300 flex items-center justify-center text-white font-bold text-xs">
                  🚗 جسم متحرك
                </div>
              </div>
            </div>

            {/* Number Line Track */}
            <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 flex justify-between text-[10px] font-mono text-slate-400">
              <span>-30m</span>
              <span>-15m</span>
              <span className="text-amber-400 font-bold">0m (نقطة الأصل)</span>
              <span>+15m</span>
              <span>+30m</span>
            </div>
          </div>
        </div>
      }
      controls={
        <SimulationControls
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onReset={handleReset}
        >
          {/* Initial Velocity Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="m-vel">السرعة الابتدائية (v₀):</label>
              <span className="font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded text-sm font-black">
                {initVelocity} m/s
              </span>
            </div>
            <input
              id="m-vel"
              type="range"
              min="-15"
              max="15"
              step="1"
              value={initVelocity}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setInitVelocity(val);
                if (!isPlaying) setVelocity(val);
              }}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Acceleration Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="m-acc">التعجيل الخطي (a):</label>
              <span className="font-mono text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 px-2 py-0.5 rounded text-sm font-black">
                {acceleration} m/s²
              </span>
            </div>
            <input
              id="m-acc"
              type="range"
              min="-4"
              max="4"
              step="0.5"
              value={acceleration}
              onChange={(e) => setAcceleration(parseFloat(e.target.value))}
              className="w-full accent-violet-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>
        </SimulationControls>
      }
      outputs={<SimulationHUD metrics={metrics} />}
      extraPanels={renderGraph()}
      onReset={handleReset}
    />
  );
};
