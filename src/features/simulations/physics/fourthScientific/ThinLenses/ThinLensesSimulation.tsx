import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateThinLensOptics } from './calculations';
import { LensType } from './types';
import { Eye, Sparkles } from 'lucide-react';
import { ScientificGrid } from '../../../visuals/ScientificGrid';
import { FormulaSubstitution } from '../../../visuals/FormulaSubstitution';
import { DiagramLabel } from '../../../visuals/DiagramLabel';

export const ThinLensesSimulation: React.FC = () => {
  const [lensType, setLensType] = useState<LensType>('converging');
  const [focalLengthCm, setFocalLengthCm] = useState<number>(20);
  const [objectDistanceCm, setObjectDistanceCm] = useState<number>(35);
  const [objectHeightCm, setObjectHeightCm] = useState<number>(15);

  const result = calculateThinLensOptics(
    lensType,
    focalLengthCm,
    objectDistanceCm,
    objectHeightCm
  );

  const handleReset = () => {
    setLensType('converging');
    setFocalLengthCm(20);
    setObjectDistanceCm(35);
    setObjectHeightCm(15);
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'بعد الصورة (v)',
      value: Math.abs(result.imageDistanceCm) > 500 ? '∞' : `${result.imageDistanceCm.toFixed(1)} cm`,
      color: result.isReal ? 'emerald' : 'purple',
    },
    {
      label: 'قدرة العدسة (P)',
      value: `${result.powerDiopter > 0 ? '+' : ''}${result.powerDiopter.toFixed(2)} D`,
      color: 'cyan',
    },
    {
      label: 'التكبير (M)',
      value: Math.abs(result.magnification) > 50 ? '∞' : `${result.magnification.toFixed(2)}x`,
      color: 'amber',
    },
    {
      label: 'طبيعة الصورة',
      value: result.isReal ? 'حقيقية مقلوبة' : 'خيالية معتدلة',
      color: 'slate',
    },
  ];

  const pxScale = 4; // 1 cm = 4 px
  const lensX = 300;
  const axisY = 150;

  return (
    <SimulationShell
      title="مختبر العدسات الرقيقة"
      subtitle="الفصل الثامن — العدسات المحدبة والمقعرة، قانون العدسات، والقدرة بالديوبتر"
      badge="الصف الرابع العلمي"
      topic="العدسات الرقيقة والقدرة"
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setLensType('converging')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              lensType === 'converging' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>عدسة محدبة (مجمعة)</span>
          </button>
          <button
            onClick={() => setLensType('diverging')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              lensType === 'diverging' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>عدسة مقعرة (مفرقة)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex items-center justify-center p-4">
              <svg viewBox="0 0 600 300" className="w-full h-full">
                <ScientificGrid width={600} height={300} />
                
                {/* Principal Axis */}
                <line x1="0" y1={axisY} x2="600" y2={axisY} stroke="#64748b" strokeWidth="1" strokeDasharray="5 5" />

                {/* Lens */}
                <g>
                  {lensType === 'converging' ? (
                    <ellipse cx={lensX} cy={axisY} rx="12" ry="100" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="3" />
                  ) : (
                    <path 
                      d={`M ${lensX-12} 50 L ${lensX+12} 50 Q ${lensX+4} 150 ${lensX+12} 250 L ${lensX-12} 250 Q ${lensX-4} 150 ${lensX-12} 50`}
                      fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="3" 
                    />
                  )}
                  <line x1={lensX} y1="40" x2={lensX} y2="260" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx={lensX} cy={axisY} r="3" fill="white" />
                  <text x={lensX + 5} y={axisY + 15} fill="white" className="text-[10px] font-mono">O</text>
                </g>

                {/* Focal Points */}
                <g>
                   <circle cx={lensX - focalLengthCm * pxScale} cy={axisY} r="3.5" fill="#f59e0b" />
                   <text x={lensX - focalLengthCm * pxScale} y={axisY + 18} textAnchor="middle" fill="#f59e0b" className="text-[9px] font-bold">F1</text>
                   <circle cx={lensX + focalLengthCm * pxScale} cy={axisY} r="3.5" fill="#f59e0b" />
                   <text x={lensX + focalLengthCm * pxScale} y={axisY + 18} textAnchor="middle" fill="#f59e0b" className="text-[9px] font-bold">F2</text>
                   
                   <circle cx={lensX - focalLengthCm * 2 * pxScale} cy={axisY} r="3.5" fill="#10b981" />
                   <text x={lensX - focalLengthCm * 2 * pxScale} y={axisY + 18} textAnchor="middle" fill="#10b981" className="text-[9px] font-bold">2F1</text>
                   <circle cx={lensX + focalLengthCm * 2 * pxScale} cy={axisY} r="3.5" fill="#10b981" />
                   <text x={lensX + focalLengthCm * 2 * pxScale} y={axisY + 18} textAnchor="middle" fill="#10b981" className="text-[9px] font-bold">2F2</text>
                </g>

                {/* Object */}
                <g transform={`translate(${lensX - objectDistanceCm * pxScale}, ${axisY})`}>
                  <line x1="0" y1="0" x2="0" y2={-objectHeightCm * pxScale} stroke="#38bdf8" strokeWidth="4" />
                  <path d={`M -5 ${-objectHeightCm * pxScale + 10} L 0 ${-objectHeightCm * pxScale} L 5 ${-objectHeightCm * pxScale + 10}`} fill="none" stroke="#38bdf8" strokeWidth="2" />
                  <text y={-objectHeightCm * pxScale - 10} textAnchor="middle" fill="#38bdf8" className="text-[10px] font-bold">Obj</text>
                </g>

                {/* Image */}
                {Math.abs(result.imageDistanceCm) < 150 && (
                  <g transform={`translate(${lensX + result.imageDistanceCm * pxScale}, ${axisY})`}>
                    <line 
                      x1="0" y1="0" 
                      x2="0" y2={-result.imageHeightCm * pxScale} 
                      stroke={result.isReal ? "#ef4444" : "#a855f7"} 
                      strokeWidth={3} 
                      strokeDasharray={result.isReal ? "" : "4 2"} 
                    />
                    <path 
                      d={result.isInverted 
                        ? `M -4 ${-result.imageHeightCm * pxScale - 8} L 0 ${-result.imageHeightCm * pxScale} L 4 ${-result.imageHeightCm * pxScale - 8}` 
                        : `M -4 ${-result.imageHeightCm * pxScale + 8} L 0 ${-result.imageHeightCm * pxScale} L 4 ${-result.imageHeightCm * pxScale + 8}`} 
                      fill="none" stroke={result.isReal ? "#ef4444" : "#a855f7"} strokeWidth="2" 
                    />
                    <text y={result.isInverted ? -result.imageHeightCm * pxScale + 15 : -result.imageHeightCm * pxScale - 10} textAnchor="middle" fill={result.isReal ? "#ef4444" : "#c084fc"} className="text-[10px] font-bold">Img</text>
                  </g>
                )}

                <DiagramLabel x={lensX} y={260} text={lensType === 'converging' ? "Convex Lens" : "Concave Lens"} color="blue" />
              </svg>

              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-400">
                1/f = 1/u + 1/v
              </div>
            </div>

            <SimulationHUD metrics={hudMetrics} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormulaSubstitution
                formula="1/v = 1/f - 1/u"
                substitutions={[
                  { symbol: 'f', value: lensType === 'converging' ? focalLengthCm : -focalLengthCm, unit: 'cm' },
                  { symbol: 'u', value: objectDistanceCm, unit: 'cm' },
                ]}
                result={`${result.imageDistanceCm.toFixed(1)} cm`}
              />
              
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-center">
                 <p className="text-[11px] text-slate-400 font-bold mb-2">وصف الصورة:</p>
                 <p className="text-xs text-slate-300 leading-relaxed">
                   {result.imageNatureAr}
                 </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-900 dark:text-cyan-200 space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>التحليل العلمي المنهجي:</span>
              </p>
              <p>قدرة العدسة (P) بالديوبتر تساوي مقلوب البعد البؤري بالمتر.</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                حسب منهاج الرابع العلمي: العدسة المحدبة لها قدرة موجبة والمقعرة لها قدرة سالبة.
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <SimulationControls onReset={handleReset}>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>البعد البؤري (f)</span>
                  <span className="text-amber-500 font-mono">{focalLengthCm} cm</span>
                </div>
                <input type="range" min="10" max="35" step="1" value={focalLengthCm} onChange={(e) => setFocalLengthCm(parseInt(e.target.value))} className="w-full accent-amber-500" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>بعد الجسم (u)</span>
                  <span className="text-cyan-400 font-mono">{objectDistanceCm} cm</span>
                </div>
                <input type="range" min="5" max="60" step="1" value={objectDistanceCm} onChange={(e) => setObjectDistanceCm(parseInt(e.target.value))} className="w-full accent-cyan-500" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>طول الجسم (h_o)</span>
                  <span className="text-emerald-400 font-mono">{objectHeightCm} cm</span>
                </div>
                <input type="range" min="5" max="25" step="1" value={objectHeightCm} onChange={(e) => setObjectHeightCm(parseInt(e.target.value))} className="w-full accent-emerald-500" />
              </div>
            </SimulationControls>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};

export default ThinLensesSimulation;
