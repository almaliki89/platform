import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateCircuit, generateVICharacteristic } from './calculations';
import { CircuitMode } from './types';
import { Zap, RotateCcw, Activity, GitFork, ArrowRight, Sparkles } from 'lucide-react';
import { LabSurface } from '../../../visuals/LabSurface';
import { ScientificGrid } from '../../../visuals/ScientificGrid';
import { CircuitWire } from '../../../visuals/CircuitWire';
import { ScientificGraph } from '../../../visuals/ScientificGraph';
import { FormulaSubstitution } from '../../../visuals/FormulaSubstitution';
import { SimulationStatus } from '../../../visuals/SimulationStatus';
import { ValueBadge } from '../../../visuals/ValueBadge';
import { usePrefersReducedMotion } from '../../../core/usePrefersReducedMotion';

export const ElectricCurrentSimulation: React.FC = () => {
  const [mode, setMode] = useState<CircuitMode>('series');
  const [voltageV, setVoltageV] = useState<number>(12);
  const [r1Ohm, setR1Ohm] = useState<number>(4);
  const [r2Ohm, setR2Ohm] = useState<number>(6);
  const [hasR3, setHasR3] = useState<boolean>(false);
  const [r3Ohm, setR3Ohm] = useState<number>(12);
  const prefersReducedMotion = usePrefersReducedMotion();

  const resistances = hasR3 ? [r1Ohm, r2Ohm, r3Ohm] : [r1Ohm, r2Ohm];
  const activeResistances = mode === 'single' ? [r1Ohm] : resistances;
  const circuitResult = calculateCircuit(mode, voltageV, activeResistances);
  const viPoints = generateVICharacteristic(circuitResult.equivalentResistanceOhm, 24);

  const handleReset = () => {
    setVoltageV(12);
    setR1Ohm(4);
    setR2Ohm(6);
    setHasR3(false);
    setR3Ohm(12);
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'التيار الكلي (I)',
      value: `${circuitResult.totalCurrentA.toFixed(2)} A`,
      color: 'cyan',
    },
    {
      label: 'المقاومة المكافئة (Req)',
      value: `${circuitResult.equivalentResistanceOhm.toFixed(2)} Ω`,
      color: 'amber',
    },
    {
      label: 'فرق الجهد الكلي (V)',
      value: `${voltageV.toFixed(1)} V`,
      color: 'slate',
    },
    {
      label: 'القدرة الكهربائية (P)',
      value: `${circuitResult.totalPowerW.toFixed(1)} W`,
      color: 'emerald',
    },
  ];

  const width = 600;
  const height = 300;
  const padding = 60;
  const left = padding;
  const right = width - padding;
  const top = 60;
  const bottom = height - 60;
  const centerY = (top + bottom) / 2;

  // Build circuit wires
  const mainLoopPoints = [
    { x: left, y: top },
    { x: right, y: top },
    { x: right, y: bottom },
    { x: left, y: bottom },
    { x: left, y: top },
  ];

  return (
    <SimulationShell
      title="مختبر التيار الكهربائي وقانون أوم"
      subtitle="الفصل الثالث — ربط المقاومات على التوالي والتوازي، قانون أوم، ومنحنى الجهد والتيار"
      badge="الصف الثالث المتوسط"
      topic="التيار الكهربائي وقانون أوم"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          {(['single', 'series', 'parallel'] as CircuitMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                mode === m
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {m === 'single' ? 'قانون أوم' : m === 'series' ? 'ربط توالي' : 'ربط توازي'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <LabSurface type="metallic" className="aspect-[600/300] p-0 relative overflow-hidden" data-testid="physics-visualization">
              <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                <ScientificGrid width={width} height={height} />
                
                {/* Circuit Wires */}
                <CircuitWire 
                  points={mainLoopPoints} 
                  currentA={circuitResult.totalCurrentA} 
                  showElectrons={!prefersReducedMotion} 
                />

                {/* Parallel Branches if mode is parallel */}
                {mode === 'parallel' && (
                  <>
                    <CircuitWire points={[{x: left + 100, y: top}, {x: left + 100, y: bottom}]} currentA={0} showElectrons={false} />
                    <CircuitWire points={[{x: right - 100, y: top}, {x: right - 100, y: bottom}]} currentA={0} showElectrons={false} />
                    <CircuitWire 
                      points={[{x: left + 100, y: centerY}, {x: right - 100, y: centerY}]} 
                      currentA={circuitResult.branchCurrentsA[1] || 0} 
                      showElectrons={!prefersReducedMotion} 
                    />
                    {hasR3 && (
                      <CircuitWire 
                        points={[{x: left + 100, y: bottom - 30}, {x: right - 100, y: bottom - 30}]} 
                        currentA={circuitResult.branchCurrentsA[2] || 0} 
                        showElectrons={!prefersReducedMotion} 
                      />
                    )}
                  </>
                )}

                {/* Battery Symbol */}
                <g transform={`translate(${left}, ${centerY})`}>
                  <rect x="-15" y="-25" width="30" height="50" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                  <line x1="-12" y1="-10" x2="12" y2="-10" stroke="#ef4444" strokeWidth="3" />
                  <line x1="-8" y1="10" x2="8" y2="10" stroke="#3b82f6" strokeWidth="5" />
                  <text x="18" y="-8" fill="#ef4444" fontSize="10" fontWeight="bold">+</text>
                  <text x="18" y="15" fill="#3b82f6" fontSize="10" fontWeight="bold">−</text>
                  <text x="-25" y="5" fill="#f1f5f9" fontSize="10" fontWeight="bold" textAnchor="end">{voltageV}V</text>
                </g>

                {/* Resistors */}
                {mode === 'single' && (
                  <ResistorSVG x={(left + right) / 2} y={top} label="R₁" ohm={r1Ohm} vDrop={voltageV} i={circuitResult.totalCurrentA} />
                )}
                {mode === 'series' && activeResistances.map((r, i) => (
                  <ResistorSVG 
                    key={i} 
                    x={left + (i + 1) * ((right - left) / (activeResistances.length + 1))} 
                    y={top} 
                    label={`R${i+1}`} 
                    ohm={r} 
                    vDrop={circuitResult.resistorVoltagesV[i]} 
                    i={circuitResult.totalCurrentA} 
                  />
                ))}
                {mode === 'parallel' && (
                  <>
                    <ResistorSVG x={(left + right) / 2} y={top} label="R₁" ohm={r1Ohm} vDrop={voltageV} i={circuitResult.branchCurrentsA[0]} />
                    <ResistorSVG x={(left + right) / 2} y={centerY} label="R₂" ohm={r2Ohm} vDrop={voltageV} i={circuitResult.branchCurrentsA[1]} />
                    {hasR3 && (
                      <ResistorSVG x={(left + right) / 2} y={bottom - 30} label="R₃" ohm={r3Ohm} vDrop={voltageV} i={circuitResult.branchCurrentsA[2]} />
                    )}
                  </>
                )}
              </svg>

              <div className="absolute top-4 right-4">
                <SimulationStatus status="nominal" message={voltageV > 0 ? 'دائرة مغلقة' : 'دائرة مفتوحة'} />
              </div>
            </LabSurface>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ScientificGraph
                data={viPoints.map(p => ({ x: p.voltage, y: p.current }))}
                xLabel="الجهد (V)"
                yLabel="التيار (A)"
                xRange={[0, 24]}
                yRange={[0, 24 / circuitResult.equivalentResistanceOhm]}
                currentPoint={{ x: voltageV, y: circuitResult.totalCurrentA }}
                color="#06b6d4"
              />
              
              <FormulaSubstitution
                formula={mode === 'series' ? 'Req = R₁ + R₂ + ...' : mode === 'parallel' ? '1/Req = 1/R₁ + 1/R₂ + ...' : 'I = V / R'}
                substitutions={[
                  { symbol: 'V', value: voltageV, unit: 'V' },
                  { symbol: 'Req', value: circuitResult.equivalentResistanceOhm.toFixed(2), unit: 'Ω' },
                ]}
                result={circuitResult.totalCurrentA.toFixed(3)}
                unit="A"
              />
            </div>

            <SimulationHUD metrics={hudMetrics} />

            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 space-y-2">
              <p className="font-bold flex items-center gap-1.5 text-cyan-900 dark:text-cyan-200">
                <Sparkles className="w-4 h-4" />
                <span>التحليل الفيزيائي:</span>
              </p>
              <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                {circuitResult.descriptionAr}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <SimulationControls title="التحكم بالدائرة" onReset={handleReset}>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>جهد البطارية</span>
                    <span className="text-cyan-600">{voltageV} V</span>
                  </div>
                  <input
                    type="range" min={1} max={24} step={1}
                    value={voltageV}
                    onChange={(e) => setVoltageV(Number(e.target.value))}
                    className="w-full accent-cyan-600"
                  />
                </div>

                <div className="space-y-4 pt-2">
                  <span className="text-xs font-bold block">المقاومات المتصلة:</span>
                  {[
                    { val: r1Ohm, set: setR1Ohm, label: 'R₁' },
                    ...(mode !== 'single' ? [{ val: r2Ohm, set: setR2Ohm, label: 'R₂' }] : []),
                    ...(hasR3 && mode !== 'single' ? [{ val: r3Ohm, set: setR3Ohm, label: 'R₃' }] : []),
                  ].map((r, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>قيمة {r.label}</span>
                        <span className="font-mono text-cyan-600">{r.val} Ω</span>
                      </div>
                      <input
                        type="range" min={1} max={50} step={1}
                        value={r.val}
                        onChange={(e) => r.set(Number(e.target.value))}
                        className="w-full accent-cyan-600 h-1.5"
                      />
                    </div>
                  ))}
                </div>

                {mode !== 'single' && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                    <label className="flex items-center justify-between text-xs font-bold cursor-pointer">
                      <span>إضافة مقاومة R₃</span>
                      <input
                        type="checkbox" checked={hasR3}
                        onChange={(e) => setHasR3(e.target.checked)}
                        className="rounded accent-cyan-600 w-4 h-4"
                      />
                    </label>
                  </div>
                )}
                
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block mb-2">توزيع القيم:</span>
                  <div className="space-y-1.5">
                    {activeResistances.map((r, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[10px]">
                        <span className="font-bold">R{i+1}</span>
                        <div className="flex gap-2">
                          <span className="text-cyan-600 font-bold">{circuitResult.resistorVoltagesV[i]?.toFixed(1)}V</span>
                          <span className="text-amber-600 font-bold">{circuitResult.branchCurrentsA[i]?.toFixed(2)}A</span>
                        </div>
                      </div>
                    ))}
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

const ResistorSVG: React.FC<{x: number, y: number, label: string, ohm: number, vDrop: number, i: number}> = ({
  x, y, label, ohm, vDrop, i
}) => (
  <g transform={`translate(${x}, ${y})`}>
    <rect x="-25" y="-10" width="50" height="20" fill="#1e293b" stroke="#f1f5f9" strokeWidth="1.5" rx="2" />
    <text x="0" y="-15" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">{label}: {ohm}Ω</text>
    <text x="0" y="22" fill="#94a3b8" fontSize="8" textAnchor="middle">{vDrop.toFixed(1)}V | {i.toFixed(2)}A</text>
    {/* Decorative bands */}
    <rect x="-18" y="-8" width="4" height="16" fill="#f59e0b" />
    <rect x="-8" y="-8" width="4" height="16" fill="#ef4444" />
    <rect x="2" y="-8" width="4" height="16" fill="#10b981" />
  </g>
);

