import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  OPTICAL_MEDIA,
  calculateRefraction,
} from './calculations';
import { RefractionMode } from './types';
import { Compass, Sparkles, Layers, RotateCcw, ShieldAlert, ArrowRightLeft } from 'lucide-react';
import { LabSurface } from '../../../visuals/LabSurface';
import { ValueBadge } from '../../../visuals/ValueBadge';
import { SimulationStatus } from '../../../visuals/SimulationStatus';

export const ReflectionRefractionSimulation: React.FC = () => {
  const [mode, setMode] = useState<RefractionMode>('snell-law');
  const [medium1Id, setMedium1Id] = useState<string>('water');
  const [medium2Id, setMedium2Id] = useState<string>('air');
  const [thetaIncidentDeg, setThetaIncidentDeg] = useState<number>(35);

  const med1 = OPTICAL_MEDIA.find((m) => m.id === medium1Id) || OPTICAL_MEDIA[1];
  const med2 = OPTICAL_MEDIA.find((m) => m.id === medium2Id) || OPTICAL_MEDIA[0];

  const result = calculateRefraction(med1.refractiveIndex, med2.refractiveIndex, thetaIncidentDeg);

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

    if (mode === 'optical-fiber') {
      // Draw optical fiber core & cladding
      const fiberTop = height / 2 - 45;
      const fiberBottom = height / 2 + 45;
      const fiberH = 90;

      // Cladding outside
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Core (glass n=1.5)
      ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.fillRect(0, fiberTop, width, fiberH);

      // Core boundaries
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, fiberTop);
      ctx.lineTo(width, fiberTop);
      ctx.moveTo(0, fiberBottom);
      ctx.lineTo(width, fiberBottom);
      ctx.stroke();

      // Labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText('الغلاف (Cladding: n₂ = 1.0 أو سائل منخفض)', 20, fiberTop - 12);
      ctx.fillText('قلب الليف البصري (Core: n₁ = 1.50)', 20, height / 2 + 4);
      ctx.fillText('الغلاف (Cladding)', 20, fiberBottom + 20);

      // Laser path zigzagging via TIR
      const zigzagY1 = height / 2;
      const stepX = 90;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(10, zigzagY1);

      let curX = 10;
      let goingUp = true;
      while (curX < width) {
        const nextX = curX + stepX;
        const targetY = goingUp ? fiberTop + 5 : fiberBottom - 5;
        ctx.lineTo(nextX, targetY);
        curX = nextX;
        goingUp = !goingUp;
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // reset shadow

      // TIR bounce indicators
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('انعكاس كلي داخلي مستمر (θ > θ_c)', width / 2, height - 20);
      return;
    }

    // Standard Snell / Critical Angle visualization
    const interfaceY = height / 2;

    // Fill Medium 1 (top half)
    ctx.fillStyle = med1.colorTintRgba;
    ctx.fillRect(0, 0, width, interfaceY);

    // Fill Medium 2 (bottom half)
    ctx.fillStyle = med2.colorTintRgba;
    ctx.fillRect(0, interfaceY, width, height - interfaceY);

    // Boundary interface line
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, interfaceY);
    ctx.lineTo(width, interfaceY);
    ctx.stroke();

    // Medium labels
    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`الوسط 1: ${med1.nameAr} (n₁ = ${med1.refractiveIndex})`, width - 20, 25);
    ctx.fillText(`الوسط 2: ${med2.nameAr} (n₂ = ${med2.refractiveIndex})`, width - 20, height - 18);

    // Normal line (vertical, dashed)
    const normalX = width / 2;
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(normalX, 20);
    ctx.lineTo(normalX, height - 20);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('العمود المقام', normalX, 15);

    // Ray lengths
    const rayLength = 170;
    const theta1Rad = (result.thetaIncidentDeg * Math.PI) / 180;

    // Incident Ray (comes from top-left towards center)
    const startX = normalX - Math.sin(theta1Rad) * rayLength;
    const startY = interfaceY - Math.cos(theta1Rad) * rayLength;

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(normalX, interfaceY);
    ctx.stroke();

    // Incident ray arrow head
    const midX = (startX + normalX) / 2;
    const midY = (startY + interfaceY) / 2;
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(midX, midY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Reflected Ray (goes into top-right)
    const reflectEndX = normalX + Math.sin(theta1Rad) * rayLength;
    const reflectEndY = interfaceY - Math.cos(theta1Rad) * rayLength;

    const reflectOpacity = result.isTotalInternalReflection ? 1.0 : 0.4;
    ctx.strokeStyle = `rgba(251, 191, 36, ${reflectOpacity})`;
    ctx.lineWidth = result.isTotalInternalReflection ? 3.5 : 2;
    ctx.beginPath();
    ctx.moveTo(normalX, interfaceY);
    ctx.lineTo(reflectEndX, reflectEndY);
    ctx.stroke();

    // Reflected label
    ctx.fillStyle = '#fbbf24';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`الشعاع المنعكس (θ_r = ${result.thetaReflectedDeg.toFixed(1)}°)`, reflectEndX - 20, reflectEndY - 8);

    // Refracted Ray (into bottom-right)
    if (!result.isTotalInternalReflection && result.thetaRefractedDeg !== null) {
      const theta2Rad = (result.thetaRefractedDeg * Math.PI) / 180;
      const refractEndX = normalX + Math.sin(theta2Rad) * rayLength;
      const refractEndY = interfaceY + Math.cos(theta2Rad) * rayLength;

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(normalX, interfaceY);
      ctx.lineTo(refractEndX, refractEndY);
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`الشعاع المنكسر (θ₂ = ${result.thetaRefractedDeg.toFixed(1)}°)`, refractEndX - 10, refractEndY + 15);

      // Arc for theta 2
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(normalX, interfaceY, 35, Math.PI / 2, Math.PI / 2 - theta2Rad, true);
      ctx.stroke();
    } else {
      // Total Internal Reflection Alert
      ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
      ctx.roundRect(normalX - 160, interfaceY + 25, 320, 42, 8);
      ctx.fill();
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('انعكاس كلي داخلي — لا يوجد شعاع منكسر في الوسط الثاني', normalX, interfaceY + 50);
    }

    // Arc for theta 1
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(normalX, interfaceY, 40, -Math.PI / 2, -Math.PI / 2 - theta1Rad, true);
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = '11px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`θ₁ = ${result.thetaIncidentDeg}°`, normalX - 45, interfaceY - 20);
  }, [mode, med1, med2, result]);

  const handleReset = () => {
    setMode('snell-law');
    setMedium1Id('water');
    setMedium2Id('air');
    setThetaIncidentDeg(35);
  };

  const handleSetCritical = () => {
    if (result.criticalAngleDeg !== null) {
      setThetaIncidentDeg(Math.round(result.criticalAngleDeg * 10) / 10);
    }
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'زاوية السقوط (θ₁)',
      value: `${result.thetaIncidentDeg.toFixed(1)}°`,
      color: 'cyan',
    },
    {
      label: 'زاوية الانكسار (θ₂)',
      value: result.isTotalInternalReflection
        ? 'انعكاس كلي'
        : `${result.thetaRefractedDeg?.toFixed(1)}°`,
      color: result.isTotalInternalReflection ? 'red' : 'emerald',
    },
    {
      label: 'الزاوية الحرجة (θ_c)',
      value: result.criticalAngleDeg !== null ? `${result.criticalAngleDeg.toFixed(1)}°` : 'غير موجودة',
      color: 'amber',
    },
    {
      label: 'سرعة الضوء بالوسط 1',
      value: `${result.speedMedium1Km_s.toFixed(0)} km/s`,
      color: 'purple',
    },
  ];

  return (
    <SimulationShell
      title="مختبر انعكاس وانكسار الضوء وقانون سنيل"
      subtitle="الفصل السادس — قانون سنيل (n₁·sin θ₁ = n₂·sin θ₂)، الزاوية الحرجة والانعكاس الكلي الداخلي"
      badge="الصف الرابع العلمي"
      topic="انعكاس وانكسار الضوء"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Visual Canvas & Math */}
        <div className="lg:col-span-2 space-y-4">
          <SimulationHUD metrics={hudMetrics} />

          <LabSurface type="metallic" className="select-none">
            {/* Mode selection buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMode('snell-law')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    mode === 'snell-law'
                      ? 'bg-sky-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  قانون سنيل والانكسار
                </button>
                <button
                  onClick={() => setMode('optical-fiber')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    mode === 'optical-fiber'
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  تطبيقات الليف البصري (Fiber Optics)
                </button>
              </div>

              {/* Quick swap button */}
              <button
                onClick={() => {
                  const t = medium1Id;
                  setMedium1Id(medium2Id);
                  setMedium2Id(t);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs transition-colors cursor-pointer"
                title="تبديل الوسطين"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                تبديل الوسطين
              </button>
            </div>

            <div className="relative">
              <canvas
                ref={canvasRef}
                width={640}
                height={320}
                className="w-full h-auto rounded-xl bg-slate-950 border border-slate-800/80 block z-10 relative"
              />
            </div>
          </LabSurface>

          {/* Formulas and Insight */}
          <div className="bg-slate-900/70 rounded-xl border border-slate-800 p-4 text-xs text-slate-300 space-y-3">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>معادلات الانكسار والانعكاس الكلي:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-sky-300 flex flex-col justify-center">
                <span className="text-[10px] opacity-60">قانون سنيل</span>
                <span>n₁ · sin(θ₁) = n₂ · sin(θ₂)</span>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-amber-300 flex flex-col justify-center">
                <span className="text-[10px] opacity-60">الزاوية الحرجة</span>
                <span>sin(θ_c) = n₂ / n₁</span>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-emerald-300 flex flex-col justify-center">
                <span className="text-[10px] opacity-60">سرعة الضوء بالوسط</span>
                <span>v = c / n</span>
              </div>
            </div>

            {/* Substitution formula in real-time */}
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 text-center font-mono text-indigo-400">
              {result.isTotalInternalReflection ? (
                <span>θ₁ ({thetaIncidentDeg}°) &gt; θ_c ({result.criticalAngleDeg?.toFixed(1)}°) &rarr; انعكاس كلي داخلي</span>
              ) : (
                <span>n₁·sin(θ₁) = {med1.refractiveIndex} · sin({thetaIncidentDeg}°) = {med2.refractiveIndex} · sin({result.thetaRefractedDeg?.toFixed(1)}°) = n₂·sin(θ₂)</span>
              )}
            </div>

            {result.criticalAngleDeg !== null && (
              <div className="flex items-center justify-between p-2.5 bg-sky-500/10 border border-sky-500/30 rounded-lg text-xs text-sky-200">
                <span>
                  الزاوية الحرجة بين {med1.nameAr} و {med2.nameAr} هي:{' '}
                  <strong className="text-amber-400 font-mono">{result.criticalAngleDeg.toFixed(2)}°</strong>
                </span>
                <button
                  onClick={handleSetCritical}
                  className="px-2.5 py-1 bg-sky-500 text-white rounded text-xs hover:bg-sky-400 transition-colors cursor-pointer"
                >
                  اضبط الزاوية الحرجة
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls onReset={handleReset}>
            {/* Medium 1 Select */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300">الوسط الأول الساقط منه (Medium 1):</label>
              <select
                value={medium1Id}
                onChange={(e) => setMedium1Id(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              >
                {OPTICAL_MEDIA.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nameAr} — (n = {m.refractiveIndex})
                  </option>
                ))}
              </select>
            </div>

            {/* Medium 2 Select */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300">الوسط الثاني المنكسر إليه (Medium 2):</label>
              <select
                value={medium2Id}
                onChange={(e) => setMedium2Id(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                {OPTICAL_MEDIA.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nameAr} — (n = {m.refractiveIndex})
                  </option>
                ))}
              </select>
            </div>

            {/* Angle of Incidence */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>زاوية السقوط (θ₁):</span>
                <span className="text-sky-400 font-mono">{thetaIncidentDeg}°</span>
              </div>
              <input
                type="range"
                aria-label="زاوية السقوط"
                min="0"
                max="85"
                step="1"
                value={thetaIncidentDeg}
                onChange={(e) => setThetaIncidentDeg(parseInt(e.target.value))}
                className="w-full accent-sky-500"
              />
            </div>

            {/* Status indicator using SimulationStatus */}
            <SimulationStatus
              status={result.isTotalInternalReflection ? 'error' : 'nominal'}
              message={
                result.isTotalInternalReflection
                  ? `حالة انعكاس كلي داخلي: زاوية السقوط (${thetaIncidentDeg}°) أكبر من الزاوية الحرجة (${result.criticalAngleDeg?.toFixed(1)}°)، لذا يرتد الشعاع كاملاً إلى الوسط الأول دون أي نفاذ.`
                  : `انكسار منتظم: الشعاع ينفذ إلى الوسط الثاني بزاوية (${result.thetaRefractedDeg?.toFixed(1)}°).`
              }
            />
          </SimulationControls>
        </div>
      </div>
    </SimulationShell>
  );
};

export default ReflectionRefractionSimulation;
