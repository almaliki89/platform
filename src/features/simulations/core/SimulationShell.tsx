import React, { ReactNode } from 'react';
import { Sparkles, Info, BookOpen, Layers } from 'lucide-react';
import { SimulationErrorBoundary } from './SimulationErrorBoundary';

interface SimulationShellProps {
  title: string;
  subjectTitle?: string;
  topic?: string;
  grade?: string;
  description: string;
  learningObjectives?: string[];
  educationalNote?: ReactNode;
  visualization: ReactNode;
  controls: ReactNode;
  outputs?: ReactNode;
  onReset?: () => void;
  badge?: ReactNode;
  extraPanels?: ReactNode;
}

export const SimulationShell: React.FC<SimulationShellProps> = ({
  title,
  subjectTitle,
  topic,
  grade,
  description,
  learningObjectives,
  educationalNote,
  visualization,
  controls,
  outputs,
  onReset,
  badge,
  extraPanels,
}) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      {/* Simulation Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {subjectTitle && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                {subjectTitle}
              </span>
            )}
            {topic && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {topic}
              </span>
            )}
            {grade && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {grade}
              </span>
            )}
            {badge}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {title}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {description}
          </p>
        </div>

        {learningObjectives && learningObjectives.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 shrink-0 max-w-md">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>أهداف التجربة التعليمية:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-slate-600 dark:text-slate-400">
              {learningObjectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visualization & Output Column (Left/Center in RTL) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm overflow-hidden">
            <SimulationErrorBoundary fallbackTitle="حدث خطأ في محرك العرض" onReset={onReset}>
              {visualization}
            </SimulationErrorBoundary>
          </div>

          {outputs && <div>{outputs}</div>}

          {extraPanels && <div>{extraPanels}</div>}
        </div>

        {/* Controls & Educational Column (Right in RTL) */}
        <div className="lg:col-span-4 space-y-6">
          {controls}

          {educationalNote && (
            <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 p-4 sm:p-5 rounded-2xl space-y-2.5 text-xs text-blue-900 dark:text-blue-200 leading-relaxed shadow-sm">
              <div className="font-bold flex items-center gap-2 text-blue-700 dark:text-blue-400">
                <Info className="w-4 h-4 shrink-0" />
                <span>المفهوم العلمي والقانون الوزاري</span>
              </div>
              <div>{educationalNote}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
