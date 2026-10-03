import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  calculateFirstLaw,
  calculatePvProcess,
  calculateHeatEngine,
} from './calculations';
import { ThermoMode, GasProcessType } from './types';
import { Flame, Gauge, Sparkles, ArrowRight, ArrowDown, Activity, RotateCcw } from 'lucide-react';

export const ThermodynamicsSimulation: React.FC = () => {
  const [mode, setMode] = useState<ThermoMode>('pv-processes');

  // PV Process state
  const [processType, setProcessType] = useState<GasProcessType>('isobaric');
  const [pInit, setPInit] = useState<number>(150); // kPa
  const [vInit, setVInit] = useState<number>(2.0); // L
  const [vTarget, setVTarget] = useState<number>(5.0); // L
  const [pTarget, setPTarget] = useState<number>(300); // kPa (for isochoric)

  // First Law state
  const [heatQ, setHeatQ] = useState<number>(500); // J
  const [workW, setWorkW] = useState<number>(200); // J

  // Heat Engine state
  const [tHot, setTHot] = useState<number>(600); // K
  const [tCold, setTCold] = useState<number>(300); // K
  const [qHot, setQHot] = useState<number>(1000); // J

  // Calculations
  const pvResult = calculatePvProcess(processType, pInit, vInit, vTarget, pTarget);
  const firstLawResult = calculateFirstLaw(heatQ, workW);
  const engineResult = calculateHeatEngine(tHot, tCold, qHot);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Deep tech background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    if (mode === 'pv-processes') {
      // P-V Diagram on the left, Piston Cylinder on the right
      const graphW = width * 0.55;
      const graphH = height - 80;
      const originX = 70;
      const originY = height - 50;

      // P-V Axes
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Y-axis (P in kPa)
      ctx.moveTo(originX, originY);
      ctx.lineTo(originX, 40);
      // X-axis (V in L)
      ctx.moveTo(originX, originY);
      ctx.lineTo(originX + graphW, originY);
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('الضغط P (kPa)', originX + 20, 30);
      ctx.textAlign = 'left';
      ctx.fillText('الحجم V (L)', originX + graphW - 20, originY + 30);

      // Grid & tick marks
      const maxP = 400; // kPa
      const maxV = 8; // Liters
      const scaleX = graphW / maxV;
      const scaleY = (originY - 50) / maxP;

      for (let v = 1; v <= maxV; v++) {
        const x = originX + v * scaleX;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.beginPath();
        ctx.moveTo(x, originY);
        ctx.lineTo(x, 40);
        ctx.stroke();
        ctx.fillStyle = '#64748b';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${v}`, x, originY + 16);
      }

      for (let p = 100; p <= maxP; p += 100) {
        const y = originY - p * scaleY;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.beginPath();
        ctx.moveTo(originX, y);
        ctx.lineTo(originX + graphW, y);
        ctx.stroke();
        ctx.fillStyle = '#64748b';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`${p}`, originX - 8, y + 4);
      }

      // Draw PV Curve & Shaded Work Area
      if (pvResult.pvCurvePoints.length > 0) {
        ctx.beginPath();
        const firstPt = pvResult.pvCurvePoints[0];
        ctx.moveTo(originX + firstPt.v * scaleX, originY - firstPt.p * scaleY);

        pvResult.pvCurvePoints.forEach((pt) => {
          ctx.lineTo(originX + pt.v * scaleX, originY - pt.p * scaleY);
        });

        // Stroke process curve
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Shaded area under curve (Work)
        if (processType !== 'isochoric') {
          const lastPt = pvResult.pvCurvePoints[pvResult.pvCurvePoints.length - 1];
          ctx.lineTo(originX + lastPt.v * scaleX, originY);
          ctx.lineTo(originX + firstPt.v * scaleX, originY);
          ctx.closePath();
          ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
          ctx.fill();
        }

        // Draw State Points A and B
        const ptA = pvResult.pvCurvePoints[0];
        const ptB = pvResult.pvCurvePoints[pvResult.pvCurvePoints.length - 1];

        // Point A
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(originX + ptA.v * scaleX, originY - ptA.p * scaleY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillText(
          `الحالة 1 (${ptA.p.toFixed(0)} kPa, ${ptA.v.toFixed(1)} L)`,
          originX + ptA.v * scaleX,
          originY - ptA.p * scaleY - 10
        );

        // Point B
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(originX + ptB.v * scaleX, originY - ptB.p * scaleY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#34d399';
        ctx.fillText(
          `الحالة 2 (${ptB.p.toFixed(0)} kPa, ${ptB.v.toFixed(1)} L)`,
          originX + ptB.v * scaleX,
          originY - ptB.p * scaleY - 10
        );
      }

      // Cylinder & Piston Visual on the right side
      const cylX = width * 0.65;
      const cylY = 80;
      const cylW = width * 0.3;
      const cylH = 140;

      // Cylinder outline
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(cylX, cylY, cylW, cylH);
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cylX, cylY);
      ctx.lineTo(cylX + cylW, cylY);
      ctx.lineTo(cylX + cylW, cylY + cylH);
      ctx.lineTo(cylX, cylY + cylH);
      ctx.stroke();

      // Piston position based on current V_final (proportional to cylW)
      const pistonRatio = Math.min(1.0, Math.max(0.2, pvResult.vFinalL / maxV));
      const pistonX = cylX + pistonRatio * (cylW - 20);

      // Gas volume inside cylinder
      const gasGrad = ctx.createLinearGradient(cylX, 0, pistonX, 0);
      const heatFactor = Math.min(1, Math.max(0, pvResult.pFinalKPa / 300));
      gasGrad.addColorStop(0, `rgba(239, 68, 68, ${0.15 + heatFactor * 0.25})`);
      gasGrad.addColorStop(1, `rgba(59, 130, 246, ${0.2 + (1 - heatFactor) * 0.2})`);
      ctx.fillStyle = gasGrad;
      ctx.fillRect(cylX, cylY + 2, pistonX - cylX, cylH - 4);

      // Gas particles
      ctx.fillStyle = '#f87171';
      for (let i = 0; i < 15; i++) {
        const px = cylX + 10 + ((i * 37) % Math.max(10, pistonX - cylX - 20));
        const py = cylY + 15 + ((i * 53) % (cylH - 30));
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Piston head
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(pistonX, cylY + 2, 16, cylH - 4);
      ctx.strokeStyle = '#f1f5f9';
      ctx.lineWidth = 2;
      ctx.strokeRect(pistonX, cylY + 2, 16, cylH - 4);

      // Piston shaft
      ctx.fillStyle = '#475569';
      ctx.fillRect(pistonX + 16, cylY + cylH / 2 - 8, cylW - (pistonX - cylX), 16);

      // Cylinder label
      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('أسطوانة الغاز المثالي مع المكبس', cylX + cylW / 2, cylY + cylH + 25);
      ctx.font = '11px Inter, sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(
        `الحجم: ${pvResult.vFinalL.toFixed(1)} L | الضغط: ${pvResult.pFinalKPa.toFixed(0)} kPa`,
        cylX + cylW / 2,
        cylY + cylH + 42
      );

      // Process Explanation banner inside canvas
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'left';
      ctx.font = '11px Inter, sans-serif';
      ctx.fillText(`المساحة تحت المنحنى = الشغل المنجز: W = ${pvResult.workDoneJ.toFixed(1)} J`, originX + 20, originY - 15);
    } else if (mode === 'heat-engine') {
      // Heat Engine Flow Diagram
      const cx = width / 2;

      // Hot Reservoir
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.roundRect(cx - 140, 40, 280, 50, 10);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`المستودع الساخن (Hot Reservoir): T_H = ${engineResult.tHotK} K`, cx, 70);

      // Heat In arrow (Q_H)
      ctx.strokeStyle = '#f87171';
      ctx.fillStyle = '#f87171';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx, 90);
      ctx.lineTo(cx, 150);
      ctx.stroke();
      ctx.fillText(`Q_H = ${engineResult.heatInputQh_J} J`, cx + 60, 125);

      // Engine Cycle Core
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, 195, 45, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.fillText('المحرك', cx, 190);
      ctx.fillText('الحراري', cx, 208);

      // Work Output Arrow (To the Right)
      ctx.strokeStyle = '#10b981';
      ctx.fillStyle = '#10b981';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx + 45, 195);
      ctx.lineTo(cx + 170, 195);
      ctx.stroke();
      ctx.fillText(`الشغل المنجز: W = ${engineResult.actualWorkOutputJ.toFixed(1)} J`, cx + 240, 200);

      // Heat Out arrow (Q_C)
      ctx.strokeStyle = '#60a5fa';
      ctx.fillStyle = '#60a5fa';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx, 240);
      ctx.lineTo(cx, 290);
      ctx.stroke();
      ctx.fillText(`Q_C = ${engineResult.heatExhaustQc_J.toFixed(1)} J`, cx + 60, 270);

      // Cold Reservoir
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.roundRect(cx - 140, 290, 280, 50, 10);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.fillText(`المستودع البارد (Cold Reservoir): T_C = ${engineResult.tColdK} K`, cx, 320);
    } else {
      // First Law Explorer Visual
      const cx = width / 2;
      const cy = height / 2;

      // System Box
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.roundRect(cx - 120, cy - 80, 240, 160, 14);
      ctx.fill();
      ctx.strokeStyle = firstLawResult.deltaInternalEnergyU_J >= 0 ? '#06b6d4' : '#f59e0b';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('النظام الثرموداينميكي (System)', cx, cy - 40);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 18px Inter, sans-serif';
      ctx.fillText(`ΔU = ${firstLawResult.deltaInternalEnergyU_J.toFixed(1)} J`, cx, cy);

      ctx.font = '11px Inter, sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(firstLawResult.systemStateDescriptionAr, cx, cy + 30);

      // Heat Q arrow
      const isQIn = heatQ >= 0;
      ctx.strokeStyle = isQIn ? '#ef4444' : '#60a5fa';
      ctx.fillStyle = isQIn ? '#ef4444' : '#60a5fa';
      ctx.lineWidth = 4;
      ctx.beginPath();
      if (isQIn) {
        ctx.moveTo(cx - 240, cy);
        ctx.lineTo(cx - 125, cy);
      } else {
        ctx.moveTo(cx - 125, cy);
        ctx.lineTo(cx - 240, cy);
      }
      ctx.stroke();
      ctx.fillText(`الحرارة Q = ${heatQ} J (${isQIn ? 'ممتصة' : 'منبعثة'})`, cx - 180, cy - 15);

      // Work W arrow
      const isWOut = workW >= 0;
      ctx.strokeStyle = isWOut ? '#10b981' : '#f59e0b';
      ctx.fillStyle = isWOut ? '#10b981' : '#f59e0b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      if (isWOut) {
        ctx.moveTo(cx + 125, cy);
        ctx.lineTo(cx + 240, cy);
      } else {
        ctx.moveTo(cx + 240, cy);
        ctx.lineTo(cx + 125, cy);
      }
      ctx.stroke();
      ctx.fillText(`الشغل W = ${workW} J (${isWOut ? 'منجز بواسطة الغاز' : 'منجز على الغاز'})`, cx + 180, cy - 15);
    }
  }, [mode, processType, pInit, vInit, vTarget, pTarget, pvResult, heatQ, workW, firstLawResult, tHot, tCold, qHot, engineResult]);

  const handleReset = () => {
    setProcessType('isobaric');
    setPInit(150);
    setVInit(2.0);
    setVTarget(5.0);
    setPTarget(300);
    setHeatQ(500);
    setWorkW(200);
    setTHot(600);
    setTCold(300);
    setQHot(1000);
  };

  return (
    <SimulationShell
      title="مختبر الديناميكا الحرارية"
      subtitle="الفصل السادس — القانون الأول في الثرموداينمك (ΔU = Q - W)، مخطط P-V، والعمليات الأديباتية والآيزوثيرمية وكفاءة المحركات"
      badge="الصف الخامس العلمي"
      onReset={handleReset}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Visual Canvas & HUD */}
        <div className="lg:col-span-3 space-y-4">
          <div className="relative bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl p-2">
            <canvas
              ref={canvasRef}
              width={820}
              height={380}
              className="w-full h-auto rounded-xl block"
            />
          </div>

          {/* HUD Metrics */}
          {mode === 'pv-processes' && (
            <SimulationHUD>
              <HUDMetric
                label="الشغل المنجز (W = ∫PdV)"
                value={pvResult.workDoneJ.toFixed(1)}
                unit="J"
                highlight={true}
              />
              <HUDMetric
                label="التغير في الطاقة الداخلية (ΔU)"
                value={pvResult.deltaInternalEnergyJ.toFixed(1)}
                unit="J"
              />
              <HUDMetric
                label="كمية الحرارة المنقولة (Q)"
                value={pvResult.heatTransferredJ.toFixed(1)}
                unit="J"
                highlight={true}
              />
              <HUDMetric
                label="نوع العملية الغازية"
                value={
                  processType === 'isobaric'
                    ? 'آيزوباريك (ثبوت P)'
                    : processType === 'isochoric'
                    ? 'آيزوكورك (ثبوت V)'
                    : processType === 'isothermal'
                    ? 'آيزوثيرمال (ثبوت T)'
                    : 'أديباتية (معزولة Q=0)'
                }
              />
            </SimulationHUD>
          )}

          {mode === 'first-law' && (
            <SimulationHUD>
              <HUDMetric
                label="كمية الحرارة (Q)"
                value={firstLawResult.heatAddedQ_J.toString()}
                unit="J"
              />
              <HUDMetric
                label="الشغل الميكانيكي (W)"
                value={firstLawResult.workDoneBySystemW_J.toString()}
                unit="J"
              />
              <HUDMetric
                label="التغير في الطاقة الداخلية (ΔU)"
                value={firstLawResult.deltaInternalEnergyU_J.toFixed(1)}
                unit="J"
                highlight={true}
              />
              <HUDMetric
                label="معادلة الاتزان"
                value="ΔU = Q - W"
                highlight={true}
              />
            </SimulationHUD>
          )}

          {mode === 'heat-engine' && (
            <SimulationHUD>
              <HUDMetric
                label="كفاءة كارنو القصوى (η)"
                value={engineResult.carnotEfficiencyPercent.toFixed(1)}
                unit="%"
                highlight={true}
              />
              <HUDMetric
                label="الشغل المفيد الناتج (Wout)"
                value={engineResult.actualWorkOutputJ.toFixed(1)}
                unit="J"
                highlight={true}
              />
              <HUDMetric
                label="الحرارة المطروحة (Qc)"
                value={engineResult.heatExhaustQc_J.toFixed(1)}
                unit="J"
              />
              <HUDMetric
                label="فرق درجات الحرارة (ΔT)"
                value={(engineResult.tHotK - engineResult.tColdK).toFixed(0)}
                unit="K"
              />
            </SimulationHUD>
          )}
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls title="إعدادات الثرموداينمك" onReset={handleReset}>
            {/* Mode Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">المحور التعليمي</label>
              <div className="grid grid-cols-1 gap-1.5 text-xs">
                <button
                  onClick={() => setMode('pv-processes')}
                  className={`py-2 px-3 rounded-xl font-bold cursor-pointer text-right transition-all flex items-center justify-between ${
                    mode === 'pv-processes'
                      ? 'bg-cyan-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>مخطط P-V والعمليات الغازية</span>
                  <Gauge className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setMode('first-law')}
                  className={`py-2 px-3 rounded-xl font-bold cursor-pointer text-right transition-all flex items-center justify-between ${
                    mode === 'first-law'
                      ? 'bg-cyan-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>القانون الأول (ΔU = Q - W)</span>
                  <Activity className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setMode('heat-engine')}
                  className={`py-2 px-3 rounded-xl font-bold cursor-pointer text-right transition-all flex items-center justify-between ${
                    mode === 'heat-engine'
                      ? 'bg-cyan-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>المحرك الحراري ودورة كارنو</span>
                  <Flame className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* PV Process Controls */}
            {mode === 'pv-processes' && (
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">نوع العملية الغازية</label>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    <button
                      onClick={() => setProcessType('isobaric')}
                      className={`p-2 rounded-lg font-bold cursor-pointer transition-all ${
                        processType === 'isobaric' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      آيزوباريك (P ثابت)
                    </button>
                    <button
                      onClick={() => setProcessType('isochoric')}
                      className={`p-2 rounded-lg font-bold cursor-pointer transition-all ${
                        processType === 'isochoric' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      آيزوكورك (V ثابت)
                    </button>
                    <button
                      onClick={() => setProcessType('isothermal')}
                      className={`p-2 rounded-lg font-bold cursor-pointer transition-all ${
                        processType === 'isothermal' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      آيزوثيرمال (T ثابت)
                    </button>
                    <button
                      onClick={() => setProcessType('adiabatic')}
                      className={`p-2 rounded-lg font-bold cursor-pointer transition-all ${
                        processType === 'adiabatic' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      أديباتية (Q = 0)
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">الضغط الابتدائي (P₁)</span>
                      <span className="font-mono text-cyan-400 font-bold">{pInit} kPa</span>
                    </div>
                    <input
                      type="range"
                      aria-label="الضغط الابتدائي"
                      min="50"
                      max="400"
                      step="10"
                      value={pInit}
                      onChange={(e) => setPInit(parseInt(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">الحجم الابتدائي (V₁)</span>
                      <span className="font-mono text-cyan-400 font-bold">{vInit} L</span>
                    </div>
                    <input
                      type="range"
                      aria-label="الحجم الابتدائي"
                      min="1.0"
                      max="4.0"
                      step="0.5"
                      value={vInit}
                      onChange={(e) => setVInit(parseFloat(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  {processType !== 'isochoric' ? (
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">الحجم النهائي (V₂)</span>
                        <span className="font-mono text-cyan-400 font-bold">{vTarget} L</span>
                      </div>
                      <input
                        type="range"
                        aria-label="الحجم النهائي"
                        min="2.0"
                        max="7.0"
                        step="0.5"
                        value={vTarget}
                        onChange={(e) => setVTarget(parseFloat(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">الضغط النهائي (P₂)</span>
                        <span className="font-mono text-cyan-400 font-bold">{pTarget} kPa</span>
                      </div>
                      <input
                        type="range"
                        aria-label="الضغط النهائي"
                        min="50"
                        max="400"
                        step="25"
                        value={pTarget}
                        onChange={(e) => setPTarget(parseInt(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* First Law Controls */}
            {mode === 'first-law' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">كمية الحرارة المتبادلة (Q)</span>
                    <span className="font-mono text-rose-400 font-bold">{heatQ} J</span>
                  </div>
                  <input
                    type="range"
                    aria-label="كمية الحرارة المتبادلة"
                    min="-800"
                    max="1000"
                    step="50"
                    value={heatQ}
                    onChange={(e) => setHeatQ(parseInt(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>طرد حرارة (سالب)</span>
                    <span>امتصاص حرارة (موجب)</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">الشغل الميكانيكي (W)</span>
                    <span className="font-mono text-emerald-400 font-bold">{workW} J</span>
                  </div>
                  <input
                    type="range"
                    aria-label="الشغل الميكانيكي"
                    min="-500"
                    max="800"
                    step="50"
                    value={workW}
                    onChange={(e) => setWorkW(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>انضغاط الغاز (سالب)</span>
                    <span>تمدد الغاز (موجب)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Heat Engine Controls */}
            {mode === 'heat-engine' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">حرارة المستودع الساخن (T_H)</span>
                    <span className="font-mono text-rose-400 font-bold">{tHot} K</span>
                  </div>
                  <input
                    type="range"
                    aria-label="حرارة المستودع الساخن"
                    min="350"
                    max="1000"
                    step="25"
                    value={tHot}
                    onChange={(e) => setTHot(parseInt(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">حرارة المستودع البارد (T_C)</span>
                    <span className="font-mono text-blue-400 font-bold">{tCold} K</span>
                  </div>
                  <input
                    type="range"
                    aria-label="حرارة المستودع البارد"
                    min="200"
                    max="500"
                    step="25"
                    value={tCold}
                    onChange={(e) => setTCold(parseInt(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">طاقة الحرارة الداخلة (Q_H)</span>
                    <span className="font-mono text-amber-400 font-bold">{qHot} J</span>
                  </div>
                  <input
                    type="range"
                    aria-label="طاقة الحرارة الداخلة"
                    min="200"
                    max="3000"
                    step="100"
                    value={qHot}
                    onChange={(e) => setQHot(parseInt(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </SimulationControls>

          {/* Educational Concept Box */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <h5 className="font-bold text-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>مبادئ الديناميكا الحرارية</span>
            </h5>
            <p className="text-slate-400">
              <strong>القانون الأول:</strong> الطاقة لا تفنى ولا تُستحدث، التغير في الطاقة الداخلية يساوي صافي الحرارة المكتسبة مطروحاً منها الشغل المنجز: ΔU = Q - W.
            </p>
            <p className="text-slate-400">
              <strong>كفاءة كارنو (η):</strong> أقصى كفاءة نظرية يمكن لأي محرك حراري الوصول إليها تعتمد فقط على درجتي حرارة المستودعين: η = 1 - (Tc / Th).
            </p>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
