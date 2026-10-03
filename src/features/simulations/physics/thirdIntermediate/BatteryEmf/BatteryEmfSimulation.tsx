import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateBatteryCircuit } from './calculations';
import { Battery, Power, ToggleLeft, ToggleRight, Sparkles, Activity, ShieldCheck } from 'lucide-react';

export const BatteryEmfSimulation: React.FC = () => {
  const [emfV, setEmfV] = useState<number>(12);
  const [internalResistanceOhm, setInternalResistanceOhm] = useState<number>(1.5);
  const [loadResistanceOhm, setLoadResistanceOhm] = useState<number>(8.5);
  const [isSwitchClosed, setIsSwitchClosed] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const flowOffsetRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  const result = calculateBatteryCircuit(emfV, internalResistanceOhm, loadResistanceOhm, isSwitchClosed);

  // Render circuit animation
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

      const left = 70;
      const right = width - 70;
      const top = 55;
      const bottom = height - 55;

      // Update flow offset
      if (isSwitchClosed && result.currentA > 0) {
        flowOffsetRef.current = (flowOffsetRef.current + Math.min(5, result.currentA * 1.5)) % 25;
      }

      // Main Loop Wire
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.moveTo(left, top);
      ctx.lineTo(right, top);
      ctx.lineTo(right, bottom);
      ctx.lineTo(left, bottom);
      ctx.lineTo(left, top);
      ctx.stroke();

      // Battery Enclosure (Dashed Orange Box showing real battery package)
      const batCenterY = (top + bottom) / 2;
      const batW = 54;
      const batH = 120;
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(left - batW / 2, batCenterY - batH / 2, batW, batH);
      ctx.setLineDash([]);

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('البطارية الحقيقية', left, batCenterY - batH / 2 - 8);

      // 1. Ideal EMF source inside battery
      const emfY = batCenterY - 26;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(left - 15, emfY - 14, 30, 28);

      // Long positive plate
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(left - 14, emfY - 8);
      ctx.lineTo(left + 14, emfY - 8);
      ctx.stroke();

      // Short negative plate
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(left - 8, emfY + 8);
      ctx.lineTo(left + 8, emfY + 8);
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`ε = ${emfV}V`, left - 32, emfY + 4);

      // 2. Internal Resistor r inside battery
      const rY = batCenterY + 28;
      ctx.fillStyle = '#334155';
      ctx.fillRect(left - 12, rY - 10, 24, 20);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(left - 12, rY - 10, 24, 20);

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 10px monospace';
      ctx.fillText(`r=${internalResistanceOhm}Ω`, left - 32, rY + 4);

      // Terminals A and B
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(left, batCenterY - batH / 2, 4, 0, Math.PI * 2);
      ctx.arc(left, batCenterY + batH / 2, 4, 0, Math.PI * 2);
      ctx.fill();

      // Voltmeter attached across terminals A & B
      const vmX = left - 55;
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(left, batCenterY - batH / 2);
      ctx.lineTo(vmX, batCenterY - batH / 2);
      ctx.lineTo(vmX, batCenterY - 18);

      ctx.moveTo(left, batCenterY + batH / 2);
      ctx.lineTo(vmX, batCenterY + batH / 2);
      ctx.lineTo(vmX, batCenterY + 18);
      ctx.stroke();

      // Voltmeter Dial
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(vmX, batCenterY, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('V', vmX, batCenterY);

      ctx.font = 'bold 10px monospace';
      ctx.fillText(`${result.terminalVoltageV.toFixed(2)}V`, vmX, batCenterY + 32);

      // Top Switch
      const switchX = (left + right) / 2 - 40;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(switchX - 20, top - 10, 40, 20);

      ctx.strokeStyle = isSwitchClosed ? '#10b981' : '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(switchX - 12, top, 3, 0, Math.PI * 2);
      ctx.arc(switchX + 12, top, 3, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(switchX - 12, top);
      if (isSwitchClosed) {
        ctx.lineTo(switchX + 12, top);
      } else {
        ctx.lineTo(switchX + 8, top - 15);
      }
      ctx.stroke();

      ctx.fillStyle = isSwitchClosed ? '#10b981' : '#ef4444';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText(isSwitchClosed ? 'مغلق' : 'مفتوح', switchX, top - 18);

      // Right Load Resistor R
      const loadY = (top + bottom) / 2;
      const lw = 28;
      const lh = 60;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(right - lw / 2, loadY - lh / 2, lw, lh);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(right - lw / 2, loadY - lh / 2, lw, lh);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`R = ${loadResistanceOhm} Ω`, right + 45, loadY - 6);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(`P = ${result.powerLoadW.toFixed(1)}W`, right + 45, loadY + 12);

      // Bottom Ammeter
      const amX = (left + right) / 2;
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(amX, bottom, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('A', amX, bottom);

      ctx.font = 'bold 10px monospace';
      ctx.fillText(`${result.currentA.toFixed(2)}A`, amX, bottom + 26);

      // Current Flow Dots when closed
      if (isSwitchClosed && result.currentA > 0) {
        const offset = flowOffsetRef.current;
        ctx.fillStyle = '#fef08a';
        for (let x = left + 20; x < right - 20; x += 30) {
          ctx.beginPath();
          ctx.arc((x + offset) % (right - 20), top, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [emfV, internalResistanceOhm, loadResistanceOhm, isSwitchClosed, result]);

  const handleReset = () => {
    setEmfV(12);
    setInternalResistanceOhm(1.5);
    setLoadResistanceOhm(8.5);
    setIsSwitchClosed(true);
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'فرق الجهد بين القطبين (V_terminal)',
      value: `${result.terminalVoltageV.toFixed(2)} V`,
      color: 'cyan',
    },
    {
      label: 'تيار الدائرة الكلي (I)',
      value: `${result.currentA.toFixed(2)} A`,
      color: 'amber',
    },
    {
      label: 'الهبوط في الجهد الداخلي (I·r)',
      value: `${result.internalDropV.toFixed(2)} V`,
      color: 'red',
    },
    {
      label: 'كفاءة البطارية (η)',
      value: `${result.efficiencyPercent.toFixed(1)} %`,
      color: 'emerald',
    },
  ];

  return (
    <SimulationShell
      title="مختبر البطارية والقوة الدافعة الكهربائية (emf)"
      subtitle="الفصل الرابع — دراسة القوة الدافعة الكهربائية، المقاومة الداخلية للبطارية، وفرق الجهد بين القطبين"
      badge="الصف الثالث المتوسط"
      topic="البطارية والقوة الدافعة الكهربائية"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Circuit Canvas */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex flex-col items-center justify-center p-4">
            <canvas
              ref={canvasRef}
              width={600}
              height={300}
              className="w-full max-w-[600px] h-auto aspect-[600/300] block select-none"
            />

            {/* Formula Overlay */}
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-400">
              V_terminal = ε - I · r
            </div>

            {/* Switch Toggle Button inside canvas area for quick tactile feel */}
            <button
              type="button"
              onClick={() => setIsSwitchClosed(!isSwitchClosed)}
              className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 transition-all cursor-pointer shadow-md"
            >
              <Power className={`w-3.5 h-3.5 ${isSwitchClosed ? 'text-emerald-400' : 'text-red-400'}`} />
              <span>{isSwitchClosed ? 'فتح المفتاح' : 'غلق المفتاح'}</span>
            </button>
          </div>

          <SimulationHUD metrics={hudMetrics} />

          {/* Educational Callout */}
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-900 dark:text-cyan-200 space-y-1.5">
            <p className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>القاعدة الفيزيائية (منهاج الصف الثالث المتوسط):</span>
            </p>
            <p>{result.stateExplanationAr}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              العلاقة: I = ε / (R + r). عندما تكون الدائرة مفتوحة، فإن I = 0، وبالتالي قراءة الفولطميتر تساوي القوة الدافعة الكهربائية تماماً (V = ε).
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <SimulationControls
            title="معاملات البطارية والدائرة"
            onReset={handleReset}
          >
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>القوة الدافعة الكهربائية (ε)</span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400">{emfV} V</span>
                </div>
                <input
                  type="range"
                  min={1.5}
                  max={24}
                  step={0.5}
                  value={emfV}
                  onChange={(e) => setEmfV(Number(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer"
                />
                <div className="flex gap-1.5 mt-2">
                  {[1.5, 6, 9, 12].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setEmfV(v)}
                      className={`flex-1 py-1 rounded-lg text-[10px] font-bold ${
                        emfV === v
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {v}V
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>المقاومة الداخلية للبطارية (r)</span>
                  <span className="font-mono text-red-500">{internalResistanceOhm} Ω</span>
                </div>
                <input
                  type="range"
                  min={0.1}
                  max={5}
                  step={0.1}
                  value={internalResistanceOhm}
                  onChange={(e) => setInternalResistanceOhm(Number(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>0.1 Ω (بطارية مثالية)</span>
                  <span>5.0 Ω (مقاومة عالية)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>مقاومة الحمل الخارجي (R)</span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400">{loadResistanceOhm} Ω</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={40}
                  step={0.5}
                  value={loadResistanceOhm}
                  onChange={(e) => setLoadResistanceOhm(Number(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer"
                />
              </div>

              {/* Energy Split Breakdown */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  توزيع القدرة الكهربائية:
                </span>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">قدرة الحمل المفيدة:</span>
                    <span className="font-mono">{result.powerLoadW.toFixed(2)} W</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <span className="text-red-500 font-bold">القدرة الضائعة حرارياً بالبطارية:</span>
                    <span className="font-mono">{result.powerWastedW.toFixed(2)} W</span>
                  </div>
                </div>
              </div>
            </div>
          </SimulationControls>
        </div>
      </div>
    </SimulationShell>
  );
};
