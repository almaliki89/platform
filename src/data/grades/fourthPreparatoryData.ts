import { Unit, LiteratureItem, EssayItem, MinisterialExamQuestion } from '../../types';
import { MockExamPaper } from '../mockExamPapers';

// =========================================================================
// وحدات الرابع الإعدادي - منهج English for Iraq (4th Preparatory)
// اعتماد كامل وشامل من كتاب الطالب (Student's Book) وكتاب النشاط (Activity Book)
// =========================================================================
export const FOURTH_PREPARATORY_UNITS: Unit[] = [
  // -----------------------------------------------------------------------
  // Unit 1: Getting in Touch (التواصل)
  // -----------------------------------------------------------------------
  {
    id: 41,
    number: 1,
    titleAr: "الوحدة الأولى: التواصل واللغات والأسئلة غير المباشرة (Getting in Touch)",
    titleEn: "Unit 1: Communication, Stative Verbs, Official Languages & Indirect Questions",
    description: "المضارع البسيط والمستمر، أفعال الحالة (Stative Verbs)، اللغات الرسمية لكندا وأساليب التعلم، وتكوين الأسئلة غير المباشرة المؤدبة (Indirect Questions).",
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
        summary: "التمييز بين الحقائق والعادات الثابتة وبين الأحداث المؤقتة، وقاعدة أفعال الحواس والمشاعر والإدراك التي لا تقبل -ing.",
        grammarRuleFormula: "Present Simple (حقائق وعادات):\nSubject + Verb(-s / base) + Complement\nKey Adverbs: always, usually, often, sometimes, every day/year\n\nPresent Continuous (أحداث جارية ومؤقتة في لحظة الكلام):\nSubject + am / is / are + Verb-ing\nKey Adverbs: now, at the moment, currently, at present, look!, listen!\n\nStative Verbs (أفعال الحالة والإدراك - لا تقبل صيغة الاستمرار ing نهائياً):\nlike, love, hate, know, understand, believe, think (=have opinion), want, need, seem, prefer, remember, belong",
        detailedContent: [
          "يستخدم المضارع البسيط للتعبير عن حقائق علمية وجغرافية وروتين متكرر: Water freezes at 0°C. / He works in a bank.",
          "يستخدم المضارع المستمر للأحداث التي تقع في لحظة التحدث أو التغيرات والاتجاهات المؤقتة: Oil prices are rising rapidly this month. / Listen! Somebody is knocking on the door.",
          "أفعال الحالة (Stative Verbs): تعبر عن حالة ذهنية أو شعورية أو ملكية، وتأتي دائماً في المضارع البسيط حتى لو رافقتها عبارات دالة على اللحظة مثل now أو at the moment.",
          "أمثلة شائعة في الامتحانات: I understand the explanation now (وليس I am understanding). / She knows three languages fluently."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: قاعدة أفعال الحالة هي قاعدة تأسيسية ذهبية مشتركة بين منهاج الرابع والسادس الإعدادي. إذا رأيت أفعال (know, understand, remember, want, believe, like) اختر المضارع البسيط دائماً وتجنب الـ ing!"
        ],
        commonMistakes: [
          "كتابة I am knowing him since childhood (الصحيح I know him).",
          "استخدام مضارع بسيط مع تنبيهات لحظية مثل: Look! The car comes (الصحيح Look! The car is coming)."
        ],
        examples: [
          {
            en: "She speaks Arabic, Kurdish and English fluently.",
            ar: "هي تتحدث اللغات العربية والكردية والإنكليزية بطلاقة (حقيقة دائمة وقدرة مستمرة).",
            highlight: "speaks",
            note: "مضارع بسيط للحقائق الدائمة"
          },
          {
            en: "Look! The students are practicing their conversational skills in the lab.",
            ar: "انظر! الطلاب يتدربون على مهارات المحادثة في المختبر الآن.",
            highlight: "are practicing",
            note: "مضارع مستمر لوجود Look! وحدث يقع الآن"
          },
          {
            en: "I do not understand what this text means at the moment.",
            ar: "أنا لا أفهم ما يعنيه هذا النص في الوقت الحالي.",
            highlight: "do not understand",
            note: "فعل حالة (understand) في المضارع البسيط رغم وجود at the moment"
          }
        ],
        exercises: [
          {
            id: "4u1-ex1",
            question: "Listen! Somebody ______ (play) the piano beautifully in the hall.",
            options: ["is playing", "plays", "played", "has played"],
            correctAnswer: "is playing",
            explanation: "فعل التنبيه Listen! يدل على حدث يقع أثناء الحديث، لذا نختار المضارع المستمر is playing.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الأول"
          },
          {
            id: "4u1-ex2",
            question: "I ______ (not understand) this difficult grammar rule at the moment.",
            options: ["don't understand", "am not understanding", "didn't understand", "haven't understood"],
            correctAnswer: "don't understand",
            explanation: "الفعل understand من أفعال الإدراك والحالة (Stative Verbs) التي لا تقبل ing نهائياً، فننفيه بـ don't understand.",
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
        summary: "تحويل الأسئلة المباشرة إلى صيغ غاية في التهذيب مع إعادة ترتيب الفاعل والفعل المساعد كجملة خبرية.",
        grammarRuleFormula: "1) Wh-Questions (أسئلة أدوات الاستفهام):\nCould you tell me + Wh-word + Subject + Verb...?\n(Where is the nearest bank? -> Could you tell me where the nearest bank is?)\n\n2) Yes / No Questions (الأسئلة المبدوءة بأفعال مساعدة):\nCould you tell me if (or whether) + Subject + Verb...?\n(Does the bus stop here? -> Could you tell me if the bus stops here?)\n\nقواعد التعامل مع Do / Does / Did:\n- نحذف do ويبقى الفعل مجرداً.\n- نحذف does ونضيف s الشخص الثالث للفعل.\n- نحذف did ونحول الفعل إلى الماضي البسيط.",
        detailedContent: [
          "الأسئلة غير المباشرة تبدأ بعبارات تأدبية رسمية مثل: Could you tell me... أو Do you know... أو Can you tell me...",
          "القاعدة الجوهرية: الترتيب بعد أداة الاستفهام يتحول من استفهامي (فعل مساعد ثم فاعل) إلى ترتيبي خبري (فاعل ثم فعل مساعد/رئيسي).",
          "إذا احتوى السؤال المباشر على فعل كينونة (is/are/was/were)، نؤخره ليأتي بعد الفاعل: Where is the station? -> Could you tell me where the station is?",
          "إذا بدأ السؤال بـ Do/Does/Did: نحذفها مع تصريف الفعل الأساسي (does -> فعل به s الشخص الثالث)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه للخطأ القاتل الذي يقع فيه معظم الطلاب: لا تعكس الفعل والفاعل بعد أداة السؤال في الصيغة المهذبة! قل: Could you tell me where the library is وليس where is the library."
        ],
        commonMistakes: [
          "إبقاء الفعل المساعد متقدماً على الفاعل: Could you tell me where is the museum? (الصحيح where the museum is).",
          "نسيان حذف does وتصريف الفعل بـ s: Could you tell me when does the train arrive? (الصحيح when the train arrives)."
        ],
        examples: [
          {
            en: "Could you tell me how much this dictionary costs?",
            ar: "هل يمكنك أن تخبرني كم يبلغ ثمن هذا القاموس؟ (حذفنا does وأضفنا s للفعل cost).",
            highlight: "Could you tell me how much this dictionary costs?",
            note: "سؤال غير مباشر مع أداة how much"
          },
          {
            en: "Do you know if the school library is open on Saturdays?",
            ar: "هل تعلم ما إذا كانت مكتبة المدرسة مفتوحة أيام السبت؟",
            highlight: "if the school library is open",
            note: "سؤال Yes/No غير مباشر بإضافة if"
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
              "does the headmaster's office be"
            ],
            correctAnswer: "the headmaster's office is",
            explanation: "في السؤال غير المباشر يتقدم الفاعل (the headmaster's office) على الفعل المساعد (is).",
            type: "mcq",
            ministerialYear: "امتحان نهاية الكورس الأول"
          },
          {
            id: "4u1-ex4",
            question: "Does the evening course start in October? -> Could you tell me if the evening course ______ in October?",
            options: ["starts", "does start", "start", "starting"],
            correctAnswer: "starts",
            explanation: "نحذف does ونضيف s الشخص الثالث للفعل start فيصبح starts.",
            type: "mcq",
            ministerialYear: "امتحان الكورس الأول"
          }
        ]
      },
      {
        id: "4th-u1-l3",
        unitId: 41,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: قطعة الكتاب - اللغات الرسمية في كندا (Official Languages of Canada)",
        titleEn: "Lesson 3: Reading Text - Canada's Official Languages & Geography",
        category: "reading",
        summary: "قطعة الاستيعاب الرسمية من كتاب الطالب حول مساحة كندا وعاصمتها أوتاوا واللغتين الرسميتين (الإنكليزية والفرنسية).",
        detailedContent: [
          "كندا هي ثاني أكبر دولة في العالم من حيث المساحة الإجمالية بعد روسيا (Canada is the second largest country in the world).",
          "عاصمة كندا هي مدينة أوتاوا (The capital of Canada is Ottawa)، بينما أكبر مدنها هي تورونتو (Toronto).",
          "اللغتان الرسميتان المعتمدتان في كندا هما الإنكليزية والفرنسية (English and French are the two official languages).",
          "يتمركز معظم الناطقين بالفرنسية في مقاطعة كيبيك (Quebec province)، حيث تظهر اللوحات الإرشادية والخدمات باللغتين معاً.",
          "تتميز كندا بجمال طبيعتها ووجود شلالات نياجرا (Niagara Falls) والغابات والبحيرات الشاسعة."
        ],
        teacherNotes: [
          "أسئلة قطعة كندا تتكرر سنوياً في السؤال الأول (قطع الكتاب المنهجية): ركز على عاصمة كندا (Ottawa) واللغتين الرسميتين (English & French)."
        ],
        examples: [
          {
            en: "What are the two official languages of Canada? They are English and French.",
            ar: "ما هما اللغتان الرسميتان في كندا؟ هما الإنكليزية والفرنسية.",
            highlight: "English and French",
            note: "سؤال وزاري متكرر"
          }
        ],
        exercises: [
          {
            id: "4u1-ex5",
            question: "The capital of Canada is ______.",
            options: ["Ottawa", "Toronto", "Montreal", "Vancouver"],
            correctAnswer: "Ottawa",
            explanation: "عاصمة كندا هي مدينة أوتاوا (Ottawa).",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          },
          {
            id: "4u1-ex6",
            question: "Canada is the ______ largest country in the world by total area.",
            options: ["second", "first", "third", "fourth"],
            correctAnswer: "second",
            explanation: "كندا هي ثاني أكبر دولة بعد روسيا.",
            type: "mcq",
            ministerialYear: "امتحان الكورس الأول"
          }
        ]
      }
    ,
      {
        id: "4th-u1-l4",
        unitId: 41,
        lessonNumber: 4,
        titleAr: "الدرس الرابع: استراتيجيات التعلم ومراكز التعلم الذاتي (Self-Access Centres)",
        titleEn: "Lesson 4: Self-Access Centres & Autonomous Learning Strategies",
        category: "reading",
        summary: "استيعاب نصوص كتاب الطالب حول مراكز التعلم الذاتي (Self-Access Centres)، واستخدام القواميس وتدوين بطاقات المفردات.",
        grammarRuleFormula: "Study Strategies:\n- Look up words in dictionary\n- Keep vocabulary notebook\n- Practice listening recordings",
        detailedContent: [
          "مركز التعلم الذاتي (Self-Access Centre) هو مكان مجهز في المدرسة أو المعهد يتيح للطلاب التعلم بشكل مستقل وفق وتيرتهم الخاصة.",
          "يحتوي المركز على كتب ميسرة، حواسيب، برامج صوتية، وقواميس ثنائية اللغة وأحادية اللغة.",
          "تنمية استقلالية المتعلم (Learner Autonomy): التركيز على معرفة نقاط القوة والضعف والتدرب ذاتياً دون الاعتماد الكلي على المعلم."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: سؤال التوصيل في كتاب النشاط صفحة 8 يربط بين تعريف self-access centre وكلمات مثل autonomous learning."
        ],
        examples: [
          {
            en: "Students can visit the self-access centre to practice listening and read magazines.",
            ar: "يمكن للطلاب زيارة مركز التعلم الذاتي لممارسة الاستماع وقراءة المجلات.",
            highlight: "self-access centre",
            note: "مصطلح أساسي في الوحدة"
          }
        ],
        exercises: [
          {
            id: "4u1-ex7",
            question: "A ______ is a room where students can study by themselves using books, computers, and recordings.",
            options: ["self-access centre", "cafeteria", "gymnasium", "laboratory"],
            correctAnswer: "self-access centre",
            explanation: "مركز التعلم الذاتي هو الغرفة المخصصة لدراسة الطالب بمفرده.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 8"
          }
        ]
      }
    ]
  },

  // -----------------------------------------------------------------------
  // Unit 2: Past Events & Used to (الماضي وعاداته)
  // -----------------------------------------------------------------------
  {
    id: 42,
    number: 2,
    titleAr: "الوحدة الثانية: عادات الماضي والماضي المستمر (Past Events & Used to)",
    titleEn: "Unit 2: Past Habits with 'used to' & Continuous Links",
    description: "أدوات الربط (as, while, when) بين الماضي البسيط والمستمر، واعتياد الفعل في الماضي باستخدام used to مقارنة بالوقت الحاضر.",
    accentColor: "from-purple-600 to-pink-600",
    bgGradient: "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200",
    lessons: [
      {
        id: "4th-u2-l1",
        unitId: 42,
        lessonNumber: 1,
        titleAr: "الدرس الأول: اعتياد الفعل في الماضي (used to)",
        titleEn: "Lesson 1: Used to + Base Verb for Past Habits & States",
        category: "grammar",
        summary: "التعبير عن عادات وأشياء كانت حقيقية ومألوفة في الماضي ولكنها لم تعد كذلك الآن، والمقارنة مع الحاضر.",
        grammarRuleFormula: "Affirmative (+):\nSubject + used to + base verb\n(He used to play tennis every Friday.)\n\nNegative (-):\nSubject + didn't use to + base verb (بدون حرف d)\n(They didn't use to have a computer.)\n\nQuestion (?):\nDid + Subject + use to + base verb...?\n(Did you use to walk to school?)\n\nComparison with Present (مقارنة بالوقت الحاضر):\nSubject + used to + verb..., but now + Subject + Present Simple (s / base)",
        detailedContent: [
          "تستخدم used to للتعبير عن شيء كان عادة متكررة أو حالة مستمرة في الماضي وتوقفت تماماً في الوقت الحاضر.",
          "في النفي تصبح الصيغة didn't use to (حذف حرف d لوجود didn't)، وفي السؤال Did you use to...?",
          "تُقارن بالحاضر باستخدام but now: إذا كان الفاعل مفرداً نضع s الشخص الثالث للفعل بعد but now (e.g., but now he wears glasses)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: هذه القاعدة مكررة حرفياً في الوحدة الأولى للسادس الإعدادي (البكالوريا الوزارية)! اتقانك لها الآن في الرابع يمنحك تفوقاً مباشراً لدرجات السادس."
        ],
        commonMistakes: [
          "كتابة didn't used to مع إبقاء حرف d (الصحيح didn't use to).",
          "نسيان s الشخص الثالث في شطر but now he..."
        ],
        examples: [
          {
            en: "Baghdad used to have fewer cars, but now the streets are very crowded.",
            ar: "كانت بغداد تحتوي على سيارات أقل في الماضي، لكن الشوارع مزدحمة جداً الآن.",
            highlight: "used to have ... but now",
            note: "عادة ماضية مقارنة بالحاضر"
          },
          {
            en: "He didn't use to wear glasses, but now he wears them all the time.",
            ar: "لم يكن معتاداً على ارتداء النظارات، ولكنه يرتديها الآن طوال الوقت.",
            highlight: "didn't use to wear",
            note: "صيغة النفي الصحيحة بحذف الـ d"
          }
        ],
        exercises: [
          {
            id: "4u2-ex1",
            question: "He ______ (use to) smoke cigarettes, but he gave it up two years ago.",
            options: ["used to", "use to", "was used to", "uses to"],
            correctAnswer: "used to",
            explanation: "عادة ماضية في الجملة المثبتة نستخدم used to + المصدر smoke.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          },
          {
            id: "4u2-ex2",
            question: "They didn't ______ (used to / use to) travel by plane in the past.",
            options: ["use to", "used to", "using to", "uses to"],
            correctAnswer: "use to",
            explanation: "بعد didn't يأتي الفعل مجرداً use to بدون حرف d.",
            type: "mcq",
            ministerialYear: "امتحان الكورس الأول"
          }
        ]
      },
      {
        id: "4th-u2-l2",
        unitId: 42,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: ربط الماضي البسيط والماضي المستمر (Past Simple & Continuous)",
        titleEn: "Lesson 2: Linking Past Simple & Past Continuous with When, While, As",
        category: "grammar",
        summary: "الربط بين حدثين ماضيين؛ أحدهما طويل ومستمر (was/were + ing) قاطعه حدث قصير ومفاجئ (ماضي بسيط).",
        grammarRuleFormula: "1) While / As + Past Continuous (was/were + ing) , Past Simple (V2/ed)\n(While I was reading, the telephone rang.)\n\n2) When / And + Past Simple (V2/ed) , Past Continuous (was/were + ing)\n(I was cycling when a cat ran across the street.)",
        detailedContent: [
          "الماضي المستمر يعبر عن الحدث الأطول المستمر في الخلفية (was / were + V-ing).",
          "الماضي البسيط يعبر عن الحدث الأقصر القاطع للحدث الأول.",
          "أدوات الربط: While و As يأتي بعدهما ماضي مستمر دائماً.",
          "أدوات الربط: When و And يأتي بعدهما ماضي بسيط دائماً."
        ],
        teacherNotes: [
          "احفظ القاعدة الذهبية: (While / As) أصدقاء المستمر (was/were + ing). بينما (When / And) أصدقاء البسيط (V-ed / شاذ)."
        ],
        examples: [
          {
            en: "While we were walking by the river, it started to rain heavily.",
            ar: "بينما كنا نسير بمحاذاة النهر، بدأت السماء تمطر بغزارة.",
            highlight: "While we were walking ... started",
            note: "حدث مستمر قاطعه مطر مفاجئ"
          }
        ],
        exercises: [
          {
            id: "4u2-ex3",
            question: "While Ali ______ (swim) in the lake, he saw a rare water bird.",
            options: ["was swimming", "swam", "is swimming", "swims"],
            correctAnswer: "was swimming",
            explanation: "بعد While نستخدم ماضياً مستمراً مع الفاعل المفرد: was swimming.",
            type: "mcq",
            ministerialYear: "امتحان نهاية الكورس الأول"
          }
        ]
      }
    ,
      {
        id: "4th-u2-l3",
        unitId: 42,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: قطعة الكتاب - المدارس في الماضي وحوادث الطفولة",
        titleEn: "Lesson 3: Reading Text - Schools in the Past & Historical Perspectives",
        category: "reading",
        summary: "مقارنة نظام المدارس القديم في العراق بمدارس العصر الحديث باستخدام used to، وتدوين أحداث الماضي البارزة.",
        detailedContent: [
          "في الماضي، لم تكن المدارس تحتوي على حواسيب أو مختبرات لغات حديثة (Schools didn't use to have computer labs).",
          "كان الطلاب يمشون مسافات طويلة للوصول إلى مدارسهم ويكتبون على ألواح خشبية قبل انتشار الدفاتر والكتب المطبوعة الحديثة.",
          "التطور الحضاري في العراق أتاح افتتاح آلاف المدارس الحديثة والجامعات وتجهيزها بشبكات الإنترنت والوسائط المتعددة."
        ],
        teacherNotes: [
          "احفظ الأسئلة الاستيعابية عن نص المدارس في الماضي لأنها ترد كثيراً في السؤال الأول (فرع ب - قطع الكتاب)."
        ],
        examples: [
          {
            en: "Did children use to have more free time in the past? Yes, they didn't use to spend hours on smartphones.",
            ar: "هل كان الأطفال معتادين على امتلاك وقت فراغ أكبر في الماضي؟ نعم، لم يكونوا يقضون ساعات على الهواتف الذكية.",
            highlight: "Did children use to have",
            note: "تطبيق قواعدي واستيعابي"
          }
        ],
        exercises: [
          {
            id: "4u2-ex5",
            question: "In the past, schools didn't use to have ______ for interactive science lessons.",
            options: ["smartboards and computers", "teachers", "books", "classrooms"],
            correctAnswer: "smartboards and computers",
            explanation: "المدارس قديماً لم تكن تمتلك حواسيب وشاشات تفاعلية ذكية.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          }
        ]
      }
    ]
  },

  // -----------------------------------------------------------------------
  // Unit 3: Defining & Non-defining Relative Clauses (جمل الوصل)
  // -----------------------------------------------------------------------
  {
    id: 43,
    number: 3,
    titleAr: "الوحدة الثالثة: جمل الوصل المعرفة وغير المعرفة (Relative Clauses)",
    titleEn: "Unit 3: Defining & Non-defining Relative Clauses with Who, Which, Where, Whose",
    description: "ضمائر الوصل (who, which, that, where, whose)، والفروق بين جمل الوصل المعرفة والمعلومات الإضافية (الفواصل)، وقطعة الأعراس.",
    accentColor: "from-blue-600 to-cyan-600",
    bgGradient: "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200",
    lessons: [
      {
        id: "4th-u3-l1",
        unitId: 43,
        lessonNumber: 1,
        titleAr: "الدرس الأول: ضمائر الوصل واختيار الضمير المناسب (Relative Pronouns)",
        titleEn: "Lesson 1: Relative Pronouns (who, which, where, whose)",
        category: "grammar",
        summary: "ربط الجمل باستخدام who للعاقل، which لغير العاقل، where للمكان، و whose للتملك.",
        grammarRuleFormula: "1) Person (عاقل) + who + verb / pronoun\n(The doctor who treated my father is very kind.)\n\n2) Thing / Animal (غير عاقل) + which / that + verb / pronoun\n(The car which was damaged has been repaired.)\n\n3) Place (مكان) + where + subject + verb (بدون حرف جر للمكان)\n(The town where I was born is very peaceful.)\n\n4) Noun + whose + Noun (الملكية: اسم قبل الفراغ واسم بعده يملكه الأول)\n(The girl whose bicycle was stolen was crying.)",
        detailedContent: [
          "Defining Relative Clauses: تعطي معلومة أساسية لتعريف الاسم لا يمكن الاستغناء عنها، ولا نضع معها فواصل.",
          "Non-defining Relative Clauses: تعطي معلومة إضافية عن اسم محدد ومعروف سلفاً، وتوضع بين فاصلتين (, ... ,).",
          "قاعدة whose: اسم قبل الفراغ واسم بعد الفراغ يعود ملكيته للأول: The man whose son is a doctor.",
          "قاعدة where: اسم مكان قبل الفراغ وجملة تامة بعده خالية من حرف الجر المكاني (in, at, there)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه للفرق بين which و where مع الأماكن: إذا وجدنا بعد الفراغ فعلاً مباشرة نختار which (مثل The city which has tall buildings). وإذا وجدنا فاعلاً وجملة كاملة بدون حرف جر نختار where (مثل The city where we live)."
        ],
        commonMistakes: [
          "وضع where عندما يكون بعد الفراغ فعل: The hotel where is near the park (الصحيح which is).",
          "استخدام who بدلاً من whose مع الملكية."
        ],
        examples: [
          {
            en: "The architect who designed the Baghdad tower is internationally renowned.",
            ar: "المهندس المعماري الذي صمم برج بغداد مشهور دولياً.",
            highlight: "architect who designed",
            note: "ضمير وصل لعاقل"
          },
          {
            en: "I met the author whose book won the Arabic Literature Award.",
            ar: "التقيتُ بالكاتب الذي فاز كتابُه بجائزة الأدب العربي.",
            highlight: "author whose book",
            note: "ضمير وصل للملكية (whose)"
          }
        ],
        exercises: [
          {
            id: "4u3-ex1",
            question: "I met the doctor ______ clinic is located on Palestine Street. (who / whose / which / where)",
            options: ["whose", "who", "which", "where"],
            correctAnswer: "whose",
            explanation: "العيادة (clinic) تعود ملكيتها للطبيب (doctor)، لذا نستخدم ضمير الملكية whose.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الأول"
          },
          {
            id: "4u3-ex2",
            question: "Babylon, ______ is located 85 kilometers south of Baghdad, is a famous historic city.",
            options: ["which", "where", "who", "whose"],
            correctAnswer: "which",
            explanation: "بعد الفراغ يوجد فعل مساعد is، لذا نستخدم which للمكان وليس where.",
            type: "mcq",
            ministerialYear: "امتحان نهاية الكورس"
          }
        ]
      },
      {
        id: "4th-u3-l2",
        unitId: 43,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: قطعة الكتاب - عادات وتقاليد الأعراس (Wedding Customs)",
        titleEn: "Lesson 2: Reading Text - Traditional Wedding Customs in Different Cultures",
        category: "reading",
        summary: "قطعة الاستيعاب الرسمية حول تقاليد الأعراس في العراق ودول الشرق الأوسط والبدوي، ليلة الحناء ومظاهر الفرح العائلي.",
        detailedContent: [
          "تعتبر الأعراس مناسبات اجتماعية تجمع العائلات والأصدقاء في احتفال مبهج (A wedding is a celebration for whole families).",
          "في تقاليد البدو والشرق الأوسط، قد تستمر الاحتفالات عدة أيام متتالية وسط ولائم الكرم والضيافة.",
          "ليلة الحناء (The Henna Night): ليلة تراثية مميزة حيث تُزين أيدي وأقدام العروس بنقوش الحناء الطبيعية مع الشموع والأغاني التراثية.",
          "تشارك العائلات في إعداد الأطعمة التقليدية الفاخرة مثل البرياني واللحوم المشوية وتقديم الحلويات للمهنئين."
        ],
        teacherNotes: [
          "هذه القطعة وثيقة الصلة بإنشاء الوحدة الثالثة المقرر (Traditional Iraqi Wedding Customs)، احفظ مفرداتها جيداً لتدعيم كتابة الإنشاء."
        ],
        examples: [
          {
            en: "What is Henna used for before weddings? It is used to decorate the bride's hands and feet with beautiful patterns.",
            ar: "فيمَ تستخدم الحناء قبل الزفاف؟ لتزيين يدي وقدمي العروس بنقوش جميلة.",
            highlight: "Henna used to decorate",
            note: "سؤال استيعابي من كتاب الطالب"
          }
        ],
        exercises: [
          {
            id: "4u3-ex3",
            question: "In many traditional Middle Eastern weddings, celebrations can last for ______.",
            options: ["several days", "only one hour", "a few minutes", "one month"],
            correctAnswer: "several days",
            explanation: "تستمر الاحتفالات التقليدية لعدة أيام متتالية.",
            type: "mcq",
            ministerialYear: "امتحان الكورس الأول"
          }
        ]
      }
    ,
      {
        id: "4th-u3-l3",
        unitId: 43,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: المفردات والمتلازمات اللفظية للمناسبات والاحتفالات",
        titleEn: "Lesson 3: Celebrations Vocabulary, Compound Words & Collocations",
        category: "vocabulary",
        summary: "بنك المفردات الرسمية للمناسبات الاجتماعية، التعاريف اللغوية، واشتقاق الصفات والأسماء في كتاب النشاط.",
        grammarRuleFormula: "Key Wedding & Celebration Collocations:\n- celebrate -> celebration | marry -> marriage\n- bride and groom\n- formal reception",
        detailedContent: [
          "تمرين كتاب النشاط ص 42: مطابقة الكلمات ذات الصلة بالأفراح والمناسبات.",
          "المتلازمات اللفظية (Collocations): كلمات تأتي متلازمة معاً مثل traditional customs و special occasion.",
          "المرادفات والمتضادات: formal vs informal, joy vs sadness."
        ],
        teacherNotes: [
          "هذه المفردات أساسية لحل سؤال الإسقاطات (Vocabulary Drop) وكتابة إنشاء حفلة الزفاف العراقية."
        ],
        examples: [
          {
            en: "The bride's family hosted a lavish dinner for all the invited guests.",
            ar: "استضافت عائلة العروس عشاءً فاخراً لجميع الضيوف المدعوين.",
            highlight: "lavish dinner / invited guests",
            note: "متلازمات المناسبات"
          }
        ],
        exercises: [
          {
            id: "4u3-ex4",
            question: "A woman on her wedding day is called the ______.",
            options: ["bride", "groom", "cousin", "hostess"],
            correctAnswer: "bride",
            explanation: "المرأة في يوم زفافها تسمى bride (العروس).",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 42"
          }
        ]
      }
    ]
  },

  // -----------------------------------------------------------------------
  // Unit 4: Review 1 & Literature Term 1 (مراجعة الكورس الأول وأدب تاجر البندقية)
  // -----------------------------------------------------------------------
  {
    id: 44,
    number: 4,
    titleAr: "الوحدة الرابعة: المراجعة الشاملة للكورس الأول (Review 1 & Midterm Prep)",
    titleEn: "Unit 4: Comprehensive Review 1 & Consolidating Key Grammars",
    description: "مراجعة شاملة لجميع قواعد الكورس الأول (أفعال الحالة، المضارع المستمر، used to، أدوات الوصل) ونماذج أسئلة نصف السنة.",
    accentColor: "from-cyan-600 to-blue-600",
    bgGradient: "bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200",
    lessons: [
      {
        id: "4th-u4-l1",
        unitId: 44,
        lessonNumber: 1,
        titleAr: "الدرس الأول: المراجعة التراكمية لقواعد وأسئلة نصف السنة",
        titleEn: "Lesson 1: Cumulative Grammar Review for Term 1 & Mid-term Exams",
        category: "grammar",
        summary: "تطبيق عملي وتثبيت لقواعد الوحدات 1 و2 و3 مع نماذج أسئلة وزارية وتصحيح الأخطاء الشائعة.",
        detailedContent: [
          "مراجعة الأسئلة غير المباشرة: التحويل من Direct إلى Indirect بطريقة احترافية.",
          "مراجعة used to: الحالات الثلاث (إثبات، نفي، سؤال) والمقارنة مع but now.",
          "مراجعة جمل الوصل: المفاتيح السريعة للاختيار بين who, which, where, whose في أسئلة القواعد (Q2)."
        ],
        teacherNotes: [
          "امتحان نصف السنة للرابع الإعدادي يركز بنسبة 70% على تمييز أفعال الحالة وجمل الوصل و used to، احرص على حل كافة تمارين المراجعة في كتاب النشاط."
        ],
        examples: [
          {
            en: "Could you tell me where the station is?",
            ar: "هل يمكن أن تخبرني أين المحطة؟ (سؤال غير مباشر)",
            highlight: "where the station is",
            note: "ترتيب خبري في السؤال غير المباشر"
          },
          {
            en: "We used to live in a small village, but now we live in Baghdad.",
            ar: "اعتدنا العيش في قرية صغيرة، لكننا نعيش في بغداد الآن.",
            highlight: "used to live ... but now",
            note: "عادة ماضية مقارنة بالحاضر"
          }
        ],
        exercises: [
          {
            id: "4u4-ex1",
            question: "Salma used to be shy, but now she ______ very confident and outgoing.",
            options: ["is", "was", "has been", "is being"],
            correctAnswer: "is",
            explanation: "بعد but now نستخدم المضارع البسيط: Salma is confident.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          }
        ]
      },
      {
        id: "4th-u4-l2",
        unitId: 44,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: مفردات الكورس الأول وتجميع قطع الكتاب الاستيعابية",
        titleEn: "Lesson 2: Term 1 Vocabulary, Collocations & Reading Synthesis",
        category: "vocabulary",
        summary: "تجميع شامل لمفردات اللغات الرسمية في كندا، تقاليد الأعراس، ومراكز التعلم الذاتي، مع تمارين الإسقاطات والتوصيل للامتحان النصفي.",
        grammarRuleFormula: "Key Term 1 Collocations:\n- official language (لغة رسمية)\n- mother tongue (اللغة الأم)\n- self-access centre (مركز التعلم الذاتي)\n- wedding customs (تقاليد الأعراس)\n- bride and groom (العروس والعريس)",
        detailedContent: [
          "مراجعة شاملة لجميع الكلمات الوزارية التي ترد في سؤال الإسقاطات والتوصيل لكتابي الطالب والنشاط للكورس الأول.",
          "قطعة كندا: كندا ثاني أكبر دولة في العالم، ولغتاها الرسميتان هما الإنكليزية والفرنسية، والعاصمة هي أوتاوا.",
          "قطعة الأعراس: الأعراس مناسبات اجتماعية تختلف فيها التقاليد، وتتضمن الحناء والموسيقى التقليدية والمآدب الاحتفالية."
        ],
        teacherNotes: [
          "احفظ تعاريف الكلمات لأنها تأتي في سؤال التعاريف والإسقاطات (Match words with definitions)."
        ],
        examples: [
          {
            en: "Canada is bilingual because both English and French are official languages.",
            ar: "كندا ثنائية اللغة لأن كلاً من الإنكليزية والفرنسية لغتان رسميتان.",
            highlight: "bilingual / official languages",
            note: "مفردات قطعة كندا"
          }
        ],
        exercises: [
          {
            id: "4u4-ex2",
            question: "A person whose first language is Arabic has Arabic as their ______ tongue.",
            options: ["mother", "native", "home", "first"],
            correctAnswer: "mother",
            explanation: "المصطلح المعتمد في المنهج هو mother tongue (اللغة الأم).",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 62"
          }
        ]
      }
    ,
      {
        id: "4th-u4-l3",
        unitId: 44,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: استيعاب قصة تاجر البندقية ونموذج امتحان نصف السنة",
        titleEn: "Lesson 3: The Merchant of Venice Study Guide & Midterm Blueprint",
        category: "reading",
        summary: "دراسة الشخصيات الرئيسية لمسرحية شكسبير المقررة (أنطونيو، بسانيو، شايلوك، بورشا) مع نموذج كامل لأسئلة امتحان نصف السنة.",
        detailedContent: [
          "الشخصيات: Antonio (التاجر النبيل)، Bassanio (صديقه المخلص)، Shylock (المرابي)، Portia (المحامية الحكيمة).",
          "موضوع المسرحية: الصراع بين الرحمة والقسوة (The Quality of Mercy is not strained).",
          "هيكل امتحان نصف السنة الرسمي: 1. قطعة خارجية (10 درجات)، 2. قطع الكتاب (10 درجات)، 3. القواعد (20 درجة)، 4. المفردات والإملاء (10 درجات)، 5. الأدب (10 درجات)، 6. الإنشاء (20 درجة)."
        ],
        teacherNotes: [
          "احفظ الأسئلة الوزارية الخاصة بخطاب بورشا في المحكمة (speech on mercy) لأنها تأتي دائماً في سؤال الأدب."
        ],
        examples: [
          {
            en: "Why did Antonio borrow money from Shylock? To help his close friend Bassanio marry Portia.",
            ar: "لماذا اقترض أنطونيو المال من شايلوك؟ لمساعدة صديقه المقرب بسانيو على الزواج من بورشا.",
            highlight: "borrow money from Shylock",
            note: "سؤال أدبي أساسي"
          }
        ],
        exercises: [
          {
            id: "4u4-ex3",
            question: "In The Merchant of Venice, who disguised as a young lawyer to save Antonio's life?",
            options: ["Portia", "Jessica", "Nerissa", "Bassanio"],
            correctAnswer: "Portia",
            explanation: "بورشا تنكرت بزي قاضٍ ومحامٍ شاب لإنقاذ حياة أنطونيو.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة الرسمي"
          }
        ]
      }
    ]
  },

  // -----------------------------------------------------------------------
  // Unit 5: Modals of Obligation & Future Continuous (الإلزام والمستقبل المستمر)
  // -----------------------------------------------------------------------
  {
    id: 45,
    number: 5,
    titleAr: "الوحدة الخامسة: أفعال الإلزام والضرورة والمستقبل المستمر (Obligation & Future Continuous)",
    titleEn: "Unit 5: Modals of Obligation, Prohibition & Future Continuous",
    description: "أفعال الضرورة والمنع (must, have to, need to, mustn't, don't have to)، وصيغة المستقبل المستمر للأحداث المخططة زمنياً.",
    accentColor: "from-emerald-600 to-teal-600",
    bgGradient: "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200",
    lessons: [
      {
        id: "4th-u5-l1",
        unitId: 45,
        lessonNumber: 1,
        titleAr: "الدرس الأول: أفعال الإلزام والضرورة والمنع القطعي (Modals of Necessity & Prohibition)",
        titleEn: "Lesson 1: Must, Have to, Need to vs Mustn't & Don't have to",
        category: "grammar",
        summary: "التعبير عن الإلزام القانوني والأخلاقي (must / have to)، وعدم الضرورة (don't have to)، والتحريم القاطع وعقوبته (mustn't).",
        grammarRuleFormula: "1) Necessity & Obligation (ضرورة وإلزام قانوني أو أمني):\nSubject + must / have to / need to + base verb\n(Drivers must wear seat belts.)\n\n2) Lack of Necessity (عدم ضرورة - أمر اختياري لا عقوبة عليه):\nSubject + don't have to / doesn't have to / needn't + base verb\n(You don't have to wash the car today; it is clean.)\n\n3) Prohibition (منع وتحريم قطعي ومخالفة قانونية أو خطر):\nSubject + mustn't + base verb\n(You mustn't smoke at a petrol station.)",
        detailedContent: [
          "نستخدم must و have to عندما يكون الفعل واجباً بموجب قانون أو نظام رسمي.",
          "نستخدم mustn't للنهي والتحريم القطعي، حيث يترتب على الفعل ضرر فادح أو عقوبة قانونية صارمة.",
          "نستخدم don't have to أو needn't للتعبير عن أمر اختياري (لست مجبراً عليه إن لم ترغب).",
          "ملاحظة هامة: كلمة needn't لا تأخذ to بعدها مطلقاً (needn't go وليس needn't to go)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه جداً للفرق بين mustn't (ممنوع منعاً باتاً وفيه خطر أو سجن أو غرامة) وبين don't have to (أنت غير مجبر ولكنك حر في الاختيار)."
        ],
        commonMistakes: [
          "إضافة to بعد needn't (الصحيح needn't go وليس needn't to go).",
          "استخدام don't have to في مواقف الخطر المميت (الصحيح mustn't)."
        ],
        examples: [
          {
            en: "You mustn't drive through a red traffic light; it causes fatal accidents.",
            ar: "يحرم عليك تجاوز الإشارة المرورية الحمراء؛ فهذا يسبب حوادث مميتة.",
            highlight: "mustn't drive",
            note: "تحريم ومنع قطعي"
          },
          {
            en: "Tomorrow is a national holiday, so we don't have to go to school.",
            ar: "غداً عطلة رسمية، لذا لسنا ملزمين بالذهاب إلى المدرسة (عدم ضرورة).",
            highlight: "don't have to go",
            note: "عدم إلزام"
          }
        ],
        exercises: [
          {
            id: "4u5-ex1",
            question: "You ______ take photos inside the military zone; it is strictly prohibited by law.",
            options: ["mustn't", "don't have to", "need to", "must"],
            correctAnswer: "mustn't",
            explanation: "الشيء محظور قانونياً (strictly prohibited)، لذا نستخدم أداة التحريم القطعي mustn't.",
            type: "mcq",
            ministerialYear: "امتحان نهاية الكورس الثاني"
          },
          {
            id: "4u5-ex2",
            question: "There is plenty of petrol in the tank, so you ______ stop at the petrol station.",
            options: ["don't have to", "mustn't", "must", "have to"],
            correctAnswer: "don't have to",
            explanation: "الخزان ممتلئ، لذا لست بحاجة للتوقف (عدم ضرورة اختياري) فنستخدم don't have to.",
            type: "mcq",
            ministerialYear: "امتحان الكورس الثاني"
          }
        ]
      },
      {
        id: "4th-u5-l2",
        unitId: 45,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: المستقبل المستمر (Future Continuous Tense)",
        titleEn: "Lesson 2: Future Continuous (will be + verb-ing) for Scheduled Actions",
        category: "grammar",
        summary: "التعبير عن أحداث ستكون مستمرة وقيد التنفيذ في وقت محدد ومضبوط في المستقبل.",
        grammarRuleFormula: "(+) Subject + will be + Verb-ing\n(-) Subject + won't be + Verb-ing\n(?) Will + Subject + be + Verb-ing...?\n\nKey Time Markers: this time tomorrow, between 7 and 9 pm tomorrow, next Monday morning",
        detailedContent: [
          "يستخدم المستقبل المستمر عندما نركز على استمرارية الحدث في لحظة محددة من المستقبل.",
          "مثال: At 8:00 tomorrow evening, I will be studying for my physics test.",
          "يستخدم أيضاً للمواعيد المجدولة والأنشطة المؤكدة كجزء من روتين أو خطة مدروسة."
        ],
        teacherNotes: [
          "إذا رأيت عبارة (this time tomorrow) أو (between ... and ... tomorrow) اختر صيغة will be + V-ing مباشرة."
        ],
        examples: [
          {
            en: "This time next week, we will be flying to Istanbul for the holidays.",
            ar: "في مثل هذا الوقت من الأسبوع القادم، سنكون محلقين بالطائرة إلى إسطنبول لقضاء العطلة.",
            highlight: "will be flying",
            note: "مستقبل مستمر في وقت محدد"
          }
        ],
        exercises: [
          {
            id: "4u5-ex3",
            question: "Don't phone me at 3:00 tomorrow afternoon because I ______ (take) an English exam.",
            options: ["will be taking", "will take", "took", "am taking"],
            correctAnswer: "will be taking",
            explanation: "حدث سيكون مستمراً وقيد التنفيذ في وقت محدد (3:00)، لذا نستخدم المستقبل المستمر will be taking.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الثاني"
          }
        ]
      }
    ,
      {
        id: "4th-u5-l3",
        unitId: 45,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: قطعة القراءة والمفردات - السفر وإجراءات المطارات",
        titleEn: "Lesson 3: Air Travel, Airport Announcements & Travel Vocabulary",
        category: "reading",
        summary: "استيعاب إعلانات ولوائح المطارات في كتاب الطالب، واستخدام أفعال الإلزام (must, have to, mustn't) في المواقف الواقعية.",
        detailedContent: [
          "إجراءات المطار: إبراز جواز السفر عند كاونتر تسجيل الدخول (check-in desk).",
          "قواعد الأمتعة: الوزن الزائد (excess baggage) يستوجب دفع رسوم إضافية.",
          "قوانين السلامة: يجب على المسافرين إطفاء الهواتف أو تفعيل وضع الطيران أثناء الإقلاع والهبوط."
        ],
        teacherNotes: [
          "اربط بين مفردات السفر وقواعد الوحدة الخامسة: Passengers must show their boarding pass; they mustn't leave bags unattended."
        ],
        examples: [
          {
            en: "Passengers mustn't carry any sharp objects in their hand luggage.",
            ar: "يحظر على المسافرين حمل أي أدوات حادة في حقائب اليد.",
            highlight: "mustn't carry",
            note: "تحريم قانوني صارم"
          }
        ],
        exercises: [
          {
            id: "4u5-ex4",
            question: "You ______ show your passport before boarding the international flight.",
            options: ["must", "mustn't", "don't have to", "can't"],
            correctAnswer: "must",
            explanation: "إظهار جواز السفر أمر إلزامي قانونياً (must).",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 75"
          }
        ]
      }
    ]
  },

  // -----------------------------------------------------------------------
  // Unit 6: Advanced Passive Voice (المبني للمجهول المتقدم)
  // -----------------------------------------------------------------------
  {
    id: 46,
    number: 6,
    titleAr: "الوحدة السادسة: المبني للمجهول المتقدم عبر الأزمنة (Advanced Passive Voice)",
    titleEn: "Unit 6: Passive Voice Across Tenses (Modals, Perfect & Continuous)",
    description: "المبني للمجهول مع الأفعال الناقصة (can / will / must be + P.P.)، والمضارع التام، وقطعة إنقاذ أهوار العراق والتنوع البيولوجي.",
    accentColor: "from-amber-600 to-orange-600",
    bgGradient: "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200",
    lessons: [
      {
        id: "4th-u6-l1",
        unitId: 46,
        lessonNumber: 1,
        titleAr: "الدرس الأول: المبني للمجهول مع الأفعال الناقصة والمضارع التام (Modal & Perfect Passive)",
        titleEn: "Lesson 1: Modal Passive & Present Perfect Passive Rules",
        category: "grammar",
        summary: "تحويل الجمل التي تحتوي على can / must / will / should أو have/has إلى صيغة المبني للمجهول بالتركيز على المفعول به.",
        grammarRuleFormula: "1) Modal Verbs Passive:\nObject + can / will / must / should + be + Past Participle (P.P.)\n(Plastic bottles can be recycled.)\n\n2) Present Perfect Passive:\nObject + have / has + been + Past Participle (P.P.)\n(The damaged bridge has been reconstructed.)\n\nخطوات التحويل الأساسية:\n1. نحذف الفاعل ونبدأ بالمفعول به (Object).\n2. نضع الفعل المساعد المناسب (can be / will be / has been).\n3. نحول الفعل الرئيسي إلى التصريف الثالث (Past Participle).",
        detailedContent: [
          "عند وجود فعل ناقص (can, will, must, should, may) نضع بعده كلمة be المجردة ثم التصريف الثالث للفعل.",
          "في المضارع التام نضع been بين have/has والتصريف الثالث.",
          "تستخدم صيغة المبني للمجهول بكثرة في الأخبار والمقالات العلمية والبيئية حيث يكون الحدث أو المفعول به أهم من الفاعل."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تذكر دائماً الفارق: الأفعال الناقصة (can/must/will) تأخذ بعدها (be + تصريف ثالث)، بينما الأزمنة التامة (have/has) تأخذ بعدها (been + تصريف ثالث)."
        ],
        commonMistakes: [
          "نسيان be بعد الفعل الناقص: The work must finished (الصحيح must be finished).",
          "نسيان تحويل الفعل إلى التصريف الثالث P.P."
        ],
        examples: [
          {
            en: "Endangered animals in the Iraqi marshes must be protected by law.",
            ar: "يجب حماية الحيوانات المهددة بالانقراض في أهوار العراق بموجب القانون.",
            highlight: "must be protected",
            note: "مبني للمجهول مع فعل ناقص"
          },
          {
            en: "The ancient ruins of Babylon have been restored recently.",
            ar: "تم ترميم آثار بابل القديمة مؤخراً.",
            highlight: "have been restored",
            note: "مبني للمجهول في المضارع التام"
          }
        ],
        exercises: [
          {
            id: "4u6-ex1",
            question: "These historic manuscripts can ______ (see) in the National Museum of Iraq.",
            options: ["be seen", "seen", "be saw", "see"],
            correctAnswer: "be seen",
            explanation: "بعد can في المبني للمجهول نستخدم be + التصريف الثالث seen.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          },
          {
            id: "4u6-ex2",
            question: "The new highway between Baghdad and Basra has ______ (build) successfully.",
            options: ["been built", "been build", "built", "being built"],
            correctAnswer: "been built",
            explanation: "في المضارع التام للمجهول نستخدم has been + التصريف الثالث built.",
            type: "mcq",
            ministerialYear: "امتحان الكورس الثاني"
          }
        ]
      },
      {
        id: "4th-u6-l2",
        unitId: 46,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: قطعة الكتاب - أهوار العراق والتراث العالمي (The Mesopotamian Marshes)",
        titleEn: "Lesson 2: Reading Text - Mesopotamian Marshes & Environmental Conservation",
        category: "reading",
        summary: "قطعة الاستيعاب الرسمية حول أهوار جنوب العراق، تصنيفها ضمن التراث العالمي لليونسكو، والطيور المهاجرة وحمايتها.",
        detailedContent: [
          "تعد أهوار بلاد الرافدين في جنوب العراق واحدة من أكبر الأراضي الرطبة في الشرق الأوسط ذات التنوع البيولوجي الفريد.",
          "أُدرجت أهوار العراق ضمن لائحة التراث العالمي لمنظمة اليونسكو (UNESCO World Heritage Site) لأهميتها الثقافية والطبيعية.",
          "تعتبر محطة استراحة حيوية لملايين الطيور المهاجرة بين القارة الأوروبية وسيبيريا وأفريقيا مثل طيور النحام والبجع.",
          "يواجه النظام البيئي تحديات الجفاف وبناء السدود وتغير المناخ مما يتطلب سن قوانين صارمة لحمايتها وتوفير المياه الكافية."
        ],
        teacherNotes: [
          "هذه القطعة تمثل الأساس الفكري واللغوي لإنشاء الوحدة السادسة المعتمد (Protecting the Mesopotamian Marshes)."
        ],
        examples: [
          {
            en: "Why are the Mesopotamian marshes globally significant? Because they are a UNESCO World Heritage site and home to migratory birds.",
            ar: "لماذا تكتسب أهوار الرافدين أهمية عالمية؟ لأنها موقع تراث عالمي لليونسكو وملاذ للطيور المهاجرة.",
            highlight: "UNESCO World Heritage site",
            note: "سؤال من كتاب الطالب"
          }
        ],
        exercises: [
          {
            id: "4u6-ex3",
            question: "The Mesopotamian marshes were recognized as a ______ World Heritage site.",
            options: ["UNESCO", "WHO", "UNICEF", "NATO"],
            correctAnswer: "UNESCO",
            explanation: "أهوار العراق معترف بها كموقع تراث عالمي تابع لمنظمة اليونسكو (UNESCO).",
            type: "mcq",
            ministerialYear: "امتحان الكورس الثاني"
          }
        ]
      }
    ,
      {
        id: "4th-u6-l3",
        unitId: 46,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: الأوامر والطلبات الرسمية والتحويلات اللغوية",
        titleEn: "Lesson 3: Formal Notices, Reported Requests & Passive Synthesis",
        category: "grammar",
        summary: "التحويلات الرسمية للإشعارات والمذكرات، وصياغة الطلبات المهذبة والمبني للمجهول في السياق الأكاديمي والبيئي.",
        grammarRuleFormula: "Formal Instructions:\n- Passive in signs: Cameras must not be used\n- Reported requests: The officer asked us to show our permits",
        detailedContent: [
          "استخدام المبني للمجهول في الكتابة الرسمية والتقارير العلمية لإضفاء طابع الحيادية والموضوعية.",
          "تحويل الجمل الإنشائية إلى مبني للمجهول: Scientists study climate change -> Climate change is studied by scientists.",
          "مصطلحات كتاب النشاط المتعلقة بالأهوار والتنوع الحيوي: flora and fauna, biodiversity, migratory birds."
        ],
        teacherNotes: [
          "في امتحانات نهاية الكورس، يأتي تحويل المبني للمجهول مع الأفعال الناقصة مثل (can be done, will be saved)."
        ],
        examples: [
          {
            en: "Important documents must be signed by the principal.",
            ar: "يجب أن يتم توقيع الوثائق الهامة من قبل المدير.",
            highlight: "must be signed",
            note: "مبني للمجهول رسمي"
          }
        ],
        exercises: [
          {
            id: "4u6-ex4",
            question: "Rewrite in passive: We should protect nature reserves. -> Nature reserves ______.",
            options: ["should be protected", "should protect", "are protected", "have protected"],
            correctAnswer: "should be protected",
            explanation: "بعد should في المجهول نضع be والتصريف الثالث protected.",
            type: "mcq",
            ministerialYear: "امتحان نهاية الكورس الثاني"
          }
        ]
      }
    ]
  },

  // -----------------------------------------------------------------------
  // Unit 7: Nature, Disasters & Conditionals with Unless (الشرط مع Unless)
  // -----------------------------------------------------------------------
  {
    id: 47,
    number: 7,
    titleAr: "الوحدة السابعة: الطبيعة والجمل الشرطية مع Unless (Nature & Unless Conditionals)",
    titleEn: "Unit 7: Nature, Disasters & First Conditionals with (Unless = If not)",
    description: "الحالة الشرطية الصفرية والأولى، واستخدام أداة الشرط unless بمعنى (ما لم / إذا لم) في قضايا التصحر وتغير المناخ.",
    accentColor: "from-rose-600 to-red-600",
    bgGradient: "bg-gradient-to-r from-rose-50 to-red-50 border-rose-200",
    lessons: [
      {
        id: "4th-u7-l1",
        unitId: 47,
        lessonNumber: 1,
        titleAr: "الدرس الأول: الجمل الشرطية واستخدام (Unless = If not)",
        titleEn: "Lesson 1: First Conditionals with (Unless = If not)",
        category: "grammar",
        summary: "استبدال If not بـ Unless وصياغة الجمل الشرطية الدالة على التحذير والنتائج المستقبلية المحتملة.",
        grammarRuleFormula: "القاعدة الذهبية:\nUnless + Affirmative Present Simple = If + Negative Present Simple\n\nالصيغة:\nUnless + Subject + Present Simple (V-s / base) , Subject + will / won't + base verb\n\nأمثلة:\nUnless we plant more trees, desertification will increase.\n(= If we do not plant more trees, desertification will increase.)\n\nUnless you study hard, you won't pass your final exams.\n(= If you do not study hard, you will not pass.)",
        detailedContent: [
          "كلمة unless تعني في اللغة الإنكليزية (إلا إذا / ما لم / if not).",
          "جملة فعل الشرط الملاصقة لـ unless تكون دائماً مثبتة في تركيبها لأن النفي متضمن في معنى الكلمة نفسها.",
          "جواب الشرط يتبع قواعد الحالة الشرطية الأولى: إما will أو won't وفق المعنى المراد.",
          "إذا طلب في الامتحان تحويل جملة If المنفية إلى Unless: نحذف If ونحذف don't / doesn't ونضع Unless مع تعديل الفعل (إضافة s إذا حذفنا doesn't)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: إياك ثم إياك أن تضع جملة منفية بعد unless! لا يجوز نهائياً أن تقول Unless you don't hurry! الصحيح هو Unless you hurry, you will miss the bus."
        ],
        commonMistakes: [
          "وضع نفي مزدوج بعد unless: Unless he doesn't come (الصحيح Unless he comes).",
          "نسيان إضافة s الشخص الثالث للفعل المفرد بعد حذف doesn't."
        ],
        examples: [
          {
            en: "Unless it rains soon, farmers will lose their seasonal crops.",
            ar: "ما لم تمطر السماء قريباً، سيخسر المزارعون محاصيلهم الموسمية.",
            highlight: "Unless it rains ... will lose",
            note: "جملة شرطية مع unless وفعل مثبت"
          },
          {
            en: "You will not make progress unless you practice your English daily.",
            ar: "لن تحقق تقدماً إلا إذا مارست لغتك الإنكليزية يومياً.",
            highlight: "unless you practice",
            note: "Unless في وسط الجملة"
          }
        ],
        exercises: [
          {
            id: "4u7-ex1",
            question: "Unless he ______ (study) hard, he will not pass the scholarship exam.",
            options: ["studies", "doesn't study", "studied", "will study"],
            correctAnswer: "studies",
            explanation: "بعد unless نستخدم مضارعاً بسيطاً مثبتاً مع s الشخص الثالث للفاعل he: studies.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          },
          {
            id: "4u7-ex2",
            question: "Unless we stop polluting the river, fish ______ (die).",
            options: ["will die", "died", "die", "would die"],
            correctAnswer: "will die",
            explanation: "جواب الشرط في الحالة الأولى يعبر عن نتيجة مستقبلية مع will die.",
            type: "mcq",
            ministerialYear: "امتحان الكورس الثاني"
          }
        ]
      },
      {
        id: "4th-u7-l2",
        unitId: 47,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: قضايا البيئة والتصحر ومصطلحات الطبيعة",
        titleEn: "Lesson 2: Environmental Issues, Desertification & Green Solutions",
        category: "vocabulary",
        summary: "كتاب الطالب ص 74-77 وكتاب النشاط ص 108-112: ظاهرة التصحر (desertification)، تلوث الأنهار، زراعة الأشجار لصد الرياح، ومصطلحات حماية الطبيعة.",
        grammarRuleFormula: "Environmental Lexicon:\n- desertification (التصحر وزحف الكثبان الرملية)\n- green belt (الحزام الأخضر لصد العواصف الترابية)\n- drought (الجفاف ونقص الأمطار)\n- fertile land (أرض خصبة صالحة للزراعة)\n- plant saplings (غرس الشتلات والأشجار)",
        detailedContent: [
          "يشكل التصحر تحدياً بيئياً كبيراً في العراق والمنطقة بسبب قلة الأمطار وارتفاع درجات الحرارة والرعي الجائر.",
          "الحل البيئي الفعال هو إنشاء أحزمة خضراء (green belts) حول المدن وزراعة النخيل والأشجار لتثبيت التربة وتلطيف الجو.",
          "تمارين كتاب النشاط تركز على متلازمات الكلمات وإكمال الفراغات بكلمات من الصندوق."
        ],
        teacherNotes: [
          "سؤال متكرر: What is the best way to stop desertification? الجواب: By planting trees and creating green belts."
        ],
        examples: [
          {
            en: "Creating a green belt helps stop dust storms and protects fertile soil.",
            ar: "إنشاء حزام أخضر يساعد في إيقاف العواصف الترابية وحماية التربة الخصبة.",
            highlight: "green belt / protects fertile soil",
            note: "متلازمات بيئية"
          }
        ],
        exercises: [
          {
            id: "4u7-ex3",
            question: "______ is the process where fertile land becomes dry and turns into desert.",
            options: ["Desertification", "Pollution", "Recycling", "Flooding"],
            correctAnswer: "Desertification",
            explanation: "التصحر (Desertification) هو تحول الأراضي الخصبة إلى صحراء جافة.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 110"
          }
        ]
      }
    ,
      {
        id: "4th-u7-l3",
        unitId: 47,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: التعبير عن الغرض والسبب (Expressing Purpose)",
        titleEn: "Lesson 3: Expressing Purpose with 'in order to', 'so that' & 'to'",
        category: "grammar",
        summary: "قواعد التعبير عن الغرض والغاية في مشاريع حماية البيئة ومكافحة التصحر.",
        grammarRuleFormula: "1) to / in order to + Base Verb\n2) so that + Subject + can / could / will + Base Verb",
        detailedContent: [
          "نستخدم to أو in order to متبوعة بالمصدر للتعبير عن الهدف من الفعل.",
          "نستخدم so that متبوعة بجملة كاملة تحتوي على فاعل وفعل مساعد (can / could / will).",
          "في النفي نستخدم in order not to + مصدر: He wore sunglasses in order not to hurt his eyes."
        ],
        teacherNotes: [
          "انتبه: بعد so that يجب أن تضع فاعلاً مثل (so that we can...) ولا يجوز وضع فعل مباشر."
        ],
        examples: [
          {
            en: "Farmers build green windbreaks so that crops will not be damaged.",
            ar: "يبني المزارعون مصدات رياح خضراء لكيلا تتلف المحاصيل.",
            highlight: "so that crops will not be damaged",
            note: "تعبير عن الغرض بجملة كاملة"
          }
        ],
        exercises: [
          {
            id: "4u7-ex4",
            question: "Scientists developed new solar panels ______ generate clean electricity.",
            options: ["in order to", "so that", "because", "although"],
            correctAnswer: "in order to",
            explanation: "بعد الفراغ يوجد مصدر مجرد generate، لذا نستخدم in order to.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 115"
          }
        ]
      }
    ]
  },

  // -----------------------------------------------------------------------
  // Unit 8: Final Review & Exam Preparation (مراجعة نهاية العام)
  // -----------------------------------------------------------------------
  {
    id: 48,
    number: 8,
    titleAr: "الوحدة الثامنة: المراجعة العامة والتهيئة للامتحان النهائي (Final Review & Exam Readiness)",
    titleEn: "Unit 8: Final Comprehensive Review across All Units",
    description: "مراجعة شاملة لجميع مهارات الوحدات (1 - 7)، تثبيت المفردات والإملاء، ونماذج امتحانية تحاكي أسئلة نهاية السنة الرسمية.",
    accentColor: "from-indigo-600 to-purple-600",
    bgGradient: "bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200",
    lessons: [
      {
        id: "4th-u8-l1",
        unitId: 48,
        lessonNumber: 1,
        titleAr: "الدرس الأول: المراجعة الشاملة لأسئلة القواعد والإملاء والمفردات",
        titleEn: "Lesson 1: Comprehensive Grammar, Vocabulary & Spelling Review",
        category: "grammar",
        summary: "التدريب على الأسئلة متعددة الخيارات والتصحيح الإملائي، وإتقان التحويلات القواعدية المعتمدة في كتاب النشاط.",
        detailedContent: [
          "تمارين الإملاء والاشتقاق: تحويل الأفعال لأسماء (communicate -> communication, invent -> invention).",
          "بادئات النفي: legal -> illegal, possible -> impossible, regular -> irregular.",
          "توصيل المفردات والوظائف: interpreter (مترجم فوري), architect (مهندس معماري), paramedic (مسعف طوارئ)."
        ],
        teacherNotes: [
          "احرص على مراجعة قائمة الإملاء في كتاب النشاط صفحة 110-112؛ درجات السؤال الثالث (20 درجة) مضمونة بحفظ هذه المشتقات والبادئات."
        ],
        examples: [
          {
            en: "It is illegal to drive without a valid driving license.",
            ar: "من غير القانوني القيادة بدون رخصة قيادة صالحة (بادئة il-).",
            highlight: "illegal",
            note: "بادئة نفي مشتقة"
          },
          {
            en: "An interpreter must have excellent listening and translation skills.",
            ar: "يجب أن يتمتع المترجم الفوري بمهارات استماع وترجمة ممتازة.",
            highlight: "interpreter",
            note: "اسم وظيفة مشتق"
          }
        ],
        exercises: [
          {
            id: "4u8-ex1",
            question: "A person who translates spoken words immediately is an ______.",
            options: ["interpreter", "architect", "engineer", "editor"],
            correctAnswer: "interpreter",
            explanation: "المترجم الفوري الشفوي يسمى interpreter.",
            type: "mcq",
            ministerialYear: "امتحان نهاية العام"
          }
        ]
      },
      {
        id: "4th-u8-l2",
        unitId: 48,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: المراجعة الإملائية وتفكيك الفخاخ الامتحانية",
        titleEn: "Lesson 2: Final Spelling, Prepositions & Trap Dissolution",
        category: "spelling",
        summary: "تجميع قواعد الإملاء (البادئات المعاكسة un, im, in, dis)، حروف الجر الملازمة، وتحويل الأسماء إلى صفات لضمان الدرجة الكاملة في السؤال الإملائي.",
        grammarRuleFormula: "Key Prefixes & Suffixes:\n- polite -> impolite | patient -> impatient (im- قبل m و p)\n- legal -> illegal (il- قبل l)\n- regular -> irregular (ir- قبل r)\n- connect -> disconnect | agree -> disagree (dis- للأفعال)\n- danger -> dangerous | beauty -> beautiful (-ous / -ful)",
        detailedContent: [
          "سؤال الإملاء (Spelling Question) يمثل جزءاً ثابتاً في الورقة الامتحانية (5 إلى 10 درجات).",
          "قواعد إضافة البادئات المعاكسة: نستخدم im- مع الكلمات التي تبدأ بـ p أو m (impolite, impossible)، باستثناء شواذ مثل popular -> unpopular.",
          "حروف الجر الثابتة مع الصفات: interested in, proud of, afraid of, good at."
        ],
        teacherNotes: [
          "احفظ شواذ البادئة un-: كلمة popular تصبح unpopular رغم أنها تبدأ بحرف p، وهي تتكرر كفخ امتحاني."
        ],
        examples: [
          {
            en: "Regular spelling revision prevents silly mistakes in final exam papers.",
            ar: "المراجعة الإملائية المنتظمة تمنع الأخطاء التافهة في أوراق الامتحان النهائي.",
            highlight: "spelling revision",
            note: "أهمية الإملاء"
          }
        ],
        exercises: [
          {
            id: "4u8-ex2",
            question: "Opposite: polite -> impolite ; correct -> ______",
            options: ["incorrect", "uncorrect", "discorrect", "imcorrect"],
            correctAnswer: "incorrect",
            explanation: "عكس كلمة correct هو incorrect بإضافة البادئة in-.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          }
        ]
      },
      {
        id: "4th-u8-l3",
        unitId: 48,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: النموذج الشامل للاختبار النهائي للرابع الإعدادي",
        titleEn: "Lesson 3: Final Model Exam Paper & Ministerial Trap Dissolution",
        category: "spelling",
        summary: "خطة مراجعة شاملة للامتحان النهائي الرسمي، تفكيك الفخاخ الإملائية والقواعدية، وجدول تصريف الأفعال الشاذة.",
        grammarRuleFormula: "Final Exam Blueprint:\n1. Reading Comprehension (10 marks)\n2. Grammar Transformations (20 marks)\n3. Vocabulary & Collocations (10 marks)\n4. Spelling Rules (10 marks)\n5. Literature Focus (10 marks)\n6. Composition (20 marks)",
        detailedContent: [
          "تطبيق شامل على جميع أنماط الأسئلة المعتمدة في مديريات التربية العراقية لصفوف الرابع الإعدادي.",
          "نصائح لإدارة وقت الامتحان: تخصيص 20 دقيقة للإنشاء و30 دقيقة للقواعد و20 دقيقة للقطعة الخارجية.",
          "قائمة الكلمات المتشابهة إملائياً التي يجب الانتباه إليها في الدفتر الامتحاني."
        ],
        teacherNotes: [
          "تأكد من كتابة الإنشاء بخط واضح وترك سطر بين الفقرات ووضع علامات التنقيط بدقة للحصول على الدرجة الكاملة (20/20)."
        ],
        examples: [
          {
            en: "Thorough preparation and steady practice guarantee top marks in English.",
            ar: "الاستعداد الشامل والممارسة المستمرة يضمنان أعلى الدرجات في الإنكليزي.",
            highlight: "steady practice",
            note: "نصيحة تفوق"
          }
        ],
        exercises: [
          {
            id: "4u8-ex3",
            question: "Spelling: active -> inactive ; fortunate -> ______",
            options: ["unfortunate", "infortunate", "disfortunate", "misfortunate"],
            correctAnswer: "unfortunate",
            explanation: "عكس fortunate هو unfortunate بالبادئة un-.",
            type: "mcq",
            ministerialYear: "امتحان الدور الأول"
          }
        ]
      }
    ]
  }
];

// =========================================================================
// نصوص الأدب الرسمية للرابع الإعدادي (Prescribed Literature)
// 1. مسرحية تاجر البندقية (The Merchant of Venice - William Shakespeare)
// 2. قصيدة الطريق الذي لم يُسلك (The Road Not Taken - Robert Frost)
// =========================================================================
export const FOURTH_PREPARATORY_LITERATURE: LiteratureItem[] = [
  {
    id: "4th-lit-merchant",
    title: "The Merchant of Venice",
    titleAr: "مسرحية تاجر البندقية (وليم شكسبير)",
    author: "William Shakespeare",
    authorAr: "وليم شكسبير (أعظم كتاب المسرح في تاريخ الأدب الإنساني)",
    authorYears: "1564 - 1616",
    authorBioAr: [
      "وليم شكسبير شاعر وكاتب مسرحي إنكليزي عبقري، وُلد في مدينة ستراتفورد على نهر إيفون.",
      "كتب 38 مسرحية خالدة وأكثر من 154 سونيتة شعرية، وتُعد مسرحياته ركناً أساسياً في المناهج التعليمية العالمية والمنهاج العراقي."
    ],
    genre: "Drama / Justice, Mercy & Friendship",
    genreAr: "مسرحية درامية عالمية عن العدالة والرحمة والصداقة والتضحية",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=1200&q=80",
    imageCaptionAr: "مشهد محكمة البندقية الشهير بين بورشا وشايلوك في مسرحية تاجر البندقية",
    summaryAr: "تدور أحداث المسرحية في مدينة البندقية بإيطاليا؛ يقترض الشاب النبيل بسانيو 3000 دينار ذهبي من صديقه التاجر الكريم أنطونيو للزواج من السيدة الحكيمة والثرية بورشا. ولأن سفن أنطونيو التجارية كانت في عرض البحر ولم تعد بعد، يضطر أنطونيو لاقتراض المال من المرابي القاسي شايلوك. يضع شايلوك شرطاً انتقامياً قاسياً: إذا عجز أنطونيو عن السداد في الموعد المحدد، يحق لشايلوك اقتطاع رطل كامل من لحم أنطونيو. عندما تضيع سفن أنطونيو في العواصف، يرفض شايلوك أي تسوية ويطالب بتنفيذ العقد أمام المحكمة. هنا تتنكر بورشا بزي محامٍ وقاضٍ شاب (بلطاسار)، وتلقي خطبتها الخالدة عن فضيلة الرحمة (The Quality of Mercy)، وتفاجئ شايلوك بالحكم العبقري: العقد يمنحه رطلاً من اللحم دون قطرة دم واحدة، وإذا سالت قطرة دم، تصادر أمواله، فينتصر الحق وتنجو حياة أنطونيو.",
    moralLessonAr: "الرحمة تعلو فوق نصوص القوانين الصارمة والقسوة، والصداقة الحقيقية والتضحية الصادقة تنتصر دائماً على الجشع والانتقام الأعمى.",
    keyThemes: ["Mercy versus Strict Law & Revenge", "True Selfless Friendship & Sacrifice", "Appearance versus Reality"],
    characters: [
      {
        name: "Antonio",
        nameAr: "أنطونيو (تاجر البندقية)",
        role: "The generous merchant",
        roleAr: "التاجر الكريم والمضحي من أجل صديقه",
        description: "A wealthy, honorable merchant of Venice who signs a lethal bond to support his dearest friend Bassanio.",
        descriptionAr: "تاجر كريم مستعد للمخاطرة بحياته وتوقيع السند القاتل لمساعدة صديقه الوفي بسانيو."
      },
      {
        name: "Shylock",
        nameAr: "شايلوك",
        role: "The vengeful moneylender",
        roleAr: "المرابي القاسي الساعي للانتقام",
        description: "A greedy moneylender who demands a pound of Antonio's flesh when the debt cannot be repaid.",
        descriptionAr: "مرابٍ قاسي يطالب باقتطاع رطل من لحم أنطونيو انتقاماً وكراهية."
      },
      {
        name: "Portia",
        nameAr: "بورشا",
        role: "The brilliant noble heroine",
        roleAr: "السيدة الذكية التي أنقذت الموقف بحكمتها",
        description: "Disguises herself as a young male lawyer (Balthazar) and delivers the famous speech on the quality of mercy.",
        descriptionAr: "تتنكر في زي محامٍ وقاضٍ شاب وتلقي خطبتها الشهيرة عن الرحمة وتنقذ حياة أنطونيو بدهاء قانوني."
      },
      {
        name: "Bassanio",
        nameAr: "بسانيو",
        role: "Antonio's loyal friend",
        roleAr: "صديق أنطونيو المقرب وزوج بورشا",
        description: "Antonio's dearest friend whose courtship of Portia sets the entire dramatic plot in motion.",
        descriptionAr: "صديق أنطونيو الوفي الذي يبذل كل ما يملك في المحكمة لافتداء صديقه الكريم."
      }
    ],
    ministerialQA: [
      {
        id: "4th-merch-q1",
        question: "Why did Antonio borrow money from Shylock?",
        questionAr: "لماذا اقترض أنطونيو المال من شايلوك؟",
        answer: "To help his close friend Bassanio travel to Belmont and marry the noble lady Portia.",
        answerAr: "لمساعدة صديقه المقرب بسانيو على السفر إلى بلمونت والزواج من السيدة النبيلة بورشا.",
        year: "امتحان الفصل الأول"
      },
      {
        id: "4th-merch-q2",
        question: "What was the strange and cruel condition in Shylock's bond?",
        questionAr: "ما هو الشرط الغريب والقاسي في سند شايلوك؟",
        answer: "If Antonio could not repay the loan on time, Shylock would cut off a pound of Antonio's flesh.",
        answerAr: "إذا عجز أنطونيو عن سداد القرض في موعده، يحق لشايلوك اقتطاع رطل من لحم أنطونيو.",
        year: "امتحان نصف السنة"
      },
      {
        id: "4th-merch-q3",
        question: "How did Portia save Antonio's life in the Venetian court?",
        questionAr: "كيف أنقذت بورشا حياة أنطونيو في محكمة البندقية؟",
        answer: "She disguised herself as a lawyer and stated that the bond allowed a pound of flesh, but not a single drop of blood.",
        answerAr: "تنكرت في زي محامٍ وأعلنت أن السند يمنحه رطلاً من اللحم فقط دون إراقة قطرة دم واحدة.",
        year: "امتحان نهاية السنة"
      },
      {
        id: "4th-merch-q4",
        question: "What is the main moral theme of 'The Merchant of Venice'?",
        questionAr: "ما هي الفكرة الأخلاقية الجوهرية لمسرحية تاجر البندقية؟",
        answer: "Mercy is far higher and nobler than strict revenge and cold justice.",
        answerAr: "فضيلة الرحمة أسمى وأعظم بكثير من الانتقام والعدالة الباردة القاسية.",
        year: "امتحان نهاية السنة"
      }
    ]
  },
  {
    id: "4th-lit-frost",
    title: "The Road Not Taken",
    titleAr: "قصيدة الطريق الذي لم يُسلك (روبرت فروست)",
    author: "Robert Frost",
    authorAr: "روبرت فروست (أشهر شعراء الأدب الأمريكي الحديث)",
    authorYears: "1874 - 1963",
    authorBioAr: [
      "روبرت فروست شاعر أمريكي كبير فاز بجائزة بوليتزر الأدبية المرموقة أربع مرات في حياته.",
      "تميز شعره بتصوير مشاهد الطبيعة الريفية والتأملات الفلسفية العميقة حول القرارات البشرية ومصير الإنسان."
    ],
    genre: "Poetry / Philosophical Reflection",
    genreAr: "قصيدة شعرية فلسفية وتأملية حول الخيارات المصيرية في الحياة",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    imageCaptionAr: "طريقان متشعبان في غابة خريفية صفراء يرمزان لخيارات الحياة المصيرية",
    summaryAr: "يقف الشاعر المسافر في غابة خريفية ذهبية أمام مفترق طريقين متشعبين؛ يقف طويلاً متأملاً بحيرة لأن إنساناً واحداً لا يستطيع سلك المسارين معاً في وقت واحد. يفحص الطريق الأول حتى ينحني بين الشجيرات، ثم يقرر اختيار الطريق الثاني لأنه كان عشباً يحتاج من يمشيه والأقل ارتياداً وسلوكاً من قبل عامة الناس. يدرك الشاعر كيف يؤدي مسار إلى آخر وأن العودة لن تكون ممكنة، ويختم بأنه بعد سنوات طويلة سيقول بتنهيدة إن اختياره للطريق الأقل ارتياداً هو الذي أحدث كل الفرق في حياته وصنع هويته المستقلة.",
    moralLessonAr: "الشجاعة في اتخاذ القرارات الحرة والمستقلة، وعدم الانجراف وراء القطيع، وتحمل مسؤولية اختياراتنا التي تصنع مستقبلنا.",
    keyThemes: ["Choices and Decisions in Life", "Individuality, Independence and Courage", "Reflection, Fate and Consequences"],
    characters: [
      {
        name: "The Traveler / Poet",
        nameAr: "المسافر / الشاعر (الإنسان)",
        role: "The conscious decision maker",
        roleAr: "الإنسان الواقف أمام مفترق خيارات مصيرية في حياته",
        description: "Contemplates the two diverging paths in the yellow woods and courageously chooses the less traveled one.",
        descriptionAr: "يتأمل الطريقين المتشعبين ويختار المسار الأقل ارتياداً بشجاعة واستقلالية."
      }
    ],
    ministerialQA: [
      {
        id: "4th-frost-q1",
        question: "What does the divergence of two roads in a yellow wood symbolize?",
        questionAr: "إلى ماذا يرمز تشعب طريقين في غابة صفراء؟",
        answer: "It symbolizes the important choices, decisions and moral paths a person must take in life.",
        answerAr: "يرمز إلى القرارات والخيارات المصيرية والمسارات التي يجب أن يختارها الإنسان في حياته.",
        year: "امتحان الفصل الثاني"
      },
      {
        id: "4th-frost-q2",
        question: "Which road did the poet decide to take in the poem?",
        questionAr: "أي الطريقين قرر الشاعر أن يسلك في القصيدة؟",
        answer: "He chose the one that was grassy and wanted wear (the less traveled road).",
        answerAr: "اختار الطريق العشبي الأقل ارتياداً وسلوكاً من قبل الناس.",
        year: "امتحان نهاية السنة"
      },
      {
        id: "4th-frost-q3",
        question: "Why was the traveler sorry according to the first stanza?",
        questionAr: "لماذا كان المسافر آسفاً ومتأسفاً في المقطع الأول؟",
        answer: "Because he was one traveler and could not travel both roads at the same time.",
        answerAr: "لأنه مسافر واحد ولا يستطيع سلك كلا الطريقين في آن واحد.",
        year: "امتحان الكورس الثاني"
      },
      {
        id: "4th-frost-q4",
        question: "What made all the difference in the poet's life?",
        questionAr: "ما الذي أحدث كل الفرق في حياة الشاعر في النهاية؟",
        answer: "Taking the road less traveled by other people.",
        answerAr: "اختياره للطريق الأقل ارتياداً وسلوكاً من قبل الآخرين.",
        year: "امتحان نهاية العام"
      }
    ]
  }
];

// =========================================================================
// إنشاءات الرابع الإعدادي النموذجية المعتمدة (Essays & Compositions)
// مأخوذة نصاً من كتاب النشاط وكتاب الطالب المعتمدين
// =========================================================================
export const FOURTH_PREPARATORY_ESSAYS: EssayItem[] = [
  {
    id: "4th-essay-course-app",
    unitId: 41,
    titleAr: "إنشاء الوحدة الأولى: إيميل رسمي للتقديم على دورة لغة إنكليزية (Applying for an English Summer Course)",
    titleEn: "An Official Application for an English Summer Course in the UK",
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
      { word: "linguistic proficiency", meaning: "الكفاءة والطلاقة اللغوية" },
      { word: "intermediate level", meaning: "المستوى المتوسط" },
      { word: "academic writing", meaning: "الكتابة الأكاديمية" },
      { word: "host families", meaning: "العائلات المضيفة" }
    ],
    goldenTips: [
      "نصيحة الأستاذ مصطفى تركي: الإيميل رسمي (Formal Application Email)، لذا تجنب الاختصارات بالكامل (اكتب I am بدلاً من I'm، واكتب I would بدلاً من I'd).",
      "ابدأ بصيغة رسمية: Dear Admissions Officer واختم بـ Yours sincerely متبوعة باسمك الكامل."
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
    titleAr: "إنشاء الوحدة الثالثة: عادات وتقاليد الأعراس في العراق (Traditional Iraqi Wedding Customs)",
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
      { word: "joyous celebrations", meaning: "احتفالات مبهجة وملونة" },
      { word: "cultural heritage", meaning: "التراث الثقافي العريق" },
      { word: "Henna night", meaning: "ليلة الحناء التراثية" },
      { word: "car procession", meaning: "موكب سيارات الزفة" },
      { word: "communal bonds", meaning: "الروابط الاجتماعية واللحمة العائلية" }
    ],
    goldenTips: [
      "استخدم الروابط الزمنية المتسلسلة (firstly, on the eve of the wedding, finally).",
      "أبرز عناصر الكرم والضيافة العراقية الأصيلة (hospitality, traditional feasts, Henna rituals)."
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
    titleEn: "Protecting the Iraqi Marshes and Ecological Wetlands",
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
      { word: "ecological wetlands", meaning: "الأراضي الرطبة البيئية الفريدة" },
      { word: "UNESCO World Heritage", meaning: "موقع التراث العالمي لليونسكو" },
      { word: "migratory birds", meaning: "الطيور المهاجرة" },
      { word: "delicate ecosystem", meaning: "نظام بيئي دقيق وهش" },
      { word: "eco-tourism", meaning: "السياحة البيئية المستدامة" }
    ],
    goldenTips: [
      "استخدم صيغ المبني للمجهول: must be protected, are recognized, must be enforced لتبدو لغتك رصينة وأكاديمية."
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
// بنك أسئلة امتحانات الرابع الإعدادي الشامل
// مصنف حسب الوحدات والسنوات الامتحانية
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
  },
  {
    id: "4th-exam-q9",
    unitId: 41,
    topic: "Official Languages of Canada",
    year: "امتحان الفصل الأول",
    session: "دور أول",
    questionText: "What are the two official languages of Canada?",
    correctAnswer: "English and French",
    ruleExplanation: "اللغتان الرسميتان لكندا هما الإنكليزية والفرنسية.",
    difficulty: "easy",
    category: "Reading"
  },
  {
    id: "4th-exam-q10",
    unitId: 47,
    topic: "Literature - Robert Frost",
    year: "امتحان نهاية السنة 2024",
    session: "دور أول",
    questionText: "In 'The Road Not Taken', which road did Robert Frost decide to take?",
    correctAnswer: "The road less traveled by",
    ruleExplanation: "اختار الشاعر الطريق الأقل ارتياداً وسلوكاً من قبل عامة الناس.",
    difficulty: "easy",
    category: "Literature"
  }
];

// =========================================================================
// نموذج الامتحان الشامل للرابع الإعدادي (Mock Exam Paper)
// =========================================================================
export const FOURTH_PREPARATORY_MOCK_PAPER: MockExamPaper = {
  id: "4th-full-mock-paper-2025",
  title: "امتحان نهاية السنة الشامل • الرابع الإعدادي (العلمي والأدبي)",
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
      unseenPassage: "In our rapidly changing modern era, communication technology has transformed human society into a connected global village. Just a century ago, sending a message between Baghdad and London required weeks by steamship and postal carriages. Today, high-speed fiber-optic cables running beneath the world's oceans carry trillions of data packets in milliseconds. However, while social media and smartphones allow instant connection, psychologists warn that excessive screen time reduces face-to-face interaction and affects teenagers' attention spans. To maintain healthy communication, people must balance digital technology with real personal relationships.",
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
          options: ["Running beneath the world's oceans", "In space satellites only", "Inside televisions"],
          correctAnswer: "Running beneath the world's oceans",
          alternativeAnswers: ["Beneath the world's oceans"],
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
          questionText: "You ______ take photos inside the military base; it is strictly illegal. (mustn't / don't have to / need to)",
          type: "choice",
          options: ["mustn't", "don't have to", "need to"],
          correctAnswer: "mustn't",
          explanation: "ممنوع قانونياً بشكل صارم يقتضي استخدام mustn't.",
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
          questionText: "Unless you ______ (work) hard, you won't achieve your academic goals.",
          type: "choice",
          options: ["work", "don't work", "worked"],
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
      instructionsAr: "أجب عن الأسئلة الأدبية حول تاجر البندقية لشكسبير وروبرت فروست:",
      instructionsEn: "Answer the questions about the prescribed literature texts:",
      totalMarks: 10,
      items: [
        {
          id: "4th-mock-q4-1",
          number: 1,
          questionText: "In 'The Merchant of Venice', what was Shylock's bond?",
          type: "choice",
          options: [
            "A pound of Antonio's flesh",
            "Ten thousand gold coins",
            "Antonio's ship"
          ],
          correctAnswer: "A pound of Antonio's flesh",
          explanation: "رطل من لحم أنطونيو إذا عجز عن السداد في الموعد.",
          maxScore: 5
        },
        {
          id: "4th-mock-q4-2",
          number: 2,
          questionText: "In Robert Frost's 'The Road Not Taken', which road did the poet take?",
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
      titleAr: "عادات وتقاليد الأعراس في العراق (الوحدة الثالثة)",
      prompt: "Write a composition about traditional wedding customs in Iraq, including the preparations, the Henna night, and the wedding day celebration.",
      suggestedModel: "Weddings in Iraq are joyful community celebrations rich in ancient traditions and family warmth. Unlike brief ceremonies in the West, Iraqi weddings usually last for several days. Before the wedding, the bride and groom's families meet for the formal agreement. One of the most cherished rituals is the Henna night, where women gather to sing traditional folklore songs and decorate the bride's hands with delicate patterns. On the wedding day, a grand convoy of cars decorated with flowers escorts the newlyweds to the banquet hall, where delicious feasts such as Qouzi and Dolma are served to hundreds of guests.",
      keywords: ["Henna night", "traditions", "family warmth", "grand convoy", "banquet hall", "Qouzi"],
      maxScore: 20
    },
    {
      id: "4th-essay-opt-b",
      optionLetter: "B",
      titleEn: "Protecting the Mesopotamian Marshes",
      titleAr: "حماية أهوار العراق والتنوع البيئي (الوحدة السادسة)",
      prompt: "Write a composition about the importance of protecting the Mesopotamian Marshes in southern Iraq and preserving their natural wildlife.",
      suggestedModel: "The Mesopotamian marshes in southern Iraq are among the most remarkable wetland ecosystems on Earth, recognized as a UNESCO World Heritage site. These wetlands are home to millions of migratory birds, unique fish species, and water buffalo herds that sustain the local Marsh Arab culture. However, climate change, severe droughts, and upstream dam construction threaten this natural treasure. To preserve the marshes for future generations, strict environmental laws must be enforced, and water management projects must ensure adequate water flow into the marsh basin.",
      keywords: ["UNESCO World Heritage", "migratory birds", "wetland ecosystem", "water management", "climate change"],
      maxScore: 20
    }
  ]
};
