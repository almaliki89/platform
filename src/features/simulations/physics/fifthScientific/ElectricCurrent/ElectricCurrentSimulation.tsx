import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  calculateResistivity,
  calculateKirchhoffTwoLoop,
  calculateWheatstoneBridge,
  WIRE_MATERIALS,
} from './calculations';
import { ElectricCurrentMode } from './types';
import { Network, Zap, Sliders, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';

export const ElectricCurrentSimulation: React.FC = () => {
  const [mode, setMode] = useState<ElectricCurrentMode>('kirchhoff');

  // Kirchhoff mode state
  const [emf1, setEmf1] = useState<number>(12); // V
  const [emf2, setEmf2] = useState<number>(6); // V
  const [r1, setR1] = useState<number>(4); // Ω
  const [r2, setR2] = useState<number>(6); // Ω
  const [r3, setR3] = useState<number>(2); // Ω (middle branch)

  // Wheatstone bridge state
  const [wbR1, setWbR1] = useState<number>(100); // Ω
  const [wbR2, setWbR2] = useState<number>(200); // Ω
  const [wbR3, setWbR3] = useState<number>(150); // Variable resistor (Ω)
  const [wbRxUnknown] = useState<number>(300); // Fixed target unknown (300 Ω)
  const [wbVin, setWbVin] = useState<number>(10); // V

  // Resistivity state
  const [materialId, setMaterialId] = useState<string>('copper');
  const [wireLength, setWireLength] = useState<number>(5.0); // m
  const [wireDiamMm, setWireDiamMm] = useState<number>(1.2); // mm
  const [wireTemp, setWireTemp] = useState<number>(25); // °C

  // Calculations
  const kResult = calculateKirchhoffTwoLoop(emf1, emf2, r1, r2, r3);
  const wbResult = calculateWheatstoneBridge(wbR1, wbR2, wbR3, wbRxUnknown, wbVin);
  const resResult = calculateResistivity(materialId, wireLength, wireDiamMm, wireTemp);

  // Animation phase for current dots
  const [animPhase, setAnimPhase] = useState<number>(0);

  useEffect(() => {
    let animId: number;
    const loop = () => {
      setAnimPhase((prev) => (prev + 0.05) % 1);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

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

    // Deep tech circuit background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    // Subtle grid
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

    if (mode === 'kirchhoff') {
      // 2-Mesh Kirchhoff Circuit Schematic
      const leftX = 140;
      const midX = width / 2;
      const rightX = width - 140;
      const topY = 70;
      const botY = height - 70;

      // Draw Main Circuit Wires
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;

      // Loop 1 (Left)
      ctx.beginPath();
      ctx.moveTo(leftX, topY);
      ctx.lineTo(midX, topY);
      ctx.lineTo(midX, botY);
      ctx.lineTo(leftX, botY);
      ctx.lineTo(leftX, topY);
      ctx.stroke();

      // Loop 2 (Right)
      ctx.beginPath();
      ctx.moveTo(midX, topY);
      ctx.lineTo(rightX, topY);
      ctx.lineTo(rightX, botY);
      ctx.lineTo(midX, botY);
      ctx.stroke();

      // Junction Nodes A (top) and B (bottom)
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(midX, topY, 6, 0, Math.PI * 2);
      ctx.arc(midX, botY, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('عقدة A (Junction A)', midX, topY - 12);
      ctx.fillText('عقدة B (Junction B)', midX, botY + 22);

      // Battery EMF 1 (Left branch)
      const bat1Y = (topY + botY) / 2;
      ctx.fillStyle = '#090d16';
      ctx.fillRect(leftX - 12, bat1Y - 22, 24, 44);
      // Long line (+)
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(leftX - 14, bat1Y - 10);
      ctx.lineTo(leftX + 14, bat1Y - 10);
      ctx.stroke();
      // Short line (-)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(leftX - 8, bat1Y + 10);
      ctx.lineTo(leftX + 8, bat1Y + 10);
      ctx.stroke();

      ctx.fillStyle = '#f87171';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText(`+ E₁ = ${emf1}V`, leftX - 45, bat1Y);

      // Battery EMF 2 (Right branch)
      const bat2Y = (topY + botY) / 2;
      ctx.fillStyle = '#090d16';
      ctx.fillRect(rightX - 12, bat2Y - 22, 24, 44);
      // Long line (+)
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(rightX - 14, bat2Y - 10);
      ctx.lineTo(rightX + 14, bat2Y - 10);
      ctx.stroke();
      // Short line (-)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(rightX - 8, bat2Y + 10);
      ctx.lineTo(rightX + 8, bat2Y + 10);
      ctx.stroke();

      ctx.fillStyle = '#f87171';
      ctx.fillText(`+ E₂ = ${emf2}V`, rightX + 45, bat2Y);

      // Resistor R1 (Top left branch)
      const r1X = (leftX + midX) / 2;
      ctx.fillStyle = '#090d16';
      ctx.fillRect(r1X - 22, topY - 10, 44, 20);
      ctx.fillStyle = '#334155';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.fillRect(r1X - 18, topY - 8, 36, 16);
      ctx.strokeRect(r1X - 18, topY - 8, 36, 16);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`R₁ = ${r1}Ω`, r1X, topY + 24);

      // Resistor R2 (Top right branch)
      const r2X = (midX + rightX) / 2;
      ctx.fillStyle = '#090d16';
      ctx.fillRect(r2X - 22, topY - 10, 44, 20);
      ctx.fillStyle = '#334155';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.fillRect(r2X - 18, topY - 8, 36, 16);
      ctx.strokeRect(r2X - 18, topY - 8, 36, 16);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`R₂ = ${r2}Ω`, r2X, topY + 24);

      // Resistor R3 (Center shared branch)
      const r3Y = (topY + botY) / 2;
      ctx.fillStyle = '#090d16';
      ctx.fillRect(midX - 10, r3Y - 22, 20, 44);
      ctx.fillStyle = '#334155';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.fillRect(midX - 8, r3Y - 18, 16, 36);
      ctx.strokeRect(midX - 8, r3Y - 18, 16, 36);
      ctx.fillStyle = '#34d399';
      ctx.fillText(`R₃ = ${r3}Ω`, midX + 35, r3Y + 4);

      // Branch Current Arrows & Readings
      // I1 arrow (Left branch)
      ctx.fillStyle = '#06b6d4';
      ctx.fillText(`I₁ = ${kResult.i1CurrentA.toFixed(2)} A`, r1X, topY - 16);

      // I2 arrow (Right branch)
      ctx.fillStyle = '#06b6d4';
      ctx.fillText(`I₂ = ${kResult.i2CurrentA.toFixed(2)} A`, r2X, topY - 16);

      // I3 arrow (Middle branch)
      ctx.fillStyle = '#10b981';
      ctx.fillText(`I₃ = ${kResult.i3CurrentA.toFixed(2)} A (I₁ + I₂)`, midX, r3Y + 36);

      // Loop Direction Arcs
      // Loop 1
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(r1X, bat1Y, 32, 0, Math.PI * 1.5);
      ctx.stroke();
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('الحلقة 1 ↻', r1X, bat1Y + 4);

      // Loop 2
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(r2X, bat2Y, 32, 0, Math.PI * 1.5);
      ctx.stroke();
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('الحلقة 2 ↻', r2X, bat2Y + 4);
    } else if (mode === 'wheatstone') {
      // Wheatstone Bridge Diamond Circuit
      const cx = width / 2;
      const cy = height / 2;
      const diamondW = 160;
      const diamondH = 110;

      const ptTop = { x: cx, y: cy - diamondH };
      const ptBottom = { x: cx, y: cy + diamondH };
      const ptLeft = { x: cx - diamondW, y: cy };
      const ptRight = { x: cx + diamondW, y: cy };

      // Diamond Wires
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(ptTop.x, ptTop.y);
      ctx.lineTo(ptLeft.x, ptLeft.y);
      ctx.lineTo(ptBottom.x, ptBottom.y);
      ctx.lineTo(ptRight.x, ptRight.y);
      ctx.lineTo(ptTop.x, ptTop.y);
      ctx.stroke();

      // Galvanometer branch between Left and Right nodes
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(ptLeft.x, ptLeft.y);
      ctx.lineTo(ptRight.x, ptRight.y);
      ctx.stroke();

      // Galvanometer Meter Circle in Center
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = wbResult.bridgeBalanced ? '#10b981' : '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Galvanometer Needle
      const maxDeflection = Math.PI / 4;
      const needleDeflection = Math.max(
        -maxDeflection,
        Math.min(maxDeflection, (wbResult.galvanometerCurrentMicroA / 500) * maxDeflection)
      );
      ctx.strokeStyle = wbResult.bridgeBalanced ? '#10b981' : '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy + 12);
      ctx.lineTo(cx + 26 * Math.sin(needleDeflection), cy - 26 * Math.cos(needleDeflection));
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('G', cx, cy + 24);

      // Resistor labels along diamond arms
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`R₁ = ${wbR1} Ω`, (ptTop.x + ptLeft.x) / 2 - 25, (ptTop.y + ptLeft.y) / 2);
      ctx.fillText(`R₂ = ${wbR2} Ω`, (ptBottom.x + ptLeft.x) / 2 - 25, (ptBottom.y + ptLeft.y) / 2);
      ctx.fillText(`R₃ = ${wbR3} Ω (مقاومة متغيرة)`, (ptTop.x + ptRight.x) / 2 + 55, (ptTop.y + ptRight.y) / 2);

      // Unknown Rx
      ctx.fillStyle = '#f43f5e';
      ctx.fillText(`Rx المجهولة = ${wbRxUnknown} Ω`, (ptBottom.x + ptRight.x) / 2 + 55, (ptBottom.y + ptRight.y) / 2);

      // Galvanometer Reading Callout
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.fillStyle = wbResult.bridgeBalanced ? '#34d399' : '#f87171';
      ctx.fillText(
        wbResult.bridgeBalanced
          ? 'القنطرة متزنة تماماً (I_G = 0 μA)'
          : `تيار الجلفانومتر: I_G = ${wbResult.galvanometerCurrentMicroA.toFixed(1)} μA`,
        cx,
        height - 30
      );
    } else {
      // Wire Resistivity 3D View
      const cx = width / 2;
      const cy = height / 2;
      const wireDisplayLength = Math.min(width - 240, Math.max(120, wireLength * 35));
      const wireDisplayRadius = Math.min(45, Math.max(12, wireDiamMm * 14));

      // Metallic wire cylinder
      const grad = ctx.createLinearGradient(0, cy - wireDisplayRadius, 0, cy + wireDisplayRadius);
      grad.addColorStop(0, resResult.material.colorHex);
      grad.addColorStop(0.3, '#f1f5f9');
      grad.addColorStop(0.7, resResult.material.colorHex);
      grad.addColorStop(1, '#0f172a');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(
        cx - wireDisplayLength / 2,
        cy - wireDisplayRadius,
        wireDisplayLength,
        wireDisplayRadius * 2,
        8
      );
      ctx.fill();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Cross section oval
      ctx.fillStyle = resResult.material.colorHex;
      ctx.beginPath();
      ctx.ellipse(
        cx + wireDisplayLength / 2,
        cy,
        wireDisplayRadius * 0.4,
        wireDisplayRadius,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.stroke();

      // Dimension brackets
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`الطول: L = ${wireLength.toFixed(1)} m`, cx, cy + wireDisplayRadius + 30);
      ctx.fillText(
        `القطر: d = ${wireDiamMm.toFixed(2)} mm (مساحة المقطع A = ${(resResult.crossSectionAreaM2 * 1e6).toFixed(2)} mm²)`,
        cx,
        cy - wireDisplayRadius - 20
      );
    }
  }, [mode, emf1, emf2, r1, r2, r3, kResult, wbR1, wbR2, wbR3, wbRxUnknown, wbResult, wireLength, wireDiamMm, wireTemp, resResult]);

  const handleReset = () => {
    setEmf1(12);
    setEmf2(6);
    setR1(4);
    setR2(6);
    setR3(2);
    setWbR1(100);
    setWbR2(200);
    setWbR3(150);
    setWbVin(10);
    setWireLength(5.0);
    setWireDiamMm(1.2);
    setWireTemp(25);
  };

  const balanceWheatstonePreset = () => {
    // Balance condition: Rx = R3 * (R2/R1) => 300 = R3 * (200/100) = R3 * 2 => R3 = 150 Ω
    setWbR3(150);
  };

  return (
    <SimulationShell
      title="مختبر دوائر التيار الكهربائي وقوانين كيرشوف"
      subtitle="الفصل التاسع — المقاومة النوعية وأبعاد السلك (R = ρL/A)، قاعدتا كيرشوف (KCL & KVL)، وقنطرة وتستون"
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
          {mode === 'kirchhoff' && (
            <SimulationHUD>
              <HUDMetric
                label="تيار الفرع الأول (I₁)"
                value={kResult.i1CurrentA.toFixed(2)}
                unit="A"
                highlight={true}
              />
              <HUDMetric
                label="تيار الفرع الثاني (I₂)"
                value={kResult.i2CurrentA.toFixed(2)}
                unit="A"
                highlight={true}
              />
              <HUDMetric
                label="تيار الفرع المشترك (I₃ = I₁ + I₂)"
                value={kResult.i3CurrentA.toFixed(2)}
                unit="A"
                highlight={true}
              />
              <HUDMetric
                label="قاعدة كيرشوف الأولى (KCL)"
                value="ΣI_in = ΣI_out"
                highlight={true}
              />
            </SimulationHUD>
          )}

          {mode === 'wheatstone' && (
            <SimulationHUD>
              <HUDMetric
                label="حالة اتزان القنطرة"
                value={wbResult.bridgeBalanced ? 'متزنة (Balanced)' : 'غير متزنة'}
                highlight={wbResult.bridgeBalanced}
              />
              <HUDMetric
                label="تيار الجلفانومتر (IG)"
                value={wbResult.galvanometerCurrentMicroA.toFixed(1)}
                unit="μA"
              />
              <HUDMetric
                label="المقاومة المجهولة المحسوبة (Rx)"
                value={wbResult.calculatedRxOhm.toFixed(1)}
                unit="Ω"
                highlight={true}
              />
              <HUDMetric
                label="نسبة الذراعين (R₂/R₁)"
                value={(wbR2 / wbR1).toFixed(2)}
              />
            </SimulationHUD>
          )}

          {mode === 'resistivity' && (
            <SimulationHUD>
              <HUDMetric
                label="مقاومة السلك (R = ρL/A)"
                value={resResult.resistanceOhm.toFixed(3)}
                unit="Ω"
                highlight={true}
              />
              <HUDMetric
                label="التوصيلية الكهربائية (G = 1/R)"
                value={resResult.conductanceSiemens.toFixed(2)}
                unit="S"
              />
              <HUDMetric
                label="المقاومة النوعية للمادة (ρ)"
                value={(resResult.material.resistivityOhmM * 1e8).toFixed(2)}
                unit="×10⁻⁸ Ω·m"
              />
              <HUDMetric
                label="درجة الحرارة الفعالة"
                value={wireTemp.toString()}
                unit="°C"
              />
            </SimulationHUD>
          )}
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls title="إعدادات الدوائر والتيار">
            {/* Mode Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">النمط التعليمي</label>
              <div className="grid grid-cols-1 gap-1.5 text-xs">
                <button
                  onClick={() => setMode('kirchhoff')}
                  className={`p-2.5 rounded-xl font-bold cursor-pointer text-right transition-all flex items-center justify-between ${
                    mode === 'kirchhoff' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>قاعدتا كيرشوف (KCL & KVL)</span>
                  <Network className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setMode('wheatstone')}
                  className={`p-2.5 rounded-xl font-bold cursor-pointer text-right transition-all flex items-center justify-between ${
                    mode === 'wheatstone' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>قنطرة وتستون (Wheatstone Bridge)</span>
                  <Sliders className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setMode('resistivity')}
                  className={`p-2.5 rounded-xl font-bold cursor-pointer text-right transition-all flex items-center justify-between ${
                    mode === 'resistivity' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>المقاومة النوعية (R = ρL/A)</span>
                  <Zap className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Kirchhoff Controls */}
            {mode === 'kirchhoff' && (
              <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400">البطارية E₁ (V)</label>
                    <input
                      type="number"
                      min="2"
                      max="30"
                      value={emf1}
                      onChange={(e) => setEmf1(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-center font-mono text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400">البطارية E₂ (V)</label>
                    <input
                      type="number"
                      min="2"
                      max="30"
                      value={emf2}
                      onChange={(e) => setEmf2(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-center font-mono text-slate-100"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">المقاومة R₁ (Loop 1)</span>
                    <span className="font-mono text-cyan-400 font-bold">{r1} Ω</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={r1}
                    onChange={(e) => setR1(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">المقاومة R₂ (Loop 2)</span>
                    <span className="font-mono text-cyan-400 font-bold">{r2} Ω</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={r2}
                    onChange={(e) => setR2(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">المقاومة المشتركة R₃</span>
                    <span className="font-mono text-emerald-400 font-bold">{r3} Ω</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={r3}
                    onChange={(e) => setR3(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Wheatstone Controls */}
            {mode === 'wheatstone' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">مقاومة الضبط R₃ (Variable)</span>
                    <span className="font-mono text-amber-400 font-bold">{wbR3} Ω</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="350"
                    step="5"
                    value={wbR3}
                    onChange={(e) => setWbR3(parseInt(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500">
                    حرّك المقاومة R₃ حتى يتصفر تيار الجلفانومتر (I_G = 0)
                  </div>
                </div>

                <button
                  onClick={balanceWheatstonePreset}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  موازنة القنطرة آلياً (R₃ = 150 Ω)
                </button>
              </div>
            )}

            {/* Resistivity Controls */}
            {mode === 'resistivity' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400">مادة الموصل</label>
                  <select
                    value={materialId}
                    onChange={(e) => setMaterialId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100"
                  >
                    {WIRE_MATERIALS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.nameAr}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">طول السلك (L)</span>
                    <span className="font-mono text-cyan-400 font-bold">{wireLength} m</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="20.0"
                    step="0.5"
                    value={wireLength}
                    onChange={(e) => setWireLength(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">قطر السلك (d)</span>
                    <span className="font-mono text-cyan-400 font-bold">{wireDiamMm} mm</span>
                  </div>
                  <input
                    type="range"
                    min="0.4"
                    max="3.0"
                    step="0.1"
                    value={wireDiamMm}
                    onChange={(e) => setWireDiamMm(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">درجة الحرارة (T)</span>
                    <span className="font-mono text-rose-400 font-bold">{wireTemp} °C</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={wireTemp}
                    onChange={(e) => setWireTemp(parseInt(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </SimulationControls>

          {/* Educational Concept Box */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <h5 className="font-bold text-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>قوانين كيرشوف وقنطرة وتستون</span>
            </h5>
            <p className="text-slate-400">
              <strong>قاعدة كيرشوف الأولى (KCL):</strong> المجموع الجبري للتيارات الداخلة إلى أي نقطة تفرع (عقدة) يساوي المجموع الجبري للتيارات الخارجة منها (حفظ الشحنة الكهربائية): ΣI_in = ΣI_out.
            </p>
            <p className="text-slate-400">
              <strong>قنطرة وتستون:</strong> عند اتزان القنطرة لا يمر تيار في الجلفانومتر، وتتحقق النسبة: R1/R2 = R3/Rx، مما يمكننا من قياس أي مقاومة مجهولة بدقة متناهية.
            </p>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
