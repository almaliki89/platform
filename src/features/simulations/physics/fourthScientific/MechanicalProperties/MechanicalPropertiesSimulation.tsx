import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  ELASTIC_MATERIALS,
  calculateMechanicalProperties,
} from './calculations';
import { MechanicalMode } from './types';
import { Activity, AlertTriangle, CheckCircle2, Sparkles, Layers, RotateCcw } from 'lucide-react';

export const MechanicalPropertiesSimulation: React.FC = () => {
  const [mode, setMode] = useState<MechanicalMode>('spring');
  const [appliedForceN, setAppliedForceN] = useState<number>(40);
  const [springConstantK, setSpringConstantK] = useState<number>(50); // N/m
  const [originalLengthM, setOriginalLengthM] = useState<number>(2.0); // m
  const [crossSectionAreaMm2, setCrossSectionAreaMm2] = useState<number>(1.5); // mm²
  const [materialId, setSelectedMaterialId] = useState<string>('steel');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const result = calculateMechanicalProperties(
    mode,
    appliedForceN,
    springConstantK,
    originalLengthM,
    crossSectionAreaMm2,
    materialId
  );

  const currentMat =
    ELASTIC_MATERIALS.find((m) => m.id === materialId) || ELASTIC_MATERIALS[0];

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Background grid
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

    const cx = width * 0.35;
    const topY = 35;

    // Fixed Support Ceiling
    ctx.fillStyle = '#475569';
    ctx.fillRect(cx - 70, topY - 12, 140, 12);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.strokeRect(cx - 70, topY - 12, 140, 12);

    // Support hatch marks
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    for (let hx = cx - 60; hx <= cx + 60; hx += 12) {
      ctx.beginPath();
      ctx.moveTo(hx, topY - 12);
      ctx.lineTo(hx + 8, topY - 22);
      ctx.stroke();
    }

    if (mode === 'spring') {
      // Spring Mode Rendering
      const baseLenPx = 90;
      // Scale extension: e.g. 1m = 120px
      const extPx = Math.min(130, result.extensionM * 110);
      const totalLenPx = baseLenPx + extPx;
      const numCoils = 14;
      const coilStep = totalLenPx / numCoils;

      ctx.strokeStyle = result.isWithinElasticLimit ? '#38bdf8' : '#ef4444';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(cx, topY);

      for (let i = 0; i <= numCoils; i++) {
        const y = topY + i * coilStep;
        const xOffset = i === 0 || i === numCoils ? 0 : (i % 2 === 0 ? 20 : -20);
        ctx.lineTo(cx + xOffset, y);
      }
      ctx.stroke();

      const loadY = topY + totalLenPx;

      // Hanging Weight Load
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(cx - 24, loadY, 48, 36);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - 24, loadY, 48, 36);

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${appliedForceN} N`, cx, loadY + 22);

      // Extension ruler alongside spring
      const rulerX = cx + 55;
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(rulerX, topY + baseLenPx);
      ctx.lineTo(rulerX, loadY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Extension label
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`Δx = ${result.extensionMm.toFixed(1)} mm`, rulerX + 8, topY + baseLenPx + extPx / 2 + 4);
    } else {
      // Wire Extension Mode
      const wireBaseLenPx = 110;
      const wireExtPx = Math.min(110, result.extensionMm * 15);
      const wireTotalLen = wireBaseLenPx + wireExtPx;

      ctx.strokeStyle = currentMat.color;
      ctx.lineWidth = Math.max(3, Math.min(10, crossSectionAreaMm2 * 1.5));
      ctx.beginPath();
      ctx.moveTo(cx, topY);
      ctx.lineTo(cx, topY + wireTotalLen);
      ctx.stroke();

      const loadY = topY + wireTotalLen;

      // Heavy Weight
      ctx.fillStyle = '#334155';
      ctx.fillRect(cx - 30, loadY, 60, 42);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - 30, loadY, 60, 42);

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`F = ${appliedForceN} N`, cx, loadY + 26);

      // Wire specs text
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`سلك من ${currentMat.nameAr.split('(')[0]}`, cx + 30, topY + 40);
      ctx.fillText(`L₀ = ${originalLengthM} m | A = ${crossSectionAreaMm2} mm²`, cx + 30, topY + 60);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(`الاستطالة ΔL = ${result.extensionMm.toFixed(3)} mm`, cx + 30, topY + 82);
    }
  }, [mode, appliedForceN, springConstantK, originalLengthM, crossSectionAreaMm2, currentMat, result]);

  const handleReset = () => {
    setAppliedForceN(40);
    setSpringConstantK(50);
    setOriginalLengthM(2.0);
    setCrossSectionAreaMm2(1.5);
    setSelectedMaterialId('steel');
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: mode === 'spring' ? 'الاستطالة (Δx)' : 'استطالة السلك (ΔL)',
      value: `${result.extensionMm.toFixed(2)} mm`,
      color: 'cyan',
    },
    {
      label: 'الإجهاد الواقع (Stress)',
      value: `${result.stressMPa.toFixed(1)} MPa`,
      color: result.isWithinElasticLimit ? 'amber' : 'red',
    },
    {
      label: 'المطاوعة النسبية (Strain)',
      value: result.strain.toExponential(3),
      color: 'slate',
    },
    {
      label: 'حالة المرونة',
      value: result.isWithinElasticLimit ? 'ضمن حد المرونة ✓' : 'تجاوز حد المرونة ⚠',
      color: result.isWithinElasticLimit ? 'emerald' : 'red',
    },
  ];

  return (
    <SimulationShell
      title="مختبر الخصائص الميكانيكية للمادة وقانون هوك"
      subtitle="الفصل الثاني — المرونة، قانون هوك، الإجهاد والمطاوعة، ومعامل يونك للمواد"
      badge="الصف الرابع العلمي"
      topic="الخصائص الميكانيكية للمادة"
    >
      <div className="space-y-6">
        {/* Mode Selector */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            type="button"
            onClick={() => setMode('spring')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'spring'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            تجربة النابض الحلزوني (قانون هوك F = k Δx)
          </button>
          <button
            type="button"
            onClick={() => setMode('wire')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'wire'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            شد الأسلاك وحساب معامل يونك (Young's Modulus)
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Visual Canvas Area */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex flex-col items-center justify-center p-4">
              <canvas
                ref={canvasRef}
                width={600}
                height={290}
                className="w-full max-w-[600px] h-auto aspect-[600/290] block select-none"
              />

              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-400">
                {mode === 'spring' ? 'F = k · Δx' : 'Y = (F · L₀) / (A · ΔL)'}
              </div>
            </div>

            <SimulationHUD metrics={hudMetrics} />

            {/* Hooke Linear Region Graph Preview */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-600" />
                  <span>منحنى القوة والاستطالة (قانون هوك وحد المرونة):</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  معامل يونك = {(currentMat.youngModulusPa / 1e9).toFixed(0)} GPa
                </span>
              </div>

              {/* Hooke Curve SVG */}
              <div className="h-28 w-full bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 p-3 relative">
                <svg className="w-full h-full" viewBox="0 0 400 90">
                  <line x1="30" y1="75" x2="380" y2="75" stroke="#475569" strokeWidth="1.5" />
                  <line x1="30" y1="10" x2="30" y2="75" stroke="#475569" strokeWidth="1.5" />
                  <text x="370" y="86" fill="#94a3b8" fontSize="9" textAnchor="end">الاستطالة Δx</text>
                  <text x="35" y="15" fill="#94a3b8" fontSize="9">القوة F</text>

                  {/* Linear Elastic Line */}
                  <line x1="30" y1="75" x2="250" y2="25" stroke="#06b6d4" strokeWidth="2.5" />

                  {/* Elastic Limit Mark */}
                  <circle cx="250" cy="25" r="3.5" fill="#f59e0b" />
                  <text x="250" y="18" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">
                    حد المرونة
                  </text>

                  {/* Plastic Deformation dashed line beyond limit */}
                  <path d="M 250 25 Q 310 20 360 40" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="350" y="55" fill="#ef4444" fontSize="8">منطقة التشوه الدائم</text>
                </svg>
              </div>
            </div>

            {/* Educational Callout */}
            <div
              className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                result.isWithinElasticLimit
                  ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-900 dark:text-cyan-200'
                  : 'bg-red-500/10 border-red-500/20 text-red-900 dark:text-red-200'
              }`}
            >
              <p className="font-bold flex items-center gap-1.5">
                {result.isWithinElasticLimit ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                )}
                <span>التحليل المنهجي للخصائص الميكانيكية:</span>
              </p>
              <p>{result.statusExplanationAr}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                قانون هوك: تتناسب الاستطالة طردياً مع القوة المؤثرة ضمن حدود المرونة. خارج حد المرونة تعاني المادة تشوهاً لزجاً دائماً ولا تعود لشكلها الأصلي.
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <SimulationControls
              title="معاملات القوة والمادة"
              onReset={handleReset}
            >
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>القوة المؤثرة المسلطة (F)</span>
                    <span className="font-mono text-amber-500">{appliedForceN} N</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={200}
                    step={5}
                    value={appliedForceN}
                    onChange={(e) => setAppliedForceN(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>0 N</span>
                    <span>100 N</span>
                    <span>200 N</span>
                  </div>
                </div>

                {mode === 'spring' ? (
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span>ثابت صلابة النابض (k)</span>
                      <span className="font-mono text-cyan-600 dark:text-cyan-400">{springConstantK} N/m</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={150}
                      step={5}
                      value={springConstantK}
                      onChange={(e) => setSpringConstantK(Number(e.target.value))}
                      className="w-full accent-cyan-600 cursor-pointer"
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>الطول الأصلي للسلك (L₀)</span>
                        <span className="font-mono text-cyan-600 dark:text-cyan-400">{originalLengthM} m</span>
                      </div>
                      <input
                        type="range"
                        min={0.5}
                        max={5}
                        step={0.5}
                        value={originalLengthM}
                        onChange={(e) => setOriginalLengthM(Number(e.target.value))}
                        className="w-full accent-cyan-600 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>مساحة المقطع العرضي للسلك (A)</span>
                        <span className="font-mono text-indigo-500">{crossSectionAreaMm2} mm²</span>
                      </div>
                      <input
                        type="range"
                        min={0.2}
                        max={5}
                        step={0.2}
                        value={crossSectionAreaMm2}
                        onChange={(e) => setCrossSectionAreaMm2(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>
                  </>
                )}

                {/* Material Presets */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 block">نوع مادة السلك:</span>
                  <div className="grid grid-cols-2 gap-1.5 text-xs font-bold">
                    {ELASTIC_MATERIALS.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedMaterialId(m.id)}
                        className={`p-2 rounded-xl text-right transition-all ${
                          materialId === m.id
                            ? 'bg-cyan-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <p>{m.nameAr.split('(')[0]}</p>
                        <span className="text-[10px] font-mono opacity-80">
                          {(m.youngModulusPa / 1e9).toFixed(0)} GPa
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </SimulationControls>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
