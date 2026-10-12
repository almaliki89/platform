import React from 'react';
import { EducationalGrade } from '../types';
import { ALL_GRADES_META, ORDERED_GRADES } from '../data/gradeContentResolver';
import { GraduationCap } from 'lucide-react';

interface GradeSelectorBarProps {
  selectedGrade: EducationalGrade;
  onSelectGrade: (grade: EducationalGrade) => void;
}

export const GradeSelectorBar: React.FC<GradeSelectorBarProps> = ({
  selectedGrade,
  onSelectGrade,
}) => {
  return (
    <div className="w-full mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            المراحل والصفوف الدراسية (المنهج العراقي)
          </h2>
          <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            الفئات العمرية: 12 إلى 18 سنة
          </span>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          اختر صفك الدراسي لعرض المحتوى المخصص
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {ORDERED_GRADES.map((gId) => {
          const meta = ALL_GRADES_META[gId];
          const isSelected = selectedGrade === gId;
          return (
            <button
              key={gId}
              type="button"
              onClick={() => onSelectGrade(gId)}
              className={`p-3 rounded-xl text-right transition-all flex flex-col justify-between border cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between gap-1 w-full text-[11px] mb-1">
                <span className={isSelected ? 'text-slate-300 dark:text-slate-600 font-medium' : 'text-slate-400 dark:text-slate-500'}>
                  {meta.stage === 'intermediate' ? 'المتوسطة' : 'الإعدادية'}
                </span>
                {meta.isMinisterial && (
                  <span className={`text-[10px] font-bold ${isSelected ? 'text-amber-300 dark:text-amber-600' : 'text-amber-600 dark:text-amber-400'}`}>
                    وزاري
                  </span>
                )}
              </div>
              <div className="font-bold text-xs truncate">
                {meta.shortName}
              </div>
              <div className={`text-[11px] mt-1 ${isSelected ? 'text-slate-300 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'}`}>
                {meta.ageRangeAr}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
