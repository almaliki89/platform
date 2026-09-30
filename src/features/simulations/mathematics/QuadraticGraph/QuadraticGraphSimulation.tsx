import React, { useState } from 'react';
import { Calculator, Sliders, RotateCcw, Info, TrendingUp } from 'lucide-react';

export const QuadraticGraphSimulation: React.FC = () => {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(0);
  const [c, setC] = useState<number>(-4);

  // Vertex calculation: x = -b / (2a)
  const vertexX = a !== 0 ? Number((-b / (2 * a)).toFixed(2)) : 0;
  const vertexY = Number((a * vertexX * vertexX + b * vertexX + c).toFixed(2));
  const discriminant = Number((b * b - 4 * a * c).toFixed(2));

  const handleReset = () => {
    setA(1);
    setB(0);
    setC(-4);
  };

  // Generate SVG path points for parabola from x = -10 to 10
  const width = 400;
  const height = 400;
  const scaleX = 20; // pixels per unit
  const scaleY = 20;
  const originX = width / 2;
  const originY = height / 2;

  const points: string[] = [];
  for (let px = 0; px <= width; px += 2) {
    const mathX = (px - originX) / scaleX;
    const mathY = a * mathX * mathX + b * mathX + c;
    const py = originY - mathY * scaleY;
    points.push(`${px},${py}`);
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-semibold text-sm mb-1">
            <Calculator className="w-4 h-4" />
            <span>محاكاة رياضية تفاعلية • الرياضيات للمرحلة المتوسطة</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">الدالة التربيعية والقطع المكافئ (y = ax² + bx + c)</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            تحكم بمعاملات الدالة التربيعية وشاهد تأثيرها اللحظي على شكل الرسم البياني وإحداثيات رأس القطع.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all self-start md:self-auto"
        >
          <RotateCcw className="w-4 h-4" />
          <span>إعادة ضبط</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-6">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
            <Sliders className="w-5 h-5 text-violet-500" />
            <span>معاملات الدالة (Coefficients)</span>
          </div>

          {/* Parameter a */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-700 dark:text-slate-300 font-medium">المعامل (a)</span>
              <span className="bg-violet-100 dark:bg-violet-950 text-violet-800 dark:text-violet-300 font-bold px-2.5 py-0.5 rounded-lg text-xs font-mono">
                {a}
              </span>
            </div>
            <input
              type="range"
              min="-4"
              max="4"
              step="0.5"
              value={a}
              onChange={(e) => setA(Number(e.target.value))}
              className="w-full accent-violet-600 cursor-pointer"
            />
            <div className="text-xs text-slate-400">إذا كان a موجباً فالفتحة نحو الأعلى، وإذا سالباً نحو الأسفل.</div>
          </div>

          {/* Parameter b */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-700 dark:text-slate-300 font-medium">المعامل (b)</span>
              <span className="bg-violet-100 dark:bg-violet-950 text-violet-800 dark:text-violet-300 font-bold px-2.5 py-0.5 rounded-lg text-xs font-mono">
                {b}
              </span>
            </div>
            <input
              type="range"
              min="-10"
              max="10"
              step="1"
              value={b}
              onChange={(e) => setB(Number(e.target.value))}
              className="w-full accent-violet-600 cursor-pointer"
            />
          </div>

          {/* Parameter c */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-700 dark:text-slate-300 font-medium">الحد المطلق (c)</span>
              <span className="bg-violet-100 dark:bg-violet-950 text-violet-800 dark:text-violet-300 font-bold px-2.5 py-0.5 rounded-lg text-xs font-mono">
                {c}
              </span>
            </div>
            <input
              type="range"
              min="-10"
              max="10"
              step="1"
              value={c}
              onChange={(e) => setC(Number(e.target.value))}
              className="w-full accent-violet-600 cursor-pointer"
            />
            <div className="text-xs text-slate-400">المقطع الصادي للرسم البياني عند (0, c).</div>
          </div>

          {/* Calculated Properties */}
          <div className="bg-violet-950/10 dark:bg-violet-900/20 p-4 rounded-xl border border-violet-200 dark:border-violet-800/50 space-y-2">
            <div className="text-xs text-violet-700 dark:text-violet-400 font-semibold">خصائص القطع المكافئ:</div>
            <div className="text-sm font-mono text-slate-800 dark:text-slate-200 flex justify-between">
              <span>رأس القطع (Vertex):</span>
              <span className="font-bold">({vertexX}, {vertexY})</span>
            </div>
            <div className="text-sm font-mono text-slate-800 dark:text-slate-200 flex justify-between">
              <span>المميز (Δ = b² - 4ac):</span>
              <span className="font-bold">{discriminant}</span>
            </div>
          </div>
        </div>

        {/* Graph Stage */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center bg-slate-950 rounded-2xl p-6 relative overflow-hidden min-h-[380px]">
          {/* Equation Header Badge */}
          <div className="absolute top-4 right-4 z-10 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-800 text-white font-mono text-sm">
            y = {a}x² {b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}x {c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`}
          </div>

          {/* SVG Cartesian Coordinate System */}
          <div className="w-full flex items-center justify-center py-4">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[380px] h-[320px] bg-slate-900/40 rounded-xl border border-slate-800">
              {/* Grid Lines */}
              {[-6, -4, -2, 2, 4, 6].map((n) => (
                <g key={n}>
                  <line
                    x1={originX + n * scaleX}
                    y1={0}
                    x2={originX + n * scaleX}
                    y2={height}
                    stroke="#334155"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1={0}
                    y1={originY + n * scaleY}
                    x2={width}
                    y2={originY + n * scaleY}
                    stroke="#334155"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                </g>
              ))}

              {/* Axes */}
              <line x1={0} y1={originY} x2={width} y2={originY} stroke="#64748b" strokeWidth="2" />
              <line x1={originX} y1={0} x2={originX} y2={height} stroke="#64748b" strokeWidth="2" />

              {/* Parabola Curve */}
              {a !== 0 && (
                <polyline
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="3"
                  points={points.join(' ')}
                />
              )}

              {/* Vertex Point */}
              <circle
                cx={originX + vertexX * scaleX}
                cy={originY - vertexY * scaleY}
                r="6"
                fill="#f43f5e"
                stroke="#fff"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800 w-full mt-2">
            <Info className="w-4 h-4 text-violet-400 shrink-0" />
            <span>النقطة الحمراء تمثل رأس القطع المكافئ (Vertex). تظهر تقاطع الدالة مع المحاور الإحداثية.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
