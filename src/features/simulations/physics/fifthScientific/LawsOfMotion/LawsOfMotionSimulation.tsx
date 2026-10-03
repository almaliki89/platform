import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateInclinedPlaneForces } from './calculations';
import { Sparkles, Layers, RotateCcw, AlertCircle, ArrowUpRight } from 'lucide-react';

export const LawsOfMotionSimulation: React.FC = () => {
  const [massKg, setMassKg] = useState<number>(10);
  const [appliedForceN, setAppliedForceN] = useState<number>(30); // N (up plane)
  const [inclineAngleDeg, setInclineAngleDeg] = useState<number>(30); // 30 degrees
  const [muStatic, setMuStatic] = useState<number>(0.4);
  const [muKinetic, setMuKinetic] = useState<number>(0.25);

  const result = calculateInclinedPlaneForces(
    massKg,
    appliedForceN,
    inclineAngleDeg,
    muStatic,
    muKinetic
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

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
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

    const groundY = height - 50;
    const rampStartX = 60;
    const rampLength = width - 140;
    const rad = (inclineAngleDeg * Math.PI) / 180;

    const rampEndX = rampStartX + rampLength * Math.cos(rad);
    const rampEndY = groundY - rampLength * Math.sin(rad);

    // Draw inclined ramp wedge
    ctx.fillStyle = 'rgba(30, 41, 59, 0.6)';
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(rampStartX, groundY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.lineTo(rampEndX, groundY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Incline Angle arc
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(rampStartX, groundY, 45, 0, -rad, true);
    ctx.stroke();

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 11px monospace';
    ctx.fillText(`θ = ${inclineAngleDeg}°`, rampStartX + 52, groundY - 12);

    // Place mass block halfway up the ramp
    const blockDistance = rampLength * 0.55;
    const blockCenterRampX = rampStartX + blockDistance * Math.cos(rad);
    const blockCenterRampY = groundY - blockDistance * Math.sin(rad);

    const blockW = 60;
    const blockH = 40;

    // Save context for rotated drawing aligned with ramp
    ctx.save();
    ctx.translate(blockCenterRampX, blockCenterRampY);
    ctx.rotate(-rad);

    // Block sitting on top of ramp line
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(-blockW / 2, -blockH, blockW, blockH);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.strokeRect(-blockW / 2, -blockH, blockW, blockH);

    // Mass label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${massKg} kg`, 0, -blockH / 2 + 4);

    const cmX = 0;
    const cmY = -blockH / 2;

    // Helper to draw FBD vectors inside the rotated frame
    const drawFBDArrow = (fx: number, fy: number, color: string, label: string) => {
      if (Math.abs(fx) < 1 && Math.abs(fy) < 1) return;
      const headLen = 8;
      const angle = Math.atan2(fy - cmY, fx - cmX);

      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.moveTo(cmX, cmY);
      ctx.lineTo(fx, fy);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(
        fx - headLen * Math.cos(angle - Math.PI / 6),
        fy - headLen * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        fx - headLen * Math.cos(angle + Math.PI / 6),
        fy - headLen * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fill();

      ctx.font = 'bold 10px sans-serif';
      ctx.fillText(label, fx + 12 * Math.cos(angle), fy + 12 * Math.sin(angle));
    };

    const fScale = 0.5; // 1 N = 0.5 px

    // Normal Force N (perpendicular to ramp: pointing in -y direction in rotated frame)
    drawFBDArrow(cmX, cmY - result.normalForceN * fScale, '#38bdf8', `N = ${result.normalForceN.toFixed(0)}N`);

    // Applied Force F_app (parallel to ramp: +x is up the ramp)
    if (Math.abs(appliedForceN) > 0) {
      drawFBDArrow(
        cmX + appliedForceN * fScale,
        cmY,
        '#f59e0b',
        `F_app = ${appliedForceN}N`
      );
    }

    // Friction Force (opposes driving force)
    if (Math.abs(result.actualFrictionN) > 0) {
      drawFBDArrow(
        cmX + result.actualFrictionN * fScale,
        cmY,
        '#c084fc',
        `f = ${Math.abs(result.actualFrictionN).toFixed(0)}N`
      );
    }

    // Component mg*sin(theta) (down the ramp: -x direction)
    drawFBDArrow(
      cmX - result.gravityParallelN * fScale,
      cmY,
      '#ef4444',
      `mg·sinθ = ${result.gravityParallelN.toFixed(0)}N`
    );

    ctx.restore();

    // Draw Acceleration Vector if accelerating
    if (Math.abs(result.accelerationM_s2) > 0.05) {
      const aSign = result.accelerationM_s2 > 0 ? 1 : -1;
      const aLen = 50 * aSign;
      const ax = blockCenterRampX + aLen * Math.cos(rad);
      const ay = blockCenterRampY - aLen * Math.sin(rad);

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(blockCenterRampX, blockCenterRampY - 45);
      ctx.lineTo(ax, ay - 45);
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        `a = ${Math.abs(result.accelerationM_s2).toFixed(2)} m/s²`,
        (blockCenterRampX + ax) / 2,
        blockCenterRampY - 55
      );
    }
  }, [massKg, appliedForceN, inclineAngleDeg, muStatic, muKinetic, result]);

  const handleReset = () => {
    setMassKg(10);
    setAppliedForceN(30);
    setInclineAngleDeg(30);
    setMuStatic(0.4);
    setMuKinetic(0.25);
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'القوة المحصلة (F_net)',
      value: `${result.netForceN.toFixed(1)} N`,
      color: result.isSliding ? 'text-amber-400' : 'text-emerald-400',
    },
    {
      label: 'التعجيل المكتسب (a)',
      value: `${Math.abs(result.accelerationM_s2).toFixed(2)} m/s²`,
      color: 'text-cyan-400',
    },
    {
      label: 'قوة الاحتكاك الفعلية (f)',
      value: `${Math.abs(result.actualFrictionN).toFixed(1)} N`,
      color: 'text-purple-400',
    },
    {
      label: 'حالة الحركة',
      value: result.isSliding ? 'حركة انزلاقية' : 'اتزان سكوني',
      color: result.isSliding ? 'text-amber-400' : 'text-emerald-400',
    },
  ];

  return (
    <SimulationShell
      title="مختبر قوانين الحركة والاحتكاك على السطح المائل"
      subtitle="الفصل الثالث — مخطط الجسم الحر (FBD)، قوى الاحتكاك السكوني والحركي، ومعادلات الحركة على السطح المائل"
      badge="الصف الخامس العلمي"
      topic="قوانين الحركة"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Visual Canvas & Math Details */}
        <div className="lg:col-span-2 space-y-4">
          <SimulationHUD metrics={hudMetrics} />

          <div className="relative bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl">
            <canvas
              ref={canvasRef}
              width={640}
              height={340}
              className="w-full h-auto rounded-xl bg-slate-950 border border-slate-800/80 block"
            />
          </div>

          {/* Formulas and Insight */}
          <div className="bg-slate-900/70 rounded-xl border border-slate-800 p-4 text-xs text-slate-300 space-y-3">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>معادلات السطح المائل والاحتكاك:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-sky-300">
                N = m·g·cos θ = {result.normalForceN.toFixed(1)} N
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-red-300">
                F_g∥ = m·g·sin θ = {result.gravityParallelN.toFixed(1)} N
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-purple-300">
                fs_max = μ_s·N = {result.maxStaticFrictionN.toFixed(1)} N
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg text-xs space-y-1">
              <span className="font-semibold text-amber-300">التفسير الفيزيائي للحالة:</span>
              <p className="text-slate-300 leading-relaxed">{result.motionStateAr}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls onReset={handleReset}>
            {/* Mass */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>كتلة الجسم (m):</span>
                <span className="text-sky-400 font-mono">{massKg} kg</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={massKg}
                onChange={(e) => setMassKg(parseInt(e.target.value))}
                className="w-full accent-sky-500"
              />
            </div>

            {/* Incline Angle */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>زاوية ميل السطح (θ):</span>
                <span className="text-amber-400 font-mono">{inclineAngleDeg}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="1"
                value={inclineAngleDeg}
                onChange={(e) => setInclineAngleDeg(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Applied Force */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>القوة المؤثرة بموازاة السطح (F_app):</span>
                <span className="text-emerald-400 font-mono">{appliedForceN} N</span>
              </div>
              <input
                type="range"
                min="-100"
                max="250"
                step="5"
                value={appliedForceN}
                onChange={(e) => setAppliedForceN(parseInt(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <span className="text-[10px] text-slate-500 block">
                (الموجب يعني السحب للأعلى، والسالب يعني الدفع للأسفل)
              </span>
            </div>

            {/* Mu Static */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>معامل الاحتكاك السكوني (μ_s):</span>
                <span className="text-purple-400 font-mono">{muStatic.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={muStatic}
                onChange={(e) => {
                  const s = parseFloat(e.target.value);
                  setMuStatic(s);
                  if (muKinetic > s) setMuKinetic(s);
                }}
                className="w-full accent-purple-500"
              />
            </div>

            {/* Mu Kinetic */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>معامل الاحتكاك الحركي (μ_k):</span>
                <span className="text-purple-400 font-mono">{muKinetic.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max={muStatic}
                step="0.05"
                value={muKinetic}
                onChange={(e) => setMuKinetic(parseFloat(e.target.value))}
                className="w-full accent-purple-500"
              />
              <span className="text-[10px] text-slate-500 block">
                (دائماً μ_k ≤ μ_s فيزيائياً)
              </span>
            </div>
          </SimulationControls>
        </div>
      </div>
    </SimulationShell>
  );
};

export default LawsOfMotionSimulation;
