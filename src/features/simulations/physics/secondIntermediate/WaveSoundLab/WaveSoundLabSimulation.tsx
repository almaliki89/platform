import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateWaveProperties } from './calculations';
import { WaveType } from './types';
import { Activity, Radio, Volume2, Info, Play, Pause, RotateCcw } from 'lucide-react';

export const WaveSoundLabSimulation: React.FC = () => {
  const [frequency, setFrequency] = useState<number>(2); // Hz
  const [wavelength, setWavelength] = useState<number>(2.5); // m
  const [amplitude, setAmplitude] = useState<number>(2.5); // cm
  const [waveType, setWaveType] = useState<WaveType>('transverse');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const phaseRef = useRef<number>(0);

  const waveData = calculateWaveProperties(frequency, wavelength, amplitude);

  // Animated Wave Canvas Render Loop
  useEffect(() => {
    if (!isPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min(0.06, (now - lastTime) / 1000);
      lastTime = now;

      // Increment wave phase based on frequency
      phaseRef.current += 2 * Math.PI * frequency * dt;

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Equilibrium Central Axis
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      const visualAmp = amplitude * 14;
      const k = (2 * Math.PI) / (wavelength * 40);

      if (waveType === 'transverse') {
        // Transverse Wave (Sine Curve)
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3.5;
        ctx.beginPath();

        for (let x = 0; x < width; x += 2) {
          const y = height / 2 - Math.sin(k * x - phaseRef.current) * visualAmp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Highlight oscillating particles (beads along wave)
        for (let x = 30; x < width; x += 50) {
          const y = height / 2 - Math.sin(k * x - phaseRef.current) * visualAmp;
          ctx.fillStyle = '#f43f5e';
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Longitudinal Wave (Compressions & Rarefactions / Spring coils)
        const cols = 35;
        const spacing = width / cols;

        for (let i = 0; i < cols; i++) {
          const baseX = i * spacing;
          const offset = Math.sin(k * baseX - phaseRef.current) * visualAmp * 0.8;
          const x = baseX + offset;

          // Draw vertical compression slice lines
          ctx.strokeStyle = '#a855f7';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(x, height * 0.25);
          ctx.lineTo(x, height * 0.75);
          ctx.stroke();

          // Particle beads
          ctx.fillStyle = '#c084fc';
          ctx.beginPath();
          ctx.arc(x, height / 2, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, frequency, wavelength, amplitude, waveType]);

  const handleReset = () => {
    setFrequency(2);
    setWavelength(2.5);
    setAmplitude(2.5);
    setWaveType('transverse');
    phaseRef.current = 0;
  };

  const metrics: HUDMetric[] = [
    {
      label: 'سرعة انتشار الموجة (v)',
      value: waveData.waveSpeed.toFixed(2),
      unit: 'm/s',
      color: 'text-cyan-500 dark:text-cyan-400',
      formula: 'v = f · λ',
    },
    {
      label: 'التردد (Frequency - f)',
      value: waveData.frequency.toFixed(1),
      unit: 'Hz',
      color: 'text-amber-500 dark:text-amber-400',
    },
    {
      label: 'الطول الموجي (λ)',
      value: waveData.wavelength.toFixed(2),
      unit: 'm',
      color: 'text-violet-500 dark:text-violet-400',
    },
    {
      label: 'الزمن الدوري (Period - T)',
      value: waveData.period.toFixed(2),
      unit: 's',
      color: 'text-emerald-500 dark:text-emerald-400',
      formula: 'T = 1 / f',
    },
  ];

  return (
    <SimulationShell
      title="مختبر الحركة الموجية والصوت (v = f · λ)"
      subjectTitle="الفيزياء • الثاني المتوسط"
      topic="الفصل الخامس: الحركة الموجية والصوت"
      grade="الصف الثاني المتوسط"
      description="مختبر تفاعلي لاستكشاف خصائص الأمواج المستعرضة والطولية، والتحقق من قانون سرعة انتشار الموجات، وربط التردد والسعة بحدة الصوت وشدته."
      learningObjectives={[
        'تطبيق المعادلة العامة للأمواج: v = f · λ (سرعة الموجة = التردد × الطول الموجي)',
        'التمييز العملي بين الموجات المستعرضة (قمم وقيعان) والموجات الطولية (تضاغطات وتخلخلات)',
        'استيعاب علاقة التردد بنغمة الصوت (Pitch) وعلاقة السعة بشدة الصوت (Loudness)',
      ]}
      educationalNote={
        <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <p className="font-bold text-slate-900 dark:text-white">
            القانون العام لانتشار الأمواج:
          </p>
          <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900 font-mono text-center text-indigo-600 dark:text-indigo-400 font-bold">
            v = f × λ &nbsp; (m/s = Hz × m)
          </div>
          <p className="text-[11px] leading-relaxed">
            <strong>الموجة المستعرضة:</strong> تهتز فيها جزيئات الوسط عمودياً على خط انتشار الموجة (قمم وقيعان). <strong>الموجة الطولية:</strong> تهتز بموازاة خط الانتشار (تضاغطات وتخلخلات مثل الصوت).
          </p>
        </div>
      }
      visualization={
        <div className="space-y-3">
          {/* Wave Type Selector */}
          <div className="flex gap-2 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl">
            <button
              onClick={() => setWaveType('transverse')}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                waveType === 'transverse'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              موجة مستعرضة (Transverse)
            </button>
            <button
              onClick={() => setWaveType('longitudinal')}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                waveType === 'longitudinal'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              موجة طولية / صوتية (Longitudinal)
            </button>
          </div>

          {/* Animated Wave Canvas */}
          <div className="relative w-full h-64 bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-hidden flex flex-col justify-between select-none">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                {waveType === 'transverse' ? 'قمم وقيعان مستعرضة' : 'تضاغطات وتخلخلات طولية'}
              </span>
              <span className="font-mono text-cyan-300 font-bold bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                v = {waveData.waveSpeed.toFixed(2)} m/s
              </span>
            </div>

            <canvas
              ref={canvasRef}
              width={500}
              height={180}
              className="w-full h-40 rounded-xl my-auto"
            />

            <div className="flex justify-between text-[11px] text-slate-400 font-mono px-2">
              <span>{waveData.soundPitchAr}</span>
              <span>{waveData.soundLoudnessAr}</span>
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
          {/* Frequency */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="w-freq">التردد (Frequency - f):</label>
              <span className="font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded text-sm font-black">
                {frequency} Hz
              </span>
            </div>
            <input
              id="w-freq"
              type="range"
              min="0.5"
              max="8"
              step="0.5"
              value={frequency}
              onChange={(e) => setFrequency(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Wavelength */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="w-lambda">الطول الموجي (Wavelength - λ):</label>
              <span className="font-mono text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 px-2 py-0.5 rounded text-sm font-black">
                {wavelength} متر
              </span>
            </div>
            <input
              id="w-lambda"
              type="range"
              min="1"
              max="5"
              step="0.2"
              value={wavelength}
              onChange={(e) => setWavelength(parseFloat(e.target.value))}
              className="w-full accent-violet-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Amplitude */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="w-amp">سعة الاهتزاز (Amplitude - A):</label>
              <span className="font-mono text-cyan-600 dark:text-cyan-400 text-xs font-bold">
                {amplitude} cm
              </span>
            </div>
            <input
              id="w-amp"
              type="range"
              min="0.5"
              max="4.5"
              step="0.5"
              value={amplitude}
              onChange={(e) => setAmplitude(parseFloat(e.target.value))}
              className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>
        </SimulationControls>
      }
      outputs={<SimulationHUD metrics={metrics} />}
      onReset={handleReset}
    />
  );
};
