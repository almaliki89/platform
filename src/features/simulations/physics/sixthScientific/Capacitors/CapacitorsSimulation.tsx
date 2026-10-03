import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  calculateParallelPlate,
  calculateCombination,
  calculateRcCircuit,
  DIELECTRIC_PRESETS,
} from './calculations';
import { CapacitorMode, CombinationType } from './types';
import { Layers, BatteryCharging, Zap, RotateCcw, Play, Pause, Sparkles, Activity } from 'lucide-react';

export const CapacitorsSimulation: React.FC = () => {
  const [mode, setMode] = useState<CapacitorMode>('parallel-plate');

  // Parallel plate state
  const [plateAreaCm2, setPlateAreaCm2] = useState<number>(200); // cm^2
  const [separationMm, setSeparationMm] = useState<number>(3.0); // mm
  const [dielectricId, setDielectricId] = useState<string>('air');
  const [voltage, setVoltage] = useState<number>(12); // V

  // Combination state
  const [combType, setCombType] = useState<CombinationType>('series');
  const [c1, setC1] = useState<number>(6); // μF
  const [c2, setC2] = useState<number>(12); // μF
  const [c3, setC3] = useState<number>(0); // μF
  const [combVoltage, setCombVoltage] = useState<number>(18); // V

  // RC Circuit state
  const [rcRes, setRcRes] = useState<number>(1000); // 1 kΩ
  const [rcCap, setRcCap] = useState<number>(500); // 500 μF
  const [rcVolt, setRcVolt] = useState<number>(10); // V
  const [isCharging, setIsCharging] = useState<boolean>(true);
  const [rcTime, setRcTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Active dielectric preset
  const selectedDielectric =
    DIELECTRIC_PRESETS.find((d) => d.id === dielectricId) || DIELECTRIC_PRESETS[0];

  // Calculations
  const plateResult = calculateParallelPlate(
    plateAreaCm2,
    separationMm,
    selectedDielectric.dielectricConstantK,
    voltage
  );
  const combResult = calculateCombination(combType, c1, c2, c3, combVoltage);
  const rcResult = calculateRcCircuit(rcRes, rcCap, rcVolt, rcTime, isCharging);

  // RC animation loop
  useEffect(() => {
    if (!isPlaying) return;
    let animId: number;
    let lastStamp = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastStamp) / 1000;
      lastStamp = now;

      setRcTime((prev) => {
        const next = prev + dt;
        if (next >= rcResult.timeConstantSec * 5) {
          return rcResult.timeConstantSec * 5;
        }
        return next;
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, rcResult.timeConstantSec]);

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

    // Dark sleek background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    // Subtle grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
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

    if (mode === 'parallel-plate' || mode === 'stored-energy') {
      // Parallel Plate Visualization
      const cx = width / 2;
      const cy = height / 2;

      // Visual scaled dimensions
      const plateWidth = Math.min(260, Math.max(120, plateAreaCm2 * 0.7));
      const plateHeight = 16;
      const visualSep = Math.min(130, Math.max(35, separationMm * 14));

      const topPlateY = cy - visualSep / 2 - plateHeight;
      const bottomPlateY = cy + visualSep / 2;

      // Dielectric slab between plates
      if (selectedDielectric.dielectricConstantK > 1.0) {
        ctx.fillStyle = selectedDielectric.color;
        ctx.fillRect(cx - plateWidth / 2 + 6, cy - visualSep / 2, plateWidth - 12, visualSep);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.strokeRect(cx - plateWidth / 2 + 6, cy - visualSep / 2, plateWidth - 12, visualSep);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(
          `${selectedDielectric.nameAr.split(' ')[0]} (k = ${selectedDielectric.dielectricConstantK})`,
          cx,
          cy + 4
        );
      }

      // Electric Field Lines (from top + to bottom - if V > 0)
      if (voltage > 0) {
        const lineCount = 9;
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < lineCount; i++) {
          const lx = cx - plateWidth / 2 + 20 + (i * (plateWidth - 40)) / (lineCount - 1);
          ctx.beginPath();
          ctx.moveTo(lx, cy - visualSep / 2);
          ctx.lineTo(lx, cy + visualSep / 2);
          ctx.stroke();

          // Field Arrowhead
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.moveTo(lx, cy + 4);
          ctx.lineTo(lx - 4, cy - 4);
          ctx.lineTo(lx + 4, cy - 4);
          ctx.closePath();
          ctx.fill();
        }
      }

      // Top Plate (+)
      ctx.fillStyle = '#ef4444'; // Red
      ctx.beginPath();
      ctx.roundRect(cx - plateWidth / 2, topPlateY, plateWidth, plateHeight, 4);
      ctx.fill();
      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Top plate positive charge signs
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      for (let i = 0; i < 7; i++) {
        const px = cx - plateWidth / 2 + 18 + (i * (plateWidth - 36)) / 6;
        ctx.fillText('+', px, topPlateY + 12);
      }

      // Bottom Plate (-)
      ctx.fillStyle = '#3b82f6'; // Blue
      ctx.beginPath();
      ctx.roundRect(cx - plateWidth / 2, bottomPlateY, plateWidth, plateHeight, 4);
      ctx.fill();
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Bottom plate negative charge signs
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 7; i++) {
        const px = cx - plateWidth / 2 + 18 + (i * (plateWidth - 36)) / 6;
        ctx.fillText('−', px, bottomPlateY + 12);
      }

      // Connected Battery Wires
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3;

      // Wire to top plate
      ctx.beginPath();
      ctx.moveTo(cx - plateWidth / 2 - 40, topPlateY + plateHeight / 2);
      ctx.lineTo(cx - plateWidth / 2, topPlateY + plateHeight / 2);
      ctx.stroke();

      // Wire to bottom plate
      ctx.beginPath();
      ctx.moveTo(cx - plateWidth / 2 - 40, bottomPlateY + plateHeight / 2);
      ctx.lineTo(cx - plateWidth / 2, bottomPlateY + plateHeight / 2);
      ctx.stroke();

      // Battery symbol
      const batX = cx - plateWidth / 2 - 70;
      ctx.strokeRect(batX - 25, cy - 35, 50, 70);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(batX - 24, cy - 34, 48, 68);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText(`+ ${voltage} V`, batX, cy - 10);
      ctx.fillStyle = '#64748b';
      ctx.fillText('المصدر', batX, cy + 15);

      // Dimension brackets
      // Separation d
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(cx + plateWidth / 2 + 25, cy - visualSep / 2);
      ctx.lineTo(cx + plateWidth / 2 + 25, cy + visualSep / 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(`d = ${separationMm.toFixed(1)} mm`, cx + plateWidth / 2 + 75, cy + 4);

      // Area A
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`المساحة المتقابلة: A = ${plateAreaCm2} cm²`, cx, topPlateY - 14);

      if (mode === 'stored-energy') {
        // Stored energy glow ring in center
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cx, cy, 50, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#38bdf8';
        ctx.fillText(`PE = ½ C V² = ${plateResult.storedEnergyMicroJoules.toFixed(2)} μJ`, cx, cy + visualSep / 2 + 45);
      }
    } else if (mode === 'series-parallel') {
      // Series vs Parallel Schematic
      const cx = width / 2;
      const cy = height / 2;

      if (combType === 'series') {
        // Series line
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(100, cy);
        ctx.lineTo(width - 100, cy);
        ctx.stroke();

        const xPositions = c3 > 0 ? [200, cx, width - 200] : [cx - 100, cx + 100];
        combResult.branches.forEach((b, i) => {
          const capX = xPositions[i];
          // Clear gap for capacitor plates
          ctx.fillStyle = '#090d16';
          ctx.fillRect(capX - 16, cy - 35, 32, 70);

          // Left plate
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(capX - 8, cy - 30, 4, 60);
          // Right plate
          ctx.fillStyle = '#3b82f6';
          ctx.fillRect(capX + 4, cy - 30, 4, 60);

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 11px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(`C${i + 1} = ${b.cMicroF} μF`, capX, cy - 40);
          ctx.fillStyle = '#38bdf8';
          ctx.fillText(`V${i + 1} = ${b.voltageV.toFixed(1)} V`, capX, cy + 48);
          ctx.fillText(`Q = ${b.chargeMicroC.toFixed(1)} μC`, capX, cy + 64);
        });
      } else {
        // Parallel branches
        const yPositions = c3 > 0 ? [cy - 70, cy, cy + 70] : [cy - 50, cy + 50];
        const leftBusX = 180;
        const rightBusX = width - 180;

        // Vertical bus wires
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(leftBusX, yPositions[0]);
        ctx.lineTo(leftBusX, yPositions[yPositions.length - 1]);
        ctx.moveTo(rightBusX, yPositions[0]);
        ctx.lineTo(rightBusX, yPositions[yPositions.length - 1]);
        ctx.stroke();

        // Horizontal branch wires & capacitors
        combResult.branches.forEach((b, i) => {
          const by = yPositions[i];
          ctx.beginPath();
          ctx.moveTo(leftBusX, by);
          ctx.lineTo(cx - 15, by);
          ctx.moveTo(cx + 15, by);
          ctx.lineTo(rightBusX, by);
          ctx.stroke();

          // Left plate
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(cx - 8, by - 20, 4, 40);
          // Right plate
          ctx.fillStyle = '#3b82f6';
          ctx.fillRect(cx + 4, by - 20, 4, 40);

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 11px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(`C${i + 1}=${b.cMicroF}μF (Q=${b.chargeMicroC.toFixed(1)}μC)`, cx, by - 26);
        });
      }
    } else {
      // RC Circuit Waveform Graph & Charging Bulb
      const graphX = 80;
      const graphY = 60;
      const graphW = width * 0.55;
      const graphH = height - 120;

      // Axes
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(graphX, graphY);
      ctx.lineTo(graphX, graphY + graphH);
      ctx.lineTo(graphX + graphW, graphY + graphH);
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('الجهد V_C (V)', graphX + 20, graphY - 12);
      ctx.textAlign = 'left';
      ctx.fillText('الزمن t (s)', graphX + graphW - 10, graphY + graphH + 25);

      // Max Voltage Dashed Line
      ctx.strokeStyle = '#f87171';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(graphX, graphY + 15);
      ctx.lineTo(graphX + graphW, graphY + 15);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#f87171';
      ctx.fillText(`V₀ = ${rcVolt} V`, graphX - 45, graphY + 18);

      // Draw Voltage Curve
      const tau = rcResult.timeConstantSec;
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();

      const totalSimT = tau * 5;
      for (let px = 0; px <= graphW; px++) {
        const t = (px / graphW) * totalSimT;
        let v = isCharging ? rcVolt * (1 - Math.exp(-t / tau)) : rcVolt * Math.exp(-t / tau);
        const py = graphY + graphH - (v / rcVolt) * (graphH - 20);
        if (px === 0) ctx.moveTo(graphX + px, py);
        else ctx.lineTo(graphX + px, py);
      }
      ctx.stroke();

      // Current progress dot
      const dotX = graphX + (rcTime / totalSimT) * graphW;
      const dotY = graphY + graphH - (rcResult.capacitorVoltageV / rcVolt) * (graphH - 20);
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(dotX, dotY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Bulb & Circuit representation on right side
      const bulbX = width * 0.78;
      const bulbY = height / 2;

      // Glow intensity based on current
      const bulbGlow = Math.min(1.0, Math.abs(rcResult.currentAmperes) * 100);
      const bulbGrad = ctx.createRadialGradient(bulbX, bulbY, 5, bulbX, bulbY, 55);
      bulbGrad.addColorStop(0, `rgba(251, 191, 36, ${0.2 + bulbGlow * 0.7})`);
      bulbGrad.addColorStop(1, 'rgba(251, 191, 36, 0)');
      ctx.fillStyle = bulbGrad;
      ctx.beginPath();
      ctx.arc(bulbX, bulbY, 55, 0, Math.PI * 2);
      ctx.fill();

      // Bulb Glass
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(bulbX, bulbY - 10, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(isCharging ? 'شحن المتسعة' : 'تفريغ المتسعة', bulbX, bulbY + 45);
      ctx.font = '11px Inter, sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`ثابت الزمن τ = RC = ${tau.toFixed(2)} s`, bulbX, bulbY + 65);
    }
  }, [mode, plateAreaCm2, separationMm, selectedDielectric, voltage, plateResult, combType, c1, c2, c3, combVoltage, combResult, rcRes, rcCap, rcVolt, isCharging, rcTime, rcResult]);

  const handleReset = () => {
    setPlateAreaCm2(200);
    setSeparationMm(3.0);
    setDielectricId('air');
    setVoltage(12);
    setC1(6);
    setC2(12);
    setC3(0);
    setCombVoltage(18);
    setRcRes(1000);
    setRcCap(500);
    setRcVolt(10);
    setRcTime(0);
  };

  return (
    <SimulationShell
      title="مختبر المتسعات"
      subtitle="الفصل الأول — المتسعة ذات الصفيحتين المتوازيتين، العوازل الكهربائية وثابت العزل، ربط التوالي والتوازي، ودائرة RC"
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

            {/* RC controls overlay */}
            {mode === 'rc-circuit' && (
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2.5 rounded-xl bg-slate-900/90 text-cyan-400 hover:bg-slate-800 border border-slate-700 backdrop-blur-md cursor-pointer transition-all"
                  title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setRcTime(0)}
                  className="p-2.5 rounded-xl bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-700 backdrop-blur-md cursor-pointer transition-all"
                  title="إعادة التصفير"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* HUD Metrics */}
          {mode === 'parallel-plate' && (
            <SimulationHUD>
              <HUDMetric
                label="السعة الكهربائية (C = kε₀A/d)"
                value={plateResult.capacitancePicoFarads.toFixed(2)}
                unit="pF"
                highlight={true}
              />
              <HUDMetric
                label="الشحنة المختزنة (Q = C·V)"
                value={(plateResult.chargeMicroCoulombs * 1000).toFixed(2)}
                unit="nC"
                highlight={true}
              />
              <HUDMetric
                label="الطاقة المختزنة (PE = ½CV²)"
                value={(plateResult.storedEnergyMicroJoules * 1000).toFixed(2)}
                unit="nJ"
              />
              <HUDMetric
                label="شدة المجال الكهربائي (E = V/d)"
                value={(plateResult.electricFieldV_m / 1000).toFixed(2)}
                unit="kV/m"
              />
            </SimulationHUD>
          )}

          {mode === 'series-parallel' && (
            <SimulationHUD>
              <HUDMetric
                label="السعة المكافئة (Ceq)"
                value={combResult.cEquivalentMicroF.toFixed(2)}
                unit="μF"
                highlight={true}
              />
              <HUDMetric
                label="الشحنة الكلية (Qtotal)"
                value={combResult.totalChargeMicroC.toFixed(1)}
                unit="μC"
                highlight={true}
              />
              <HUDMetric
                label="الطاقة المختزنة الكلية"
                value={combResult.totalEnergyMicroJ.toFixed(1)}
                unit="μJ"
              />
              <HUDMetric
                label="نوع الربط"
                value={combType === 'series' ? 'ربط توالي' : 'ربط توازي'}
                highlight={true}
              />
            </SimulationHUD>
          )}

          {mode === 'stored-energy' && (
            <SimulationHUD>
              <HUDMetric
                label="الطاقة المختزنة (PE = ½CV²)"
                value={(plateResult.storedEnergyMicroJoules * 1000).toFixed(2)}
                unit="nJ"
                highlight={true}
              />
              <HUDMetric
                label="صيغة الطاقة بدلالة الشحنة"
                value="PE = ½ Q·V"
              />
              <HUDMetric
                label="صيغة الطاقة بدلالة Q و C"
                value="PE = Q² / (2C)"
              />
              <HUDMetric
                label="ثابت العزل (k)"
                value={selectedDielectric.dielectricConstantK.toString()}
                highlight={true}
              />
            </SimulationHUD>
          )}

          {mode === 'rc-circuit' && (
            <SimulationHUD>
              <HUDMetric
                label="جهد المتسعة اللحظي (Vc)"
                value={rcResult.capacitorVoltageV.toFixed(2)}
                unit="V"
                highlight={true}
              />
              <HUDMetric
                label="تيار الدائرة اللحظي (I)"
                value={(rcResult.currentAmperes * 1000).toFixed(2)}
                unit="mA"
              />
              <HUDMetric
                label="ثابت زمن الدائرة (τ = R·C)"
                value={rcResult.timeConstantSec.toFixed(2)}
                unit="s"
                highlight={true}
              />
              <HUDMetric
                label="الزمن المنقضي (t)"
                value={rcTime.toFixed(2)}
                unit="s"
              />
            </SimulationHUD>
          )}
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls title="إعدادات المتسعات" onReset={handleReset}>
            {/* Mode Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">النمط التعليمي</label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  onClick={() => setMode('parallel-plate')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'parallel-plate' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  الصفيحتان والعازل
                </button>
                <button
                  onClick={() => setMode('series-parallel')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'series-parallel' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  ربط التوالي والتوازي
                </button>
                <button
                  onClick={() => setMode('stored-energy')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'stored-energy' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  الطاقة المختزنة (PE)
                </button>
                <button
                  onClick={() => setMode('rc-circuit')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'rc-circuit' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  شحن وتفريغ RC
                </button>
              </div>
            </div>

            {/* Parallel Plate Controls */}
            {(mode === 'parallel-plate' || mode === 'stored-energy') && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400">المادة العازلة بين الصفيحتين</label>
                  <select
                    value={dielectricId}
                    onChange={(e) => setDielectricId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100"
                  >
                    {DIELECTRIC_PRESETS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.nameAr} (k = {d.dielectricConstantK})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">المساحة المتقابلة (A)</span>
                    <span className="font-mono text-cyan-400 font-bold">{plateAreaCm2} cm²</span>
                  </div>
                  <input
                    type="range"
                    aria-label="المساحة المتقابلة"
                    min="10"
                    max="500"
                    step="5"
                    value={plateAreaCm2}
                    onChange={(e) => setPlateAreaCm2(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">البعد بين الصفيحتين (d)</span>
                    <span className="font-mono text-amber-400 font-bold">{separationMm.toFixed(1)} mm</span>
                  </div>
                  <input
                    type="range"
                    aria-label="البعد بين الصفيحتين"
                    min="1.0"
                    max="8.0"
                    step="0.5"
                    value={separationMm}
                    onChange={(e) => setSeparationMm(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">فرق الجهد الكهربائي (V)</span>
                    <span className="font-mono text-rose-400 font-bold">{voltage} V</span>
                  </div>
                  <input
                    type="range"
                    aria-label="فرق الجهد الكهربائي"
                    min="0"
                    max="30"
                    value={voltage}
                    onChange={(e) => setVoltage(parseInt(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Combinations Controls */}
            {mode === 'series-parallel' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400">طريقة الربط</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setCombType('series')}
                      className={`p-2 rounded-lg font-bold cursor-pointer ${
                        combType === 'series' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      ربط توالي (Series)
                    </button>
                    <button
                      onClick={() => setCombType('parallel')}
                      className={`p-2 rounded-lg font-bold cursor-pointer ${
                        combType === 'parallel' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      ربط توازي (Parallel)
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">سعة المتسعة الأولى C₁</span>
                    <span className="font-mono text-cyan-400 font-bold">{c1} μF</span>
                  </div>
                  <input
                    type="range"
                    aria-label="سعة المتسعة الأولى"
                    min="2"
                    max="24"
                    value={c1}
                    onChange={(e) => setC1(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">سعة المتسعة الثانية C₂</span>
                    <span className="font-mono text-cyan-400 font-bold">{c2} μF</span>
                  </div>
                  <input
                    type="range"
                    aria-label="سعة المتسعة الثانية"
                    min="2"
                    max="24"
                    value={c2}
                    onChange={(e) => setC2(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">سعة المتسعة الثالثة C₃ (اختياري)</span>
                    <span className="font-mono text-cyan-400 font-bold">{c3} μF</span>
                  </div>
                  <input
                    type="range"
                    aria-label="سعة المتسعة الثالثة"
                    min="0"
                    max="24"
                    step="2"
                    value={c3}
                    onChange={(e) => setC3(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">فولتية المصدر الكلية (V)</span>
                    <span className="font-mono text-rose-400 font-bold">{combVoltage} V</span>
                  </div>
                  <input
                    type="range"
                    aria-label="فولتية المصدر الكلية"
                    min="6"
                    max="36"
                    value={combVoltage}
                    onChange={(e) => setCombVoltage(parseInt(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* RC Controls */}
            {mode === 'rc-circuit' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400">حالة الدائرة</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setIsCharging(true);
                        setRcTime(0);
                      }}
                      className={`p-2 rounded-lg font-bold cursor-pointer ${
                        isCharging ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      شحن المتسعة (Charge)
                    </button>
                    <button
                      onClick={() => {
                        setIsCharging(false);
                        setRcTime(0);
                      }}
                      className={`p-2 rounded-lg font-bold cursor-pointer ${
                        !isCharging ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      تفريغ المتسعة (Discharge)
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">مقاومة الدائرة (R)</span>
                    <span className="font-mono text-amber-400 font-bold">{rcRes} Ω</span>
                  </div>
                  <input
                    type="range"
                    aria-label="مقاومة الدائرة"
                    min="200"
                    max="3000"
                    step="100"
                    value={rcRes}
                    onChange={(e) => setRcRes(parseInt(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">سعة المتسعة (C)</span>
                    <span className="font-mono text-cyan-400 font-bold">{rcCap} μF</span>
                  </div>
                  <input
                    type="range"
                    aria-label="سعة المتسعة"
                    min="100"
                    max="1000"
                    step="50"
                    value={rcCap}
                    onChange={(e) => setRcCap(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </SimulationControls>

          {/* Educational Concept Box */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <h5 className="font-bold text-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>مفاهيم المتسعات والعوازل</span>
            </h5>
            <p className="text-slate-400">
              <strong>إدخال العازل الكهربائي:</strong> يعمل العازل ذو ثابت العزل k على زيادة سعة المتسعة بمقدار k مرة (Ck = k·C)، ويقلل من شدة المجال الكهربائي بين الصفيحتين (Ek = E/k) إذا كانت مفصولة عن المصدر.
            </p>
            <p className="text-slate-400">
              <strong>الطاقة المختزنة:</strong> تُختزن الطاقة في المجال الكهربائي بين الصفيحتين وتساوي المساحة تحت منحنى (الشحنة-الجهد): PE = ½ Q·V = ½ C·V².
            </p>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
