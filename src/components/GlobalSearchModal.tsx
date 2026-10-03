import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  FileText, 
  Bookmark, 
  ArrowRight, 
  X,
  GraduationCap
} from 'lucide-react';
import { CURRICULUM_UNITS } from '../data/curriculumData';
import { THIRD_INTERMEDIATE_UNITS } from '../data/thirdIntermediateData';
import { LITERATURE_DATA } from '../data/literatureData';
import { ESSAYS_DATA } from '../data/essaysData';
import { MINISTERIAL_QUESTIONS } from '../data/ministerialQuestions';
import { Unit, Lesson } from '../types';

interface SearchResult {
  id: string;
  category: 'lesson' | 'grammar' | 'vocab' | 'literature' | 'essay' | 'question';
  title: string;
  subtitle: string;
  badge: string;
  onSelect: () => void;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lesson: Lesson) => void;
  onNavigateToTab: (tab: any) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson,
  onNavigateToTab
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Ctrl+K / Cmd+K and Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // Toggle or open handled in parent if passed
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Aggregate searchable items across all platform curricula
  const searchResults = useMemo<SearchResult[]>(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    const results: SearchResult[] = [];

    // 1. Lessons & Grammar Rules
    const allUnits: Unit[] = [...CURRICULUM_UNITS, ...THIRD_INTERMEDIATE_UNITS];
    for (const unit of allUnits) {
      for (const lesson of unit.lessons) {
        if (
          lesson.titleAr.toLowerCase().includes(trimmed) ||
          lesson.titleEn.toLowerCase().includes(trimmed) ||
          lesson.summary.toLowerCase().includes(trimmed) ||
          (lesson.grammarRuleFormula && lesson.grammarRuleFormula.toLowerCase().includes(trimmed))
        ) {
          results.push({
            id: 'lesson-' + lesson.id,
            category: 'lesson',
            title: `${lesson.titleAr} (${lesson.titleEn})`,
            subtitle: lesson.grammarRuleFormula || lesson.summary,
            badge: `الوحدة ${unit.number} • ${lesson.category}`,
            onSelect: () => {
              onSelectLesson(lesson);
              onClose();
            }
          });
        }

        // Search in lesson examples & teacher notes
        if (lesson.teacherNotes?.some(n => n.toLowerCase().includes(trimmed))) {
          results.push({
            id: 'note-' + lesson.id,
            category: 'grammar',
            title: `ملاحظة ذهبية في: ${lesson.titleAr}`,
            subtitle: lesson.teacherNotes.find(n => n.toLowerCase().includes(trimmed)) || '',
            badge: 'ملاحظة الأستاذ',
            onSelect: () => {
              onSelectLesson(lesson);
              onClose();
            }
          });
        }
      }
    }

    // 2. Literature Items
    for (const item of LITERATURE_DATA) {
      if (
        item.title.toLowerCase().includes(trimmed) ||
        item.titleAr.toLowerCase().includes(trimmed) ||
        item.author.toLowerCase().includes(trimmed) ||
        item.authorAr.toLowerCase().includes(trimmed) ||
        item.summaryAr.toLowerCase().includes(trimmed)
      ) {
        results.push({
          id: 'lit-' + item.id,
          category: 'literature',
          title: `${item.titleAr} - ${item.authorAr}`,
          subtitle: item.summaryAr.slice(0, 90) + '...',
          badge: 'الأدب والنصوص',
          onSelect: () => {
            onNavigateToTab('literature');
            onClose();
          }
        });
      }
    }

    // 3. Essays
    for (const essay of ESSAYS_DATA) {
      if (
        essay.titleAr.toLowerCase().includes(trimmed) ||
        essay.titleEn.toLowerCase().includes(trimmed)
      ) {
        results.push({
          id: 'essay-' + essay.id,
          category: 'essay',
          title: `إنشاء: ${essay.titleAr}`,
          subtitle: `${essay.titleEn} • الوزن الوزاري: ${essay.ministerialWeight}`,
          badge: 'الإنشاءات الوزارية',
          onSelect: () => {
            onNavigateToTab('essays');
            onClose();
          }
        });
      }
    }

    // 4. Ministerial Questions Bank
    for (const q of MINISTERIAL_QUESTIONS) {
      if (
        q.questionText.toLowerCase().includes(trimmed) ||
        q.correctAnswer.toLowerCase().includes(trimmed) ||
        q.topic.toLowerCase().includes(trimmed)
      ) {
        results.push({
          id: 'min-q-' + q.id,
          category: 'question',
          title: q.questionText,
          subtitle: `الحل: ${q.correctAnswer} • القاعدة: ${q.ruleExplanation}`,
          badge: `${q.year} - ${q.session}`,
          onSelect: () => {
            onNavigateToTab('exam');
            onClose();
          }
        });
      }
      if (results.length > 25) break;
    }

    return results.slice(0, 20);
  }, [query, onSelectLesson, onNavigateToTab, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950/60">
          <Search className="w-5 h-5 text-indigo-400 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="ابحث عن درس، قاعدة، كلمة، إنشاء، أو سؤال وزاري... (Ctrl + K)"
            autoFocus
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm md:text-base outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:bg-slate-800 text-slate-400 rounded-lg text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-mono font-bold"
          >
            Esc
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {!query.trim() ? (
            <div className="py-12 text-center text-slate-500">
              <Sparkles className="w-10 h-10 mx-auto mb-3 text-indigo-500/40" />
              <p className="text-sm font-medium text-slate-400">
                ابحث في جميع وحدات السادس الإعدادي والثالث المتوسط والأدب والإنشاءات والأسئلة الوزارية
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
                <span className="px-2.5 py-1 bg-slate-800/80 rounded-full text-slate-400">Past Simple</span>
                <span className="px-2.5 py-1 bg-slate-800/80 rounded-full text-slate-400">Used to</span>
                <span className="px-2.5 py-1 bg-slate-800/80 rounded-full text-slate-400">الأرجوحة (The Swing)</span>
                <span className="px-2.5 py-1 bg-slate-800/80 rounded-full text-slate-400">محمد خضير</span>
                <span className="px-2.5 py-1 bg-slate-800/80 rounded-full text-slate-400">Cigarette advertising</span>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p className="text-sm text-slate-400">لم يتم العثور على نتائج مطابقة لـ "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">جرّب البحث بكلمة مفتاحية أخرى باللغة العربية أو الإنكليزية</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-500 px-2 uppercase tracking-wider">
                النتائج ({searchResults.length})
              </div>
              {searchResults.map(result => (
                <div
                  key={result.id}
                  onClick={result.onSelect}
                  className="p-3 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/40 hover:border-indigo-500/40 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                        {result.badge}
                      </span>
                      <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                        {result.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 truncate font-mono">
                      {result.subtitle}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors flex-shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
