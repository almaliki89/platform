import React, { useState } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateReflection } from './calculations';
import { Sun, Compass, Sparkles, Info, RotateCcw } from 'lucide-react';

export const LightRayLabSimulation: React.FC = () => {
  const [incidentAngle, setIncidentAngle] = useState<number>(45); // degrees from normal
  const [showProtractor, setShowProtractor] = useState<boolean>(true);
  const [showNormal, setShowNormal] = useState<boolean>(true);

  const result = calculateReflection(incidentAngle);

  const handleReset = () => {
    setIncidentAngle(45);
    setShowProtractor(true);
    setShowNormal(true);
  };

  const metrics: HUDMetric[] = [
    {
      label: 'زاوية السقوط (θᵢ)',
      value: result.incidenceAngleDeg.toFixed(1) + '°',
      color: 'text-amber-500 dark:text-amber-400',
      formula: 'مع العمود المقام',
    },
    {
      label: 'زاوية الانعكاس (θᵣ)',
      value: result.reflectionAngleDeg.toFixed(1) + '°',
      color: 'text-cyan-500 dark:text-cyan-400',
      formula: 'θᵢ = θᵣ',
    },
    {
      label: 'حالة قانون الانعكاس',
      value: 'متحقق تماماً ✓',
      color: 'text-emerald-500',
    },
    {
      label: 'الزاوية المحصورة بين الشعاعين',
      value: (result.incidenceAngleDeg * 2).toFixed(1) + '°',
      color: 'text-violet-500 dark:text-violet-400',
      formula: 'θᵢ + θᵣ',
    },
  ];

  // SVG Geometry parameters
  const svgWidth = 500;
  const svgHeight = 280;
  const originX = svgWidth / 2;
  const originY = svgHeight - 40; // Point of incidence on mirror
  const rayLength = 190;

  // Convert angle (measured from vertical normal) to radians
  const angleRad = (result.incidenceAngleDeg * Math.PI) / 180;

  // Incident ray start position (coming from top-left toward origin)
  const incidentStartX = originX - Math.sin(angleRad) * rayLength;
  const incidentStartY = originY - Math.cos(angleRad) * rayLength;

  // Reflected ray end position (going from origin toward top-right)
  const reflectedEndX = originX + Math.sin(angleRad) * rayLength;
  const reflectedEndY = originY - Math.cos(angleRad) * rayLength;

  return (
    <SimulationShell
      title="مختبر الضوء وقوانين الانعكاس في المرايا المستوية"
      subjectTitle="الفيزياء • الثاني المتوسط"
      topic="الفصل السادس: الضوء"
      grade="الصف الثاني المتوسط"
      description="مختبر بصري تفاعلي يوضح انتشار أشعة الضوء وسقوطها على السطوح العاكسة المصقولة، والتحقق العملي من قانوني الانعكاس وتساوي زاويتي السقوط والانعكاس."
      learningObjectives={[
        'التحقق من القانون الأول للانعكاس: الشعاع الساقط والمنعكس والعمود المقام تقع جميعها في مستوى واحد',
        'التحقق من القانون الثاني للانعكاس: زاوية السقوط تساوي دائماً زاوية الانعكاس (θᵢ = θᵣ)',
        'معرفة كيفية قياس الزوايا بالنسبة للعمود المقام على السطح العاكس (وليس بالنسبة لسطح المرآة)',
      ]}
      educationalNote={
        <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <p className="font-bold text-slate-900 dark:text-white">
            قانونا الانعكاس الوزاريان:
          </p>
          <ul className="list-disc list-inside space-y-1 text-[11px]">
            <li><strong>القانون الأول:</strong> الشعاع الضوئي الساقط، والشعاع الضوئي المنعكس، والعمود المقام من نقطة السقوط على السطح العاكس، تقع جميعها في مستوى واحد عمودي على السطح العاكس.</li>
            <li><strong>القانون الثاني:</strong> زاوية السقوط = زاوية الانعكاس (θᵢ = θᵣ).</li>
          </ul>
        </div>
      }
      visualization={
        <div className="space-y-3">
          {/* Optical Bench SVG Canvas */}
          <div className="relative w-full bg-slate-950 border border-slate-800 rounded-2xl p-2 sm:p-4 overflow-hidden flex flex-col justify-between select-none">
            <div className="flex justify-between items-center text-xs px-2 pt-1">
              <span className="text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                منضدة بصرية رقمية (مرآة مستوية)
              </span>
              <span className="font-mono text-amber-400 font-bold bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                θᵢ = {result.incidenceAngleDeg}° | θᵣ = {result.reflectionAngleDeg}°
              </span>
            </div>

            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-64 overflow-visible">
              {/* Semicircular Protractor Grid */}
              {showProtractor && (
                <g opacity="0.35">
                  <path
                    d={`M ${originX - 160} ${originY} A 160 160 0 0 1 ${originX + 160} ${originY}`}
                    fill="none"
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  {[15, 30, 45, 60, 75].map((deg) => {
                    const r = (deg * Math.PI) / 180;
                    const xL = originX - Math.sin(r) * 160;
                    const yL = originY - Math.cos(r) * 160;
                    const xR = originX + Math.sin(r) * 160;
                    const yR = originY - Math.cos(r) * 160;
                    return (
                      <g key={deg}>
                        <line x1={originX} y1={originY} x2={xL} y2={yL} stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                        <line x1={originX} y1={originY} x2={xR} y2={yR} stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                        <text x={xL - 8} y={yL - 4} fill="#64748b" fontSize="9" textAnchor="middle">{deg}°</text>
                        <text x={xR + 8} y={yR - 4} fill="#64748b" fontSize="9" textAnchor="middle">{deg}°</text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* Flat Mirror at Bottom */}
              <rect x={40} y={originY} width={svgWidth - 80} height={14} fill="#0ea5e9" rx="3" opacity="0.8" />
              {/* Mirror Hatching marks */}
              {Array.from({ length: 22 }).map((_, i) => (
                <line
                  key={i}
                  x1={50 + i * 18}
                  y1={originY + 14}
                  x2={40 + i * 18}
                  y2={originY + 22}
                  stroke="#334155"
                  strokeWidth="1.5"
                />
              ))}

              {/* Normal Line (العمود المقام) */}
              {showNormal && (
                <g>
                  <line
                    x1={originX}
                    y1={originY}
                    x2={originX}
                    y2={originY - 200}
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                  />
                  <text x={originX} y={originY - 206} fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">
                    العمود المقام (Normal)
                  </text>
                </g>
              )}

              {/* Incident Ray (Red/Amber Laser) */}
              <line
                x1={incidentStartX}
                y1={incidentStartY}
                x2={originX}
                y2={originY}
                stroke="#f59e0b"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Laser Emitter Box */}
              <circle cx={incidentStartX} cy={incidentStartY} r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
              <text x={incidentStartX - 10} y={incidentStartY - 10} fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="end">
                مصدر الليزر
              </text>

              {/* Reflected Ray (Cyan Laser) */}
              <line
                x1={originX}
                y1={originY}
                x2={reflectedEndX}
                y2={reflectedEndY}
                stroke="#06b6d4"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx={reflectedEndX} cy={reflectedEndY} r="5" fill="#06b6d4" />
              <text x={reflectedEndX + 10} y={reflectedEndY - 10} fill="#67e8f9" fontSize="10" fontWeight="bold">
                الشعاع المنعكس
              </text>

              {/* Point of Incidence Marker */}
              <circle cx={originX} cy={originY} r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>
        </div>
      }
      controls={
        <SimulationControls onReset={handleReset}>
          {/* Incident Angle Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="inc-angle">زاوية السقوط (θᵢ):</label>
              <span className="font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded text-sm font-black">
                {incidentAngle}°
              </span>
            </div>
            <input
              id="inc-angle"
              type="range"
              min="0"
              max="80"
              step="1"
              value={incidentAngle}
              onChange={(e) => setIncidentAngle(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0° (عمودي)</span>
              <span>45° (وسط)</span>
              <span>80° (مائل حاد)</span>
            </div>
          </div>

          {/* Visibility Toggles */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setShowProtractor(!showProtractor)}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-all ${
                showProtractor
                  ? 'bg-slate-800 text-white border-slate-700'
                  : 'bg-slate-100 dark:bg-slate-800/40 text-slate-500 border-slate-200'
              }`}
            >
              {showProtractor ? '✓ شبكة المنقلة مفعلة' : 'إخفاء المنقلة'}
            </button>
            <button
              onClick={() => setShowNormal(!showNormal)}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-all ${
                showNormal
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-100 dark:bg-slate-800/40 text-slate-500 border-slate-200'
              }`}
            >
              {showNormal ? '✓ العمود المقام مفعل' : 'إخفاء العمود المقام'}
            </button>
          </div>
        </SimulationControls>
      }
      outputs={<SimulationHUD metrics={metrics} />}
      extraPanels={
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl text-xs space-y-2">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-500" />
            <span>التفسير البصري للانعكاس:</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {result.explanationAr}
          </p>
        </div>
      }
      onReset={handleReset}
    />
  );
};
