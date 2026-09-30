import React, { useState } from 'react';
import { Subject, SubjectId } from '../types/subject';
import { Unit, Lesson, StudentState } from '../types';
import { SUBJECTS } from '../data/subjectsData';
import { CURRICULUM_UNITS } from '../data/curriculumData';
import { THIRD_INTERMEDIATE_UNITS } from '../data/thirdIntermediateData';
import { SimulationsHub } from './SimulationsHub';
import { 
  BookOpen, ArrowRight, Zap, Calculator, FlaskConical, Sparkles, 
  CheckCircle2, Clock, Award, ChevronLeft, Lock, FileText
} from 'lucide-react';

interface SubjectDetailViewProps {
  subjectId: SubjectId;
  studentState: StudentState;
  onBack: () => void;
  onSelectLesson: (lesson: Lesson) => void;
  onOpenSimulations: (subjectId: SubjectId) => void;
}

export const SubjectDetailView: React.FC<SubjectDetailViewProps> = ({
  subjectId,
  studentState,
  onBack,
  onSelectLesson,
  onOpenSimulations,
}) => {
  const subject = SUBJECTS.find((s) => s.id === subjectId) || SUBJECTS[2]; // default English
  const isEnglish = subjectId === 'english';
  const isScience = ['physics', 'mathematics', 'chemistry'].includes(subjectId);
  const isPlaceholder = !subject.isAvailable;

  const unitsList = isEnglish ? THIRD_INTERMEDIATE_UNITS : [];

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto w-full">
      {/* Subject Header Banner */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${subject.theme.gradient} text-white p-6 sm:p-10 shadow-xl`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-md text-white text-xs font-semibold transition-all"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة لرئيسية المواد</span>
            </button>
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-wider text-white/85 font-medium">{subject.titleEn}</div>
              <h1 className="text-3xl sm:text-4xl font-black">{subject.titleAr}</h1>
            </div>
            <p className="text-white/90 text-sm max-w-2xl leading-relaxed">
              {subject.description}
            </p>
          </div>

          {/* Quick Action Buttons for Science / English */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {subject.hasSimulations && (
              <button
                onClick={() => onOpenSimulations(subjectId)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm shadow-lg transition-all transform hover:scale-105"
              >
                {subjectId === 'physics' && <Zap className="w-5 h-5 text-cyan-600" />}
                {subjectId === 'mathematics' && <Calculator className="w-5 h-5 text-violet-600" />}
                {subjectId === 'chemistry' && <FlaskConical className="w-5 h-5 text-rose-600" />}
                <span>فتح المختبر والمحاكاة التفاعلية</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Area based on Subject Status */}
      {isPlaceholder ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-sm">
            <Clock className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">قريباً جداً</h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            سيتم إضافة محتوى هذه المادة قريباً.
          </p>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            نعمل حالياً على إعداد المحتوى الرسمي المعتمد وفق المناهج الوزارية العراقية مع نخبة من الأساتذة المميزين.
          </p>
        </div>
      ) : isScience ? (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="bg-amber-500/20 text-amber-300 text-xs px-3 py-1 rounded-full font-semibold">محاكاة ثلاثية و ثنائية الأبعاد</span>
              <h2 className="text-2xl font-bold">التجارب التفاعلية المتاحة للمادة</h2>
              <p className="text-slate-300 text-sm">شاهد القوانين الفيزيائية، المعادلات الرياضية، والنماذج الكيميائية تعمل بصورة حية.</p>
            </div>
            <button
              onClick={() => onOpenSimulations(subjectId)}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg transition-all"
            >
              بدء المحاكاة الآن
            </button>
          </div>
        </div>
      ) : isEnglish ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">وحدات ومفردات منهج اللغة الإنكليزية</h2>
            <span className="text-xs text-slate-500 font-medium">8 وحدات دراسية كاملة</span>
          </div>

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
                  <span className="text-xs text-slate-500 font-medium">{unit.lessons.length} دروس</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{unit.titleAr}</h3>
                  <p className="text-xs text-slate-500 font-medium">{unit.titleEn}</p>
                </div>
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {unit.lessons.slice(0, 3).map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-right text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all group"
                    >
                      <span className="truncate">{lesson.titleAr}</span>
                      <ChevronLeft className="w-4 h-4 text-indigo-500 group-hover:-translate-x-1 transition-transform shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
