import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  calculateHydrogenTransition,
  calculateXRay,
  calculateLaserState,
} from './calculations';
import { AtomicSpectraMode } from './types';
import { Sparkles, Radio, Flame } from 'lucide-react';

export const AtomicSpectraLaserSimulation: React.FC = () => {
  const [mode, setMode] = useState<AtomicSpectraMode>('bohr-hydrogen');

  // Mode 1: Bohr Hydrogen
  const [nInitial, setNInitial] = useState<number>(3); // n_i = 3
  const [nFinal, setNFinal] = useState<number>(2); // n_f = 2 (Balmer H-alpha Red)

  // Mode 2: X-Rays
  const [xrayVoltageKv, setXrayVoltageKv] = useState<number>(40); // 40 kV
  const [targetMat, setTargetMat] = useState<'tungsten' | 'molybdenum' | 'copper'>('tungsten');

  // Mode 3: Laser Principle
  const [laserSys, setLaserSys] = useState<'3-level' | '4-level'>('4-level');
  const [pumpPower, setPumpPower] = useState<number>(75); // 75%

  // Calculations
  const bohrResult = calculateHydrogenTransition(nInitial, nFinal);
  const xrayResult = calculateXRay(xrayVoltageKv, targetMat);
  const laserResult = calculateLaserState(laserSys, pumpPower);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animation frame loop
  useEffect(() => {
    let animationId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let tick = 0;

    const render = () => {
      tick += 0.04;
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Tech Dark Background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Grid
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

      if (mode === 'bohr-hydrogen') {
        // Bohr Hydrogen Atom & Spectral Series Visual
        const cx = width / 2 - 120;
        const cy = height / 2;

        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 15px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(
          `نموذج بور لذرة الهيدروجين وانتقالات الإلكترون — ${bohrResult.seriesNameAr}`,
          width / 2,
          30
        );

        // Nucleus (Proton)
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px system-ui';
        ctx.fillText('p⁺', cx, cy + 4);

        // Orbits n = 1 to 6
        const orbitRadii = [35, 65, 100, 140, 185, 230];
        for (let n = 1; n <= 6; n++) {
          const r = orbitRadii[n - 1];
          const isTarget = n === nFinal;
          const isSource = n === nInitial;

          ctx.strokeStyle = isTarget
            ? '#22c55e'
            : isSource
            ? '#38bdf8'
            : 'rgba(148, 163, 184, 0.25)';
          ctx.lineWidth = isTarget || isSource ? 2 : 1;
          ctx.setLineDash(isTarget || isSource ? [4, 2] : [2, 4]);

          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          // Orbit label
          ctx.fillStyle = isTarget ? '#4ade80' : isSource ? '#38bdf8' : '#64748b';
          ctx.font = '10px system-ui';
          ctx.fillText(`n=${n}`, cx + r - 4, cy - 6);
        }

        // Animated jumping electron
        const jumpProgress = (Math.sin(tick * 1.5) + 1) / 2; // 0 to 1
        const rInitial = orbitRadii[nInitial - 1];
        const rFinal = orbitRadii[nFinal - 1];
        const currentR = rInitial + (rFinal - rInitial) * jumpProgress;
        const eAngle = tick * 0.8;
        const ex = cx + currentR * Math.cos(eAngle);
        const ey = cy + currentR * Math.sin(eAngle);

        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(ex, ey, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Emitted Photon Wave Packet
        if (jumpProgress > 0.5) {
          const photonDist = (jumpProgress - 0.5) * 140;
          const px = ex + photonDist * Math.cos(eAngle + 0.8);
          const py = ey + photonDist * Math.sin(eAngle + 0.8);

          ctx.strokeStyle = bohrResult.colorHex;
          ctx.lineWidth = 3;
          ctx.beginPath();
          for (let s = -15; s <= 15; s += 2) {
            const wx = px + s * Math.cos(eAngle + 0.8);
            const wy = py + s * Math.sin(eAngle + 0.8) + Math.sin(s * 0.8 + tick * 8) * 6;
            if (s === -15) ctx.moveTo(wx, wy);
            else ctx.lineTo(wx, wy);
          }
          ctx.stroke();

          ctx.fillStyle = bohrResult.colorHex;
          ctx.font = 'bold 11px system-ui';
          ctx.fillText(`فوتون: λ=${bohrResult.wavelengthNm.toFixed(1)} nm`, px + 20, py - 10);
        }

        // Energy Level Ladder on the Right
        const lx = width - 150;
        const lyTop = 60;
        const lyHeight = height - 100;

        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 12px system-ui';
        ctx.fillText('مستويات الطاقة (eV)', lx + 30, lyTop);

        const levels = [
          { n: 1, e: -13.6 },
          { n: 2, e: -3.4 },
          { n: 3, e: -1.51 },
          { n: 4, e: -0.85 },
          { n: 5, e: -0.54 },
          { n: 6, e: -0.38 },
        ];

        levels.forEach((lvl) => {
          // Scale nonlinearly for visual clarity
          const frac = Math.sqrt((lvl.e - (-13.6)) / 13.6);
          const ly = lyTop + lyHeight * (1 - frac);

          const isInitial = lvl.n === nInitial;
          const isFinal = lvl.n === nFinal;

          ctx.strokeStyle = isFinal ? '#22c55e' : isInitial ? '#38bdf8' : '#475569';
          ctx.lineWidth = isFinal || isInitial ? 2.5 : 1.5;
          ctx.beginPath();
          ctx.moveTo(lx - 50, ly);
          ctx.lineTo(lx + 80, ly);
          ctx.stroke();

          ctx.fillStyle = isFinal ? '#4ade80' : isInitial ? '#38bdf8' : '#94a3b8';
          ctx.font = '11px system-ui';
          ctx.textAlign = 'left';
          ctx.fillText(`n=${lvl.n} (${lvl.e} eV)`, lx + 85, ly + 4);
        });

        // Transition arrow on ladder
        const fracI = Math.sqrt((bohrResult.eInitialEv - (-13.6)) / 13.6);
        const yI = lyTop + lyHeight * (1 - fracI);
        const fracF = Math.sqrt((bohrResult.eFinalEv - (-13.6)) / 13.6);
        const yF = lyTop + lyHeight * (1 - fracF);

        ctx.strokeStyle = bohrResult.colorHex;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(lx, yI);
        ctx.lineTo(lx, yF);
        ctx.stroke();

        // Downward Arrow head
        ctx.fillStyle = bohrResult.colorHex;
        ctx.beginPath();
        ctx.moveTo(lx, yF);
        ctx.lineTo(lx - 5, yF - 8);
        ctx.lineTo(lx + 5, yF - 8);
        ctx.fill();
      } else if (mode === 'x-rays') {
        // X-Ray Tube & Spectrum
        const cx = width / 2;

        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 15px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(
          `طيف الأشعة السينية (X-Rays) عند جهد تعجيل V = ${xrayVoltageKv} kV`,
          cx,
          30
        );

        // Spectrum Graph on Canvas
        const gx = 80;
        const gy = height - 70;
        const gw = width - 160;
        const gh = 230;

        // Axes
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(gx, gy);
        ctx.lineTo(gx + gw, gy); // X axis (λ in nm)
        ctx.moveTo(gx, gy);
        ctx.lineTo(gx, gy - gh); // Y axis (Intensity)
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('الطول الموجي λ (nm) ➔', gx + gw / 2, gy + 35);
        ctx.save();
        ctx.translate(gx - 35, gy - gh / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('شدة الأشعة I', 0, 0);
        ctx.restore();

        // Continuous Bremsstrahlung curve
        const lambdaMin = xrayResult.minWavelengthNm;
        const maxLambda = Math.max(0.2, lambdaMin * 6);

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();

        let started = false;
        for (let px = 0; px <= gw; px += 3) {
          const lam = (px / gw) * maxLambda;
          if (lam < lambdaMin) {
            continue;
          }
          // Bremsstrahlung shape: (λ - λmin) * exp(-(λ-λmin))
          const delta = (lam - lambdaMin) / (lambdaMin * 0.8);
          const intensity = Math.pow(delta, 1.3) * Math.exp(-delta) * 1.5;
          const py = gy - Math.min(gh - 40, intensity * (gh * 0.65));

          if (!started) {
            ctx.moveTo(gx + px, gy);
            started = true;
          }
          ctx.lineTo(gx + px, py);
        }
        ctx.stroke();

        // Characteristic X-Ray Peaks (K_alpha and K_beta)
        const peakAlphaX = gx + (xrayResult.characteristicKAlphaNm / maxLambda) * gw;
        const peakBetaX = gx + (xrayResult.characteristicKBetaNm / maxLambda) * gw;

        if (xrayResult.characteristicKAlphaNm > lambdaMin && peakAlphaX < gx + gw) {
          // K_alpha peak (tall)
          ctx.strokeStyle = '#f43f5e';
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.moveTo(peakAlphaX, gy - 20);
          ctx.lineTo(peakAlphaX, gy - gh + 20);
          ctx.stroke();

          ctx.fillStyle = '#f43f5e';
          ctx.font = 'bold 11px system-ui';
          ctx.fillText(`Kα (${xrayResult.characteristicKAlphaNm} nm)`, peakAlphaX, gy - gh + 10);
        }

        if (xrayResult.characteristicKBetaNm > lambdaMin && peakBetaX < gx + gw) {
          // K_beta peak
          ctx.strokeStyle = '#fb923c';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(peakBetaX, gy - 20);
          ctx.lineTo(peakBetaX, gy - gh + 50);
          ctx.stroke();

          ctx.fillStyle = '#fb923c';
          ctx.font = 'bold 11px system-ui';
          ctx.fillText(`Kβ (${xrayResult.characteristicKBetaNm} nm)`, peakBetaX, gy - gh + 40);
        }

        // λ_min marker line
        const minX = gx + (lambdaMin / maxLambda) * gw;
        ctx.strokeStyle = '#eab308';
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(minX, gy);
        ctx.lineTo(minX, gy - gh);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#facc15';
        ctx.font = 'bold 12px system-ui';
        ctx.fillText(`λ_min = ${lambdaMin.toFixed(4)} nm`, minX + 50, gy - gh + 25);
      } else {
        // Laser Principle (Optical Pumping, Population Inversion, Resonator)
        const cx = width / 2;
        const cy = height / 2 - 20;

        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 15px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(
          `مبدأ عمل الليزر — منظومة ${laserSys === '4-level' ? 'المستويات الأربعة (4-Level)' : 'المستويات الثلاثة (3-Level)'} والمجاوب البصري`,
          cx,
          30
        );

        // Laser Active Medium rod
        const resW = 480;
        const resH = 140;
        const resX = cx - resW / 2;
        const resY = cy - resH / 2;

        const gradMedium = ctx.createLinearGradient(resX, 0, resX + resW, 0);
        gradMedium.addColorStop(0, 'rgba(244, 63, 94, 0.15)');
        gradMedium.addColorStop(0.5, 'rgba(239, 68, 68, 0.3)');
        gradMedium.addColorStop(1, 'rgba(244, 63, 94, 0.15)');
        ctx.fillStyle = gradMedium;
        ctx.fillRect(resX + 30, resY + 20, resW - 60, resH - 40);
        ctx.strokeStyle = '#ef4444';
        ctx.strokeRect(resX + 30, resY + 20, resW - 60, resH - 40);

        // 100% Reflective Mirror (Left)
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(resX + 15, resY + 10, 15, resH - 20);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = 'bold 11px system-ui';
        ctx.fillText('مرآة عاكسة 100%', resX + 22, resY - 5);

        // Partially Reflective Mirror (Right ~ 98%)
        ctx.fillStyle = '#64748b';
        ctx.fillRect(resX + resW - 30, resY + 10, 15, resH - 20);
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText('مرآة شبه عاكسة ~98%', resX + resW - 22, resY - 5);

        // Animated laser beam bouncing inside
        if (laserResult.isPopulationInverted) {
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 4;
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.moveTo(resX + 30, cy);
          ctx.lineTo(resX + resW - 30, cy);
          ctx.stroke();

          // Emitted Coherent Output Beam to the right
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(resX + resW - 15, cy);
          ctx.lineTo(width - 20, cy);
          ctx.stroke();
          ctx.shadowBlur = 0;

          ctx.fillStyle = '#ef4444';
          ctx.font = 'bold 13px system-ui';
          ctx.fillText(`شعاع ليزر متشاكه دقيق (P = ${laserResult.laserOutputPowerMw.toFixed(0)} mW) ➔`, cx, cy + 40);
        } else {
          ctx.fillStyle = '#eab308';
          ctx.font = 'bold 13px system-ui';
          ctx.fillText('لم يتحقق التوزيع المعكوس بعد — ارفع قدرة الضخ', cx, cy);
        }

        // Energy levels population indicators
        const popY = cy + 100;
        ctx.fillStyle = '#38bdf8';
        ctx.font = '12px system-ui';
        ctx.fillText(`المستوى الأرضي N1: ${laserResult.populationN1.toFixed(0)}%`, cx - 140, popY);
        ctx.fillStyle = '#a855f7';
        ctx.fillText(`المستوى شبه المستقر N3: ${laserResult.populationN3.toFixed(0)}%`, cx + 140, popY);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [mode, nInitial, nFinal, bohrResult, xrayVoltageKv, targetMat, xrayResult, laserSys, pumpPower, laserResult]);

  const handleReset = () => {
    setNInitial(3);
    setNFinal(2);
    setXrayVoltageKv(40);
    setTargetMat('tungsten');
    setLaserSys('4-level');
    setPumpPower(75);
  };

  return (
    <SimulationShell
      title="مختبر الأطياف الذرية والليزر"
      subtitle="الفصل السابع — نموذج بور لذرة الهيدروجين، طيف الأشعة السينية، مبدأ عمل الليزر والتوزيع المعكوس"
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
          {mode === 'bohr-hydrogen' && (
            <SimulationHUD>
              <HUDMetric
                label="السلسلة الطيفية"
                value={bohrResult.seriesNameAr.split('(')[0].trim()}
                highlight={true}
              />
              <HUDMetric
                label="طاقة الفوتون المنبعث ΔE"
                value={bohrResult.deltaEEv.toFixed(3)}
                unit="eV"
              />
              <HUDMetric
                label="الطول الموجي λ"
                value={bohrResult.wavelengthNm.toFixed(1)}
                unit="nm"
                highlight={true}
              />
            </SimulationHUD>
          )}

          {mode === 'x-rays' && (
            <SimulationHUD>
              <HUDMetric
                label="جهد التعجيل المطبق V"
                value={xrayVoltageKv}
                unit="kV"
              />
              <HUDMetric
                label="أقصر طول موجي λ_min"
                value={xrayResult.minWavelengthNm.toFixed(4)}
                unit="nm"
                highlight={true}
              />
              <HUDMetric
                label="أعظم تردد f_max"
                value={(xrayResult.maxFrequencyHz / 1e18).toFixed(2)}
                unit="×10¹⁸ Hz"
              />
            </SimulationHUD>
          )}

          {mode === 'laser-principle' && (
            <SimulationHUD>
              <HUDMetric
                label="حالة التوزيع المعكوس"
                value={laserResult.isPopulationInverted ? 'متحقق (Inverted)' : 'غير متحقق (Normal)'}
                highlight={laserResult.isPopulationInverted}
              />
              <HUDMetric
                label="قدرة خرج الليزر الصادرة"
                value={laserResult.laserOutputPowerMw.toFixed(1)}
                unit="mW"
                highlight={laserResult.laserOutputPowerMw > 0}
              />
              <HUDMetric
                label="المنظومة الليزرية"
                value={laserSys === '4-level' ? '4 مستويات (عالية الكفاءة)' : '3 مستويات'}
              />
            </SimulationHUD>
          )}
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls title="إعدادات الأطياف والليزر">
            {/* Mode Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">الموضوع التعليمي</label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                <button
                  onClick={() => setMode('bohr-hydrogen')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'bohr-hydrogen' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  طيف بور
                </button>
                <button
                  onClick={() => setMode('x-rays')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'x-rays' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  الأشعة السينية
                </button>
                <button
                  onClick={() => setMode('laser-principle')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'laser-principle' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  منظومة الليزر
                </button>
              </div>
            </div>

            {mode === 'bohr-hydrogen' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400">السلسلة الطيفية (المستوى النهائي nf):</label>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { n: 1, label: 'لايمان (1)' },
                      { n: 2, label: 'بالمر (2)' },
                      { n: 3, label: 'باشن (3)' },
                      { n: 4, label: 'براكت (4)' },
                      { n: 5, label: 'فوند (5)' },
                    ].map((s) => (
                      <button
                        key={s.n}
                        onClick={() => {
                          setNFinal(s.n);
                          if (nInitial <= s.n) setNInitial(s.n + 1);
                        }}
                        className={`py-1.5 text-xs rounded-lg font-medium transition ${
                          nFinal === s.n ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">المستوى الابتدائي (ni):</span>
                    <span className="font-mono text-sky-400 font-bold">n = {nInitial}</span>
                  </div>
                  <input
                    type="range"
                    min={nFinal + 1}
                    max={6}
                    step="1"
                    value={nInitial}
                    onChange={(e) => setNInitial(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                </div>
              </div>
            )}

            {mode === 'x-rays' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">فرق الجهد المعجل (V):</span>
                    <span className="font-mono text-rose-400 font-bold">{xrayVoltageKv} kV</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={xrayVoltageKv}
                    onChange={(e) => setXrayVoltageKv(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">مادة الهدف الفلزي (Target):</label>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { id: 'tungsten', label: 'تنكستن (W)' },
                      { id: 'molybdenum', label: 'مولبدنيوم' },
                      { id: 'copper', label: 'نحاس (Cu)' },
                    ].map((mat) => (
                      <button
                        key={mat.id}
                        onClick={() => setTargetMat(mat.id as any)}
                        className={`py-1.5 text-xs rounded-lg ${
                          targetMat === mat.id ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {mat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {mode === 'laser-principle' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400">نوع منظومة المستويات:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setLaserSys('3-level')}
                      className={`py-1.5 rounded-lg ${
                        laserSys === '3-level' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      3 مستويات (الياقوت)
                    </button>
                    <button
                      onClick={() => setLaserSys('4-level')}
                      className={`py-1.5 rounded-lg ${
                        laserSys === '4-level' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      4 مستويات (النديميوم)
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">شدة الضخ:</span>
                    <span className="font-mono text-emerald-400 font-bold">{pumpPower}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={pumpPower}
                    onChange={(e) => setPumpPower(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>
            )}
          </SimulationControls>

          {/* Educational Note */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <h5 className="font-bold text-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>المفاهيم الوزارية الأساسية</span>
            </h5>
            <p className="text-slate-400">
              <strong>أشعة الكبح:</strong> تنتج عند تباطؤ الإلكترونات المعجلة بفعل المجال الكهربائي لنوى مادة الهدف.
            </p>
            <p className="text-slate-400">
              <strong>الليزر:</strong> يتميز بأحادية الطول الموجي، التشاكه، الاتجاهية الدقيقة، والسطوع العالي.
            </p>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
