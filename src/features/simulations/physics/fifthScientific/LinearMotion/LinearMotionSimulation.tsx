import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  calculateLinearMotion,
  calculateFreeFall,
  calculateProjectileMotion,
  calculateProjectileSummary,
  generateMotionGraphData,
  GRAVITY_G,
} from './calculations';
import { LinearMotionMode } from './types';
import { Play, Pause, RotateCcw, Activity, Sparkles, TrendingUp } from 'lucide-react';

export const LinearMotionSimulation: React.FC = () => {
  const [mode, setMode] = useState<LinearMotionMode>('projectile');

  // Parameters
  const [v0, setV0] = useState<number>(25); // m/s
  const [accel, setAccel] = useState<number>(2.5); // m/s^2 for uniform acceleration
  const [angleDeg, setAngleDeg] = useState<number>(45); // degrees for projectile
  const [initialHeightY0, setInitialHeightY0] = useState<number>(10); // meters

  // Animation time
  const [simTime, setSimTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const projectileSummary = calculateProjectileSummary(v0, angleDeg, initialHeightY0);

  // Maximum time duration depends on mode
  const maxDuration =
    mode === 'projectile'
      ? Math.max(1, projectileSummary.flightTimeSec)
      : mode === 'free-fall'
      ? Math.max(1, (v0 + Math.sqrt(v0 * v0 + 2 * GRAVITY_G * initialHeightY0)) / GRAVITY_G)
      : 8.0;

  // Animation ticker
  useEffect(() => {
    if (!isPlaying) return;

    let animId: number;
    let lastStamp = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastStamp) / 1000;
      lastStamp = now;

      setSimTime((prev) => {
        const next = prev + dt;
        if (next >= maxDuration) {
          setIsPlaying(false);
          return maxDuration;
        }
        return next;
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, maxDuration]);

  // Current state at simTime
  const currentState =
    mode === 'uniform-acceleration'
      ? calculateLinearMotion(v0, accel, simTime)
      : mode === 'free-fall'
      ? calculateFreeFall(v0, simTime, initialHeightY0)
      : calculateProjectileMotion(v0, angleDeg, simTime, initialHeightY0);

  const graphPoints = generateMotionGraphData(
    mode,
    v0,
    accel,
    angleDeg,
    initialHeightY0,
    maxDuration
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    // Subtle grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    if (mode === 'projectile') {
      // 2D Projectile Trajectory
      const groundY = height - 40;
      const startX = 60;

      // Ground line
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(20, groundY);
      ctx.lineTo(width - 20, groundY);
      ctx.stroke();

      // Scale coordinates
      const maxR = Math.max(40, projectileSummary.rangeM);
      const maxH = Math.max(25, projectileSummary.maxHeightM);
      const scaleX = (width - 120) / maxR;
      const scaleY = (groundY - 50) / maxH;

      // Draw full theoretical trajectory line
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      for (let t = 0; t <= projectileSummary.flightTimeSec; t += 0.05) {
        const s = calculateProjectileMotion(v0, angleDeg, t, initialHeightY0);
        const px = startX + s.posX * scaleX;
        const py = groundY - s.posY * scaleY;
        if (t === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw launch platform / cliff if y0 > 0
      if (initialHeightY0 > 0) {
        const platY = groundY - initialHeightY0 * scaleY;
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(startX - 30, platY, 30, groundY - platY);
        ctx.strokeStyle = '#475569';
        ctx.strokeRect(startX - 30, platY, 30, groundY - platY);
      }

      // Draw Current Projectile
      const curPx = startX + currentState.posX * scaleX;
      const curPy = groundY - currentState.posY * scaleY;

      // Projectile ball with glow
      ctx.beginPath();
      ctx.arc(curPx, curPy, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Velocity vectors (vx, vy, v)
      const vScale = 1.2;
      // Resultant velocity arrow
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(curPx, curPy);
      ctx.lineTo(curPx + currentState.velX * vScale, curPy - currentState.velY * vScale);
      ctx.stroke();

      // Range & Max Height annotations
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        `المدى الأفقي R = ${projectileSummary.rangeM.toFixed(1)} m`,
        startX + (projectileSummary.rangeM * scaleX) / 2,
        groundY + 25
      );

      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'left';
      ctx.fillText(
        `أقصى ارتفاع H_max = ${projectileSummary.maxHeightM.toFixed(1)} m`,
        startX + 10,
        groundY - projectileSummary.maxHeightM * scaleY - 10
      );
    } else if (mode === 'free-fall') {
      // Vertical Ruler & Dropped Body
      const groundY = height - 40;
      const centerX = width / 2;

      // Ground
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 120, groundY);
      ctx.lineTo(width / 2 + 120, groundY);
      ctx.stroke();

      // Vertical tower scale
      const maxH = Math.max(30, initialHeightY0 + 20);
      const scaleY = (groundY - 50) / maxH;

      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX - 40, groundY);
      ctx.lineTo(centerX - 40, 40);
      ctx.stroke();

      // Ticks on ruler
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.textAlign = 'right';
      for (let h = 0; h <= maxH; h += 10) {
        const ty = groundY - h * scaleY;
        ctx.beginPath();
        ctx.moveTo(centerX - 45, ty);
        ctx.lineTo(centerX - 35, ty);
        ctx.stroke();
        ctx.fillText(`${h}m`, centerX - 50, ty + 3);
      }

      // Ball
      const ballY = groundY - currentState.posY * scaleY;
      ctx.beginPath();
      ctx.arc(centerX, ballY, 9, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Velocity arrow
      const vLen = currentState.velY * 1.5;
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(centerX, ballY);
      ctx.lineTo(centerX, ballY - vLen);
      ctx.stroke();

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`v = ${currentState.velY.toFixed(1)} m/s`, centerX + 18, ballY + 4);
    } else {
      // Mode Uniform Acceleration: Track & Cart
      const trackY = height / 2 + 30;

      // Track line
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(40, trackY);
      ctx.lineTo(width - 40, trackY);
      ctx.stroke();

      // Ticks
      const trackLenPx = width - 120;
      const startX = 60;
      const maxTrackX = Math.max(50, v0 * maxDuration + 0.5 * accel * maxDuration * maxDuration);
      const scaleX = trackLenPx / maxTrackX;

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      for (let x = 0; x <= maxTrackX; x += 10) {
        const px = startX + x * scaleX;
        if (px <= width - 40) {
          ctx.beginPath();
          ctx.moveTo(px, trackY - 5);
          ctx.lineTo(px, trackY + 5);
          ctx.stroke();
          ctx.fillText(`${x}m`, px, trackY + 20);
        }
      }

      // Moving Cart
      const cartX = startX + currentState.posX * scaleX;
      const cartW = 46;
      const cartH = 26;

      ctx.fillStyle = '#0284c7';
      ctx.fillRect(cartX - cartW / 2, trackY - cartH - 6, cartW, cartH);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(cartX - cartW / 2, trackY - cartH - 6, cartW, cartH);

      // Wheels
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(cartX - 14, trackY - 4, 6, 0, Math.PI * 2);
      ctx.arc(cartX + 14, trackY - 4, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Velocity arrow on cart
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cartX, trackY - cartH - 12);
      ctx.lineTo(cartX + currentState.velX * 2, trackY - cartH - 12);
      ctx.stroke();
    }
  }, [mode, simTime, v0, accel, angleDeg, initialHeightY0, projectileSummary, currentState]);

  const handleReset = () => {
    setIsPlaying(false);
    setSimTime(0);
    setV0(25);
    setAccel(2.5);
    setAngleDeg(45);
    setInitialHeightY0(10);
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'الزمن المنقضي (t)',
      value: `${simTime.toFixed(2)} s`,
      color: 'text-amber-400',
    },
    {
      label: 'الموضع الأفقي (x)',
      value: `${currentState.posX.toFixed(1)} m`,
      color: 'text-sky-400',
    },
    {
      label: 'الموضع الشاقولي (y)',
      value: `${currentState.posY.toFixed(1)} m`,
      color: 'text-cyan-400',
    },
    {
      label: 'السرعة الآنية (v)',
      value: `${currentState.speed.toFixed(1)} m/s`,
      color: 'text-emerald-400',
    },
  ];

  return (
    <SimulationShell
      title="مختبر الحركة الخطية والمقذوفات"
      subtitle="الفصل الثاني — معادلات الحركة بتعجيل منتظم، السقوط الحر للأجسام، وحركة المقذوفات في بعدين"
      badge="الصف الخامس العلمي"
      topic="الحركة الخطية"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Visual Canvas & Math Details */}
        <div className="lg:col-span-2 space-y-4">
          <SimulationHUD metrics={hudMetrics} />

          <div className="relative bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl">
            {/* Mode selection buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setMode('projectile');
                    setSimTime(0);
                    setIsPlaying(true);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    mode === 'projectile'
                      ? 'bg-sky-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  حركة المقذوفات (Projectile Motion)
                </button>
                <button
                  onClick={() => {
                    setMode('free-fall');
                    setSimTime(0);
                    setIsPlaying(true);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    mode === 'free-fall'
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  السقوط الحر (Free Fall)
                </button>
                <button
                  onClick={() => {
                    setMode('uniform-acceleration');
                    setSimTime(0);
                    setIsPlaying(true);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    mode === 'uniform-acceleration'
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  تعجيل خطي منتظم (Uniform a)
                </button>
              </div>

              {/* Play / Pause button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  isPlaying ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
              </button>
            </div>

            <canvas
              ref={canvasRef}
              width={640}
              height={320}
              className="w-full h-auto rounded-xl bg-slate-950 border border-slate-800/80 block"
            />

            {/* Time scrub bar */}
            <div className="mt-3 flex items-center gap-3">
              <span className="text-[11px] font-mono text-slate-400">0s</span>
              <input
                type="range"
                min="0"
                max={maxDuration}
                step="0.05"
                value={simTime}
                onChange={(e) => {
                  setIsPlaying(false);
                  setSimTime(parseFloat(e.target.value));
                }}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <span className="text-[11px] font-mono text-slate-400">{maxDuration.toFixed(1)}s</span>
            </div>
          </div>

          {/* Formulas and Insight */}
          <div className="bg-slate-900/70 rounded-xl border border-slate-800 p-4 text-xs text-slate-300 space-y-3">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>معادلات الحركة الخطية الأربع:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80 font-mono text-center text-sky-300">
                v = v₀ + a·t
              </div>
              <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80 font-mono text-center text-amber-300">
                Δx = v₀·t + ½·a·t²
              </div>
              <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80 font-mono text-center text-emerald-300">
                v² = v₀² + 2·a·Δx
              </div>
              <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80 font-mono text-center text-purple-300">
                Δx = ((v₀ + v)/2)·t
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls onReset={handleReset}>
            {/* Speed v0 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>السرعة الابتدائية (v₀):</span>
                <span className="text-emerald-400 font-mono">{v0} m/s</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={v0}
                onChange={(e) => setV0(parseInt(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            {mode === 'projectile' && (
              <>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>زاوية الإطلاق (θ):</span>
                    <span className="text-amber-400 font-mono">{angleDeg}°</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="85"
                    step="1"
                    value={angleDeg}
                    onChange={(e) => setAngleDeg(parseInt(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>الارتفاع الابتدائي للمنصة (y₀):</span>
                    <span className="text-sky-400 font-mono">{initialHeightY0} m</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    step="2"
                    value={initialHeightY0}
                    onChange={(e) => setInitialHeightY0(parseInt(e.target.value))}
                    className="w-full accent-sky-500"
                  />
                </div>
              </>
            )}

            {mode === 'uniform-acceleration' && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>التعجيل المنتظم (a):</span>
                  <span className="text-cyan-400 font-mono">{accel} m/s²</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="10"
                  step="0.5"
                  value={accel}
                  onChange={(e) => setAccel(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>
            )}

            {mode === 'free-fall' && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>ارتفاع البرج أو المنصة (y₀):</span>
                  <span className="text-sky-400 font-mono">{initialHeightY0} m</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="5"
                  value={initialHeightY0}
                  onChange={(e) => setInitialHeightY0(parseInt(e.target.value))}
                  className="w-full accent-sky-500"
                />
              </div>
            )}
          </SimulationControls>
        </div>
      </div>
    </SimulationShell>
  );
};

export default LinearMotionSimulation;
