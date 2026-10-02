import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubjectId } from '../types/subject';
import { SIMULATION_REGISTRY, getSimulationsForSubject, SimulationRegistryEntry } from '../features/simulations';
import { SimulationErrorBoundary } from '../features/simulations/core/SimulationErrorBoundary';
import {
  Zap,
  Calculator,
  FlaskConical,
  ArrowLeft,
  Loader2,
  Layers,
  GraduationCap,
} from 'lucide-react';

interface SimulationsHubProps {
  subjectId: SubjectId;
  onBack: () => void;
  initialSimulationId?: string;
}

const ErrorTrigger: React.FC = () => {
  throw new Error('E2E_TEST_INTENTIONAL_SIMULATION_ERROR');
};

export const SimulationsHub: React.FC<SimulationsHubProps> = ({
  subjectId,
  onBack,
  initialSimulationId,
}) => {
  const navigate = useNavigate();
  const isSpecificScience = ['physics', 'mathematics', 'chemistry'].includes(subjectId);
  const subjectSimulations: SimulationRegistryEntry[] = isSpecificScience
    ? getSimulationsForSubject(subjectId as 'physics' | 'mathematics' | 'chemistry')
    : SIMULATION_REGISTRY;

  const [activeGradeFilter, setActiveGradeFilter] = useState<string>('all');
  const [activeSimId, setActiveSimId] = useState<string>(() => {
    if (initialSimulationId && subjectSimulations.some((s) => s.id === initialSimulationId)) {
      return initialSimulationId;
    }
    return subjectSimulations[0]?.id || SIMULATION_REGISTRY[0].id;
  });

  const [intentionalError, setIntentionalError] = useState<boolean>(false);

  useEffect(() => {
    const isE2E = import.meta.env.VITE_E2E_MODE === 'true';
    if (
      isE2E &&
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get('forceSimulationError') === '1'
    ) {
      setIntentionalError(true);
    }
  }, []);

  // Synchronize when initialSimulationId changes from URL
  useEffect(() => {
    if (initialSimulationId && subjectSimulations.some((s) => s.id === initialSimulationId)) {
      setActiveSimId(initialSimulationId);
    }
  }, [initialSimulationId, subjectSimulations]);

  const filteredSimulations =
    activeGradeFilter === 'all'
      ? subjectSimulations
      : subjectSimulations.filter((sim) => sim.gradeId === activeGradeFilter);

  const activeEntry =
    subjectSimulations.find((s) => s.id === activeSimId) || subjectSimulations[0] || SIMULATION_REGISTRY[0];

  const handleSelectSim = (simId: string) => {
    setActiveSimId(simId);
    navigate(`/subject/${subjectId}/simulations/${simId}`);
  };

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

  const ActiveComponent = activeEntry.component;

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full pb-16 max-w-full overflow-x-hidden px-1 sm:px-4">
      {/* Top Navigation Bar */}
      <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 max-w-full overflow-x-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all font-semibold text-xs sm:text-sm shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>العودة لقسم المادة</span>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${getSubjectBadge(subjectId).color}`}>
                  {getSubjectBadge(subjectId).label}
                </span>
                <span className="text-xs text-slate-400 font-medium">OMEGA V4.2 Science Simulation System</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                المختبر التفاعلي والمحاكاة العلمية
              </h1>
            </div>
          </div>

          {/* Grade Filtering for Physics if multiple grades exist */}
          {subjectId === 'physics' && (
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold flex-wrap">
              <button
                onClick={() => setActiveGradeFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeGradeFilter === 'all'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                جميع التجارب ({subjectSimulations.length})
              </button>
              <button
                onClick={() => {
                  setActiveGradeFilter('first-intermediate');
                  const firstSim = subjectSimulations.find((s) => s.gradeId === 'first-intermediate');
                  if (firstSim) handleSelectSim(firstSim.id);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeGradeFilter === 'first-intermediate'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                الأول المتوسط (5)
              </button>
              <button
                onClick={() => {
                  setActiveGradeFilter('second-intermediate');
                  const firstSim = subjectSimulations.find((s) => s.gradeId === 'second-intermediate');
                  if (firstSim) handleSelectSim(firstSim.id);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeGradeFilter === 'second-intermediate'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                الثاني المتوسط (6)
              </button>
              <button
                onClick={() => {
                  setActiveGradeFilter('third-intermediate');
                  const firstSim = subjectSimulations.find((s) => s.gradeId === 'third-intermediate');
                  if (firstSim) handleSelectSim(firstSim.id);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeGradeFilter === 'third-intermediate'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                الثالث المتوسط (9)
              </button>
              <button
                onClick={() => {
                  setActiveGradeFilter('fourth-scientific');
                  const firstSim = subjectSimulations.find((s) => s.gradeId === 'fourth-scientific');
                  if (firstSim) handleSelectSim(firstSim.id);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeGradeFilter === 'fourth-scientific'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                الرابع العلمي (9)
              </button>
              <button
                onClick={() => {
                  setActiveGradeFilter('fifth-scientific');
                  const firstSim = subjectSimulations.find((s) => s.gradeId === 'fifth-scientific');
                  if (firstSim) handleSelectSim(firstSim.id);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeGradeFilter === 'fifth-scientific'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                الخامس العلمي (10)
              </button>
              <button
                onClick={() => {
                  setActiveGradeFilter('sixth-scientific');
                  const firstSim = subjectSimulations.find((s) => s.gradeId === 'sixth-scientific');
                  if (firstSim) handleSelectSim(firstSim.id);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeGradeFilter === 'sixth-scientific'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                السادس العلمي (8)
              </button>
            </div>
          )}
        </div>

        {/* Horizontal Simulation Tab Selector */}
        {subjectSimulations.length > 1 && (
          <div className="flex overflow-x-auto pb-1 gap-2 border-t border-slate-100 dark:border-slate-800 pt-3 no-scrollbar">
            {filteredSimulations.map((sim) => {
              const isSelected = activeSimId === sim.id;
              return (
                <button
                  key={sim.id}
                  type="button"
                  onClick={() => handleSelectSim(sim.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {sim.chapterNumber && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/10 dark:bg-black/20 font-mono">
                      فصل {sim.chapterNumber}
                    </span>
                  )}
                  <span>{sim.titleAr}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Active Lazy-Loaded Simulation Render with Error Boundary and Suspense */}
      <SimulationErrorBoundary
        fallbackTitle="تعذر تشغيل المحاكاة على هذا الجهاز"
        onReset={() => handleSelectSim(activeEntry.id)}
      >
        <Suspense
          fallback={
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-16 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto animate-pulse">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                جاري تحميل بيئة المحاكاة الفيزيائية...
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                يتم تهيئة المحرك الفيزيائي والمعادلات الرياضية الخاصة بـ {activeEntry.titleAr}.
              </p>
            </div>
          }
        >
          {intentionalError ? <ErrorTrigger /> : <ActiveComponent />}
        </Suspense>
      </SimulationErrorBoundary>
    </div>
  );
};
