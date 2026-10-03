import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { LabSurface } from '../../../visuals/LabSurface';
import { SimulationStatus } from '../../../visuals/SimulationStatus';
import { MatterState, Particle } from './types';
import { getMatterProperties, generateInitialParticles } from './calculations';
import { Thermometer, Sparkles, Box, Droplets, Wind, RotateCcw } from 'lucide-react';

export const PropertiesOfMatterSimulation: React.FC = () => {
  const [state, setState] = useState<MatterState>('solid');
  const [temperatureC, setTemperatureC] = useState<number>(20);
  const [motionSpeed, setMotionSpeed] = useState<number>(1);
  const [particles, setParticles] = useState<Particle[]>([]);

  const animFrameRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const matterInfo = getMatterProperties(state, temperatureC);

  // Initialize particles when state changes
  useEffect(() => {
    const width = 450;
    const height = 300;
    const count = state === 'solid' ? 48 : state === 'liquid' ? 36 : 24;
    setParticles(generateInitialParticles(count, width, height, state));
  }, [state]);

  // Particle Physics Simulation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localParticles = [...particles];
    const width = canvas.width;
    const height = canvas.height;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Container Beaker
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(30, 20);
      ctx.lineTo(30, height - 20);
      ctx.lineTo(width - 30, height - 20);
      ctx.lineTo(width - 30, 20);
      ctx.stroke();

      // Liquid container baseline if liquid
      if (state === 'liquid') {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
        ctx.fillRect(32, height * 0.45, width - 64, height * 0.55 - 20);
      }

      const speedFactor = matterInfo.particleSpeedMultiplier * motionSpeed;

      // Update & Draw Particles
      localParticles.forEach((p, idx) => {
        if (state === 'solid') {
          // Vibrating around fixed crystal lattice node
          const angle = Date.now() * 0.008 * speedFactor + idx;
          const r = Math.min(6, (matterInfo.vibrationRadius * (temperatureC + 50)) / 100);
          p.x = p.baseX + Math.cos(angle) * r;
          p.y = p.baseY + Math.sin(angle) * r;
        } else if (state === 'liquid') {
          // Flowing and sliding in lower half
          p.x += p.vx * speedFactor * 0.8;
          p.y += p.vy * speedFactor * 0.8;

          // Boundary bounce within bottom half
          if (p.x < 45 || p.x > width - 45) p.vx *= -1;
          if (p.y < height * 0.45 || p.y > height - 35) p.vy *= -1;

          // Slight gravity pull
          p.y += 0.2;
        } else {
          // Gas: rapid chaotic motion filling full volume
          p.x += p.vx * speedFactor * 1.6;
          p.y += p.vy * speedFactor * 1.6;

          if (p.x < 45 || p.x > width - 45) p.vx *= -1;
          if (p.y < 35 || p.y > height - 35) p.vy *= -1;
        }

        // Draw particle sphere
        const particleRadius = state === 'solid' ? 9 : state === 'liquid' ? 8 : 7;
        const grad = ctx.createRadialGradient(
          p.x - 2,
          p.y - 2,
          1,
          p.x,
          p.y,
          particleRadius
        );

        if (state === 'solid') {
          grad.addColorStop(0, '#60a5fa');
          grad.addColorStop(1, '#1d4ed8');
        } else if (state === 'liquid') {
          grad.addColorStop(0, '#38bdf8');
          grad.addColorStop(1, '#0369a1');
        } else {
          grad.addColorStop(0, '#f472b6');
          grad.addColorStop(1, '#be185d');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, particleRadius, 0, Math.PI * 2);
        ctx.fill();

        // Particle shadow / glow
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [particles, state, temperatureC, motionSpeed, matterInfo]);

  const handleReset = () => {
    setState('solid');
    setTemperatureC(20);
    setMotionSpeed(1);
  };

  const metrics: HUDMetric[] = [
    {
      label: 'الحالة الفيزيائية',
      value: matterInfo.stateAr,
      color: state === 'solid' ? 'text-blue-500' : state === 'liquid' ? 'text-cyan-500' : 'text-pink-500',
    },
    {
      label: 'الشكل الهندسي',
      value: matterInfo.shapeAr,
      color: 'text-slate-800 dark:text-slate-200',
    },
    {
      label: 'الحجم',
      value: matterInfo.volumeAr,
      color: 'text-slate-800 dark:text-slate-200',
    },
    {
      label: 'المسافات البينية',
      value: matterInfo.intermolecularDistanceAr,
      color: 'text-amber-500 dark:text-amber-400',
    },
  ];

  return (
    <SimulationShell
      title="حالات المادة والنموذج الجزيئي التفاعلي"
      subjectTitle="الفيزياء • الأول المتوسط"
      topic="الفصل الأول: خواص المادة"
      grade="الصف الأول المتوسط"
      description="مختبر بصري تفاعلي يوضح الفروق الجوهرية بين الحالات الثلاث للمادة (الصلبة، السائلة، الغازية) من حيث المسافات البينية، قوى التماسك الجزيئية، وطبيعة الحركة."
      learningObjectives={[
        'التمييز بين خصائص الحالة الصلبة والسائلة والغازية من حيث الشكل والحجم',
        'ملاحظة طبيعة المسافات البينية وقوى التماسك الجزيئية في كل حالة',
        'استيعاب أثر زيادة درجة الحرارة على طاقة حركة الجزيئات وسرعة اهتزازها',
      ]}
      educationalNote={
        <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <p className="font-bold text-slate-900 dark:text-white">
            مقارنة منهجية وزارية معتمدة:
          </p>
          <ul className="list-disc list-inside space-y-1 text-[11px]">
            <li><strong className="text-blue-600">المادة الصلبة:</strong> شكل محدد وحجم محدد، مسافات بينية صغيرة جداً، قوى تماسك كبيرة جداً.</li>
            <li><strong className="text-cyan-600">المادة السائلة:</strong> شكل متغير وحجم محدد، مسافات بينية أكبر، قوى تماسك أضعف وتتحرك بانزلاق.</li>
            <li><strong className="text-pink-600">المادة الغازية:</strong> شكل متغير وحجم متغير، مسافات بينية كبيرة جداً، وتتحرك بحرية وعشوائية.</li>
          </ul>
        </div>
      }
      visualization={
        <div className="space-y-3">
          {/* State Selector Tabs */}
          <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl">
            <button
              onClick={() => setState('solid')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                state === 'solid'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Box className="w-4 h-4" />
              <span>الحالة الصلبة</span>
            </button>
            <button
              onClick={() => setState('liquid')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                state === 'liquid'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Droplets className="w-4 h-4" />
              <span>الحالة السائلة</span>
            </button>
            <button
              onClick={() => setState('gas')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                state === 'gas'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Wind className="w-4 h-4" />
              <span>الحالة الغازية</span>
            </button>
          </div>

          {/* Particle Simulation Canvas */}
          <LabSurface type="dark">
            <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-2 sm:p-4 overflow-hidden flex items-center justify-center shadow-inner">
              <canvas
                ref={canvasRef}
                width={450}
                height={300}
                className="w-full max-w-lg h-auto rounded-xl select-none"
              />
              <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700 text-[11px] text-slate-300 pointer-events-none">
                وعاء محاكاة الجزيئات المجهرية
              </div>
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700 text-xs font-mono text-amber-400 pointer-events-none">
                {temperatureC}°C
              </div>
            </div>
          </LabSurface>

          {/* Cause and effect feedback area */}
          <SimulationStatus
            status="nominal"
            message={`ما الذي تغيّر؟ عند الانتقال إلى الحالة ${
              state === 'solid' ? 'الصلبة' : state === 'liquid' ? 'السائلة' : 'الغازية'
            }، تكون ${
              state === 'solid'
                ? 'الجزيئات متراصة جداً وتتحرك اهتزازياً حول مواضع استقرارها، مما يحافظ على شكل وحجم ثابتين.'
                : state === 'liquid'
                ? 'المسافات البينية أكبر وقوى التماسك أضعف، مما يسمح للجزيئات بالانزلاق والترتيب المرن لتأخذ شكل الوعاء.'
                : 'المسافات البينية كبيرة جداً وتتحرك الجزيئات بحرية تامة وتملأ كامل حجم الوعاء.'
            }`}
          />
        </div>
      }
      controls={
        <SimulationControls onReset={handleReset}>
          {/* Temperature Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="temp-slider">درجة الحرارة التقديرية (Temperature):</label>
              <span className="font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded text-sm font-black">
                {temperatureC} °C
              </span>
            </div>
            <input
              id="temp-slider"
              type="range"
              aria-label="درجة الحرارة التقديرية"
              min="-20"
              max="150"
              step="5"
              value={temperatureC}
              onChange={(e) => setTemperatureC(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>-20°C (تبريد)</span>
              <span>20°C (حرارة الغرفة)</span>
              <span>150°C (تسخين عالي)</span>
            </div>
          </div>

          {/* Speed Multiplier Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="speed-slider">معدل سرعة الحركة الجزيئية:</label>
              <span className="font-mono text-cyan-600 dark:text-cyan-400 text-xs">
                {motionSpeed}x
              </span>
            </div>
            <input
              id="speed-slider"
              type="range"
              aria-label="معدل سرعة الحركة الجزيئية"
              min="0.2"
              max="3"
              step="0.2"
              value={motionSpeed}
              onChange={(e) => setMotionSpeed(parseFloat(e.target.value))}
              className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>
        </SimulationControls>
      }
      outputs={<SimulationHUD metrics={metrics} />}
      extraPanels={
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl text-xs space-y-2">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>طبيعة حركة الجزيئات وقوى التماسك:</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {matterInfo.kineticEnergyLevelAr} • قوى التماسك بين الجزيئات: <strong>{matterInfo.cohesiveForceAr}</strong>.
          </p>
        </div>
      }
      onReset={handleReset}
    />
  );
};
