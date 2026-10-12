import React, { useState } from 'react';
import { 
  Sparkles, BookOpen, Compass, Award, CheckCircle2, Lightbulb, 
  Layers, FileText, Bookmark, Target, ArrowRight, Zap, Eye, 
  HelpCircle, BookMarked, Brain, ShieldAlert, Calendar
} from 'lucide-react';
import { EducationalGrade } from '../types';
import { getGradeMeta, getUnitsForGrade, getStoriesForGrade, getEssaysForGrade } from '../data/gradeContentResolver';

interface VisualCurriculumGuideProps {
  grade: EducationalGrade;
  onSelectLesson?: (lessonId: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const VisualCurriculumGuide: React.FC<VisualCurriculumGuideProps> = ({
  grade,
  onSelectLesson,
  onNavigateTab,
}) => {
  const gradeMeta = getGradeMeta(grade);
  const units = getUnitsForGrade(grade);
  const stories = getStoriesForGrade(grade);
  const essays = getEssaysForGrade(grade);
  const [activeTab, setActiveTab] = useState<'units' | 'grammar' | 'literature' | 'exam'>('units');

  return (
    <div className="space-y-6 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            الدليل البصري والشرح التفاعلي · {gradeMeta.nameAr}
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>المرحلة: {gradeMeta.stageAr}</span>
            <span aria-hidden="true">·</span>
            <span>الفئة العمرية: {gradeMeta.ageRangeAr}</span>
            <span aria-hidden="true">·</span>
            <span>المنهج العراقي الرسمي</span>
            <span aria-hidden="true">·</span>
            <span>إشراف الأستاذ مصطفى تركي</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('units')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'units' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>الوحدات والدروس</span>
          </button>
          <button
            onClick={() => setActiveTab('grammar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'grammar' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>القواعد المصورة</span>
          </button>
          <button
            onClick={() => setActiveTab('literature')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'literature' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>القصص والأدب</span>
          </button>
          <button
            onClick={() => setActiveTab('exam')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'exam' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>خريطة الامتحان</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative z-10">
        {/* 1. Units & Lessons Visual Cards */}
        {activeTab === 'units' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-amber-300 flex items-center gap-2">
                <Compass className="w-5 h-5" />
                <span>خريطة وحدات المنهج ({units.length} وحدات دراسية)</span>
              </h3>
              <span className="text-xs text-slate-400">محتوى حصري لـ {gradeMeta.shortName}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {units.map((unit, idx) => (
                <div 
                  key={unit.id}
                  className="bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 transition-all hover:scale-[1.01] flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-black">
                        الوحدة {idx + 1}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{unit.lessons.length} دروس</span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {unit.titleAr}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 font-english">
                      {unit.titleEn}
                    </p>
                    <p className="text-xs text-slate-300 mt-3 line-clamp-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
                      {unit.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">شرح صوري ومعاينة</span>
                    {onNavigateTab && (
                      <button
                        onClick={() => onNavigateTab('subjects')}
                        className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                      >
                        <span>استعراض الدروس</span>
                        <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Pictorial Grammar Cards */}
        {activeTab === 'grammar' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-amber-300 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                <span>أبرز قواعد وبطاقات الشرح البصري لـ {gradeMeta.nameAr}</span>
              </h3>
              <span className="text-xs text-slate-400">مبسطة بالأمثلة الوزارية</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <Zap className="w-4 h-4" />
                  <span>قاعدة الأزمنة والتكوين (Tenses Structure)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  يتم التركيز في منهج {gradeMeta.shortName} على إتقان التفرقة بين المضارع البسيط والمستمر، والماضي بنوعيه، مع التطبيق الوزاري المباشر.
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-indigo-500/20 text-xs font-mono text-amber-300">
                  Subject + Auxiliary + Verb (Base/V2/V3) + Complement
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>الأخطاء الشائعة في الامتحانات الوزارية</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  تجنب الأخطاء الإملائية الشائعة في إضافة (-ed) أو (-ing) والتصريفات الشاذة للأفعال مع مراعاة التنقيط السليم للجملة.
                </p>
                <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/20 text-xs text-emerald-300">
                  ✓ Always double-check punctuation marks (capital letters & full stops).
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Stories & Literature */}
        {activeTab === 'literature' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-amber-300 flex items-center gap-2">
                <BookMarked className="w-5 h-5" />
                <span>{gradeMeta.stage === 'intermediate' ? 'قصص المطالعة المقررة (Story Time)' : 'الأدب والشعر والنصوص المقررة'}</span>
              </h3>
              <span className="text-xs text-slate-400">{stories.length} أعمال أدبية رئيسية</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stories.map((story) => (
                <div key={story.id} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">
                      {story.author || 'المنهج الوزاري'}
                    </span>
                    <span className="text-xs text-amber-400 font-bold">وزاري مضمون</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{story.titleAr}</h4>
                  <p className="text-xs text-slate-400 font-english">{story.title}</p>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
                    {story.summaryAr || 'قصة ومقال أدبي مقرر في الامتحان الوزاري مع الأسئلة والنموذج الإجابي.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Exam Blueprint */}
        {activeTab === 'exam' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-amber-300 flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>هيكلية وتوزيع درجات الامتحان الوزاري (100 درجة كاملة)</span>
              </h3>
              <span className="text-xs text-slate-400">{gradeMeta.nameAr}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {(gradeMeta.stage === 'intermediate' ? [
                { q: 'Q1', title: 'القطعة الخارجية', marks: '20 درجة' },
                { q: 'Q2', title: 'القواعد والوظائف', marks: '25 درجة' },
                { q: 'Q3', title: 'المفردات والتنقيط', marks: '20 درجة' },
                { q: 'Q4', title: 'قصص المطالعة', marks: '15 درجة' },
                { q: 'Q5', title: 'الإنشاء والتعبير', marks: '20 درجة' },
              ] : [
                { q: 'Q1', title: 'القطعة الخارجية والفهم', marks: '20 درجة' },
                { q: 'Q2', title: 'القواعد (أساسيات)', marks: '30 درجة' },
                { q: 'Q3', title: 'المفردات والتهجئة', marks: '20 درجة' },
                { q: 'Q4', title: 'الأدب والشعر', marks: '10 درجات' },
                { q: 'Q5', title: 'الإنشاء المنهجي', marks: '20 درجة' },
              ]).map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-indigo-600/20 text-indigo-300 text-xs font-black">
                    {item.q}
                  </span>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs font-black text-amber-400">{item.marks}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-indigo-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white">هل أنت مستعد لتجربة الامتحان التجريبي الكامل؟</p>
                  <p className="text-[11px] text-slate-300">يحتوي المحاكي الوزاري على ورقة أسئلة متكاملة بمدة 100 دقيقة تماماً كالوزاري.</p>
                </div>
              </div>
              {onNavigateTab && (
                <button
                  onClick={() => onNavigateTab('mock')}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all cursor-pointer shrink-0"
                >
                  بدء المحاكي الآن
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
