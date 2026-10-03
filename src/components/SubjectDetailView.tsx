import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Subject, SubjectId } from '../types/subject';
import { Lesson, StudentState } from '../types';
import { SUBJECTS } from '../data/subjectsData';
import { THIRD_INTERMEDIATE_UNITS } from '../data/thirdIntermediateData';
import { IRAQI_PHYSICS_CURRICULUM, PhysicsGradeCurriculum } from '../data/physicsCurriculum';
import { getSimulationsForSubject, getSimulationById } from '../features/simulations';
import {
  BookOpen,
  ArrowRight,
  Zap,
  Calculator,
  FlaskConical,
  Sparkles,
  Clock,
  ChevronLeft,
  PlayCircle,
  Eye,
  Layers,
  GraduationCap,
  Atom,
} from 'lucide-react';

interface SubjectDetailViewProps {
  subjectId: SubjectId;
  studentState: StudentState;
  onBack: () => void;
  onSelectLesson: (lesson: Lesson) => void;
  onOpenSimulations: (subjectId: SubjectId, simulationId?: string) => void;
}

export const SubjectDetailView: React.FC<SubjectDetailViewProps> = ({
  subjectId,
  studentState,
  onBack,
  onSelectLesson,
  onOpenSimulations,
}) => {
  const navigate = useNavigate();
  const subject = SUBJECTS.find((s) => s.id === subjectId) || SUBJECTS[2];
  const isEnglish = subjectId === 'english';
  const isPhysics = subjectId === 'physics';
  const isOtherScience = ['mathematics', 'chemistry'].includes(subjectId);
  const isPlaceholder = !subject.isAvailable;

  const [activePhysicsGrade, setActivePhysicsGrade] = useState<string>('first-intermediate');

  const unitsList = isEnglish ? THIRD_INTERMEDIATE_UNITS : [];
  const otherScienceSims = isOtherScience
    ? getSimulationsForSubject(subjectId as 'mathematics' | 'chemistry')
    : [];

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
              <span>العودة لرئيسية المواد</span>
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

          {/* Quick Action Buttons for Science */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {subject.hasSimulations && (
              <button
                type="button"
                onClick={() => onOpenSimulations(subjectId)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm shadow-lg transition-all transform hover:scale-105 cursor-pointer"
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

      {/* Physics Specialized Curriculum Map with Simulation Links */}
      {isPhysics ? (
        <div className="space-y-6">
          {/* Grade Selector Tabs */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>خريطة منهج الفيزياء والمختبرات التفاعلية (المراحل الدراسية)</span>
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              {IRAQI_PHYSICS_CURRICULUM.reduce((acc, g) => acc + g.chapters.filter((c) => c.hasSimulation).length, 0)} تجربة تفاعلية نشطة
            </span>
          </div>

          <div className="flex overflow-x-auto pb-2 gap-2 border-b border-slate-200 dark:border-slate-800 no-scrollbar">
            {IRAQI_PHYSICS_CURRICULUM.map((grade) => {
              const isSelected = activePhysicsGrade === grade.gradeId;
              const activeCount = grade.chapters.filter((c) => c.hasSimulation).length;
              return (
                <button
                  key={grade.gradeId}
                  onClick={() => setActivePhysicsGrade(grade.gradeId)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>{grade.gradeTitleAr}</span>
                  {activeCount > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300'
                      }`}
                    >
                      {activeCount} تجارب
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Grade Content & Chapters */}
          {(() => {
            const currentGrade =
              IRAQI_PHYSICS_CURRICULUM.find((g) => g.gradeId === activePhysicsGrade) ||
              IRAQI_PHYSICS_CURRICULUM[0];

            return (
              <div className="space-y-4">
                <div className="bg-slate-100 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                  <p className="font-bold text-slate-900 dark:text-white mb-1">
                    {currentGrade.gradeTitleAr} • {currentGrade.gradeTitleEn}
                  </p>
                  <p>{currentGrade.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentGrade.chapters.map((chapter) => {
                    const simEntry = chapter.simulationId ? getSimulationById(chapter.simulationId) : null;

                    return (
                      <div
                        key={chapter.id}
                        className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border shadow-sm flex flex-col justify-between space-y-4 transition-all ${
                          chapter.hasSimulation
                            ? 'border-cyan-500/30 hover:shadow-md hover:border-cyan-500'
                            : 'border-slate-200 dark:border-slate-800 opacity-75'
                        }`}
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              الفصل {chapter.chapterNumber}
                            </span>
                            {chapter.hasSimulation ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                                محاكاة نشطة ✓
                              </span>
                            ) : (
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                                قيد الإعداد
                              </span>
                            )}
                          </div>

                          <div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                              {chapter.titleAr}
                            </h3>
                            <p className="text-[11px] font-mono text-slate-400">{chapter.titleEn}</p>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            {chapter.description}
                          </p>

                          {chapter.keyFormulas && chapter.keyFormulas.length > 0 && (
                            <div className="bg-slate-50 dark:bg-slate-800/80 p-2 rounded-xl text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
                              {chapter.keyFormulas.join(' • ')}
                            </div>
                          )}
                        </div>

                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                          {chapter.hasSimulation && chapter.simulationId ? (
                            <button
                              type="button"
                              onClick={() =>
                                navigate(`/subject/physics/simulations/${chapter.simulationId}`)
                              }
                              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                            >
                              <PlayCircle className="w-4 h-4" />
                              <span>تشغيل المحاكاة ({simEntry?.titleAr || 'المختبر'})</span>
                            </button>
                          ) : (
                            <div className="flex items-center justify-center gap-1.5 py-2 text-xs text-slate-400 font-medium">
                              <Clock className="w-3.5 h-3.5" />
                              <span>المحاكاة ستتوفر في التحديث القادم</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      ) : isOtherScience ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>التجارب والمختبرات التفاعلية المتاحة</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium font-mono">
              {otherScienceSims.length} مختبرات جاهزة
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherScienceSims.map((sim) => (
              <div
                key={sim.id}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                      {sim.topic}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {sim.mode}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {sim.titleAr}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">{sim.titleEn}</p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {sim.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => onOpenSimulations(subjectId, sim.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs shadow-sm transition-all transform group-hover:scale-[1.02] cursor-pointer"
                  >
                    <PlayCircle className="w-4 h-4 text-emerald-400" />
                    <span>تشغيل التجربة الآن</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : isEnglish ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              وحدات ومفردات منهج اللغة الإنكليزية
            </h2>
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
                  {unit.lessons.slice(0, 3).map((lesson) => (
                    <button
                      key={lesson.id}
                      type="button"
                      onClick={() => onSelectLesson(lesson)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-right text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all group cursor-pointer"
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
      ) : isPlaceholder ? (
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
      ) : null}
    </div>
  );
};
