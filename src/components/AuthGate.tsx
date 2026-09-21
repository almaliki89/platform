import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Phone, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  BookOpen, 
  Trophy, 
  Award, 
  ArrowRight,
  Flame
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { EducationalGrade } from '../types';

interface AuthGateProps {
  onSuccessfulAuth?: (name: string, grade: EducationalGrade) => void;
}

export const AuthGate: React.FC<AuthGateProps> = ({ onSuccessfulAuth }) => {
  const { 
    signInWithGoogle, 
    signInWithEmail, 
    signUpWithEmail, 
    signUpWithPhone, 
    signInWithPhone 
  } = useAuth();

  // Mode: Register vs Login
  const [mode, setMode] = useState<'register' | 'login'>('register');
  
  // Auth Method: Phone vs Email
  const [method, setMethod] = useState<'phone' | 'email'>('phone');

  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<EducationalGrade>('sixth-preparatory');

  // State
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'register') {
        if (!name.trim()) {
          throw new Error('يرجى كتابة اسم الطالب الكامل (الثلاثي)');
        }
        if (password.length < 6) {
          throw new Error('كلمة المرور يجب أن لا تقل عن 6 أحرف أو أرقام لضمان أمان حسابك');
        }

        if (method === 'phone') {
          const cleanedPhone = phone.trim().replace(/[^0-9]/g, '');
          if (cleanedPhone.length < 10) {
            throw new Error('يرجى إدخال رقم هاتف عراقي صالح (مثال: 07701234567)');
          }
          await signUpWithPhone(name.trim(), cleanedPhone, password, selectedGrade);
        } else {
          if (!email.trim().includes('@')) {
            throw new Error('يرجى إدخال بريد إلكتروني صحيح');
          }
          await signUpWithEmail(name.trim(), email.trim(), password, selectedGrade);
        }

        if (onSuccessfulAuth) onSuccessfulAuth(name.trim(), selectedGrade);
      } else {
        // Login mode
        if (method === 'phone') {
          const cleanedPhone = phone.trim().replace(/[^0-9]/g, '');
          if (cleanedPhone.length < 10) {
            throw new Error('يرجى إدخال رقم هاتفك المسجل به سابقاً');
          }
          await signInWithPhone(cleanedPhone, password);
        } else {
          if (!email.trim()) {
            throw new Error('يرجى إدخال بريدك الإلكتروني المسجل');
          }
          await signInWithEmail(email.trim(), password);
        }

        if (onSuccessfulAuth) onSuccessfulAuth('', selectedGrade);
      }
    } catch (err: any) {
      let message = 'حدث خطأ أثناء المحاولة، يرجى التأكد من البيانات';
      if (err.code === 'auth/email-already-in-use' || err.message?.includes('already-in-use')) {
        message = method === 'phone' 
          ? 'رقم الهاتف هذا مسجل مسبقاً! يمكنك الضغط على "تسجيل الدخول" في الأعلى' 
          : 'هذا البريد مسجل مسبقاً! يمكنك الضغط على "تسجيل الدخول" في الأعلى';
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        message = 'رقم الهاتف/البريد أو كلمة المرور غير صحيحة، يرجى التأكد';
      } else if (err.code === 'auth/invalid-email') {
        message = 'صيغة البيانات المدخلة غير صحيحة';
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      if (onSuccessfulAuth) onSuccessfulAuth('', selectedGrade);
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('تعذر تسجيل الدخول بحساب Google، يرجى المحاولة أو استخدام رقم الهاتف');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8" dir="rtl">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 my-auto">
        
        {/* Left / Top Hero Info Column */}
        <div className="lg:col-span-6 text-white space-y-6 text-center lg:text-right">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-indigo-200 text-xs font-bold backdrop-blur-md">
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span>بوابة التسجيل الرسمية • العام الدراسي 2027</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              المنصة النموذجية في <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">اللغة الإنكليزية</span>
            </h1>
            <p className="text-base sm:text-lg text-indigo-100/90 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              إشراف وإعداد <span className="text-amber-300 font-bold">الأستاذ مصطفى تركي</span>. المنظومة الذكية الشاملة لضمان الدرجة الكاملة 100/100 وزارياً.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="text-right">
                <h4 className="text-xs font-black text-white">محاكي الوزاري 100د</h4>
                <p className="text-[11px] text-indigo-200">تصحيح ذكي فوري</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-400/20 text-indigo-300 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="text-right">
                <h4 className="text-xs font-black text-white">السادس والثالث</h4>
                <p className="text-[11px] text-indigo-200">المنهج الكامل 2027</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-900/40 border border-indigo-500/20 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs text-indigo-200 font-medium leading-relaxed text-right">
              يتطلب الدخول إكمال التسجيل برقم هاتفك أو بريدك الإلكتروني لحفظ تقدمك الدراسي ودرجاتك الوزارية في سحابة Google Cloud الدائمة.
            </p>
          </div>

        </div>

        {/* Right / Registration & Login Card */}
        <div className="lg:col-span-6 w-full">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-slate-900 relative">
            
            {/* Mode Switch Tabs (حساب جديد / تسجيل الدخول) */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => { setMode('register'); setError(null); }}
                className={`py-2.5 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer ${
                  mode === 'register' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                إنشاء حساب طالب جديد
              </button>
              <button
                type="button"
                onClick={() => { setMode('login'); setError(null); }}
                className={`py-2.5 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer ${
                  mode === 'login' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                تسجيل الدخول
              </button>
            </div>

            {/* Quick Google Login */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading || loading}
              className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 font-bold text-slate-700 text-xs sm:text-sm flex items-center justify-center gap-3 transition-colors mb-5 disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {googleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>الدخول المباشر بحساب Google</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-xs text-slate-400 font-bold">أو اختر وسيلة التسجيل المفضلة:</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            {/* Choose Phone vs Email Pill Switch */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                type="button"
                onClick={() => { setMethod('phone'); setError(null); }}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  method === 'phone'
                    ? 'bg-indigo-50 border-indigo-400 text-indigo-800 font-black shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Phone className="w-4 h-4 text-indigo-600" />
                <span>برقم الهاتف (موصى به)</span>
              </button>

              <button
                type="button"
                onClick={() => { setMethod('email'); setError(null); }}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  method === 'email'
                    ? 'bg-indigo-50 border-indigo-400 text-indigo-800 font-black shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Mail className="w-4 h-4 text-indigo-600" />
                <span>بالبريد الإلكتروني</span>
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2 text-red-700 text-xs font-semibold"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* If Register: Student Name */}
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">اسم الطالب الثلاثي</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="مثال: علي حيدر جاسم"
                      required
                      className="w-full pr-10 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              )}

              {/* If Register: Grade Selector */}
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المرحلة الدراسية</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedGrade('sixth-preparatory')}
                      className={`p-2.5 rounded-xl border text-xs font-black text-center transition-all cursor-pointer ${
                        selectedGrade === 'sixth-preparatory'
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      السادس الإعدادي
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedGrade('third-intermediate')}
                      className={`p-2.5 rounded-xl border text-xs font-black text-center transition-all cursor-pointer ${
                        selectedGrade === 'third-intermediate'
                          ? 'bg-teal-600 border-teal-600 text-white shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      الثالث المتوسط
                    </button>
                  </div>
                </div>
              )}

              {/* Phone or Email Input */}
              {method === 'phone' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">رقم الهاتف (زين / آسيا / كورك)</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="07701234567"
                      required
                      className="w-full pr-10 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-left"
                      dir="ltr"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">يُستخدم كرقم تعريف لدخول حسابك في أي وقت</p>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">البريد الإلكتروني</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      required
                      className="w-full pr-10 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-left"
                      dir="ltr"
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {mode === 'register' ? 'كلمة المرور / الرمز السري' : 'كلمة المرور'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pr-10 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-left"
                    dir="ltr"
                  />
                </div>
                {mode === 'register' && (
                  <p className="text-[10px] text-slate-400 mt-1">6 خانات على الأقل (أحرف أو أرقام)</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-black text-sm rounded-xl shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 transition-all mt-4 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>
                      {mode === 'register' 
                        ? 'إكمال التسجيل والدخول إلى المنصة' 
                        : 'تسجيل الدخول ومتابعة دراستي'}
                    </span>
                  </>
                )}
              </button>

            </form>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-400">
                منصة النموذجية للغة الإنكليزية • خوادم سحابية مؤمنة 100%
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
