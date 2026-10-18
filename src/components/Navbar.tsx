import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  GraduationCap, 
  ChevronDown,
  Check,
  Type,
  Menu,
  X,
  User as UserIcon,
  Sparkles
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

const ARABIC_FONTS = [
  { id: 'plex', nameAr: 'خط بلكس الأكاديمي', shortName: 'بلكس' },
  { id: 'readex', nameAr: 'خط ريدكس العصري', shortName: 'ريدكس' },
  { id: 'cairo', nameAr: 'خط القاهرة الوزاري', shortName: 'القاهرة' },
  { id: 'tajawal', nameAr: 'خط تجوال الأنيق', shortName: 'تجوال' },
];

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

  const [isFontMenuOpen, setIsFontMenuOpen] = useState(false);
  const fontMenuRef = useRef<HTMLDivElement>(null);

  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [activeFont, setActiveFont] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mustafa_turki_font') || 'plex';
    }
    return 'plex';
  });

  const handleSelectFont = (fontId: string) => {
    setActiveFont(fontId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mustafa_turki_font', fontId);
      document.documentElement.setAttribute('data-font', fontId);
    }
    setIsFontMenuOpen(false);
  };

  const currentGradeMeta = getGradeMeta(selectedGrade);
  const isMinisterial = currentGradeMeta.isMinisterial;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (gradeMenuRef.current && !gradeMenuRef.current.contains(target)) {
        setIsGradeMenuOpen(false);
      }
      if (fontMenuRef.current && !fontMenuRef.current.contains(target)) {
        setIsFontMenuOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(target)) {
        setIsMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const litLabel = (selectedGrade === 'first-intermediate' || selectedGrade === 'second-intermediate')
    ? 'قصص المطالعة'
    : selectedGrade === 'third-intermediate'
    ? 'قصص الثالث'
    : 'الأدب والنصوص';

  const primaryNavItems = [
    { id: 'home', path: APP_ROUTES.home, label: 'الرئيسية' },
    { id: 'subjects', path: APP_ROUTES.subjects, label: 'الوحدات والدروس' },
    { id: 'mock', path: APP_ROUTES.mock, label: isMinisterial ? 'محاكي الوزاري' : 'محاكي الامتحان' },
    { id: 'literature', path: APP_ROUTES.literature, label: litLabel },
    { id: 'review', path: APP_ROUTES.review, label: 'المراجعة المركزة' },
  ];

  const secondaryNavItems = [
    { id: 'exam', path: APP_ROUTES.exam, label: isMinisterial ? 'بنك الوزاريات' : 'بنك الأسئلة' },
    { id: 'essays', path: APP_ROUTES.essays, label: 'الإنشاءات النموذجية' },
    { id: 'vocab', path: APP_ROUTES.vocab, label: 'المفردات المصورة' },
    ...(selectedGrade === 'sixth-preparatory' || selectedGrade === 'fifth-preparatory' || selectedGrade === 'fourth-preparatory'
      ? [{ id: 'verbs', path: APP_ROUTES.verbs, label: 'الأفعال الشاذة' }]
      : []),
  ];

  const isPathActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="omega-navbar sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: Zone 1 (Brand) - Zone 2 (Nav) - Zone 3 (Actions) */}
        <div className="flex items-center justify-between gap-6 h-16">
          
          {/* Zone 1: Brand Wordmark */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 text-slate-900 dark:text-white shrink-0 group select-none"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-xs group-hover:bg-indigo-700 transition-colors">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-base tracking-tight whitespace-nowrap">
                النموذجية
              </span>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline" aria-hidden="true">·</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-normal hidden sm:inline whitespace-nowrap">
                المنهج العراقي
              </span>
            </div>
          </Link>

          {/* Zone 2: Primary Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {primaryNavItems.map((item) => {
              const active = isPathActive(item.path);
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-xs font-semibold ${
                    active
                      ? 'text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400'
                      : 'text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* More dropdown */}
            <div className="relative shrink-0" ref={moreMenuRef}>
              <button
                type="button"
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className="flex items-center gap-1 py-1 border-b-2 border-transparent text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <span>المزيد</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMoreMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-1.5 z-50">
                  {secondaryNavItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        navigate(item.path);
                        setIsMoreMenuOpen(false);
                      }}
                      className="w-full text-right px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Actions (Grade Selector + Font + Profile) */}
          <div className="flex items-center gap-2.5 shrink-0">
            
            {/* Grade Switcher */}
            <div className="relative shrink-0" ref={gradeMenuRef}>
              <button
                type="button"
                onClick={() => setIsGradeMenuOpen(!isGradeMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/70 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-slate-200/60 dark:border-slate-700"
                title="تغيير الصف الدراسي"
              >
                <span className="font-bold">{currentGradeMeta.shortName}</span>
                <span className="text-slate-400 dark:text-slate-500 text-[11px] hidden sm:inline">
                  ({currentGradeMeta.typicalAge} سنة)
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isGradeMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isGradeMenuOpen && (
                <div className="absolute left-0 sm:right-0 sm:left-auto top-full mt-2 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-1.5 z-50">
                  <div className="px-2.5 py-1.5 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      اختر الصف الدراسي:
                    </p>
                  </div>
                  <div className="space-y-0.5 max-h-72 overflow-y-auto">
                    {ORDERED_GRADES.map((g) => {
                      const meta = ALL_GRADES_META[g];
                      const isSelected = selectedGrade === g;
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() => {
                            if (location.pathname.startsWith('/grade/')) {
                              navigate(`/grade/${g}`);
                            } else {
                              onSelectGrade(g);
                              if (location.pathname.startsWith('/lesson/')) {
                                navigate(`/grade/${g}`);
                              }
                            }
                            setIsGradeMenuOpen(false);
                          }}
                          className={`w-full text-right px-2.5 py-2 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span>{meta.nameAr}</span>
                              {meta.isMinisterial && (
                                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                                  وزاري
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400">
                              {meta.ageRangeAr}
                            </span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Font Switcher */}
            <div className="relative shrink-0" ref={fontMenuRef}>
              <button
                type="button"
                onClick={() => setIsFontMenuOpen(!isFontMenuOpen)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                title="تغيير الخط"
              >
                <Type className="w-4 h-4" />
              </button>

              {isFontMenuOpen && (
                <div className="absolute left-0 top-full mt-2 w-44 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-1.5 z-50">
                  <div className="px-2 py-1 text-[11px] font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-1">
                    الخط العربي
                  </div>
                  {ARABIC_FONTS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => handleSelectFont(f.id)}
                      className={`w-full text-right px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                        activeFont === f.id
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{f.nameAr}</span>
                      {activeFont === f.id && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile Action */}
            {user ? (
              <button
                type="button"
                onClick={onOpenProfile}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="الملف الشخصي"
              >
                <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 text-[11px] font-bold">
                  {(user.displayName || studentState.name || 'ط')[0]}
                </div>
                <span className="hidden sm:inline max-w-[90px] truncate">
                  {user.displayName || studentState.name || 'حسابي'}
                </span>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold">
                  {studentState.xp} XP
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenAuth}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                دخول
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="القائمة"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>

        </div>

        {/* Mobile Nav Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 py-3 space-y-1">
            {primaryNavItems.map((item) => {
              const active = isPathActive(item.path);
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    active
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
              <p className="px-3 py-1 text-[11px] font-bold text-slate-400">أقسام إضافية</p>
              {secondaryNavItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
