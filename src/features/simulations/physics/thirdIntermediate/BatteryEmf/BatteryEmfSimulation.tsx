import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateBatteryCircuit } from './calculations';
import { Battery, Power, ToggleLeft, ToggleRight, Sparkles, Activity, ShieldCheck } from 'lucide-react';
import { LabSurface } from '../../../visuals/LabSurface';
import { ScientificGrid } from '../../../visuals/ScientificGrid';
import { CircuitWire } from '../../../visuals/CircuitWire';
import { FormulaSubstitution } from '../../../visuals/FormulaSubstitution';
import { SimulationStatus } from '../../../visuals/SimulationStatus';
import { ValueBadge } from '../../../visuals/ValueBadge';
import { usePrefersReducedMotion } from '../../../core/usePrefersReducedMotion';

export const BatteryEmfSimulation: React.FC = () => {
  const [emfV, setEmfV] = useState<number>(12);
  const [internalResistanceOhm, setInternalResistanceOhm] = useState<number>(1.5);
  const [loadResistanceOhm, setLoadResistanceOhm] = useState<number>(8.5);
  const [isSwitchClosed, setIsSwitchClosed] = useState<boolean>(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  const result = calculateBatteryCircuit(emfV, internalResistanceOhm, loadResistanceOhm, isSwitchClosed);

  const handleReset = () => {
    setEmfV(12);
    setInternalResistanceOhm(1.5);
    setLoadResistanceOhm(8.5);
    setIsSwitchClosed(true);
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'فرق جهد القطبين (V_t)',
      value: `${result.terminalVoltageV.toFixed(2)} V`,
      color: 'cyan',
    },
    {
      label: 'تيار الدائرة (I)',
      value: `${result.currentA.toFixed(2)} A`,
      color: 'amber',
    },
    {
      label: 'هبوط الجهد الداخلي (Ir)',
      value: `${result.internalDropV.toFixed(2)} V`,
      color: 'red',
    },
    {
      label: 'كفاءة البطارية (η)',
      value: `${result.efficiencyPercent.toFixed(1)} %`,
      color: 'emerald',
    },
  ];

  const width = 600;
  const height = 300;
  const left = 80;
  const right = width - 80;
  const top = 60;
  const bottom = height - 60;
  const centerY = (top + bottom) / 2;

  return (
    <SimulationShell
      title="مختبر البطارية والقوة الدافعة الكهربائية (emf)"
      subtitle="الفصل الرابع — دراسة القوة الدافعة الكهربائية، المقاومة الداخلية للبطارية، وفرق الجهد بين القطبين"
      badge="الصف الثالث المتوسط"
      topic="البطارية والقوة الدافعة الكهربائية"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <LabSurface type="metallic" className="aspect-[600/300] p-0 relative overflow-hidden" data-testid="physics-visualization">
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
              <ScientificGrid width={width} height={height} />
              
              {/* Circuit Loop */}
              <CircuitWire 
                points={[
                  {x: left, y: top}, {x: right, y: top}, 
                  {x: right, y: bottom}, {x: left, y: bottom}, 
                  {x: left, y: top}
                ]} 
                currentA={result.currentA} 
                showElectrons={!prefersReducedMotion && isSwitchClosed} 
              />

              {/* Battery real package (dashed box) */}
              <g transform={`translate(${left}, ${centerY})`}>
                <rect x="-30" y="-65" width="60" height="130" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" rx="4" />
                <text x="0" y="-75" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">البطارية الحقيقية</text>
                
                {/* Internal EMF */}
                <g transform="translate(0, -30)">
                  <rect x="-15" y="-12" width="30" height="24" fill="#0f172a" stroke="#334155" />
                  <line x1="-12" y1="-5" x2="12" y2="-5" stroke="#ef4444" strokeWidth="2" />
                  <line x1="-8" y1="5" x2="8" y2="5" stroke="#3b82f6" strokeWidth="4" />
                  <text x="-20" y="4" fill="#f1f5f9" fontSize="9" fontWeight="bold" textAnchor="end">ε={emfV}V</text>
                </g>

                {/* Internal Resistance */}
                <g transform="translate(0, 30)">
                  <rect x="-12" y="-10" width="24" height="20" fill="#334155" stroke="#cbd5e1" rx="2" />
                  <text x="-18" y="4" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="end">r={internalResistanceOhm}Ω</text>
                  {/* bands */}
                  <rect x="-8" y="-8" width="2" height="16" fill="#f59e0b" />
                  <rect x="-2" y="-8" width="2" height="16" fill="#78350f" />
                </g>

                {/* Terminals */}
                <circle cx="0" cy="-65" r="4" fill="#10b981" />
                <circle cx="0" cy="65" r="4" fill="#10b981" />
              </g>

              {/* Voltmeter across terminals */}
              <g>
                <path d={`M ${left} ${centerY - 65} L ${left - 60} ${centerY - 65} L ${left - 60} ${centerY - 20}`} fill="none" stroke="#10b981" strokeWidth="1.5" />
                <path d={`M ${left} ${centerY + 65} L ${left - 60} ${centerY + 65} L ${left - 60} ${centerY + 20}`} fill="none" stroke="#10b981" strokeWidth="1.5" />
                <circle cx={left - 60} cy={centerY} r="20" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <text x={left - 60} y={centerY + 4} fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">V</text>
                <text x={left - 60} y={centerY + 35} fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">{result.terminalVoltageV.toFixed(2)}V</text>
              </g>

              {/* Load Resistor R */}
              <g transform={`translate(${right}, ${centerY})`}>
                <rect x="-15" y="-30" width="30" height="60" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" rx="2" />
                <text x="25" y="0" fill="#38bdf8" fontSize="11" fontWeight="bold">R={loadResistanceOhm}Ω</text>
                <text x="25" y="15" fill="#94a3b8" fontSize="9">P={result.powerLoadW.toFixed(1)}W</text>
                <rect x="-12" y="-20" width="24" height="4" fill="#38bdf8" />
                <rect x="-12" y="0" width="24" height="4" fill="#0369a1" />
                <rect x="-12" y="20" width="24" height="4" fill="#38bdf8" />
              </g>

              {/* Switch */}
              <g transform={`translate(${(left + right) / 2}, ${top})`} className="cursor-pointer" onClick={() => setIsSwitchClosed(!isSwitchClosed)}>
                <rect x="-25" y="-12" width="50" height="24" fill="#0f172a" rx="4" />
                <circle cx="-12" cy="0" r="3" fill={isSwitchClosed ? '#10b981' : '#ef4444'} />
                <circle cx="12" cy="0" r="3" fill={isSwitchClosed ? '#10b981' : '#ef4444'} />
                {isSwitchClosed ? (
                  <line x1="-12" y1="0" x2="12" y2="0" stroke="#10b981" strokeWidth="3" />
                ) : (
                  <line x1="-12" y1="0" x2="8" y2="-15" stroke="#ef4444" strokeWidth="3" />
                )}
                <text x="0" y="-18" fill={isSwitchClosed ? '#10b981' : '#ef4444'} fontSize="9" fontWeight="bold" textAnchor="middle">
                  {isSwitchClosed ? 'مغلق' : 'مفتوح'}
                </text>
              </g>

              {/* Ammeter */}
              <g transform={`translate(${(left + right) / 2}, ${bottom})`}>
                <circle cx="0" cy="0" r="18" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <text x="0" y="4" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">A</text>
                <text x="0" y="30" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">{result.currentA.toFixed(2)}A</text>
              </g>
            </svg>

            <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
              <button
                type="button" onClick={() => setIsSwitchClosed(!isSwitchClosed)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs font-bold text-white shadow-lg"
              >
                <Power className={`w-3.5 h-3.5 ${isSwitchClosed ? 'text-emerald-400' : 'text-red-400'}`} />
                <span>{isSwitchClosed ? 'فتح الدائرة' : 'غلق الدائرة'}</span>
              </button>
              <SimulationStatus status="nominal" message={isSwitchClosed ? 'حالة حمل' : 'حالة قطع'} />
            </div>
          </LabSurface>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormulaSubstitution
              formula="V_terminal = ε - I · r"
              substitutions={[
                { symbol: 'ε', value: emfV, unit: 'V' },
                { symbol: 'I', value: result.currentA.toFixed(2), unit: 'A' },
                { symbol: 'r', value: internalResistanceOhm, unit: 'Ω' },
              ]}
              result={result.terminalVoltageV.toFixed(2)}
              unit="V"
            />
            
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 space-y-2">
              <p className="font-bold flex items-center gap-1.5 text-cyan-900 dark:text-cyan-200">
                <Sparkles className="w-4 h-4" />
                <span>القاعدة العلمية:</span>
              </p>
              <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                {result.stateExplanationAr}
              </p>
              <div className="flex gap-2 pt-1">
                <ValueBadge label="الجهد الضائع" value={`${result.internalDropV.toFixed(2)} V`} color="rose" />
                <ValueBadge label="كفاءة النقل" value={`${result.efficiencyPercent.toFixed(0)}%`} color="emerald" />
              </div>
            </div>
          </div>

          <SimulationHUD metrics={hudMetrics} />
        </div>

        <div className="space-y-4">
          <SimulationControls title="معاملات البطارية" onReset={handleReset}>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span>القوة الدافعة الكهربائية (ε)</span>
                  <span className="text-cyan-600">{emfV} V</span>
                </div>
                <input
                  type="range" min={1.5} max={24} step={0.5}
                  value={emfV}
                  onChange={(e) => setEmfV(Number(e.target.value))}
                  className="w-full accent-cyan-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span>المقاومة الداخلية (r)</span>
                  <span className="text-red-500">{internalResistanceOhm} Ω</span>
                </div>
                <input
                  type="range" min={0.1} max={5} step={0.1}
                  value={internalResistanceOhm}
                  onChange={(e) => setInternalResistanceOhm(Number(e.target.value))}
                  className="w-full accent-cyan-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span>مقاومة الحمل الخارجي (R)</span>
                  <span className="text-cyan-600">{loadResistanceOhm} Ω</span>
                </div>
                <input
                  type="range" min={1} max={40} step={0.5}
                  value={loadResistanceOhm}
                  onChange={(e) => setLoadResistanceOhm(Number(e.target.value))}
                  className="w-full accent-cyan-600"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-[10px] text-slate-500 font-bold uppercase">تحليل القدرة:</span>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex justify-between items-center text-[11px]">
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">القدرة المفيدة (P_load)</span>
                    <span className="font-mono">{result.powerLoadW.toFixed(2)} W</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-red-500/5 border border-red-500/10 flex justify-between items-center text-[11px]">
                    <span className="text-red-700 dark:text-red-400 font-bold">القدرة الضائعة (P_internal)</span>
                    <span className="font-mono">{result.powerWastedW.toFixed(2)} W</span>
                  </div>
                </div>
              </div>
            </div>
          </SimulationControls>
        </div>
      </div>
    </SimulationShell>
  );
};

