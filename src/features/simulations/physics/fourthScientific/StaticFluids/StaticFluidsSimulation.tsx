import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  FLUID_PRESETS,
  calculateFluidPressure,
  calculatePascalOutputForce,
  calculateFloatingState,
} from './calculations';
import { StaticFluidsMode } from './types';
import { Droplets, ArrowDown, Scale, Sparkles, Layers, RotateCcw } from 'lucide-react';

export const StaticFluidsSimulation: React.FC = () => {
  const [mode, setMode] = useState<StaticFluidsMode>('hydrostatic-pressure');

  // Mode A state (Hydrostatic Pressure)
  const [selectedFluidId, setSelectedFluidId] = useState<string>('water');
  const [depthM, setDepthM] = useState<number>(3.5); // meters

  // Mode B state (Pascal Press)
  const [inputForceN, setInputForceN] = useState<number>(100);
  const [area1Cm2, setArea1Cm2] = useState<number>(5);
  const [area2Cm2, setArea2Cm2] = useState<number>(50);

  // Mode C state (Archimedes)
  const [objectDensityKg_m3, setObjectDensityKg_m3] = useState<number>(650); // e.g. wood
  const [objectVolumeCm3, setObjectVolumeCm3] = useState<number>(500);

  const activeFluid =
    FLUID_PRESETS.find((f) => f.id === selectedFluidId) || FLUID_PRESETS[0];

  const pressureResult = calculateFluidPressure(activeFluid.densityKg_m3, depthM);
  const pascalResult = calculatePascalOutputForce(inputForceN, area1Cm2, area2Cm2);
  const archimedesResult = calculateFloatingState(
    objectDensityKg_m3,
    activeFluid.densityKg_m3,
    objectVolumeCm3
  );

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

    // Subtle grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 25) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 25) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    if (mode === 'hydrostatic-pressure') {
      // Tank visual
      const tankLeft = 70;
      const tankW = width - 140;
      const tankTop = 50;
      const tankH = height - 80;

      // Tank Walls
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(tankLeft, tankTop);
      ctx.lineTo(tankLeft, tankTop + tankH);
      ctx.lineTo(tankLeft + tankW, tankTop + tankH);
      ctx.lineTo(tankLeft + tankW, tankTop);
      ctx.stroke();

      // Fluid Fill
      ctx.fillStyle = activeFluid.color + '44';
      ctx.fillRect(tankLeft + 2, tankTop + 10, tankW - 4, tankH - 10);

      // Liquid Surface Line
      ctx.strokeStyle = activeFluid.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(tankLeft, tankTop + 10);
      ctx.lineTo(tankLeft + tankW, tankTop + 10);
      ctx.stroke();

      // Depth Probe (Vertical rod with sensor)
      const maxDepth = 10;
      const probeY = tankTop + 10 + (depthM / maxDepth) * (tankH - 25);
      const probeX = tankLeft + tankW * 0.45;

      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(probeX, tankTop - 20);
      ctx.lineTo(probeX, probeY);
      ctx.stroke();

      // Sensor Head
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(probeX, probeY, 7, 0, Math.PI * 2);
      ctx.fill();

      // Digital Pressure Readout box
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(probeX + 20, probeY - 18, 140, 36);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(probeX + 20, probeY - 18, 140, 36);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`P = ${pressureResult.gaugePressureKPa.toFixed(2)} kPa`, probeX + 28, probeY + 4);

      // Depth scale ticks
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.textAlign = 'right';
      for (let d = 0; d <= 10; d += 2) {
        const y = tankTop + 10 + (d / 10) * (tankH - 25);
        ctx.fillText(`${d}m`, tankLeft - 10, y + 4);
        ctx.beginPath();
        ctx.moveTo(tankLeft - 5, y);
        ctx.lineTo(tankLeft, y);
        ctx.stroke();
      }
    } else if (mode === 'pascal-press') {
      // Hydraulic Press U-tube
      const cx = width / 2;
      const botY = height - 50;

      // Left narrow cylinder
      const leftW = 40;
      const leftH = 120;
      const leftX = cx - 110;

      // Right wide cylinder
      const rightW = 100;
      const rightH = 120;
      const rightX = cx + 80;

      // Fluid connection
      ctx.fillStyle = '#0284c744';
      // Left fluid
      ctx.fillRect(leftX - leftW / 2, botY - leftH + 20, leftW, leftH - 20);
      // Bottom connector
      ctx.fillRect(leftX - leftW / 2, botY - 30, rightX - leftX + rightW / 2 + leftW / 2, 30);
      // Right fluid
      ctx.fillRect(rightX - rightW / 2, botY - rightH + 35, rightW, rightH - 35);

      // Tubes borders
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      // Outer border
      ctx.moveTo(leftX - leftW / 2, botY - leftH);
      ctx.lineTo(leftX - leftW / 2, botY);
      ctx.lineTo(rightX + rightW / 2, botY);
      ctx.lineTo(rightX + rightW / 2, botY - rightH);
      // Inner border
      ctx.moveTo(leftX + leftW / 2, botY - leftH);
      ctx.lineTo(leftX + leftW / 2, botY - 30);
      ctx.lineTo(rightX - rightW / 2, botY - 30);
      ctx.lineTo(rightX - rightW / 2, botY - rightH);
      ctx.stroke();

      // Left Piston (F1)
      const p1Y = botY - leftH + 18;
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(leftX - leftW / 2, p1Y, leftW, 14);

      // Force 1 Down Arrow
      drawArrow(ctx, leftX, p1Y - 35, leftX, p1Y, '#f59e0b', `F₁ = ${inputForceN}N`);

      // Right Piston (F2)
      const p2Y = botY - rightH + 33;
      ctx.fillStyle = '#10b981';
      ctx.fillRect(rightX - rightW / 2, p2Y, rightW, 16);

      // Force 2 Up Arrow
      drawArrow(ctx, rightX, p2Y, rightX, p2Y - 45, '#10b981', `F₂ = ${pascalResult.outputForceN.toFixed(0)}N`);

      // Car on right piston (lifting load)
      ctx.fillStyle = '#334155';
      ctx.fillRect(rightX - 35, p2Y - 14, 70, 14);
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('حمل مرفوع (Car)', rightX, p2Y - 4);
    } else {
      // Archimedes Principle Visual
      const beakerLeft = width * 0.28;
      const beakerW = width * 0.44;
      const beakerTop = 45;
      const beakerH = height - 70;

      // Beaker
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(beakerLeft, beakerTop);
      ctx.lineTo(beakerLeft, beakerTop + beakerH);
      ctx.lineTo(beakerLeft + beakerW, beakerTop + beakerH);
      ctx.lineTo(beakerLeft + beakerW, beakerTop);
      ctx.stroke();

      // Fluid
      ctx.fillStyle = activeFluid.color + '44';
      ctx.fillRect(beakerLeft + 2, beakerTop + 30, beakerW - 4, beakerH - 32);

      const surfaceY = beakerTop + 30;
      ctx.strokeStyle = activeFluid.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(beakerLeft, surfaceY);
      ctx.lineTo(beakerLeft + beakerW, surfaceY);
      ctx.stroke();

      // Object Cube
      const cubeSize = 56;
      const cubeX = beakerLeft + beakerW / 2 - cubeSize / 2;
      let cubeY = surfaceY - cubeSize * (1 - archimedesResult.submergedFraction);
      if (archimedesResult.state === 'sinking') {
        cubeY = beakerTop + beakerH - cubeSize - 4;
      }

      ctx.fillStyle = objectDensityKg_m3 < 900 ? '#b45309' : '#475569';
      ctx.fillRect(cubeX, cubeY, cubeSize, cubeSize);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.strokeRect(cubeX, cubeY, cubeSize, cubeSize);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${objectDensityKg_m3}`, cubeX + cubeSize / 2, cubeY + cubeSize / 2 - 2);
      ctx.fillText('kg/m³', cubeX + cubeSize / 2, cubeY + cubeSize / 2 + 10);

      // Force Vectors on object
      // Buoyant Force (Up)
      drawArrow(
        ctx,
        cubeX + cubeSize + 20,
        cubeY + cubeSize / 2,
        cubeX + cubeSize + 20,
        cubeY - 25,
        '#38bdf8',
        `Fb = ${archimedesResult.buoyantForceN.toFixed(2)} N`
      );

      // Weight Force (Down)
      drawArrow(
        ctx,
        cubeX - 20,
        cubeY + cubeSize / 2,
        cubeX - 20,
        cubeY + cubeSize + 25,
        '#ef4444',
        `w = ${archimedesResult.objectWeightN.toFixed(2)} N`
      );
    }
  }, [
    mode,
    selectedFluidId,
    depthM,
    inputForceN,
    area1Cm2,
    area2Cm2,
    objectDensityKg_m3,
    objectVolumeCm3,
    activeFluid,
    pressureResult,
    pascalResult,
    archimedesResult,
  ]);

  function drawArrow(
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    color: string,
    label: string
  ) {
    const headLen = 8;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();

    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(label, (fromX + toX) / 2, Math.min(fromY, toY) - 8);
  }

  const handleReset = () => {
    setSelectedFluidId('water');
    setDepthM(3.5);
    setInputForceN(100);
    setArea1Cm2(5);
    setArea2Cm2(50);
    setObjectDensityKg_m3(650);
    setObjectVolumeCm3(500);
  };

  const hudMetrics: HUDMetric[] =
    mode === 'hydrostatic-pressure'
      ? [
          {
            label: 'الضغط القياسي للسائل (Gauge P)',
            value: `${pressureResult.gaugePressureKPa.toFixed(2)} kPa`,
            color: 'cyan',
          },
          {
            label: 'الضغط الكلي مع الجوي (Total P)',
            value: `${pressureResult.totalPressureKPa.toFixed(2)} kPa`,
            color: 'amber',
          },
          {
            label: 'عمق النقطة (h)',
            value: `${depthM.toFixed(1)} m`,
            color: 'slate',
          },
          {
            label: 'كثافة السائل (ρ)',
            value: `${activeFluid.densityKg_m3} kg/m³`,
            color: 'emerald',
          },
        ]
      : mode === 'pascal-press'
      ? [
          {
            label: 'القوة الناتجة المضاعفة (F₂)',
            value: `${pascalResult.outputForceN.toFixed(0)} N`,
            color: 'emerald',
          },
          {
            label: 'الفائدة الميكانيكية (M.A)',
            value: `${pascalResult.mechanicalAdvantage.toFixed(1)}x`,
            color: 'amber',
          },
          {
            label: 'قوة الدخل المسلطة (F₁)',
            value: `${inputForceN} N`,
            color: 'cyan',
          },
          {
            label: 'نسبة المساحتين (A₂ / A₁)',
            value: `${(area2Cm2 / area1Cm2).toFixed(1)}`,
            color: 'slate',
          },
        ]
      : [
          {
            label: 'قوة الطفو (Fb)',
            value: `${archimedesResult.buoyantForceN.toFixed(2)} N`,
            color: 'cyan',
          },
          {
            label: 'وزن الجسم في الهواء (w)',
            value: `${archimedesResult.objectWeightN.toFixed(2)} N`,
            color: 'amber',
          },
          {
            label: 'حالة الطفو / الغمر',
            value: archimedesResult.stateAr.split('(')[0],
            color: archimedesResult.state === 'floating' ? 'emerald' : 'red',
          },
          {
            label: 'نسبة الجزء المغمور',
            value: `${(archimedesResult.submergedFraction * 100).toFixed(0)} %`,
            color: 'slate',
          },
        ];

  return (
    <SimulationShell
      title="مختبر الموائع الساكنة (ضغط السائل، باسكال، وأرخميدس)"
      subtitle="الفصل الثالث — ضغط السائل P = ρgh، مبدأ باسكال والمكبس الهيدروليكي، وقاعدة أرخميدس وقوة الطفو"
      badge="الصف الرابع العلمي"
      topic="الموائع الساكنة"
    >
      <div className="space-y-6">
        {/* Mode Selector */}
        <div className="flex overflow-x-auto pb-1 gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 no-scrollbar">
          <button
            type="button"
            onClick={() => setMode('hydrostatic-pressure')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'hydrostatic-pressure'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Droplets className="w-4 h-4" />
            <span>١. ضغط السائل الساكن (P = ρ · g · h)</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('pascal-press')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'pascal-press'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <ArrowDown className="w-4 h-4" />
            <span>٢. مبدأ باسكال والمكبس الهيدروليكي</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('archimedes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'archimedes'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>٣. قاعدة أرخميدس وقوة الطفو (Buoyancy)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex flex-col items-center justify-center p-4">
              <canvas
                ref={canvasRef}
                width={600}
                height={290}
                className="w-full max-w-[600px] h-auto aspect-[600/290] block select-none"
              />

              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-400">
                {mode === 'hydrostatic-pressure'
                  ? 'P = ρ · g · h'
                  : mode === 'pascal-press'
                  ? 'F₁ / A₁ = F₂ / A₂'
                  : 'Fb = ρ · g · V'}
              </div>
            </div>

            <SimulationHUD metrics={hudMetrics} />

            {/* Educational Callout */}
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-900 dark:text-cyan-200 space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>الاستنتاج العلمي وفق المنهاج الوزاري:</span>
              </p>
              <p>
                {mode === 'hydrostatic-pressure' && pressureResult.formulaNoteAr}
                {mode === 'pascal-press' && pascalResult.formulaNoteAr}
                {mode === 'archimedes' && archimedesResult.explanationAr}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {mode === 'hydrostatic-pressure' &&
                  'يزداد ضغط السائل طردياً مع العمق h ومع كثافة السائل ρ ولا يعتمد على شكل الإناء أو مساحة سطحه.'}
                {mode === 'pascal-press' &&
                  'مبدأ باسكال: الضغط المسلط على مائع محصور ينتقل بالتساوي إلى جميع أجزاء المائع وجدران الإناء.'}
                {mode === 'archimedes' &&
                  'قاعدة أرخميدس: إذا غمر جسم كلياً أو جزئياً في مائع فإنه يفقد من وزنه بقدر وزن المائع المزاح.'}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <SimulationControls
              title="معاملات تجربة الموائع"
              onReset={handleReset}
            >
              <div className="space-y-4">
                {/* Fluid Selector */}
                {mode !== 'pascal-press' && (
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                      نوع السائل المستخدم:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-xs font-bold">
                      {FLUID_PRESETS.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setSelectedFluidId(f.id)}
                          className={`p-2 rounded-xl text-right transition-all ${
                            selectedFluidId === f.id
                              ? 'bg-cyan-600 text-white shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <p>{f.nameAr.split('(')[0]}</p>
                          <span className="text-[10px] font-mono opacity-80">{f.densityKg_m3} kg/m³</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {mode === 'hydrostatic-pressure' && (
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span>عمق نقطة القياس داخل السائل (h)</span>
                      <span className="font-mono text-cyan-600 dark:text-cyan-400">{depthM.toFixed(1)} m</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      step={0.5}
                      value={depthM}
                      onChange={(e) => setDepthM(Number(e.target.value))}
                      className="w-full accent-cyan-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                      <span>السطح (0m)</span>
                      <span>5m</span>
                      <span>10m (أقصى عمق)</span>
                    </div>
                  </div>
                )}

                {mode === 'pascal-press' && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>القوة المسلطة على المكبس الصغير (F₁)</span>
                        <span className="font-mono text-amber-500">{inputForceN} N</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={500}
                        step={10}
                        value={inputForceN}
                        onChange={(e) => setInputForceN(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>مساحة المكبس الصغير (A₁)</span>
                        <span className="font-mono text-cyan-600 dark:text-cyan-400">{area1Cm2} cm²</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={20}
                        step={1}
                        value={area1Cm2}
                        onChange={(e) => setArea1Cm2(Number(e.target.value))}
                        className="w-full accent-cyan-600 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>مساحة المكبس الكبير (A₂)</span>
                        <span className="font-mono text-emerald-500">{area2Cm2} cm²</span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={200}
                        step={5}
                        value={area2Cm2}
                        onChange={(e) => setArea2Cm2(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                  </>
                )}

                {mode === 'archimedes' && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>كثافة الجسم المغمور (ρ_object)</span>
                        <span className="font-mono text-amber-500">{objectDensityKg_m3} kg/m³</span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={3000}
                        step={50}
                        value={objectDensityKg_m3}
                        onChange={(e) => setObjectDensityKg_m3(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                        <span>خشب (500)</span>
                        <span>ماء (1000)</span>
                        <span>ألمنيوم (2700)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>حجم الجسم (V_object)</span>
                        <span className="font-mono text-cyan-600 dark:text-cyan-400">{objectVolumeCm3} cm³</span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={2000}
                        step={100}
                        value={objectVolumeCm3}
                        onChange={(e) => setObjectVolumeCm3(Number(e.target.value))}
                        className="w-full accent-cyan-600 cursor-pointer"
                      />
                    </div>
                  </>
                )}
              </div>
            </SimulationControls>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
