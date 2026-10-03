import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  calculateYoungDoubleSlit,
  calculateDiffractionGrating,
  calculatePolarization,
  calculateScattering,
} from './calculations';
import { OpticsMode } from './types';
import { Eye, Sun, Sparkles, Sliders, RotateCcw, Filter, Activity } from 'lucide-react';

export const PhysicalOpticsSimulation: React.FC = () => {
  const [mode, setMode] = useState<OpticsMode>('young-double-slit');

  // Young slit parameters
  const [wavelengthNm, setWavelengthNm] = useState<number>(632); // 632.8 nm (He-Ne Red Laser)
  const [slitSepMm, setSlitSepMm] = useState<number>(0.25); // mm
  const [screenDistM, setScreenDistM] = useState<number>(1.5); // m
  const [orderM, setOrderM] = useState<number>(1);

  // Grating parameters
  const [gratingLines, setGratingLines] = useState<number>(500); // lines/mm

  // Polarization parameters
  const [analyzerAngle, setAnalyzerAngle] = useState<number>(45); // deg

  // Calculations
  const youngResult = calculateYoungDoubleSlit(wavelengthNm, slitSepMm, screenDistM, orderM);
  const gratingResult = calculateDiffractionGrating(wavelengthNm, gratingLines, orderM);
  const polResult = calculatePolarization(100, analyzerAngle);
  const scatResult = calculateScattering(wavelengthNm);

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

    // Deep tech optics bench background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    if (mode === 'young-double-slit') {
      // Young's Double Slit Setup
      const cy = height / 2;
      const laserX = 60;
      const barrierX = 220;
      const screenX = width - 110;

      // Laser Source
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(laserX - 30, cy - 18, 50, 36);
      ctx.strokeStyle = youngResult.colorHex;
      ctx.lineWidth = 2;
      ctx.strokeRect(laserX - 30, cy - 18, 50, 36);

      ctx.fillStyle = youngResult.colorHex;
      ctx.beginPath();
      ctx.arc(laserX + 20, cy, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('مصدر الليزر', laserX - 5, cy - 26);

      // Light beam from laser to slit barrier
      ctx.strokeStyle = youngResult.colorHex;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(laserX + 20, cy);
      ctx.lineTo(barrierX, cy);
      ctx.stroke();

      // Slit Barrier with 2 pinholes
      ctx.fillStyle = '#475569';
      ctx.fillRect(barrierX, 40, 10, height - 80);

      const slitVisualGap = 26;
      // Clear 2 slit openings
      ctx.fillStyle = '#090d16';
      ctx.fillRect(barrierX - 1, cy - slitVisualGap / 2 - 4, 12, 8);
      ctx.fillRect(barrierX - 1, cy + slitVisualGap / 2 - 4, 12, 8);

      ctx.fillStyle = '#fbbf24';
      ctx.fillText(`شقا يونك (d = ${slitSepMm}mm)`, barrierX + 5, 30);

      // Diffracted wave rays from slits to screen
      ctx.strokeStyle = `${youngResult.colorHex}55`;
      ctx.lineWidth = 1;
      const screenH = height - 80;
      for (let y = 50; y <= height - 50; y += 12) {
        ctx.beginPath();
        ctx.moveTo(barrierX + 10, cy - slitVisualGap / 2);
        ctx.lineTo(screenX, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(barrierX + 10, cy + slitVisualGap / 2);
        ctx.lineTo(screenX, y);
        ctx.stroke();
      }

      // Observation Screen
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(screenX, 40, 24, screenH);
      ctx.strokeStyle = '#64748b';
      ctx.strokeRect(screenX, 40, 24, screenH);

      ctx.fillStyle = '#94a3b8';
      ctx.fillText('شاشة الرؤية', screenX + 12, 30);
      ctx.fillText(`البعد: L = ${screenDistM}m`, (barrierX + screenX) / 2, height - 15);

      // Realistic Interference Pattern on Screen Strip
      const fringeWidthPx = Math.min(30, Math.max(6, youngResult.fringeSpacingMm * 4.5));
      for (let y = 40; y <= height - 40; y++) {
        const distFromCenter = Math.abs(y - cy);
        const phase = (distFromCenter / fringeWidthPx) * Math.PI;
        const intensity = Math.pow(Math.cos(phase), 2);

        ctx.fillStyle = `${youngResult.colorHex}${Math.round(intensity * 255)
          .toString(16)
          .padStart(2, '0')}`;
        ctx.fillRect(screenX + 2, y, 20, 1);
      }

      // Center bright fringe indicator
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.moveTo(screenX + 32, cy);
      ctx.lineTo(screenX + 44, cy - 6);
      ctx.lineTo(screenX + 44, cy + 6);
      ctx.closePath();
      ctx.fill();

      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('الهدب المركزي (m = 0)', screenX + 50, cy + 4);

      // 1st Order Bright Fringe
      const y1Px = cy - fringeWidthPx;
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`الهدب المضيء الأول (Δy = ${youngResult.fringeSpacingMm.toFixed(2)} mm)`, screenX + 50, y1Px + 4);
    } else if (mode === 'diffraction-grating') {
      // Diffraction Grating Setup
      const cy = height / 2;
      const sourceX = 80;
      const gratingX = 260;
      const screenX = width - 100;

      // Incident Beam
      ctx.strokeStyle = youngResult.colorHex;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(sourceX, cy);
      ctx.lineTo(gratingX, cy);
      ctx.stroke();

      // Grating Barrier
      ctx.fillStyle = '#334155';
      ctx.fillRect(gratingX - 4, 50, 8, height - 100);
      ctx.strokeStyle = '#06b6d4';
      ctx.strokeRect(gratingX - 4, 50, 8, height - 100);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`محزز الحيود (${gratingLines} حز/ملم)`, gratingX, 35);

      // Central Order (m = 0)
      ctx.strokeStyle = youngResult.colorHex;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(gratingX, cy);
      ctx.lineTo(screenX, cy);
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.fillText('المرتبة المركزية m = 0 (θ = 0°)', screenX - 90, cy - 8);

      // First Order (m = +1 and m = -1)
      const rad = (gratingResult.diffractionAngleDeg * Math.PI) / 180;
      const beamLen = screenX - gratingX;
      const yDiff = beamLen * Math.tan(rad);

      // Top beam (m = +1)
      ctx.strokeStyle = youngResult.colorHex;
      ctx.beginPath();
      ctx.moveTo(gratingX, cy);
      ctx.lineTo(screenX, cy - yDiff);
      ctx.stroke();
      ctx.fillStyle = youngResult.colorHex;
      ctx.fillText(`المرتبة الأولى m = +1 (θ = ${gratingResult.diffractionAngleDeg.toFixed(1)}°)`, screenX - 100, cy - yDiff - 10);

      // Bottom beam (m = -1)
      ctx.beginPath();
      ctx.moveTo(gratingX, cy);
      ctx.lineTo(screenX, cy + yDiff);
      ctx.stroke();
      ctx.fillText(`المرتبة الأولى m = -1 (θ = ${gratingResult.diffractionAngleDeg.toFixed(1)}°)`, screenX - 100, cy + yDiff + 20);
    } else if (mode === 'polarization') {
      // Polarization & Malus's Law Setup
      const cy = height / 2;
      const sourceX = 90;
      const polX = 260;
      const analyzerX = 480;
      const sensorX = width - 110;

      // Unpolarized Light from source (Cross arrows in all directions)
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sourceX, cy);
      ctx.lineTo(polX, cy);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ضوء غير مستقطب', (sourceX + polX) / 2, cy - 25);

      // Polarizer Filter (Vertical lines)
      ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
      ctx.fillRect(polX - 15, cy - 60, 30, 120);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(polX - 15, cy - 60, 30, 120);

      // Vertical grid lines inside polarizer
      ctx.strokeStyle = '#38bdf8';
      for (let y = cy - 50; y <= cy + 50; y += 12) {
        ctx.beginPath();
        ctx.moveTo(polX - 10, y);
        ctx.lineTo(polX + 10, y);
        ctx.stroke();
      }
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('المستقطب (رأسي 90°)', polX, cy + 85);

      // Linearly Polarized Light between filters
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(polX + 15, cy);
      ctx.lineTo(analyzerX - 15, cy);
      ctx.stroke();

      // Analyzer Filter (Rotated by angle θ)
      ctx.save();
      ctx.translate(analyzerX, cy);
      ctx.rotate((analyzerAngle * Math.PI) / 180);

      ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
      ctx.fillRect(-15, -60, 30, 120);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.strokeRect(-15, -60, 30, 120);

      ctx.strokeStyle = '#f59e0b';
      for (let y = -50; y <= 50; y += 12) {
        ctx.beginPath();
        ctx.moveTo(-10, y);
        ctx.lineTo(10, y);
        ctx.stroke();
      }
      ctx.restore();

      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`المحلل (زاوية θ = ${analyzerAngle}°)`, analyzerX, cy + 85);

      // Transmitted Light with reduced intensity
      const transRatio = polResult.transmissionPercent / 100;
      ctx.strokeStyle = `rgba(245, 158, 11, ${Math.max(0.05, transRatio)})`;
      ctx.lineWidth = Math.max(1, transRatio * 6);
      ctx.beginPath();
      ctx.moveTo(analyzerX + 15, cy);
      ctx.lineTo(sensorX, cy);
      ctx.stroke();

      // Light Sensor readout
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(sensorX - 10, cy - 35, 60, 70);
      ctx.strokeStyle = '#10b981';
      ctx.strokeRect(sensorX - 10, cy - 35, 60, 70);

      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText('كاشف الشدة', sensorX + 20, cy - 10);
      ctx.fillText(`${polResult.transmissionPercent.toFixed(1)}%`, sensorX + 20, cy + 15);
    } else {
      // Rayleigh Scattering Setup
      const cy = height / 2;
      const sourceX = 100;
      const chamberX = width / 2;
      const chamberW = 240;
      const chamberH = 150;

      // Sunlight / White light beam
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(sourceX, cy);
      ctx.lineTo(chamberX - chamberW / 2, cy);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ضوء أبيض مركب', sourceX + 20, cy - 20);

      // Scattering Gas / Liquid Chamber
      ctx.fillStyle = 'rgba(59, 130, 246, 0.15)';
      ctx.fillRect(chamberX - chamberW / 2, cy - chamberH / 2, chamberW, chamberH);
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.strokeRect(chamberX - chamberW / 2, cy - chamberH / 2, chamberW, chamberH);

      // Blue scattered light going sideways (Up and Down)
      ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
      for (let i = 0; i < 20; i++) {
        const px = chamberX - chamberW / 2 + 20 + ((i * 37) % (chamberW - 40));
        const py = cy - chamberH / 2 + 15 + ((i * 29) % (chamberH - 30));
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#38bdf8';
      ctx.fillText('استطارة قوية للأطوال الموجية القصيرة (اللون الأزرق)', chamberX, cy - chamberH / 2 - 15);

      // Transmitted Red Light emerging from right side
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(chamberX + chamberW / 2, cy);
      ctx.lineTo(width - 80, cy);
      ctx.stroke();

      ctx.fillStyle = '#f87171';
      ctx.fillText('الضوء النافذ (أحمر / برتقالي)', width - 120, cy - 20);
    }
  }, [mode, wavelengthNm, slitSepMm, screenDistM, orderM, youngResult, gratingLines, gratingResult, analyzerAngle, polResult, scatResult]);

  const handleReset = () => {
    setWavelengthNm(632);
    setSlitSepMm(0.25);
    setScreenDistM(1.5);
    setOrderM(1);
    setGratingLines(500);
    setAnalyzerAngle(45);
  };

  return (
    <SimulationShell
      title="مختبر البصريات الفيزيائية"
      subtitle="الفصل الرابع — تداخل الموجات الضوئية (تجربة شقي يونك)، محزز الحيود، الاستقطاب وقانون مالوس، واستطارة الضوء"
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
          {mode === 'young-double-slit' && (
            <SimulationHUD>
              <HUDMetric
                label="فاصلة الهدب (Δy = λ·L / d)"
                value={youngResult.fringeSpacingMm.toFixed(3)}
                unit="mm"
                highlight={true}
              />
              <HUDMetric
                label="موقع الهدب المضيء (ym)"
                value={youngResult.brightFringePositionMm.toFixed(2)}
                unit="mm"
                highlight={true}
              />
              <HUDMetric
                label="الطول الموجي للضوء (λ)"
                value={wavelengthNm.toString()}
                unit="nm"
                color="text-cyan-400"
              />
              <HUDMetric
                label="رتبة التداخل (m)"
                value={`m = ${orderM}`}
              />
            </SimulationHUD>
          )}

          {mode === 'diffraction-grating' && (
            <SimulationHUD>
              <HUDMetric
                label="زاوية الحيود (θ)"
                value={`${gratingResult.diffractionAngleDeg.toFixed(2)}°`}
                highlight={true}
              />
              <HUDMetric
                label="ثابت المحزز (d)"
                value={gratingResult.gratingSpacingMicrons.toFixed(2)}
                unit="μm"
                highlight={true}
              />
              <HUDMetric
                label="أقصى مرتبة حيود مرئية"
                value={`m_max = ${gratingResult.maxObservableOrder}`}
              />
              <HUDMetric
                label="كثافة الحزوز (N)"
                value={gratingLines.toString()}
                unit="حز/ملم"
              />
            </SimulationHUD>
          )}

          {mode === 'polarization' && (
            <SimulationHUD>
              <HUDMetric
                label="الشدة النافذة (I = I₀ cos²θ)"
                value={polResult.transmissionPercent.toFixed(1)}
                unit="%"
                highlight={true}
              />
              <HUDMetric
                label="زاوية المحلل (θ)"
                value={`${analyzerAngle}°`}
                highlight={true}
              />
              <HUDMetric
                label="قانون مالوس (Malus's Law)"
                value="I = I₀ · cos²(θ)"
              />
              <HUDMetric
                label="حالة الاستقطاب"
                value={analyzerAngle === 90 ? 'تعامد تام (حجب الضوء)' : 'نفاذ جزئي'}
              />
            </SimulationHUD>
          )}

          {mode === 'scattering' && (
            <SimulationHUD>
              <HUDMetric
                label="شدة الاستطارة النسبية (I ∝ 1/λ⁴)"
                value={scatResult.relativeScatteringIntensity.toFixed(2)}
                highlight={true}
              />
              <HUDMetric
                label="الطول الموجي المستطار (λ)"
                value={wavelengthNm.toString()}
                unit="nm"
              />
              <HUDMetric
                label="قانون ريليه للاستطارة"
                value="I ∝ 1 / λ⁴"
                highlight={true}
              />
              <HUDMetric
                label="الظاهرة الطبيعية"
                value={wavelengthNm < 500 ? 'زرقة السماء' : 'حمرة الشفق'}
              />
            </SimulationHUD>
          )}
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls title="إعدادات البصريات">
            {/* Mode Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">الظاهرة الضوئية</label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  onClick={() => setMode('young-double-slit')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'young-double-slit' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  تجربة شقي يونك
                </button>
                <button
                  onClick={() => setMode('diffraction-grating')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'diffraction-grating' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  محزز الحيود
                </button>
                <button
                  onClick={() => setMode('polarization')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'polarization' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  الاستقطاب (مالوس)
                </button>
                <button
                  onClick={() => setMode('scattering')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'scattering' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  استطارة الضوء
                </button>
              </div>
            </div>

            {/* Wavelength Slider (Shared across modes) */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">الطول الموجي للضوء (λ)</span>
                  <span className="font-mono text-cyan-400 font-bold">{wavelengthNm} nm</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="700"
                  step="5"
                  value={wavelengthNm}
                  onChange={(e) => setWavelengthNm(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Young Controls */}
              {mode === 'young-double-slit' && (
                <>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">البعد بين الشقين (d)</span>
                      <span className="font-mono text-amber-400 font-bold">{slitSepMm.toFixed(2)} mm</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="0.8"
                      step="0.05"
                      value={slitSepMm}
                      onChange={(e) => setSlitSepMm(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">بعد الشاشة عن الشقين (L)</span>
                      <span className="font-mono text-cyan-400 font-bold">{screenDistM.toFixed(1)} m</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="3.0"
                      step="0.1"
                      value={screenDistM}
                      onChange={(e) => setScreenDistM(parseFloat(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>
                </>
              )}

              {/* Grating Controls */}
              {mode === 'diffraction-grating' && (
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">عدد الحزوز لكل ملم (N)</span>
                    <span className="font-mono text-cyan-400 font-bold">{gratingLines} lines/mm</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={gratingLines}
                    onChange={(e) => setGratingLines(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              )}

              {/* Polarization Controls */}
              {mode === 'polarization' && (
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">زاوية دوران المحلل (θ)</span>
                    <span className="font-mono text-amber-400 font-bold">{analyzerAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="180"
                    step="5"
                    value={analyzerAngle}
                    onChange={(e) => setAnalyzerAngle(parseInt(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </SimulationControls>

          {/* Educational Concept Box */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <h5 className="font-bold text-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>مفاهيم البصريات الفيزيائية</span>
            </h5>
            <p className="text-slate-400">
              <strong>فاصلة الهدب (Δy):</strong> تزداد فاصلة الهدب طردياً مع الطول الموجي λ وبعد الشاشة L، وعكسياً مع البعد بين الشقين d: Δy = λ L / d.
            </p>
            <p className="text-slate-400">
              <strong>استطارة ريليه:</strong> تتناسب شدة الاستطارة عكسياً مع الأس الرابع للطول الموجي (I ∝ 1/λ⁴)، ولذا يستطار الضوء الأزرق والبنفسجي بمقدار يفوق الضوء الأحمر بعدة أضعاف.
            </p>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
