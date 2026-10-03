import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  calculateNuclearStructure,
  calculateBindingEnergy,
  calculateDecayLaw,
  ISOTOPE_PRESETS,
} from './calculations';
import { NuclearMode, IsotopePresetId } from './types';
import { Atom, Shield, Activity, Sparkles } from 'lucide-react';

export const NuclearPhysicsSimulation: React.FC = () => {
  const [mode, setMode] = useState<NuclearMode>('nuclear-structure');

  // Mode 1: Nuclear structure
  const [atomicZ, setAtomicZ] = useState<number>(26); // Iron Z=26
  const [massA, setMassA] = useState<number>(56); // Iron A=56

  // Mode 2: Binding Energy
  const [selectedIsotopeId, setSelectedIsotopeId] = useState<IsotopePresetId>('iron-56');

  // Mode 3: Decay Law
  const [decayIsotopeId, setDecayIsotopeId] = useState<IsotopePresetId>('carbon-14');
  const [elapsedYears, setElapsedYears] = useState<number>(5730);

  const selectedIsotope =
    ISOTOPE_PRESETS.find((iso) => iso.id === selectedIsotopeId) || ISOTOPE_PRESETS[2];
  const decayIsotope =
    ISOTOPE_PRESETS.find((iso) => iso.id === decayIsotopeId) || ISOTOPE_PRESETS[4];

  // Calculations
  const structResult = calculateNuclearStructure(atomicZ, massA);
  const bindingResult = calculateBindingEnergy(
    selectedIsotope.Z,
    selectedIsotope.A,
    selectedIsotope.atomicMassU
  );
  const decayResult = calculateDecayLaw(
    1000,
    decayIsotope.halfLifeYears || 1000,
    elapsedYears
  );

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
      tick += 0.03;
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Tech Dark Background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Subtle grid
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

      if (mode === 'nuclear-structure') {
        // Nuclear Cluster View
        const cx = width / 2;
        const cy = height / 2;

        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 15px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(
          `التركيب والحجم النووي: العدد الذري Z = ${structResult.Z} ، عدد النيوترونات N = ${structResult.N} ، العدد الكتلي A = ${structResult.A}`,
          cx,
          30
        );

        // Visual radius of the nucleus cluster
        const visualR = Math.max(35, Math.min(130, structResult.radiusFm * 20));

        // Nuclear boundary glow
        const grad = ctx.createRadialGradient(cx, cy, visualR * 0.2, cx, cy, visualR * 1.3);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0.2)');
        grad.addColorStop(1, 'rgba(56, 189, 248, 0.0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, visualR * 1.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(cx, cy, visualR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw Protons and Neutrons packed inside
        const numNucleons = Math.min(60, structResult.A);
        const zFraction = structResult.Z / structResult.A;

        for (let i = 0; i < numNucleons; i++) {
          const angle = i * 2.39996 + tick * 0.1;
          const dist = Math.sqrt((i + 0.5) / numNucleons) * (visualR - 12);
          const px = cx + dist * Math.cos(angle);
          const py = cy + dist * Math.sin(angle);

          const isProton = (i / numNucleons) < zFraction;

          ctx.fillStyle = isProton ? '#ef4444' : '#64748b'; // Red = Proton, Grey = Neutron
          ctx.beginPath();
          ctx.arc(px, py, 7, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = isProton ? '#f87171' : '#94a3b8';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Radius Dimension line
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + visualR, cy);
        ctx.stroke();

        ctx.fillStyle = '#facc15';
        ctx.font = 'bold 12px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(`R = ${structResult.radiusFm.toFixed(2)} fm`, cx + visualR / 2, cy - 10);

        // Legend
        const legY = height - 40;
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(cx - 100, legY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#f87171';
        ctx.font = '12px system-ui';
        ctx.fillText(`بروتونات (+e): ${structResult.Z}`, cx - 50, legY + 4);

        ctx.fillStyle = '#64748b';
        ctx.beginPath();
        ctx.arc(cx + 60, legY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText(`نيوترونات (متعادلة): ${structResult.N}`, cx + 120, legY + 4);
      } else if (mode === 'binding-energy') {
        // Curve of Binding Energy per Nucleon (Eb / A vs A)
        const cx = width / 2;

        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 15px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(
          `منحنى طاقة الارتباط النووي لكل نيوكليون (Eb / A) — ${selectedIsotope.symbol}`,
          cx,
          30
        );

        const gx = 70;
        const gy = height - 60;
        const gw = width - 140;
        const gh = 230;

        // Axes
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(gx, gy);
        ctx.lineTo(gx + gw, gy); // X = Mass number A (0 to 240)
        ctx.moveTo(gx, gy);
        ctx.lineTo(gx, gy - gh); // Y = Eb/A (0 to 10 MeV)
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('العدد الكتلي (A) ➔', gx + gw / 2, gy + 35);
        ctx.save();
        ctx.translate(gx - 35, gy - gh / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('طاقة الارتباط لكل نيوكليون Eb/A (MeV)', 0, 0);
        ctx.restore();

        // Standard nuclear binding energy curve
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();

        for (let a = 1; a <= 240; a += 2) {
          let ebPerA = 0;
          if (a <= 4) ebPerA = a * 1.8;
          else if (a <= 56) ebPerA = 7.0 + 1.8 * Math.sin(((a - 4) / 52) * (Math.PI / 2));
          else ebPerA = 8.8 - ((a - 56) / 184) * 1.25;

          const px = gx + (a / 240) * gw;
          const py = gy - (ebPerA / 10) * gh;

          if (a === 1) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Highlight selected nucleus point on curve
        const selA = selectedIsotope.A;
        const selEbA = bindingResult.bindingEnergyPerNucleonMev;
        const selX = gx + (selA / 240) * gw;
        const selY = gy - (selEbA / 10) * gh;

        ctx.fillStyle = '#f43f5e';
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(selX, selY, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px system-ui';
        ctx.fillText(`${selectedIsotope.symbol} (${selEbA.toFixed(2)} MeV)`, selX, selY - 14);

        ctx.fillStyle = '#4ade80';
        ctx.font = '11px system-ui';
        ctx.fillText('منطقة الاندماج النووي (Fusion) ➔', gx + 80, gy - 70);

        ctx.fillStyle = '#fb923c';
        ctx.fillText('➔ منطقة الانشطار النووي (Fission)', gx + gw - 100, gy - 120);
      } else {
        // Radioactive Decay Law Exponential Curve
        const cx = width / 2;

        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 15px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(
          `قانون الانحلال الإشعاعي وعمر النصف — ${decayIsotope.nameAr}`,
          cx,
          30
        );

        const gx = 70;
        const gy = height - 60;
        const gw = width - 140;
        const gh = 230;

        // Axes
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(gx, gy);
        ctx.lineTo(gx + gw, gy);
        ctx.moveTo(gx, gy);
        ctx.lineTo(gx, gy - gh);
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('الزمن المنقضي (t) بمضاعفات عمر النصف ➔', gx + gw / 2, gy + 35);
        ctx.save();
        ctx.translate(gx - 35, gy - gh / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('عدد النوى المشعة المتبقية N(t)', 0, 0);
        ctx.restore();

        const t12 = decayIsotope.halfLifeYears || 1;
        const maxTime = t12 * 4; // 4 half-lives

        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let px = 0; px <= gw; px += 3) {
          const t = (px / gw) * maxTime;
          const fracRemaining = Math.pow(0.5, t / t12);
          const py = gy - fracRemaining * (gh * 0.9);

          if (px === 0) ctx.moveTo(gx + px, py);
          else ctx.lineTo(gx + px, py);
        }
        ctx.stroke();

        // Half-life steps markers (1 T1/2, 2 T1/2, 3 T1/2)
        for (let step = 1; step <= 3; step++) {
          const sx = gx + (step / 4) * gw;
          const sy = gy - Math.pow(0.5, step) * (gh * 0.9);

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(sx, gy);
          ctx.lineTo(sx, sy);
          ctx.lineTo(gx, sy);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = '#c084fc';
          ctx.font = '11px system-ui';
          ctx.fillText(`${step} T½`, sx, gy + 15);
          ctx.fillText(`N₀/${Math.pow(2, step)}`, gx - 20, sy + 4);
        }

        // Current user time point
        const curFracTime = Math.min(1, elapsedYears / maxTime);
        const curX = gx + curFracTime * gw;
        const curFracRemaining = Math.exp(-decayResult.decayConstantPerSec * decayResult.elapsedTimeSeconds);
        const curY = gy - curFracRemaining * (gh * 0.9);

        ctx.fillStyle = '#22c55e';
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(curX, curY, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#4ade80';
        ctx.font = 'bold 12px system-ui';
        ctx.fillText(`المتبقي: ${decayResult.remainingCountN.toFixed(0)} (${((decayResult.remainingCountN / 1000) * 100).toFixed(1)}%)`, curX + 10, curY - 12);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [mode, atomicZ, massA, structResult, selectedIsotope, bindingResult, decayIsotope, elapsedYears, decayResult]);

  const handleReset = () => {
    setAtomicZ(26);
    setMassA(56);
    setSelectedIsotopeId('iron-56');
    setDecayIsotopeId('carbon-14');
    setElapsedYears(5730);
  };

  return (
    <SimulationShell
      title="مختبر الفيزياء النووية"
      subtitle="الفصل الثامن — خواص وحجم النواة، طاقة الارتباط النووي والنقص الكتلي، قانون الانحلال الإشعاعي"
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
          {mode === 'nuclear-structure' && (
            <SimulationHUD>
              <HUDMetric
                label="نصف القطر النووي R"
                value={structResult.radiusFm.toFixed(2)}
                unit="fm (10⁻¹⁵ m)"
                highlight={true}
              />
              <HUDMetric
                label="الشحنة الموجبة للنواة Q"
                value={(structResult.chargeCoulombs / 1e-19).toFixed(1)}
                unit="×10⁻¹⁹ C"
              />
              <HUDMetric
                label="الكثافة الكتلية"
                value={(structResult.densityKgM3 / 1e17).toFixed(1)}
                unit="×10¹⁷ kg/m³"
              />
            </SimulationHUD>
          )}

          {mode === 'binding-energy' && (
            <SimulationHUD>
              <HUDMetric
                label="النقص الكتلي Δm"
                value={bindingResult.massDefectU.toFixed(5)}
                unit="u"
              />
              <HUDMetric
                label="طاقة الارتباط النووي Eb"
                value={bindingResult.bindingEnergyMev.toFixed(2)}
                unit="MeV"
                highlight={true}
              />
              <HUDMetric
                label="طاقة الارتباط لكل نيوكليون Eb/A"
                value={bindingResult.bindingEnergyPerNucleonMev.toFixed(3)}
                unit="MeV/nucleon"
                highlight={true}
              />
            </SimulationHUD>
          )}

          {mode === 'radioactive-decay' && (
            <SimulationHUD>
              <HUDMetric
                label="العدد المتبقي N(t)"
                value={decayResult.remainingCountN.toFixed(0)}
                unit="/ 1000"
                highlight={true}
              />
              <HUDMetric
                label="عمر النصف T½ للمادة"
                value={decayIsotope.halfLifeYears || 0}
                unit="سنة"
              />
              <HUDMetric
                label="نسبة النوى المنحلة"
                value={((decayResult.decayedCount / 1000) * 100).toFixed(1)}
                unit="%"
              />
            </SimulationHUD>
          )}
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls title="إعدادات الفيزياء النووية">
            {/* Mode Switcher */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">الموضوع التعليمي</label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                <button
                  onClick={() => setMode('nuclear-structure')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'nuclear-structure' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  التركيب النووي
                </button>
                <button
                  onClick={() => setMode('binding-energy')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'binding-energy' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  طاقة الارتباط
                </button>
                <button
                  onClick={() => setMode('radioactive-decay')}
                  className={`p-2 rounded-xl font-bold cursor-pointer transition-all ${
                    mode === 'radioactive-decay' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  الانحلال الإشعاعي
                </button>
              </div>
            </div>

            {mode === 'nuclear-structure' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">العدد الذري (البروتونات Z):</span>
                    <span className="font-mono text-sky-400 font-bold">Z = {atomicZ}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="92"
                    step="1"
                    value={atomicZ}
                    onChange={(e) => {
                      const newZ = parseInt(e.target.value);
                      setAtomicZ(newZ);
                      if (massA < newZ) setMassA(newZ * 2);
                    }}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">العدد الكتلي (النيوكليونات A):</span>
                    <span className="font-mono text-sky-400 font-bold">A = {massA}</span>
                  </div>
                  <input
                    type="range"
                    min={atomicZ}
                    max="240"
                    step="1"
                    value={massA}
                    onChange={(e) => setMassA(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                </div>
              </div>
            )}

            {mode === 'binding-energy' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <label className="text-slate-400">نماذج الأنوية:</label>
                <div className="grid grid-cols-2 gap-2">
                  {ISOTOPE_PRESETS.map((iso) => (
                    <button
                      key={iso.id}
                      onClick={() => setSelectedIsotopeId(iso.id)}
                      className={`py-1.5 px-2 text-xs rounded-lg font-medium transition ${
                        selectedIsotopeId === iso.id
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {iso.symbol} ({iso.nameAr.split('(')[0]})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {mode === 'radioactive-decay' && (
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <label className="text-slate-400">النظير المشع:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'carbon-14', label: 'كربون-14 (5730 سنة)' },
                    { id: 'cobalt-60', label: 'كوبالت-60 (5.27 سنة)' },
                    { id: 'radium-226', label: 'راديوم-226 (1600 سنة)' },
                    { id: 'uranium-235', label: 'يورانيوم-235 (704M سنة)' },
                  ].map((iso) => (
                    <button
                      key={iso.id}
                      onClick={() => {
                        setDecayIsotopeId(iso.id as any);
                        const match = ISOTOPE_PRESETS.find((p) => p.id === iso.id);
                        if (match?.halfLifeYears) setElapsedYears(match.halfLifeYears);
                      }}
                      className={`py-1.5 px-1 text-xs rounded-lg ${
                        decayIsotopeId === iso.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {iso.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">الزمن المنقضي (t):</span>
                    <span className="font-mono text-purple-400 font-bold">{elapsedYears.toLocaleString()} سنة</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={(decayIsotope.halfLifeYears || 1000) * 4}
                    step={(decayIsotope.halfLifeYears || 1000) / 20}
                    value={elapsedYears}
                    onChange={(e) => setElapsedYears(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
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
              <strong>كثافة النوى:</strong> ثابتة تقريباً لجميع الأنوية وتساوي حوالي 2.3×10¹⁷ kg/m³.
            </p>
            <p className="text-slate-400">
              <strong>قمة الاستقرار:</strong> تقع عند الأنوية المتوسطة (كعنصر الحديد Fe-56) حيث تكون طاقة الارتباط لكل نيوكليون في ذروتها (8.8 MeV).
            </p>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
