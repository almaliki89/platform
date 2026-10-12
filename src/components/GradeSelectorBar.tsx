import React from 'react';
import { EducationalGrade } from '../types';
import { ALL_GRADES_META, ORDERED_GRADES } from '../data/gradeContentResolver';
import { GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GradeSelectorBarProps {
  selectedGrade: EducationalGrade;
  onSelectGrade: (grade: EducationalGrade) => void;
}

export const GradeSelectorBar: React.FC<GradeSelectorBarProps> = ({
  selectedGrade,
  onSelectGrade,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white tracking-tight">
                اختر الصف الدراسي (المنهج العراقي للغة الإنكليزية حصراً)
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                الصفوف الوزارية المعتمدة: الثالث المتوسط والسادس الإعدادي (2020 - 2026)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl self-start md:self-auto">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>معتمد رسمياً من وزارة التربية العراقية</span>
          </div>
        </div>

        {/* Grades Horizontal / Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-3">
          {ORDERED_GRADES.map((gId) => {
            const meta = ALL_GRADES_META[gId];
            const isSelected = selectedGrade === gId;
            return (
              <button
                key={gId}
                onClick={() => {
                  onSelectGrade(gId);
                  navigate(`/grade/${gId}`);
                }}
                className={`relative flex flex-col items-start p-3 rounded-2xl transition-all duration-200 cursor-pointer text-right border ${
                  isSelected
                    ? 'bg-gradient-to-br from-indigo-600 to-indigo-800 text-white border-indigo-500 shadow-md ring-2 ring-indigo-500/20 scale-[1.02]'
                    : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700/60'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    {meta.stage === 'intermediate' ? 'متوسطة' : 'إعدادية'}
                  </span>
                  {meta.isMinisterial ? (
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300/40'
                    }`}>
                      وزاري ومدرسي (100%)
                    </span>
                  ) : (
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      امتحان نهائي فقط
                    </span>
                  )}
                </div>

                <span className="font-black text-sm tracking-tight mt-1">
                  {meta.nameAr}
                </span>

                <div className="flex items-center justify-between w-full mt-2 pt-2 border-t border-slate-200/20 dark:border-slate-700/40 text-[10px] opacity-90">
                  <span>منهج 2026</span>
                  {isSelected ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">اختيار</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
