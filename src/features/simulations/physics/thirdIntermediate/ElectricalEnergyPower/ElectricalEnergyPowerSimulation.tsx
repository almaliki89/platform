import React, { useState } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateApplianceEnergy, APPLIANCE_PRESETS } from './calculations';
import { Zap, Clock, ShieldAlert, Sparkles, Gauge, Flame, RotateCcw } from 'lucide-react';

export const ElectricalEnergyPowerSimulation: React.FC = () => {
  const [selectedApplianceId, setSelectedApplianceId] = useState<string>('heater');
  const [voltageV, setVoltageV] = useState<number>(220); // 220V Iraqi grid standard
  const [powerW, setPowerW] = useState<number>(2000);
  const [timeHours, setTimeHours] = useState<number>(3);

  const result = calculateApplianceEnergy(voltageV, powerW, timeHours);

  const handleSelectAppliance = (appId: string) => {
    setSelectedApplianceId(appId);
    const preset = APPLIANCE_PRESETS.find((p) => p.id === appId);
    if (preset) {
      setPowerW(preset.defaultPowerW);
      setTimeHours(preset.typicalHoursPerDay);
    }
  };

  const handleReset = () => {
    setSelectedApplianceId('heater');
    setVoltageV(220);
    setPowerW(2000);
    setTimeHours(3);
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'القدرة الكهربائية المستهلكة (P)',
      value: `${result.powerKW.toFixed(2)} kW`,
      color: 'amber',
    },
    {
      label: 'التيار المار بالجهاز (I)',
      value: `${result.currentA.toFixed(2)} A`,
      color: 'cyan',
    },
    {
      label: 'الطاقة المستهلكة (كيلوواط.ساعة)',
      value: `${result.energyKWh.toFixed(2)} kWh`,
      color: 'emerald',
    },
    {
      label: 'الطاقة بالجول (Joules)',
      value:
        result.energyJoules >= 1e6
          ? `${(result.energyJoules / 1e6).toFixed(2)} MJ`
          : `${result.energyJoules.toLocaleString()} J`,
      color: 'slate',
    },
  ];

  return (
    <SimulationShell
      title="مختبر الطاقة والقدرة الكهربائية"
      subtitle="الفصل الخامس — حساب القدرة الكهربائية، استهلاك الطاقة بالجول والكيلوواط.ساعة، ودوائر الأمان الكهربائية"
      badge="الصف الثالث المتوسط"
      topic="الطاقة والقدرة الكهربائية"
    >
      <div className="space-y-6">
        {/* Appliances Quick Picker */}
        <div className="flex overflow-x-auto pb-1 gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 no-scrollbar">
          {APPLIANCE_PRESETS.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => handleSelectAppliance(app.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedApplianceId === app.id
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <span>{app.nameAr.split('(')[0]}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/15">
                {app.defaultPowerW} W
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visual Display Area */}
          <div className="lg:col-span-2 space-y-4">
            {/* Digital Energy Meter Display */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-inner space-y-6 text-white">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Gauge className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">
                      مقياس الطاقة الكهربائية المنزلي (Digital Energy Meter)
                    </h3>
                    <p className="text-xs text-slate-400">
                      قراءة الاستهلاك الكلي وفق النظام الدولي SI
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-700/80 px-4 py-2 rounded-2xl font-mono text-center">
                  <span className="text-[11px] text-slate-400 block">الطاقة المستهلكة</span>
                  <span className="text-2xl font-black text-amber-400">
                    {result.energyKWh.toFixed(3)}{' '}
                    <span className="text-xs text-slate-300 font-sans">kWh</span>
                  </span>
                </div>
              </div>

              {/* Formula Relations Visualizer */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-1">قانون القدرة الأول</span>
                  <span className="text-xs font-mono font-bold text-cyan-400">P = V · I</span>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    {voltageV}V × {result.currentA.toFixed(2)}A = {result.powerW} W
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-1">بدلالة المقاومة</span>
                  <span className="text-xs font-mono font-bold text-amber-400">P = I² · R</span>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    R = {result.equivalentResistanceOhm.toFixed(1)} Ω
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-1">الطاقة الكهربائية</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">E = P · t</span>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    {timeHours} ساعات = {timeHours * 3600} ثانية
                  </span>
                </div>
              </div>

              {/* Wire Heating / Current Visual Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Flame className={`w-4 h-4 ${result.currentA > 10 ? 'text-red-500' : 'text-amber-400'}`} />
                    <span>مستوى الحمل الحراري على سلك التوصيل:</span>
                  </span>
                  <span className="font-mono font-bold text-cyan-400">
                    {((result.currentA / 16) * 100).toFixed(0)}% من طاقة السلك
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      result.currentA > 10
                        ? 'bg-gradient-to-r from-amber-500 to-red-500'
                        : 'bg-gradient-to-r from-emerald-500 to-cyan-500'
                    }`}
                    style={{ width: `${Math.min(100, (result.currentA / 16) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <SimulationHUD metrics={hudMetrics} />

            {/* Electrical Safety Callout (Iraqi Curriculum Focus) */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 space-y-1.5">
              <p className="font-bold flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                <ShieldAlert className="w-4 h-4" />
                <span>إرشادات الأمان الكهربائي (فاصم الأمان وسلك التأريض):</span>
              </p>
              <p>
                الفاصم المناسب لهذا الجهاز يجب ألا يقل عن{' '}
                <strong className="font-mono underline">{result.recommendedFuseA}A</strong> ليمر التيار دون انقطاع، مع قطع الدائرة فوراً عند حدوث تماس أو قصر.
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {result.safetyAdviceAr}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <SimulationControls
              title="معاملات استهلاك الطاقة"
              onReset={handleReset}
            >
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>فرق جهد الشبكة الكهربائية (V)</span>
                    <span className="font-mono text-cyan-600 dark:text-cyan-400">{voltageV} V</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => setVoltageV(220)}
                      className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                        voltageV === 220
                          ? 'bg-cyan-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      220 V (المعيار العراقي)
                    </button>
                    <button
                      type="button"
                      onClick={() => setVoltageV(110)}
                      className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                        voltageV === 110
                          ? 'bg-cyan-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      110 V
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>قدرة الجهاز المستهلكة (P)</span>
                    <span className="font-mono text-amber-600 dark:text-amber-400">{powerW} W</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={3500}
                    step={50}
                    value={powerW}
                    onChange={(e) => setPowerW(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>10 W (مصباح)</span>
                    <span>1800 W</span>
                    <span>3500 W (سخان/سبلت)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>مدة التشغيل (بالساعات)</span>
                    <span className="font-mono text-cyan-600 dark:text-cyan-400">{timeHours} ساعات</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={24}
                    step={0.5}
                    value={timeHours}
                    onChange={(e) => setTimeHours(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>نصف ساعة</span>
                    <span>12 ساعة</span>
                    <span>24 ساعة (يوم كامل)</span>
                  </div>
                </div>

                {/* Energy Conversion Summary */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    التحويلات الرياضية المنهجية:
                  </span>
                  <div className="space-y-1.5 text-[11px] font-mono p-3 bg-slate-100 dark:bg-slate-800 rounded-xl space-y-1 text-slate-700 dark:text-slate-300">
                    <p>E (J) = {powerW}W × ({timeHours} × 3600s)</p>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">
                      = {result.energyJoules.toLocaleString()} Joules
                    </p>
                    <div className="border-t border-slate-200 dark:border-slate-700 my-1" />
                    <p>E (kWh) = ({powerW}W × {timeHours}h) / 1000</p>
                    <p className="font-bold text-amber-600 dark:text-amber-400">
                      = {result.energyKWh.toFixed(3)} kWh
                    </p>
                  </div>
                </div>
              </div>
            </SimulationControls>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
