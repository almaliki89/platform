import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateTransformer } from './calculations';
import { Layers, Activity, Sparkles, ArrowUpDown, RotateCcw } from 'lucide-react';

export const TransformerSimulation: React.FC = () => {
  const [primaryVoltageV1, setPrimaryVoltageV1] = useState<number>(220);
  const [primaryTurnsN1, setPrimaryTurnsN1] = useState<number>(200);
  const [secondaryTurnsN2, setSecondaryTurnsN2] = useState<number>(40);
  const [primaryCurrentI1, setPrimaryCurrentI1] = useState<number>(2);
  const [efficiencyPercent, setEfficiencyPercent] = useState<number>(95);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fluxAnimRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  const result = calculateTransformer(
    primaryVoltageV1,
    primaryTurnsN1,
    secondaryTurnsN2,
    primaryCurrentI1,
    efficiencyPercent
  );

  // Render Transformer Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isMounted = true;

    const render = () => {
      if (!isMounted) return;
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Update alternating flux phase
      fluxAnimRef.current = (fluxAnimRef.current + 0.05) % (Math.PI * 2);
      const fluxPhase = fluxAnimRef.current;
      const fluxAlpha = 0.2 + 0.3 * Math.abs(Math.sin(fluxPhase));

      const cx = width / 2;
      const cy = height / 2;
      const coreOuterW = 320;
      const coreOuterH = 190;
      const coreThick = 45;

      // 1. Laminated Closed Iron Core
      ctx.fillStyle = '#334155';
      ctx.fillRect(cx - coreOuterW / 2, cy - coreOuterH / 2, coreOuterW, coreOuterH);

      // Inner Window cutout
      ctx.fillStyle = '#020617';
      const winW = coreOuterW - coreThick * 2;
      const winH = coreOuterH - coreThick * 2;
      ctx.fillRect(cx - winW / 2, cy - winH / 2, winW, winH);

      // Core Borders
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - coreOuterW / 2, cy - coreOuterH / 2, coreOuterW, coreOuterH);
      ctx.strokeRect(cx - winW / 2, cy - winH / 2, winW, winH);

      // Pulsing Magnetic Flux path inside Core
      ctx.strokeStyle = `rgba(56, 189, 248, ${fluxAlpha})`;
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 8]);
      const fluxW = coreOuterW - coreThick;
      const fluxH = coreOuterH - coreThick;
      ctx.strokeRect(cx - fluxW / 2, cy - fluxH / 2, fluxW, fluxH);
      ctx.setLineDash([]);

      ctx.fillStyle = `rgba(56, 189, 248, ${fluxAlpha + 0.2})`;
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('فيض مغناطيسي متغير (Φ)', cx, cy - winH / 2 - 10);

      // 2. Primary Coil (Left)
      const leftLimbX = cx - coreOuterW / 2 + coreThick / 2;
      const numTurnsVisualLeft = Math.min(18, Math.max(6, Math.round(primaryTurnsN1 / 15)));
      const leftStep = winH / (numTurnsVisualLeft + 1);

      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 4;
      for (let i = 1; i <= numTurnsVisualLeft; i++) {
        const y = cy - winH / 2 + i * leftStep;
        ctx.beginPath();
        ctx.ellipse(leftLimbX, y, coreThick * 0.7, 6, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 3. Secondary Coil (Right)
      const rightLimbX = cx + coreOuterW / 2 - coreThick / 2;
      const numTurnsVisualRight = Math.min(18, Math.max(6, Math.round(secondaryTurnsN2 / 15)));
      const rightStep = winH / (numTurnsVisualRight + 1);

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      for (let i = 1; i <= numTurnsVisualRight; i++) {
        const y = cy - winH / 2 + i * rightStep;
        ctx.beginPath();
        ctx.ellipse(rightLimbX, y, coreThick * 0.7, 6, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Labels on canvas
      // Primary Labels
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('الملف الابتدائي (Primary)', leftLimbX - 45, cy - 40);
      ctx.font = '11px monospace';
      ctx.fillText(`N₁ = ${primaryTurnsN1} لفة`, leftLimbX - 45, cy - 20);
      ctx.fillText(`V₁ = ${primaryVoltageV1} V`, leftLimbX - 45, cy);
      ctx.fillText(`I₁ = ${primaryCurrentI1} A`, leftLimbX - 45, cy + 20);

      // Secondary Labels
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('الملف الثانوي (Secondary)', rightLimbX + 45, cy - 40);
      ctx.font = '11px monospace';
      ctx.fillText(`N₂ = ${secondaryTurnsN2} لفة`, rightLimbX + 45, cy - 20);
      ctx.fillText(`V₂ = ${result.secondaryVoltageV2.toFixed(1)} V`, rightLimbX + 45, cy);
      ctx.fillText(`I₂ = ${result.secondaryCurrentI2.toFixed(2)} A`, rightLimbX + 45, cy + 20);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [primaryVoltageV1, primaryTurnsN1, secondaryTurnsN2, primaryCurrentI1, result]);

  const handleReset = () => {
    setPrimaryVoltageV1(220);
    setPrimaryTurnsN1(200);
    setSecondaryTurnsN2(40);
    setPrimaryCurrentI1(2);
    setEfficiencyPercent(95);
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'فولتية الملف الثانوي (V₂)',
      value: `${result.secondaryVoltageV2.toFixed(1)} V`,
      color: 'cyan',
    },
    {
      label: 'نوع المحولة',
      value:
        result.transformerType === 'step-up'
          ? 'رافعة للفولتية'
          : result.transformerType === 'step-down'
          ? 'خافضة للفولتية'
          : 'عازلة (N₁=N₂)',
      color: result.transformerType === 'step-up' ? 'amber' : 'emerald',
    },
    {
      label: 'نسبة التحويل (N₂ / N₁)',
      value: result.turnsRatio.toFixed(2),
      color: 'slate',
    },
    {
      label: 'كفاءة المحولة (η)',
      value: `${efficiencyPercent} %`,
      color: efficiencyPercent >= 90 ? 'emerald' : 'amber',
    },
  ];

  return (
    <SimulationShell
      title="مختبر المحولة الكهربائية والحث المتبادل"
      subtitle="الفصل السابع — المحولة الخافضة والرافعة، كفاءة المحولة، ونسبة عدد اللفات"
      badge="الصف الثالث المتوسط"
      topic="المحولة الكهربائية"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Canvas & Oscilloscope */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex flex-col items-center justify-center p-4">
            <canvas
              ref={canvasRef}
              width={600}
              height={290}
              className="w-full max-w-[600px] h-auto aspect-[600/290] block select-none"
            />

            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-400">
              V₂ / V₁ = N₂ / N₁
            </div>
          </div>

          <SimulationHUD metrics={hudMetrics} />

          {/* Educational Callout */}
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-900 dark:text-cyan-200 space-y-1.5">
            <p className="font-bold flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>الاستنتاج العلمي وفق المنهاج الوزاري:</span>
            </p>
            <p>{result.explanationAr}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              يُصنع قلب المحولة من صفائح رقيقة من الحديد المطاوع معزولة عن بعضها ومكبوسة كبساً شديداً لتقليل خسائر التيارات الدوامة (Eddy Currents) وتحسين كفاءة نقل الطاقة.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <SimulationControls
            title="معاملات المحولة الكهربائية"
            onReset={handleReset}
          >
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>فولتية الملف الابتدائي (V₁)</span>
                  <span className="font-mono text-red-500">{primaryVoltageV1} V</span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={240}
                  step={4}
                  value={primaryVoltageV1}
                  onChange={(e) => setPrimaryVoltageV1(Number(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>عدد لفات الملف الابتدائي (N₁)</span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400">{primaryTurnsN1} لفة</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={500}
                  step={10}
                  value={primaryTurnsN1}
                  onChange={(e) => setPrimaryTurnsN1(Number(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>عدد لفات الملف الثانوي (N₂)</span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400">{secondaryTurnsN2} لفة</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={800}
                  step={10}
                  value={secondaryTurnsN2}
                  onChange={(e) => setSecondaryTurnsN2(Number(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer"
                />
              </div>

              {/* Quick Presets for Step-Up / Step-Down */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-500 block mb-1.5">نماذج تطبيقية:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPrimaryVoltageV1(220);
                      setPrimaryTurnsN1(200);
                      setSecondaryTurnsN2(20);
                    }}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-right"
                  >
                    شاحن هاتف (خافضة 220V→22V)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPrimaryVoltageV1(110);
                      setPrimaryTurnsN1(100);
                      setSecondaryTurnsN2(200);
                    }}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-right"
                  >
                    محطة نقل (رافعة 110V→220V)
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>كفاءة المحولة (η)</span>
                  <span className="font-mono text-emerald-500">{efficiencyPercent} %</span>
                </div>
                <input
                  type="range"
                  min={60}
                  max={100}
                  step={5}
                  value={efficiencyPercent}
                  onChange={(e) => setEfficiencyPercent(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>60% (خسائر قدرة)</span>
                  <span>95% (محولة حقيقية)</span>
                  <span>100% (مثالية)</span>
                </div>
              </div>

              {/* Power Losses Breakdown */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <span className="font-bold text-slate-700 dark:text-slate-300">القدرة الداخلة (P_in):</span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400">{result.powerInW.toFixed(1)} W</span>
                </div>
                <div className="flex justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <span className="font-bold text-slate-700 dark:text-slate-300">القدرة الخارجة (P_out):</span>
                  <span className="font-mono text-emerald-500">{result.powerOutW.toFixed(1)} W</span>
                </div>
                <div className="flex justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <span className="font-bold text-red-500">الضياعات الحرارية:</span>
                  <span className="font-mono text-red-500">{result.powerLostW.toFixed(1)} W</span>
                </div>
              </div>
            </div>
          </SimulationControls>
        </div>
      </div>
    </SimulationShell>
  );
};
