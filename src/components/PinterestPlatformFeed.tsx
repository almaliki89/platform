import React, { useState } from 'react';
import { 
  Bookmark, Heart, Search, Compass, BookOpen, Award, 
  FolderPlus, Layers, FileText
} from 'lucide-react';
import { EducationalGrade, Lesson } from '../types';
import { getUnitsForGrade, getGradeMeta, getQuestionsForGrade } from '../data/gradeContentResolver';
import { PinterestPinModal, PinItem } from './PinterestPinModal';

interface PinterestPlatformFeedProps {
  selectedGrade: EducationalGrade;
  onSelectGrade: (grade: EducationalGrade) => void;
  onSelectLesson: (lesson: Lesson) => void;
  onNavigateTab: (tab: 'exam' | 'mock' | 'literature' | 'essays' | 'verbs' | 'vocab' | 'review') => void;
  studentState: any;
}

export const PinterestPlatformFeed: React.FC<PinterestPlatformFeedProps> = ({
  selectedGrade,
  onSelectGrade,
  onSelectLesson,
  onNavigateTab,
  studentState
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedPinIds, setSavedPinIds] = useState<string[]>(studentState.bookmarkedQuestionIds || []);
  const [selectedPin, setSelectedPin] = useState<PinItem | null>(null);
  const [userBoards, setUserBoards] = useState<string[]>([
    'قواعد للمراجعة',
    'المفردات الجديدة',
    'أسئلة أريد مراجعتها',
    'قصص ونصوص الصف المختار'
  ]);
  const [newBoardInput, setNewBoardInput] = useState('');
  const [showNewBoardModal, setShowNewBoardModal] = useState(false);

  const gradeMeta = getGradeMeta(selectedGrade);
  const units = getUnitsForGrade(selectedGrade);

  // Generate clean pins from current grade lessons and ministerial questions
  const pinsList: PinItem[] = [];

  // 1. Lessons
  units.forEach((unit) => {
    unit.lessons.forEach((lesson, lIdx) => {
      pinsList.push({
        id: `lesson-${lesson.id}`,
        title: lesson.titleAr,
        subtitle: lesson.titleEn,
        category: lesson.category === 'grammar' ? 'grammar' : lesson.category === 'vocabulary' ? 'vocab' : 'student',
        grade: gradeMeta.nameAr,
        unitTitle: `الوحدة ${unit.number} · ${unit.titleAr}`,
        contentSummary: lesson.summary,
        detailedNotes: lesson.detailedContent,
        teacherTips: lesson.teacherNotes || ['راجع القاعدة ثم جرّب تطبيقها على مثال.'],
        commonMistakes: lesson.commonMistakes || ['اقرأ السؤال جيداً وتحقق من تركيب الإجابة.'],
        examples: lesson.examples,
        lessonRef: lesson,
        accentColor: lIdx % 3 === 0 ? 'bg-indigo-700' : lIdx % 3 === 1 ? 'bg-slate-800' : 'bg-teal-700',
      });
    });
  });

  // 2. Grade Questions & Ministerial Practice
  const gradeQuestions = getQuestionsForGrade(selectedGrade);
  gradeQuestions.forEach((mq, qIdx) => {
    pinsList.push({
      id: `mq-${mq.id}`,
      title: `سؤال من بنك ${gradeMeta.shortName} (${mq.year} - ${mq.session})`,
      subtitle: mq.topic,
      category: 'ministerial',
      grade: gradeMeta.nameAr,
      unitTitle: `الوحدة ${mq.unitId} · ${gradeMeta.nameAr}`,
      contentSummary: mq.questionText,
      detailedNotes: [
        `السؤال: ${mq.questionText}`,
        `الجواب النموذجي: ${mq.correctAnswer}`,
        `التوضيح القاعدي: ${mq.ruleExplanation}`
      ],
      teacherTips: [
        `سؤال ضمن بنك الأسئلة المعروض لصف ${gradeMeta.nameAr}.`,
        `تحقق دائماً من مفاتيح الحل قبل الإجابة.`
      ],
      questionData: mq,
      accentColor: 'bg-amber-800',
    });
  });

  // Filter pins based on category and search query
  const filteredPins = pinsList.filter((pin) => {
    const matchesCategory = 
      activeCategory === 'all' ? true :
      activeCategory === 'grammar' ? pin.category === 'grammar' :
      activeCategory === 'vocab' ? pin.category === 'vocab' :
      activeCategory === 'ministerial' ? pin.category === 'ministerial' :
      activeCategory === 'saved' ? savedPinIds.includes(pin.id) : true;

    const matchesSearch = 
      !searchQuery || 
      pin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pin.contentSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pin.unitTitle.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleSaveToBoard = (pinId: string, boardName: string) => {
    if (!savedPinIds.includes(pinId)) {
      setSavedPinIds([...savedPinIds, pinId]);
    } else {
      setSavedPinIds(savedPinIds.filter(id => id !== pinId));
    }
  };

  const handleCreateBoard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBoardInput.trim()) return;
    if (!userBoards.includes(newBoardInput)) {
      setUserBoards([...userBoards, newBoardInput]);
    }
    setNewBoardInput('');
    setShowNewBoardModal(false);
  };

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto w-full">
      
      {/* 1. Calm Editorial Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div className="space-y-1.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              لوحات الشروحات والمفاهيم المركزة
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">{gradeMeta.nameAr}</span>
              <span aria-hidden="true">·</span>
              <span>المرحلة: {gradeMeta.stageAr}</span>
              <span aria-hidden="true">·</span>
              <span>الفئة العمرية: {gradeMeta.ageRangeAr}</span>
              <span aria-hidden="true">·</span>
              <span>إشراف الأستاذ مصطفى تركي</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowNewBoardModal(true)}
            className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-semibold text-xs flex items-center gap-2 cursor-pointer self-start md:self-auto transition-colors"
          >
            <FolderPlus className="w-4 h-4" />
            <span>لوحة مخصصة جديدة</span>
          </button>
        </div>

        {/* Clean Search Input */}
        <div className="relative w-full">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في القواعد والمفردات والأسئلة..."
            className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* 2. Restrained Segmented Control Filter */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl overflow-x-auto">
        {[
          { id: 'all', label: 'جميع الأفكار' },
          { id: 'grammar', label: 'القواعد والوظائف' },
          { id: 'vocab', label: 'المفردات وكتاب النشاط' },
          { id: 'ministerial', label: 'بنك الأسئلة' },
          { id: 'saved', label: `المحفوظات (${savedPinIds.length})` },
        ].map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                isActive 
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 3. Clean Card Grid (Single Elevation) */}
      {filteredPins.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-2">
          <Compass className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">لا توجد عناصر مطابقة للبحث</h3>
          <p className="text-xs text-slate-500">
            جرب كتابة كلمات مختلفة أو اختر تصنيفاً آخر.
          </p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filteredPins.map((pin) => {
            const isSaved = savedPinIds.includes(pin.id);
            return (
              <div
                key={pin.id}
                onClick={() => setSelectedPin(pin)}
                className="break-inside-avoid bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer flex flex-col overflow-hidden"
              >
                {/* Header Strip */}
                <div className={`px-4 py-3 ${pin.accentColor} text-white flex items-center justify-between`}>
                  <span className="text-[11px] font-semibold tracking-wide opacity-90 truncate max-w-[180px]">
                    {pin.subtitle || pin.unitTitle}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveToBoard(pin.id, 'مفضلة الطالب');
                    }}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isSaved ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    title={isSaved ? 'محفوظ' : 'حفظ في لوحة'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {pin.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {pin.contentSummary}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="truncate max-w-[140px]">
                      {pin.unitTitle}
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                      عرض التفاصيل
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. New Board Modal */}
      {showNewBoardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-sm w-full border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">إنشاء لوحة مخصصة</h3>
            <p className="text-xs text-slate-500">نظم الأسئلة والشروحات التي تهمك في لوحة دراسية خاصة.</p>
            
            <form onSubmit={handleCreateBoard} className="space-y-3">
              <input
                type="text"
                value={newBoardInput}
                onChange={(e) => setNewBoardInput(e.target.value)}
                placeholder="اسم اللوحة (مثلاً: قواعد الوحدة الثالثة)..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowNewBoardModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:bg-slate-800 cursor-pointer"
                >
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Detail Modal */}
      {selectedPin && (
        <PinterestPinModal
          pin={selectedPin}
          onClose={() => setSelectedPin(null)}
          onSaveToBoard={handleSaveToBoard}
          isSaved={savedPinIds.includes(selectedPin.id)}
        />
      )}

    </div>
  );
};
