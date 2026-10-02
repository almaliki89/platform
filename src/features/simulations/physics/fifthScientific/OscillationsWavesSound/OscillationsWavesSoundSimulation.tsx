import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  calculateSpringShm,
  calculatePendulum,
  calculateWave,
  calculateDoppler,
} from './calculations';
import { OscillationMode } from './types';
import { Play, Pause, RotateCcw, Activity, Radio, Volume2, Sparkles, MoveHorizontal } from 'lucide-react';

export const OscillationsWavesSoundSimulation: React.FC = () => {
  const [mode, setMode] = useState<OscillationMode>('spring');

  // Spring state
  const [springMass, setSpringMass] = useState<number>(1.5); // kg
  const [springK, setSpringK] = useState<number>(30); // N/m
  const [springAmp, setSpringAmp] = useState<number>(0.2); // m

  // Pendulum state
  const [pendLength, setPendLength] = useState<number>(1.2); // m
  const [pendMass, setPendMass] = useState<number>(1.0); // kg
  const [pendAngle, setPendAngle] = useState<number>(12); // deg

  // Wave state
  const [waveFreq, setWaveFreq] = useState<number>(2.5); // Hz
  const [waveLambda, setWaveLambda] = useState<number>(1.6); // m
  const [harmonicN, setHarmonicN] = useState<number>(2); // for standing wave

  // Doppler state
  const [dopplerSourceFreq, setDopplerSourceFreq] = useState<number>(440); // Hz
  const [sourceSpeed, setSourceSpeed] = useState<number>(50); // m/s
  const [observerSpeed, setObserverSpeed] = useState<number>(0); // m/s
  const [sourceToward, setSourceToward] = useState<boolean>(true);
  const [observerToward, setObserverToward] = useState<boolean>(true);

  // Time tracking
  const [simTime, setSimTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Calculations
  const springResult = calculateSpringShm(springMass, springK, springAmp);
  const pendResult = calculatePendulum(pendLength, pendMass, pendAngle);
  const waveResult = calculateWave(waveFreq, waveLambda, harmonicN);
  const dopplerResult = calculateDoppler(
    dopplerSourceFreq,
    sourceSpeed,
    observerSpeed,
    sourceToward,
    observerToward
  );

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

    // Dark sleek background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    // Grid
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

    if (mode === 'spring') {
      // Spring SHM (Vertical or Horizontal)
      const topY = 40;
      const originX = width / 2;
      const restLength = 140;
      const ampPixel = springAmp * 300; // scale
      const currentDisp = ampPixel * Math.cos(springResult.angularFrequencyRad_s * simTime);
      const bobY = topY + restLength + currentDisp;

      // Ceiling support
      ctx.fillStyle = '#334155';
      ctx.fillRect(originX - 60, topY - 10, 120, 10);
      ctx.strokeStyle = '#64748b';
      ctx.strokeRect(originX - 60, topY - 10, 120, 10);

      // Spring coil zigzag
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(originX, topY);
      const coils = 14;
      const coilH = (bobY - topY) / coils;
      for (let i = 1; i <= coils; i++) {
        const cx = originX + (i % 2 === 0 ? 18 : -18);
        const cy = topY + i * coilH;
        ctx.lineTo(cx, cy);
      }
      ctx.lineTo(originX, bobY);
      ctx.stroke();

      // Attached mass block
      const blockSize = 44;
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.roundRect(originX - blockSize / 2, bobY, blockSize, blockSize, 6);
      ctx.fill();
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${springMass}kg`, originX, bobY + blockSize / 2 + 4);

      // Equilibrium dashed line
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(originX - 90, topY + restLength + blockSize / 2);
      ctx.lineTo(originX + 90, topY + restLength + blockSize / 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#f87171';
      ctx.fillText('موضع الاستقرار (Equilibrium)', originX + 160, topY + restLength + blockSize / 2 + 4);

      // Energy Bars (KE & PE exchange)
      const maxEnergy = springResult.totalEnergyJ;
      const currentX_m = springAmp * Math.cos(springResult.angularFrequencyRad_s * simTime);
      const currentPE = 0.5 * springK * Math.pow(currentX_m, 2);
      const currentKE = Math.max(0, maxEnergy - currentPE);

      const barX = 70;
      const barY = 80;
      const barHeight = 120;
      const barW = 24;

      // PE bar (Blue)
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(barX, barY, barW, barHeight);
      const peH = maxEnergy > 0 ? (currentPE / maxEnergy) * barHeight : 0;
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(barX, barY + (barHeight - peH), barW, peH);
      ctx.fillText('PE', barX + barW / 2, barY + barHeight + 15);

      // KE bar (Emerald)
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(barX + 40, barY, barW, barHeight);
      const keH = maxEnergy > 0 ? (currentKE / maxEnergy) * barHeight : 0;
      ctx.fillStyle = '#10b981';
      ctx.fillRect(barX + 40, barY + (barHeight - keH), barW, keH);
      ctx.fillText('KE', barX + 40 + barW / 2, barY + barHeight + 15);

      ctx.fillStyle = '#94a3b8';
      ctx.fillText('تبادل الطاقة (E = PE + KE)', barX + 32, barY - 10);
    } else if (mode === 'pendulum') {
      // Simple Pendulum
      const pivotX = width / 2;
      const pivotY = 50;
      const scaleLen = pendLength * 170; // 1m = 170px
      const thetaMaxRad = (pendAngle * Math.PI) / 180;
      const currentTheta = thetaMaxRad * Math.cos(pendResult.angularFrequencyRad_s * simTime);

      const bobX = pivotX + scaleLen * Math.sin(currentTheta);
      const bobY = pivotY + scaleLen * Math.cos(currentTheta);

      // Pivot support
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 6, 0, Math.PI * 2);
      ctx.fill();

      // String line
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      // Bob sphere
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(bobX, bobY, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${pendMass}kg`, bobX, bobY + 3);

      // Equilibrium vertical dashed line
      ctx.strokeStyle = '#64748b';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(pivotX, pivotY + scaleLen + 20);
      ctx.stroke();
      ctx.setLineDash([]);

      // Angular arc
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 50, Math.PI / 2, Math.PI / 2 + currentTheta, currentTheta < 0);
      ctx.stroke();
      ctx.fillStyle = '#38bdf8';
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText(`θ = ${((currentTheta * 180) / Math.PI).toFixed(1)}°`, pivotX + 25, pivotY + 70);

      // Small angle warning banner if angle > 15
      if (!pendResult.smallAngleValid) {
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillText('تنبيه: الزاوية أكبر من 15°، صيغة التقريب T=2π√(L/g) تفقد دقتها', pivotX, height - 30);
      }
    } else if (mode === 'traveling-wave' || mode === 'standing-wave') {
      // Wave simulations
      const axisY = height / 2;
      const startX = 60;
      const endX = width - 60;
      const waveLengthPx = waveLambda * 120; // 1m = 120px
      const ampPx = 60;

      // Central Axis
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(startX, axisY);
      ctx.lineTo(endX, axisY);
      ctx.stroke();
      ctx.setLineDash([]);

      if (mode === 'traveling-wave') {
        // Continuous propagating transverse wave
        // y(x, t) = A sin(k*x - omega*t)
        const k = (2 * Math.PI) / waveLengthPx;
        const omega = 2 * Math.PI * waveFreq;

        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = startX; x <= endX; x++) {
          const y = axisY - ampPx * Math.sin(k * (x - startX) - omega * simTime);
          if (x === startX) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Wave propagation direction arrow
        ctx.strokeStyle = '#10b981';
        ctx.fillStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(endX - 80, 50);
        ctx.lineTo(endX - 20, 50);
        ctx.stroke();
        ctx.fillText(`اتجاه انتشار الموجة (v = ${waveResult.waveSpeedM_s.toFixed(1)} m/s)`, endX - 50, 40);
      } else {
        // Standing Wave (Nodes and Antinodes)
        // y(x, t) = 2A sin(k*x) cos(omega*t)
        const totalL = endX - startX;
        const kStanding = (harmonicN * Math.PI) / totalL;
        const omega = 2 * Math.PI * waveFreq;
        const timeFactor = Math.cos(omega * simTime);

        // Envelope (dashed)
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        for (let x = startX; x <= endX; x++) {
          const y = axisY - ampPx * Math.sin(kStanding * (x - startX));
          if (x === startX) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.beginPath();
        for (let x = startX; x <= endX; x++) {
          const y = axisY + ampPx * Math.sin(kStanding * (x - startX));
          if (x === startX) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Active standing wave
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        for (let x = startX; x <= endX; x++) {
          const y = axisY - ampPx * Math.sin(kStanding * (x - startX)) * timeFactor;
          if (x === startX) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Mark Nodes (N) and Antinodes (A)
        const nodeCount = harmonicN + 1;
        for (let i = 0; i < nodeCount; i++) {
          const nx = startX + (i * totalL) / harmonicN;
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(nx, axisY, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.font = 'bold 10px Inter, sans-serif';
          ctx.fillText('عقدة (N)', nx, axisY + 20);
        }

        for (let i = 0; i < harmonicN; i++) {
          const ax = startX + ((i + 0.5) * totalL) / harmonicN;
          ctx.fillStyle = '#10b981';
          ctx.fillText('بطن (A)', ax, axisY - ampPx - 10);
        }
      }
    } else if (mode === 'doppler') {
      // Doppler Effect visual
      const cy = height / 2;
      const sourceX = width * 0.45;

      // Concentric circles representing wavefronts emitted by moving source
      // If moving to the right, centers shifted rightwards
      const waveCount = 7;
      for (let i = 1; i <= waveCount; i++) {
        const radius = i * 26 + ((simTime * 80) % 26);
        // Center offset based on source speed
        const speedRatio = (sourceSpeed / dopplerResult.soundSpeedM_s) * (sourceToward ? 1 : -1);
        const shiftX = sourceX - (radius * speedRatio * 0.6);

        ctx.strokeStyle = `rgba(56, 189, 248, ${Math.max(0.1, 1 - radius / 220)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(shiftX, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Moving Source (Car/Speaker)
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(sourceX, cy, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('المصدر S', sourceX, cy - 22);

      // Observer (Ear / Listener) on the right
      const obsX = width - 110;
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(obsX, cy, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.fillText('المراقب O', obsX, cy - 22);

      // Frequency Shift label
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.fillStyle = dopplerResult.frequencyShiftPercent > 0 ? '#34d399' : '#f87171';
      ctx.fillText(
        `التردد المدرك: f' = ${dopplerResult.observedFrequencyHz.toFixed(1)} Hz (${
          dopplerResult.frequencyShiftPercent > 0 ? 'ازدياد حدة الصوت' : 'انخفاض حدة الصوت'
        })`,
        width / 2,
        height - 35
      );
    }
  }, [mode, simTime, springMass, springK, springAmp, springResult, pendLength, pendMass, pendAngle, pendResult, waveFreq, waveLambda, harmonicN, waveResult, sourceSpeed, dopplerResult, sourceToward]);

  const handleReset = () => {
    setSpringMass(1.5);
    setSpringK(30);
    setSpringAmp(0.2);
    setPendLength(1.2);
    setPendMass(1.0);
    setPendAngle(12);
    setWaveFreq(2.5);
    setWaveLambda(1.6);
    setHarmonicN(2);
    setDopplerSourceFreq(440);
    setSourceSpeed(50);
    setObserverSpeed(0);
    setSimTime(0);
  };

  return (
    <SimulationShell
      title="مختبر الاهتزازات والأمواج والصوت"
      subtitle="الفصل الثامن — الحركة التوافقية البسيطة (البندول والنابض)، سرعة الموجة (v = fλ)، الموجات الموقوفة وظاهرة دوبلر"
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
          {mode === 'spring' && (
            <SimulationHUD>
              <HUDMetric
                label="زمن الدورة (T = 2π√(m/k))"
                value={springResult.periodSec.toFixed(2)}
                unit="s"
                highlight={true}
              />
              <HUDMetric
                label="التردد الطبيعي (f = 1/T)"
                value={springResult.frequencyHz.toFixed(2)}
                unit="Hz"
              />
              <HUDMetric
                label="السرعة العظمى (vmax = ω·A)"
                value={springResult.maxVelocityM_s.toFixed(2)}
                unit="m/s"
                highlight={true}
              />
              <HUDMetric
                label="الطاقة الميكانيكية الكلية"
                value={springResult.totalEnergyJ.toFixed(2)}
                unit="J"
              />
            </SimulationHUD>
          )}

          {mode === 'pendulum' && (
            <SimulationHUD>
              <HUDMetric
                label="زمن دورة البندول (T = 2π√(L/g))"
                value={pendResult.periodSec.toFixed(2)}
                unit="s"
                highlight={true}
              />
              <HUDMetric
                label="تردد الاهتزاز (f)"
                value={pendResult.frequencyHz.toFixed(2)}
                unit="Hz"
              />
              <HUDMetric
                label="التردد الزاوي (ω = √(g/L))"
                value={pendResult.angularFrequencyRad_s.toFixed(2)}
                unit="rad/s"
              />
              <HUDMetric
                label="صلاحية الزوايا الصغيرة (θ≤15°)"
                value={pendResult.smallAngleValid ? 'صحيحة ومطابقة' : 'تقريبية'}
                highlight={pendResult.smallAngleValid}
              />
            </SimulationHUD>
          )}

          {(mode === 'traveling-wave' || mode === 'standing-wave') && (
            <SimulationHUD>
              <HUDMetric
                label="سرعة انتشار الموجة (v = f·λ)"
                value={waveResult.waveSpeedM_s.toFixed(1)}
                unit="m/s"
                highlight={true}
              />
              <HUDMetric
                label="الطول الموجي (λ)"
                value={waveResult.wavelengthM.toFixed(2)}
                unit="m"
              />
              <HUDMetric
                label="التردد (f)"
                value={waveResult.frequencyHz.toFixed(1)}
                unit="Hz"
                highlight={true}
              />
              <HUDMetric
                label="الزمن الدوري (T)"
                value={waveResult.periodSec.toFixed(2)}
                unit="s"
              />
            </SimulationHUD>
          )}

          {mode === 'doppler' && (
            <SimulationHUD>
              <HUDMetric
                label="التردد الصادر الأصلي (f)"
                value={dopplerResult.sourceFreqHz.toString()}
                unit="Hz"
              />
              <HUDMetric
                label="التردد المدرك عند المراقب (f')"
                value={dopplerResult.observedFrequencyHz.toFixed(1)}
                unit="Hz"
                highlight={true}
              />
              <HUDMetric
                label="نسبة الإزاحة الترددية"
                value={`${dopplerResult.frequencyShiftPercent > 0 ? '+' : ''}${dopplerResult.frequencyShiftPercent.toFixed(1)}`}
                unit="%"
                highlight={true}
              />
              <HUDMetric
                label="سرعة الصوت في الهواء"
                value={dopplerResult.soundSpeedM_s.toString()}
                unit="m/s"
              />
            </SimulationHUD>
          )}
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls title="إعدادات الأمواج والاهتزاز">
            {/* Mode Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">النمط الفيزيائي</label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  onClick={() => setMode('spring')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'spring' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  النابض التوافقي
                </button>
                <button
                  onClick={() => setMode('pendulum')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'pendulum' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  البندول البسيط
                </button>
                <button
                  onClick={() => setMode('traveling-wave')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'traveling-wave' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  الموجات المنتقلة
                </button>
                <button
                  onClick={() => setMode('standing-wave')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'standing-wave' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  الموجات الموقوفة
                </button>
                <button
                  onClick={() => setMode('doppler')}
                  className={`col-span-2 p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'doppler' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  ظاهرة دوبلر الصوتية (Doppler Effect)
                </button>
              </div>
            </div>

            {/* Spring Controls */}
            {mode === 'spring' && (
              <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">كتلة الجسم المعلق (m)</span>
                    <span className="font-mono text-cyan-400 font-bold">{springMass} kg</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.5"
                    value={springMass}
                    onChange={(e) => setSpringMass(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">ثابت صلابة النابض (k)</span>
                    <span className="font-mono text-cyan-400 font-bold">{springK} N/m</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={springK}
                    onChange={(e) => setSpringK(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">سعة الاهتزاز (A)</span>
                    <span className="font-mono text-cyan-400 font-bold">{springAmp} m</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.35"
                    step="0.05"
                    value={springAmp}
                    onChange={(e) => setSpringAmp(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Pendulum Controls */}
            {mode === 'pendulum' && (
              <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">طول الخيط (L)</span>
                    <span className="font-mono text-cyan-400 font-bold">{pendLength} m</span>
                  </div>
                  <input
                    type="range"
                    min="0.4"
                    max="2.5"
                    step="0.1"
                    value={pendLength}
                    onChange={(e) => setPendLength(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">زاوية الإزاحة الابتدائية (θ)</span>
                    <span className="font-mono text-cyan-400 font-bold">{pendAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={pendAngle}
                    onChange={(e) => setPendAngle(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Wave Controls */}
            {(mode === 'traveling-wave' || mode === 'standing-wave') && (
              <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">التردد (f)</span>
                    <span className="font-mono text-cyan-400 font-bold">{waveFreq} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.5"
                    value={waveFreq}
                    onChange={(e) => setWaveFreq(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                {mode === 'traveling-wave' ? (
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">الطول الموجي (λ)</span>
                      <span className="font-mono text-cyan-400 font-bold">{waveLambda} m</span>
                    </div>
                    <input
                      type="range"
                      min="0.8"
                      max="3.0"
                      step="0.2"
                      value={waveLambda}
                      onChange={(e) => setWaveLambda(parseFloat(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">رتبة النغمة التوافقية (n)</span>
                      <span className="font-mono text-cyan-400 font-bold">n = {harmonicN}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={harmonicN}
                      onChange={(e) => setHarmonicN(parseInt(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Doppler Controls */}
            {mode === 'doppler' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">سرعة المصدر الصوتي (vs)</span>
                    <span className="font-mono text-rose-400 font-bold">{sourceSpeed} m/s</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    step="5"
                    value={sourceSpeed}
                    onChange={(e) => setSourceSpeed(parseInt(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">اتجاه حركة المصدر</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSourceToward(true)}
                      className={`p-1.5 rounded-lg font-bold cursor-pointer ${
                        sourceToward ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      يقترب من المراقب
                    </button>
                    <button
                      onClick={() => setSourceToward(false)}
                      className={`p-1.5 rounded-lg font-bold cursor-pointer ${
                        !sourceToward ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      يبتعد عن المراقب
                    </button>
                  </div>
                </div>
              </div>
            )}
          </SimulationControls>

          {/* Educational Concept Box */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <h5 className="font-bold text-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>مفاهيم الحركة الاهتزازية وظاهرة دوبلر</span>
            </h5>
            <p className="text-slate-400">
              <strong>زمن دورة البندول:</strong> يعتمد فقط على طول الخيط L وتسارع الجاذبية g، ولا يعتمد على كتلة الكرة المعلقة: T = 2π √(L/g).
            </p>
            <p className="text-slate-400">
              <strong>ظاهرة دوبلر:</strong> التغير الظاهري في تردد الصوت المسموع الناتج عن الحركة النسبية بين مصدر الصوت والمراقب. عند الاقتراب تنضغط جبهات الموجة ويزداد التردد (صوت أرفع حدة).
            </p>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
