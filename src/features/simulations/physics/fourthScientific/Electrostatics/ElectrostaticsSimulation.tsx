import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  PARTICLE_PRESETS,
  calculateParallelPlates,
} from './calculations';
import { FourthElectrostaticsMode, ChargedParticleType } from './types';
import { Zap, Sparkles, Layers, RotateCcw, Activity } from 'lucide-react';

export const ElectrostaticsSimulation: React.FC = () => {
  const [mode, setMode] = useState<FourthElectrostaticsMode>('parallel-plates');
  const [particleType, setParticleType] = useState<ChargedParticleType>('electron');
  const [voltageV, setVoltageV] = useState<number>(200); // Top plate positive, bottom negative
  const [plateSeparationCm, setPlateSeparationCm] = useState<number>(4.0); // 4 cm
  const [velocityKm_s, setVelocityKm_s] = useState<number>(1500); // 1500 km/s for electron

  const activeParticle = PARTICLE_PRESETS[particleType];
  const plateSeparationM = plateSeparationCm / 100;

  const result = calculateParallelPlates(
    particleType,
    voltageV,
    plateSeparationM,
    velocityKm_s,
    0.1
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

    // Dark grid background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 25) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 25) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    if (mode === 'equipotential') {
      // Draw pointed conductor with charge accumulation at sharp tip
      const cx = width / 2 - 30;
      const cy = height / 2;

      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;

      // Teardrop / Pear-shaped conductor
      ctx.beginPath();
      ctx.moveTo(cx - 120, cy);
      ctx.bezierCurveTo(cx - 120, cy - 80, cx + 50, cy - 60, cx + 160, cy);
      ctx.bezierCurveTo(cx + 50, cy + 60, cx - 120, cy + 80, cx - 120, cy);
      ctx.fill();
      ctx.stroke();

      // Sharp tip label
      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('رأس مدبب (كثافة شحنة عالية جداً)', cx + 170, cy + 4);

      // Charge signs "+" along surface, much denser at the sharp tip!
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';

      // Sparse on blunt end
      ctx.fillText('+', cx - 100, cy - 50);
      ctx.fillText('+', cx - 100, cy + 55);
      ctx.fillText('+', cx - 60, cy - 60);
      ctx.fillText('+', cx - 60, cy + 65);
      ctx.fillText('+', cx, cy - 52);
      ctx.fillText('+', cx, cy + 55);

      // Dense at sharp tip
      ctx.fillStyle = '#ef4444';
      ctx.fillText('++', cx + 110, cy - 25);
      ctx.fillText('++', cx + 110, cy + 28);
      ctx.fillText('+++', cx + 145, cy - 12);
      ctx.fillText('+++', cx + 145, cy + 15);
      ctx.fillText('++++', cx + 160, cy);

      // Note text
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('توزيع الشحنات على سطح موصل: تتركز الشحنات بكثافة عالية جداً عند الرؤوس المدببة', width / 2, height - 20);
      return;
    }

    // Parallel Plates Mode
    const plateStartX = 120;
    const plateEndX = width - 100;
    const plateLen = plateEndX - plateStartX;
    const centerY = height / 2;

    const sepPx = plateSeparationCm * 20; // 4cm = 80px
    const topPlateY = centerY - sepPx / 2;
    const botPlateY = centerY + sepPx / 2;

    // Top Plate (+ if voltage > 0)
    const topIsPositive = voltageV >= 0;
    ctx.fillStyle = topIsPositive ? '#dc2626' : '#2563eb';
    ctx.fillRect(plateStartX, topPlateY - 12, plateLen, 12);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeRect(plateStartX, topPlateY - 12, plateLen, 12);

    // Bottom Plate (- if voltage > 0)
    ctx.fillStyle = topIsPositive ? '#2563eb' : '#dc2626';
    ctx.fillRect(plateStartX, botPlateY, plateLen, 12);
    ctx.strokeRect(plateStartX, botPlateY, plateLen, 12);

    // Charge signs on plates
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    for (let x = plateStartX + 15; x < plateEndX; x += 25) {
      ctx.fillText(topIsPositive ? '+' : '-', x, topPlateY - 3);
      ctx.fillText(topIsPositive ? '-' : '+', x, botPlateY + 10);
    }

    // Plate labels
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`اللوح العلوي: ${topIsPositive ? '+V/2' : '-V/2'}`, plateEndX + 10, topPlateY - 2);
    ctx.fillText(`اللوح السفلي: ${topIsPositive ? '-V/2' : '+V/2'}`, plateEndX + 10, botPlateY + 10);

    // Uniform Electric Field Lines (vertical arrows)
    const fieldDir = topIsPositive ? 1 : -1; // 1 = down, -1 = up
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.45)';
    ctx.lineWidth = 1.5;

    for (let x = plateStartX + 20; x < plateEndX; x += 35) {
      ctx.beginPath();
      ctx.moveTo(x, topPlateY);
      ctx.lineTo(x, botPlateY);
      ctx.stroke();

      // Arrowhead
      const arrowY = fieldDir > 0 ? botPlateY - 8 : topPlateY + 8;
      ctx.fillStyle = 'rgba(251, 191, 36, 0.7)';
      ctx.beginPath();
      ctx.moveTo(x, arrowY + fieldDir * 6);
      ctx.lineTo(x - 4, arrowY);
      ctx.lineTo(x + 4, arrowY);
      ctx.closePath();
      ctx.fill();
    }

    // Equipotential Lines (horizontal dashed)
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.beginPath();
    ctx.moveTo(plateStartX, centerY);
    ctx.lineTo(plateEndX, centerY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#38bdf8';
    ctx.font = '9px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('سطح تساوي الجهد V = 0', plateStartX - 10, centerY + 3);

    // Particle Gun on Left
    const gunX = 50;
    const gunY = centerY;
    ctx.fillStyle = '#475569';
    ctx.fillRect(gunX - 25, gunY - 14, 30, 28);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(gunX - 25, gunY - 14, 30, 28);

    // Nozzle
    ctx.fillStyle = '#64748b';
    ctx.fillRect(gunX + 5, gunY - 6, 15, 12);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('مدفع الجسيمات', gunX - 10, gunY - 20);

    // Parabolic Particle Trajectory inside plates
    // Particle starts at (gunX + 20, gunY) horizontally
    // Deflection direction:
    // If electron (q < 0) and top plate is +, electron bends UP towards top plate!
    // If proton (q > 0) and top plate is +, proton bends DOWN towards bottom plate!
    const qSign = activeParticle.chargeSign;
    const bendDirection = topIsPositive ? -qSign : qSign; // -1 = up, +1 = down

    const clampedDeflectionPx = Math.max(
      -sepPx / 2 + 5,
      Math.min(sepPx / 2 - 5, result.verticalDeflectionMm * (sepPx / (plateSeparationCm * 10)) * bendDirection)
    );

    ctx.strokeStyle = activeParticle.color;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(gunX + 20, gunY);
    ctx.lineTo(plateStartX, gunY);

    // Parabola inside plate region: y(x) = y0 + clampedDeflection * ( (x - x0) / plateLen )^2
    for (let x = plateStartX; x <= plateEndX; x += 5) {
      const prog = (x - plateStartX) / plateLen;
      const curY = gunY + clampedDeflectionPx * (prog * prog);
      ctx.lineTo(x, curY);
    }
    // Straight line after exiting plates
    const exitY = gunY + clampedDeflectionPx;
    ctx.lineTo(width - 30, exitY + clampedDeflectionPx * 0.4);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw the particle at the exit
    ctx.fillStyle = activeParticle.color;
    ctx.beginPath();
    ctx.arc(plateEndX, exitY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Callout box for deflection
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.roundRect(plateEndX - 100, exitY - (bendDirection < 0 ? 45 : -15), 160, 32, 6);
    ctx.fill();
    ctx.strokeStyle = activeParticle.color;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(
      `الانحراف y = ${result.verticalDeflectionMm.toFixed(2)} mm`,
      plateEndX - 90,
      exitY - (bendDirection < 0 ? 25 : -35)
    );
  }, [
    mode,
    particleType,
    voltageV,
    plateSeparationCm,
    velocityKm_s,
    activeParticle,
    result,
  ]);

  const handleReset = () => {
    setMode('parallel-plates');
    setParticleType('electron');
    setVoltageV(200);
    setPlateSeparationCm(4.0);
    setVelocityKm_s(1500);
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'شدة المجال الكهربائي (E)',
      value: `${result.electricFieldStrengthV_m.toFixed(0)} V/m`,
      color: 'cyan',
    },
    {
      label: 'القوة المؤثرة (F = q·E)',
      value: `${result.forceOnParticleN.toExponential(2)} N`,
      color: 'amber',
    },
    {
      label: 'التعجيل المكتسب (a)',
      value: `${result.accelerationM_s2.toExponential(2)} m/s²`,
      color: 'emerald',
    },
    {
      label: 'الانحراف الرأسي (y)',
      value: `${result.verticalDeflectionMm.toFixed(2)} mm`,
      color: 'purple',
    },
  ];

  return (
    <SimulationShell
      title="مختبر المجال والجهد الكهربائي وانحراف الشحنات"
      subtitle="الفصل التاسع — شدة المجال الكهربائي المنتظم (E = ΔV/d)، حركة الجسيمات المشحونة، وسطوح تساوي الجهد"
      badge="الصف الرابع العلمي"
      topic="المجال والجهد الكهربائي"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Visual Canvas & Math */}
        <div className="lg:col-span-2 space-y-4">
          <SimulationHUD metrics={hudMetrics} />

          <div className="relative bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl">
            {/* Mode selection buttons */}
            <div className="flex flex-wrap items-center gap-2 mb-4 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80">
              <button
                onClick={() => setMode('parallel-plates')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'parallel-plates'
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                المجال المنتظم وانحراف الجسيمات (Parallel Plates)
              </button>
              <button
                onClick={() => setMode('equipotential')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'equipotential'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                توزيع الشحنات على الرؤوس المدببة
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
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>المعادلات الحاكمة لحركة الشحنات والمجال:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-sky-300">
                E = ΔV / d &nbsp;[V/m = N/C]
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-amber-300">
                F = q · E &nbsp;→&nbsp; a = (q · E) / m
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-emerald-300">
                y = ½ · a · (L / v₀)²
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg space-y-1">
              <span className="text-slate-400 text-xs">ملاحظة علمية:</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                تكتسب الشحنة تعجيلاً ثابتاً باتجاه عمودي على سرعتها الابتدائية فترسم مساراً قطعياً مكافئاً (Parabola) شبيهاً بمسار المقذوفات في مجال الجاذبية، وتستغل هذه الظاهرة في راسم الإشارة (CRT) ومطياف الكتلة ومسرعات الجسيمات.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls onReset={handleReset}>
            {/* Particle Selector */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300">نوع الجسيم المشحون:</label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {(['electron', 'proton', 'alpha'] as ChargedParticleType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setParticleType(type);
                      // Adjust speed sensibly for heavy particles
                      if (type === 'electron') setVelocityKm_s(1500);
                      else if (type === 'proton') setVelocityKm_s(80);
                      else setVelocityKm_s(40);
                    }}
                    className={`py-2 rounded-lg font-medium transition-all ${
                      particleType === type
                        ? 'bg-sky-500 text-white shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {type === 'electron' ? 'إلكترون e⁻' : type === 'proton' ? 'بروتون p⁺' : 'ألفا α²⁺'}
                  </button>
                ))}
              </div>
            </div>

            {/* Voltage */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>فرق الجهد بين اللوحين (ΔV):</span>
                <span className="text-amber-400 font-mono">{voltageV} V</span>
              </div>
              <input
                type="range"
                min="0"
                max="600"
                step="20"
                value={voltageV}
                onChange={(e) => setVoltageV(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Separation Distance */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>المسافة بين اللوحين (d):</span>
                <span className="text-sky-400 font-mono">{plateSeparationCm.toFixed(1)} cm</span>
              </div>
              <input
                type="range"
                min="2.0"
                max="8.0"
                step="0.5"
                value={plateSeparationCm}
                onChange={(e) => setPlateSeparationCm(parseFloat(e.target.value))}
                className="w-full accent-sky-500"
              />
            </div>

            {/* Velocity */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>السرعة الأفقية الابتدائية (v₀):</span>
                <span className="text-emerald-400 font-mono">{velocityKm_s} km/s</span>
              </div>
              <input
                type="range"
                min={particleType === 'electron' ? 500 : 10}
                max={particleType === 'electron' ? 4000 : 200}
                step={particleType === 'electron' ? 100 : 5}
                value={velocityKm_s}
                onChange={(e) => setVelocityKm_s(parseInt(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Particle info box */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">الشحنة الكهربائية:</span>
                <span className="font-mono text-sky-400">{activeParticle.chargeCoulombs.toExponential(2)} C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">الكتلة السكونية:</span>
                <span className="font-mono text-white">{activeParticle.massKg.toExponential(2)} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">زمن العبور (t):</span>
                <span className="font-mono text-amber-400">{result.timeOfFlightNs.toFixed(2)} ns</span>
              </div>
            </div>
          </SimulationControls>
        </div>
      </div>
    </SimulationShell>
  );
};

export default ElectrostaticsSimulation;
