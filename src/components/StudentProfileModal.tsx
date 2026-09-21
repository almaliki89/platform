import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Zap, 
  BookOpen, 
  RotateCcw,
  Cloud,
  CloudCheck,
  UserCheck,
  LogOut,
  LogIn
} from 'lucide-react';
import { StudentState } from '../types';
import { INITIAL_BADGES } from '../utils/storage';
import { useAuth } from '../context/AuthContext';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentState: StudentState;
  onUpdateName: (newName: string) => void;
  onResetProgress: () => void;
  onOpenAuth: () => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  studentState,
  onUpdateName,
  onResetProgress,
  onOpenAuth
}) => {
  const { user, logout, syncStatus } = useAuth();
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(studentState.name);

  if (!isOpen) return null;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onUpdateName(nameInput.trim());
      setEditingName(false);
    }
  };

  const accuracy = studentState.totalQuestionsAttempted > 0
    ? Math.round((studentState.totalQuestionsCorrect / studentState.totalQuestionsAttempted) * 100)
    : 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="student-profile-modal"
        className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 border border-white/20">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black">الملف الشخصي وإنجازات الطالب</h2>
              <p className="text-xs text-indigo-200">منظومة المتابعة الرقمية • الأستاذ مصطفى تركي 2027</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Cloud Account Status Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                user ? 'bg-indigo-600 text-white shadow-xs' : 'bg-amber-100 text-amber-800'
              }`}>
                {user ? <UserCheck className="w-5 h-5" /> : <Cloud className="w-5 h-5" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-900">
                    {user ? `حساب سحابي مفعل: ${user.phoneNumber || user.email || user.displayName}` : 'حساب محلي (ضيف)'}
                  </span>
                  {user && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      ✓ سحابي متزامن
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  {user 
                    ? 'تقدمك ودرجاتك الوزارية محفوظة بأمان في خوادم Google Cloud السحابية.' 
                    : 'سجل حسابك الآن لتحفظ درجاتك ونقاطك وتفتحها من أي موبايل أو لابتوب.'}
                </p>
              </div>
            </div>

            {user ? (
              <button
                onClick={async () => {
                  await logout();
                }}
                className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>تسجيل الخروج</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onOpenAuth();
                }}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-xs transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>تسجيل الدخول / إنشاء حساب</span>
              </button>
            )}
          </div>

          {/* Name & Title Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-500 font-bold mb-1">اسم الطالب المسجل بالمنصة:</p>
              {editingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-indigo-400 text-sm font-bold focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold cursor-pointer"
                  >
                    حفظ
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-slate-900">{studentState.name}</h3>
                  <button
                    onClick={() => setEditingName(true)}
                    className="text-xs text-indigo-600 hover:underline font-semibold cursor-pointer"
                  >
                    (تعديل)
                  </button>
                </div>
              )}
              <span className="inline-block mt-2 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                مرشح لدرجة 100/100 في الامتحان الوزاري 🌟
              </span>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="text-center px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-xs">
                <p className="text-xs text-slate-400 font-medium">نقاط الخبرة</p>
                <p className="text-xl font-black text-indigo-600">{studentState.xp} XP</p>
              </div>
              <div className="text-center px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-xs">
                <p className="text-xs text-slate-400 font-medium">التتابع</p>
                <p className="text-xl font-black text-amber-600">{studentState.streakDays} أيام</p>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100">
              <p className="text-xs text-slate-500 font-medium">الدروس المكتملة</p>
              <p className="text-2xl font-black text-indigo-900 mt-1">{studentState.completedLessonIds.length}</p>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
              <p className="text-xs text-slate-500 font-medium">الدقة الوزارية</p>
              <p className="text-2xl font-black text-emerald-700 mt-1">{accuracy}%</p>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100">
              <p className="text-xs text-slate-500 font-medium">إجمالي التمارين</p>
              <p className="text-2xl font-black text-amber-800 mt-1">{studentState.totalQuestionsAttempted}</p>
            </div>
          </div>

          {/* Badges Collection */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              <span>أوسمة الشرف والتفوق الدراسي</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INITIAL_BADGES.map((badge) => {
                const isUnlocked = badge.id === 'first-step' 
                  ? studentState.completedLessonIds.length >= 1 
                  : badge.id === 'grammar-master' 
                  ? studentState.completedLessonIds.length >= 5
                  : badge.id === 'quiz-ace'
                  ? studentState.totalQuestionsCorrect >= 10
                  : badge.id === 'verbs-champion'
                  ? studentState.totalQuestionsCorrect >= 20
                  : true;

                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                      isUnlocked
                        ? 'bg-amber-50/50 border-amber-300'
                        : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                      isUnlocked ? 'bg-amber-500 text-white shadow-xs' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {isUnlocked ? '✓' : '🔒'}
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                        {badge.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reset Progress Warning Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>{user ? 'البيانات متزامنة سحابياً مع حسابك' : 'البيانات محفوظة محلياً في متصفحك'}</span>
            <button
              onClick={() => {
                if (window.confirm('هل أنت متأكد من تصفير تقدمك بالكامل؟')) {
                  onResetProgress();
                }
              }}
              className="text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>تصفير التقدم الدراسي</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
