import React, { useState } from 'react';
import { 
  CheckCircle2, ArrowRight, ArrowLeft, Lightbulb, AlertTriangle, 
  HelpCircle, BookOpen, Sparkles, Check, X, RotateCcw, Volume2, 
  Layers, Compass, Cpu, PenTool, Award, Share2
} from 'lucide-react';
import { Unit, Lesson, Exercise } from '../types';
import { GrammarLab } from './lesson-modes/GrammarLab';
import { ReadingDossier } from './lesson-modes/ReadingDossier';
import { VocabularyArena } from './lesson-modes/VocabularyArena';
import { SpellingForge } from './lesson-modes/SpellingForge';
import { AcademicExplorationEngine } from './AcademicExplorationEngine';
import { speakEnglish } from '../utils/speech';

interface LessonViewerProps {
  unit: Unit;
  lesson: Lesson;
  onBackToDashboard: () => void;
  onSelectLesson: (lesson: Lesson) => void;
  isCompleted: boolean;
  onToggleComplete: (lessonId: string) => void;
  onAnswerExercise: (exerciseId: string, isCorrect: boolean) => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  unit,
  lesson,
  onBackToDashboard,
  onSelectLesson,
  isCompleted,
  onToggleComplete,
  onAnswerExercise,
}) => {
  // Local exercise answer tracking: exerciseId -> selected option
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});
  const [showQuickHints, setShowQuickHints] = useState(false);
  const [activeSectionView, setActiveSectionView] = useState<'all' | 'interactive' | 'academic' | 'exercises'>('all');
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  const handleSpeak = (text: string) => {
    setSpeakingText(text);
    speakEnglish(text, () => setSpeakingText(null));
  };

  const handleSelectOption = (exercise: Exercise, option: string) => {
    if (selectedAnswers[exercise.id]) return; // already answered
    const isCorrect = option === exercise.correctAnswer;
    setSelectedAnswers(prev => ({ ...prev, [exercise.id]: option }));
    setRevealedExplanations(prev => ({ ...prev, [exercise.id]: true }));
    onAnswerExercise(exercise.id, isCorrect);
  };

  const handleResetExercise = (exerciseId: string) => {
    setSelectedAnswers(prev => {
      const next = { ...prev };
      delete next[exerciseId];
      return next;
    });
    setRevealedExplanations(prev => {
      const next = { ...prev };
      delete next[exerciseId];
      return next;
    });
  };

  // Find previous and next lesson in unit
  const currentIndex = unit.lessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? unit.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < unit.lessons.length - 1 ? unit.lessons[currentIndex + 1] : null;

  // Category Configuration
  const getCategoryConfig = () => {
    switch (lesson.category) {
      case 'grammar':
        return {
          title: 'قواعد وزارية وخوارزميات الحل',
          badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          accentColor: 'indigo',
          icon: <Cpu className="w-4 h-4 text-indigo-600" />,
          modeName: 'معمل القواعد والتحويلات',
        };
      case 'reading':
        return {
          title: 'قطع الكتاب الاستيعابية وقصص الأدب',
          badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
          accentColor: 'amber',
          icon: <BookOpen className="w-4 h-4 text-amber-600" />,
          modeName: 'ملف القصة والبطاقات القلابة',
        };
      case 'vocabulary':
        return {
          title: 'مفردات ومتلازمات وإسقاطات',
          badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          accentColor: 'emerald',
          icon: <Compass className="w-4 h-4 text-emerald-600" />,
          modeName: 'ساحة التوصيل والمتلازمات',
        };
      case 'spelling':
      default:
        return {
          title: 'إملاء وسوابق ولواحق وشواذ',
          badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
          accentColor: 'rose',
          icon: <PenTool className="w-4 h-4 text-rose-600" />,
          modeName: 'مختبر الإملاء الدقيق',
        };
    }
  };

  const catConfig = getCategoryConfig();

  // Render the tailored interactive mode for this specific lesson
  const renderTopicInteractiveMode = () => {
    if (lesson.category === 'grammar') {
      return <GrammarLab lesson={lesson} />;
    }
    if (lesson.category === 'reading') {
      return <ReadingDossier lesson={lesson} />;
    }
    if (lesson.category === 'vocabulary') {
      return <VocabularyArena lesson={lesson} />;
    }
    // spelling
    return <SpellingForge lesson={lesson} />;
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <button
          id="back-to-dashboard-btn"
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
            {unit.titleAr.split(':')[0]}
          </span>
          <span className="text-xs font-semibold text-slate-400">/</span>
          <span className="text-xs font-bold text-slate-700">
            الدرس {lesson.lessonNumber}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="toggle-complete-lesson-btn"
            onClick={() => onToggleComplete(lesson.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isCompleted
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'مكتمل بنجاح ✓' : 'تحديد كمكتمل'}</span>
          </button>

          <button
            id="toggle-quick-hints-btn"
            onClick={() => setShowQuickHints((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200 text-xs font-bold transition-colors"
            title="عرض تلميحات سريعة للمراجعة"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{showQuickHints ? 'إخفاء التلميحات' : 'تلميحات سريعة'}</span>
          </button>
        </div>
      </div>

      {showQuickHints && (
        <div className="p-5 rounded-3xl bg-violet-50 border border-violet-200 shadow-xs">
          <div className="flex items-center gap-2 text-violet-900 font-extrabold text-sm mb-3">
            <Lightbulb className="w-5 h-5 text-violet-600" />
            <span>تلميحات سريعة للمراجعة</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-violet-800">
            <div className="rounded-2xl bg-white p-3 border border-violet-100">
              <p className="font-bold mb-1">القاعدة</p>
              <p>{lesson.grammarRuleFormula || lesson.summary}</p>
            </div>
            <div className="rounded-2xl bg-white p-3 border border-violet-100">
              <p className="font-bold mb-1">الفخ الوزاري</p>
              <p>{lesson.commonMistakes?.[0] || 'راجع زمن الجملة أولاً قبل الإجابة.'}</p>
            </div>
            <div className="rounded-2xl bg-white p-3 border border-violet-100">
              <p className="font-bold mb-1">خطوة ذكية</p>
              <p>حل سؤال واحد فقط ثم راجع السبب. لا تكتب الإجابة قبل تفسير الزمن.</p>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Header Title & Subject-Adapted Hero */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border font-bold ${catConfig.badgeClass}`}>
              {catConfig.icon}
              <span>{catConfig.title}</span>
            </span>
            <span className="text-slate-400">• الوحدة {unit.id} • درس {lesson.lessonNumber}</span>
          </div>

          {/* Quick Audio Read for Lesson Title */}
          <button
            onClick={() => handleSpeak(lesson.titleEn)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-bold transition-all ${
              speakingText === lesson.titleEn 
                ? 'bg-indigo-600 text-white border-indigo-600 animate-pulse' 
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
            title="استمع لنطق عنوان الدرس بالإنجليزية"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>نطق العنوان</span>
          </button>
        </div>

        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
            {lesson.titleAr}
          </h1>

          <p dir="ltr" className="text-xs sm:text-sm text-slate-500 font-mono text-left mt-1 tracking-wide">
            {lesson.titleEn}
          </p>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
          {lesson.summary}
        </p>

        {/* View Mode Switcher Pills */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 ml-1">طريقة العرض:</span>
          
          <button
            onClick={() => setActiveSectionView('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSectionView === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            عرض شامل متكامل
          </button>

          <button
            onClick={() => setActiveSectionView('interactive')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSectionView === 'interactive'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{catConfig.modeName}</span>
          </button>

          <button
            onClick={() => setActiveSectionView('academic')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSectionView === 'academic'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>شرح الملزمة والملاحظات</span>
          </button>

          <button
            onClick={() => setActiveSectionView('exercises')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSectionView === 'exercises'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>التمارين ({lesson.exercises.length})</span>
          </button>
        </div>
      </div>

      {/* TOPIC-TAILORED INTERACTIVE ENGINE (Shown in 'all' or 'interactive' views) */}
      {(activeSectionView === 'all' || activeSectionView === 'interactive') && (
        <div id="topic-tailored-interactive-section" className="space-y-4">
          {renderTopicInteractiveMode()}
        </div>
      )}

      {/* ACADEMIC TEXTBOOK CONTENT & TEACHER NOTES (Shown in 'all' or 'academic' views) */}
      {(activeSectionView === 'all' || activeSectionView === 'academic') && (
        <div className="space-y-6">
          <AcademicExplorationEngine lesson={lesson} />

          {/* Bilingual Interactive Examples with Audio Pronunciation */}
          {lesson.examples && lesson.examples.length > 0 && (
            <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className={`text-base sm:text-lg ${
                  lesson.category === 'grammar' ? 'heading-grammar' :
                  lesson.category === 'reading' ? 'heading-reading' :
                  lesson.category === 'vocabulary' ? 'heading-vocab' : 'heading-spelling'
                }`}>
                  <Sparkles className="w-5 h-5" />
                  <span>أمثلة وتطبيقات وزارية نموذجية</span>
                </h2>
                <span className="text-xs text-slate-400 font-medium">اضغط على السماعة لسماع النطق</span>
              </div>

              <div className="space-y-3">
                {lesson.examples.map((ex, idx) => (
                  <div key={idx} className="p-4 sm:p-4.5 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-indigo-300 transition-colors space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <p dir="ltr" className="font-sans text-sm sm:text-base font-bold text-indigo-950 text-left en-sentence">
                        {ex.en}
                      </p>

                      <div className="flex items-center gap-2 shrink-0">
                        {ex.note && (
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-indigo-100/80 text-indigo-800 whitespace-nowrap border border-indigo-200/60">
                            {ex.note}
                          </span>
                        )}
                        <button
                          onClick={() => handleSpeak(ex.en)}
                          className={`p-1.5 rounded-xl border transition-all ${
                            speakingText === ex.en 
                              ? 'bg-indigo-600 text-white border-indigo-600 animate-pulse' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 shadow-2xs'
                          }`}
                          title="استمع للنطق الإنجليزي"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 text-right leading-relaxed font-medium">
                      {ex.ar}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* EXERCISES & TESTS (Shown in 'all' or 'exercises' views) */}
      {(activeSectionView === 'all' || activeSectionView === 'exercises') && lesson.exercises && lesson.exercises.length > 0 && (
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="section-title text-base sm:text-lg">
                <span>تمارين واختبارات وزارية فورية</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                اختر الإجابة الصحيحة للتحقق من فهمك والحصول على نقاط الخبرة XP
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              {lesson.exercises.length} أسئلة
            </span>
          </div>

          <div className="space-y-6">
            {lesson.exercises.map((exercise, idx) => {
              const selected = selectedAnswers[exercise.id];
              const isAnswered = !!selected;
              const isCorrect = selected === exercise.correctAnswer;

              return (
                <div 
                  key={exercise.id}
                  id={`exercise-card-${exercise.id}`}
                  className={`p-5 rounded-2xl border transition-all ${
                    isAnswered
                      ? isCorrect 
                        ? 'bg-emerald-50/50 border-emerald-300' 
                        : 'bg-rose-50/50 border-rose-300'
                      : 'bg-slate-50/70 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <p dir="ltr" className="font-bold text-sm sm:text-base text-slate-900 text-left en-sentence">
                      <span className="text-indigo-600 font-black mr-2 font-mono">Q{idx + 1}.</span>
                      {exercise.question}
                    </p>
                    {exercise.ministerialYear && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 whitespace-nowrap shrink-0">
                        {exercise.ministerialYear}
                      </span>
                    )}
                  </div>

                  {/* Options */}
                  {exercise.options && (
                    <div dir="ltr" className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                      {exercise.options.map((opt) => {
                        const isThisSelected = selected === opt;
                        const isThisCorrect = opt === exercise.correctAnswer;

                        let btnStyle = "bg-white border-slate-200 text-slate-800 hover:border-indigo-400";
                        if (isAnswered) {
                          if (isThisCorrect) {
                            btnStyle = "bg-emerald-600 text-white border-emerald-600 font-bold";
                          } else if (isThisSelected) {
                            btnStyle = "bg-rose-600 text-white border-rose-600 font-bold";
                          } else {
                            btnStyle = "bg-white/60 border-slate-200 text-slate-400 opacity-60";
                          }
                        }

                        return (
                          <button
                            key={opt}
                            disabled={isAnswered}
                            onClick={() => handleSelectOption(exercise, opt)}
                            className={`p-3 rounded-xl border text-sm font-medium text-left transition-all flex items-center justify-between font-sans ${btnStyle}`}
                          >
                            <span dir="ltr" className="en-sentence">{opt}</span>
                            {isAnswered && isThisCorrect && <Check className="w-4 h-4 text-white shrink-0 ml-2" />}
                            {isAnswered && isThisSelected && !isThisCorrect && <X className="w-4 h-4 text-white shrink-0 ml-2" />}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Explanation feedback */}
                  {isAnswered && (
                    <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-start justify-between gap-3 text-right">
                      <div className="space-y-1">
                        <p className={`text-xs font-extrabold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {isCorrect ? 'إجابة صحيحة وزيارية! أحسنت 🎉' : 'إجابة غير دقيقة! لاحظ التعليل الوزاري أدناه:'}
                        </p>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {exercise.explanation}
                        </p>
                      </div>

                      <button
                        onClick={() => handleResetExercise(exercise.id)}
                        className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                        title="إعادة المحاولة"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Prev / Next Navigation in Unit */}
      <div className="flex items-center justify-between pt-4">
        {prevLesson ? (
          <button
            id="prev-lesson-btn"
            onClick={() => onSelectLesson(prevLesson)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:border-indigo-400 font-bold text-xs sm:text-sm shadow-xs transition-all"
          >
            <ArrowRight className="w-4 h-4" />
            <span>الدرس السابق: {prevLesson.titleAr}</span>
          </button>
        ) : <div />}

        {nextLesson ? (
          <button
            id="next-lesson-btn"
            onClick={() => onSelectLesson(nextLesson)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-200 transition-all"
          >
            <span>الدرس التالي: {nextLesson.titleAr}</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-200 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>أكملت جميع دروس هذه الوحدة!</span>
          </button>
        )}
      </div>

    </div>
  );
};
