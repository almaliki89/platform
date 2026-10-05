import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateMirrorOptics } from './calculations';
import { MirrorType } from './types';
import { CircleDot, Sparkles, Eye } from 'lucide-react';
import { ScientificGrid } from '../../../visuals/ScientificGrid';
import { FormulaSubstitution } from '../../../visuals/FormulaSubstitution';
import { DiagramLabel } from '../../../visuals/DiagramLabel';

export const MirrorsSimulation: React.FC = () => {
  const [mirrorType, setMirrorType] = useState<MirrorType>('concave');
  const [focalLengthCm, setFocalLengthCm] = useState<number>(20);
  const [objectDistanceCm, setObjectDistanceCm] = useState<number>(35);
  const [objectHeightCm, setObjectHeightCm] = useState<number>(15);

  const result = calculateMirrorOptics(
    mirrorType,
    focalLengthCm,
    objectDistanceCm,
    objectHeightCm
  );

  const handleReset = () => {
    setMirrorType('concave');
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
      label: 'التكبير (M)',
      value: Math.abs(result.magnification) > 50 ? '∞' : `${result.magnification.toFixed(2)}x`,
      color: 'amber',
    },
    {
      label: 'طول الصورة',
      value: Math.abs(result.imageHeightCm) > 500 ? '∞' : `${Math.abs(result.imageHeightCm).toFixed(1)} cm`,
      color: 'cyan',
    },
    {
      label: 'نوع الصورة',
      value: result.isReal ? 'حقيقية مقلوبة' : 'خيالية معتدلة',
      color: 'slate',
    },
  ];

  const pxScale = 5; // 1 cm = 5 px
  const vertexX = 400;
  const axisY = 150;

  return (
    <SimulationShell
      title="مختبر المرايا الكروية والمستوية"
      subtitle="الفصل السابع — قانون المرايا العام، مسارات الأشعة، وصفات الصور المتكونة"
      badge="الصف الرابع العلمي"
      topic="المرايا وتكون الصور"
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setMirrorType('concave')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mirrorType === 'concave' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <CircleDot className="w-4 h-4" />
            <span>مرآة مقعرة</span>
          </button>
          <button
            onClick={() => setMirrorType('convex')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mirrorType === 'convex' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <CircleDot className="w-4 h-4" />
            <span>مرآة محدبة</span>
          </button>
          <button
            onClick={() => setMirrorType('flat')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mirrorType === 'flat' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>مرآة مستوية</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex items-center justify-center p-4">
              <svg viewBox="0 0 600 300" className="w-full h-full">
                <ScientificGrid width={600} height={300} />
                
                {/* Principal Axis */}
                <line x1="0" y1={axisY} x2="600" y2={axisY} stroke="#64748b" strokeWidth="1" strokeDasharray="5 5" />

                {/* Mirror */}
                {mirrorType === 'flat' ? (
                  <g>
                    <line x1={vertexX} y1="50" x2={vertexX} y2="250" stroke="#94a3b8" strokeWidth="4" />
                    {Array.from({ length: 20 }).map((_, i) => (
                      <line key={i} x1={vertexX} y1={50 + i * 10} x2={vertexX + 10} y2={50 + i * 10 - 5} stroke="#475569" strokeWidth="1" />
                    ))}
                  </g>
                ) : (
                  <g>
                    {(() => {
                      const R = Math.abs(focalLengthCm) * 2 * pxScale;
                      const isConcave = mirrorType === 'concave';
                      const startAngle = isConcave ? -0.4 : Math.PI - 0.4;
                      const endAngle = isConcave ? 0.4 : Math.PI + 0.4;
                      const centerX = isConcave ? vertexX - R : vertexX + R;
                      
                      const path = `M ${vertexX} ${axisY} 
                                   A ${R} ${R} 0 0 ${isConcave ? 1 : 0} ${vertexX + (isConcave ? -10 : 10)} ${axisY - 50}`;
                      // Simple arc for UI
                      return (
                        <path 
                          d={isConcave ? `M ${vertexX-15} 50 Q ${vertexX} 150 ${vertexX-15} 250` : `M ${vertexX+15} 50 Q ${vertexX} 150 ${vertexX+15} 250`}
                          fill="none" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" 
                        />
                      );
                    })()}
                  </g>
                )}

                {/* Cardinal Points */}
                {mirrorType !== 'flat' && (
                  <g>
                    <circle cx={vertexX - focalLengthCm * pxScale} cy={axisY} r="4" fill="#f59e0b" />
                    <text x={vertexX - focalLengthCm * pxScale} y={axisY + 20} textAnchor="middle" fill="#f59e0b" className="text-[10px] font-bold">F</text>
                    <circle cx={vertexX - focalLengthCm * 2 * pxScale} cy={axisY} r="4" fill="#10b981" />
                    <text x={vertexX - focalLengthCm * 2 * pxScale} y={axisY + 20} textAnchor="middle" fill="#10b981" className="text-[10px] font-bold">C</text>
                  </g>
                )}

                {/* Object */}
                <g transform={`translate(${vertexX - objectDistanceCm * pxScale}, ${axisY})`}>
                  <line x1="0" y1="0" x2="0" y2={-objectHeightCm * pxScale} stroke="#38bdf8" strokeWidth="4" />
                  <path d={`M -5 ${-objectHeightCm * pxScale + 10} L 0 ${-objectHeightCm * pxScale} L 5 ${-objectHeightCm * pxScale + 10}`} fill="none" stroke="#38bdf8" strokeWidth="2" />
                  <text y={-objectHeightCm * pxScale - 10} textAnchor="middle" fill="#38bdf8" className="text-[10px] font-bold">Obj</text>
                </g>

                {/* Image */}
                {Math.abs(result.imageDistanceCm) < 100 && (
                  <g transform={`translate(${vertexX - result.imageDistanceCm * pxScale}, ${axisY})`}>
                    <line 
                      x1="0" y1="0" 
                      x2="0" y2={-result.imageHeightCm * pxScale} 
                      stroke={result.isReal ? "#ef4444" : "#a855f7"} 
                      strokeWidth="3" 
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

                {/* Principal Rays (Conceptual) */}
                <g opacity="0.3">
                   {/* Ray 1: Parallel then through F */}
                   <line x1={vertexX - objectDistanceCm * pxScale} y1={axisY - objectHeightCm * pxScale} x2={vertexX} y2={axisY - objectHeightCm * pxScale} stroke="#fbbf24" strokeWidth="1" />
                   {mirrorType === 'concave' && (
                     <line x1={vertexX} y1={axisY - objectHeightCm * pxScale} x2={vertexX - focalLengthCm * pxScale * 2} y2={axisY + (objectHeightCm * pxScale)} stroke="#fbbf24" strokeWidth="1" />
                   )}
                </g>

                <DiagramLabel x={vertexX} y={260} text={mirrorType === 'concave' ? "Concave Mirror" : mirrorType === 'convex' ? "Convex Mirror" : "Flat Mirror"} color="blue" />
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
                  { symbol: 'f', value: mirrorType === 'concave' ? focalLengthCm : -focalLengthCm, unit: 'cm' },
                  { symbol: 'u', value: objectDistanceCm, unit: 'cm' },
                ]}
                result={`${result.imageDistanceCm.toFixed(1)} cm`}
              />
              
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-center">
                 <p className="text-[11px] text-slate-400 font-bold mb-2">صفات الصورة:</p>
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
              <p>البعد البؤري للمرآة المقعرة موجب والمحدبة سالب في القانون العام.</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                حسب منهاج الرابع العلمي: تتكون صورة حقيقية عندما تلتقي الأشعة المنعكسة نفسها، وخيالية عندما تلتقي امتداداتها خلف المرآة.
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <SimulationControls onReset={handleReset}>
              {mirrorType !== 'flat' && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-400">
                    <span>البعد البؤري (f)</span>
                    <span className="text-amber-500 font-mono">{focalLengthCm} cm</span>
                  </div>
                  <input type="range" min="10" max="30" step="1" value={focalLengthCm} onChange={(e) => setFocalLengthCm(parseInt(e.target.value))} className="w-full accent-amber-500" />
                </div>
              )}

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

export default MirrorsSimulation;
