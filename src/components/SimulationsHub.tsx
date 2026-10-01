import React, { useState, Suspense } from 'react';
import { SubjectId } from '../types/subject';
import { SIMULATION_REGISTRY, getSimulationsForSubject, SimulationRegistryEntry } from '../features/simulations';
import { SimulationErrorBoundary } from '../features/simulations/core/SimulationErrorBoundary';
import { Zap, Calculator, FlaskConical, PlayCircle, ArrowLeft, Loader2, Sparkles, Layers } from 'lucide-react';

interface SimulationsHubProps {
  subjectId: SubjectId;
  onBack: () => void;
  initialSimulationId?: string;
}

export const SimulationsHub: React.FC<SimulationsHubProps> = ({
  subjectId,
  onBack,
  initialSimulationId,
}) => {
  const isSpecificScience = ['physics', 'mathematics', 'chemistry'].includes(subjectId);
  const subjectSimulations: SimulationRegistryEntry[] = isSpecificScience
    ? getSimulationsForSubject(subjectId as 'physics' | 'mathematics' | 'chemistry')
    : SIMULATION_REGISTRY;

  const [activeSimId, setActiveSimId] = useState<string>(() => {
    if (initialSimulationId && subjectSimulations.some((s) => s.id === initialSimulationId)) {
      return initialSimulationId;
    }
    return subjectSimulations[0]?.id || SIMULATION_REGISTRY[0].id;
  });

  const activeEntry =
    subjectSimulations.find((s) => s.id === activeSimId) || subjectSimulations[0] || SIMULATION_REGISTRY[0];

  const getSubjectBadge = (sId: string) => {
    switch (sId) {
      case 'physics':
        return { label: 'الفيزياء', color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20' };
      case 'mathematics':
        return { label: 'الرياضيات', color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20' };
      case 'chemistry':
        return { label: 'الكيمياء', color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' };
      default:
        return { label: 'مختبر علمي', color: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20' };
    }
  };

  const getSubjectIcon = (sId: string) => {
    switch (sId) {
      case 'physics':
        return <Zap className="w-4 h-4 text-cyan-500" />;
      case 'mathematics':
        return <Calculator className="w-4 h-4 text-violet-500" />;
      case 'chemistry':
        return <FlaskConical className="w-4 h-4 text-rose-500" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  const ActiveComponent = activeEntry.component;

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-16">
      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all font-semibold text-xs sm:text-sm shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>العودة لقسم المادة</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${getSubjectBadge(subjectId).color}`}>
                {getSubjectBadge(subjectId).label}
              </span>
              <span className="text-xs text-slate-400 font-medium">OMEGA V4.1 Science Engine</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              المختبر التفاعلي والمحاكاة العلمية
            </h1>
          </div>
        </div>

        {/* Subject-Specific Simulation Selector Tabs */}
        {subjectSimulations.length > 1 && (
          <div className="flex flex-wrap gap-2 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            {subjectSimulations.map((sim) => {
              const isSelected = activeSimId === sim.id;
              return (
                <button
                  key={sim.id}
                  type="button"
                  onClick={() => setActiveSimId(sim.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {getSubjectIcon(sim.subjectId)}
                  <span>{sim.titleAr}</span>
                  <span className="text-[10px] font-mono opacity-60 uppercase">({sim.mode})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Active Lazy-Loaded Simulation Render with Error Boundary and Suspense */}
      <SimulationErrorBoundary
        fallbackTitle="تعذر تشغيل المحاكاة على هذا الجهاز"
        onReset={() => setActiveSimId(activeEntry.id)}
      >
        <Suspense
          fallback={
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-16 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto animate-pulse">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                جاري تحميل بيئة المحاكاة العلمية...
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                يتم تحميل الموارد الحسابية وثلاثية الأبعاد بدقة متوافقة مع جهازك.
              </p>
            </div>
          }
        >
          <ActiveComponent />
        </Suspense>
      </SimulationErrorBoundary>
    </div>
  );
};
