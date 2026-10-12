import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, Sparkles, BookOpen, Award, CheckCircle2, 
  ChevronLeft, ArrowRight, ShieldCheck, Flame, Target, BookMarked
} from 'lucide-react';
import { EducationalGrade, StudentState, Unit, Lesson } from '../types';
import { 
  getGradeMeta, getUnitsForGrade, getStoriesForGrade, 
  getEssaysForGrade, getMockPapersForGrade, ORDERED_GRADES, ALL_GRADES_META 
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

  // Validate gradeId or fallback
  const validGrade: EducationalGrade = (gradeId && ORDERED_GRADES.includes(gradeId as EducationalGrade))
    ? (gradeId as EducationalGrade)
    : (studentState.selectedGrade || 'sixth-preparatory');

  const gradeMeta = getGradeMeta(validGrade);
  const units = getUnitsForGrade(validGrade);
  const stories = getStoriesForGrade(validGrade);
  const essays = getEssaysForGrade(validGrade);
  const mockPapers = getMockPapersForGrade(validGrade);
  const isMinisterial = gradeMeta.isMinisterial;

  // Compute stats for this grade
  const allLessons = units.flatMap(u => u.lessons);
  const completedCount = allLessons.filter(l => studentState.completedLessonIds.includes(l.id)).length;
  const progressPct = allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0;

  return (
    <div className="space-y-10 pb-24 max-w-7xl mx-auto w-full min-w-0" dir="rtl">
      
      {/* Grade Selector Bar across top */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${gradeMeta.accentGradient} shadow-lg`}>
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold">
                الصفحة المخصصة الحصرية
              </span>
              {isMinisterial && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  منهج وزاري معتمد
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              منهج اللغة الإنكليزية • {gradeMeta.nameAr}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              {gradeMeta.description} • إشراف الأستاذ مصطفى تركي
            </p>
          </div>
        </div>

        {/* Grade switcher pill list */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 md:pb-0">
          {ORDERED_GRADES.map((g) => {
            const meta = ALL_GRADES_META[g];
            const isActive = g === validGrade;
            return (
              <button
                key={g}
                onClick={() => {
                  onSelectGrade(g);
                  navigate(`/grade/${g}`);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive 
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black' 
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {meta.shortName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Banner for the specific grade */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 text-white p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>كل ما يتعلق بـ {gradeMeta.nameAr} في مكان واحد حصراً</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              {isMinisterial ? 'استعد للامتحان الوزاري والمدرسية بنسبة نجاح 100% (للثالث والسادس حصراً)' : 'استعد للامتحان النهائي المدرسي بنسبة نجاح 100% (امتحان نهائي فقط)'}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              {isMinisterial 
                ? `هذه الصفحة الخاصة بـ ${gradeMeta.nameAr} مخصصة للتحضير الشامل للامتحانات الوزارية والمدرسية بنسبة نجاح 100% تشمل كافة الوحدات (${units.length} وحدات)، القصص والأدب، الإنشاءات، والمراجعة المركزة والمحاكي الوزاري.`
                : `هذه الصفحة الخاصة بـ ${gradeMeta.nameAr} مخصصة للتحضير للامتحان النهائي المدرسي بنسبة نجاح 100% (امتحان نهائي فقط) تشمل كافة الوحدات (${units.length} وحدات)، القصص، والتدريبات الشاملة.`}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => {
                  onSelectGrade(validGrade);
                  onNavigateTab('mock');
                }}
                className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>{isMinisterial ? `محاكي امتحان ${gradeMeta.shortName} الوزاري (100د)` : `محاكي امتحان ${gradeMeta.shortName} النهائي (100د)`}</span>
              </button>
              <button
                onClick={() => {
                  onSelectGrade(validGrade);
                  onNavigateTab('review');
                }}
                className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>المراجعة المركزة للـ {gradeMeta.shortName}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-indigo-300 font-bold block mb-1">نسبة إنجازك</span>
              <p className="text-2xl sm:text-3xl font-black text-white">{progressPct}%</p>
              <span className="text-[10px] text-slate-400">{completedCount} من {allLessons.length} درس</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-amber-300 font-bold block mb-1">الوحدات</span>
              <p className="text-2xl sm:text-3xl font-black text-white">{units.length}</p>
              <span className="text-[10px] text-slate-400">وحدات رسمية</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-purple-300 font-bold block mb-1">القصص/الأدب</span>
              <p className="text-2xl sm:text-3xl font-black text-white">{stories.length}</p>
              <span className="text-[10px] text-slate-400">نصوص مقررة</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-xs text-rose-300 font-bold block mb-1">الإنشاءات</span>
              <p className="text-2xl sm:text-3xl font-black text-white">{essays.length}</p>
              <span className="text-[10px] text-slate-400">إنشاءات وزارية</span>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Visual Curriculum Guide & Infographics (الشرح الصوري لكل الصفوف) */}
      <VisualCurriculumGuide 
        grade={validGrade} 
        onSelectLesson={(lessonId) => {
          const l = allLessons.find(item => item.id === lessonId);
          if (l) onSelectLesson(l);
        }}
        onNavigateTab={onNavigateTab}
      />

      {/* 2. Units & Lessons Section specifically for this grade */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>مناهج الوحدات الدراسية الخاصة بـ {gradeMeta.nameAr}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              استعرض كافة دروس القواعد، والقطع الاستيعابية، والمفردات والتمارين حصراً لهذا الصف.
            </p>
          </div>
        </div>

        <CurriculumUnitsSection
          studentState={studentState}
          units={units}
          onSelectUnit={onSelectUnit}
          onSelectLesson={onSelectLesson}
        />
      </div>

    </div>
  );
};
