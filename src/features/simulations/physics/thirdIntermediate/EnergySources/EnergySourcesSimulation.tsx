import React, { useState } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateSourceOutput, ENERGY_SOURCES_INFO } from './calculations';
import { EnergySourceType } from './types';
import { Sun, Wind, Droplets, Flame, Trees, ArrowLeft, Leaf, ShieldCheck, RotateCcw, Sparkles } from 'lucide-react';

export const EnergySourcesSimulation: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<EnergySourceType>('solar');

  // Input Parameters
  const [param1, setParam1] = useState<number>(850); // solar: 850 W/m² | wind: 10 m/s | hydro: 50 m³/s | fossil: 5 kg/s | biomass: 100 tons
  const [param2, setParam2] = useState<number>(200); // solar: 200 m² | wind: 25 m radius | hydro: 40 m head | fossil: 45% eff | biomass: 35%

  const activeSourceInfo =
    ENERGY_SOURCES_INFO.find((s) => s.id === selectedSource) || ENERGY_SOURCES_INFO[0];

  const result = calculateSourceOutput(selectedSource, param1, param2);

  const handleSelectSource = (type: EnergySourceType) => {
    setSelectedSource(type);
    if (type === 'solar') {
      setParam1(850);
      setParam2(200);
    } else if (type === 'wind') {
      setParam1(11);
      setParam2(25);
    } else if (type === 'hydro') {
      setParam1(60);
      setParam2(40);
    } else if (type === 'fossil') {
      setParam1(5);
      setParam2(42);
    } else {
      setParam1(120);
      setParam2(35);
    }
  };

  const handleReset = () => {
    handleSelectSource('solar');
  };

  const getSourceIcon = (type: EnergySourceType) => {
    switch (type) {
      case 'solar':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'wind':
        return <Wind className="w-5 h-5 text-cyan-400" />;
      case 'hydro':
        return <Droplets className="w-5 h-5 text-blue-500" />;
      case 'fossil':
        return <Flame className="w-5 h-5 text-red-500" />;
      case 'biomass':
        return <Trees className="w-5 h-5 text-emerald-500" />;
    }
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'القدرة المولدة التقديرية',
      value:
        result.outputPowerMW >= 1
          ? `${result.outputPowerMW.toFixed(2)} MW`
          : `${result.outputPowerKW.toFixed(1)} kW`,
      color: 'amber',
    },
    {
      label: 'الطاقة اليومية المنتجة',
      value: `${result.dailyEnergyMWh.toFixed(1)} MWh`,
      color: 'cyan',
    },
    {
      label: 'تصنيف المصدر',
      value: activeSourceInfo.categoryAr,
      color: activeSourceInfo.isRenewable ? 'emerald' : 'red',
    },
    {
      label: 'كفاءة تحويل الطاقة (η)',
      value: `${result.efficiencyPercent} %`,
      color: 'slate',
    },
  ];

  return (
    <SimulationShell
      title="مختبر تكنولوجيا مصادر الطاقة المتجددة والأحفورية"
      subtitle="الفصل الثامن — دراسة سلاسل تحول الطاقة، مقارنة الطاقة الشمسية والرياح والمائية، وتأثيراتها البيئية"
      badge="الصف الثالث المتوسط"
      topic="تكنولوجيا مصادر الطاقة"
    >
      <div className="space-y-6">
        {/* Source Picker Tabs */}
        <div className="flex overflow-x-auto pb-1 gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 no-scrollbar">
          {ENERGY_SOURCES_INFO.map((source) => (
            <button
              key={source.id}
              type="button"
              onClick={() => handleSelectSource(source.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedSource === source.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {getSourceIcon(source.id)}
              <span>{source.titleAr.split('(')[0]}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${
                  source.isRenewable
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    : 'bg-red-500/20 text-red-600 dark:text-red-400'
                }`}
              >
                {source.isRenewable ? 'متجددة' : 'أحفورية'}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visual Energy Flow Area */}
          <div className="lg:col-span-2 space-y-4">
            {/* Energy Chain Diagram */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-inner text-white space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                    {getSourceIcon(selectedSource)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">
                      سلسلة تحولات الطاقة (Energy Conversion Chain)
                    </h3>
                    <p className="text-xs text-slate-400">
                      مراحل انتقال الطاقة من المصدر الأولي إلى الشبكة الكهربائية
                    </p>
                  </div>
                </div>

                <span
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
                    activeSourceInfo.isRenewable
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}
                >
                  {activeSourceInfo.categoryAr}
                </span>
              </div>

              {/* Conversion Steps Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 relative">
                {activeSourceInfo.conversionChainAr.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono">
                        المرحلة {idx + 1}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>

              {/* Dependability & Environment Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="font-bold text-slate-300 block">موثوقية التوليد:</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {activeSourceInfo.dependabilityAr}
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="font-bold text-slate-300 block">الأثر البيئي والاستدامة:</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {activeSourceInfo.environmentalImpactAr}
                  </p>
                </div>
              </div>
            </div>

            <SimulationHUD metrics={hudMetrics} />

            {/* Curriculum Formula Callout */}
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-900 dark:text-cyan-200 space-y-1.5">
              <p className="font-bold flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>المعادلة التقديرية المنهجية:</span>
              </p>
              <p className="font-mono text-slate-700 dark:text-slate-300">{activeSourceInfo.formulaNoteAr}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {result.statusDescriptionAr}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <SimulationControls
              title="معاملات المحطة والمصدر"
              onReset={handleReset}
            >
              <div className="space-y-4">
                {selectedSource === 'solar' && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>معدل شدة الإشعاع الشمسي (G)</span>
                        <span className="font-mono text-amber-500">{param1} W/m²</span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={1200}
                        step={50}
                        value={param1}
                        onChange={(e) => setParam1(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                        <span>100 (غائم)</span>
                        <span>800 (شمس ساطعة)</span>
                        <span>1200 (ذروة)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>المساحة الإجمالية للألواح (A)</span>
                        <span className="font-mono text-cyan-600 dark:text-cyan-400">{param2} م²</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={1000}
                        step={10}
                        value={param2}
                        onChange={(e) => setParam2(Number(e.target.value))}
                        className="w-full accent-cyan-600 cursor-pointer"
                      />
                    </div>
                  </>
                )}

                {selectedSource === 'wind' && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>سرعة الرياح (v)</span>
                        <span className="font-mono text-cyan-500">{param1} م/ث</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={25}
                        step={1}
                        value={param1}
                        onChange={(e) => setParam1(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                        <span>0 (سكون)</span>
                        <span>12 (رياح نشطة)</span>
                        <span>25 (عاصفة)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>نصف قطر شفرات التوربين (R)</span>
                        <span className="font-mono text-amber-500">{param2} متر</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={60}
                        step={5}
                        value={param2}
                        onChange={(e) => setParam2(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                  </>
                )}

                {selectedSource === 'hydro' && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>معدل تدفق المياه (Q)</span>
                        <span className="font-mono text-blue-500">{param1} م³/ثانية</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={200}
                        step={5}
                        value={param1}
                        onChange={(e) => setParam1(Number(e.target.value))}
                        className="w-full accent-blue-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>ارتفاع سقوط المياه / السد (h)</span>
                        <span className="font-mono text-cyan-600 dark:text-cyan-400">{param2} متر</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={120}
                        step={5}
                        value={param2}
                        onChange={(e) => setParam2(Number(e.target.value))}
                        className="w-full accent-cyan-600 cursor-pointer"
                      />
                    </div>
                  </>
                )}

                {selectedSource === 'fossil' && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>معدل استهلاك وحرق الوقود</span>
                        <span className="font-mono text-red-500">{param1} كغم/ثانية</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={20}
                        step={1}
                        value={param1}
                        onChange={(e) => setParam1(Number(e.target.value))}
                        className="w-full accent-red-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>كفاءة المحطة الحرارية (η)</span>
                        <span className="font-mono text-amber-500">{param2} %</span>
                      </div>
                      <input
                        type="range"
                        min={25}
                        max={55}
                        step={1}
                        value={param2}
                        onChange={(e) => setParam2(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                  </>
                )}

                {selectedSource === 'biomass' && (
                  <>
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>كمية الكتلة الحيوية اليومية</span>
                        <span className="font-mono text-emerald-500">{param1} طن/يوم</span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={500}
                        step={20}
                        value={param1}
                        onChange={(e) => setParam1(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                  </>
                )}

                {/* Energy Comparison Note */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <p className="font-bold text-slate-900 dark:text-white">مميزات الطاقة المتجددة في العراق:</p>
                  <p className="text-[11px] leading-relaxed">
                    يتمتع العراق بمعدل سطوع شمسي مرتفع جداً يتجاوز 3000 ساعة سنوياً ومناطق رياح واعدة في الجنوب والغرب، مما يجعل الاستثمار في الطاقة المتجددة خياراً استراتيجياً مستداماً.
                  </p>
                </div>
              </div>
            </SimulationControls>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
