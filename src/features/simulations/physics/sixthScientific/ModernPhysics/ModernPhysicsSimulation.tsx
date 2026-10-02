import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  calculatePhotoelectric,
  calculateDeBroglie,
  calculateUncertainty,
  WORK_FUNCTION_PRESETS,
} from './calculations';
import { ModernPhysicsMode } from './types';
import { ELECTRON_MASS_KG } from '../constants';
import { Zap, Sparkles, Sun, Radio, Activity, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

export const ModernPhysicsSimulation: React.FC = () => {
  const [mode, setMode] = useState<ModernPhysicsMode>('photoelectric');

  // Photoelectric state
  const [wavelengthNm, setWavelengthNm] = useState<number>(380); // UV / Violet 380 nm
  const [metalId, setMetalId] = useState<string>('cesium');
  const [intensityPercent, setIntensityPercent] = useState<number>(75);

  // de Broglie state
  const [dbVelocity, setDbVelocity] = useState<number>(2000); // 2000 km/s = 2e6 m/s

  // Uncertainty state
  const [deltaX_nm, setDeltaX_nm] = useState<number>(0.1); // 0.1 nm = 1e-10 m

  const selectedMetal =
    WORK_FUNCTION_PRESETS.find((m) => m.id === metalId) || WORK_FUNCTION_PRESETS[0];

  // Calculations
  const peResult = calculatePhotoelectric(
    wavelengthNm,
    selectedMetal.workFunctionEv,
    intensityPercent
  );
  const dbResult = calculateDeBroglie(ELECTRON_MASS_KG, dbVelocity * 1000);
  const uncertResult = calculateUncertainty(deltaX_nm * 1e-9, ELECTRON_MASS_KG);

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

    // Deep tech vacuum background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    if (mode === 'photoelectric' || mode === 'photon-energy') {
      // Photoelectric Cell (Phototube) Simulation
      const cx = width / 2;
      const cy = height / 2;

      // Quartz Glass Tube Envelope
      ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
      ctx.beginPath();
      ctx.roundRect(cx - 240, cy - 100, 480, 200, 30);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Target Emitter Plate (Cathode on Left)
      const cathodeX = cx - 160;
      ctx.fillStyle = '#64748b';
      ctx.fillRect(cathodeX - 8, cy - 70, 16, 140);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.strokeRect(cathodeX - 8, cy - 70, 16, 140);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`لوح الباعث (${selectedMetal.nameAr.split(' ')[0]})`, cathodeX, cy - 80);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`W₀ = ${selectedMetal.workFunctionEv} eV`, cathodeX, cy + 90);

      // Collector Plate (Anode on Right)
      const anodeX = cx + 160;
      ctx.fillStyle = '#334155';
      ctx.fillRect(anodeX - 8, cy - 70, 16, 140);
      ctx.strokeStyle = '#475569';
      ctx.strokeRect(anodeX - 8, cy - 70, 16, 140);

      ctx.fillStyle = '#ffffff';
      ctx.fillText('لوح الجامع (Anode)', anodeX, cy - 80);

      // Light Beam Shining on Cathode from top-left
      const photonColor =
        wavelengthNm < 400
          ? '#8b5cf6' // UV/Violet
          : wavelengthNm < 500
          ? '#3b82f6' // Blue
          : wavelengthNm < 580
          ? '#10b981' // Green
          : wavelengthNm < 620
          ? '#eab308' // Yellow
          : '#ef4444'; // Red

      ctx.strokeStyle = photonColor;
      ctx.lineWidth = Math.max(2, (intensityPercent / 100) * 8);

      for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.moveTo(cx - 280, cy - 140 + i * 25);
        ctx.lineTo(cathodeX + 6, cy + i * 25);
        ctx.stroke();
      }

      ctx.fillStyle = photonColor;
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText(`فوتونات الضوء الساقط (E = ${peResult.photonEnergyEv.toFixed(2)} eV)`, cx - 210, cy - 120);

      // Emitted Photoelectrons Flying towards Anode
      if (peResult.isEmissionOccurring) {
        const electronCount = Math.round((intensityPercent / 100) * 18);
        ctx.fillStyle = '#06b6d4';

        for (let i = 0; i < electronCount; i++) {
          const t = ((Date.now() * 0.002 * (peResult.maxElectronVelocityM_s / 1e6) + i * 0.15) % 1);
          const ex = cathodeX + 16 + t * (anodeX - cathodeX - 24);
          const ey = cy - 50 + ((i * 37) % 100);

          ctx.beginPath();
          ctx.arc(ex, ey, 4.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText(
          `انبعاث كهروضوئي! (v_max = ${(peResult.maxElectronVelocityM_s / 1000).toFixed(0)} km/s)`,
          cx,
          cy + 40
        );
      } else {
        ctx.fillStyle = '#f87171';
        ctx.font = 'bold 13px Inter, sans-serif';
        ctx.fillText(
          `لا يحدث انبعاث (طاقة الفوتون E = ${peResult.photonEnergyEv.toFixed(2)} eV < دالة العمل W₀ = ${selectedMetal.workFunctionEv} eV)`,
          cx,
          cy + 20
        );
      }

      // External Micro-Ammeter
      const meterX = cx;
      const meterY = cy + 140;
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(meterX, meterY, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = peResult.isEmissionOccurring ? '#10b981' : '#64748b';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = peResult.isEmissionOccurring ? '#34d399' : '#64748b';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText(
        `μA: ${peResult.isEmissionOccurring ? peResult.photoelectricCurrentRelative.toFixed(1) : '0.0'}`,
        meterX,
        meterY + 4
      );
    } else if (mode === 'de-broglie') {
      // de Broglie Matter Wave Simulation
      const cy = height / 2;
      const electronX = width * 0.35;

      // Particle representation
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(electronX, cy, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('e⁻', electronX, cy + 4);

      // Associated Matter Wave Packet
      const waveStartX = electronX + 25;
      const waveEndX = width - 80;
      const lambdaPx = Math.min(60, Math.max(12, dbResult.deBroglieWavelengthNm * 80));

      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 3;
      ctx.beginPath();

      for (let px = waveStartX; px <= waveEndX; px++) {
        const dist = px - waveStartX;
        const envelope = Math.exp(-Math.pow(dist - 140, 2) / 8000);
        const y = cy - 40 * envelope * Math.sin((2 * Math.PI * dist) / lambdaPx);
        if (px === waveStartX) ctx.moveTo(px, y);
        else ctx.lineTo(px, y);
      }
      ctx.stroke();

      ctx.fillStyle = '#c084fc';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText(
        `الموجة المادية المرافقة: λ = h/p = ${dbResult.deBroglieWavelengthNm.toFixed(4)} nm`,
        (waveStartX + waveEndX) / 2,
        cy - 60
      );
    } else {
      // Heisenberg Uncertainty Principle
      const cy = height / 2;
      const cx = width / 2;

      // Localization width box (Δx)
      const visualDx = Math.min(220, Math.max(30, deltaX_nm * 400));

      ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
      ctx.fillRect(cx - visualDx / 2, cy - 80, visualDx, 160);
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(cx - visualDx / 2, cy - 80, visualDx, 160);
      ctx.setLineDash([]);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`منطقة تحديد الموضع: Δx = ${deltaX_nm} nm`, cx, cy - 95);

      // Momentum Spread arrows (Δp)
      const arrowSpread = Math.min(180, Math.max(20, (0.1 / deltaX_nm) * 45));
      ctx.strokeStyle = '#f59e0b';
      ctx.fillStyle = '#f59e0b';
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + arrowSpread, cy);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx - arrowSpread, cy);
      ctx.stroke();

      ctx.fillText(
        `اللايقين في الزخم: Δp ≥ ${uncertResult.minMomentumUncertaintyKgM_s.toExponential(2)} kg·m/s`,
        cx,
        cy + 40
      );
      ctx.fillText(
        `اللايقين في السرعة: Δv ≥ ${(uncertResult.minVelocityUncertaintyM_s / 1000).toFixed(0)} km/s`,
        cx,
        cy + 60
      );
    }
  }, [mode, wavelengthNm, selectedMetal, intensityPercent, peResult, dbVelocity, dbResult, deltaX_nm, uncertResult]);

  const handleReset = () => {
    setWavelengthNm(380);
    setMetalId('cesium');
    setIntensityPercent(75);
    setDbVelocity(2000);
    setDeltaX_nm(0.1);
  };

  return (
    <SimulationShell
      title="مختبر الفيزياء الحديثة"
      subtitle="الفصل الخامس — إشعاع الجسم الأسود، الظاهرة الكهروضوئية ومعادلة أينشتاين (Kmax = hf - W₀)، موجات دي برولي ومبدأ اللادقة"
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
          {mode === 'photoelectric' && (
            <SimulationHUD>
              <HUDMetric
                label="طاقة الفوتون الساقط (E = hf)"
                value={peResult.photonEnergyEv.toFixed(2)}
                unit="eV"
                highlight={true}
              />
              <HUDMetric
                label="دالة العمل للمعدن (W₀)"
                value={selectedMetal.workFunctionEv.toFixed(2)}
                unit="eV"
              />
              <HUDMetric
                label="الطاقة الحركية العظمى (Kmax)"
                value={peResult.maxKineticEnergyEv.toFixed(2)}
                unit="eV"
                highlight={peResult.isEmissionOccurring}
              />
              <HUDMetric
                label="جهد القطع / الإيقاف (Vs)"
                value={peResult.stoppingPotentialVs.toFixed(2)}
                unit="V"
                highlight={peResult.isEmissionOccurring}
              />
            </SimulationHUD>
          )}

          {mode === 'photon-energy' && (
            <SimulationHUD>
              <HUDMetric
                label="طاقة الفوتون بالإلكترون-فولت"
                value={peResult.photonEnergyEv.toFixed(3)}
                unit="eV"
                highlight={true}
              />
              <HUDMetric
                label="طاقة الفوتون بالجول (J)"
                value={peResult.photonEnergyJoules.toExponential(2)}
                unit="J"
              />
              <HUDMetric
                label="تردد الإشعاع (f = c/λ)"
                value={(peResult.frequencyHz / 1e14).toFixed(2)}
                unit="×10¹⁴ Hz"
                highlight={true}
              />
              <HUDMetric
                label="طول موجة العتبة (λ₀)"
                value={peResult.thresholdWavelengthNm.toFixed(0)}
                unit="nm"
              />
            </SimulationHUD>
          )}

          {mode === 'de-broglie' && (
            <SimulationHUD>
              <HUDMetric
                label="طول موجة دي برولي (λ)"
                value={dbResult.deBroglieWavelengthNm.toFixed(4)}
                unit="nm"
                highlight={true}
              />
              <HUDMetric
                label="الزخم الخطي للجسيم (p = m·v)"
                value={dbResult.momentumKgM_s.toExponential(2)}
                unit="kg·m/s"
              />
              <HUDMetric
                label="سرعة الجسيم (v)"
                value={dbVelocity.toString()}
                unit="km/s"
                highlight={true}
              />
              <HUDMetric
                label="الطاقة الحركية للإلكترون"
                value={dbResult.kineticEnergyEv.toFixed(2)}
                unit="eV"
              />
            </SimulationHUD>
          )}

          {mode === 'uncertainty' && (
            <SimulationHUD>
              <HUDMetric
                label="اللايقين في الموضع (Δx)"
                value={deltaX_nm.toString()}
                unit="nm"
                highlight={true}
              />
              <HUDMetric
                label="أقل لايقين في الزخم (Δp)"
                value={uncertResult.minMomentumUncertaintyKgM_s.toExponential(2)}
                unit="kg·m/s"
                highlight={true}
              />
              <HUDMetric
                label="أقل لايقين في السرعة (Δv)"
                value={(uncertResult.minVelocityUncertaintyM_s / 1000).toFixed(0)}
                unit="km/s"
                highlight={true}
              />
              <HUDMetric
                label="مبدأ هايزنبرغ"
                value="Δx · Δp ≥ h / (4π)"
              />
            </SimulationHUD>
          )}
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls title="إعدادات الفيزياء الحديثة">
            {/* Mode Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">الظاهرة الفيزيائية</label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  onClick={() => setMode('photoelectric')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'photoelectric' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  الظاهرة الكهروضوئية
                </button>
                <button
                  onClick={() => setMode('photon-energy')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'photon-energy' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  طاقة الفوتون (E=hf)
                </button>
                <button
                  onClick={() => setMode('de-broglie')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'de-broglie' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  موجات دي برولي
                </button>
                <button
                  onClick={() => setMode('uncertainty')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'uncertainty' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  مبدأ اللادقة (هايزنبرغ)
                </button>
              </div>
            </div>

            {/* Photoelectric Controls */}
            {(mode === 'photoelectric' || mode === 'photon-energy') && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400">معدن سطح الباعث (Work Function W₀)</label>
                  <select
                    value={metalId}
                    onChange={(e) => setMetalId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100"
                  >
                    {WORK_FUNCTION_PRESETS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.nameAr} — W₀ = {m.workFunctionEv} eV (λ₀ = {m.thresholdWavelengthNm} nm)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">طول موجة الضوء الساقط (λ)</span>
                    <span className="font-mono text-cyan-400 font-bold">{wavelengthNm} nm</span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="650"
                    step="5"
                    value={wavelengthNm}
                    onChange={(e) => setWavelengthNm(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">شدة الإضاءة (Intensity)</span>
                    <span className="font-mono text-amber-400 font-bold">{intensityPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={intensityPercent}
                    onChange={(e) => setIntensityPercent(parseInt(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500">
                    الشدة تزيد عدد الإلكترونات المنبعثة ولا تغير طاقتها الحركية العظمى
                  </div>
                </div>
              </div>
            )}

            {/* de Broglie Controls */}
            {mode === 'de-broglie' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">سرعة الإلكترون (v)</span>
                    <span className="font-mono text-purple-400 font-bold">{dbVelocity} km/s</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="6000"
                    step="250"
                    value={dbVelocity}
                    onChange={(e) => setDbVelocity(parseInt(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Uncertainty Controls */}
            {mode === 'uncertainty' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">تحديد الموضع (Δx)</span>
                    <span className="font-mono text-cyan-400 font-bold">{deltaX_nm} nm</span>
                  </div>
                  <input
                    type="range"
                    min="0.02"
                    max="0.5"
                    step="0.02"
                    value={deltaX_nm}
                    onChange={(e) => setDeltaX_nm(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500">
                    كلما زادت دقة تحديد الموضع (نقصان Δx)، ازداد اللايقين في الزخم والسرعة (زيادة Δp)
                  </div>
                </div>
              </div>
            )}
          </SimulationControls>

          {/* Educational Concept Box */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <h5 className="font-bold text-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>معادلة أينشتاين الكهروضوئية</span>
            </h5>
            <p className="text-slate-400">
              <strong>Kmax = hf - W₀:</strong> يتوقف انبعاث الإلكترونات على تردد الضوء الساقط ودالة العمل للمعدن، ولا يحدث الانبعاث إذا كان التردد أقل من تردد العتبة (f &lt; f₀) مهما بلغت شدة الضوء.
            </p>
            <p className="text-slate-400">
              <strong>جهد الإيقاف (Vs):</strong> مقياس مباشر للطاقة الحركية العظمى للإلكترونات المنبعثة (eVs = Kmax) ولا يتأثر بشدة الضوء الساقط عند ثبوت التردد.
            </p>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
