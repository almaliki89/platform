import { Unit, LiteratureItem, EssayItem, MinisterialExamQuestion } from '../../types';
import { MockExamPaper } from '../mockExamPapers';

// =========================================================================
// وحدات الأول المتوسط - منهج English for Iraq (1st Intermediate)
// =========================================================================
export const FIRST_INTERMEDIATE_UNITS: Unit[] = [
  {
    id: 11,
    number: 1,
    titleAr: "الوحدة الأولى: العطلات والأزمنة البسيطة (Holidays & Past Time)",
    titleEn: "Unit 1: Holidays, Richard in Iraq & Free Time",
    description: "الماضي البسيط والماضي المستمر، الأفعال الشاذة والقياسية، ضمائر الملكية، واستيعاب قصة ريتشارد في العراق (Richard in Iraq).",
    accentColor: "from-emerald-600 to-teal-600",
    bgGradient: "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200",
    lessons: [
      {
        id: "1st-u1-l1",
        unitId: 11,
        lessonNumber: 1,
        titleAr: "الدرس الأول: زمن الماضي البسيط (Past Simple Tense)",
        titleEn: "Lesson 1: Past Simple Tense (Regular & Irregular)",
        category: "grammar",
        summary: "التعبير عن أحداث وقعت وانتهت في الماضي، واستخدام الأفعال القياسية والغير قياسية (الشاذة).",
        grammarRuleFormula: "Affirmative (المثبت):\nSubject + Verb(-ed / Irregular) + Complement\nNegative (المنفي):\nSubject + didn't + base verb\nQuestion (السؤال):\nDid + Subject + base verb...?",
        detailedContent: [
          "يستخدم زمن الماضي البسيط للتعبير عن أحداث وقعت في الماضي وانتهت تماماً.",
          "الأفعال القياسية (Regular verbs) تنتهي بـ (ed) مثل: play -> played, visit -> visited.",
          "الأفعال الشاذة (Irregular verbs) تتغير جذرياً مثل: go -> went, see -> saw, buy -> bought.",
          "في النفي نستخدم didn't ويعود الفعل إلى مصدره المجرد: He didn't go (وليس didn't went).",
          "الظروف الدالة على الماضي: yesterday (أمس), last week/month/year (الماضي), ago (مضت)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه جداً! بعد (didn't) و (Did) يرجع الفعل إلى أصله ومصدره الخالي من أي إضافة.",
          "تنبيه امتحاني: احفظ تصاريف الأفعال الشاذة الأكثر تكراراً: do -> did, have -> had, take -> took."
        ],
        commonMistakes: [
          "كتابة He didn't went (الصحيح He didn't go).",
          "إضافة ed إلى فعل شاذ مثل goed (الصحيح went)."
        ],
        examples: [
          {
            en: "Richard went to the ancient city of Ur last week.",
            ar: "ذهب ريتشارد إلى مدينة أور الأثرية الأسبوع الماضي.",
            highlight: "went",
            note: "فعل ماضٍ شاذ من go"
          },
          {
            en: "We didn't stay at a hotel; we camped in the desert.",
            ar: "لم نمكث في فندق؛ بل خيمنا في الصحراء.",
            highlight: "didn't stay",
            note: "نفي في الماضي ومصدر مجرد"
          }
        ],
        exercises: [
          {
            id: "1u1-ex1",
            question: "Ahmed ______ (visit) his grandparents in Basra yesterday.",
            options: ["visited", "visits", "is visiting", "visit"],
            correctAnswer: "visited",
            explanation: "وجود ظرف الماضي yesterday يفرض استخدام الفعل الماضي القياسي visited.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الأول"
          },
          {
            id: "1u1-ex2",
            question: "They didn't ______ to the market last night. (go / went / going)",
            options: ["go", "went", "going", "goes"],
            correctAnswer: "go",
            explanation: "بعد didn't نستخدم دائماً المصدر المجرد go.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          }
        ]
      },
      {
        id: "1st-u1-l2",
        unitId: 11,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: زمن الماضي المستمر (Past Continuous Tense)",
        titleEn: "Lesson 2: Past Continuous Tense",
        category: "grammar",
        summary: "التعبير عن حدث كان مستمراً في لحظة محددة في الماضي باستخدام was / were + verb-ing.",
        grammarRuleFormula: "Subject (I, He, She, It) + was + V-ing\nSubject (We, You, They) + were + V-ing\nNegative: was not (wasn't) / were not (weren't) + V-ing",
        detailedContent: [
          "يستخدم الماضي المستمر لبيان أن حدثاً كان في طور الحدوث والاستمرار في زمن الماضي.",
          "نستخدم was مع ضمائر المفرد (I, He, She, It والأسماء المفردة).",
          "نستخدم were مع ضمائر الجمع (We, You, They وأسماء الجمع).",
          "إضافة ing للفعل: إذا انتهى الفعل بـ e نحذفها قبل إضافة ing (write -> writing)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تذكر أن I تأخذ was في الماضي المستمر: I was reading.",
          "السؤال يبدأ بـ Was أو Were: Were you sleeping when I called?"
        ],
        commonMistakes: [
          "استخدام was مع الجمع: They was playing (الصحيح They were playing).",
          "نسيان ing بعد was أو were."
        ],
        examples: [
          {
            en: "Mona was reading a story at 7 PM yesterday.",
            ar: "كانت منى تقرأ قصة في الساعة السابعة مساء أمس.",
            highlight: "was reading",
            note: "ماضٍ مستمر للمفرد"
          },
          {
            en: "The boys were playing football in the park.",
            ar: "كان الأولاد يلعبون كرة القدم في المتنزه.",
            highlight: "were playing",
            note: "ماضٍ مستمر للجمع"
          }
        ],
        exercises: [
          {
            id: "1u1-ex3",
            question: "While Ali was walking, the birds ______ (sing) sweetly.",
            options: ["were singing", "was singing", "sing", "sang"],
            correctAnswer: "were singing",
            explanation: "فاعل الجمع (birds) يأخذ were + v-ing في الماضي المستمر.",
            type: "mcq",
            ministerialYear: "امتحان شهري"
          }
        ]
      }
    ]
  },
  {
    id: 12,
    number: 2,
    titleAr: "الوحدة الثانية: الفصول والطقس والمستقبل (Seasons & Weather)",
    titleEn: "Unit 2: Seasons, Months & Future Simple",
    description: "فصول السنة الأربعة، أسماء الأشهر، الأعداد الترتيبية وتاريخ الأيام، وقواعد المستقبل البسيط باستخدام will.",
    accentColor: "from-sky-600 to-blue-600",
    bgGradient: "bg-gradient-to-r from-sky-50 to-blue-50 border-sky-200",
    lessons: [
      {
        id: "1st-u2-l1",
        unitId: 12,
        lessonNumber: 1,
        titleAr: "الدرس الأول: زمن المستقبل البسيط مع (will / won't)",
        titleEn: "Lesson 1: Future Simple with will / won't",
        category: "grammar",
        summary: "التنبؤ بالأحداث والطقس في المستقبل باستخدام will والمصدر المجرد.",
        grammarRuleFormula: "(+) Subject + will ('ll) + base verb\n(-) Subject + will not (won't) + base verb\n(?) Will + Subject + base verb...?",
        detailedContent: [
          "نستخدم will للتنبؤ بحالة الطقس أو أحداث المستقبل: It will be sunny tomorrow.",
          "اختصار will هو ('ll) واختصار will not هو (won't).",
          "بعد will و won't يأتي دائماً فعل مجرد (infinitive) بدون أي زيادة.",
          "الظروف الدالة: tomorrow (غداً), next week (الأسبوع القادم), in the future (في المستقبل)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه لاختصار won't، يُطلب كثيراً في سؤال الإملاء: will not = won't.",
          "الطقس في العراق: In summer, it is hot and dry. In winter, it is cold and rainy."
        ],
        commonMistakes: [
          "وضع s الشخص الثالث بعد will مثل: It will rains (الصحيح It will rain).",
          "كتابة willn't بدلاً من won't."
        ],
        examples: [
          {
            en: "It will be cold and cloudy in Baghdad tomorrow.",
            ar: "سيكون الطقس بارداً وغائماً في بغداد غداً.",
            highlight: "will be",
            note: "تنبؤ مستقبلي بالمصدر be"
          },
          {
            en: "It won't rain next Sunday.",
            ar: "لن تمطر يوم الأحد القادم.",
            highlight: "won't rain",
            note: "نفي المستقبل"
          }
        ],
        exercises: [
          {
            id: "1u2-ex1",
            question: "It ______ (rain) tomorrow in northern Iraq. (Use future with will)",
            options: ["will rain", "rains", "rained", "is raining"],
            correctAnswer: "will rain",
            explanation: "وجود tomorrow يقتضي استخدام صيغة المستقبل البسيط will + rain.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الأول"
          }
        ]
      }
    ]
  },
  {
    id: 13,
    number: 3,
    titleAr: "الوحدة الثالثة: المضارع التام البسيط (Present Perfect Simple)",
    titleEn: "Unit 3: Great Activities & Present Perfect",
    description: "قواعد المضارع التام مع have/has والتصريف الثالث للفعل، والأنشطة والمهام اليومية.",
    accentColor: "from-amber-600 to-orange-600",
    bgGradient: "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200",
    lessons: [
      {
        id: "1st-u3-l1",
        unitId: 13,
        lessonNumber: 1,
        titleAr: "الدرس الأول: زمن المضارع التام (Present Perfect Tense)",
        titleEn: "Lesson 1: Present Perfect Tense (have / has + P.P.)",
        category: "grammar",
        summary: "التعبير عن تجارب وأحداث وقعت في الماضي ولها أثر في الحاضر.",
        grammarRuleFormula: "Subject (I, We, You, They) + have ('ve) + Past Participle (P.P.)\nSubject (He, She, It) + has ('s) + Past Participle (P.P.)\nNegative: haven't / hasn't + P.P.",
        detailedContent: [
          "يستخدم المضارع التام للتعبير عن حدث تم في وقت غير محدد أو له نتيجة واضحة الآن.",
          "نستخدم have مع I وضمائر الجمع، ونستخدم has مع ضمائر المفرد (He, She, It).",
          "الفعل بعد have / has يكون بالتصريف الثالث (Past Participle - P.P.).",
          "أمثلة التصاريف: clean -> cleaned, finish -> finished, write -> written, see -> seen, eat -> eaten."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: مفتاح الحل هو معرفة التصريف الثالث للفعل بعد have أو has.",
          "في السؤال نقدّم الأداة: Have you ever visited Babylon?"
        ],
        commonMistakes: [
          "وضع فعل ماضٍ بسيط بعد has مثل: He has went (الصحيح He has gone).",
          "استخدام have مع He أو She."
        ],
        examples: [
          {
            en: "Fatima has tidied her bedroom.",
            ar: "رتبت فاطمة غرفتها نومها.",
            highlight: "has tidied",
            note: "مفرد + has + تصريف ثالث"
          },
          {
            en: "We have finished our homework.",
            ar: "لقد أنهينا واجبنا المنزلي.",
            highlight: "have finished",
            note: "جمع + have + تصريف ثالث"
          }
        ],
        exercises: [
          {
            id: "1u3-ex1",
            question: "Sami has ______ (write) a nice poem in English.",
            options: ["written", "wrote", "writes", "writing"],
            correctAnswer: "written",
            explanation: "بعد الفعل المساعد has نستخدم التصريف الثالث للفعل وهو written.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          }
        ]
      }
    ]
  },
  {
    id: 15,
    number: 5,
    titleAr: "الوحدة الخامسة: البلدان الأخرى وتفضيل الصفات (Other Countries)",
    titleEn: "Unit 5: Other Countries, Comparative & Superlative",
    description: "زيارة البلدان (France, India, Oman, Japan)، المقارنة والتفضيل للصفات، والفرق الحاسم بين have been و have gone.",
    accentColor: "from-purple-600 to-indigo-600",
    bgGradient: "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200",
    lessons: [
      {
        id: "1st-u5-l1",
        unitId: 15,
        lessonNumber: 1,
        titleAr: "الدرس الأول: درجات المقارنة والتفضيل (Comparative & Superlative)",
        titleEn: "Lesson 1: Comparative & Superlative Adjectives",
        category: "grammar",
        summary: "إضافة er و est للصفات القصيرة، واستخدام more و most للصفات الطويلة لمقارنة البلدان والأشياء.",
        grammarRuleFormula: "Short Adjectives (مقطع واحد):\nComparative: adj + -er + than (older than, bigger than)\nSuperlative: the + adj + -est (the oldest, the biggest)\n\nLong Adjectives (أكثر من مقطع):\nComparative: more + adj + than (more beautiful than)\nSuperlative: the most + adj (the most beautiful)",
        detailedContent: [
          "الصفة ذات المقطع الصوتي الواحد نضيف لها (er) في المقارنة و (est) في التفضيل.",
          "إذا انتهت الصفة بحرف صحيح مسبوق بحرف علة نضاعف الحرف الأخير: big -> bigger -> the biggest.",
          "إذا انتهت بـ y نقلبها إلى i: dry -> drier -> the driest.",
          "الصفات الطويلة (مقطعان أو أكثر) نستخدم معها more / the most: interesting -> more interesting -> the most interesting.",
          "الصفات الشاذة: good -> better -> the best, bad -> worse -> the worst."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: إذا وجدت كلمة (than) بالجملة فاختر صيغة المقارنة (-er أو more).",
          "إذا وجدت أداة التعريف (the) قبل الفراغ فاختر صيغة التفضيل (-est أو most)."
        ],
        commonMistakes: [
          "كتابة more bigger (خطأ جمع طريقتين؛ الصحيح bigger فقط).",
          "نسيان مضاعفة الحرف الأخير في big و hot: bigger, hotter."
        ],
        examples: [
          {
            en: "India is bigger than Oman.",
            ar: "الهند أكبر من عُمان.",
            highlight: "bigger than",
            note: "مقارنة بين بلدين بصفة قصيرة"
          },
          {
            en: "Mount Everest is the highest mountain in the world.",
            ar: "جبل إيفرست هو أعلى جبل في العالم.",
            highlight: "the highest",
            note: "تفضيل مطلق مع the و est"
          }
        ],
        exercises: [
          {
            id: "1u5-ex1",
            question: "France is ______ (small) than India.",
            options: ["smaller", "smallest", "more small", "most small"],
            correctAnswer: "smaller",
            explanation: "وجود than يقتضي صيغة المقارنة smaller بإضافة er للصفة ذات المقطع الواحد.",
            type: "mcq",
            ministerialYear: "امتحان نهاية الكورس الثاني"
          }
        ]
      },
      {
        id: "1st-u5-l2",
        unitId: 15,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: الفرق الجوهري بين (have been) و (have gone)",
        titleEn: "Lesson 2: Have been vs Have gone",
        category: "grammar",
        summary: "التمييز بين من زار مكاناً وعاد منه (been) وبين من ذهب ولم يعد بعد (gone).",
        grammarRuleFormula: "have / has been to = ذهب إلى المكان وعاد منه (موجود هنا الآن)\nhave / has gone to = ذهب إلى المكان ولم يعد بعد (لا يزال هناك)",
        detailedContent: [
          "نستخدم been عندما يكون الشخص قد زار مكاناً ورجع منه إلى بلده أو بيته.",
          "نستخدم gone عندما يسافر الشخص ولا يزال متواجداً في ذلك المكان ولم يرجع حتى هذه اللحظة.",
          "أمثلة منهجية: Mr. Hazim has gone to London. He is in London now.",
          "Jassim is back in Iraq now; he has been to England."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: ابحث عن عبارات مثل (He is not here / He is away) -> اختر gone.",
          "إذا وجدت (He is back / He is at home) -> اختر been."
        ],
        commonMistakes: [
          "اختيار gone لشخص يتحدث معك وجهاً لوجه عن رحلته السابقة (الصحيح been)."
        ],
        examples: [
          {
            en: "My uncle has gone to Dubai; he will return next month.",
            ar: "ذهب عمي إلى دبي؛ وسيعود الشهر القادم.",
            highlight: "has gone to",
            note: "ذهب ولم يعد بعد"
          },
          {
            en: "Have you ever been to Spain? Yes, I was there last year.",
            ar: "هل زرت إسبانيا من قبل؟ نعم، كنت هناك العام الماضي.",
            highlight: "been to",
            note: "زار وعاد"
          }
        ],
        exercises: [
          {
            id: "1u5-ex2",
            question: "Jassim is not here at the moment. He has ______ to the bank.",
            options: ["gone", "been", "go", "went"],
            correctAnswer: "gone",
            explanation: "جاسم ليس موجوداً الآن (is not here) مما يعني أنه ذهب ولم يعد بعد، فنختار gone.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          }
        ]
      }
    ]
  },
  {
    id: 16,
    number: 6,
    titleAr: "الوحدة السادسة: اليابان وصديق المراسلة يوكي (Meet Yuki)",
    titleEn: "Unit 6: Yuki's Letter & Future Continuous",
    description: "وصف الأشخاص ومظهرهم الخارجي، زمن المستقبل المستمر (will be + v-ing)، وثقافة اليابان من خلال رسالة يوكي.",
    accentColor: "from-rose-600 to-pink-600",
    bgGradient: "bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200",
    lessons: [
      {
        id: "1st-u6-l1",
        unitId: 16,
        lessonNumber: 1,
        titleAr: "الدرس الأول: زمن المستقبل المستمر (Future Continuous Tense)",
        titleEn: "Lesson 1: Future Continuous (will be + verb-ing)",
        category: "grammar",
        summary: "التعبير عن فعل سيكون في طور الحدوث والاستمرار في وقت محدد في المستقبل.",
        grammarRuleFormula: "(+) Subject + will be + Verb-ing\n(-) Subject + won't be + Verb-ing\n(?) Will + Subject + be + Verb-ing...?",
        detailedContent: [
          "يستخدم للتأكيد على أن الحدث سيكون مستمراً في نقطة زمنية معينة في المستقبل.",
          "الصيغة: الفاعل + will be + الفعل مضافاً له ing.",
          "مثال شهير في رسالة يوكي: You will recognize my father easily. He will be wearing a dark suit.",
          "مثال: At 7 o'clock tonight, I will be doing my homework."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تذكر أن be ثابتة بعد will، ثم نضيف ing للفعل الرئيسي."
        ],
        commonMistakes: [
          "نسيان be وكتابة: will wearing (الصحيح will be wearing)."
        ],
        examples: [
          {
            en: "Yuki will be waiting for Fuad at the airport in Tokyo.",
            ar: "سيكون يوكي منتظراً لفؤاد في المطار في طوكيو.",
            highlight: "will be waiting",
            note: "مستقبل مستمر"
          }
        ],
        exercises: [
          {
            id: "1u6-ex1",
            question: "At 9 PM tomorrow, we will ______ (watch) the football match.",
            options: ["be watching", "watched", "watches", "watch"],
            correctAnswer: "be watching",
            explanation: "في زمن المستقبل المستمر بعد will نحتاج إلى be + v-ing.",
            type: "mcq",
            ministerialYear: "امتحان شهري"
          }
        ]
      }
    ]
  },
  {
    id: 17,
    number: 7,
    titleAr: "الوحدة السابعة: التعليمات والسلامة والضمائر الانعكاسية (Instructions & Safety)",
    titleEn: "Unit 7: Giving Instructions, Warnings & Reflexive Pronouns",
    description: "صيغة الأمر لإعطاء التعليمات والتحذيرات (Imperatives)، والضمائر الانعكاسية (myself, yourself, himself...).",
    accentColor: "from-red-600 to-amber-600",
    bgGradient: "bg-gradient-to-r from-red-50 to-amber-50 border-red-200",
    lessons: [
      {
        id: "1st-u7-l1",
        unitId: 17,
        lessonNumber: 1,
        titleAr: "الدرس الأول: إعطاء التعليمات والأوامر (Imperatives & Warnings)",
        titleEn: "Lesson 1: Giving Instructions with Imperatives",
        category: "grammar",
        summary: "استخدام الفعل المجرد في بداية الجملة للأمر، واستخدام Don't أو Never للتحذير والنهي.",
        grammarRuleFormula: "Positive Imperative (الأمر الإيجابي):\nBase Verb + Complement (e.g., Wash your hands)\nNegative Warning (النهي والتحذير):\nDon't / Never + Base Verb (e.g., Don't touch the hot iron)",
        detailedContent: [
          "يبدأ الفعل الأمري دائماً بالمصدر المجرد دون أي فاعل قبله: Open your book.",
          "للنهي أو التحذير نستخدم Don't أو Never متبوعة بمصدر مجرد.",
          "تستخدم في وصفات الطعام، تعليمات الدواء، وإرشادات السلامة في المنزل والمدرسة."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: لا تضع أي إضافات للفعل في جملة الأمر (لا s ولا ed ولا ing)."
        ],
        commonMistakes: [
          "كتابة To keep medicines away (الصحيح Keep medicines away)."
        ],
        examples: [
          {
            en: "Keep medicines out of the reach of children.",
            ar: "احفظ الأدوية بعيداً عن متناول الأطفال.",
            highlight: "Keep",
            note: "فعل أمر مجرد في بداية الجملة"
          },
          {
            en: "Never play with matches in the house.",
            ar: "إياك واللعب بأعواد الثقاب في المنزل.",
            highlight: "Never play",
            note: "تحذير قطعي مع المصدر"
          }
        ],
        exercises: [
          {
            id: "1u7-ex1",
            question: "______ the medicine before drinking it. (Shake / Shaking / Shook)",
            options: ["Shake", "Shaking", "Shook", "Shakes"],
            correctAnswer: "Shake",
            explanation: "جملة الأمر تبدأ دائماً بالمصدر المجرد بدون إضافات.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الثاني"
          }
        ]
      },
      {
        id: "1st-u7-l2",
        unitId: 17,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: الضمائر الانعكاسية (Reflexive Pronouns)",
        titleEn: "Lesson 2: Reflexive Pronouns (myself, yourself...)",
        category: "grammar",
        summary: "الضمائر التي تعود على فاعل الجملة للتأكيد أو عندما يقع الفعل على الفاعل نفسه.",
        grammarRuleFormula: "I -> myself\nYou (singular) -> yourself\nHe -> himself\nShe -> herself\nIt -> itself\nWe -> ourselves\nYou (plural) -> yourselves\nThey -> themselves",
        detailedContent: [
          "نستخدم الضمير الانعكاسي عندما يكون الفاعل والمفعول به هما نفس الشخص.",
          "تتحول self في المفرد إلى selves في الجمع (ourselves, themselves, yourselves).",
          "أمثلة شائعة: He cut himself with a sharp knife.",
          "She looked at herself in the mirror."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: سؤال وزاري وامتحاني يتكرر في الإملاء والتوصيل: I : myself / They : themselves."
        ],
        commonMistakes: [
          "كتابة theirselves (خطأ إملائي شائع، الصحيح themselves).",
          "كتابة ourself بدلاً من ourselves."
        ],
        examples: [
          {
            en: "I made this delicious cake myself.",
            ar: "صنعت هذه الكعكة اللذيذة بنفسي.",
            highlight: "myself",
            note: "ضمير انعكاسي يعود على I"
          }
        ],
        exercises: [
          {
            id: "1u7-ex2",
            question: "Ali looked at ______ in the mirror. (himself / herself / myself / itself)",
            options: ["himself", "herself", "myself", "itself"],
            correctAnswer: "himself",
            explanation: "الفاعل علي (Ali = He) الضمير الانعكاسي المناسب له هو himself.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          }
        ]
      }
    ]
  }
];

// =========================================================================
// قصص الأول المتوسط (Story Time / Literature)
// =========================================================================
export const FIRST_INTERMEDIATE_STORIES: LiteratureItem[] = [
  {
    id: "1st-story-fox",
    title: "The Fox and the Bird",
    titleAr: "قصة الثعلب والطائر (الغبي والحكيم)",
    author: "Aesop's Fable Adapted for Iraq",
    authorAr: "من حكايات إيسوب التراثية المقررة لمنهج العراق",
    genre: "Fable / Story Time",
    genreAr: "حكاية رمزية وعبرة أخلاقية",
    image: "https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=1200&q=80",
    imageCaptionAr: "الثعلب الماكر يحاول خداع الطائر للحصول على قطعة الجبن",
    summaryAr: "قصة مشهورة في منهج الأول المتوسط؛ حيث يجلس الطائر على غصن شجرة وفي منقاره قطعة جبن لذيذة. يأتي الثعلب الجائع ويستخدم كلمات المديح والإطراء الكاذب ليقنع الطائر بالغناء. عندما يفتح الطائر منقاره ليسقط الجبن، يلتقطه الثعلب ويهرب، متعلمين ألا نصدق المديح الخادع.",
    moralLessonAr: "لا تصدق أبداً الإطراء الكاذب ولا تنخدع بمن يمدحك طمعاً في مصلحة شخصية.",
    keyThemes: ["Beware of false flattery", "Wisdom and caution", "Thinking before acting"],
    characters: [
      {
        name: "The Clever Fox",
        nameAr: "الثعلب الماكر",
        role: "The flatterer",
        roleAr: "المخادع الذي استغل غرور الطائر",
        description: "Hungry and cunning animal that uses words rather than strength to get food.",
        descriptionAr: "حيوان ماكر وجائع يستخدم دهائه والمديح للحصول على طعامه."
      },
      {
        name: "The Bird",
        nameAr: "الطائر",
        role: "The victim of pride",
        roleAr: "ضحية الغرور والتصديق السريع",
        description: "Had a piece of cheese and was tricked into opening its beak to sing.",
        descriptionAr: "كان يمتلك قطعة الجبن ووقع في فخ الغناء وسقطت طعامه."
      }
    ],
    ministerialQA: [
      {
        id: "1st-q1",
        question: "What did the bird have in its beak?",
        questionAr: "ماذا كان في منقار الطائر؟",
        answer: "A delicious piece of cheese.",
        answerAr: "قطعة جبن لذيذة.",
        year: "امتحان نصف السنة"
      },
      {
        id: "1st-q2",
        question: "Why did the fox ask the bird to sing?",
        questionAr: "لماذا طلب الثعلب من الطائر أن يغني؟",
        answer: "To make the bird open its beak so the cheese would fall down.",
        answerAr: "لكي يفتح الطائر منقاره فيسقط الجبن على الأرض.",
        year: "امتحان نهاية الكورس الأول"
      },
      {
        id: "1st-q3",
        question: "What is the moral lesson of the story?",
        questionAr: "ما هو الدرس الأخلاقي من القصة؟",
        answer: "Do not trust people who flatter you with false praise.",
        answerAr: "لا تثق بالأشخاص الذين يمتدحونك بإطراء كاذب.",
        year: "امتحان نهاية السنة"
      }
    ]
  },
  {
    id: "1st-story-heron",
    title: "The Heron and the Fish",
    titleAr: "مالك الحزين والسمكة",
    author: "Traditional Educational Fable",
    authorAr: "حكاية تراثية تعليمية مقررة",
    genre: "Educational Story",
    genreAr: "قصة تربوية عن القناعة",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=80",
    imageCaptionAr: "طائر مالك الحزين على ضفة النهر يبحث عن الأسماك",
    summaryAr: "طائر مالك الحزين يقف على ضفة النهر الجميل. مرت سمكة صغيرة فرفض صيدها قائلاً إنها صغيرة جداً، ثم مرت سمكة متوسطة فرفضها طمعاً بسمكة ضخمة. في النهاية اختفت كل الأسماك وبقي جائعاً واضطر لأكل حلزون صغير على الشاطئ.",
    moralLessonAr: "القناعة كنز لا يفنى؛ فالطمع المفرط يؤدي إلى فقدان كل شيء والندم.",
    keyThemes: ["Contentment vs Greed", "Appreciating current blessings", "Patience and modesty"],
    characters: [
      {
        name: "The Heron",
        nameAr: "مالك الحزين",
        role: "The greedy bird",
        roleAr: "الطائر الطماع الذي خسر صيده",
        description: "A proud tall bird that waited too long for a giant fish and ended up hungry.",
        descriptionAr: "طائر فخور انتظر صيداً ضخماً حتى فات الأوان وخسر كل شيء."
      }
    ],
    ministerialQA: [
      {
        id: "1st-heron-q1",
        question: "Why didn't the heron catch the first little fish?",
        questionAr: "لماذا لم يصطد مالك الحزين أول سمكة صغيرة؟",
        answer: "Because he thought it was too small and wanted a bigger one.",
        answerAr: "لأنه اعتقد أنها صغيرة جداً وأراد سمكة أكبر حجماً.",
        year: "امتحان الفصل الثاني"
      },
      {
        id: "1st-heron-q2",
        question: "What did the heron eat at the end of the story?",
        questionAr: "ماذا أكل مالك الحزين في نهاية القصة؟",
        answer: "He had to eat a small snail because all the fish were gone.",
        answerAr: "اضطر لأكل حلزون صغير لأن جميع الأسماك كانت قد اختفت.",
        year: "امتحان نهاية السنة"
      }
    ]
  }
];

// =========================================================================
// إنشاءات الأول المتوسط (Essays / Compositions)
// =========================================================================
export const FIRST_INTERMEDIATE_ESSAYS: EssayItem[] = [
  {
    id: "1st-essay-holiday",
    unitId: 11,
    titleAr: "إنشاء الوحدة الأولى: عطلة قضيتها في العراق (A Holiday I Had)",
    titleEn: "A Holiday I Had in Iraq",
    ministerialWeight: "15 درجة في الامتحان النهائي",
    paragraphsEn: [
      "Last summer holiday, my family and I went on an unforgettable trip to Erbil in northern Iraq. We travelled by car and stayed in a comfortable hotel near the citadel.",
      "The weather was wonderfully cool and fresh. We visited the famous Bekhal and Gali Ali Bag waterfalls, where we took lots of colourful photos and had a delightful picnic by the river.",
      "In the evenings, we walked around the lively bazaar and bought traditional sweets and souvenirs. It was truly the best holiday of my life because we relaxed and enjoyed Iraq's amazing nature."
    ],
    paragraphsAr: [
      "في عطلة الصيف الماضي، ذهبت أنا وعائلتي في رحلة لا تُنسى إلى أربيل في شمال العراق. سافرنا بالسيارة وأقمنا في فندق مريح بالقرب من القلعة التاريخية.",
      "كان الطقس رائعاً ومعتدلاً ومنعشاً. قمنا بزيارة شلالات بيخال وكلي علي بك الشهيرة، حيث التقطنا الكثير من الصور الملونة وتناولنا غداءً ممتعاً على ضفاف النهر.",
      "في الأمسيات، تجولنا في البازار الحيوي المفعم بالنشاط واشترينا الحلويات الشعبية والهدايا التذكارية. لقد كانت بحق أفضل عطلة في حياتي لأننا استمتعنا بطبيعة العراق الخلابة."
    ],
    keywords: [
      { word: "unforgettable trip", meaning: "رحلة لا تُنسى" },
      { word: "citadel", meaning: "قلعة تاريخية" },
      { word: "waterfalls", meaning: "شلالات مائية" },
      { word: "lively bazaar", meaning: "سوق شعبي مفعم بالحياة" },
      { word: "souvenirs", meaning: "هدايا تذكارية" }
    ],
    goldenTips: [
      "نصيحة الأستاذ مصطفى تركي: استخدم زمن الماضي البسيط (went, travelled, stayed, visited) لأن الرحلة حدثت وانتهت في الماضي.",
      "احرص على استخدام الفواصل والنقاط وبدء كل جملة بحرف كبير (Capital Letter) لضمان الدرجة الكاملة."
    ],
    clozeSentences: [
      {
        textWithBlanks: "Last summer, my family and I ______ (went / go) to Erbil.",
        missingWord: "went",
        options: ["went", "go", "gone", "goes"]
      },
      {
        textWithBlanks: "We took lots of beautiful ______ (photos / photo) near the waterfall.",
        missingWord: "photos",
        options: ["photos", "photo", "photographing", "photographer"]
      }
    ]
  },
  {
    id: "1st-essay-country",
    unitId: 15,
    titleAr: "إنشاء الوحدة الخامسة: اكتب عن بلد (Write about a Country - Spain)",
    titleEn: "Write About a Country: Spain",
    ministerialWeight: "15 درجة في الامتحان النهائي",
    paragraphsEn: [
      "Spain is a large and fascinating country located in the southwest of Europe. The capital city is Madrid, which is famous for its grand palaces and rich history.",
      "The population is around 47 million people, and they speak Spanish. In summer, Spain is hot and sunny, so millions of tourists visit its Mediterranean beaches. In winter, it is cold and snowy in the mountains.",
      "Spain produces delicious oranges, olive oil, and fresh vegetables. Tourists also love visiting the ancient historic city of Granada to see the famous Alhambra palace."
    ],
    paragraphsAr: [
      "إسبانيا بلد كبير وممتع يقع في جنوب غرب قارة أوروبا. العاصمة هي مدريد، المشهورة بقصورها الفخمة وتاريخها العريق.",
      "يبلغ عدد السكان حوالي 47 مليون نسمة، ويتحدثون اللغة الإسبانية. في الصيف، يكون الطقس حاراً ومشمساً، ولذلك يزور ملايين السياح شواطئها على البحر المتوسط. وفي الشتاء، يكون الجو بارداً ومثلجاً في الجبال.",
      "تنتج إسبانيا البرتقال اللذيذ وزيت الزيتون والخضروات الطازجة. كما يحب السياح زيارة مدينة غرناطة التاريخية لمشاهدة قصر الحمراء الشهير."
    ],
    keywords: [
      { word: "fascinating country", meaning: "بلد ساحر وممتع" },
      { word: "capital city", meaning: "المدينة العاصمة" },
      { word: "tourists", meaning: "السياح والزوار" },
      { word: "olive oil", meaning: "زيت الزيتون" },
      { word: "ancient palace", meaning: "قصر تاريخي قديم" }
    ],
    goldenTips: [
      "اذكر الموقع (location)، العاصمة (capital)، الطقس (weather)، وما يزرعه أو ينتجه البلد (agriculture & products).",
      "قسّم الإنشا إلى 3 فقرات مرتبة لتحصل على درجات التنسيق الكاملة."
    ],
    clozeSentences: [
      {
        textWithBlanks: "The ______ city of Spain is Madrid.",
        missingWord: "capital",
        options: ["capital", "river", "mountain", "beach"]
      }
    ]
  },
  {
    id: "1st-essay-letter-yuki",
    unitId: 16,
    titleAr: "إنشاء الوحدة السادسة: رسالة إلى يوكي للتعريف بالعراق (A Letter to Yuki)",
    titleEn: "A Letter to a Penfriend (Yuki)",
    ministerialWeight: "15 درجة في الامتحان النهائي",
    paragraphsEn: [
      "Dear Yuki,\nI was very glad to receive your letter and learn about Japan. I am writing to invite you to visit Iraq, a land with a rich civilisation and warm, friendly people.",
      "Iraq is famous for its great historical sites such as the ancient ruins of Babylon, the ziggurat of Ur, and the beautiful holy shrines. In the north, there are high snowy mountains and green valleys, while in the south you can see the unique Mesopotamian marshes.",
      "Our food is delicious; you will love Iraqi Biryani, Kebab, and Kleicha. I hope you can visit us soon with your family.\nBest wishes,\nYour friend from Iraq"
    ],
    paragraphsAr: [
      "عزيزي يوكي،\nكنت سعيداً جداً باستلام رسالتك والتعرف على اليابان. أكتب إليك لأدعوك لزيارة العراق، مهد الحضارات العريقة وأرض الشعب المضياف والودود.",
      "يشتهر العراق بمواقعه التاريخية العظيمة كآثار بابل وزقورة أور والمراقد الشريفة. في الشمال توجد جبال شاهقة ووديان خضراء، بينما في الجنوب يمكنك مشاهدة أهوار بلاد الرافدين الفريدة.",
      "طعامنا شهي للغاية؛ ستعشق البرياني العراقي والكباب والكليجة. أتمنى أن تزورنا قريباً مع عائلتك.\nأطيب التمنيات،\nصديقك من العراق"
    ],
    keywords: [
      { word: "penfriend", meaning: "صديق مراسلة" },
      { word: "ancient ruins", meaning: "آثار تاريخية قديمة" },
      { word: "ziggurat of Ur", meaning: "زقورة أور التاريخية" },
      { word: "Mesopotamian marshes", meaning: "أهوار بلاد ما بين النهرين" },
      { word: "warm, friendly people", meaning: "شعب مضياف وودود" }
    ],
    goldenTips: [
      "لا تنسَ صيغة كتابة الرسالة: البدء بـ Dear Yuki والختام بـ Best wishes واسمك في النهاية.",
      "احرص على كتابة أسماء الأماكن بحروف كبيرة مثل Iraq, Babylon, Ur."
    ],
    clozeSentences: [
      {
        textWithBlanks: "Dear Yuki, I was very glad to ______ your letter.",
        missingWord: "receive",
        options: ["receive", "write", "forget", "break"]
      }
    ]
  }
];

// =========================================================================
// بنك أسئلة امتحانات الأول المتوسط
// =========================================================================
export const FIRST_INTERMEDIATE_QUESTIONS: MinisterialExamQuestion[] = [
  {
    id: "1st-exam-q1",
    unitId: 11,
    topic: "Past Simple Regular vs Irregular",
    year: "امتحان نصف السنة 2024",
    session: "دور أول",
    questionText: "Yesterday, my brother ______ (buy) a new bicycle for school.",
    correctAnswer: "bought",
    ruleExplanation: "الفعل buy في الماضي البسيط هو فعل شاذ تصريفه bought بسبب وجود ظرف الزمان yesterday.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "1st-exam-q2",
    unitId: 11,
    topic: "Past Continuous",
    year: "امتحان الفصل الأول",
    session: "دور أول",
    questionText: "While they were walking in the park, it ______ (start) to rain.",
    correctAnswer: "started",
    ruleExplanation: "الجملة بعد While تكون في الماضي المستمر، والحدث القاطع يكون في الماضي البسيط started.",
    difficulty: "medium",
    category: "Grammar"
  },
  {
    id: "1st-exam-q3",
    unitId: 12,
    topic: "Weather & Future with will",
    year: "امتحان نصف السنة",
    session: "دور أول",
    questionText: "In July, the weather in Baghdad ______ (be) very hot.",
    correctAnswer: "will be",
    ruleExplanation: "استخدام will للتنبؤ بحالة الطقس المستقبلية متبوعة بالمصدر be.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "1st-exam-q4",
    unitId: 15,
    topic: "Comparative Adjectives",
    year: "امتحان نهاية الكورس الثاني",
    session: "دور أول",
    questionText: "An airplane is ______ (fast) than a train.",
    correctAnswer: "faster",
    ruleExplanation: "المقارنة بوجود than تتطلب إضافة er للصفة ذات المقطع الصوتي الواحد: faster.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "1st-exam-q5",
    unitId: 15,
    topic: "Have been vs Have gone",
    year: "امتحان نهاية السنة 2024",
    session: "دور أول",
    questionText: "Huda is back home now. She has ______ (been / gone) to the dentist.",
    correctAnswer: "been",
    ruleExplanation: "هدى عادت للمنزل الآن (is back home)، لذا نستخدم been للدلالة على الذهاب والعودة.",
    difficulty: "medium",
    category: "Grammar"
  },
  {
    id: "1st-exam-q6",
    unitId: 17,
    topic: "Reflexive Pronouns",
    year: "امتحان نهاية السنة",
    session: "دور أول",
    questionText: "We enjoyed ______ very much at the school party yesterday. (ourselves / himself / themselves)",
    correctAnswer: "ourselves",
    ruleExplanation: "الفاعل We يقابله الضمير الانعكاسي الجمع ourselves.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "1st-exam-q7",
    unitId: 11,
    topic: "Spelling - Irregular Past",
    year: "امتحان نصف السنة",
    session: "دور أول",
    questionText: "play -> played ; see -> ______",
    correctAnswer: "saw",
    ruleExplanation: "الماضي البسيط للفعل الشاذ see هو saw.",
    difficulty: "easy",
    category: "Spelling"
  },
  {
    id: "1st-exam-q8",
    unitId: 17,
    topic: "Spelling - Reflexive Pronoun",
    year: "امتحان نهاية السنة",
    session: "دور أول",
    questionText: "I -> myself ; they -> ______",
    correctAnswer: "themselves",
    ruleExplanation: "الضمير الانعكاسي للضمير they هو themselves بالجمع.",
    difficulty: "easy",
    category: "Spelling"
  }
];

// =========================================================================
// نموذج الامتحان الشامل للأول المتوسط (Mock Exam Paper)
// =========================================================================
export const FIRST_INTERMEDIATE_MOCK_PAPER: MockExamPaper = {
  id: "1st-full-mock-paper-2025",
  title: "امتحان نهاية السنة الشامل • الأول المتوسط (اعتماداً على أسئلة 2020 إلى 2026)",
  subtitle: "إشراف الأستاذ مصطفى تركي • الاعتماد الحصري على كتاب الطالب (Student's Book) وكتاب النشاط (Activity Book)",
  session: "الدور الأول • المنهج العراقي الرسمي (2020-2026)",
  year: "2020 - 2026",
  durationMinutes: 120,
  totalMarks: 100,
  sections: [
    {
      id: "sec-1",
      sectionCode: "Q1-A",
      titleAr: "السؤال الأول (أ): القطعة الخارجية المستوعبة",
      titleEn: "Question 1 (A): Reading Comprehension - Unseen Passage",
      instructionsAr: "اقرأ القطعة بعناية ثم أجب عن الأسئلة التالية:",
      instructionsEn: "Read the following passage carefully, then answer the questions below:",
      totalMarks: 20,
      unseenPassage: "Last winter, Zaid and his elder brother Omar went on an exciting trip to the marshes in southern Iraq. The Mesopotamian marshes are huge wetlands filled with tall reeds and diverse water birds like flamingos and pelicans. They travelled across the water in a traditional wooden boat called a Mashoof. The local people were very generous; they welcomed the brothers and offered them fresh fish, hot buffalo milk, and dates. Zaid was amazed by how the local Marsh Arabs build whole floating islands and houses out of reed. It was an educational adventure that made both brothers proud of Iraq's unique heritage.",
      items: [
        {
          id: "1st-mock-q1-1",
          number: 1,
          questionText: "Where did Zaid and his brother Omar travel last winter?",
          type: "text",
          correctAnswer: "To the marshes in southern Iraq",
          alternativeAnswers: ["Southern Iraq marshes", "The marshes in Iraq"],
          explanation: "السطر الأول يوضح سفرهما إلى الأهوار في جنوب العراق.",
          maxScore: 4
        },
        {
          id: "1st-mock-q1-2",
          number: 2,
          questionText: "What is the traditional wooden boat in the marshes called?",
          type: "text",
          correctAnswer: "Mashoof",
          alternativeAnswers: ["A Mashoof"],
          explanation: "القارب الخشبي التقليدي يسمى مشحوف (Mashoof).",
          maxScore: 4
        },
        {
          id: "1st-mock-q1-3",
          number: 3,
          questionText: "What birds did they see in the wetlands? (Name two)",
          type: "text",
          correctAnswer: "Flamingos and pelicans",
          alternativeAnswers: ["Flamingo and pelican"],
          explanation: "ذكر النص طيور النحام والبجع (flamingos and pelicans).",
          maxScore: 4
        },
        {
          id: "1st-mock-q1-4",
          number: 4,
          questionText: "The local people were unfriendly and refused to help the brothers. (True / False)",
          type: "choice",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "النص يذكر أنهم كانوا كرماء ومرحبين جداً (generous and welcomed them).",
          maxScore: 4
        },
        {
          id: "1st-mock-q1-5",
          number: 5,
          questionText: "What material do Marsh Arabs use to build their houses?",
          type: "text",
          correctAnswer: "Reeds",
          alternativeAnswers: ["Reeds (القصب)", "Tall reeds"],
          explanation: "يبنون بيوتهم العائمة من نبات القصب (reed).",
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
      totalMarks: 25,
      items: [
        {
          id: "1st-mock-q2-1",
          number: 1,
          questionText: "Sami didn't ______ to school yesterday because he was sick. (go / went / goes)",
          type: "choice",
          options: ["go", "went", "goes"],
          correctAnswer: "go",
          explanation: "بعد didn't نستخدم الفعل المجرد الخالي من أي إضافة go.",
          maxScore: 5
        },
        {
          id: "1st-mock-q2-2",
          number: 2,
          questionText: "While my mother was cooking, the telephone ______ (ring). [Past Simple]",
          type: "choice",
          options: ["rang", "ringed", "was ringing"],
          correctAnswer: "rang",
          explanation: "الحدث القاطع بعد While يكون في الماضي البسيط وهو الفعل الشاذ rang.",
          maxScore: 5
        },
        {
          id: "1st-mock-q2-3",
          number: 3,
          questionText: "An elephant is ______ (big) than a camel. [Comparative]",
          type: "choice",
          options: ["bigger", "biggest", "more big"],
          correctAnswer: "bigger",
          explanation: "مقارنة مع مضاعفة الحرف الصحيح الأخير bigger than.",
          maxScore: 5
        },
        {
          id: "1st-mock-q2-4",
          number: 4,
          questionText: "My father is not at home. He has ______ (been / gone) to his office.",
          type: "choice",
          options: ["gone", "been"],
          correctAnswer: "gone",
          explanation: "والدي ليس في البيت الآن (ذهب ولم يعد بعد)، فالجواب gone.",
          maxScore: 5
        },
        {
          id: "1st-mock-q2-5",
          number: 5,
          questionText: "The children played happily and enjoyed ______ in the garden. (themselves / himself)",
          type: "choice",
          options: ["themselves", "himself", "ourselves"],
          correctAnswer: "themselves",
          explanation: "الفاعل children اسم جمع، الضمير الانعكاسي له هو themselves.",
          maxScore: 5
        }
      ]
    },
    {
      id: "sec-3",
      sectionCode: "Q3",
      titleAr: "السؤال الثالث: المفردات والتنقيط والإملاء",
      titleEn: "Question 3: Vocabulary, Spelling & Punctuation",
      instructionsAr: "أجب عن فروع المفردات والإملاء والتنقيط:",
      instructionsEn: "A) Match and choose meanings, B) Spelling and Punctuation:",
      totalMarks: 20,
      items: [
        {
          id: "1st-mock-q3-1",
          number: 1,
          questionText: "A person who comes from Japan is called ______.",
          type: "choice",
          options: ["Japanese", "Japani", "Japanner"],
          correctAnswer: "Japanese",
          explanation: "الجنسية من Japan هي Japanese.",
          maxScore: 5
        },
        {
          id: "1st-mock-q3-2",
          number: 2,
          questionText: "do -> did ; fly -> ______ [Spelling]",
          type: "text",
          correctAnswer: "flew",
          explanation: "الماضي البسيط للفعل الشاذ fly هو flew.",
          maxScore: 5
        },
        {
          id: "1st-mock-q3-3",
          number: 3,
          questionText: "good -> better ; bad -> ______ [Spelling]",
          type: "text",
          correctAnswer: "worse",
          explanation: "المقارنة الشاذة من bad هي worse.",
          maxScore: 5
        },
        {
          id: "1st-mock-q3-4",
          number: 4,
          questionText: "Re-write with correct punctuation: 'ali visited basra last friday'",
          type: "text",
          correctAnswer: "Ali visited Basra last Friday.",
          explanation: "تكبير حرف البداية A، واسم المدينة Basra، ويوم الجمعة Friday، ووضع نقطة.",
          maxScore: 5
        }
      ]
    },
    {
      id: "sec-4",
      sectionCode: "Q4",
      titleAr: "السؤال الرابع: قصص المطالعة المقررة (Story Time)",
      titleEn: "Question 4: Story Time (The Fox & The Heron)",
      instructionsAr: "أجب عن الأسئلة التالية حول قصتي الثعلب والطائر ومالك الحزين:",
      instructionsEn: "Answer the following questions about the prescribed stories:",
      totalMarks: 15,
      items: [
        {
          id: "1st-mock-q4-1",
          number: 1,
          questionText: "In 'The Fox and the Bird', what was in the bird's beak?",
          type: "choice",
          options: ["A piece of cheese", "A small fish", "A piece of bread"],
          correctAnswer: "A piece of cheese",
          explanation: "كان في منقار الطائر قطعة جبن لذيذة.",
          maxScore: 5
        },
        {
          id: "1st-mock-q4-2",
          number: 2,
          questionText: "The fox asked the bird to sing because he loved its beautiful voice. (True / False)",
          type: "choice",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "خطأ؛ كان يريد أن يفتح الطائر منقاره ليسقط الجبن.",
          maxScore: 5
        },
        {
          id: "1st-mock-q4-3",
          number: 3,
          questionText: "Why did the heron end up eating only a small snail?",
          type: "text",
          correctAnswer: "Because he was greedy and refused to catch the fish earlier",
          alternativeAnswers: ["Because of his greed", "He was greedy"],
          explanation: "بسبب طمعه ورفضه اصطياد الأسماك السابقة حتى اختفت جميعها.",
          maxScore: 5
        }
      ]
    }
  ],
  essayOptions: [
    {
      id: "1st-essay-opt-a",
      optionLetter: "A",
      titleEn: "A Holiday You Had in Iraq",
      titleAr: "عطلة قضيتها في العراق (الوحدة الأولى)",
      prompt: "Write a short composition about a memorable holiday you spent with your family in Iraq (e.g. Erbil, Babylon, or the Marshes).",
      suggestedModel: "Last summer holiday, my family and I went on an unforgettable trip to Erbil in northern Iraq. We travelled by car and stayed in a comfortable hotel near the citadel. The weather was cool and fresh. We visited Bekhal waterfalls and took lots of colourful photos. It was truly the best holiday of my life.",
      keywords: ["Erbil", "waterfalls", "citadel", "comfortable hotel", "unforgettable trip"],
      maxScore: 20
    },
    {
      id: "1st-essay-opt-b",
      optionLetter: "B",
      titleEn: "Write About a Country (Spain)",
      titleAr: "اكتب عن بلد: إسبانيا (الوحدة الخامسة)",
      prompt: "Write a composition about a country, mentioning its location, capital city, weather, and products.",
      suggestedModel: "Spain is a large country located in southwestern Europe. The capital city is Madrid, famous for its historic museums. The population is about 47 million people, and they speak Spanish. In summer, it is hot and sunny, so tourists visit its Mediterranean beaches. Spain produces delicious oranges and olive oil.",
      keywords: ["Madrid", "southwestern Europe", "Spanish", "tourists", "olive oil"],
      maxScore: 20
    }
  ]
};
