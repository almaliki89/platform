import { Unit, LiteratureItem, EssayItem, MinisterialExamQuestion } from '../../types';
import { MockExamPaper } from '../mockExamPapers';

// =========================================================================
// وحدات الثاني المتوسط - منهج English for Iraq (2nd Intermediate)
// معتمد رسمياً وحصرياً من كتاب الطالب (Student's Book) وكتاب النشاط (Activity Book)
// =========================================================================
export const SECOND_INTERMEDIATE_UNITS: Unit[] = [
  // -------------------------------------------------------------------------
  // UNIT 1: A School Magazine
  // -------------------------------------------------------------------------
  {
    id: 21,
    number: 1,
    titleAr: "الوحدة الأولى: مجلة المدرسة (Unit 1: A School Magazine)",
    titleEn: "Unit 1: A School Magazine, Advice & Suggestions",
    description: "معتمد من كتاب الطالب (SB ص 4-15) وكتاب النشاط (AB ص 3-18): أقسام المجلة، أس التملك، إعطاء النصيحة بـ should، الاقتراحات بـ Why not / Shall we / Let's، والمقابلة الصحفية.",
    accentColor: "from-cyan-600 to-blue-600",
    bgGradient: "bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200",
    lessons: [
      {
        id: "2nd-u1-l1",
        unitId: 21,
        lessonNumber: 1,
        titleAr: "الدرس الأول: أقسام مجلة المدرسة وإس التملك (Possessive 's & s')",
        titleEn: "Lesson 1: School Magazine Sections & Possessive Apostrophe",
        category: "grammar",
        summary: "كتاب الطالب ص 4-5 وكتاب النشاط ص 3-5: أقسام مجلة المدرسة (articles, interviews, jokes, poetry, cartoons) والتمييز الدقيق بين التملك للمفرد والجمع النظامي والشاذ.",
        grammarRuleFormula: "1) Singular (اسم مفرد):\n   Noun + 's -> boy's bag, teacher's desk\n2) Regular Plural (جمع ينتهي بـ s):\n   Noun-s + ' -> boys' bags, teachers' room\n3) Irregular Plural (جمع شاذ لا ينتهي بـ s):\n   Plural Noun + 's -> men's shoes, women's club, children's magazine",
        detailedContent: [
          "كتاب الطالب (SB p. 4): أقسام مجلة المدرسة تشمل: School News (أخبار المدرسة), Town Events (أحداث المدينة), Interviews (مقابلات), Cartoons (رسوم كاريكاتيرية), Jokes (نكات), Poetry (شعر), Letters (رسائل), Problems page (صفحة المشاكل).",
          "قاعدة التملك (SB p. 5 & AB p. 4): نضع الفاصلة العليا قبل الـ s عندما يعود الشيء لشخص واحد (the girl's notebook).",
          "إذا كان المالك جمعاً ينتهي بـ s نكتفي بوضع الفاصلة بعد الـ s (the girls' notebooks).",
          "في الجمع الشاذ (men, women, children, people) يُعامل معاملة المفرد تماماً ونضع 's (the children's playground)."
        ],
        teacherNotes: [
          "ملاحظة منهجية وزارية: احفظ أسماء أقسام المجلة لأنها تأتي في سؤال الإسقاطات (Matching / Fill in blanks).",
          "قاعدة ذهبية: انظر للفاعل أو سياق الجملة، إذا ذُكر 'all the boys' فالفاصلة بعد الـ s (boys'). وإذا ذُكر 'one boy' فالفاصلة قبل الـ s (boy's)."
        ],
        commonMistakes: [
          "كتابة childrens' (خطأ جسيم؛ الصحيح دائماً هو children's).",
          "نسيان الفاصلة في كلمة girls' عندما يكون الحديث عن مجموعة فتيات."
        ],
        examples: [
          {
            en: "The headmaster's office is at the end of the corridor.",
            ar: "مكتب المدير (مدير واحد مفرد) في نهاية الممر.",
            highlight: "headmaster's",
            note: "مفرد + 's"
          },
          {
            en: "The students' magazine won first prize in the national contest.",
            ar: "مجلة الطلاب (مجموعة طلاب) فازت بالجائزة الأولى.",
            highlight: "students'",
            note: "جمع قياسي ينتهي بـ s + فاصلة فقط"
          },
          {
            en: "We published the children's poetry in our monthly edition.",
            ar: "نشرنا قصائد الأطفال (جمع شاذ) في طبعتنا الشهرية.",
            highlight: "children's",
            note: "جمع شاذ + 's"
          }
        ],
        exercises: [
          {
            id: "2u1-ex1",
            question: "These are the ______ (girls' / girl's) coats; all four sisters left them in the car.",
            options: ["girls'", "girl's", "girls", "girles'"],
            correctAnswer: "girls'",
            explanation: "الحديث عن أربع أخوات (جمع ينتهي بـ s)، فالفاصلة تأتي بعد حرف الـ s: girls'.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 4"
          },
          {
            id: "2u1-ex2",
            question: "The ______ (men's / mens') clothes are sold on the second floor.",
            options: ["men's", "mens'", "men", "mens"],
            correctAnswer: "men's",
            explanation: "كلمة men جمع شاذ لا ينتهي بـ s، لذا يأخذ الفاصلة ثم s: men's.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الأول"
          }
        ]
      },
      {
        id: "2nd-u1-l2",
        unitId: 21,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: تقديم الاقتراحات وإعطاء النصائح (Suggestions & Giving Advice)",
        titleEn: "Lesson 2: Making Suggestions & Giving Advice with Should",
        category: "grammar",
        summary: "كتاب الطالب ص 6-9 وكتاب النشاط ص 6-10: صيغ الاقتراح الثلاث (Why not, Shall we, Let's) وقاعدة إعطاء النصيحة باستخدام should و shouldn't ومشاكل المراهقين (Aunt Sally).",
        grammarRuleFormula: "1) Suggestions (الاقتراحات):\n   - Why not + base verb ... ? (Why not write a story?)\n   - Shall we + base verb ... ? (Shall we start a magazine?)\n   - Let's + base verb . (Let's help each other.)\n\n2) Giving Advice (النصيحة):\n   - Positive: Subject + should + base verb\n   - Negative: Subject + shouldn't + base verb",
        detailedContent: [
          "كتاب الطالب ص 6: صفحة مشاكل القراء والرد عليها (Aunt Sally's advice column) لتقديم حلول للمشاكل المدرسية مثل الخجل وضعف التركيز.",
          "صيغ الاقتراحات: Why not و Shall we تتطلبان علامة استفهام (?) في النهاية، بينما Let's تنتهي بنقطة (.).",
          "بعد should و shouldn't يأتي دائماً فعل مضارع مجرد خالٍ من أي إضافة (بدون to، وبدون ing، وبدون ed).",
          "نستخدم should للتوجيه السليم (You should study for exams)، ونستخدم shouldn't للتحذير من الخطأ (You shouldn't stay up late)."
        ],
        teacherNotes: [
          "ملاحظة امتحانية: في سؤال القواعد انتبه للفعل بعد Let's أو should، يجب أن يكون مجرداً: (go / going / to go) -> الاختيار الصحيح هو go.",
          "نمط امتحاني: 'You look tired. (Give advice)' -> الحل: 'You should go to sleep early.'"
        ],
        commonMistakes: [
          "إضافة to بعد should: You should to rest (خطأ فادح؛ الصحيح You should rest).",
          "وضع علامة استفهام بعد Let's: Let's play? (خطأ؛ جملة Let's تنتهي بنقطة)."
        ],
        examples: [
          {
            en: "Why not interview our new headmistress for the magazine?",
            ar: "لم لا نجري مقابلة مع مديرتنا الجديدة للمجلة؟",
            highlight: "Why not interview",
            note: "صيغة اقتراح + مصدر مجرد + علامة استفهام"
          },
          {
            en: "You have an exam tomorrow; you shouldn't play video games now.",
            ar: "لديك امتحان غداً؛ لا ينبغي أن تلعب ألعاب الفيديو الآن.",
            highlight: "shouldn't play",
            note: "نصيحة بالامتناع عن فعل شيء سلبي"
          }
        ],
        exercises: [
          {
            id: "2u1-ex3",
            question: "Why not ______ a poem about our school? (write / writing / wrote)",
            options: ["write", "writing", "wrote", "to write"],
            correctAnswer: "write",
            explanation: "بعد Why not نستخدم الفعل المجرد الخالي من الإضافات: write.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 7"
          },
          {
            id: "2u1-ex4",
            question: "You have a bad cough. You ______ drink cold water. (should / shouldn't / must)",
            options: ["shouldn't", "should", "don't", "can"],
            correctAnswer: "shouldn't",
            explanation: "الشخص يسعل بشدة، لذا النصيحة المنطقية هي عدم شرب الماء البارد (shouldn't).",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // UNIT 2: Health and Fitness
  // -------------------------------------------------------------------------
  {
    id: 22,
    number: 2,
    titleAr: "الوحدة الثانية: الصحة واللياقة البدنية (Unit 2: Keep Fit & Nutrition)",
    titleEn: "Unit 2: Health, Fitness & Quantifiers",
    description: "معتمد من كتاب الطالب (SB ص 16-27) وكتاب النشاط (AB ص 19-35): أدوات ومحددات الكمية (too much / too many / a few / a little)، وأفعال الإلزام have to / don't have to، وأسماء الأمراض الشائعة وطرق الوقاية.",
    accentColor: "from-emerald-600 to-green-600",
    bgGradient: "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200",
    lessons: [
      {
        id: "2nd-u2-l1",
        unitId: 22,
        lessonNumber: 1,
        titleAr: "الدرس الأول: محددات الكمية (too much / too many / a few / a little)",
        titleEn: "Lesson 1: Quantifiers for Countable and Uncountable Nouns",
        category: "grammar",
        summary: "كتاب الطالب ص 17-19 وكتاب النشاط ص 20-24: التمييز القاطع بين الأسماء المعدودة (Countable) وغير المعدودة (Uncountable) في وصف الأطعمة ونمط الحياة الصحي.",
        grammarRuleFormula: "1) Countable Nouns (الأسماء المعدودة - تجمع ولها جمع):\n   - للكثرة المفرطة: too many (too many crisps / apples / sweets)\n   - للقلة الإيجابية: a few (a few biscuits / hours / vegetables)\n\n2) Uncountable Nouns (الأسماء غير المعدودة - كميات وسوائل):\n   - للكثرة المفرطة: too much (too much sugar / salt / fat / time / water)\n   - للقلة: a little (a little salt / a little sleep)",
        detailedContent: [
          "كتاب الطالب (SB p. 18): استشارة طبيب التغذية؛ الأطعمة الصحية وغير الصحية.",
          "الأسماء المعدودة تقبل s الجمع ويمكن عدها (apples, crisps, people, cars, hours). نستخدم معها too many للكثرة الزائدة و a few للعدد القليل.",
          "الأسماء غير المعدودة هي سوائل أو مساحيق أو مفاهيم مجردة (sugar, salt, fat, meat, milk, money, water, time). نستخدم معها too much للكمية الزائدة و a little للكمية القليلة.",
          "نصيحة غذائية وزارية: You should eat a little sugar, but not too much. You should eat a few apples every day."
        ],
        teacherNotes: [
          "تنبيه امتحاني: كلمة (fruit) تعامل غالباً كاسم غير معدود (too much fruit)، وكلمة (sleep) غير معدود (a little sleep).",
          "قاعدة ذهبية: ابحث عن الـ s في نهاية الاسم بعد الفراغ؛ إذا وُجدت s الجمع فالاسم معدود (too many / a few)، وإذا لم توجد s فالاسم كمية غير معدودة (too much / a little)."
        ],
        commonMistakes: [
          "قول too much crisps (خطأ؛ crisps اسم معدود جمع يأخذ too many).",
          "قول a few water (خطأ؛ الماء سائل غير معدود يأخذ a little water)."
        ],
        examples: [
          {
            en: "You shouldn't put too much sugar in your tea; it is bad for you.",
            ar: "لا ينبغي أن تضع الكثير من السكر في الشاي؛ فهو ضار بصحتك.",
            highlight: "too much sugar",
            note: "كمية غير معدودة مفرطة"
          },
          {
            en: "There were too many cars on the highway this morning.",
            ar: "كان هناك عدد كبير جداً من السيارات على الطريق السريع هذا الصباح.",
            highlight: "too many cars",
            note: "اسم معدود جمع"
          },
          {
            en: "I only need a little salt on my potatoes.",
            ar: "أحتاج فقط إلى كمية قليلة من الملح على البطاطا.",
            highlight: "a little salt",
            note: "كمية قليلة غير معدودة"
          }
        ],
        exercises: [
          {
            id: "2u2-ex1",
            question: "Eating ______ chocolate is unhealthy because it contains a lot of sugar. (too much / too many / a few)",
            options: ["too much", "too many", "a few", "many"],
            correctAnswer: "too much",
            explanation: "الشوكولاتة هنا كمية غير معدودة، لذا نستخدم too much.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 21"
          },
          {
            id: "2u2-ex2",
            question: "There are only ______ students in the library today. (a little / a few / too much)",
            options: ["a few", "a little", "too much", "much"],
            correctAnswer: "a a few",
            explanation: "الطلبة (students) اسم معدود جمع، فنستخدم معه a few.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الأول"
          }
        ]
      },
      {
        id: "2nd-u2-l2",
        unitId: 22,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: الأوجاع والأمراض والإلزام (Illnesses & have to / don't have to)",
        titleEn: "Lesson 2: Common Aches, Illnesses & Obligation (have to)",
        category: "grammar",
        summary: "كتاب الطالب ص 20-23 وكتاب النشاط ص 25-28: التعبير عن الأوجاع الصحية (headache, stomach ache, toothache, sore throat) وقواعد الإلزام بـ have to ونفيها بـ don't have to.",
        grammarRuleFormula: "1) Expressing Pain (التعبير عن الألم):\n   - I have got a headache / toothache / earache / stomach ache.\n   - My arm / leg / back hurts.\n\n2) Obligation (الإلزام الضروري):\n   - Affirmative: Subject + have to / has to + base verb\n   - Negative: Subject + don't have to / doesn't have to + base verb (عدم الحاجة)",
        detailedContent: [
          "كتاب الطالب ص 20: زيارة عيادة الطبيب ومحادثات المرضى وأسماء الأمراض بالأمثلة الملونة.",
          "المقطع -ache يعني ألم، مثل: head + ache = صداع، tooth + ache = ألم أسنان، stomach + ache = ألم معدة.",
          "الفعل have to يعني (يجب أو مضطر إلى) لضرورة خارجية، بينما don't have to يعني (لست مضطراً إلى / ليس إلزامياً).",
          "مع الضمائر المفردة (he, she, it) نستخدم has to ونفيها doesn't have to."
        ],
        teacherNotes: [
          "تنبيه وزاري: don't have to لا تعني التحريم والمنع (mustn't)، بل تعني أن الأمر اختياري ولا داعي لفعله.",
          "انتبه للسؤال الإملائي: head -> headache, tooth -> toothache, ear -> earache."
        ],
        commonMistakes: [
          "كتابة doesn't has to (خطأ؛ بعد doesn't نرجع الفعل إلى أصله have to).",
          "قول My teeth hurts (خطأ؛ teeth جمع فنقول teeth hurt بدون s الشخص الثالث)."
        ],
        examples: [
          {
            en: "I have got a severe stomach ache; I need to see the doctor.",
            ar: "أعاني من ألم شديد في المعدة؛ أحتاج لرؤية الطبيب.",
            highlight: "stomach ache",
            note: "تعبير عن الألم الصحي"
          },
          {
            en: "Tomorrow is Friday, so we don't have to go to school.",
            ar: "غداً يوم الجمعة، لذا لسنا مضطرين للذهاب إلى المدرسة.",
            highlight: "don't have to go",
            note: "نفي الإلزام (عدم وجود ضرورة)"
          }
        ],
        exercises: [
          {
            id: "2u2-ex3",
            question: "My sister has got a toothache. She ______ visit the dentist. (has to / doesn't have to / haven't to)",
            options: ["has to", "doesn't have to", "haven't to", "having to"],
            correctAnswer: "has to",
            explanation: "لأنها تعاني من ألم بالأسنان، فمن الضروري أن تزور طبيب الأسنان (has to للمفرد).",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 26"
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // UNIT 3: Sports and Games
  // -------------------------------------------------------------------------
  {
    id: 23,
    number: 3,
    titleAr: "الوحدة الثالثة: الرياضة والألعاب (Unit 3: Sports & Adverbs)",
    titleEn: "Unit 3: Sports, The Olympics & Adverbs of Manner",
    description: "معتمد من كتاب الطالب (SB ص 28-39) وكتاب النشاط (AB ص 36-52): أفعال الرياضة (play, go, do)، وتكوين ظروف الحال (Adverbs of Manner)، ومقارنة الصفات، والألعاب الأولمبية ومراكز الرياضة.",
    accentColor: "from-amber-600 to-yellow-600",
    bgGradient: "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200",
    lessons: [
      {
        id: "2nd-u3-l1",
        unitId: 23,
        lessonNumber: 1,
        titleAr: "الدرس الأول: أفعال الرياضة (play / go / do with Sports)",
        titleEn: "Lesson 1: Using play, go, and do with Sports Activities",
        category: "vocabulary",
        summary: "كتاب الطالب ص 28-30 وكتاب النشاط ص 36-39: التوزيع الدقيق لأفعال الرياضة الثلاثة حسب نوع اللعبة (ألعاب كروية، أنشطة تنتهي بـ ing، وألعاب قتالية فردية).",
        grammarRuleFormula: "1) PLAY (ألعاب تنافسية جماعية وفيها كرة):\n   football, basketball, tennis, volleyball, badminton\n2) GO (أنشطة حركية تنتهي بـ -ing خارج الصالات غالباً):\n   swimming, running, cycling, horse-riding, fishing\n3) DO (ألعاب قتالية وفنون دفاع عن النفس وجمباز وألعاب بدون كرة):\n   judo, karate, gymnastics, boxing",
        detailedContent: [
          "كتاب الطالب ص 28: المركز الرياضي الشبابي (The Sports Centre) وجدول الأنشطة الأسبوعية.",
          "نستخدم play مع كل رياضة تتضمن فرقاً أو استخدام الكرة أو الشباك (We play tennis).",
          "نستخدم go مع الأنشطة المنتهية بـ ing (ما عدا boxing نستخدم معها do).",
          "نستخدم do مع رياضات الدفاع عن النفس والجمباز واللياقة الفردية (do judo, do karate, do gymnastics)."
        ],
        teacherNotes: [
          "ملاحظة امتحانية متكررة جداً: انتبه لـ judo و karate و gymnastics؛ هذه دائماً تأخذ do ولا تأخذ play مطلقاً.",
          "قاعدة التذكر السريع: ing تأخذ go (باستثناء الملاكمة boxing تأخذ do)."
        ],
        commonMistakes: [
          "قول I play swimming (خطأ؛ الصحيح I go swimming).",
          "قول I play karate (خطأ؛ الصحيح I do karate)."
        ],
        examples: [
          {
            en: "My brother and I play volleyball on the beach every weekend.",
            ar: "نلعب أنا وأخي كرة الطائرة على الشاطئ في كل عطلة نهاية أسبوع.",
            highlight: "play volleyball",
            note: "لعبة جماعية بكرة"
          },
          {
            en: "She goes swimming at the community pool three times a week.",
            ar: "هي تمارس السباحة في المسبح ثلاث مرات في الأسبوع.",
            highlight: "goes swimming",
            note: "نشاط ينتهي بـ -ing"
          },
          {
            en: "Ali does judo to build his strength and self-discipline.",
            ar: "يمارس علي رياضة الجودو لبناء قوته وانضباطه الذاتي.",
            highlight: "does judo",
            note: "فنون قتالية فردية"
          }
        ],
        exercises: [
          {
            id: "2u3-ex1",
            question: "Karrar wants to ______ gymnastics at the local club. (play / go / do)",
            options: ["do", "play", "go", "make"],
            correctAnswer: "do",
            explanation: "رياضة الجمباز (gymnastics) رياضة لياقة فردية تأخذ الفعل do.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 38"
          },
          {
            id: "2u3-ex2",
            question: "In the summer, they love to ______ horse-riding. (go / play / do)",
            options: ["go", "play", "do", "have"],
            correctAnswer: "go",
            explanation: "نشاط ركوب الخيل ينتهي بـ -ing لذا يأخذ الفعل go.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الأول"
          }
        ]
      },
      {
        id: "2nd-u3-l2",
        unitId: 23,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: ظروف الحال (Adverbs of Manner)",
        titleEn: "Lesson 2: Adverbs of Manner (-ly & Irregulars)",
        category: "grammar",
        summary: "كتاب الطالب ص 32-34 وكتاب النشاط ص 40-44: تحويل الصفات إلى ظروف حال تصف طريقة وقوع الفعل، وقواعد الإملاء، والظروف الشاذة الأساسية (well, fast, hard).",
        grammarRuleFormula: "Adjective (تصف الاسم) -> Adverb (يصف الفعل)\n1) صفات قياسية: نضيف -ly\n   quick -> quickly, quiet -> quietly, careful -> carefully, polite -> politely\n2) صفات تنتهي بـ y بعد حرف صحيح: تقلب إلى i ثم -ly\n   easy -> easily, happy -> happily, heavy -> heavily\n3) ظروف شاذة (Irregular Adverbs) تحفظ غيباً:\n   good -> well\n   fast -> fast (تبقى كما هي)\n   hard -> hard (تبقى كما هي)",
        detailedContent: [
          "كتاب الطالب ص 32: كيف يلعب الرياضيون؟ (How do they play?): The runner ran fast, the gymnast moved gracefully, the goalkeeper played well.",
          "الصفة تصف الفاعل أو الاسم (He is a careful driver). الظرف يصف كيفية حدوث الفعل ويأتي بعد الفعل أو بعد المفعول به (He drives carefully).",
          "سؤال الإملاء الوزاري الشهير: quiet : quietly / good : well / easy : easily."
        ],
        teacherNotes: [
          "تنبيه امتحاني حاسم: لا توجد كلمة في اللغة اسمها 'fastly' أو 'goodly'، الظرف من fast هو fast، ومن good هو well.",
          "انتبه لتحويل y إلى i: noisy -> noisily."
        ],
        commonMistakes: [
          "استخدام good بدلاً من well مع الأفعال: He plays good (الصحيح He plays well).",
          "إضافة ly إلى fast (الصحيح fast تبقى كما هي)."
        ],
        examples: [
          {
            en: "Our Iraqi football team played well and won the championship.",
            ar: "لعب فريقنا العراقي لكرة القدم بشكل جيد وفاز بالبطولة.",
            highlight: "played well",
            note: "ظرف حال شاذ من good يصف طريقة اللعب"
          },
          {
            en: "The athlete jumped easily over the high hurdles.",
            ar: "قفز الرياضي بسهولة فوق الحواجز العالية.",
            highlight: "easily",
            note: "قلبت y إلى i وأضيف ly"
          }
        ],
        exercises: [
          {
            id: "2u3-ex3",
            question: "Ahmed speaks English very ______ (good / well / nicely good).",
            options: ["well", "good", "goodly", "better"],
            correctAnswer: "well",
            explanation: "لوصف فعل التحدث (speaks) نحتاج إلى ظرف حال؛ والظرف من good هو well.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 42"
          },
          {
            id: "2u3-ex4",
            question: "Complete the spelling: slow -> slowly ; fast -> ______",
            options: ["fast", "fastly", "faster", "fasted"],
            correctAnswer: "fast",
            explanation: "كلمة fast ظرف حال شاذ يبقى على حاله دون إضافة ly.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // UNIT 5: Sending Information
  // -------------------------------------------------------------------------
  {
    id: 25,
    number: 5,
    titleAr: "الوحدة الخامسة: إرسال واستقبال المعلومات (Unit 5: Sending Information)",
    titleEn: "Unit 5: Old Ways of Communication & Passive Voice",
    description: "معتمد من كتاب الطالب (SB ص 48-59) وكتاب النشاط (AB ص 64-78): تاريخ وسائل الاتصال (الحمام الزاجل، إشارات الدخان، المنارات)، وقواعد المبني للمجهول (Present & Past Passive).",
    accentColor: "from-blue-600 to-indigo-600",
    bgGradient: "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200",
    lessons: [
      {
        id: "2nd-u5-l1",
        unitId: 25,
        lessonNumber: 1,
        titleAr: "الدرس الأول: تاريخ وسائل الاتصال القديمة (Old Ways of Communication)",
        titleEn: "Lesson 1: History of Sending Information",
        category: "reading",
        summary: "كتاب الطالب ص 48-49 وكتاب النشاط ص 64-67: كيف كان الناس يرسلون الرسائل في العالم القديم باستخدام الفرسان، إشارات الدخان، الحمام الزاجل، والمنارات البحرية.",
        grammarRuleFormula: "Past facts & Vocabulary:\n- Horse riders (الخيول والفرسان في العالم العربي - نظام البريد)\n- Smoke signals (إشارات الدخان للتواصل عبر التلال)\n- Pigeons (الحمام الزاجل لنقل الرسائل من سوريا ومصر إلى بغداد)\n- Lighthouses (المنارات لتحذير السفن في البحار)",
        detailedContent: [
          "كتاب الطالب ص 48: في العالم العربي القديم، كان الناس يرسلون الرسائل عبر نظام البريد بالخيول الذي بدأ عام 670 م.",
          "كان الحمام الزاجل يُربط به أنبوب صغير على ساقه لنقل الرسائل الحساسة والسرية.",
          "المنارات (Lighthouses) استُخدمت لتحذير السفن من الصخور وتوجيهها للموانئ بأمان.",
          "أسئلة قطعة الكتاب الوزارية تتكرر حول وظيفة الحمام والمنارات والفرسان."
        ],
        teacherNotes: [
          "احفظ معاني المفردات التالية: pigeon (حمامة), message (رسالة), lighthouse (منارة), signal (إشارة), warn (يحذر).",
          "سؤال متكرر: What did lighthouses do? -> They warned ships of danger."
        ],
        commonMistakes: [
          "الخلط بين smoke signals (إشارات الدخان) و lighthouses (المنارات البحرية)."
        ],
        examples: [
          {
            en: "Pigeons were used to carry messages from Egypt to Syria.",
            ar: "كان الحمام يُستخدم لنقل الرسائل من مصر إلى سوريا.",
            highlight: "Pigeons were used",
            note: "حقيقة تاريخية مبنية للمجهول"
          },
          {
            en: "Lighthouses warned ships of hidden rocks and dangerous shallows.",
            ar: "حذرت المنارات السفن من الصخور المخفية والمياه الضحلة الخطيرة.",
            highlight: "warned ships",
            note: "وظيفة المنارة"
          }
        ],
        exercises: [
          {
            id: "2u5-ex1",
            question: "Lighthouses were built to ______ ships of danger. (warn / catch / feed / play)",
            options: ["warn", "catch", "feed", "play"],
            correctAnswer: "warn",
            explanation: "بُنيت المنارات لتحذير (warn) السفن من الأخطار والصخور.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 65"
          }
        ]
      },
      {
        id: "2nd-u5-l2",
        unitId: 25,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: المبني للمجهول (Passive Voice - Present & Past Simple)",
        titleEn: "Lesson 2: Passive Voice in Present Simple and Past Simple",
        category: "grammar",
        summary: "كتاب الطالب ص 50-53 وكتاب النشاط ص 68-72: التركيز على الحدث والمفعول به بدلاً من الفاعل باستخدام is/are + P.P. في المضارع، و was/were + P.P. في الماضي.",
        grammarRuleFormula: "1) Present Simple Passive (المضارع البسيط للمجهول):\n   Object + is / are + Past Participle (P.P.)\n   (e.g., An article is written in Cairo. It is printed in Baghdad.)\n\n2) Past Simple Passive (الماضي البسيط للمجهول):\n   Object + was / were + Past Participle (P.P.)\n   (e.g., The telephone was invented by Alexander Graham Bell.)",
        detailedContent: [
          "كتاب الطالب ص 50-51: مراحل نشر المقال الصحفي من كتابته إلى بيعه في الأكشاك (How an article is published).",
          "خطوات تحويل الجملة إلى المجهول: 1) نحذف الفاعل، 2) نضع المفعول به في بداية الجملة كفاعل جديد، 3) نضع فعل كينونة مناسب (is/are للمضارع و was/were للماضي)، 4) نحول الفعل الرئيسي إلى التصريف الثالث (P.P.).",
          "أهم تصاريف الأفعال الشاذة المنهجية: write -> written, send -> sent, read -> read, sell -> sold, invent -> invented, print -> printed."
        ],
        teacherNotes: [
          "ملاحظة امتحانية ذهبية: إذا بدأت الجملة بجماد أو مفعول به لا يستطيع القيام بالفعل بنفسه (مثل: The message, The car, Newspapers)، فهذه جملة مبني للمجهول تتطلب (فعل كينونة + P.P.).",
          "انتبه للمفرد والجمع: The book was read / The books were read."
        ],
        commonMistakes: [
          "نسيان فعل الكينونة: The message sent (خطأ؛ الصحيح The message was sent).",
          "استخدام is مع اسم جمع: Newspapers is printed (خطأ؛ الصحيح Newspapers are printed)."
        ],
        examples: [
          {
            en: "An article is edited by the chief editor before printing.",
            ar: "يتم تدقيق المقال من قِبل رئيس التحرير قبل الطباعة.",
            highlight: "is edited",
            note: "مضارع بسيط مبني للمجهول للمفرد"
          },
          {
            en: "The ancient messages were sent by horse riders in the past.",
            ar: "أُرسلت الرسائل القديمة بواسطة الفرسان في الماضي.",
            highlight: "were sent",
            note: "ماضٍ بسيط مبني للمجهول للجمع"
          }
        ],
        exercises: [
          {
            id: "2u5-ex2",
            question: "Every morning, newspapers ______ (print) in Baghdad. [Present Passive]",
            options: ["are printed", "is printed", "were printed", "printed"],
            correctAnswer: "are printed",
            explanation: "الصحف (newspapers) جمع في زمن المضارع البسيط (Every morning)، فتأخذ are + التصريف الثالث printed.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 69"
          },
          {
            id: "2u5-ex3",
            question: "The television was ______ by John Baird in 1926. (invent / invented / inventing)",
            options: ["invented", "invent", "inventing", "invents"],
            correctAnswer: "invented",
            explanation: "بعد was في صيغة المبني للمجهول يأتي التصريف الثالث للفعل: invented.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الثاني"
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // UNIT 6: What will they be?
  // -------------------------------------------------------------------------
  {
    id: 26,
    number: 6,
    titleAr: "الوحدة السادسة: المهن والخطط المستقبلية (Unit 6: Careers & Future)",
    titleEn: "Unit 6: Careers, Jobs, Future Plans & Relative Pronouns",
    description: "معتمد من كتاب الطالب (SB ص 60-71) وكتاب النشاط (AB ص 80-96): المهن والوظائف، التعبير عن النوايا المستقبلية باستخدام be going to، وضمائر الوصل (who للعاقل و which/that لغير العاقل).",
    accentColor: "from-violet-600 to-purple-600",
    bgGradient: "bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200",
    lessons: [
      {
        id: "2nd-u6-l1",
        unitId: 26,
        lessonNumber: 1,
        titleAr: "الدرس الأول: التعبير عن الخطط المستقبلية (Future Plans with be going to)",
        titleEn: "Lesson 1: Talking about Career Plans with (be going to)",
        category: "grammar",
        summary: "كتاب الطالب ص 60-63 وكتاب النشاط ص 80-84: التعبير عن النوايا والخطط المهنية المسبقة والقرارات المستقبلية المدروسة باستخدام am/is/are + going to + مصدر مجرد.",
        grammarRuleFormula: "Subject + (am / is / are) + going to + base verb\n- I am going to be a teacher.\n- He / She is going to study medicine at college.\n- We / They are going to build new schools.",
        detailedContent: [
          "كتاب الطالب ص 60: ما هي وظيفتك المستقبلية؟ استعراض المهن: doctor (طبيب), engineer (مهندس), architect (مهندس معماري), pilot (طيار), mechanic (ميكانيكي), teacher (مدرس), journalist (صحفي).",
          "نستخدم صيغة be going to للتعبير عن خطط وقرارات اتخذناها قبل لحظة الكلام، وتستخدم بكثرة مع المهن والدراسة الجامعية.",
          "بعد going to يأتي دائماً فعل مجرد (infinitive) خالٍ من أي تصريف."
        ],
        teacherNotes: [
          "تنبيه وزاري: احفظ تصريف فعل الكينونة بدقة: I am going to, She is going to, They are going to.",
          "السؤال الوزاري: 'What are you going to be when you grow up?' -> 'I am going to be an engineer because I like designing buildings.'"
        ],
        commonMistakes: [
          "حذف فعل الكينونة: I going to study (خطأ شائع؛ الصحيح I am going to study).",
          "وضع ing بعد going to: going to working (خطأ؛ الصحيح going to work)."
        ],
        examples: [
          {
            en: "Muna is going to be an architect because she loves drawing house plans.",
            ar: "منى تخطط لأن تكون مهندسة معمارية لأنها تعشق رسم مخططات المنازل.",
            highlight: "is going to be",
            note: "خطة ونية مستقبلية مدروسة"
          },
          {
            en: "We are going to visit the technical university next Monday.",
            ar: "نحن نخطط لزيارة الجامعة التكنولوجية يوم الاثنين القادم.",
            highlight: "are going to visit",
            note: "خطة مسبقة للجمع"
          }
        ],
        exercises: [
          {
            id: "2u6-ex1",
            question: "Huda likes repairing machines. She ______ (be) a mechanic. (is going to be / will / was)",
            options: ["is going to be", "will", "was", "going to"],
            correctAnswer: "is going to be",
            explanation: "خطة مستقبلية ونية واضحة للمفرد المؤنث تتطلب is going to be.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 82"
          }
        ]
      },
      {
        id: "2nd-u6-l2",
        unitId: 26,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: ضمائر الوصل (Relative Pronouns: who & which / that)",
        titleEn: "Lesson 2: Defining Relative Pronouns (who & which/that)",
        category: "grammar",
        summary: "كتاب الطالب ص 64-66 وكتاب النشاط ص 86-90: ربط الجمل وتحديد الأشخاص والمهن باستخدام who للعاقل، وتحديد الأدوات والأشياء باستخدام which / that لغير العاقل.",
        grammarRuleFormula: "1) Person (شخص عاقل) + WHO + verb / clause:\n   - A teacher is someone WHO teaches students.\n   - An architect is a person WHO designs buildings.\n\n2) Thing / Animal (شيء غير عاقل) + WHICH / THAT + verb / clause:\n   - A clinic is a place WHICH helps patients.\n   - A stethoscope is a tool WHICH a doctor uses.",
        detailedContent: [
          "كتاب الطالب ص 64: تعريف المهن باستخدام ضمائر الوصل (Definitions of jobs).",
          "نستخدم who عندما يكون الاسم السابق شخصاً عاقلاً (a doctor, a nurse, a person, someone).",
          "نستخدم which أو that عندما يكون الاسم السابق جماداً أو أداة أو حيواناً (a camera, a car, an animal, a book).",
          "هذه القاعدة ثابتة وتأتي سنوياً في الامتحانات كاختيارات بين (who / which / whose)."
        ],
        teacherNotes: [
          "قاعدة الامتحان السريعة: انظر للكلمة التي قبل الفراغ مباشرة:\n- عاقل -> اختر who فوراً.\n- غير عاقل -> اختر which فوراً."
        ],
        commonMistakes: [
          "استخدام which مع شخص: The pilot which flies the plane (خطأ؛ الصحيح who flies).",
          "استخدام who مع أداة أو سيارة: The car who was red (خطأ؛ الصحيح which was red)."
        ],
        examples: [
          {
            en: "A surgeon is a dedicated doctor who performs operations in hospitals.",
            ar: "الجراح هو طبيب متفانٍ يُجري العمليات الجراحية في المستشفيات.",
            highlight: "doctor who performs",
            note: "ضمير وصل لعاقل"
          },
          {
            en: "This is the flight simulator which pilot trainees practice on.",
            ar: "هذا هو جهاز محاكاة الطيران الذي يتدرب عليه طيارو المستقبل.",
            highlight: "simulator which",
            note: "ضمير وصل لغير العاقل"
          }
        ],
        exercises: [
          {
            id: "2u6-ex2",
            question: "A journalist is a person ______ writes news articles for papers. (who / which / whose)",
            options: ["who", "which", "whose", "where"],
            correctAnswer: "who",
            explanation: "الصحفي (a journalist) إنسان عاقل، لذا يأخذ ضمير الوصل who.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 87"
          },
          {
            id: "2u6-ex3",
            question: "A wrench is a handy tool ______ mechanics use to turn bolts. (who / which / whose)",
            options: ["which", "who", "whose", "where"],
            correctAnswer: "which",
            explanation: "المفتاح (a wrench) أداة غير عاقل، لذا تأخذ ضمير الوصل which.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الثاني"
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // UNIT 7: The World Around Us
  // -------------------------------------------------------------------------
  {
    id: 27,
    number: 7,
    titleAr: "الوحدة السابعة: العالم من حولنا والبيئة (Unit 7: The World Around Us)",
    titleEn: "Unit 7: Environment, Wildlife & First Conditional",
    description: "معتمد من كتاب الطالب (SB ص 72-83) وكتاب النشاط (AB ص 98-114): الحيوانات المهددة بالانقراض، تدوير النفايات والتلوث، وقواعد الجملة الشرطية الأولى (First Conditional).",
    accentColor: "from-teal-600 to-emerald-600",
    bgGradient: "bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200",
    lessons: [
      {
        id: "2nd-u7-l1",
        unitId: 27,
        lessonNumber: 1,
        titleAr: "الدرس الأول: حماية البيئة والحيوانات المهددة (Endangered Wildlife & Recycling)",
        titleEn: "Lesson 1: Protecting Endangered Animals and Recycling",
        category: "vocabulary",
        summary: "كتاب الطالب ص 72-75 وكتاب النشاط ص 98-102: الحيوانات المهددة بالانقراض (The Oryx المها العربي، النمر السيبيري، الحيتان) وأهمية تدوير الورق والبلاستيك لحماية الأرض.",
        grammarRuleFormula: "Key Vocabulary:\n- endangered species (أنواع مهددة بالانقراض)\n- habitat destruction (تدمير الموطن الطبيعي)\n- recycle rubbish / plastic (تدوير النفايات / البلاستيك)\n- pollution / global warming (التلوث / الاحتباس الحراري)",
        detailedContent: [
          "كتاب الطالب ص 72: حيوانات في خطر (Animals in danger)؛ لماذا تنقرض الحيوانات؟ بسبب الصيد الجائر وتدمير الغابات والمواطن الطبيعية.",
          "المها العربي (Arabian Oryx) تمت حمايته في محميات طبيعية بعد أن كان وشيكاً من الانقراض.",
          "إعادة التدوير (Recycling): تحويل النفايات إلى مواد جديدة لتوفير الطاقة وتقليل تلوث الكوكب."
        ],
        teacherNotes: [
          "احفظ تعاريف الكلمات: habitat = the natural home of an animal or plant.",
          "سؤال اختيارات متكرر: Animals become endangered when people destroy their (habitats / clothes)."
        ],
        commonMistakes: [
          "الخلط بين protect (يحمي) و pollute (يلوث)."
        ],
        examples: [
          {
            en: "We must protect wildlife habitats before rare species disappear forever.",
            ar: "يجب علينا حماية المواطن الطبيعية للحياة البرية قبل أن تختفي الأنواع النادرة إلى الأبد.",
            highlight: "protect wildlife habitats",
            note: "مفردات بيئية منهجية"
          }
        ],
        exercises: [
          {
            id: "2u7-ex1",
            question: "A ______ is the natural place where an animal or plant lives. (habitat / factory / airport)",
            options: ["habitat", "factory", "airport", "magazine"],
            correctAnswer: "habitat",
            explanation: "الموطن الطبيعي (habitat) هو المكان الطبيعي لمعيشة الكائن الحي.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 100"
          }
        ]
      },
      {
        id: "2nd-u7-l2",
        unitId: 27,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: الجملة الشرطية الأولى (First Conditional)",
        titleEn: "Lesson 2: First Conditional (If + Present Simple, will + base)",
        category: "grammar",
        summary: "كتاب الطالب ص 76-79 وكتاب النشاط ص 104-108: التعبير عن نتائج مستقبلية محتملة وواقعية إذا تحقق شرط ما في المضارع.",
        grammarRuleFormula: "If + Subject + Present Simple (فعل مضارع), Subject + will / won't + base verb\n- If we recycle paper, we will save many trees.\n- If it rains tomorrow, we will stay at home.\n- If you don't study hard, you won't pass the exam.\n(يمكن أن تأتي If في المنتصف بدون فاصلة: We will protect animals if we stop cutting forests.)",
        detailedContent: [
          "تُستخدم الحالة الشرطية الأولى للتعبير عن أشياء حقيقية وممكنة الحدوث في المستقبل في حال تحقق الشرط.",
          "جملة الشرط (الجملة الملاصقة لأداة If) تكون دائماً في زمن المضارع البسيط (Present Simple)، انتبه لإضافة s مع المفرد (he, she, it).",
          "جملة جواب الشرط (النتيجة) تكون مع will أو won't متبوعة بمصدر مجرد.",
          "تحذير وزاري: لا تضع will داخل جملة If أبداً."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تذكر دائماً: 'بعد If مضارع، وفي الطرف الثاني will'.",
          "إذا كان الفاعل في جملة If مفرداً (Ali, he, she, it)، يجب إضافة s الشخص الثالث للفعل: If he studies hard, he will pass."
        ],
        commonMistakes: [
          "وضع will بعد If مثل: If it will rain (خطأ جسيم؛ الصحيح If it rains).",
          "نسيان s المفرد في جملة الشرط: If he study (الصحيح If he studies)."
        ],
        examples: [
          {
            en: "If we recycle plastic bottles, we will keep our cities cleaner.",
            ar: "إذا قمنا بتدوير القوارير البلاستيكية، سنحافظ على مدننا أنظف.",
            highlight: "If we recycle ... will keep",
            note: "حالة شرطية أولى بيئية"
          },
          {
            en: "If the temperature rises, the polar ice will melt faster.",
            ar: "إذا ارتفعت درجة الحرارة، سيذوب الجليد القطبي بسرعة أكبر.",
            highlight: "If the temperature rises ... will melt",
            note: "مضارع مفرد + will ومصدر"
          }
        ],
        exercises: [
          {
            id: "2u7-ex2",
            question: "If Bilal ______ hard this term, he will win the top prize. (works / will work / worked)",
            options: ["works", "will work", "worked", "working"],
            correctAnswer: "works",
            explanation: "جملة If تتطلب فعلاً في المضارع البسيط؛ والفاعل Bilal مفرد فيأخذ works.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 105"
          },
          {
            id: "2u7-ex3",
            question: "If they don't protect the marshes, rare birds ______ disappear. (will / did / were)",
            options: ["will", "did", "were", "are"],
            correctAnswer: "will",
            explanation: "جواب الشرط في الحالة الأولى يتكون من will + المصدر المجرد disappear.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // UNIT 8: Revision and Project
  // -------------------------------------------------------------------------
  {
    id: 28,
    number: 8,
    titleAr: "الوحدة الثامنة: المراجعة الشاملة ومشروع الفصل (Unit 8: Revision & Project)",
    titleEn: "Unit 8: Comprehensive Revision, Skills Consolidation & Final Exam Prep",
    description: "معتمد من كتاب الطالب (SB ص 84-88) وكتاب النشاط (AB ص 115-126): مراجعة شاملة لقواعد ومنهج الثاني المتوسط، تجميع مهارات الإملاء، وأسئلة الاستعداد للامتحان النهائي.",
    accentColor: "from-purple-600 to-pink-600",
    bgGradient: "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200",
    lessons: [
      {
        id: "2nd-u8-l1",
        unitId: 28,
        lessonNumber: 1,
        titleAr: "الدرس الأول: المراجعة الشاملة لقواعد الفصلين (Grammar Consolidation)",
        titleEn: "Lesson 1: Second Intermediate Full Grammar Review",
        category: "grammar",
        summary: "كتاب النشاط ص 115-120: مراجعة شاملة ومكثفة لأس التملك، محددات الكمية، أفعال الرياضة، ظروف الحال، المبني للمجهول، be going to، و First Conditional.",
        grammarRuleFormula: "Key Rules at a Glance:\n1) 's vs s': boy's (1 boy) vs boys' (many boys)\n2) too much / a little (uncountable) vs too many / a few (countable)\n3) play tennis / go swimming / do judo\n4) good -> well / fast -> fast / easy -> easily\n5) Passive: is/are + P.P. (Present) & was/were + P.P. (Past)\n6) Future: be going to + base verb\n7) Relative: who (person) vs which (thing)\n8) If + Present, will + base verb",
        detailedContent: [
          "تجميع شامل لكافة القواعد المنهجية التي وردت في الكتابين (Student's Book & Activity Book).",
          "نماذج تدريبية على أسئلة الاختيارات المتعددة (MCQ) والتحويلات القواعدية.",
          "نصائح لحل أسئلة القواعد بدقة والتركيز على مفاتيح الحل في كل جملة."
        ],
        teacherNotes: [
          "راجع جدول الأفعال الشاذة والتصاريف الثالثة قبل دخول الامتحان النهائي.",
          "ركز على علامات الترقيم (Capital letters, full stops, question marks, apostrophes)."
        ],
        commonMistakes: [
          "الاستعجال في حل الجملة دون البحث عن الكلمة المفتاحية (مثل yesterday للماضي، أو every day للمضارع)."
        ],
        examples: [
          {
            en: "Reviewing all rules systematically ensures scoring 100% in English exams.",
            ar: "المراجعة المنهجية لجميع القواعد تضمن لك نيل الدرجة الكاملة في الامتحانات.",
            highlight: "Reviewing all rules",
            note: "المراجعة الشاملة"
          }
        ],
        exercises: [
          {
            id: "2u8-ex1",
            question: "Yesterday, the missing keys ______ found by the cleaner. (were / are / was)",
            options: ["were", "are", "was", "is"],
            correctAnswer: "were",
            explanation: "الحدث في الماضي (Yesterday) والفاعل جمع (keys) لذا نختار were found.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 118"
          }
        ]
      }
    ]
  }
];

// =========================================================================
// قصص الثاني المتوسط المقررة رسمياً (Story Time: Bob and Basim)
// معتمدة من كتاب الطالب وكتاب النشاط
// =========================================================================
export const SECOND_INTERMEDIATE_STORIES: LiteratureItem[] = [
  {
    id: "2nd-story-pitcher",
    title: "Bob and Basim: The Pitcher",
    titleAr: "قصة بوب وباسم: إبريق الماء في المخيم الكشفي العالمي",
    author: "English for Iraq Official Curriculum",
    authorAr: "منهاج اللغة الإنكليزية لوزارة التربية العراقية (Student's Book & Activity Book)",
    genre: "Scouting Adventure & Humour / Story Time",
    genreAr: "مغامرة كشفية كوميدية شيقة ومقررة وزارياً",
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
    imageCaptionAr: "المخيم الكشفي العالمي للشباب في أستراليا (World Youth Camp)",
    summaryAr: "بوب وباسم شابان يمثلان الشباب في المخيم الكشفي العالمي للشباب في أستراليا (World Youth Camp). يلتقيان بالفتيان من مختلف بلدان العالم مثل رود ودان وبول. في هذه المغامرة يتعرض بوب كعادته لسلسلة من المقالب الكوميدية غير المقصودة بسبب سوء حظه، حيث يسكب إبريق الماء الكبير ويحدث فوضى مرحة أثناء إعداد وجبة الإفطار في الخيمة، بينما يسنده صديقه العراقي المخلص باسم ويضحكان معاً مرددين جملة بوب الشهيرة: 'لماذا تحدث هذه الأشياء معي دائماً؟'.",
    moralLessonAr: "روح الصداقة العالمية المتينة، العمل الجماعي في حياة المخيمات، والابتسام في مواجهة الصعاب والعثرات.",
    keyThemes: ["Scouting spirit", "International friendship", "Good sportsmanship & humour"],
    characters: [
      {
        name: "Bob",
        nameAr: "بوب",
        role: "The unlucky scout",
        roleAr: "الكشاف طيب القلب ولكنه قليل الحظ وتحدث معه المقالب",
        description: "An adventurous, well-meaning scout who always encounters hilarious accidents.",
        descriptionAr: "شاب طيب القلب تحدث معه دائماً مواقف طريفة ومحرجة وغير متوقعة في المخيم."
      },
      {
        name: "Basim",
        nameAr: "باسم",
        role: "Bob's loyal Iraqi best friend",
        roleAr: "صديق بوب العراقي الوفي",
        description: "A calm, reliable, and helpful Iraqi scout who always assists Bob.",
        descriptionAr: "شاب عراقي هادئ ووفي يرافق بوب ويساعده دائماً في تجاوز مقالبه."
      },
      {
        name: "Rod, Dan & Paul",
        nameAr: "رود، دان، وبول",
        role: "Fellow scouts from Australia and other nations",
        roleAr: "كشافة رفاق من أستراليا ودول أخرى",
        description: "Scouts sharing the camp adventures with Bob and Basim.",
        descriptionAr: "رفاق التخييم الذين يشاركون في الأنشطة وطهي الطعام."
      }
    ],
    ministerialQA: [
      {
        id: "2nd-q1",
        question: "Where did the World Youth Camp take place?",
        questionAr: "أين أقيم المخيم الكشفي العالمي للشباب؟",
        answer: "In Australia.",
        answerAr: "في أستراليا.",
        year: "امتحان نصف السنة"
      },
      {
        id: "2nd-q2",
        question: "Who are Bob and Basim?",
        questionAr: "من هما بوب وباسم؟",
        answer: "Two scouts taking part in the World Youth Camp in Australia.",
        answerAr: "كشافان يشاركان في المخيم الكشفي العالمي للشباب في أستراليا.",
        year: "امتحان الفصل الأول"
      },
      {
        id: "2nd-q3",
        question: "What is Bob's famous repeated question whenever an accident happens to him?",
        questionAr: "ما هو سؤال بوب الشهير المتكرر كلما وقع له مقلب؟",
        answer: "'Why do these things always happen to me?'",
        answerAr: "'لماذا تحدث هذه الأشياء معي دائماً؟'",
        year: "امتحان نهاية السنة"
      },
      {
        id: "2nd-q4",
        question: "What did Bob spill while preparing breakfast?",
        questionAr: "ماذا سكب بوب أثناء تحضير الإفطار؟",
        answer: "A big pitcher of water / juice.",
        answerAr: "إبريقاً كبيراً من الماء / العصير.",
        year: "كتاب النشاط"
      }
    ]
  },
  {
    id: "2nd-story-icecream",
    title: "Bob and Basim: The Ice Cream",
    titleAr: "قصة بوب وباسم: مغامرة الآيس كريم في مدينة بريزبان",
    author: "English for Iraq Official Curriculum",
    authorAr: "منهاج وزارة التربية العراقية (Student's Book & Activity Book)",
    genre: "Comic Story Time",
    genreAr: "قصة كوميدية ممتعة مقررة وزارياً",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1200&q=80",
    imageCaptionAr: "رحلة الكشافة إلى المدينة وتناول الآيس كريم في يوم صيفي مشمس",
    summaryAr: "في يوم عطلة صيفي مشمس وحار في أستراليا، ذهب الفتيان في نزهة إلى مدينة بريزبان. دخلوا متجراً شهيراً للآيس كريم، واشترى بوب متحمساً مخروط آيس كريم عملاقاً بـ 5 كرات ونكهات ملونة مختلفة. وبينما كان يسير فخوراً بالآيس كريم، تعثر واصطدم فجأة، فانقلب المخروط بأكمله وانسكب الآيس كريم الذائب على قميصه ووجهه وشعره وسط ضحك وتشجيع زملائه، ليعيد بوب جملته المألوفة وسط ابتسامات الجميع.",
    moralLessonAr: "تقبل المواقف المحرجة بروح رياضية مرحة، والاستمتاع باللحظات الصادقة مع الأصدقاء.",
    keyThemes: ["Good humor", "True friendship", "Memorable adventures"],
    characters: [
      {
        name: "Bob",
        nameAr: "بوب",
        role: "The main character",
        roleAr: "بطل القصة الكوميدي",
        description: "Buys a giant 5-scoop ice cream that tragically ends up on his shirt and face.",
        descriptionAr: "يشتري آيس كريم عملاقاً بخمس نكهات وينتهي به الأمر مسكوباً على ملابسه."
      },
      {
        name: "Basim",
        nameAr: "باسم",
        role: "Bob's loyal friend",
        roleAr: "صديق بوب المخلص",
        description: "Enjoys his ice cream and comforts Bob after the funny mishap.",
        descriptionAr: "يستمتع بمثلجاته ويواسي بوب بروح مرحة بعد المقلب."
      }
    ],
    ministerialQA: [
      {
        id: "2nd-ice-q1",
        question: "How many scoops of ice cream did Bob order?",
        questionAr: "كم كرة آيس كريم طلب بوب؟",
        answer: "Five scoops of different flavours.",
        answerAr: "خمس كرات بنكهات مختلفة.",
        year: "امتحان الفصل الثاني"
      },
      {
        id: "2nd-ice-q2",
        question: "What happened to Bob's ice cream in the street?",
        questionAr: "ماذا حدث لآيس كريم بوب في الشارع؟",
        answer: "It fell and spilt all over his clothes and face.",
        answerAr: "سقط وانسكب بالكامل على ملابسه ووجهه.",
        year: "امتحان نهاية السنة"
      },
      {
        id: "2nd-ice-q3",
        question: "Where were the boys walking when the accident happened?",
        questionAr: "أين كان الفتيان يمشون عندما حدث الموقف؟",
        answer: "In the streets of Brisbane, Australia.",
        answerAr: "في شوارع مدينة بريزبان بأستراليا.",
        year: "امتحان الدور الأول"
      }
    ]
  }
];

// =========================================================================
// إنشاءات الثاني المتوسط النموذجية (Essays / Compositions)
// معتمدة من كتاب الطالب وكتاب النشاط ومطابقة للمواصفات الوزارية العراقية
// =========================================================================
export const SECOND_INTERMEDIATE_ESSAYS: EssayItem[] = [
  // إنشاء الوحدة الأولى
  {
    id: "2nd-essay-interview",
    unitId: 21,
    titleAr: "إنشاء الوحدة الأولى: مقابلة مع شخصية محلية (An Interview with a Local Person)",
    titleEn: "An Interview with a Beloved Local Teacher (Mr. Tariq)",
    ministerialWeight: "15 درجة في الامتحان الوزاري / النهائي",
    paragraphsEn: [
      "Last Tuesday, our school magazine team conducted a wonderful interview with Mr. Tariq, a beloved English teacher who has dedicated over twenty years to educating students in our city.",
      "Mr. Tariq explained that he loves teaching because empowering Iraqi youth with a global language brings him immense happiness. In his spare time, he enjoys reading historical books and cultivating flowers in his garden.",
      "When we asked him for advice for our school magazine readers, he smiled and said: 'Always study diligently, respect your teachers, and never fear making mistakes because they are the stepping stones to true mastery.'"
    ],
    paragraphsAr: [
      "في يوم الثلاثاء الماضي، أجرى فريق مجلة مدرستنا مقابلة رائعة مع الأستاذ طارق، وهو مدرس لغة إنكليزية محبوب كرّس أكثر من عشرين عاماً لتعليم الطلاب في مدينتنا.",
      "أوضح الأستاذ طارق أنه يعشق التدريس لأن تمكين الشباب العراقي من لغة عالمية يمنحه سعادة بالغة. وفي أوقات فراغه، يستمتع بقراءة كتب التاريخ وزراعة الزهور في حديقته.",
      "وعندما سألناه عن نصيحة لقرّاء مجلة مدرستنا، ابتسم وقال: 'ادرسوا بجد واجتهاد دائماً، واحترموا معلميكم، ولا تخافوا أبداً من الوقوع في الأخطاء لأنها الخطوات الأولى نحو الإتقان الحقيقي.'"
    ],
    keywords: [
      { word: "wonderful interview", meaning: "مقابلة رائعة ومميزة" },
      { word: "beloved teacher", meaning: "معلم محبوب ومحترم" },
      { word: "immense happiness", meaning: "سعادة بالغة وفرح عظيم" },
      { word: "spare time", meaning: "وقت الفراغ" },
      { word: "stepping stones", meaning: "خطوات ودرجات نحو النجاح" }
    ],
    goldenTips: [
      "نصيحة الأستاذ مصطفى تركي: قسّم المقابلة إلى 3 عناصر: 1) التعريف بالشخص، 2) هواياته وسبب حبه لمهنته، 3) النصيحة الذهبية للطلاب.",
      "استخدم علامات الاقتباس (\"...\") عند ذكر كلام الضيف المباشر لضمان درجات التنقيط الكاملة."
    ],
    clozeSentences: [
      {
        textWithBlanks: "Our school magazine team conducted an ______ with Mr. Tariq.",
        missingWord: "interview",
        options: ["interview", "operation", "accident", "exam"]
      }
    ]
  },

  // إنشاء الوحدة الثانية
  {
    id: "2nd-essay-fitness",
    unitId: 22,
    titleAr: "إنشاء الوحدة الثانية: كيف تحافظ على صحتك ولياقتك (How to Keep Fit and Healthy)",
    titleEn: "How to Keep Fit and Healthy (Advice for Teenagers)",
    ministerialWeight: "15 درجة في الامتحان الوزاري / النهائي",
    paragraphsEn: [
      "Physical fitness and good health are essential for every teenager to succeed in school and enjoy an energetic daily life. Unfit students get tired rapidly and cannot participate comfortably in sports or study sessions.",
      "To keep your body fit, you should eat balanced meals rich in fresh vegetables, fruits, and lean proteins. You must avoid consuming too much sugar, salt, and oily fast foods, and drink plenty of clean water every day.",
      "Furthermore, participating in regular exercise like cycling, jogging, or swimming for thirty minutes daily strengthens your heart muscles. Finally, getting eight hours of sound sleep each night ensures mental clarity and vigor."
    ],
    paragraphsAr: [
      "تعتبر اللياقة البدنية والصحة الجيدة أمرين أساسيين لكل مراهق للنجاح في المدرسة والاستمتاع بحياة يومية مليئة بالحيوية. فالطلبة غير اللائقين بدنياً يتعبون سريعاً ولا يستطيعون المشاركة بارتياح في الرياضة أو حصص الدراسة.",
      "للحفاظ على لياقة جسدك، ينبغي عليك تناول وجبات متوازنة غنية بالخضروات والفواكه الطازجة والبروتينات الخالية من الدهون. ويجب أن تتجنب الإفراط في تناول السكر والملح والوجبات السريعة الدهنية، وأن تشرب الكثير من الماء النظيف يومياً.",
      "علاوة على ذلك، فإن ممارسة التمارين الرياضية بانتظام مثل ركوب الدراجات أو الركض أو السباحة لمدة ثلاثين دقيقة يومياً تقوي عضلات قلبك. وأخيراً، فإن نيل ثماني ساعات من النوم الهادئ كل ليلة يضمن صفاء الذهن وقوة النشاط."
    ],
    keywords: [
      { word: "physical fitness", meaning: "اللياقة البدنية والصحية" },
      { word: "balanced meals", meaning: "وجبات غذائية متوازنة" },
      { word: "lean proteins", meaning: "بروتينات خالية من الدهون" },
      { word: "regular exercise", meaning: "تمارين رياضية منتظمة" },
      { word: "mental clarity", meaning: "صفاء الذهن والتركيز" }
    ],
    goldenTips: [
      "وظّف محددات الكمية والنصائح التي درستها في الوحدة: You should eat a little sugar, You shouldn't eat too much fat, You should do regular exercise."
    ],
    clozeSentences: [
      {
        textWithBlanks: "To keep fit, teenagers should do regular ______ for thirty minutes daily.",
        missingWord: "exercise",
        options: ["exercise", "sugar", "sleeping", "smoking"]
      }
    ]
  },

  // إنشاء الوحدة السادسة
  {
    id: "2nd-essay-dream-job",
    unitId: 26,
    titleAr: "إنشاء الوحدة السادسة: مهنتي المستقبلية (My Dream Career / Future Job)",
    titleEn: "My Future Career: Why I am Going to Be a Doctor",
    ministerialWeight: "15 درجة في الامتحان الوزاري / النهائي",
    paragraphsEn: [
      "When I complete my secondary education, I am going to study medicine and become a dedicated physician because I have always wished to heal suffering patients and serve my homeland, Iraq.",
      "Doctors work diligently in hospitals and medical clinics. Their duty is to examine patients, diagnose illnesses accurately, and prescribe curative treatments. This noble profession demands infinite patience, empathy, and many years of rigorous scientific study.",
      "Currently in school, I am focusing wholeheartedly on Biology, Chemistry, and English to secure high marks. I truly believe that healing sick individuals is not merely a job, but a lifelong human mission that brings smiles and renewed hope to families."
    ],
    paragraphsAr: [
      "عندما أتمم دراستي الثانوية، أخطط لدراسة الطب وأن أصبح طبيباً مخلصاً لأنني طالما تمنيت علاج المرضى المتألمين وخدمة وطني الحبيب العراق.",
      "يعمل الأطباء بجد واجتهاد في المستشفيات والعيادات الطبية. وواجبهم هو فحص المرضى وتشخيص الأمراض بدقة ووصف العلاجات الشافية. وتتطلب هذه المهنة النبيلة صبراً لا حدود له، وتعاطفاً إنسانياً، وسنوات طويلة من الدراسة العلمية المكثفة.",
      "في المدرسة حالياً، أركز بكل جوارحي على الأحياء والكيمياء واللغة الإنكليزية لتحقيق معدل عالٍ. وأؤمن حقاً بأن شفاء المرضى ليس مجرد وظيفة، بل رسالة إنسانية تدوم مدى الحياة وتزرع البسمة والأمل المتجدد في نفوس العائلات."
    ],
    keywords: [
      { word: "dedicated physician", meaning: "طبيب مخلص ومتفانٍ" },
      { word: "diagnose illnesses", meaning: "تشخيص الأمراض بدقة" },
      { word: "prescribe treatments", meaning: "وصف العلاجات الطبية" },
      { word: "noble profession", meaning: "مهنة نبيلة وإنسانية" },
      { word: "renewed hope", meaning: "أمل متجدد وابتسامة" }
    ],
    goldenTips: [
      "استخدم قاعدة الوحدة السادسة: I am going to be a... because I want to...",
      "اذكر الصفات الشخصية المطلوبة للمهنة (patient, hardworking, caring)."
    ],
    clozeSentences: [
      {
        textWithBlanks: "I am going to study medicine because I want to ______ suffering patients.",
        missingWord: "heal",
        options: ["heal", "hurt", "ignore", "forget"]
      }
    ]
  }
];

// =========================================================================
// بنك أسئلة امتحانات الثاني المتوسط المعتمد من كتاب الطالب وكتاب النشاط
// =========================================================================
export const SECOND_INTERMEDIATE_QUESTIONS: MinisterialExamQuestion[] = [
  {
    id: "2nd-exam-q1",
    unitId: 21,
    topic: "Possessive Apostrophe ('s vs s')",
    year: "امتحان الفصل الأول 2024",
    session: "دور أول",
    questionText: "This is the ______ (teacher's / teachers') desk. (Only one teacher sits here)",
    correctAnswer: "teacher's",
    ruleExplanation: "الحديث عن معلم واحد مفرد (one teacher)، لذا نضع الفاصلة قبل حرف s: teacher's.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "2nd-exam-q2",
    unitId: 21,
    topic: "Suggestions with Why not",
    year: "امتحان نصف السنة 2024",
    session: "دور أول",
    questionText: "Why not ______ a cartoon for the school magazine? (draw / drawing / drew)",
    correctAnswer: "draw",
    ruleExplanation: "بعد صيغة الاقتراح Why not نستخدم دائماً المصدر المجرد الخالي من أي إضافة: draw.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "2nd-exam-q3",
    unitId: 22,
    topic: "Quantifiers too much vs too many",
    year: "امتحان نصف السنة",
    session: "دور أول",
    questionText: "You shouldn't eat ______ (too much / too many) crisps because they contain salt.",
    correctAnswer: "too many",
    ruleExplanation: "رقائق الشيبس (crisps) اسم معدود جمع ينتهي بـ s، لذا نستخدم معه too many.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "2nd-exam-q4",
    unitId: 22,
    topic: "Obligation have to / has to",
    year: "امتحان الفصل الثاني",
    session: "دور أول",
    questionText: "Fatima has an exam tomorrow. She ______ study tonight. (has to / doesn't have to / haven't to)",
    correctAnswer: "has to",
    ruleExplanation: "فاطمة مفرد والضرورة ملزمة للدراسة قبل الامتحان، فنستخدم has to.",
    difficulty: "medium",
    category: "Grammar"
  },
  {
    id: "2nd-exam-q5",
    unitId: 23,
    topic: "Sports verbs play / go / do",
    year: "امتحان نهاية الكورس الأول",
    session: "دور أول",
    questionText: "My little brother loves to ______ judo at the sports center. (play / go / do)",
    correctAnswer: "do",
    ruleExplanation: "رياضة الجودو فن قتالي فردي يأخذ الفعل do: do judo.",
    difficulty: "easy",
    category: "Vocabulary"
  },
  {
    id: "2nd-exam-q6",
    unitId: 23,
    topic: "Adverbs of Manner - Irregular adverbs",
    year: "امتحان نصف السنة",
    session: "دور أول",
    questionText: "Zaid is a good swimmer. He swims very ______ (good / well / nicely).",
    correctAnswer: "well",
    ruleExplanation: "لوصف فعل السباحة (swims) نحتاج لظرف الحال الشاذ من good وهو well.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "2nd-exam-q7",
    unitId: 25,
    topic: "Present Simple Passive",
    year: "امتحان الفصل الثاني",
    session: "دور أول",
    questionText: "Magazines and books ______ (sell) in bookshops everywhere. [Present Passive]",
    correctAnswer: "are sold",
    ruleExplanation: "الفاعل جمع (Magazines and books) في زمن المضارع، يأخذ are + التصريف الثالث sold.",
    difficulty: "medium",
    category: "Grammar"
  },
  {
    id: "2nd-exam-q8",
    unitId: 25,
    topic: "Past Simple Passive",
    year: "امتحان الدور الأول 2024",
    session: "دور أول",
    questionText: "The historical letter ______ (write) in Baghdad in 1950. [Past Passive]",
    correctAnswer: "was written",
    ruleExplanation: "الفاعل مفرد (letter) والحدث في الماضي (1950)، يأخذ was + التصريف الثالث written.",
    difficulty: "medium",
    category: "Grammar"
  },
  {
    id: "2nd-exam-q9",
    unitId: 26,
    topic: "Relative Pronouns who vs which",
    year: "امتحان نهاية السنة 2024",
    session: "دور أول",
    questionText: "An architect is someone ______ designs modern buildings. (who / which / whose)",
    correctAnswer: "who",
    ruleExplanation: "المهندس المعماري (someone / architect) إنسان عاقل، يأخذ ضمير الوصل who.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "2nd-exam-q10",
    unitId: 27,
    topic: "First Conditional",
    year: "امتحان نهاية السنة 2024",
    session: "دور أول",
    questionText: "If you ______ (hurry), you will catch the morning train. (hurry / will hurry / hurried)",
    correctAnswer: "hurry",
    ruleExplanation: "جملة If في الحالة الشرطية الأولى تتطلب مضارعاً بسيطاً: hurry مع الفاعل you.",
    difficulty: "medium",
    category: "Grammar"
  }
];

// =========================================================================
// الامتحان الشامل للثاني المتوسط (Mock Exam Paper)
// مطابق لورقة الامتحان المنهجي المعتمد من كتاب الطالب وكتاب النشاط (100 درجة)
// =========================================================================
export const SECOND_INTERMEDIATE_MOCK_PAPER: MockExamPaper = {
  id: "2nd-full-mock-paper-official",
  title: "امتحان نهاية السنة الشامل • الثاني المتوسط (وفق المنهج الرسمي المعتمد)",
  subtitle: "الاعتماد الكامل على كتاب الطالب (Student's Book) وكتاب النشاط (Activity Book) • إشراف الأستاذ مصطفى تركي",
  session: "الدور الأول • المنهج العراقي الرسمي المعتمد لوزارة التربية",
  year: "2025 - 2026",
  durationMinutes: 120,
  totalMarks: 100,
  sections: [
    {
      id: "sec-1",
      sectionCode: "Q1",
      titleAr: "السؤال الأول: القطعة الخارجية واستيعاب المقروء",
      titleEn: "Question 1: Unseen Reading Comprehension",
      instructionsAr: "اقرأ القطعة بعناية ثم أجب عن 5 من الأسئلة التالية (لكل نقطة 3 درجات):",
      instructionsEn: "Read the passage carefully and answer (5) questions below (15 Marks):",
      totalMarks: 15,
      unseenPassage: "Salem is a thirteen-year-old Iraqi boy who lives in Basra. He is an active member of the school magazine club. Salem wants to be a marine biologist in the future because he loves sea animals and wants to protect the Arabian Gulf from pollution. Every Friday, Salem helps clean the shores with his scout troop. Last month, his team published an article about the endangered dugong in the Gulf. Salem believes that if young people protect their environment today, future generations will enjoy clean water and healthy nature.",
      items: [
        {
          id: "2nd-mock-q1-1",
          number: 1,
          questionText: "Where does Salem live?",
          type: "text",
          correctAnswer: "He lives in Basra.",
          explanation: "مذكور في السطر الأول: Salem is a thirteen-year-old Iraqi boy who lives in Basra.",
          maxScore: 3
        },
        {
          id: "2nd-mock-q1-2",
          number: 2,
          questionText: "What does Salem want to be in the future?",
          type: "choice",
          options: ["A marine biologist", "A mechanic", "A pilot"],
          correctAnswer: "A marine biologist",
          explanation: "Salem wants to be a marine biologist in the future.",
          maxScore: 3
        },
        {
          id: "2nd-mock-q1-3",
          number: 3,
          questionText: "What animal did Salem's team write an article about?",
          type: "text",
          correctAnswer: "The endangered dugong in the Gulf.",
          explanation: "كتبوا عن حيوان بقر البحر المهدد بالانقراض (the endangered dugong).",
          maxScore: 3
        },
        {
          id: "2nd-mock-q1-4",
          number: 4,
          questionText: "Salem helps clean the shores every ______ (Friday / Sunday / Monday).",
          type: "choice",
          options: ["Friday", "Sunday", "Monday"],
          correctAnswer: "Friday",
          explanation: "Every Friday, Salem helps clean the shores.",
          maxScore: 3
        },
        {
          id: "2nd-mock-q1-5",
          number: 5,
          questionText: "Salem is fourteen years old. (True / False)",
          type: "choice",
          options: ["False", "True"],
          correctAnswer: "False",
          explanation: "عمره 13 سنة (thirteen-year-old) وليس 14.",
          maxScore: 3
        }
      ]
    },
    {
      id: "sec-2",
      sectionCode: "Q2",
      titleAr: "السؤال الثاني: القواعد والوظائف اللغوية",
      titleEn: "Question 2: Grammar & Language Functions",
      instructionsAr: "اختر الإجابة الصحيحة من بين الأقواس (25 درجة):",
      instructionsEn: "Choose the correct answer between brackets (25 Marks):",
      totalMarks: 25,
      items: [
        {
          id: "2nd-mock-q2-1",
          number: 1,
          questionText: "These are the ______ room keys. All five teachers use this room. (teachers' / teacher's / teachers)",
          type: "choice",
          options: ["teachers'", "teacher's", "teachers"],
          correctAnswer: "teachers'",
          explanation: "الحديث عن خمسة معلمين (جمع ينتهي بـ s)، فالفاصلة بعد الـ s: teachers'.",
          maxScore: 5
        },
        {
          id: "2nd-mock-q2-2",
          number: 2,
          questionText: "The message ______ (send) by pigeon in the ancient world. [Past Passive]",
          type: "choice",
          options: ["was sent", "is sent", "sent", "were sent"],
          correctAnswer: "was sent",
          explanation: "ماضٍ بسيط مبني للمجهول لاسم مفرد (message) -> was + sent.",
          maxScore: 5
        },
        {
          id: "2nd-mock-q2-3",
          number: 3,
          questionText: "Why not ______ (start / starting / started) a school magazine club?",
          type: "choice",
          options: ["start", "starting", "started"],
          correctAnswer: "start",
          explanation: "بعد Why not نستخدم دائماً المصدر المجرد start.",
          maxScore: 5
        },
        {
          id: "2nd-mock-q2-4",
          number: 4,
          questionText: "An architect is a person ______ designs bridges and buildings. (who / which / whose)",
          type: "choice",
          options: ["who", "which", "whose"],
          correctAnswer: "who",
          explanation: "المهندس المعماري شخص عاقل يأخذ ضمير الوصل who.",
          maxScore: 5
        },
        {
          id: "2nd-mock-q2-5",
          number: 5,
          questionText: "If we recycle paper and plastic, we ______ (save) the environment. [First Conditional]",
          type: "choice",
          options: ["will save", "saved", "would save", "saves"],
          correctAnswer: "will save",
          explanation: "حالة شرطية أولى: جملة فعل الشرط مضارع (recycle)، لذا جواب الشرط يكون will save.",
          maxScore: 5
        }
      ]
    },
    {
      id: "sec-3",
      sectionCode: "Q3",
      titleAr: "السؤال الثالث: المفردات والتنقيط والإملاء",
      titleEn: "Question 3: Vocabulary & Spelling",
      instructionsAr: "أجب عن فروع المفردات والتنقيط والإملاء (20 درجة):",
      instructionsEn: "Answer the vocabulary and spelling questions (20 Marks):",
      totalMarks: 20,
      items: [
        {
          id: "2nd-mock-q3-1",
          number: 1,
          questionText: "Which sport takes the verb 'do'? (karate / football / swimming)",
          type: "choice",
          options: ["karate", "football", "swimming"],
          correctAnswer: "karate",
          explanation: "الفنون القتالية الفردية karate تأخذ الفعل do.",
          maxScore: 5
        },
        {
          id: "2nd-mock-q3-2",
          number: 2,
          questionText: "slow -> slowly ; good -> ______ [Spelling]",
          type: "text",
          correctAnswer: "well",
          explanation: "ظرف الحال الشاذ من good هو well.",
          maxScore: 5
        },
        {
          id: "2nd-mock-q3-3",
          number: 3,
          questionText: "danger -> dangerous ; fame -> ______ [Spelling]",
          type: "text",
          correctAnswer: "famous",
          explanation: "تحويل الاسم fame إلى صفة بإضافة ous هو famous.",
          maxScore: 5
        },
        {
          id: "2nd-mock-q3-4",
          number: 4,
          questionText: "Re-punctuate: 'did basim and bob travel to australia'",
          type: "text",
          correctAnswer: "Did Basim and Bob travel to Australia?",
          explanation: "تكبير حرف البداية D، والاسمين Basim و Bob، واسم البلد Australia، وعلامة الاستفهام ?.",
          maxScore: 5
        }
      ]
    },
    {
      id: "sec-4",
      sectionCode: "Q4",
      titleAr: "السؤال الرابع: قصص المطالعة المقررة (Story Time: Bob and Basim)",
      titleEn: "Question 4: Story Time (Bob & Basim in Australia)",
      instructionsAr: "أجب عن الأسئلة الخاصة بقصص بوب وباسم (15 درجة):",
      instructionsEn: "Answer the questions about the story of Bob and Basim (15 Marks):",
      totalMarks: 15,
      items: [
        {
          id: "2nd-mock-q4-1",
          number: 1,
          questionText: "Where did the World Youth Camp take place?",
          type: "choice",
          options: ["In Australia", "In Iraq", "In Canada"],
          correctAnswer: "In Australia",
          explanation: "المخيم الكشفي العالمي أقيم في أستراليا (In Australia).",
          maxScore: 5
        },
        {
          id: "2nd-mock-q4-2",
          number: 2,
          questionText: "What is Bob's famous question whenever an accident happens?",
          type: "choice",
          options: [
            "'Why do these things always happen to me?'",
            "'Where is my tent?'",
            "'What time is breakfast?'"
          ],
          correctAnswer: "'Why do these things always happen to me?'",
          explanation: "عبارة بوب الشهيرة: لماذا تحدث هذه الأشياء معي دائماً؟",
          maxScore: 5
        },
        {
          id: "2nd-mock-q4-3",
          number: 3,
          questionText: "In the Ice Cream story, how many scoops did Bob buy?",
          type: "choice",
          options: ["Five scoops", "Two scoops", "One scoop"],
          correctAnswer: "Five scoops",
          explanation: "اشترى بوب مخروطاً يحتوي على 5 كرات بنكهات مختلفة.",
          maxScore: 5
        }
      ]
    }
  ],
  essayOptions: [
    {
      id: "2nd-essay-opt-a",
      optionLetter: "A",
      titleEn: "How to Keep Fit and Healthy",
      titleAr: "كيف تحافظ على صحتك ولياقتك (الوحدة الثانية)",
      prompt: "Write a short article for your school magazine advising teenagers how to keep fit and healthy.",
      suggestedModel: "Physical fitness and good health are essential for every teenager to succeed in school and enjoy daily life. To keep fit, you should eat balanced meals rich in vegetables and fresh fruits. Avoid eating too much sugar, salt, and oily junk food. Doing regular exercise like swimming or jogging for thirty minutes daily strengthens your heart and boosts your energy. Finally, get eight hours of restful sleep every night.",
      keywords: ["physical fitness", "balanced meals", "junk food", "regular exercise", "restful sleep"],
      maxScore: 25
    },
    {
      id: "2nd-essay-opt-b",
      optionLetter: "B",
      titleEn: "My Future Career: A Doctor",
      titleAr: "مهنتي المستقبلية: طبيب (الوحدة السادسة)",
      prompt: "Write a paragraph about a career you would like to have in the future and explain why.",
      suggestedModel: "When I finish school, I am going to study medicine and become a dedicated doctor because I want to heal sick people and serve my beloved country, Iraq. Doctors work hard in hospitals, examining patients, diagnosing diseases, and prescribing medicine. It requires being patient, compassionate, and studying diligently. I believe medicine is a noble mission that brings smiles and hope to everyone.",
      keywords: ["doctor", "hospitals", "patients", "medicine", "noble mission"],
      maxScore: 25
    }
  ]
};
