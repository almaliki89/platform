import { Unit, LiteratureItem, EssayItem, MinisterialExamQuestion } from '../../types';
import { MockExamPaper } from '../mockExamPapers';

// =========================================================================
// وحدات الثاني المتوسط - منهج English for Iraq (2nd Intermediate)
// معتمد رسمياً وشاملاً من كتاب الطالب (Student's Book) وكتاب النشاط (Activity Book)
// تغطية كاملة لجميع الوحدات الثمانية (Units 1 - 8) ولكل الدروس بالكامل
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
    description: "معتمد من كتاب الطالب (SB ص 4-15) وكتاب النشاط (AB ص 3-18): أقسام المجلة، أس التملك، إعطاء النصيحة بـ should، صيغ الاقتراحات بـ Why not / Shall we / Let's، والمقابلة الصحفية وقواعد التنقيط.",
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
            question: "Let's ______ (start / starting / to start) a team for the sports day.",
            options: ["start", "starting", "to start", "started"],
            correctAnswer: "start",
            explanation: "بعد Let's يأتي دائماً فعل مجرد خالٍ من أي إضافة.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 8"
          },
          {
            id: "2u1-ex4",
            question: "Your brother has a bad toothache. Give advice: He ______ go to the dentist.",
            options: ["should", "shouldn't", "is", "must not"],
            correctAnswer: "should",
            explanation: "نصيحة إيجابية ومفيدة لعلاج ألم الأسنان باستخدام should.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          }
        ]
      },
      {
        id: "2nd-u1-l3",
        unitId: 21,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: التعبير عن الرغبة والتفضيل (Likes, Dislikes & Preferences)",
        titleEn: "Lesson 3: Expressing Likes & Dislikes with -ing Forms",
        category: "grammar",
        summary: "كتاب الطالب ص 7 وكتاب النشاط ص 9-11: استخدام أفعال الرغبة (like, love, enjoy, don't like, hate) متبوعة بفعل مضاف إليه ing أو اسم.",
        grammarRuleFormula: "Subject + (like / love / enjoy / don't like / hate) + Verb(-ing) / Noun\nأمثلة:\n- I love reading stories.\n- She enjoys writing poetry.\n- They hate doing homework late.",
        detailedContent: [
          "أفعال الرغبة والميول في اللغة الإنكليزية تتطلب صيغة الـ Gerund (Verb + ing) عند الحديث عن الأنشطة والهوايات العامة.",
          "تدرج الرغبة من الأقوى للأضعف: love (يعشق) > like (يحب) > enjoy (يستمتع بـ) > don't like (لا يحب) > hate (يكره).",
          "قواعد إضافة ing: إذا انتهى الفعل بـ e نحذفها (write -> writing)، وإذا انتهى بحرف صحيح قبله علة واحد نضاعفه (swim -> swimming)."
        ],
        teacherNotes: [
          "تنبيه امتحاني: إذا جاء أحد أفعال الشعور (like, love, hate, enjoy) اختر دائماً الفعل الذي يحمل (ing).",
          "استثناء: إذا سبق الفعل بـ would (I'd like / I'd love) نستخدم to + مصدر مجرد: I'd like to visit London."
        ],
        commonMistakes: [
          "كتابة I like play tennis (الصحيح I like playing tennis).",
          "كتابة I'd like playing (الصحيح I'd like to play لوجود 'd = would)."
        ],
        examples: [
          {
            en: "We enjoy interviewing famous people in our town.",
            ar: "نحن نستمتع بإجراء المقابلات مع الشخصيات المشهورة في مدينتنا.",
            highlight: "enjoy interviewing",
            note: "enjoy + verb-ing"
          },
          {
            en: "Sami hates washing the dishes after dinner.",
            ar: "سامي يكره غسل الأطباق بعد العشاء.",
            highlight: "hates washing",
            note: "hate + verb-ing"
          }
        ],
        exercises: [
          {
            id: "2u1-ex5",
            question: "My sister loves ______ (draw / drawing / drew) cartoons for the magazine.",
            options: ["drawing", "draw", "drew", "to drawing"],
            correctAnswer: "drawing",
            explanation: "بعد الفعل loves نستخدم الفعل بصيغة -ing.",
            type: "mcq",
            ministerialYear: "كتاب الطالب ص 7"
          }
        ]
      },
      {
        id: "2nd-u1-l4",
        unitId: 21,
        lessonNumber: 4,
        titleAr: "الدرس الرابع: المقابلة الصحفية - شخصية محلية (A Local Personality: Mr. James)",
        titleEn: "Lesson 4: Interviewing a Local Personality (Mr. James)",
        category: "reading",
        summary: "كتاب الطالب ص 8-9 وكتاب النشاط ص 12-14: استيعاب قصة السيد جيمس صاحب المطعم الإيطالي الشهير في المدينة وأسلوب طرح الأسئلة الصحفية واستخدام Since و For.",
        grammarRuleFormula: "For + Period of time (لمدة زمنية غير محددة البداية):\n- for ten years, for two hours, for a long time\nSince + Starting point (منذ نقطة زمنية محددة):\n- since 2012, since yesterday, since he was born",
        detailedContent: [
          "السيد جيمس (Mr. James) يدير مقهى ومطعماً بيتزا إيطالياً صغيراً في شارع هاي ستريت منذ 10 سنوات.",
          "يحب السيد جيمس طبخ البيتزا الإيطالية ومساعدة الزبائن ولكنه يكره غسل الصحون بعد الإغلاق والتنظيف.",
          "استخدام Since و For: نستخدم For مع المدة الزمنية الإجمالية (for ten years)، ونستخدم Since مع نقطة البداية المحددة (since he was born / since 2015)."
        ],
        teacherNotes: [
          "سؤال متكرر: How long has Mr. James worked in the restaurant? الجواب: For ten years.",
          "سؤال: What does he like doing? الجواب: Cooking and meeting people. What does he dislike? Cleaning up."
        ],
        commonMistakes: [
          "استخدام since مع مدة إجمالية مثل since 10 years (خطأ، الصحيح for 10 years).",
          "استخدام for مع سنة محددة مثل for 2018 (خطأ، الصحيح since 2018)."
        ],
        examples: [
          {
            en: "Mr. James has lived in the town since he was born.",
            ar: "عاش السيد جيمس في المدينة منذ أن وُلد.",
            highlight: "since he was born",
            note: "نقطة بداية في الماضي"
          },
          {
            en: "He has worked at the Italian takeaway for ten years.",
            ar: "عمل في المطعم الإيطالي للوجبات السريعة لمدة عشر سنوات.",
            highlight: "for ten years",
            note: "مدة زمنية إجمالية"
          }
        ],
        exercises: [
          {
            id: "2u1-ex6",
            question: "I have lived in Baghdad ______ (for / since / in) five years.",
            options: ["for", "since", "in", "from"],
            correctAnswer: "for",
            explanation: "خمس سنوات هي مدة زمنية إجمالية محسوبة، لذا نستخدم for.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 13"
          }
        ]
      },
      {
        id: "2nd-u1-l5",
        unitId: 21,
        lessonNumber: 5,
        titleAr: "الدرس الخامس: علامات التنقيط وقواعد الإملاء (Punctuation & Spelling)",
        titleEn: "Lesson 5: Capital Letters, Full Stops & Question Marks",
        category: "spelling",
        summary: "كتاب النشاط ص 14-16: قواعد التنقيط الأساسية (الحروف الكبيرة، النقطة، علامة الاستفهام، الفاصلة) لكتابة فقرات المجلة بصورة صحيحة.",
        grammarRuleFormula: "Punctuation Rules:\n1) Capital letters: بداية الجمل، أسماء الأشخاص (Ali)، الدول والمدن (Iraq, Baghdad)، أيام الأسبوع والأشهر (Monday, April)، والضمير I.\n2) Full stop (.): نهاية الجملة الخبرية المثبتة أو المنفية.\n3) Question mark (?): نهاية السؤال الذي يبدأ بـ Wh- أو فعل مساعد.",
        detailedContent: [
          "سؤال التنقيط (Punctuation) هو سؤال مضمون في الامتحان (5 إلى 10 درجات).",
          "تبدأ الجملة دائماً بحرف كبير Capital Letter وتنتهي بنقطة إذا كانت خبراً، أو علامة استفهام إذا كانت سؤالاً.",
          "تُكتب أسماء اللغات والجنسيات بحرف كبير: Arabic, English, Iraqi, French."
        ],
        teacherNotes: [
          "احرص على كتابة الضمير I كبيراً أينما وجد في الجملة سواء في البداية أو الوسط.",
          "تذكر وضع الفاصلة العليا في الاختصارات: don't, can't, isn't."
        ],
        examples: [
          {
            en: "Ali and Mona went to Erbil last Monday.",
            ar: "ذهب علي ومنى إلى أربيل يوم الاثنين الماضي.",
            highlight: "Ali / Mona / Erbil / Monday",
            note: "أسماء أعلام ومدن وأيام بحرف كبير"
          }
        ],
        exercises: [
          {
            id: "2u1-ex7",
            question: "Re-punctuate correctly: are you going to basra next friday ali",
            options: [
              "Are you going to Basra next Friday, Ali?",
              "are you going to basra next friday, ali.",
              "Are you going to basra next Friday ali?",
              "Are You Going To Basra Next Friday Ali"
            ],
            correctAnswer: "Are you going to Basra next Friday, Ali?",
            explanation: "حرف كبير في البداية Are، وبصرة Basra، والجمعة Friday، وفاصلة قبل المنادى Ali، وعلامة استفهام في النهاية.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // UNIT 2: Keep Fit & Nutrition
  // -------------------------------------------------------------------------
  {
    id: 22,
    number: 2,
    titleAr: "الوحدة الثانية: الصحة واللياقة البدنية (Unit 2: Keep Fit & Nutrition)",
    titleEn: "Unit 2: Nutrition, Health Advice & Quantifiers",
    description: "معتمد من كتاب الطالب (SB ص 16-27) وكتاب النشاط (AB ص 19-33): التغذية السليمة، اللياقة البدنية، محددات الكمية (too much / too many / a few / a little)، وأمراض وآلام الجسم (headache, stomach ache).",
    accentColor: "from-teal-600 to-emerald-600",
    bgGradient: "bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200",
    lessons: [
      {
        id: "2nd-u2-l1",
        unitId: 22,
        lessonNumber: 1,
        titleAr: "الدرس الأول: التغذية الصحية ومحددات الكمية (Quantifiers & Healthy Food)",
        titleEn: "Lesson 1: Eating the Right Food & Quantifiers",
        category: "grammar",
        summary: "كتاب الطالب ص 16-17 وكتاب النشاط ص 19-22: نصائح التغذية السليمة واستخدام محددات الكميات للأسماء المعدودة وغير المعدودة (too much, too many, a few, a little).",
        grammarRuleFormula: "1) Countable Plural Nouns (معدود جمع):\n   - too many (أكثر مما ينبغي بكثير)\n   - a few (عدد قليل كافٍ)\n   أمثلة: apples, crisps, sweets, biscuits\n2) Uncountable Nouns (غير معدود مفرد):\n   - too much (كمية كبيرة أكثر من اللازم)\n   - a little (كمية قليلة كافية)\n   أمثلة: sugar, salt, fat, water, tea",
        detailedContent: [
          "كتاب الطالب ص 16: تقرير الممرضة فوزية (Nurse Fawzia's talk) في المدرسة حول الطعام الصحي وغير الصحي.",
          "الأطعمة المفيدة للجسم: Fruit and vegetables (فواكه وخضار), plenty of water (ماء وفير), fish, grilled meat.",
          "الأطعمة التي يجب التقليل منها لأنها تضر الصحة: Crisps (رقائق البطاطا), sweets (حلويات), fat (دهون), salt (ملح), sugar (سكر).",
          "القاعدة الدقيقة: نستخدم too many و a few مع الأسماء التي تنتهي بـ s الجمع المعدودة. ونستخدم too much و a little مع الأسماء غير المعدودة التي لا تجمع."
        ],
        teacherNotes: [
          "ملاحظة مفتاحية: إذا وجدت كلمة تنتهي بـ s بعد الفراغ (مثل sweets / cakes) اختر (too many) أو (a few).",
          "إذا لم تنتهِ الكلمة بـ s وكانت مادة لا تُعد (مثل sugar / fat / money) اختر (too much) أو (a little)."
        ],
        commonMistakes: [
          "كتابة too much crisps (خطأ، الصحيح too many crisps لأنها معدودة).",
          "كتابة too many salt (خطأ، الملح غير معدود فنقول too much salt)."
        ],
        examples: [
          {
            en: "Eating too much fat and sugar makes people unhealthy and overweight.",
            ar: "تناول الكثير جداً من الدهون والسكر يجعل الناس غير أصحاء وذوي وزن زائد.",
            highlight: "too much fat and sugar",
            note: "غير معدود + too much"
          },
          {
            en: "You can eat a few biscuits, but don't eat too many sweets.",
            ar: "يمكنك أكل القليل من البسكويت، لكن لا تأكل الكثير من الحلوى.",
            highlight: "a few biscuits / too many sweets",
            note: "معدود جمع + a few / too many"
          }
        ],
        exercises: [
          {
            id: "2u2-ex1",
            question: "There is ______ (too much / too many) sugar in this tea; I can't drink it.",
            options: ["too much", "too many", "a few", "many"],
            correctAnswer: "too much",
            explanation: "كلمة sugar غير معدودة، لذا نستخدم معها too much.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 20"
          },
          {
            id: "2u2-ex2",
            question: "You should only eat ______ (a few / a little) crisps because they have too much salt.",
            options: ["a few", "a little", "too much", "much"],
            correctAnswer: "a few",
            explanation: "كلمة crisps اسم معدود جمع (تنتهي بـ s)، فنستخدم a few.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          }
        ]
      },
      {
        id: "2nd-u2-l2",
        unitId: 22,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: المحافظة على اللياقة وظروف التكرار (Keep Fit & Frequency)",
        titleEn: "Lesson 2: Keep Fit & Adverbs of Frequency",
        category: "grammar",
        summary: "كتاب الطالب ص 18-20 وكتاب النشاط ص 23-26: أهمية الرياضة والتمرين البدني، وموقع ظروف التكرار (always, usually, often, sometimes, never) في الجملة.",
        grammarRuleFormula: "Adverbs of Frequency Word Order:\n1) Before the main verb (قبل الفعل الرئيسي):\n   Subject + Adverb + Verb -> Ali always walks to school.\n2) After verb to be (بعد أفعال be: am, is, are):\n   Subject + (am/is/are) + Adverb -> He is never late.",
        detailedContent: [
          "كتاب الطالب ص 18: اللياقة البدنية (Fitness) ضرورية جداً؛ الأشخاص غير اللائقين بدنياً (unfit people) يتعبون بسرعة ولا يستطيعون صعود الدرج بسهولة أو الجري.",
          "يجب على المراهقين ممارسة الرياضة لـ 20 دقيقة على الأقل ثلاث مرات أسبوعياً.",
          "ظروف التكرار: Always (100%), Usually (80%), Often (60%), Sometimes (40%), Never (0%)."
        ],
        teacherNotes: [
          "موقع ظرف التكرار قاعدة ثابتة لا تتغير: يأتي قبل الفعل العادي (always exercises) ولكن بعد الفعل المساعد be (is always)."
        ],
        commonMistakes: [
          "كتابة He is late never (خطأ؛ الصحيح He is never late).",
          "كتابة He plays always (خطأ؛ الصحيح He always plays)."
        ],
        examples: [
          {
            en: "Unfit people get tired very quickly when they run.",
            ar: "الأشخاص غير اللائقين بدنياً يتعبون بسرعة فائقة عندما يركضون.",
            highlight: "get tired quickly",
            note: "نتيجة عدم اللياقة البدنية"
          },
          {
            en: "She always drinks plenty of water before exercising.",
            ar: "هي دائماً تشرب ماءً وفيراً قبل ممارسة الرياضة.",
            highlight: "always drinks",
            note: "ظرف التكرار قبل الفعل الرئيسي"
          }
        ],
        exercises: [
          {
            id: "2u2-ex3",
            question: "Ahmed is ______ (never / ever / always never) late for his morning classes.",
            options: ["never", "ever", "always never", "not never"],
            correctAnswer: "never",
            explanation: "يأتي ظرف التكرار never بعد فعل الكينونة is.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 24"
          }
        ]
      },
      {
        id: "2nd-u2-l3",
        unitId: 22,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: آلام الجسم والأمراض الشائعة (Illnesses & Aches)",
        titleEn: "Lesson 3: Common Aches, Pains & What's the Matter?",
        category: "vocabulary",
        summary: "كتاب الطالب ص 21-23 وكتاب النشاط ص 27-29: السؤال عن الحالة الصحية والتعبير عن الآلام (headache, stomach ache, earache, toothache, sore throat) واستخدام have got.",
        grammarRuleFormula: "Asking about health:\n- What's the matter? (ما بك؟ ما الأمر؟)\nExpressing pain:\n- I have got a headache / stomach ache / toothache / cold / cough / temperature.\n- My shoulder / knee hurts.",
        detailedContent: [
          "اللاحقة (-ache) تعني ألم مستمر: head + ache = headache (صداع), tooth + ache = toothache (ألم أسنان), stomach + ache = stomach ache (مغص).",
          "كلمة sore تعني ملتهب أو متقرح: a sore throat (احتقان البلعوم), sore eyes (التهاب العينين).",
          "الفعل hurt يعني يؤلم: My ankle hurts (كاحلي يؤلمني)."
        ],
        teacherNotes: [
          "احفظ تركيب السؤال الرسمي: 'What's the matter?' والإجابة تكون بـ 'I've got a...'",
          "في الإملاء، انتبه لكتابة كلمة stomach ache بحرفين ch ينطقان k."
        ],
        examples: [
          {
            en: "What's the matter with Huda? - She has got a bad earache.",
            ar: "ما بال هدى؟ - إنها تعاني من ألم حاد في الأذن.",
            highlight: "has got an earache",
            note: "التعبير عن الألم العضوي"
          }
        ],
        exercises: [
          {
            id: "2u2-ex4",
            question: "If you have a ______ (headache / toothache / stomach ache), you should go to the dentist.",
            options: ["toothache", "headache", "stomach ache", "sore throat"],
            correctAnswer: "toothache",
            explanation: "الذهاب إلى طبيب الأسنان (dentist) يكون عند وجود ألم أسنان (toothache).",
            type: "mcq",
            ministerialYear: "كتاب الطالب ص 22"
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // UNIT 3: Sports & Adverbs
  // -------------------------------------------------------------------------
  {
    id: 23,
    number: 3,
    titleAr: "الوحدة الثالثة: الرياضة والألعاب (Unit 3: Sports & Adverbs)",
    titleEn: "Unit 3: Sports Centre, Play/Do/Go & Adverbs of Manner",
    description: "معتمد من كتاب الطالب (SB ص 28-39) وكتاب النشاط (AB ص 34-51): ألعاب المركز الرياضي، أفعال الألعاب (Play / Do / Go)، صياغة ظروف الحال بـ -ly والظروف الشاذة والمقارنة.",
    accentColor: "from-sky-600 to-indigo-600",
    bgGradient: "bg-gradient-to-r from-sky-50 to-indigo-50 border-sky-200",
    lessons: [
      {
        id: "2nd-u3-l1",
        unitId: 23,
        lessonNumber: 1,
        titleAr: "الدرس الأول: أفعال الألعاب الرياضية (Play, Do, Go with Sports)",
        titleEn: "Lesson 1: The Sports Centre & Categorizing Sports",
        category: "vocabulary",
        summary: "كتاب الطالب ص 28-31 وكتاب النشاط ص 34-38: القاعدة المنهجية لتوزيع أفعال الرياضة الثلاثة (play للألعاب الجماعية والكرات، go للأنشطة المنتهية بـ ing، و do للرياضات الفردية والدفاعية).",
        grammarRuleFormula: "1) PLAY + Ball games & competitive sports:\n   - play football, play tennis, play basketball, play volleyball\n2) GO + Sports ending in -ing (except boxing):\n   - go swimming, go running, go horse riding, go sailing\n3) DO + Martial arts & individual exercises:\n   - do judo, do karate, do gymnastics, do athletics, do boxing",
        detailedContent: [
          "كتاب الطالب ص 28: إعلان المركز الرياضي الأشرفي (The Sports Centre) وجدول مواعيد التدريب للمبتدئين والمتقدمين.",
          "قاعدة الأفعال الثلاثة للتصنيف الرياضي:",
          "- نستخدم Play حصرياً مع أي رياضة تستخدم فيها كرة أو منافسة جماعية رسمية (football, volleyball, chess, badminton).",
          "- نستخدم Go مع أي رياضة تنتهي بـ ing وتتضمن حركة وانتقالاً (swimming, sailing, fishing, cycling).",
          "- نستخدم Do مع الألعاب القتالية الفردية أو التمارين التي لا تستخدم كرة (judo, karate, gymnastics, athletics)."
        ],
        teacherNotes: [
          "استثناء هام جداً في الامتحانات: كلمة boxing تنتهي بـ ing لكنها تأخذ Do (do boxing) لأنها رياضة قتالية دفاعية وليست نزهة!",
          "احفظ تصريف الفعل: I played / I went swimming / I did karate."
        ],
        commonMistakes: [
          "كتابة I play swimming (خطأ؛ الصحيح I go swimming).",
          "كتابة I go karate (خطأ؛ الصحيح I do karate)."
        ],
        examples: [
          {
            en: "We went swimming in the new Olympic pool yesterday.",
            ar: "ذهبنا للسباحة في المسبح الأولمبي الجديد أمس.",
            highlight: "went swimming",
            note: "ماضي go + swimming"
          },
          {
            en: "Samer does judo twice a week at the community club.",
            ar: "سامر يمارس رياضة الجودو مرتين في الأسبوع في نادي الحي.",
            highlight: "does judo",
            note: "do + رياضة قتالية"
          }
        ],
        exercises: [
          {
            id: "2u3-ex1",
            question: "My brother wants to ______ (play / do / go) judo this summer.",
            options: ["do", "play", "go", "make"],
            correctAnswer: "do",
            explanation: "رياضة الجودو (judo) لعبة دفاعية فردية فتأخذ الفعل do.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 36"
          },
          {
            id: "2u3-ex2",
            question: "Every Friday, we ______ (go / play / do) fishing at the river.",
            options: ["go", "play", "do", "take"],
            correctAnswer: "go",
            explanation: "صيد الأسماك (fishing) ينتهي بـ ing فيأخذ الفعل go.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الأول"
          }
        ]
      },
      {
        id: "2nd-u3-l2",
        unitId: 23,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: صياغة ظروف الحال والظروف الشاذة (Adverbs of Manner)",
        titleEn: "Lesson 2: Adverbs of Manner (-ly & Irregular Forms)",
        category: "grammar",
        summary: "كتاب الطالب ص 32-35 وكتاب النشاط ص 39-44: تحويل الصفات إلى ظروف حال بإضافة -ly لوصف الأفعال، وحفظ الظروف الشاذة مثل (good -> well, fast -> fast, hard -> hard).",
        grammarRuleFormula: "Adjective + ly -> Adverb of Manner:\n- slow -> slowly\n- quiet -> quietly\n- quick -> quickly\n- easy -> easily (y turns to i + ly)\n- happy -> happily\n\nIrregular Adverbs (الظروف الشاذة):\n- good -> well\n- fast -> fast\n- hard -> hard",
        detailedContent: [
          "الصفة (Adjective) تصف الاسم وتأتي قبله أو بعد فعل الكينونة: He is a careful driver.",
          "الظرف (Adverb) يصف الفعل ويبين كيفية حدوثه ويأتي بعد الفعل أو بعد المفعول به: He drives carefully.",
          "قواعد الإملاء في إضافة ly: إذا انتهت الصفة بحرف y مسبوق بصحيح تقلب إلى i ثم ly: heavy -> heavily, noisy -> noisily.",
          "الظروف الشاذة لا تقبل ly مطلقاً: (fast -> fast) و (hard -> hard) و (good -> well)."
        ],
        teacherNotes: [
          "أهم قاعدة في امتحانات الثاني المتوسط: كلمة good تتحول إلى well عند وصف فعل، مثل: He speaks English well.",
          "كلمة fast لا تتغير أبداً؛ لا وجود لكلمة fastly في اللغة الإنكليزية إطلاقاً!"
        ],
        commonMistakes: [
          "كتابة He plays football good (خطأ شنيع؛ الصحيح He plays football well).",
          "كتابة fastly (خطأ؛ الصحيح fast)."
        ],
        examples: [
          {
            en: "Mona sings beautifully and plays the piano well.",
            ar: "تغني منى بجمال وتعزف على البيانو بإتقان/بشكل جيد.",
            highlight: "beautifully / well",
            note: "ظروف حال تصف أفعال الغناء والعزف"
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
  // UNIT 4: First Term Consolidation & Revision (Revision 1)
  // -------------------------------------------------------------------------
  {
    id: 24,
    number: 4,
    titleAr: "الوحدة الرابعة: المراجعة الشاملة للكورس الأول (Unit 4: Revision 1)",
    titleEn: "Unit 4: First Term Consolidation, Reading & Midterm Prep",
    description: "كتاب الطالب ص 40-47 وكتاب النشاط ص 52-63: المراجعة الشاملة لقواعد ووظائف الكورس الأول (الوحدات 1-3): نصائح should/shouldn't، صيغ الاقتراح، إس التملك، ظروف الحال -ly والشاذة، أفعال الرغبة، وقصة بوب وباسم في المخيم الكشفي.",
    accentColor: "from-amber-600 to-orange-600",
    bgGradient: "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200",
    lessons: [
      {
        id: "2nd-u4-l1",
        unitId: 24,
        lessonNumber: 1,
        titleAr: "الدرس الأول: التجميع القواعدي الشامل للكورس الأول (Grammar Consolidation)",
        titleEn: "Lesson 1: Consolidation of Units 1-3 Grammar & Functions",
        category: "grammar",
        summary: "مراجعة مقارنة بين جميع قواعد الكورس الأول: إس التملك ('s / s')، صيغ الاقتراح الثلاث، إعطاء النصيحة بـ should، ومحددات الكمية (too much / too many)، وأفعال الرياضات (Play / Do / Go).",
        grammarRuleFormula: "Grammar Master Key (مفاتيح الحل):\n- Suggestions: Why not...? / Shall we...? / Let's...\n- Advice: Subject + should / shouldn't + base verb\n- Quantifiers: too much + uncount | too many + count plural\n- Sports: Play (ball), Go (-ing), Do (martial arts)\n- Adverbs: adj + ly | good -> well, fast -> fast",
        detailedContent: [
          "تجميع شامل لجميع القواعد التي ترد في امتحان نصف السنة الرسمي لوزارة التربية العراقية.",
          "طريقة تمييز صيغة الاقتراح من صيغة النصيحة في ورقة الأسئلة.",
          "جدول مقارنة سريع بين التملك المفرد والجمع لتفادي فقدان درجات الإملاء والتنقيط.",
          "تطبيقات وتمارين مجمعة من كتاب النشاط ص 52-58."
        ],
        teacherNotes: [
          "نصيحة الأستاذ مصطفى تركي: راجع هذا الدرس ليلة امتحان نصف السنة، فهو يلخص 80% من أسئلة القواعد المحتملة.",
          "تأكد دائماً أن الأفعال بعد should و shouldn't و Let's تأتي مجردة من أي زيادة."
        ],
        commonMistakes: [
          "الخلط بين Why not (التي تنتهي بعلامة استفهام) و Let's (التي تنتهي بنقطة).",
          "استخدام too many مع أسماء غير معدودة مثل salt أو fat."
        ],
        examples: [
          {
            en: "You shouldn't eat too many sweets because they harm your teeth.",
            ar: "لا ينبغي أن تأكل الكثير من الحلوى لأنها تضر أسنانك.",
            highlight: "shouldn't eat / too many sweets",
            note: "دمج بين قاعدة النصيحة ومحددات الكمية المعدودة"
          }
        ],
        exercises: [
          {
            id: "2u4-ex1",
            question: "Why not ______ (come / coming / to come) to the sports centre with us?",
            options: ["come", "coming", "to come", "came"],
            correctAnswer: "come",
            explanation: "بعد صيغة الاقتراح Why not نضع دائماً فعلاً مجرداً.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          },
          {
            id: "2u4-ex2",
            question: "My father drives ______ (careful / carefully / care) on wet roads.",
            options: ["carefully", "careful", "cared", "care"],
            correctAnswer: "carefully",
            explanation: "الفعل drives يحتاج إلى ظرف حال (carefully) لوصف طريقة القيادة.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 55"
          }
        ]
      },
      {
        id: "2nd-u4-l2",
        unitId: 24,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: بنك المفردات والاستيعاب للكورس الأول (Vocabulary & Reading Dossier)",
        titleEn: "Lesson 2: Units 1-3 Vocabulary, Collocations & Reading",
        category: "vocabulary",
        summary: "كتاب الطالب ص 42-45 وكتاب النشاط ص 56-60: مراجعة مفردات مجلة المدرسة، مصطلحات الصحة والتغذية واللياقة، وأسماء الرياضات والمعدات، وتدريبات الإسقاطات والتوصيل.",
        grammarRuleFormula: "Key Collocations (متلازمات وزارية):\n- print a magazine (يطبع مجلة)\n- conduct an interview (يجري مقابلة)\n- keep fit (يحافظ على لياقته)\n- get out of breath (ينقطع نفسه من التعب)\n- take up a sport (يبدأ بممارسة رياضة)",
        detailedContent: [
          "مراجعة شاملة لجميع الكلمات الوزارية التي تأتي في سؤال الإسقاطات (Fill in the blanks).",
          "مفردات الصحة: headache, fitness, overweight, energy, vitamins, diet.",
          "مفردات الرياضة: gymnastics, volleyball, court, pitch, champion, medal.",
          "أهمية التدرب على حل قطع الفهم والاستيعاب الخارجية ونصوص الكورس الأول."
        ],
        teacherNotes: [
          "احفظ معاني الكلمات جيداً لأن سؤال المفردات يمثل 20 درجة كاملة من ورقة الامتحان."
        ],
        examples: [
          {
            en: "He was out of breath after climbing the stairs because he is unfit.",
            ar: "انقطع نفسه بعد صعود الدرج لأنه غير لائق بدنياً.",
            highlight: "out of breath / unfit",
            note: "متلازمات الصحة واللياقة"
          }
        ],
        exercises: [
          {
            id: "2u4-ex3",
            question: "A person who is not fit gets ______ (tired / happy / excited) very quickly.",
            options: ["tired", "happy", "excited", "strong"],
            correctAnswer: "tired",
            explanation: "الشخص غير اللائق بدنياً يتعب (tired) بسرعة كبيرة.",
            type: "mcq",
            ministerialYear: "كتاب الطالب ص 44"
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
          "في العالم العربي القديم، اعتاد الناس ركوب الخيل لساعات لنقل الرسائل وكان يُطلق على هذه الخدمة اسم 'البريد' (Al-Bareed).",
          "استخدم الناس المنارات (Lighthouses) لتحذير السفن من الصخور وتوجيهها نحو الموانئ.",
          "استخدم الهنود الحمر إشارات الدخان (Smoke signals) لإرسال رسائل قصيرة عبر مسافات بعيدة.",
          "اعتاد الحمام الزاجل (Pigeons) الطيران من مصر وسوريا إلى بغداد حاملاً رسائل مربوطة بأرجله لأن الحمام يمتلك غريزة العودة لموطنه دائماً."
        ],
        teacherNotes: [
          "سؤال استيعابي وزاري متكرر: Why were pigeons used to send messages? الجواب: Because they could fly from Egypt to Syria without getting lost.",
          "سؤال: What did lighthouses do? الجواب: They warned ships of danger."
        ],
        commonMistakes: [
          "الخلط بين استخدام إشارات الدخان (للرسائل التحذيرية) والمنارات (للسفن البحرية)."
        ],
        examples: [
          {
            en: "Pigeons were trained to carry messages from Syria to Cairo and Baghdad.",
            ar: "دُرِّب الحمام لنقل الرسائل من سوريا إلى القاهرة وبغداد.",
            highlight: "Pigeons were trained",
            note: "مبني للمجهول في الماضي لوصف حقائق تاريخية"
          }
        ],
        exercises: [
          {
            id: "2u5-ex1",
            question: "In the past, ______ (pigeons / cars / phones) were used to carry messages across long distances.",
            options: ["pigeons", "cars", "phones", "radios"],
            correctAnswer: "pigeons",
            explanation: "الحمام الزاجل كان الوسيلة المستخدمة في نقل الرسائل قديماً.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 65"
          }
        ]
      },
      {
        id: "2nd-u5-l2",
        unitId: 25,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: المبني للمجهول البسيط (Present & Past Passive Voice)",
        titleEn: "Lesson 2: Passive Voice in Present & Past",
        category: "grammar",
        summary: "كتاب الطالب ص 50-53 وكتاب النشاط ص 68-73: تحويل الجمل إلى المبني للمجهول في المضارع البسيط والماضي البسيط للتركيز على الحدث لا الفاعل.",
        grammarRuleFormula: "1) Present Simple Passive (المضارع البسيط للمجهول):\n   Object + (is / are) + Past Participle (P.P.)\n   - Mobile phones are used every day.\n2) Past Simple Passive (الماضي البسيط للمجهول):\n   Object + (was / were) + Past Participle (P.P.)\n   - The television was invented in the 20th century.",
        detailedContent: [
          "نستخدم المبني للمجهول عندما يكون الفعل أهم من الفاعل، أو عندما يكون الفاعل مجهولاً أو بديهياً.",
          "خطوات التحويل: 1) نحذف الفاعل. 2) نقدم المفعول به في البداية. 3) نضع فعل كينونة مناسباً للزمن والمفعول به (is/are للمضارع و was/were للماضي). 4) نحول الفعل الرئيسي إلى التصريف الثالث P.P.",
          "إذا كان المفعول به مفرداً نستخدم is أو was، وإذا كان جمعاً نستخدم are أو were."
        ],
        teacherNotes: [
          "القاعدة الذهبية: بعد is / are / was / were في جمل المبني للمجهول، يجب أن تختار دائماً التصريف الثالث للفعل (P.P.).",
          "احفظ تصاريف الأفعال الشاذة الشائعة: make -> made, send -> sent, write -> written, speak -> spoken, invent -> invented."
        ],
        commonMistakes: [
          "استخدام الفعل المجرد بدلاً من التصريف الثالث: English is speak (خطأ فادح؛ الصحيح English is spoken).",
          "استخدام was مع مفعول به جمع: Messages was sent (خطأ؛ الصحيح Messages were sent)."
        ],
        examples: [
          {
            en: "An article is written in Cairo and sent to Baghdad for printing.",
            ar: "تُكتب المقالة في القاهرة وتُرسل إلى بغداد للطباعة.",
            highlight: "is written / [is] sent",
            note: "مبني للمجهول مضارع مفرد + P.P."
          },
          {
            en: "The first telephone was invented by Alexander Graham Bell.",
            ar: "تم اختراع أول هاتف بواسطة ألكسندر غراهام بيل.",
            highlight: "was invented",
            note: "مبني للمجهول ماضي مفرد"
          }
        ],
        exercises: [
          {
            id: "2u5-ex2",
            question: "Thousands of text messages ______ (are sent / are send / send) every minute.",
            options: ["are sent", "are send", "send", "is sent"],
            correctAnswer: "are sent",
            explanation: "الرسائل جمع (messages) في المضارع فتأخذ are مع التصريف الثالث sent.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 70"
          },
          {
            id: "2u5-ex3",
            question: "Radio signals ______ (were discovered / was discovered / discovered) in the past century.",
            options: ["were discovered", "was discovered", "discovered", "are discover"],
            correctAnswer: "were discovered",
            explanation: "الفاعل المفعول جمع (Radio signals) والزمن ماضي فيأخذ were discovered.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الثاني"
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // UNIT 6: Careers & Future Plans
  // -------------------------------------------------------------------------
  {
    id: 26,
    number: 6,
    titleAr: "الوحدة السادسة: المهن والخطط المستقبلية (Unit 6: Careers & Future)",
    titleEn: "Unit 6: Jobs, Future Plans & Relative Clauses",
    description: "معتمد من كتاب الطالب (SB ص 60-71) وكتاب النشاط (AB ص 79-93): المهن والوظائف، الخطط المستقبلية بـ (going to مقابل will)، وضمائر الوصل (who / which).",
    accentColor: "from-purple-600 to-indigo-600",
    bgGradient: "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200",
    lessons: [
      {
        id: "2nd-u6-l1",
        unitId: 26,
        lessonNumber: 1,
        titleAr: "الدرس الأول: الوظائف والمهن وتعريفها (Jobs & Occupations)",
        titleEn: "Lesson 1: What Do They Do? Defining Careers",
        category: "vocabulary",
        summary: "كتاب الطالب ص 60-63 وكتاب النشاط ص 79-83: أسماء المهن (architect, pilot, mechanic, surgeon, firefighter) وتعريف ما يقوم به كل مهني باستخدام صيغة who.",
        grammarRuleFormula: "Defining Jobs Formula:\nAn / A + Job Title + is someone who + Present Simple Verb...\nأمثلة:\n- An architect is someone who designs buildings.\n- A pilot is someone who flies aeroplanes.\n- A mechanic is someone who repairs cars in a garage.",
        detailedContent: [
          "كتاب الطالب ص 60: استعراض وظائف متنوعة ومتطلبات كل مهنة:",
          "- Doctor / Surgeon (طبيب جراح): treats sick people and operates on them in hospital.",
          "- Firefighter (إطفائي): puts out dangerous fires and rescues trapped people.",
          "- Journalist (صحفي): writes reports and articles for newspapers and websites.",
          "- Architect (مهندس معماري): designs houses and modern buildings.",
          "- Vet (طبيب بيطري): takes care of sick animals."
        ],
        teacherNotes: [
          "سؤال مضمون في الامتحانات: 'Define a pilot' -> الجواب: 'A pilot is someone who flies planes.'",
          "انتبه لأدوات النكرة: an architect (تبدأ بعلة) مقابل a doctor (تبدأ بصحيح)."
        ],
        commonMistakes: [
          "نسيان s الشخص الثالث في الفعل بعد who: A vet is someone who treat (خطأ؛ الصحيح treats).",
          "كتابة a architect (خطأ؛ الصحيح an architect)."
        ],
        examples: [
          {
            en: "An architect is someone who designs beautiful modern houses.",
            ar: "المهندس المعماري هو شخص يصمم منازل عصرية جميلة.",
            highlight: "is someone who designs",
            note: "صيغة تعريف المهنة القياسية"
          }
        ],
        exercises: [
          {
            id: "2u6-ex1",
            question: "A ______ (mechanic / pilot / teacher) is someone who repairs broken cars in a garage.",
            options: ["mechanic", "pilot", "teacher", "doctor"],
            correctAnswer: "mechanic",
            explanation: "الميكانيكي (mechanic) هو الذي يصلح السيارات في ورشة التصليح.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 81"
          }
        ]
      },
      {
        id: "2nd-u6-l2",
        unitId: 26,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: التعبير عن المستقبل والخطط (Future with 'Going to')",
        titleEn: "Lesson 2: Future Plans with Be Going To & Relative Pronouns",
        category: "grammar",
        summary: "كتاب الطالب ص 64-67 وكتاب النشاط ص 84-88: استخدام صيغة (am/is/are + going to + verb) للتعبير عن النوايا والخطط المستقبلية المؤكدة، وضمائر الوصل (who للعاقل و which لغير العاقل).",
        grammarRuleFormula: "1) Future Intentions & Plans (الخطط المستقبلية):\n   Subject + (am / is / are) + going to + Base Verb\n   - I am going to study medicine at university.\n   - He is going to be a pilot.\n\n2) Relative Pronouns (ضمائر الوصل):\n   - Who -> للأشخاص العاقلين (The boy who won the race...)\n   - Which / That -> للأشياء والحيوانات (The car which he bought...)",
        detailedContent: [
          "نستخدم صيغة be going to عندما نكون قد خططنا وقررنا مسبقاً القيام بعمل ما في المستقبل.",
          "في حالة النفي: Subject + (am not / isn't / aren't) + going to + Base Verb.",
          "في حالة السؤال: (Am / Is / Are) + Subject + going to + Base Verb...?",
          "ضمير الوصل Who يربط جملتين تتحدثان عن شخص عاقل (That is the teacher who helped me).",
          "ضمير الوصل Which أو That يربط جملتين تتحدثان عن جماد أو حيوان (I love the book which explains history)."
        ],
        teacherNotes: [
          "الفرق بين will و going to: نستخدم going to إذا كانت هناك خطة مسبقة أو نية مؤكدة (plan / intention)، ونستخدم will للقرارات السريعة أو التوقعات العامة.",
          "بعد going to يأتي دائماً مصدر مجرد: going to study."
        ],
        commonMistakes: [
          "نسيان فعل الكينونة: I going to visit (خطأ فادح؛ الصحيح I am going to visit).",
          "استخدام which مع شخص عاقل: The doctor which (خطأ؛ الصحيح The doctor who)."
        ],
        examples: [
          {
            en: "Mona is going to study architecture when she leaves school.",
            ar: "منى تنوي دراسة الهندسة المعمارية عندما تنهي المدرسة.",
            highlight: "is going to study",
            note: "خطة مستقبلية محددة"
          },
          {
            en: "This is the courageous firefighter who saved the family from the blaze.",
            ar: "هذا هو الإطفائي الشجاع الذي أنقذ العائلة من الحريق.",
            highlight: "who saved",
            note: "ضمير وصل يعود على عاقل"
          }
        ],
        exercises: [
          {
            id: "2u6-ex2",
            question: "Zaid ______ (is going to / will be / going) travel to London next summer; he bought the tickets.",
            options: ["is going to", "will be", "going", "goes to"],
            correctAnswer: "is going to",
            explanation: "شراء التذاكر يدل على خطة وترتيب مسبق مؤكد فنستخدم is going to.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 85"
          },
          {
            id: "2u6-ex3",
            question: "I met the doctor ______ (who / which / where) treated my grandfather.",
            options: ["who", "which", "where", "whose"],
            correctAnswer: "who",
            explanation: "الطبيب (doctor) شخص عاقل لذا نستخدم ضمير الوصل who.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // UNIT 7: The World Around Us & The Environment
  // -------------------------------------------------------------------------
  {
    id: 27,
    number: 7,
    titleAr: "الوحدة السابعة: العالم من حولنا والبيئة (Unit 7: The World Around Us)",
    titleEn: "Unit 7: Endangered Wildlife & Modal Passive",
    description: "معتمد من كتاب الطالب (SB ص 72-83) وكتاب النشاط (AB ص 94-108): الحيوانات المهددة بالانقراض (snow leopard, blue whale, oryx)، المبني للمجهول مع الأفعال المساعدة (can be saved)، وحماية البيئة والتلوث.",
    accentColor: "from-emerald-600 to-teal-600",
    bgGradient: "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200",
    lessons: [
      {
        id: "2nd-u7-l1",
        unitId: 27,
        lessonNumber: 1,
        titleAr: "الدرس الأول: الحيوانات المهددة بالانقراض (Animals in Danger)",
        titleEn: "Lesson 1: Endangered Species & Environmental Threats",
        category: "reading",
        summary: "كتاب الطالب ص 72-75 وكتاب النشاط ص 94-98: استيعاب أسباب تعرض الحيوانات للانقراض (الصيد الجائر، تدمير البيئة، والتلوث) ونماذج كالمها العربي ونمر الثلوج والحوت الأزرق.",
        grammarRuleFormula: "Key Vocabulary:\n- Endangered (مهدد بالانقراض)\n- Habitat (الموطن الطبيعي للحيوان)\n- Hunting (الصيد الجائر)\n- Pollution (التلوث البيئي)\n- Extinct (منقرض تماماً)",
        detailedContent: [
          "كتاب الطالب ص 72: حيوانات في خطر داهم (Animals in Danger):",
          "1. النمر الثلجي (Snow Leopard): يعيش في جبال آسيا الوسطى ويصطاده الناس من أجل فرائه الجميل الثمين.",
          "2. المها العربي (Arabian Oryx): حيوان صحراوي جميل كان قريباً من الانقراض بسبب الصيد بالبنادق والسيارات ولكن تم حمايته في محميات.",
          "3. الحوت الأزرق (Blue Whale): أكبر مخلوق على وجه الأرض تعرض للصيد من أجل استخراج الزيت.",
          "أسباب انقراض الحيوانات الثلاثة الرئيسية: Loss of habitat (فقدان الموطن), hunting for fur/horns (الصيد), and pollution (التلوث)."
        ],
        teacherNotes: [
          "سؤال متكرر: Why are snow leopards hunted? الجواب: For their fur.",
          "سؤال: Why was the Arabian oryx in danger? الجواب: Because people hunted them with modern guns and cars."
        ],
        examples: [
          {
            en: "Many rare animals are in danger of extinction because people destroy their natural habitats.",
            ar: "العديد من الحيوانات النادرة معرضة لخطر الانقراض لأن الناس يدمرون مواطنها الطبيعية.",
            highlight: "danger of extinction / habitats",
            note: "مفردات البيئة الاستيعابية"
          }
        ],
        exercises: [
          {
            id: "2u7-ex1",
            question: "The snow leopard is hunted mainly for its ______ (fur / horns / meat).",
            options: ["fur", "horns", "meat", "teeth"],
            correctAnswer: "fur",
            explanation: "يصطاد نمر الثلوج للحصول على فرائه (fur) السميك والجميل.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 96"
          }
        ]
      },
      {
        id: "2nd-u7-l2",
        unitId: 27,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: المبني للمجهول مع الأفعال الناقصة (Modal Passive: Can be / Must be)",
        titleEn: "Lesson 2: Passive Voice with Modals (Can / Must be + P.P.)",
        category: "grammar",
        summary: "كتاب الطالب ص 76-79 وكتاب النشاط ص 99-103: صياغة المبني للمجهول مع can و must و should لحماية الحيوانات والحفاظ على النظافة والبيئة.",
        grammarRuleFormula: "Modal Passive Formula:\nObject + (can / must / should) + be + Past Participle (P.P.)\nأمثلة:\n- Wild animals can be protected in nature reserves.\n- Litter must not be thrown in rivers.\n- Rare plants should be saved.",
        detailedContent: [
          "عند استخدام الأفعال الناقصة في المبني للمجهول نتبع دائماً النمط: (الأداة + be + التصريف الثالث P.P.).",
          "الأداة can be تعني إمكانية فعل الشيء (Rare animals can be saved).",
          "الأداة must be تعني الوجوب والضرورة الحتمية (Our environment must be cleaned).",
          "الأداة should be تعني النصيحة الأخلاقية والبيئية (Rubbish should be recycled)."
        ],
        teacherNotes: [
          "تنبيه امتحاني دقيق: انتبه لكلمة be، فهي لازمة ولا بد منها بعد can أو must في المجهول: (can be saved) وليس (can saved).",
          "تأكد دائماً أن الفعل الأخير هو تصريف ثالث P.P."
        ],
        commonMistakes: [
          "نسيان كلمة be: It can seen (خطأ؛ الصحيح It can be seen).",
          "استخدام فعل مجرد بعد be: must be protect (خطأ؛ الصحيح must be protected)."
        ],
        examples: [
          {
            en: "Endangered species can be saved if we protect their forests.",
            ar: "يمكن إنقاذ الفصائل المهددة بالانقراض إذا قمنا بحماية غاباتها.",
            highlight: "can be saved",
            note: "مبني للمجهول مع can + be + P.P."
          },
          {
            en: "Plastic bags must not be thrown into the sea.",
            ar: "يجب ألا تُلقى الأكياس البلاستيكية في البحر.",
            highlight: "must not be thrown",
            note: "نهي جازم بالمبني للمجهول"
          }
        ],
        exercises: [
          {
            id: "2u7-ex2",
            question: "Plastic bottles can ______ (recycle / be recycled / recycling) to reduce pollution.",
            options: ["be recycled", "recycle", "recycling", "recycles"],
            correctAnswer: "be recycled",
            explanation: "في المبني للمجهول مع can نستخدم be متبوعة بالتصريف الثالث recycled.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 101"
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // UNIT 8: Revision & Project
  // -------------------------------------------------------------------------
  {
    id: 28,
    number: 8,
    titleAr: "الوحدة الثامنة: المراجعة الشاملة والامتحان النهائي (Unit 8: Final Revision)",
    titleEn: "Unit 8: Second Term Consolidation & Exam Readiness",
    description: "معتمد من كتاب الطالب (SB ص 84-91) وكتاب النشاط (AB ص 109-122): المراجعة الشاملة لجميع قواعد ومفردات وإملاء الكورس الثاني، والتهيئة المتكاملة للامتحان النهائي.",
    accentColor: "from-cyan-600 to-sky-600",
    bgGradient: "bg-gradient-to-r from-cyan-50 to-sky-50 border-cyan-200",
    lessons: [
      {
        id: "2nd-u8-l1",
        unitId: 28,
        lessonNumber: 1,
        titleAr: "الدرس الأول: المراجعة القواعدية النهائية للكورس الثاني (Final Grammar Consolidation)",
        titleEn: "Lesson 1: Second Term Grammar Consolidation",
        category: "grammar",
        summary: "تجميع شامل لجميع قواعد الكورس الثاني: المبني للمجهول البسيط (is/are/was/were + p.p.)، المبني للمجهول مع الأفعال الناقصة (can/must be + p.p.)، صيغ المستقبل، وضمائر الوصل (who / which).",
        grammarRuleFormula: "Second Term Formula Recap:\n1) Present Passive: Object + is/are + P.P.\n2) Past Passive: Object + was/were + P.P.\n3) Modal Passive: Object + can/must be + P.P.\n4) Future Intention: am/is/are + going to + Base Verb\n5) Relative Clauses: Person + who | Thing + which/that",
        detailedContent: [
          "مراجعة شاملة تركز على الفروق الدقيقة والأنماط الامتحانية التي تتكرر في امتحانات نهاية السنة الرسمية.",
          "كيفية التمييز بين المبني للمعلوم والمبني للمجهول في جمل الاختيارات.",
          "كيفية اختيار ضمير الوصل المناسب بالنظر للكلمة التي تسبق الفراغ مباشرة.",
          "تمارين مجمعة ومحاكية لأسئلة وزارة التربية لصف الثاني المتوسط."
        ],
        teacherNotes: [
          "تنبيه الأستاذ مصطفى تركي: انتبه للفاعل في بداية الجملة، إذا كان غير قادر على القيام بالفعل (مثل books أو messages أو animals) فالجملة مبنية للمجهول حتماً!"
        ],
        examples: [
          {
            en: "Reviewing all rules systematically guarantees top marks in final examinations.",
            ar: "المراجعة المنهجية لجميع القواعد تضمن لك نيل الدرجة الكاملة في الامتحانات.",
            highlight: "Reviewing all rules",
            note: "المراجعة الشاملة"
          }
        ],
        exercises: [
          {
            id: "2u8-ex1",
            question: "Yesterday, the missing keys ______ (were / are / was) found by the cleaner.",
            options: ["were", "are", "was", "is"],
            correctAnswer: "were",
            explanation: "الحدث في الماضي (Yesterday) والفاعل جمع (keys) لذا نختار were found.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 118"
          }
        ]
      },
      {
        id: "2nd-u8-l2",
        unitId: 28,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: مفردات وإملاء ونموذج الامتحان النهائي (Final Exam & Spelling Mastery)",
        titleEn: "Lesson 2: Final Vocabulary, Spelling & Exam Prep",
        category: "spelling",
        summary: "مراجعة قواعد الإملاء (إضافة ing و ed، تصاريف الأفعال الشاذة، المعاكسات والمرادفات) مع نموذج شامل للامتحان النهائي.",
        grammarRuleFormula: "Spelling Mastery:\n- big -> bigger | happy -> happier\n- write -> written | send -> sent | see -> seen\n- safe != dangerous | polite != impolite",
        detailedContent: [
          "قواعد الإملاء المقررة في الكورس الثاني ومضاعفة الحروف الأخيرة.",
          "المعاكسات الشائعة: healthy != unhealthy, fast != slow, clean != dirty.",
          "نموذج تدريبي نهائي متطابق مع أسئلة امتحانات نهاية السنة."
        ],
        teacherNotes: [
          "احرص على مراجعة تصاريف الأفعال الشاذة بانتظام، فهي المفتاح لحل أسئلة المبني للمجهول والأزمنة وسؤال الإملاء."
        ],
        examples: [
          {
            en: "Regular spelling practice prevents careless mistakes in final exams.",
            ar: "الممارسة الإملائية المنتظمة تمنع الأخطاء غير المقصودة في الامتحانات النهائية.",
            highlight: "Regular spelling practice",
            note: "أهمية الإملاء"
          }
        ],
        exercises: [
          {
            id: "2u8-ex2",
            question: "Opposite: polite -> impolite ; happy -> ______",
            options: ["unhappy", "imhappy", "dishappy", "in-happy"],
            correctAnswer: "unhappy",
            explanation: "عكس كلمة happy هو unhappy بإضافة البادئة un-.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 120"
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
        questionAr: "أين كان الفتيان يسيرون عندما وقع الحادث؟",
        answer: "In a busy street in Brisbane.",
        answerAr: "في شارع مزدحم بمدينة بريزبان.",
        year: "كتاب الطالب ص 88"
      }
    ]
  }
];

// =========================================================================
// إنشاءات الثاني المتوسط الرسمية المعتمدة (Student's Book & Activity Book)
// =========================================================================
// إنشاءات الثاني المتوسط الرسمية المعتمدة (Student's Book & Activity Book)
// =========================================================================
export const SECOND_INTERMEDIATE_ESSAYS: EssayItem[] = [
  {
    id: "2nd-essay-magazine",
    unitId: 1,
    titleAr: "إنشاء الوحدة الأولى: كتابة مقالة أو مقابلة لمجلة المدرسة",
    titleEn: "Writing an Article for the School Magazine",
    ministerialWeight: "15 درجة في الامتحان المدرسي",
    paragraphsEn: [
      "Last week, our school launched its monthly magazine. A team of four students was chosen to edit and design the pages. I had the privilege of interviewing our new English teacher, Mr. Ahmed. He told us that he had taught in many towns before coming to our school.",
      "Mr. Ahmed loves reading historical novels and playing table tennis in his spare time. He advises all students to read English short stories every day to expand their vocabulary. Publishing this interview was a great success and our classmates really enjoyed reading it."
    ],
    paragraphsAr: [
      "في الأسبوع الماضي، أطلقت مدرستنا مجلتها الشهرية. تم اختيار فريق مكون من أربعة طلاب لتحرير وتصميم الصفحات. حظيت بشرف إجراء مقابلة مع معلم اللغة الإنكليزية الجديد الأستاذ أحمد. وأخبرنا أنه قام بالتدريس في مدن عديدة قبل المجيء لمدرستنا.",
      "يحب الأستاذ أحمد قراءة الروايات التاريخية ولعب تنس الطاولة في أوقات فراغه. وينصح جميع الطلبة بقراءة القصص القصيرة باللغة الإنكليزية يومياً لتوسيع مفرداتهم. كان نشر هذه المقابلة نجاحاً كبيراً واستمتع زملاؤنا بقراءتها حقاً."
    ],
    keywords: [
      { word: "school magazine", meaning: "مجلة المدرسة" },
      { word: "interview", meaning: "مقابلة صحفية" },
      { word: "spare time", meaning: "وقت الفراغ" },
      { word: "expand vocabulary", meaning: "توسيع المفردات" }
    ],
    goldenTips: [
      "اختر عنواناً جذاباً لمقالتك يشد انتباه القراء وزملائك في المدرسة.",
      "ابدأ بمقدمة تصف الحدث أو الشخصية التي تجري معها اللقاء.",
      "استخدم جملاً بسيطة وقصيرة وتحقق من علامات التنقيط والحروف الكبيرة."
    ],
    clozeSentences: [
      {
        textWithBlanks: "Our school launched its monthly ______ last week.",
        missingWord: "magazine",
        options: ["magazine", "newspaper", "book", "library"]
      }
    ]
  },
  {
    id: "2nd-essay-fitness",
    unitId: 2,
    titleAr: "إنشاء الوحدة الثانية: كيف تحافظ على صحتك ولياقتك البدنية",
    titleEn: "How to Keep Fit and Healthy",
    ministerialWeight: "15 درجة في الامتحان المدرسي",
    paragraphsEn: [
      "Good health is the greatest treasure in life. To keep fit, we need to balance what we eat with how much physical exercise we do every day. We should eat plenty of fresh fruit and vegetables because they contain essential vitamins and minerals.",
      "On the other hand, we shouldn't eat too many crisps, chocolates, or fast food because they contain too much fat and salt. Regular exercise such as walking, cycling, or swimming strengthens the heart and gives us energy. Finally, getting eight hours of sleep every night helps our bodies stay refreshed and strong."
    ],
    paragraphsAr: [
      "الصحة الجيدة هي أعظم كنز في الحياة. للمحافظة على اللياقة البدنية، نحتاج إلى الموازنة بين ما نأكله ومقدار التمارين الرياضية التي نمارسها يومياً. ينبغي أن نأكل الكثير من الفواكه والخضار الطازجة لأنها تحتوي على الفيتامينات والمعادن الأساسية.",
      "من ناحية أخرى، لا ينبغي أن نأكل الكثير من رقائق البطاطا أو الشوكولاتة أو الوجبات السريعة لأنها تحوي دهوناً وأملاحاً زائدة. التمارين المنتظمة كالمشي وركوب الدراجة أو السباحة تقوي القلب وتمنحنا الطاقة. وأخيراً، النوم ثماني ساعات كل ليلة يساعد أجسامنا على البقاء منتعشة وقوية."
    ],
    keywords: [
      { word: "good health", meaning: "الصحة الجيدة" },
      { word: "fresh fruit", meaning: "فواكه طازجة" },
      { word: "regular exercise", meaning: "تمارين منتظمة" },
      { word: "refreshed", meaning: "منتعش" }
    ],
    goldenTips: [
      "تحدث عن أهمية التغذية الصحية وممارسة الرياضة وشرب الماء.",
      "استخدم عبارات النصيحة مثل You should و You shouldn't.",
      "اختم بنصيحة عامة حول النوم الكافي والابتعاد عن العادات الضارة."
    ],
    clozeSentences: [
      {
        textWithBlanks: "We should eat plenty of fresh ______ and vegetables.",
        missingWord: "fruit",
        options: ["fruit", "crisps", "sweets", "sugar"]
      }
    ]
  },
  {
    id: "2nd-essay-sports",
    unitId: 3,
    titleAr: "إنشاء الوحدة الثالثة: رياضتي المفضلة وأسباب حبي لها",
    titleEn: "My Favourite Sport and Why I Like It",
    ministerialWeight: "15 درجة في الامتحان المدرسي",
    paragraphsEn: [
      "Playing sports is an exciting way to spend free time and build strong friendships. My favourite sport is football. I have played it since I was eight years old with my friends at the local sports club. We train twice a week after school.",
      "Football teaches us teamwork, patience, and good sportsmanship. When we win, we celebrate together, and when we lose, we learn how to improve. I believe that playing sports keeps young people active, confident, and away from bad habits."
    ],
    paragraphsAr: [
      "ممارسة الرياضة وسيلة مثيرة لقضاء وقت الفراغ وبناء صداقات متينة. رياضتي المفضلة هي كرة القدم. لقد مارستها منذ أن كنت في الثامنة من عمري مع أصدقائي في النادي الرياضي المحلي. نتدرب مرتين أسبوعياً بعد الدوام المدرسي.",
      "كرة القدم تعلمنا العمل الجماعي والصبر والروح الرياضية العالية. عندما نفوز نحتفل معاً، وعندما نخسر نتعلم كيف نتطور. أؤمن أن ممارسة الرياضة تبقي الشباب نشيطين وواثقين ومبتعدين عن العادات السيئة."
    ],
    keywords: [
      { word: "favourite sport", meaning: "الرياضة المفضلة" },
      { word: "teamwork", meaning: "العمل الجماعي" },
      { word: "sportsmanship", meaning: "الروح الرياضية" },
      { word: "confident", meaning: "واثق بالنفس" }
    ],
    goldenTips: [
      "حدد اسم الرياضة (كرة القدم، السباحة، كرة السلة).",
      "بين متى وأين تمارسها ومع من تلعب.",
      "وضح الفوائد النفسية والجسدية لممارسة هذه الرياضة."
    ],
    clozeSentences: [
      {
        textWithBlanks: "Football teaches us ______ and good sportsmanship.",
        missingWord: "teamwork",
        options: ["teamwork", "fighting", "laziness", "loneliness"]
      }
    ]
  },
  {
    id: "2nd-essay-career",
    unitId: 6,
    titleAr: "إنشاء الوحدة السادسة: مهنتي وخطتي المستقبلية",
    titleEn: "My Future Career Plan",
    ministerialWeight: "15 درجة في الامتحان المدرسي",
    paragraphsEn: [
      "When I finish school, I am going to study architecture at Baghdad University. I have always been fascinated by beautiful ancient buildings and modern skyscrapers. Drawing and mathematics are my favourite subjects at school.",
      "An architect is someone who designs hospitals, schools, and homes for families. I want to help rebuild our cities and create modern green spaces for future generations. Working hard today is the only path to turning this dream into reality."
    ],
    paragraphsAr: [
      "عندما أنهي المدرسة، أنوي دراسة الهندسة المعمارية في جامعة بغداد. لطالما انبهرت بالمباني القديمة الجميلة وناطحات السحاب الحديثة. الرسم والرياضيات هما مادتاي المفضلتان في المدرسة.",
      "المهندس المعماري هو شخص يصمم المستشفيات والمدارس ومنازل العائلات. أريد أن أساعد في إعادة إعمار مدننا وإنشاء مساحات خضراء حديثة للأجيال القادمة. العمل بجد اليوم هو السبيل الوحيد لتحويل هذا الحلم إلى حقيقة."
    ],
    keywords: [
      { word: "architecture", meaning: "الهندسة المعمارية" },
      { word: "skyscrapers", meaning: "ناطحات السحاب" },
      { word: "design", meaning: "يصمم" },
      { word: "future generations", meaning: "الأجيال القادمة" }
    ],
    goldenTips: [
      "حدد الوظيفة التي تحلم بها (طبيب، مهندس، معلم، طيار).",
      "اشرح المواد الدراسية التي تحتاج للتفوق فيها.",
      "بين كيف ستخدم بلدك ومجتمعك من خلال هذه المهنة."
    ],
    clozeSentences: [
      {
        textWithBlanks: "An architect is someone who ______ buildings.",
        missingWord: "designs",
        options: ["designs", "destroys", "flies", "paints"]
      }
    ]
  }
];

// =========================================================================
// بنك الأسئلة الامتحانية الرسمية للثاني المتوسط (امتحانات نصف السنة ونهاية السنة)
// =========================================================================
export const SECOND_INTERMEDIATE_QUESTIONS: MinisterialExamQuestion[] = [
  {
    id: "2nd-q-gr-1",
    unitId: 1,
    topic: "Possessive 's",
    year: "2024",
    session: "دور أول",
    questionText: "The ______ (boys / boy's / boys') bicycles were left outside the classroom all night. (Choose)",
    correctAnswer: "boys'",
    ruleExplanation: "الحديث عن دراجات مجموعة أولاد (جمع ينتهي بـ s)، فالفاصلة العليا تأتي بعد الـ s: boys'.",
    difficulty: "medium",
    category: "Grammar"
  },
  {
    id: "2nd-q-gr-2",
    unitId: 1,
    topic: "Giving Advice with Should",
    year: "2023",
    session: "دور أول",
    questionText: "You have an exam tomorrow. (Give advice using: should / shouldn't)",
    correctAnswer: "You should study hard. / You shouldn't stay up late.",
    ruleExplanation: "استخدام should مع فعل مجرد لتقديم نصيحة دراسية مفيدة للطالب.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "2nd-q-gr-3",
    unitId: 2,
    topic: "Quantifiers (too much / too many)",
    year: "2024",
    session: "دور ثانٍ",
    questionText: "Don't put ______ (too many / too much) salt in the soup; it is unhealthy.",
    correctAnswer: "too much",
    ruleExplanation: "الملح (salt) اسم غير معدود، لذا نستخدم معه too much.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "2nd-q-gr-4",
    unitId: 3,
    topic: "Sports verbs (play / do / go)",
    year: "2023",
    session: "دور أول",
    questionText: "Hassan and his friends ______ (do / play / go) tennis at the club every Friday.",
    correctAnswer: "play",
    ruleExplanation: "لعبة التنس (tennis) لعبة كرات ومضرب فتأخذ الفعل play.",
    difficulty: "easy",
    category: "Vocabulary"
  },
  {
    id: "2nd-q-gr-5",
    unitId: 3,
    topic: "Adverbs of Manner",
    year: "2024",
    session: "تمهيدي",
    questionText: "She speaks English very ______ (good / well).",
    correctAnswer: "well",
    ruleExplanation: "الظرف من الصفة good هو well لوصف فعل التحدث speaks.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "2nd-q-gr-6",
    unitId: 5,
    topic: "Passive Voice",
    year: "2024",
    session: "دور أول",
    questionText: "Letters ______ (are written / is written / wrote) and sent by email nowadays.",
    correctAnswer: "are written",
    ruleExplanation: "المفعول به جمع (Letters) في زمن المضارع البسيط فيأخذ are + التصريف الثالث written.",
    difficulty: "medium",
    category: "Grammar"
  },
  {
    id: "2nd-q-gr-7",
    unitId: 6,
    topic: "Relative Pronouns",
    year: "2023",
    session: "دور ثانٍ",
    questionText: "A firefighter is someone ______ (which / who / where) puts out fires.",
    correctAnswer: "who",
    ruleExplanation: "رجل الإطفاء شخص عاقل فيأخذ ضمير الوصل who.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "2nd-q-gr-8",
    unitId: 7,
    topic: "Modal Passive",
    year: "2024",
    session: "دور أول",
    questionText: "Rare animals can ______ (save / be saved / saved) in national parks.",
    correctAnswer: "be saved",
    ruleExplanation: "في المبني للمجهول مع can نستخدم can be + Past Participle: can be saved.",
    difficulty: "medium",
    category: "Grammar"
  }
];

// =========================================================================
// نموذج الامتحان الشامل المعتمد للثاني المتوسط (100 درجة)
// =========================================================================
export const SECOND_INTERMEDIATE_MOCK_PAPER: MockExamPaper = {
  id: "2nd-mock-final-full",
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
      titleAr: "السؤال الأول: القطعة الخارجية الاستيعابية (Reading Comprehension)",
      titleEn: "Question 1: Unseen Reading Comprehension",
      instructionsAr: "اقرأ القطعة بعناية ثم أجب عن الأسئلة التالية:",
      instructionsEn: "Read the following passage carefully, then answer the questions below:",
      totalMarks: 20,
      unseenPassage: "Last month, Rami and his family went on a camping trip near Lake Dokan. Rami's father set up the tents while Rami and his brother collected firewood. In the afternoon, they rented a boat and went fishing. Rami caught three big fish. In the evening, their mother cooked a delicious meal on the campfire. They spent three wonderful days enjoying nature and taking photos.",
      items: [
        {
          id: "2m-q1-1",
          number: 1,
          questionText: "Where did Rami's family go last month?",
          type: "text",
          correctAnswer: "They went on a camping trip near Lake Dokan.",
          alternativeAnswers: ["Lake Dokan", "Near Lake Dokan"],
          explanation: "السطر الأول يوضح ذهابهم إلى بحيرة دوكان.",
          maxScore: 4
        },
        {
          id: "2m-q1-2",
          number: 2,
          questionText: "What did Rami and his brother do while their father set up the tents?",
          type: "text",
          correctAnswer: "They collected firewood.",
          explanation: "جمع الحطب لإشعال النار.",
          maxScore: 4
        },
        {
          id: "2m-q1-3",
          number: 3,
          questionText: "How many fish did Rami catch?",
          type: "choice",
          options: ["Two", "Three", "Five", "None"],
          correctAnswer: "Three",
          explanation: "اصطاد ثلاثة أسماك كبيرة.",
          maxScore: 4
        },
        {
          id: "2m-q1-4",
          number: 4,
          questionText: "Their mother cooked the fish in a modern microwave oven. (True / False)",
          type: "choice",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "طبختها على نار المخيم campfire وليس في ميكروويف.",
          maxScore: 4
        },
        {
          id: "2m-q1-5",
          number: 5,
          questionText: "How many days did the family spend camping?",
          type: "text",
          correctAnswer: "Three days.",
          explanation: "قضت العائلة ثلاثة أيام رائعة.",
          maxScore: 4
        }
      ]
    },
    {
      id: "sec-2",
      sectionCode: "Q2",
      titleAr: "السؤال الثاني: قطع الكتاب وقصص الأدب المقررة (Textbook Passages & Stories)",
      titleEn: "Question 2: Textbook Passages & Story Time",
      instructionsAr: "أجب عن 5 من الأسئلة التالية من كتابي الطالب والنشاط وقصص بوب وباسم:",
      instructionsEn: "Answer (5) of the following questions:",
      totalMarks: 20,
      items: [
        {
          id: "2m-q2-1",
          number: 1,
          questionText: "Where did the World Youth Camp take place in Bob and Basim's story?",
          type: "text",
          correctAnswer: "In Australia",
          explanation: "أقيم المخيم الكشفي في أستراليا.",
          maxScore: 4
        },
        {
          id: "2m-q2-2",
          number: 2,
          questionText: "What did Bob spill while preparing breakfast?",
          type: "text",
          correctAnswer: "A big pitcher of water / juice",
          explanation: "سكب إبريقاً كبيراً من الماء أثناء إعداد الإفطار.",
          maxScore: 4
        },
        {
          id: "2m-q2-3",
          number: 3,
          questionText: "How long has Mr. James worked at the Italian takeaway?",
          type: "text",
          correctAnswer: "For ten years",
          explanation: "عمل لمدة عشر سنوات.",
          maxScore: 4
        },
        {
          id: "2m-q2-4",
          number: 4,
          questionText: "Why are snow leopards hunted in Asia?",
          type: "text",
          correctAnswer: "For their fur",
          explanation: "يصطاد نمر الثلوج للحصول على فرائه الثمين.",
          maxScore: 4
        },
        {
          id: "2m-q2-5",
          number: 5,
          questionText: "What happened to Bob's five-scoop ice cream in Brisbane?",
          type: "text",
          correctAnswer: "It fell and spilt all over his clothes and face",
          explanation: "سقط وانسكب على ملابسه ووجهه.",
          maxScore: 4
        }
      ]
    },
    {
      id: "sec-3",
      sectionCode: "Q3",
      titleAr: "السؤال الثالث: القواعد والوظائف اللغوية (Grammar & Functions)",
      titleEn: "Question 3: Grammar & Functions",
      instructionsAr: "اختر الإجابة الصحيحة أو أجب عما يطلب منك:",
      instructionsEn: "Do as required between brackets / Choose the correct option:",
      totalMarks: 30,
      items: [
        {
          id: "2m-q3-1",
          number: 1,
          questionText: "You look exhausted. (Give advice using should)",
          type: "text",
          correctAnswer: "You should get some rest.",
          alternativeAnswers: ["You should sleep early", "You should rest"],
          explanation: "إعطاء نصيحة بـ should + مصدر مجرد.",
          maxScore: 6
        },
        {
          id: "2m-q3-2",
          number: 2,
          questionText: "Let's ______ a team for the sports day. (start / starting / to start)",
          type: "choice",
          options: ["start", "starting", "to start"],
          correctAnswer: "start",
          explanation: "بعد Let's يأتي مصدر مجرد.",
          maxScore: 6
        },
        {
          id: "2m-q3-3",
          number: 3,
          questionText: "Ali speaks English very ______ . (good / well)",
          type: "choice",
          options: ["well", "good"],
          correctAnswer: "well",
          explanation: "الظرف من good هو well لوصف فعل التحدث.",
          maxScore: 6
        },
        {
          id: "2m-q3-4",
          number: 4,
          questionText: "Don't eat ______ crisps; they have too much salt. (too much / too many)",
          type: "choice",
          options: ["too many", "too much"],
          correctAnswer: "too many",
          explanation: "كلمة crisps اسم معدود جمع فتأخذ too many.",
          maxScore: 6
        },
        {
          id: "2m-q3-5",
          number: 5,
          questionText: "A firefighter is someone ______ puts out dangerous fires. (who / which)",
          type: "choice",
          options: ["who", "which"],
          correctAnswer: "who",
          explanation: "رجل الإطفاء شخص عاقل فيأخذ who.",
          maxScore: 6
        }
      ]
    },
    {
      id: "sec-4",
      sectionCode: "Q4",
      titleAr: "السؤال الرابع: المفردات، الإملاء والتنقيط (Vocabulary, Spelling & Punctuation)",
      titleEn: "Question 4: Vocabulary, Spelling & Punctuation",
      instructionsAr: "أكمل الفراغات ونفذ المطلوب في الإملاء والتنقيط:",
      instructionsEn: "Fill in blanks and do as required:",
      totalMarks: 15,
      items: [
        {
          id: "2m-q4-1",
          number: 1,
          questionText: "An ______ is someone who designs modern buildings. (architect / mechanic)",
          type: "choice",
          options: ["architect", "mechanic"],
          correctAnswer: "architect",
          explanation: "المهندس المعماري هو الذي يصمم المباني.",
          maxScore: 3
        },
        {
          id: "2m-q4-2",
          number: 2,
          questionText: "Spelling: slow -> slowly ; good -> ______",
          type: "blank",
          correctAnswer: "well",
          explanation: "ظرف الحال من good هو well.",
          maxScore: 3
        },
        {
          id: "2m-q4-3",
          number: 3,
          questionText: "Spelling: play -> playing ; swim -> ______",
          type: "blank",
          correctAnswer: "swimming",
          explanation: "مضاعفة الحرف m عند إضافة ing.",
          maxScore: 3
        },
        {
          id: "2m-q4-4",
          number: 4,
          questionText: "Punctuate: are you going to baghdad next monday ali",
          type: "text",
          correctAnswer: "Are you going to Baghdad next Monday, Ali?",
          explanation: "حرف كبير Are و Baghdad و Monday وفاصلة قبل Ali وعلامة استفهام.",
          maxScore: 6
        }
      ]
    },
    {
      id: "sec-5",
      sectionCode: "Q5",
      titleAr: "السؤال الخامس: التعبير والإنشاء المدرسي (Written Composition)",
      titleEn: "Question 5: Written Composition",
      instructionsAr: "اختر أحد الموضوعين واكتب فقرة إنشائية من 60 إلى 80 كلمة:",
      instructionsEn: "Write an essay about ONE of the following topics (A or B):",
      totalMarks: 15,
      items: [
        {
          id: "2m-q5-1",
          number: 1,
          questionText: "Topic A: How to Keep Fit and Healthy (الوحدة الثانية) OR Topic B: My Future Career Plan (الوحدة السادسة)",
          type: "text",
          correctAnswer: "To keep fit, we should eat fresh fruit and vegetables and drink plenty of water. We shouldn't eat too many sweets. Regular exercise like walking and swimming keeps our bodies strong and refreshed.",
          explanation: "إنشاء مدرسي متكامل يحتوي على مقدمة وعرض وخاتمة وقواعد سليمة.",
          maxScore: 15
        }
      ]
    }
  ],
  essayOptions: [
    {
      id: "2nd-essay-opt-a",
      optionLetter: "A",
      titleEn: "How to Keep Fit and Healthy",
      titleAr: "كيف تحافظ على صحتك ولياقتك البدنية (الوحدة الثانية)",
      prompt: "Write a short composition giving advice on how young people can keep fit, exercise, and eat healthy food.",
      suggestedModel: "Good health is the greatest treasure in life. To keep fit, we need to eat plenty of fresh fruit and vegetables and drink lots of water. We shouldn't eat too many crisps or sweets. Regular exercise like walking and swimming keeps our hearts strong and gives us energy.",
      keywords: ["good health", "fresh fruit", "regular exercise", "vegetables", "plenty of water"],
      maxScore: 15
    },
    {
      id: "2nd-essay-opt-b",
      optionLetter: "B",
      titleEn: "My Future Career Plan",
      titleAr: "مهنتي وخطتي المستقبلية (الوحدة السادسة)",
      prompt: "Write a composition about what job you are going to do in the future, why you chose it, and which subjects you need to study.",
      suggestedModel: "When I finish school, I am going to study architecture at university. I have always loved designing modern buildings and drawing. Mathematics and art are my favourite subjects. An architect helps rebuild cities and build comfortable homes for families.",
      keywords: ["architecture", "university", "designing", "buildings", "mathematics"],
      maxScore: 15
    }
  ]
};

