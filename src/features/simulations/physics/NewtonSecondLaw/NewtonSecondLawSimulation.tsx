import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../core/SimulationShell';
import { SimulationControls } from '../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../core/SimulationHUD';
import { NewtonScene } from './NewtonScene';
import {
  calculateAcceleration,
  calculateNextVelocity,
  calculateNextPosition,
  calculateKineticEnergy,
  calculateMomentum,
} from './calculations';
import { NEWTON_CONSTANTS } from './constants';
import { KinematicsHistoryPoint } from './types';
import { Zap, Activity, Sliders, RotateCcw, TrendingUp } from 'lucide-react';

export const NewtonSecondLawSimulation: React.FC = () => {
  const [mass, setMass] = useState<number>(NEWTON_CONSTANTS.DEFAULT_MASS);
  const [force, setForce] = useState<number>(NEWTON_CONSTANTS.DEFAULT_FORCE);
  const [frictionCoeff, setFrictionCoeff] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [velocity, setVelocity] = useState<number>(0);
  const [history, setHistory] = useState<KinematicsHistoryPoint[]>([]);
  const [graphMode, setGraphMode] = useState<'velocity' | 'position'>('velocity');

  const animRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Instant calculated acceleration
  const acceleration = calculateAcceleration(force, mass, frictionCoeff);
  const kineticEnergy = calculateKineticEnergy(mass, velocity);
  const momentum = calculateMomentum(mass, velocity);

  // Time-based Kinematics Integration Loop
  useEffect(() => {
    if (!isPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    lastTimeRef.current = performance.now();

    const loop = (currentTime: number) => {
      const deltaSec = Math.min((currentTime - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = currentTime;

      setTime((prevT) => {
        const nextT = prevT + deltaSec;

        setVelocity((prevV) => {
          const nextV = calculateNextVelocity(prevV, acceleration, deltaSec);

          setPosition((prevX) => {
            const nextX = calculateNextPosition(prevX, prevV, acceleration, deltaSec);

            // Record history point for graph (throttled)
            setHistory((prevHist) => {
              const lastPoint = prevHist[prevHist.length - 1];
              if (!lastPoint || nextT - lastPoint.time >= 0.1) {
                const newPoint: KinematicsHistoryPoint = {
                  time: Number(nextT.toFixed(2)),
                  velocity: Number(nextV.toFixed(2)),
                  position: Number(nextX.toFixed(2)),
                  acceleration: Number(acceleration.toFixed(2)),
                };
                return [...prevHist.slice(-NEWTON_CONSTANTS.MAX_RECORD_POINTS + 1), newPoint];
              }
              return prevHist;
            });

            return nextX;
          });

          return nextV;
        });

        return nextT;
      });

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, acceleration]);

  const handleReset = () => {
    setIsPlaying(false);
    setTime(0);
    setPosition(0);
    setVelocity(0);
    setHistory([]);
  };

  const metrics: HUDMetric[] = [
    {
      label: 'التعجيل الخطي',
      value: acceleration.toFixed(2),
      unit: 'm/s²',
      color: 'text-amber-500 dark:text-amber-400',
      formula: 'a = F / m',
    },
    {
      label: 'السرعة الآنية',
      value: velocity.toFixed(2),
      unit: 'm/s',
      color: 'text-cyan-500 dark:text-cyan-400',
      formula: 'v = v₀ + a·t',
    },
    {
      label: 'المسافة المقطوعة',
      value: position.toFixed(2),
      unit: 'm',
      color: 'text-emerald-500 dark:text-emerald-400',
      formula: 'x = ½ a·t²',
    },
    {
      label: 'الزمن المستغرق',
      value: time.toFixed(2),
      unit: 's',
      color: 'text-violet-500 dark:text-violet-400',
      formula: 't',
    },
    {
      label: 'الطاقة الحركية',
      value: kineticEnergy.toFixed(1),
      unit: 'J',
      color: 'text-rose-500 dark:text-rose-400',
      formula: 'Ek = ½ m·v²',
    },
    {
      label: 'الزخم الخطي',
      value: momentum.toFixed(1),
      unit: 'kg·m/s',
      color: 'text-blue-500 dark:text-blue-400',
      formula: 'p = m·v',
    },
  ];

  // SVG Kinematics Graph
  const renderGraph = () => {
    const width = 500;
    const height = 180;
    const padding = { top: 20, right: 30, bottom: 30, left: 40 };

    const maxTime = Math.max(10, time);
    const maxVal = Math.max(
      10,
      ...history.map((h) => (graphMode === 'velocity' ? h.velocity : h.position))
    );

    const getX = (t: number) =>
      padding.left + (t / maxTime) * (width - padding.left - padding.right);
    const getY = (v: number) =>
      height - padding.bottom - (v / maxVal) * (height - padding.top - padding.bottom);

    const points = history.map(
      (h) => `${getX(h.time)},${getY(graphMode === 'velocity' ? h.velocity : h.position)}`
    );

    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>
              {graphMode === 'velocity'
                ? 'الرسم البياني: السرعة بدلالة الزمن (v - t)'
                : 'الرسم البياني: الإزاحة بدلالة الزمن (x - t)'}
            </span>
          </div>
          <div className="flex gap-1.5 bg-slate-800 p-1 rounded-lg text-xs">
            <button
              onClick={() => setGraphMode('velocity')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                graphMode === 'velocity' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400'
              }`}
            >
              السرعة v(t)
            </button>
            <button
              onClick={() => setGraphMode('position')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                graphMode === 'position' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'
              }`}
            >
              المسافة x(t)
            </button>
          </div>
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-36 overflow-visible">
          {/* Axes */}
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={height - padding.bottom}
            stroke="#475569"
            strokeWidth="1.5"
          />
          <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            stroke="#475569"
            strokeWidth="1.5"
          />

          {/* Grid lines */}
          <line
            x1={padding.left}
            y1={getY(maxVal / 2)}
            x2={width - padding.right}
            y2={getY(maxVal / 2)}
            stroke="#334155"
            strokeDasharray="4 4"
          />

          {/* Axis Labels */}
          <text x={padding.left - 8} y={padding.top + 8} fill="#94a3b8" fontSize="10" textAnchor="end">
            {maxVal.toFixed(0)} {graphMode === 'velocity' ? 'm/s' : 'm'}
          </text>
          <text
            x={width - padding.right}
            y={height - padding.bottom + 16}
            fill="#94a3b8"
            fontSize="10"
            textAnchor="end"
          >
            {maxTime.toFixed(0)} s
          </text>

          {/* Data Path */}
          {points.length > 1 && (
            <polyline
              fill="none"
              stroke={graphMode === 'velocity' ? '#38bdf8' : '#34d399'}
              strokeWidth="2.5"
              points={points.join(' ')}
            />
          )}
        </svg>
      </div>
    );
  };

  return (
    <SimulationShell
      title="قانون نيوتن الثاني في الحركة (F = m · a)"
      subjectTitle="الفيزياء • الميكانيكا الحركية"
      topic="قوانين الحركة لنيوتن"
      grade="الصف الثالث المتوسط والصف الخامس العلمي"
      description="مختبر حركي تفاعلي يوضح العلاقة الطردية بين القوة المحصلة والتعجيل، والعلاقة العكسية بين الكتلة والتعجيل مع نمذجة فيزيائية ثلاثية الأبعاد."
      learningObjectives={[
        'استيعاب نص قانون نيوتن الثاني رياضياً وفيزيائياً',
        'ملاحظة تأثير زيادة القوة المؤثرة على مقدار التعجيل وسرعة الجسم',
        'دراسة أثر زيادة كتلة الجسم (القصور الذاتي) على مقاومته للتسارع',
        'ربط المعادلات النظرية بالتمثيل البياني المباشر للسرعة والإزاحة',
      ]}
      educationalNote={
        <div className="space-y-2 font-sans">
          <p className="font-bold text-indigo-900 dark:text-indigo-200">
            «إذا أثرت قوة محصلة في جسم ما، أكسبته تعجيلاً يتناسب طردياً معها ويكون باتجاهها وعكسياً مع كتلته».
          </p>
          <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900 font-mono text-center font-bold text-sm text-indigo-600 dark:text-indigo-400">
            F = m × a &nbsp; ⟺ &nbsp; a = F / m
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300">
            سؤال وزاري متكرر: ما الذي يحصل لتعجيل الجسم عند مضاعفة القوة المؤثرة وثبوت الكتلة؟ الجواب: يتضاعف التعجيل إلى المثلين (تناسب طردي).
          </p>
        </div>
      }
      visualization={
        <div className="space-y-4">
          <NewtonScene
            position={position}
            force={force}
            mass={mass}
            acceleration={acceleration}
            velocity={velocity}
          />
        </div>
      }
      controls={
        <SimulationControls
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onReset={handleReset}
        >
          {/* Mass Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="mass-slider">كتلة الجسم (Mass - m):</label>
              <span className="font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded text-sm font-black">
                {mass} kg
              </span>
            </div>
            <input
              id="mass-slider"
              type="range"
              min={NEWTON_CONSTANTS.MIN_MASS}
              max={NEWTON_CONSTANTS.MAX_MASS}
              step={NEWTON_CONSTANTS.STEP_MASS}
              value={mass}
              onChange={(e) => setMass(parseFloat(e.target.value))}
              className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>{NEWTON_CONSTANTS.MIN_MASS} kg</span>
              <span>{NEWTON_CONSTANTS.MAX_MASS} kg</span>
            </div>
          </div>

          {/* Force Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="force-slider">القوة المؤثرة (Force - F):</label>
              <span className="font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded text-sm font-black">
                {force} N
              </span>
            </div>
            <input
              id="force-slider"
              type="range"
              min={NEWTON_CONSTANTS.MIN_FORCE}
              max={NEWTON_CONSTANTS.MAX_FORCE}
              step={NEWTON_CONSTANTS.STEP_FORCE}
              value={force}
              onChange={(e) => setForce(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>{NEWTON_CONSTANTS.MIN_FORCE} N</span>
              <span>{NEWTON_CONSTANTS.MAX_FORCE} N</span>
            </div>
          </div>

          {/* Friction Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="friction-slider">معامل الاحتكاك السطحي (μ):</label>
              <span className="font-mono text-slate-600 dark:text-slate-300 text-xs">
                {frictionCoeff === 0 ? 'سطح أملس (مهمل)' : frictionCoeff.toFixed(2)}
              </span>
            </div>
            <input
              id="friction-slider"
              type="range"
              min="0"
              max="0.5"
              step="0.05"
              value={frictionCoeff}
              onChange={(e) => setFrictionCoeff(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
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
