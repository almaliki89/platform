import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubjectId } from '../types/subject';
import { Lesson, StudentState } from '../types';
import { SUBJECTS } from '../data/subjectsData';
import { getUnitsForGrade, getGradeMeta, ORDERED_GRADES, ALL_GRADES_META } from '../data/gradeContentResolver';
import { EducationalGrade } from '../types';
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  GraduationCap,
  FileText,
  Award,
  Layers,
  CheckCircle2,
} from 'lucide-react';

interface SubjectDetailViewProps {
  subjectId: SubjectId;
  studentState: StudentState;
  onBack: () => void;
  onSelectLesson: (lesson: Lesson) => void;
  onOpenSimulations?: (subjectId: SubjectId, simulationId?: string) => void;
}

export const SubjectDetailView: React.FC<SubjectDetailViewProps> = ({
  subjectId = 'english',
  studentState,
  onBack,
  onSelectLesson,
}) => {
  const navigate = useNavigate();
  const [activeGrade, setActiveGrade] = useState<EducationalGrade>(
    studentState.selectedGrade || 'sixth-preparatory'
  );

  const unitsList = getUnitsForGrade(activeGrade);
  const currentGradeMeta = getGradeMeta(activeGrade);

  const subject = {
    id: 'english' as const,
    titleAr: 'اللغة الإنكليزية',
    titleEn: 'English for Iraq',
    description: `المنهج الرسمي المعتمد في العراق لـ (${currentGradeMeta.nameAr}): قواعد، مفردات، قطع استيعابية، أدب، إنشاءات، وأسئلة امتحانية ونماذج شاملة.`,
    category: 'language' as const,
    icon: 'Languages',
    theme: {
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-700 dark:text-blue-300',
      badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
      gradient: 'from-blue-600 to-indigo-600',
    },
    unitsCount: unitsList.length,
    hasSimulations: false,
    isAvailable: true,
  };

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto w-full">
      {/* Subject Header Banner */}
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${subject.theme.gradient} text-white p-6 sm:p-10 shadow-xl`}
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-md text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة للرئيسية</span>
            </button>
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-wider text-white/85 font-medium">
                {subject.titleEn}
              </div>
              <h1 className="text-3xl sm:text-4xl font-black">{subject.titleAr}</h1>
            </div>
            <p className="text-white/90 text-sm max-w-2xl leading-relaxed">
              {subject.description}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/mock')}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm shadow-lg transition-all transform hover:scale-105 cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>محاكي الامتحان الوزاري 100د</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/exam')}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm backdrop-blur-md transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>بنك الأسئلة الوزارية</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grade Selector */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>وحدات ودروس المنهج الوزاري</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            اختر المرحلة الدراسية لاستعراض الوحدات، القواعد، والتمارين الوزارية
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
          {ORDERED_GRADES.map((gId) => {
            const meta = ALL_GRADES_META[gId];
            const isSelected = activeGrade === gId;
            return (
              <button
                key={gId}
                type="button"
                onClick={() => setActiveGrade(gId)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {meta.shortName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Units & Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {unitsList.map((unit) => (
          <div
            key={unit.id}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-black text-xs">
                الوحدة {unit.number}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {unit.lessons.length} دروس
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {unit.titleAr}
              </h3>
              <p className="text-xs text-slate-500 font-medium">{unit.titleEn}</p>
            </div>
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              {unit.lessons.map((lesson) => {
                const isCompleted = studentState.completedLessonIds.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    type="button"
                    onClick={() => onSelectLesson(lesson)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-right text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 truncate">
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0" />
                      )}
                      <span className="truncate">{lesson.titleAr}</span>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-indigo-500 group-hover:-translate-x-1 transition-transform shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
