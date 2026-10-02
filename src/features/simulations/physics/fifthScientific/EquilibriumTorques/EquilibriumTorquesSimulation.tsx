import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateEquilibriumState } from './calculations';
import { ForceApplied } from './types';
import { Scale, RotateCcw, Sparkles, CheckCircle2, AlertTriangle, ArrowDown, ArrowUp } from 'lucide-react';

export const EquilibriumTorquesSimulation: React.FC = () => {
  const [beamLengthM, setBeamLengthM] = useState<number>(6.0);
  const [pivotM, setPivotM] = useState<number>(3.0);
  const [mode, setMode] = useState<'two-forces' | 'three-forces' | 'angled' | 'couple'>('two-forces');

  // Forces state
  const [f1Mag, setF1Mag] = useState<number>(20);
  const [f1Pos, setF1Pos] = useState<number>(1.0);
  const [f1Angle, setF1Angle] = useState<number>(90);

  const [f2Mag, setF2Mag] = useState<number>(20);
  const [f2Pos, setF2Pos] = useState<number>(5.0);
  const [f2Angle, setF2Angle] = useState<number>(90);

  const [f3Mag, setF3Mag] = useState<number>(15);
  const [f3Pos, setF3Pos] = useState<number>(4.0);
  const [f3Angle, setF3Angle] = useState<number>(90);

  // Couple mode forces
  const [coupleForce, setCoupleForce] = useState<number>(25);
  const [coupleDist, setCoupleDist] = useState<number>(2.0);

  // Compile active forces according to mode
  const activeForces: ForceApplied[] = [];

  if (mode === 'two-forces' || mode === 'angled') {
    activeForces.push({
      id: 'f1',
      nameAr: 'القوة الأولى F₁',
      magnitudeN: f1Mag,
      positionM: Math.min(f1Pos, beamLengthM),
      angleDeg: mode === 'angled' ? f1Angle : 90,
      color: '#06b6d4', // cyan
    });
    activeForces.push({
      id: 'f2',
      nameAr: 'القوة الثانية F₂',
      magnitudeN: f2Mag,
      positionM: Math.min(f2Pos, beamLengthM),
      angleDeg: 90,
      color: '#f59e0b', // amber
    });
  } else if (mode === 'three-forces') {
    activeForces.push({
      id: 'f1',
      nameAr: 'F₁ (اليسار)',
      magnitudeN: f1Mag,
      positionM: Math.min(f1Pos, beamLengthM),
      angleDeg: 90,
      color: '#06b6d4',
    });
    activeForces.push({
      id: 'f2',
      nameAr: 'F₂ (اليمين)',
      magnitudeN: f2Mag,
      positionM: Math.min(f2Pos, beamLengthM),
      angleDeg: 90,
      color: '#f59e0b',
    });
    activeForces.push({
      id: 'f3',
      nameAr: 'F₃ (إضافية)',
      magnitudeN: f3Mag,
      positionM: Math.min(f3Pos, beamLengthM),
      angleDeg: 90,
      color: '#10b981', // emerald
    });
  } else if (mode === 'couple') {
    // Couple: two equal opposite forces separated by d
    const posLeft = Math.max(0.5, pivotM - coupleDist / 2);
    const posRight = Math.min(beamLengthM - 0.5, pivotM + coupleDist / 2);
    activeForces.push({
      id: 'fc1',
      nameAr: 'قوة الازدواج الأولى F',
      magnitudeN: coupleForce,
      positionM: posLeft,
      angleDeg: 90, // downward
      color: '#ec4899', // pink
    });
    activeForces.push({
      id: 'fc2',
      nameAr: 'قوة الازدواج الثانية -F',
      magnitudeN: coupleForce,
      positionM: posRight,
      angleDeg: 270, // upward (sin(270) = -1)
      color: '#8b5cf6', // purple
    });
  }

  const result = calculateEquilibriumState(beamLengthM, pivotM, activeForces);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas drawing
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

    // Subtle Grid
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

    const marginX = 80;
    const beamDisplayWidth = width - 2 * marginX;
    const beamY = height / 2;
    const scaleX = beamDisplayWidth / beamLengthM;

    // Calculate beam tilt based on torque (capped at +/- 14 degrees for visual realism)
    const tiltDeg = Math.max(-14, Math.min(14, -result.sumTorqueN_m * 0.4));
    const tiltRad = (tiltDeg * Math.PI) / 180;

    const pivotPixelX = marginX + pivotM * scaleX;

    // Save context for beam rotation around pivot
    ctx.save();
    ctx.translate(pivotPixelX, beamY);
    ctx.rotate(tiltRad);
    ctx.translate(-pivotPixelX, -beamY);

    // Beam shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(marginX - 5, beamY - 7, beamDisplayWidth + 10, 20);

    // Beam body (metallic gradient)
    const beamGrad = ctx.createLinearGradient(0, beamY - 10, 0, beamY + 10);
    beamGrad.addColorStop(0, '#64748b');
    beamGrad.addColorStop(0.5, '#334155');
    beamGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.roundRect(marginX, beamY - 9, beamDisplayWidth, 18, 4);
    ctx.fill();
    ctx.strokeStyle = result.isEquilibrium ? '#10b981' : '#06b6d4';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Beam meter marks
    for (let m = 0; m <= beamLengthM; m += 0.5) {
      const markX = marginX + m * scaleX;
      const isMajor = m % 1 === 0;
      ctx.strokeStyle = isMajor ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = isMajor ? 1.5 : 1;
      ctx.beginPath();
      ctx.moveTo(markX, beamY - 8);
      ctx.lineTo(markX, beamY - (isMajor ? 1 : 4));
      ctx.stroke();

      if (isMajor && beamLengthM <= 8) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${m}m`, markX, beamY + 5);
      }
    }

    // Draw applied forces on beam
    activeForces.forEach((f) => {
      const fX = marginX + f.positionM * scaleX;
      const rad = (f.angleDeg * Math.PI) / 180;
      const arrowLength = Math.min(80, Math.max(30, f.magnitudeN * 2.2));

      // Force vector components
      // angle 90 = downward, 270 = upward
      const isDownward = Math.sin(rad) >= 0;
      const dirY = isDownward ? 1 : -1;
      const startY = isDownward ? beamY - 10 - arrowLength : beamY + 10 + arrowLength;
      const endY = isDownward ? beamY - 9 : beamY + 9;

      // Draw force vector arrow
      ctx.strokeStyle = f.color;
      ctx.fillStyle = f.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(fX, startY);
      ctx.lineTo(fX, endY);
      ctx.stroke();

      // Arrow head
      ctx.beginPath();
      if (isDownward) {
        ctx.moveTo(fX, endY);
        ctx.lineTo(fX - 6, endY - 12);
        ctx.lineTo(fX + 6, endY - 12);
      } else {
        ctx.moveTo(fX, endY);
        ctx.lineTo(fX - 6, endY + 12);
        ctx.lineTo(fX + 6, endY + 12);
      }
      ctx.closePath();
      ctx.fill();

      // Force Label
      ctx.fillStyle = f.color;
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      const labelY = isDownward ? startY - 8 : startY + 16;
      ctx.fillText(`${f.nameAr}: ${f.magnitudeN} N`, fX, labelY);

      // Lever arm dashed line to pivot
      ctx.strokeStyle = `${f.color}55`;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(pivotPixelX, beamY - 18);
      ctx.lineTo(fX, beamY - 18);
      ctx.stroke();
      ctx.setLineDash([]);

      const leverDist = Math.abs(f.positionM - pivotM);
      if (leverDist > 0.3) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`r = ${leverDist.toFixed(1)}m`, (pivotPixelX + fX) / 2, beamY - 22);
      }
    });

    ctx.restore(); // Restore beam transform

    // Draw Pivot (Wedge Triangle) at fixed world coordinates
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(pivotPixelX, beamY);
    ctx.lineTo(pivotPixelX - 16, beamY + 32);
    ctx.lineTo(pivotPixelX + 16, beamY + 32);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Pivot base pedestal
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(pivotPixelX - 28, beamY + 32, 56, 10);
    ctx.strokeStyle = '#475569';
    ctx.strokeRect(pivotPixelX - 28, beamY + 32, 56, 10);

    // Normal force reaction arrow upward from pivot
    if (result.sumForceVerticalN > 0) {
      ctx.strokeStyle = '#10b981';
      ctx.fillStyle = '#10b981';
      ctx.lineWidth = 2.5;
      const nArrowLen = Math.min(60, Math.max(25, result.sumForceVerticalN * 1.2));
      ctx.beginPath();
      ctx.moveTo(pivotPixelX, beamY + 45);
      ctx.lineTo(pivotPixelX, beamY + 45 + nArrowLen);
      ctx.stroke();

      // Label Normal force
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`N = ${result.sumForceVerticalN.toFixed(1)} N`, pivotPixelX, beamY + 58 + nArrowLen);
    }

    // Pivot pin circle
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(pivotPixelX, beamY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Center of Mass label
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`نقطة الارتكاز (${pivotM.toFixed(1)}m)`, pivotPixelX, beamY + 30);

    // Rotation Tendency Graphic (Curved Arrow at top corner)
    if (!result.isEquilibrium) {
      const isCCW = result.sumTorqueN_m > 0;
      const rotCenterX = width - 80;
      const rotCenterY = 70;

      ctx.strokeStyle = isCCW ? '#06b6d4' : '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(rotCenterX, rotCenterY, 30, Math.PI * 0.2, Math.PI * 1.5, !isCCW);
      ctx.stroke();

      ctx.fillStyle = isCCW ? '#06b6d4' : '#f59e0b';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(isCCW ? 'عزم موجب (+)' : 'عزم سالب (-)', rotCenterX, rotCenterY + 45);
      ctx.fillText(isCCW ? 'عكس عقارب الساعة ↺' : 'مع عقارب الساعة ↻', rotCenterX, rotCenterY + 60);
    }
  }, [beamLengthM, pivotM, mode, activeForces, result]);

  const handleReset = () => {
    setBeamLengthM(6.0);
    setPivotM(3.0);
    setF1Mag(20);
    setF1Pos(1.0);
    setF1Angle(90);
    setF2Mag(20);
    setF2Pos(5.0);
    setF2Angle(90);
    setF3Mag(15);
    setF3Pos(4.0);
    setCoupleForce(25);
    setCoupleDist(2.0);
  };

  const setBalancedPreset = () => {
    setBeamLengthM(6.0);
    setPivotM(3.0);
    setF1Mag(30);
    setF1Pos(1.0); // r = 2m, torque = +30*2 = +60 N*m
    setF2Mag(20);
    setF2Pos(6.0); // r = 3m, torque = -20*3 = -60 N*m
    setMode('two-forces');
  };

  return (
    <SimulationShell
      title="مختبر الاتزان والعزوم"
      subtitle="الفصل الرابع — شرطا الاتزان السكوني، عزم القوة (τ = r F sinθ)، وذراع الرافعة والازدواج"
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

            {/* Quick Status Banner */}
            <div
              className={`absolute top-4 left-4 px-3.5 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-bold backdrop-blur-md ${
                result.isEquilibrium
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              }`}
            >
              {result.isEquilibrium ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>متزن ميكانيكياً (Στ = 0)</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>غير متزن ({result.rotationTendencyAr})</span>
                </>
              )}
            </div>
          </div>

          {/* HUD Metrics */}
          <SimulationHUD>
            <HUDMetric
              label="صافي العزم (Στ)"
              value={Math.abs(result.sumTorqueN_m) < 0.01 ? '0.00' : result.sumTorqueN_m.toFixed(2)}
              unit="N·m"
              highlight={result.isEquilibrium}
            />
            <HUDMetric
              label="القوة العمودية (ΣFy)"
              value={result.sumForceVerticalN.toFixed(1)}
              unit="N"
            />
            <HUDMetric
              label="رد فعل نقطة الارتكاز (N)"
              value={result.sumForceVerticalN.toFixed(1)}
              unit="N"
            />
            <HUDMetric
              label="حالة الاتزان الدوراني"
              value={result.isEquilibrium ? 'متزن دوراني' : 'دوران متسارع'}
              highlight={result.isEquilibrium}
            />
          </SimulationHUD>

          {/* Torque Details Table */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs">
            <h4 className="font-bold text-slate-300 mb-2 flex items-center gap-2">
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>تحليل عزوم القوى الفردية حول نقطة الارتكاز (τ = r × F)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {result.torques.map((t) => (
                <div
                  key={t.id}
                  className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 space-y-1"
                >
                  <span className="font-semibold text-slate-200">{t.nameAr}</span>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>القوة: {t.forceN} N</span>
                    <span>ذراع القوة: {t.leverArmM.toFixed(2)} m</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono font-bold pt-1 border-t border-slate-800">
                    <span className="text-slate-400">العزم:</span>
                    <span className={t.torqueN_m > 0 ? 'text-cyan-400' : t.torqueN_m < 0 ? 'text-amber-400' : 'text-slate-400'}>
                      {t.torqueN_m.toFixed(2)} N·m {t.torqueN_m > 0 ? '(↺ موجب)' : t.torqueN_m < 0 ? '(↻ سالب)' : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls title="إعدادات التجربة والعارضة">
            {/* Mode Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">نمط التجربة</label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  onClick={() => setMode('two-forces')}
                  className={`py-2 px-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'two-forces'
                      ? 'bg-cyan-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  قوتان متقابلتان
                </button>
                <button
                  onClick={() => setMode('three-forces')}
                  className={`py-2 px-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'three-forces'
                      ? 'bg-cyan-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  ثلاث قوى
                </button>
                <button
                  onClick={() => setMode('angled')}
                  className={`py-2 px-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'angled'
                      ? 'bg-cyan-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  قوة مائلة (زاوية)
                </button>
                <button
                  onClick={() => setMode('couple')}
                  className={`py-2 px-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'couple'
                      ? 'bg-cyan-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  الازدواج (Couple)
                </button>
              </div>
            </div>

            {/* Beam Length & Pivot */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">طول العارضة (L)</span>
                  <span className="font-mono text-cyan-400 font-bold">{beamLengthM} m</span>
                </div>
                <input
                  type="range"
                  min="4.0"
                  max="8.0"
                  step="0.5"
                  value={beamLengthM}
                  onChange={(e) => {
                    const l = parseFloat(e.target.value);
                    setBeamLengthM(l);
                    if (pivotM > l - 0.5) setPivotM(l / 2);
                  }}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">موضع نقطة الارتكاز (Pivot)</span>
                  <span className="font-mono text-cyan-400 font-bold">{pivotM.toFixed(1)} m</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max={beamLengthM - 1.0}
                  step="0.2"
                  value={pivotM}
                  onChange={(e) => setPivotM(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Force 1 Controls */}
            {mode !== 'couple' && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                  <ArrowDown className="w-3.5 h-3.5" />
                  القوة الأولى F₁ (اليسار)
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-slate-400 text-[11px]">المقدار (N)</label>
                    <input
                      type="number"
                      min="5"
                      max="100"
                      value={f1Mag}
                      onChange={(e) => setF1Mag(Math.max(1, parseFloat(e.target.value) || 0))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-center font-mono text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[11px]">الموقع (m)</label>
                    <input
                      type="number"
                      min="0"
                      max={beamLengthM}
                      step="0.2"
                      value={f1Pos}
                      onChange={(e) => setF1Pos(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-center font-mono text-slate-100"
                    />
                  </div>
                </div>

                {mode === 'angled' && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">زاوية الميلان (θ)</span>
                      <span className="font-mono text-cyan-400">{f1Angle}°</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="160"
                      value={f1Angle}
                      onChange={(e) => setF1Angle(parseInt(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Force 2 Controls */}
            {mode !== 'couple' && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <ArrowDown className="w-3.5 h-3.5" />
                  القوة الثانية F₂ (اليمين)
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-slate-400 text-[11px]">المقدار (N)</label>
                    <input
                      type="number"
                      min="5"
                      max="100"
                      value={f2Mag}
                      onChange={(e) => setF2Mag(Math.max(1, parseFloat(e.target.value) || 0))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-center font-mono text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[11px]">الموقع (m)</label>
                    <input
                      type="number"
                      min="0"
                      max={beamLengthM}
                      step="0.2"
                      value={f2Pos}
                      onChange={(e) => setF2Pos(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-center font-mono text-slate-100"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Force 3 Controls (Three-forces mode) */}
            {mode === 'three-forces' && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <ArrowDown className="w-3.5 h-3.5" />
                  القوة الثالثة F₃
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-slate-400 text-[11px]">المقدار (N)</label>
                    <input
                      type="number"
                      min="5"
                      max="100"
                      value={f3Mag}
                      onChange={(e) => setF3Mag(Math.max(1, parseFloat(e.target.value) || 0))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-center font-mono text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-[11px]">الموقع (m)</label>
                    <input
                      type="number"
                      min="0"
                      max={beamLengthM}
                      step="0.2"
                      value={f3Pos}
                      onChange={(e) => setF3Pos(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-center font-mono text-slate-100"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Couple Mode Controls */}
            {mode === 'couple' && (
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <span className="text-xs font-bold text-pink-400">
                  معاملات الازدواج (قوتان متساويتان ومتعاكستان)
                </span>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">مقدار قوة الازدواج (F)</span>
                    <span className="font-mono text-pink-400 font-bold">{coupleForce} N</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={coupleForce}
                    onChange={(e) => setCoupleForce(parseInt(e.target.value))}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">ذراع الازدواج (d)</span>
                    <span className="font-mono text-pink-400 font-bold">{coupleDist} m</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="4.0"
                    step="0.5"
                    value={coupleDist}
                    onChange={(e) => setCoupleDist(parseFloat(e.target.value))}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                </div>
                <div className="p-2.5 rounded-xl bg-pink-950/40 border border-pink-800/50 text-[11px] text-pink-200">
                  عزم الازدواج: τ = F × d = {coupleForce} × {coupleDist} = {(coupleForce * coupleDist).toFixed(1)} N·m
                  (محصلة القوى الانتقالية = 0)
                </div>
              </div>
            )}

            {/* Quick Balanced Presets */}
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={setBalancedPreset}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                تحقيق الاتزان الميكانيكي (Preset)
              </button>
            </div>
          </SimulationControls>

          {/* Educational Concept Box */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <h5 className="font-bold text-slate-100">شرطا الاتزان الميكانيكي</h5>
            <p className="text-slate-400">
              <strong>1. الاتزان الانتقالي:</strong> محصلة القوى المؤثرة تساوي صفراً (ΣF = 0)،
              حيث يعادل رد فعل المرتكز جميع القوى العمودية.
            </p>
            <p className="text-slate-400">
              <strong>2. الاتزان الدوراني:</strong> محصلة العزوم حول أي محور دوران تساوي صفراً (Στ = 0).
              العزم الموجب ↺ عكس عقارب الساعة، والعزم السالب ↻ مع عقارب الساعة.
            </p>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
