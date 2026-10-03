import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateElectromagnetism } from './calculations';
import { ElectromagnetismMode } from './types';
import { Magnet, Compass, Zap, Sparkles, Layers, RotateCcw } from 'lucide-react';

export const ElectromagnetismSimulation: React.FC = () => {
  const [mode, setMode] = useState<ElectromagnetismMode>('solenoid-core');
  const [currentA, setCurrentA] = useState<number>(5); // Amperes
  const [coilTurns, setCoilTurns] = useState<number>(30);
  const [hasIronCore, setHasIronCore] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const result = calculateElectromagnetism(mode, currentA, coilTurns, hasIronCore, 50);

  // Canvas Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Subtle grid
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

    if (mode === 'oersted-wire') {
      // Oersted Experiment Visual (Straight Wire through Cardboard Plane)
      const cx = width / 2;
      const cy = height / 2;

      // Cardboard sheet in perspective
      ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - 160, cy - 50);
      ctx.lineTo(cx + 160, cy - 50);
      ctx.lineTo(cx + 110, cy + 50);
      ctx.lineTo(cx - 210, cy + 50);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '10px sans-serif';
      ctx.fillText('لوح مقوى أفقي (تجربة أورستد)', cx - 180, cy + 42);

      // Concentric Magnetic Field Rings on sheet
      if (Math.abs(currentA) > 0.1) {
        const ringRadii = [35, 65, 95];
        const isClockwise = currentA > 0;

        ringRadii.forEach((r) => {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(cx - 50, cy, r, r * 0.45, 0, 0, Math.PI * 2);
          ctx.stroke();

          // Arrow on the ring
          const arrowAngle = isClockwise ? Math.PI * 0.2 : Math.PI * 1.2;
          const ax = cx - 50 + Math.cos(arrowAngle) * r;
          const ay = cy + Math.sin(arrowAngle) * (r * 0.45);
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(ax, ay, 3, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Vertical Straight Wire
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(cx - 50, 20);
      ctx.lineTo(cx - 50, height - 20);
      ctx.stroke();

      // Current direction arrow on wire
      if (Math.abs(currentA) > 0.1) {
        const isUp = currentA > 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(isUp ? '▲ تيار I' : '▼ تيار I', cx - 50, isUp ? 40 : height - 35);
      }

      // Compass resting on cardboard
      drawMiniCompass(ctx, cx + 25, cy + 10, result.compassAngleDeg);
    } else {
      // Solenoid / Electromagnet Visual
      const cx = width / 2;
      const cy = height / 2;
      const coreW = 260;
      const coreH = 50;

      // Magnetic field loops outside solenoid
      if (Math.abs(currentA) > 0.1) {
        const numLoops = 4;
        const isNorthRight = currentA > 0;

        for (let i = 1; i <= numLoops; i++) {
          const spreadY = 40 + i * 26;
          ctx.strokeStyle = hasIronCore ? 'rgba(56, 189, 248, 0.35)' : 'rgba(56, 189, 248, 0.18)';
          ctx.lineWidth = hasIronCore ? 2 : 1.2;

          // Upper loop
          ctx.beginPath();
          ctx.ellipse(cx, cy, coreW * 0.65, spreadY, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Iron Core (if enabled)
      if (hasIronCore) {
        ctx.fillStyle = '#475569';
        ctx.fillRect(cx - coreW / 2, cy - coreH / 2, coreW, coreH);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.strokeRect(cx - coreW / 2, cy - coreH / 2, coreW, coreH);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('قلب من الحديد المطاوع (Soft Iron Core)', cx, cy);
      }

      // Solenoid Coil turns
      const step = coreW / (coilTurns + 1);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;

      for (let i = 1; i <= coilTurns; i++) {
        const x = cx - coreW / 2 + i * step;
        ctx.beginPath();
        ctx.ellipse(x, cy, 6, coreH * 0.65, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Polarity badges at ends
      if (Math.abs(currentA) > 0.1) {
        const isNorthRight = currentA > 0;
        const poleLeft = isNorthRight ? 'S' : 'N';
        const poleRight = isNorthRight ? 'N' : 'S';

        // Left pole
        ctx.fillStyle = poleLeft === 'N' ? '#ef4444' : '#3b82f6';
        ctx.beginPath();
        ctx.arc(cx - coreW / 2 - 25, cy, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(poleLeft, cx - coreW / 2 - 25, cy);

        // Right pole
        ctx.fillStyle = poleRight === 'N' ? '#ef4444' : '#3b82f6';
        ctx.beginPath();
        ctx.arc(cx + coreW / 2 + 25, cy, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillText(poleRight, cx + coreW / 2 + 25, cy);
      }

      // Compass at side
      drawMiniCompass(ctx, cx + coreW / 2 + 70, cy, result.compassAngleDeg);
    }
  }, [mode, currentA, coilTurns, hasIronCore, result]);

  function drawMiniCompass(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    angleDeg: number
  ) {
    const radius = 20;
    const rad = (angleDeg * Math.PI) / 180;

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Needle pivot
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // North Needle
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(rad) * (radius - 3), cy + Math.sin(rad) * (radius - 3));
    ctx.lineTo(cx + Math.cos(rad + Math.PI / 2) * 3, cy + Math.sin(rad + Math.PI / 2) * 3);
    ctx.closePath();
    ctx.fill();

    // South Needle
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx - Math.cos(rad) * (radius - 3), cy - Math.sin(rad) * (radius - 3));
    ctx.lineTo(cx - Math.cos(rad + Math.PI / 2) * 3, cy - Math.sin(rad + Math.PI / 2) * 3);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('بوصلة كاشفة', cx, cy - radius - 5);
  }

  const handleReset = () => {
    setCurrentA(5);
    setCoilTurns(30);
    setHasIronCore(true);
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'شدة المجال المغناطيسي النسبي',
      value: `${result.fieldStrengthRelative} %`,
      color: 'cyan',
    },
    {
      label: 'القطبية المتولدة',
      value: result.northPoleSideAr,
      color: 'amber',
    },
    {
      label: 'مضاعف النفاذية بالقلب الحديدي',
      value: `${result.permeabilityMultiplier}x`,
      color: 'emerald',
    },
    {
      label: 'تيار التغذية (I)',
      value: `${currentA} A`,
      color: 'slate',
    },
  ];

  return (
    <SimulationShell
      title="مختبر الكهربائية والمغناطيسية"
      subtitle="الفصل السادس — تجربة أورستد، المجال المغناطيسي للتيار الكهربائي، وقاعدة الكف اليمنى للمغناطيس الكهربائي"
      badge="الصف الثالث المتوسط"
      topic="الكهربائية والمغناطيسية"
    >
      <div className="space-y-6">
        {/* Experiment Mode Selector */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            type="button"
            onClick={() => setMode('solenoid-core')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'solenoid-core'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Magnet className="w-4 h-4" />
            <span>المغناطيس الكهربائي (الملف والقلب الحديدي)</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('oersted-wire')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'oersted-wire'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>تجربة أورستد (سلك مستقيم وحلقات المجال)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visual Display */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex flex-col items-center justify-center p-4">
              <canvas
                ref={canvasRef}
                width={600}
                height={300}
                className="w-full max-w-[600px] h-auto aspect-[600/300] block select-none"
              />

              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-400">
                {mode === 'solenoid-core' ? 'B = μ · (N / L) · I' : 'B = (μ₀ · I) / (2π · r)'}
              </div>
            </div>

            <SimulationHUD metrics={hudMetrics} />

            {/* Right-Hand Rule Callout */}
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-900 dark:text-cyan-200 space-y-1.5">
              <p className="font-bold flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>تطبيق قاعدة الكف اليمنى (Right-Hand Rule):</span>
              </p>
              <p>{result.rightHandRuleExplanationAr}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                يزداد المجال المغناطيسي للمغناطيس الكهربائي بزيادة: ١) شدة التيار المار فيه، ٢) عدد لفات الملف لوحدة الطول، ٣) نوع مادة القلب (الحديد المطاوع يزيد المجال بشكل ملحوظ).
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <SimulationControls
              title="معاملات المغناطيس الكهربائي"
              onReset={handleReset}
            >
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>شدة واتجاه التيار الكهربائي (I)</span>
                    <span className="font-mono text-cyan-600 dark:text-cyan-400">
                      {currentA > 0 ? `+${currentA}` : currentA} A
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-10}
                    max={10}
                    step={1}
                    value={currentA}
                    onChange={(e) => setCurrentA(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>-10A (عكس)</span>
                    <span>0A (مغلق)</span>
                    <span>+10A (أمام)</span>
                  </div>
                </div>

                {mode === 'solenoid-core' && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>عدد لفات الملف (N)</span>
                        <span className="font-mono text-amber-500">{coilTurns} لفة</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={60}
                        step={5}
                        value={coilTurns}
                        onChange={(e) => setCoilTurns(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                      <label className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                        <span>قلب من الحديد المطاوع داخل الملف</span>
                        <input
                          type="checkbox"
                          checked={hasIronCore}
                          onChange={(e) => setHasIronCore(e.target.checked)}
                          className="rounded accent-cyan-600"
                        />
                      </label>
                      <p className="text-[11px] text-slate-400 mt-1">
                        يزيد القلب الحديدي من تركيز خطوط المجال المغناطيسي ونفاذيتها بدرجة فائقة.
                      </p>
                    </div>
                  </>
                )}

                {/* Factors Summary */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                  <p className="font-bold text-slate-900 dark:text-white">العوامل المؤثرة على قوة المغناطيس:</p>
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1 text-[11px]">
                    <li>شدة التيار الكهربائي (تناسب طردي)</li>
                    <li>عدد لفات السلك (تناسب طردي)</li>
                    <li>مادة القلب الداخلي (الحديد المطاوع)</li>
                  </ul>
                </div>
              </div>
            </SimulationControls>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
