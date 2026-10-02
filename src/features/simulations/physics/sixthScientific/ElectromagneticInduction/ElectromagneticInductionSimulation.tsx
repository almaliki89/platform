import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  calculateMagneticFlux,
  calculateFaradayInduction,
  calculateMotionalEmf,
  calculateGenerator,
  calculateSelfInduction,
} from './calculations';
import { InductionMode } from './types';
import { Magnet, Play, Pause, RotateCcw, Activity, Disc, Sparkles, MoveRight, ArrowDown } from 'lucide-react';

export const ElectromagneticInductionSimulation: React.FC = () => {
  const [mode, setMode] = useState<InductionMode>('magnet-coil');

  // Magnet + Coil state
  const [magnetSpeed, setMagnetSpeed] = useState<number>(1.5); // m/s
  const [isApproaching, setIsApproaching] = useState<boolean>(true);
  const [poleFacing, setPoleFacing] = useState<'N' | 'S'>('N');
  const [coilTurns, setCoilTurns] = useState<number>(200);
  const [coilAreaCm2, setCoilAreaCm2] = useState<number>(50); // cm^2
  const [bFieldTesla, setBFieldTesla] = useState<number>(0.8); // T

  // Sliding Rod state
  const [rodVel, setRodVel] = useState<number>(4.0); // m/s
  const [rodLen, setRodLen] = useState<number>(0.6); // m
  const [rodB, setRodB] = useState<number>(1.2); // T
  const [rodR, setRodR] = useState<number>(3.0); // Ω

  // Generator state
  const [genRpm, setGenRpm] = useState<number>(300); // RPM
  const [genTurns, setGenTurns] = useState<number>(100);
  const [genB, setGenB] = useState<number>(0.5); // T
  const [genArea, setGenArea] = useState<number>(80); // cm^2

  // Self induction state
  const [inductanceH, setInductanceH] = useState<number>(0.2); // H
  const [indCurrent, setIndCurrent] = useState<number>(5.0); // A
  const [deltaI, setDeltaI] = useState<number>(10.0); // A/s

  // Animation timeline
  const [simTime, setSimTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Calculations
  const fluxResult = calculateMagneticFlux(bFieldTesla, coilAreaCm2, 0);
  const deltaFlux = fluxResult.magneticFluxWebers * (isApproaching ? 1 : -1);
  const dtApprox = 0.1 / Math.max(0.2, magnetSpeed);
  const faradayResult = calculateFaradayInduction(coilTurns, deltaFlux, dtApprox, isApproaching);
  const motionalResult = calculateMotionalEmf(rodVel, rodB, rodLen, rodR);
  const genResult = calculateGenerator(genTurns, genB, genArea, genRpm, simTime);
  const selfIndResult = calculateSelfInduction(inductanceH, indCurrent, deltaI, 1.0);

  // Animation frame loop
  useEffect(() => {
    if (!isPlaying) return;
    let animId: number;
    let lastStamp = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastStamp) / 1000;
      lastStamp = now;
      setSimTime((prev) => prev + dt);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

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

    if (mode === 'magnet-coil') {
      // Faraday & Lenz Magnet + Coil Visual
      const cy = height / 2;
      const coilCenterX = width * 0.65;
      const coilRadius = 65;

      // Magnet Position animated back and forth if playing
      const magnetTravel = Math.sin(simTime * magnetSpeed * 2.5);
      // Normalized magnet distance (0 = inside coil, 1 = far left)
      const magnetDistRatio = 0.5 + 0.4 * magnetTravel;
      const magnetX = 140 + magnetDistRatio * 180;
      const magnetW = 100;
      const magnetH = 44;

      // Magnet Body
      // Left pole
      ctx.fillStyle = poleFacing === 'N' ? '#3b82f6' : '#ef4444';
      ctx.fillRect(magnetX - magnetW / 2, cy - magnetH / 2, magnetW / 2, magnetH);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(poleFacing === 'N' ? 'S' : 'N', magnetX - magnetW / 4, cy + 6);

      // Right pole (Facing Coil)
      ctx.fillStyle = poleFacing === 'N' ? '#ef4444' : '#3b82f6';
      ctx.fillRect(magnetX, cy - magnetH / 2, magnetW / 2, magnetH);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(poleFacing, magnetX + magnetW / 4, cy + 6);

      // Magnet border
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 2;
      ctx.strokeRect(magnetX - magnetW / 2, cy - magnetH / 2, magnetW, magnetH);

      // Velocity arrow on magnet
      const isMovingRight = Math.cos(simTime * magnetSpeed * 2.5) > 0;
      const arrowDir = isMovingRight ? 1 : -1;
      ctx.strokeStyle = '#10b981';
      ctx.fillStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(magnetX - 25 * arrowDir, cy - magnetH / 2 - 16);
      ctx.lineTo(magnetX + 25 * arrowDir, cy - magnetH / 2 - 16);
      ctx.stroke();

      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText(
        isMovingRight ? 'حركة اقتراب نحو الملف →' : '← حركة ابتعاد عن الملف',
        magnetX,
        cy - magnetH / 2 - 26
      );

      // Coil (Solenoid) Coils
      ctx.strokeStyle = '#d97706'; // copper
      ctx.lineWidth = 4;
      const coilLoops = 8;
      const coilSpan = 140;

      for (let i = 0; i < coilLoops; i++) {
        const cxLoop = coilCenterX - coilSpan / 2 + (i * coilSpan) / (coilLoops - 1);
        ctx.beginPath();
        ctx.ellipse(cxLoop, cy, 14, coilRadius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Induced Pole on Coil Face (Lenz's Law)
      // If approaching with N pole: coil face becomes N (repulsion)
      // If receding with N pole: coil face becomes S (attraction)
      const inducedPoleOnFace = isMovingRight ? poleFacing : poleFacing === 'N' ? 'S' : 'N';
      ctx.fillStyle = inducedPoleOnFace === 'N' ? '#ef4444' : '#3b82f6';
      ctx.beginPath();
      ctx.arc(coilCenterX - coilSpan / 2 - 20, cy, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.fillText(inducedPoleOnFace, coilCenterX - coilSpan / 2 - 20, cy + 5);

      ctx.font = '10px Inter, sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('القطب المحتث', coilCenterX - coilSpan / 2 - 20, cy + 32);

      // Galvanometer connected below coil
      const galvX = coilCenterX;
      const galvY = cy + 110;

      // Connecting wires
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(coilCenterX - coilSpan / 2, cy + coilRadius);
      ctx.lineTo(coilCenterX - coilSpan / 2, galvY);
      ctx.lineTo(galvX - 35, galvY);
      ctx.moveTo(coilCenterX + coilSpan / 2, cy + coilRadius);
      ctx.lineTo(coilCenterX + coilSpan / 2, galvY);
      ctx.lineTo(galvX + 35, galvY);
      ctx.stroke();

      // Galvanometer meter circle
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(galvX, galvY, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Galvanometer Needle (Deflects based on induced EMF sign)
      const needleDeflection = arrowDir * (poleFacing === 'N' ? -0.7 : 0.7);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(galvX, galvY + 14);
      ctx.lineTo(galvX + 26 * Math.sin(needleDeflection), galvY - 26 * Math.cos(needleDeflection));
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText('G (جلفانومتر صفر الوسط)', galvX, galvY + 50);
    } else if (mode === 'sliding-rod') {
      // Motional EMF U-shaped Rail
      const railLeft = 120;
      const railRight = width - 120;
      const railTop = 90;
      const railBottom = height - 90;

      // Magnetic field crosses ⊗ inside loop
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.lineWidth = 1.5;
      for (let x = railLeft + 25; x < railRight - 20; x += 38) {
        for (let y = railTop + 25; y < railBottom - 20; y += 38) {
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x - 3, y - 3);
          ctx.lineTo(x + 3, y + 3);
          ctx.moveTo(x + 3, y - 3);
          ctx.lineTo(x - 3, y + 3);
          ctx.stroke();
        }
      }

      // U-rail conductors
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      // Left vertical rail with resistor
      ctx.moveTo(railLeft, railTop);
      ctx.lineTo(railLeft, railBottom);
      // Top horizontal rail
      ctx.lineTo(railRight, railBottom);
      ctx.moveTo(railLeft, railTop);
      // Bottom horizontal rail
      ctx.lineTo(railRight, railTop);
      ctx.stroke();

      // Resistor on left rail
      const resY = (railTop + railBottom) / 2;
      ctx.fillStyle = '#090d16';
      ctx.fillRect(railLeft - 10, resY - 22, 20, 44);
      ctx.fillStyle = '#334155';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.fillRect(railLeft - 8, resY - 18, 16, 36);
      ctx.strokeRect(railLeft - 8, resY - 18, 16, 36);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`R = ${rodR} Ω`, railLeft - 18, resY + 4);

      // Sliding Rod Position (moving right)
      const rodX = railLeft + 60 + ((simTime * rodVel * 35) % (railRight - railLeft - 100));

      // Rod body
      ctx.strokeStyle = '#f59e0b'; // amber rod
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(rodX, railTop - 12);
      ctx.lineTo(rodX, railBottom + 12);
      ctx.stroke();

      // Velocity Arrow →
      ctx.strokeStyle = '#10b981';
      ctx.fillStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(rodX, resY);
      ctx.lineTo(rodX + 50, resY);
      ctx.stroke();
      ctx.fillText(`v = ${rodVel} m/s`, rodX + 60, resY + 4);

      // Retarding Magnetic Force Arrow ←
      ctx.strokeStyle = '#f43f5e';
      ctx.fillStyle = '#f43f5e';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(rodX, resY + 30);
      ctx.lineTo(rodX - 45, resY + 30);
      ctx.stroke();
      ctx.fillText(`F_B = ${motionalResult.magneticBrakingForceN.toFixed(2)} N (معرقلة)`, rodX - 55, resY + 34);

      // Current Circulation Arrows
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`التيار المحتث I = ${motionalResult.inducedCurrentAmperes.toFixed(2)} A (عكس عقارب الساعة ↺)`, (railLeft + rodX) / 2, railTop - 20);
    } else if (mode === 'rotating-coil') {
      // AC Generator Sine Wave
      const graphX = 80;
      const graphY = 60;
      const graphW = width * 0.55;
      const graphH = height - 120;
      const midY = graphY + graphH / 2;

      // Axis
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(graphX, midY);
      ctx.lineTo(graphX + graphW, midY);
      ctx.moveTo(graphX, graphY);
      ctx.lineTo(graphX, graphY + graphH);
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('الفولتية ε(t) (V)', graphX + 15, graphY - 10);
      ctx.textAlign = 'left';
      ctx.fillText('الزمن t (s)', graphX + graphW - 10, midY + 22);

      // Sine Waveform
      const peakV = genResult.peakEmfVolts;
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();

      const period = 1 / Math.max(0.1, genResult.frequencyHz);
      const totalT = period * 2;
      for (let px = 0; px <= graphW; px++) {
        const t = (px / graphW) * totalT;
        const v = peakV * Math.sin(genResult.angularSpeedRad_s * (simTime + t));
        const py = midY - (v / Math.max(0.1, peakV)) * (graphH / 2 - 15);
        if (px === 0) ctx.moveTo(graphX + px, py);
        else ctx.lineTo(graphX + px, py);
      }
      ctx.stroke();

      // Rotating Coil Disc representation on right
      const rotCenterX = width * 0.78;
      const rotCenterY = height / 2;
      const coilRad = 45;

      // Magnetic Pole N (left) and S (right)
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(rotCenterX - 75, rotCenterY - 45, 20, 90);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.fillText('N', rotCenterX - 65, rotCenterY + 5);

      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(rotCenterX + 55, rotCenterY - 45, 20, 90);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('S', rotCenterX + 65, rotCenterY + 5);

      // Rotating Loop angle
      const coilAngle = genResult.angularSpeedRad_s * simTime;
      ctx.save();
      ctx.translate(rotCenterX, rotCenterY);
      ctx.rotate(coilAngle);

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.strokeRect(-25, -coilRad, 50, coilRad * 2);
      ctx.restore();

      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ملف المولد الدوار (N turns)', rotCenterX, rotCenterY + 70);
    } else {
      // Self Induction Circuit
      const cx = width / 2;
      const cy = height / 2;

      // Inductor Coil Symbol
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 160, cy);
      const loops = 5;
      for (let i = 0; i < loops; i++) {
        const lx = cx - 100 + i * 40;
        ctx.arc(lx, cy, 18, Math.PI, 0, false);
      }
      ctx.lineTo(cx + 160, cy);
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`المحث L = ${inductanceH} H`, cx, cy - 35);
      ctx.fillText(`التيار المار: I = ${indCurrent} A`, cx, cy + 45);

      // Energy Box
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.beginPath();
      ctx.roundRect(cx - 140, cy + 65, 280, 50, 10);
      ctx.fill();
      ctx.strokeStyle = '#334155';
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText(`الطاقة المختزنة في المحث: U_L = ½ L I² = ${selfIndResult.storedMagneticEnergyJoules.toFixed(2)} J`, cx, cy + 95);
    }
  }, [mode, magnetSpeed, isApproaching, poleFacing, coilTurns, coilAreaCm2, bFieldTesla, simTime, rodVel, rodLen, rodB, rodR, motionalResult, genRpm, genTurns, genB, genArea, genResult, inductanceH, indCurrent, deltaI, selfIndResult]);

  const handleReset = () => {
    setMagnetSpeed(1.5);
    setIsApproaching(true);
    setPoleFacing('N');
    setCoilTurns(200);
    setCoilAreaCm2(50);
    setBFieldTesla(0.8);
    setRodVel(4.0);
    setRodLen(0.6);
    setRodB(1.2);
    setRodR(3.0);
    setGenRpm(300);
    setGenTurns(100);
    setGenB(0.5);
    setGenArea(80);
    setInductanceH(0.2);
    setIndCurrent(5.0);
    setDeltaI(10.0);
    setSimTime(0);
  };

  return (
    <SimulationShell
      title="مختبر الحث الكهرومغناطيسي"
      subtitle="الفصل الثاني — قانون فرداي، قانون لنز، القوة الدافعة الحركية (motional emf)، الحث الذاتي والمولد الكهربائي"
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

            {/* Play/Pause overlay */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 rounded-xl bg-slate-900/90 text-cyan-400 hover:bg-slate-800 border border-slate-700 backdrop-blur-md cursor-pointer transition-all"
                title={isPlaying ? 'إيقاف الحركة' : 'تشغيل الحركة'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setSimTime(0)}
                className="p-2.5 rounded-xl bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-700 backdrop-blur-md cursor-pointer transition-all"
                title="إعادة التصفير"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* HUD Metrics */}
          {mode === 'magnet-coil' && (
            <SimulationHUD>
              <HUDMetric
                label="الفيض المغناطيسي (Φ = B·A)"
                value={(fluxResult.magneticFluxWebers * 1000).toFixed(2)}
                unit="mWb"
                highlight={true}
              />
              <HUDMetric
                label="القوة الدافعة المحتثة (ε = -N ΔΦ/Δt)"
                value={Math.abs(faradayResult.inducedEmfVolts).toFixed(2)}
                unit="V"
                highlight={true}
              />
              <HUDMetric
                label="عدد لفات الملف (N)"
                value={coilTurns.toString()}
                unit="لفة"
              />
              <HUDMetric
                label="استجابة قانون لنز"
                value={isApproaching ? 'تنافر (مقاومة زيادة الفيض)' : 'تجاذب (مقاومة نقصان الفيض)'}
                highlight={true}
              />
            </SimulationHUD>
          )}

          {mode === 'sliding-rod' && (
            <SimulationHUD>
              <HUDMetric
                label="القوة الدافعة الحركية (ε = v·B·L)"
                value={motionalResult.motionalEmfVolts.toFixed(2)}
                unit="V"
                highlight={true}
              />
              <HUDMetric
                label="التيار المحتث (I = ε/R)"
                value={motionalResult.inducedCurrentAmperes.toFixed(2)}
                unit="A"
                highlight={true}
              />
              <HUDMetric
                label="القوة المعرقلة (FB = I·L·B)"
                value={motionalResult.magneticBrakingForceN.toFixed(2)}
                unit="N"
              />
              <HUDMetric
                label="القدرة المتبددة (P = I²·R)"
                value={motionalResult.dissipatedPowerWatts.toFixed(2)}
                unit="W"
              />
            </SimulationHUD>
          )}

          {mode === 'rotating-coil' && (
            <SimulationHUD>
              <HUDMetric
                label="ذروة الفولتية المحتثة (εmax)"
                value={genResult.peakEmfVolts.toFixed(1)}
                unit="V"
                highlight={true}
              />
              <HUDMetric
                label="الفولتية اللحظية (ε(t))"
                value={genResult.instantaneousEmfVolts.toFixed(1)}
                unit="V"
                highlight={true}
              />
              <HUDMetric
                label="تردد التوليد (f)"
                value={genResult.frequencyHz.toFixed(1)}
                unit="Hz"
              />
              <HUDMetric
                label="السرعة الزاوية (ω)"
                value={genResult.angularSpeedRad_s.toFixed(1)}
                unit="rad/s"
              />
            </SimulationHUD>
          )}

          {mode === 'self-induction' && (
            <SimulationHUD>
              <HUDMetric
                label="معامل الحث الذاتي (L)"
                value={inductanceH.toFixed(2)}
                unit="H"
                highlight={true}
              />
              <HUDMetric
                label="القوة الدافعة الذاتية (εL)"
                value={Math.abs(selfIndResult.selfInducedEmfVolts).toFixed(1)}
                unit="V"
                highlight={true}
              />
              <HUDMetric
                label="الطاقة المغناطيسية المختزنة"
                value={selfIndResult.storedMagneticEnergyJoules.toFixed(2)}
                unit="J"
                highlight={true}
              />
              <HUDMetric
                label="معدل تغير التيار (ΔI/Δt)"
                value={deltaI.toString()}
                unit="A/s"
              />
            </SimulationHUD>
          )}
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls title="إعدادات الحث الكهرومغناطيسي">
            {/* Mode Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">النمط التجريبي</label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  onClick={() => setMode('magnet-coil')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'magnet-coil' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  المغناطيس والملف (فرداي)
                </button>
                <button
                  onClick={() => setMode('sliding-rod')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'sliding-rod' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  الساق المنزلقة (ε=vBL)
                </button>
                <button
                  onClick={() => setMode('rotating-coil')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'rotating-coil' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  المولد الكهربائي (AC)
                </button>
                <button
                  onClick={() => setMode('self-induction')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'self-induction' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  الحث الذاتي (L)
                </button>
              </div>
            </div>

            {/* Magnet Coil Controls */}
            {mode === 'magnet-coil' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400">القطب المقترب من الملف</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPoleFacing('N')}
                      className={`p-2 rounded-lg font-bold cursor-pointer ${
                        poleFacing === 'N' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      القطب الشمالي (North Pole N)
                    </button>
                    <button
                      onClick={() => setPoleFacing('S')}
                      className={`p-2 rounded-lg font-bold cursor-pointer ${
                        poleFacing === 'S' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      القطب الجنوبي (South Pole S)
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">سرعة حركة المغناطيس (v)</span>
                    <span className="font-mono text-cyan-400 font-bold">{magnetSpeed} m/s</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="4.0"
                    step="0.5"
                    value={magnetSpeed}
                    onChange={(e) => setMagnetSpeed(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">عدد لفات الملف (N)</span>
                    <span className="font-mono text-amber-400 font-bold">{coilTurns}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="25"
                    value={coilTurns}
                    onChange={(e) => setCoilTurns(parseInt(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Sliding Rod Controls */}
            {mode === 'sliding-rod' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">سرعة انزلاق الساق (v)</span>
                    <span className="font-mono text-cyan-400 font-bold">{rodVel} m/s</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="8.0"
                    step="0.5"
                    value={rodVel}
                    onChange={(e) => setRodVel(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">طول الساق الموصلة (L)</span>
                    <span className="font-mono text-cyan-400 font-bold">{rodLen} m</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="1.2"
                    step="0.1"
                    value={rodLen}
                    onChange={(e) => setRodLen(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">كثافة الفيض المغناطيسي (B)</span>
                    <span className="font-mono text-amber-400 font-bold">{rodB} T</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.1"
                    value={rodB}
                    onChange={(e) => setRodB(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Generator Controls */}
            {mode === 'rotating-coil' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">سرعة الدوران (RPM)</span>
                    <span className="font-mono text-cyan-400 font-bold">{genRpm} RPM</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="1200"
                    step="60"
                    value={genRpm}
                    onChange={(e) => setGenRpm(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">عدد اللفات (N)</span>
                    <span className="font-mono text-amber-400 font-bold">{genTurns}</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="300"
                    step="20"
                    value={genTurns}
                    onChange={(e) => setGenTurns(parseInt(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Self Induction Controls */}
            {mode === 'self-induction' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">معامل الحث الذاتي (L)</span>
                    <span className="font-mono text-cyan-400 font-bold">{inductanceH} H</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="1.0"
                    step="0.05"
                    value={inductanceH}
                    onChange={(e) => setInductanceH(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">شدة التيار المار (I)</span>
                    <span className="font-mono text-amber-400 font-bold">{indCurrent} A</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={indCurrent}
                    onChange={(e) => setIndCurrent(parseInt(e.target.value))}
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
              <span>قوانين فرداي ولنز</span>
            </h5>
            <p className="text-slate-400">
              <strong>قانون فرداي:</strong> تتناسب القوة الدافعة الكهربائية المحتثة طردياً مع المعدل الزمني لتغير الفيض المغناطيسي الذي يخترق الدائرة: ε = -N (ΔΦ/Δt).
            </p>
            <p className="text-slate-400">
              <strong>قانون لنز (الإشارة السالبة):</strong> يكون اتجاه التيار الكهربائي المحتث في دائرة مقفلة بحيث يولد مجالاً مغناطيسياً محتثاً يعاكس بتأثيره التغير في الفيض المغناطيسي المسبب لتوليده (حفظ الطاقة).
            </p>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
