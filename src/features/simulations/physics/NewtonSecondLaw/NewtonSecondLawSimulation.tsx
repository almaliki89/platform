import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Zap, Sliders, Info, ArrowLeft } from 'lucide-react';

export const NewtonSecondLawSimulation: React.FC = () => {
  const [mass, setMass] = useState<number>(5); // kg
  const [force, setForce] = useState<number>(25); // N
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [cartPosition, setCartPosition] = useState<number>(0); // percentage 0 to 80

  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Calculated acceleration: a = F / m
  const acceleration = Number((force / mass).toFixed(2));

  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaTime = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      setCartPosition((prev) => {
        // position moves based on acceleration
        const next = prev + acceleration * deltaTime * 3;
        if (next > 85) {
          return 5; // loop back to start
        }
        return next;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      lastTimeRef.current = null;
    };
  }, [isPlaying, acceleration]);

  const handleReset = () => {
    setIsPlaying(false);
    setCartPosition(0);
    setMass(5);
    setForce(25);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold text-sm mb-1">
            <Zap className="w-4 h-4" />
            <span>محاكاة فيزيائية تفاعلية • الفيزياء للثالث المتوسط</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">قانون نيوتن الثاني (F = ma)</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            استكشف العلاقة الطردية بين القوة والتعجيل، والعلاقة العكسية بين الكتلة والتعجيل.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-white transition-all shadow-md ${
              isPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-cyan-600 hover:bg-cyan-700'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'إيقاف مؤقت' : 'بدء الحركة'}</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>إعادة ضبط</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls Panel */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-6">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
            <Sliders className="w-5 h-5 text-cyan-500" />
            <span>لوحة التحكم والمتغيرات</span>
          </div>

          {/* Mass Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-700 dark:text-slate-300 font-medium">الكتلة (m)</span>
              <span className="bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-bold px-2.5 py-0.5 rounded-lg text-xs">
                {mass} كغم
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={mass}
              onChange={(e) => setMass(Number(e.target.value))}
              className="w-full accent-cyan-600 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>1 كغم</span>
              <span>25 كغم</span>
              <span>50 كغم</span>
            </div>
          </div>

          {/* Force Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-700 dark:text-slate-300 font-medium">القوة المؤثرة (F)</span>
              <span className="bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold px-2.5 py-0.5 rounded-lg text-xs">
                {force} نيوتن
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="200"
              step="5"
              value={force}
              onChange={(e) => setForce(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>5 N</span>
              <span>100 N</span>
              <span>200 N</span>
            </div>
          </div>

          {/* Equation Box */}
          <div className="bg-cyan-950/10 dark:bg-cyan-900/20 p-4 rounded-xl border border-cyan-200 dark:border-cyan-800/50 text-center space-y-1">
            <div className="text-xs text-cyan-700 dark:text-cyan-400 font-medium">معادلة نيوتن الثانية</div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white font-mono dir-ltr">
              a = F / m
            </div>
            <div className="text-lg font-bold text-cyan-600 dark:text-cyan-400 font-mono">
              {force} / {mass} = {acceleration} م/ثا²
            </div>
          </div>
        </div>

        {/* Visual Simulation Stage */}
        <div className="lg:col-span-2 flex flex-col justify-between bg-slate-950 rounded-2xl p-6 relative overflow-hidden min-h-[320px]">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30"></div>

          {/* Top HUD */}
          <div className="relative z-10 flex justify-between items-center bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-800 text-white text-sm">
            <div className="flex items-center gap-3">
              <span className="text-slate-400">التعجيل (a):</span>
              <span className="font-mono font-bold text-cyan-400 text-base">{acceleration} m/s²</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400">الحالة:</span>
              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${isPlaying ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                {isPlaying ? 'قيد الحركة' : 'متوقف'}
              </span>
            </div>
          </div>

          {/* Simulation Track & Object */}
          <div className="relative z-10 my-auto py-12">
            {/* Force Vector Arrow */}
            <div
              className="absolute transition-all duration-75 flex items-center"
              style={{ left: `${cartPosition + 12}%`, bottom: '85px' }}
            >
              <div className="text-xs font-bold text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800 mb-1">
                {force} N
              </div>
              <div className="h-1 bg-amber-400 w-16 relative">
                <div className="absolute right-0 -top-1.5 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-amber-400"></div>
              </div>
            </div>

            {/* Cart Object */}
            <div
              className="absolute transition-all duration-75 flex flex-col items-center"
              style={{ left: `${cartPosition}%`, bottom: '20px' }}
            >
              <div className="bg-gradient-to-t from-cyan-600 to-blue-500 text-white font-bold text-sm px-4 py-3 rounded-xl shadow-2xl border border-cyan-400/40 flex flex-col items-center min-w-[90px]">
                <span>{mass} كغم</span>
                <span className="text-[10px] text-cyan-200 font-normal">كتلة الجسم</span>
              </div>
              {/* Wheels */}
              <div className="flex gap-8 -mt-2">
                <div className="w-5 h-5 rounded-full bg-slate-700 border-2 border-slate-400 animate-spin"></div>
                <div className="w-5 h-5 rounded-full bg-slate-700 border-2 border-slate-400 animate-spin"></div>
              </div>
            </div>

            {/* Ground Track Line */}
            <div className="w-full h-2 bg-slate-800 rounded-full border-t border-slate-700 mt-16"></div>
          </div>

          {/* Bottom Info Footer */}
          <div className="relative z-10 flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>لاحظ: كلما زادت القوة (Force) زاد التعجيل، وكلما زادت الكتلة (Mass) قل التعجيل بثبوت القوة.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
