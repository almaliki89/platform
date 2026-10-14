import { Unit, LiteratureItem, EssayItem, MinisterialExamQuestion } from '../../types';
import { MockExamPaper } from '../mockExamPapers';

// =========================================================================
// وحدات الخامس الإعدادي - المعتمدة رسمياً من كتاب الطالب وكتاب النشاط
// English for Iraq: 5th Preparatory (Student's Book & Activity Book)
// العلمي والأدبي - إشراف وتدقيق الأستاذ مصطفى تركي
// =========================================================================
export const FIFTH_PREPARATORY_UNITS: Unit[] = [
  {
    id: 51,
    number: 1,
    titleAr: "الوحدة الأولى: رمضان في العراق وأفعال الحالة والصفات (Ramadan in Iraq & Adjectives)",
    titleEn: "Unit 1: Ramadan in Iraq, Stative vs. Dynamic Verbs & -ed/-ing Adjectives",
    description: "الأفعال الحركية وأفعال الحالة (Stative vs Dynamic)، والصفات المنتهية بـ -ed و -ing، والأسماء المركبة وتقاليد شهر رمضان المبارك في العراق.",
    accentColor: "from-fuchsia-600 to-pink-600",
    bgGradient: "bg-gradient-to-r from-fuchsia-50 to-pink-50 border-fuchsia-200",
    lessons: [
      {
        id: "5th-u1-l1",
        unitId: 51,
        lessonNumber: 1,
        titleAr: "الدرس الأول: أفعال الحالة مقابل أفعال الحركة (Stative vs. Dynamic Verbs)",
        titleEn: "Lesson 1: Stative vs. Dynamic Verbs (State vs. Action)",
        category: "grammar",
        summary: "التمييز بين الأفعال التي تصف حالة ذهنية أو شعورية ولا تقبل الاستمرار (-ing)، والأفعال الحركية التي تقبل الاستمرار.",
        grammarRuleFormula: "Stative Verbs (أفعال الحالة): تصف مشاعر، حواس، ملكية، إدراك عقلي، ولا تأتي بالأزمنة المستمرة:\nlike, love, hate, know, understand, believe, remember, belong to, seem, smell, taste.\nالصيغة: Subject + Present Simple (verb / verb+s) -> I know him (NOT: I am knowing him)\n\nDynamic Verbs (أفعال الحركة والنشاط): تصف أفعالاً حركية ملموسة وتقبل الاستمرار:\nplay, run, eat, study, work, watch, drive -> She is studying right now.",
        detailedContent: [
          "أفعال الحالة (Stative Verbs) تدل على حالة دائمة أو شعور أو فكرة أو ملكية، لذلك لا نستخدم معها صيغة المضارع المستمر إطلاقاً حتى مع وجود كلمات تدل على الآن مثل now أو at the moment.",
          "أمثلة شائعة لأفعال الحالة: know (يعرف), understand (يفهم), believe (يعتقد), remember (يتذكر), belong (ينتمي/يخص), have (بمعنى يملك).",
          "أفعال الحركة (Dynamic Verbs) تصف نشاطاً بدنياً أو حركياً له بداية ونهاية، وتقبل صيغة المضارع البسيط والمضارع المستمر بحسب السياق.",
          "بعض الأفعال لها معنيان: have بمعنى يملك (حالة: I have a car) وبمعنى يتناول أو يقضي (حركة: I am having breakfast / having a shower)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: سؤال وزاري متكرر! عندما ترى أفعال المعرفة والشعور (know, understand, want, like)، اختر صيغة البسيط دائماً ولا تضع لها -ing أبداً."
        ],
        commonMistakes: [
          "كتابة I am understanding the lesson (خطأ فادح؛ الصحيح I understand the lesson).",
          "كتابة This car is belonging to me (خطأ؛ الصحيح belongs to me)."
        ],
        examples: [
          {
            en: "I know the answer to this difficult question.",
            ar: "أنا أعرف إجابة هذا السؤال الصعب (فعل حالة لا يقبل ing).",
            highlight: "know",
            note: "فعل حالة مستمر بالمعنى لكنه يأتي بصيغة البسيط"
          },
          {
            en: "Listen! The children are playing football in the garden.",
            ar: "استمع! الأطفال يلعبون كرة القدم في الحديقة الآن (فعل حركة مستمر).",
            highlight: "are playing",
            note: "فعل حركة يقبل الاستمرار"
          }
        ],
        exercises: [
          {
            id: "5u1-ex-stat-1",
            question: "I ______ (understand) the lesson now. (Choose the correct form)",
            options: ["understand", "am understanding", "understands", "have understood"],
            correctAnswer: "understand",
            explanation: "الفعل understand من أفعال الحالة (stative verbs) ولا يقبل صيغة الاستمرار -ing حتى مع وجود now.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الأول 2024"
          },
          {
            id: "5u1-ex-stat-2",
            question: "This luxury bag ______ (belong) to my elder sister.",
            options: ["belongs", "is belonging", "belonging", "belong"],
            correctAnswer: "belongs",
            explanation: "فعل الملكية belong لا يقبل صيغة الاستمرار أبداً، ومع الفاعل المفرد نأخذ belongs.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة 2025"
          }
        ]
      },
      {
        id: "5th-u1-l2",
        unitId: 51,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: الصفات المنتهية بـ (-ed) والصفات المنتهية بـ (-ing)",
        titleEn: "Lesson 2: Adjectives Ending in (-ed) vs (-ing)",
        category: "grammar",
        summary: "التمييز الدقيق بين الصفة التي تصف شعور وإحساس الشخص (-ed) والصفة التي تصف مسبب الشعور أو الشيء (-ing).",
        grammarRuleFormula: "-ed Adjectives: تصف شعور وإحساس الشخص الداخلي (كيف يشعر الشخص):\n(e.g., I was very excited / frightened / bored / interested)\n\n-ing Adjectives: تصف الشيء أو الشخص الذي يسبب ذلك الشعور (مصدر الإثارة أو الملل):\n(e.g., It was an exciting match / a boring movie / a frightening experience / an interesting book)",
        detailedContent: [
          "تنتهي الصفة بـ (ed) عندما نتحدث عن شعور الكائن الحي (إنسان أو حيوان): He was frightened when he saw the spider.",
          "تنتهي الصفة بـ (ing) عندما تصف الاسم الذي يسبب هذا الشعور: That horror film was very frightening.",
          "انتبه: إذا كان بعد الفراغ اسم موصوف مباشرة نختار غالباً صفة الـ ing: It was an interesting book / a tiring journey.",
          "هذه القاعدة مقتبسة من كتاب الطالب صفحة 8 وكتاب النشاط صفحة 6 وتتكرر في البكالوريا للسادس الإعدادي أيضاً."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انظر بعد الفراغ: إذا وجدت اسماً موصوفاً (movie, day, person, match, book) اختر (-ing) فوراً! إذا لم تجد اسماً، وكان الفاعل عاقلاً يشعر بالشيء فاختر (-ed)."
        ],
        commonMistakes: [
          "قول I am very boring (معناها أنا شخص ممل ومزعج، بينما الصحيح I am bored أي أشعر بالملل).",
          "اختيار ed مع جماد مثل: The football match was excited (الصحيح exciting)."
        ],
        examples: [
          {
            en: "We were very tired after walking all day.",
            ar: "كنا متعبين جداً بعد المشي طوال اليوم (شعور داخلي بالأثر).",
            highlight: "tired",
            note: "صفة شعور تنتهي بـ ed"
          },
          {
            en: "This documentary is so interesting; you should definitely watch it.",
            ar: "هذا الفيلم الوثائقي ممتع وشيق للغاية (مسبب الشعور).",
            highlight: "interesting",
            note: "صفة مسبب شعور تنتهي بـ ing"
          }
        ],
        exercises: [
          {
            id: "5u1-ex1",
            question: "I was so ______ (bored / boring) that I fell asleep during the lecture.",
            options: ["bored", "boring", "boredom", "bores"],
            correctAnswer: "bored",
            explanation: "الفاعل أنا (I) أصف شعوري الداخلي بالملل، لذا نختار الصفة المنتهية بـ -ed.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الأول"
          },
          {
            id: "5u1-ex2",
            question: "It was the most ______ (frightening / frightened) experience of my life.",
            options: ["frightening", "frightened", "frighten", "fright"],
            correctAnswer: "frightening",
            explanation: "وجود الاسم الموصوف (experience) بعد الفراغ يوجب اختيار صفة الـ ing.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          }
        ]
      },
      {
        id: "5th-u1-l3",
        unitId: 51,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: تقاليد شهر رمضان في العراق والأسماء المركبة",
        titleEn: "Lesson 3: Ramadan Traditions in Iraq & Compound Nouns",
        category: "reading",
        summary: "نص القراءة المعتمد في كتاب الطالب حول تقاليد شهر رمضان، ومفردات الأسماء المركبة (Compound Nouns) في كتاب النشاط.",
        detailedContent: [
          "نص القراءة في كتاب الطالب صفحة 10 يستعرض الأجواء الروحية والاجتماعية في العراق خلال شهر رمضان: الصيام (fasting)، وجبة الإفطار (Iftar)، صلاة التراويح (Taraweeh)، ولعبة المحيبس التراثية (Mheibes).",
          "التكافل الاجتماعي والكرم: توزيع الطعام على الجيران والفقراء وموائد الرحمن.",
          "الأسماء المركبة (Compound Nouns) في كتاب النشاط ص 8: كلمات تتكون من اسمين لتشكل مفهوماً جديداً مثل: boarding pass (بطاقة صعود الطائرة), seat belt (حزام الأمان), car rental (تأجير سيارات), travel agency (وكالة سفر)."
        ],
        teacherNotes: [
          "مفردات هذا الدرس هي حجر الأساس لإنشاء الوحدة الأولى (Ramadan Traditions in Iraq)؛ احفظ كلمات: hospitality, solidarity, fast, sunrise, sunset, dawn."
        ],
        examples: [
          {
            en: "Families gather at sunset to break their fast with dates and lentil soup.",
            ar: "تجتمع العوائل عند غروب الشمس لكسر صيامها بالتمر وشوربة العدس.",
            highlight: "break their fast",
            note: "مفردات نص رمضان الرسمي"
          },
          {
            en: "Always fasten your seat belt before the plane takes off.",
            ar: "اربط حزام الأمان دائماً قبل إقلاع الطائرة.",
            highlight: "seat belt",
            note: "اسم مركب من كتاب النشاط"
          }
        ],
        exercises: [
          {
            id: "5u1-ex3",
            question: "During Ramadan, Muslims fast from dawn until ______.",
            options: ["sunset", "midnight", "morning", "afternoon"],
            correctAnswer: "sunset",
            explanation: "الصيام يبدأ من الفجر (dawn) وحتى غروب الشمس (sunset).",
            type: "mcq",
            ministerialYear: "امتحان الفصل الأول"
          }
        ]
      }
    ,
      {
        id: "5th-u1-l4",
        unitId: 51,
        lessonNumber: 4,
        titleAr: "الدرس الرابع: الصفات المتطرفة والمتلازمات اللفظية (Extreme Adjectives)",
        titleEn: "Lesson 4: Extreme / Absolute Adjectives & Intensifiers (absolutely / very)",
        category: "vocabulary",
        summary: "التمييز بين الصفات القابلة للتدرج (gradable) والصفات المتطرفة (extreme/ungradable)، واستخدام absolutely مع المتطرفة و very مع العادية.",
        grammarRuleFormula: "1) Gradable: very tired, very hot, very big, very angry\n2) Extreme: absolutely exhausted, absolutely boiling, absolutely tiny, absolutely furious, absolutely fascinating",
        detailedContent: [
          "في منهج الخامس الإعدادي (كتاب الطالب والنشاط)، يتم التركيز على استبدال التركيب (very + صفة عادية) بصفة متطرفة بليغة.",
          "لا يجوز لغوياً قول very exhausted أو very boiling لأن الصفة المتطرفة تحمل معنى الحد الأقصى بطبيعتها.",
          "الظرف absolutely يسبق الصفات المتطرفة فقط لتوكيد المعنى."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تمرين كتاب النشاط صفحة 12 يطلب مطابقة الصفات العادية مع نظيراتها المتطرفة، وهو سؤال ثابت في أسئلة القواعد والمفردات."
        ],
        commonMistakes: [
          "استخدام very مع صفة متطرفة مثل very delicious (الصحيح really delicious أو absolutely delicious)."
        ],
        examples: [
          {
            en: "After walking around the historic citadel in Erbil all afternoon, we were absolutely exhausted.",
            ar: "بعد التجول في قلعة أربيل التاريخية طوال الظهيرة، كنا منهكين للغاية (exhausted).",
            highlight: "absolutely exhausted",
            note: "صفة متطرفة مع absolutely"
          }
        ],
        exercises: [
          {
            id: "5u1-ex4",
            question: "It was freezing outside; the temperature was ______ cold.",
            options: ["extremely", "absolutely", "little", "completely"],
            correctAnswer: "extremely",
            explanation: "الصفة cold عادية وليست متطرفة فتأخذ extremely أو very.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 12"
          }
        ]
      }
    ]
  },
  {
    id: 52,
    number: 2,
    titleAr: "الوحدة الثانية: النصيحة القوية والحالة الشرطية الثانية (Second Conditional)",
    titleEn: "Unit 2: Strong Advice & Second Conditional (Health & Lifestyle)",
    description: "إعطاء النصائح القوية (had better / should / ought to)، والحالة الشرطية الثانية للمواقف الخيالية غير الواقعية (Second Conditional)، والماضي التام.",
    accentColor: "from-rose-600 to-pink-600",
    bgGradient: "bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200",
    lessons: [
      {
        id: "5th-u2-l1",
        unitId: 52,
        lessonNumber: 1,
        titleAr: "الدرس الأول: إعطاء النصيحة القوية (had better / should / ought to)",
        titleEn: "Lesson 1: Giving Strong Advice (had better, should, ought to)",
        category: "grammar",
        summary: "التعبير عن النصائح العادية والقوية باستخدام had better (من الأفضل لك) و should و ought to متبوعة بالمصدر المجرد.",
        grammarRuleFormula: "Giving Advice (نصيحة عامة):\nSubject + should / ought to + Base Verb\n(e.g., You should eat more vegetables / You ought to exercise daily)\n\nStrong Advice with Warning (نصيحة قوية مع تحذير من عواقب سلبية):\nSubject + had better ('d better) + Base Verb\nالنفي: Subject + had better NOT + Base Verb\n(e.g., You had better study for the test, or you will fail / You had better not be late)",
        detailedContent: [
          "تستخدم had better عندما تكون هناك نتيجة سيئة أو خطر إذا لم تُتبع النصيحة (تحذير صريح).",
          "انتبه لصيغة النفي: had better not + مصدر مجرد (بدون don't أو didn't وبدون to).",
          "الاختصار الشائع: You'd better go now.",
          "بعد should و ought to و had better يأتي دائماً فعل مضارع مجرد خالٍ من أي إضافة."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه لنفي had better: هو had better not وليس hadn't better! سؤال امتحاني خدّاع في امتحانات الخامس الإعدادي."
        ],
        commonMistakes: [
          "قول You hadn't better drive fast (خطأ؛ الصحيح You had better not drive fast).",
          "وضع to بعد had better مثل: You had better to go (خطأ؛ الصحيح had better go)."
        ],
        examples: [
          {
            en: "You'd better see a doctor; that cough sounds terrible.",
            ar: "من الأفضل لك أن تراجع الطبيب؛ ذلك السعال يبدو مقلقاً جداً.",
            highlight: "had better see",
            note: "نصيحة قوية محذرة"
          },
          {
            en: "You had better not miss the morning school bus.",
            ar: "من الأفضل لك ألا تفوت حافلة المدرسة الصباحية.",
            highlight: "had better not miss",
            note: "صيغة النفي الصحيحة"
          }
        ],
        exercises: [
          {
            id: "5u2-ex-adv-1",
            question: "You ______ (had better not / hadn't better / don't had better) touch that hot stove.",
            options: ["had better not", "hadn't better", "don't had better", "not had better"],
            correctAnswer: "had better not",
            explanation: "نفي النصيحة القوية يكون بوضع not بعد had better مباشرة مع المصدر المجرد.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الأول"
          }
        ]
      },
      {
        id: "5th-u2-l2",
        unitId: 52,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: الحالة الشرطية الثانية (Second Conditional)",
        titleEn: "Lesson 2: Second Conditional (Unreal Present / Future)",
        category: "grammar",
        summary: "التعبير عن مواقف خيالية أو افتراضية غير واقعية في الحاضر أو المستقبل، وتقديم النصيحة الخيالية مع If I were you.",
        grammarRuleFormula: "If + Subject + Past Simple, Subject + would / could / might + base verb\n(e.g., If I had a million dollars, I would travel around the world)\n\nAdvice Formula: If I were you, I would / wouldn't + base verb\n(e.g., If I were you, I would stop smoking immediately)",
        detailedContent: [
          "تستخدم الحالة الشرطية الثانية لمواقف خيالية وافتراضية غير متحققة في الواقع الآن.",
          "جملة فعل الشرط (بعد If) تأتي في زمن الماضي البسيط (Past Simple: had, played, went, were).",
          "جملة جواب الشرط تأتي بـ would / could / might + مصدر مجرد.",
          "قاعدة خاصة مع الضمير I: نفضل استخدام were بدلاً من was للنصيحة والتخيل: If I were you, I would study harder.",
          "هذه القاعدة مأخوذة من كتاب الطالب صفحة 18 وكتاب النشاط صفحة 22."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تذكر صيغة النصيحة الخيالية المشهورة في الخامس والسادس الإعدادي: If I were you, I would... وإذا كان فعل الشرط had، فجواب الشرط يكون would + مصدر وليس would have!"
        ],
        commonMistakes: [
          "وضع would في جملة If: If I would have money (خطأ؛ would تأتي في جواب الشرط فقط).",
          "خلط الحالة الثانية بالثالثة."
        ],
        examples: [
          {
            en: "If he studied regularly, he would pass all his exams with distinction.",
            ar: "لو كان يدرس بانتظام (افتراض حالي)، لاجتاز جميع امتحاناته بتفوق.",
            highlight: "If he studied ... would pass",
            note: "حالة شرطية ثانية"
          },
          {
            en: "If I were you, I would consult a specialist doctor.",
            ar: "لو كنت مكانك، لاستشرت طبيباً أخصائياً.",
            highlight: "If I were you ... would consult",
            note: "صيغة نصيحة افتراضية مع were"
          }
        ],
        exercises: [
          {
            id: "5u2-ex1",
            question: "If I ______ (have) enough free time, I would learn Spanish.",
            options: ["had", "have", "would have", "had had"],
            correctAnswer: "had",
            explanation: "جواب الشرط يحتوي على would + learn، لذا فعل الشرط في الحالة الثانية يكون ماضياً بسيطاً had.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الأول"
          },
          {
            id: "5u2-ex2",
            question: "If I were you, I ______ (join) the fitness club to improve my health.",
            options: ["would join", "will join", "joined", "had joined"],
            correctAnswer: "would join",
            explanation: "تركيب النصيحة الافتراضية مع If I were you يأخذ would + المصدر المجرد.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          }
        ]
      }
    ,
      {
        id: "5th-u2-l3",
        unitId: 52,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: نمط الحياة الصحي وإدارة الإجهاد والتوتر (Healthy Living)",
        titleEn: "Lesson 3: Reading Text - Healthy Lifestyles & Stress Management",
        category: "reading",
        summary: "استيعاب نصوص كتاب الطالب حول التغذية المتوازنة، التمارين الرياضية، وأثر النوم الكافي في تعزيز التركيز الدراسي.",
        detailedContent: [
          "أهمية تناول الفواكه والخضار الطازجة والابتعاد عن الوجبات السريعة والمشروبات السكرية المفرطة.",
          "النوم لمدة 8 ساعات ليلاً يعزز كفاءة الذاكرة ويقلل من القلق والتوتر الامتحاني.",
          "ممارسة رياضة المشي أو الجري لمدة 30 دقيقة يومياً تحمي القلب وتنشط الدورة الدموية."
        ],
        teacherNotes: [
          "مفردات هذا النص ترتبط بإنشاء الوحدة الثانية (Advice on Healthy Living for Teenagers)."
        ],
        examples: [
          {
            en: "Teenagers ought to get at least eight hours of sound sleep every night.",
            ar: "ينبغي على المراهقين الحصول على ما لا يقل عن ثماني ساعات من النوم العميق كل ليلة.",
            highlight: "ought to get",
            note: "نصيحة قوية مع ought to"
          }
        ],
        exercises: [
          {
            id: "5u2-ex3",
            question: "To reduce exam anxiety, students should get ______ sleep every night.",
            options: ["sufficient", "hardly any", "broken", "insufficient"],
            correctAnswer: "sufficient",
            explanation: "النوم الكافي (sufficient sleep) ضروري للتركيز وتقليل التوتر.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 28"
          }
        ]
      }
    ]
  },
  {
    id: 53,
    number: 3,
    titleAr: "الوحدة الثالثة: الحالة الشرطية الثالثة والندم (Third Conditional & Regrets)",
    titleEn: "Unit 3: Third Conditional, Regrets & Renewable Energy",
    description: "الحالة الشرطية الثالثة لأحداث الماضي المستحيل تغييرها، والتعبير عن الندم باستخدام I wish / If only، والطاقة المتجددة وحماية البيئة.",
    accentColor: "from-amber-600 to-orange-600",
    bgGradient: "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200",
    lessons: [
      {
        id: "5th-u3-l1",
        unitId: 53,
        lessonNumber: 1,
        titleAr: "الدرس الأول: الحالة الشرطية الثالثة (Third Conditional)",
        titleEn: "Lesson 1: Third Conditional (Past Unreal Condition)",
        category: "grammar",
        summary: "التعبير عن أحداث ماضية لم تقع ولا يمكن تغييرها مطلقاً (مستحيلة في الماضي).",
        grammarRuleFormula: "If + Subject + Past Perfect (had / hadn't + P.P.), Subject + would have / could have + P.P.\n(e.g., If you had driven carefully, you wouldn't have had that accident)",
        detailedContent: [
          "تستخدم للحديث عن أحداث مستحيلة في الماضي وتخيل نتائج مختلفة لم تحدث.",
          "فعل الشرط: ماضٍ تام (had / hadn't + التصريف الثالث P.P.).",
          "جواب الشرط: would have / could have / might have + التصريف الثالث P.P.",
          "مثال من كتاب النشاط ص 34: If I had known about your arrival, I would have met you at Baghdad airport."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: توازن الأزمنة في الحالة الثالثة: had + P.P. في البداية يقابلها would have + P.P. في جواب الشرط! كلاهما يتضمن التصريف الثالث."
        ],
        commonMistakes: [
          "نسيان have بعد would: would passed (الصحيح would have passed).",
          "نسيان التصريف الثالث بعد had."
        ],
        examples: [
          {
            en: "If we had left earlier, we would not have missed our flight.",
            ar: "لو أننا غادرنا مبكراً، لما كانت قد فاتتنا رحلتنا الجوية.",
            highlight: "If we had left ... would not have missed",
            note: "حالة شرطية ثالثة ماضية مستحيلة"
          }
        ],
        exercises: [
          {
            id: "5u3-ex1",
            question: "If he had trained harder, he ______ (win) the championship.",
            options: ["would have won", "would win", "will win", "won"],
            correctAnswer: "would have won",
            explanation: "فعل الشرط ماضٍ تام had trained، لذا جواب الشرط يكون would have won.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          }
        ]
      },
      {
        id: "5th-u3-l2",
        unitId: 53,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: التعبير عن الندم (Expressing Regrets with I wish / If only)",
        titleEn: "Lesson 2: Regrets (I wish / If only + Past Perfect)",
        category: "grammar",
        summary: "الندم على تصرف أو قرار خاطئ في الماضي باستخدام الماضي التام.",
        grammarRuleFormula: "I wish / If only + Subject + had / hadn't + Past Participle (P.P.)\n\nقاعدة عكس الإثبات والنفي:\n1) جملة ماضية مثبتة -> ندم منفي: (hadn't + P.P.)\nI ate too much sweets -> I wish I hadn't eaten so much sweets.\n\n2) جملة ماضية منفية -> ندم مثبت: (had + P.P.)\nI didn't study hard -> If only I had studied hard.",
        detailedContent: [
          "للندم على شيء فعلته وتتمنى لو لم تفعله: نستخدم hadn't + P.P.",
          "للندم على شيء لم تفعله وتتمنى لو أنك فعلته: نستخدم had + P.P.",
          "القاعدة معتمدة في كتاب الطالب ص 28 وكتاب النشاط ص 36، ومطابقة 100% لمنهج السادس الإعدادي الوحدة الثالثة."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: قاعدة عكس المعنى: إذا كانت الجملة الأصلية مثبتة نجعل الندم منفياً (hadn't)، وإذا كانت منفية نجعل الندم مثبتاً (had)! احذف عبارات مثل Unfortunately."
        ],
        commonMistakes: [
          "استخدام ماضٍ بسيط بعد wish بدلاً من الماضي التام عند الندم على الماضي."
        ],
        examples: [
          {
            en: "I didn't set my alarm clock. -> If only I had set my alarm clock!",
            ar: "لم أضبط منبهي. -> ليتني كنت قد ضبطت منبهي!",
            highlight: "If only I had set",
            note: "تعبير عن ندم مثبت بعد نفي"
          },
          {
            en: "You drove through the red traffic light. -> I wish I hadn't driven through it.",
            ar: "تجاوزت الإشارة الحمراء. -> أتمنى لو أنني لم أتجاوزها.",
            highlight: "hadn't driven",
            note: "ندم منفي على فعل ماضٍ"
          }
        ],
        exercises: [
          {
            id: "5u3-ex2",
            question: "You spent all your money on clothes. Express regret: I wish I ______ (not spend) all my money.",
            options: ["hadn't spent", "didn't spend", "haven't spent", "wouldn't spend"],
            correctAnswer: "hadn't spent",
            explanation: "الندم على تصرف في الماضي يتطلب استخدام hadn't + التصريف الثالث spent.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          }
        ]
      }
    ,
      {
        id: "5th-u3-l3",
        unitId: 53,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: الطاقة المتجددة وحلول المناخ (Renewable Energy)",
        titleEn: "Lesson 3: Reading Text - Renewable Energy Sources & Global Warming",
        category: "reading",
        summary: "استيعاب نصوص كتاب الطالب حول الطاقة الشمسية، توربينات الرياح في العراق، والحد من الانبعاثات الكربونية.",
        detailedContent: [
          "الطاقة الشمسية (Solar Energy) تمثل الحل الأمثل للبيئة العراقية المشمسة على مدار العام.",
          "توليد الكهرباء النظيفة يقلل من حرق الوقود الأحفوري ويحد من ظاهرة الاحتباس الحراري (Global Warming).",
          "إعادة تدوير المخلفات وترشيد استهلاك الطاقة يسهمان في الحفاظ على الموارد للأجيال القادمة."
        ],
        teacherNotes: [
          "احفظ المصطلحات العلمية في هذا النص: fossil fuels, renewable resources, carbon footprint."
        ],
        examples: [
          {
            en: "If countries had invested in solar power earlier, pollution would not have reached alarming levels.",
            ar: "لو أن الدول استثمرت في الطاقة الشمسية مبكراً، لما كان التلوث قد وصل إلى مستويات مقلقة (شرطية ثالثة).",
            highlight: "had invested ... would not have reached",
            note: "شرطية ثالثة في سياق بيئي"
          }
        ],
        exercises: [
          {
            id: "5u3-ex3",
            question: "Solar energy is considered a ______ source of power because the sun never runs out.",
            options: ["renewable", "non-renewable", "harmful", "polluting"],
            correctAnswer: "renewable",
            explanation: "الطاقة الشمسية مصدر متجدد (renewable) ونظيف للطاقة.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 44"
          }
        ]
      }
    ]
  },
  {
    id: 54,
    number: 4,
    titleAr: "الوحدة الرابعة: المراجعة الشاملة الأولى وامتحان نصف السنة (Revision 1)",
    titleEn: "Unit 4: Revision 1 & Mid-Year Exam Preparation",
    description: "مراجعة شاملة للوحدات الثلاث الأولى (Units 1-3): أفعال الحالة والحركة، صفات ed/ing، النصيحة had better، الحالات الشرطية، والندم، ونصوص القراءة المستوعبة.",
    accentColor: "from-emerald-600 to-teal-600",
    bgGradient: "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200",
    lessons: [
      {
        id: "5th-u4-l1",
        unitId: 54,
        lessonNumber: 1,
        titleAr: "الدرس الأول: تجميع قواعد الكورس الأول والمقارنة الشاملة",
        titleEn: "Lesson 1: Consolidation of Units 1-3 Grammar & Functions",
        category: "grammar",
        summary: "مراجعة مقارنة بين الحالات الشرطية (Zero, 1, 2, 3)، وقواعد أفعال الحالة والحركة، والندم والنصيحة القوية.",
        grammarRuleFormula: "Conditionals Summary (ملخص الحالات الشرطية):\nZero: If + Present Simple, Present Simple (حقائق علمية عامة)\nFirst: If + Present Simple, will + base (احتمال حقيقي في المستقبل)\nSecond: If + Past Simple, would + base (افتراض خيالي حاضر)\nThird: If + Past Perfect, would have + P.P. (مستحيل في الماضي وندم)",
        detailedContent: [
          "مراجعة تمارين المراجعة في كتاب النشاط صفحة 46-56 (Revision 1).",
          "تدريبات مكثفة على اختيار الصيغة الشرطية المناسبة بناءً على أزمنة شطري الجملة.",
          "التركيز على نصوص الفهم المستوعب والقطع الاستيعابية المعتمدة لنصف السنة."
        ],
        teacherNotes: [
          "امتحان نصف السنة للرابع والخامس الإعدادي يركز على التمييز بين حالتي الشرط الثانية والثالثة، وصياغة الندم بـ I wish / If only."
        ],
        examples: [
          {
            en: "If water boils, it turns into steam.",
            ar: "إذا غلى الماء، يتحول إلى بخار (حالة صفرية - حقيقة علمية).",
            highlight: "boils ... turns",
            note: "حالة صفرية (Zero Conditional)"
          },
          {
            en: "If I have enough money, I will buy a new laptop.",
            ar: "إذا توفر لدي مال كافٍ، فسوف أشتري حاسوباً جديداً (حالة أولى ممكنة).",
            highlight: "have ... will buy",
            note: "حالة أولى (First Conditional)"
          }
        ],
        exercises: [
          {
            id: "5u4-rev-ex1",
            question: "If she ______ (not invite) me, I would not have attended the ceremony.",
            options: ["hadn't invited", "didn't invite", "doesn't invite", "wouldn't invite"],
            correctAnswer: "hadn't invited",
            explanation: "وجود would not have attended في جواب الشرط يدل على الحالة الشرطية الثالثة، لذا فعل الشرط ماضٍ تام hadn't invited.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          }
        ]
      },
      {
        id: "5th-u4-l2",
        unitId: 54,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: مفردات الكورس الأول واستيعاب النصوص والتمارين المنهجية",
        titleEn: "Lesson 2: First Term Vocabulary, Collocations & Reading Dossier",
        category: "vocabulary",
        summary: "كتاب الطالب ص 36-39 وكتاب النشاط ص 48-55: تجميع شامل لمفردات رمضان في العراق، نصائح الصحة واللياقة، والطاقة المتجددة مع بنك التوصيل والإسقاطات لنصف السنة.",
        grammarRuleFormula: "Key Term 1 Collocations:\n- break the fast (يفطر عند المغرب)\n- extreme adjectives (صفات قوية للغاية: freezing, boiling, exhausted)\n- renewable energy (طاقة متجددة)\n- solar panels (ألواح شمسية)\n- carbon footprint (البصمة الكربونية)",
        detailedContent: [
          "تجميع لجميع الأسئلة الاستيعابية لنصوص الكورس الأول من كتاب الطالب.",
          "قطعة رمضان في العراق: الصيام عبادة وروحانية، والتكافل الاجتماعي، وتناول التمر والشوربة مع العائلة عند الغروب.",
          "قطعة الطاقة المتجددة: مصادر الطاقة النظيفة كالرياح والشمس وبدائل الوقود الأحفوري.",
          "تمارين الإسقاطات في كتاب النشاط التي تتكرر في امتحانات نصف السنة."
        ],
        teacherNotes: [
          "احفظ الصفات القوية (Extreme Adjectives): very tired = exhausted, very hot = boiling, very cold = freezing."
        ],
        examples: [
          {
            en: "We were completely exhausted after the long desert journey.",
            ar: "كنا منهكين تماماً بعد الرحلة الصحراوية الطويلة.",
            highlight: "completely exhausted",
            note: "صفة قوية extreme adjective"
          }
        ],
        exercises: [
          {
            id: "5u4-ex2",
            question: "It is extremely hot outside today; the temperature is ______ (boiling / freezing / tiny).",
            options: ["boiling", "freezing", "tiny", "awful"],
            correctAnswer: "boiling",
            explanation: "الصفة القوية للحرارة الشديدة هي boiling.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 52"
          }
        ]
      }
    ,
      {
        id: "5th-u4-l3",
        unitId: 54,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: أدب الكورس الأول (سونيتة 18 لشكسبير) ونموذج نصف السنة",
        titleEn: "Lesson 3: Shakespeare's Sonnet 18 & Comprehensive Midterm Blueprint",
        category: "reading",
        summary: "دراسة النص الأدبي المقرر لشكسبير (Shall I compare thee to a summer's day?) مع نموذج كامل لأسئلة امتحان نصف السنة.",
        detailedContent: [
          "سونيتة 18 تتألف من 14 بيتاً شعرياً بنظام القافية الشكسبيري (abab cdcd efef gg).",
          "الفكرة الجوهرية: جمال الشعر وقدرته على تخليد المحبوب بينما جمال الصيف الطبيعي قصير وعابر.",
          "نموذج امتحان نصف السنة الرسمي للخامس الإعدادي: توزيع الدرجات، نموذج قطعة الاستيعاب، وأسئلة القواعد التراكمية."
        ],
        teacherNotes: [
          "احفظ أول 4 أبيات من سونيتة 18 ومعاني المفردات الأدبية: temperate, rough winds, eternal summer."
        ],
        examples: [
          {
            en: "Why does the poet say his beloved is more lovely than a summer's day? Because summer is too brief and sometimes too hot, but poetry lives forever.",
            ar: "لماذا يرى الشاعر أن محبوبه أجمل من يوم صيفي؟ لأن الصيف قصير جداً وحار أحياناً، بينما الشعر يخلد للأبد.",
            highlight: "more lovely than a summer's day",
            note: "سؤال أدبي مقرر"
          }
        ],
        exercises: [
          {
            id: "5u4-ex3",
            question: "A Shakespearean sonnet consists of ______ lines of poetry.",
            options: ["14", "12", "16", "10"],
            correctAnswer: "14",
            explanation: "السونيتة الشكسبيرية تتكون دائماً من 14 بيتاً شعرياً.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة الرسمي"
          }
        ]
      }
    ]
  },
  {
    id: 55,
    number: 5,
    titleAr: "الوحدة الخامسة: أفعال الاستنتاج والكلام المنقول (Deduction & Reported Speech)",
    titleEn: "Unit 5: Modals of Deduction, Reported Speech & Babylon Festival",
    description: "أفعال الاستنتاج والتأكد (must be, can't be, might be, must have been)، والكلام المنقول للعبارات والأسئلة (Reported Speech)، ومهرجان بابل الدولي.",
    accentColor: "from-purple-600 to-indigo-600",
    bgGradient: "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200",
    lessons: [
      {
        id: "5th-u5-l1",
        unitId: 55,
        lessonNumber: 1,
        titleAr: "الدرس الأول: أفعال الاستنتاج (Modals of Deduction)",
        titleEn: "Lesson 1: Deduction (must, can't, might in Present & Past)",
        category: "grammar",
        summary: "التعبير عن اليقين الإيجابي (must be)، واليقين السلبي بالاستحالة (can't be)، والاحتمالية والشك (might be).",
        grammarRuleFormula: "Present Deduction (استنتاج في الحاضر):\nmust be + adj/noun (مؤكد 100% أنه كذلك)\ncan't be + adj/noun (مستحيل 100% أنه كذلك)\nmight be / could be (ربما ومحتمل 50%)\n\nPast Deduction (استنتاج عن حدث وقع في الماضي):\nSubject + must have + P.P. (مؤكد أنه حصل)\nSubject + can't have + P.P. (مستحيل أنه حصل)\nSubject + might have + P.P. (ربما حصل)",
        detailedContent: [
          "نستخدم must be عندما نكون متأكدين تماماً من صحة الشيء بناءً على أدلة واضحة: His car is in the garage; he must be at home.",
          "نستخدم can't be عندما نكون متأكدين من استحالة الشيء: He is in Cairo today; that can't be Ahmed.",
          "نستخدم might be عندما نكون غير متأكدين (I am not sure / perhaps).",
          "في الماضي نضيف have + التصريف الثالث: The streets are wet; it must have rained last night.",
          "معتمد في كتاب الطالب ص 48 وكتاب النشاط ص 62-65."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه! عكس must be في الاستنتاج هو can't be وليس mustn't be! لا تستخدم mustn't في الاستنتاج إطلاقاً لأن mustn't تعني النهي والتحريم."
        ],
        commonMistakes: [
          "استخدام mustn't be للدلالة على الاستحالة (الصحيح can't be).",
          "نسيان have في الاستنتاج الماضي."
        ],
        examples: [
          {
            en: "She has three cars and a luxury villa. She must be extremely wealthy.",
            ar: "تمتلك 3 سيارات وفيلا فاخرة. لا بد وأنها ثرية للغاية (استنتاج مؤكد).",
            highlight: "must be",
            note: "استنتاج يقيني إيجابي"
          },
          {
            en: "The ground is soaked with water; it must have rained heavily last night.",
            ar: "الأرض مبللة تماماً بالماء؛ لا بد وأنها أمطرت بغزارة الليلة الماضية.",
            highlight: "must have rained",
            note: "استنتاج يقيني في الماضي"
          }
        ],
        exercises: [
          {
            id: "5u5-ex1",
            question: "Ali has lived in Canada for 15 years. He ______ speak English fluently.",
            options: ["must", "can't", "might not", "shouldn't"],
            correctAnswer: "must",
            explanation: "عاش 15 سنة في كندا، دليل قاطع على أنه لا بد وأن يتحدث الإنكليزية بطلاقة (must speak).",
            type: "mcq",
            ministerialYear: "امتحان الفصل الثاني"
          },
          {
            id: "5u5-ex2",
            question: "Ahmed is in London right now. That ______ (can't be / must be / mustn't be) him across the street.",
            options: ["can't be", "must be", "mustn't be", "might be"],
            correctAnswer: "can't be",
            explanation: "استحالة مؤكدة لوجوده في لندن الآن، ونعبر عن الاستحالة في الاستنتاج بـ can't be.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          }
        ]
      },
      {
        id: "5th-u5-l2",
        unitId: 55,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: الكلام المنقول والأسئلة المنقولة (Reported Speech)",
        titleEn: "Lesson 2: Reported Speech & Reported Questions",
        category: "grammar",
        summary: "نقل العبارات والأسئلة مع تغيير الأزمنة خطوة إلى الماضي وتعديل الضمائر وظروف الزمان والمكان.",
        grammarRuleFormula: "Tense Shift (تغيير الأزمنة خطوة للماضي):\nPresent Simple -> Past Simple (am/is/are -> was/were, play -> played)\nPresent Continuous -> Past Continuous (is reading -> was reading)\nPast Simple / Present Perfect -> Past Perfect (wrote / has written -> had written)\nwill -> would, can -> could\n\nReported Questions:\nSubject + asked + (object) + Wh-word / if + Subject + Past Verb\n(e.g., 'Where do you live?' -> He asked me where I lived)",
        detailedContent: [
          "في الجمل الخبرية نستخدم: He said that / He told me that.",
          "في الأسئلة المنقولة: إذا كان السؤال يبدأ بأداة استفهام (Wh-) ننزل الأداة نفسها ثم نقدم الفاعل على الفعل. إذا كان السؤال يبدأ بفعل مساعد نربط بـ if أو whether.",
          "انتبه: في السؤال المنقول يتحول الترتيب إلى جملة خبرية (فاعل ثم فعل) ونحذف علامة الاستفهام.",
          "مأخوذ من كتاب الطالب ص 52 وكتاب النشاط ص 68-72."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تذكر دائماً: في السؤال المنقول احذف do / does وحوّل الفعل إلى ماضٍ بسيط. واحذف did وحوّل الفعل إلى ماضٍ تام (had + P.P.)."
        ],
        commonMistakes: [
          "إبقاء صيغة السؤال بعد أداة الربط مثل: asked me where did I go (خطأ؛ الصحيح asked me where I had gone).",
          "نسيان تغيير الضمائر لتطابق المتحدث والمخاطب."
        ],
        examples: [
          {
            en: "'I am writing my research paper,' Layla said. -> Layla said that she was writing her research paper.",
            ar: "قالت ليلى إنها كانت تكتب ورقتها البحثية (تحويل المضارع المستمر لماضٍ مستمر).",
            highlight: "was writing",
            note: "كلام منقول لجملة خبرية"
          },
          {
            en: "'Where did you buy this jacket?' He asked me where I had bought that jacket.",
            ar: "سألني أين اشتريت تلك السترة (تحويل السؤال مع تقديم الفاعل والماضي التام).",
            highlight: "where I had bought",
            note: "سؤال منقول مع Wh-word"
          }
        ],
        exercises: [
          {
            id: "5u5-rep-ex1",
            question: "'I have lost my passport,' Tariq said. -> Tariq said that he ______ his passport.",
            options: ["had lost", "has lost", "lost", "was losing"],
            correctAnswer: "had lost",
            explanation: "المضارع التام have lost يتحول إلى ماضٍ تام had lost في الكلام المنقول.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الثاني"
          }
        ]
      }
    ,
      {
        id: "5th-u5-l3",
        unitId: 55,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: الأسئلة المنقولة والأوامر المهذبة (Reported Questions & Commands)",
        titleEn: "Lesson 3: Reported Questions with (if / whether / wh-words) & Reported Orders",
        category: "grammar",
        summary: "تحويل الأسئلة المباشرة إلى غير مباشرة باستخدام asked، وتغيير الأزمنة والضمائر، وتحويل الأوامر باستخدام (told / asked to + base).",
        grammarRuleFormula: "1) Wh-Questions: Subject + asked + Wh-word + Subject + Past Verb\n2) Yes/No Questions: Subject + asked + if/whether + Subject + Past Verb\n3) Commands: Subject + told/asked + Object + (not) to + Base Verb",
        detailedContent: [
          "في السؤال المنقول يتحول الترتيب الاستفهامي إلى ترتيب خبري (الفاعل يسبق الفعل).",
          "إذا كان السؤال يبدأ بفعل مساعد (Do, Does, Did, Is, Have, Can) نستخدم الرابط if أو whether.",
          "الأزمنة ترجع خطوة للماضي: المضارع البسيط يصبح ماضياً بسيطاً، والماضي البسيط يصبح ماضياً تاماً.",
          "في الأوامر والطلبات نستخدم to قبل الفعل المثبت و not to قبل الفعل المنفي."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تذكر حذف do و does وتحويل الفعل لماضٍ بسيط (He asked what I wanted)، وحذف did وتحويل الفعل لماضٍ تام (He asked where I had gone)."
        ],
        examples: [
          {
            en: "The police officer asked me if I had seen the driver's license.",
            ar: "سألني ضابط الشرطة عما إذا كنت قد رأيت رخصة القيادة.",
            highlight: "asked me if I had seen",
            note: "سؤال منقول بزمن ماضٍ تام"
          }
        ],
        exercises: [
          {
            id: "5u5-rep-ex2",
            question: "Change to reported speech: 'Where is the clinic?' -> He asked me ______.",
            options: ["where the clinic was", "where was the clinic", "where is the clinic", "if the clinic was"],
            correctAnswer: "where the clinic was",
            explanation: "ترتيب خبري: أداة السؤال where ثم الفاعل the clinic ثم الفعل الماضي was.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الثاني"
          }
        ]
      }
    ]
  },
  {
    id: 56,
    number: 6,
    titleAr: "الوحدة السادسة: المصارف والأفعال السببية (Banking & Causative Verbs)",
    titleEn: "Unit 6: Money, Banking, Passive Voice & Causative Verbs",
    description: "الأفعال السببية (have / get / make)، والمبني للمجهول في مختلف الأزمنة، والمفردات المصرفية والمالية وإدارة الأموال.",
    accentColor: "from-blue-600 to-teal-600",
    bgGradient: "bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200",
    lessons: [
      {
        id: "5th-u6-l1",
        unitId: 56,
        lessonNumber: 1,
        titleAr: "الدرس الأول: الأفعال السببية (have, get, make)",
        titleEn: "Lesson 1: Causative Verbs (have / get + object + P.P. & make)",
        category: "grammar",
        summary: "التعبير عن خدمات يؤديها شخص متخصص لك (have/get)، أو إجبار وتسبب في فعل شيء (make).",
        grammarRuleFormula: "have / get (شخص آخر ينجز الفعل لأجلك):\nSubject + had / got + Object + Past Participle (P.P.)\n(e.g., I had my car repaired = أصلحتُ سيارتي لدى الميكانيكي)\n\nmake (سبب أو إجبار):\nSubject + made + Object + Base Verb (مصدر مجرد)\n(e.g., The strong wind made the leaves fall / The loud noise made him look out)",
        detailedContent: [
          "have و get: تدلان على أن فاعل الجملة طلب من شخص مهني أو متخصص أن ينجز له عملاً (قص الشعر، تصليح السيارة، طلاء المنزل).",
          "بعد had / got يأتي المفعول به ثم التصريف الثالث (P.P.).",
          "make: تدل على السبب والإجبار، وبعد المفعول به يأتي مصدر مجرد خالٍ من أي إضافة (بدون to).",
          "مقتبس من كتاب الطالب صفحة 60 وكتاب النشاط صفحة 82-85 وهو مطابق 100% لوزاري السادس الإعدادي الوحدة الثانية."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: قاعدة ذهبية: had / got يتبعها P.P. (تصريف ثالث). أما made فيتبعها base verb (مصدر مجرد)! احفظ هذا الفارق لتضمن درجتها كاملة."
        ],
        commonMistakes: [
          "وضع مصدر بعد had / got (الصحيح P.P.).",
          "وضع to بعد made مثل: made him to cry (الصحيح made him cry)."
        ],
        examples: [
          {
            en: "Mona had her computer fixed yesterday.",
            ar: "قامت منى بإصلاح حاسوبها بالأمس (لدى فني صيانة متخصص).",
            highlight: "had her computer fixed",
            note: "صيغة سببية مع had + مفعول + تصريف ثالث"
          },
          {
            en: "The sad movie made everyone cry.",
            ar: "الفيلم الحزين جعل الجميع يبكون.",
            highlight: "made everyone cry",
            note: "سببية مع made + مصدر مجرد"
          }
        ],
        exercises: [
          {
            id: "5u6-ex1",
            question: "My father got the mechanic ______ (check) the brakes.",
            options: ["to check", "check", "checked", "checking"],
            correctAnswer: "to check",
            explanation: "مع وجود فاعل الفعل المباشر mechanic بعد get نستخدم to + المصدر، بينما في المبني للمجهول: got the brakes checked.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          },
          {
            id: "5u6-ex2",
            question: "The heavy wind made the leaves ______ (fall / to fall / fallen).",
            options: ["fall", "to fall", "fallen", "falling"],
            correctAnswer: "fall",
            explanation: "بعد الفعل السببي made نستخدم دائماً المصدر المجرد الخالي من الإضافات fall.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          }
        ]
      },
      {
        id: "5th-u6-l2",
        unitId: 56,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: المبني للمجهول والمفردات المصرفية (Passive Voice & Banking)",
        titleEn: "Lesson 2: Passive Voice & Banking Terminology",
        category: "grammar",
        summary: "تحويل الجمل إلى المبني للمجهول في مختلف الأزمنة للتركيز على الحدث بدلاً من الفاعل.",
        grammarRuleFormula: "Passive Formula (صيغة المجهول العامة):\nObject + Verb to be (في زمن الجملة) + Past Participle (P.P.)\n\n1) Present Simple: is / are + P.P. (The bill is paid online)\n2) Past Simple: was / were + P.P. (The bank was robbed yesterday)\n3) Present Continuous: is / are being + P.P. (The machine is being repaired)\n4) Future: will be + P.P. (The loan will be approved soon)",
        detailedContent: [
          "خطوات تحويل الجملة إلى المجهول: 1) نحذف الفاعل، 2) نضع المفعول به في البداية، 3) نضع فعل be المناسب لزمن الجملة ولإفراد أو جمع المفعول به، 4) نحول الفعل الرئيسي إلى التصريف الثالث P.P.",
          "المفردات المصرفية من كتاب النشاط ص 86: bank account (حساب مصرفي), balance (الرصيد), withdraw (يسحب مالاً), deposit (يودع مالاً), loan (قرض), interest (فائدة)."
        ],
        teacherNotes: [
          "احرص على حفظ تصاريف الأفعال الشاذة الشائعة في كتاب النشاط: pay -> paid, steal -> stolen, send -> sent, write -> written."
        ],
        examples: [
          {
            en: "Millions of transactions are processed electronically every second.",
            ar: "تُعالج ملايين المعاملات إلكترونياً كل ثانية.",
            highlight: "are processed",
            note: "مبني للمجهول في المضارع البسيط"
          }
        ],
        exercises: [
          {
            id: "5u6-pas-ex1",
            question: "The bank statement ______ (send) to your email every month.",
            options: ["is sent", "sends", "was sending", "sent"],
            correctAnswer: "is sent",
            explanation: "الجملة مبنية للمجهول في المضارع البسيط (every month) والمفعول به مفرد، لذا نستخدم is sent.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          }
        ]
      }
    ,
      {
        id: "5th-u6-l3",
        unitId: 56,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: قصة الكتاب - العمل في مصرف والخدمات المالية (Banking Careers)",
        titleEn: "Lesson 3: Reading Text - Working in a Bank & Youth Accounts",
        category: "reading",
        summary: "استيعاب نص كتاب الطالب حول مهام موظف البنك، فتح الحسابات للشباب، وتقديم القروض للمشاريع الناشئة.",
        detailedContent: [
          "مهنة موظف البنك (Banker) تتطلب مهارات تواصل قوية ومعرفة دقيقة بالرياضيات والأنظمة المالية الرقمية.",
          "يقدم البنك خدمات متنوعة للشباب: بطاقات الصراف الآلي (ATM cards)، القروض الدراسية، والحسابات الادخارية بفائدة مجزية.",
          "تقييم طلبات القروض: مساعدة أصحاب المشاريع الصغيرة في شراء المعدات والمتاجر لتنشيط الاقتصاد المحلي."
        ],
        teacherNotes: [
          "هذا النص يمهد مباشرة لقطعة (Meet a Banker) في الوحدة السادسة للسادس الإعدادي، دراستك لها الآن تسهل عليك منهج السادس."
        ],
        examples: [
          {
            en: "A banker has to explain complex financial products in simple language to clients.",
            ar: "يتعين على موظف البنك شرح المنتجات المالية المعقدة بلغة بسيطة للعملاء.",
            highlight: "explain complex financial products",
            note: "مهام وظيفة البنك"
          }
        ],
        exercises: [
          {
            id: "5u6-pas-ex2",
            question: "A bank account specifically designed for teenagers usually offers ______ fees.",
            options: ["reduced or zero", "extremely high", "penalty", "illegal"],
            correctAnswer: "reduced or zero",
            explanation: "حسابات الشباب والطلاب تكون معفاة من الرسوم أو برسوم مخفضة.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 82"
          }
        ]
      }
    ]
  },
  {
    id: 57,
    number: 7,
    titleAr: "الوحدة السابعة: صيغ المستقبل والتكنولوجيا (Future Forms & Technology)",
    titleEn: "Unit 7: Future Forms, Digital Technology & Artificial Intelligence",
    description: "أشكال التعبير الخمسة عن المستقبل والفروق الدقيقة بينها، والتطور التكنولوجي والذكاء الاصطناعي والهواتف الذكية.",
    accentColor: "from-cyan-600 to-blue-600",
    bgGradient: "bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200",
    lessons: [
      {
        id: "5th-u7-l1",
        unitId: 57,
        lessonNumber: 1,
        titleAr: "الدرس الأول: التمييز بين صيغ المستقبل المتعددة",
        titleEn: "Lesson 1: Choosing the Correct Future Form",
        category: "grammar",
        summary: "متى نستخدم will، ومتى going to، ومتى المضارع المستمر، ومتى المستقبل المستمر.",
        grammarRuleFormula: "1) will + base: تنبؤات بدون دليل، وعود، قرارات سريعة لحظية (I will help you carry those bags)\n2) be going to + base: خطط ونوايا مسبقة، تنبؤ مبني على دليل مرئي (Look at the clouds, it is going to rain)\n3) Present Continuous (am/is/are + v-ing): مواعيد وترتيبات ثابتة مع أشخاص (I am meeting the manager tomorrow)\n4) Future Continuous (will be + v-ing): حدث مستمر في نقطة محددة في المستقبل (This time next week, I will be flying to London)",
        detailedContent: [
          "إذا كان هناك قرار لحظي سريع نستخدم will.",
          "إذا كان هناك دليل مرئي أو نية وخطة نستخدم be going to.",
          "إذا كانت هناك ترتيبات رسمية أو تذاكر محجوزة مسبقاً نستخدم المضارع المستمر.",
          "المستقبل المستمر (Future Continuous) يدل على نشاط سيكون قيد الحدوث في وقت محدد بالمستقبل.",
          "هذا الموضوع من كتاب الطالب ص 68 وكتاب النشاط ص 102 تمهيد أساسي ومباشر للوحدة السابعة في مرحلة السادس الإعدادي."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه للكلمات الدالة: I think / probably / I hope -> will. I have decided / plan / intention -> going to. Fixed schedule with time -> Present Continuous."
        ],
        commonMistakes: [
          "استخدام will مع ترتيبات محددة بزمان ومكان متفق عليهما مسبقاً."
        ],
        examples: [
          {
            en: "We are flying to Istanbul on Friday; we already bought the tickets.",
            ar: "نحن مسافرون إلى إسطنبول يوم الجمعة؛ لقد اشترينا التذاكر بالفعل (ترتيب مؤكد).",
            highlight: "are flying",
            note: "مضارع مستمر لترتيب مستقبلي مؤكد"
          },
          {
            en: "Look at those dark clouds! It is going to rain soon.",
            ar: "انظر إلى تلك الغيوم المظلمة! إنها ستمطر قريباً (تنبؤ مبني على دليل مرئي).",
            highlight: "is going to rain",
            note: "تنبؤ مع دليل"
          }
        ],
        exercises: [
          {
            id: "5u7-ex1",
            question: "Look at those dark clouds! It ______ (rain). (will rain / is going to rain / rains)",
            options: ["is going to rain", "will rain", "rains", "rained"],
            correctAnswer: "is going to rain",
            explanation: "تنبؤ مستقبلي مبني على دليل مرئي حاضر (الغيوم السوداء) يقتضي استخدام is going to rain.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          },
          {
            id: "5u7-ex2",
            question: "Between 7:00 and 9:00 tonight, I ______ (study) for the final exam. [Future Continuous]",
            options: ["will be studying", "will study", "study", "am studying"],
            correctAnswer: "will be studying",
            explanation: "تحديد فترة زمنية مستقبلية معينة يدل على استمرار الحدث في ذلك الوقت، فنستخدم المستقبل المستمر will be studying.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          }
        ]
      },
      {
        id: "5th-u7-l2",
        unitId: 57,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: التكنولوجيا الحديثة ومدن المستقبل والذكاء الاصطناعي",
        titleEn: "Lesson 2: Modern Technology, Smart Cities & AI",
        category: "vocabulary",
        summary: "كتاب الطالب ص 76-79 وكتاب النشاط ص 102-107: التحول الرقمي، المدن الذكية، إنترنت الأشياء والذكاء الاصطناعي ومستقبل الوظائف.",
        grammarRuleFormula: "Tech Lexicon:\n- smart cities (مدن ذكية مستدامة)\n- artificial intelligence (الذكاء الاصطناعي)\n- driverless cars (سيارات ذاتية القيادة)\n- virtual reality (الواقع الافتراضي)\n- digital literacy (محو الأمية الرقمية)",
        detailedContent: [
          "نص القراءة الاستيعابي يتناول شكل الحياة في مدن عام 2050 وكيف ستعتمد المنازل على الطاقة الشمسية وأنظمة التحكم الذكية.",
          "تأثير التكنولوجيا على التعليم والطب والتنقل وتقليل الانبعاثات الكربونية.",
          "تمرين الإسقاطات في كتاب النشاط يربط بين الكلمات التكنولوجية وسياقاتها العملية."
        ],
        teacherNotes: [
          "هذا الموضوع هو أساس إنشاء الوحدة السابعة المعتمد (Pros and Cons of Smartphones / AI)."
        ],
        examples: [
          {
            en: "Smart cities will use artificial intelligence to optimize energy consumption.",
            ar: "ستستخدم المدن الذكية الذكاء الاصطناعي لتحسين استهلاك الطاقة.",
            highlight: "Smart cities / artificial intelligence",
            note: "مصطلحات تكنولوجية متقدمة"
          }
        ],
        exercises: [
          {
            id: "5u7-ex3",
            question: "______ cars are expected to reduce traffic accidents significantly in the future.",
            options: ["Driverless", "Flying", "Slow", "Steam"],
            correctAnswer: "Driverless",
            explanation: "السيارات ذاتية القيادة بدون سائق (Driverless cars).",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 105"
          }
        ]
      }
    ,
      {
        id: "5th-u7-l3",
        unitId: 57,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: المستقبل في الماضي والمدن الذكية (Future in the Past)",
        titleEn: "Lesson 3: Future in the Past & Reading Text on Smart Cities",
        category: "grammar",
        summary: "صياغة المستقبل في الماضي (was/were going to, would) للتعبير عن خطط وتوقعات سابقة، واستيعاب نصوص المدن الذكية.",
        grammarRuleFormula: "will -> would | is/are going to -> was/were going to | is/are + V-ing -> was/were + V-ing",
        detailedContent: [
          "نستخدم Future in the Past عندما نتحدث من منظور نقطة زمنية في الماضي عن شيء كان مستقبلاً في حينه.",
          "أمثلة: I decided I was going to study software engineering in Baghdad.",
          "نص المدن الذكية (Smart Cities): استخدام الذكاء الاصطناعي وإنترنت الأشياء لتنظيم حركة المرور وتوفير الطاقة في مدن المستقبل."
        ],
        teacherNotes: [
          "احفظ تحويلات الأفعال: will تصبح would، و am/is/are تصبح was/were."
        ],
        examples: [
          {
            en: "I knew the modern traffic system would reduce road congestion dramatically.",
            ar: "كنت أعلم أن نظام المرور الحديث سيقلل الازدحام بشكل كبير (future in the past).",
            highlight: "would reduce",
            note: "مستقبل في الماضي مع would"
          }
        ],
        exercises: [
          {
            id: "5u7-ex4",
            question: "Change to Future in the Past: I will learn Japanese. -> I decided that I ______ Japanese.",
            options: ["would learn", "will learn", "am learning", "have learned"],
            correctAnswer: "would learn",
            explanation: "تحويل will إلى would في المستقبل في الماضي.",
            type: "mcq",
            ministerialYear: "امتحان نهاية الكورس الثاني"
          }
        ]
      }
    ]
  },
  {
    id: 58,
    number: 8,
    titleAr: "الوحدة الثامنة: المراجعة الشاملة الثانية والامتحان النهائي (Revision 2)",
    titleEn: "Unit 8: Revision 2 & Final Exam Comprehensive Preparation",
    description: "مراجعة شاملة للوحدات 5 إلى 7، مع التركيز على تدريبات كتاب النشاط، وبادئات النفي والاشتقاقات والإملاء الوزاري.",
    accentColor: "from-violet-600 to-purple-600",
    bgGradient: "bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200",
    lessons: [
      {
        id: "5th-u8-l1",
        unitId: 58,
        lessonNumber: 1,
        titleAr: "الدرس الأول: المراجعة الشاملة للقواعد والوظائف اللغوية للكورس الثاني",
        titleEn: "Lesson 1: Second Term Grammar Consolidation & Functions",
        category: "grammar",
        summary: "تجميع شامل لجميع قواعد الكورس الثاني: أفعال الاستنتاج، الكلام المنقول، الأفعال السببية، المبني للمجهول، وصيغ المستقبل.",
        grammarRuleFormula: "Key Grammar Formulae Checklist:\n1) Deduction: must be / can't be / might be (Present) & must/can't have + P.P. (Past)\n2) Reported Speech: Tense step back, pronoun shift, question inversion\n3) Causatives: had/got + obj + P.P. vs made + obj + base\n4) Passive: be + P.P. in appropriate tense\n5) Future: will vs going to vs Pres. Cont. vs Future Cont.",
        detailedContent: [
          "مراجعة تمارين كتاب النشاط صفحة 115-125 (Revision 2).",
          "حل نماذج الأسئلة المتكررة في امتحانات نهاية السنة لمحافظات العراق (العلمي والأدبي).",
          "التدريب على أنماط الأسئلة الوزارية: Do as required between brackets (أجب وفق ما هو مطلوب بين القوسين)."
        ],
        teacherNotes: [
          "احرص على مراجعة قائمة الإملاء في كتاب النشاط صفحة 110-112؛ درجات السؤال الثالث (20 درجة) مضمونة بحفظ هذه المشتقات والبادئات."
        ],
        examples: [
          {
            en: "Someone is decorating the hall. -> The hall is being decorated. [Passive]",
            ar: "شخص ما يقوم بتزيين القاعة. -> القاعة قيد التزيين الآن.",
            highlight: "is being decorated",
            note: "مبني للمجهول في المضارع المستمر"
          },
          {
            en: "She said, 'I have won.' -> She said that she had won. [Reported Speech]",
            ar: "قالت 'لقد فزت'. -> قالت إنها كانت قد فازت.",
            highlight: "she had won",
            note: "كلام منقول ماضٍ تام"
          }
        ],
        exercises: [
          {
            id: "5u8-rev-ex1",
            question: "patient -> impatient ; mature -> ______ [Spelling / Prefix]",
            options: ["immature", "unmature", "dismature", "inmature"],
            correctAnswer: "immature",
            explanation: "بادئة النفي للكلمات التي تبدأ بحرف m هي im- فتصبح immature.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          }
        ]
      },
      {
        id: "5th-u8-l2",
        unitId: 58,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: المراجعة الإملائية ونموذج امتحان نهاية السنة",
        titleEn: "Lesson 2: Final Spelling, Derivatives & Model Exam Readiness",
        category: "spelling",
        summary: "تجميع شامل لقواعد الاشتقاق والإملاء من كتاب النشاط ص 110-125، تصاريف الأفعال الشاذة، والتهيئة الكاملة لامتحان نهاية السنة (100 درجة).",
        grammarRuleFormula: "Key Prefixes & Suffixes:\n- direct -> indirect | patient -> impatient | legal -> illegal\n- danger -> dangerous | expense -> expensive\n- invest -> investment | rely -> reliable",
        detailedContent: [
          "مراجعة شاملة لجميع أنماط الأسئلة التي ترد في السؤال الثالث (المفردات والإملاء) لامتحانات الخامس الإعدادي.",
          "تصاريف الأفعال الشاذة المتقدمة: tear -> tore -> torn, freeze -> froze -> frozen, shake -> shook -> shaken.",
          "كيفية تنظيم ورقة الامتحان وتوزيع الوقت على الأقسام الخمسة (القطعة الخارجية، قطع الكتاب والأدب، القواعد، المفردات والإملاء، والإنشاء)."
        ],
        teacherNotes: [
          "احفظ تصريف freeze -> frozen و tear -> torn، فهما يتكرران بشكل ملحوظ في الدور الأول والدور الثاني."
        ],
        examples: [
          {
            en: "Comprehensive preparation ensures full marks in both scientific and literary branches.",
            ar: "الاستعداد الشامل يضمن الدرجة الكاملة لطلبة الفرعين العلمي والأدبي.",
            highlight: "Comprehensive preparation",
            note: "التهيئة للامتحان"
          }
        ],
        exercises: [
          {
            id: "5u8-rev-ex2",
            question: "freeze -> frozen ; tear -> ______ [Spelling / Irregular P.P.]",
            options: ["torn", "teared", "tored", "tearing"],
            correctAnswer: "torn",
            explanation: "التصريف الثالث للفعل الشاذ tear هو torn.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          }
        ]
      }
    ,
      {
        id: "5th-u8-l3",
        unitId: 58,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: النموذج الامتحاني النهائي الشامل للخامس الإعدادي",
        titleEn: "Lesson 3: Comprehensive Final Exam Blueprint & Literature Poetry Focus",
        category: "spelling",
        summary: "نموذج امتحاني شامل يحاكي أسئلة نهاية السنة الرسمية للخامس الإعدادي مع التركيز على أدب الكورس الثاني (قصيدة الأشياء التي أحبها).",
        grammarRuleFormula: "Final Examination Structure (100 Marks):\nQ1. Reading Comprehension (Unseen & Textbook - 20 Marks)\nQ2. Grammar & Functions (30 Marks)\nQ3. Vocabulary & Spelling (20 Marks)\nQ4. Literature Focus (10 Marks)\nQ5. Written Composition (20 Marks)",
        detailedContent: [
          "مراجعة شاملة لجميع صيغ الأسئلة المعتمدة في امتحانات الدور الأول والثاني.",
          "تحليل أسئلة الأدب المقررة لقصيدة (Things I Love) وسونيتة شكسبير 18.",
          "نصائح كتابة الإنشاء: تنظيم الأفكار، استخدام الروابط البلاغية (Furthermore, In conclusion, On the other hand)."
        ],
        teacherNotes: [
          "احرص على مراجعة قائمة الإملاء في كتاب النشاط للتأكد من كتابة الكلمات الصعبة بدقة."
        ],
        examples: [
          {
            en: "Comprehensive exam preparation builds unwavering academic confidence.",
            ar: "الاستعداد الامتحاني الشامل يولد ثقة أكاديمية راسخة.",
            highlight: "comprehensive exam preparation",
            note: "توجيه امتحاني"
          }
        ],
        exercises: [
          {
            id: "5u8-rev-ex3",
            question: "Spelling: depend -> dependent ; obey -> ______",
            options: ["obedient", "obeyed", "obeyable", "inobedient"],
            correctAnswer: "obedient",
            explanation: "الصفة المشتقة من الفعل obey هي obedient (مطيع).",
            type: "mcq",
            ministerialYear: "امتحان الدور الأول"
          }
        ]
      }
    ]
  }
];

// =========================================================================
// أدب الخامس الإعدادي (Literature: Tennyson & Katherine Mansfield)
// المعتمد رسمياً في كتاب الطالب وكتاب النشاط للامتحانات الرسمية
// =========================================================================
export const FIFTH_PREPARATORY_LITERATURE: LiteratureItem[] = [
  {
    id: "5th-lit-tennyson",
    title: "The Charge of the Light Brigade",
    titleAr: "قصيدة: هجوم اللواء الخفيف (ألفريد لورد تينيسون)",
    author: "Alfred Lord Tennyson",
    authorAr: "ألفريد لورد تينيسون (شاعر بلاط الإمبراطورية البريطانية)",
    authorYears: "1809 - 1892",
    authorBioAr: [
      "ألفريد لورد تينيسون هو أحد أعظم وأبرز شعراء العصر الفيكتوري في بريطانيا وتولى منصب شاعر البلاط الملكي (Poet Laureate).",
      "تتميز قصائده بالموسيقى الإيقاعية القوية والتصوير الحماسي للواجب والشرف الإنساني والبطولة العسكرية.",
      "كتب هذه القصيدة عام 1854 بعد قراءته تقريراً صحفياً في صحيفة التايمز عن المعركة المأساوية للفرسان البريطانيين."
    ],
    genre: "Heroic Narrative Poetry",
    genreAr: "شعر ملحمي حماسي عن التضحية والواجب العسكري",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
    imageCaptionAr: "فرسان اللواء الخفيف يتقدمون بشجاعة في معركة بالاكلافا التاريخية",
    summaryAr: "قصيدة ملحمية خالدة تخلد ذكرى هجوم 600 فارس بريطاني في معركة بالاكلافا (حرب القرم عام 1854). على الرغم من إدراك الفرسان أن قائدهم العسكري أصدر أمراً خاطئاً وكارثياً (Someone had blundered)، وأنهم يركضون نحو وادي الموت (Valley of Death) بين مدافع العدو الروسي المحيطة بهم من اليمين واليسار والأمام، إلا أنهم أطاعوا الواجب بشجاعة أسطورية دون تردد (Theirs not to make reply, Theirs not to reason why, Theirs but to do and die). يصف تينيسون بطولتهم العظيمة ويدعو العالم لتكريم شجاعتهم الخالدة.",
    moralLessonAr: "الشجاعة الفائقة، الإخلاص المطلق للواجب، والتضحية بالروح رغم الأخطاء القيادية القاتلة.",
    keyThemes: ["Duty and Obedience (الواجب والطاعة العسكرية)", "Heroism facing inevitable death (البطولة في مواجهة الموت الحتمي)", "The Tragic Cost of War (الثمن المأساوي للحروب)"],
    characters: [
      {
        name: "The Six Hundred Horsemen",
        nameAr: "الفرسان الستمائة (اللواء الخفيف)",
        role: "The heroic cavalrymen",
        roleAr: "فرسان اللواء الخفيف الذين ضحوا بأرواحهم",
        description: "Rode courageously into the Valley of Death obeying military command without hesitation or fear.",
        descriptionAr: "تقدموا بفروسية نادرة نحو مدافع العدو لتنفيذ الأمر العسكري حتى الموت."
      }
    ],
    ministerialQA: [
      {
        id: "5th-tenn-q1",
        question: "How many cavalrymen charged into the Valley of Death?",
        questionAr: "كم عدد الفرسان الذين اندفعوا إلى وادي الموت؟",
        answer: "Six hundred men (the Noble Six Hundred).",
        answerAr: "ستمائة فارس (الستمائة النبلاء).",
        year: "امتحان نصف السنة"
      },
      {
        id: "5th-tenn-q2",
        question: "What historic war and battle does the poem describe?",
        questionAr: "ما هي الحرب التاريخية والمعركة التي تصفها القصيدة؟",
        answer: "The Crimean War (1854), specifically the Battle of Balaclava.",
        answerAr: "حرب القرم (عام 1854)، وتحديداً معركة بالاكلافا.",
        year: "امتحان نهاية السنة"
      },
      {
        id: "5th-tenn-q3",
        question: "Did the soldiers know that someone had made a mistake (blundered)?",
        questionAr: "هل كان الجنود يعلمون أن شخصاً ما قد ارتكب خطأً قيادياً؟",
        answer: "Yes, the soldiers knew someone had blundered, yet they obeyed without hesitation: 'Theirs not to reason why, Theirs but to do and die.'",
        answerAr: "نعم، علموا بالخطأ، ومع ذلك أطاعوا الواجب دون تردد: ليس عليهم التساؤل بل أداء الواجب والموت بشرف.",
        year: "امتحان نهاية السنة 2024"
      },
      {
        id: "5th-tenn-q4",
        question: "What is the famous refrain repeated throughout the poem?",
        questionAr: "ما هي اللازمة الشعرية الشهيرة المتكررة في القصيدة؟",
        answer: "'Rode the six hundred' and 'Into the valley of Death'.",
        answerAr: "'ركب الستمائة' و 'إلى وادي الموت'.",
        year: "امتحان الفصل الثاني"
      }
    ]
  },
  {
    id: "5th-lit-mansfield",
    title: "The Doll's House",
    titleAr: "قصة: بيت الدمية (كاثرين مانسفيلد)",
    author: "Katherine Mansfield",
    authorAr: "كاثرين مانسفيلد (رائدة القصة القصيرة العالمية)",
    authorYears: "1888 - 1923",
    authorBioAr: [
      "كاثرين مانسفيلد كاتبة نيوزيلندية شهيرة، وتعد من أعظم رواد القصة القصيرة الحديثة في الأدب الإنكليزي.",
      "تميزت أعمالها بالعمق النفسي، ودراسة الفروق الطبقية، والتقاط اللحظات الإنسانية الصغيرة المشحونة بالمشاعر."
    ],
    genre: "Realistic Short Story",
    genreAr: "قصة قصيرة واقعية تنتقد الفروق والتعالي الطبقي",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
    imageCaptionAr: "بيت الدمية الفاخر الذي كشف الفجوة الطبقية بين فتيات المدرسة",
    summaryAr: "تتلقى فتيات عائلة بيرنيل الثرية (إيزابيل، لوتي، وكيزيا) بيت دمية رائعاً ومتقناً، تفتخر به إيزابيل وتدعو زميلات المدرسة لمشاهدته. تركز الطفلة الرقيقة كيزيا اهتمامها على مصباح كهرماني صغير موضوع على طاولة غرفة الطعام يبدو حقيقياً تماماً. غير أن عائلة بيرنيل وبقية المجتمع ينبذون الشقيقتين الفقيرتين كيلفي (ليل وإلسي) لأن والدتهما غسالة فقيرة ووالدهما في السجن. تتحدى كيزيا القواعد الطبقية القاسية وتدعو الفتاتين الفقيرتين لمشاهدة بيت الدمية، ولكن العمة المتغطرسة بيريل تطردهما بغضب وقسوة. تنتهي القصة بابتسامة نادرة للطفلة الصامتة إلسي، قائلة بسعادة: 'لقد رأيت المصباح الصغير!'، مما يرمز للأمل والنور والمساواة الإنسانية.",
    moralLessonAr: "نبذ العنصرية والتمييز الطبقي؛ البراءة والتعاطف الإنساني يتجاوزان الحواجز الاجتماعية المصطنعة.",
    keyThemes: ["Social Class and Cruelty (الطبقية الاجتماعية والقسوة)", "Childhood Innocence (براءة الطفولة)", "The Lamp as Light and Hope (المصباح كرمز للنور والأمل)"],
    characters: [
      {
        name: "Kezia Burnell",
        nameAr: "كيزيا بيرنيل",
        role: "The kind-hearted sister",
        roleAr: "الأخت الصغرى الحنونة المتحدية للطبقية",
        description: "Loves the little amber lamp the most, and shows empathy by inviting the outcast Kelvey sisters.",
        descriptionAr: "تعشق المصباح الصغير أكثر من أي شيء آخر وتظهر تعاطفاً إنسانياً بدعوة الشقيقتين كيلفي."
      },
      {
        name: "Lil and Else Kelvey",
        nameAr: "ليل وإلسي كيلفي",
        role: "The poor outcast sisters",
        roleAr: "الشقيقتان الفقيرتان المنبوذتان",
        description: "Daughters of a poor washerwoman, dressed in cast-off clothes, shunned by society.",
        descriptionAr: "ابنتا غسالة فقيرة، ترتديان ملابس بالية، ينبذهما الجميع في المدرسة والمجتمع."
      },
      {
        name: "Our Else",
        nameAr: "إلسي الصغيرة",
        role: "The silent little girl",
        roleAr: "الأخت الصغرى الفقيرة الصامتة",
        description: "Never smiles until she sees the little lamp in the doll's house, finding pure joy.",
        descriptionAr: "طفلة فقيرة صامتة تشعر بسعادة غامرة عندما رأت مصباح الأمل الصغير."
      },
      {
        name: "Aunt Beryl",
        nameAr: "العمة بيريل",
        role: "The cruel adult",
        roleAr: "العمة القاسية المجسدة للتعالي الطبقي",
        description: "Scolds Kezia furiously and drives the Kelvey girls away like stray animals.",
        descriptionAr: "تطرد الفتاتين الفقيرتين بقسوة وتعنف كيزيا بشدة."
      }
    ],
    ministerialQA: [
      {
        id: "5th-doll-q1",
        question: "What was Kezia's favourite thing in the doll's house?",
        questionAr: "ما هو الشيء المفضل لدى كيزيا في بيت الدمية؟",
        answer: "The exquisite little amber lamp on the dining room table.",
        answerAr: "المصباح الصغير الرائع ذو اللون الكهرماني على طاولة غرفة الطعام.",
        year: "امتحان الفصل الثاني"
      },
      {
        id: "5th-doll-q2",
        question: "Why were the Kelvey sisters shunned and avoided by everyone at school?",
        questionAr: "لماذا كان الجميع في المدرسة يتجنب ويعزل الشقيقتين كيلفي؟",
        answer: "Because of their social class; their mother was a poor washerwoman and their father was rumored to be in prison.",
        answerAr: "بسبب طبقتهما الاجتماعية؛ فأمهما كانت غسالة فقيرة وكان يشاع أن والدهما في السجن.",
        year: "امتحان نصف السنة"
      },
      {
        id: "5th-doll-q3",
        question: "What does the little lamp symbolize in the story?",
        questionAr: "إلى ماذا يرمز المصباح الصغير في القصة؟",
        answer: "It symbolizes human warmth, enlightenment, innocence, and hope for social equality.",
        answerAr: "يرمز إلى الدفء الإنساني، النور، البراءة، والأمل في المساواة والعدالة الاجتماعية.",
        year: "امتحان نهاية السنة"
      },
      {
        id: "5th-doll-q4",
        question: "What did Else say at the end of the story?",
        questionAr: "ماذا قالت إلسي الصغيرة في نهاية القصة؟",
        answer: "She smiled softly and said: 'I seen the little lamp.'",
        answerAr: "ابتسمت بهدوء وقالت: 'لقد رأيتُ المصباح الصغير'.",
        year: "امتحان نهاية السنة 2024"
      }
    ]
  }
];

// =========================================================================
// إنشاءات الخامس الإعدادي (Essays / Compositions)
// المعتمدة رسمياً في كتاب الطالب وكتاب النشاط للامتحانات الرسمية
// =========================================================================
export const FIFTH_PREPARATORY_ESSAYS: EssayItem[] = [
  {
    id: "5th-essay-ramadan",
    unitId: 51,
    titleAr: "إنشاء الوحدة الأولى: تقاليد شهر رمضان المبارك في العراق (Ramadan Traditions in Iraq)",
    titleEn: "Ramadan Traditions and Hospitality in Iraq",
    ministerialWeight: "15 درجة في الامتحان النهائي",
    paragraphsEn: [
      "The holy month of Ramadan holds a profound spiritual and cultural significance in Iraq. It is a sacred season of fasting, deep reflection, self-discipline, and overwhelming generosity towards neighbours and the less fortunate.",
      "During Ramadan, families gather each evening around the rich Iftar table, which invariably starts with sweet dates, cold lentil soup, and fresh fruit juices. Traditional Iraqi delicacies like Kubba, Dolma, and Biryani are served, followed by golden syrup-soaked sweets like Baklava and Zalabia.",
      "After the night prayers (Taraweeh), lively streets and cafes fill with people socialising and playing the traditional folk game 'Mheibes'. Ramadan in Iraq fosters remarkable brotherhood, compassion, and communal solidarity that binds society together."
    ],
    paragraphsAr: [
      "يحظى شهر رمضان المبارك بمكانة روحية وثقافية عميقة في العراق. إنه موسم مقدس للصيام والتأمل العميق والانضباط الذاتي والكرم الفياض تجاه الجيران والفقراء.",
      "خلال شهر رمضان، تجتمع العوائل كل مساء حول مائدة الإفطار العامرة، والتي تبدأ دائماً بالتمر العراقي وشوربة العدس الساخنة والعصائر الطازجة. وتُقدم أشهى الأطباق العراقية الأصيلة كالكبة والدولمة والبرياني، تليها الحلويات اللذيذة كالبقلاوة والزلابية.",
      "وبعد صلاة التراويح، تمتلئ الشوارع والمقاهي بالناس للتسامر ولعب اللعبة التراثية الشعبية الشهيرة 'المحيبس'. إن رمضان في العراق يجسد أسمى معاني الأخوة والرحمة والتكافل الاجتماعي الذي يشد أواصر المجتمع."
    ],
    keywords: [
      { word: "spiritual significance", meaning: "مكانة روحية سامية" },
      { word: "self-discipline", meaning: "الانضباط الذاتي" },
      { word: "Iftar table", meaning: "مائدة الإفطار" },
      { word: "Mheibes game", meaning: "لعبة المحيبس التراثية" },
      { word: "communal solidarity", meaning: "التكافل والتضامن الاجتماعي" }
    ],
    goldenTips: [
      "نصيحة الأستاذ مصطفى تركي: اذكر المظاهر الروحية (fasting, prayers)، والأطعمة والحلويات، والمظاهر الاجتماعية التراثية كالمحيبس.",
      "استخدم مفردات متقدمة تليق بالمرحلة الإعدادية مثل compassion, generosity, solidarity."
    ],
    clozeSentences: [
      {
        textWithBlanks: "Ramadan is a sacred month of fasting and self-______.",
        missingWord: "discipline",
        options: ["discipline", "sleeping", "travelling", "driving"]
      }
    ]
  },
  {
    id: "5th-essay-health",
    unitId: 52,
    titleAr: "إنشاء الوحدة الثانية: نمط الحياة الصحي وتناول الطعام المتوازن (A Healthy Lifestyle)",
    titleEn: "Maintaining a Healthy Lifestyle and Balanced Diet",
    ministerialWeight: "15 درجة في الامتحان النهائي",
    paragraphsEn: [
      "Maintaining a healthy lifestyle has become paramount in our modern, fast-paced world. Many people suffer from preventable health issues primarily because of poor nutritional habits and sedentary lifestyles.",
      "To safeguard our physical and mental well-being, we ought to adopt a balanced diet rich in fresh vegetables, fruits, whole grains, and lean proteins, while strictly minimizing fast foods and sugary beverages. Furthermore, regular physical exercise, such as brisk walking, swimming, or running, strengthens the cardiovascular system and boosts immunity.",
      "In conclusion, good health is a priceless treasure that requires discipline. By drinking sufficient water, getting adequate restful sleep, and avoiding excessive stress, we can lead vibrant, productive lives."
    ],
    paragraphsAr: [
      "أصبح الحفاظ على نمط حياة صحي أمراً بالغ الأهمية في عالمنا العصري السريع. يعاني الكثير من الناس من مشاكل صحية يمكن الوقاية منها في المقام الأول بسبب العادات الغذائية السيئة ونمط الحياة الخامل قليل الحركة.",
      "لحماية صحتنا الجسدية والنفسية، ينبغي علينا اتباع نظام غذائي متوازن غني بالخضار والفواكه الطازجة والحبوب الكاملة والبروتينات الخالية من الدهون، مع التقليل الصارم من الوجبات السريعة والمشروبات السكرية. علاوة على ذلك، فإن ممارسة الرياضة بانتظام، كالمشي السريع أو السباحة أو الجري، تقوي القلب وتعزز المناعة.",
      "وختاماً، فإن الصحة الجيدة كنز لا يقدر بثمن يتطلب انضباطاً. من خلال شرب كميات كافية من الماء، ونيل قسط وافٍ من النوم المريح، وتجنب التوتر المفرط، يمكننا أن نعيش حياة مفعمة بالحيوية والإنتاجية."
    ],
    keywords: [
      { word: "paramount", meaning: "بالغ الأهمية والضرورة" },
      { word: "sedentary lifestyle", meaning: "نمط حياة خامل قليل الحركة" },
      { word: "balanced diet", meaning: "نظام غذائي متوازن" },
      { word: "cardiovascular system", meaning: "الجهاز القلبي الوعائي" },
      { word: "priceless treasure", meaning: "كنز لا يُقدر بثمن" }
    ],
    goldenTips: [
      "استخدم أفعال النصيحة التي درستها في الوحدة الثانية: ought to, should, had better.",
      "ركز على ثلاثة محاور: الغذاء الصحي، الرياضة البدنية، والنوم وإدارة التوتر."
    ],
    clozeSentences: [
      {
        textWithBlanks: "To maintain good health, we ought to adopt a ______ diet.",
        missingWord: "balanced",
        options: ["balanced", "sugary", "dangerous", "careless"]
      }
    ]
  },
  {
    id: "5th-essay-renewable-energy",
    unitId: 53,
    titleAr: "إنشاء الوحدة الثالثة: الطاقة المتجددة وحماية البيئة في العراق (Renewable Energy)",
    titleEn: "Renewable Energy and Protecting Iraq's Environment",
    ministerialWeight: "15 درجة في الامتحان النهائي",
    paragraphsEn: [
      "Global environmental degradation and climate change represent severe challenges for mankind today. For decades, the excessive burning of fossil fuels has released catastrophic amounts of carbon emissions, triggering rising global temperatures and desertification.",
      "Iraq is especially vulnerable to climate impacts, experiencing intense dust storms, scorching summer heat, and water scarcity. Fortunately, Iraq possesses enormous renewable resources, particularly solar power, as it enjoys more than 300 sunny days each year. Harnessing solar farms and wind power along the southern marshes can provide abundant, clean energy.",
      "To summarize, transitioning to green renewable energy is no longer an optional luxury but an urgent necessity. Investing in sustainable infrastructure will safeguard Iraq's natural ecosystems and guarantee a prosperous, healthy future for generations to come."
    ],
    paragraphsAr: [
      "يمثل التدهور البيئي العالمي وتغير المناخ تحديات جسيمة تواجه البشرية اليوم. فعلى مدى عقود، أدى الحرق المفرط للوقود الأحفوري إلى انبعاث كميات كارثية من الكربون، مما أثار ارتفاع درجات الحرارة العالمية والتصحر.",
      "يعد العراق عرضة بشكل خاص للآثار المناخية، حيث يشهد عواصف ترابية شديدة، وحرارة صيفية لاهبة، وشحة في المياه. ولحسن الحظ، يمتلك العراق موارد متجددة هائلة، لا سيما الطاقة الشمسية، حيث ينعم بأكثر من 300 يوم مشمس سنوياً. إن استثمار المزارع الشمسية وطاقة الرياح على امتداد الأهوار الجنوبية يمكن أن يوفر طاقة نظيفة وفيرة.",
      "وخلاصة القول، إن التحول نحو الطاقة المتجددة الخضراء لم يعد ترفاً اختيارياً بل ضرورة ملحة. إن الاستثمار في البنية التحتية المستدامة سيحمي النظم البيئية الطبيعية في العراق ويضمن مستقبلاً مزدهراً وصحياً للأجيال القادمة."
    ],
    keywords: [
      { word: "fossil fuels", meaning: "الوقود الأحفوري" },
      { word: "desertification", meaning: "ظاهرة التصحر" },
      { word: "scorching heat", meaning: "الحرارة الشديدة اللاهبة" },
      { word: "harnessing solar power", meaning: "تسخير الطاقة الشمسية" },
      { word: "urgent necessity", meaning: "ضرورة ملحة للغاية" }
    ],
    goldenTips: [
      "اربط الموضوع بواقع العراق البيئي (الشمس الوفيرة، العواصف الترابية، الأهوار).",
      "استخدم مفردات بيئية دقيقة من كتاب النشاط: solar farms, renewable resources, carbon emissions."
    ],
    clozeSentences: [
      {
        textWithBlanks: "Iraq possesses enormous renewable resources, particularly ______ power.",
        missingWord: "solar",
        options: ["solar", "coal", "petrol", "diesel"]
      }
    ]
  },
  {
    id: "5th-essay-babylon",
    unitId: 55,
    titleAr: "إنشاء الوحدة الخامسة: مهرجان بابل الدولي في العراق (The Babylon International Festival)",
    titleEn: "The Babylon International Festival in Iraq",
    ministerialWeight: "15 درجة في الامتحان النهائي",
    paragraphsEn: [
      "The Babylon International Festival is a prestigious cultural and artistic extravaganza hosted annually amidst the majestic ruins of ancient Babylon, located approximately 85 kilometers south of Baghdad.",
      "First inaugurated in 1987, this magnificent event convenes folk music troupes, poets, theatrical performers, and artists from across the Arab world and international community. Performances take place in the historic Babylonian amphitheatre under starlit Mesopotamian skies.",
      "The festival symbolizes Iraq's enduring cultural resilience, proving to the world that the cradle of civilization continues to inspire art, peace, and cross-cultural dialogue. Attending the festival is an enchanting journey back into the glory of Nebuchadnezzar's empire."
    ],
    paragraphsAr: [
      "يعد مهرجان بابل الدولي تظاهرة ثقافية وفنية مرموقة تُقام سنوياً وسط الآثار المهيبة لمدينة بابل الأثرية الواقعة على بعد حوالي 85 كيلومتراً جنوب بغداد.",
      "افتُتح هذا الحدث الرائع لأول مرة في عام 1987، وهو يجمع فرق الموسيقى الشعبية والشعراء والممثلين المسرحيين والفنانين من جميع أنحاء الوطن العربي والعالم. وتُقام العروض في المدرج البابلي التاريخي تحت سماء وادي الرافدين المتلألئة بالنجوم.",
      "يرمز المهرجان إلى صمود العراق الثقافي الدائم، مؤكداً للعالم أن مهد الحضارات ما يزال يُلهم الفن والسلام والحوار الحضاري. وتعتبر زيارة المهرجان رحلة ساحرة إلى أمجاد إمبراطورية نبوخذ نصر العظيمة."
    ],
    keywords: [
      { word: "majestic ruins", meaning: "آثار مهيبة وتاريخية" },
      { word: "amphitheatre", meaning: "المدرج البابلي المسرحي" },
      { word: "cradle of civilization", meaning: "مهد الحضارة الإنسانية" },
      { word: "cultural resilience", meaning: "الصمود الثقافي" },
      { word: "cross-cultural dialogue", meaning: "الحوار بين الثقافات" }
    ],
    goldenTips: [
      "اذكر الموقع الجغرافي (Babylon ruins, south of Baghdad)، وتاريخ التأسيس (1987)، والأنشطة المتنوعة (music, poetry, drama)."
    ],
    clozeSentences: [
      {
        textWithBlanks: "Performances take place in the historic Babylonian ______.",
        missingWord: "amphitheatre",
        options: ["amphitheatre", "hospital", "kitchen", "airport"]
      }
    ]
  },
  {
    id: "5th-essay-banking",
    unitId: 56,
    titleAr: "إنشاء الوحدة السادسة: نصائح حول استثمار الأموال والخدمات المصرفية (Saving Money and Banking)",
    titleEn: "Saving Money and Wise Banking Advice for Young People",
    ministerialWeight: "15 درجة في الامتحان النهائي",
    paragraphsEn: [
      "Financial literacy is one of the most vital life skills that young adults must acquire early in life. Learning how to manage money sensibly and save for future contingencies provides peace of mind and long-term security.",
      "Opening a dedicated bank savings account allows individuals to earn compound interest and resist impulsive spending temptations. Furthermore, modern online banking platforms and debit cards facilitate effortless expense tracking and budget management. People had better set aside at least twenty percent of their monthly income for future investments.",
      "In summary, money is a tool that requires thoughtful stewardship. By differentiating between essential needs and fleeting desires, young people can build solid financial independence and realize their future ambitions."
    ],
    paragraphsAr: [
      "تعتبر الثقافة المالية من أهم المهارات الحياتية الحيوية التي يجب على الشباب اكتسابها في مقتبل العمر. إن تعلم كيفية إدارة الأموال بحكمة والادخار لمواجهة الطوارئ المستقبلية يوفر راحة البال والأمان على المدى الطويل.",
      "يتيح فتح حساب توفير مصرفي مخصص للأفراد كسب فوائد تراكمية ومقاومة إغراءات الإنفاق العشوائي المتهور. علاوة على ذلك، تسهل المنصات المصرفية الإلكترونية الحديثة وبطاقات الصرف الآلي تتبع النفقات وإدارة الميزانية بسهولة. ومن الأفضل للأشخاص ادخار 20% على الأقل من دخلهم الشهري للاستثمارات المستقبلية.",
      "وخلاصة الأمر، فإن المال وسيلة تتطلب إدارة واعية وحكيمة. ومن خلال التمييز بين الاحتياجات الضرورية والرغبات العابرة، يستطيع الشباب بناء استقلال مالي راسخ وتحقيق طموحاتهم المستقبلية."
    ],
    keywords: [
      { word: "financial literacy", meaning: "الثقافة والوعي المالي" },
      { word: "contingencies", meaning: "الطوارئ والظروف غير المتوقعة" },
      { word: "impulsive spending", meaning: "الإنفاق العشوائي المتهور" },
      { word: "savings account", meaning: "حساب التوفير المصرفي" },
      { word: "financial independence", meaning: "الاستقلال المالي" }
    ],
    goldenTips: [
      "وظف مفردات الوحدة السادسة المصرفية: savings account, interest, deposit, debit card, invest.",
      "استخدم صيغة had better للنصيحة: Young people had better save regularly."
    ],
    clozeSentences: [
      {
        textWithBlanks: "Opening a dedicated savings account helps avoid ______ spending.",
        missingWord: "impulsive",
        options: ["impulsive", "healthy", "educational", "generous"]
      }
    ]
  },
  {
    id: "5th-essay-ai-tech",
    unitId: 57,
    titleAr: "إنشاء الوحدة السابعة: إيجابيات وسلبيات الذكاء الاصطناعي والهواتف (Pros and Cons of AI)",
    titleEn: "Advantages and Disadvantages of Artificial Intelligence",
    ministerialWeight: "15 درجة في الامتحان النهائي",
    paragraphsEn: [
      "Artificial Intelligence (AI) and modern digital technologies are undeniably revolutionising the 21st century. While they offer revolutionary benefits across various industries, they also present critical challenges that humanity must navigate wisely.",
      "On the positive side, AI enhances human productivity, automates repetitive tasks, and accelerates medical breakthroughs such as early disease detection. Furthermore, AI-powered learning applications allow students in Iraq and globally to access customized education anytime and anywhere.",
      "Conversely, the rapid rise of AI raises concerns regarding widespread job displacement and the erosion of critical thinking skills. In conclusion, AI should serve as an empowering collaborator that assists human ingenuity rather than an unchecked substitute for human creativity."
    ],
    paragraphsAr: [
      "يُحدث الذكاء الاصطناعي والتكنولوجيا الرقمية الحديثة بلا شك ثورة حقيقية في القرن الحادي والعشرين. وبينما يقدم فوائد ثورية عبر مختلف المجالات، فإنه يطرح أيضاً تحديات حرجة يتعين على البشرية التعامل معها بحكمة.",
      "من الجانب الإيجابي، يعزز الذكاء الاصطناعي إنتاجية الإنسان، ويؤتمت المهام الروتينية، ويسرع الاكتشافات الطبية مثل التشخيص المبكر للأمراض. علاوة على ذلك، تتيح تطبيقات التعليم المدعومة بالذكاء الاصطناعي للطلاب في العراق وحول العالم الوصول إلى تعليم مخصص في أي وقت ومكان.",
      "وعلى النقيض من ذلك، يثير الصعود السريع للذكاء الاصطناعي مخاوف تتعلق بفقدان الوظائف وتراجع مهارات التفكير النقدي. وفي الختام، يجب أن يكون الذكاء الاصطناعي أداة مساعدة تعزز الإبداع البشري بدلاً من أن يكون بديلاً غير مقيد عن العقل البشري."
    ],
    keywords: [
      { word: "revolutionising", meaning: "يحدث ثورة جذرية" },
      { word: "medical breakthroughs", meaning: "اكتشافات طبية خارقة" },
      { word: "customized education", meaning: "تعليم مخصص" },
      { word: "job displacement", meaning: "فقدان واستبدال الوظائف" },
      { word: "human ingenuity", meaning: "الإبداع والذكاء البشري" }
    ],
    goldenTips: [
      "قسّم المقال إلى مقدمة متوازنة، فقرة للإيجابيات (On the one hand...)، فقرة للسلبيات (On the other hand...)، وخاتمة متوازنة (In conclusion...)."
    ],
    clozeSentences: [
      {
        textWithBlanks: "Artificial Intelligence accelerates medical ______ and research.",
        missingWord: "breakthroughs",
        options: ["breakthroughs", "accidents", "mistakes", "delays"]
      }
    ]
  }
];

// =========================================================================
// بنك أسئلة امتحانات الخامس الإعدادي (العلمي والأدبي)
// =========================================================================
export const FIFTH_PREPARATORY_QUESTIONS: MinisterialExamQuestion[] = [
  {
    id: "5th-exam-q1",
    unitId: 51,
    topic: "-ed vs -ing Adjectives",
    year: "امتحان نصف السنة 2024",
    session: "دور أول",
    questionText: "The children were very ______ (frightened / frightening) when the thunder roared.",
    correctAnswer: "frightened",
    ruleExplanation: "الأطفال يصفون شعورهم الداخلي بالخوف، لذا نختار الصفة المنتهية بـ -ed.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "5th-exam-q2",
    unitId: 52,
    topic: "Second Conditional",
    year: "امتحان الفصل الأول 2024",
    session: "دور أول",
    questionText: "If I ______ (be) you, I would consult an experienced lawyer.",
    correctAnswer: "were",
    ruleExplanation: "صيغة النصيحة الافتراضية في الحالة الشرطية الثانية تستخدم were مع الضمير I.",
    difficulty: "medium",
    category: "Grammar"
  },
  {
    id: "5th-exam-q3",
    unitId: 53,
    topic: "Third Conditional",
    year: "امتحان نصف السنة",
    session: "دور أول",
    questionText: "If they ______ (leave) earlier, they would not have missed the train.",
    correctAnswer: "had left",
    ruleExplanation: "جواب الشرط would not have missed يتطلب ماضياً تاماً had left في فعل الشرط.",
    difficulty: "hard",
    category: "Grammar"
  },
  {
    id: "5th-exam-q4",
    unitId: 53,
    topic: "Regret with I wish",
    year: "امتحان نهاية الكورس الأول",
    session: "دور أول",
    questionText: "You lost your mobile phone in the taxi. (Express regret using 'If only')",
    correctAnswer: "If only I hadn't lost my mobile phone in the taxi.",
    ruleExplanation: "الندم على حدث وقع في الماضي يتطلب استخدام hadn't + التصريف الثالث lost.",
    difficulty: "hard",
    category: "Grammar"
  },
  {
    id: "5th-exam-q5",
    unitId: 55,
    topic: "Modals of Deduction",
    year: "امتحان الفصل الثاني",
    session: "دور أول",
    questionText: "He is in Paris today. That ______ (can't be / must be / mustn't be) Ali in the school library.",
    correctAnswer: "can't be",
    ruleExplanation: "دليل قاطع على استحالة وجوده، والاستحالة في الاستنتاج يعبر عنها بـ can't be.",
    difficulty: "medium",
    category: "Grammar"
  },
  {
    id: "5th-exam-q6",
    unitId: 56,
    topic: "Causative Verbs",
    year: "امتحان نهاية السنة 2024",
    session: "دور أول",
    questionText: "The heavy storm made the tall tree ______ (fall / to fall / fallen).",
    correctAnswer: "fall",
    ruleExplanation: "بعد الفعل السببي made نستخدم دائماً المصدر المجرد الخالي من الإضافات fall.",
    difficulty: "medium",
    category: "Grammar"
  },
  {
    id: "5th-exam-q7",
    unitId: 57,
    topic: "Future Forms",
    year: "امتحان نهاية السنة",
    session: "دور أول",
    questionText: "Look at the dark clouds! It ______ (is going to rain / will rain / rains).",
    correctAnswer: "is going to rain",
    ruleExplanation: "تنبؤ مستقبلي مبني على دليل حسي حاضر (الغيوم) يقتضي استخدام is going to.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "5th-exam-q8",
    unitId: 51,
    topic: "Literature - The Doll's House",
    year: "امتحان نهاية السنة",
    session: "دور أول",
    questionText: "What was Kezia's favourite item in the doll's house?",
    correctAnswer: "The little amber lamp",
    ruleExplanation: "المصباح الصغير ذو اللون الكهرماني الذي يرمز للنور والأمل والمساواة.",
    difficulty: "medium",
    category: "Literature"
  },
  {
    id: "5th-exam-q9",
    unitId: 51,
    topic: "Literature - The Charge of the Light Brigade",
    year: "امتحان نصف السنة",
    session: "دور أول",
    questionText: "How many soldiers rode into the Valley of Death?",
    correctAnswer: "600 soldiers",
    ruleExplanation: "ستمائة فارس بريطاني في معركة بالاكلافا.",
    difficulty: "easy",
    category: "Literature"
  },
  {
    id: "5th-exam-q10",
    unitId: 56,
    topic: "Passive Voice",
    year: "امتحان نهاية السنة",
    session: "دور أول",
    questionText: "The bank was robbed yesterday. (Identify the tense: Past Simple Passive / Present Passive)",
    correctAnswer: "Past Simple Passive",
    ruleExplanation: "was + P.P. (robbed) تدل على المبني للمجهول في الماضي البسيط.",
    difficulty: "easy",
    category: "Grammar"
  }
];

// =========================================================================
// نموذج الامتحان الشامل للخامس الإعدادي (Mock Exam Paper)
// =========================================================================
export const FIFTH_PREPARATORY_MOCK_PAPER: MockExamPaper = {
  id: "5th-full-mock-paper-2025",
  title: "امتحان نهاية السنة الشامل • الخامس الإعدادي (العلمي والأدبي)",
  subtitle: "إشراف الأستاذ مصطفى تركي • الاعتماد الحصري على كتاب الطالب (Student's Book) وكتاب النشاط (Activity Book)",
  session: "الدور الأول • العلمي والأدبي (2020-2026)",
  year: "2020 - 2026",
  durationMinutes: 180,
  totalMarks: 100,
  sections: [
    {
      id: "sec-1",
      sectionCode: "Q1-A",
      titleAr: "السؤال الأول (أ): القطعة الخارجية المستوعبة المتقدمة",
      titleEn: "Question 1 (A): Reading Comprehension - Unseen Passage",
      instructionsAr: "اقرأ القطعة بعناية ثم أجب عن الأسئلة التالية:",
      instructionsEn: "Read the passage carefully, then answer the questions below:",
      totalMarks: 20,
      unseenPassage: "Renewable energy has emerged as one of the most crucial solutions to global climate crises. For over two centuries, industrialized nations relied predominantly on fossil fuels like coal, petroleum, and natural gas. While fossil fuels powered economic progress, their excessive combustion released billions of tons of greenhouse gases into the atmosphere, causing polar ice caps to melt and triggering extreme droughts worldwide. Iraq, endowed with over 300 days of abundant sunshine annually, possesses extraordinary solar energy potential. By investing in vast solar farms across the desert and harnessing wind energy along the southern marshes, Iraq can safeguard its environment, provide clean electricity to millions of households, and create sustainable green jobs for the next generation of engineers.",
      items: [
        {
          id: "5th-mock-q1-1",
          number: 1,
          questionText: "Why did industrialized nations rely predominantly on fossil fuels for two centuries?",
          type: "choice",
          options: ["Because fossil fuels powered their economic progress and industrialization", "Because they had no other choice", "To pollute the air"],
          correctAnswer: "Because fossil fuels powered their economic progress and industrialization",
          alternativeAnswers: ["Powered economic progress"],
          explanation: "السطر الثاني: لأن الوقود الأحفوري كان يدفع عجلة النمو الاقتصادي والصناعي.",
          maxScore: 4
        },
        {
          id: "5th-mock-q1-2",
          number: 2,
          questionText: "What environmental disasters did the excessive burning of fossil fuels cause?",
          type: "choice",
          options: ["Melting polar ice caps and triggering extreme droughts worldwide", "Clean air and cooling", "Growing more trees"],
          correctAnswer: "Melting polar ice caps and triggering extreme droughts worldwide",
          alternativeAnswers: ["Melting polar ice caps and extreme droughts"],
          explanation: "ذوبان القمم الجليدية القطبية والتسبب في موجات جفاف شديدة حول العالم.",
          maxScore: 4
        },
        {
          id: "5th-mock-q1-3",
          number: 3,
          questionText: "Why is Iraq uniquely suitable for solar energy generation?",
          type: "choice",
          options: ["Because it has over 300 days of abundant sunshine annually", "Because it is very cold", "Because it has no oil"],
          correctAnswer: "Because it has over 300 days of abundant sunshine annually",
          alternativeAnswers: ["Over 300 days of abundant sunshine"],
          explanation: "لأن العراق يتمتع بأكثر من 300 يوم من الإشعاع الشمسي الوفير سنوياً.",
          maxScore: 4
        },
        {
          id: "5th-mock-q1-4",
          number: 4,
          questionText: "Excessive greenhouse gases have no effect on global temperature. (True / False)",
          type: "choice",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "خطأ؛ انبعاثات الغازات تسبب الاحتباس الحراري وتغير المناخ.",
          maxScore: 4
        },
        {
          id: "5th-mock-q1-5",
          number: 5,
          questionText: "What benefits can Iraq gain from investing in solar and wind energy?",
          type: "choice",
          options: ["Safeguard environment, provide clean electricity and create green jobs", "Waste money", "Increase pollution"],
          correctAnswer: "Safeguard environment, provide clean electricity and create green jobs",
          alternativeAnswers: ["Clean electricity and green jobs"],
          explanation: "حماية البيئة وتوفير الكهرباء النظيفة وخلق وظائف خضراء للشباب.",
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
          id: "5th-mock-q2-1",
          number: 1,
          questionText: "Look at the thermometer; the temperature ______ (rise) rapidly this afternoon. [Present Continuous]",
          type: "choice",
          options: ["is rising", "rises", "has risen"],
          correctAnswer: "is rising",
          explanation: "تغير وتطور مستمر في الوقت الحالي: is rising.",
          maxScore: 5
        },
        {
          id: "5th-mock-q2-2",
          number: 2,
          questionText: "I could smell smoke because someone ______ (burn) tires outside. [Past Continuous / Past Perfect]",
          type: "choice",
          options: ["had been burning", "burns", "is burning"],
          correctAnswer: "had been burning",
          explanation: "ماضٍ مستمر أو تام مستمر يفسر أثراً في الماضي: had been burning.",
          maxScore: 5
        },
        {
          id: "5th-mock-q2-3",
          number: 3,
          questionText: "If Noor had studied the final chapters, she ______ (pass) with distinction. [Third Conditional]",
          type: "choice",
          options: ["would have passed", "will pass", "passed"],
          correctAnswer: "would have passed",
          explanation: "الحالة الشرطية الثالثة: جواب الشرط would have + V3.",
          maxScore: 5
        },
        {
          id: "5th-mock-q2-4",
          number: 4,
          questionText: "He has lived in Baghdad for 30 years; he ______ know every street in the city. (must / can't / mustn't)",
          type: "choice",
          options: ["must", "can't", "mustn't"],
          correctAnswer: "must",
          explanation: "استنتاج مؤكد إيجابي (Deduction): must.",
          maxScore: 5
        },
        {
          id: "5th-mock-q2-5",
          number: 5,
          questionText: "'I am writing an analytical essay,' Zaid said. -> Zaid said that he ______ an analytical essay. [Reported Speech]",
          type: "choice",
          options: ["was writing", "is writing", "had written"],
          correctAnswer: "was writing",
          explanation: "تحويل المضارع المستمر إلى ماضٍ مستمر في الكلام المنقول: was writing.",
          maxScore: 5
        },
        {
          id: "5th-mock-q2-6",
          number: 6,
          questionText: "I wish I ______ (not spend) all my allowance on unnecessary gadgets. [Regret]",
          type: "choice",
          options: ["hadn't spent", "didn't spend", "wouldn't spend"],
          correctAnswer: "hadn't spent",
          explanation: "الندم على أمر في الماضي بعد wish يتطلب ماضياً تاماً: hadn't spent.",
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
          id: "5th-mock-q3-1",
          number: 1,
          questionText: "Money that a student receives from an organization to pay for education is a ______.",
          type: "choice",
          options: ["scholarship", "fine", "loan"],
          correctAnswer: "scholarship",
          explanation: "المنحة الدراسية تسمى scholarship.",
          maxScore: 5
        },
        {
          id: "5th-mock-q3-2",
          number: 2,
          questionText: "patient -> impatient ; mature -> ______ [Spelling / Prefix]",
          type: "choice",
          options: ["immature", "unmature", "dismature"],
          correctAnswer: "immature",
          explanation: "بادئة النفي للكلمات البادئة بحرف m هي im- فتصبح immature.",
          maxScore: 5
        },
        {
          id: "5th-mock-q3-3",
          number: 3,
          questionText: "A large printed notice or picture used to advertise something is a ______.",
          type: "choice",
          options: ["poster / billboard", "receipt", "passport"],
          correctAnswer: "poster / billboard",
          explanation: "الملصق الإعلاني poster أو billboard.",
          maxScore: 5
        },
        {
          id: "5th-mock-q3-4",
          number: 4,
          questionText: "qualify -> qualification ; apply -> ______ [Spelling]",
          type: "choice",
          options: ["application", "applying", "applicator"],
          correctAnswer: "application",
          explanation: "الاسم المشتق من الفعل apply هو application.",
          maxScore: 5
        }
      ]
    },
    {
      id: "sec-4",
      sectionCode: "Q4",
      titleAr: "السؤال الرابع: الأدب والنصوص المقررة",
      titleEn: "Question 4: Literature Focus",
      instructionsAr: "أجب عن الأسئلة الأدبية حول تينيسون وكاثرين مانسفيلد:",
      instructionsEn: "Answer the questions about Tennyson and Katherine Mansfield:",
      totalMarks: 10,
      items: [
        {
          id: "5th-mock-q4-1",
          number: 1,
          questionText: "In 'The Charge of the Light Brigade', how many cavalry soldiers rode into the valley?",
          type: "choice",
          options: [
            "600 soldiers",
            "300 soldiers",
            "1000 soldiers"
          ],
          correctAnswer: "600 soldiers",
          explanation: "العدد المذكور في لازمة القصيدة هو ستمائة فارس (six hundred).",
          maxScore: 5
        },
        {
          id: "5th-mock-q4-2",
          number: 2,
          questionText: "In Katherine Mansfield's 'The Doll's House', what did the little amber lamp symbolize for Kezia and Else?",
          type: "choice",
          options: [
            "Human warmth, enlightenment and hope for equality",
            "Great wealth and money",
            "Darkness and fear"
          ],
          correctAnswer: "Human warmth, enlightenment and hope for equality",
          explanation: "يرمز للدفء الإنساني والنور والأمل في المساواة والعدالة الاجتماعية.",
          maxScore: 5
        }
      ]
    }
  ],
  essayOptions: [
    {
      id: "5th-essay-opt-a",
      optionLetter: "A",
      titleEn: "Ramadan Traditions and Hospitality in Iraq",
      titleAr: "تقاليد شهر رمضان المبارك وكرم الضيافة العراقي (الوحدة الأولى)",
      prompt: "Write a well-organized composition about the spiritual traditions of Ramadan and Iraqi hospitality, including Iftar gatherings and the Mheibes game.",
      suggestedModel: "The Holy Month of Ramadan in Iraq is an extraordinary season of profound spiritual devotion, generosity, and vibrant community bonding. Before sunset, the streets quiet down as families gather around tables laden with traditional Iraqi dishes like Shorbat Adas (lentil soup), Kubba, and sweet Kleicha. Mosques and charitable organizations open communal dining tables to ensure no person remains hungry. After the Taraweeh prayers, the historic alleys of Baghdad and cities across Iraq come alive. Friends and neighbours assemble in traditional cafes to engage in the age-old game of Mheibes, reflecting centuries of solidarity and genuine cultural affection.",
      keywords: ["spiritual devotion", "Shorbat Adas", "hospitality", "Taraweeh prayers", "Mheibes game", "solidarity"],
      maxScore: 20
    },
    {
      id: "5th-essay-opt-b",
      optionLetter: "B",
      titleEn: "The Babylon International Festival in Iraq",
      titleAr: "مهرجان بابل الدولي للثقافة والفنون في العراق (الوحدة الخامسة)",
      prompt: "Write a composition highlighting the Babylon International Festival, its historical setting, and its celebration of world arts and Iraqi heritage.",
      suggestedModel: "Held amid the magnificent ruins of ancient Mesopotamia, the Babylon International Festival stands as a testament to Iraq's enduring role as the cradle of human civilization. Artists, poets, musicians, and theatrical troupes from dozens of countries gather in the ancient amphitheatre where Nebuchadnezzar once walked. The festival showcases folkloric dances, classical symphonies, and contemporary art exhibitions that unite diverse cultures under the Babylonian night sky. For the Iraqi youth, the festival is not merely entertainment; it is a proud reaffirmation of resilience, peace, and timeless cultural glory.",
      keywords: ["Mesopotamia", "amphitheatre", "theatrical troupes", "cultural glory", "Nebuchadnezzar", "resilience"],
      maxScore: 20
    }
  ]
};
