import React, { useState } from 'react';
import { FileText, Sparkles, Check, X, CheckCircle2, Bookmark, Lightbulb, RotateCcw } from 'lucide-react';
import { ESSAYS_DATA } from '../data/essaysData';
import { EssayItem } from '../types';
import { triggerCelebration } from '../utils/storage';

export const EssaysSection: React.FC = () => {
  const [selectedEssayIndex, setSelectedEssayIndex] = useState(0);
  const currentEssay: EssayItem = ESSAYS_DATA[selectedEssayIndex];

  // Tab for active essay: 'read' vs 'cloze'
  const [activeTab, setActiveTab] = useState<'read' | 'cloze'>('read');

  // Cloze answers: index -> user choice
  const [clozeAnswers, setClozeAnswers] = useState<Record<number, string>>({});

  const handleSelectClozeOption = (clozeIdx: number, option: string, correctWord: string) => {
    if (clozeAnswers[clozeIdx]) return;
    setClozeAnswers(prev => ({ ...prev, [clozeIdx]: option }));
    if (option === correctWord) {
      triggerCelebration();
    }
  };

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-lg space-y-4 border border-emerald-700/50">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold">
          <FileText className="w-3.5 h-3.5" />
          <span>الإنشاءات الوزارية النموذجية • 20 درجة كاملة مضمونة</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black">
          الإنشاءات المقرّرة للصف السادس الإعدادي 2027
        </h1>

        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
          نماذج مكتوبة بلغة أكاديمية رصينة ومفردات قوية تتطابق مع المعايير الوزارية للتصحيح في مركز الفحص، مع الترجمة وطريقة الحفظ بالتدرج.
        </p>

        {/* Essay Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {ESSAYS_DATA.map((essay, idx) => (
            <button
              key={essay.id}
              id={`essay-tab-${essay.id}`}
              onClick={() => {
                setSelectedEssayIndex(idx);
                setClozeAnswers({});
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                selectedEssayIndex === idx
                  ? 'bg-white text-emerald-950 shadow-md scale-105'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              <span>{essay.titleAr}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Essay View Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
        
        {/* Essay Title and Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                الوحدة {currentEssay.unitId}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {currentEssay.ministerialWeight}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {currentEssay.titleAr}
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-400 dir-ltr text-right">
              {currentEssay.titleEn}
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <div className="p-1 bg-slate-100 rounded-xl flex items-center border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setActiveTab('read')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'read' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
                }`}
              >
                قراءة وترجمة
              </button>
              <button
                onClick={() => setActiveTab('cloze')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'cloze' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
                }`}
              >
                اختبار الحفظ (الفراغات)
              </button>
            </div>

            <button
              onClick={() => setActiveTab('cloze')}
              className="px-3 py-2 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-700 border border-violet-200 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-600" />
              <span>اختبار الحفظ</span>
            </button>
          </div>
        </div>

        {/* ================= READ MODE ================= */}
        {activeTab === 'read' && (
          <div className="space-y-6">
            
            {/* Key Vocabulary Chips */}
            <div className="space-y-2">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">
                المفردات المفتاحية للإنشاء (Key Vocabulary)
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentEssay.keywords.map((kw, i) => (
                  <div 
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs"
                  >
                    <span className="font-mono font-bold text-emerald-800 dir-ltr">{kw.word}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-600">{kw.meaning}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Paragraphs Parallel View */}
            <div className="space-y-5">
              {currentEssay.paragraphsEn.map((paraEn, idx) => {
                const paraAr = currentEssay.paragraphsAr[idx];

                return (
                  <div 
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors space-y-4"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                      <span>الفقرة {idx + 1} {idx === 0 ? '(المقدمة)' : idx === currentEssay.paragraphsEn.length - 1 ? '(الخاتمة)' : '(متن الموضوع)'}</span>
                    </div>

                    <p className="font-sans text-sm sm:text-base text-slate-900 leading-relaxed dir-ltr text-left font-medium">
                      {paraEn}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/80 pt-3">
                      {paraAr}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Golden Tips */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2.5">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                <Lightbulb className="w-4 h-4 text-amber-600 fill-amber-500" />
                <span>نصائح الأستاذ مصطفى تركي لنيل 20/20 في هذا الإنشاء</span>
              </div>
              <div className="space-y-1.5">
                {currentEssay.goldenTips.map((tip, idx) => (
                  <p key={idx} className="text-xs sm:text-sm text-amber-900 leading-relaxed flex items-start gap-2">
                    <span className="text-amber-600 font-bold shrink-0">✔</span>
                    <span>{tip}</span>
                  </p>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= CLOZE TEST MODE ================= */}
        {activeTab === 'cloze' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-900">
              💡 <strong>اختبار التثبيت السريع:</strong> اختر الكلمة المناسبة لملء الفراغ للتأكد من حفظ المفردات الأساسية للإنشاء!
            </div>

            <div className="space-y-4">
              {currentEssay.clozeSentences.map((cloze, idx) => {
                const userChoice = clozeAnswers[idx];
                const isAnswered = !!userChoice;
                const isCorrect = userChoice === cloze.missingWord;

                return (
                  <div 
                    key={idx}
                    className={`p-5 rounded-2xl border transition-all space-y-3 ${
                      isAnswered
                        ? isCorrect 
                          ? 'bg-emerald-50/50 border-emerald-300' 
                          : 'bg-rose-50/50 border-rose-300'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <p className="font-mono text-sm sm:text-base font-bold text-slate-900 dir-ltr text-left">
                      {cloze.textWithBlanks}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 dir-ltr">
                      {cloze.options.map((opt) => {
                        const isThisSelected = userChoice === opt;
                        const isThisCorrect = opt === cloze.missingWord;

                        let style = "bg-white border-slate-200 text-slate-700 hover:border-emerald-400";
                        if (isAnswered) {
                          if (isThisCorrect) {
                            style = "bg-emerald-600 text-white font-bold border-emerald-600";
                          } else if (isThisSelected) {
                            style = "bg-rose-600 text-white font-bold border-rose-600";
                          } else {
                            style = "bg-white/60 opacity-60";
                          }
                        }

                        return (
                          <button
                            key={opt}
                            disabled={isAnswered}
                            onClick={() => handleSelectClozeOption(idx, opt, cloze.missingWord)}
                            className={`p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${style}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
