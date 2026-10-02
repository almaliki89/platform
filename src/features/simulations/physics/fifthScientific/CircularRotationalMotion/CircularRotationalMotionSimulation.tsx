import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  calculateCircularMotion,
  calculateRotationalDynamics,
  ROTATING_BODY_PRESETS,
} from './calculations';
import { RotationalMode, RotatingBodyShape } from './types';
import { Play, Pause, RotateCcw, Compass, Disc, Zap, ArrowUpRight, Sparkles } from 'lucide-react';

export const CircularRotationalMotionSimulation: React.FC = () => {
  const [mode, setMode] = useState<RotationalMode>('centripetal-force');

  // Circular motion state
  const [radiusM, setRadiusM] = useState<number>(1.8);
  const [massKg, setMassKg] = useState<number>(2.0);
  const [omegaRad_s, setOmegaRad_s] = useState<number>(3.5); // rad/s

  // Rotational dynamics state
  const [shape, setShape] = useState<RotatingBodyShape>('disk');
  const [appliedTorque, setAppliedTorque] = useState<number>(12); // N·m

  // Animation angle
  const [angleRad, setAngleRad] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Calculations
  const circResult = calculateCircularMotion(radiusM, massKg, omegaRad_s);
  const dynResult = calculateRotationalDynamics(shape, massKg, radiusM, appliedTorque, omegaRad_s);

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return;
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      setAngleRad((prev) => (prev + omegaRad_s * dt) % (2 * Math.PI));
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, omegaRad_s]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Deep tech space background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    // Grid rings
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let r = 40; r <= 180; r += 35) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Coordinate crosshair
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.moveTo(centerX - 190, centerY);
    ctx.lineTo(centerX + 190, centerY);
    ctx.moveTo(centerX, centerY - 160);
    ctx.lineTo(centerX, centerY + 160);
    ctx.stroke();

    // Scale factor: max radius (3.0m) maps to ~160px
    const pixelScale = 55; // 1 meter = 55 pixels
    const visualRadius = radiusM * pixelScale;

    // Turntable Disk Representation
    const diskGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, visualRadius + 15);
    diskGrad.addColorStop(0, 'rgba(30, 41, 59, 0.9)');
    diskGrad.addColorStop(0.85, 'rgba(15, 23, 42, 0.8)');
    diskGrad.addColorStop(1, 'rgba(6, 182, 212, 0.25)');

    ctx.fillStyle = diskGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, visualRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Radial spoke that rotates with angle
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    const massX = centerX + visualRadius * Math.cos(angleRad);
    const massY = centerY + visualRadius * Math.sin(angleRad);
    ctx.lineTo(massX, massY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Radius Label
    const midX = (centerX + massX) / 2;
    const midY = (centerY + massY) / 2;
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`r = ${radiusM.toFixed(1)}m`, midX - 10, midY - 10);

    // Tangential Velocity Vector (Tangent = angleRad + PI/2)
    const tangAngle = angleRad + Math.PI / 2;
    const vArrowLen = Math.min(85, Math.max(25, circResult.tangentialVelocityM_s * 7));
    const vEndX = massX + vArrowLen * Math.cos(tangAngle);
    const vEndY = massY + vArrowLen * Math.sin(tangAngle);

    ctx.strokeStyle = '#10b981'; // emerald
    ctx.fillStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(massX, massY);
    ctx.lineTo(vEndX, vEndY);
    ctx.stroke();

    // Tangential arrow head
    ctx.beginPath();
    const headLen = 8;
    ctx.moveTo(vEndX, vEndY);
    ctx.lineTo(
      vEndX - headLen * Math.cos(tangAngle - Math.PI / 6),
      vEndY - headLen * Math.sin(tangAngle - Math.PI / 6)
    );
    ctx.lineTo(
      vEndX - headLen * Math.cos(tangAngle + Math.PI / 6),
      vEndY - headLen * Math.sin(tangAngle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();

    // Tangential velocity label
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillText(`v = ${circResult.tangentialVelocityM_s.toFixed(1)} m/s`, vEndX + 10, vEndY);

    // Centripetal Force/Acceleration Vector (Points inward towards Center)
    const centAngle = angleRad + Math.PI; // towards center
    const fcArrowLen = Math.min(80, Math.max(25, circResult.centripetalForceN * 1.5));
    const fcEndX = massX + fcArrowLen * Math.cos(centAngle);
    const fcEndY = massY + fcArrowLen * Math.sin(centAngle);

    ctx.strokeStyle = '#f43f5e'; // rose red
    ctx.fillStyle = '#f43f5e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(massX, massY);
    ctx.lineTo(fcEndX, fcEndY);
    ctx.stroke();

    // Centripetal arrow head
    ctx.beginPath();
    ctx.moveTo(fcEndX, fcEndY);
    ctx.lineTo(
      fcEndX - headLen * Math.cos(centAngle - Math.PI / 6),
      fcEndY - headLen * Math.sin(centAngle - Math.PI / 6)
    );
    ctx.lineTo(
      fcEndX - headLen * Math.cos(centAngle + Math.PI / 6),
      fcEndY - headLen * Math.sin(centAngle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();

    // Centripetal force label
    ctx.fillText(`Fc = ${circResult.centripetalForceN.toFixed(1)} N`, fcEndX, fcEndY - 8);

    // Rotating Test Mass Sphere
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(massX, massY, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 9px Inter, sans-serif';
    ctx.fillText(`${massKg}kg`, massX, massY + 3);

    // Center Pivot Pin
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Central Rotation Arrow (curved arc showing ω direction)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 28, angleRad, angleRad + 1.2);
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillText(`ω = ${omegaRad_s.toFixed(1)} rad/s`, centerX, centerY + 45);

    // Vector Legend in Top-Left Corner
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.beginPath();
    ctx.roundRect(16, 16, 210, 80, 8);
    ctx.fill();
    ctx.strokeStyle = '#334155';
    ctx.stroke();

    // Legend item 1: Velocity
    ctx.fillStyle = '#10b981';
    ctx.fillRect(28, 28, 12, 4);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('متجه السرعة المماسية (v = ω·r)', 210, 34);

    // Legend item 2: Centripetal
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(28, 52, 12, 4);
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('متجه القوة المركزية (Fc = m·ac)', 210, 58);

    // Legend item 3: Radius
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(28, 76, 12, 4);
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('نصف القطر والمسار الدائري', 210, 82);
  }, [radiusM, massKg, omegaRad_s, angleRad, circResult]);

  const handleReset = () => {
    setRadiusM(1.8);
    setMassKg(2.0);
    setOmegaRad_s(3.5);
    setShape('disk');
    setAppliedTorque(12);
    setAngleRad(0);
  };

  return (
    <SimulationShell
      title="مختبر الحركة الدائرية والدورانية"
      subtitle="الفصل السابع — السرعة المماسية (v = ωr)، التعجيل المركزي (ac)، القوة المركزية (Fc)، وعزم القصور الذاتي والزخم الزاوي"
      badge="الصف الخامس العلمي"
      onReset={handleReset}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Visual Canvas & HUD */}
        <div className="lg:col-span-3 space-y-4">
          <div className="relative bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl p-2">
            <canvas
              ref={canvasRef}
              width={820}
              height={380}
              className="w-full h-auto rounded-xl block"
            />

            {/* Play/Pause controls overlay */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 rounded-xl bg-slate-900/90 text-cyan-400 hover:bg-slate-800 border border-slate-700 backdrop-blur-md cursor-pointer transition-all"
                title={isPlaying ? 'إيقاف الدوران' : 'بدء الدوران'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setAngleRad(0)}
                className="p-2.5 rounded-xl bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-700 backdrop-blur-md cursor-pointer transition-all"
                title="إعادة التصفير"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* HUD Metrics */}
          {mode === 'centripetal-force' && (
            <SimulationHUD>
              <HUDMetric
                label="السرعة المماسية (v = ω·r)"
                value={circResult.tangentialVelocityM_s.toFixed(2)}
                unit="m/s"
                highlight={true}
              />
              <HUDMetric
                label="التعجيل المركزي (ac = v²/r)"
                value={circResult.centripetalAccelerationM_s2.toFixed(1)}
                unit="m/s²"
              />
              <HUDMetric
                label="القوة المركزية (Fc = m·ac)"
                value={circResult.centripetalForceN.toFixed(1)}
                unit="N"
                highlight={true}
              />
              <HUDMetric
                label="زمن الدورة الواحدة (T)"
                value={circResult.periodSec.toFixed(2)}
                unit="s"
              />
            </SimulationHUD>
          )}

          {mode === 'rotational-dynamics' && (
            <SimulationHUD>
              <HUDMetric
                label="عزم القصور الذاتي (I)"
                value={dynResult.momentOfInertiaKg_m2.toFixed(3)}
                unit="kg·m²"
                highlight={true}
              />
              <HUDMetric
                label="التعجيل الزاوي (α = τ / I)"
                value={dynResult.angularAccelerationRad_s2.toFixed(2)}
                unit="rad/s²"
              />
              <HUDMetric
                label="الزخم الزاوي (L = I·ω)"
                value={dynResult.angularMomentumKg_m2_s.toFixed(2)}
                unit="kg·m²/s"
                highlight={true}
              />
              <HUDMetric
                label="طاقة الحركة الدورانية"
                value={dynResult.rotationalKineticEnergyJ.toFixed(1)}
                unit="J"
              />
            </SimulationHUD>
          )}
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls title="إعدادات الحركة الدائرية">
            {/* Mode Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">النمط التجريبي</label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  onClick={() => setMode('centripetal-force')}
                  className={`py-2 px-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'centripetal-force'
                      ? 'bg-cyan-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  القوة المركزية (Fc)
                </button>
                <button
                  onClick={() => setMode('rotational-dynamics')}
                  className={`py-2 px-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'rotational-dynamics'
                      ? 'bg-cyan-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  ديناميكا الدوران (I, τ)
                </button>
              </div>
            </div>

            {/* Shape selection in rotational dynamics */}
            {mode === 'rotational-dynamics' && (
              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <label className="font-semibold text-slate-300">شكل الجسم الدوار (Moment of Inertia)</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {ROTATING_BODY_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setShape(p.id)}
                      className={`p-2 rounded-xl font-semibold text-[11px] cursor-pointer text-right transition-all ${
                        shape === p.id
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <div>{p.nameAr.split(' ')[0]}</div>
                      <div className="text-[10px] font-mono opacity-80">{p.formulaAr}</div>
                    </button>
                  ))}
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">عزم التدوير المطبق (τ)</span>
                    <span className="font-mono text-cyan-400 font-bold">{appliedTorque} N·m</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    value={appliedTorque}
                    onChange={(e) => setAppliedTorque(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Shared Kinematics Controls */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">نصف القطر (r)</span>
                  <span className="font-mono text-cyan-400 font-bold">{radiusM} m</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.8"
                  step="0.1"
                  value={radiusM}
                  onChange={(e) => setRadiusM(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">كتلة الجسم (m)</span>
                  <span className="font-mono text-amber-400 font-bold">{massKg} kg</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={massKg}
                  onChange={(e) => setMassKg(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">السرعة الزاوية (ω)</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {omegaRad_s.toFixed(1)} rad/s ({circResult.angularVelocityRpm.toFixed(0)} RPM)
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10.0"
                  step="0.5"
                  value={omegaRad_s}
                  onChange={(e) => setOmegaRad_s(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </SimulationControls>

          {/* Educational Concept Box */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <h5 className="font-bold text-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>مفاهيم الحركة الدائرية والدورانية</span>
            </h5>
            <p className="text-slate-400">
              <strong>القوة المركزية (Fc):</strong> قوة عمودية على مسار الحركة وتتجه دائماً نحو المركز، وهي المسؤولة عن تغيير اتجاه السرعة المماسية دون تغيير مقدارها: Fc = m v² / r.
            </p>
            <p className="text-slate-400">
              <strong>عزم القصور الذاتي (I):</strong> مقياس لمقاومة الجسم لتغير سرعته الزاوية، ويعتمد على كتلة الجسم وكيفية توزيعها حول محور الدوران: τ = I α.
            </p>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
