import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateCoulombForce, CHARGING_METHODS } from './calculations';
import { ChargingMethod } from './types';
import { Zap, RotateCcw, ArrowLeftRight, Layers, Sparkles, ShieldAlert } from 'lucide-react';

export const ElectrostaticsSimulation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'coulomb' | 'charging'>('coulomb');

  // Coulomb controls
  const [q1MicroC, setQ1MicroC] = useState<number>(5);
  const [q2MicroC, setQ2MicroC] = useState<number>(-5);
  const [distanceM, setDistanceM] = useState<number>(0.15); // 15 cm
  const [showFieldLines, setShowFieldLines] = useState<boolean>(true);

  // Charging methods state
  const [selectedMethod, setSelectedMethod] = useState<ChargingMethod>('induction');
  const [inductionStep, setInductionStep] = useState<number>(1);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const coulombResult = calculateCoulombForce(q1MicroC, q2MicroC, distanceM);

  // Canvas drawing for Coulomb Law
  useEffect(() => {
    if (activeTab !== 'coulomb') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Background grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    const gridSize = 30;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Positions of q1 and q2 on canvas
    // Map distanceM (0.02m to 0.50m) to pixel span (80px to 460px)
    const minM = 0.02;
    const maxM = 0.5;
    const minPx = 90;
    const maxPx = width - 120;
    const pixelDistance = minPx + ((distanceM - minM) / (maxM - minM)) * (maxPx - minPx);

    const x1 = width / 2 - pixelDistance / 2;
    const x2 = width / 2 + pixelDistance / 2;

    // Field Lines rendering
    if (showFieldLines && (q1MicroC !== 0 || q2MicroC !== 0)) {
      ctx.lineWidth = 1.5;
      const numLines = 14;
      const stepAngle = (2 * Math.PI) / numLines;

      for (let i = 0; i < numLines; i++) {
        const angle = i * stepAngle;
        ctx.beginPath();
        const startX = x1 + Math.cos(angle) * 25;
        const startY = centerY + Math.sin(angle) * 25;
        ctx.moveTo(startX, startY);

        if (coulombResult.isAttractive) {
          // Curved field lines connecting opposite charges
          const destAngle = Math.PI - angle;
          const endX = x2 + Math.cos(destAngle) * 25;
          const endY = centerY + Math.sin(destAngle) * 25;
          const cpX = (x1 + x2) / 2;
          const cpY = centerY + Math.sin(angle) * (pixelDistance * 0.4);

          ctx.strokeStyle = q1MicroC > 0 ? 'rgba(239, 68, 68, 0.35)' : 'rgba(59, 130, 246, 0.35)';
          ctx.quadraticCurveTo(cpX, cpY, endX, endY);
          ctx.stroke();
        } else {
          // Repelling field lines diverging away from center
          const len = 70;
          const dirX = Math.cos(angle);
          const dirY = Math.sin(angle);
          const endX = startX + (dirX * len) - (q1MicroC !== 0 ? (dirX < 0 ? 30 : -10) : 0);
          const endY = startY + dirY * len;

          ctx.strokeStyle = q1MicroC > 0 ? 'rgba(239, 68, 68, 0.35)' : 'rgba(59, 130, 246, 0.35)';
          ctx.lineTo(endX, endY);
          ctx.stroke();

          // Also for q2
          ctx.beginPath();
          const start2X = x2 + Math.cos(angle) * 25;
          const start2Y = centerY + Math.sin(angle) * 25;
          ctx.moveTo(start22X_placeholder(start2X), start2Y);
          ctx.lineTo(start2X + Math.cos(angle) * len, start2Y + Math.sin(angle) * len);
          ctx.stroke();
        }
      }
    }

    function start22X_placeholder(v: number) {
      return v;
    }

    // Separation dimension line
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(x1, centerY + 55);
    ctx.lineTo(x2, centerY + 55);
    ctx.stroke();
    ctx.setLineDash([]);

    // End ticks
    ctx.beginPath();
    ctx.moveTo(x1, centerY + 48);
    ctx.lineTo(x1, centerY + 62);
    ctx.moveTo(x2, centerY + 48);
    ctx.lineTo(x2, centerY + 62);
    ctx.stroke();

    // Distance label
    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`r = ${(distanceM * 100).toFixed(1)} cm`, (x1 + x2) / 2, centerY + 75);

    // Draw Force Vectors
    if (!coulombResult.isZero) {
      const maxForceForScale = 50;
      const normalizedForce = Math.min(1, coulombResult.forceN / maxForceForScale);
      const arrowLength = 35 + normalizedForce * 55;

      // Force on q1
      const dir1 = coulombResult.isRepulsive ? -1 : 1;
      drawArrow(ctx, x1, centerY, x1 + dir1 * arrowLength, centerY, '#eab308', 'F₁₂');

      // Force on q2
      const dir2 = coulombResult.isRepulsive ? 1 : -1;
      drawArrow(ctx, x2, centerY, x2 + dir2 * arrowLength, centerY, '#eab308', 'F₂₁');
    }

    // Draw Charge 1
    drawChargeSphere(ctx, x1, centerY, q1MicroC, 'q₁');

    // Draw Charge 2
    drawChargeSphere(ctx, x2, centerY, q2MicroC, 'q₂');
  }, [activeTab, q1MicroC, q2MicroC, distanceM, showFieldLines, coulombResult]);

  function drawChargeSphere(
    ctx: CanvasContext2D,
    x: number,
    y: number,
    chargeVal: number,
    label: string
  ) {
    const isPos = chargeVal > 0;
    const isZero = chargeVal === 0;
    const radius = 26;

    // Outer glow
    const gradient = ctx.createRadialGradient(x, y, 5, x, y, radius + 12);
    if (isZero) {
      gradient.addColorStop(0, 'rgba(148, 163, 184, 0.4)');
      gradient.addColorStop(1, 'rgba(148, 163, 184, 0)');
    } else if (isPos) {
      gradient.addColorStop(0, 'rgba(239, 68, 68, 0.5)');
      gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
    } else {
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    }

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius + 12, 0, Math.PI * 2);
    ctx.fill();

    // Sphere fill
    ctx.fillStyle = isZero ? '#64748b' : isPos ? '#ef4444' : '#3b82f6';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Sphere border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Sign text (+ or - or 0)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(isZero ? '0' : isPos ? '+' : '−', x, y);

    // Charge magnitude label
    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(`${label} = ${chargeVal > 0 ? '+' : ''}${chargeVal} μC`, x, y - radius - 10);
  }

  type CanvasContext2D = CanvasRenderingContext2D;

  function drawArrow(
    ctx: CanvasContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    color: string,
    label: string
  ) {
    const headLen = 10;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();

    // Label
    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(label, (fromX + toX) / 2, fromY - 12);
  }

  const handleReset = () => {
    setQ1MicroC(5);
    setQ2MicroC(-5);
    setDistanceM(0.15);
    setShowFieldLines(true);
    setInductionStep(1);
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'القوة المتبادلة (F)',
      value:
        coulombResult.forceN >= 1000
          ? `${coulombResult.forceN.toExponential(2)} N`
          : `${coulombResult.forceN.toFixed(2)} N`,
      color: coulombResult.isRepulsive ? 'amber' : 'cyan',
    },
    {
      label: 'طبيعة القوة',
      value: coulombResult.isZero ? 'معدومة' : coulombResult.isRepulsive ? 'تنافر (Repulsion)' : 'تجاذب (Attraction)',
      color: coulombResult.isRepulsive ? 'red' : 'emerald',
    },
    {
      label: 'المسافة الفاصلة (r)',
      value: `${(distanceM * 100).toFixed(1)} cm`,
      color: 'slate',
    },
    {
      label: 'شدة المجال بالمنتصف',
      value: `${(coulombResult.fieldAtMidpointN_C / 1000).toFixed(1)} kN/C`,
      color: 'cyan',
    },
  ];

  const currentMethod = CHARGING_METHODS.find((m) => m.id === selectedMethod) || CHARGING_METHODS[0];

  return (
    <SimulationShell
      title="مختبر الكهربائية الساكنة وقانون كولوم"
      subtitle="الفصل الأول — استكشاف تفاعل الشحنات الكهربائية، طرائق الشحن، وقانون كولوم"
      badge="الصف الثالث المتوسط"
      topic="الكهربائية الساكنة"
    >
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('coulomb')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'coulomb'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>قانون كولوم وخطوط المجال</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('charging')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'charging'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>طرائق الشحن الكهربائي (الدلك، التماس، الحث)</span>
          </button>
        </div>

        {activeTab === 'coulomb' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visual Canvas Area */}
            <div className="lg:col-span-2 space-y-4">
              <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex flex-col items-center justify-center p-4">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={320}
                  className="w-full max-w-[600px] h-auto aspect-[600/320] block"
                />

                {/* Formula Overlay */}
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-400">
                  F = k · |q₁ · q₂| / r²
                </div>

                <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur border border-slate-700/60 px-3 py-1 rounded-lg text-[11px] text-slate-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> موجبة (+)
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block ml-2" /> سالبة (−)
                </div>
              </div>

              {/* HUD Metrics */}
              <SimulationHUD metrics={hudMetrics} />

              {/* Physics Explanation Callout */}
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-900 dark:text-cyan-200 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>التحليل الفيزيائي للشحنتين:</span>
                </p>
                <p>{coulombResult.descriptionAr}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  ثابت كولوم في الفراغ: k = 8.99 × 10⁹ N·m²/C². تتناسب القوة طردياً مع حاصل ضرب الشحنتين وعكسياً مع مربع البعد بينهما.
                </p>
              </div>
            </div>

            {/* Controls Panel */}
            <div className="space-y-4">
              <SimulationControls
                title="معاملات التجربة والشحنات"
                onReset={handleReset}
              >
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span>مقدار ونوع الشحنة الأولى (q₁)</span>
                      <span className="font-mono text-cyan-600 dark:text-cyan-400">
                        {q1MicroC > 0 ? `+${q1MicroC}` : q1MicroC} μC
                      </span>
                    </div>
                    <input
                      type="range"
                      min={-20}
                      max={20}
                      step={1}
                      value={q1MicroC}
                      onChange={(e) => setQ1MicroC(Number(e.target.value))}
                      className="w-full accent-cyan-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                      <span>-20 μC</span>
                      <span>0 μC</span>
                      <span>+20 μC</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span>مقدار ونوع الشحنة الثانية (q₂)</span>
                      <span className="font-mono text-cyan-600 dark:text-cyan-400">
                        {q2MicroC > 0 ? `+${q2MicroC}` : q2MicroC} μC
                      </span>
                    </div>
                    <input
                      type="range"
                      min={-20}
                      max={20}
                      step={1}
                      value={q2MicroC}
                      onChange={(e) => setQ2MicroC(Number(e.target.value))}
                      className="w-full accent-cyan-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                      <span>-20 μC</span>
                      <span>0 μC</span>
                      <span>+20 μC</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span>المسافة الفاصلة بين المركزين (r)</span>
                      <span className="font-mono text-cyan-600 dark:text-cyan-400">
                        {(distanceM * 100).toFixed(1)} cm
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.02}
                      max={0.5}
                      step={0.01}
                      value={distanceM}
                      onChange={(e) => setDistanceM(Number(e.target.value))}
                      className="w-full accent-cyan-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                      <span>2 cm</span>
                      <span>25 cm</span>
                      <span>50 cm</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={showFieldLines}
                        onChange={(e) => setShowFieldLines(e.target.checked)}
                        className="rounded accent-cyan-600"
                      />
                      <span>إظهار خطوط المجال الكهربائي المتبادلة</span>
                    </label>
                  </div>

                  {/* Preset Buttons */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                    <p className="text-[11px] font-bold text-slate-500">حالات تجريبية قياسية:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setQ1MicroC(10);
                          setQ2MicroC(-10);
                          setDistanceM(0.1);
                        }}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-right"
                      >
                        تجاذب قوي (+10 / -10)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setQ1MicroC(8);
                          setQ2MicroC(8);
                          setDistanceM(0.12);
                        }}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-right"
                      >
                        تنافر موجب (+8 / +8)
                      </button>
                    </div>
                  </div>
                </div>
              </SimulationControls>
            </div>
          </div>
        ) : (
          /* Charging Methods Visualizer */
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {CHARGING_METHODS.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => {
                    setSelectedMethod(method.id);
                    setInductionStep(1);
                  }}
                  className={`p-4 rounded-2xl border text-right transition-all cursor-pointer ${
                    selectedMethod === method.id
                      ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/30 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                    {method.titleAr}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {method.subtitleAr}
                  </p>
                </button>
              ))}
            </div>

            {/* Active Charging Method Detail Card */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-cyan-600 text-white">
                  {currentMethod.titleAr}
                </span>
                <span className="text-xs text-slate-400 font-medium">منهاج الفيزياء العراقي — الصف الثالث المتوسط</span>
              </div>

              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <p className="font-semibold text-slate-900 dark:text-white">آلية الشحن:</p>
                <p>{currentMethod.stepDescriptionAr}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200 dark:border-slate-700/60 text-xs">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">حاملات الشحنة:</span>
                  <span className="text-slate-600 dark:text-slate-400">{currentMethod.chargeCarrierAr}</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1">النتيجة النهائية للشحنة:</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{currentMethod.finalStateAr}</span>
                </div>
              </div>

              {selectedMethod === 'induction' && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700/60">
                  <p className="font-bold text-xs text-slate-900 dark:text-white mb-2">
                    خطوات الشحن بالحَث خطوة بخطوة:
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { step: 1, text: '١. تقريب الساق السالبة' },
                      { step: 2, text: '٢. تأريض الموصل (تسريب السالب)' },
                      { step: 3, text: '٣. قطع الاتصال بالأرض' },
                      { step: 4, text: '٤. إبعاد الساق وظهور الموجب' },
                    ].map((s) => (
                      <button
                        key={s.step}
                        type="button"
                        onClick={() => setInductionStep(s.step)}
                        className={`p-2.5 rounded-xl text-xs font-bold text-center transition-all ${
                          inductionStep === s.step
                            ? 'bg-cyan-600 text-white shadow-sm'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        {s.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </SimulationShell>
  );
};
