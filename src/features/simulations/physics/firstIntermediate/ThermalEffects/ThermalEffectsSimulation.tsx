import React, { useState } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { LabSurface } from '../../../visuals/LabSurface';
import { SimulationStatus } from '../../../visuals/SimulationStatus';
import { THERMAL_MATERIALS, calculateLinearExpansion } from './calculations';
import { Flame, Thermometer, Sparkles, Info, Maximize2, RotateCcw } from 'lucide-react';

export const ThermalEffectsSimulation: React.FC = () => {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('copper');
  const [tempC, setTempC] = useState<number>(180);
  const [initialLengthM, setInitialLengthM] = useState<number>(2); // meters

  const material =
    THERMAL_MATERIALS.find((m) => m.id === selectedMaterialId) || THERMAL_MATERIALS[1];

  const expansion = calculateLinearExpansion(initialLengthM, tempC, 20, material.linearCoeff);

  const handleReset = () => {
    setSelectedMaterialId('copper');
    setTempC(180);
    setInitialLengthM(2);
  };

  const metrics: HUDMetric[] = [
    {
      label: 'الزيادة في الطول (ΔL)',
      value: (expansion.deltaL_mm >= 0 ? '+' : '') + expansion.deltaL_mm.toFixed(2),
      unit: 'mm',
      color: expansion.deltaL_mm > 0 ? 'text-amber-500 dark:text-amber-400' : 'text-blue-500',
      formula: 'ΔL = α·L₀·ΔT',
    },
    {
      label: 'الطول النهائي (L)',
      value: expansion.finalLength_m.toFixed(4),
      unit: 'm',
      color: 'text-cyan-500 dark:text-cyan-400',
      formula: 'L = L₀ + ΔL',
    },
    {
      label: 'معامل التمدد الطولي (α)',
      value: (material.linearCoeff * 1e6).toFixed(0) + ' × 10⁻⁶',
      unit: '1/°C',
      color: 'text-violet-500 dark:text-violet-400',
    },
    {
      label: 'فرق درجات الحرارة (ΔT)',
      value: (tempC - 20 >= 0 ? '+' : '') + (tempC - 20),
      unit: '°C',
      color: 'text-rose-500 dark:text-rose-400',
    },
  ];

  // Visual rod width with expansion exaggerated visually for pedagogical clarity
  const visualBaseWidth = 240;
  const visualExtraPx = Math.max(-20, Math.min(60, expansion.deltaL_mm * 12));

  return (
    <SimulationShell
      title="مختبر أثر الحرارة في تمدد المواد الصلبة"
      subjectTitle="الفيزياء • الأول المتوسط"
      topic="الفصل الخامس: أثر الحرارة في المواد"
      grade="الصف الأول المتوسط"
      description="مختبر تفاعلي لاستكشاف التمدد الطولي للمعادن عند ارتفاع درجة الحرارة، والانكماش عند التبريد، والمقارنة بين معاملات التمدد لمختلف المواد."
      learningObjectives={[
        'استيعاب قانون التمدد الطولي للأجسام الصلبة: ΔL = α · L₀ · ΔT',
        'ملاحظة اختلاف استجابة المعادن المختلفة (النحاس، الألمنيوم، الحديد) للحرارة',
        'تفسير الفواصل الهندسية في سكك الحديد والجسور لمنع التشوه والتقوس',
      ]}
      educationalNote={
        <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <p className="font-bold text-slate-900 dark:text-white">
            قانون التمدد الطولي الوزاري:
          </p>
          <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900 font-mono text-center text-indigo-600 dark:text-indigo-400 font-bold">
            ΔL = α × L₀ × (T - T₀)
          </div>
          <p className="text-[11px] leading-relaxed">
            حيث <strong>α</strong> هو معامل التمدد الطولي للمادة، <strong>L₀</strong> الطول الأصلي، و <strong>ΔT</strong> التغير في درجة الحرارة مقاساً بالنسبة لحرارة الغرفة (20°C).
          </p>
        </div>
      }
      visualization={
        <div className="space-y-3">
          {/* Material Selector Buttons */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-2 rounded-xl">
            <span className="text-xs text-slate-500 font-medium px-1">نوع المعدن:</span>
            {THERMAL_MATERIALS.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMaterialId(m.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedMaterialId === m.id
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {m.nameAr}
              </button>
            ))}
          </div>

          {/* Metal Rod Expansion Apparatus Canvas */}
          <LabSurface type="dark">
            <div className="relative w-full h-72 bg-slate-950 border border-slate-850 rounded-2xl p-4 overflow-hidden flex flex-col justify-between select-none shadow-inner">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                  قضيب معدني مثبت من الطرف الأيسر
                </span>
                <span className="font-mono text-amber-400 font-bold bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                  T = {tempC}°C {tempC > 20 ? '(تسخين)' : '(تبريد)'}
                </span>
              </div>

              {/* Visual Metal Rod and Burner */}
              <div className="relative flex-1 flex flex-col items-center justify-center">
                {/* Dial Gauge Magnifier */}
                <div className="absolute top-2 right-6 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl text-center shadow-lg">
                  <div className="text-[10px] text-slate-400">مقياب التمدد الدقيق</div>
                  <div className="text-sm font-mono font-bold text-amber-400">
                    {expansion.deltaL_mm >= 0 ? `+${expansion.deltaL_mm.toFixed(2)}` : expansion.deltaL_mm.toFixed(2)} mm
                  </div>
                </div>

                {/* Expansion Visual Rod */}
                <div className="relative flex items-center">
                  {/* Left Fixed Clamp */}
                  <div className="w-8 h-20 bg-slate-700 border-2 border-slate-500 rounded-l-lg shadow-md flex items-center justify-center text-[10px] text-slate-300 font-bold [writing-mode:vertical-lr]">
                    تثبيت
                  </div>

                  {/* Expanding Metal Rod */}
                  <div
                    className="h-12 rounded-r transition-all duration-300 shadow-xl border-y border-r border-white/20 flex items-center justify-end px-2"
                    style={{
                      width: `${visualBaseWidth + visualExtraPx}px`,
                      backgroundColor: material.color,
                    }}
                  >
                    <span className="text-[11px] font-bold text-slate-950 font-mono">
                      {material.nameAr}
                    </span>
                  </div>

                  {/* Micrometer Stop Pin / Gauge Needle */}
                  <div className="w-2 h-16 bg-amber-500 rounded ml-1 animate-pulse" />
                </div>

                {/* Flame heating visualization under the rod */}
                {tempC > 40 && (
                  <div className="flex items-center gap-6 mt-4 animate-bounce">
                    <Flame className="w-7 h-7 text-amber-500 fill-amber-500" />
                    <Flame className="w-8 h-8 text-rose-500 fill-rose-500" />
                    <Flame className="w-7 h-7 text-amber-500 fill-amber-500" />
                  </div>
                )}
              </div>

              {/* Millimeter Measurement Ruler */}
              <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 flex justify-between text-[10px] font-mono text-slate-400">
                <span>0 mm</span>
                <span>1.0 mm</span>
                <span>2.0 mm</span>
                <span>3.0 mm</span>
                <span>4.0 mm</span>
                <span>5.0 mm</span>
              </div>
            </div>
          </LabSurface>

          {/* Formula Substitution */}
          <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-1.5 text-xs text-slate-300">
            <span className="font-bold text-slate-400 block">العلاقة الرياضية المطبقة حالياً:</span>
            <div className="font-mono text-cyan-400 font-semibold bg-slate-950 p-2.5 rounded-xl text-center">
              ΔL = α × L₀ × ΔT = ({(material.linearCoeff * 1e6).toFixed(1)} × 10⁻⁶) × {initialLengthM} m × ({tempC - 20}°C) = {expansion.deltaL_mm.toFixed(4)} mm
            </div>
          </div>

          {/* Cause and effect feedback area */}
          <SimulationStatus
            status="nominal"
            message={`ما الذي تغيّر؟ عند تسخين قضيب ${material.nameAr} ذي الطول الأصلي (${initialLengthM} m) من درجة الحرارة المرجعية (20°C) إلى (${tempC}°C)، يتمدد المعدن طولياً بمقدار (ΔL = ${expansion.deltaL_mm.toFixed(2)} mm). التغير البصري مكبر لغرض التوضيح.`}
          />
        </div>
      }
      controls={
        <SimulationControls onReset={handleReset}>
          {/* Temperature Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="rod-temp">درجة حرارة القضيب (T):</label>
              <span className="font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded text-sm font-black">
                {tempC} °C
              </span>
            </div>
            <input
              id="rod-temp"
              type="range"
              aria-label="درجة حرارة القضيب T"
              min="-20"
              max="300"
              step="10"
              value={tempC}
              onChange={(e) => setTempC(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>-20°C (انكماش)</span>
              <span>20°C (الأصل)</span>
              <span>300°C (أقصى تسخين)</span>
            </div>
          </div>

          {/* Initial Length Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="rod-length">الطول الأصلي للقضيب (L₀):</label>
              <span className="font-mono text-cyan-600 dark:text-cyan-400 text-xs font-bold">
                {initialLengthM} متر
              </span>
            </div>
            <input
              id="rod-length"
              type="range"
              aria-label="الطول الأصلي للقضيب L0"
              min="0.5"
              max="5"
              step="0.5"
              value={initialLengthM}
              onChange={(e) => setInitialLengthM(parseFloat(e.target.value))}
              className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>
        </SimulationControls>
      }
      outputs={<SimulationHUD metrics={metrics} />}
      extraPanels={
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl text-xs space-y-2">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-500" />
            <span>خصائص المعدن المختار:</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {material.descriptionAr}
          </p>
        </div>
      }
      onReset={handleReset}
    />
  );
};
