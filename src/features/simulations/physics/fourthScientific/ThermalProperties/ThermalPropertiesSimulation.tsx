import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  SUBSTANCE_PRESETS,
  WATER_SPECIFIC_HEAT,
  calculateCalorimetry,
  calculatePhaseChange,
  calculateGasLaw,
} from './calculations';
import { ThermalMode } from './types';
import { Flame, Thermometer, Gauge, Sparkles, Layers, RotateCcw } from 'lucide-react';

export const ThermalPropertiesSimulation: React.FC = () => {
  const [mode, setMode] = useState<ThermalMode>('calorimetry');

  // Mode 1: Calorimetry
  const [substanceId, setSubstanceId] = useState<string>('copper');
  const [substanceMassKg, setSubstanceMassKg] = useState<number>(0.2);
  const [substanceTempC, setSubstanceTempC] = useState<number>(95);
  const [waterMassKg, setWaterMassKg] = useState<number>(0.3);
  const [waterTempC, setWaterTempC] = useState<number>(20);

  // Mode 2: Phase change
  const [iceMassKg, setIceMassKg] = useState<number>(0.5);
  const [initialIceTempC, setInitialIceTempC] = useState<number>(-20);
  const [heatSuppliedKJ, setHeatSuppliedKJ] = useState<number>(180);

  // Mode 3: Ideal gas
  const [gasMoles, setGasMoles] = useState<number>(1.0);
  const [gasTempC, setGasTempC] = useState<number>(27);
  const [gasVolumeL, setGasVolumeL] = useState<number>(20);

  const activeSubstance =
    SUBSTANCE_PRESETS.find((s) => s.id === substanceId) || SUBSTANCE_PRESETS[0];

  const calResult = calculateCalorimetry(
    waterMassKg,
    waterTempC,
    substanceMassKg,
    substanceTempC,
    activeSubstance.specificHeatJ_kgK
  );

  const phaseResult = calculatePhaseChange(
    iceMassKg,
    initialIceTempC,
    heatSuppliedKJ * 1000
  );

  const gasResult = calculateGasLaw(gasMoles, gasTempC, gasVolumeL);

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

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
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

    if (mode === 'calorimetry') {
      // Draw calorimeter vessel
      const cx = width / 2;
      const cy = height / 2 + 10;
      const calW = 200;
      const calH = 180;

      // Outer insulated beaker
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.roundRect(cx - calW / 2 - 10, cy - calH / 2 - 5, calW + 20, calH + 15, 12);
      ctx.fill();
      ctx.stroke();

      // Insulation label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('جدار المسعر الحراري المعزول (Insulated Vessel)', cx, cy + calH / 2 + 25);

      // Water inside
      const waterHeight = Math.min(130, 40 + waterMassKg * 200);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.fillRect(cx - calW / 2, cy + calH / 2 - waterHeight, calW, waterHeight);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - calW / 2, cy + calH / 2 - waterHeight, calW, waterHeight);

      // Immersed substance block
      const blockW = Math.min(70, 30 + substanceMassKg * 80);
      const blockH = Math.min(60, 25 + substanceMassKg * 70);
      const blockX = cx - blockW / 2;
      const blockY = cy + calH / 2 - waterHeight / 2 - blockH / 2;

      // Color depends on substance temp
      const isHot = substanceTempC > calResult.finalEquilibriumTempC;
      ctx.fillStyle = isHot ? '#f97316' : '#a855f7';
      ctx.fillRect(blockX, blockY, blockW, blockH);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(blockX, blockY, blockW, blockH);

      // Block label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(activeSubstance.nameEn, cx, blockY + blockH / 2 + 4);

      // Thermometer
      const thX = cx + calW / 2 - 35;
      const thY = cy - calH / 2 - 30;
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(thX, thY, 8, 140);
      ctx.beginPath();
      ctx.arc(thX + 4, thY + 145, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();

      // Mercury column
      const mercuryH = (calResult.finalEquilibriumTempC / 100) * 110;
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(thX + 2, thY + 140 - mercuryH, 4, mercuryH);

      // Final Temp readout on canvas
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`T_eq = ${calResult.finalEquilibriumTempC.toFixed(1)} °C`, thX + 20, thY + 70);
      ctx.font = '11px sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(`ΔT_water = +${calResult.tempChangeWaterC.toFixed(1)} °C`, thX + 20, thY + 90);
      ctx.fillText(`ΔT_metal = ${calResult.tempChangeSubstanceC.toFixed(1)} °C`, thX + 20, thY + 106);
    } else if (mode === 'phase-change') {
      // Phase change heating curve graph
      const padding = 55;
      const graphW = width - padding * 2;
      const graphH = height - padding * 2;
      const originX = padding;
      const originY = height - padding;

      // Axes
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(originX, padding);
      ctx.lineTo(originX, originY);
      ctx.lineTo(originX + graphW, originY);
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('درجة الحرارة T (°C)', originX + 20, padding - 10);
      ctx.textAlign = 'center';
      ctx.fillText('كمية الطاقة المكتسبة Q (kJ)', originX + graphW / 2, originY + 38);

      // T ticks (-20, 0, 100, 140)
      const tMin = -30;
      const tMax = 130;
      const mapT = (t: number) => originY - ((t - tMin) / (tMax - tMin)) * graphH;
      const totalMaxQ =
        (phaseResult.energyToReach0C +
          phaseResult.energyToMelt +
          phaseResult.energyToReach100C +
          phaseResult.energyToVaporize) *
        1.15;
      const mapQ = (q: number) => originX + (q / totalMaxQ) * graphW;

      // Draw horizontal dashed lines at 0°C and 100°C
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.beginPath();
      ctx.moveTo(originX, mapT(0));
      ctx.lineTo(originX + graphW, mapT(0));
      ctx.stroke();

      ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.beginPath();
      ctx.moveTo(originX, mapT(100));
      ctx.lineTo(originX + graphW, mapT(100));
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '11px sans-serif';
      ctx.fillText('0 °C (انصهار)', originX - 30, mapT(0) + 4);
      ctx.fillStyle = '#ef4444';
      ctx.fillText('100 °C (غليان)', originX - 30, mapT(100) + 4);

      // Theoretical curve points
      const q0 = 0;
      const q1 = phaseResult.energyToReach0C;
      const q2 = q1 + phaseResult.energyToMelt;
      const q3 = q2 + phaseResult.energyToReach100C;
      const q4 = q3 + phaseResult.energyToVaporize;

      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(mapQ(q0), mapT(initialIceTempC));
      ctx.lineTo(mapQ(q1), mapT(0));
      ctx.lineTo(mapQ(q2), mapT(0));
      ctx.lineTo(mapQ(q3), mapT(100));
      ctx.lineTo(mapQ(q4), mapT(100));
      ctx.stroke();

      // Current point
      const curQ = Math.min(totalMaxQ, heatSuppliedKJ * 1000);
      const curX = mapQ(curQ);
      const curY = mapT(phaseResult.currentTempC);

      ctx.beginPath();
      ctx.arc(curX, curY, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Callout box
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.roundRect(curX + 10, curY - 35, 140, 30, 6);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`T = ${phaseResult.currentTempC.toFixed(1)} °C`, curX + 18, curY - 16);
    } else if (mode === 'ideal-gas') {
      // Ideal gas cylinder & piston
      const cx = width / 2;
      const cylW = 160;
      const maxCylH = 200;
      const cylBottom = height - 60;
      const cylTop = cylBottom - maxCylH;

      // Piston height proportional to volume (5L to 40L)
      const pistonY = cylBottom - (gasVolumeL / 40) * (maxCylH - 20);

      // Cylinder body
      ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx - cylW / 2, cylTop);
      ctx.lineTo(cx - cylW / 2, cylBottom);
      ctx.lineTo(cx + cylW / 2, cylBottom);
      ctx.lineTo(cx + cylW / 2, cylTop);
      ctx.stroke();

      // Gas volume fill
      ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.fillRect(cx - cylW / 2, pistonY, cylW, cylBottom - pistonY);

      // Piston block
      ctx.fillStyle = '#64748b';
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.fillRect(cx - cylW / 2 + 2, pistonY - 14, cylW - 4, 14);
      ctx.strokeRect(cx - cylW / 2 + 2, pistonY - 14, cylW - 4, 14);

      // Piston rod
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(cx - 8, pistonY - 60, 16, 50);

      // Burner / flame beneath
      if (gasTempC > 50) {
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.moveTo(cx - 30, cylBottom + 25);
        ctx.quadraticCurveTo(cx, cylBottom + 2, cx + 30, cylBottom + 25);
        ctx.quadraticCurveTo(cx, cylBottom + 35, cx - 30, cylBottom + 25);
        ctx.fill();
      }

      // Pressure Gauge
      const gaugeX = cx + cylW / 2 + 65;
      const gaugeY = height / 2 - 20;
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(gaugeX, gaugeY, 40, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Needle (0 to 600 kPa)
      const maxP = 600;
      const angle = -Math.PI * 0.75 + (Math.min(gasResult.pressureKPa, maxP) / maxP) * (Math.PI * 1.5);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(gaugeX, gaugeY);
      ctx.lineTo(gaugeX + Math.cos(angle) * 32, gaugeY + Math.sin(angle) * 32);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${gasResult.pressureKPa.toFixed(0)} kPa`, gaugeX, gaugeY + 24);
    }
  }, [
    mode,
    waterMassKg,
    waterTempC,
    substanceMassKg,
    substanceTempC,
    substanceId,
    activeSubstance,
    calResult,
    iceMassKg,
    initialIceTempC,
    heatSuppliedKJ,
    phaseResult,
    gasMoles,
    gasTempC,
    gasVolumeL,
    gasResult,
  ]);

  const handleReset = () => {
    setMode('calorimetry');
    setSubstanceId('copper');
    setSubstanceMassKg(0.2);
    setSubstanceTempC(95);
    setWaterMassKg(0.3);
    setWaterTempC(20);
    setIceMassKg(0.5);
    setInitialIceTempC(-20);
    setHeatSuppliedKJ(180);
    setGasMoles(1.0);
    setGasTempC(27);
    setGasVolumeL(20);
  };

  const hudMetrics: HUDMetric[] =
    mode === 'calorimetry'
      ? [
          {
            label: 'درجة حرارة الاتزان (T_eq)',
            value: `${calResult.finalEquilibriumTempC.toFixed(1)} °C`,
            color: 'cyan',
          },
          {
            label: 'كمية الحرارة المتبادلة (Q)',
            value: `${(calResult.heatExchangedJ / 1000).toFixed(2)} kJ`,
            color: 'amber',
          },
          {
            label: 'تغير حرارة الماء (ΔT_w)',
            value: `+${calResult.tempChangeWaterC.toFixed(1)} °C`,
            color: 'emerald',
          },
          {
            label: 'الحرارة النوعية للمعدن (c)',
            value: `${activeSubstance.specificHeatJ_kgK} J/(kg·K)`,
            color: 'slate',
          },
        ]
      : mode === 'phase-change'
      ? [
          {
            label: 'درجة الحرارة الحالية (T)',
            value: `${phaseResult.currentTempC.toFixed(1)} °C`,
            color: 'cyan',
          },
          {
            label: 'الحالة الفيزيائية',
            value: phaseResult.currentPhaseAr.split('(')[0],
            color: 'amber',
          },
          {
            label: 'حرارة الانصهار الكامنة (L_f)',
            value: '333 kJ/kg',
            color: 'emerald',
          },
          {
            label: 'حرارة التبخر الكامنة (L_v)',
            value: '2260 kJ/kg',
            color: 'purple',
          },
        ]
      : [
          {
            label: 'الضغط المحسوب (P)',
            value: `${gasResult.pressureKPa.toFixed(1)} kPa`,
            color: 'cyan',
          },
          {
            label: 'الحجم (V)',
            value: `${gasResult.volumeLiters.toFixed(1)} L`,
            color: 'amber',
          },
          {
            label: 'الحرارة المطلقة (T)',
            value: `${gasResult.temperatureK.toFixed(1)} K`,
            color: 'emerald',
          },
          {
            label: 'عدد المولات (n)',
            value: `${gasResult.moles.toFixed(2)} mol`,
            color: 'slate',
          },
        ];

  return (
    <SimulationShell
      title="مختبر الخصائص الحرارية للمادة والاتزان الحراري"
      subtitle="الفصل الرابع — السعة الحرارية، الحرارة النوعية، التحولات الطورية والحرارة الكامنة، وقوانين الغازات"
      badge="الصف الرابع العلمي"
      topic="الخصائص الحرارية للمادة"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Visual Canvas & Math Details */}
        <div className="lg:col-span-2 space-y-4">
          <SimulationHUD metrics={hudMetrics} />

          <div className="relative bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl">
            {/* Mode selection buttons */}
            <div className="flex flex-wrap items-center gap-2 mb-4 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80">
              <button
                onClick={() => setMode('calorimetry')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'calorimetry'
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Thermometer className="w-3.5 h-3.5" />
                المسعر الحراري (Calorimetry)
              </button>
              <button
                onClick={() => setMode('phase-change')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'phase-change'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                الحرارة الكامنة وتحول الطور (Phase Change)
              </button>
              <button
                onClick={() => setMode('ideal-gas')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'ideal-gas'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Gauge className="w-3.5 h-3.5" />
                قوانين الغاز المثالي (P·V = n·R·T)
              </button>
            </div>

            <canvas
              ref={canvasRef}
              width={640}
              height={320}
              className="w-full h-auto rounded-xl bg-slate-950 border border-slate-800/80 block"
            />
          </div>

          {/* Formulas and scientific insight */}
          <div className="bg-slate-900/70 rounded-xl border border-slate-800 p-4 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>المعادلات الحاكمة للظاهرة:</span>
            </div>
            {mode === 'calorimetry' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-amber-300">
                  Q = m · c · ΔT
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-sky-300">
                  Q_lost = Q_gained → m_s·c_s·(T_s - T_f) = m_w·c_w·(T_f - T_w)
                </div>
              </div>
            )}
            {mode === 'phase-change' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-amber-300">
                  Q_fusion = m · L_f (L_f = 3.33 × 10⁵ J/kg)
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-sky-300">
                  Q_vap = m · L_v (L_v = 2.26 × 10⁶ J/kg)
                </div>
              </div>
            )}
            {mode === 'ideal-gas' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-emerald-300">
                  P · V = n · R · T &nbsp;(R = 8.314 J/mol·K)
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-sky-300">
                  T (Kelvin) = T (°C) + 273.15
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls onReset={handleReset}>
            {mode === 'calorimetry' && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">نوع المعدن الساخن:</label>
                  <select
                    value={substanceId}
                    onChange={(e) => setSubstanceId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    {SUBSTANCE_PRESETS.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.nameAr} — c={sub.specificHeatJ_kgK} J/(kg·K)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>كتلة المعدن (m_metal):</span>
                    <span className="text-white font-mono">{substanceMassKg.toFixed(2)} kg</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="1.0"
                    step="0.05"
                    value={substanceMassKg}
                    onChange={(e) => setSubstanceMassKg(parseFloat(e.target.value))}
                    className="w-full accent-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>حرارة المعدن الابتدائية (T_metal):</span>
                    <span className="text-amber-400 font-mono">{substanceTempC} °C</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    step="1"
                    value={substanceTempC}
                    onChange={(e) => setSubstanceTempC(parseInt(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>كتلة الماء بالمسعر (m_water):</span>
                    <span className="text-white font-mono">{waterMassKg.toFixed(2)} kg</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={waterMassKg}
                    onChange={(e) => setWaterMassKg(parseFloat(e.target.value))}
                    className="w-full accent-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>حرارة الماء الابتدائية (T_water):</span>
                    <span className="text-sky-400 font-mono">{waterTempC} °C</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="1"
                    value={waterTempC}
                    onChange={(e) => setWaterTempC(parseInt(e.target.value))}
                    className="w-full accent-sky-500"
                  />
                </div>
              </>
            )}

            {mode === 'phase-change' && (
              <>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>كتلة الجليد (m_ice):</span>
                    <span className="text-white font-mono">{iceMassKg.toFixed(2)} kg</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="2.0"
                    step="0.1"
                    value={iceMassKg}
                    onChange={(e) => setIceMassKg(parseFloat(e.target.value))}
                    className="w-full accent-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>حرارة الجليد الابتدائية:</span>
                    <span className="text-cyan-400 font-mono">{initialIceTempC} °C</span>
                  </div>
                  <input
                    type="range"
                    min="-40"
                    max="0"
                    step="2"
                    value={initialIceTempC}
                    onChange={(e) => setInitialIceTempC(parseInt(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>الطاقة الحرارية المجهزة (Q):</span>
                    <span className="text-amber-400 font-mono">{heatSuppliedKJ} kJ</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1800"
                    step="20"
                    value={heatSuppliedKJ}
                    onChange={(e) => setHeatSuppliedKJ(parseInt(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
              </>
            )}

            {mode === 'ideal-gas' && (
              <>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>عدد المولات (n):</span>
                    <span className="text-white font-mono">{gasMoles.toFixed(2)} mol</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.1"
                    value={gasMoles}
                    onChange={(e) => setGasMoles(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>درجة الحرارة (T):</span>
                    <span className="text-amber-400 font-mono">{gasTempC} °C ({gasResult.temperatureK.toFixed(1)} K)</span>
                  </div>
                  <input
                    type="range"
                    min="-50"
                    max="200"
                    step="5"
                    value={gasTempC}
                    onChange={(e) => setGasTempC(parseInt(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>حجم الأسطوانة (V):</span>
                    <span className="text-sky-400 font-mono">{gasVolumeL.toFixed(1)} L</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="1"
                    value={gasVolumeL}
                    onChange={(e) => setGasVolumeL(parseFloat(e.target.value))}
                    className="w-full accent-sky-500"
                  />
                </div>
              </>
            )}
          </SimulationControls>
        </div>
      </div>
    </SimulationShell>
  );
};

export default ThermalPropertiesSimulation;
