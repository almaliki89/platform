import React from 'react';
import { Sparkles, Trophy, Flame, GraduationCap, UploadCloud } from 'lucide-react';
import { StudentState, EducationalGrade } from '../types';

interface NavbarProps {
  currentTab: 'dashboard' | 'lesson' | 'exam' | 'mock' | 'literature' | 'essays' | 'verbs' | 'vocab' | 'malzama';
  setCurrentTab: (tab: 'dashboard' | 'lesson' | 'exam' | 'mock' | 'literature' | 'essays' | 'verbs' | 'vocab' | 'malzama') => void;
  studentState: StudentState;
  selectedGrade: EducationalGrade;
  onSelectGrade: (grade: EducationalGrade) => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  studentState,
  selectedGrade,
  onSelectGrade,
  onOpenProfile,
}) => {
  const isThirdIntermediate = selectedGrade === 'third-intermediate';

  const navItems = isThirdIntermediate ? [
    { id: 'dashboard', label: 'الرئيسية' },
    { id: 'malzama', label: 'رفع ومعالجة الملزمة', highlight: true, icon: UploadCloud },
    { id: 'mock', label: 'محاكي الوزاري 100د' },
    { id: 'exam', label: 'الأسئلة الوزارية' },
    { id: 'literature', label: 'قصص الثالث (Story Time)' },
    { id: 'essays', label: 'الإنشاءات' },
    { id: 'vocab', label: 'المفردات والتوصيل' },
  ] : [
    { id: 'dashboard', label: 'الرئيسية' },
    { id: 'mock', label: 'محاكي الوزاري 100د', highlight: true },
    { id: 'exam', label: 'بنك الوزاريات' },
    { id: 'vocab', label: 'أطلس الرموز والمفردات' },
    { id: 'literature', label: 'الأدب الوزاري' },
    { id: 'essays', label: 'الإنشاءات' },
    { id: 'verbs', label: 'الأفعال الشاذة' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Main Navbar Row */}
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4 flex-nowrap">
          
          {/* Logo & Grade Identity */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 select-none">
            <div 
              id="brand-logo"
              onClick={() => setCurrentTab('dashboard')}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0"
            >
              <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-200 shrink-0 ${
                isThirdIntermediate 
                  ? 'bg-gradient-to-tr from-teal-700 via-teal-600 to-emerald-500 shadow-teal-200' 
                  : 'bg-gradient-to-tr from-indigo-700 via-indigo-600 to-blue-500 shadow-indigo-200'
              }`}>
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="hidden md:block shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-sm sm:text-base text-slate-900 tracking-tight whitespace-nowrap">
                    {isThirdIntermediate ? 'النموذجية • الثالث المتوسط' : 'النموذجية • السادس الإعدادي'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
                  {isThirdIntermediate ? 'المنهج الوزاري 2025' : 'إشراف الأستاذ مصطفى تركي'}
                </p>
              </div>
            </div>

            {/* Grade Switcher Segmented Control */}
            <div className="flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/90 shrink-0">
              <button
                id="grade-sixth-btn"
                onClick={() => onSelectGrade('sixth-preparatory')}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all whitespace-nowrap ${
                  !isThirdIntermediate
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                السادس الإعدادي
              </button>
              <button
                id="grade-third-btn"
                onClick={() => onSelectGrade('third-intermediate')}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
                  isThirdIntermediate
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>الثالث المتوسط</span>
                {isThirdIntermediate && <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />}
              </button>
            </div>
          </div>

          {/* Navigation Links - Desktop Large Screens (2xl and wide displays only) */}
          <nav className="hidden 2xl:flex items-center gap-1 shrink-0">
            {navItems.map((tab) => {
              const isActive = currentTab === tab.id;
              const Icon = (tab as any).icon;
              return (
                <button
                  key={tab.id}
                  id={`nav-${tab.id}-btn`}
                  onClick={() => setCurrentTab(tab.id as any)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all relative flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                    isActive
                      ? tab.highlight 
                        ? 'bg-amber-400 text-slate-950 shadow-xs font-black' 
                        : isThirdIntermediate ? 'bg-teal-600 text-white shadow-xs font-black' : 'bg-indigo-600 text-white shadow-xs font-black'
                      : tab.highlight
                        ? 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 font-bold'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Hub (XP Badge + Profile) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Streak & XP Pill */}
            <div 
              id="student-stats-pill"
              onClick={onOpenProfile}
              className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-200/80 transition-colors shrink-0"
              title="لوحة إنجازات الطالب"
            >
              <div className="flex items-center gap-1 text-amber-600 font-bold text-xs whitespace-nowrap">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{studentState.streakDays}د</span>
              </div>
              <div className="w-px h-3.5 bg-slate-300"></div>
              <div className="flex items-center gap-1 text-indigo-600 font-bold text-xs whitespace-nowrap">
                <Sparkles className="w-3 h-3" />
                <span>{studentState.xp} XP</span>
              </div>
            </div>

            {/* Profile Avatar Button */}
            <button
              id="student-profile-btn"
              onClick={onOpenProfile}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 hover:bg-indigo-100 transition-colors shrink-0 cursor-pointer"
              title="الملف الشخصي والإنجازات"
            >
              <Trophy className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Dedicated Navigation Bar for all screens under 2xl (Mobile, Tablets, Laptops, Desktops) */}
        <div className="flex 2xl:hidden items-center overflow-x-auto py-2 border-t border-slate-100 no-scrollbar gap-1.5 text-xs scroll-smooth">
          {navItems.map((tab) => {
            const isActive = currentTab === tab.id;
            const Icon = (tab as any).icon;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? tab.highlight
                      ? 'bg-amber-400 text-slate-950 shadow-xs font-black'
                      : isThirdIntermediate ? 'bg-teal-600 text-white shadow-xs font-black' : 'bg-indigo-600 text-white shadow-xs font-black'
                    : tab.highlight
                      ? 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200'
                      : 'text-slate-600 bg-slate-100/90 hover:bg-slate-200/90'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
