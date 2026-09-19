import React, { useState } from 'react';
import { BookOpen, Sparkles, User, HelpCircle, ChevronLeft, ArrowLeft, BookmarkCheck } from 'lucide-react';
import { LITERATURE_DATA } from '../data/literatureData';
import { LiteratureItem } from '../types';

export const LiteratureSection: React.FC = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const activeLiterature: LiteratureItem = LITERATURE_DATA[activeItemIndex];

  const [revealedQA, setRevealedQA] = useState<Record<number, boolean>>({});

  const toggleQA = (idx: number) => {
    setRevealedQA(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-900 via-amber-800 to-yellow-950 text-white shadow-lg space-y-4 border border-amber-700/50">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>قسم الأدب الوزاري (Literature Focus) • 10 درجات وزارية</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black">
          الأدب المقرّر للصف السادس الإعدادي 2027
        </h1>

        <p className="text-xs sm:text-sm text-amber-100 max-w-2xl leading-relaxed">
          دراسة تحليلية شاملة للرواية الكلاسيكية «كبرياء وتحامل» والمسرحية الكوميدية «كما تشاء»، مع استعراض أدوار الشخصيات والأسئلة الوزارية النموذجية المكررة.
        </p>

        {/* Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {LITERATURE_DATA.map((item, idx) => (
            <button
              key={item.id}
              id={`lit-tab-${item.id}`}
              onClick={() => {
                setActiveItemIndex(idx);
                setRevealedQA({});
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeItemIndex === idx
                  ? 'bg-white text-amber-950 shadow-md scale-105'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              <span>{item.title}</span>
              <span className="text-[11px] opacity-80">({item.author.split('(')[0].trim()})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Literature Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
        
        {/* Title & Metadata */}
        <div className="border-b border-slate-100 pb-5 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {activeLiterature.titleAr}
            </h2>
            <button
              onClick={() => setRevealedQA({})}
              className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>إعادة الأسئلة</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
            <span>المؤلف: <strong className="text-slate-800">{activeLiterature.author}</strong></span>
            <span>•</span>
            <span>النوع الأدبي: <strong className="text-slate-800">{activeLiterature.genre}</strong></span>
          </div>
        </div>

        {/* Story Summary */}
        <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-2">
          <h3 className="text-sm font-black text-amber-900 flex items-center gap-2">
            <BookmarkCheck className="w-4 h-4 text-amber-600" />
            <span>ملخص الحبكة والأحداث (Plot Summary)</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {activeLiterature.summaryAr}
          </p>
        </div>

        {/* Key Themes */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-slate-900">
            الثيمات والأفكار الجوهرية (Key Themes)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activeLiterature.keyThemes.map((theme, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
                <span className="font-bold text-indigo-600 ml-1">✦</span>
                {theme}
              </div>
            ))}
          </div>
        </div>

        {/* Characters Grid */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-600" />
            <span>الشخصيات الرئيسية والتحليل الوزاري</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeLiterature.characters.map((char, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-indigo-950">
                    {char.name}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                    {char.role}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {char.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Ministerial Questions & Answers */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              <span>الأسئلة والأجوبة الوزارية النموذجية (2014-2025)</span>
            </h3>
            <span className="text-xs font-bold text-slate-400">
              {activeLiterature.ministerialQA.length} أسئلة
            </span>
          </div>

          <div className="space-y-3">
            {activeLiterature.ministerialQA.map((qa, i) => {
              const isRevealed = !!revealedQA[i];

              return (
                <div 
                  key={i}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-colors space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-bold text-sm sm:text-base text-slate-900 dir-ltr text-right">
                      <span className="text-amber-600 font-extrabold mr-2">Q{i + 1}.</span>
                      {qa.question}
                    </p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 whitespace-nowrap">
                      {qa.year}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => toggleQA(i)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isRevealed ? 'إخفاء الإجابة' : 'إظهار الجواب النموذجي'}</span>
                    </button>
                  </div>

                  {isRevealed && (
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 dir-ltr text-right">
                      <p className="text-xs font-bold text-slate-500">Model Answer:</p>
                      <p className="font-mono text-sm font-semibold text-emerald-800 leading-relaxed">
                        {qa.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
