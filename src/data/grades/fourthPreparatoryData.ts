import { Unit, LiteratureItem, EssayItem, MinisterialExamQuestion } from '../../types';
import { MockExamPaper } from '../mockExamPapers';

// =========================================================================
// وحدات الرابع الإعدادي - منهج English for Iraq (4th Preparatory)
// =========================================================================
export const FOURTH_PREPARATORY_UNITS: Unit[] = [
  {
    id: 41,
    number: 1,
    titleAr: "الوحدة الأولى: التواصل واللغات والأسئلة غير المباشرة (Getting in Touch)",
    titleEn: "Unit 1: Communication, Stative Verbs & Indirect Questions",
    description: "المضارع البسيط والمستمر، أفعال الحالة (Stative Verbs)، اللغات الرسمية لكندا، وتكوين الأسئلة غير المباشرة المؤدبة (Indirect Questions).",
    accentColor: "from-violet-600 to-indigo-600",
    bgGradient: "bg-gradient-to-r from-violet-50 to-indigo-50 border-violet-200",
    lessons: [
      {
        id: "4th-u1-l1",
        unitId: 41,
        lessonNumber: 1,
        titleAr: "الدرس الأول: المضارع البسيط مقابل المستمر وأفعال الحالة (Present Simple vs Continuous)",
        titleEn: "Lesson 1: Present Simple vs Present Continuous & Stative Verbs",
        category: "grammar",
        summary: "التمييز بين الحقائق والعادات الثابتة وبين الأحداث المؤقتة، وقاعدة أفعال الحواس والمشاعر التي لا تقبل -ing.",
        grammarRuleFormula: "Present Simple (حقائق وعادات):\nSubject + Verb(-s / base) + Complement\nAdverbs: always, usually, often, every day\n\nPresent Continuous (أحداث جارية ومؤقتة):\nSubject + am / is / are + Verb-ing\nAdverbs: now, at the moment, currently, today\n\nStative Verbs (أفعال الحالة - لا تأخذ ing مطلقاً):\nlike, love, hate, know, understand, believe, want, need, seem",
        detailedContent: [
          "يستخدم المضارع البسيط للحقائق العلمية والروتين اليومي: Water boils at 100°C.",
          "يستخدم المضارع المستمر للأحداث التي تقع في لحظة التحدث أو التغيرات المؤقتة: Oil prices are rising.",
          "أفعال الحالة (Stative Verbs): تعبر عن حالة عقلية أو شعورية أو ملكية، وتأتي دائماً في المضارع البسيط حتى لو وجدت كلمة now أو at the moment.",
          "مثال: I understand the lesson now (وليس I am understanding)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: قاعدة ذهبية للرابع والسادس الإعدادي: أفعال الشعور والإدراك (know, understand, remember, want, believe) لا تأخذ ing نهائياً!"
        ],
        commonMistakes: [
          "كتابة I am knowing him (الصحيح I know him).",
          "استخدام مضارع بسيط مع كلمة at the moment."
        ],
        examples: [
          {
            en: "She speaks Arabic and Kurdish fluently.",
            ar: "هي تتحدث اللغتين العربية والكردية بطلاقة (حقيقة دائمة).",
            highlight: "speaks",
            note: "مضارع بسيط للحقائق"
          },
          {
            en: "Look! The students are working on a collaborative project.",
            ar: "انظر! الطلاب يعملون على مشروع جماعي الآن.",
            highlight: "are working",
            note: "مضارع مستمر لحدث جارٍ"
          }
        ],
        exercises: [
          {
            id: "4u1-ex1",
            question: "Listen! Somebody ______ (play) the Oud in the music hall.",
            options: ["is playing", "plays", "played", "was playing"],
            correctAnswer: "is playing",
            explanation: "كلمة Listen! تدل على حدث يقع الآن في لحظة الكلام، لذا نستخدم المضارع المستمر is playing.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الأول"
          },
          {
            id: "4u1-ex2",
            question: "I ______ (not understand) this grammar point at the moment. Can you explain it?",
            options: ["don't understand", "am not understanding", "didn't understand", "not understand"],
            correctAnswer: "don't understand",
            explanation: "الفعل understand من أفعال الحالة (Stative verb) فلا يقبل صيغة الاستمرار ing حتى مع وجود at the moment.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          }
        ]
      },
      {
        id: "4th-u1-l2",
        unitId: 41,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: الأسئلة غير المباشرة المهذبة (Indirect Questions)",
        titleEn: "Lesson 2: Polite Indirect Questions (Could you tell me...)",
        category: "grammar",
        summary: "تحويل الأسئلة المباشرة إلى صيغ مهذبة مع تغيير ترتيب الفاعل والفعل المساعد.",
        grammarRuleFormula: "Wh-question:\nCould you tell me + Wh-word + Subject + Verb...?\n(e.g., Where is the library? -> Could you tell me where the library is?)\n\nYes/No question:\nCould you tell me if / whether + Subject + Verb...?\n(e.g., Does the train stop here? -> Could you tell me if the train stops here?)",
        detailedContent: [
          "الأسئلة غير المباشرة تبدأ بعبارة مهذبة مثل: Could you tell me... أو Do you know...",
          "القاعدة الأساسية: يتحول ترتيب الجملة بعد أداة السؤال إلى ترتيب جملة خبرية (فاعل ثم فعل).",
          "إذا احتوى السؤال الأصلي على do/does/did: نحذفها ونعدل الفعل الرئيسي (مع does نضيف s، ومع did نحول للماضي).",
          "إذا كان السؤال Yes/No نضيف كلمة if أو whether بعد العبارة التمهيدية."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه جداً لتقديم الفاعل على الفعل المساعد: Where is the station? تصبح where the station is وليس where is the station!"
        ],
        commonMistakes: [
          "الإبقاء على تقديم الفعل المساعد على الفاعل: Could you tell me where is it? (الصحيح where it is).",
          "نسيان حذف does وتصريف الفعل بـ s."
        ],
        examples: [
          {
            en: "Could you tell me how much this English dictionary costs?",
            ar: "هل يمكن أن تخبرني كم يبلغ ثمن قاموس الإنكليزية هذا؟",
            highlight: "Could you tell me how much ... costs",
            note: "سؤال غير مباشر مهذب بحذف does وإضافة s"
          }
        ],
        exercises: [
          {
            id: "4u1-ex3",
            question: "Where is the headmaster's office? -> Could you tell me where ______?",
            options: [
              "the headmaster's office is",
              "is the headmaster's office",
              "was the headmaster's office",
              "the headmaster's office was"
            ],
            correctAnswer: "the headmaster's office is",
            explanation: "في السؤال غير المباشر يتقدم الفاعل (the office) على الفعل المساعد (is).",
            type: "mcq",
            ministerialYear: "امتحان نهاية الكورس الأول"
          }
        ]
      }
    ]
  },
  {
    id: 42,
    number: 2,
    titleAr: "الوحدة الثانية: عادات الماضي والماضي المستمر (Past Events & Used to)",
    titleEn: "Unit 2: Past Habits with 'used to' & Continuous Links",
    description: "أدوات الربط (as, while, when) بين الماضي البسيط والمستمر، واعتياد الفعل في الماضي باستخدام used to.",
    accentColor: "from-purple-600 to-pink-600",
    bgGradient: "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200",
    lessons: [
      {
        id: "4th-u2-l1",
        unitId: 42,
        lessonNumber: 1,
        titleAr: "الدرس الأول: اعتياد الفعل في الماضي (used to)",
        titleEn: "Lesson 1: Used to + Base Verb for Past Habits",
        category: "grammar",
        summary: "التعبير عن عادات وأشياء كانت حقيقية ومألوفة في الماضي ولكنها لم تعد كذلك الآن.",
        grammarRuleFormula: "(+) Subject + used to + base verb\n(-) Subject + didn't use to + base verb\n(?) Did + Subject + use to + base verb...?\n\nComparison with now:\nSubject + used to + base verb, but now + Present Simple",
        detailedContent: [
          "نستخدم used to للتعبير عن شيء كان عادة متكررة في الماضي وتغير في الوقت الحاضر.",
          "في النفي تصبح didn't use to (بدون حرف d)، وفي السؤال Did you use to...?",
          "تُقارن دائماً بالحاضر: I used to ride a bicycle, but now I drive a car.",
          "سؤال محوري مشترك بين منهاج الرابع والسادس الإعدادي."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: هذه القاعدة هي نفسها تماماً المقررة في الوحدة الأولى للسادس الإعدادي! اتقانك لها الآن يضمن درجتك في السادس مقدماً."
        ],
        commonMistakes: [
          "كتابة didn't used to مع حرف d (الصحيح didn't use to).",
          "نسيان s الشخص الثالث في شطر but now he...",
        ],
        examples: [
          {
            en: "Baghdad used to have fewer cars, but now the traffic is very crowded.",
            ar: "كانت بغداد تحتوي على سيارات أقل في الماضي، لكن المرور الآن مزدحم جداً.",
            highlight: "used to have",
            note: "عادة ماضية مقارنة بالحاضر"
          }
        ],
        exercises: [
          {
            id: "4u2-ex1",
            question: "He ______ (use to) smoke cigarettes, but he gave it up two years ago.",
            options: ["used to", "use to", "was used to", "uses to"],
            correctAnswer: "used to",
            explanation: "عادة ماضية توقف عنها الآن، الصيغة الإيجابية هي used to + المصدر smoke.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          }
        ]
      }
    ]
  },
  {
    id: 43,
    number: 3,
    titleAr: "الوحدة الثالثة: جمل الوصل المعرفة وغير المعرفة (Relative Clauses)",
    titleEn: "Unit 3: Defining & Non-defining Relative Clauses",
    description: "ضمائر الوصل (who, which, that, where, whose)، والفروق بين جمل الوصل المعرفة والمعلومات الإضافية (الفواصل).",
    accentColor: "from-blue-600 to-cyan-600",
    bgGradient: "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200",
    lessons: [
      {
        id: "4th-u3-l1",
        unitId: 43,
        lessonNumber: 1,
        titleAr: "الدرس الأول: جمل الوصل الكاملة (Relative Clauses with who, which, where, whose)",
        titleEn: "Lesson 1: Relative Pronouns & Clauses",
        category: "grammar",
        summary: "ربط الجمل باستخدام who للعاقل، which لغير العاقل، where للمكان، و whose للتملك.",
        grammarRuleFormula: "Person + who + verb / clause\nThing + which / that + verb / clause\nPlace + where + clause (فاعل وفعل بدون حرف جر)\nPerson/Noun + whose + Noun (اسم التملك)",
        detailedContent: [
          "Defining Relative Clauses: تعطي معلومة أساسية لتعريف الاسم ولا نضع معها فواصل.",
          "Non-defining Relative Clauses: تعطي معلومة إضافية عن اسم محدد ومعروف سلفاً، وتوضع بين فاصلتين (, ... ,).",
          "قاعدة whose: اسم قبل الفراغ واسم بعد الفراغ يعود ملكيته للأول: The woman whose car was stolen.",
          "قاعدة where: اسم مكان قبل الفراغ وجملة تامة بعده بدون حرف جر دال على المكان."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه للفرق بين which و where مع الأماكن: إذا وجدنا فعلاً مباشرة بعد الفراغ نختار which، وإذا وجدنا فاعلاً وجملة كاملة نختار where!"
        ],
        commonMistakes: [
          "وضع where عندما يكون بعد الفراغ فعل مثل: The city where has beautiful parks (الصحيح which has).",
          "استخدام who بدلاً من whose مع الملكية."
        ],
        examples: [
          {
            en: "The engineer who designed this bridge is an Iraqi genius.",
            ar: "المهندس الذي صمم هذا الجسر هو عبقري عراقي.",
            highlight: "who designed",
            note: "ضمير وصل لعاقل"
          },
          {
            en: "That is the student whose essay won first prize.",
            ar: "هذا هو الطالب الذي فاز مقالُه بالجائزة الأولى.",
            highlight: "whose essay",
            note: "ضمير وصل للتملك"
          }
        ],
        exercises: [
          {
            id: "4u3-ex1",
            question: "I met the doctor ______ clinic is located in Al-Mansour. (who / whose / which)",
            options: ["whose", "who", "which", "where"],
            correctAnswer: "whose",
            explanation: "العيادة (clinic) ملك للطبيب (doctor)، لذا نستخدم ضمير الملكية whose.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الأول"
          }
        ]
      }
    ]
  },
  {
    id: 45,
    number: 5,
    titleAr: "الوحدة الخامسة: أفعال الإلزام والمستقبل المستمر (Obligation & Future Continuous)",
    titleEn: "Unit 5: Modals of Obligation & Future Continuous",
    description: "أفعال الضرورة والمنع (must, have to, need to, mustn't, don't have to)، والمستقبل المستمر في مواقف الاحتفالات والمناسبات.",
    accentColor: "from-emerald-600 to-teal-600",
    bgGradient: "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200",
    lessons: [
      {
        id: "4th-u5-l1",
        unitId: 45,
        lessonNumber: 1,
        titleAr: "الدرس الأول: أفعال الإلزام والضرورة والمنع (Modals of Necessity)",
        titleEn: "Lesson 1: Must, Have to, Need to & Prohibitions",
        category: "grammar",
        summary: "التعبير عن الإلزام القانوني والأخلاقي (must / have to)، وعدم الضرورة (don't have to)، والتحريم القاطع (mustn't).",
        grammarRuleFormula: "Necessity (ضرورة وإلزام):\nmust / have to / need to + base verb\n\nLack of Necessity (عدم ضرورة - اختياري):\ndon't have to / doesn't have to / needn't + base verb\n\nProhibition (منع وتحريم قطعي وعقوبة):\nmustn't + base verb",
        detailedContent: [
          "نستخدم must و have to عندما يكون الشيء واجباً أو قانونياً: Drivers must wear seatbelts.",
          "نستخدم mustn't عندما يكون الفعل ممنوعاً قانونياً أو خطيراً جداً: You mustn't smoke in a hospital.",
          "نستخدم don't have to أو needn't عندما لا يكون الشيء ضرورياً (لست مجبراً عليه): You don't have to wash the car today; it is clean."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه للفرق بين mustn't (ممنوع منعاً باتاً وفيه عقوبة) وبين don't have to (لست مضطراً لكن يمكنك ذلك إن أردت)."
        ],
        commonMistakes: [
          "إضافة to بعد needn't (الصحيح needn't do وليس needn't to do).",
          "استخدام don't have to عند التحذير من شيء خطر وممنوع."
        ],
        examples: [
          {
            en: "You mustn't drive through a red traffic light.",
            ar: "يحرم عليك تجاوز الإشارة المرورية الحمراء (ممنوع قانونياً).",
            highlight: "mustn't drive",
            note: "تحريم ومنع قطعي"
          },
          {
            en: "Tomorrow is a national holiday, so we don't have to wake up early.",
            ar: "غداً عطلة وطنية، لذا لسنا مضطرين للاستيقاظ مبكراً.",
            highlight: "don't have to wake up",
            note: "عدم ضرورة"
          }
        ],
        exercises: [
          {
            id: "4u5-ex1",
            question: "You ______ take photos inside the military museum; it is strictly forbidden.",
            options: ["mustn't", "don't have to", "need to", "must"],
            correctAnswer: "mustn't",
            explanation: "الشيء ممنوع منعاً باتاً (strictly forbidden) لذا نستخدم أداة التحريم القطعي mustn't.",
            type: "mcq",
            ministerialYear: "امتحان نهاية الكورس الثاني"
          }
        ]
      }
    ]
  },
  {
    id: 46,
    number: 6,
    titleAr: "الوحدة السادسة: المبني للمجهول المتقدم (Advanced Passive Voice)",
    titleEn: "Unit 6: Passive Voice Across Tenses",
    description: "المبني للمجهول في المضارع والماضي التام، والمستمر، ومع الأفعال الناقصة (can / will / must be + P.P.).",
    accentColor: "from-amber-600 to-orange-600",
    bgGradient: "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200",
    lessons: [
      {
        id: "4th-u6-l1",
        unitId: 46,
        lessonNumber: 1,
        titleAr: "الدرس الأول: المبني للمجهول مع الأفعال الناقصة والأزمنة التامة",
        titleEn: "Lesson 1: Modal & Perfect Passive Voice",
        category: "grammar",
        summary: "تحويل الجمل التي تحتوي على can / must / will أو have/has been إلى المبني للمجهول.",
        grammarRuleFormula: "Modal Passive:\nObject + can / will / must / should + be + Past Participle (P.P.)\n(e.g., Plastic bottles can be recycled)\n\nPresent Perfect Passive:\nObject + have / has + been + Past Participle (P.P.)\n(e.g., The damaged highway has been repaired)",
        detailedContent: [
          "عند وجود فعل ناقص (can, will, must, should) نضع بعده be ثم التصريف الثالث للفعل.",
          "في المضارع التام نضع been بين have/has والتصريف الثالث.",
          "تستخدم على نطاق واسع في الأخبار والتقارير العلمية والبيئية."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تذكر دائماً: الأفعال الناقصة تأخذ be (can be done)، والمضارع التام يأخذ been (has been done)."
        ],
        commonMistakes: [
          "نسيان be بعد الأفعال الناقصة: It can done (الصحيح can be done)."
        ],
        examples: [
          {
            en: "Endangered animals must be protected by strict laws.",
            ar: "يجب حماية الحيوانات المهددة بالانقراض بقوانين صارمة.",
            highlight: "must be protected",
            note: "مبني للمجهول مع فعل ناقص"
          }
        ],
        exercises: [
          {
            id: "4u6-ex1",
            question: "These old manuscripts can ______ (see) in the Iraqi National Museum.",
            options: ["be seen", "seen", "be saw", "see"],
            correctAnswer: "be seen",
            explanation: "بعد can في المبني للمجهول نستخدم be + التصريف الثالث seen.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          }
        ]
      }
    ]
  },
  {
    id: 47,
    number: 7,
    titleAr: "الوحدة السابعة: الطبيعة والجمل الشرطية مع unless (Conditionals & Nature)",
    titleEn: "Unit 7: Nature, Disasters & Conditionals with Unless",
    description: "الحالة الصفرية والأولى، واستخدام unless بمعنى (ما لم / إذا لم) في سياق الكوارث الطبيعية وحماية البيئة.",
    accentColor: "from-rose-600 to-red-600",
    bgGradient: "bg-gradient-to-r from-rose-50 to-red-50 border-rose-200",
    lessons: [
      {
        id: "4th-u7-l1",
        unitId: 47,
        lessonNumber: 1,
        titleAr: "الدرس الأول: الجمل الشرطية واستخدام (Unless = If not)",
        titleEn: "Lesson 1: Conditionals with (Unless)",
        category: "grammar",
        summary: "استبدال If not بـ Unless وصياغة الجمل الشرطية البيئية.",
        grammarRuleFormula: "Unless + Affirmative Present Simple = If + Negative Present Simple\n(e.g., Unless we plant more trees, desertification will increase)\n= If we do not plant more trees, desertification will increase",
        detailedContent: [
          "كلمة unless تعني في اللغة الإنكليزية (if not = إلا إذا / ما لم).",
          "جملة unless تكون دائماً مثبتة في تركيبها لأن النفي متضمن في معنى الكلمة ذاتها.",
          "جواب الشرط يتبع قواعد الحالة الأولى مع will أو won't."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: إياك أن تضع جملة منفية بعد unless! لا تقل Unless you don't study، بل قل Unless you study."
        ],
        commonMistakes: [
          "استخدام نفي مزدوج بعد unless."
        ],
        examples: [
          {
            en: "Unless you hurry up, you will miss the morning school bus.",
            ar: "ما لم تسرع، ستفوتك حافلة المدرسة الصباحية.",
            highlight: "Unless you hurry ... will miss",
            note: "شرط مع unless"
          }
        ],
        exercises: [
          {
            id: "4u7-ex1",
            question: "Unless it ______ (rain) soon, the farmers will lose their crops.",
            options: ["rains", "doesn't rain", "rained", "will rain"],
            correctAnswer: "rains",
            explanation: "بعد unless نستخدم جملة مثبتة في المضارع البسيط (مع s الشخص الثالث للفاعل it).",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          }
        ]
      }
    ]
  }
];

// =========================================================================
// أدب الرابع الإعدادي (Literature: Shakespeare's Merchant of Venice & Robert Frost)
// =========================================================================
export const FOURTH_PREPARATORY_LITERATURE: LiteratureItem[] = [
  {
    id: "4th-lit-merchant",
    title: "The Merchant of Venice",
    titleAr: "مسرحية تاجر البندقية (وليم شكسبير)",
    author: "William Shakespeare",
    authorAr: "وليم شكسبير (أعظم كتاب المسرح في العالم)",
    authorYears: "1564 - 1616",
    authorBioAr: [
      "وليم شكسبير هو أشهر شاعر وكاتب مسرحي إنكليزي، ولد في مدينة ستراتفورد على نهر إيفون.",
      "كتب 38 مسرحية خالدة تُرجمت إلى جميع لغات العالم وتدرس في المناهج العالمية والعراقية."
    ],
    genre: "Drama / Comedy & Justice",
    genreAr: "مسرحية درامية عالمية عن العدالة والرحمة والصداقة",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=1200&q=80",
    imageCaptionAr: "مشهد محكمة البندقية الشهير بين بورشا وشايلوك",
    summaryAr: "تدور المسرحية في مدينة البندقية الإيطالية؛ حيث يقترض الشاب النبيل بسانيو مالاً من صديقه التاجر الكريم أنطونيو للزواج من السيدة الحكيمة بورشا. ولأن سفن أنطونيو التجارية كانت في عرض البحر، يقترض أنطونيو المال من المرابي القاسي شايلوك بشرط غريب وقاسٍ: إذا تأخر عن السداد، يقتطع شايلوك رطلاً من لحم أنطونيو. عندما تغرق سفن أنطونيو، يطالب شايلوك بتنفيذ الشرط أمام المحكمة، فتتنكر بورشا بزي محامٍ شاب وتنقذ أنطونيو بذكاء خارق قائلة إن العقد يمنحه رطلاً من اللحم دون قطرة دم واحدة، مؤكدة أن الرحمة أسمى من الانتقام.",
    moralLessonAr: "الرحمة تعلو على العدالة الصارمة والقسوة، والصداقة الحقيقية والتضحية تتغلب على الجشع والانتقام.",
    keyThemes: ["Mercy versus Revenge", "True Selfless Friendship", "Justice and the Spirit of Law"],
    characters: [
      {
        name: "Antonio",
        nameAr: "أنطونيو (تاجر البندقية)",
        role: "The generous merchant",
        roleAr: "التاجر الكريم والمخلص لصديقه",
        description: "A wealthy, kind merchant who risks his life and signs a dangerous bond for his friend.",
        descriptionAr: "تاجر كريم مستعد للتضحية بحياته من أجل مساعدة صديقه الوفي بسانيو."
      },
      {
        name: "Shylock",
        nameAr: "شايلوك",
        role: "The vengeful moneylender",
        roleAr: "المرابي القاسي الساعي للانتقام",
        description: "Demands a pound of Antonio's flesh when the debt cannot be repaid on time.",
        descriptionAr: "مرابٍ قاسي يطالب باقتطاع رطل من لحم أنطونيو انتقاماً وكراهية."
      },
      {
        name: "Portia",
        nameAr: "بورشا",
        role: "The brilliant noble lady",
        roleAr: "السيدة الذكية التي أنقذت الموقف",
        description: "Disguises herself as a male lawyer (Balthazar) and delivers the famous speech on the quality of mercy.",
        descriptionAr: "تتنكر في زي قاضٍ ومحامٍ شاب وتلقي خطبتها التاريخية عن فضيلة الرحمة وتنقذ أنطونيو."
      },
      {
        name: "Bassanio",
        nameAr: "بسانيو",
        role: "Antonio's dearest friend",
        roleAr: "صديق أنطونيو المقرب وزوج بورشا",
        description: "A noble young man whose need for money sets the drama in motion.",
        descriptionAr: "شاب نبيل يحب بورشا ويسعى لإنقاذ صديقه أنطونيو بكل ما يملك."
      }
    ],
    ministerialQA: [
      {
        id: "4th-merch-q1",
        question: "Why did Antonio borrow money from Shylock?",
        questionAr: "لماذا اقترض أنطونيو المال من شايلوك؟",
        answer: "To help his best friend Bassanio travel to Belmont and propose to Portia.",
        answerAr: "لمساعدة صديقه الحميم بسانيو على السفر والتقدم لخطبة بورشا.",
        year: "امتحان نصف السنة"
      },
      {
        id: "4th-merch-q2",
        question: "What was Shylock's cruel condition in the bond?",
        questionAr: "ما هو شرط شايلوك القاسي في السند؟",
        answer: "A pound of Antonio's flesh if he failed to repay the loan on the exact day.",
        answerAr: "اقتطاع رطل من لحم أنطونيو إذا فشل في سداد القرض في اليوم المحدد.",
        year: "امتحان الفصل الأول"
      },
      {
        id: "4th-merch-q3",
        question: "How did Portia save Antonio's life in the Venetian court?",
        questionAr: "كيف أنقذت بورشا حياة أنطونيو في محكمة البندقية؟",
        answer: "She said the bond allows a pound of flesh but not a single drop of blood; if he sheds Christian blood, all his wealth will be confiscated.",
        answerAr: "قالت إن العقد يمنحه رطلاً من اللحم فقط دون قطرة دم واحدة، وإن أسقط قطرة دم صودرت أمواله.",
        year: "امتحان نهاية السنة"
      },
      {
        id: "4th-merch-q4",
        question: "What is Portia's famous message about mercy?",
        questionAr: "ما هي رسالة بورشا الشهيرة عن فضيلة الرحمة؟",
        answer: "Mercy is not forced; it drops like gentle rain from heaven and blesses both the giver and the receiver.",
        answerAr: "الرحمة لا تُكره، بل تهبط كالمطر الهادئ من السماء وتبارك من يمنحها ومن يتلقاها.",
        year: "امتحان نهاية الكورس الثاني"
      }
    ]
  },
  {
    id: "4th-lit-road",
    title: "The Road Not Taken",
    titleAr: "قصيدة: الطريق الذي لم يُسلك (روبرت فروست)",
    author: "Robert Frost",
    authorAr: "روبرت فروست (الشاعر الأمريكي الكبير)",
    authorYears: "1874 - 1963",
    genre: "Poetry / Reflection",
    genreAr: "قصيدة شعرية تأملية عن خيارات الحياة",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
    imageCaptionAr: "مفترق طريقين في غابة خريفية صفراء يرمز لاختيارات الإنسان",
    summaryAr: "قصيدة فلسفية شهيرة يقف فيها الشاعر عند مفترق طريقين في غابة ذات أوراق صفراء. يحتار أي الطريقين يسلك، فيختار الطريق الأقل ارتياداً وسلوكاً من قبل الناس، مؤكداً في ختام القصيدة أن هذا الاختيار الشجاع صنع كل الفارق في حياته ومصيره.",
    moralLessonAr: "الشجاعة في اتخاذ القرارات الفريدة والمستقلة، وتحمل مسؤولية اختياراتنا في الحياة.",
    keyThemes: ["Choices in Life", "Individuality and Courage", "Reflection and Fate"],
    characters: [
      {
        name: "The Traveler / Poet",
        nameAr: "المسافر / الشاعر",
        role: "The decision maker",
        roleAr: "الإنسان الواقف أمام مفترق خيارات مصيرية",
        description: "Contemplates the two diverging paths in the autumn woods and chooses the less traveled one.",
        descriptionAr: "يتأمل الطريقين المتشعبين ويختار المسار الأقل ارتياداً."
      }
    ],
    ministerialQA: [
      {
        id: "4th-frost-q1",
        question: "What does the divergence of two roads in a yellow wood symbolize?",
        questionAr: "إلى ماذا يرمز تشعب طريقين في غابة صفراء؟",
        answer: "It symbolizes the important choices and decisions a person must make in life.",
        answerAr: "يرمز إلى الخيارات والقرارات المصيرية الهامة التي يجب أن يتخذها الإنسان في حياته.",
        year: "امتحان الفصل الثاني"
      },
      {
        id: "4th-frost-q2",
        question: "Which road did the poet decide to take?",
        questionAr: "أي الطريقين قرر الشاعر أن يسلك؟",
        answer: "He chose the one that was grassy and wanted wear (the less traveled road).",
        answerAr: "اختار الطريق العشبي الأقل ارتياداً وسلوكاً من الناس.",
        year: "امتحان نهاية السنة"
      }
    ]
  }
];

// =========================================================================
// إنشاءات الرابع الإعدادي (Essays / Compositions)
// =========================================================================
export const FOURTH_PREPARATORY_ESSAYS: EssayItem[] = [
  {
    id: "4th-essay-course-app",
    unitId: 41,
    titleAr: "إنشاء الوحدة الأولى: إيميل رسمي للتقديم على دورة لغة إنكليزية (Applying for an English Course)",
    titleEn: "An Official Application for an English Summer Course",
    ministerialWeight: "15 درجة في الامتحان النهائي",
    paragraphsEn: [
      "Dear Admissions Officer,\nI am writing to inquire about the intensive English summer course offered at your esteemed institute in London for July 2025. I am currently a fourth preparatory student in Baghdad and wish to enhance my linguistic proficiency.",
      "My level of English is intermediate. I have a strong foundation in grammar, but I am particularly eager to improve my speaking fluency, academic writing, and listening comprehension in an authentic English-speaking environment.",
      "Could you please send me detailed information regarding course fees, accommodation options with host families, and visa requirements? I have attached my school academic records and passport copy for your reference.\nI look forward to hearing from you soon.\nYours sincerely,\nAhmed Kareem"
    ],
    paragraphsAr: [
      "سيدي مسؤول القبول المحترم،\nأكتب إليكم للاستفسار عن الدورة الصيفية المكثفة في اللغة الإنكليزية التي يقدمها معهدكم الموقر في لندن لشهر تموز 2025. أنا حالياً طالب في الصف الرابع الإعدادي في بغداد وأرغب في تطوير كفاءتي اللغوية.",
      "مستواي في اللغة الإنكليزية متوسط؛ ولدي أساس متين في القواعد، لكني حريص بشكل خاص على تحسين طلاقتي في المحادثة والكتابة الأكاديمية والاستيعاب السمعي في بيئة ناطقة بالإنكليزية.",
      "هل يمكنكم تزويدي بمعلومات تفصيلية حول رسوم الدورة وخيارات الإقامة مع عائلات مضيفة ومتطلبات التأشيرة؟ لقد أرفقت سجلي الدراسي المدرسي ونسخة من جواز السفر.\nأتطلع إلى تلقي ردكم قريباً.\nتفضلوا بقبول فائق الاحترام،\nأحمد كريم"
    ],
    keywords: [
      { word: "admissions officer", meaning: "مسؤول القبول والتسجيل" },
      { word: "linguistic proficiency", meaning: "الكفاءة اللغوية" },
      { word: "intermediate level", meaning: "المستوى المتوسط" },
      { word: "speaking fluency", meaning: "الطلاقة في التحدث" },
      { word: "host families", meaning: "العائلات المضيفة" }
    ],
    goldenTips: [
      "نصيحة الأستاذ مصطفى تركي: الإيميل رسمي (Formal Email)، لذا تجنب الاختصارات (لا تكتب I'm بل اكتب I am).",
      "ابدأ بـ Dear Sir/Madam أو Dear Admissions Officer واختم بـ Yours sincerely."
    ],
    clozeSentences: [
      {
        textWithBlanks: "I am writing to inquire about the English summer ______.",
        missingWord: "course",
        options: ["course", "exam", "hospital", "stadium"]
      }
    ]
  },
  {
    id: "4th-essay-wedding",
    unitId: 43,
    titleAr: "إنشاء الوحدة الثالثة: تقاليد الأعراس في العراق (Traditional Iraqi Wedding Customs)",
    titleEn: "Traditional Wedding Customs in Iraq",
    ministerialWeight: "15 درجة في الامتحان النهائي",
    paragraphsEn: [
      "Weddings in Iraq are joyous and colorful celebrations deeply rooted in cultural heritage and hospitality. Unlike Western ceremonies that last a few hours, traditional Iraqi weddings are celebrated over several days with family and friends.",
      "The festivities typically commence with the Henna night, where the bride's and groom's hands are decorated with beautiful natural henna patterns amidst singing, dancing, and trays of candles and sweets. On the wedding day, the groom's family leads a vibrant car procession to accompany the bride to the hall.",
      "Guests enjoy a magnificent feast of traditional Iraqi dishes like spiced Biryani, roasted lamb, and fresh salads. Iraqi weddings are not merely the union of two individuals, but a heartwarming gathering that strengthens communal bonds and joy."
    ],
    paragraphsAr: [
      "تعتبر الأعراس في العراق احتفالات مبهجة وملونة متجذرة بعمق في التراث الثقافي وكرم الضيافة. وخلافاً للمراسم الغربية التي تدوم بضع ساعات، فإن الأعراس العراقية التقليدية يُحتفل بها على مدى أيام متتالية وسط الأهل والأصدقاء.",
      "تبدأ الاحتفالات عادة بليلة الحناء، حيث تُزين أيدي العروسين بنقوش الحناء الطبيعية الجميلة وسط الأهازيج والرقص وصواني الشموع والحلويات. وفي يوم الزفاف، يقود موكب سيارات أهل العريس الزفة المبهجة لمرافقة العروس إلى القاعة.",
      "يستمتع الضيوف بوليمة فاخرة من الأطباق العراقية الأصيلة كالبرياني المتبل واللحم المشوي والسلطات الطازجة. إن الأعراس العراقية ليست مجرد اقتران شخصين، بل هي تجمع حميمي يوثق الروابط الاجتماعية والفرح المشترك."
    ],
    keywords: [
      { word: "joyous celebrations", meaning: "احتفالات مبهجة" },
      { word: "cultural heritage", meaning: "التراث الثقافي" },
      { word: "Henna night", meaning: "ليلة الحناء التراثية" },
      { word: "car procession", meaning: "موكب سيارات الزفة" },
      { word: "communal bonds", meaning: "الروابط الاجتماعية" }
    ],
    goldenTips: [
      "استخدم الروابط الزمنية (firstly, on the next day, finally).",
      "أبرز عناصر الكرم العراقي التقليدي (hospitality, delicious food, Henna)."
    ],
    clozeSentences: [
      {
        textWithBlanks: "Iraqi weddings commence with the traditional ______ night.",
        missingWord: "Henna",
        options: ["Henna", "Exam", "Football", "Winter"]
      }
    ]
  },
  {
    id: "4th-essay-marshes",
    unitId: 46,
    titleAr: "إنشاء الوحدة السادسة: حماية البيئة وأهوار العراق (Protecting the Mesopotamian Marshes)",
    titleEn: "Protecting the Iraqi Marshes and Wildlife",
    ministerialWeight: "15 درجة في الامتحان النهائي",
    paragraphsEn: [
      "The Mesopotamian Marshes in southern Iraq are one of the world's most unique ecological wetlands and a recognized UNESCO World Heritage Site. They are home to rare species of fish, water buffalos, and millions of migratory birds flying between Siberia and Africa.",
      "However, climate change, drought, and water shortages currently pose a grave danger to this delicate ecosystem. Water levels have dropped dramatically, threatening the livelihoods of Marsh Arabs who have lived in harmony with the wetlands for thousands of years.",
      "To protect this natural treasure, strict environmental regulations must be enforced. We must secure fair water shares, prevent pollution, and promote eco-tourism so that future generations can cherish Iraq's legendary marshes."
    ],
    paragraphsAr: [
      "تعتبر أهوار بلاد الرافدين في جنوب العراق واحدة من أندر النظم البيئية الرطبة في العالم وموقعاً مدرجاً على لائحة التراث العالمي لليونسكو. وهي موطن لأنواع نادرة من الأسماك وجواميس الماء وملايين الطيور المهاجرة بين سيبيريا وإفريقيا.",
      "ومع ذلك، فإن التغير المناخي والجفاف وشح المياه تشكل حالياً خطراً جسيماً على هذا النظام البيئي الدقيق. لقد انخفضت مناسيب المياه بشكل كبير مما يهدد معيشة عرب الأهوار الذين عاشوا في انسجام مع الأهوار لآلاف السنين.",
      "ولحماية هذا الكنز الطبيعي، يجب فرض تشريعات بيئية صارمة. وعلينا ضمان حصص مائية عادلة ومنع التلوث وتشجيع السياحة البيئية لتتمكن الأجيال القادمة من الاعتزاز بأهوار العراق الأسطورية."
    ],
    keywords: [
      { word: "ecological wetlands", meaning: "الأراضي الرطبة البيئية" },
      { word: "UNESCO World Heritage", meaning: "التراث العالمي لليونسكو" },
      { word: "migratory birds", meaning: "الطيور المهاجرة" },
      { word: "delicate ecosystem", meaning: "نظام بيئي دقيق" },
      { word: "eco-tourism", meaning: "السياحة البيئية المستدامة" }
    ],
    goldenTips: [
      "استخدم صيغ المبني للمجهول: must be protected, are recognized, must be enforced لتبدو لغتك أكاديمية ورصينة."
    ],
    clozeSentences: [
      {
        textWithBlanks: "The Iraqi marshes are a recognized UNESCO World ______ Site.",
        missingWord: "Heritage",
        options: ["Heritage", "Stadium", "Hospital", "Factory"]
      }
    ]
  }
];

// =========================================================================
// بنك أسئلة امتحانات الرابع الإعدادي
// =========================================================================
export const FOURTH_PREPARATORY_QUESTIONS: MinisterialExamQuestion[] = [
  {
    id: "4th-exam-q1",
    unitId: 41,
    topic: "Stative Verbs",
    year: "امتحان نصف السنة 2024",
    session: "دور أول",
    questionText: "I ______ (know) the correct answer right now. (know / am knowing / was knowing)",
    correctAnswer: "know",
    ruleExplanation: "الفعل know من أفعال الحالة (stative verb) ولا يقبل صيغة الاستمرار ing حتى مع وجود now.",
    difficulty: "medium",
    category: "Grammar"
  },
  {
    id: "4th-exam-q2",
    unitId: 41,
    topic: "Indirect Questions",
    year: "امتحان الفصل الأول 2024",
    session: "دور أول",
    questionText: "Could you tell me where ______? (is the bank / the bank is)",
    correctAnswer: "the bank is",
    ruleExplanation: "في السؤال غير المباشر المهذب، يتقدم الفاعل the bank على الفعل المساعد is.",
    difficulty: "medium",
    category: "Grammar"
  },
  {
    id: "4th-exam-q3",
    unitId: 42,
    topic: "Used to for past habits",
    year: "امتحان نصف السنة",
    session: "دور أول",
    questionText: "They didn't ______ (use to / used to) travel abroad, but now they do.",
    correctAnswer: "use to",
    ruleExplanation: "بعد didn't نستخدم الصيغة المجردة use to بدون حرف d.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "4th-exam-q4",
    unitId: 43,
    topic: "Relative Clauses whose vs who",
    year: "امتحان نهاية الكورس الأول",
    session: "دور أول",
    questionText: "This is the student ______ painting won the gold medal. (whose / who / which)",
    correctAnswer: "whose",
    ruleExplanation: "اللوحة (painting) تعود ملكيتها للطالب (student)، لذا نستخدم ضمير الوصل للتملك whose.",
    difficulty: "medium",
    category: "Grammar"
  },
  {
    id: "4th-exam-q5",
    unitId: 45,
    topic: "Modals of Obligation",
    year: "امتحان الفصل الثاني",
    session: "دور أول",
    questionText: "You ______ smoke inside the petrol station; it causes explosions. (mustn't / don't have to / need to)",
    correctAnswer: "mustn't",
    ruleExplanation: "تحريم ومنع قاطع وخطير جداً يقتضي استخدام mustn't.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "4th-exam-q6",
    unitId: 46,
    topic: "Modal Passive",
    year: "امتحان نهاية السنة 2024",
    session: "دور أول",
    questionText: "Our planet can ______ (save) if we reduce pollution. [Passive]",
    correctAnswer: "be saved",
    ruleExplanation: "بعد الفعل الناقص can في المبني للمجهول نستخدم be + التصريف الثالث saved.",
    difficulty: "medium",
    category: "Grammar"
  },
  {
    id: "4th-exam-q7",
    unitId: 47,
    topic: "Conditionals with Unless",
    year: "امتحان نهاية السنة",
    session: "دور أول",
    questionText: "Unless he studies hard, he ______ (not pass) the exam.",
    correctAnswer: "will not pass",
    ruleExplanation: "الحالة الشرطية الأولى مع unless، جواب الشرط يكون مستقبلاً منفياً will not pass (won't pass).",
    difficulty: "hard",
    category: "Grammar"
  },
  {
    id: "4th-exam-q8",
    unitId: 41,
    topic: "Literature - The Merchant of Venice",
    year: "امتحان نهاية السنة",
    session: "دور أول",
    questionText: "Who saved Antonio's life in the Venetian court and how?",
    correctAnswer: "Portia disguised as a lawyer, by stating the bond grants a pound of flesh but no blood.",
    ruleExplanation: "أنقذته بورشا متنكرة بزي محامٍ عبر إثبات أن العقد يمنحه لحماً فقط بدون قطرة دم.",
    difficulty: "medium",
    category: "Literature"
  }
];

// =========================================================================
// نموذج الامتحان الشامل للرابع الإعدادي (Mock Exam Paper)
// =========================================================================
export const FOURTH_PREPARATORY_MOCK_PAPER: MockExamPaper = {
  id: "4th-full-mock-paper-2025",
  title: "امتحان نهاية السنة الشامل • الرابع الإعدادي (اعتماداً على أسئلة 2020 إلى 2026)",
  subtitle: "إشراف الأستاذ مصطفى تركي • الاعتماد الحصري على كتاب الطالب (Student's Book) وكتاب النشاط (Activity Book)",
  session: "الدور الأول • العلمي والأدبي (2020-2026)",
  year: "2020 - 2026",
  durationMinutes: 180,
  totalMarks: 100,
  sections: [
    {
      id: "sec-1",
      sectionCode: "Q1-A",
      titleAr: "السؤال الأول (أ): القطعة الخارجية المستوعبة",
      titleEn: "Question 1 (A): Reading Comprehension - Unseen Passage",
      instructionsAr: "اقرأ القطعة بعناية ثم أجب عن الأسئلة التالية:",
      instructionsEn: "Read the passage carefully, then answer the questions below:",
      totalMarks: 20,
      unseenPassage: "In our rapidly changing modern era, communication technology has transformed human society into a connected global village. Just a century ago, sending a message between Baghdad and London required weeks by steamship and postal carriages. Today, high-speed fiber-optic cables running beneath the world\x27s oceans carry trillions of data packets in milliseconds. However, while social media and smartphones allow instant connection, psychologists warn that excessive screen time reduces face-to-face interaction and affects teenagers\x27 attention spans. To maintain healthy communication, people must balance digital technology with real personal relationships.",
      items: [
        {
          id: "4th-mock-q1-1",
          number: 1,
          questionText: "How has technology changed human society according to the text?",
          type: "choice",
          options: ["It has transformed society into a connected global village", "It has isolated people completely", "It stopped communication"],
          correctAnswer: "It has transformed society into a connected global village",
          alternativeAnswers: ["Connected global village"],
          explanation: "السطر الأول: حولت التكنولوجيا المجتمع إلى قرية عالمية متصلة.",
          maxScore: 4
        },
        {
          id: "4th-mock-q1-2",
          number: 2,
          questionText: "How were messages sent between Baghdad and London a century ago?",
          type: "choice",
          options: ["By steamships and postal carriages requiring weeks", "By instant internet", "By airplanes in hours"],
          correctAnswer: "By steamships and postal carriages requiring weeks",
          alternativeAnswers: ["Steamship and postal carriages"],
          explanation: "كانت تتطلب أسابيع بالبواخر وعربات البريد.",
          maxScore: 4
        },
        {
          id: "4th-mock-q1-3",
          number: 3,
          questionText: "Where are the high-speed fiber-optic cables located?",
          type: "choice",
          options: ["Running beneath the world\x27s oceans", "In space satellites only", "Inside televisions"],
          correctAnswer: "Running beneath the world\x27s oceans",
          alternativeAnswers: ["Beneath the world\x27s oceans"],
          explanation: "ممتدة في قيعان المحيطات حول العالم.",
          maxScore: 4
        },
        {
          id: "4th-mock-q1-4",
          number: 4,
          questionText: "Excessive screen time has no negative effects on teenagers. (True / False)",
          type: "choice",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "خطأ؛ يحذر علماء النفس من أنه يقلل التواصل المباشر ويؤثر على الانتباه.",
          maxScore: 4
        },
        {
          id: "4th-mock-q1-5",
          number: 5,
          questionText: "What must people do to maintain healthy communication?",
          type: "choice",
          options: ["Balance digital technology with real personal relationships", "Throw away their phones", "Stop talking to anyone"],
          correctAnswer: "Balance digital technology with real personal relationships",
          alternativeAnswers: ["Balance digital technology with real personal relationships"],
          explanation: "الموازنة بين التكنولوجيا الرقمية والعلاقات الشخصية الحقيقية.",
          maxScore: 4
        }
      ]
    },
    {
      id: "sec-2",
      sectionCode: "Q2",
      titleAr: "السؤال الثاني: القواعد والوظائف اللغوية",
      titleEn: "Question 2: Grammar & Functions",
      instructionsAr: "اختر الجواب الصحيح أو أجب وفق ما هو مطلوب:",
      instructionsEn: "Choose the correct option or do as required between brackets:",
      totalMarks: 30,
      items: [
        {
          id: "4th-mock-q2-1",
          number: 1,
          questionText: "Could you tell me where ______? (is the library / the library is)",
          type: "choice",
          options: ["the library is", "is the library"],
          correctAnswer: "the library is",
          explanation: "سؤال مهذب غير مباشر يتقدم فيه الفاعل the library على الفعل is.",
          maxScore: 5
        },
        {
          id: "4th-mock-q2-2",
          number: 2,
          questionText: "He ______ (use to / play) tennis, but now he prefers swimming. [Used to]",
          type: "choice",
          options: ["used to play", "use to play", "was playing"],
          correctAnswer: "used to play",
          explanation: "عادة ماضية مع used to والمصدر play.",
          maxScore: 5
        },
        {
          id: "4th-mock-q2-3",
          number: 3,
          questionText: "The architect ______ designed the new bridge won an international award. (who / which / whose)",
          type: "choice",
          options: ["who", "which", "whose"],
          correctAnswer: "who",
          explanation: "المهندس شخص عاقل يأخذ ضمير الوصل who.",
          maxScore: 5
        },
        {
          id: "4th-mock-q2-4",
          number: 4,
          questionText: "You ______ take photos inside the military base; it is strictly illegal. (mustn\x27t / don\x27t have to / need to)",
          type: "choice",
          options: ["mustn\x27t", "don\x27t have to", "need to"],
          correctAnswer: "mustn\x27t",
          explanation: "ممنوع قانونياً بشكل صارم يقتضي استخدام mustn\x27t.",
          maxScore: 5
        },
        {
          id: "4th-mock-q2-5",
          number: 5,
          questionText: "The new highway will ______ (open) by the Prime Minister next month. [Passive]",
          type: "choice",
          options: ["be opened", "opened", "be open"],
          correctAnswer: "be opened",
          explanation: "مبني للمجهول في المستقبل بعد will: will be opened.",
          maxScore: 5
        },
        {
          id: "4th-mock-q2-6",
          number: 6,
          questionText: "Unless you ______ (work) hard, you won\x27t achieve your academic goals.",
          type: "choice",
          options: ["work", "don\x27t work", "worked"],
          correctAnswer: "work",
          explanation: "بعد unless نستخدم مضارعاً بسيطاً مثبتاً work.",
          maxScore: 5
        }
      ]
    },
    {
      id: "sec-3",
      sectionCode: "Q3",
      titleAr: "السؤال الثالث: المفردات والتوصيل والإملاء",
      titleEn: "Question 3: Vocabulary & Spelling",
      instructionsAr: "أجب عن أسئلة المفردات والإملاء:",
      instructionsEn: "Answer the vocabulary and spelling questions:",
      totalMarks: 20,
      items: [
        {
          id: "4th-mock-q3-1",
          number: 1,
          questionText: "A person who translates spoken words from one language to another is an ______.",
          type: "choice",
          options: ["interpreter", "architect", "engineer"],
          correctAnswer: "interpreter",
          explanation: "المترجم الفوري الشفوي يسمى interpreter.",
          maxScore: 5
        },
        {
          id: "4th-mock-q3-2",
          number: 2,
          questionText: "agree -> disagree ; legal -> ______ [Spelling / Prefix]",
          type: "choice",
          options: ["illegal", "unlegal", "dislegal"],
          correctAnswer: "illegal",
          explanation: "بادئة النفي للكلمات البادئة بحرف l هي il- فتصبح illegal.",
          maxScore: 5
        },
        {
          id: "4th-mock-q3-3",
          number: 3,
          questionText: "The official languages of Canada are ______ and ______.",
          type: "choice",
          options: ["English and French", "English and Spanish", "French and German"],
          correctAnswer: "English and French",
          explanation: "اللغتان الرسميتان لكندا هما الإنكليزية والفرنسية.",
          maxScore: 5
        },
        {
          id: "4th-mock-q3-4",
          number: 4,
          questionText: "invent -> invention ; communicate -> ______ [Spelling]",
          type: "choice",
          options: ["communication", "communicating", "communicator"],
          correctAnswer: "communication",
          explanation: "الاسم المشتق من الفعل communicate هو communication.",
          maxScore: 5
        }
      ]
    },
    {
      id: "sec-4",
      sectionCode: "Q4",
      titleAr: "السؤال الرابع: الأدب والنصوص المقررة",
      titleEn: "Question 4: Literature Focus",
      instructionsAr: "أجب عن الأسئلة الأدبية حول تاجر البندقية وروبرت فروست:",
      instructionsEn: "Answer the questions about the prescribed literature texts:",
      totalMarks: 10,
      items: [
        {
          id: "4th-mock-q4-1",
          number: 1,
          questionText: "In \x27The Merchant of Venice\x27, what was Shylock\x27s bond?",
          type: "choice",
          options: [
            "A pound of Antonio\x27s flesh",
            "Ten thousand gold coins",
            "Antonio\x27s ship"
          ],
          correctAnswer: "A pound of Antonio\x27s flesh",
          explanation: "رطل من لحم أنطونيو إذا عجز عن السداد.",
          maxScore: 5
        },
        {
          id: "4th-mock-q4-2",
          number: 2,
          questionText: "In Robert Frost\x27s \x27The Road Not Taken\x27, which road did the poet take?",
          type: "choice",
          options: [
            "The road less traveled by",
            "The crowded main road",
            "He turned back home"
          ],
          correctAnswer: "The road less traveled by",
          explanation: "اختار الطريق الأقل ارتياداً وسلوكاً من الناس.",
          maxScore: 5
        }
      ]
    }
  ],
  essayOptions: [
    {
      id: "4th-essay-opt-a",
      optionLetter: "A",
      titleEn: "Traditional Wedding Customs in Iraq",
      titleAr: "عادات وتقاليد الأعراس في العراق (الوحدة الأولى)",
      prompt: "Write a composition about traditional wedding customs in Iraq, including the preparations, the Henna night, and the wedding day celebration.",
      suggestedModel: "Weddings in Iraq are joyful community celebrations rich in ancient traditions and family warmth. Unlike brief ceremonies in the West, Iraqi weddings usually last for several days. Before the wedding, the bride and groom\x27s families meet for the formal agreement. One of the most cherished rituals is the Henna night, where women gather to sing traditional folklore songs and decorate the bride\x27s hands with delicate patterns. On the wedding day, a grand convoy of cars decorated with flowers escorts the newlyweds to the banquet hall, where delicious feasts such as Qouzi and Dolma are served to hundreds of guests.",
      keywords: ["Henna night", "traditions", "family warmth", "grand convoy", "banquet hall", "Qouzi"],
      maxScore: 20
    },
    {
      id: "4th-essay-opt-b",
      optionLetter: "B",
      titleEn: "Protecting the Mesopotamian Marshes",
      titleAr: "حماية أهوار العراق والتنوع البيئي (الوحدة السابعة)",
      prompt: "Write a composition about the importance of protecting the Mesopotamian Marshes in southern Iraq and preserving their natural wildlife.",
      suggestedModel: "The Mesopotamian marshes in southern Iraq are among the most remarkable wetland ecosystems on Earth, recognized as a UNESCO World Heritage site. These wetlands are home to millions of migratory birds, unique fish species, and water buffalo herds that sustain the local Marsh Arab culture. However, climate change, severe droughts, and upstream dam construction threaten this natural treasure. To preserve the marshes for future generations, strict environmental laws must be enforced, and water management projects must ensure adequate water flow into the marsh basin.",
      keywords: ["UNESCO World Heritage", "migratory birds", "wetland ecosystem", "water management", "climate change"],
      maxScore: 20
    }
  ]
};
