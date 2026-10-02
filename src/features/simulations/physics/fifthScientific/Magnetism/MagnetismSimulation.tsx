import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  calculateChargedParticleMotion,
  calculateConductorForce,
  calculateParallelWires,
  PARTICLE_SPECS,
} from './calculations';
import { MagnetismMode, ParticleKind } from './types';
import { Magnet, Play, Pause, RotateCcw, Sparkles, Zap, ArrowRight, Compass } from 'lucide-react';

export const MagnetismSimulation: React.FC = () => {
  const [mode, setMode] = useState<MagnetismMode>('charged-particle');

  // Charged particle state
  const [particle, setParticle] = useState<ParticleKind>('proton');
  const [velocity, setVelocity] = useState<number>(300000); // m/s
  const [bField, setBField] = useState<number>(0.8); // Tesla
  const [angleDeg, setAngleDeg] = useState<number>(90); // degrees

  // Conductor force state
  const [wireCurrent, setWireCurrent] = useState<number>(5.0); // A
  const [wireLength, setWireLength] = useState<number>(0.5); // m
  const [wireBField, setWireBField] = useState<number>(1.2); // T
  const [wireAngle, setWireAngle] = useState<number>(90); // deg

  // Parallel wires state
  const [i1, setI1] = useState<number>(8.0); // A
  const [i2, setI2] = useState<number>(8.0); // A
  const [sameDir, setSameDir] = useState<boolean>(true);
  const [wireDist, setWireDist] = useState<number>(0.05); // 5 cm = 0.05 m

  // Animation time
  const [simTime, setSimTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Calculations
  const partResult = calculateChargedParticleMotion(particle, velocity, bField, angleDeg);
  const condResult = calculateConductorForce(wireCurrent, wireLength, wireBField, wireAngle);
  const wireResult = calculateParallelWires(i1, i2, sameDir, wireDist, 1.0);

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

    // Deep tech space background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    if (mode === 'charged-particle') {
      // Magnetic Field Region (Into the Page: Crosses ⊗)
      const fieldLeft = 140;
      const fieldTop = 40;
      const fieldW = width - 180;
      const fieldH = height - 80;

      // Field boundary area
      ctx.fillStyle = 'rgba(6, 182, 212, 0.04)';
      ctx.fillRect(fieldLeft, fieldTop, fieldW, fieldH);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(fieldLeft, fieldTop, fieldW, fieldH);

      // Draw Field Crosses ⊗
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 1.5;
      for (let x = fieldLeft + 30; x < fieldLeft + fieldW; x += 45) {
        for (let y = fieldTop + 30; y < fieldTop + fieldH; y += 45) {
          // Circle
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.stroke();
          // Cross
          ctx.beginPath();
          ctx.moveTo(x - 4, y - 4);
          ctx.lineTo(x + 4, y + 4);
          ctx.moveTo(x + 4, y - 4);
          ctx.lineTo(x - 4, y + 4);
          ctx.stroke();
        }
      }

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`المجال المغناطيسي المنتظم B = ${bField} T (عمودي نحو الداخل ⊗)`, width - 50, fieldTop - 12);

      // Trajectory of Charged Particle
      // Particle enters at fieldLeft, height/2
      const entryX = fieldLeft;
      const entryY = height / 2;

      // Visual scaled radius
      const isPositive = PARTICLE_SPECS[particle].charge > 0;
      // Radius scale (clamp for good visual presentation)
      const visualR = Math.min(120, Math.max(35, 75 * (velocity / 300000) / (bField / 0.8)));

      // Center of circular orbit
      // By RHR: positive charge moving right with B into page experiences UPWARD force
      // Center of orbit is at (entryX, entryY - visualR)
      // Negative charge experiences DOWNWARD force, center at (entryX, entryY + visualR)
      const centerOrbitY = isPositive ? entryY - visualR : entryY + visualR;
      const centerOrbitX = entryX;

      // Draw Orbit Path Arc
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(centerOrbitX, centerOrbitY, visualR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Current particle angle in orbit
      const orbitSpeed = (partResult.velocityM_s / visualR) * 0.0004; // scaled visual angular speed
      // Direction: positive bends counter-clockwise (upward), negative clockwise (downward)
      const currentTheta = isPositive
        ? Math.PI / 2 - simTime * 3.5
        : -Math.PI / 2 + simTime * 3.5;

      const pX = centerOrbitX + visualR * Math.cos(currentTheta);
      const pY = centerOrbitY + visualR * Math.sin(currentTheta);

      // Incoming beam from left
      ctx.strokeStyle = PARTICLE_SPECS[particle].color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(30, entryY);
      ctx.lineTo(entryX, entryY);
      ctx.stroke();

      // Particle Sphere
      ctx.fillStyle = PARTICLE_SPECS[particle].color;
      ctx.beginPath();
      ctx.arc(pX, pY, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(isPositive ? '+q' : '-q', pX, pY + 3);

      // Force Vector (pointing to center of orbit)
      const fDirX = centerOrbitX - pX;
      const fDirY = centerOrbitY - pY;
      const fDist = Math.hypot(fDirX, fDirY);
      const fNormX = fDist > 0 ? fDirX / fDist : 0;
      const fNormY = fDist > 0 ? fDirY / fDist : 0;

      ctx.strokeStyle = '#f43f5e';
      ctx.fillStyle = '#f43f5e';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(pX, pY);
      ctx.lineTo(pX + fNormX * 45, pY + fNormY * 45);
      ctx.stroke();
      ctx.fillText('F_B', pX + fNormX * 55, pY + fNormY * 55);

      // Velocity Vector (tangent)
      const vNormX = isPositive ? fNormY : -fNormY;
      const vNormY = isPositive ? -fNormX : fNormX;

      ctx.strokeStyle = '#10b981';
      ctx.fillStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(pX, pY);
      ctx.lineTo(pX + vNormX * 45, pY + vNormY * 45);
      ctx.stroke();
      ctx.fillText('v', pX + vNormX * 55, pY + vNormY * 55);

      // Right-hand rule box
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.beginPath();
      ctx.roundRect(20, 20, 210, 85, 10);
      ctx.fill();
      ctx.strokeStyle = '#334155';
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('قاعدة الكف اليمنى (Right-Hand Rule)', 220, 40);
      ctx.font = '10px Inter, sans-serif';
      ctx.fillStyle = '#10b981';
      ctx.fillText('• الإبهام: اتجاه السرعة v', 220, 58);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('• الأصابع: اتجاه المجال المغناطيسي B', 220, 74);
      ctx.fillStyle = '#f43f5e';
      ctx.fillText('• باطن الكف: القوة F (للشحنة الموجبة)', 220, 90);
    } else if (mode === 'conductor-force') {
      // Wire in Magnetic Field
      const cx = width / 2;
      const cy = height / 2;

      // Magnet Pole N (left) and Pole S (right)
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(80, cy - 90, 80, 180);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('N', 120, cy + 8);

      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(width - 160, cy - 90, 80, 180);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('S', width - 120, cy + 8);

      // Magnetic field lines from N to S
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 1.5;
      for (let y = cy - 60; y <= cy + 60; y += 30) {
        ctx.beginPath();
        ctx.moveTo(160, y);
        ctx.lineTo(width - 160, y);
        ctx.stroke();
      }

      // Conductor wire passing vertically between poles
      // Deflects according to force F = I*L*B*sin(theta)
      const deflectionY = Math.min(65, condResult.magneticForceN * 8);

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 120);
      ctx.quadraticCurveTo(cx, cy - deflectionY, cx, cy + 120);
      ctx.stroke();

      // Current direction arrows along wire
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`التيار: I = ${wireCurrent} A`, cx + 45, cy - 80);

      // Force Vector
      ctx.strokeStyle = '#f43f5e';
      ctx.fillStyle = '#f43f5e';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy - deflectionY);
      ctx.lineTo(cx, cy - deflectionY - 45);
      ctx.stroke();
      ctx.fillText(`القوة المغناطيسية: F = ${condResult.magneticForceN.toFixed(2)} N`, cx, cy - deflectionY - 55);
    } else {
      // Two Parallel Conductors
      const wire1X = width / 2 - (wireDist * 1200) / 2;
      const wire2X = width / 2 + (wireDist * 1200) / 2;
      const topY = 60;
      const botY = height - 60;

      // Rod 1
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(wire1X, topY);
      ctx.lineTo(wire1X, botY);
      ctx.stroke();

      // Rod 2
      ctx.beginPath();
      ctx.moveTo(wire2X, topY);
      ctx.lineTo(wire2X, botY);
      ctx.stroke();

      // Current arrows
      ctx.fillStyle = '#06b6d4';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`I₁ = ${i1} A ↑`, wire1X, topY - 15);
      ctx.fillText(`I₂ = ${i2} A ${sameDir ? '↑' : '↓'}`, wire2X, topY - 15);

      // Mutual Force Arrows
      const midY = (topY + botY) / 2;
      const forceArrowLen = 35;

      ctx.strokeStyle = '#f43f5e';
      ctx.fillStyle = '#f43f5e';
      ctx.lineWidth = 3;

      if (sameDir) {
        // Attractive: arrows point towards each other
        ctx.beginPath();
        ctx.moveTo(wire1X, midY);
        ctx.lineTo(wire1X + forceArrowLen, midY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(wire2X, midY);
        ctx.lineTo(wire2X - forceArrowLen, midY);
        ctx.stroke();

        ctx.font = 'bold 13px Inter, sans-serif';
        ctx.fillText('قوة تجاذب (تساوي اتجاه التيارين)', (wire1X + wire2X) / 2, midY - 20);
      } else {
        // Repulsive: arrows point outward
        ctx.beginPath();
        ctx.moveTo(wire1X, midY);
        ctx.lineTo(wire1X - forceArrowLen, midY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(wire2X, midY);
        ctx.lineTo(wire2X + forceArrowLen, midY);
        ctx.stroke();

        ctx.font = 'bold 13px Inter, sans-serif';
        ctx.fillText('قوة تنافر (تعاكس اتجاه التيارين)', (wire1X + wire2X) / 2, midY - 20);
      }

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px Inter, sans-serif';
      ctx.fillText(`المسافة بين السلكين: d = ${(wireDist * 100).toFixed(1)} cm`, (wire1X + wire2X) / 2, botY + 25);
    }
  }, [mode, particle, velocity, bField, angleDeg, partResult, simTime, wireCurrent, wireLength, wireBField, wireAngle, condResult, i1, i2, sameDir, wireDist, wireResult]);

  const handleReset = () => {
    setParticle('proton');
    setVelocity(300000);
    setBField(0.8);
    setAngleDeg(90);
    setWireCurrent(5.0);
    setWireLength(0.5);
    setWireBField(1.2);
    setWireAngle(90);
    setI1(8.0);
    setI2(8.0);
    setSameDir(true);
    setWireDist(0.05);
    setSimTime(0);
  };

  return (
    <SimulationShell
      title="مختبر المغناطيسية والقوة المغناطيسية (لورنتز)"
      subtitle="الفصل العاشر — القوة المغناطيسية (FB = q v B sinθ)، المسار الدائري للشحنة، وسلك حامل للتيار، وقانون أمبير"
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

            {/* Play/Pause controls overlay */}
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
          {mode === 'charged-particle' && (
            <SimulationHUD>
              <HUDMetric
                label="قوة لورنتز المغناطيسية (FB)"
                value={partResult.forceLorentzN.toExponential(2)}
                unit="N"
                highlight={true}
              />
              <HUDMetric
                label="نصف قطر المسار الدائري (r = mv/qB)"
                value={partResult.cyclotronRadiusM.toFixed(4)}
                unit="m"
                highlight={true}
              />
              <HUDMetric
                label="الزمن الدوري للدورة (T)"
                value={partResult.periodSec.toExponential(2)}
                unit="s"
              />
              <HUDMetric
                label="تردد السيكلترون (f)"
                value={partResult.cyclotronFreqHz.toExponential(2)}
                unit="Hz"
              />
            </SimulationHUD>
          )}

          {mode === 'conductor-force' && (
            <SimulationHUD>
              <HUDMetric
                label="القوة المغناطيسية المؤثرة (F = ILB)"
                value={condResult.magneticForceN.toFixed(2)}
                unit="N"
                highlight={true}
              />
              <HUDMetric
                label="شدة التيار (I)"
                value={condResult.currentA.toFixed(1)}
                unit="A"
              />
              <HUDMetric
                label="طول السلك داخل المجال (L)"
                value={condResult.wireLengthM.toFixed(2)}
                unit="m"
              />
              <HUDMetric
                label="كثافة الفيض المغناطيسي (B)"
                value={condResult.bFieldTesla.toFixed(1)}
                unit="T"
                highlight={true}
              />
            </SimulationHUD>
          )}

          {mode === 'parallel-wires' && (
            <SimulationHUD>
              <HUDMetric
                label="القوة المتبادلة لكل متر (F/L)"
                value={wireResult.mutualForceN.toExponential(2)}
                unit="N/m"
                highlight={true}
              />
              <HUDMetric
                label="نوع القوة الناتجة"
                value={wireResult.forceTypeAr}
                highlight={sameDir}
              />
              <HUDMetric
                label="المجال المغناطيسي B₁ عند السلك 2"
                value={wireResult.bField1At2Tesla.toExponential(2)}
                unit="T"
              />
              <HUDMetric
                label="المسافة الفاصلة (d)"
                value={(wireDist * 100).toFixed(1)}
                unit="cm"
              />
            </SimulationHUD>
          )}
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls title="إعدادات المغناطيسية">
            {/* Mode Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">النمط التعليمي</label>
              <div className="grid grid-cols-1 gap-1.5 text-xs">
                <button
                  onClick={() => setMode('charged-particle')}
                  className={`p-2.5 rounded-xl font-bold cursor-pointer text-right transition-all flex items-center justify-between ${
                    mode === 'charged-particle' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>حركة الشحنة وقوة لورنتز</span>
                  <Magnet className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setMode('conductor-force')}
                  className={`p-2.5 rounded-xl font-bold cursor-pointer text-right transition-all flex items-center justify-between ${
                    mode === 'conductor-force' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>سلك حامل للتيار (F = ILB)</span>
                  <Zap className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setMode('parallel-wires')}
                  className={`p-2.5 rounded-xl font-bold cursor-pointer text-right transition-all flex items-center justify-between ${
                    mode === 'parallel-wires' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>القوة بين تيارين متوازيين</span>
                  <Compass className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Charged Particle Controls */}
            {mode === 'charged-particle' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400">نوع الجسيم المشحون</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['proton', 'electron', 'alpha'] as ParticleKind[]).map((pk) => (
                      <button
                        key={pk}
                        onClick={() => setParticle(pk)}
                        className={`p-2 rounded-lg font-bold cursor-pointer transition-all ${
                          particle === pk ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {pk === 'proton' ? 'بروتون +e' : pk === 'electron' ? 'إلكترون -e' : 'ألفا +2e'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">سرعة الجسيم (v)</span>
                    <span className="font-mono text-cyan-400 font-bold">{(velocity / 1000).toFixed(0)} km/s</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="600000"
                    step="50000"
                    value={velocity}
                    onChange={(e) => setVelocity(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">كثافة الفيض المغناطيسي (B)</span>
                    <span className="font-mono text-cyan-400 font-bold">{bField.toFixed(1)} T</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.1"
                    value={bField}
                    onChange={(e) => setBField(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Conductor Force Controls */}
            {mode === 'conductor-force' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">شدة التيار المار (I)</span>
                    <span className="font-mono text-amber-400 font-bold">{wireCurrent} A</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={wireCurrent}
                    onChange={(e) => setWireCurrent(parseInt(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">طول السلك داخل المجال (L)</span>
                    <span className="font-mono text-amber-400 font-bold">{wireLength} m</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="1.5"
                    step="0.1"
                    value={wireLength}
                    onChange={(e) => setWireLength(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">المجال المغناطيسي (B)</span>
                    <span className="font-mono text-cyan-400 font-bold">{wireBField} T</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.2"
                    value={wireBField}
                    onChange={(e) => setWireBField(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Parallel Wires Controls */}
            {mode === 'parallel-wires' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400">اتجاه التيارين</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSameDir(true)}
                      className={`p-1.5 rounded-lg font-bold cursor-pointer ${
                        sameDir ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      نفس الاتجاه (تجاذب)
                    </button>
                    <button
                      onClick={() => setSameDir(false)}
                      className={`p-1.5 rounded-lg font-bold cursor-pointer ${
                        !sameDir ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      اتجاهان متعاكسان (تنافر)
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">تيار السلك الأول (I₁)</span>
                    <span className="font-mono text-cyan-400 font-bold">{i1} A</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="20"
                    value={i1}
                    onChange={(e) => setI1(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">تيار السلك الثاني (I₂)</span>
                    <span className="font-mono text-cyan-400 font-bold">{i2} A</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="20"
                    value={i2}
                    onChange={(e) => setI2(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">المسافة بين السلكين (d)</span>
                    <span className="font-mono text-cyan-400 font-bold">{(wireDist * 100).toFixed(1)} cm</span>
                  </div>
                  <input
                    type="range"
                    min="0.02"
                    max="0.15"
                    step="0.01"
                    value={wireDist}
                    onChange={(e) => setWireDist(parseFloat(e.target.value))}
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
              <span>مفاهيم المغناطيسية ولورنتز</span>
            </h5>
            <p className="text-slate-400">
              <strong>قوة لورنتز:</strong> تؤثر القوة المغناطيسية دائماً بشكل عمودي على كل من متجه السرعة ومتجه المجال، ولذلك فهي لا تنجز شغلاً ميكانيكياً ولا تغير الطاقة الحركية للجسيم المشحون، بل تغير اتجاه مساره فقط ليدور في مسار دائري.
            </p>
            <p className="text-slate-400">
              <strong>التياران المتوازيان:</strong> يتجاذبان إذا كان التياران بنفس الاتجاه، ويتنافران إذا كانا باتجاهين متعاكسين، طبقاً لقانون أمبير والمجالات المغناطيسية الناتجة.
            </p>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
