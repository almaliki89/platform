import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, Volume2, RotateCw, CheckCircle2, 
  MapPin, User, ShieldAlert, Award, FileText, Check, X, HelpCircle,
  Clock, Milestone, Compass
} from 'lucide-react';
import { Lesson } from '../../types';
import { speakEnglish } from '../../utils/speech';

interface ReadingDossierProps {
  lesson: Lesson;
}

interface TimelineEvent {
  timeOrPhase: string;
  phaseAr: string;
  descEn: string;
  descAr: string;
  ministerialKey: string;
}

export const ReadingDossier: React.FC<ReadingDossierProps> = ({ lesson }) => {
  const [activeTab, setActiveTab] = useState<'dossier' | 'timeline' | 'flashcards' | 'drill'>('dossier');
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [selectedTfAnswers, setSelectedTfAnswers] = useState<Record<number, boolean>>({});

  const handleSpeak = (id: string, text: string) => {
    setSpeakingId(id);
    speakEnglish(text, () => setSpeakingId(null));
  };

  const toggleFlip = (cardId: string) => {
    setFlippedCardId(prev => prev === cardId ? null : cardId);
  };

  // Extract Story Metadata based on lesson ID
  const getStoryMetadata = () => {
    const id = lesson.id;
    if (id.includes('u1-l3')) {
      return {
        protagonist: 'زيد طارق (Zaid Tariq - 20 years old)',
        location: 'شرم الشيخ، مصر (Sharm El Sheikh, Egypt)',
        crisis: 'هجوم القرش وعض ذراعه (Shark bit his arm)',
        savior: 'ستة دلافين صنعت دائرة + جميل العلاوي خفر السواحل',
        keyTheme: 'البقاء والنجدة السريعة والإسعاف الأولي',
        badgeColor: 'from-amber-600 to-yellow-600',
      };
    }
    if (id.includes('u1-l10')) {
      return {
        protagonist: 'الطفل مصطفى أحمد (Mustafa Ahmed - 4 years old)',
        location: 'المنزل - صباحاً (His family house)',
        crisis: 'فقدان والدته لطيفة للوعي بسبب انخفاض السكر (Insulin drop)',
        savior: 'اتصل بالطوارئ 999 بهدوء وفتح الباب للمسعفين',
        keyTheme: 'سرعة البديهة والذكاء والشجاعة للأطفال',
        badgeColor: 'from-rose-600 to-red-600',
      };
    }
    if (id.includes('u2-l8')) {
      return {
        protagonist: 'جهاز الرادار وكواشف السرعة (Radar & Speed Guns)',
        location: 'الحرب العالمية الثانية وحتى الطرق السريعة اليوم',
        crisis: 'رصد طائرات وسفن العدو ثم تنظيم سرعة الطرق وتقليل الحوادث',
        savior: 'الصيانة الدورية والفحص المستمر للأجهزة لمنع الأخطاء',
        keyTheme: 'التكنولوجيا الأمنية وحماية أرواح المسافرين',
        badgeColor: 'from-blue-600 to-cyan-600',
      };
    }
    if (id.includes('u3-l3')) {
      return {
        protagonist: 'المترجمة الفورية سميرة المحمود (Samira Al-Mahmoud)',
        location: 'قاعات المؤتمرات الدولية - منظمة اليونسكو',
        crisis: 'الضغط النفسي العالي والتفكير تحت وطأة الوقت',
        savior: 'سماع الأخبار يومياً وقراءة الصحف والاطلاع العام الدائم',
        keyTheme: 'الترجمة الفورية ليست كلمة بكلمة بل نقل الفكرة والمعنى',
        badgeColor: 'from-purple-600 to-indigo-600',
      };
    }
    if (id.includes('u5-l9')) {
      return {
        protagonist: 'الجميع - مدمنو العمل وضغوط الحياة (Workaholics)',
        location: 'الحياة المهنية اليومية والصحة النفسية والجسدية',
        crisis: 'الإجهاد المزمن والجلطات وأمراض ضغط الدم بسبب عدم أخذ عطلة',
        savior: 'أخذ إجازات منتظمة وترك الهاتف والعمل جانباً لقضاء وقت عائلي',
        keyTheme: 'العطلات ليست رفاهية بل ضرورة بيولوجية للبقاء والتركيز',
        badgeColor: 'from-teal-600 to-emerald-600',
      };
    }
    if (id.includes('u6-l3')) {
      return {
        protagonist: 'موظف البنك (The Bank Officer / Banker)',
        location: 'فروع المصارف ومكاتب خدمة العملاء والشركات',
        crisis: 'صعوبة رفض بعض القروض وتنوع التعامل اليومي مع الزبائن',
        savior: 'مهارات التواصل الممتازة والبراعة في الرياضيات والرسوم البيانية',
        keyTheme: 'تنوع العمل المصرفي ومساعدة المشاريع على التطور والنجاح',
        badgeColor: 'from-emerald-600 to-green-600',
      };
    }
    if (id.includes('u6-l9')) {
      return {
        protagonist: 'المستثمرون والمودعون (Savers & Investors)',
        location: 'حسابات التوفير، البورصة، وصناديق التقاعد والعقارات',
        crisis: 'مخاطر الأسهم والتضخم المالي والحاجة لضمان حياة كريمة عند الكبر',
        savior: 'الاستثمار العقاري الأكثر أماناً وحسابات التوفير طويلة الأجل',
        keyTheme: 'ادخار المال ثقافة ذكية تبدأ مبكراً لضمان المستقبل والتقاعد',
        badgeColor: 'from-amber-600 to-orange-600',
      };
    }
    if (id.includes('u7-l9')) {
      return {
        protagonist: 'الباحث عن وظيفة جديدة (Job Seeker at Library)',
        location: 'المكتبة المركزية في بغداد (Central Library of Baghdad)',
        crisis: 'الحاجة لتغيير المسار الوظيفي وتطوير مهارات اللغات والإنترنت',
        savior: 'كتب المهن، صحف إعلانات التوظيف، وحواسيب المكتبة المجانية',
        keyTheme: 'المكتبة كنز معرفي مجاني لتطوير المهارات والحصول على فرص عمل',
        badgeColor: 'from-pink-600 to-rose-600',
      };
    }
    if (id.includes('u8-l3')) {
      return {
        protagonist: 'طاقة الرياح وتوربينات الهواء (Wind Turbines)',
        location: 'المزارع البرية والمنصات البحرية المفتوحة',
        crisis: 'انبعاثات الغازات الدفيئة وتلوث الوقود الأحفوري التقليدي',
        savior: 'شفرات توربينات الرياح النظيفة التي تشغل القليل من الأراضي',
        keyTheme: 'طاقة خضراء متجددة لا تلوث الهواء ولا تنتج نفايات بيئية',
        badgeColor: 'from-teal-600 to-cyan-600',
      };
    }
    // Default fallback
    return {
      protagonist: 'قطعة الكتاب الوزارية المعتمدة',
      location: 'المنهج الرسمي للصف السادس الإعدادي 2027',
      crisis: 'الأسئلة الاستيعابية وتحليل تفاصيل القصة بالامتحان',
      savior: 'حفظ الكلمات المفتاحية وأسئلة القطعة بدقة 100%',
      keyTheme: 'الفهم العميق للنص الإنجليزي وتفادي الأخطاء الإملائية',
      badgeColor: 'from-indigo-600 to-purple-600',
    };
  };

  const meta = getStoryMetadata();

  // Story Chronological Timeline
  const getStoryTimeline = (): TimelineEvent[] => {
    const id = lesson.id;
    if (id.includes('u1-l3')) {
      return [
        {
          timeOrPhase: 'Phase 1',
          phaseAr: 'الهدوء الصباحي',
          descEn: 'Zaid Tariq was floating peacefully on an air bed 150m from shore.',
          descAr: 'كان زيد طارق يطفو بسلام على فراشه الهوائي على بعد 150 متراً من الشاطئ.',
          ministerialKey: '150 meters / air bed',
        },
        {
          timeOrPhase: 'Phase 2',
          phaseAr: 'لحظة الهجوم والخطر',
          descEn: 'A shark bumped into his bed, knocked him into the water, and bit his arm.',
          descAr: 'صدم القرش الفراش، وسقط زيد بالماء فعضه القرش في ذراعه وبدأ ينزف بغزارة.',
          ministerialKey: 'shark bit his arm / bleeding',
        },
        {
          timeOrPhase: 'Phase 3',
          phaseAr: 'الدروع الحية المنقذة',
          descEn: 'Six dolphins made a circle around him and frightened the shark away.',
          descAr: 'صنعت ستة دلافين حلقة حماية حوله وأخافت القرش فهرب بعيداً.',
          ministerialKey: 'six dolphins / made a circle',
        },
        {
          timeOrPhase: 'Phase 4',
          phaseAr: 'الإنقاذ والإسعاف',
          descEn: 'Coastguard Jameel Elalawi rescued him by boat; Ahmed Masri called an ambulance.',
          descAr: 'سمع خفر السواحل جميل العلاوي صراخه وأنقذه بالقارب، وأحمد المصري استدعى الإسعاف.',
          ministerialKey: 'Jameel Elalawi (boat) / Ahmed Masri (ambulance)',
        }
      ];
    }
    if (id.includes('u1-l10')) {
      return [
        {
          timeOrPhase: 'Phase 1',
          phaseAr: 'استيقاظ الصباح والحيرة',
          descEn: '4-year-old Mustafa woke up and went to look for his mother Latifa.',
          descAr: 'استيقظ مصطفى (4 سنوات) وذهب للبحث عن والدته لطيفة التي لم تأتِ لإيقاظه.',
          ministerialKey: 'Mustafa (4 years old) / mother Latifa',
        },
        {
          timeOrPhase: 'Phase 2',
          phaseAr: 'اكتشاف فقدان الوعي',
          descEn: 'He found her unconscious in her bedroom; her blood sugar had dropped severely.',
          descAr: 'وجدها فاقدة للوعي في غرفة نومها بسبب هبوط حاد في نسبة السكر في دمها.',
          ministerialKey: 'unconscious / diabetes (sugar dropped)',
        },
        {
          timeOrPhase: 'Phase 3',
          phaseAr: 'المحاولة الأولى واتصال الطوارئ',
          descEn: 'He tried to give her a sweet cola can, then called the emergency services (999).',
          descAr: 'حاول إعطاءها علبة كولا، ثم تذكر تدريب جدته واتصل برقم الطوارئ 999 بهدوء.',
          ministerialKey: 'can of cola / 999 emergency',
        },
        {
          timeOrPhase: 'Phase 4',
          phaseAr: 'فتح الباب والإنقاذ الطبي',
          descEn: 'He stood on a chair to open the front door for paramedics, who gave her an insulin injection.',
          descAr: 'وقف على كرسي ليفتح الباب للمسعفين الذين حقنوها بجرعة إنسولين فاستعادت وعيها.',
          ministerialKey: 'stood on a chair / insulin injection',
        }
      ];
    }
    // Default timeline
    return [
      {
        timeOrPhase: 'Phase 1',
        phaseAr: 'المقدمة والتمهيد',
        descEn: 'Introduction to the core topic and primary concepts.',
        descAr: 'التعريف بالشخصيات والمفاهيم الأساسية للقطعة الوزارية.',
        ministerialKey: 'Core Concept',
      },
      {
        timeOrPhase: 'Phase 2',
        phaseAr: 'العقدة والأحداث المحورية',
        descEn: 'The central incident or challenge described in the textbook.',
        descAr: 'الحدث الرئيسي والتحديات المذكورة في نص كتاب الطالب.',
        ministerialKey: 'Key Incident',
      },
      {
        timeOrPhase: 'Phase 3',
        phaseAr: 'النتيجة والعبرة الوزارية',
        descEn: 'The outcome and vital takeaways tested in Question 1 Branch B.',
        descAr: 'الخلاصة والإجابات المعتمدة في أسئلة الامتحان الوزاري.',
        ministerialKey: 'Exam Outcome',
      }
    ];
  };

  const timeline = getStoryTimeline();

  // Extract Flashcards from lesson exercises and examples
  const getFlashcards = () => {
    const cards: Array<{ id: string; q: string; a: string; note?: string }> = [];

    // From exercises
    lesson.exercises.forEach((ex, idx) => {
      cards.push({
        id: `card-ex-${idx}`,
        q: ex.question,
        a: `${ex.correctAnswer} — ${ex.explanation}`,
        note: ex.ministerialYear || 'سؤال وزاري متكرر',
      });
    });

    // From examples
    lesson.examples.forEach((item, idx) => {
      cards.push({
        id: `card-samp-${idx}`,
        q: item.en,
        a: item.ar,
        note: item.note || 'نموذج وزاري',
      });
    });

    return cards.slice(0, 6);
  };

  const flashcards = getFlashcards();

  // True/False Rapid Challenge
  const getTrueFalseStatements = () => {
    const id = lesson.id;
    if (id.includes('u1-l3')) {
      return [
        { q: 'Ammar decided to jump off the bridge because he did not want to feel embarrassed in front of his friends.', correct: true, reason: 'True: His friends were watching, so he did not want to give up.' },
        { q: 'An exoskeleton is a machine worn by Ammar that helped him stand up and walk again.', correct: true, reason: 'True: After nearly six months with the exoskeleton, he was walking again.' },
      ];
    }
    if (id.includes('u1-l7')) {
      return [
        { q: 'Dr Samir Ramzi states that 60% of British people are overweight and at risk of becoming diabetic.', correct: true, reason: 'True: 60% of British people are overweight due to bad diet with too much fat, sugar and salt.' },
        { q: 'Smokers generally need less medical attention than non-smokers.', correct: false, reason: 'False: Smokers need more medical attention because smoking damages the lungs and heart.' },
      ];
    }
    if (id.includes('u1-l9')) {
      return [
        { q: 'Najla Imad Lafta won the gold medal at the Paris 2024 Paralympics.', correct: true, reason: 'True: At 19 years old, she beat Tokyo champion Maryna Lytovchenko 3-1.' },
        { q: 'Najla was born left-handed and always played table tennis with her left hand.', correct: false, reason: 'False: She was born right-handed and had to train to use her left hand after losing her right arm.' },
      ];
    }
    if (id.includes('u2-l2')) {
      return [
        { q: 'Police officers direct traffic to make sure drivers can use roads easily without accidents.', correct: true, reason: 'True: Directing traffic and checking seat belts are key police duties.' },
        { q: 'Police officers have to recognize fingerprints at crime scenes themselves.', correct: false, reason: 'False: There are fingerprint experts who analyze and recognize the fingerprints.' },
      ];
    }
    if (id.includes('u2-l9')) {
      return [
        { q: 'Radar speed guns only work when a vehicle is moving towards them.', correct: false, reason: 'False: They work whether the vehicle is moving towards or away from them.' },
        { q: 'Police officers started using radar speed guns over 70 years ago.', correct: true, reason: 'True: Radar speed guns have been used by police for over 70 years.' },
      ];
    }
    if (id.includes('u3-l4')) {
      return [
        { q: 'Zaha Hadid was the first woman ever to win the prestigious Pritzker Prize in 2004.', correct: true, reason: 'True: She was the first woman ever to win the Pritzker Prize in 2004.' },
        { q: 'Zaha Hadid was born in London and studied only in Britain.', correct: false, reason: 'False: She was born in Baghdad and studied Mathematics at the American University of Beirut before London.' },
      ];
    }
    if (id.includes('u3-l9') || id.includes('u3-l10')) {
      return [
        { q: 'Samira Al Mahmoud translated the Arabic proverb "Akl il-inab habba habba" literally into English.', correct: false, reason: 'False: She translated it quickly as "One step at a time" to convey the true sense.' },
        { q: 'Conference interpreters often work in pairs in the booth to reduce stress and take turns.', correct: true, reason: 'True: One interprets while the colleague writes down figures and technical terms.' },
      ];
    }
    if (id.includes('u4-l1')) {
      return [
        { q: 'Rashid & Rana Designs produces shirts and jeans.', correct: true, reason: 'True: Rana is the designer and Rashid handles marketing.' },
        { q: 'Rashid and Rana signed contracts with three London department stores at Fashion Week.', correct: true, reason: 'True: Their designs attracted huge interest in London.' },
      ];
    }
    if (id.includes('u4-l2')) {
      return [
        { q: 'Modern workout mirrors can teach people how to exercise at home or in smart gyms.', correct: true, reason: 'True: Hi-tech workout mirrors provide guided interactive exercises.' },
        { q: 'AI systems in gyms build ideal workout plans and track client progress.', correct: true, reason: 'True: Personal trainers now use AI systems to analyze client data.' },
      ];
    }
    if (id.includes('u5-l3')) {
      return [
        { q: 'Safar Tours is one of Iraq\'s longest established travel companies, started in 1976.', correct: true, reason: 'True: Ahmed\'s father started Safar Tours in 1976 on Al Rasheed Street.' },
        { q: 'Steve Harper has visited Iraq 15 times on business since 2009.', correct: true, reason: 'True: He extends his stay each time for sightseeing tours with Safar Tours.' },
      ];
    }
    if (id.includes('u5-l6')) {
      return [
        { q: 'Anna Johnson stayed on the Tunisian Kerkennah Islands on a package deal that cost £300.', correct: true, reason: 'True: The package included flight, transfers, ferry, hotel and meals.' },
        { q: 'In Kerkennah, octopus is caught in plastic nets.', correct: false, reason: 'False: Local fishermen catch octopus in traditional clay pots.' },
      ];
    }
    if (id.includes('u5-l9')) {
      return [
        { q: 'Chronic stress from modern work can cause high blood pressure, strokes, and heart attacks.', correct: true, reason: 'True: The body and brain cannot continue indefinitely without breaks and holidays.' },
        { q: 'Workaholics are people who take too many long holidays.', correct: false, reason: 'False: Workaholics think their work is too important to leave and delay holidays.' },
      ];
    }
    if (id.includes('u6-l3')) {
      return [
        { q: 'Being a banker requires being good at Maths and able to read graphs and charts.', correct: true, reason: 'True: A banker must also be a good communicator to explain complex plans clearly.' },
        { q: 'Bankers approve loans without consulting any other specialists.', correct: false, reason: 'False: They work with experts such as property evaluators when clients buy homes.' },
      ];
    }
    if (id.includes('u7-l9')) {
      return [
        { q: 'The Central Library of Baghdad provides books on different careers, CV writing, and interview advice.', correct: true, reason: 'True: The narrator researched new careers and borrowed language DVDs.' },
        { q: 'The narrator used the library to find information about evening and summer classes.', correct: true, reason: 'True: The library had catalogues and computers to check course details.' },
      ];
    }
    if (id.includes('u8-l3')) {
      return [
        { q: 'Wind power produces zero greenhouse gases and is a 100% renewable energy source.', correct: true, reason: 'True: Wind power is clean and the wind is caused by changing temperatures in the air.' },
        { q: 'Farmers cannot use the land under wind turbines for agriculture or animals.', correct: false, reason: 'False: Because wind turbines are tall, land under them can still be used for farming and grazing.' },
      ];
    }
    if (id.includes('u8-l4')) {
      return [
        { q: 'The Euphrates River is 2,800 km long, making it the longest river in the Middle East.', correct: true, reason: 'True: It begins in the Caucasus Mountains and flows through Turkey, Syria, and Iraq.' },
        { q: 'The ruins of ancient Babylon are located along the banks of the Euphrates.', correct: true, reason: 'True: Ancient Babylon and modern cities like An Najaf lie along the river.' },
      ];
    }
    return [
      { q: 'Ministerial exam reading comprehension questions require precise keywords from the official text.', correct: true, reason: 'True: Accurate keywords ensure full marks in Question 1 Branch B.' },
      { q: 'Understanding the main theme and character actions is crucial for high exam scores.', correct: true, reason: 'True: Ministerial questions test key events and characters directly.' },
    ];
  };

  const tfStatements = getTrueFalseStatements();

  return (
    <div className="rounded-3xl border border-amber-300/80 bg-gradient-to-b from-amber-950 via-stone-900 to-stone-950 text-white p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-inner">
            <BookOpen className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[11px] font-extrabold uppercase tracking-wider">
                Reading Comprehension Dossier
              </span>
              <span className="text-xs text-stone-400">• ملف استيعاب القصة الوزاري</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              الملف الأمني والاستيعابي الشامل للقطعة الوزارية
            </h2>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('dossier')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'dossier' 
                ? 'bg-amber-500 text-stone-950 font-black shadow-sm' 
                : 'text-stone-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>البطاقة</span>
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'timeline' 
                ? 'bg-amber-500 text-stone-950 font-black shadow-sm' 
                : 'text-stone-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Milestone className="w-3.5 h-3.5" />
            <span>الخط الزمني</span>
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'flashcards' 
                ? 'bg-amber-500 text-stone-950 font-black shadow-sm' 
                : 'text-stone-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>البطاقات القلابة</span>
          </button>
          <button
            onClick={() => setActiveTab('drill')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'drill' 
                ? 'bg-amber-500 text-stone-950 font-black shadow-sm' 
                : 'text-stone-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>تحدي الصح والخطأ</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Dossier Card */}
      {activeTab === 'dossier' && (
        <div className="p-5 sm:p-6 rounded-2xl bg-stone-900/90 border border-amber-500/30 backdrop-blur-md relative z-10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
              <FileText className="w-4 h-4" />
              <span>بطاقة بيانات القصة (Story Dossier Card)</span>
            </div>
            <span className="text-[11px] text-stone-400 font-mono">Confidential Exam Digest</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-stone-400 font-bold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                الشخصية / البطل الرئيسي
              </span>
              <p className="font-bold text-white text-xs sm:text-sm">{meta.protagonist}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-stone-400 font-bold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                مسرح الأحداث / المكان
              </span>
              <p className="font-bold text-white text-xs sm:text-sm">{meta.location}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-stone-400 font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                الأزمة / الصراع الوزاري
              </span>
              <p className="font-bold text-rose-200 text-xs sm:text-sm">{meta.crisis}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 sm:col-span-2 lg:col-span-2 space-y-1">
              <span className="text-stone-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                الحل والإنقاذ الوزاري المعتمد
              </span>
              <p className="font-bold text-emerald-200 text-xs sm:text-sm">{meta.savior}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-stone-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                الرسالة والمغزى التربوي
              </span>
              <p className="font-bold text-amber-200 text-xs sm:text-sm">{meta.keyTheme}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Story Chronological Timeline */}
      {activeTab === 'timeline' && (
        <div className="space-y-4 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Milestone className="w-4 h-4 text-amber-400" />
              الخط الزمني لتسلسل أحداث القصة من البداية إلى النهاية:
            </span>
            <span className="text-[11px] text-stone-400">تتبع الأحداث يسهل تذكر الإجابات</span>
          </div>

          <div className="relative border-r-2 border-amber-500/40 mr-4 space-y-6 pr-6">
            {timeline.map((event, idx) => (
              <div key={idx} className="relative space-y-2 group">
                {/* Timeline Node Dot */}
                <div className="absolute -right-[31px] top-1.5 w-4 h-4 rounded-full bg-amber-400 border-4 border-stone-900 shadow-md group-hover:scale-125 transition-transform" />

                <div className="p-4 rounded-2xl bg-stone-900/90 border border-white/10 group-hover:border-amber-400/50 transition-all space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-black text-[11px]">
                        {event.phaseAr}
                      </span>
                      <span className="text-xs text-stone-400 font-mono">({event.timeOrPhase})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        مفتاح الوزاري: {event.ministerialKey}
                      </span>
                      <button
                        onClick={() => handleSpeak(`timeline-${idx}`, event.descEn)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          speakingId === `timeline-${idx}`
                            ? 'bg-amber-400 text-stone-950 border-amber-400 animate-pulse'
                            : 'bg-white/10 text-stone-300 border-white/10 hover:bg-white/20'
                        }`}
                        title="استمع للنطق"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="font-mono text-xs sm:text-sm font-bold text-amber-100 dir-ltr text-right">
                    {event.descEn}
                  </p>

                  <p className="text-xs text-stone-300 leading-relaxed">
                    {event.descAr}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Interactive Flip Flashcard Deck */}
      {activeTab === 'flashcards' && (
        <div className="space-y-3 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <RotateCw className="w-4 h-4 text-amber-400" />
                <span>بطاقات الحفظ الذكي القلابة (Flip Flashcards)</span>
              </h3>
              <p className="text-xs text-stone-400">
                اضغط على البطاقة لقلبها وقراءة الإجابة النموذجية المعتمدة بالكنترول
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
              {flashcards.length} بطاقات
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {flashcards.map((card) => {
              const isFlipped = flippedCardId === card.id;

              return (
                <div 
                  key={card.id}
                  onClick={() => toggleFlip(card.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 min-h-[140px] flex flex-col justify-between ${
                    isFlipped 
                      ? 'bg-gradient-to-br from-amber-900/70 to-stone-900 border-amber-400 text-white shadow-lg' 
                      : 'bg-white/5 border-white/10 hover:border-amber-400/50 hover:bg-white/10 text-stone-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                        isFlipped ? 'bg-amber-400 text-stone-950 font-black' : 'bg-white/10 text-amber-300'
                      }`}>
                        {isFlipped ? 'الإجابة النموذجية' : 'السؤال الوزاري'}
                      </span>
                      {card.note && (
                        <span className="text-[10px] text-stone-400">{card.note}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleSpeak(card.id, isFlipped ? card.a : card.q)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          speakingId === card.id 
                            ? 'bg-amber-400 text-stone-950 border-amber-400 animate-pulse' 
                            : 'bg-white/10 text-stone-300 border-white/10 hover:bg-white/20'
                        }`}
                        title="استمع للنطق الإنجليزي"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-stone-500 text-[11px] hover:text-amber-300">
                        <RotateCw className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  <div className="my-2">
                    {isFlipped ? (
                      <p className="text-xs sm:text-sm font-semibold text-amber-100 leading-relaxed">
                        {card.a}
                      </p>
                    ) : (
                      <p className="font-mono text-xs sm:text-sm font-bold text-white dir-ltr text-right leading-snug">
                        {card.q}
                      </p>
                    )}
                  </div>

                  <div className="text-left text-[10px] text-stone-400">
                    {isFlipped ? 'اضغط للعودة إلى السؤال' : 'اضغط لإظهار الإجابة الوزارية'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Rapid True/False Comprehension Drill */}
      {activeTab === 'drill' && (
        <div className="p-5 rounded-2xl bg-black/40 border border-white/10 relative z-10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <HelpCircle className="w-4 h-4" />
            <span>تحدي صح أو خطأ السريع (True / False Rapid Drill)</span>
          </div>

          <div className="space-y-2.5">
            {tfStatements.map((stmt, idx) => {
              const answered = selectedTfAnswers[idx] !== undefined;
              const userChoice = selectedTfAnswers[idx];
              const isCorrect = userChoice === stmt.correct;

              return (
                <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <p className="font-mono text-xs sm:text-sm font-bold text-white dir-ltr text-right">
                      {stmt.q}
                    </p>
                    {answered && (
                      <p className={`text-xs ${isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}`}>
                        {stmt.reason}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      disabled={answered}
                      onClick={() => setSelectedTfAnswers(prev => ({ ...prev, [idx]: true }))}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                        answered 
                          ? stmt.correct === true 
                            ? 'bg-emerald-600 text-white border-emerald-500' 
                            : userChoice === true ? 'bg-rose-600 text-white border-rose-500' : 'opacity-40'
                          : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                      }`}
                    >
                      True (صح)
                    </button>

                    <button
                      disabled={answered}
                      onClick={() => setSelectedTfAnswers(prev => ({ ...prev, [idx]: false }))}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                        answered 
                          ? stmt.correct === false 
                            ? 'bg-emerald-600 text-white border-emerald-500' 
                            : userChoice === false ? 'bg-rose-600 text-white border-rose-500' : 'opacity-40'
                          : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                      }`}
                    >
                      False (خطأ)
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
