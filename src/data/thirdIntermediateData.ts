import { Unit, LiteratureItem, EssayItem, MinisterialExamQuestion, UploadedMalzama } from '../types';

// =========================================================================
// وحدات منهج الثالث المتوسط - English for Iraq (3rd Intermediate)
// معتمد رسمياً وحصرياً من كتاب الطالب (Student's Book) وكتاب النشاط (Activity Book)
// =========================================================================
export const THIRD_INTERMEDIATE_UNITS: Unit[] = [
  // -------------------------------------------------------------------------
  // UNIT 1: At the Mall & Describing People
  // -------------------------------------------------------------------------
  {
    id: 101,
    number: 1,
    titleAr: "الوحدة الأولى: في المركز التجاري ووصف الأشخاص وسيارات العام",
    titleEn: "Unit 1: At the Mall, Describing People & Car of the Year",
    description: "معتمد من كتاب الطالب (SB ص 4-15) وكتاب النشاط (AB ص 3-21): الوصف المكاني بـ There is / There are، الإخبار عن الوقت، الماضي والمضارع المستمر، الأسماء المركبة، إعطاء الأسباب، الوصف المؤدب، وقطعة سيارة العام (Panther 3.0D).",
    accentColor: "from-blue-600 to-cyan-600",
    bgGradient: "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200",
    lessons: [
      {
        id: "3rd-u1-l1",
        unitId: 101,
        lessonNumber: 1,
        titleAr: "الدرس الأول: الوصف المكاني في المركز التجاري (There is / There are / It has)",
        titleEn: "Lesson 1: Describing Places (There is / There are / It has)",
        category: "grammar",
        summary: "كتاب الطالب ص 4-5 وكتاب النشاط ص 3-5: وصف المحلات والمرافق (escalator, lift, clothes shop, baker's, information desk) بصيغ المفرد والجمع والإثبات والنفي والاستفهام.",
        grammarRuleFormula: "1) Singular (مفرد):\n   (+) There is a / an + singular noun\n   (-) There isn't a / an + singular noun\n   (?) Is there a / an + singular noun...?\n\n2) Plural (جمع):\n   (+) There are some / lots of / many + plural noun\n   (-) There aren't any + plural noun\n   (?) Are there any + plural noun...?\n\n3) It has (تحتوي على):\n   (+) It has a / lots of...\n   (-) It doesn't have a / any...\n   (?) Does it have a / any...?",
        detailedContent: [
          "كتاب الطالب ص 4: نستخدم (There is) مع الاسم المفرد المسبوق بأداة التنكير (a / an). نستخدم an إذا بدأ الاسم بحرف علة (an information desk, an escalator).",
          "في حالة النفي تصبح (There isn't a / an)، وفي الاستفهام نقدّم الفعل المساعد: (Is there a...?).",
          "نستخدم (There are) مع أسماء الجمع، وتأتي معها كلمات مثل: (some, lots of, many, a few).",
          "قاعدة وزارية حاسمة (AB ص 3): في حالة النفي والاستفهام مع الجمع، نستبدل (some) بكلمة (any) حصراً: (There aren't any clothes shops / Are there any sweet shops?).",
          "الصيغة مع (It has): في النفي نستخدم (It doesn't have) وليس (It hasn't). وفي السؤال نستخدم (Does it have...?)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه جيداً لكلمة (any)؛ تأتي فقط مع الجمل المنفية والاستفهامية في السؤال الثاني فرع B!",
          "تنبيه وزاري: إذا رأيت اسماً مفرداً يبدأ بحرف علة (e, a, i, o, u) نستخدم an مثل an information desk.",
          "السؤال الوزاري يتكرر غالباً كاختيارات بين (There is / There are) أو بين (some / any)."
        ],
        commonMistakes: [
          "اختيار some في جملة منفية (الصحيح any).",
          "قول It hasn't a pool (الصحيح It doesn't have a pool).",
          "نسيان حرف s الجمع عند استخدام There are."
        ],
        examples: [
          {
            en: "There is an information desk in the center of the mall.",
            ar: "يوجد مكتب معلومات في وسط المركز التجاري.",
            highlight: "There is an information desk",
            note: "مفرد يبدأ بحرف علة"
          },
          {
            en: "There aren't any sweet shops on the first floor.",
            ar: "لا توجد أي محلات حلويات في الطابق الأول.",
            highlight: "aren't any sweet shops",
            note: "جمع منفي باستخدام any"
          },
          {
            en: "It has lots of clothes shops, but it doesn't have a swimming pool.",
            ar: "المول يحتوي على الكثير من محلات الملابس، لكنه لا يحتوي على مسبح.",
            highlight: "doesn't have a swimming pool",
            note: "صيغة النفي لـ It has"
          }
        ],
        exercises: [
          {
            id: "3u1-l1-ex1",
            question: "There ______ any clothes shops in this mall. (Choose: isn't / aren't / is / are)",
            options: ["aren't", "isn't", "is", "are"],
            correctAnswer: "aren't",
            explanation: "وجود any مع اسم جمع (clothes shops) يفرض صيغة الجمع المنفي aren't.",
            type: "mcq",
            ministerialYear: "وزاري 2019 دور أول"
          },
          {
            id: "3u1-l1-ex2",
            question: "There is (a / an) information desk in the center.",
            options: ["an", "a"],
            correctAnswer: "an",
            explanation: "كلمة information تبدأ بحرف علة (i) لذلك نختار an.",
            type: "mcq",
            ministerialYear: "وزاري 2021 تمهيدي"
          }
        ]
      },
      {
        id: "3rd-u1-l2",
        unitId: 101,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: الإخبار عن الوقت (Telling the Time)",
        titleEn: "Lesson 2: Telling the Time",
        category: "grammar",
        summary: "كتاب الطالب ص 6 وكتاب النشاط ص 6-7: الطريقة الرقمية المباشرة (Digital Method) وطريقة الدقائق والساعات (Past & To).",
        grammarRuleFormula: "الطريقة المباشرة (الأسهل والأضمن وزارياً):\nIt's + الساعات + الدقائق\n\nإذا كانت الساعات أكثر من 12، نطرح 12:\n15:10 => 15 - 12 = 3 => It's three ten.\n16:15 => 16 - 12 = 4 => It's four fifteen.\n20:45 => 20 - 12 = 8 => It's eight forty-five.\n\nطريقة past / to:\nIt's + الدقائق + (past / to) + الساعات",
        detailedContent: [
          "في الامتحان الوزاري يطلب منك (Tell the time):",
          "إذا كان الوقت تاماً (00)، نقول: It's [Hour] o'clock. مثال: 14:00 => It's two o'clock.",
          "إذا كان هناك دقائق، اقرأ الساعات أولاً ثم الدقائق بالكلمات باللغة الإنكليزية بدون تعقيد.",
          "تأكد من كتابة الأرقام الإنجليزية بدون أخطاء إملائية: fifteen, twenty, thirty, forty, fifty (انتبه: forty بدون u)."
        ],
        teacherNotes: [
          "نصيحة الأستاذ مصطفى تركي: اعتمد الطريقة المباشرة (الساعات أولاً ثم الدقائق) لأنها مضمونة بنسبة 100% في التصحيح الوزاري وتبعدك عن أخطاء past و to.",
          "تذكر دائماً كتابة It's في بداية الجواب."
        ],
        commonMistakes: [
          "نسيان طرح 12 من النظام الـ 24 ساعة (مثلاً كتابة It's sixteen بدل It's four).",
          "الخطأ الإملائي في كلمة forty بكتابتها fourty."
        ],
        examples: [
          {
            en: "17:10 => It's five ten.",
            ar: "الساعة الخامسة وعشر دقائق.",
            highlight: "It's five ten",
            note: "17 - 12 = 5"
          },
          {
            en: "13:20 => It's one twenty.",
            ar: "الساعة الواحدة وعشرون دقيقة.",
            highlight: "It's one twenty",
            note: "13 - 12 = 1"
          }
        ],
        exercises: [
          {
            id: "3u1-l2-ex1",
            question: "16:15 (Tell the time)",
            options: ["It's four fifteen.", "It's sixteen fifteen.", "It's four twelve.", "It's five fifteen."],
            correctAnswer: "It's four fifteen.",
            explanation: "16 - 12 = 4، والدقائق 15 (fifteen)، فالجواب It's four fifteen.",
            type: "mcq",
            ministerialYear: "وزاري 2018 دور ثانٍ"
          }
        ]
      },
      {
        id: "3rd-u1-l3",
        unitId: 101,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: الأسماء المركبة وإعطاء الأسباب (Compound Words & Giving Reasons)",
        titleEn: "Lesson 3: Compound Words & Giving Reasons (so you can / to help you)",
        category: "grammar",
        summary: "كتاب الطالب ص 9-10 وكتاب النشاط ص 8-10: حفظ الكلمات المركبة الوزارية وقواعد إعطاء الأسباب بـ so you can / can't و to help you.",
        grammarRuleFormula: "1) Compound Words (SB p. 10 & AB p. 9):\n   car + park = car park (موقف سيارات)\n   disc + brakes = disc brakes (مكابح قرصية)\n   air + bag = airbag (وسادة هوائية)\n   sun + roof = sunroof (فتحة سقف)\n   litter + bin = litter bin (سلة نفايات)\n   insect + spray = insect spray (مبيد حشرات)\n   video + game = video game (لعبة فيديو)\n   wind + proof = windproof (مقاوم للرياح)\n\n2) Giving Reasons Formula:\n   الجملة الأولى + so you can / can't + verb (base)\n   أو: الجملة الأولى + to help you + verb (base)",
        detailedContent: [
          "توصيل الكلمات المركبة (Matching) في السؤال الثالث الوزاري: احفظ الزوجين بدقة.",
          "قاعدة إعطاء الأسباب:",
          "- Cars have GPS so that you can't get lost. (نستخدم can't لأن المعنى: لكي لا تضيع).",
          "- Cars have airbags so you can be safe in a crash.",
          "- Cars have disc brakes to help you stop quickly.",
          "- Cars have air conditioning to help you keep cool."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه! الكلمة الوحيدة التي تأخذ can't هي (get lost) لأن السائق لا يرغب في أن يضيع!",
          "أما بقية الميزات الإيجابية فتأخذ (so you can) أو (to help you)."
        ],
        commonMistakes: [
          "اختيار so you can مع get lost (الصحيح so you can't get lost).",
          "وضع to بعد can (الصحيح can + مجرد بدون to)."
        ],
        examples: [
          {
            en: "Cars have GPS so you can't get lost.",
            ar: "السيارات مزودة بنظام GPS لكي لا تضيع.",
            highlight: "so you can't get lost",
            note: "can't مع get lost"
          },
          {
            en: "Cars have disc brakes to help you stop quickly.",
            ar: "السيارات بها مكابح قرصية لمساعدتك على التوقف بسرعة.",
            highlight: "to help you stop quickly",
            note: "to help you + مجرد"
          }
        ],
        exercises: [
          {
            id: "3u1-l3-ex1",
            question: "Cars have GPS (so you can / so you can't) get lost.",
            options: ["so you can't", "so you can"],
            correctAnswer: "so you can't",
            explanation: "نستخدم can't لأن الـ GPS يمنع الضياع (حتى لا تضيع).",
            type: "mcq",
            ministerialYear: "وزاري 2022 دور أول"
          },
          {
            id: "3u1-l3-ex2",
            question: "disc + ______ = disc brakes (brakes / park / bag / roof)",
            options: ["brakes", "park", "bag", "roof"],
            correctAnswer: "brakes",
            explanation: "الاسم المركب هو disc brakes (مكابح قرصية).",
            type: "mcq",
            ministerialYear: "وزاري 2023 تمهيدي"
          }
        ]
      },
      {
        id: "3rd-u1-l4",
        unitId: 101,
        lessonNumber: 4,
        titleAr: "الدرس الرابع: الوصف المؤدب للأشخاص (Polite Descriptions for People)",
        titleEn: "Lesson 4: Polite Descriptions for People",
        category: "grammar",
        summary: "كتاب الطالب ص 13 وكتاب النشاط ص 12-13: الطرق الأربعة لجعل الصفات السلبية أكثر تهذيباً وأدباً في التعامل.",
        grammarRuleFormula: "1) إثبات + إثبات:\n   He is [bad adj] -> He is a bit [bad adj].\n   (He is fat -> He is a bit fat).\n\n2) إثبات + نفي (isn't / aren't):\n   He is [bad adj] -> He isn't very [opposite adj].\n   (He is short -> He isn't very tall / He is stupid -> He isn't very clever).\n\n3) مع can't وفعل:\n   He can't [verb] -> He can't [verb] very well.\n   أو: He isn't very good at [verb-ing / noun].\n   (He can't play tennis -> He isn't very good at tennis).",
        detailedContent: [
          "في الامتحان الوزاري يأتيك السؤال: (Make the sentence more polite).",
          "القاعدة 1: إذا كانت الجملة الثانية تحتوي على (is)، نضع (a bit) قبل نفس الصفة.",
          "القاعدة 2: إذا كانت الجملة الثانية تحتوي على (isn't / is not)، نضع (very + عكس الصفة السلبية).",
          "القاعدة 3: إذا احتوت الجملة على (can't)، نستخدم صيغة (isn't very good at + ing)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: احفظ عكس الصفات السلبية الوزارية:\nugly <-> good-looking\nstupid <-> clever\nshort <-> tall\nlazy <-> active / hardworking\nbad <-> good",
          "تتكرر هذه النقطة في السؤال الثاني فرع A في كل دور وزاري تقريباً!"
        ],
        commonMistakes: [
          "نسيان إضافة ing بعد at في صيغة isn't very good at.",
          "وضع a bit مع جملة منفية بـ isn't (الصحيح very + عكس الصفة)."
        ],
        examples: [
          {
            en: "She is short. => She isn't very tall.",
            ar: "هي قصيرة => هي ليست طويلة جداً (وصف مؤدب).",
            highlight: "isn't very tall",
            note: "نفي + عكس الصفة"
          },
          {
            en: "He can't paint. => He isn't very good at painting.",
            ar: "هو لا يستطيع الرسم => هو ليس جيداً جداً في الرسم.",
            highlight: "isn't very good at painting",
            note: "isn't very good at + ing"
          }
        ],
        exercises: [
          {
            id: "3u1-l4-ex1",
            question: "He is fat. (Make the sentence more polite): He is ______.",
            options: ["a bit fat", "very tall", "bad at fat", "not fat"],
            correctAnswer: "a bit fat",
            explanation: "نضع a bit قبل الصفة لجعلها أكثر تهذيباً.",
            type: "mcq",
            ministerialYear: "وزاري 2021 دور أول"
          },
          {
            id: "3u1-l4-ex2",
            question: "She can't sing. (Make it more polite): She isn't very good at ______.",
            options: ["singing", "sing", "sang", "to sing"],
            correctAnswer: "singing",
            explanation: "بعد حرف الجر at نستخدم فعلاً مضافاً إليه ing (singing).",
            type: "mcq",
            ministerialYear: "وزاري 2022 دور أول"
          }
        ]
      },
      {
        id: "3rd-u1-l5",
        unitId: 101,
        lessonNumber: 5,
        titleAr: "الدرس الخامس: قطعة الكتاب الوزارية - سيارة العام (Car of the Year: Panther 3.0D)",
        titleEn: "Lesson 5: Textbook Passage - Car of the Year (Panther 3.0D)",
        category: "reading",
        summary: "كتاب الطالب ص 7 وكتاب النشاط ص 7-8: الأسئلة والأجوبة الوزارية النموذجية لسيارة البانثر 3.0D ومواصفاتها القياسية ووسائل الأمان.",
        grammarRuleFormula: "Key Specs (Panther 3.0D):\n- Seats: 8 people (ثمانية مقاعد - everyone has a seat)\n- Fuel economy: 12 kilometres to the litre (12 كم لكل لتر)\n- Warranty: 4 years warranty (ضمان أربع سنوات)\n- Safety features: Airbags for driver and passengers (وسائد هوائية للسائق والركاب)\n- Features: Electric seats and windows, video game player, GPS, sunroof, tinted windows, CD player\n- Price: Looks very expensive, but it is actually quite cheap to run.",
        detailedContent: [
          "1. What is the name of the car of the year? => Panther 3.0D.",
          "2. How many seats does the Panther 3.0D have? => It has eight (8) seats.",
          "3. What are the safety features in the Panther 3.0D? => Airbags for the driver and passengers and other safety features.",
          "4. Is the Panther 3.0D expensive or cheap? => It looks expensive, but it is actually quite cheap to run.",
          "5. How many kilometers does it do to the litre? => It does 12 kilometers to the litre.",
          "6. What is the warranty on the Panther? => It has a 4-year warranty."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تأتي أسئلة البانثر في السؤال الأول فرع B من الامتحان الوزاري (قطع الكتاب 10 درجات).",
          "احفظ جيداً: عدد المقاعد هو 8 (eight seats). إذا ذُكر 6 في صح وخطأ فالجواب False!"
        ],
        commonMistakes: [
          "اختيار False لجملة it is quite cheap to run (العبارة True لأنها اقتصادية في استهلاك الوقود).",
          "كتابة 6 مقاعد بدلاً من 8 مقاعد."
        ],
        examples: [
          {
            en: "The Panther 3.0D has seats for eight people.",
            ar: "سيارة البانثر 3.0D تحتوي على مقاعد لثمانية أشخاص.",
            highlight: "seats for eight people",
            note: "نقطة وزارية متكررة"
          }
        ],
        exercises: [
          {
            id: "3u1-l5-ex1",
            question: "The Panther 3.0D has seats for (6 / 8 / 4) people.",
            options: ["8", "6", "4"],
            correctAnswer: "8",
            explanation: "تحتوي سيارة البانثر 3.0D على 8 مقاعد.",
            type: "mcq",
            ministerialYear: "وزاري 2017 دور أول"
          },
          {
            id: "3u1-l5-ex2",
            question: "The Panther 3.0D is actually quite cheap to run. (True / False)",
            options: ["True", "False"],
            correctAnswer: "True",
            explanation: "صحيح، تبدو غالية ولكنها اقتصادية في التشغيل والوقود.",
            type: "mcq",
            ministerialYear: "وزاري 2021 دور ثانٍ"
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // UNIT 2: Preferences, Invitations & Lucy's TV Comedy
  // -------------------------------------------------------------------------
  {
    id: 102,
    number: 2,
    titleAr: "الوحدة الثانية: التفضيل، الدعوات، ومسلسل لوسي الكوميدي",
    titleEn: "Unit 2: Preferences, Suggestions, Invitations & Lucy's TV Comedy",
    description: "معتمد من كتاب الطالب (SB ص 16-27) وكتاب النشاط (AB ص 22-39): التعبير عن الرغبة والتفضيل، تقديم الاقتراحات وقبولها ورفضها، صيغ الدعوات الرسمية، وقطعة عائلة سمارة ولوسي فيشر الكوميدية.",
    accentColor: "from-emerald-600 to-teal-600",
    bgGradient: "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200",
    lessons: [
      {
        id: "3rd-u2-l1",
        unitId: 102,
        lessonNumber: 1,
        titleAr: "الدرس الأول: التفضيل والاقتراح (Expressing Preferences & Making Suggestions)",
        titleEn: "Lesson 1: Preferences & Suggestions",
        category: "grammar",
        summary: "كتاب الطالب ص 19-21 وكتاب النشاط ص 22-25: صيغ التفضيل والاقتراح وتحديد الفعل المجرد أو المضاف له to أو ing.",
        grammarRuleFormula: "1) يأتي بعدها (to + فعل مجرد):\n   - I'd like to + base (I'd like to go to the park)\n   - I'd love to + base (I'd love to play football)\n\n2) يأتي بعدها (فعل مجرد بدون to):\n   - I'd rather + base (I'd rather stay at home)\n   - Let's + base (Let's watch a film)\n   - Why not + base...? (Why not visit Ali?)\n\n3) يأتي بعدها (verb-ing):\n   - How about + v-ing...? (How about going to the mall?)\n\n4) الموافقة على الاقتراح (Agreeing / Accepting):\n   - Yes, let's. / Yes, that's a good idea. / Yes, I'd love to.",
        detailedContent: [
          "في الامتحان الوزاري يأتيك السؤال: (Express your preference concerning playing tennis) أو (Make a suggestion to your friend).",
          "صيغ I'd like و I'd love تأخذ (to + فعل مجرد).",
          "صيغة I'd rather و Let's و Why not تأخذ (فعل مجرد مباشرة بدون to).",
          "صيغة How about هي الصيغة الوحيدة التي تأخذ (فعلاً مضافاً له ing)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تذكر دائماً: كلمة How about تحب الـ ing!",
          "أما Let's فتريد فعلاً مجرداً حاف بدون to وبدون ing."
        ],
        commonMistakes: [
          "وضع to بعد Let's (كتابة Let's to go خطأ، الصحيح Let's go).",
          "وضع فعل مجرد بعد How about (الصحيح How about going)."
        ],
        examples: [
          {
            en: "How about going to the beach this afternoon? - Yes, let's.",
            ar: "ما رأيك بالذهاب للشاطئ بعد الظهر؟ - نعم، هيا بنا.",
            highlight: "How about going",
            note: "How about + v-ing"
          },
          {
            en: "I'd rather play tennis than watch television.",
            ar: "أفضّل لعب التنس على مشاهدة التلفاز.",
            highlight: "I'd rather play",
            note: "I'd rather + base"
          }
        ],
        exercises: [
          {
            id: "3u2-l1-ex1",
            question: "How about ______ to the cinema? (go / going / to go)",
            options: ["going", "go", "to go"],
            correctAnswer: "going",
            explanation: "بعد How about نستخدم فعلاً ينتهي بـ ing.",
            type: "mcq",
            ministerialYear: "وزاري 2019 دور ثانٍ"
          },
          {
            id: "3u2-l1-ex2",
            question: "Let's (watch / watching / to watch) television.",
            options: ["watch", "watching", "to watch"],
            correctAnswer: "watch",
            explanation: "بعد Let's نستخدم فعلاً مجرداً بدون أي إضافات.",
            type: "mcq",
            ministerialYear: "وزاري 2021 دور أول"
          }
        ]
      },
      {
        id: "3rd-u2-l2",
        unitId: 102,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: الدعوات والمواعيد (Invitations & Arrangements)",
        titleEn: "Lesson 2: Invitations & Arrangements",
        category: "grammar",
        summary: "كتاب الطالب ص 22 وكتاب النشاط ص 26-28: كيفية توجيه دعوة لصديق باستخدام صيغة Would you like to...?",
        grammarRuleFormula: "قاعدة الدعوة الوزارية:\nWould you like to + [verb base] + [compliment]...?\n\nالتحويلات الإلزامية:\n- نحذف كلمة (Invite your friend to...) ونبدأ بـ (Would you like to...?).\n- نحول (your) إلى (my):\n  your party -> my party\n  your brother's wedding -> my brother's wedding\n- نحول (you) إلى (me).",
        detailedContent: [
          "في الامتحان الوزاري يأتيك منطوق السؤال:",
          "Invite your friend to come to your school graduation party. (Use: Would you like)",
          "الجواب النموذجي:",
          "Would you like to come to my school graduation party?",
          "تأكد دائماً من إضافة علامة الاستفهام في نهاية جملة الدعوة لأنها سؤال بأدب."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه جداً لتحويل الضمير: (your) تتحول إلى (my)، و(you) تتحول إلى (me)!",
          "إذا نسي الطالب تحويل الضمير، يُخصم نصف الدرجة في الامتحان الوزاري."
        ],
        commonMistakes: [
          "إبقاء your في الجواب (مثلاً كتابة Would you like to come to your party?).",
          "نسيان علامة الاستفهام في نهاية الدعوة."
        ],
        examples: [
          {
            en: "Would you like to come to my birthday party on Friday?",
            ar: "هل ترغب في الحضور إلى حفل عيد ميلادي يوم الجمعة؟",
            highlight: "Would you like to come to my",
            note: "صيغة الدعوة النموذجية"
          }
        ],
        exercises: [
          {
            id: "3u2-l2-ex1",
            question: "Invite your friend to your graduation party. (Use: Would you like...)",
            options: [
              "Would you like to come to my graduation party?",
              "Would you like coming to my graduation party?",
              "Would you like to your graduation party?",
              "Do you like to go to party?"
            ],
            correctAnswer: "Would you like to come to my graduation party?",
            explanation: "الصيغة الصحيحة مع تحويل your إلى my ووضع علامة استفهام.",
            type: "mcq",
            ministerialYear: "وزاري 2017 دور أول"
          }
        ]
      },
      {
        id: "3rd-u2-l3",
        unitId: 102,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: قطعة الكتاب الوزارية - كوميديا لوسي وعائلة سمارة (Lucy's TV Comedy)",
        titleEn: "Lesson 3: Textbook Passage - Lucy's TV Comedy",
        category: "reading",
        summary: "كتاب الطالب ص 15 وكتاب النشاط ص 25-26: سمارة الممثلة لوسي فيشر وعائلتها ومغامرات شقيقها الأخرق في المسلسل الكوميدي.",
        grammarRuleFormula: "Key Characters & Facts (Lucy Fisher):\n- Lucy: A 16-year-old schoolgirl who plays the part of Samara.\n- Samara's brother: Very clumsy and always having silly accidents.\n- Accident 1: He put salt instead of sugar in his mother's tea, and it tasted awful.\n- Accident 2: He spilled his drink at lunch and then slipped in the puddle.\n- Accident 3: On holiday at a fancy hotel, he jumped into the swimming pool with all his clothes on.\n- Accident 4: He put cleaning fluid on his hair instead of hair gel, and his hair turned green!",
        detailedContent: [
          "1. How old is Lucy? => She is 16 years old.",
          "2. Who does Lucy play in the comedy? => She plays the part of Samara.",
          "3. What kind of character is Samara's brother? => He is very clumsy and always having silly accidents.",
          "4. What did Samara's brother put in his mother's tea? => He put salt instead of sugar.",
          "5. Why did Samara's mother dislike her tea? => Because it tasted awful with salt.",
          "6. What happened to the brother's hair? => It turned green because he used cleaning fluid instead of hair gel."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه! لوسي (Lucy) هي الممثلة الحقيقية، وسمارة (Samara) هي اسم الشخصية داخل المسلسل.",
          "تأتي هذه القطعة في السؤال الأول فرع B وتتكرر في كل الأدوار الوزارية."
        ],
        commonMistakes: [
          "الخلط بين لوسي وسمارة.",
          "كتابة sugar instead of salt (الصحيح وضع الملح بدلاً من السكر)."
        ],
        examples: [
          {
            en: "Samara's brother is very clumsy and is always having silly accidents.",
            ar: "شقيق سمارة أخرق جداً ودائماً ما يقع في حوادث سخيفة.",
            highlight: "clumsy and is always having silly accidents",
            note: "وصف وزاري متكرر"
          }
        ],
        exercises: [
          {
            id: "3u2-l3-ex1",
            question: "Lucy plays the part of ______ in the TV comedy. (Samara / Salma / Mona)",
            options: ["Samara", "Salma", "Mona"],
            correctAnswer: "Samara",
            explanation: "لوسي تلعب دور سمارة (Samara).",
            type: "mcq",
            ministerialYear: "وزاري 2018 دور أول"
          },
          {
            id: "3u2-l3-ex2",
            question: "Samara's brother put (salt / sugar) in his mother's tea.",
            options: ["salt", "sugar"],
            correctAnswer: "salt",
            explanation: "وضع الملح (salt) في الشاي.",
            type: "mcq",
            ministerialYear: "وزاري 2022 دور أول"
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // UNIT 3: The Natural World, Falconry & Marsh Arabs
  // -------------------------------------------------------------------------
  {
    id: 103,
    number: 3,
    titleAr: "الوحدة الثالثة: عالم الطبيعة والمقارنة والصقور وسكان الأهوار",
    titleEn: "Unit 3: The Natural World, Comparatives, Falconry & Life in the Marshes",
    description: "معتمد من كتاب الطالب (SB ص 28-39) وكتاب النشاط (AB ص 40-59): درجات المقارنة والتفضيل، أسلوب as...as، الموافقة والرفض (So do I / Neither do I)، الحالات الشرطية الأولى، قطعة أسرع الكائنات (الصقور)، وقطعة سكان أهوار العراق.",
    accentColor: "from-amber-600 to-orange-600",
    bgGradient: "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200",
    lessons: [
      {
        id: "3rd-u3-l1",
        unitId: 103,
        lessonNumber: 1,
        titleAr: "الدرس الأول: درجات المقارنة والتفضيل وصيغة as...as (Comparatives & Superlatives)",
        titleEn: "Lesson 1: Comparatives & Superlatives & (as...as)",
        category: "grammar",
        summary: "كتاب الطالب ص 28-30 وكتاب النشاط ص 40-43: قواعد إضافة er و est، والصفات ذات المقاطع المتعددة (more/most)، وصيغة المقارنة العكسية باستخدام as...as.",
        grammarRuleFormula: "1) صفات المقطع الواحد:\n   fast -> faster -> fastest\n   big -> bigger -> biggest (تضعيف الحرف الصحيح الأخير)\n   heavy -> heavier -> heaviest (قلب y إلى i)\n\n2) صفات المقطعين فأكثر:\n   expensive -> more expensive -> most expensive\n   beautiful -> more beautiful -> most beautiful\n\n3) الشواذ الوزارية الإلزامية:\n   good -> better -> best\n   bad -> worse -> worst\n   far -> farther -> farthest\n\n4) صيغة as...as العكسية:\n   Noun 2 + isn't / aren't + as + صفة مجردة + as + Noun 1\n   (A lion is faster than a bear -> A bear isn't as fast as a lion).",
        detailedContent: [
          "في المقارنة بين طرفين نستخدم (than) بعد صفة المقارنة: A bear is bigger than a wolf.",
          "التحويل إلى صيغة (as...as):",
          "1. نضع الاسم الثاني في البداية.",
          "2. نضع isn't أو aren't.",
          "3. نضع as + صفة مجردة (بدون er وبدون more) + as.",
          "4. نضع الاسم الأول في النهاية."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تذكر دائماً: بين as و as نضع صفة مجردة تماماً (fast وليس faster)! هذه نقطة اختيارات وزارية مضمونة.",
          "انتبه للشواذ: good تصبح better وليس gooder."
        ],
        commonMistakes: [
          "وضع صفة مقارنة بـ er بين as و as.",
          "نسيان تضعيف الحرف الأخير في big -> bigger أو hot -> hotter."
        ],
        examples: [
          {
            en: "An elephant is bigger than a giraffe. => A giraffe isn't as big as an elephant.",
            ar: "الفيل أكبر من الزرافة => الزرافة ليست كبيرة بقدر الفيل.",
            highlight: "isn't as big as",
            note: "صيغة as...as المجردة"
          }
        ],
        exercises: [
          {
            id: "3u3-l1-ex1",
            question: "A bear is not as ______ as a lion. (fast / faster / fastest)",
            options: ["fast", "faster", "fastest"],
            correctAnswer: "fast",
            explanation: "بين as و as نستخدم الصفة المجردة fast.",
            type: "mcq",
            ministerialYear: "وزاري 2018 دور أول"
          },
          {
            id: "3u3-l1-ex2",
            question: "good -> better ; bad -> ______ (bader / worse / worst)",
            options: ["worse", "bader", "worst"],
            correctAnswer: "worse",
            explanation: "مقارنة bad الشاذة هي worse.",
            type: "mcq",
            ministerialYear: "وزاري 2020 تمهيدي"
          }
        ]
      },
      {
        id: "3rd-u3-l2",
        unitId: 103,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: الموافقة والرفض (Agreeing: So do I / Neither do I)",
        titleEn: "Lesson 2: Agreeing & Disagreeing (So do I / Neither do I)",
        category: "grammar",
        summary: "كتاب الطالب ص 32 وكتاب النشاط ص 44-46: قواعد الموافقة على الجمل المثبتة بـ So والمنفية بـ Neither.",
        grammarRuleFormula: "1) الموافقة على جملة مثبتة:\n   - إذا احتوت الجملة على am: نستخدم (So am I).\n   - إذا احتوت على فعل مضارع عام: نستخدم (So do I).\n\n2) الموافقة على جملة منفية:\n   - إذا احتوت الجملة على am not: نستخدم (Neither am I).\n   - إذا احتوت على don't: نستخدم (Neither do I).\n\n3) الرفض وعدم الموافقة (Disagree):\n   - I like horror stories. => I don't.\n   - I don't mind flies. => I mind.",
        detailedContent: [
          "القاعدة الذهبية الوزارية:",
          "إذا كانت الجملة الأصلية منفية (تحتوي على not أو don't)، نختار فوراً (Neither) للموافقة.",
          "إذا كانت الجملة الأصلية مثبتة (لا تحتوي على not)، نختار فوراً (So).",
          "أمثلة:",
          "- I don't like horror films. => Neither do I.",
          "- I love chocolate. => So do I.",
          "- I am not afraid of spiders. => Neither am I."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: أسهل نقطة بالسؤال الثاني فرع B: شفت don't أو not؟ اختر Neither مباشرة!",
          "ماكو نفي؟ اختر So!"
        ],
        commonMistakes: [
          "اختيار So مع جملة منفية.",
          "استخدام Neither do I مع جملة فعلها المساعد am (الصحيح Neither am I)."
        ],
        examples: [
          {
            en: "I don't like spiders. => Neither do I.",
            ar: "أنا لا أحب العناكب => ولا أنا.",
            highlight: "Neither do I",
            note: "موافقة على نفي"
          },
          {
            en: "I love reading stories. => So do I.",
            ar: "أحب قراءة القصص => وأنا كذلك.",
            highlight: "So do I",
            note: "موافقة على إثبات"
          }
        ],
        exercises: [
          {
            id: "3u3-l2-ex1",
            question: "I don't mind flies. (Agree): ______ (So do I / Neither do I / So am I)",
            options: ["Neither do I", "So do I", "So am I"],
            correctAnswer: "Neither do I",
            explanation: "الجملة منفية بـ don't فتكون الإجابة Neither do I.",
            type: "mcq",
            ministerialYear: "وزاري 2019 دور أول"
          }
        ]
      },
      {
        id: "3rd-u3-l3",
        unitId: 103,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: الجمل الشرطية (First & Second Conditional)",
        titleEn: "Lesson 3: Conditional Sentences (If clauses)",
        category: "grammar",
        summary: "كتاب الطالب ص 33-35 وكتاب النشاط ص 47-50: الحالة الشرطية الأولى الممكنة (First Conditional) والحالة الشرطية الثانية غير الواقعية (Second Conditional).",
        grammarRuleFormula: "1) First Conditional (الحالة الأولى - محتملة الوقوع):\n   If + Present Simple (مضارع بسيط) , Subject + will / won't + base\n   (If it rains tomorrow, we will stay at home).\n   (If people continue to grow taller, we will need bigger houses).\n\n2) Second Conditional (الحالة الثانية - خيالية وغير واقعية):\n   If + Past Simple (ماضٍ بسيط) , Subject + would / wouldn't + base\n   (If I had lots of money, I would buy a sports car).",
        detailedContent: [
          "في الامتحان الوزاري يأتيك السؤال كـ (Correct the verb between brackets):",
          "إذا وجدت will في الجملة الثانية، فالفعل بعد If يكون مضارعاً بسيطاً (نضيف s للشخص الثالث مع He/She/It، ويبقى مجرداً مع الجمع).",
          "إذا وجدت would في الجملة الثانية، فالفعل بعد If يكون ماضياً بسيطاً (ed أو شاذ).",
          "العكس صحيح: إذا كان فعل If مضارعاً، نضع will + مجرد. وإذا كان ماضياً، نضع would + مجرد."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: المعادلة الوزارية الذهبية:\nمضارع بسيط <---> will + مجرد\nماضٍ بسيط <---> would + مجرد"
        ],
        commonMistakes: [
          "وضع will مباشرة بعد أداة الشرط If (خطأ؛ will تأتي في جواب الشرط فقط).",
          "نسيان إضافة s للشخص الثالث في جملة المضارع مع If he / If she."
        ],
        examples: [
          {
            en: "If people grow taller, we will need bigger houses.",
            ar: "إذا ازداد طول الناس، سنحتاج إلى منازل أكبر.",
            highlight: "grow taller ... will need",
            note: "الحالة الشرطية الأولى"
          },
          {
            en: "If I had a million dollars, I would travel around the world.",
            ar: "لو كان لدي مليون دولار، لسافرت حول العالم.",
            highlight: "had ... would travel",
            note: "الحالة الشرطية الثانية"
          }
        ],
        exercises: [
          {
            id: "3u3-l3-ex1",
            question: "If there (are / were) more mosquitoes, we would get more bites.",
            options: ["were", "are"],
            correctAnswer: "were",
            explanation: "وجود would في جواب الشرط يفرض زمن الماضي البسيط were في جملة If (الحالة الثانية).",
            type: "mcq",
            ministerialYear: "وزاري 2021 دور أول"
          }
        ]
      },
      {
        id: "3rd-u3-l4",
        unitId: 103,
        lessonNumber: 4,
        titleAr: "الدرس الرابع: قطعة الكتاب الوزارية - أسرع الكائنات الحية الصقور (The Fastest Living Things)",
        titleEn: "Lesson 4: Textbook Passage - The Fastest Living Things (Falconry)",
        category: "reading",
        summary: "كتاب الطالب ص 31 وكتاب النشاط ص 40-41: سرعة الصقور، الصيد بالصقور عند البدو في الصحراء، والمناطق المحمية للحفاظ على الطيور.",
        grammarRuleFormula: "Key Facts:\n- Speed: Falcons can dive at 240 kilometres per hour (240 km/h) - the fastest living things.\n- The Bedouin: People from the deserts of Arabia who used to watch falcons catching birds.\n- Bedouin food before falconry: Dates, milk, and bread (because it was hard to catch animals).\n- Favourite bird to hunt: The large, long-legged houbara (طائر الحبارى).\n- Falconry today: A sport rather than a necessity, practised in deserts of Muthanna, Samarra, and Dhi Qar in 4WD cars.\n- Disadvantage: Too many rare birds might be killed, so the government set up protected areas.",
        detailedContent: [
          "1. What are the fastest living things in the natural world? => Falcons.",
          "2. How fast can a falcon dive? => At 240 kilometres per hour.",
          "3. Who are the Bedouin? => The people from the deserts of Arabia.",
          "4. Why did the Bedouin live mostly on dates, milk and bread? => Because it was difficult to catch animals and birds.",
          "5. What was the favourite bird for the Bedouin to catch? => The large, long-legged houbara.",
          "6. What is the disadvantage of falconry sport? => Too many rare birds might be killed.",
          "7. What has the government done to protect birds? => Set up protected areas where people cannot hunt."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: احفظ رقم السرعة: 240 km/h.",
          "احفظ اسم الطائر المفضل: houbara (طائر الحبارى)."
        ],
        commonMistakes: [
          "كتابة أن البدو كانوا يأكلون اللحم دائماً قبل الصيد بالصقور (خطأ؛ كانوا يأكلون التمر والحليب والخبز)."
        ],
        examples: [
          {
            en: "Falcons can dive at 240 km/h.",
            ar: "يمكن للصقور أن تهبط بسرعة 240 كيلومتراً في الساعة.",
            highlight: "dive at 240 km/h",
            note: "أسرع الكائنات"
          }
        ],
        exercises: [
          {
            id: "3u3-l4-ex1",
            question: "Falcons can move faster than any other living thing. (True / False)",
            options: ["True", "False"],
            correctAnswer: "True",
            explanation: "صحيح، الصقور أسرع الكائنات الحية.",
            type: "mcq",
            ministerialYear: "وزاري 2017 دور أول"
          },
          {
            id: "3u3-l4-ex2",
            question: "The Bedouin's favourite bird to hunt was the ______.",
            options: ["houbara", "pigeon", "flamingo", "eagle"],
            correctAnswer: "houbara",
            explanation: "طائر الحبارى (houbara).",
            type: "mcq",
            ministerialYear: "وزاري 2021 تمهيدي"
          }
        ]
      },
      {
        id: "3rd-u3-l5",
        unitId: 103,
        lessonNumber: 5,
        titleAr: "الدرس الخامس: قطعة الكتاب الوزارية - الحياة في الأهوار (Life in the Marshes)",
        titleEn: "Lesson 5: Textbook Passage - Life in the Marshes",
        category: "reading",
        summary: "كتاب الطالب ص 34 وكتاب النشاط ص 46-47: سكان أهوار العراق (عرب الأهوار - المعدان)، بيوت القصب، القوارب التقليدية، والحيوانات والطيور.",
        grammarRuleFormula: "Key Facts (Marsh Arabs / Ma'dan):\n- Location: South-east of Iraq (Basra, Maysan, Dhi Qar).\n- Lifestyle: Traditional lifestyle raising domestic buffalo, sheep, and cattle.\n- Crops grown: Rice, wheat, and barley.\n- Houses: Arched houses built from reeds (up to 3m high, 3m wide, 13m long).\n- Transport: Traditional boats called Mashhoof and Tarada.\n- Bird life: 40 species of birds can be found (flamingos, pelicans, herons).\n- Wetland drainage: Draining the marshes in the 1990s caused a major ecological change, but water is now restored.",
        detailedContent: [
          "1. Where can Marsh Arabs be found? => In the south-east of Iraq.",
          "2. What do Marsh Arabs raise? => Domestic buffalo, sheep and cattle.",
          "3. What crops are grown by Marsh Arabs? => Rice, wheat and barley.",
          "4. What are their houses built from? => Reeds (القصب).",
          "5. What are the traditional boats called? => Mashhoof and Tarada.",
          "6. How many species of birds can be found in the marshes? => 40 species of birds."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: هذه القطعة مرتبطة مباشرة بإنشاء الوحدة الثالثة (Wildlife in the Marshes)، حفظك لمعلوماتها يضمن لك 10 درجات بالسؤال الأول و15 درجة بسؤال الإنشاء!"
        ],
        commonMistakes: [
          "نسيان اسم القوارب (Mashhoof and Tarada).",
          "الخطأ في المحاصيل (Rice, wheat, barley)."
        ],
        examples: [
          {
            en: "Marsh Arabs live in arched houses built from reeds.",
            ar: "يعيش عرب الأهوار في بيوت مقوسة مبنية من القصب.",
            highlight: "arched houses built from reeds",
            note: "وزاري متكرر"
          }
        ],
        exercises: [
          {
            id: "3u3-l5-ex1",
            question: "What do Marsh Arabs use for transport? (Mashhoof and Tarada / Cars / Trains)",
            options: ["Mashhoof and Tarada", "Cars and buses", "Trains"],
            correctAnswer: "Mashhoof and Tarada",
            explanation: "يستخدمون المشحوف والطرادة للتنقل.",
            type: "mcq",
            ministerialYear: "وزاري 2019 دور أول"
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // UNIT 4: Revision & Focus on Reading (Ibrahim's Life)
  // -------------------------------------------------------------------------
  {
    id: 104,
    number: 4,
    titleAr: "الوحدة الرابعة: المراجعة الشاملة وقصة حياة عالم الحيوان إبراهيم",
    titleEn: "Unit 4: Revision & Focus on Reading (Ibrahim's Life)",
    description: "معتمد من كتاب الطالب (SB ص 40-45) وكتاب النشاط (AB ص 60-67): مراجعة القواعد والمفردات للوحدات 1-3، وقصة كفاح إبراهيم وتحوله من قرية صغيرة في جنوب العراق إلى عالم حيوان يدرس في فرنسا والقاهرة.",
    accentColor: "from-purple-600 to-indigo-600",
    bgGradient: "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200",
    lessons: [
      {
        id: "3rd-u4-l1",
        unitId: 104,
        lessonNumber: 1,
        titleAr: "الدرس الأول: قصة حياة إبراهيم (Textbook Story: Ibrahim's Life)",
        titleEn: "Lesson 1: Textbook Story - Ibrahim's Life",
        category: "reading",
        summary: "كتاب الطالب ص 42-43 وكتاب النشاط ص 61-63: حياة إبراهيم وشغفه بالحيوانات منذ طفولته، انتقاله لبغداد، تعلمه الفرنسية من صديقه بيير، وتخرجه كعالم حيوان.",
        grammarRuleFormula: "Key Biography Facts (Ibrahim):\n- Childhood: Lived in a small village in the south of Iraq.\n- Early passion: Loved animals, asked lots of questions, cared for his father's goats and chickens.\n- Move to Baghdad: In 1990 because his father got a job with the Iraq Petroleum Company.\n- Meeting Pierre: Met a French boy named Pierre at the mall and learned French from him.\n- University: Studied zoology (علم الحيوان) at Cairo University.\n- Current profession: Works as a zoologist in France and is writing a book about animals in Africa.",
        detailedContent: [
          "1. Where did Ibrahim live when he was a child? => In a small village in the south of Iraq.",
          "2. What was Ibrahim interested in from an early age? => In animals.",
          "3. Why did Ibrahim move to Baghdad in 1990? => Because his father got a new job with the Iraq Petroleum Company.",
          "4. Who helped Ibrahim learn French? => A French boy named Pierre.",
          "5. Where did Ibrahim study zoology? => At Cairo University.",
          "6. What is Ibrahim doing now in France? => He is writing a book about animals in Africa."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تأتي هذه القطعة في السؤال الأول فرع B وتتكرر أسئلتها حول مسقط رأسه وجامعة القاهرة وعمله الحالي في فرنسا."
        ],
        commonMistakes: [
          "الاعتقاد بأنه درس علم الحيوان في فرنسا (الصحيح درس في جامعة القاهرة، ويعمل حالياً في فرنسا)."
        ],
        examples: [
          {
            en: "Ibrahim studied zoology at Cairo University.",
            ar: "درس إبراهيم علم الحيوان في جامعة القاهرة.",
            highlight: "zoology at Cairo University",
            note: "جامعة القاهرة"
          }
        ],
        exercises: [
          {
            id: "3u4-l1-ex1",
            question: "Ibrahim studied zoology at ______ University. (Cairo / Baghdad / Paris)",
            options: ["Cairo", "Baghdad", "Paris"],
            correctAnswer: "Cairo",
            explanation: "درس في جامعة القاهرة (Cairo).",
            type: "mcq",
            ministerialYear: "وزاري 2018 تمهيدي"
          }
        ]
      },
      {
        id: "3rd-u4-l2",
        unitId: 104,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: مراجعة الأزمنة والتراكيب القواعدية للوحدات 1-3",
        titleEn: "Lesson 2: Grammar & Vocabulary Consolidation (Units 1-3)",
        category: "grammar",
        summary: "كتاب النشاط ص 64-67: مراجعة الأزمنة، حروف الجر، أدوات الربط، وصيغ التفضيل والمقارنة لاختبار نصف السنة.",
        grammarRuleFormula: "Consolidation Checklist:\n- There is a/an vs There are some/any\n- It has vs It doesn't have\n- Telling the time\n- Giving reasons (so you can/can't & to help you)\n- Polite descriptions\n- Preferences & Suggestions (I'd like to, I'd rather, How about, Let's)\n- Invitations (Would you like to come...?)\n- Comparatives, Superlatives & as...as\n- Agreeing (So do I / Neither do I)\n- First & Second Conditionals",
        detailedContent: [
          "تمارين كتاب النشاط ص 64-67 تجمع أسئلة الامتحانات الوزارية للسنوات السابقة.",
          "التركيز على تحويل الجمل إلى صيغة النفي والاستفهام وتصحيح الأفعال بين الأقواس."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: هذه الوحدة هي خلاصة الكورس الأول، والامتحان التمهيدي والنصف سنوي يعتمد عليها بشكل أساسي."
        ],
        commonMistakes: [
          "نسيان القواعد الأساسية التي تمت دراستها في الوحدات الثلاث الأولى."
        ],
        examples: [
          {
            en: "How about playing a game of chess?",
            ar: "ما رأيك بأن نلعب جولة شطرنج؟",
            highlight: "How about playing",
            note: "مراجعة اقتراح"
          }
        ],
        exercises: [
          {
            id: "3u4-l2-ex1",
            question: "If I (have / had) more time, I would learn French.",
            options: ["had", "have"],
            correctAnswer: "had",
            explanation: "وجود would يفرض صيغة الماضي had.",
            type: "mcq",
            ministerialYear: "وزاري 2022 دور ثانٍ"
          }
        ]
      }
    ,
      {
        id: "3rd-u4-l3",
        unitId: 104,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: بنك المفردات والإسقاطات الوزارية للكورس الأول",
        titleEn: "Lesson 3: Term 1 Vocabulary Drops, Matching & Definitions",
        category: "vocabulary",
        summary: "كتاب النشاط ص 64-67: تجميع شامل لكافة مفردات وتعريفات الكورس الأول (الوحدات 1-3)، تمارين التوصيل، والإسقاطات الوزارية المضمونة.",
        grammarRuleFormula: "Key Term 1 Ministerial Definitions & Words:\n- airbags: help protect drivers in a crash (وسائد هوائية)\n- sunroof: allows light into the car (فتحة سقف)\n- comedy: a funny television show (كوميديا)\n- predator: an animal that hunts and kills other animals (مفترس)\n- falcon: the fastest bird in the world (الصقر)\n- marsh: wetland area where reeds grow (الأهوار)",
        detailedContent: [
          "تمرين كتاب النشاط ص 64: مطابقة الكلمات ذات الصلة بسيارات العام (Panther 3.0D) والأفلام الوثائقية والحيوانات البرية.",
          "سؤال الإسقاطات الوزاري (Q3 - A): التركيز على الكلمات المفتاحية في الجملة لاختيار الكلمة المناسبة من الصندوق.",
          "المرادفات والمتضادات الأكثر تكراراً في امتحانات الثالث المتوسط لنصف السنة والوزاري."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: سؤال التوصيل والإسقاطات يعتمد على حفظ معاني الكلمات المفتاحية، احفظ هذه الكلمات الست جيداً فهي متكررة بنسبة 90%."
        ],
        examples: [
          {
            en: "A predator is an animal that hunts, kills, and eats other animals.",
            ar: "المفترس هو حيوان يصطاد ويقتل ويأكل حيوانات أخرى.",
            highlight: "predator",
            note: "تعريف وزاري متكرر"
          }
        ],
        exercises: [
          {
            id: "3u4-l3-ex1",
            question: "An animal that kills and eats other animals is a ______.",
            options: ["predator", "prey", "falcon", "marsh"],
            correctAnswer: "predator",
            explanation: "المفترس هو predator.",
            type: "mcq",
            ministerialYear: "وزاري 2021 دور أول"
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // UNIT 5: Media, Morning News & Past Events
  // -------------------------------------------------------------------------
  {
    id: 105,
    number: 5,
    titleAr: "الوحدة الخامسة: الإعلام وأخبار الصباح والماضي والمستقبل",
    titleEn: "Unit 5: Media, Morning News, Past Tenses & Future Forms",
    description: "معتمد من كتاب الطالب (SB ص 46-57) وكتاب النشاط (AB ص 68-87): الماضي البسيط والماضي المستمر مع أدوات الربط (When / While / As)، صيغ المستقبل بـ will و going to، وقطعة أخبار الصباح العراقية (Iraqi Morning News).",
    accentColor: "from-indigo-600 to-purple-600",
    bgGradient: "bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200",
    lessons: [
      {
        id: "3rd-u5-l1",
        unitId: 105,
        lessonNumber: 1,
        titleAr: "الدرس الأول: الماضي البسيط والماضي المستمر وأدوات الربط (Past Simple & Continuous with When / While)",
        titleEn: "Lesson 1: Past Simple & Past Continuous with When & While",
        category: "grammar",
        summary: "كتاب الطالب ص 48-50 وكتاب النشاط ص 68-71: ربط الحدث الطويل المستمر (was/were + ing) بالحدث القاطع البسيط (ed/irregular) باستخدام When و While و As.",
        grammarRuleFormula: "1) Past Continuous (حدث طويل):\n   Subject + was / were + v-ing\n\n2) Past Simple (حدث قاطع قصير):\n   Subject + verb (ed / irregular past)\n\n3) أدوات الربط الذهبية:\n   While / As + Past Continuous (was/were + v-ing) , Past Simple\n   When + Past Simple , Past Continuous\n   Past Continuous + when + Past Simple",
        detailedContent: [
          "إذا بدأت الجملة بـ (While) أو (As) يأتي بعدها مباشرة ماضٍ مستمر (was/were + v-ing):",
          "While I was eating dinner, the phone rang.",
          "إذا بدأت الجملة بـ (When) يأتي بعدها مباشرة ماضٍ بسيط (ed أو شاذ):",
          "When the phone rang, I was eating dinner.",
          "أو تأتي When في المنتصف: I was playing football when it started to rain."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تذكر دائماً أن (While) تحب الـ ing (was/were + ing)!",
          "أما (When) فيأتي بعدها الفعل البسيط المنتهي بـ ed أو الشاذ."
        ],
        commonMistakes: [
          "وضع ing بعد When مباشرة (الصحيح ماضٍ بسيط).",
          "نسيان تصريف الأفعال الشاذة مثل (ring -> rang, see -> saw, run -> ran)."
        ],
        examples: [
          {
            en: "While Ali was having a shower, somebody knocked on the door.",
            ar: "بينما كان علي يستحم، طرق شخص ما الباب.",
            highlight: "While Ali was having ... knocked",
            note: "While + مستمر ثم بسيط"
          }
        ],
        exercises: [
          {
            id: "3u5-l1-ex1",
            question: "While she was reading, the telephone (ring / rang / was ringing).",
            options: ["rang", "ring", "was ringing"],
            correctAnswer: "rang",
            explanation: "الحدث القاطع يأتي بالماضي البسيط rang.",
            type: "mcq",
            ministerialYear: "وزاري 2018 دور أول"
          }
        ]
      },
      {
        id: "3rd-u5-l2",
        unitId: 105,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: التعبير عن المستقبل (Future: will vs going to)",
        titleEn: "Lesson 2: Future Forms (will vs going to)",
        category: "grammar",
        summary: "كتاب الطالب ص 51-52 وكتاب النشاط ص 72-74: التمييز بين التنبؤات والقرارات الفورية بـ will، والخطط والنوايا المسبقة بـ going to.",
        grammarRuleFormula: "1) Future with will (تنبؤات وقرارات لحظية وعروض):\n   Subject + will / won't + base verb\n   (I think it will rain tomorrow / I'll help you with that bag).\n\n2) Future with going to (خطط مسبقة ونوايا وأدلة واضحة):\n   Subject + am / is / are + going to + base verb\n   (I am going to visit my grandparents on Friday / Look at the black clouds, it is going to rain).",
        detailedContent: [
          "نستخدم (will) مع التنبؤات والآراء التي تبدأ بـ (I think, I hope, maybe, probably).",
          "نستخدم (going to) عند وجود خطة أو نية محددة أو موعد مسبق.",
          "كلا الصيغتين يتبعهما دائماً فعل مجرد خالي من أي إضافة (base verb)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: في الامتحان الوزاري، انتبه للفعل المساعد قبل going to (لا يمكن قول I going to، بل I am going to)."
        ],
        commonMistakes: [
          "نسيان am/is/are قبل going to.",
          "إضافة ing للفعل بعد going to (الصحيح going to + مجرد)."
        ],
        examples: [
          {
            en: "The match will start at 7:00 PM.",
            ar: "ستبدأ المباراة في الساعة 7:00 مساءً.",
            highlight: "will start",
            note: "مستقبل بسيط"
          }
        ],
        exercises: [
          {
            id: "3u5-l2-ex1",
            question: "I think Iraq (will win / is winning / won) the match.",
            options: ["will win", "is winning", "won"],
            correctAnswer: "will win",
            explanation: "وجود I think يدل على تنبؤ مستقبلي فنستخدم will win.",
            type: "mcq",
            ministerialYear: "وزاري 2020 دور أول"
          }
        ]
      },
      {
        id: "3rd-u5-l3",
        unitId: 105,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: قطعة الكتاب الوزارية - أخبار الصباح العراقية (Iraqi Morning News)",
        titleEn: "Lesson 3: Textbook Passage - Iraqi Morning News",
        category: "reading",
        summary: "كتاب الطالب ص 47 وكتاب النشاط ص 74-75: زيارة وزير التربية إلى لندن، افتتاح وزير الرياضة للمدينة الرياضية بالبصرة، والطفل البطل جون سميث الذي أنقذ الطفلة إسراء.",
        grammarRuleFormula: "Key News Items:\n1) Minister of Education: Arrived in London yesterday to attend an international educational conference discussing English development programs.\n2) Minister of Youth and Sports: Opened the new Sports City in Basra (cost 1 billion IQD, took 3 years to build).\n3) John the Hero (26-year-old from UK): Saved 8-year-old Iraqi girl (Israa) from a fierce dog in the park by kicking a football at the dog.",
        detailedContent: [
          "1. Where did the Iraqi Minister of Education arrive? => In London.",
          "2. What did the conference focus on? => Developing English educational programs between schools.",
          "3. What did the Sports Minister open in Basra? => A new Sports City.",
          "4. How much did the Sports City in Basra cost? => 1 billion Iraqi dinars (1,000,000,000 IQD).",
          "5. How long did the Sports City take to build? => 3 years.",
          "6. Who was the hero that saved the little girl? => John, a 26-year-old UK citizen.",
          "7. What was the girl's name and what was she doing? => Israa (8 years old), playing with a ball in the park.",
          "8. What did John do to stop the dog? => He kicked a football at the dog."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: احفظ أرقام المدينة الرياضية: التكلفة 1 مليار دينار، والمدة 3 سنوات.",
          "اسم البطل: John، واسم الطفلة: Israa."
        ],
        commonMistakes: [
          "الخلط بين وزير التربية (ذهب للندن) ووزير الرياضة (افتتح المدينة الرياضية في البصرة)."
        ],
        examples: [
          {
            en: "The Sports City in Basra cost 1 billion IQD and took 3 years to build.",
            ar: "كلفت المدينة الرياضية في البصرة مليار دينار واستغرقت 3 سنوات لبنائها.",
            highlight: "1 billion IQD, took 3 years",
            note: "نقطة وزارية أساسية"
          }
        ],
        exercises: [
          {
            id: "3u5-l3-ex1",
            question: "The Sports Minister opened a new Sports City in (Basra / Baghdad / Erbil).",
            options: ["Basra", "Baghdad", "Erbil"],
            correctAnswer: "Basra",
            explanation: "في البصرة (Basra).",
            type: "mcq",
            ministerialYear: "وزاري 2019 تمهيدي"
          },
          {
            id: "3u5-l3-ex2",
            question: "How long did the Sports City take to build? (3 years / 1 year / 5 years)",
            options: ["3 years", "1 year", "5 years"],
            correctAnswer: "3 years",
            explanation: "استغرقت ثلاث سنوات (3 years).",
            type: "mcq",
            ministerialYear: "وزاري 2021 دور أول"
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // UNIT 6: Careers, Schools of the Future & Ibn Al-Haitham
  // -------------------------------------------------------------------------
  {
    id: 106,
    number: 6,
    titleAr: "الوحدة السادسة: المهن، مدارس المستقبل، وأبو البصريات ابن الهيثم",
    titleEn: "Unit 6: Careers, Directions, Relative Clauses, Schools of the Future & Ibn Al-Haitham",
    description: "معتمد من كتاب الطالب (SB ص 58-69) وكتاب النشاط (AB ص 88-107): تعاريف المهن، إعطاء الاتجاهات، ضمائر الوصل (who, which, that, where, whose)، قطعة مدارس المستقبل، وسيرة العالم الحسن بن الهيثم.",
    accentColor: "from-rose-600 to-pink-600",
    bgGradient: "bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200",
    lessons: [
      {
        id: "3rd-u6-l1",
        unitId: 106,
        lessonNumber: 1,
        titleAr: "الدرس الأول: تعاريف المهن والاتجاهات (Jobs Definitions & Directions)",
        titleEn: "Lesson 1: Job Definitions & Asking for Directions",
        category: "grammar",
        summary: "كتاب الطالب ص 58-60 وكتاب النشاط ص 88-91: صيغة تعريف المهن باستخدام (is someone who) وعبارات السؤال عن الطريق والاتجاهات.",
        grammarRuleFormula: "1) Job Definition Formula:\nA / An + [Job Title] + is someone who + [verb-s] + [details]\n- A doctor is someone who treats sick people.\n- A vet is someone who looks after sick animals.\n- An architect is someone who designs buildings.\n- A firefighter is someone who puts out fires.\n- A mechanic is someone who repairs cars.\n\n2) Asking for Directions:\n- Excuse me, can you tell me how to get to the [place]...?\n- Go straight on / Turn left / Turn right / It's next to the library.",
        detailedContent: [
          "في السؤال الثالث الوزاري تأتي تعاريف المهن في سؤال التوصيل أو الإسقاطات:",
          "- veterinarian (vet): sick animals",
          "- firefighter: puts out fires and saves people",
          "- architect: designs buildings",
          "- pilot: flies planes",
          "- tour guide: shows tourists around"
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: احفظ جيداً الفعل المرتبط بكل مهنة:\nvet -> animals\nfirefighter -> fires\nmechanic -> cars\narchitect -> buildings"
        ],
        commonMistakes: [
          "نسيان حرف s الشخص الثالث بعد someone who (الصحيح someone who helps وليس help)."
        ],
        examples: [
          {
            en: "A vet is someone who looks after sick animals.",
            ar: "الطبيب البيطري هو شخص يعتني بالحيوانات المريضة.",
            highlight: "is someone who looks after sick animals",
            note: "تعريف مهنة وزاري"
          }
        ],
        exercises: [
          {
            id: "3u6-l1-ex1",
            question: "A ______ is someone who puts out fires. (firefighter / pilot / architect)",
            options: ["firefighter", "pilot", "architect"],
            correctAnswer: "firefighter",
            explanation: "الإطفائي (firefighter).",
            type: "mcq",
            ministerialYear: "وزاري 2019 دور أول"
          }
        ]
      },
      {
        id: "3rd-u6-l2",
        unitId: 106,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: ضمائر الوصل (Relative Pronouns: who, which, where, whose)",
        titleEn: "Lesson 2: Relative Pronouns (who, which, that, where, whose)",
        category: "grammar",
        summary: "كتاب الطالب ص 62-63 وكتاب النشاط ص 92-95: ربط الجمل وتحديد الأسماء باستخدام ضمائر الوصل للعاقل وغير العاقل والمكان والتملك.",
        grammarRuleFormula: "1) who: مع الاسم العاقل (شخص / إنسان):\n   The man who helped me is a doctor.\n\n2) which / that: مع الاسم غير العاقل (جماد / حيوان):\n   The car which/that I bought is very fast.\n\n3) where: مع اسم المكان (إذا تبعه فاعل وجملة تدل على حدث):\n   The town where I was born is quiet.\n\n4) whose: للتملك (اسم عاقل + whose + اسم مملوك):\n   The girl whose bag was lost cried.",
        detailedContent: [
          "في الامتحان الوزاري يأتيك السؤال كاختيارات بين (who / which / where):",
          "- إذا كان قبل الفراغ اسم إنسان، اختر (who).",
          "- إذا كان قبل الفراغ اسم جماد أو حيوان، اختر (which) أو (that).",
          "- إذا كان قبل الفراغ اسم مكان وبعد الفراغ فاعل أو جملة فعلية، اختر (where).",
          "ملاحظة مهمة: إذا كان بعد المكان فعل مباشر مثل is، فنختار which لأنها تعامله كشيء."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: قاعدة الاختيارات السريعة:\nإنسان + [who] + فعل\nجماد/حيوان + [which] + فعل/فاعل\nمكان + [where] + فاعل"
        ],
        commonMistakes: [
          "استخدام who مع الحيوانات أو الجمادات.",
          "الخلط بين where و which مع أسماء الأماكن."
        ],
        examples: [
          {
            en: "That is the engineer who built the bridge.",
            ar: "ذلك هو المهندس الذي بنى الجسر.",
            highlight: "engineer who built",
            note: "اسم عاقل يأخذ who"
          },
          {
            en: "Cawkab is the village where my grandparents live.",
            ar: "كوكب هي القرية التي يعيش فيها أجدادي.",
            highlight: "village where my grandparents live",
            note: "اسم مكان يأخذ where"
          }
        ],
        exercises: [
          {
            id: "3u6-l2-ex1",
            question: "A veterinarian is someone ______ takes care of sick animals. (who / which / where)",
            options: ["who", "which", "where"],
            correctAnswer: "who",
            explanation: "الطبيب البيطري اسم عاقل لذلك نستخدم who.",
            type: "mcq",
            ministerialYear: "وزاري 2020 دور أول"
          },
          {
            id: "3u6-l2-ex2",
            question: "The mall is a place ______ people buy clothes and gifts. (where / which / who)",
            options: ["where", "which", "who"],
            correctAnswer: "where",
            explanation: "المول اسم مكان وبعده فاعل وجملة شراء، لذلك نستخدم where.",
            type: "mcq",
            ministerialYear: "وزاري 2021 دور ثانٍ"
          }
        ]
      },
      {
        id: "3rd-u6-l3",
        unitId: 106,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: قطعة الكتاب الوزارية - مدارس المستقبل (Schools of the Future)",
        titleEn: "Lesson 3: Textbook Passage - Schools of the Future",
        category: "reading",
        summary: "كتاب الطالب ص 61 وكتاب النشاط ص 96-98: رؤية التعليم في المستقبل عبر الإنترنت، المدارس الخارقة (Super schools)، والتواصل مع خبراء العالم.",
        grammarRuleFormula: "Key Vision (Schools of the Future):\n- Learning style: Over computers connected to the internet in students' own homes.\n- Teachers & classes: Virtual classes (فصول افتراضية) connecting students globally.\n- Super Schools: Each town will have one magnificent school with science parks, sports facilities, a planetarium, and art galleries.\n- Global Education: Students can listen to lessons from world-class experts across the globe.",
        detailedContent: [
          "1. How will teaching and learning take place in the future? => Over computers connected to the internet in homes.",
          "2. What are Super Schools? => Large schools in each town with sports facilities, science parks, planetariums, and music halls.",
          "3. Will students still need to go to school every day? => No, they will only come once or twice a week to use special facilities.",
          "4. How will students communicate with teachers? => Through video calls and the internet."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: احفظ عبارة: over computers connected to the internet."
        ],
        commonMistakes: [
          "الاعتقاد بعدم وجود مدارس نهائياً (ستوجد Super Schools في كل مدينة)."
        ],
        examples: [
          {
            en: "In the future, students will learn at home using the internet.",
            ar: "في المستقبل سيتعلم الطلاب في منازلهم باستخدام الإنترنت.",
            highlight: "learn at home using the internet",
            note: "نقطة وزارية أساسية"
          }
        ],
        exercises: [
          {
            id: "3u6-l3-ex1",
            question: "In future schools, students will be connected to other students by the ______.",
            options: ["internet", "train", "radio", "newspaper"],
            correctAnswer: "internet",
            explanation: "عبر شبكة الإنترنت (internet).",
            type: "mcq",
            ministerialYear: "وزاري 2018 دور ثانٍ"
          }
        ]
      },
      {
        id: "3rd-u6-l4",
        unitId: 106,
        lessonNumber: 4,
        titleAr: "الدرس الرابع: قطعة الكتاب الوزارية - العالم الحسن بن الهيثم (Al-Hasan Ibn Al-Haitham)",
        titleEn: "Lesson 4: Textbook Passage - Al-Hasan Ibn Al-Haitham (Father of Optics)",
        category: "reading",
        summary: "كتاب الطالب ص 65 وكتاب النشاط ص 104-106: سيرة العالم العربي الحسن بن الهيثم، مؤلفاته البصرية الخالدة، وكتابه الأشهر «كتاب المناظر».",
        grammarRuleFormula: "Key Biography Facts (Ibn Al-Haitham):\n- Birth: Born in Basra, Iraq in 965 AD.\n- Known as: The Father of Optics (أبو البصريات) and Al-Basri.\n- Medieval name in Europe: Alhazen, and sometimes called 'The Physicist'.\n- Major Book: Kitab Al-Manazir (Book of Optics - in 7 volumes).\n- Major Discovery: Proved that light reflects off objects into our eyes (not emitted from eyes) - basis of the camera obscura.\n- Death: Died in Cairo, Egypt in 1040 AD at age 75.",
        detailedContent: [
          "1. Where and when was Ibn Al-Haitham born? => He was born in Basra, Iraq in 965 AD.",
          "2. Where did he receive his education? => In Basra and Baghdad, and later travelled to Egypt and Spain.",
          "3. What was Ibn Al-Haitham called? => The Father of Optics (and Al-Basri).",
          "4. What was his most famous book? => Kitab Al-Manazir (Book of Optics).",
          "5. How many volumes did Kitab Al-Manazir have? => Seven (7) volumes.",
          "6. What did he prove about vision? => That light travels from objects into the eye.",
          "7. Where and when did he die? => He died in Cairo in 1040 AD."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: قطعة ابن الهيثم من أكثر قطع الكتاب وروداً في السؤال الأول فرع B.",
          "احفظ جيداً: ولد في البصرة 965م، ومات في القاهرة 1040م، وكتابه هو كتاب المناظر (Kitab Al-Manazir)."
        ],
        commonMistakes: [
          "كتابة بغداد بدلاً من البصرة لمسقط رأسه.",
          "الخطأ في تاريخ ولادته (965) أو وفاته (1040)."
        ],
        examples: [
          {
            en: "Ibn Al-Haitham was born in Basra in 965 AD and died in Cairo in 1040 AD.",
            ar: "ولد ابن الهيثم في البصرة عام 965م وتوفي في القاهرة عام 1040م.",
            highlight: "born in Basra 965 ... died in Cairo 1040",
            note: "تواريخ وزارية حاسمة"
          }
        ],
        exercises: [
          {
            id: "3u6-l4-ex1",
            question: "Ibn Al-Haitham was born in ______ in 965 AD.",
            options: ["Basra", "Baghdad", "Cairo", "Damascus"],
            correctAnswer: "Basra",
            explanation: "ولد في البصرة (Basra).",
            type: "mcq",
            ministerialYear: "وزاري 2017 دور أول"
          },
          {
            id: "3u6-l4-ex2",
            question: "What was Ibn Al-Haitham's most famous book?",
            options: ["Kitab Al-Manazir (Book of Optics)", "The Canon of Medicine", "Al-Jabr", "The Republic"],
            correctAnswer: "Kitab Al-Manazir (Book of Optics)",
            explanation: "كتاب المناظر (Kitab Al-Manazir).",
            type: "mcq",
            ministerialYear: "وزاري 2022 دور أول"
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // UNIT 7: Adverbs, Passive Voice & African Countries
  // -------------------------------------------------------------------------
  {
    id: 107,
    number: 7,
    titleAr: "الوحدة السابعة: ترتيب الظروف والمبني للمجهول وبلدان أفريقيان",
    titleEn: "Unit 7: Order of Adverbs, Passive Voice & Two African Countries (Libya & Sudan)",
    description: "معتمد من كتاب الطالب (SB ص 70-81) وكتاب النشاط (AB ص 108-125): قاعدة حَمَز لترتيب الظروف (حال ثم مكان ثم زمان)، قواعد المبني للمجهول (Passive Voice)، وقطعة بلدان أفريقيان (ليبيا والسودان).",
    accentColor: "from-teal-600 to-cyan-600",
    bgGradient: "bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200",
    lessons: [
      {
        id: "3rd-u7-l1",
        unitId: 107,
        lessonNumber: 1,
        titleAr: "الدرس الأول: ترتيب الظروف (Order of Adverbs - قاعدة حَمَز)",
        titleEn: "Lesson 1: Order of Adverbs (Manner, Place, Time)",
        category: "grammar",
        summary: "كتاب الطالب ص 70-72 وكتاب النشاط ص 108-111: القاعدة الذهبية الوزارية لترتيب الظروف الثلاثية في جملة واحدة (حال، مكان، زمان).",
        grammarRuleFormula: "القاعدة الذهبية المختصرة بكلمة (حَمَز):\n1) ح = حال (Manner):\n   غالباً ينتهي بـ ly (slowly, carefully, beautifully) أو شاذ (fast, well, on foot, by bus).\n2) م = مكان (Place):\n   in the garden, at school, in the race, to hospital, here, there.\n3) ز = زمان (Time):\n   yesterday, last night, every day, in the morning, at 7 o'clock, now.\n\nالترتيب الوزاري الإلزامي:\nManner (حال) + Place (مكان) + Time (زمان)",
        detailedContent: [
          "في الامتحان الوزاري يأتيك السؤال كاختيارات بين ترتيبات متعددة:",
          "مثال: Ali ran (well in the race yesterday / in the race well yesterday / yesterday well in the race).",
          "طريقة الحل المضمونة:",
          "1. ابحث عن ظرف الحال (well أو كلمة تنتهي بـ ly) واجعله أولاً.",
          "2. بعده ظرف المكان (in the race).",
          "3. وأخيراً ظرف الزمان (yesterday).",
          "فالخيار الصحيح هو: well in the race yesterday."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تذكر دائماً كلمة (حَمَز) باللغة العربية:\nح: حال (Manner)\nم: مكان (Place)\nز: زمان (Time)\nهذه النقطة تتكرر في السؤال الثاني فرع B كاختيارات في 95% من الأدوار الوزارية!"
        ],
        commonMistakes: [
          "وضع ظرف الزمان في المنتصف بين الحال والمكان.",
          "البدء بظرف المكان قبل ظرف الحال."
        ],
        examples: [
          {
            en: "Sami played well in the garden yesterday.",
            ar: "لعب سامي بشكل جيد (حال) في الحديقة (مكان) البارحة (زمان).",
            highlight: "well in the garden yesterday",
            note: "ترتيب صحيح وفق قاعدة حمز"
          }
        ],
        exercises: [
          {
            id: "3u7-l1-ex1",
            question: "My friend sang ______ at the party last night.",
            options: [
              "beautifully at the party last night",
              "last night beautifully at the party",
              "at the party beautifully last night",
              "beautifully last night at the party"
            ],
            correctAnswer: "beautifully at the party last night",
            explanation: "الترتيب الصحيح: الحال (beautifully) ثم المكان (at the party) ثم الزمان (last night).",
            type: "mcq",
            ministerialYear: "وزاري 2021 دور أول"
          }
        ]
      },
      {
        id: "3rd-u7-l2",
        unitId: 107,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: المبني للمجهول (The Passive Voice)",
        titleEn: "Lesson 2: Passive Voice (Present, Past & Modals)",
        category: "grammar",
        summary: "كتاب الطالب ص 74-76 وكتاب النشاط ص 112-116: تحويل الجمل من المبني للمعلوم إلى المبني للمجهول في المضارع البسيط والماضي البسيط ومع الأفعال الناقصة.",
        grammarRuleFormula: "خطوات التحويل إلى المبني للمجهول:\n1. حذف الفاعل.\n2. تقديم المفعول به في بداية الجملة.\n3. وضع فعل مساعد مناسب لزمن الجملة ومفرد/جمع المفعول به:\n   - مضارع بسيط: is / are + P.P.\n   - ماضٍ بسيط: was / were + P.P.\n   - مع can: can be + P.P.\n   - مضارع مستمر: is / are being + P.P.\n4. تكملة الجملة.",
        detailedContent: [
          "أمثلة وزارية شهيرة:",
          "- Crops (are grown) by the marsh Arabs. (المضارع البسيط).",
          "- My wallet (was stolen) last week. (الماضي البسيط).",
          "- Bats (can be seen) at night. (صيغة can be + P.P.).",
          "في أسئلة الاختيارات الوزارية: إذا كان الفاعل غير عاقل أو غير قادر على فعل الحدث بنفسه (كالقطن أو المحاصيل أو المحفظة)، فاختر صيغة المبني للمجهول فوراً!"
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تذكر دائماً أن المبني للمجهول يتطلب تصريفاً ثالثاً للفعل (P.P.).",
          "احفظ تصاريف الأفعال الشاذة: grow -> grown, steal -> stolen, see -> seen, lose -> lost."
        ],
        commonMistakes: [
          "استخدام was مع الجمع أو were مع المفرد.",
          "نسيان be بعد can (كتابة can seen خطأ، الصحيح can be seen)."
        ],
        examples: [
          {
            en: "Rice and wheat are grown by farmers in Iraq.",
            ar: "يُزرع الأرز والقمح من قبل المزارعين في العراق.",
            highlight: "are grown",
            note: "مبني للمجهول مضارع جمع"
          },
          {
            en: "His wallet was stolen at the market yesterday.",
            ar: "سُرقت محفظته في السوق البارحة.",
            highlight: "was stolen",
            note: "مبني للمجهول ماضٍ مفرد"
          }
        ],
        exercises: [
          {
            id: "3u7-l2-ex1",
            question: "Cotton and sugar (are grown / grow / is grown) in Sudan.",
            options: ["are grown", "grow", "is grown"],
            correctAnswer: "are grown",
            explanation: "القطن والسكر مفعول به جمع، لذا نستخدم are grown.",
            type: "mcq",
            ministerialYear: "وزاري 2019 دور أول"
          },
          {
            id: "3u7-l2-ex2",
            question: "My phone (was stolen / stole) last night.",
            options: ["was stolen", "stole"],
            correctAnswer: "was stolen",
            explanation: "الهاتف لا يسرق نفسه، فالصيغة مبني للمجهول بالماضي was stolen.",
            type: "mcq",
            ministerialYear: "وزاري 2022 دور أول"
          }
        ]
      },
      {
        id: "3rd-u7-l3",
        unitId: 107,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: قطعة الكتاب الوزارية - بلدان أفريقيان (Two African Countries: Libya & Sudan)",
        titleEn: "Lesson 3: Textbook Passage - Two African Countries (Libya & Sudan)",
        category: "reading",
        summary: "كتاب الطالب ص 71 وكتاب النشاط ص 116-118: المقارنة الجغرافية والاقتصادية بين ليبيا والسودان (العواصم، المحاصيل، الموارد الطبيعية، والآثار).",
        grammarRuleFormula: "Key Comparison Facts:\n1) Libya:\n- Capital: Tripoli (طرابلس).\n- Coast: On the Mediterranean Sea with narrow agricultural strip.\n- Climate: Mostly desert and hot.\n- Economy: Oil is the main source of income; also gas and natural minerals.\n- History: Famous Roman city of Leptis Magna (لبدة الكبرى - 2,600 years old).\n\n2) Sudan:\n- Capital: Khartoum (الخرطوم) - where Blue Nile and White Nile meet.\n- Main river: The River Nile is the main source of water.\n- Agriculture: Main crops are cotton and sugar; also gum Arabic (الصمغ العربي).\n- Animal farming: Sheep, cattle, and goats are raised.",
        detailedContent: [
          "1. What is the capital of Libya? => Tripoli.",
          "2. What is the capital of Sudan? => Khartoum.",
          "3. Where do the Blue Nile and White Nile join? => At Khartoum.",
          "4. What is the main source of money in Libya? => Oil.",
          "5. What are the main crops grown in Sudan? => Cotton and sugar (and gum Arabic).",
          "6. What is Leptis Magna? => An ancient historic Roman city in Libya."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه للخلط بين البلدين:\nعاصمة ليبيا: Tripoli\nعاصمة السودان: Khartoum\nالنفط في ليبيا، والقطن والسكر في السودان."
        ],
        commonMistakes: [
          "الاعتقاد بأن عاصمة السودان هي طرابلس.",
          "كتابة أن النفط هو المحصول الرئيسي للسودان (السودان يعتمد على الزراعة والقطن والسكر)."
        ],
        examples: [
          {
            en: "Libya is mostly desert, and oil is its main source of income.",
            ar: "ليبيا أغلبها صحراء، والنفط هو مصدر دخلها الرئيسي.",
            highlight: "oil is its main source of income",
            note: "نقطة وزارية أساسية"
          }
        ],
        exercises: [
          {
            id: "3u7-l3-ex1",
            question: "Libya's capital is ______ (Tripoli / Khartoum / Cairo).",
            options: ["Tripoli", "Khartoum", "Cairo"],
            correctAnswer: "Tripoli",
            explanation: "عاصمة ليبيا طرابلس (Tripoli).",
            type: "mcq",
            ministerialYear: "وزاري 2018 دور أول"
          },
          {
            id: "3u7-l3-ex2",
            question: "Sudan produces cotton, sugar, and ______ (gum Arabic / oil / wheat).",
            options: ["gum Arabic", "oil", "cars"],
            correctAnswer: "gum Arabic",
            explanation: "الصمغ العربي (gum Arabic).",
            type: "mcq",
            ministerialYear: "وزاري 2021 تمهيدي"
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // UNIT 8: Review, Study Skills & Ali's Career
  // -------------------------------------------------------------------------
  {
    id: 108,
    number: 8,
    titleAr: "الوحدة الثامنة: المراجعة النهائية وتطوير المهارات وسيرة علي المهنية",
    titleEn: "Unit 8: Final Review, Language Skills & Ali's Career",
    description: "معتمد من كتاب الطالب (SB ص 82-88) وكتاب النشاط (AB ص 126-135): مراجعة شاملة لكافة قواعد المنهج، حل المشكلات اللغوية، الإملاء والتنقيط، وقصة علي وطموح الطب البيطري.",
    accentColor: "from-amber-700 to-yellow-600",
    bgGradient: "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200",
    lessons: [
      {
        id: "3rd-u8-l1",
        unitId: 108,
        lessonNumber: 1,
        titleAr: "الدرس الأول: المراجعة الشاملة لقواعد الامتحان الوزاري",
        titleEn: "Lesson 1: Comprehensive Ministerial Grammar Checklist",
        category: "grammar",
        summary: "كتاب النشاط ص 126-130: تلخيص مركز لكافة القواعد والأسئلة الشائعة في السؤال الثاني الوزاري (فرعي A و B).",
        grammarRuleFormula: "Grammar Core Summary:\n1) Describing Places: There is a/an, There are some/any, It has.\n2) Telling the time (Digital method).\n3) Polite descriptions (a bit + adj / isn't very + opposite / isn't very good at + ing).\n4) Preferences & Suggestions (I'd like to, I'd rather, How about + ing, Let's + base).\n5) Invitations (Would you like to come to my...?).\n6) Comparatives, Superlatives & as...as.\n7) Agreeing with So / Neither.\n8) First & Second Conditionals (If clauses).\n9) Past Simple vs Past Continuous with When / While.\n10) Relative Pronouns (who, which, where, whose).\n11) Order of Adverbs (قاعدة حمز: manner + place + time).\n12) Passive Voice (is/are/was/were/can be + P.P.).",
        detailedContent: [
          "مراجعة شاملة لجميع القواعد مع تدريبات مكثفة على أسئلة الاختيارات وتصحيح الأفعال.",
          "التركيز على القواعد الأكثر تكراراً في الامتحانات الوزارية لكل دور."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: راجع هذا الملخص ليلة الامتحان الوزاري؛ يضمن لك 30 درجة كاملة في السؤال الثاني (Grammar & Functions)!"
        ],
        commonMistakes: [
          "التسرع في الإجابة دون قراءة مفتاح الجملة (أداة الربط أو ظرف الزمان أو صيغة السؤال)."
        ],
        examples: [
          {
            en: "If it rains tomorrow, we will stay at home.",
            ar: "إذا أمطرت غداً، سنبقى في المنزل.",
            highlight: "If it rains ... will stay",
            note: "حالة أولى"
          }
        ],
        exercises: [
          {
            id: "3u8-l1-ex1",
            question: "Wheat and barley (grow / are grown) in Iraq.",
            options: ["are grown", "grow"],
            correctAnswer: "are grown",
            explanation: "مبني للمجهول are grown.",
            type: "mcq",
            ministerialYear: "وزاري 2023 دور أول"
          }
        ]
      },
      {
        id: "3rd-u8-l2",
        unitId: 108,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: قواعد الإملاء والتنقيط الوزارية (Spelling & Punctuation Rules)",
        titleEn: "Lesson 2: Ministerial Spelling & Punctuation Rules",
        category: "grammar",
        summary: "كتاب النشاط ص 131-135: قواعد التنقيط (Punctuation - 5 درجات) وقواعد الإملاء (Spelling - 10 درجات بالسؤال الرابع فرع B).",
        grammarRuleFormula: "1) Punctuation Rules (التنقيط):\n- الحرف الكبير (Capital Letter): بداية الجملة، أسماء الأشخاص (Ali, Mona)، البلدان والمدن (Iraq, London)، أيام الأسبوع والشهور (Friday, June)، ضمير الفاعل (I).\n- علامة الاستفهام (?): إذا بدأت الجملة بأداة سؤال (What, Where, How) أو فعل مساعد (Is, Are, Do, Did, Can, Would).\n- النقطة (.): نهاية الجملة الخبرية المثبتة أو المنفية.\n- الفاصلة العليا ('): للاختصارات (don't, can't, I'm) والتملك (Ali's car).\n\n2) Spelling Checklist (الإملاء):\n- إضافة ing و ed وتضعيف الحرف الأخير.\n- الجمع الشاذ (man -> men, tooth -> teeth, foot -> feet, child -> children).\n- المعاكسات (happy <-> unhappy, safe <-> dangerous, expensive <-> cheap).\n- الضمائر: I -> my -> mine / he -> his -> him / they -> their -> them.",
        detailedContent: [
          "سؤال التنقيط (Punctuation): جملة من 5 علامات في السؤال الثالث فرع D.",
          "سؤال الإملاء (Spelling): 6 فروع تجيب عن 5 منها في السؤال الرابع فرع B.",
          "حفظ الضمائر، الجمع، تصاريف الأفعال الشاذة، والمعاكسات هو مفتاح الدرجة الكاملة."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: التنقيط والإملاء هما أسهل 15 درجة في الامتحان الوزاري؛ لا تضيعهما بسبب عدم الانتباه للخط وتكبير الحروف الأولى!"
        ],
        commonMistakes: [
          "نسيان تكبير حرف I عندما يأتي منفرداً في وسط الجملة.",
          "نسيان علامة الاستفهام عند البدء بـ Would you like."
        ],
        examples: [
          {
            en: "if ali goes to basra on friday he will see his friend ahmed -> If Ali goes to Basra on Friday, he will see his friend Ahmed.",
            ar: "جملة تنقيط وزارية نموذجية.",
            highlight: "If Ali goes to Basra on Friday... Ahmed.",
            note: "تكبير I و Ali و Basra و Friday و Ahmed ونقطة"
          }
        ],
        exercises: [
          {
            id: "3u8-l2-ex1",
            question: "happy <-> unhappy ; dangerous <-> ______ (safe / fast / good)",
            options: ["safe", "fast", "good"],
            correctAnswer: "safe",
            explanation: "معاكس dangerous هو safe (آمن).",
            type: "mcq",
            ministerialYear: "وزاري 2022 دور أول"
          }
        ]
      }
    ,
      {
        id: "3rd-u8-l3",
        unitId: 108,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: قصة سيرة علي المهنية ونموذج الامتحان الوزاري النهائي",
        titleEn: "Lesson 3: Ali's Career Story & Comprehensive Ministerial Exam Blueprint",
        category: "reading",
        summary: "كتاب الطالب ص 86-88: قصة طموح علي وتفوقه في دراسة الطب البيطري واللغات، مع نموذج الامتحان الوزاري النهائي الشامل وسلم الدرجات (100 درجة).",
        detailedContent: [
          "قصة علي: شغفه بالحيوانات ورعايته للخيول في مزرعة عائلته، اجتهاده في الثانوية وحصوله على معدل يؤهله لكلية الطب البيطري.",
          "أهمية اللغة الإنكليزية في الدراسات الجامعية والأبحاث العالمية والتدريب العملي.",
          "هيكل ورقة الامتحان الوزاري للصف الثالث المتوسط (100 درجة):\n1. القطعة الخارجية (15 درجة)\n2. قطع الكتاب المقررة (10 درجات)\n3. القواعد والوظائف اللغوية (20 درجة)\n4. التعاريف والتوصيل والإسقاطات (15 درجة)\n5. التنقيط والإملاء (10 درجات)\n6. قصص الكتاب (Story Time - 10 درجات)\n7. الإنشاء المنهجي (15 درجة)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: راجع تقسيم الدرجات بعناية وركز على أسئلة القواعد والإسقاطات والإنشاء لضمان درجة الامتياز."
        ],
        examples: [
          {
            en: "Ali worked tirelessly to achieve his dream of becoming a veterinary doctor.",
            ar: "عمل علي بلا كلل لتحقيق حلمه بأن يصبح طبيباً بيطرياً.",
            highlight: "achieve his dream",
            note: "الهدف والنجاح"
          }
        ],
        exercises: [
          {
            id: "3u8-l3-ex1",
            question: "Ali studied ______ at university because he loved animals and wanted to help them.",
            options: ["veterinary medicine", "engineering", "architecture", "law"],
            correctAnswer: "veterinary medicine",
            explanation: "درس علي الطب البيطري (veterinary medicine).",
            type: "mcq",
            ministerialYear: "وزاري 2022 دور أول"
          }
        ]
      }
    ]
  }
];

// ==========================================
// 2. قصص وأدب الثالث المتوسط المقررة (Story Time)
// ==========================================
export { THIRD_INTERMEDIATE_STORIES } from './thirdIntermediateStories';

// ==========================================
// 3. الإنشاءات الوزارية للثالث المتوسط (Essays)
// ==========================================
export { THIRD_INTERMEDIATE_ESSAYS } from './thirdIntermediateEssays';

// ==========================================
// 4. بنك الوزاريات للثالث المتوسط (2017 - 2025)
// ==========================================
export const THIRD_INTERMEDIATE_QUESTIONS: MinisterialExamQuestion[] = [
  {
    id: "3rd-min-q1",
    unitId: 101,
    topic: "Describing Places (There is / There are)",
    year: "2019",
    session: "دور أول",
    questionText: "There ______ lots of shops in our town. (is / are / isn't)",
    correctAnswer: "are",
    ruleExplanation: "وجود كلمة shops (اسم جمع) مع lots of يفرض استخدام الفعل المساعد are.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "3rd-min-q2",
    unitId: 101,
    topic: "Telling the Time",
    year: "2021",
    session: "دور أول",
    questionText: "15:20 (Tell the time)",
    correctAnswer: "It's three twenty.",
    ruleExplanation: "15 - 12 = 3، والدقائق 20، فالصيغة: It's three twenty.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "3rd-min-q3",
    unitId: 101,
    topic: "Polite Description",
    year: "2022",
    session: "دور أول",
    questionText: "He is fat. (Make the sentence more polite)",
    correctAnswer: "He is a bit fat.",
    ruleExplanation: "نضع a bit قبل الصفة السلبية لنجعل الوصف أكثر تهذيباً.",
    difficulty: "medium",
    category: "Grammar"
  },
  {
    id: "3rd-min-q4",
    unitId: 102,
    topic: "Suggestions",
    year: "2020",
    session: "دور أول",
    questionText: "How about ______ to the park? (go / to go / going)",
    correctAnswer: "going",
    ruleExplanation: "بعد How about نستخدم دائماً فعلاً ينتهي بـ ing.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "3rd-min-q5",
    unitId: 103,
    topic: "Order of Adverbs (قاعدة حمز)",
    year: "2021",
    session: "دور أول",
    questionText: "Sami played ______ in the match yesterday. (well / yesterday / in the match - put in correct order)",
    correctAnswer: "well in the match yesterday",
    ruleExplanation: "الترتيب الصحيح هو: الحال (well) ثم المكان (in the match) ثم الزمان (yesterday).",
    difficulty: "medium",
    category: "Grammar"
  },
  {
    id: "3rd-min-q6",
    unitId: 106,
    topic: "Relative Pronouns",
    year: "2022",
    session: "دور ثانٍ",
    questionText: "That is the engineer ______ built the hospital. (who / which / where)",
    correctAnswer: "who",
    ruleExplanation: "كلمة engineer اسم عاقل، ونستخدم who للوصل مع العاقل.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "3rd-min-q7",
    unitId: 103,
    topic: "So / Neither",
    year: "2019",
    session: "دور ثانٍ",
    questionText: "I don't like horror films. (Agree): ______",
    correctAnswer: "Neither do I",
    ruleExplanation: "الجملة منفية بـ don't فنوافق عليها بـ Neither do I.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "3rd-min-q8",
    unitId: 107,
    topic: "Passive Voice",
    year: "2023",
    session: "دور أول",
    questionText: "Wheat and barley (are grown / grow) in Iraq.",
    correctAnswer: "are grown",
    ruleExplanation: "الحنطة والشعير محصولان مفعول به جمع، لذا نستخدم المبني للمجهول are grown.",
    difficulty: "medium",
    category: "Grammar"
  },
  {
    id: "3rd-min-q9",
    unitId: 101,
    topic: "Giving Reasons",
    year: "2023",
    session: "دور ثانٍ",
    questionText: "Cars have GPS (so that you can't / to help you) get lost.",
    correctAnswer: "so that you can't",
    ruleExplanation: "نظام الـ GPS يمنع الضياع فنستخدم so that you can't مع get lost.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "3rd-min-q10",
    unitId: 103,
    topic: "Falconry & Wildlife",
    year: "2022",
    session: "دور أول",
    questionText: "Falcons can dive at (240 / 120 / 300) kilometres per hour.",
    correctAnswer: "240",
    ruleExplanation: "سرعة هبوط الصقور القصوى هي 240 كم/ساعة.",
    difficulty: "easy",
    category: "Reading"
  },
  {
    id: "3rd-min-q11",
    unitId: 106,
    topic: "Ibn Al-Haitham",
    year: "2024",
    session: "تمهيدي",
    questionText: "Ibn Al-Haitham was born in (Basra / Baghdad / Cairo) in 965 AD.",
    correctAnswer: "Basra",
    ruleExplanation: "ولد ابن الهيثم في البصرة عام 965م.",
    difficulty: "easy",
    category: "Reading"
  },
  {
    id: "3rd-min-q12",
    unitId: 105,
    topic: "Iraqi Morning News",
    year: "2024",
    session: "دور أول",
    questionText: "The new Sports City in Basra cost (1 billion / 2 billion) IQD.",
    correctAnswer: "1 billion",
    ruleExplanation: "تكلفة المدينة الرياضية في البصرة مليار دينار عراقي.",
    difficulty: "easy",
    category: "Reading"
  }
];

// ==========================================
// 5. الملزمة الافتراضية الجاهزة (كتاب الطالب والنشاط المعتمد)
// ==========================================
export const DEFAULT_PRELOADED_3RD_MALZAMA: UploadedMalzama = {
  id: "malzama-3rd-official",
  name: "المنهج الوزاري الشامل في اللغة الإنكليزية - الثالث المتوسط (كتاب الطالب وكتاب النشاط)",
  size: "24.6 MB",
  uploadDate: "2025-01-15",
  fileType: "application/pdf",
  grade: "third-intermediate",
  unitsCount: 8,
  summary: "الاعتماد الرسمي والشامل لكتاب الطالب (Student's Book) وكتاب النشاط (Activity Book) لمنهج English for Iraq للصف الثالث المتوسط: تغطية الوحدات الثمانية كاملة من 1 إلى 8، قطع الكتاب الاستيعابية (البانثر 3.0D، لوسي وعائلة سمارة، الصقور، سكان الأهوار، حياة إبراهيم، أخبار الصباح، مدارس المستقبل، ابن الهيثم، ليبيا والسودان)، قصص الأدب المقررة الثمانية (كريم، كرم، ملء الفراغ، إبراهيم، سلام أحمد، داليا، تنظيف المدرسة، سيرة علي)، والإنشاءات الوزارية النموذجية العشرة مع بنك الأسئلة والامتحانات الشاملة.",
  extractedRules: [
    {
      title: "الوصف المكاني (There is / There are / It has)",
      formula: "There is a/an (Singular) | There aren't any (Plural) | It doesn't have a...",
      explanation: "قاعدة أساسية في السؤال الثاني، تضبط الوصف المفرد والجمع واستخدام any في النفي والاستفهام.",
      examples: [
        "There is an information desk in the mall.",
        "There aren't any sweet shops on the first floor.",
        "It has a big cinema and clothes shops."
      ]
    },
    {
      title: "الإخبار عن الوقت (Telling the Time)",
      formula: "It's + Hours + Minutes (اطرح 12 إذا تجاوزت الساعة 12)",
      explanation: "الطريقة الرقمية المباشرة المعتمدة في الامتحان الوزاري.",
      examples: [
        "15:20 => It's three twenty.",
        "16:15 => It's four fifteen."
      ]
    },
    {
      title: "ترتيب الظروف (قاعدة حَمَز)",
      formula: "حال (Manner) + مكان (Place) + زمان (Time)",
      explanation: "تأتي نقطة اختيارات أساسية بالسؤال الثاني فرع B في كل دور وزاري تقريباً.",
      examples: [
        "Sami played well in the match yesterday."
      ]
    },
    {
      title: "ضمائر الوصل (who, which, that, where, whose)",
      formula: "اسم عاقل + who | اسم غير عاقل + which/that | اسم مكان + where",
      explanation: "تستخدم لربط الجمل وتحديد الأشخاص والأماكن بدقة.",
      examples: [
        "That is the engineer who built the hospital.",
        "This is the village where my grandparents live."
      ]
    },
    {
      title: "المبني للمجهول (The Passive Voice)",
      formula: "مفعول به + is/are/was/were/can be + P.P.",
      explanation: "تحويل الجمل عندما يكون الفاعل غير معلوم أو غير مهم.",
      examples: [
        "Crops are grown by marsh Arabs.",
        "My phone was stolen last night."
      ]
    }
  ],
  extractedVocab: [
    { word: "airbags", meaning: "وسائد هوائية للأمان", context: "Panther 3.0D has airbags for driver and passengers." },
    { word: "imaginative", meaning: "واسع الخيال ومبتكر", context: "Kareem was hard-working, quiet and imaginative." },
    { word: "clumsy", meaning: "أخرق وكثير الحوادث السخيفة", context: "Samara's brother is very clumsy and puts salt instead of sugar in his mother's tea." },
    { word: "houbara", meaning: "طائر الحبارى", context: "The Bedouin's favourite bird to hunt was the large houbara." },
    { word: "marshes", meaning: "الأهوار العراقية", context: "Marsh Arabs live in arched houses built from reeds." },
    { word: "zoologist", meaning: "عالم حيوان وباحث بيئي", context: "Ibrahim studied zoology at Cairo University." },
    { word: "Father of Optics", meaning: "أبو البصريات (الحسن بن الهيثم)", context: "Ibn Al-Haitham wrote Kitab Al-Manazir in seven volumes." }
  ],
  extractedQuestions: [
    {
      question: "How many seats does the Panther 3.0D have?",
      answer: "It has eight (8) seats.",
      type: "Textbook Passage (Panther 3.0D)"
    },
    {
      question: "What was Kareem’s dream?",
      answer: "To be a famous poet one day.",
      type: "Story Time (Lucky Customer 50)"
    },
    {
      question: "What did Samara's brother put in his mother's tea?",
      answer: "He put salt instead of sugar.",
      type: "Textbook Passage (Lucy's TV Comedy)"
    },
    {
      question: "Where and when was Ibn Al-Haitham born?",
      answer: "He was born in Basra in 965 AD.",
      type: "Textbook Passage (Ibn Al-Haitham)"
    },
    {
      question: "Put in order: (well / yesterday / in the race)",
      answer: "well in the race yesterday (حال ثم مكان ثم زمان - قاعدة حمز)",
      type: "Grammar"
    }
  ],
  rawContentPreview: "جمهورية العراق - وزارة التربية • منهج اللغة الإنكليزية للصف الثالث المتوسط (English for Iraq - 3rd Intermediate) • الاعتماد الحصري والشامل لكتاب الطالب (Student's Book) وكتاب النشاط (Activity Book) • تغطية شاملة للوحدات الثمانية كاملة من 1 إلى 8، قطع الكتاب الاستيعابية، قصص الأدب المقررة، الإنشاءات الوزارية النموذجية، وبنك الأسئلة الوزارية لسنوات 2017 - 2025 مع نموذج الامتحان الشامل المطابق لدفتر الامتحان الوزاري (100 درجة)."
};
