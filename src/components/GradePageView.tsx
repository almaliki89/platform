import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, BookOpen, Award, CheckCircle2, 
  ArrowRight, ShieldCheck, Clock, Target, Calendar,
  Users, Layers, Sparkles
} from 'lucide-react';
import { EducationalGrade, StudentState, Unit, Lesson } from '../types';
import { 
  getGradeMeta, getUnitsForGrade, getStoriesForGrade, 
  getEssaysForGrade, ORDERED_GRADES, ALL_GRADES_META 
} from '../data/gradeContentResolver';
import { CurriculumUnitsSection } from './CurriculumUnitsSection';
import { VisualCurriculumGuide } from './VisualCurriculumGuide';

interface GradePageViewProps {
  studentState: StudentState;
  onSelectGrade: (grade: EducationalGrade) => void;
  onSelectUnit: (unit: Unit) => void;
  onSelectLesson: (lesson: Lesson) => void;
  onNavigateTab: (tab: string) => void;
}

export const GradePageView: React.FC<GradePageViewProps> = ({
  studentState,
  onSelectGrade,
  onSelectUnit,
  onSelectLesson,
  onNavigateTab,
}) => {
  const { gradeId } = useParams<{ gradeId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'units' | 'visual' | 'age-guide'>('units');

  // Validate gradeId or fallback
  const validGrade: EducationalGrade = (gradeId && ORDERED_GRADES.includes(gradeId as EducationalGrade))
    ? (gradeId as EducationalGrade)
    : (studentState.selectedGrade || 'sixth-preparatory');

  useEffect(() => {
    if (studentState.selectedGrade !== validGrade) onSelectGrade(validGrade);
  }, [validGrade, studentState.selectedGrade, onSelectGrade]);

  const gradeMeta = getGradeMeta(validGrade);
  const units = getUnitsForGrade(validGrade);
  const stories = getStoriesForGrade(validGrade);
  const essays = getEssaysForGrade(validGrade);
  const isMinisterial = gradeMeta.isMinisterial;

  // Compute stats for this grade
  const allLessons = units.flatMap(u => u.lessons);
  const completedCount = allLessons.filter(l => studentState.completedLessonIds.includes(l.id)).length;
  const progressPct = allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0;

  return (
    <div className="omega-grade-page space-y-6 pb-20 max-w-7xl mx-auto w-full min-w-0" dir="rtl">
      
      {/* 1. Single Unified Editorial Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                منهج اللغة الإنكليزية العراقي
              </span>
              <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {isMinisterial ? 'شهادة وزارية عامة' : 'امتحان مدرسي سنوي'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              منهج اللغة الإنكليزية · {gradeMeta.nameAr}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {gradeMeta.description}
            </p>

            {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span>المرحلة: <strong className="text-slate-700 dark:text-slate-300">{gradeMeta.stageAr}</strong></span>
              <span aria-hidden="true">·</span>
              <span>الفئة العمرية: <strong className="text-slate-700 dark:text-slate-300">{gradeMeta.ageRangeAr}</strong></span>
              <span aria-hidden="true">·</span>
              <span>المصدر المعتمد: <strong className="text-emerald-700 dark:text-emerald-400">{gradeMeta.curriculumBook}</strong></span>
              <span aria-hidden="true">·</span>
              <span>الساعات الأسبوعية: <strong className="text-slate-700 dark:text-slate-300">{gradeMeta.weeklyHours}</strong></span>
              <span aria-hidden="true">·</span>
              <span>إشراف الأستاذ مصطفى تركي</span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  onSelectGrade(validGrade);
                  onNavigateTab('mock');
                }}
                className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>{isMinisterial ? 'محاكي الامتحان الوزاري' : 'محاكي الامتحان النهائي'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectGrade(validGrade);
                  onNavigateTab('review');
                }}
                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                المراجعة المركزة
              </button>
            </div>
          </div>

          {/* Quick Metrics Column */}
          <div className="grid grid-cols-2 gap-3 min-w-[240px] shrink-0">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">نسبة الإنجاز</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">{progressPct}%</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">{completedCount} من {allLessons.length} درس</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">الفئة العمرية</span>
              <span className="text-base font-bold text-slate-900 dark:text-white">{gradeMeta.typicalAge} سنة</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">{gradeMeta.ageRangeAr}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">الوحدات</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">{units.length}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">وحدات دراسية</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">المحتوى الإثرائي</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">{stories.length + essays.length}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">قصص وإنشاءات</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Structured Section Tabs (Replaces 4 vertical stacked sections) */}
      <div className="omega-tabbar flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl max-w-full">
        <button
          type="button"
          onClick={() => setActiveTab('units')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'units'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          الوحدات والدروس الدراسية ({units.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('visual')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'visual'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          الشرح الصوري والدليل البصري
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('age-guide')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'age-guide'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          دليل الأعمار والمراحل ({ORDERED_GRADES.length})
        </button>
      </div>

      {/* 3. Tab Contents */}
      {activeTab === 'units' && (
        <div className="space-y-4">
          <CurriculumUnitsSection
            grade={validGrade}
            studentState={studentState}
            units={units}
            onSelectUnit={onSelectUnit}
            onSelectLesson={onSelectLesson}
          />
        </div>
      )}

      {activeTab === 'visual' && (
        <VisualCurriculumGuide 
          grade={validGrade} 
          onSelectLesson={(lessonId) => {
            const l = allLessons.find(item => item.id === lessonId);
            if (l) onSelectLesson(l);
          }}
          onNavigateTab={onNavigateTab}
        />
      )}

      {activeTab === 'age-guide' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              خارطة الأعمار والمراحل الدراسية لجميع صفوف التعليم في العراق
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              تدرج الأعمار والمراحل من الأول المتوسط (12 سنة) حتى السادس الإعدادي (18 سنة) وفق وزارة التربية العراقية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {ORDERED_GRADES.map((g) => {
              const meta = ALL_GRADES_META[g];
              const isCurrent = g === validGrade;
              return (
                <div 
                  key={g}
                  onClick={() => {
                    onSelectGrade(g);
                    navigate(`/grade/${g}`);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-slate-50 dark:bg-slate-800/80 border-slate-900 dark:border-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                      {meta.stage === 'intermediate' ? 'المرحلة المتوسطة' : 'المرحلة الإعدادية'}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      العمر: {meta.ageRangeAr}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>{meta.nameAr}</span>
                    {isCurrent && (
                      <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                        الصف المختار
                      </span>
                    )}
                  </h4>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {meta.developmentStage}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                    <span className="text-slate-400">
                      {meta.isMinisterial ? 'شهادة وزارية عامة' : 'امتحان سنوي'}
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                      عرض المنهج ←
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
