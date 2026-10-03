import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateThinLensOptics } from './calculations';
import { LensType } from './types';
import { Eye, Sparkles, Layers, RotateCcw, ZoomIn } from 'lucide-react';

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

    // Dark background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    // Subtle optical grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
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

    const lensX = width / 2;
    const axisY = height / 2;
    const pxScale = 3.2; // 1 cm = 3.2 px

    // Principal Axis
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(20, axisY);
    ctx.lineTo(width - 20, axisY);
    ctx.stroke();

    // Lens Drawing
    const lensH = 190;
    const isConv = lensType === 'converging';

    ctx.save();
    ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    if (isConv) {
      // Double Convex: curved outward
      ctx.ellipse(lensX, axisY, 14, lensH / 2, 0, 0, Math.PI * 2);
    } else {
      // Double Concave: hourglass shape
      ctx.moveTo(lensX - 12, axisY - lensH / 2);
      ctx.lineTo(lensX + 12, axisY - lensH / 2);
      ctx.quadraticCurveTo(lensX + 4, axisY, lensX + 12, axisY + lensH / 2);
      ctx.lineTo(lensX - 12, axisY + lensH / 2);
      ctx.quadraticCurveTo(lensX - 4, axisY, lensX - 12, axisY - lensH / 2);
    }
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Central line of the lens
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(lensX, axisY - lensH / 2 - 10);
    ctx.lineTo(lensX, axisY + lensH / 2 + 10);
    ctx.stroke();
    ctx.setLineDash([]);

    // Optical Center O
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(lensX, axisY, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '10px monospace';
    ctx.fillText('O', lensX - 4, axisY + 14);

    // Focal Points F1 (left) and F2 (right), and 2F1, 2F2
    const fDistPx = Math.abs(result.focalLengthCm) * pxScale;
    const f1X = lensX - fDistPx;
    const f2X = lensX + fDistPx;
    const f1_2X = lensX - fDistPx * 2;
    const f2_2X = lensX + fDistPx * 2;

    const drawPoint = (x: number, label: string, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, axisY, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText(label, x - 6, axisY + 16);
    };

    drawPoint(f1X, 'F₁', '#f59e0b');
    drawPoint(f2X, 'F₂', '#f59e0b');
    drawPoint(f1_2X, '2F₁', '#10b981');
    drawPoint(f2_2X, '2F₂', '#10b981');

    // Object Arrow (to the left of lens)
    const objX = lensX - result.objectDistanceCm * pxScale;
    const objTopY = axisY - result.objectHeightCm * pxScale;

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(objX, axisY);
    ctx.lineTo(objX, objTopY);
    ctx.stroke();

    // Object Arrowhead
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(objX, objTopY);
    ctx.lineTo(objX - 6, objTopY + 10);
    ctx.lineTo(objX + 6, objTopY + 10);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`الجسم (u = ${result.objectDistanceCm}cm)`, objX, objTopY - 10);

    // Image Arrow & Ray Tracing (if not infinite)
    if (Math.abs(result.imageDistanceCm) < 500) {
      // In thin lens sign convention:
      // positive v is on the right side of the lens (lensX + v)
      // negative v is on the left side of the lens (lensX + v, since v < 0)
      const imgX = lensX + result.imageDistanceCm * pxScale;
      const imgTopY = axisY - result.imageHeightCm * pxScale;

      ctx.strokeStyle = result.isReal ? '#ef4444' : '#a855f7';
      ctx.lineWidth = 3;
      if (!result.isReal) ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(imgX, axisY);
      ctx.lineTo(imgX, imgTopY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Image Arrowhead
      ctx.fillStyle = result.isReal ? '#ef4444' : '#a855f7';
      ctx.beginPath();
      const headDir = result.isInverted ? 1 : -1;
      ctx.moveTo(imgX, imgTopY);
      ctx.lineTo(imgX - 5, imgTopY + headDir * 8);
      ctx.lineTo(imgX + 5, imgTopY + headDir * 8);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = result.isReal ? '#ef4444' : '#c084fc';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(
        `الصورة (${result.isReal ? 'حقيقية' : 'خيالية'}: v = ${result.imageDistanceCm.toFixed(1)}cm)`,
        imgX,
        result.isInverted ? imgTopY + 18 : imgTopY - 10
      );

      // Ray 1: Parallel to axis -> refracts through focus
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.85)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(objX, objTopY);
      ctx.lineTo(lensX, objTopY);
      if (isConv) {
        ctx.lineTo(imgX, imgTopY);
        ctx.stroke();
        // Dashed extension if virtual
        if (!result.isReal) {
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(lensX, objTopY);
          ctx.lineTo(imgX, imgTopY);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      } else {
        // Diverging ray appears to come from F1
        ctx.stroke();
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(f1X, axisY);
        ctx.lineTo(lensX, objTopY);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Ray 2: Through optical center O straight through
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(objX, objTopY);
      ctx.lineTo(lensX, axisY);
      ctx.lineTo(imgX, imgTopY);
      ctx.stroke();
    } else {
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('أشعة منكسرة متوازية — تتكون الصورة في المالانهاية ∞', width / 2, 40);
    }
  }, [lensType, focalLengthCm, objectDistanceCm, objectHeightCm, result]);

  const handleReset = () => {
    setLensType('converging');
    setFocalLengthCm(20);
    setObjectDistanceCm(35);
    setObjectHeightCm(15);
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'بعد الصورة (v)',
      value:
        Math.abs(result.imageDistanceCm) > 500
          ? '∞ (مالانهاية)'
          : `${result.imageDistanceCm.toFixed(1)} cm`,
      color: result.isReal ? 'emerald' : 'purple',
    },
    {
      label: 'قدرة العدسة (P)',
      value: `${result.powerDiopter > 0 ? '+' : ''}${result.powerDiopter.toFixed(2)} D`,
      color: 'cyan',
    },
    {
      label: 'التكبير (M)',
      value:
        Math.abs(result.magnification) > 50
          ? '∞'
          : `${result.magnification.toFixed(2)}x`,
      color: 'amber',
    },
    {
      label: 'طبيعة الصورة',
      value: result.isReal ? 'حقيقية مقلوبة' : 'خيالية معتدلة',
      color: 'slate',
    },
  ];

  return (
    <SimulationShell
      title="مختبر العدسات الرقيقة والمنظومات البصرية"
      subtitle="الفصل الثامن — العدسات المحدبة والمقعرة، قانون العدسات العام، التكبير، والقدرة بالديوبتر (P = 1/f)"
      badge="الصف الرابع العلمي"
      topic="العدسات الرقيقة والقدرة بالديوبتر"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Optical Bench Canvas & Math */}
        <div className="lg:col-span-2 space-y-4">
          <SimulationHUD metrics={hudMetrics} />

          <div className="relative bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl">
            {/* Lens Type Buttons */}
            <div className="flex flex-wrap items-center gap-2 mb-4 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80">
              <button
                onClick={() => setLensType('converging')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  lensType === 'converging'
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                عدسة محدبة — مجمعة (Converging Convex)
              </button>
              <button
                onClick={() => setLensType('diverging')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  lensType === 'diverging'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                عدسة مقعرة — مفرقة (Diverging Concave)
              </button>
            </div>

            <canvas
              ref={canvasRef}
              width={640}
              height={320}
              className="w-full h-auto rounded-xl bg-slate-950 border border-slate-800/80 block"
            />
          </div>

          {/* Formulas and Insight */}
          <div className="bg-slate-900/70 rounded-xl border border-slate-800 p-4 text-xs text-slate-300 space-y-3">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>المعادلات البصرية للعدسات الرقيقة:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-sky-300">
                1 / f = 1 / u + 1 / v
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-amber-300">
                M = -v / u = h_i / h_o
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-emerald-300">
                P = 1 / f(m) &nbsp;[Diopter]
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg space-y-1">
              <span className="text-slate-400 text-xs">وصف الصورة المتكونة:</span>
              <p className="text-sm font-semibold text-sky-300">{result.imageNatureAr}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls onReset={handleReset}>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>البعد البؤري (|f|):</span>
                <span className="text-amber-400 font-mono">{focalLengthCm} cm (P = {result.powerDiopter.toFixed(2)} D)</span>
              </div>
              <input
                type="range"
                min="10"
                max="35"
                step="1"
                value={focalLengthCm}
                onChange={(e) => setFocalLengthCm(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>بعد الجسم عن العدسة (u):</span>
                <span className="text-sky-400 font-mono">{objectDistanceCm} cm</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="1"
                value={objectDistanceCm}
                onChange={(e) => setObjectDistanceCm(parseInt(e.target.value))}
                className="w-full accent-sky-500"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>طول الجسم (h_o):</span>
                <span className="text-emerald-400 font-mono">{objectHeightCm} cm</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                step="1"
                value={objectHeightCm}
                onChange={(e) => setObjectHeightCm(parseInt(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Quick Application Presets */}
            {lensType === 'converging' && (
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <label className="text-xs font-medium text-slate-400">تطبيقات بصرية واقعية:</label>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <button
                    onClick={() => setObjectDistanceCm(focalLengthCm * 2.5)}
                    className="p-1.5 bg-slate-950 text-slate-300 hover:text-white rounded border border-slate-800 text-right"
                  >
                    كاميرا / عين (u &gt; 2f)
                  </button>
                  <button
                    onClick={() => setObjectDistanceCm(focalLengthCm * 2)}
                    className="p-1.5 bg-slate-950 text-slate-300 hover:text-white rounded border border-slate-800 text-right"
                  >
                    ناسخة بنفس الحجم (u = 2f)
                  </button>
                  <button
                    onClick={() => setObjectDistanceCm(focalLengthCm * 1.5)}
                    className="p-1.5 bg-slate-950 text-slate-300 hover:text-white rounded border border-slate-800 text-right"
                  >
                    مسلاط بروجكتر (f &lt; u &lt; 2f)
                  </button>
                  <button
                    onClick={() => setObjectDistanceCm(focalLengthCm * 0.5)}
                    className="p-1.5 bg-slate-950 text-slate-300 hover:text-white rounded border border-slate-800 text-right"
                  >
                    مكبرة يدوية (u &lt; f)
                  </button>
                </div>
              </div>
            )}
          </SimulationControls>
        </div>
      </div>
    </SimulationShell>
  );
};

export default ThinLensesSimulation;
