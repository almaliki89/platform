import React, { useState } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculatePressure, PRESSURE_PRESETS } from './calculations';
import { Layers, Info, ShieldAlert, Sparkles, RotateCcw } from 'lucide-react';

export const PressureLabSimulation: React.FC = () => {
  const [force, setForce] = useState<number>(100); // N
  const [areaCm2, setAreaCm2] = useState<number>(50); // cm^2
  const [selectedPreset, setSelectedPreset] = useState<string>('custom');

  const areaM2 = areaCm2 / 10000;
  const result = calculatePressure(force, areaM2);

  const handleSelectPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    const p = PRESSURE_PRESETS.find((item) => item.id === presetId);
    if (p) {
      setForce(p.defaultForce);
      setAreaCm2(Math.round(p.defaultArea * 10000));
    }
  };

  const handleReset = () => {
    setSelectedPreset('custom');
    setForce(100);
    setAreaCm2(50);
  };

  const metrics: HUDMetric[] = [
    {
      label: 'الضغط المحسوب (P)',
      value: result.pressureKPa > 10 ? result.pressureKPa.toFixed(1) : result.pressurePa.toFixed(0),
      unit: result.pressureKPa > 10 ? 'kPa' : 'Pa',
      color: result.pressureKPa > 50 ? 'text-rose-500' : 'text-amber-500 dark:text-amber-400',
      formula: 'P = F / A',
    },
    {
      label: 'القوة الضاغطة (F)',
      value: force,
      unit: 'N',
      color: 'text-cyan-500 dark:text-cyan-400',
    },
    {
      label: 'مساحة السطح (A)',
      value: areaCm2,
      unit: 'cm²',
      color: 'text-violet-500 dark:text-violet-400',
    },
    {
      label: 'المساحة بالمتر المربع',
      value: areaM2.toFixed(4),
      unit: 'm²',
      color: 'text-blue-500 dark:text-blue-400',
    },
  ];

  // Visual width of the press block proportional to area
  const blockWidthPx = Math.min(260, Math.max(30, Math.sqrt(areaCm2) * 16));
  const penetrationPx = Math.round(result.relativePenetration * 45);

  return (
    <SimulationShell
      title="مختبر الضغط ومساحة السطح (P = F / A)"
      subjectTitle="الفيزياء • الأول المتوسط"
      topic="الفصل الثالث: الضغط"
      grade="الصف الأول المتوسط"
      description="مختبر تفاعلي لدراسة مفهوم الضغط كقوة عمودية مسلطة على وحدة المساحة، واستنتاج التناسب العكسي بين الضغط ومساحة التماس."
      learningObjectives={[
        'تطبيق القانون الفيزيائي للضغط: P = F / A بالوحدات الدولية (Pascal)',
        'استيعاب التناسب الطردي بين الضغط والقوة والتناسب العكسي مع مساحة السطح',
        'تفسير التطبيقات العملية (المسامير، السكاكين، إطارات الشاحنات العريضة)',
      ]}
      educationalNote={
        <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <p className="font-bold text-slate-900 dark:text-white">
            قانون الضغط الوزاري ووحدات القياس:
          </p>
          <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900 font-mono text-center text-indigo-600 dark:text-indigo-400 font-bold">
            P = F / A &nbsp; (1 Pascal = 1 N / 1 m²)
          </div>
          <p className="text-[11px] leading-relaxed">
            كلما <strong>قلت المساحة (A)</strong> زاد الضغط (P) لتركيز القوة. وكلما <strong>زادت المساحة</strong> قل الضغط لتشتت القوة.
          </p>
        </div>
      }
      visualization={
        <div className="space-y-3">
          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-2 rounded-xl">
            <span className="text-xs text-slate-500 font-medium px-1">نماذج تطبيقية:</span>
            {PRESSURE_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedPreset === p.id
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {p.nameAr}
              </button>
            ))}
          </div>

          {/* Interactive Visual Press Canvas */}
          <div className="relative w-full h-72 bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-x-hidden flex flex-col justify-between select-none">
            <div className="flex justify-between items-center z-10 text-xs">
              <span className="text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                سطح مرن قابل للانضغاط (رمل / إسفنج)
              </span>
              <span className="font-mono text-amber-400 font-bold bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                P = {result.pressureKPa > 10 ? `${result.pressureKPa.toFixed(1)} kPa` : `${result.pressurePa.toFixed(0)} Pa`}
              </span>
            </div>

            {/* Press Object Visualization */}
            <div className="relative flex-1 flex flex-col items-center justify-end pb-8">
              {/* Force Arrow pointing down onto object */}
              <div className="flex flex-col items-center mb-1 animate-pulse">
                <span className="text-xs font-mono font-bold text-cyan-400">
                  F = {force} N ↓
                </span>
                <div className="w-1 h-8 bg-cyan-500" />
                <div className="w-0 h-0 border-x-4 border-x-transparent border-t-8 border-t-cyan-500" />
              </div>

              {/* Press Body */}
              <div
                className="bg-gradient-to-b from-indigo-500 to-indigo-700 border-2 border-indigo-300 rounded-t-lg shadow-2xl flex flex-col items-center justify-center text-white transition-all duration-200"
                style={{
                  width: `${blockWidthPx}px`,
                  height: '60px',
                  transform: `translateY(${penetrationPx}px)`,
                }}
              >
                <span className="text-[10px] text-indigo-200 font-mono">
                  A = {areaCm2} cm²
                </span>
              </div>

              {/* Elastic Surface Baseline with indentation notch */}
              <div className="w-full relative h-16 bg-gradient-to-b from-amber-900/60 to-amber-950 border-t-2 border-amber-600/80 mt-0">
                {/* Visual penetration shadow notch */}
                <div
                  className="mx-auto bg-amber-950/90 border-x border-b border-amber-500/50 rounded-b transition-all duration-200"
                  style={{
                    width: `${blockWidthPx + 4}px`,
                    height: `${penetrationPx}px`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      }
      controls={
        <SimulationControls onReset={handleReset}>
          {/* Force Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="p-force">القوة الضاغطة (Force - F):</label>
              <span className="font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded text-sm font-black">
                {force} N
              </span>
            </div>
            <input
              id="p-force"
              type="range"
              min="10"
              max="500"
              step="10"
              value={force}
              onChange={(e) => {
                setSelectedPreset('custom');
                setForce(parseInt(e.target.value));
              }}
              className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Area Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="p-area">مساحة السطح (Area - A):</label>
              <span className="font-mono text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 px-2 py-0.5 rounded text-sm font-black">
                {areaCm2} cm² ({areaM2.toFixed(4)} m²)
              </span>
            </div>
            <input
              id="p-area"
              type="range"
              min="1"
              max="200"
              step="1"
              value={areaCm2}
              onChange={(e) => {
                setSelectedPreset('custom');
                setAreaCm2(parseInt(e.target.value));
              }}
              className="w-full accent-violet-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>
        </SimulationControls>
      }
      outputs={<SimulationHUD metrics={metrics} />}
      extraPanels={
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl text-xs space-y-2">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-500" />
            <span>التحليل الفيزيائي للأثر الناتج:</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {result.effectDescriptionAr}
          </p>
        </div>
      }
      onReset={handleReset}
    />
  );
};
