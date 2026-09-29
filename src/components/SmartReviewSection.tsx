import React, { useState } from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Bookmark, 
  BookOpen, 
  RotateCcw, 
  HelpCircle, 
  ArrowRight, 
  TrendingUp, 
  Award, 
  Flame,
  Volume2
} from 'lucide-react';
import { StudentState, Unit, Lesson, BookmarkItem } from '../types';
import { MINISTERIAL_QUESTIONS } from '../data/ministerialQuestions';

interface SmartReviewSectionProps {
  studentState: StudentState;
  currentUnits: Unit[];
  onSelectLesson: (lesson: Lesson) => void;
  onNavigateToTab: (tab: any) => void;
}

export const SmartReviewSection: React.FC<SmartReviewSectionProps> = ({
  studentState,
  currentUnits,
  onSelectLesson,
  onNavigateToTab
}) => {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'weak-topics' | 'incomplete' | 'notes'>('bookmarks');
  const [testedQuestions, setTestedQuestions] = useState<Record<string, string>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // 1. Bookmarked Questions from Ministerial bank or state
  const bookmarkedQuestions = MINISTERIAL_QUESTIONS.filter(q => 
    studentState.bookmarkedQuestionIds.includes(q.id)
  );

  // 2. Incomplete Lessons
  const allLessons = currentUnits.flatMap(u => u.lessons);
  const incompleteLessons = allLessons.filter(l => !studentState.completedLessonIds.includes(l.id));

  // 3. Weak Topics & Accuracy calculation
  const totalAttempted = studentState.totalQuestionsAttempted || 0;
  const totalCorrect = studentState.totalQuestionsCorrect || 0;
  const accuracyRate = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 100;

  // Speak vocabulary or text
  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 p-6 md:p-8 text-white shadow-2xl">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>محرك المراجعة الذكية والتركيز الوزاري (Smart Review Engine)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
            المراجعة المركزة <span className="text-indigo-400 font-serif">والإتقان الوزاري</span>
          </h1>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            يجمع هذا القسم نقاط ضعفك، الأسئلة المحفوظة في مفضلتك، الدروس التي لم تُكملها بعد، لضمان أعلى درجات الاستعداد للامتحان الوزاري.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">دقة الإجابات الوزارية</span>
            <span className="text-xl font-black text-emerald-400 font-mono">{accuracyRate}%</span>
          </div>
          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">الأسئلة المحفوظة</span>
            <span className="text-xl font-black text-amber-400 font-mono">{bookmarkedQuestions.length}</span>
          </div>
          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">الدروس المتبقية</span>
            <span className="text-xl font-black text-indigo-400 font-mono">{incompleteLessons.length}</span>
          </div>
          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">الملاحظات المدونة</span>
            <span className="text-xl font-black text-purple-400 font-mono">{studentState.notes?.length || 0}</span>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-2xl overflow-x-auto">
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 ${activeTab === 'bookmarks' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'}`}
        >
          <Bookmark className="w-4 h-4" />
          <span>الأسئلة المحفوظة ({bookmarkedQuestions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('weak-topics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 ${activeTab === 'weak-topics' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'}`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>المواضيع الوزارية المركزة</span>
        </button>

        <button
          onClick={() => setActiveTab('incomplete')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 ${activeTab === 'incomplete' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'}`}
        >
          <BookOpen className="w-4 h-4" />
          <span>الدروس المتبقية ({incompleteLessons.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 ${activeTab === 'notes' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'}`}
        >
          <Award className="w-4 h-4" />
          <span>ملاحظاتي الشخصية ({studentState.notes?.length || 0})</span>
        </button>
      </div>

      {/* 3. Content Panel */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          {bookmarkedQuestions.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
              <Bookmark className="w-12 h-12 mx-auto mb-3 text-slate-600" />
              <h3 className="text-lg font-bold text-white mb-1">لا توجد أسئلة محفوظة حتى الآن</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto mb-5">
                يمكنك حفظ أي سؤال وزاري صعب أثناء خوض الاختبارات الوزارية من خلال النقر على أيقونة الإشارة المرجعية ليظهر هنا للمراجعة السريعة.
              </p>
              <button
                onClick={() => onNavigateToTab('exam')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
              >
                انتقل إلى بنك الأسئلة الوزارية
              </button>
            </div>
          ) : (
            bookmarkedQuestions.map(q => {
              const isRevealed = revealedSolutions[q.id];
              return (
                <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {q.year} - {q.session}
                    </span>
                    <span className="text-xs text-indigo-400 font-medium">الوحدة {q.unitId} • {q.topic}</span>
                  </div>
                  <p className="text-base font-bold text-white mb-3">{q.questionText}</p>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800">
                    <button
                      onClick={() => setRevealedSolutions(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                      className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors"
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>{isRevealed ? 'إخفاء الحل النموذجي' : 'كشف الحل النموذجي والقاعدة الوزارية'}</span>
                    </button>
                  </div>

                  {isRevealed && (
                    <div className="mt-3 p-3.5 bg-slate-950/80 rounded-xl border border-indigo-500/30 text-xs">
                      <div className="font-bold text-emerald-400 mb-1">الحل النموذجي: {q.correctAnswer}</div>
                      <p className="text-slate-300">{q.ruleExplanation}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {activeTab === 'weak-topics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Flame className="w-5 h-5" />
              <span>مواضيع القواعد الذهبية الأكثر تكراراً وزارياً</span>
            </div>
            <ul className="space-y-2 text-xs md:text-sm text-slate-300">
              <li className="p-2.5 bg-slate-800/60 rounded-xl flex items-center justify-between">
                <span>1. أدوات الربط (While / As / When / And) مع الماضي</span>
                <span className="text-amber-400 font-bold">100% مضمونة</span>
              </li>
              <li className="p-2.5 bg-slate-800/60 rounded-xl flex items-center justify-between">
                <span>2. قاعدة Used to في المقارنة مع (than / as...as)</span>
                <span className="text-amber-400 font-bold">كل دور وزاري</span>
              </li>
              <li className="p-2.5 bg-slate-800/60 rounded-xl flex items-center justify-between">
                <span>3. أفعال العبارة Phrasal Verbs وموقع الضمير it / them</span>
                <span className="text-amber-400 font-bold">سؤال القواعد Q2</span>
              </li>
              <li className="p-2.5 bg-slate-800/60 rounded-xl flex items-center justify-between">
                <span>4. الصفات المنتهية بـ (-ed / -ing) وتحديد الفاعل والمفعول</span>
                <span className="text-amber-400 font-bold">سؤال الاختيارات</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <TrendingUp className="w-5 h-5" />
              <span>خطة التقوية اليومية الموصى بها</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              إذا كانت دقتك أقل من 85%، نوصيك بالتركيز على إكمال درسين من الدروس المتبقية يومياً، وحل اختبار محاكي وزاري كامل واحد كل يومين لرفع التركيز وسرعة الحل.
            </p>
            <button
              onClick={() => onNavigateToTab('mock')}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-slate-950 font-black rounded-xl text-xs transition-all shadow-md mt-2"
            >
              بدء امتحان وزاري محاكي شامل الآن
            </button>
          </div>
        </div>
      )}

      {activeTab === 'incomplete' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {incompleteLessons.slice(0, 10).map(lesson => (
            <div
              key={lesson.id}
              onClick={() => onSelectLesson(lesson)}
              className="p-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-indigo-500/40 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-3 group"
            >
              <div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/20 text-indigo-400 mb-1 inline-block">
                  الوحدة {lesson.unitId} • درس {lesson.lessonNumber}
                </span>
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {lesson.titleAr} ({lesson.titleEn})
                </h4>
                <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{lesson.summary}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors flex-shrink-0" />
            </div>
          ))}
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="space-y-3">
          {(!studentState.notes || studentState.notes.length === 0) ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
              <Award className="w-12 h-12 mx-auto mb-3 text-slate-600" />
              <h3 className="text-lg font-bold text-white mb-1">لا توجد ملاحظات مدونة بعد</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                أثناء تصفح الدروس، يمكنك تدوين أي ملاحظة أو فكرة ذهبية في ملفك السحابي لحفظها والرجوع إليها ليلة الامتحان.
              </p>
            </div>
          ) : (
            studentState.notes.map(note => (
              <div key={note.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                <h4 className="font-bold text-sm text-indigo-300 mb-1">{note.title}</h4>
                <p className="text-xs text-slate-200 leading-relaxed">{note.content}</p>
                <span className="text-[10px] text-slate-500 mt-2 block">{new Date(note.createdAt).toLocaleDateString('ar-IQ')}</span>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};
