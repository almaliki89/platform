import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateMagnetismState, calculateDipoleFieldAt } from './calculations';
import { MaterialType } from './types';
import { Compass, RotateCcw, Sparkles, Magnet, Layers, Eye } from 'lucide-react';

export const MagnetismSimulation: React.FC = () => {
  const [magnet1AngleDeg, setMagnet1AngleDeg] = useState<number>(0); // 0 = N right, 180 = S right
  const [hasSecondMagnet, setHasSecondMagnet] = useState<boolean>(true);
  const [magnet2DistancePx, setMagnet2DistancePx] = useState<number>(180);
  const [magnet2AngleDeg, setMagnet2AngleDeg] = useState<number>(180); // 180 = S right, N left
  const [compassPos, setCompassPos] = useState<{ x: number; y: number }>({ x: 200, y: 70 });
  const [showFieldLines, setShowFieldLines] = useState<boolean>(true);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>('ferromagnetic');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDraggingCompass = useRef<boolean>(false);

  const magnetismResult = calculateMagnetismState(
    hasSecondMagnet,
    magnet1AngleDeg,
    magnet2AngleDeg,
    magnet2DistancePx,
    compassPos.x,
    compassPos.y,
    selectedMaterial
  );

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Subtle Grid
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

    const m1Center = { x: hasSecondMagnet ? width * 0.32 : width * 0.5, y: height * 0.58 };
    const m2Center = { x: m1Center.x + magnet2DistancePx, y: m1Center.y };

    const rad1 = (magnet1AngleDeg * Math.PI) / 180;
    const rad2 = (magnet2AngleDeg * Math.PI) / 180;

    // Field Grid Vectors / Lines
    if (showFieldLines) {
      const step = 32;
      for (let x = 30; x < width - 20; x += step) {
        for (let y = 30; y < height - 20; y += step) {
          // Skip if inside magnets
          if (Math.hypot(x - m1Center.x, y - m1Center.y) < 40) continue;
          if (hasSecondMagnet && Math.hypot(x - m2Center.x, y - m2Center.y) < 40) continue;

          const f1 = calculateDipoleFieldAt(x, y, m1Center.x, m1Center.y, 100, rad1);
          let bx = f1.bx;
          let by = f1.by;

          if (hasSecondMagnet) {
            const f2 = calculateDipoleFieldAt(x, y, m2Center.x, m2Center.y, 100, rad2);
            bx += f2.bx;
            by += f2.by;
          }

          const angle = Math.atan2(by, bx);
          const lineLen = 14;

          ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x - (Math.cos(angle) * lineLen) / 2, y - (Math.sin(angle) * lineLen) / 2);
          ctx.lineTo(x + (Math.cos(angle) * lineLen) / 2, y + (Math.sin(angle) * lineLen) / 2);
          ctx.stroke();

          // Tiny arrow tip for direction
          const tipX = x + (Math.cos(angle) * lineLen) / 2;
          const tipY = y + (Math.sin(angle) * lineLen) / 2;
          ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
          ctx.beginPath();
          ctx.arc(tipX, tipY, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Draw Magnet 1
    drawBarMagnet(ctx, m1Center.x, m1Center.y, 110, 36, rad1, 'مغناطيس ١');

    // Draw Magnet 2
    if (hasSecondMagnet) {
      drawBarMagnet(ctx, m2Center.x, m2Center.y, 110, 36, rad2, 'مغناطيس ٢');

      // Interaction Vector / Indicator between magnets
      const midGapX = (m1Center.x + m2Center.x) / 2;
      const midGapY = m1Center.y;
      ctx.fillStyle = magnetismResult.interaction === 'repulsion' ? '#ef4444' : '#10b981';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        magnetismResult.interaction === 'repulsion' ? 'تنافر ⇄' : 'تجاذب ⇆',
        midGapX,
        midGapY - 26
      );
    }

    // Draw Compass
    drawCompass(ctx, compassPos.x, compassPos.y, magnetismResult.compassAngleDeg);
  }, [
    magnet1AngleDeg,
    hasSecondMagnet,
    magnet2DistancePx,
    magnet2AngleDeg,
    compassPos,
    showFieldLines,
    magnetismResult,
  ]);

  function drawBarMagnet(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    w: number,
    h: number,
    angleRad: number,
    label: string
  ) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angleRad);

    const halfW = w / 2;
    const halfH = h / 2;

    // South Pole Half (Blue)
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(-halfW, -halfH, halfW, h);

    // North Pole Half (Red)
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(0, -halfH, halfW, h);

    // Border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-halfW, -halfH, w, h);

    // Text labels
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('S', -halfW / 2, 0);
    ctx.fillText('N', halfW / 2, 0);

    ctx.restore();

    // Magnet label on canvas
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, cx, cy + 30);
  }

  function drawCompass(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    angleDeg: number
  ) {
    const radius = 22;
    const angleRad = (angleDeg * Math.PI) / 180;

    // Compass dial
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Needle pivot
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();

    // North pointer (Red)
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(
      cx + Math.cos(angleRad) * (radius - 4),
      cy + Math.sin(angleRad) * (radius - 4)
    );
    ctx.lineTo(
      cx + Math.cos(angleRad + Math.PI / 2) * 4,
      cy + Math.sin(angleRad + Math.PI / 2) * 4
    );
    ctx.closePath();
    ctx.fill();

    // South pointer (Silver/White)
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(
      cx - Math.cos(angleRad) * (radius - 4),
      cy - Math.sin(angleRad) * (radius - 4)
    );
    ctx.lineTo(
      cx - Math.cos(angleRad + Math.PI / 2) * 4,
      cy - Math.sin(angleRad + Math.PI / 2) * 4
    );
    ctx.closePath();
    ctx.fill();

    // Compass Label
    ctx.font = 'bold 9px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText('بوصلة (اسحب للتحريك)', cx, cy - radius - 5);
  }

  // Canvas Mouse events to drag the compass
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (Math.hypot(x - compassPos.x, y - compassPos.y) < 35) {
      isDraggingCompass.current = true;
    } else {
      // Direct click reposition
      setCompassPos({ x, y });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingCompass.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.max(30, Math.min(canvas.width - 30, (e.clientX - rect.left) * scaleX));
    const y = Math.max(30, Math.min(canvas.height - 30, (e.clientY - rect.top) * scaleY));
    setCompassPos({ x, y });
  };

  const handleCanvasMouseUp = () => {
    isDraggingCompass.current = false;
  };

  const handleReset = () => {
    setMagnet1AngleDeg(0);
    setHasSecondMagnet(true);
    setMagnet2DistancePx(180);
    setMagnet2AngleDeg(180);
    setCompassPos({ x: 200, y: 70 });
    setShowFieldLines(true);
    setSelectedMaterial('ferromagnetic');
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'التفاعل المتبادل',
      value:
        magnetismResult.interaction === 'repulsion'
          ? 'تنافر (Repulsion)'
          : magnetismResult.interaction === 'attraction'
          ? 'تجاذب (Attraction)'
          : 'قطب مفرد',
      color: magnetismResult.interaction === 'repulsion' ? 'red' : 'emerald',
    },
    {
      label: 'اتجاه إبرة البوصلة',
      value: `${magnetismResult.compassAngleDeg.toFixed(1)}°`,
      color: 'cyan',
    },
    {
      label: 'شدة المجال النسبي (B)',
      value: `${magnetismResult.fieldStrengthRelative} %`,
      color: 'amber',
    },
    {
      label: 'تصنيف المادة المختبرة',
      value:
        selectedMaterial === 'ferromagnetic'
          ? 'فيرومغناطيسية'
          : selectedMaterial === 'paramagnetic'
          ? 'بارامغناطيسية'
          : 'دايامغناطيسية',
      color: 'slate',
    },
  ];

  return (
    <SimulationShell
      title="مختبر المغناطيسية والمجال المغناطيسي"
      subtitle="الفصل الثاني — الأقطاب المغناطيسية، خطوط القوى المغناطيسية، وسلوك إبرة البوصلة"
      badge="الصف الثالث المتوسط"
      topic="المغناطيسية"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Canvas */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex flex-col items-center justify-center p-4">
            <canvas
              ref={canvasRef}
              width={600}
              height={320}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              className="w-full max-w-[600px] h-auto aspect-[600/320] block cursor-crosshair select-none"
            />

            {/* Instruction tooltip */}
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs text-slate-300 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>انقر أو اسحب البوصلة لاختبار اتجاه المجال المغناطيسي</span>
            </div>

            <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur border border-slate-700/60 px-3 py-1 rounded-lg text-[11px] text-slate-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> قطب شمالي (N)
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block ml-2" /> قطب جنوبي (S)
            </div>
          </div>

          <SimulationHUD metrics={hudMetrics} />

          {/* Educational Callout */}
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-900 dark:text-cyan-200 space-y-1.5">
            <p className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>قانون الأقطاب المغناطيسية:</span>
            </p>
            <p>{magnetismResult.forceDescriptionAr}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              خطوط المجال المغناطيسي تنبع دائمًا من القطب الشمالي وتتجه نحو القطب الجنوبي خارج المغناطيس، وتكمل دورتها داخله. لا تتقاطع أبدًا، ومماساتها تمثل اتجاه إبرة البوصلة.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <SimulationControls
            title="التحكم بالمغانط والمواد"
            onReset={handleReset}
          >
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  قطبية المغناطيس الأول (الأيسر)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMagnet1AngleDeg(0)}
                    className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                      magnet1AngleDeg === 0
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    شمالي يمين (N-S)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMagnet1AngleDeg(180)}
                    className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                      magnet1AngleDeg === 180
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    عكس القطبية (S-N)
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <span>تفعيل المغناطيس الثاني</span>
                  <input
                    type="checkbox"
                    checked={hasSecondMagnet}
                    onChange={(e) => setHasSecondMagnet(e.target.checked)}
                    className="rounded accent-cyan-600"
                  />
                </label>
              </div>

              {hasSecondMagnet && (
                <>
                  <div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      قطبية المغناطيس الثاني (الأيمن)
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setMagnet2AngleDeg(180)}
                        className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                          magnet2AngleDeg === 180
                            ? 'bg-cyan-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        (S) مقابل لـ (N) [تجاذب]
                      </button>
                      <button
                        type="button"
                        onClick={() => setMagnet2AngleDeg(0)}
                        className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                          magnet2AngleDeg === 0
                            ? 'bg-cyan-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        (N) مقابل لـ (N) [تنافر]
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span>المسافة بين المغناطيسين</span>
                      <span className="font-mono text-cyan-600 dark:text-cyan-400">
                        {magnet2DistancePx} px
                      </span>
                    </div>
                    <input
                      type="range"
                      min={130}
                      max={260}
                      step={10}
                      value={magnet2DistancePx}
                      onChange={(e) => setMagnet2DistancePx(Number(e.target.value))}
                      className="w-full accent-cyan-600 cursor-pointer"
                    />
                  </div>
                </>
              )}

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showFieldLines}
                    onChange={(e) => setShowFieldLines(e.target.checked)}
                    className="rounded accent-cyan-600"
                  />
                  <span>إظهار خطوط المجال المغناطيسي</span>
                </label>
              </div>

              {/* Material Classification Section according to Iraqi Curriculum */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  تصنيف المواد وفق خواصها المغناطيسية:
                </span>
                <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setSelectedMaterial('ferromagnetic')}
                    className={`p-2 rounded-xl text-center transition-all ${
                      selectedMaterial === 'ferromagnetic'
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    فيرو (حديد)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMaterial('paramagnetic')}
                    className={`p-2 rounded-xl text-center transition-all ${
                      selectedMaterial === 'paramagnetic'
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    بارا (ألمنيوم)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMaterial('diamagnetic')}
                    className={`p-2 rounded-xl text-center transition-all ${
                      selectedMaterial === 'diamagnetic'
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    دايا (نحاس)
                  </button>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                  {magnetismResult.materialResponseAr}
                </div>
              </div>
            </div>
          </SimulationControls>
        </div>
      </div>
    </SimulationShell>
  );
};
