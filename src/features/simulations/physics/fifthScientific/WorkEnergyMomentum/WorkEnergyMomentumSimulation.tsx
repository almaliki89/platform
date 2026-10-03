import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  calculateWorkEnergy,
  calculateImpulseMomentum,
  calculateCollision,
} from './calculations';
import { WorkEnergyMode, CollisionType } from './types';
import { Play, Pause, RotateCcw, Zap, Target, Gauge, Sparkles } from 'lucide-react';

export const WorkEnergyMomentumSimulation: React.FC = () => {
  const [mode, setMode] = useState<WorkEnergyMode>('collisions');

  // Work-Energy mode state
  const [weMass, setWeMass] = useState<number>(5); // kg
  const [weForce, setWeForce] = useState<number>(30); // N
  const [weAngle, setWeAngle] = useState<number>(0); // deg
  const [weDist, setWeDist] = useState<number>(10); // m
  const [weV0, setWeV0] = useState<number>(2); // m/s
  const [weMu, setWeMu] = useState<number>(0.1); // mu_k

  // Impulse-Momentum state
  const [imMass, setImMass] = useState<number>(4);
  const [imV0, setImV0] = useState<number>(5);
  const [imForce, setImForce] = useState<number>(25);
  const [imDuration, setImDuration] = useState<number>(1.5);

  // Collision state
  const [cM1, setCM1] = useState<number>(3); // kg
  const [cV1, setCV1] = useState<number>(4); // m/s
  const [cM2, setCM2] = useState<number>(2); // kg
  const [cV2, setCV2] = useState<number>(-2); // m/s
  const [cType, setCType] = useState<CollisionType>('elastic');

  // Animation timeline (0 to 1)
  const [animProgress, setAnimProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Calculations
  const weResult = calculateWorkEnergy(weMass, weForce, weAngle, weDist, weV0, weMu);
  const imResult = calculateImpulseMomentum(imMass, imV0, imForce, imDuration);
  const cResult = calculateCollision(cM1, cV1, cM2, cV2, cType);

  // Animation frame loop
  useEffect(() => {
    if (!isPlaying) return;
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      setAnimProgress((prev) => {
        const next = prev + dt * 0.45;
        if (next >= 1.0) {
          return 0; // loop
        }
        return next;
      });

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

    // Grid lines
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

    if (mode === 'collisions') {
      // 1D Collision Track Simulation
      const trackY = height * 0.58;
      const trackLeft = 50;
      const trackRight = width - 50;

      // Track surface
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(trackLeft, trackY, trackRight - trackLeft, 14);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(trackLeft, trackY, trackRight - trackLeft, 14);

      // Collision point at center
      const collisionX = width / 2;

      // Cart positions over time
      // Before collision (progress 0 to 0.5):
      // Cart 1 moves from (collisionX - 180) to collisionX - cartWidth/2
      // Cart 2 moves from (collisionX + 180) to collisionX + cartWidth/2
      const cartWidth1 = Math.min(65, 35 + cM1 * 6);
      const cartHeight1 = 38;
      const cartWidth2 = Math.min(65, 35 + cM2 * 6);
      const cartHeight2 = 38;

      let x1 = 0;
      let x2 = 0;
      const initialDistance = 220;

      if (animProgress < 0.5) {
        // Pre-collision phase (t goes 0 to 1)
        const tPre = animProgress / 0.5;
        const startX1 = collisionX - initialDistance;
        const targetX1 = collisionX - cartWidth1 / 2;
        x1 = startX1 + (targetX1 - startX1) * tPre;

        const startX2 = collisionX + initialDistance;
        const targetX2 = collisionX + cartWidth2 / 2;
        x2 = startX2 + (targetX2 - startX2) * tPre;
      } else {
        // Post-collision phase (t goes 0 to 1)
        const tPost = (animProgress - 0.5) / 0.5;
        const contactX1 = collisionX - cartWidth1 / 2;
        const contactX2 = collisionX + cartWidth2 / 2;

        if (cType === 'inelastic') {
          // Both carts stick together and move with v_common
          const travel = cResult.v1FinalM_s * 200 * tPost;
          x1 = contactX1 + travel;
          x2 = contactX2 + travel;
        } else {
          // Elastic separation
          x1 = contactX1 + cResult.v1FinalM_s * 45 * tPost;
          x2 = contactX2 + cResult.v2FinalM_s * 45 * tPost;
        }
      }

      // Draw Cart 1 (Cyan)
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.roundRect(x1 - cartWidth1 / 2, trackY - cartHeight1, cartWidth1, cartHeight1, 6);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Wheels Cart 1
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(x1 - cartWidth1 * 0.28, trackY, 5, 0, Math.PI * 2);
      ctx.arc(x1 + cartWidth1 * 0.28, trackY, 5, 0, Math.PI * 2);
      ctx.fill();

      // Label Cart 1
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`m₁=${cM1}kg`, x1, trackY - cartHeight1 / 2 + 4);

      // Velocity arrow 1
      const currentV1 = animProgress < 0.5 ? cV1 : cResult.v1FinalM_s;
      const arrowLen1 = currentV1 * 12;
      ctx.strokeStyle = '#38bdf8';
      ctx.fillStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(x1, trackY - cartHeight1 - 12);
      ctx.lineTo(x1 + arrowLen1, trackY - cartHeight1 - 12);
      ctx.stroke();
      ctx.fillText(`v₁=${currentV1.toFixed(1)}m/s`, x1, trackY - cartHeight1 - 20);

      // Draw Cart 2 (Amber)
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.roundRect(x2 - cartWidth2 / 2, trackY - cartHeight2, cartWidth2, cartHeight2, 6);
      ctx.fill();
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Wheels Cart 2
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(x2 - cartWidth2 * 0.28, trackY, 5, 0, Math.PI * 2);
      ctx.arc(x2 + cartWidth2 * 0.28, trackY, 5, 0, Math.PI * 2);
      ctx.fill();

      // Label Cart 2
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`m₂=${cM2}kg`, x2, trackY - cartHeight2 / 2 + 4);

      // Velocity arrow 2
      const currentV2 = animProgress < 0.5 ? cV2 : cResult.v2FinalM_s;
      const arrowLen2 = currentV2 * 12;
      ctx.strokeStyle = '#fbbf24';
      ctx.fillStyle = '#fbbf24';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(x2, trackY - cartHeight2 - 12);
      ctx.lineTo(x2 + arrowLen2, trackY - cartHeight2 - 12);
      ctx.stroke();
      ctx.fillText(`v₂=${currentV2.toFixed(1)}m/s`, x2, trackY - cartHeight2 - 20);

      // Impact visual at progress == 0.5
      if (Math.abs(animProgress - 0.5) < 0.04) {
        ctx.strokeStyle = '#f43f5e';
        ctx.fillStyle = '#f43f5e33';
        ctx.beginPath();
        ctx.arc(collisionX, trackY - cartHeight1 / 2, 28, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#f43f5e';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText('اصطدام!', collisionX, trackY - cartHeight1 - 30);
      }

      // Live Comparison Bars at the top
      const barY = 45;
      const barWidth = 140;

      // Momentum Bar
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('حفظ الزخم الخطي (Σp):', 170, barY);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(
        `${cResult.totalMomentumBeforeKgM_s.toFixed(1)} = ${cResult.totalMomentumAfterKgM_s.toFixed(1)} kg·m/s (محفوظ تماماً)`,
        width - 40,
        barY
      );

      // Kinetic Energy Bar
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('الطاقة الحركية (KE):', 170, barY + 25);
      const keColor = cType === 'elastic' ? '#10b981' : '#f43f5e';
      ctx.fillStyle = keColor;
      ctx.fillText(
        cType === 'elastic'
          ? `قبل = ${cResult.totalKeBeforeJ.toFixed(1)} J | بعد = ${cResult.totalKeAfterJ.toFixed(1)} J (محفوظة)`
          : `قبل = ${cResult.totalKeBeforeJ.toFixed(1)} J | بعد = ${cResult.totalKeAfterJ.toFixed(1)} J (فقدان: ${cResult.keLostJ.toFixed(1)} J)`,
        width - 40,
        barY + 25
      );
    } else if (mode === 'work-energy') {
      // Work-Energy Canvas: Block being pulled across displacement
      const groundY = height * 0.65;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(40, groundY, width - 80, 8);

      const blockX = 120 + animProgress * (width - 280);
      const blockSize = 50;

      // Block
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(blockX - blockSize / 2, groundY - blockSize, blockSize, blockSize);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(blockX - blockSize / 2, groundY - blockSize, blockSize, blockSize);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${weMass} kg`, blockX, groundY - blockSize / 2 + 4);

      // Applied force arrow at angle
      const rad = (weAngle * Math.PI) / 180;
      const fLen = Math.min(80, Math.max(30, weForce * 1.5));
      const arrowEndX = blockX + fLen * Math.cos(rad);
      const arrowEndY = groundY - blockSize / 2 - fLen * Math.sin(rad);

      ctx.strokeStyle = '#f59e0b';
      ctx.fillStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(blockX, groundY - blockSize / 2);
      ctx.lineTo(arrowEndX, arrowEndY);
      ctx.stroke();

      ctx.fillText(`F = ${weForce} N (θ=${weAngle}°)`, arrowEndX + 10, arrowEndY - 5);

      // Friction opposing arrow
      if (weMu > 0) {
        ctx.strokeStyle = '#f43f5e';
        ctx.fillStyle = '#f43f5e';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(blockX - blockSize / 2, groundY - 5);
        ctx.lineTo(blockX - blockSize / 2 - 35, groundY - 5);
        ctx.stroke();
        ctx.fillText(`fk`, blockX - blockSize / 2 - 45, groundY - 2);
      }

      // Displacement marker
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(120, groundY + 25);
      ctx.lineTo(width - 160, groundY + 25);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`الإزاحة الكلية: Δx = ${weDist} m`, width / 2, groundY + 40);

      // Energy breakdown graph
      const egX = 60;
      const egY = 50;
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'left';
      ctx.fillText(`الشغل المنجز: W_F = ${weResult.workAppliedJ.toFixed(1)} J`, egX, egY);
      ctx.fillText(`شغل الاحتكاك: W_f = ${weResult.workFrictionJ.toFixed(1)} J`, egX, egY + 20);
      ctx.fillText(`صافي الشغل: W_net = ${weResult.workNetJ.toFixed(1)} J = ΔKE`, egX, egY + 40);
    } else {
      // Impulse-Momentum Canvas
      const groundY = height * 0.65;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(40, groundY, width - 80, 8);

      const blockX = width * 0.4;
      const blockSize = 50;

      ctx.fillStyle = '#8b5cf6';
      ctx.fillRect(blockX - blockSize / 2, groundY - blockSize, blockSize, blockSize);
      ctx.strokeStyle = '#a78bfa';
      ctx.lineWidth = 2;
      ctx.strokeRect(blockX - blockSize / 2, groundY - blockSize, blockSize, blockSize);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${imMass} kg`, blockX, groundY - blockSize / 2 + 4);

      // Impulse Force Arrow
      ctx.strokeStyle = '#ec4899';
      ctx.fillStyle = '#ec4899';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(blockX + blockSize / 2, groundY - blockSize / 2);
      ctx.lineTo(blockX + blockSize / 2 + 60, groundY - blockSize / 2);
      ctx.stroke();
      ctx.fillText(`F = ${imForce} N (خلال ${imDuration}s)`, blockX + blockSize / 2 + 70, groundY - blockSize / 2 - 10);

      // Impulse readout
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'right';
      ctx.fillText(`الدفع: J = F·Δt = ${imResult.impulseN_s.toFixed(1)} N·s`, width - 60, 60);
      ctx.fillText(`الزخم الابتدائي: p_i = ${imResult.initialMomentumKgM_s.toFixed(1)} kg·m/s`, width - 60, 85);
      ctx.fillText(`الزخم النهائي: p_f = ${imResult.finalMomentumKgM_s.toFixed(1)} kg·m/s`, width - 60, 110);
    }
  }, [mode, animProgress, cM1, cV1, cM2, cV2, cType, cResult, weMass, weForce, weAngle, weDist, weMu, weResult, imMass, imV0, imForce, imDuration, imResult]);

  const handleReset = () => {
    setWeMass(5);
    setWeForce(30);
    setWeAngle(0);
    setWeDist(10);
    setWeV0(2);
    setWeMu(0.1);
    setCM1(3);
    setCV1(4);
    setCM2(2);
    setCV2(-2);
    setCType('elastic');
    setAnimProgress(0);
  };

  return (
    <SimulationShell
      title="مختبر الشغل والطاقة والزخم والتصادمات"
      subtitle="الفصل الخامس — مبرهنة الشغل والطاقة (W = ΔKE)، الزخم الخطي (p = mv)، الدفع والتصادمات المرنة وغير المرنة"
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

            {/* Animation controls overlay */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 rounded-xl bg-slate-900/90 text-cyan-400 hover:bg-slate-800 border border-slate-700 backdrop-blur-md cursor-pointer transition-all"
                title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل الحركة'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setAnimProgress(0)}
                className="p-2.5 rounded-xl bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-700 backdrop-blur-md cursor-pointer transition-all"
                title="إعادة تشغيل الدورة"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* HUD Metrics */}
          {mode === 'collisions' && (
            <SimulationHUD>
              <HUDMetric
                label="الزخم الكلي (Σp)"
                value={cResult.totalMomentumBeforeKgM_s.toFixed(2)}
                unit="kg·m/s"
                highlight={true}
              />
              <HUDMetric
                label="الطاقة الحركية الابتدائية"
                value={cResult.totalKeBeforeJ.toFixed(1)}
                unit="J"
              />
              <HUDMetric
                label="الطاقة الحركية النهائية"
                value={cResult.totalKeAfterJ.toFixed(1)}
                unit="J"
                highlight={cType === 'elastic'}
              />
              <HUDMetric
                label="الطاقة المفقودة (حرارة/تشوه)"
                value={cResult.keLostJ.toFixed(1)}
                unit="J"
                highlight={cResult.keLostJ > 0}
              />
            </SimulationHUD>
          )}

          {mode === 'work-energy' && (
            <SimulationHUD>
              <HUDMetric
                label="شغل القوة المؤثرة (WF)"
                value={weResult.workAppliedJ.toFixed(1)}
                unit="J"
                highlight={true}
              />
              <HUDMetric
                label="شغل الاحتكاك (Wf)"
                value={weResult.workFrictionJ.toFixed(1)}
                unit="J"
              />
              <HUDMetric
                label="صافي الشغل (Wnet)"
                value={weResult.workNetJ.toFixed(1)}
                unit="J"
                highlight={true}
              />
              <HUDMetric
                label="السرعة النهائية (vf)"
                value={weResult.finalVelocityM_s.toFixed(2)}
                unit="m/s"
              />
            </SimulationHUD>
          )}

          {mode === 'impulse-momentum' && (
            <SimulationHUD>
              <HUDMetric
                label="الدفع المطبق (J = F·Δt)"
                value={imResult.impulseN_s.toFixed(1)}
                unit="N·s"
                highlight={true}
              />
              <HUDMetric
                label="الزخم الابتدائي (pi)"
                value={imResult.initialMomentumKgM_s.toFixed(1)}
                unit="kg·m/s"
              />
              <HUDMetric
                label="الزخم النهائي (pf)"
                value={imResult.finalMomentumKgM_s.toFixed(1)}
                unit="kg·m/s"
                highlight={true}
              />
              <HUDMetric
                label="السرعة النهائية (vf)"
                value={imResult.finalVelocityM_s.toFixed(2)}
                unit="m/s"
              />
            </SimulationHUD>
          )}
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls title="إعدادات الشغل والزخم">
            {/* Mode Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">الموضوع التعليمي</label>
              <div className="grid grid-cols-1 gap-1.5 text-xs">
                <button
                  onClick={() => setMode('collisions')}
                  className={`py-2 px-3 rounded-xl font-bold cursor-pointer text-right transition-all flex items-center justify-between ${
                    mode === 'collisions'
                      ? 'bg-cyan-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>حفظ الزخم والتصادمات (1D)</span>
                  <Target className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setMode('work-energy')}
                  className={`py-2 px-3 rounded-xl font-bold cursor-pointer text-right transition-all flex items-center justify-between ${
                    mode === 'work-energy'
                      ? 'bg-cyan-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>مبرهنة الشغل والطاقة الحركية</span>
                  <Zap className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setMode('impulse-momentum')}
                  className={`py-2 px-3 rounded-xl font-bold cursor-pointer text-right transition-all flex items-center justify-between ${
                    mode === 'impulse-momentum'
                      ? 'bg-cyan-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>الدفع والزخم الخطي (J = Δp)</span>
                  <Gauge className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Collisions Controls */}
            {mode === 'collisions' && (
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">نوع التصادم</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setCType('elastic')}
                      className={`py-1.5 rounded-lg font-bold cursor-pointer transition-all ${
                        cType === 'elastic'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      تصادم مرن (حفظ KE)
                    </button>
                    <button
                      onClick={() => setCType('inelastic')}
                      className={`py-1.5 rounded-lg font-bold cursor-pointer transition-all ${
                        cType === 'inelastic'
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      غير مرن (التحام تام)
                    </button>
                  </div>
                </div>

                {/* Cart 1 */}
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <span className="font-bold text-cyan-400">العربة الأولى (m₁, v₁)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-400 text-[11px]">الكتلة: {cM1} kg</span>
                      <input
                        type="range"
                        min="1"
                        max="8"
                        value={cM1}
                        onChange={(e) => setCM1(parseInt(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px]">السرعة: {cV1} m/s</span>
                      <input
                        type="range"
                        min="1"
                        max="8"
                        value={cV1}
                        onChange={(e) => setCV1(parseInt(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Cart 2 */}
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <span className="font-bold text-amber-400">العربة الثانية (m₂, v₂)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-400 text-[11px]">الكتلة: {cM2} kg</span>
                      <input
                        type="range"
                        min="1"
                        max="8"
                        value={cM2}
                        onChange={(e) => setCM2(parseInt(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px]">السرعة: {cV2} m/s</span>
                      <input
                        type="range"
                        min="-8"
                        max="-1"
                        value={cV2}
                        onChange={(e) => setCV2(parseInt(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Work-Energy Controls */}
            {mode === 'work-energy' && (
              <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">القوة المؤثرة (F)</span>
                    <span className="font-mono text-cyan-400 font-bold">{weForce} N</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="80"
                    value={weForce}
                    onChange={(e) => setWeForce(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">زاوية القوة مع الأفق (θ)</span>
                    <span className="font-mono text-cyan-400 font-bold">{weAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="75"
                    value={weAngle}
                    onChange={(e) => setWeAngle(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">معامل الاحتكاك الحركي (μk)</span>
                    <span className="font-mono text-cyan-400 font-bold">{weMu}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.4"
                    step="0.05"
                    value={weMu}
                    onChange={(e) => setWeMu(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Impulse Controls */}
            {mode === 'impulse-momentum' && (
              <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">القوة الدافعة (F)</span>
                    <span className="font-mono text-purple-400 font-bold">{imForce} N</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="80"
                    value={imForce}
                    onChange={(e) => setImForce(parseInt(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">زمن التأثير (Δt)</span>
                    <span className="font-mono text-purple-400 font-bold">{imDuration} s</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.1"
                    value={imDuration}
                    onChange={(e) => setImDuration(parseFloat(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </SimulationControls>

          {/* Educational Principle Callout */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <h5 className="font-bold text-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>قوانين الحفظ الميكانيكية</span>
            </h5>
            <p className="text-slate-400">
              <strong>قانون حفظ الزخم:</strong> في النظام المعزول، الزخم الخطي الكلي محفوظ دائماً قبل وبعد التصادم سواء كان التصادم مرناً أو غير مرن: Σp_before = Σp_after.
            </p>
            <p className="text-slate-400">
              <strong>الطاقة الحركية:</strong> تُحفظ فقط في التصادم المرن تماماً، بينما يتحول جزء منها إلى طاقة حرارية وتشوه دائم في التصادم غير المرن.
            </p>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
