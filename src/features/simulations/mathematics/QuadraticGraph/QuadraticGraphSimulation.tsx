import React, { useState } from 'react';
import { SimulationShell } from '../../core/SimulationShell';
import { SimulationControls } from '../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../core/SimulationHUD';
import { analyzeQuadratic } from './calculations';
import { createCoordinateMapper, generateCurvePoints, DEFAULT_GRAPH_BOUNDS } from './graph';
import { Calculator, Sliders, RotateCcw, Info, TrendingUp, AlertTriangle } from 'lucide-react';

export const QuadraticGraphSimulation: React.FC = () => {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(0);
  const [c, setC] = useState<number>(-4);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showVertex, setShowVertex] = useState<boolean>(true);
  const [showRoots, setShowRoots] = useState<boolean>(true);

  const analysis = analyzeQuadratic(a, b, c);

  const handleReset = () => {
    setA(1);
    setB(0);
    setC(-4);
  };

  const svgWidth = 600;
  const svgHeight = 420;
  const bounds = DEFAULT_GRAPH_BOUNDS;
  const { toSvgX, toSvgY } = createCoordinateMapper(svgWidth, svgHeight, bounds);

  // Generate curve path
  const curvePoints = generateCurvePoints(a, b, c, bounds, 180);
  const pathD = curvePoints
    .map((pt, idx) => {
      const sx = toSvgX(pt.x);
      const sy = toSvgY(pt.y);
      return `${idx === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`;
    })
    .join(' ');

  // Grid tick numbers
  const xTicks = [-6, -4, -2, 2, 4, 6];
  const yTicks = [-8, -4, 4, 8, 12];

  const metrics: HUDMetric[] = [
    {
      label: 'المميز العام (Δ)',
      value: analysis.rootsResult.discriminant.toFixed(1),
      unit: '',
      color:
        analysis.rootsResult.discriminant > 0
          ? 'text-emerald-500 dark:text-emerald-400'
          : analysis.rootsResult.discriminant === 0
          ? 'text-amber-500 dark:text-amber-400'
          : 'text-rose-500 dark:text-rose-400',
      formula: 'Δ = b² - 4ac',
    },
    {
      label: 'رأس المنحنى (Vertex)',
      value: analysis.vertex
        ? `(${analysis.vertex.x.toFixed(2)}, ${analysis.vertex.y.toFixed(2)})`
        : 'غير متوفر',
      color: 'text-violet-500 dark:text-violet-400',
      formula: '(-b/2a, f(h))',
    },
    {
      label: 'محور التناظر',
      value: analysis.axisOfSymmetry !== null ? `x = ${analysis.axisOfSymmetry.toFixed(2)}` : 'غير متوفر',
      color: 'text-cyan-500 dark:text-cyan-400',
      formula: 'x = -b/2a',
    },
    {
      label: 'اتجاه فتحة المنحنى',
      value:
        analysis.direction === 'upward'
          ? 'للأعلى ∪ (a > 0)'
          : analysis.direction === 'downward'
          ? 'للأسفل ∩ (a < 0)'
          : 'مستقيم خطي (a = 0)',
      color: 'text-blue-500 dark:text-blue-400',
    },
  ];

  return (
    <SimulationShell
      title="منحنى الدالة التربيعية ودراسة المميز"
      subjectTitle="الرياضيات • الجبر والهندسة الإحداثية"
      topic="الدوال التربيعية وحل المعادلات بالدستور"
      grade="الصف الثالث المتوسط والصف الرابع العلمي"
      description="مختبر رياضي تفاعلي لتحليل معادلة القطع المكافئ y = ax² + bx + c واستكشاف علاقة المعاملات بإحداثيات الرأس، محور التناظر، والمميز Δ."
      learningObjectives={[
        'استيعاب تأثير إشارة المعامل (a) على اتجاه فتحة المنحنى وتمدده',
        'ربط قيمة المميز (Δ) بعدد وطبيعة جذور المعادلة بيانيا وجبرياً',
        'تحديد نقطة رأس المنحنى (القيمة الصغرى أو العظمى للدالة)',
        'استنتاج معادلة محور التناظر ونقاط التقاطع مع المحاور',
      ]}
      educationalNote={
        <div className="space-y-2.5">
          <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900 text-center space-y-1">
            <span className="text-xs text-slate-500">الصيغة العامة للدالة التربيعية:</span>
            <div className="font-mono font-bold text-sm text-indigo-600 dark:text-indigo-400">
              f(x) = ax² + bx + c
            </div>
          </div>
          <div className="space-y-1 text-slate-700 dark:text-slate-300">
            <p className="font-bold">قانون المميز الوزاري (Δ):</p>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
              <li><strong className="text-emerald-600 dark:text-emerald-400">Δ &gt; 0:</strong> جذران حقيقيان نسبيان أو غير نسبيين (يقطع محور x مرتين).</li>
              <li><strong className="text-amber-600 dark:text-amber-400">Δ = 0:</strong> جذر حقيقي واحد مكرر (يمس محور x في نقطة الرأس).</li>
              <li><strong className="text-rose-600 dark:text-rose-400">Δ &lt; 0:</strong> جذران غير حقيقيين مركبين (لا يمس ولا يقطع محور x).</li>
            </ul>
          </div>
        </div>
      }
      visualization={
        <div className="space-y-3">
          {/* Equation & Status Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 text-white p-3.5 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">المعادلة الحالية:</span>
              <span className="font-mono text-base font-bold text-amber-400" dir="ltr">
                {analysis.equationString}
              </span>
            </div>
            {!analysis.isQuadratic && (
              <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-800">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>ليست دالة تربيعية لأن a = 0 (معادلة خطية)</span>
              </div>
            )}
          </div>

          {/* SVG Graph */}
          <div className="relative w-full bg-slate-950 border border-slate-800 rounded-2xl p-2 sm:p-4 overflow-hidden">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto max-h-[420px] select-none"
              style={{ minHeight: '260px' }}
            >
              <defs>
                <clipPath id="graph-clip">
                  <rect x="0" y="0" width={svgWidth} height={svgHeight} rx="12" />
                </clipPath>
              </defs>

              <g clipPath="url(#graph-clip)">
                {/* Background Grid */}
                {showGrid && (
                  <g stroke="#1e293b" strokeWidth="1">
                    {xTicks.map((x) => (
                      <line
                        key={`gx-${x}`}
                        x1={toSvgX(x)}
                        y1={0}
                        x2={toSvgX(x)}
                        y2={svgHeight}
                        strokeDasharray="3 3"
                      />
                    ))}
                    {yTicks.map((y) => (
                      <line
                        key={`gy-${y}`}
                        x1={0}
                        y1={toSvgY(y)}
                        x2={svgWidth}
                        y2={toSvgY(y)}
                        strokeDasharray="3 3"
                      />
                    ))}
                  </g>
                )}

                {/* X & Y Axes */}
                <line
                  x1={0}
                  y1={toSvgY(0)}
                  x2={svgWidth}
                  y2={toSvgY(0)}
                  stroke="#475569"
                  strokeWidth="2"
                />
                <line
                  x1={toSvgX(0)}
                  y1={0}
                  x2={toSvgX(0)}
                  y2={svgHeight}
                  stroke="#475569"
                  strokeWidth="2"
                />

                {/* Axis Labels & Ticks */}
                {xTicks.map((x) => (
                  <g key={`tx-${x}`}>
                    <line
                      x1={toSvgX(x)}
                      y1={toSvgY(0) - 4}
                      x2={toSvgX(x)}
                      y2={toSvgY(0) + 4}
                      stroke="#64748b"
                      strokeWidth="1.5"
                    />
                    <text
                      x={toSvgX(x)}
                      y={toSvgY(0) + 16}
                      fill="#94a3b8"
                      fontSize="10"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {x}
                    </text>
                  </g>
                ))}

                {yTicks.map((y) => (
                  <g key={`ty-${y}`}>
                    <line
                      x1={toSvgX(0) - 4}
                      y1={toSvgY(y)}
                      x2={toSvgX(0) + 4}
                      y2={toSvgY(y)}
                      stroke="#64748b"
                      strokeWidth="1.5"
                    />
                    <text
                      x={toSvgX(0) - 8}
                      y={toSvgY(y) + 3}
                      fill="#94a3b8"
                      fontSize="10"
                      textAnchor="end"
                      fontFamily="monospace"
                    >
                      {y}
                    </text>
                  </g>
                ))}

                {/* Axis of Symmetry (Dashed Line) */}
                {analysis.axisOfSymmetry !== null && (
                  <line
                    x1={toSvgX(analysis.axisOfSymmetry)}
                    y1={0}
                    x2={toSvgX(analysis.axisOfSymmetry)}
                    y2={svgHeight}
                    stroke="#06b6d4"
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                  />
                )}

                {/* Main Parabola Curve */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Vertex Point */}
                {showVertex && analysis.vertex && (
                  <g>
                    <circle
                      cx={toSvgX(analysis.vertex.x)}
                      cy={toSvgY(analysis.vertex.y)}
                      r="6"
                      fill="#ec4899"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <text
                      x={toSvgX(analysis.vertex.x) + 10}
                      y={toSvgY(analysis.vertex.y) - 8}
                      fill="#f472b6"
                      fontSize="11"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      رأس ({analysis.vertex.x.toFixed(1)}, {analysis.vertex.y.toFixed(1)})
                    </text>
                  </g>
                )}

                {/* Real Roots Points (X-intercepts) */}
                {showRoots &&
                  analysis.rootsResult.roots.map((root, i) => (
                    <g key={`root-${i}`}>
                      <circle
                        cx={toSvgX(root)}
                        cy={toSvgY(0)}
                        r="5"
                        fill="#10b981"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                      <text
                        x={toSvgX(root)}
                        y={toSvgY(0) - 10}
                        fill="#34d399"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        x{i + 1} = {root.toFixed(2)}
                      </text>
                    </g>
                  ))}

                {/* Y-intercept Point */}
                <g>
                  <circle
                    cx={toSvgX(0)}
                    cy={toSvgY(c)}
                    r="4"
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
      }
      controls={
        <SimulationControls onReset={handleReset}>
          {/* Coefficient a */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="coeff-a">معامل x² (المعامل a):</label>
              <span className="font-mono text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 px-2 py-0.5 rounded text-sm font-black">
                {a}
              </span>
            </div>
            <input
              id="coeff-a"
              type="range"
              min="-5"
              max="5"
              step="0.5"
              value={a}
              onChange={(e) => setA(parseFloat(e.target.value))}
              className="w-full accent-violet-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>-5 (مقلوب للأسفل)</span>
              <span>0 (خطي)</span>
              <span>+5 (للأعلى)</span>
            </div>
          </div>

          {/* Coefficient b */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="coeff-b">معامل x (المعامل b):</label>
              <span className="font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded text-sm font-black">
                {b}
              </span>
            </div>
            <input
              id="coeff-b"
              type="range"
              min="-10"
              max="10"
              step="1"
              value={b}
              onChange={(e) => setB(parseFloat(e.target.value))}
              className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>-10</span>
              <span>0</span>
              <span>+10</span>
            </div>
          </div>

          {/* Coefficient c */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="coeff-c">الحد المطلق (المعامل c):</label>
              <span className="font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded text-sm font-black">
                {c}
              </span>
            </div>
            <input
              id="coeff-c"
              type="range"
              min="-10"
              max="10"
              step="1"
              value={c}
              onChange={(e) => setC(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>-10</span>
              <span>0</span>
              <span>+10</span>
            </div>
          </div>

          {/* Visibility Toggles */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-all ${
                showGrid
                  ? 'bg-slate-800 text-white border-slate-700'
                  : 'bg-slate-100 dark:bg-slate-800/40 text-slate-500 border-slate-200 dark:border-slate-700'
              }`}
            >
              {showGrid ? '✓ الشبكة مفعلة' : 'إخفاء الشبكة'}
            </button>
            <button
              onClick={() => setShowVertex(!showVertex)}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-all ${
                showVertex
                  ? 'bg-pink-600 text-white border-pink-500'
                  : 'bg-slate-100 dark:bg-slate-800/40 text-slate-500 border-slate-200 dark:border-slate-700'
              }`}
            >
              {showVertex ? '✓ نقطة الرأس' : 'إخفاء الرأس'}
            </button>
            <button
              onClick={() => setShowRoots(!showRoots)}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-all ${
                showRoots
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-100 dark:bg-slate-800/40 text-slate-500 border-slate-200 dark:border-slate-700'
              }`}
            >
              {showRoots ? '✓ الجذور (التقاطعات)' : 'إخفاء الجذور'}
            </button>
          </div>
        </SimulationControls>
      }
      outputs={<SimulationHUD metrics={metrics} />}
      extraPanels={
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl text-xs space-y-2">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-500" />
            <span>التحليل الجبري وحالة الجذور:</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {analysis.rootsResult.explanationAr}
          </p>
        </div>
      }
      onReset={handleReset}
    />
  );
};
