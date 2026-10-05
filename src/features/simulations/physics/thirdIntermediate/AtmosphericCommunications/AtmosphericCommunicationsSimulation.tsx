import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import {
  ATMOSPHERE_LAYERS,
  getLayerByAltitude,
  calculateRadioPropagation,
} from './calculations';
import { SimulationViewMode, WavePropagationType } from './types';
import { Radio, Layers, Sparkles } from 'lucide-react';
import { ScientificGrid } from '../../../visuals/ScientificGrid';
import { DiagramLabel } from '../../../visuals/DiagramLabel';

export const AtmosphericCommunicationsSimulation: React.FC = () => {
  const [viewMode, setViewMode] = useState<SimulationViewMode>('radio-propagation');
  const [altitudeKm, setAltitudeKm] = useState<number>(120);
  const [waveType, setWaveType] = useState<WavePropagationType>('sky-wave');

  const activeLayer = getLayerByAltitude(altitudeKm);
  const propagationResult = calculateRadioPropagation(waveType);

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
            <span>مسارات انتشار الموجات اللاسلكية</span>
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
            <span>مستكشف طبقات الغلاف الجوي</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visual Display */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
              <svg viewBox="0 0 800 450" className="w-full h-full">
                <ScientificGrid width={800} height={450} />

                {viewMode === 'layers-explorer' ? (
                  <g>
                    {/* Layers Explorer Vertical Scale */}
                    {ATMOSPHERE_LAYERS.map((layer) => {
                      const y1 = 400 - (layer.minAltKm / 1000) * 350;
                      const y2 = 400 - (layer.maxAltKm / 1000) * 350;
                      return (
                        <rect
                          key={layer.id}
                          x="300"
                          y={y2}
                          width="200"
                          height={y1 - y2}
                          fill={layer.color}
                          fillOpacity="0.2"
                          stroke={layer.color}
                          strokeWidth="1"
                        />
                      );
                    })}

                    {/* Height Indicator */}
                    <motion.g
                      animate={{ y: 400 - (altitudeKm / 1000) * 350 }}
                      transition={{ type: 'spring', damping: 20 }}
                    >
                      <line x1="250" y1="0" x2="550" y2="0" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
                      <circle cx="250" cy="0" r="4" fill="#ef4444" />
                      <text x="240" y="5" textAnchor="end" fill="#ef4444" className="text-[14px] font-mono font-bold">
                        {altitudeKm} km
                      </text>
                    </motion.g>

                    {/* Labels */}
                    {ATMOSPHERE_LAYERS.map((layer) => {
                      const y = 400 - ((layer.minAltKm + layer.maxAltKm) / 2000) * 350;
                      return (
                        <text
                          key={layer.id}
                          x="400"
                          y={y}
                          textAnchor="middle"
                          fill="white"
                          className="text-[12px] font-bold pointer-events-none"
                        >
                          {layer.nameAr.split('(')[0]}
                        </text>
                      );
                    })}
                  </g>
                ) : (
                  <g>
                    {/* Radio Propagation Scene */}
                    <circle cx="400" cy="800" r="400" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
                    
                    {/* Ionosphere */}
                    <path
                      d="M 100 350 Q 400 250 700 350"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="20"
                      strokeOpacity="0.1"
                    />
                    <path
                      d="M 100 350 Q 400 250 700 350"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="1"
                      strokeDasharray="5 5"
                    />

                    {/* Satellite */}
                    <g transform="translate(400, 50)">
                      <rect x="-15" y="-10" width="30" height="20" fill="#94a3b8" rx="2" />
                      <rect x="-40" y="-5" width="25" height="10" fill="#0ea5e9" rx="1" />
                      <rect x="15" y="-5" width="25" height="10" fill="#0ea5e9" rx="1" />
                      <text y="30" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-bold">Satellite</text>
                    </g>

                    {/* Tx & Rx */}
                    <g transform="translate(200, 360)">
                      <line x1="0" y1="0" x2="0" y2="-30" stroke="#f59e0b" strokeWidth="3" />
                      <text x="-5" y="-35" textAnchor="end" fill="#f59e0b" className="text-[12px] font-bold">Tx</text>
                    </g>
                    <g transform="translate(600, 360)">
                      <line x1="0" y1="0" x2="0" y2="-30" stroke="#10b981" strokeWidth="3" />
                      <text x="5" y="-35" textAnchor="start" fill="#10b981" className="text-[12px] font-bold">Rx</text>
                    </g>

                    {/* Propagation Wave */}
                    {waveType === 'ground-wave' && (
                      <motion.path
                        d="M 200 360 Q 400 340 600 360"
                        fill="none"
                        stroke="#0ea5e9"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                    {waveType === 'sky-wave' && (
                      <motion.path
                        d="M 200 330 L 400 260 L 600 330"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    {waveType === 'satellite-space' && (
                      <motion.path
                        d="M 200 330 L 400 50 L 600 330"
                        fill="none"
                        stroke="#0ea5e9"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      />
                    )}

                    <DiagramLabel x={400} y={240} text="Ionosphere" color="purple" />
                    <DiagramLabel x={400} y={420} text="Earth Surface" color="blue" />
                  </g>
                )}
              </svg>

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
                <span>الشرح العلمي المنهجي:</span>
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
