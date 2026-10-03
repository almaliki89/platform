import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateVectorsState } from './calculations';
import { VectorMode } from './types';
import { Compass, Sparkles, Plus, Minus, MoveRight, RotateCcw } from 'lucide-react';

export const VectorsSimulation: React.FC = () => {
  const [mode, setMode] = useState<VectorMode>('addition');

  // Vector A
  const [magA, setMagA] = useState<number>(50);
  const [angleA, setAngleA] = useState<number>(37); // Classic 37° (3-4-5 triangle)

  // Vector B
  const [magB, setMagB] = useState<number>(40);
  const [angleB, setAngleB] = useState<number>(120);

  const result = calculateVectorsState(magA, angleA, magB, angleB, mode);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Dark grid background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    const originX = width / 2;
    const originY = height / 2;
    const scale = 2.2; // 1 unit = 2.2 pixels

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 25) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 25) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    // X Axis
    ctx.beginPath();
    ctx.moveTo(30, originY);
    ctx.lineTo(width - 30, originY);
    ctx.stroke();
    // Y Axis
    ctx.beginPath();
    ctx.moveTo(originX, 30);
    ctx.lineTo(originX, height - 30);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('+X', width - 15, originY - 8);
    ctx.fillText('-X', 25, originY - 8);
    ctx.textAlign = 'center';
    ctx.fillText('+Y', originX + 15, 20);
    ctx.fillText('-Y', originX + 15, height - 12);

    // Helper to draw an arrow
    const drawArrow = (
      fromX: number,
      fromY: number,
      toX: number,
      toY: number,
      color: string,
      lineWidth: number = 3
    ) => {
      const headLen = 10;
      const angle = Math.atan2(toY - fromY, toX - fromX);

      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = lineWidth;

      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(toX, toY);
      ctx.lineTo(
        toX - headLen * Math.cos(angle - Math.PI / 6),
        toY - headLen * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        toX - headLen * Math.cos(angle + Math.PI / 6),
        toY - headLen * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fill();
    };

    // Vector coordinates on canvas (Y is inverted in canvas: up is negative y)
    const ax = originX + result.vectorA.x * scale;
    const ay = originY - result.vectorA.y * scale;

    const bx = originX + result.vectorB.x * scale;
    const by = originY - result.vectorB.y * scale;

    const rx = originX + result.resultant.x * scale;
    const ry = originY - result.resultant.y * scale;

    // Cross product area shading
    if (mode === 'cross-product') {
      const pCornerX = originX + (result.vectorA.x + result.vectorB.x) * scale;
      const pCornerY = originY - (result.vectorA.y + result.vectorB.y) * scale;

      ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);

      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(ax, ay);
      ctx.lineTo(pCornerX, pCornerY);
      ctx.lineTo(bx, by);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#c084fc';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        `مساحة متوازي الأضلاع = |A × B| = ${result.crossProductMagnitude.toFixed(1)}`,
        (originX + pCornerX) / 2,
        (originY + pCornerY) / 2
      );
    }

    // Component mode dashed projections
    if (mode === 'components') {
      // Ax on X axis
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(ax, originY);
      ctx.lineTo(ax, ay);
      ctx.lineTo(originX, ay);
      ctx.stroke();
      ctx.setLineDash([]);

      // Component markers
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`Ax = ${result.vectorA.x.toFixed(1)}`, ax, originY + 16);
      ctx.textAlign = 'right';
      ctx.fillText(`Ay = ${result.vectorA.y.toFixed(1)}`, originX - 10, ay + 4);
    }

    // Draw Vector A
    drawArrow(originX, originY, ax, ay, '#38bdf8', 3.5);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`A (${result.vectorA.magnitude} u, ${result.vectorA.angleDeg}°)`, ax + 8, ay - 6);

    // Draw Vector B (unless in components mode)
    if (mode !== 'components') {
      drawArrow(originX, originY, bx, by, '#f59e0b', 3.5);
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`B (${result.vectorB.magnitude} u, ${result.vectorB.angleDeg}°)`, bx + 8, by - 6);

      // In addition or subtraction: Draw Resultant Vector R
      if (mode === 'addition' || mode === 'subtraction') {
        // Draw head-to-tail dashed helper line
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (mode === 'addition') {
          // B from tip of A
          ctx.moveTo(ax, ay);
          ctx.lineTo(rx, ry);
        } else {
          // -B from tip of A
          ctx.moveTo(ax, ay);
          ctx.lineTo(rx, ry);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Resultant R arrow
        drawArrow(originX, originY, rx, ry, '#10b981', 4);
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText(
          `R = ${mode === 'addition' ? 'A + B' : 'A - B'} (${result.resultant.magnitude.toFixed(1)}, ${result.resultant.angleDeg.toFixed(1)}°)`,
          rx + 8,
          ry - 6
        );
      }
    }

    // Angle arcs
    const drawAngleArc = (angleDeg: number, radius: number, color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(originX, originY, radius, 0, -(angleDeg * Math.PI) / 180, true);
      ctx.stroke();
    };

    drawAngleArc(result.vectorA.angleDeg, 25, '#38bdf8');
    if (mode !== 'components') {
      drawAngleArc(result.vectorB.angleDeg, 35, '#f59e0b');
    }
  }, [mode, magA, angleA, magB, angleB, result]);

  const handleReset = () => {
    setMode('addition');
    setMagA(50);
    setAngleA(37);
    setMagB(40);
    setAngleB(120);
  };

  const hudMetrics: HUDMetric[] =
    mode === 'components'
      ? [
          {
            label: 'المقدار |A|',
            value: result.vectorA.magnitude.toFixed(1),
            color: 'text-sky-400',
          },
          {
            label: 'المركبة الأفقية (Ax)',
            value: result.vectorA.x.toFixed(2),
            formula: 'A·cos θ',
            color: 'text-cyan-400',
          },
          {
            label: 'المركبة الشاقولية (Ay)',
            value: result.vectorA.y.toFixed(2),
            formula: 'A·sin θ',
            color: 'text-cyan-400',
          },
          {
            label: 'زاوية الاتجاه (θ)',
            value: `${result.vectorA.angleDeg.toFixed(1)}°`,
            color: 'text-amber-400',
          },
        ]
      : mode === 'dot-product'
      ? [
          {
            label: 'الضرب النقطي (A · B)',
            value: result.dotProduct.toFixed(2),
            formula: '|A||B| cos θ',
            color: 'text-emerald-400',
          },
          {
            label: 'الزاوية المحصورة (θ)',
            value: `${result.angleBetweenDeg.toFixed(1)}°`,
            color: 'text-amber-400',
          },
          {
            label: 'نوع الناتج',
            value: 'كمية قياسية (عددي)',
            color: 'text-slate-300',
          },
          {
            label: 'حالة التعامد',
            value: Math.abs(result.dotProduct) < 0.1 ? 'متعامدان تماماً' : 'غير متعامدين',
            color: Math.abs(result.dotProduct) < 0.1 ? 'text-emerald-400' : 'text-slate-400',
          },
        ]
      : mode === 'cross-product'
      ? [
          {
            label: 'مقدار الضرب الاتجاهي |A × B|',
            value: result.crossProductMagnitude.toFixed(2),
            formula: '|A||B| sin θ',
            color: 'text-purple-400',
          },
          {
            label: 'اتجاه المتجه الناتج (n̂)',
            value: result.crossProductDirectionAr.split('(')[0],
            color: 'text-amber-400',
          },
          {
            label: 'الزاوية بينهما (θ)',
            value: `${result.angleBetweenDeg.toFixed(1)}°`,
            color: 'text-cyan-400',
          },
          {
            label: 'المساحة المحصورة',
            value: `${result.crossProductMagnitude.toFixed(1)} u²`,
            color: 'text-slate-300',
          },
        ]
      : [
          {
            label: 'مقدار المحصلة (|R|)',
            value: result.resultant.magnitude.toFixed(2),
            color: 'text-emerald-400',
          },
          {
            label: 'اتجاه المحصلة (θ_R)',
            value: `${result.resultant.angleDeg.toFixed(1)}°`,
            color: 'text-amber-400',
          },
          {
            label: 'مركبة المحصلة (Rx)',
            value: result.resultant.x.toFixed(2),
            color: 'text-cyan-400',
          },
          {
            label: 'مركبة المحصلة (Ry)',
            value: result.resultant.y.toFixed(2),
            color: 'text-cyan-400',
          },
        ];

  return (
    <SimulationShell
      title="مختبر المتجهات والعمليات الاتجاهية"
      subtitle="الفصل الأول — تحليل المتجهات، جمع وطرح المتجهات، الضرب القياسي (النقطي)، والضرب الاتجاهي"
      badge="الصف الخامس العلمي"
      topic="المتجهات"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Visual Canvas & Math Details */}
        <div className="lg:col-span-2 space-y-4">
          <SimulationHUD metrics={hudMetrics} />

          <div className="relative bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl">
            {/* Mode selection buttons */}
            <div className="flex flex-wrap items-center gap-2 mb-4 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80">
              <button
                onClick={() => setMode('addition')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'addition'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                جمع المتجهات (A + B)
              </button>
              <button
                onClick={() => setMode('subtraction')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'subtraction'
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Minus className="w-3.5 h-3.5" />
                طرح المتجهات (A - B)
              </button>
              <button
                onClick={() => setMode('components')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'components'
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MoveRight className="w-3.5 h-3.5" />
                تحليل المركبات (Ax, Ay)
              </button>
              <button
                onClick={() => setMode('dot-product')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'dot-product'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                الضرب النقطي (A · B)
              </button>
              <button
                onClick={() => setMode('cross-product')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'cross-product'
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                الضرب الاتجاهي (A × B)
              </button>
            </div>

            <canvas
              ref={canvasRef}
              width={640}
              height={340}
              className="w-full h-auto rounded-xl bg-slate-950 border border-slate-800/80 block"
            />
          </div>

          {/* Formulas and Insight */}
          <div className="bg-slate-900/70 rounded-xl border border-slate-800 p-4 text-xs text-slate-300 space-y-3">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>المعادلات الحاكمة للمتجهات:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-sky-300">
                Ax = A·cos θ &nbsp;|&nbsp; Ay = A·sin θ
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-emerald-300">
                R = √(Rx² + Ry²) &nbsp;|&nbsp; θ = tan⁻¹(Ry/Rx)
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-purple-300">
                A · B = |A||B| cos θ &nbsp;|&nbsp; |A × B| = |A||B| sin θ
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-amber-300">قاعدة الكف اليمنى (Right-Hand Rule):</span>
              <p className="leading-relaxed text-slate-400">
                عند تدوير أصابع الكف اليمنى من المتجه الأول (A) نحو المتجه الثاني (B) عبر الزاوية الأصغر بينهما، فإن الإبهام يشير إلى اتجاه المتجه العمودي الناتج (A × B).
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls onReset={handleReset}>
            {/* Vector A Controls */}
            <div className="p-3 bg-slate-950/80 rounded-xl border border-sky-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sky-400 text-xs">المتجه الأول (A):</span>
                <span className="text-[11px] font-mono text-slate-400">
                  [{result.vectorA.x.toFixed(1)}, {result.vectorA.y.toFixed(1)}]
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>المقدار (|A|):</span>
                  <span className="text-white font-mono">{magA}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={magA}
                  onChange={(e) => setMagA(parseInt(e.target.value))}
                  className="w-full accent-sky-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>زاوية الاتجاه (θ_A):</span>
                  <span className="text-amber-400 font-mono">{angleA}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={angleA}
                  onChange={(e) => setAngleA(parseInt(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>

            {/* Vector B Controls (if not components mode) */}
            {mode !== 'components' && (
              <div className="p-3 bg-slate-950/80 rounded-xl border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 text-xs">المتجه الثاني (B):</span>
                  <span className="text-[11px] font-mono text-slate-400">
                    [{result.vectorB.x.toFixed(1)}, {result.vectorB.y.toFixed(1)}]
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>المقدار (|B|):</span>
                    <span className="text-white font-mono">{magB}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={magB}
                    onChange={(e) => setMagB(parseInt(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>زاوية الاتجاه (θ_B):</span>
                    <span className="text-amber-400 font-mono">{angleB}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="1"
                    value={angleB}
                    onChange={(e) => setAngleB(parseInt(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>
            )}
          </SimulationControls>
        </div>
      </div>
    </SimulationShell>
  );
};

export default VectorsSimulation;
