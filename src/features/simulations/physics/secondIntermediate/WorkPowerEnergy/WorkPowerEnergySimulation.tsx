import React, { useState } from 'react';
import { SimulationShell } from '../../../core/SimulationShell';
import { SimulationControls } from '../../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../../core/SimulationHUD';
import { calculateAllEnergyMetrics } from './calculations';
import { Zap, Activity, BatteryCharging, Info, RotateCcw } from 'lucide-react';

export const WorkPowerEnergySimulation: React.FC = () => {
  const [force, setForce] = useState<number>(50); // N
  const [distance, setDistance] = useState<number>(4); // m
  const [timeSec, setTimeSec] = useState<number>(2); // s
  const [mass, setMass] = useState<number>(5); // kg
  const [height, setHeight] = useState<number>(6); // m
  const [velocity, setVelocity] = useState<number>(4); // m/s

  const metricsData = calculateAllEnergyMetrics(
    force,
    distance,
    timeSec,
    mass,
    height,
    velocity
  );

  const handleReset = () => {
    setForce(50);
    setDistance(4);
    setTimeSec(2);
    setMass(5);
    setHeight(6);
    setVelocity(4);
  };

  const hudMetrics: HUDMetric[] = [
    {
      label: 'الشغل المنجز (W)',
      value: metricsData.workJ.toFixed(0),
      unit: 'J',
      color: 'text-amber-500 dark:text-amber-400',
      formula: 'W = F·d',
    },
    {
      label: 'القدرة الميكانيكية (P)',
      value: metricsData.powerW.toFixed(1),
      unit: 'W',
      color: 'text-cyan-500 dark:text-cyan-400',
      formula: 'P = W / t',
    },
    {
      label: 'الطاقة الحركية (Ek)',
      value: metricsData.kineticEnergyJ.toFixed(1),
      unit: 'J',
      color: 'text-emerald-500 dark:text-emerald-400',
      formula: 'Ek = ½ m·v²',
    },
    {
      label: 'الطاقة الكامنة (Ep)',
      value: metricsData.potentialEnergyJ.toFixed(1),
      unit: 'J',
      color: 'text-violet-500 dark:text-violet-400',
      formula: 'Ep = m·g·h',
    },
  ];

  const maxEnergy = Math.max(100, metricsData.totalMechanicalEnergyJ);
  const pePercent = (metricsData.potentialEnergyJ / maxEnergy) * 100;
  const kePercent = (metricsData.kineticEnergyJ / maxEnergy) * 100;

  return (
    <SimulationShell
      title="مختبر الشغل والقدرة وتحولات الطاقة"
      subjectTitle="الفيزياء • الثاني المتوسط"
      topic="الفصل الثالث: الشغل والقدرة والطاقة"
      grade="الصف الثاني المتوسط"
      description="مختبر تفاعلي لاستكشاف مفهوم الشغل الفيزيائي وقانون القدرة ومقارنة الطاقة الحركية (Ek) بالطاقة الكامنة الثقالية (Ep) ومبدأ حفظ الطاقة الميكانيكية."
      learningObjectives={[
        'تطبيق قانون الشغل المنجز: W = F · d وقانون القدرة: P = W / t بالوحدات الدولية (Joule & Watt)',
        'حساب الطاقة الحركية لجسم متحرك: Ek = ½ m · v²',
        'حساب الطاقة الكامنة الثقالية المخزونة بسبب الارتفاع: Ep = m · g · h',
        'ملاحظة تحولات الطاقة بين الحركية والكامنة مع بقاء الطاقة الكلية ثابتة',
      ]}
      educationalNote={
        <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <p className="font-bold text-slate-900 dark:text-white">
            القوانين الوزارية المعتمدة:
          </p>
          <div className="grid grid-cols-2 gap-2 text-center font-mono text-[11px] font-bold">
            <div className="bg-white/80 dark:bg-slate-900 p-2 rounded-lg border border-amber-200 text-amber-600">
              W = F × d &nbsp;(جول)
            </div>
            <div className="bg-white/80 dark:bg-slate-900 p-2 rounded-lg border border-cyan-200 text-cyan-600">
              P = W / t &nbsp;(واط)
            </div>
            <div className="bg-white/80 dark:bg-slate-900 p-2 rounded-lg border border-emerald-200 text-emerald-600">
              Ek = ½ m v²
            </div>
            <div className="bg-white/80 dark:bg-slate-900 p-2 rounded-lg border border-violet-200 text-violet-600">
              Ep = m g h
            </div>
          </div>
        </div>
      }
      visualization={
        <div className="space-y-4">
          {/* Energy Bar Chart & Crane Canvas */}
          <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-5 text-white space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">مخطط تحولات الطاقة الميكانيكية (Mechanical Energy)</span>
              <span className="font-mono text-cyan-300 font-bold">
                E_total = {metricsData.totalMechanicalEnergyJ.toFixed(1)} J
              </span>
            </div>

            {/* Stacked Energy Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-8 bg-slate-900 rounded-xl overflow-hidden flex border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-300 flex items-center justify-center text-[11px] font-bold"
                  style={{ width: `${pePercent}%` }}
                >
                  {pePercent > 12 && `Ep: ${metricsData.potentialEnergyJ.toFixed(0)} J`}
                </div>
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 transition-all duration-300 flex items-center justify-center text-[11px] font-bold"
                  style={{ width: `${kePercent}%` }}
                >
                  {kePercent > 12 && `Ek: ${metricsData.kineticEnergyJ.toFixed(0)} J`}
                </div>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 px-1">
                <span className="flex items-center gap-1.5 text-violet-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-violet-500" /> طاقة كامنة (Ep) = {metricsData.potentialEnergyJ.toFixed(1)} J
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> طاقة حركية (Ek) = {metricsData.kineticEnergyJ.toFixed(1)} J
                </span>
              </div>
            </div>

            {/* Work & Power Apparatus Visualization */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
              <div className="space-y-1">
                <span className="text-xs text-slate-400">الشغل المنجز برفع الكتلة:</span>
                <div className="text-xl font-bold font-mono text-amber-400">
                  W = {metricsData.workJ.toFixed(0)} J
                </div>
                <span className="text-[10px] text-slate-500">القوة ({force} N) × المسافة ({distance} m)</span>
              </div>
              <div className="w-px h-12 bg-slate-800 hidden sm:block" />
              <div className="space-y-1">
                <span className="text-xs text-slate-400">القدرة المبذولة خلال {timeSec} ثانية:</span>
                <div className="text-xl font-bold font-mono text-cyan-400">
                  P = {metricsData.powerW.toFixed(1)} Watt
                </div>
                <span className="text-[10px] text-slate-500">معدل بذل الشغل في الثانية الواحدة</span>
              </div>
            </div>
          </div>
        </div>
      }
      controls={
        <SimulationControls onReset={handleReset}>
          {/* Force */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="w-force">القوة المؤثرة (Force - F):</label>
              <span className="font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded text-sm font-black">
                {force} N
              </span>
            </div>
            <input
              id="w-force"
              type="range"
              min="10"
              max="200"
              step="5"
              value={force}
              onChange={(e) => setForce(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Distance */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="w-dist">المسافة / الإزاحة (Distance - d):</label>
              <span className="font-mono text-cyan-600 dark:text-cyan-400 text-xs font-bold">
                {distance} متر
              </span>
            </div>
            <input
              id="w-dist"
              type="range"
              min="1"
              max="20"
              step="1"
              value={distance}
              onChange={(e) => setDistance(parseInt(e.target.value))}
              className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Time */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="w-time">الزمن المستغرق (Time - t):</label>
              <span className="font-mono text-violet-600 dark:text-violet-400 text-xs font-bold">
                {timeSec} ثانية
              </span>
            </div>
            <input
              id="w-time"
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={timeSec}
              onChange={(e) => setTimeSec(parseFloat(e.target.value))}
              className="w-full accent-violet-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          {/* Mass & Velocity & Height */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="w-height">ارتفاع الجسم عن الأرض (Height - h):</label>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                {height} متر
              </span>
            </div>
            <input
              id="w-height"
              type="range"
              min="0"
              max="15"
              step="1"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <label htmlFor="w-vel">سرعة الجسم (Velocity - v):</label>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                {velocity} m/s
              </span>
            </div>
            <input
              id="w-vel"
              type="range"
              min="0"
              max="20"
              step="1"
              value={velocity}
              onChange={(e) => setVelocity(parseInt(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
          </div>
        </SimulationControls>
      }
      outputs={<SimulationHUD metrics={hudMetrics} />}
      onReset={handleReset}
    />
  );
};
