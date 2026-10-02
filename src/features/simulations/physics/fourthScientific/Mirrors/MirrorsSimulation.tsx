import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateMirrorOptics } from './calculations';
import { MirrorType } from './types';
import { CircleDot, Sparkles, Layers, RotateCcw, Eye } from 'lucide-react';

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

    // Vertex V is located around 65% width to leave space in front of mirror
    const vertexX = width * 0.65;
    const axisY = height / 2;
    const pxScale = 3.5; // 1 cm = 3.5 px

    // Principal Axis
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(20, axisY);
    ctx.lineTo(width - 20, axisY);
    ctx.stroke();

    // Mirror drawing
    const mirrorH = 180;
    if (mirrorType === 'flat') {
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(vertexX, axisY - mirrorH / 2);
      ctx.lineTo(vertexX, axisY + mirrorH / 2);
      ctx.stroke();

      // Back hatches
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      for (let y = axisY - mirrorH / 2; y <= axisY + mirrorH / 2; y += 12) {
        ctx.beginPath();
        ctx.moveTo(vertexX, y);
        ctx.lineTo(vertexX + 10, y - 8);
        ctx.stroke();
      }
    } else {
      // Curved mirror arc
      const curvatureR = Math.abs(result.focalLengthCm) * 2 * pxScale;
      const isConcave = mirrorType === 'concave';

      ctx.save();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 5;
      ctx.beginPath();

      if (isConcave) {
        // Curve opens towards left
        ctx.arc(vertexX - curvatureR, axisY, curvatureR, -0.4, 0.4);
      } else {
        // Curve opens towards right
        ctx.arc(vertexX + curvatureR, axisY, curvatureR, Math.PI - 0.4, Math.PI + 0.4);
      }
      ctx.stroke();
      ctx.restore();
    }

    // Draw Cardinal points: Vertex (V), Focus (F), Center (C)
    if (mirrorType !== 'flat') {
      const fX = vertexX - result.focalLengthCm * pxScale;
      const cX = vertexX - result.radiusCurvatureCm * pxScale;

      // Draw V
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(vertexX, axisY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = '10px monospace';
      ctx.fillText('V', vertexX + 6, axisY + 14);

      // Draw F
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(fX, axisY, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText('F', fX - 4, axisY + 16);

      // Draw C
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(cX, axisY, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText('C (2F)', cX - 8, axisY + 16);
    }

    // Object Arrow (always to the left of Vertex)
    const objX = vertexX - result.objectDistanceCm * pxScale;
    const objTopY = axisY - result.objectHeightCm * pxScale;

    // Draw Object Arrow
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(objX, axisY);
    ctx.lineTo(objX, objTopY);
    ctx.stroke();

    // Arrowhead
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
      const imgX = vertexX - result.imageDistanceCm * pxScale;
      const imgTopY = axisY - result.imageHeightCm * pxScale;

      // Draw Image Arrow
      ctx.strokeStyle = result.isReal ? '#ef4444' : '#a855f7';
      ctx.lineWidth = 3;
      if (!result.isReal) ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(imgX, axisY);
      ctx.lineTo(imgX, imgTopY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Arrowhead for Image
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

      // Principal Rays Tracing for Concave / Convex
      if (mirrorType === 'concave') {
        const fX = vertexX - result.focalLengthCm * pxScale;

        // Ray 1: Parallel to axis, reflects through F
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.85)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(objX, objTopY);
        ctx.lineTo(vertexX, objTopY);
        ctx.lineTo(imgX, imgTopY);
        ctx.stroke();

        // If virtual, dashed extension behind mirror
        if (!result.isReal) {
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(vertexX, objTopY);
          ctx.lineTo(imgX, imgTopY);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Ray 2: Directed through Vertex V, reflects with equal angle
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.beginPath();
        ctx.moveTo(objX, objTopY);
        ctx.lineTo(vertexX, axisY);
        ctx.lineTo(imgX, imgTopY);
        ctx.stroke();
      }
    } else {
      // Infinite image note
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('أشعة منعكسة متوازية — تتكون الصورة في المالانهاية ∞', width / 2, 40);
    }
  }, [mirrorType, focalLengthCm, objectDistanceCm, objectHeightCm, result]);

  const handleReset = () => {
    setMirrorType('concave');
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
      label: 'التكبير (M)',
      value:
        Math.abs(result.magnification) > 50
          ? '∞'
          : `${result.magnification.toFixed(2)}x`,
      color: 'amber',
    },
    {
      label: 'طول الصورة (h_i)',
      value:
        Math.abs(result.imageHeightCm) > 500
          ? '∞'
          : `${Math.abs(result.imageHeightCm).toFixed(1)} cm`,
      color: 'cyan',
    },
    {
      label: 'صفة الصورة المتكونة',
      value: result.isReal ? 'حقيقية مقلوبة' : 'خيالية معتدلة',
      color: 'slate',
    },
  ];

  return (
    <SimulationShell
      title="مختبر المرايا الكروية والمستوية وتكون الصور"
      subtitle="الفصل السابع — قانون المرايا العام (1/f = 1/u + 1/v)، مسارات الأشعة الخاصة، وصفات الصور المتكونة"
      badge="الصف الرابع العلمي"
      topic="المرايا وتكون الصور"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Optical Bench Canvas & Analysis */}
        <div className="lg:col-span-2 space-y-4">
          <SimulationHUD metrics={hudMetrics} />

          <div className="relative bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl">
            {/* Mirror Type Buttons */}
            <div className="flex flex-wrap items-center gap-2 mb-4 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80">
              <button
                onClick={() => setMirrorType('concave')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mirrorType === 'concave'
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CircleDot className="w-3.5 h-3.5" />
                مرآة مقعرة — مجمعة (Concave)
              </button>
              <button
                onClick={() => setMirrorType('convex')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mirrorType === 'convex'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CircleDot className="w-3.5 h-3.5" />
                مرآة محدبة — مفرقة (Convex)
              </button>
              <button
                onClick={() => setMirrorType('flat')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mirrorType === 'flat'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                مرآة مستوية (Flat Plane)
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
              <span>المعادلات البصرية العامة للمرايا:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-sky-300">
                1 / f = 1 / u + 1 / v
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-amber-300">
                M = -v / u = h_i / h_o
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 font-mono text-center text-emerald-300">
                R = 2 · f
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg space-y-1">
              <span className="text-slate-400 text-xs">طبيعة الصورة الناتجة:</span>
              <p className="text-sm font-semibold text-sky-300">{result.imageNatureAr}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="space-y-4">
          <SimulationControls onReset={handleReset}>
            {mirrorType !== 'flat' && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>البعد البؤري (|f|):</span>
                  <span className="text-amber-400 font-mono">{focalLengthCm} cm (R = {focalLengthCm * 2} cm)</span>
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
            )}

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>بعد الجسم عن المرآة (u):</span>
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

            {/* Quick Case Positions for Concave */}
            {mirrorType === 'concave' && (
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <label className="text-xs font-medium text-slate-400">مواضع قياسية شهيرة للمرآة المقعرة:</label>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <button
                    onClick={() => setObjectDistanceCm(focalLengthCm * 2.5)}
                    className="p-1.5 bg-slate-950 text-slate-300 hover:text-white rounded border border-slate-800 text-right"
                  >
                    أبعد من المركز (u &gt; 2f)
                  </button>
                  <button
                    onClick={() => setObjectDistanceCm(focalLengthCm * 2)}
                    className="p-1.5 bg-slate-950 text-slate-300 hover:text-white rounded border border-slate-800 text-right"
                  >
                    في المركز تماماً (u = 2f)
                  </button>
                  <button
                    onClick={() => setObjectDistanceCm(focalLengthCm * 1.5)}
                    className="p-1.5 bg-slate-950 text-slate-300 hover:text-white rounded border border-slate-800 text-right"
                  >
                    بين البؤرة والمركز
                  </button>
                  <button
                    onClick={() => setObjectDistanceCm(focalLengthCm * 0.5)}
                    className="p-1.5 bg-slate-950 text-slate-300 hover:text-white rounded border border-slate-800 text-right"
                  >
                    أقرب من البؤرة (مكبرة)
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

export default MirrorsSimulation;
