import React, { useState } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateApplianceEnergy, APPLIANCE_PRESETS } from './calculations';
import { Zap, Clock, ShieldAlert, Sparkles, Gauge, Flame, RotateCcw } from 'lucide-react';
import { LabSurface } from '../../../visuals/LabSurface';
import { EnergyFlow } from '../../../visuals/EnergyFlow';
import { FormulaSubstitution } from '../../../visuals/FormulaSubstitution';
import { ValueBadge } from '../../../visuals/ValueBadge';
import { SimulationStatus } from '../../../visuals/SimulationStatus';

export const ElectricalEnergyPowerSimulation: React.FC = () => {
  const [selectedApplianceId, setSelectedApplianceId] = useState<string>('heater');
  const [voltageV, setVoltageV] = useState<number>(220); // 220V Iraqi grid standard
  const [powerW, setPowerW] = useState<number>(2000);
  const [timeHours, setTimeHours] = useState<number>(3);

  const result = calculateApplianceEnergy(voltageV, powerW, timeHours);
  const currentAppliance = APPLIANCE_PRESETS.find(p => p.id === selectedApplianceId) || APPLIANCE_PRESETS[0];

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
      label: 'القدرة (P)',
      value: `${result.powerKW.toFixed(2)} kW`,
      color: 'amber',
    },
    {
      label: 'التيار (I)',
      value: `${result.currentA.toFixed(2)} A`,
      color: 'cyan',
    },
    {
      label: 'الطاقة (kWh)',
      value: `${result.energyKWh.toFixed(3)} kWh`,
      color: 'emerald',
    },
    {
      label: 'المقاومة (R)',
      value: `${result.equivalentResistanceOhm.toFixed(1)} Ω`,
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
        <div className="flex overflow-x-auto pb-1 gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 no-scrollbar">
          {APPLIANCE_PRESETS.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => handleSelectAppliance(app.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedApplianceId === app.id
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span>{app.nameAr.split('(')[0]}</span>
              <ValueBadge label="القدرة" value={`${app.defaultPowerW}W`} color="slate" />
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <LabSurface type="dark" data-testid="physics-visualization">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500">
                      <Gauge className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">العداد الذكي للطاقة</h3>
                      <p className="text-[10px] text-slate-400">مراقبة الاستهلاك الفوري والتراكمي</p>
                    </div>
                  </div>
                  <SimulationStatus status="nominal" message="متصل بالشبكة" />
                </div>

                <EnergyFlow 
                  sourceLabel="Grid (220V)" 
                  loadLabel={currentAppliance.nameAr.split('(')[0]} 
                  powerW={powerW} 
                  energyJ={result.energyJoules} 
                />

                <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-400">تراكم الطاقة (kWh)</span>
                    <span className="font-mono text-amber-400 font-bold">{result.energyKWh.toFixed(4)}</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500" 
                      style={{ width: `${Math.min(100, (result.energyKWh / 10) * 100)}%` }} 
                    />
                  </div>
                </div>
              </div>
            </LabSurface>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormulaSubstitution
                formula="P = V · I"
                substitutions={[
                  { symbol: 'V', value: voltageV, unit: 'V' },
                  { symbol: 'I', value: result.currentA.toFixed(2), unit: 'A' },
                ]}
                result={powerW}
                unit="W"
              />
              
              <FormulaSubstitution
                formula="E = P · t"
                substitutions={[
                  { symbol: 'P', value: powerW, unit: 'W' },
                  { symbol: 't', value: (timeHours * 3600).toLocaleString(), unit: 's' },
                ]}
                result={result.energyJoules >= 1e6 ? (result.energyJoules/1e6).toFixed(2) : result.energyJoules.toLocaleString()}
                unit={result.energyJoules >= 1e6 ? 'MJ' : 'J'}
              />
            </div>

            <SimulationHUD metrics={hudMetrics} />

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
              <p className="font-bold flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-sm">
                <ShieldAlert className="w-4 h-4" />
                <span>إرشادات السلامة الكهربائية:</span>
              </p>
              <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                الفاصم (Fuse) المقترح لهذا الجهاز: <span className="font-mono font-bold text-red-500">{result.recommendedFuseA}A</span>. 
                {result.safetyAdviceAr}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <SimulationControls title="المعاملات" onReset={handleReset}>
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold block mb-2">جهد الشبكة</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[220, 110].map(v => (
                      <button
                        key={v} type="button" onClick={() => setVoltageV(v)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                          voltageV === v ? 'bg-cyan-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                      >
                        {v}V
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>قدرة الجهاز (P)</span>
                    <span className="text-amber-600 font-mono">{powerW} W</span>
                  </div>
                  <input
                    type="range" min={10} max={3500} step={50}
                    value={powerW}
                    onChange={(e) => setPowerW(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>زمن التشغيل</span>
                    <span className="text-cyan-600 font-mono">{timeHours} h</span>
                  </div>
                  <input
                    type="range" min={0.5} max={24} step={0.5}
                    value={timeHours}
                    onChange={(e) => setTimeHours(Number(e.target.value))}
                    className="w-full accent-cyan-600"
                  />
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block mb-2">التحويلات المنهجية:</span>
                  <div className="p-3 bg-slate-900 rounded-xl space-y-1 font-mono text-[10px] text-slate-300">
                    <p>E(J) = {powerW}W × ({timeHours} × 3600s)</p>
                    <p className="text-emerald-400 font-bold">= {result.energyJoules.toLocaleString()} J</p>
                    <div className="h-px bg-slate-800 my-1" />
                    <p>E(kWh) = ({powerW}W × {timeHours}h) / 1000</p>
                    <p className="text-amber-400 font-bold">= {result.energyKWh.toFixed(3)} kWh</p>
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
