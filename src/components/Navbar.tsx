import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Sparkles, 
  Trophy, 
  Flame, 
  GraduationCap, 
  User as UserIcon, 
  ChevronDown,
  Check
} from 'lucide-react';
import { StudentState, EducationalGrade } from '../types';
import { useAuth } from '../context/AuthContext';
import { APP_ROUTES } from '../routes';
import { ALL_GRADES_META, ORDERED_GRADES, getGradeMeta } from '../data/gradeContentResolver';

interface NavbarProps {
  studentState: StudentState;
  selectedGrade: EducationalGrade;
  onSelectGrade: (grade: EducationalGrade) => void;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
}

interface NavItem {
  id: string;
  path: string;
  label: string;
  highlight?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  studentState,
  selectedGrade,
  onSelectGrade,
  onOpenProfile,
  onOpenAuth
}) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isGradeMenuOpen, setIsGradeMenuOpen] = useState(false);
  const gradeMenuRef = useRef<HTMLDivElement>(null);

  const currentGradeMeta = getGradeMeta(selectedGrade);
  const isMinisterial = currentGradeMeta.isMinisterial;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (gradeMenuRef.current && !gradeMenuRef.current.contains(event.target as Node)) {
        setIsGradeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const litLabel = (selectedGrade === 'first-intermediate' || selectedGrade === 'second-intermediate')
    ? 'قصص المطالعة (Story Time)'
    : selectedGrade === 'third-intermediate'
    ? 'قصص الثالث (Story Time)'
    : 'الأدب والنصوص';

  const navItems: NavItem[] = [
    { id: 'dashboard', path: APP_ROUTES.home, label: 'الرئيسية' },
    { id: 'review', path: APP_ROUTES.review, label: 'المراجعة المركزة' },
    { id: 'mock', path: APP_ROUTES.mock, label: isMinisterial ? 'محاكي الوزاري 100د' : 'محاكي الامتحان النهائي 100د', highlight: true },
    { id: 'exam', path: APP_ROUTES.exam, label: isMinisterial ? 'بنك الوزاريات' : 'بنك الأسئلة والتمارين' },
    { id: 'literature', path: APP_ROUTES.literature, label: litLabel },
    { id: 'essays', path: APP_ROUTES.essays, label: 'الإنشاءات' },
    { id: 'vocab', path: APP_ROUTES.vocab, label: 'المفردات والتوصيل' },
    ...(selectedGrade === 'sixth-preparatory' || selectedGrade === 'fifth-preparatory' || selectedGrade === 'fourth-preparatory'
      ? [{ id: 'verbs', path: APP_ROUTES.verbs, label: 'الأفعال الشاذة' }]
      : [])
  ];

  const isItemActive = (item: NavItem) => {
    if (item.path === '/') {
      return location.pathname === '/' || location.pathname === '/subjects';
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs overflow-visible">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Main Navbar Row */}
        <div className="flex items-center justify-between h-16 gap-1.5 sm:gap-4 flex-nowrap">
          
          {/* Logo & Grade Identity */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 select-none">
            <Link 
              id="brand-logo"
              to="/"
              className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group shrink-0"
            >
              <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-200 shrink-0 bg-gradient-to-tr ${currentGradeMeta.accentGradient}`}>
                <GraduationCap className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div className="hidden md:block shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-sm sm:text-base text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
                    النموذجية • {currentGradeMeta.nameAr}
                  </span>
                  {currentGradeMeta.isMinisterial && (
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-300">
                      وزاري
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                  إشراف الأستاذ مصطفى تركي • المنهج العراقي
                </p>
              </div>
            </Link>

            {/* Active Grade Badge */}
            <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black border shadow-xs ${currentGradeMeta.badgeBg}`}>
              <span>{currentGradeMeta.nameAr}</span>
              {currentGradeMeta.isMinisterial && (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-black">وزاري</span>
              )}
            </div>

          </div>



          {/* Navigation Links - Desktop Large Screens */}
          <nav className="hidden 2xl:flex items-center gap-1 shrink-0">
            {navItems.map((item) => {
              const active = isItemActive(item);
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}-btn`}
                  onClick={() => navigate(item.path)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all relative flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer ${
                    active
                      ? item.highlight 
                        ? 'bg-amber-400 text-slate-950 shadow-xs font-black' 
                        : 'bg-indigo-600 text-white shadow-xs font-black'
                      : item.highlight
                        ? 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 font-bold dark:bg-amber-950/40 dark:text-amber-300'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Hub (Auth + XP Badge + Profile) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div 
              id="student-stats-pill"
              onClick={onOpenProfile}
              className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-200/80 transition-colors shrink-0"
              title="لوحة إنجازات الطالب"
            >
              <div className="flex items-center gap-1 text-amber-600 font-bold text-xs whitespace-nowrap">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{studentState.streakDays}د</span>
              </div>
              <div className="w-px h-3.5 bg-slate-300 dark:bg-slate-600" />
              <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold text-xs whitespace-nowrap">
                <Sparkles className="w-3 h-3" />
                <span>{studentState.xp} XP</span>
              </div>
            </div>

            {/* Cloud User / Sign In Button */}
            {user ? (
              <button
                id="cloud-user-btn"
                onClick={onOpenProfile}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
                title={`حساب متزامن سحابياً: ${user.phoneNumber || user.email || user.displayName}`}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="max-w-[90px] sm:max-w-[120px] truncate">{user.displayName || studentState.name || 'حسابي'}</span>
              </button>
            ) : (
              <button
                id="auth-login-btn"
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
                title="تسجيل الدخول أو إنشاء حساب لحفظ درجاتك سحابياً"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">تسجيل الدخول</span>
              </button>
            )}

            {/* Profile Avatar Button */}
            <button
              id="student-profile-btn"
              onClick={onOpenProfile}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 transition-colors shrink-0 cursor-pointer"
              title="الملف الشخصي والإنجازات"
            >
              <Trophy className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Dedicated Navigation Bar for screens under 2xl */}
        <div className="flex 2xl:hidden items-center overflow-x-auto py-2 border-t border-slate-100 dark:border-slate-800 no-scrollbar gap-1.5 text-xs scroll-smooth">
          {navItems.map((item) => {
            const active = isItemActive(item);
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? item.highlight
                      ? 'bg-amber-400 text-slate-950 shadow-xs font-black'
                      : 'bg-indigo-600 text-white shadow-xs font-black'
                    : item.highlight
                      ? 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300'
                      : 'text-slate-600 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/90'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
