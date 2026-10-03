import React from 'react';
import { 
  BookOpen, Sparkles, Trophy, CheckCircle2, ChevronLeft, ArrowRight,
  HelpCircle, Compass, FileText, Bookmark, Star, ArrowUpRight, Flame,
  Target, GraduationCap, Clock, Award, CheckCircle, ShieldCheck, Zap, Eye,
  BookOpenCheck, Moon, Languages, Calculator, FlaskConical, Scroll, Globe
} from 'lucide-react';
import { SUBJECTS } from '../data/subjectsData';
import { SubjectId } from '../types/subject';
import { CURRICULUM_UNITS } from '../data/curriculumData';
import { THIRD_INTERMEDIATE_UNITS } from '../data/thirdIntermediateData';
import { ESSAYS_DATA } from '../data/essaysData';
import { StudentState, Unit, Lesson, EducationalGrade } from '../types';
import { CurriculumUnitsSection } from './CurriculumUnitsSection';

interface DashboardProps {
  studentState: StudentState;
  onSelectUnit: (unit: Unit) => void;
  onSelectLesson: (lesson: Lesson) => void;
  onNavigateTab: (tab: 'exam' | 'mock' | 'literature' | 'essays' | 'verbs' | 'vocab' | 'review') => void;
  onSelectSubject: (subjectId: SubjectId) => void;
  onOpenSimulations: (subjectId: SubjectId) => void;
  selectedGrade?: EducationalGrade;
  onSelectGrade?: (grade: EducationalGrade) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  studentState,
  onSelectUnit,
  onSelectLesson,
  onNavigateTab,
  onSelectSubject,
  onOpenSimulations,
  selectedGrade = 'sixth-preparatory',
  onSelectGrade,
}) => {
  const isThirdIntermediate = selectedGrade === 'third-intermediate' || studentState.selectedGrade === 'third-intermediate';
  const currentUnitsList = isThirdIntermediate ? THIRD_INTERMEDIATE_UNITS : CURRICULUM_UNITS;

  // Compute overall progress
  const allLessons = currentUnitsList.flatMap(u => u.lessons);
  const totalLessonsCount = allLessons.length;
  const completedLessonsCount = studentState.completedLessonIds.length;
  const overallProgressPercentage = totalLessonsCount > 0 
    ? Math.round((completedLessonsCount / totalLessonsCount) * 100) 
    : 0;

  // Accuracy
  const accuracyPercentage = studentState.totalQuestionsAttempted > 0
    ? Math.round((studentState.totalQuestionsCorrect / studentState.totalQuestionsAttempted) * 100)
    : 100;

  // Find last visited lesson
  const lastLesson = allLessons.find(l => l.id === studentState.lastVisitedLessonId) || allLessons[0];
  const lastLessonUnit = currentUnitsList.find(u => u.id === lastLesson?.unitId);

  // Icon mapping helper for 8 subjects
  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpenCheck': return <BookOpenCheck className="w-6 h-6" />;
      case 'Moon': return <Moon className="w-6 h-6" />;
      case 'Languages': return <Languages className="w-6 h-6" />;
      case 'Calculator': return <Calculator className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'FlaskConical': return <FlaskConical className="w-6 h-6" />;
      case 'Scroll': return <Scroll className="w-6 h-6" />;
      case 'Globe': return <Globe className="w-6 h-6" />;
      default: return <BookOpen className="w-6 h-6" />;
    }
  };

  // Ministerial Exam Map
  const examStructure = isThirdIntermediate ? [
    { q: 'Q1', title: 'القطعة الخارجية وقطع الكتاب المقررة', marks: '20 درجة', tag: 'Reading & Panther 3.0D', color: 'border-teal-400/40 text-teal-300' },
    { q: 'Q2', title: 'القواعد والوظائف اللغوية', marks: '20 درجة', tag: 'Grammar & Functions', color: 'border-blue-400/40 text-blue-300' },
    { q: 'Q3', title: 'المفردات والتوصيل والإملاء والتنقيط', marks: '20 درجة', tag: 'Vocab, Spelling & Punctuation', color: 'border-emerald-400/40 text-emerald-300' },
    { q: 'Q4', title: 'القصص المقررة (Story Time): لوسي وغزالة وابن الهيثم', marks: '10 درجات', tag: 'Story Time Focus', color: 'border-purple-400/40 text-purple-300' },
    { q: 'Q5', title: 'الإنشاء الوزاري النموذجي', marks: '15 درجة', tag: 'Written Composition', color: 'border-rose-400/40 text-rose-300' },
  ] : [
    { q: 'Q1', title: 'القطعة الخارجية وقطع الكتاب', marks: '20 درجة', tag: 'Reading & Stories', color: 'border-amber-400/40 text-amber-300' },
    { q: 'Q2', title: 'القواعد والوظائف اللغوية', marks: '30 درجة', tag: 'Grammar & Functions', color: 'border-blue-400/40 text-blue-300' },
    { q: 'Q3', title: 'المفردات والتوصيل والإملاء', marks: '20 درجة', tag: 'Vocab & Spelling', color: 'border-emerald-400/40 text-emerald-300' },
    { q: 'Q4', title: 'الأدب الوزاري: كبرياء وتحامل وكما تشاء', marks: '10 درجات', tag: 'Literature Focus', color: 'border-purple-400/40 text-purple-300' },
    { q: 'Q5', title: 'الإنشاء الوزاري النموذجي', marks: '20 درجة', tag: 'Written Composition', color: 'border-rose-400/40 text-rose-300' },
  ];

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto w-full min-w-0">
      
      {/* 1. Executive Master Hero Section */}
      <section 
        id="hero-dashboard-banner"
        className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 text-white p-5 sm:p-7 lg:p-10 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 sm:w-[500px] h-64 sm:h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -mr-10 sm:-mr-20 -mt-10 sm:-mt-20 max-w-full" />
        <div className="absolute bottom-0 left-0 w-52 sm:w-[400px] h-52 sm:h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -ml-10 sm:-ml-20 -mb-10 sm:-mb-20 max-w-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-[11px] sm:text-xs font-semibold text-amber-300 shadow-sm flex-wrap">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span>المنصة العراقية التعليمية الشاملة • OMEGA V4 Multi-Subject</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.2] break-words">
                مرحباً بك يا بطل، <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-100">{studentState.name}</span>
              </h1>
              <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-xl font-normal">
                منصتك المتكاملة لجميع المواد الدراسية مع محرك تجارب علمية ثلاثية الأبعاد (3D) ومحاكي الامتحان الوزاري لضمان الدرجة الكاملة <strong className="text-white font-bold">(100/100)</strong>.
              </p>
            </div>

            {lastLesson && (
              <div className="pt-1">
                <button 
                  id="resume-last-lesson-card"
                  onClick={() => onSelectLesson(lastLesson)}
                  className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-4 p-3.5 sm:px-5 sm:py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-black text-xs text-white shrink-0">
                      U{lastLessonUnit?.number || 1}
                    </div>
                    <div className="text-right truncate">
                      <span className="text-[10px] text-indigo-100 block font-normal">متابعة الدرس الحالي:</span>
                      <span className="text-xs sm:text-sm font-bold text-white truncate block">
                        {lastLesson.titleAr}
                      </span>
                    </div>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-indigo-200 group-hover:-translate-x-1 transition-transform shrink-0" />
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 sm:gap-3.5">
            <div className="p-3 sm:p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md flex flex-col justify-between min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400">إنجاز المنهاج</span>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
              <div className="mt-2 sm:mt-3">
                <p className="text-xl sm:text-3xl font-black text-white">{overallProgressPercentage}%</p>
                <div className="w-full bg-slate-700 h-1.5 rounded-full mt-1.5 sm:mt-2 overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full transition-all" style={{ width: `${overallProgressPercentage}%` }} />
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md flex flex-col justify-between min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400">نقاط التميز (XP)</span>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
              <div className="mt-2 sm:mt-3">
                <p className="text-xl sm:text-3xl font-black text-amber-300">{studentState.xp}</p>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1 truncate">{completedLessonsCount} من {totalLessonsCount} درس</p>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md flex flex-col justify-between min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400">دقة الإجابات</span>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
              <div className="mt-2 sm:mt-3">
                <p className="text-xl sm:text-3xl font-black text-emerald-300">{accuracyPercentage}%</p>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1 truncate">{studentState.totalQuestionsAttempted} سؤال تم حله</p>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md flex flex-col justify-between min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400">التتابع والانضباط</span>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                  <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" />
                </div>
              </div>
              <div className="mt-2 sm:mt-3">
                <p className="text-xl sm:text-3xl font-black text-rose-300">{studentState.streakDays} أيام</p>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1 truncate">دراسة يومية مستمرة</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. PHASE 2 — HOME PAGE SUBJECT HUB (8 Subject Cards) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              المواد الدراسية للمرحلة المتوسطة والإعدادية
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              اختر المادة الدراسية لاستعراض الوحدات، الدروس، والمختبرات التفاعلية ثلاثية الأبعاد (3D)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SUBJECTS.map((subject) => (
            <div
              key={subject.id}
              onClick={() => onSelectSubject(subject.id)}
              className={`relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between min-h-[220px]`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 dark:bg-slate-800/50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform"></div>

              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${subject.theme.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                    {getSubjectIcon(subject.icon)}
                  </div>
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${subject.isAvailable ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'}`}>
                    {subject.isAvailable ? 'متاح للدراسة' : 'قريباً'}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {subject.titleAr}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {subject.titleEn}
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {subject.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <span>استعراض المادة</span>
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </div>
                {subject.hasSimulations && (
                  <span className="text-[10px] bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 font-bold px-2 py-0.5 rounded">
                    محاكاة 3D
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Ministerial Exam 100 Marks Blueprint Strip */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
              خريطة توزيع درجات الدفتر الامتحاني الوزاري (100 درجة)
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
          {examStructure.map((item) => (
            <div 
              key={item.q}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-black text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    {item.q}
                  </span>
                  <span className="text-xs font-black text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-md">
                    {item.marks}
                  </span>
                </div>
                <p className="font-bold text-slate-900 dark:text-white text-xs mt-1 leading-snug">
                  {item.title}
                </p>
              </div>
              <span className="text-[10px] text-slate-400 font-medium mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 block">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Core Ministerial Hubs */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
              المحاور التخصصية لبنك الوزاريات
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              تدريب مكثف على الأدب، الإنشاءات، الأفعال الشاذة، والأسئلة الوزارية الشاملة
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          
          <div 
            onClick={() => onNavigateTab('exam')}
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 cursor-pointer transition-all flex flex-col justify-between group min-w-0"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <HelpCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-md">
                2014 - 2026
              </span>
              <h3 className="text-base font-black text-slate-900 dark:text-white mt-2 group-hover:text-indigo-600 transition-colors">
                بنك الأسئلة الوزارية
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                جميع الأسئلة المقسمة حسب الأدوار والقواعد والحل النموذجي.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>بدء الاختبار</span>
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          <div 
            onClick={() => onNavigateTab('vocab')}
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 cursor-pointer transition-all flex flex-col justify-between group min-w-0"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Eye className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-md">
                السؤال الثالث • 20 درجة
              </span>
              <h3 className="text-base font-black text-slate-900 dark:text-white mt-2 group-hover:text-indigo-600 transition-colors">
                أطلس الرموز والمفردات
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                تثبيت المفردات والمتلازمات الوزارية بالترميز البصري.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>استعراض الأطلس</span>
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          <div 
            onClick={() => onNavigateTab('literature')}
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 cursor-pointer transition-all flex flex-col justify-between group min-w-0"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-all">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-md">
                السؤال الرابع • 10 درجات
              </span>
              <h3 className="text-base font-black text-slate-900 dark:text-white mt-2 group-hover:text-amber-600 transition-colors">
                الأدب الوزاري المقرّر
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                رواية كبرياء وتحامل ومسرحية كما تشاء والأسئلة الوزارية.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>استكشاف الأدب</span>
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          <div 
            onClick={() => onNavigateTab('essays')}
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 cursor-pointer transition-all flex flex-col justify-between group min-w-0"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                السؤال الخامس • 20 درجة
              </span>
              <h3 className="text-base font-black text-slate-900 dark:text-white mt-2 group-hover:text-emerald-600 transition-colors">
                الإنشاءات النموذجية
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                نماذج الحفظ المعتمدة مع عدّاد الكلمات ومحاكي التسميع.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>تسميع الإنشاء</span>
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          <div 
            onClick={() => onNavigateTab('verbs')}
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-400 cursor-pointer transition-all flex flex-col justify-between group min-w-0"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3 group-hover:bg-rose-600 group-hover:text-white transition-all">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded-md">
                V1 ➔ V2 ➔ V3
              </span>
              <h3 className="text-base font-black text-slate-900 dark:text-white mt-2 group-hover:text-rose-600 transition-colors">
                مختبر الأفعال الشاذة
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                تصنيف الأفعال الشاذة حسب الأنماط الصوتية لسرعة الحفظ.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-rose-700">
              <span>دخول المختبر</span>
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* 5. Curriculum Units Master Section */}
      <CurriculumUnitsSection
        studentState={studentState}
        onSelectUnit={onSelectUnit}
        onSelectLesson={onSelectLesson}
        units={currentUnitsList}
      />

    </div>
  );
};
