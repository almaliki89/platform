import React from 'react';
import { 
  BookOpen, Sparkles, Trophy, CheckCircle2, ChevronLeft, ArrowRight,
  HelpCircle, Compass, FileText, Bookmark, Star, ArrowUpRight, Flame
} from 'lucide-react';
import { CURRICULUM_UNITS } from '../data/curriculumData';
import { StudentState, Unit, Lesson } from '../types';

interface DashboardProps {
  studentState: StudentState;
  onSelectUnit: (unit: Unit) => void;
  onSelectLesson: (lesson: Lesson) => void;
  onNavigateTab: (tab: 'exam' | 'literature' | 'essays' | 'verbs') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  studentState,
  onSelectUnit,
  onSelectLesson,
  onNavigateTab,
}) => {
  // Compute overall progress
  const allLessons = CURRICULUM_UNITS.flatMap(u => u.lessons);
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
  const lastLessonUnit = CURRICULUM_UNITS.find(u => u.id === lastLesson?.unitId);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Hero Welcome Banner */}
      <section 
        id="hero-dashboard-banner"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-indigo-700/50"
      >
        {/* Background glow graphics */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>منهاج 2027 • طبعة الأستاذ مصطفى تركي النموذجية</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              أهلاً بك يا بطل، <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">{studentState.name}</span>!
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              طريقك نحو درجة 100 في اللغة الإنكليزية يبدأ بالانضباط اليومي، وفهم القواعد بدقة، وحل النماذج الوزارية المكررة بدون تعقيد.
            </p>

            {/* Quick Resume Strip */}
            {lastLesson && (
              <div className="pt-2">
                <div 
                  id="resume-last-lesson-card"
                  onClick={() => onSelectLesson(lastLesson)}
                  className="inline-flex items-center gap-3 p-2.5 sm:px-4 sm:py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-sm cursor-pointer transition-all group"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
                    {lastLessonUnit?.number || 1}
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-indigo-200 font-medium">تابع من حيث توقفت:</p>
                    <p className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      {lastLesson.titleAr}
                    </p>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-slate-300 group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3 sm:gap-4">
            
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
              <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="text-2xl font-black text-white">{overallProgressPercentage}%</p>
              <p className="text-[11px] text-slate-400 font-medium">التقدم العام بالمنهج</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
              <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-2xl font-black text-white">{studentState.xp}</p>
              <p className="text-[11px] text-slate-400 font-medium">نقاط الخبرة (XP)</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
              <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <Trophy className="w-4 h-4" />
              </div>
              <p className="text-2xl font-black text-white">{accuracyPercentage}%</p>
              <p className="text-[11px] text-slate-400 font-medium">دقة الإجابات الوزارية</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
              <div className="w-8 h-8 mx-auto mb-1.5 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center">
                <Flame className="w-4 h-4 text-rose-400" />
              </div>
              <p className="text-2xl font-black text-white">{studentState.streakDays} أيام</p>
              <p className="text-[11px] text-slate-400 font-medium">التتابع الدراسي</p>
            </div>

          </div>

        </div>
      </section>

      {/* Fast Shortcuts Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        
        <div 
          id="shortcut-exam-card"
          onClick={() => onNavigateTab('exam')}
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 hover:border-indigo-300 cursor-pointer transition-all hover:shadow-md group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <HelpCircle className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-indigo-700 transition-colors">
            بنك الأسئلة الوزارية
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
            2014-2025 مع الحلول والشرح
          </p>
        </div>

        <div 
          id="shortcut-literature-card"
          onClick={() => onNavigateTab('literature')}
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 hover:border-amber-300 cursor-pointer transition-all hover:shadow-md group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-amber-700 transition-colors">
            الأدب المقرّر
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
            كبرياء وتحامل & كما تشاء
          </p>
        </div>

        <div 
          id="shortcut-essays-card"
          onClick={() => onNavigateTab('essays')}
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 hover:border-emerald-300 cursor-pointer transition-all hover:shadow-md group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-emerald-700 transition-colors">
            الإنشاءات النموذجية
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
            20 درجة مع الترجمة واختبار الفراغات
          </p>
        </div>

        <div 
          id="shortcut-verbs-card"
          onClick={() => onNavigateTab('verbs')}
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 hover:border-rose-300 cursor-pointer transition-all hover:shadow-md group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-rose-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-rose-700 transition-colors">
            مختبر الأفعال الشاذة
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
            تصنيف ثلاثي واختبار سرعة فوري
          </p>
        </div>

      </section>

      {/* Quick Study Review Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'قاعدة اليوم', text: 'استخدم صيغة Subject + used to + base في الجمل عن الماضي.', badge: 'Grammar' },
          { title: 'الفخ الوزاري', text: 'انتبه إلى زمن الجملة قبل اختيار الفعل المساعد في السؤال.', badge: 'Tip' },
          { title: 'تمرين 3 دقائق', text: 'حل 3 أسئلة من بنك الوزاريات ثم راجع الخطأ قبل المتابعة.', badge: 'Practice' }
        ].map((tip) => (
          <div key={tip.title} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                {tip.badge}
              </span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <h3 className="font-black text-slate-900 mb-2">{tip.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{tip.text}</p>
          </div>
        ))}
      </section>

      {/* Curriculum Units (Units 1 - 8) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              الوحدات الدراسية (Curriculum Units)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              اختر الوحدة لبدء استعراض دروس القواعد والمفردات والقطع الوزارية
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('exam')}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ابدأ المراجعة</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CURRICULUM_UNITS.map((unit) => {
            const completedInUnit = unit.lessons.filter(l => 
              studentState.completedLessonIds.includes(l.id)
            ).length;
            const progressRatio = unit.lessons.length > 0 
              ? Math.round((completedInUnit / unit.lessons.length) * 100) 
              : 0;

            return (
              <div
                key={unit.id}
                id={`unit-card-${unit.id}`}
                onClick={() => onSelectUnit(unit)}
                className={`p-5 rounded-2xl border hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group ${unit.bgGradient}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-white/70 text-slate-800 border border-slate-200/80 backdrop-blur-sm">
                      الوحدة {unit.number}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {unit.lessons.length} دروس
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base group-hover:opacity-90 transition-colors">
                    {unit.titleAr}
                  </h3>
                  
                  <p className="text-xs text-slate-500 font-mono mt-0.5 dir-ltr text-right">
                    {unit.titleEn}
                  </p>

                  <p className="text-xs text-slate-700 mt-2.5 line-clamp-2 leading-relaxed">
                    {unit.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-600 font-medium mb-1.5">
                    <span>نسبة الإنجاز</span>
                    <span className="font-bold text-slate-800">{progressRatio}%</span>
                  </div>
                  <div className="w-full bg-white/60 h-2 rounded-full overflow-hidden border border-slate-200/80">
                    <div 
                      className={`h-full bg-gradient-to-r ${unit.accentColor} transition-all duration-300`}
                      style={{ width: `${progressRatio}%` }}
                    ></div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Study Strategy Card */}
      <section className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg border border-indigo-700/50">
        <div className="space-y-2 text-center sm:text-right">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-100 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>خطة مراجعة ذكية</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            اكتسب 5 نقاط يوميًا بترتيب منطقي!
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 max-w-xl">
            اقرأ قاعدة اليوم، ثم حل سؤال واحد من بنك الوزاريات، ثم راجع الفخ الوزاري قبل النهاية. هذه الدورة الصغيرة ترفع الثقة وتمنع أخطاء الامتحان.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('exam')}
          className="px-6 py-3.5 rounded-2xl bg-white text-indigo-950 font-bold text-sm hover:bg-indigo-50 active:scale-95 shadow-lg transition-all shrink-0 flex items-center gap-2"
        >
          <span>ابدأ المراجعة الآن</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
};
