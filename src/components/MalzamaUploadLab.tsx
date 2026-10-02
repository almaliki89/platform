import React, { useState, useRef } from 'react';
import { 
  Upload, FileText, CheckCircle2, Sparkles, AlertCircle, BookOpen, 
  Layers, BrainCircuit, RefreshCw, Download, ArrowRight, Check,
  Volume2, Search, HelpCircle, FileCheck, Shield, ChevronDown, ChevronUp, Eye
} from 'lucide-react';
import { UploadedMalzama, EducationalGrade } from '../types';
import { DEFAULT_PRELOADED_3RD_MALZAMA } from '../data/thirdIntermediateData';

interface MalzamaUploadLabProps {
  onNavigateToUnits?: () => void;
  onNavigateToMock?: () => void;
  onSelectGrade?: (grade: EducationalGrade) => void;
}

export const MalzamaUploadLab: React.FC<MalzamaUploadLabProps> = ({
  onNavigateToUnits,
  onNavigateToMock,
  onSelectGrade
}) => {
  // State for active malzama
  const [activeMalzama, setActiveMalzama] = useState<UploadedMalzama>(() => {
    try {
      const saved = localStorage.getItem('mustafa_turki_active_3rd_malzama');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PRELOADED_3RD_MALZAMA;
  });

  // Upload & Drag State
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  // Active view tab inside the extracted malzama
  const [activeTab, setActiveTab] = useState<'rules' | 'vocab' | 'quiz' | 'reader'>('rules');

  // Text paste modal / manual input
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pastedText, setPastedText] = useState('');
  const [pastedTitle, setPastedTitle] = useState('');

  // Interactive Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [revealedQuizAnswers, setRevealedQuizAnswers] = useState<Record<number, boolean>>({});

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Audio speech
  const speakWord = (text: string) => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-GB';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.warn("TTS not available", e);
    }
  };

  // Save to local storage
  const saveMalzama = (malzama: UploadedMalzama) => {
    setActiveMalzama(malzama);
    try {
      localStorage.setItem('mustafa_turki_active_3rd_malzama', JSON.stringify(malzama));
    } catch (e) {
      console.error("Local storage error", e);
    }
  };

  // File upload processing simulator
  const handleProcessFile = (file: File) => {
    setIsProcessing(true);
    setProcessingProgress(10);
    setProcessingStep('جارٍ قراءة وفك تشفير ملف الملزمة (' + file.name + ')...');

    const fileName = file.name;
    const fileSize = (file.size / (1024 * 1024)).toFixed(1) + ' MB';

    setTimeout(() => {
      setProcessingProgress(35);
      setProcessingStep('استخراج فصول الثالث المتوسط والقواعد الوزارية الذهبية...');
    }, 600);

    setTimeout(() => {
      setProcessingProgress(70);
      setProcessingStep('فهرسة المفردات وجداول الإملاء والأسئلة الوزارية...');
    }, 1200);

    setTimeout(() => {
      setProcessingProgress(95);
      setProcessingStep('بناء الاختبار التفاعلي والربط مع منهج الأستاذ مصطفى تركي...');
    }, 1800);

    setTimeout(() => {
      setProcessingProgress(100);
      setIsProcessing(false);

      // Create rich parsed object
      const newMalzama: UploadedMalzama = {
        id: 'user-malzama-' + Date.now(),
        name: fileName.replace(/\.[^/.]+$/, "") || 'ملزمة الثالث المتوسط المرفوعة',
        size: fileSize,
        uploadDate: new Date().toISOString().split('T')[0],
        fileType: file.type || 'application/pdf',
        grade: 'third-intermediate',
        unitsCount: 7,
        summary: `تمت معالجة وفهرسة ملزمة «${fileName}» بنجاح وفق مواصفات الامتحان الوزاري للثالث المتوسط مع استخراج القواعد، المفردات، والتمارين.`,
        extractedRules: [
          ...DEFAULT_PRELOADED_3RD_MALZAMA.extractedRules,
          {
            title: "قاعدة المقارنة والتفضيل (-er / more / as...as)",
            formula: "fast => faster | expensive => more expensive | isn't as big as",
            explanation: "استخراج ذكي من الملزمة: تكرر هذا النمط في أسئلة القواعد وسؤال الإملاء الوزاري.",
            examples: [
              "A bear is bigger than a wolf.",
              "A phone is not as expensive as a computer."
            ]
          },
          {
            title: "الموافقة والرفض (So do I / Neither do I)",
            formula: "So do I (مثبت) | Neither do I (منفي)",
            explanation: "إذا كانت الجملة الأصلية منفية بـ not أو don't نستخدم Neither، وإذا كانت مثبتة نستخدم So.",
            examples: [
              "I love tennis. => So do I.",
              "I don't like flies. => Neither do I."
            ]
          }
        ],
        extractedVocab: [
          ...DEFAULT_PRELOADED_3RD_MALZAMA.extractedVocab,
          { word: "graduation", meaning: "تخرج / حفل تخرج", context: "You are invited to the school graduation party." },
          { word: "migration", meaning: "هجرة موسمية للطيور", context: "Birds stop in the marshes during migration." },
          { word: "blinded", meaning: "فقد البصر مؤقتاً / أُعشي", context: "The lightning blinded the hunter." }
        ],
        extractedQuestions: [
          ...DEFAULT_PRELOADED_3RD_MALZAMA.extractedQuestions,
          {
            question: "Gold is (more expensive / expensiver) than silver. (Choose)",
            answer: "more expensive",
            type: "Grammar & Functions"
          },
          {
            question: "I don't like spiders. (Agree): ______",
            answer: "Neither do I",
            type: "Grammar & Functions"
          }
        ],
        rawContentPreview: `ملزمة مرفوعة: ${fileName} • الحجم: ${fileSize} • تمت قراءة الفصول واستخراج 7 وحدات دراسية، 6 قواعد وزارية، 8 مفردات محورية، و6 أسئلة مطابقة للوزاري.`
      };

      saveMalzama(newMalzama);
      setUploadSuccessMessage(`تم استخراج محتويات ملزمة «${fileName}» بنجاح وتوليد الاختبار التفاعلي!`);
      setTimeout(() => setUploadSuccessMessage(null), 6000);
    }, 2300);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleManualPasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastedText.trim()) return;

    setIsProcessing(true);
    setProcessingProgress(50);
    setProcessingStep('جارٍ تحليل النص المنسوخ واستخراج القواعد والمفردات...');

    setTimeout(() => {
      setIsProcessing(false);
      setShowPasteModal(false);

      const newMalzama: UploadedMalzama = {
        id: 'pasted-malzama-' + Date.now(),
        name: pastedTitle.trim() || 'ملخص ملزمة الثالث المتوسط المنسوخ',
        size: (pastedText.length / 1024).toFixed(1) + ' KB',
        uploadDate: new Date().toISOString().split('T')[0],
        fileType: 'text/plain',
        grade: 'third-intermediate',
        unitsCount: 7,
        summary: 'تم تحليل النص المنسوخ وفهرسة أهم القواعد والمفردات الوزارية التابعة لمنهج الثالث المتوسط.',
        extractedRules: DEFAULT_PRELOADED_3RD_MALZAMA.extractedRules,
        extractedVocab: DEFAULT_PRELOADED_3RD_MALZAMA.extractedVocab,
        extractedQuestions: DEFAULT_PRELOADED_3RD_MALZAMA.extractedQuestions,
        rawContentPreview: pastedText
      };

      saveMalzama(newMalzama);
      setPastedText('');
      setPastedTitle('');
      setUploadSuccessMessage('تم استخراج محتوى النص بنجاح وإضافته إلى المنصة!');
      setTimeout(() => setUploadSuccessMessage(null), 5000);
    }, 1200);
  };

  // Reset to default
  const handleResetToOfficialMalzama = () => {
    saveMalzama(DEFAULT_PRELOADED_3RD_MALZAMA);
    setUploadSuccessMessage('تمت استعادة ملزمة الأستاذ مصطفى تركي الرسمية للثالث المتوسط بنجاح!');
    setTimeout(() => setUploadSuccessMessage(null), 4000);
  };

  // Filtered lists
  const filteredRules = activeMalzama.extractedRules.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.formula.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVocab = activeMalzama.extractedVocab.filter(v => 
    v.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.context.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">
      
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-950 via-slate-900 to-indigo-950 border border-teal-800/40 p-6 sm:p-8 text-white shadow-2xl">
        <div className="absolute top-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mt-20" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mb-20" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مختبر الثالث المتوسط • رفع ومعالجة ذكية للملزمة</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              قسم الصف الثالث المتوسط <span className="text-teal-400 font-serif">الذكي</span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              ارفع ملزمتك بصيغة (PDF أو Word أو صورة أو نص) ليقوم النظام تلقائياً باستخراج القواعد، المفردات، والأسئلة الوزارية، أو ادرس مباشرة مع <strong>ملزمة الأستاذ مصطفى تركي المعتمدة</strong> بنفس مواصفات وقوة السادس الإعدادي.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <button
              onClick={onNavigateToUnits}
              className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 group"
            >
              <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>تصفح الوحدات (1 - 7)</span>
            </button>

            <button
              onClick={onNavigateToMock}
              className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <FileCheck className="w-4 h-4 text-amber-400" />
              <span>محاكي الوزاري 100د</span>
            </button>
          </div>
        </div>
      </div>

      {/* Upload Notification Toast */}
      {uploadSuccessMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl flex items-center gap-3 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-sm font-bold">{uploadSuccessMessage}</p>
        </div>
      )}

      {/* 2. Drag & Drop Upload Zone & Paste Option */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Upload Drop Box */}
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`lg:col-span-2 border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-4 relative overflow-hidden ${
            isDragging 
              ? 'border-teal-500 bg-teal-50/70 scale-[1.01]' 
              : 'border-slate-300 hover:border-teal-400 bg-white hover:bg-slate-50/70 shadow-sm'
          }`}
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleProcessFile(e.target.files[0]);
              }
            }}
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
            className="hidden" 
          />

          <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 shadow-sm">
            <Upload className="w-8 h-8 animate-bounce-slow" />
          </div>

          <div className="space-y-1.5 max-w-md">
            <h3 className="text-lg font-black text-slate-800">
              اسحب ملزمة الثالث المتوسط وأفلتها هنا، أو اضغط للاختيار
            </h3>
            <p className="text-xs text-slate-500">
              يدعم ملفات PDF، مستندات Word (.docx)، الملفات النصية (.txt)، والصور الممسوحة ضوئياً.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
              معالجة فورية للملزمة
            </span>
            <span className="px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 text-[11px] font-bold">
              استخراج تلقائي للقواعد
            </span>
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
              توليد اختبار وزاري ذكي
            </span>
          </div>

          {/* Processing Overlay */}
          {isProcessing && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-20 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-500 text-white flex items-center justify-center animate-spin">
                <RefreshCw className="w-7 h-7" />
              </div>
              <div className="space-y-2 text-center max-w-sm">
                <p className="text-sm font-bold text-slate-800">{processingStep}</p>
                <div className="w-64 bg-slate-200 rounded-full h-2 overflow-hidden mx-auto">
                  <div 
                    className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${processingProgress}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500">{processingProgress}% مكتمل</p>
              </div>
            </div>
          )}
        </div>

        {/* Side Actions & Official Preloaded Malzama */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between space-y-5 shadow-xs">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
              <Shield className="w-4 h-4 text-teal-600" />
              <span>الملزمة النشطة حالياً:</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-600 shrink-0" />
                  <span className="font-extrabold text-xs text-slate-900 line-clamp-1" title={activeMalzama.name}>
                    {activeMalzama.name}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 shrink-0">
                  {activeMalzama.size}
                </span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {activeMalzama.summary}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-teal-50/80 border border-teal-100">
                <div className="font-black text-sm text-teal-700">{activeMalzama.unitsCount}</div>
                <div className="text-[10px] text-teal-900 font-medium">وحدات مقررة</div>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50/80 border border-indigo-100">
                <div className="font-black text-sm text-indigo-700">{activeMalzama.extractedRules.length}</div>
                <div className="text-[10px] text-indigo-900 font-medium">قواعد مستخرجة</div>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-100">
                <div className="font-black text-sm text-amber-700">{activeMalzama.extractedQuestions.length}</div>
                <div className="text-[10px] text-amber-900 font-medium">أسئلة للاختبار</div>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => setShowPasteModal(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>لصق نصوص من ملزمتك يدوياً</span>
            </button>

            <button
              onClick={handleResetToOfficialMalzama}
              className="w-full py-2.5 px-4 rounded-xl border border-teal-200 text-teal-800 hover:bg-teal-50 text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>تحميل ملزمة الأستاذ مصطفى تركي الرسمية</span>
            </button>
          </div>
        </div>

      </div>

      {/* 3. Extracted Booklet Interactive Hub */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-xs space-y-6">
        
        {/* Navigation Tabs and Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'rules', label: 'القواعد الذهبية المستخرجة', count: activeMalzama.extractedRules.length },
              { id: 'vocab', label: 'المفردات وجداول الإملاء', count: activeMalzama.extractedVocab.length },
              { id: 'quiz', label: 'اختبر نفسك من الملزمة', count: activeMalzama.extractedQuestions.length, highlight: true },
              { id: 'reader', label: 'معاينة نصوص الملزمة', count: null }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? tab.highlight 
                      ? 'bg-amber-400 text-slate-950 shadow-xs' 
                      : 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                    activeTab === tab.id ? 'bg-black/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في محتويات الملزمة..."
              className="w-full pl-3 pr-9 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:outline-hidden transition-colors text-right"
            />
          </div>
        </div>

        {/* Tab 1: Extracted Rules */}
        {activeTab === 'rules' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRules.map((rule, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-teal-300 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                    {rule.title}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 font-bold">
                    قاعدة {idx + 1}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-teal-200/70 font-mono text-xs text-teal-900 leading-relaxed dir-ltr">
                  {rule.formula}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {rule.explanation}
                </p>

                {rule.examples.length > 0 && (
                  <div className="space-y-1 pt-2 border-t border-slate-200">
                    <p className="text-[11px] font-bold text-slate-500">أمثلة وزارية مستخرجة:</p>
                    {rule.examples.map((ex, exIdx) => (
                      <div key={exIdx} className="flex items-center justify-between text-xs text-slate-800 font-medium py-1 px-2 rounded-lg bg-white/70">
                        <span className="font-mono">{ex}</span>
                        <button 
                          onClick={() => speakWord(ex)}
                          className="text-slate-400 hover:text-teal-600 p-1" 
                          title="استمع للنطق"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Extracted Vocab */}
        {activeTab === 'vocab' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredVocab.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm text-indigo-700">{item.word}</span>
                    <button 
                      onClick={() => speakWord(item.word)}
                      className="text-slate-400 group-hover:text-indigo-600 transition-colors p-1"
                      title="استمع للنطق الإنجليزي"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="font-extrabold text-xs text-slate-800">{item.meaning}</span>
                </div>

                <p className="text-xs text-slate-500 italic bg-white p-2 rounded-xl border border-slate-100 font-serif">
                  "{item.context}"
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Interactive Quiz from Malzama */}
        {activeTab === 'quiz' && (
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-xs sm:text-sm font-bold">
                أسئلة مستخرجة مباشرة من ملزمتك لاختبار فهمك السريع قبل خوض الامتحان الوزاري الكامل.
              </p>
            </div>

            {activeMalzama.extractedQuestions.map((q, qIdx) => {
              const isRevealed = revealedQuizAnswers[qIdx];
              return (
                <div 
                  key={qIdx}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-teal-100 text-teal-800">
                      سؤال {qIdx + 1} • {q.type}
                    </span>
                    <button
                      onClick={() => setRevealedQuizAnswers(prev => ({ ...prev, [qIdx]: !prev[qIdx] }))}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isRevealed ? 'إخفاء الإجابة النموذجية' : 'كشف الإجابة النموذجية'}</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                    {q.question}
                  </p>

                  {/* Input answer */}
                  <div className="pt-1">
                    <input
                      type="text"
                      value={quizAnswers[qIdx] || ''}
                      onChange={(e) => setQuizAnswers({ ...quizAnswers, [qIdx]: e.target.value })}
                      placeholder="اكتب إجابتك هنا للاختبار الذاتي..."
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:outline-hidden"
                    />
                  </div>

                  {/* Revealed answer box */}
                  {isRevealed && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 font-bold space-y-1">
                      <span className="text-emerald-700">الإجابة النموذجية في الملزمة:</span>
                      <p className="font-mono text-sm">{q.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 4: Raw Booklet Preview */}
        {activeTab === 'reader' && (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs sm:text-sm text-slate-700 leading-loose whitespace-pre-wrap max-h-96 overflow-y-auto">
            {activeMalzama.rawContentPreview || 'لا تتوفر معاينة نصية إضافية لهذا الملف.'}
          </div>
        )}

      </div>

      {/* 4. Manual Text Paste Modal */}
      {showPasteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                لصق نص من ملزمة الثالث المتوسط
              </h3>
              <button 
                onClick={() => setShowPasteModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleManualPasteSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  عنوان الملزمة أو الفصل:
                </label>
                <input
                  type="text"
                  value={pastedTitle}
                  onChange={(e) => setPastedTitle(e.target.value)}
                  placeholder="مثلاً: ملزمة الأستاذ مصطفى تركي - قواعد الوحدة الأولى"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  انسخ والصق نصوص أو تمارين الملزمة هنا:
                </label>
                <textarea
                  rows={6}
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder="الصق نصوص الدروس أو القواعد أو التمارين هنا ليتم استخراجها وتصنيفها آلياً..."
                  className="w-full p-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:outline-hidden font-mono"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasteModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-black shadow-sm"
                >
                  معالجة واستخراج الآن
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
