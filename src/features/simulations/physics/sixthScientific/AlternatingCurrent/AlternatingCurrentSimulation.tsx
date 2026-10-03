import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  calculateSeriesRlc,
  calculatePureComponent,
} from './calculations';
import { AcMode, PureComponentType } from './types';
import { Activity, Zap, Sliders, RotateCcw, Play, Pause, Sparkles, CheckCircle2 } from 'lucide-react';

export const AlternatingCurrentSimulation: React.FC = () => {
  const [mode, setMode] = useState<AcMode>('series-rlc');

  // RLC Circuit Parameters
  const [frequency, setFrequency] = useState<number>(50); // 50 Hz (standard Iraqi grid frequency)
  const [voltagePeak, setVoltagePeak] = useState<number>(100); // V
  const [resistance, setResistance] = useState<number>(40); // Ω
  const [inductance, setInductance] = useState<number>(0.25); // H
  const [capacitance, setCapacitance] = useState<number>(40); // μF

  // Pure component mode state
  const [pureType, setPureType] = useState<PureComponentType>('resistor');
  const [pureValue, setPureValue] = useState<number>(50); // Ω, H, or μF

  // Animation time
  const [simTime, setSimTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Calculations
  const rlcResult = calculateSeriesRlc(
    frequency,
    voltagePeak,
    resistance,
    inductance,
    capacitance
  );
  const pureResult = calculatePureComponent(pureType, frequency, voltagePeak, pureValue);

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

    if (mode === 'series-rlc' || mode === 'wave-explorer' || mode === 'pure-components') {
      // Dual-Channel Oscilloscope View on the Left (60% width)
      const graphX = 60;
      const graphY = 50;
      const graphW = width * 0.52;
      const graphH = height - 100;
      const midY = graphY + graphH / 2;

      // Coordinate axes
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(graphX, midY);
      ctx.lineTo(graphX + graphW, midY);
      ctx.moveTo(graphX, graphY);
      ctx.lineTo(graphX, graphY + graphH);
      ctx.stroke();

      // Oscilloscope grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      for (let y = graphY; y <= graphY + graphH; y += 25) {
        ctx.beginPath();
        ctx.moveTo(graphX, y);
        ctx.lineTo(graphX + graphW, y);
        ctx.stroke();
      }

      const activePhaseRad =
        mode === 'pure-components'
          ? (pureResult.phaseShiftDeg * Math.PI) / 180
          : rlcResult.phaseAngleRad;
      const iPeakScaled =
        mode === 'pure-components'
          ? pureResult.currentRmsA * Math.SQRT2
          : rlcResult.currentPeakA;

      // Channel 1: Voltage Waveform (Cyan)
      // v(t) = Vmax * sin(ω*t)
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();

      const timeWindow = 2 / frequency; // show 2 cycles
      for (let px = 0; px <= graphW; px++) {
        const t = (px / graphW) * timeWindow;
        const v = voltagePeak * Math.sin(rlcResult.omegaRad_s * (simTime + t));
        const py = midY - (v / voltagePeak) * (graphH / 2 - 20);
        if (px === 0) ctx.moveTo(graphX + px, py);
        else ctx.lineTo(graphX + px, py);
      }
      ctx.stroke();

      // Channel 2: Current Waveform (Amber)
      // i(t) = Imax * sin(ω*t - φ)
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();

      const iScaleMax = Math.max(0.1, iPeakScaled);
      for (let px = 0; px <= graphW; px++) {
        const t = (px / graphW) * timeWindow;
        const iVal = iPeakScaled * Math.sin(rlcResult.omegaRad_s * (simTime + t) - activePhaseRad);
        const py = midY - (iVal / iScaleMax) * (graphH / 2 - 20);
        if (px === 0) ctx.moveTo(graphX + px, py);
        else ctx.lineTo(graphX + px, py);
      }
      ctx.stroke();

      // Waveform labels
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillStyle = '#06b6d4';
      ctx.fillText(`فولتية المصدر v(t) [V_rms = ${rlcResult.voltageRmsV.toFixed(1)}V]`, graphX + 15, graphY - 10);
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`تيار الدائرة i(t) [I_rms = ${rlcResult.currentRmsA.toFixed(2)}A]`, graphX + 240, graphY - 10);

      // Phasor Diagram on Right (40% width)
      const phasorCenterX = width * 0.78;
      const phasorCenterY = height / 2;
      const phasorScale = 0.65;

      // Phasor Axes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(phasorCenterX - 85, phasorCenterY);
      ctx.lineTo(phasorCenterX + 85, phasorCenterY);
      ctx.moveTo(phasorCenterX, phasorCenterY - 85);
      ctx.lineTo(phasorCenterX, phasorCenterY + 85);
      ctx.stroke();

      // R vector (Along positive x-axis)
      const rLen = Math.min(75, Math.max(20, resistance * phasorScale));
      ctx.strokeStyle = '#10b981';
      ctx.fillStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(phasorCenterX, phasorCenterY);
      ctx.lineTo(phasorCenterX + rLen, phasorCenterY);
      ctx.stroke();
      ctx.fillText(`R = ${resistance}Ω`, phasorCenterX + rLen + 15, phasorCenterY + 4);

      // XL vector (Along positive y-axis)
      const xlLen = Math.min(75, Math.max(10, rlcResult.inductiveReactanceX_L * phasorScale));
      ctx.strokeStyle = '#06b6d4';
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.moveTo(phasorCenterX, phasorCenterY);
      ctx.lineTo(phasorCenterX, phasorCenterY - xlLen);
      ctx.stroke();
      ctx.fillText(`XL = ${rlcResult.inductiveReactanceX_L.toFixed(1)}Ω`, phasorCenterX - 55, phasorCenterY - xlLen - 5);

      // XC vector (Along negative y-axis)
      const xcLen = Math.min(75, Math.max(10, rlcResult.capacitiveReactanceX_C * phasorScale));
      ctx.strokeStyle = '#f43f5e';
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.moveTo(phasorCenterX, phasorCenterY);
      ctx.lineTo(phasorCenterX, phasorCenterY + xcLen);
      ctx.stroke();
      ctx.fillText(`XC = ${rlcResult.capacitiveReactanceX_C.toFixed(1)}Ω`, phasorCenterX - 55, phasorCenterY + xcLen + 15);

      // Net Impedance Z Vector
      const zEndX = phasorCenterX + rLen;
      const zEndY = phasorCenterY - (xlLen - xcLen);
      ctx.strokeStyle = '#a855f7'; // purple
      ctx.fillStyle = '#a855f7';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(phasorCenterX, phasorCenterY);
      ctx.lineTo(zEndX, zEndY);
      ctx.stroke();

      ctx.fillText(`Z = ${rlcResult.impedanceZ.toFixed(1)}Ω (φ = ${rlcResult.phaseAngleDeg.toFixed(1)}°)`, zEndX + 10, zEndY);

      // Phasor Title
      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('مخطط الممانعة الطوري (Phasor Diagram)', phasorCenterX, height - 30);
    } else {
      // Resonance Frequency Response Curve I(f)
      const graphX = 80;
      const graphY = 60;
      const graphW = width - 160;
      const graphH = height - 120;
      const baseF = rlcResult.resonanceFrequencyHz;

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
      ctx.fillText('التيار I_rms (A)', graphX + 20, graphY - 10);
      ctx.textAlign = 'left';
      ctx.fillText('التردد f (Hz)', graphX + graphW - 10, graphY + graphH + 25);

      // Resonance Peak Line
      const fMin = Math.max(5, baseF * 0.2);
      const fMax = baseF * 2.5;
      const fRange = fMax - fMin;

      const resX = graphX + ((baseF - fMin) / fRange) * graphW;
      ctx.strokeStyle = '#10b981';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(resX, graphY);
      ctx.lineTo(resX, graphY + graphH);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#34d399';
      ctx.fillText(`تردد الرنين fr = ${baseF.toFixed(1)} Hz (Imax = ${(voltagePeak / Math.SQRT2 / resistance).toFixed(2)} A)`, resX + 10, graphY + 20);

      // Draw I(f) Curve
      const maxI_at_res = voltagePeak / Math.SQRT2 / resistance;
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3.5;
      ctx.beginPath();

      for (let px = 0; px <= graphW; px++) {
        const f = fMin + (px / graphW) * fRange;
        const omega = 2 * Math.PI * f;
        const xl = omega * inductance;
        const xc = 1 / (omega * capacitance * 1e-6);
        const z = Math.sqrt(Math.pow(resistance, 2) + Math.pow(xl - xc, 2));
        const iRms = (voltagePeak / Math.SQRT2) / z;

        const py = graphY + graphH - (iRms / maxI_at_res) * (graphH - 30);
        if (px === 0) ctx.moveTo(graphX + px, py);
        else ctx.lineTo(graphX + px, py);
      }
      ctx.stroke();

      // Current Operating Point Dot
      const currentOperatingX = graphX + ((frequency - fMin) / fRange) * graphW;
      const currentOperatingY = graphY + graphH - (rlcResult.currentRmsA / maxI_at_res) * (graphH - 30);

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(currentOperatingX, currentOperatingY, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillText(`النقطة الحالية (${frequency} Hz, ${rlcResult.currentRmsA.toFixed(2)} A)`, currentOperatingX, currentOperatingY - 14);
    }
  }, [mode, frequency, voltagePeak, resistance, inductance, capacitance, rlcResult, pureType, pureValue, pureResult, simTime]);

  const handleReset = () => {
    setFrequency(50);
    setVoltagePeak(100);
    setResistance(40);
    setInductance(0.25);
    setCapacitance(40);
    setPureType('resistor');
    setPureValue(50);
  };

  const autoTuneResonance = () => {
    setFrequency(Math.round(rlcResult.resonanceFrequencyHz));
  };

  return (
    <SimulationShell
      title="مختبر التيار المتناوب ودوائر RLC"
      subtitle="الفصل الثالث — المقدار المؤثر للتيار والفولتية، دوائر R-L-C، الرادة الحثية والسعوية، الممانعة Z، والرنين الكهربائي"
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

            {/* Play/Pause controls overlay */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 rounded-xl bg-slate-900/90 text-cyan-400 hover:bg-slate-800 border border-slate-700 backdrop-blur-md cursor-pointer transition-all"
                title={isPlaying ? 'إيقاف التموج' : 'تشغيل التموج'}
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
          {mode !== 'resonance' ? (
            <SimulationHUD>
              <HUDMetric
                label="الممانعة الكلية (Z)"
                value={rlcResult.impedanceZ.toFixed(2)}
                unit="Ω"
                highlight={true}
              />
              <HUDMetric
                label="التيار المؤثر (I_rms)"
                value={rlcResult.currentRmsA.toFixed(2)}
                unit="A"
                highlight={true}
              />
              <HUDMetric
                label="زاوية فرق الطور (φ)"
                value={`${rlcResult.phaseAngleDeg.toFixed(1)}°`}
                highlight={Math.abs(rlcResult.phaseAngleDeg) < 1.0}
              />
              <HUDMetric
                label="عامل القدرة (pf = cos φ)"
                value={rlcResult.powerFactor.toFixed(3)}
                highlight={rlcResult.powerFactor > 0.98}
              />
            </SimulationHUD>
          ) : (
            <SimulationHUD>
              <HUDMetric
                label="تردد الرنين الكهربائي (fr)"
                value={rlcResult.resonanceFrequencyHz.toFixed(1)}
                unit="Hz"
                highlight={true}
              />
              <HUDMetric
                label="الممانعة عند الرنين (Z = R)"
                value={resistance.toFixed(1)}
                unit="Ω"
                highlight={true}
              />
              <HUDMetric
                label="أقصى تيار مؤثر (Imax)"
                value={(rlcResult.voltageRmsV / resistance).toFixed(2)}
                unit="A"
                highlight={true}
              />
              <HUDMetric
                label="عامل القدرة الرنيني"
                value="pf = 1.000 (cos 0°)"
                highlight={true}
              />
            </SimulationHUD>
          )}

          {/* Circuit Reactance Breakdown Details */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs">
            <h4 className="font-bold text-slate-300 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                تحليل عناصر الدائرة وخواصها:
              </span>
              <span className="text-cyan-400 font-mono font-bold">
                {rlcResult.circuitNatureAr}
              </span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300">
              <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-400">الرادة الحثية (XL):</span>
                <div className="text-sm font-bold font-mono text-cyan-400">
                  {rlcResult.inductiveReactanceX_L.toFixed(1)} Ω
                </div>
              </div>
              <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-400">الرادة السعوية (XC):</span>
                <div className="text-sm font-bold font-mono text-rose-400">
                  {rlcResult.capacitiveReactanceX_C.toFixed(1)} Ω
                </div>
              </div>
              <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-400">القدرة الحقيقية (Preal):</span>
                <div className="text-sm font-bold font-mono text-emerald-400">
                  {rlcResult.realPowerWatts.toFixed(1)} W
                </div>
              </div>
              <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-400">القدرة الظاهرية (Papp):</span>
                <div className="text-sm font-bold font-mono text-amber-400">
                  {rlcResult.apparentPowerVA.toFixed(1)} VA
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls title="إعدادات التيار المتناوب">
            {/* Mode Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">المحور التعليمي</label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  onClick={() => setMode('series-rlc')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'series-rlc' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  دائرة RLC المتوالية
                </button>
                <button
                  onClick={() => setMode('resonance')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'resonance' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  الرنين الكهربائي (fr)
                </button>
                <button
                  onClick={() => setMode('pure-components')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'pure-components' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  العناصر الصرفة (R, L, C)
                </button>
                <button
                  onClick={() => setMode('wave-explorer')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'wave-explorer' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  المقدار المؤثر (RMS)
                </button>
              </div>
            </div>

            {/* RLC Controls */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">تردد المصدر (f)</span>
                  <span className="font-mono text-cyan-400 font-bold">{frequency} Hz</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="1"
                  value={frequency}
                  onChange={(e) => setFrequency(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">المقاومة الأومية الصرفة (R)</span>
                  <span className="font-mono text-emerald-400 font-bold">{resistance} Ω</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="120"
                  step="5"
                  value={resistance}
                  onChange={(e) => setResistance(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">معامل الحث الذاتي للمحث (L)</span>
                  <span className="font-mono text-cyan-400 font-bold">{inductance.toFixed(2)} H</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.8"
                  step="0.05"
                  value={inductance}
                  onChange={(e) => setInductance(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">سعة المتسعة (C)</span>
                  <span className="font-mono text-rose-400 font-bold">{capacitance} μF</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="120"
                  step="5"
                  value={capacitance}
                  onChange={(e) => setCapacitance(parseInt(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              {/* Auto tune resonance button */}
              <button
                onClick={autoTuneResonance}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer mt-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                ضبط التردد على حالة الرنين (fr = {rlcResult.resonanceFrequencyHz.toFixed(1)} Hz)
              </button>
            </div>
          </SimulationControls>

          {/* Educational Concept Box */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <h5 className="font-bold text-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>مفاهيم دوائر التيار المتناوب</span>
            </h5>
            <p className="text-slate-400">
              <strong>حالة الرنين (Resonance):</strong> تحدث عندما يتساوى تردد المصدر مع تردد الرنين (fr = 1/2π√(LC))، عندها تكون الرادة الحثية مساوية للرادة السعوية (XL = XC)، وتصل الممانعة إلى أقل قيمة لها مساوية للمقاومة (Z = R)، ويصل التيار إلى أقصى مقدار له.
            </p>
            <p className="text-slate-400">
              <strong>عامل القدرة (pf):</strong> النسبة بين القدرة الحقيقية المستهلكة في المقاومة إلى القدرة الظاهرية المجهزة من المصدر: pf = cos φ = R / Z.
            </p>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
