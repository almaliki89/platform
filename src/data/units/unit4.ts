import { Unit } from '../../types';

export const UNIT_4: Unit = {
  id: 4,
  number: 4,
  titleAr: "الوحدة الرابعة: المراجعة الشاملة وتقنيات اللياقة البدنية",
  titleEn: "Unit 4: Comprehensive Review & Fitness Tech",
  description: "مراجعة أزمنة الماضي البسيط والمستمر، قطعة تقنيات اللياقة الذكية (Fitness Tech)، مطابقة نصائح النجاح المهني، التدريب المركز على الندم والحالة الشرطية الثالثة، مع اختبار الوحدة الرابعة الشامل وتمارين الإملاء.",
  accentColor: "from-purple-600 to-violet-600",
  bgGradient: "bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200",
  lessons: [
    {
      id: "u4-l1",
      unitId: 4,
      lessonNumber: 1,
      titleAr: "الدرس الأول: مراجعة الماضي البسيط والماضي المستمر",
      titleEn: "Lesson 1: Review of Past Simple & Past Continuous",
      category: "grammar",
      summary: "مراجعة مكثفة وتطبيقية لتمييز الماضي البسيط والماضي المستمر في سياقات النصوص والقصص القصيرة (تمرين A ص 76 كتاب النشاط).",
      grammarRuleFormula: "Long action in progress: was/were + v-ing\nShort interrupting action: verb-ed / irregular",
      detailedContent: [
        "مراجعة أزمنة الماضي (ص 82 - 84 من ملزمة الأستاذ مصطفى تركي):",
        "- زمن الماضي المستمر يعبر عن حدث استمر لفترة زمنية في الماضي (long action).",
        "- زمن الماضي البسيط يعبر عن حدث قطعه أو حدث مفاجئ قصير (short interrupting action).",
        "تمرين A ص 76 كتاب النشاط:",
        "- One day, an old man was driving (drive) along a quiet country road when a cat ran (run) across.",
        "- While he was waiting (wait) for the police, the rain stopped (stop).",
        "- She was sitting in the garden when someone threw a ball over the wall."
      ],
      teacherNotes: [
        "ملاحظة الأستاذ مصطفى تركي: في نصوص القصص، انتبه للأدوات (when, while, as) لتحديد الزمن بدقة."
      ],
      commonMistakes: [
        "استخدام الماضي البسيط بعد while.",
        "نسيان مضاعفة الحرف الأخير في أفعال مثل stopped, dropped."
      ],
      examples: [
        {
          en: "I was having a dream when the phone rang.",
          ar: "كنت أحلم عندما رن الهاتف.",
          highlight: "was having ... when ... rang",
          note: "تمرين A ص 76"
        }
      ],
      exercises: [
        {
          id: "u4-l1-ex1",
          question: "While she _________ (read) a book, her brother came in.",
          options: ["was reading", "read", "reads", "is reading"],
          correctAnswer: "was reading",
          explanation: "بعد while نستخدم ماضياً مستمراً: was reading.",
          type: "mcq",
          ministerialYear: "تمرين A ص 76"
        }
      ]
    },
    {
      id: "u4-l2",
      unitId: 4,
      lessonNumber: 2,
      titleAr: "الدرس الثاني: قطعة تقنيات اللياقة البدنية (Fitness Tech)",
      titleEn: "Lesson 2: Fitness Technology & Smart Gyms",
      category: "reading",
      summary: "قطعة استيعاب أحدث التقنيات الرقمية في ممارسة الرياضة: الساعات الذكية، تتبع ضربات القلب، السعرات الحرارية، مرايا اللياقة التفاعلية، والذكاء الاصطناعي في التمرين.",
      grammarRuleFormula: "Fitness Tech Key Concepts:\n- Smart watches & trackers: monitor heart rate, sleep quality and burned calories\n- Smart fitness mirrors: interactive screens providing instant trainer feedback\n- AI workout apps: tailor personalized routines to personal fitness goals",
      detailedContent: [
        "قطعة تقنيات اللياقة البدنية (ص 84 - 86 من ملزمة الأستاذ مصطفى تركي):",
        "- كيف غيرت التكنولوجيا الحديثة عالم اللياقة والتمارين البدنية في السنوات الأخيرة؟",
        "- أجهزة التتبع القابلة للارتداء (Wearable fitness trackers): تقيس نبضات القلب، عدد الخطوات، جودة النوم، وحرق السعرات الحرارية بدقة عالية.",
        "- المرايا الذكية (Smart mirrors): شاشات متطورة تعكس صورة المتدرب وتوفر له توجيهات فورية لتصحيح وضعية التمرين وحركات الجسد لمنع الإصابات.",
        "- تطبيقات الذكاء الاصطناعي (AI fitness apps): تصمم برامج تدريبية مخصصة تناسب أهداف كل شخص وتتكيف مع تقدمه الرياضي.",
        "- الهدف الرئيسي: تشجيع الناس على ممارسة النشاط البدني المنتظم ومكافحة نمط الحياة الخامل والسمنة."
      ],
      teacherNotes: [
        "ملاحظة الأستاذ مصطفى تركي: قطعة اللياقة والتقنية الذكية من قطع الوحدة الرابعة الحديثة المضافة لمنهاج 2027.",
        "احفظ المفردات التقنية: monitor heart rate, burn calories, smart mirrors, personalized routines."
      ],
      commonMistakes: [
        "الخلط بين وظيفة ساعة التتبع (wearable tracker) ووظيفة المرآة الذكية (fitness mirror)."
      ],
      examples: [
        {
          en: "Fitness trackers help users monitor their daily steps and heart rate.",
          ar: "تساعد أجهزة تتبع اللياقة المستخدمين على مراقبة خطواتهم ونبضات قلوبهم اليومية.",
          highlight: "monitor daily steps and heart rate",
          note: "ص 85"
        }
      ],
      exercises: [
        {
          id: "u4-l2-ex1",
          question: "What do wearable fitness trackers monitor?",
          options: [
            "Daily steps, heart rate, sleep and burned calories.",
            "Car engine temperature and speed.",
            "Weather forecasts for the month.",
            "Bank account transactions."
          ],
          correctAnswer: "Daily steps, heart rate, sleep and burned calories.",
          explanation: "تقيس أجهزة التتبع الخطوات والنبض وجودة النوم والسعرات الحرارية.",
          type: "mcq",
          ministerialYear: "منهاج 2027 الحديث"
        }
      ]
    },
    {
      id: "u4-l3",
      unitId: 4,
      lessonNumber: 3,
      titleAr: "الدرس الثالث: نصائح النجاح المهني ومطابقة الجمل",
      titleEn: "Lesson 3: Career Success & Sentence Matching",
      category: "vocabulary",
      summary: "مطابقة أنصاف الجمل الخاصة بالنصائح المهنية وبناء المستقبل الوظيفي (تمرين B ص 77 كتاب النشاط).",
      grammarRuleFormula: "Connecting sentence halves logically:\nIf you want to have a successful company => you must have ambitious employees",
      detailedContent: [
        "مطابقة الجمل الوزارية (ص 86 من ملزمة الأستاذ مصطفى تركي - تمرين B ص 77 كتاب النشاط):",
        "1. If you want to have a successful company, you must have ambitious employees.",
        "2. When you are working at a computer, you should take regular breaks.",
        "3. In a business, you need people who are good with numbers.",
        "4. If you don't enjoy physical work, you shouldn't become a builder.",
        "5. To become a good interpreter, you must be able to remain calm under pressure."
      ],
      teacherNotes: [
        "ملاحظة الأستاذ مصطفى تركي: تأتي هذه الجمل كأزواج مطابقة (Match) في السؤال الثالث فرع B."
      ],
      commonMistakes: [
        "مطابقة نصيحة العمل مع نهاية غير متوافقة معها بالمعنى."
      ],
      examples: [
        {
          en: "When you are working at a computer, you should take regular breaks.",
          ar: "عندما تعمل على الحاسوب، ينبغي عليك أخذ فترات استراحة منتظمة.",
          highlight: "take regular breaks",
          note: "تمرين B ص 77"
        }
      ],
      exercises: [
        {
          id: "u4-l3-ex1",
          question: "If you want to have a successful company, you must _________.",
          options: [
            "have ambitious employees",
            "take regular breaks",
            "remain calm under pressure",
            "become a builder"
          ],
          correctAnswer: "have ambitious employees",
          explanation: "المطابقة الصحيحة: امتلاك موظفين طموحين (ambitious employees).",
          type: "mcq",
          ministerialYear: "تمرين B ص 77"
        }
      ]
    },
    {
      id: "u4-l4",
      unitId: 4,
      lessonNumber: 4,
      titleAr: "الدرس الرابع: تدريب الندم والحالة الشرطية الثالثة",
      titleEn: "Lesson 4: Review of Regret & Third Conditional",
      category: "grammar",
      summary: "تدريب مكثف على صياغة الندم (I wish / If only) والشرطية الثالثة (Third Conditional) المتقاطعة (تمرين C ص 78 كتاب النشاط).",
      grammarRuleFormula: "Regret: If only / I wish + Subj + had / hadn't + p.p.\nThird Conditional: If + had + p.p. , would have + p.p.",
      detailedContent: [
        "تطبيقات وتمارين الندم والشرطية الثالثة (ص 87 - 88 من ملزمة الأستاذ مصطفى تركي):",
        "- I wish I had brought my sunglasses with me; it's so sunny today.",
        "- If only we had checked the timetable before leaving home.",
        "- If my alarm clock had gone off, I wouldn't have been late for work.",
        "- If she hadn't lost her passport, she would have travelled to Dubai with us."
      ],
      teacherNotes: [
        "ملاحظة الأستاذ مصطفى تركي: قاعدة الندم والشرطية الثالثة كلاهما يعتمدان على الماضي التام (had + p.p)!"
      ],
      commonMistakes: [
        "نسيان التصريف الثالث بعد had أو after would have."
      ],
      examples: [
        {
          en: "If only I hadn't eaten so much chocolate. (I feel sick now).",
          ar: "أتمنى لو أنني لم آكل الكثير من الشوكولاتة.",
          highlight: "If only I hadn't eaten",
          note: "ص 87"
        }
      ],
      exercises: [
        {
          id: "u4-l4-ex1",
          question: "If she _________ (not lose) her ticket, she would have boarded the plane.",
          options: ["hadn't lost", "hasn't lost", "didn't lose", "doesn't lose"],
          correctAnswer: "hadn't lost",
          explanation: "جواب الشرط would have boarded (حالة ثالثة)، فجملة If تأخذ ماضياً تاماً: hadn't lost.",
          type: "mcq",
          ministerialYear: "تمرين C ص 78"
        }
      ]
    },
    {
      id: "u4-l5",
      unitId: 4,
      lessonNumber: 5,
      titleAr: "الدرس الخامس: اختبار الوحدة الرابعة والإملاء الوزاري",
      titleEn: "Lesson 5: Unit 4 Test & Ministerial Spelling",
      category: "spelling",
      summary: "حل الاختبار الشامل للوحدة الرابعة، تمارين إكمال نهايات الكلمات الإملائية (fracture, inefficient, spectacles, etc.) وتصحيح الأخطاء (ص 89 - 91 من الملزمة).",
      grammarRuleFormula: "Spelling Endings:\nfracture | inefficient | spectacles | independent | unfortunately | illegal | impolite",
      detailedContent: [
        "إكمال الكلمات الإملائية الوزارية (تمرين C ص 82 وتمرين E ص 83 كتاب النشاط):",
        "1. frac____ -> fracture (كسر عظم).",
        "2. ineffi____ -> inefficient (غير كفء).",
        "3. spec____ -> spectacles (نظارات).",
        "4. indep____ -> independent (مستقل).",
        "5. unfort____ -> unfortunately (لسوء الحظ).",
        "6. unconv____ -> unconventional (غير تقليدي).",
        "7. regu____ -> regular (منتظم).",
        "8. freq____ -> frequent (متكرر).",
        "تعاريف مهمة في اختبار الوحدة (تمرين B ص 80):",
        "- salary = money you get paid every month by your employer.",
        "- vacancy = an available job position in a company.",
        "- recruit = find and hire new staff."
      ],
      teacherNotes: [
        "ملاحظة الأستاذ مصطفى تركي: كلمات تمرين C ص 82 تتكرر باستمرار في سؤال الإملاء الوزاري، احفظ حروف نهاياتها بدقة!"
      ],
      commonMistakes: [
        "الخطأ في إملاء fracture أو spectacles.",
        "الخلط بين salary (راتب شهري) و wage (أجر يومي أو أسبوعي)."
      ],
      examples: [
        {
          en: "frac____ -> fracture ; spec____ -> spectacles",
          ar: "كسر -> fracture ؛ نظارات -> spectacles",
          highlight: "fracture / spectacles",
          note: "سؤال الإملاء ص 90"
        }
      ],
      exercises: [
        {
          id: "u4-l5-ex1",
          question: "Complete the spelling: frac______ (a break in a bone)",
          options: ["fracture", "fraction", "fractal", "fractured"],
          correctAnswer: "fracture",
          explanation: "الكسر في العظام يسمى إملائياً fracture.",
          type: "mcq",
          ministerialYear: "وزاري 2018 و 2021"
        },
        {
          id: "u4-l5-ex2",
          question: "Money you get paid every month is your _________.",
          options: ["salary", "pocket money", "cheque", "deposit"],
          correctAnswer: "salary",
          explanation: "المبلغ الذي يتقاضاه الموظف شهرياً يسمى راتباً (salary).",
          type: "mcq",
          ministerialYear: "تمرين B ص 80"
        }
      ]
    }
  ]
};
