import React, { useState } from 'react';
import { 
  CheckCircle2, ArrowRight, ArrowLeft, Lightbulb, AlertTriangle, 
  HelpCircle, BookOpen, Sparkles, Check, X, RotateCcw, Volume2, Share2
} from 'lucide-react';
import { Unit, Lesson, Exercise } from '../types';

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

      {/* Lesson Header Title */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
          <BookOpen className="w-4 h-4" />
          <span>القسم: {lesson.category === 'grammar' ? 'قواعد وزارية' : lesson.category === 'reading' ? 'قطع الكتاب الاستيعابية' : lesson.category === 'vocabulary' ? 'مفردات وإسقاطات' : 'إملاء'}</span>
        </div>

        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
          {lesson.titleAr}
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 font-mono dir-ltr text-right">
          {lesson.titleEn}
        </p>

        <p className="text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
          {lesson.summary}
        </p>
      </div>

      {/* The Golden Mathematical Rule (if grammar) */}
      {lesson.grammarRuleFormula && (
        <div 
          id="golden-rule-card"
          className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-md border border-indigo-800/40 space-y-3"
        >
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
            <Lightbulb className="w-4 h-4 fill-amber-400" />
            <span>القاعدة الرياضية الذهبية (Formula)</span>
          </div>

          <pre className="font-mono text-sm sm:text-base bg-black/40 p-4 rounded-2xl border border-white/10 text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {lesson.grammarRuleFormula}
          </pre>
        </div>
      )}

      {/* Detailed Lesson Content */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <span>شرح وتفصيل المحتوى الأكاديمي</span>
        </h2>

        <div className="space-y-3">
          {lesson.detailedContent.map((point, idx) => (
            <div key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
              <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p>{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Teacher's Golden Notes Callout (الأستاذ مصطفى تركي) */}
      {lesson.teacherNotes && lesson.teacherNotes.length > 0 && (
        <div 
          id="teacher-golden-notes-box"
          className="p-6 rounded-3xl bg-amber-50/80 border border-amber-200 shadow-xs space-y-3"
        >
          <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm sm:text-base">
            <Lightbulb className="w-5 h-5 text-amber-600 fill-amber-500" />
            <span>ملاحظات الأستاذ مصطفى تركي الذهبية للوزاري 2027</span>
          </div>

          <div className="space-y-2.5">
            {lesson.teacherNotes.map((note, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-amber-900 font-medium leading-relaxed">
                <span className="text-amber-600 font-bold shrink-0">✦</span>
                <p>{note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Ministerial Traps (فخاخ وزارية احذر منها) */}
      {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
        <div 
          id="common-mistakes-box"
          className="p-6 rounded-3xl bg-rose-50/70 border border-rose-200 shadow-xs space-y-3"
        >
          <div className="flex items-center gap-2 text-rose-900 font-extrabold text-sm sm:text-base">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <span>فخاخ وزارية شائعة احذر الوقوع بها في الدفتر الامتحاني</span>
          </div>

          <div className="space-y-2">
            {lesson.commonMistakes.map((mistake, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-rose-800 leading-relaxed">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <p>{mistake}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bilingual Interactive Examples */}
      {lesson.examples && lesson.examples.length > 0 && (
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900">
            أمثلة وتطبيقات وزارية نموذجية
          </h2>

          <div className="space-y-3">
            {lesson.examples.map((ex, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-colors space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-sm sm:text-base font-bold text-indigo-900 dir-ltr text-right">
                    {ex.en}
                  </p>
                  {ex.note && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 whitespace-nowrap">
                      {ex.note}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  {ex.ar}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Exercises with Instant Feedback */}
      {lesson.exercises && lesson.exercises.length > 0 && (
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                تمارين واختبارات فورية
              </h2>
              <p className="text-xs text-slate-500">
                اختر الإجابة الصحيحة للتحقق من فهمك والحصول على نقاط الخبرة XP
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
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
                    <p className="font-bold text-sm sm:text-base text-slate-900 dir-ltr text-right">
                      <span className="text-indigo-600 font-black mr-2">Q{idx + 1}.</span>
                      {exercise.question}
                    </p>
                    {exercise.ministerialYear && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 whitespace-nowrap">
                        {exercise.ministerialYear}
                      </span>
                    )}
                  </div>

                  {/* Options */}
                  {exercise.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 dir-ltr">
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
                            className={`p-3 rounded-xl border text-sm font-medium text-left transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {isAnswered && isThisCorrect && <Check className="w-4 h-4 text-white" />}
                            {isAnswered && isThisSelected && !isThisCorrect && <X className="w-4 h-4 text-white" />}
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
