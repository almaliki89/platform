import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateCircuit, generateVICharacteristic } from './calculations';
import { CircuitMode } from './types';
import { Zap, RotateCcw, Activity, GitFork, ArrowRight, Sparkles } from 'lucide-react';

export const ElectricCurrentSimulation: React.FC = () => {
  const [mode, setMode] = useState<CircuitMode>('series');
  const [voltageV, setVoltageV] = useState<number>(12);
  const [r1Ohm, setR1Ohm] = useState<number>(4);
  const [r2Ohm, setR2Ohm] = useState<number>(6);
  const [hasR3, setHasR3] = useState<boolean>(false);
  const [r3Ohm, setR3Ohm] = useState<number>(12);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animOffsetRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  const resistances = hasR3 ? [r1Ohm, r2Ohm, r3Ohm] : [r1Ohm, r2Ohm];
  const activeResistances = mode === 'single' ? [r1Ohm] : resistances;
  const circuitResult = calculateCircuit(mode, voltageV, activeResistances);
  const viPoints = generateVICharacteristic(circuitResult.equivalentResistanceOhm, 24);

  // Animation Loop for Current flow dots
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

      // Update flow offset proportional to current
      const flowSpeed = Math.min(6, Math.max(0.5, circuitResult.totalCurrentA * 0.8));
      animOffsetRef.current = (animOffsetRef.current + flowSpeed) % 20;

      // Draw Circuit Schematic based on mode
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;

      const left = 60;
      const right = width - 60;
      const top = 50;
      const bottom = height - 50;

      // Main Outer Loop Wires
      ctx.beginPath();
      ctx.moveTo(left, top);
      ctx.lineTo(right, top);
      ctx.lineTo(right, bottom);
      ctx.lineTo(left, bottom);
      ctx.lineTo(left, top);
      ctx.stroke();

      // Battery on Left Wire
      const batY = (top + bottom) / 2;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(left - 12, batY - 26, 24, 52);

      // Long positive plate
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(left - 15, batY - 14);
      ctx.lineTo(left + 15, batY - 14);
      ctx.stroke();

      // Short thick negative plate
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(left - 9, batY + 14);
      ctx.lineTo(left + 9, batY + 14);
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('+', left + 22, batY - 12);
      ctx.fillStyle = '#3b82f6';
      ctx.fillText('−', left + 22, batY + 16);

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`V = ${voltageV}V`, left - 20, batY + 4);

      // Resistors on Top or Branches
      if (mode === 'single') {
        const rX = (left + right) / 2;
        drawResistor(ctx, rX, top, r1Ohm, 'R₁', circuitResult.resistorVoltagesV[0], circuitResult.branchCurrentsA[0]);
      } else if (mode === 'series') {
        const count = activeResistances.length;
        const span = (right - left) / (count + 1);
        activeResistances.forEach((r, idx) => {
          const rx = left + span * (idx + 1);
          drawResistor(
            ctx,
            rx,
            top,
            r,
            `R${idx + 1}`,
            circuitResult.resistorVoltagesV[idx],
            circuitResult.branchCurrentsA[idx]
          );
        });
      } else {
        // Parallel Mode: Draw branches
        const rX = (left + right) / 2;
        const branchGap = 65;
        const branchY1 = (top + bottom) / 2 - (hasR3 ? branchGap : branchGap / 2);
        const branchY2 = (top + bottom) / 2 + (hasR3 ? 0 : branchGap / 2);
        const branchY3 = (top + bottom) / 2 + branchGap;

        // Vertical split wires
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;

        // Middle wire branch 1
        ctx.beginPath();
        ctx.moveTo(left + 100, branchY1);
        ctx.lineTo(right - 100, branchY1);
        ctx.stroke();

        // Middle wire branch 2
        ctx.beginPath();
        ctx.moveTo(left + 100, branchY2);
        ctx.lineTo(right - 100, branchY2);
        ctx.stroke();

        if (hasR3) {
          ctx.beginPath();
          ctx.moveTo(left + 100, branchY3);
          ctx.lineTo(right - 100, branchY3);
          ctx.stroke();
        }

        // Connection verticals
        ctx.beginPath();
        ctx.moveTo(left + 100, branchY1);
        ctx.lineTo(left + 100, hasR3 ? branchY3 : branchY2);
        ctx.moveTo(right - 100, branchY1);
        ctx.lineTo(right - 100, hasR3 ? branchY3 : branchY2);
        ctx.stroke();

        drawResistor(ctx, rX, branchY1, r1Ohm, 'R₁', circuitResult.resistorVoltagesV[0], circuitResult.branchCurrentsA[0]);
        drawResistor(ctx, rX, branchY2, r2Ohm, 'R₂', circuitResult.resistorVoltagesV[1], circuitResult.branchCurrentsA[1]);
        if (hasR3) {
          drawResistor(ctx, rX, branchY3, r3Ohm, 'R₃', circuitResult.resistorVoltagesV[2], circuitResult.branchCurrentsA[2]);
        }
      }

      // Draw Electron dots moving in circuit (conventional current from + to -)
      const offset = animOffsetRef.current;
      ctx.fillStyle = '#fef08a';
      // Top wire dots (moving right)
      for (let x = left + 20; x < right - 20; x += 30) {
        ctx.beginPath();
        ctx.arc((x + offset) % (right - 20), top, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      // Right wire dots (moving down)
      for (let y = top + 20; y < bottom - 20; y += 30) {
        ctx.beginPath();
        ctx.arc(right, (y + offset) % (bottom - 20), 3, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [mode, voltageV, r1Ohm, r2Ohm, r3Ohm, hasR3, activeResistances, circuitResult]);

  function drawResistor(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    ohm: number,
    label: string,
    vDrop: number,
    iBranch: number
  ) {
    const rw = 56;
    const rh = 22;

    // Resistor Box
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(cx - rw / 2, cy - rh / 2, rw, rh);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.strokeRect(cx - rw / 2, cy - rh / 2, rw, rh);

    // Resistor Bands (decorative color bands)
    const bandWidth = 4;
    const colors = ['#f59e0b', '#ef4444', '#10b981', '#a855f7'];
    colors.forEach((c, idx) => {
      ctx.fillStyle = c;
      ctx.fillRect(cx - rw / 2 + 10 + idx * 10, cy - rh / 2 + 2, bandWidth, rh - 4);
    });

    // Label & Values
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${label} = ${ohm} Ω`, cx, cy - rh / 2 - 8);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.fillText(`${vDrop.toFixed(1)}V | ${iBranch.toFixed(2)}A`, cx, cy + rh / 2 + 15);
  }

  const handleReset = () => {
    setVoltageV(12);
    setR1Ohm(4);
    setR2Ohm(6);
    setHasR3(false);
    setR3Ohm(12);
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'التيار الكلي (I)',
      value: `${circuitResult.totalCurrentA.toFixed(2)} A`,
      color: 'cyan',
    },
    {
      label: 'المقاومة المكافئة (Req)',
      value: `${circuitResult.equivalentResistanceOhm.toFixed(2)} Ω`,
      color: 'amber',
    },
    {
      label: 'فرق الجهد الكلي (V)',
      value: `${voltageV.toFixed(1)} V`,
      color: 'slate',
    },
    {
      label: 'القدرة الكهربائية الكلية (P)',
      value: `${circuitResult.totalPowerW.toFixed(1)} W`,
      color: 'emerald',
    },
  ];

  return (
    <SimulationShell
      title="مختبر التيار الكهربائي وقانون أوم"
      subtitle="الفصل الثالث — ربط المقاومات على التوالي والتوازي، قانون أوم، ومنحنى الجهد والتيار"
      badge="الصف الثالث المتوسط"
      topic="التيار الكهربائي وقانون أوم"
    >
      <div className="space-y-6">
        {/* Circuit Mode Selector */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            type="button"
            onClick={() => setMode('single')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'single'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            مقاومة منفردة (قانون أوم)
          </button>
          <button
            type="button"
            onClick={() => setMode('series')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'series'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>ربط التوالي (Series)</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('parallel')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'parallel'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>ربط التوازي (Parallel)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visual & Graph */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex flex-col items-center justify-center p-4">
              <canvas
                ref={canvasRef}
                width={600}
                height={280}
                className="w-full max-w-[600px] h-auto aspect-[600/280] block select-none"
              />

              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-400">
                {circuitResult.formulaSummaryAr}
              </div>
            </div>

            <SimulationHUD metrics={hudMetrics} />

            {/* V-I Ohm's Law Graph */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-600" />
                  <span>منحنى العلاقة البيانية بين الجهد والتيار (V - I)</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  ميل الخط = المقاومة R = {(1 / (circuitResult.totalCurrentA / (voltageV || 1))).toFixed(1)} Ω
                </span>
              </div>

              {/* SVG Line Graph */}
              <div className="h-32 w-full flex items-end gap-1 pt-4 pb-2 px-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100">
                  {/* Axis */}
                  <line x1="20" y1="90" x2="380" y2="90" stroke="#475569" strokeWidth="1.5" />
                  <line x1="20" y1="10" x2="20" y2="90" stroke="#475569" strokeWidth="1.5" />

                  {/* Labels */}
                  <text x="375" y="98" fill="#94a3b8" fontSize="9" textAnchor="end">الجهد V</text>
                  <text x="25" y="15" fill="#94a3b8" fontSize="9">التيار I</text>

                  {/* Graph Line */}
                  <polyline
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2.5"
                    points={viPoints
                      .map((p) => {
                        const x = 20 + (p.voltage / 24) * 350;
                        const maxI = 24 / circuitResult.equivalentResistanceOhm;
                        const y = 90 - (p.current / (maxI || 1)) * 75;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />

                  {/* Operating Point */}
                  {(() => {
                    const opX = 20 + (voltageV / 24) * 350;
                    const maxI = 24 / circuitResult.equivalentResistanceOhm;
                    const opY = 90 - (circuitResult.totalCurrentA / (maxI || 1)) * 75;
                    return (
                      <g>
                        <circle cx={opX} cy={opY} r="5" fill="#ef4444" />
                        <text x={opX} y={opY - 8} fill="#ef4444" fontSize="9" fontWeight="bold" textAnchor="middle">
                          ({voltageV}V, {circuitResult.totalCurrentA.toFixed(2)}A)
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>
            </div>

            {/* Physics Explanation Callout */}
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-900 dark:text-cyan-200 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>الاستنتاج العلمي وفق المنهاج الوزاري:</span>
              </p>
              <p>{circuitResult.descriptionAr}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <SimulationControls
              title="معاملات الدائرة الكهربائية"
              onReset={handleReset}
            >
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>فرق جهد المصدر (V)</span>
                    <span className="font-mono text-cyan-600 dark:text-cyan-400">{voltageV} V</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={24}
                    step={1}
                    value={voltageV}
                    onChange={(e) => setVoltageV(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>1 V</span>
                    <span>12 V</span>
                    <span>24 V</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>المقاومة الأولى (R₁)</span>
                    <span className="font-mono text-cyan-600 dark:text-cyan-400">{r1Ohm} Ω</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    step={1}
                    value={r1Ohm}
                    onChange={(e) => setR1Ohm(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                </div>

                {mode !== 'single' && (
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span>المقاومة الثانية (R₂)</span>
                      <span className="font-mono text-cyan-600 dark:text-cyan-400">{r2Ohm} Ω</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={50}
                      step={1}
                      value={r2Ohm}
                      onChange={(e) => setR2Ohm(Number(e.target.value))}
                      className="w-full accent-cyan-600 cursor-pointer"
                    />
                  </div>
                )}

                {mode !== 'single' && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                    <label className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer mb-2">
                      <span>إضافة مقاومة ثالثة (R₃)</span>
                      <input
                        type="checkbox"
                        checked={hasR3}
                        onChange={(e) => setHasR3(e.target.checked)}
                        className="rounded accent-cyan-600"
                      />
                    </label>

                    {hasR3 && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                          <span>قيمة المقاومة الثالثة (R₃)</span>
                          <span className="font-mono text-cyan-600 dark:text-cyan-400">{r3Ohm} Ω</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={50}
                          step={1}
                          value={r3Ohm}
                          onChange={(e) => setR3Ohm(Number(e.target.value))}
                          className="w-full accent-cyan-600 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Table of branch values */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-[11px] font-bold text-slate-500 mb-2">توزيع الجهود والتيارات:</p>
                  <div className="space-y-1.5">
                    {activeResistances.map((r, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs"
                      >
                        <span className="font-bold text-slate-700 dark:text-slate-300">
                          R{i + 1} ({r} Ω)
                        </span>
                        <div className="flex items-center gap-3 font-mono text-[11px]">
                          <span className="text-cyan-600 dark:text-cyan-400">
                            V = {circuitResult.resistorVoltagesV[i]?.toFixed(1)} V
                          </span>
                          <span className="text-amber-600 dark:text-amber-400">
                            I = {circuitResult.branchCurrentsA[i]?.toFixed(2)} A
                          </span>
                        </div>
                      </div>
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
