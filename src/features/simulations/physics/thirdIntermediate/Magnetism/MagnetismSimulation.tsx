import React, { useState, useEffect, useRef } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateMagnetismState, calculateDipoleFieldAt } from './calculations';
import { MaterialType } from './types';
import { Compass, RotateCcw, Sparkles, Magnet, Layers, Eye } from 'lucide-react';
import { LabSurface } from '../../../visuals/LabSurface';
import { ScientificGrid } from '../../../visuals/ScientificGrid';
import { BarMagnet } from '../../../visuals/BarMagnet';
import { CompassIndicator } from '../../../visuals/CompassIndicator';
import { FieldLine } from '../../../visuals/FieldLine';
import { SimulationStatus } from '../../../visuals/SimulationStatus';
import { ValueBadge } from '../../../visuals/ValueBadge';

export const MagnetismSimulation: React.FC = () => {
  const [magnet1AngleDeg, setMagnet1AngleDeg] = useState<number>(0); // 0 = N right, 180 = S right
  const [hasSecondMagnet, setHasSecondMagnet] = useState<boolean>(true);
  const [magnet2DistancePx, setMagnet2DistancePx] = useState<number>(180);
  const [magnet2AngleDeg, setMagnet2AngleDeg] = useState<number>(180); // 180 = S right, N left
  const [compassPos, setCompassPos] = useState<{ x: number; y: number }>({ x: 200, y: 70 });
  const [showFieldLines, setShowFieldLines] = useState<boolean>(true);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>('ferromagnetic');

  const magnetismResult = calculateMagnetismState(
    hasSecondMagnet,
    magnet1AngleDeg,
    magnet2AngleDeg,
    magnet2DistancePx,
    compassPos.x,
    compassPos.y,
    selectedMaterial
  );

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

  const width = 600;
  const height = 320;
  const m1Center = { x: hasSecondMagnet ? width * 0.32 : width * 0.5, y: height * 0.58 };
  const m2Center = { x: m1Center.x + magnet2DistancePx, y: m1Center.y };

  const rad1 = (magnet1AngleDeg * Math.PI) / 180;
  const rad2 = (magnet2AngleDeg * Math.PI) / 180;

  // Generate simple field grid lines for SVG
  const fieldArrows = [];
  if (showFieldLines) {
    const step = 40;
    for (let x = 30; x < width - 20; x += step) {
      for (let y = 30; y < height - 20; y += step) {
        if (Math.hypot(x - m1Center.x, y - m1Center.y) < 45) continue;
        if (hasSecondMagnet && Math.hypot(x - m2Center.x, y - m2Center.y) < 45) continue;

        const f1 = calculateDipoleFieldAt(x, y, m1Center.x, m1Center.y, 100, rad1);
        let bx = f1.bx;
        let by = f1.by;

        if (hasSecondMagnet) {
          const f2 = calculateDipoleFieldAt(x, y, m2Center.x, m2Center.y, 100, rad2);
          bx += f2.bx;
          by += f2.by;
        }

        const angle = Math.atan2(by, bx);
        const len = 15;
        const x1 = x - (Math.cos(angle) * len) / 2;
        const y1 = y - (Math.sin(angle) * len) / 2;
        const x2 = x + (Math.cos(angle) * len) / 2;
        const y2 = y + (Math.sin(angle) * len) / 2;
        
        fieldArrows.push(<FieldLine key={`${x}-${y}`} d={`M ${x1} ${y1} L ${x2} ${y2}`} opacity={0.15} />);
      }
    }
  }

  return (
    <SimulationShell
      title="مختبر المغناطيسية والمجال المغناطيسي"
      subtitle="الفصل الثاني — الأقطاب المغناطيسية، خطوط القوى المغناطيسية، وسلوك إبرة البوصلة"
      badge="الصف الثالث المتوسط"
      topic="المغناطيسية"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <LabSurface type="dark" className="aspect-[600/320] p-0 relative overflow-hidden" data-testid="physics-visualization">
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
              <ScientificGrid width={width} height={height} />
              {fieldArrows}
              
              {hasSecondMagnet && (
                <text 
                  x={(m1Center.x + m2Center.x) / 2} y={m1Center.y - 35} 
                  fill={magnetismResult.interaction === 'repulsion' ? '#f87171' : '#34d399'} 
                  fontSize="12" fontWeight="bold" textAnchor="middle"
                >
                  {magnetismResult.interaction === 'repulsion' ? 'تنافر ⇄' : 'تجاذب ⇆'}
                </text>
              )}
            </svg>

            <div className="absolute inset-0 pointer-events-none">
              <BarMagnet 
                x={m1Center.x} y={m1Center.y} 
                angle={magnet1AngleDeg} 
                label="المغناطيس ١" 
              />
              {hasSecondMagnet && (
                <BarMagnet 
                  x={m2Center.x} y={m2Center.y} 
                  angle={magnet2AngleDeg} 
                  label="المغناطيس ٢" 
                />
              )}
              
              <CompassIndicator 
                x={compassPos.x} y={compassPos.y} 
                angle={magnetismResult.compassAngleDeg} 
                label="بوصلة" 
                onDrag={(pos) => setCompassPos(pos)}
              />
            </div>

            <div className="absolute top-4 right-4">
              <SimulationStatus 
                status={magnetismResult.interaction === 'repulsion' ? 'warning' : 'nominal'} 
                message={magnetismResult.interaction === 'repulsion' ? 'حالة تنافر' : 'حالة تجاذب'} 
              />
            </div>
          </LabSurface>

          <SimulationHUD metrics={hudMetrics} />

          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-900 dark:text-cyan-200 space-y-2">
            <p className="font-bold flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>الاستنتاج العلمي:</span>
            </p>
            <p className="leading-relaxed">{magnetismResult.forceDescriptionAr}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <ValueBadge label="اتجاه البوصلة" value={`${magnetismResult.compassAngleDeg.toFixed(0)}°`} color="cyan" />
              <ValueBadge label="تفاعل الأقطاب" value={magnetismResult.interaction === 'repulsion' ? 'تنافر' : 'تجاذب'} color="slate" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <SimulationControls title="التحكم بالتجربة" onReset={handleReset}>
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                  وضعية المغناطيس الأول
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button" onClick={() => setMagnet1AngleDeg(0)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      magnet1AngleDeg === 0 ? 'bg-cyan-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
                    }`}
                  >
                    شمالي يمين
                  </button>
                  <button
                    type="button" onClick={() => setMagnet1AngleDeg(180)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      magnet1AngleDeg === 180 ? 'bg-cyan-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
                    }`}
                  >
                    جنوبي يمين
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="flex items-center justify-between text-xs font-bold cursor-pointer">
                  <span>إضافة مغناطيس ثانٍ</span>
                  <input
                    type="checkbox" checked={hasSecondMagnet}
                    onChange={(e) => setHasSecondMagnet(e.target.checked)}
                    className="rounded accent-cyan-600 w-4 h-4"
                  />
                </label>
              </div>

              {hasSecondMagnet && (
                <>
                  <div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                      وضعية المغناطيس الثاني
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button" onClick={() => setMagnet2AngleDeg(180)}
                        className={`py-2 px-3 rounded-xl text-[10px] font-bold transition-all ${
                          magnet2AngleDeg === 180 ? 'bg-cyan-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                      >
                        (S) مقابل (N)
                      </button>
                      <button
                        type="button" onClick={() => setMagnet2AngleDeg(0)}
                        className={`py-2 px-3 rounded-xl text-[10px] font-bold transition-all ${
                          magnet2AngleDeg === 0 ? 'bg-cyan-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                      >
                        (N) مقابل (N)
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span>المسافة بينهما</span>
                      <span className="text-cyan-600 font-mono">{magnet2DistancePx} px</span>
                    </div>
                    <input
                      type="range" min={130} max={260} step={10}
                      value={magnet2DistancePx}
                      onChange={(e) => setMagnet2DistancePx(Number(e.target.value))}
                      className="w-full accent-cyan-600"
                    />
                  </div>
                </>
              )}

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-bold block">اختبار المواد:</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['ferromagnetic', 'paramagnetic', 'diamagnetic'] as MaterialType[]).map((m) => (
                    <button
                      key={m} type="button"
                      onClick={() => setSelectedMaterial(m)}
                      className={`py-2 rounded-xl text-[10px] font-bold transition-all ${
                        selectedMaterial === m ? 'bg-cyan-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
                      }`}
                    >
                      {m === 'ferromagnetic' ? 'حديد' : m === 'paramagnetic' ? 'ألمنيوم' : 'نحاس'}
                    </button>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-[10px] leading-relaxed">
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

