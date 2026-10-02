import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  ATMOSPHERE_LAYERS,
  getLayerByAltitude,
  calculateRadioPropagation,
} from './calculations';
import { SimulationViewMode, WavePropagationType } from './types';
import { Globe, Radio, Satellite, Layers, Sparkles, Navigation, RotateCcw } from 'lucide-react';

export const AtmosphericCommunicationsSimulation: React.FC = () => {
  const [viewMode, setViewMode] = useState<SimulationViewMode>('radio-propagation');
  const [altitudeKm, setAltitudeKm] = useState<number>(120);
  const [waveType, setWaveType] = useState<WavePropagationType>('sky-wave');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animPhaseRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  const activeLayer = getLayerByAltitude(altitudeKm);
  const propagationResult = calculateRadioPropagation(waveType);

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isMounted = true;

    const render = () => {
      if (!isMounted) return;
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      animPhaseRef.current = (animPhaseRef.current + 0.03) % 1;
      const progress = animPhaseRef.current;

      if (viewMode === 'layers-explorer') {
        // Mode A: Atmosphere Layers Explorer (Vertical Elevation View)
        const leftMargin = 80;
        const barWidth = width - 160;
        const topY = 30;
        const bottomY = height - 40;
        const totalHeight = bottomY - topY;

        // Draw Layer Bands
        const maxRangeKm = 600;
        ATMOSPHERE_LAYERS.forEach((layer) => {
          const y1 = bottomY - (Math.min(maxRangeKm, layer.maxAltKm) / maxRangeKm) * totalHeight;
          const y2 = bottomY - (Math.min(maxRangeKm, layer.minAltKm) / maxRangeKm) * totalHeight;
          const h = y2 - y1;

          ctx.fillStyle = layer.color + '33'; // transparent
          ctx.fillRect(leftMargin, y1, barWidth, h);
          ctx.strokeStyle = layer.color + 'aa';
          ctx.lineWidth = 1;
          ctx.strokeRect(leftMargin, y1, barWidth, h);

          // Layer Name Text
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 11px sans-serif';
          ctx.textAlign = 'right';
          ctx.fillText(layer.nameAr.split('(')[0], leftMargin + barWidth - 15, y1 + h / 2 + 4);

          // Altitude band text
          ctx.fillStyle = '#94a3b8';
          ctx.font = '10px monospace';
          ctx.textAlign = 'left';
          ctx.fillText(`${layer.minAltKm}-${layer.maxAltKm} km`, leftMargin + 15, y1 + h / 2 + 4);
        });

        // Current Altitude Cursor
        const cursorY = bottomY - (Math.min(maxRangeKm, altitudeKm) / maxRangeKm) * totalHeight;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(leftMargin - 15, cursorY);
        ctx.lineTo(leftMargin + barWidth + 15, cursorY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Altitude marker pin
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(leftMargin - 15, cursorY, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`h = ${altitudeKm} km`, leftMargin - 26, cursorY + 4);
      } else {
        // Mode B: Radio Wave Propagation Canvas
        const cx = width / 2;
        const cy = height + 180;
        const earthRadius = 310;

        // 1. Earth Curvature
        ctx.fillStyle = '#0f2942';
        ctx.beginPath();
        ctx.arc(cx, cy, earthRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('سطح الكرة الأرضية', cx, height - 20);

        // 2. Ionosphere Layer Arc
        const ionoRadius = earthRadius + 95;
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.45)';
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.arc(cx, cy, ionoRadius, Math.PI * 1.15, Math.PI * 1.85);
        ctx.stroke();

        ctx.fillStyle = '#c084fc';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('طبقة الأيونوسفير المتأينة (Ionosphere Reflex Arc)', cx, 65);

        // 3. Transmitter Tower (Left on Earth surface)
        const tAngle = Math.PI * 1.34;
        const tx = cx + Math.cos(tAngle) * earthRadius;
        const ty = cy + Math.sin(tAngle) * earthRadius;

        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(tx - 6, ty - 26);
        ctx.stroke();

        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('برج الإرسال (Tx)', tx - 10, ty - 20);

        // 4. Receiver Tower (Right on Earth surface)
        const rAngle = Math.PI * 1.66;
        const rx = cx + Math.cos(rAngle) * earthRadius;
        const ry = cy + Math.sin(rAngle) * earthRadius;

        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx + 6, ry - 26);
        ctx.stroke();

        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('محطة الاستقبال (Rx)', rx + 10, ry - 20);

        // 5. Communications Satellite (Top center in space)
        const satX = cx;
        const satY = 30;

        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(satX - 10, satY - 6, 20, 12);
        // Solar panels
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(satX - 28, satY - 4, 16, 8);
        ctx.fillRect(satX + 12, satY - 4, 16, 8);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('قمر صناعي للاتصالات (Satellite)', satX, satY - 12);

        // 6. Draw Propagation Ray Paths according to active waveType
        const startX = tx - 6;
        const startY = ty - 26;
        const targetX = rx + 6;
        const targetY = ry - 26;

        if (waveType === 'ground-wave') {
          // Ground wave hugs Earth surface
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(cx, cy, earthRadius + 6, tAngle, rAngle);
          ctx.stroke();

          // Traveling packet dot
          const pAngle = tAngle + progress * (rAngle - tAngle);
          const px = cx + Math.cos(pAngle) * (earthRadius + 6);
          const py = cy + Math.sin(pAngle) * (earthRadius + 6);
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.arc(px, py, 4.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (waveType === 'sky-wave') {
          // Sky wave bounces off ionosphere
          const bounceX = cx;
          const bounceY = cy - ionoRadius;

          ctx.strokeStyle = '#c084fc';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(bounceX, bounceY);
          ctx.lineTo(targetX, targetY);
          ctx.stroke();

          // Reflection spot glow
          ctx.fillStyle = 'rgba(192, 132, 252, 0.6)';
          ctx.beginPath();
          ctx.arc(bounceX, bounceY, 8, 0, Math.PI * 2);
          ctx.fill();

          // Traveling packet dot
          let dotX = 0;
          let dotY = 0;
          if (progress < 0.5) {
            const sub = progress * 2;
            dotX = startX + sub * (bounceX - startX);
            dotY = startY + sub * (bounceY - startY);
          } else {
            const sub = (progress - 0.5) * 2;
            dotX = bounceX + sub * (targetX - bounceX);
            dotY = bounceY + sub * (targetY - bounceY);
          }
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.arc(dotX, dotY, 4.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Satellite Wave: penetrates ionosphere to satellite and back down
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(satX, satY);
          ctx.lineTo(targetX, targetY);
          ctx.stroke();

          // Packet
          let dotX = 0;
          let dotY = 0;
          if (progress < 0.5) {
            const sub = progress * 2;
            dotX = startX + sub * (satX - startX);
            dotY = startY + sub * (satY - startY);
          } else {
            const sub = (progress - 0.5) * 2;
            dotX = satX + sub * (targetX - satX);
            dotY = satY + sub * (targetY - satY);
          }
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.arc(dotX, dotY, 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [viewMode, altitudeKm, waveType, activeLayer]);

  const handleReset = () => {
    setViewMode('radio-propagation');
    setAltitudeKm(120);
    setWaveType('sky-wave');
  };

  const hudMetrics: HUDMetric[] =
    viewMode === 'layers-explorer'
      ? [
          {
            label: 'الطبقة الجوية الفعالة',
            value: activeLayer.nameAr.split('(')[0],
            color: 'cyan',
          },
          {
            label: 'نطاق الارتفاع',
            value: `${activeLayer.minAltKm} - ${activeLayer.maxAltKm} km`,
            color: 'amber',
          },
          {
            label: 'تغير درجة الحرارة',
            value: activeLayer.tempTrendAr.slice(0, 30) + '...',
            color: 'slate',
          },
          {
            label: 'الارتفاع المختار',
            value: `${altitudeKm} km`,
            color: 'emerald',
          },
        ]
      : [
          {
            label: 'نوع الموجة اللاسلكية',
            value: propagationResult.waveTypeAr.split('(')[0],
            color: 'cyan',
          },
          {
            label: 'نطاق التردد المستعمل',
            value: propagationResult.frequencyBandAr,
            color: 'amber',
          },
          {
            label: 'أقصى مدى تغطية تقريبي',
            value: `${propagationResult.maxCoverageRangeKm.toLocaleString()} km`,
            color: 'emerald',
          },
          {
            label: 'التفاعل مع الأيونوسفير',
            value:
              waveType === 'sky-wave'
                ? 'انعكاس كلي'
                : waveType === 'satellite-space'
                ? 'اختراق ونفاذ'
                : 'انتشار سطحي',
            color: 'slate',
          },
        ];

  return (
    <SimulationShell
      title="مختبر فيزياء الجو وتقنيات الاتصالات الحديثة"
      subtitle="الفصل التاسع — طبقات الغلاف الجوي، انتشار الموجات الأرضية والسماوية والفضائية، والاتصالات عبر الأقمار الصناعية"
      badge="الصف الثالث المتوسط"
      topic="فيزياء الجو والاتصالات"
    >
      <div className="space-y-6">
        {/* Mode Selector */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            type="button"
            onClick={() => setViewMode('radio-propagation')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              viewMode === 'radio-propagation'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>مسارات انتشار الموجات اللاسلكية (الأرضية، السماوية، الفضائية)</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('layers-explorer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              viewMode === 'layers-explorer'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>مستكشف طبقات الغلاف الجوي (الارتفاع ودرجة الحرارة)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visual Display */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex flex-col items-center justify-center p-4">
              <canvas
                ref={canvasRef}
                width={600}
                height={320}
                className="w-full max-w-[600px] h-auto aspect-[600/320] block select-none"
              />

              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-400">
                {viewMode === 'radio-propagation'
                  ? propagationResult.waveTypeAr
                  : `${activeLayer.nameAr.split('(')[0]} (${activeLayer.minAltKm}-${activeLayer.maxAltKm} km)`}
              </div>
            </div>

            <SimulationHUD metrics={hudMetrics} />

            {/* Explanation Callout */}
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-900 dark:text-cyan-200 space-y-1.5">
              <p className="font-bold flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>الشرح العلمي المنهجي (فيزياء الثالث المتوسط):</span>
              </p>
              {viewMode === 'radio-propagation' ? (
                <>
                  <p>{propagationResult.propagationPathAr}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    <strong>التطبيقات العملية:</strong> {propagationResult.practicalApplicationsAr}
                  </p>
                </>
              ) : (
                <>
                  <p>{activeLayer.tempTrendAr}</p>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                    {activeLayer.keyFeaturesAr.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <SimulationControls
              title="معاملات الغلاف الجوي والاتصالات"
              onReset={handleReset}
            >
              {viewMode === 'radio-propagation' ? (
                <div className="space-y-4">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    طريقة انتشار الموجة اللاسلكية:
                  </span>

                  <div className="space-y-2">
                    {[
                      {
                        id: 'ground-wave',
                        title: '١. الموجات الأرضية (Ground Waves)',
                        desc: 'تنتشر بمحاذاة انحناء الأرض، ترددات منخفضة (AM)',
                      },
                      {
                        id: 'sky-wave',
                        title: '٢. الموجات السماوية (Sky Waves)',
                        desc: 'تنعكس على طبقة الأيونوسفير لتغطي مسافات قارية (HF)',
                      },
                      {
                        id: 'satellite-space',
                        title: '٣. الموجات الفضائية والأقمار الصناعية',
                        desc: 'تخترق الأيونوسفير لتربط بالأقمار الصناعية (UHF/Microwaves)',
                      },
                    ].map((w) => (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => setWaveType(w.id as WavePropagationType)}
                        className={`w-full p-3 rounded-2xl border text-right transition-all cursor-pointer ${
                          waveType === w.id
                            ? 'border-cyan-500 bg-cyan-500/10 text-cyan-900 dark:text-cyan-200'
                            : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <p className="font-bold text-xs">{w.title}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{w.desc}</p>
                      </button>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1 text-xs">
                    <p className="font-bold text-slate-900 dark:text-white">الاستنتاج المنهجي:</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      الموجات ذات التردد الأعلى من 30 MHz تخترق طبقة الأيونوسفير ولا تنعكس عليها، ولذلك لا يمكن استخدامها للاتصال السماوي وتُستخدم للاتصال الفضائي وعبر الأقمار الصناعية حصراً.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span>الارتفاع عن سطح الأرض (Altitude)</span>
                      <span className="font-mono text-cyan-600 dark:text-cyan-400">{altitudeKm} km</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={600}
                      step={10}
                      value={altitudeKm}
                      onChange={(e) => setAltitudeKm(Number(e.target.value))}
                      className="w-full accent-cyan-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                      <span>0 km (السطح)</span>
                      <span>300 km (الأيونوسفير)</span>
                      <span>600 km (الفضاء)</span>
                    </div>
                  </div>

                  {/* Layers Quick Jumper */}
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-500 block">الانتقال السريع للطبقات:</span>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] font-bold">
                      {ATMOSPHERE_LAYERS.map((layer) => (
                        <button
                          key={layer.id}
                          type="button"
                          onClick={() => setAltitudeKm(Math.round((layer.minAltKm + layer.maxAltKm) / 2))}
                          className={`p-2 rounded-xl text-right transition-all truncate ${
                            activeLayer.id === layer.id
                              ? 'bg-cyan-600 text-white shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {layer.nameAr.split('(')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </SimulationControls>
          </div>
        </div>
      </div>
    </SimulationShell>
  );
};
