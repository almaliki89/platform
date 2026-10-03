import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  calculateEnergyBands,
  calculateDoping,
  calculatePnJunction,
} from './calculations';
import { ElectronicsMode, MaterialType, DopingType, BiasType } from './types';
import { Cpu, Layers, BatteryMedium, Sparkles } from 'lucide-react';

export const SolidStateElectronicsSimulation: React.FC = () => {
  const [mode, setMode] = useState<ElectronicsMode>('energy-bands');

  // Mode 1: Energy bands
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>('silicon');

  // Mode 2: Doping
  const [dopingType, setDopingType] = useState<DopingType>('n-type');
  const [baseMat, setBaseMat] = useState<'silicon' | 'germanium'>('silicon');

  // Mode 3: P-N Junction & Biasing
  const [pnMaterial, setPnMaterial] = useState<'silicon' | 'germanium'>('silicon');
  const [biasType, setBiasType] = useState<BiasType>('forward');
  const [appliedVoltage, setAppliedVoltage] = useState<number>(0.8);

  // Calculations
  const bandsResult = calculateEnergyBands(selectedMaterial);
  const dopingResult = calculateDoping(dopingType, baseMat);
  const pnResult = calculatePnJunction(pnMaterial, biasType, appliedVoltage);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animation frame loop
  useEffect(() => {
    let animationId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let tick = 0;

    const render = () => {
      tick += 0.03;
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Tech dark background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
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

      if (mode === 'energy-bands') {
        // Draw Energy Bands Diagram
        const cx = width / 2;
        const cy = height / 2;
        const bandWidth = 260;

        // Title
        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 15px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(`مخطط حزم الطاقة: ${bandsResult.materialNameAr}`, cx, 35);

        // Conduction Band (Top)
        const cbY = cy - 80;
        const cbH = 45;
        const gradCB = ctx.createLinearGradient(0, cbY, 0, cbY + cbH);
        gradCB.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
        gradCB.addColorStop(1, 'rgba(56, 189, 248, 0.15)');
        ctx.fillStyle = gradCB;
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.fillRect(cx - bandWidth / 2, cbY, bandWidth, cbH);
        ctx.strokeRect(cx - bandWidth / 2, cbY, bandWidth, cbH);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 14px system-ui';
        ctx.fillText('حزمة التوصيل (Conduction Band)', cx, cbY + 28);

        // Valence Band (Bottom)
        let vbGap = 0;
        if (selectedMaterial === 'copper') vbGap = 0; // Overlapping
        else if (selectedMaterial === 'silicon') vbGap = 65;
        else if (selectedMaterial === 'germanium') vbGap = 45;
        else vbGap = 130; // Glass / Insulator

        const vbY = selectedMaterial === 'copper' ? cbY + 25 : cbY + cbH + vbGap;
        const vbH = 45;
        const gradVB = ctx.createLinearGradient(0, vbY, 0, vbY + vbH);
        gradVB.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
        gradVB.addColorStop(1, 'rgba(239, 68, 68, 0.1)');
        ctx.fillStyle = gradVB;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.fillRect(cx - bandWidth / 2, vbY, bandWidth, vbH);
        ctx.strokeRect(cx - bandWidth / 2, vbY, bandWidth, vbH);

        ctx.fillStyle = '#f87171';
        ctx.font = 'bold 14px system-ui';
        ctx.fillText('حزمة التكافؤ (Valence Band - مملوءة)', cx, vbY + 28);

        // Forbidden Energy Gap Indicator
        if (selectedMaterial !== 'copper') {
          const gapTop = cbY + cbH;
          const gapBottom = vbY;
          const gapMid = (gapTop + gapBottom) / 2;

          // Arrow indicating Eg
          ctx.strokeStyle = '#eab308';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(cx + bandWidth / 2 + 30, gapTop);
          ctx.lineTo(cx + bandWidth / 2 + 30, gapBottom);
          ctx.stroke();

          // Arrow heads
          ctx.fillStyle = '#eab308';
          ctx.beginPath();
          ctx.moveTo(cx + bandWidth / 2 + 30, gapTop);
          ctx.lineTo(cx + bandWidth / 2 + 25, gapTop + 8);
          ctx.lineTo(cx + bandWidth / 2 + 35, gapTop + 8);
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(cx + bandWidth / 2 + 30, gapBottom);
          ctx.lineTo(cx + bandWidth / 2 + 25, gapBottom - 8);
          ctx.lineTo(cx + bandWidth / 2 + 35, gapBottom - 8);
          ctx.fill();

          ctx.fillStyle = '#facc15';
          ctx.font = 'bold 13px system-ui';
          ctx.textAlign = 'left';
          ctx.fillText(`فجوة الطاقة المحظورة: Eg = ${bandsResult.energyGapEv} eV`, cx + bandWidth / 2 + 45, gapMid + 5);
        } else {
          ctx.fillStyle = '#4ade80';
          ctx.font = 'bold 13px system-ui';
          ctx.textAlign = 'left';
          ctx.fillText('تداخل تام بين الحزمتين (Eg = 0 eV)', cx + bandWidth / 2 + 30, cbY + cbH);
        }

        // Draw electron particles in valence band
        ctx.fillStyle = '#38bdf8';
        for (let i = 0; i < 8; i++) {
          const px = cx - bandWidth / 2 + 20 + i * 30;
          const py = vbY + 15 + Math.sin(tick * 2 + i) * 3;
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // If copper or thermal excited in semiconductor, show some electrons in conduction band
        if (selectedMaterial === 'copper') {
          for (let i = 0; i < 6; i++) {
            const px = cx - bandWidth / 2 + 30 + i * 40;
            const py = cbY + 15 + Math.cos(tick * 3 + i) * 4;
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (selectedMaterial === 'silicon' || selectedMaterial === 'germanium') {
          const numExcited = selectedMaterial === 'germanium' ? 3 : 1;
          for (let i = 0; i < numExcited; i++) {
            const px = cx - 40 + i * 50;
            const py = cbY + 15 + Math.sin(tick * 2 + i) * 3;
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else if (mode === 'doping') {
        // Draw Lattice and Dopant level diagram
        const cx = width / 2;
        const cy = height / 2;

        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 15px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(
          `التطعيم: شبه موصل من نوع (${dopingType === 'n-type' ? 'N-Type سالب' : dopingType === 'p-type' ? 'P-Type موجب' : 'نقي Intrinsic'})`,
          cx,
          35
        );

        // Visual crystal lattice on the left (2x2 grid)
        const lx = cx - 140;
        const ly = cy - 20;
        const spacing = 60;

        // Draw Si atoms
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            const ax = lx + (c - 1) * spacing;
            const ay = ly + (r - 1) * spacing;
            const isCenter = r === 1 && c === 1;

            // Bonds
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
            ctx.lineWidth = 2;
            if (c < 2) {
              ctx.beginPath();
              ctx.moveTo(ax + 16, ay);
              ctx.lineTo(ax + spacing - 16, ay);
              ctx.stroke();
            }
            if (r < 2) {
              ctx.beginPath();
              ctx.moveTo(ax, ay + 16);
              ctx.lineTo(ax, ay + spacing - 16);
              ctx.stroke();
            }

            // Atom Circle
            if (isCenter && dopingType === 'n-type') {
              ctx.fillStyle = '#0284c7'; // Donor P/Sb
              ctx.beginPath();
              ctx.arc(ax, ay, 18, 0, Math.PI * 2);
              ctx.fill();
              ctx.fillStyle = '#ffffff';
              ctx.font = 'bold 12px system-ui';
              ctx.fillText('P (+5)', ax, ay + 4);

              // 5th extra free electron
              const ex = ax + 25 + Math.cos(tick * 2) * 5;
              const ey = ay - 20 + Math.sin(tick * 2) * 5;
              ctx.fillStyle = '#facc15';
              ctx.beginPath();
              ctx.arc(ex, ey, 5, 0, Math.PI * 2);
              ctx.fill();
              ctx.fillStyle = '#facc15';
              ctx.font = '11px system-ui';
              ctx.fillText('e⁻ حر', ex + 18, ey + 4);
            } else if (isCenter && dopingType === 'p-type') {
              ctx.fillStyle = '#dc2626'; // Acceptor B/In
              ctx.beginPath();
              ctx.arc(ax, ay, 18, 0, Math.PI * 2);
              ctx.fill();
              ctx.fillStyle = '#ffffff';
              ctx.font = 'bold 12px system-ui';
              ctx.fillText('B (+3)', ax, ay + 4);

              // Missing bond (Hole)
              const hx = ax + 28;
              const hy = ay;
              ctx.strokeStyle = '#fbbf24';
              ctx.lineWidth = 2;
              ctx.fillStyle = 'rgba(251, 191, 36, 0.2)';
              ctx.beginPath();
              ctx.arc(hx, hy, 7, 0, Math.PI * 2);
              ctx.stroke();
              ctx.fill();
              ctx.fillStyle = '#fbbf24';
              ctx.font = '11px system-ui';
              ctx.fillText('فجوة (Hole)', hx + 35, hy + 4);
            } else {
              ctx.fillStyle = '#334155';
              ctx.beginPath();
              ctx.arc(ax, ay, 16, 0, Math.PI * 2);
              ctx.fill();
              ctx.fillStyle = '#94a3b8';
              ctx.font = 'bold 12px system-ui';
              ctx.fillText(baseMat === 'silicon' ? 'Si' : 'Ge', ax, ay + 4);
            }
          }
        }

        // Energy Band Level diagram on the right
        const rx = cx + 150;
        const rBandW = 160;

        // Conduction band
        ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.strokeStyle = '#38bdf8';
        ctx.fillRect(rx - rBandW / 2, cy - 90, rBandW, 30);
        ctx.strokeRect(rx - rBandW / 2, cy - 90, rBandW, 30);
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 12px system-ui';
        ctx.fillText('حزمة التوصيل (CB)', rx, cy - 70);

        // Valence band
        ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
        ctx.strokeStyle = '#ef4444';
        ctx.fillRect(rx - rBandW / 2, cy + 50, rBandW, 30);
        ctx.strokeRect(rx - rBandW / 2, cy + 50, rBandW, 30);
        ctx.fillStyle = '#f87171';
        ctx.font = 'bold 12px system-ui';
        ctx.fillText('حزمة التكافؤ (VB)', rx, cy + 70);

        // Impurity Level line
        if (dopingType === 'n-type') {
          // Donor level ED below CB
          ctx.strokeStyle = '#facc15';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(rx - rBandW / 2, cy - 45);
          ctx.lineTo(rx + rBandW / 2, cy - 45);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = '#facc15';
          ctx.font = '11px system-ui';
          ctx.fillText('المستوى المانح (Donor Level ED)', rx, cy - 30);
        } else if (dopingType === 'p-type') {
          // Acceptor level EA above VB
          ctx.strokeStyle = '#a855f7';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(rx - rBandW / 2, cy + 30);
          ctx.lineTo(rx + rBandW / 2, cy + 30);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = '#c084fc';
          ctx.font = '11px system-ui';
          ctx.fillText('المستوى القابل (Acceptor Level EA)', rx, cy + 20);
        }
      } else {
        // P-N Junction & Diode Biasing
        const cx = width / 2;
        const cy = height / 2 - 10;
        const junctionW = 340;
        const junctionH = 130;

        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 15px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(
          `الثنائي البلوري (P-N Junction): ${biasType === 'forward' ? 'انحياز أمامي (Forward Bias)' : biasType === 'reverse' ? 'انحياز عكسي (Reverse Bias)' : 'غير منحاز (Unbiased)'}`,
          cx,
          30
        );

        // P-Type region (Left)
        const pW = (junctionW - pnResult.depletionWidthMicrons * 60) / 2;
        ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
        ctx.fillRect(cx - junctionW / 2, cy - junctionH / 2, pW, junctionH);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.strokeRect(cx - junctionW / 2, cy - junctionH / 2, pW, junctionH);

        ctx.fillStyle = '#f87171';
        ctx.font = 'bold 16px system-ui';
        ctx.fillText('المنطقة P', cx - junctionW / 2 + pW / 2, cy - 30);
        ctx.font = '12px system-ui';
        ctx.fillText('فجوات موجبة (+)', cx - junctionW / 2 + pW / 2, cy - 10);
        ctx.fillText('أيونات سالبة مقيدة ⊖', cx - junctionW / 2 + pW / 2, cy + 15);

        // N-Type region (Right)
        const nW = pW;
        ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.fillRect(cx + junctionW / 2 - nW, cy - junctionH / 2, nW, junctionH);
        ctx.strokeStyle = '#38bdf8';
        ctx.strokeRect(cx + junctionW / 2 - nW, cy - junctionH / 2, nW, junctionH);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 16px system-ui';
        ctx.fillText('المنطقة N', cx + junctionW / 2 - nW / 2, cy - 30);
        ctx.font = '12px system-ui';
        ctx.fillText('إلكترونات حرة (–)', cx + junctionW / 2 - nW / 2, cy - 10);
        ctx.fillText('أيونات موجبة مقيدة ⊕', cx + junctionW / 2 - nW / 2, cy + 15);

        // Depletion Region (Center)
        const depW = pnResult.depletionWidthMicrons * 60;
        const depX = cx - depW / 2;
        ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
        ctx.fillRect(depX, cy - junctionH / 2, depW, junctionH);
        ctx.strokeStyle = '#f59e0b';
        ctx.strokeRect(depX, cy - junctionH / 2, depW, junctionH);

        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 12px system-ui';
        ctx.fillText('منطقة الاستنزاف', cx, cy - 20);
        ctx.font = '11px system-ui';
        ctx.fillText(`العرض: ${pnResult.depletionWidthMicrons.toFixed(2)} µm`, cx, cy);
        ctx.fillText(`حاجز الجهد: ${pnResult.barrierPotentialV0} V`, cx, cy + 20);

        // External Battery Circuit
        const wireY = cy + junctionH / 2 + 50;
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 3;

        // Left wire down
        ctx.beginPath();
        ctx.moveTo(cx - junctionW / 2, cy);
        ctx.lineTo(cx - junctionW / 2 - 20, cy);
        ctx.lineTo(cx - junctionW / 2 - 20, wireY);
        ctx.lineTo(cx - 35, wireY);
        ctx.stroke();

        // Right wire down
        ctx.beginPath();
        ctx.moveTo(cx + junctionW / 2, cy);
        ctx.lineTo(cx + junctionW / 2 + 20, cy);
        ctx.lineTo(cx + junctionW / 2 + 20, wireY);
        ctx.lineTo(cx + 35, wireY);
        ctx.stroke();

        // Battery symbol in the middle
        if (biasType === 'forward') {
          // Positive terminal on left (connected to P), Negative on right (connected to N)
          ctx.strokeStyle = '#ef4444';
          ctx.beginPath();
          ctx.moveTo(cx - 15, wireY - 15);
          ctx.lineTo(cx - 15, wireY + 15);
          ctx.stroke();

          ctx.strokeStyle = '#38bdf8';
          ctx.beginPath();
          ctx.moveTo(cx + 15, wireY - 8);
          ctx.lineTo(cx + 15, wireY + 8);
          ctx.stroke();

          ctx.fillStyle = '#e2e8f0';
          ctx.font = 'bold 12px system-ui';
          ctx.fillText(`+  ${appliedVoltage}V  -`, cx, wireY - 20);
        } else if (biasType === 'reverse') {
          // Negative on left (connected to P), Positive on right (connected to N)
          ctx.strokeStyle = '#38bdf8';
          ctx.beginPath();
          ctx.moveTo(cx - 15, wireY - 8);
          ctx.lineTo(cx - 15, wireY + 8);
          ctx.stroke();

          ctx.strokeStyle = '#ef4444';
          ctx.beginPath();
          ctx.moveTo(cx + 15, wireY - 15);
          ctx.lineTo(cx + 15, wireY + 15);
          ctx.stroke();

          ctx.fillStyle = '#e2e8f0';
          ctx.font = 'bold 12px system-ui';
          ctx.fillText(`-  ${appliedVoltage}V  +`, cx, wireY - 20);
        }

        // Current flow arrows if forward conducting
        if (biasType === 'forward' && pnResult.netCurrentMa > 5) {
          ctx.fillStyle = '#22c55e';
          ctx.font = 'bold 13px system-ui';
          ctx.fillText(`تيار الدائرة: I = ${pnResult.netCurrentMa.toFixed(1)} mA ➔`, cx, cy + junctionH / 2 + 25);
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [mode, selectedMaterial, bandsResult, dopingType, baseMat, dopingResult, pnMaterial, biasType, appliedVoltage, pnResult]);

  const handleReset = () => {
    setSelectedMaterial('silicon');
    setDopingType('n-type');
    setBaseMat('silicon');
    setPnMaterial('silicon');
    setBiasType('forward');
    setAppliedVoltage(0.8);
  };

  return (
    <SimulationShell
      title="مختبر إلكترونيات الحالة الصلبة"
      subtitle="الفصل السادس — حزم الطاقة، التوصيل في أشباه الموصلات، الثنائي البلوري (P-N) وحاجز الجهد"
      badge="الصف السادس العلمي"
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
          {mode === 'energy-bands' && (
            <SimulationHUD>
              <HUDMetric
                label="المادة المصنفة"
                value={bandsResult.classificationAr}
              />
              <HUDMetric
                label="فجوة الطاقة المحظورة Eg"
                value={bandsResult.energyGapEv}
                unit="eV"
                highlight={true}
              />
              <HUDMetric
                label="حالة التوصيل"
                value={bandsResult.energyGapEv === 0 ? 'موصل ممتاز' : bandsResult.energyGapEv < 2 ? 'شبه موصل' : 'عازل تام'}
              />
            </SimulationHUD>
          )}

          {mode === 'doping' && (
            <SimulationHUD>
              <HUDMetric
                label="حاملات الشحنة الأغلبية"
                value={dopingResult.majorityCarriersAr}
                highlight={true}
              />
              <HUDMetric
                label="المستوى الطاقي المشوّب"
                value={dopingResult.extraEnergyLevelAr.split(' ')[1] || dopingResult.extraEnergyLevelAr}
              />
              <HUDMetric
                label="تكافؤ الشائبة"
                value={dopingResult.dopantValence}
                unit="إلكترونات تكافؤ"
              />
            </SimulationHUD>
          )}

          {mode === 'pn-junction' && (
            <SimulationHUD>
              <HUDMetric
                label="حاجز الجهد الطبيعي V0"
                value={pnResult.barrierPotentialV0}
                unit="V"
              />
              <HUDMetric
                label="نوع الانحياز"
                value={biasType === 'forward' ? 'أمامي (Forward)' : biasType === 'reverse' ? 'عكسي (Reverse)' : 'سكوني (Unbiased)'}
                highlight={true}
              />
              <HUDMetric
                label="التيار الصافي في الدائرة"
                value={pnResult.netCurrentMa.toFixed(2)}
                unit="mA"
                highlight={pnResult.netCurrentMa > 1}
              />
            </SimulationHUD>
          )}
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls title="إعدادات إلكترونيات الحالة الصلبة">
            {/* Mode Switcher */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">الموضوع التعليمي</label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                <button
                  onClick={() => setMode('energy-bands')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'energy-bands' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  حزم الطاقة
                </button>
                <button
                  onClick={() => setMode('doping')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'doping' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  التطعيم والشوائب
                </button>
                <button
                  onClick={() => setMode('pn-junction')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'pn-junction' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  الثنائي P-N
                </button>
              </div>
            </div>

            {mode === 'energy-bands' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <label className="text-slate-400">اختيار مادة النموذج:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'copper', label: 'النحاس (موصل)' },
                    { id: 'silicon', label: 'السيليكون (شبه موصل)' },
                    { id: 'germanium', label: 'الجرمانيوم (شبه موصل)' },
                    { id: 'glass', label: 'الزجاج (عازل)' },
                  ].map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat.id as MaterialType)}
                      className={`py-2 px-2 rounded-lg text-xs font-medium transition ${
                        selectedMaterial === mat.id
                          ? 'bg-sky-500 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {mat.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {mode === 'doping' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400">المادة الأساسية:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setBaseMat('silicon')}
                      className={`py-1.5 rounded-lg ${baseMat === 'silicon' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                    >
                      السيليكون (Si)
                    </button>
                    <button
                      onClick={() => setBaseMat('germanium')}
                      className={`py-1.5 rounded-lg ${baseMat === 'germanium' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                    >
                      الجرمانيوم (Ge)
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">نوع الشائبة المطعم بها:</label>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      onClick={() => setDopingType('intrinsic')}
                      className={`py-1.5 rounded-lg ${dopingType === 'intrinsic' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                    >
                      نقي (4)
                    </button>
                    <button
                      onClick={() => setDopingType('n-type')}
                      className={`py-1.5 rounded-lg ${dopingType === 'n-type' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                    >
                      نوع N (+5)
                    </button>
                    <button
                      onClick={() => setDopingType('p-type')}
                      className={`py-1.5 rounded-lg ${dopingType === 'p-type' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                    >
                      نوع P (+3)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {mode === 'pn-junction' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400">مادة الثنائي:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPnMaterial('silicon')}
                      className={`py-1.5 rounded-lg ${pnMaterial === 'silicon' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                    >
                      سيليكون (0.7V)
                    </button>
                    <button
                      onClick={() => setPnMaterial('germanium')}
                      className={`py-1.5 rounded-lg ${pnMaterial === 'germanium' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                    >
                      جرمانيوم (0.3V)
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">نوع الانحياز:</label>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      onClick={() => setBiasType('unbiased')}
                      className={`py-1.5 rounded-lg ${biasType === 'unbiased' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                    >
                      بدون
                    </button>
                    <button
                      onClick={() => setBiasType('forward')}
                      className={`py-1.5 rounded-lg ${biasType === 'forward' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                    >
                      أمامي (+)
                    </button>
                    <button
                      onClick={() => setBiasType('reverse')}
                      className={`py-1.5 rounded-lg ${biasType === 'reverse' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                    >
                      عكسي (-)
                    </button>
                  </div>
                </div>

                {biasType !== 'unbiased' && (
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">الجهد المطبق (V):</span>
                      <span className="font-mono text-amber-400 font-bold">{appliedVoltage.toFixed(2)} V</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2.0"
                      step="0.05"
                      value={appliedVoltage}
                      onChange={(e) => setAppliedVoltage(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>
                )}
              </div>
            )}
          </SimulationControls>

          {/* Educational Note */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <h5 className="font-bold text-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>المفاهيم الوزارية الأساسية</span>
            </h5>
            <p className="text-slate-400">
              <strong>حزم الطاقة:</strong> حزمة التوصيل متداخلة في الموصلات (Eg=0)، ومفصولة بفجوة ضيقة في أشباه الموصلات (Si=1.1eV, Ge=0.72eV)، وفجوة واسعة في العوازل (&gt; 5eV).
            </p>
            <p className="text-slate-400">
              <strong>حاجز الجهد:</strong> ينشأ نتيجة هجرة الإلكترونات والفجوات واستقرار الأيونات المقيدة على جانبي الملتقى.
            </p>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
