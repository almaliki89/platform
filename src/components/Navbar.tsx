import React from 'react';
import { Sparkles, Trophy, Flame, GraduationCap } from 'lucide-react';
import { StudentState } from '../types';

interface NavbarProps {
  currentTab: 'dashboard' | 'lesson' | 'exam' | 'literature' | 'essays' | 'verbs';
  setCurrentTab: (tab: 'dashboard' | 'lesson' | 'exam' | 'literature' | 'essays' | 'verbs') => void;
  studentState: StudentState;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  studentState,
  onOpenProfile,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Platform Identity */}
          <div 
            id="brand-logo"
            onClick={() => setCurrentTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">النموذجية 2027</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  السادس الإعدادي
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                إشراف الأستاذ مصطفى تركي • المنهج الوزاري المعتمد
              </p>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <button
              id="nav-dashboard-btn"
              onClick={() => setCurrentTab('dashboard')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'dashboard'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              الرئيسية
            </button>

            <button
              id="nav-exam-btn"
              onClick={() => setCurrentTab('exam')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'exam'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              بنك الوزاريات
            </button>

            <button
              id="nav-literature-btn"
              onClick={() => setCurrentTab('literature')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'literature'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              الأدب الوزاري
            </button>

            <button
              id="nav-essays-btn"
              onClick={() => setCurrentTab('essays')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'essays'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              الإنشاءات (20 درجة)
            </button>

            <button
              id="nav-verbs-btn"
              onClick={() => setCurrentTab('verbs')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'verbs'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              الأفعال الشاذة
            </button>
          </nav>

          {/* Action Hub (XP Badge + Profile) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak & XP Pill */}
            <div 
              id="student-stats-pill"
              onClick={onOpenProfile}
              className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-200 transition-colors"
              title="لوحة إنجازات الطالب"
            >
              <div className="flex items-center gap-1 text-amber-600 font-bold text-xs">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{studentState.streakDays} أيام</span>
              </div>
              <div className="w-px h-4 bg-slate-300"></div>
              <div className="flex items-center gap-1 text-indigo-600 font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{studentState.xp} XP</span>
              </div>
            </div>

            {/* Profile Avatar Button */}
            <button
              id="student-profile-btn"
              onClick={onOpenProfile}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 hover:bg-indigo-100 transition-colors"
              title="الملف الشخصي والإنجازات"
            >
              <Trophy className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden items-center justify-between overflow-x-auto py-2 border-t border-slate-100 no-scrollbar gap-2 text-xs font-semibold">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${currentTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-600 bg-slate-100'}`}
          >
            الرئيسية
          </button>
          <button
            onClick={() => setCurrentTab('exam')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${currentTab === 'exam' ? 'bg-indigo-600 text-white' : 'text-slate-600 bg-slate-100'}`}
          >
            الوزاريات
          </button>
          <button
            onClick={() => setCurrentTab('literature')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${currentTab === 'literature' ? 'bg-indigo-600 text-white' : 'text-slate-600 bg-slate-100'}`}
          >
            الأدب
          </button>
          <button
            onClick={() => setCurrentTab('essays')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${currentTab === 'essays' ? 'bg-indigo-600 text-white' : 'text-slate-600 bg-slate-100'}`}
          >
            الإنشاءات
          </button>
          <button
            onClick={() => setCurrentTab('verbs')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${currentTab === 'verbs' ? 'bg-indigo-600 text-white' : 'text-slate-600 bg-slate-100'}`}
          >
            الشواذ
          </button>
        </div>

      </div>
    </header>
  );
};
