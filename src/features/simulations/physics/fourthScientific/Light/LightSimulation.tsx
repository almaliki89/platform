import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  LAMP_PRESETS,
  calculateIlluminance,
  getInverseSquarePoints,
} from './calculations';
import { LightMode } from './types';
import { Sun, Lightbulb, Compass, Sparkles, Layers, RotateCcw } from 'lucide-react';

export const LightSimulation: React.FC = () => {
  const [mode, setMode] = useState<LightMode>('inverse-square');

  const [selectedLampId, setSelectedLampId] = useState<string>('led-10w');
  const [customIntensityCd, setCustomIntensityCd] = useState<number>(85);
  const [distanceM, setDistanceM] = useState<number>(1.5);
  const [incidenceAngleDeg, setIncidenceAngleDeg] = useState<number>(0);

  const activeLamp =
    LAMP_PRESETS.find((l) => l.id === selectedLampId) || LAMP_PRESETS[0];

  const intensityCd =
    mode === 'lamp-comparison' ? activeLamp.luminousIntensityCd : customIntensityCd;

  const result = calculateIlluminance(intensityCd, distanceM, incidenceAngleDeg);
  const inverseSquarePoints = getInverseSquarePoints();

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

    // Dark optical bench background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    // Subtle optical grid
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

    // Optical Bench Rail at bottom
    const railY = height - 55;
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(40, railY);
    ctx.lineTo(width - 40, railY);
    ctx.stroke();

    // Bench ticks (every 0.5m up to 4.0m)
    const sourceX = 80;
    const maxBenchX = width - 80;
    const benchDistPx = maxBenchX - sourceX;
    const maxBenchDistM = 4.0;
    const mapDistToX = (d: number) => sourceX + (d / maxBenchDistM) * benchDistPx;

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    for (let d = 0; d <= maxBenchDistM; d += 0.5) {
      const tx = mapDistToX(d);
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(tx, railY - 5);
      ctx.lineTo(tx, railY + 5);
      ctx.stroke();
      ctx.fillText(`${d.toFixed(1)}m`, tx, railY + 20);
    }

    const lightY = height / 2 - 20;

    if (mode === 'inverse-square') {
      // Draw 3 pyramidal projection cones at d=1m, 2m, 3m
      const d1X = mapDistToX(1.0);
      const d2X = mapDistToX(2.0);
      const d3X = mapDistToX(3.0);

      // Light beam cone outline
      ctx.fillStyle = 'rgba(251, 191, 36, 0.08)';
      ctx.beginPath();
      ctx.moveTo(sourceX, lightY);
      ctx.lineTo(d3X + 20, lightY - 75);
      ctx.lineTo(d3X + 20, lightY + 75);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(sourceX, lightY);
      ctx.lineTo(d3X + 20, lightY - 75);
      ctx.moveTo(sourceX, lightY);
      ctx.lineTo(d3X + 20, lightY + 75);
      ctx.stroke();
      ctx.setLineDash([]);

      // Screens at 1m, 2m, 3m
      const drawScreenArea = (x: number, scale: number, labelArea: string, labelLux: string) => {
        const h = 25 * scale;
        ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.fillRect(x - 5, lightY - h, 10, h * 2);
        ctx.strokeRect(x - 5, lightY - h, 10, h * 2);

        // Grid sub-squares
        if (scale > 1) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1;
          const subH = (h * 2) / scale;
          for (let i = 1; i < scale; i++) {
            ctx.beginPath();
            ctx.moveTo(x - 5, lightY - h + i * subH);
            ctx.lineTo(x + 5, lightY - h + i * subH);
            ctx.stroke();
          }
        }

        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(labelArea, x, lightY - h - 18);
        ctx.fillStyle = '#fbbf24';
        ctx.font = '10px monospace';
        ctx.fillText(labelLux, x, lightY - h - 6);
      };

      drawScreenArea(d1X, 1, 'المساحة = A', 'E₀');
      drawScreenArea(d2X, 2, 'المساحة = 4A', 'E₀ / 4');
      drawScreenArea(d3X, 3, 'المساحة = 9A', 'E₀ / 9');
    } else {
      // Mode Photometer or Lamp Comparison
      const sensorX = mapDistToX(distanceM);

      // Light beam spread to sensor
      const spreadH = 30 + distanceM * 25;
      const grad = ctx.createRadialGradient(sourceX, lightY, 10, sensorX, lightY, spreadH * 2);
      grad.addColorStop(0, 'rgba(251, 191, 36, 0.45)');
      grad.addColorStop(1, 'rgba(251, 191, 36, 0.05)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(sourceX, lightY);
      ctx.lineTo(sensorX, lightY - spreadH);
      ctx.lineTo(sensorX, lightY + spreadH);
      ctx.closePath();
      ctx.fill();

      // Rays
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.35)';
      ctx.lineWidth = 1;
      for (let angle = -18; angle <= 18; angle += 6) {
        const rad = (angle * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(sourceX, lightY);
        ctx.lineTo(sourceX + Math.cos(rad) * (sensorX - sourceX), lightY + Math.sin(rad) * (sensorX - sourceX));
        ctx.stroke();
      }

      // Sensor Target with angle tilt
      const sensorH = 70;
      const angleRad = (incidenceAngleDeg * Math.PI) / 180;

      ctx.save();
      ctx.translate(sensorX, lightY);
      ctx.rotate(angleRad);

      // Sensor plate
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.fillRect(-6, -sensorH / 2, 12, sensorH);
      ctx.strokeRect(-6, -sensorH / 2, 12, sensorH);

      // Sensor photocell
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(-4, -sensorH / 2 + 5, 4, sensorH - 10);

      // Normal line to sensor surface
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-40, 0);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();

      // Readout badge on sensor
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.roundRect(sensorX + 18, lightY - 40, 130, 48, 8);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`E = ${result.illuminanceLux.toFixed(1)} Lux`, sensorX + 28, lightY - 22);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.fillText(`r = ${distanceM.toFixed(2)} m`, sensorX + 28, lightY - 6);
    }

    // Draw Source Lamp Bulb
    const glow = ctx.createRadialGradient(sourceX, lightY, 4, sourceX, lightY, 35);
    glow.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    glow.addColorStop(0.3, 'rgba(251, 191, 36, 0.7)');
    glow.addColorStop(1, 'rgba(251, 191, 36, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(sourceX, lightY, 35, 0, Math.PI * 2);
    ctx.fill();

    // Bulb center
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(sourceX, lightY, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Lamp label
    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('مصدر الضوء', sourceX, lightY + 36);
    ctx.font = '10px monospace';
    ctx.fillText(`${intensityCd} cd`, sourceX, lightY + 50);
  }, [mode, distanceM, incidenceAngleDeg, intensityCd, selectedLampId, result]);

  const handleReset = () => {
    setMode('inverse-square');
    setSelectedLampId('led-10w');
    setCustomIntensityCd(85);
    setDistanceM(1.5);
    setIncidenceAngleDeg(0);
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'شدة الاستضاءة (E)',
      value: `${result.illuminanceLux.toFixed(1)} Lux`,
      color: 'cyan',
    },
    {
      label: 'شدة الإضاءة للمصدر (I)',
      value: `${intensityCd} cd`,
      color: 'amber',
    },
    {
      label: 'السيل الضوئي (Φ = 4πI)',
      value: `${result.luminousFluxLm.toFixed(0)} lm`,
      color: 'emerald',
    },
    {
      label: 'البعد عن المصدر (r)',
      value: `${distanceM.toFixed(2)} m`,
      color: 'purple',
    },
  ];

  return (
    <SimulationShell
      title="مختبر الضوء وشدة الاستضاءة وقانون التربيع العكسي"
      subtitle="الفصل الخامس — السيل الضوئي، شدة الإضاءة، وقانون التربيع العكسي للاستضاءة (E = I / r²)"
      badge="الصف الرابع العلمي"
      topic="الضوء وشدة الاستضاءة"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Optical Bench Canvas & Formulas */}
        <div className="lg:col-span-2 space-y-4">
          <SimulationHUD metrics={hudMetrics} />

          <div className="relative bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl">
            {/* Mode selection buttons */}
            <div className="flex flex-wrap items-center gap-2 mb-4 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80">
              <button
                onClick={() => setMode('inverse-square')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'inverse-square'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                قانون التربيع العكسي (Inverse Square Law)
              </button>
              <button
                onClick={() => setMode('photometer')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'photometer'
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                مقياس شدة الاستضاءة (Lux Meter)
              </button>
              <button
                onClick={() => setMode('lamp-comparison')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'lamp-comparison'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                مقارنة المصابيح والكفاءة الضوئية
              </button>
            </div>

            <canvas
              ref={canvasRef}
              width={640}
              height={320}
              className="w-full h-auto rounded-xl bg-slate-950 border border-slate-800/80 block"
            />
          </div>

          {/* Formulas and Insight */}
          <div className="bg-slate-900/70 rounded-xl border border-slate-800 p-4 text-xs text-slate-300 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>القوانين البصرية الأساسية:</span>
              </div>
              <span className="text-slate-400 text-xs">
                ملاءمة الإضاءة: <strong className="text-emerald-400">{result.recommendedEnvironmentAr}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-amber-300">
                E = I / r² &nbsp;[Lux = cd / m²]
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-sky-300">
                Φ = 4π · I &nbsp;[Lumen = 4π · cd]
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-emerald-300">
                E = (I · cos θ) / r²
              </div>
            </div>

            {mode === 'inverse-square' && (
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-200 text-xs leading-relaxed">
                <strong>مبدأ قانون التربيع العكسي:</strong> تتناسب شدة استضاءة السطح (E) عكسياً مع مربع بعده (r²) عن المصدر النقطي للضوء؛ فإذا تضاعفت المسافة إلى (2r)، تقل شدة الاستضاءة إلى الربع (1/4)، وإذا زادت إلى (3r)، تقل إلى التسع (1/9) لأن السيل الضوئي نفسه ينتشر على مساحة أكبر بمقدار r².
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls onReset={handleReset}>
            {mode === 'lamp-comparison' ? (
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">اختر نوع المصباح القياسي:</label>
                <select
                  value={selectedLampId}
                  onChange={(e) => setSelectedLampId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  {LAMP_PRESETS.map((lamp) => (
                    <option key={lamp.id} value={lamp.id}>
                      {lamp.nameAr} ({lamp.powerWatts}W) — {lamp.luminousIntensityCd} cd
                    </option>
                  ))}
                </select>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">القدرة الكهربائية:</span>
                    <span className="font-mono text-white">{activeLamp.powerWatts} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">السيل الكلي:</span>
                    <span className="font-mono text-amber-400">{activeLamp.luminousFluxLm} lm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">الكفاءة الضوئية:</span>
                    <span className="font-mono text-emerald-400">{activeLamp.efficacyLm_W.toFixed(1)} lm/W</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>شدة إضاءة المصدر (I):</span>
                  <span className="text-amber-400 font-mono">{customIntensityCd} cd (شمعة قياسية)</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="5"
                  value={customIntensityCd}
                  onChange={(e) => setCustomIntensityCd(parseInt(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
            )}

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>المسافة بين المصدر والسطح (r):</span>
                <span className="text-sky-400 font-mono">{distanceM.toFixed(2)} m</span>
              </div>
              <input
                type="range"
                min="0.3"
                max="4.0"
                step="0.1"
                value={distanceM}
                onChange={(e) => setDistanceM(parseFloat(e.target.value))}
                className="w-full accent-sky-500"
              />
            </div>

            {mode === 'photometer' && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>زاوية ميل السطح المستضيء (θ):</span>
                  <span className="text-rose-400 font-mono">{incidenceAngleDeg}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="75"
                  step="5"
                  value={incidenceAngleDeg}
                  onChange={(e) => setIncidenceAngleDeg(parseInt(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>
            )}

            {/* Quick Distance Presets */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="text-xs font-medium text-slate-400">مسافات قياسية سريعة:</label>
              <div className="grid grid-cols-4 gap-1.5">
                {[0.5, 1.0, 2.0, 3.0].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDistanceM(d)}
                    className={`py-1 rounded text-xs font-mono transition-colors ${
                      Math.abs(distanceM - d) < 0.05
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    {d}m
                  </button>
                ))}
              </div>
            </div>
          </SimulationControls>
        </div>
      </div>
    </SimulationShell>
  );
};

export default LightSimulation;
