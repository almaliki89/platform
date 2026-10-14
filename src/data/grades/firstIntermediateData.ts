import { Unit, LiteratureItem, EssayItem, MinisterialExamQuestion } from '../../types';
import { MockExamPaper } from '../mockExamPapers';

// =========================================================================
// منهج اللغة الإنكليزية العراقي للصف الأول المتوسط (English for Iraq - 1st Intermediate)
// معتمد حصرياً ووفق أدق التفاصيل من:
// 1. كتاب الطالب (Student's Book)
// 2. كتاب النشاط (Activity Book)
// إشراف الأستاذ مصطفى تركي
// =========================================================================

export const FIRST_INTERMEDIATE_UNITS: Unit[] = [
  // -----------------------------------------------------------------------
  // UNIT 1: Holidays, Richard in Iraq & Free Time
  // -----------------------------------------------------------------------
  {
    id: 11,
    number: 1,
    titleAr: "الوحدة الأولى: العطلات وأوقات الفراغ (Holidays & Free Time)",
    titleEn: "Unit 1: Holidays, Richard in Iraq & Free Time",
    description: "الماضي البسيط والماضي المستمر، الأفعال القياسية والشاذة، ضمائر الملكية، هوايات جمع الصور والطوابع، واستيعاب قصة ريتشارد في العراق (Richard in Iraq).",
    accentColor: "from-emerald-600 to-teal-600",
    bgGradient: "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200",
    lessons: [
      {
        id: "1st-u1-l1",
        unitId: 11,
        lessonNumber: 1,
        titleAr: "الدرس الأول: زمن الماضي البسيط (Past Simple Tense)",
        titleEn: "Lesson 1: Past Simple Tense (Regular & Irregular Verbs)",
        category: "grammar",
        summary: "التعبير عن أحداث وقعت وانتهت في الماضي، واستخدام الأفعال القياسية (Regular) والشاذة (Irregular) في الإثبات والنفي والسؤال.",
        grammarRuleFormula: "Affirmative (المثبت):\nSubject + Verb(-ed / Irregular) + Complement\nNegative (المنفي):\nSubject + didn't + Base Verb\nQuestion (السؤال):\nDid + Subject + Base Verb...?",
        detailedContent: [
          "يستخدم زمن الماضي البسيط للتحدث عن أعمال ونشاطات تمت وانتهت في زمن الماضي (مثل ما فعله الطلاب في العطلة: stayed at home, went camping, helped in the shop).",
          "الأفعال القياسية (Regular verbs) تضاف لها (ed): play -> played, visit -> visited, stay -> stayed, watch -> watched.",
          "الأفعال الشاذة (Irregular verbs) تتغير ولا تقبل ed: go -> went, see -> saw, buy -> bought, have -> had, take -> took, eat -> ate, do -> did, make -> made.",
          "في حالة النفي نستخدم الأداة (didn't) متبوعة بمصدر الفعل المجرد: Ali didn't go to the park.",
          "في حالة السؤال نستخدم (Did) في البداية مع المصدر المجرد: Did you visit the museum?",
          "الظروف والكلمات الدالة: yesterday (أمس), last week / month / year (الماضي), ago (مضت), in the holidays (في العطلة)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه جيداً! بعد (didn't) و (Did) يرجع الفعل إلى مصدره المجرد بدون أي إضافة (didn't play / Did you see).",
          "تنبيه امتحاني من كتاب النشاط (ص 4-5): احفظ تصاريف الأفعال الشاذة الأكثر تكراراً في امتحانات نصف السنة ونهاية السنة."
        ],
        commonMistakes: [
          "كتابة He didn't went (الخطأ الشائع الفادح، الصحيح دائماً He didn't go).",
          "إضافة ed إلى فعل شاذ مثل goed أو seed (الصحيح went و saw)."
        ],
        examples: [
          {
            en: "Richard went to Iraq in the holidays and took photos.",
            ar: "ذهب ريتشارد إلى العراق في العطلة والتقط صوراً.",
            highlight: "went / took",
            note: "أفعال ماضية شاذة من go و take"
          },
          {
            en: "We didn't stay at a hotel; we camped in the desert.",
            ar: "لم نمكث في فندق؛ بل خيمنا في الصحراء.",
            highlight: "didn't stay",
            note: "نفي بالماضي ومصدر مجرد"
          },
          {
            en: "Did you help your father in the shop yesterday?",
            ar: "هل ساعدت والدك في المحل أمس؟",
            highlight: "Did you help",
            note: "سؤال بهل في الماضي البسيط"
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
            ministerialYear: "كتاب النشاط ص 6"
          }
        ]
      },
      {
        id: "1st-u1-l2",
        unitId: 11,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: استيعاب قصة ريتشارد في العراق (Richard in Iraq)",
        titleEn: "Lesson 2: Richard in Iraq & His Scrapbook (Reading Passage)",
        category: "reading",
        summary: "القطعة الاستيعابية لكتاب الطالب: زيارة ريتشارد للمعالم العراقية وصناعة سجل القصاصات (Scrapbook).",
        detailedContent: [
          "ريتشارد طالب بريطاني زار العراق برفقة والده خلال العطلة، وقام بالتقاط صور تذكارية لصنع سجل قصاصات (scrapbook).",
          "المعالم التي زارها ريتشارد في العراق: قلعة أربيل (Citadel of Erbil)، مدينة الحضر الأثرية (Hatra)، زقورة أور في الناصرية (Ziggurat of Ur)، الأهوار في الجنوب (The Marshes / Al-Ahwar)، مدينة بابل الأثرية (Babylon)، والأسواق الشعبية في بغداد (Traditional Souqs/Markets).",
          "الصفات التي استخدمها ريتشارد لوصف المعالم: amazing (مذهل), fantastic (رائع), huge (ضخم), interesting (ممتع), boring (ممل), exciting (مثير)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: هذا النص مصدر أساسي لأسئلة القطعة في امتحانات الشهر الأول ونصف السنة.",
          "تأكد من حفظ معاني الصفات التقييمية: fantastic = رائع، boring = ممل، amazing = مدهش."
        ],
        commonMistakes: [
          "الخلط بين مكان زقورة أور (Ur في الجنوب) وقلعة أربيل (Citadel في الشمال)."
        ],
        examples: [
          {
            en: "Richard thought the Citadel of Erbil was amazing.",
            ar: "اعتقد ريتشارد أن قلعة أربيل كانت مذهلة.",
            highlight: "amazing",
            note: "صفة وصفية إيجابية"
          },
          {
            en: "The marshes in the south of Iraq are exciting and full of wildlife.",
            ar: "الأهوار في جنوب العراق مثيرة ومليئة بالحياة البرية.",
            highlight: "marshes",
            note: "أهوار جنوب العراق"
          }
        ],
        exercises: [
          {
            id: "1u1-ex-richard1",
            question: "Richard went to Iraq with his ______.",
            options: ["father", "teacher", "brother", "friend"],
            correctAnswer: "father",
            explanation: "سافر ريتشارد إلى العراق برفقة والده (with his father).",
            type: "mcq",
            ministerialYear: "كتاب الطالب ص 6"
          },
          {
            id: "1u1-ex-richard2",
            question: "What did Richard take photos of for his scrapbook?",
            options: ["Historical sites in Iraq", "Modern airports only", "Cars only", "Football matches"],
            correctAnswer: "Historical sites in Iraq",
            explanation: "التقط صوراً للمواقع التاريخية والتراثية مثل أور وأربيل وبابل والأهوار.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 7"
          }
        ]
      },
      {
        id: "1st-u1-l3",
        unitId: 11,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: زمن الماضي المستمر (Past Continuous Tense)",
        titleEn: "Lesson 3: Past Continuous Tense (was / were + verb-ing)",
        category: "grammar",
        summary: "التعبير عن حدث كان مستمراً في لحظة معينة في الماضي، والربط باستخدام (While).",
        grammarRuleFormula: "Subject (I, He, She, It) + was + Verb-ing\nSubject (We, You, They) + were + Verb-ing\nNegative: was not (wasn't) / were not (weren't) + Verb-ing\nQuestion: Was / Were + Subject + Verb-ing...?",
        detailedContent: [
          "يستخدم الماضي المستمر لبيان أن حدثاً استمر لفترة زمنية في الماضي في وقت محدد.",
          "نستخدم was مع المفرد (I, He, She, It، والاسم المفرد): I was reading, He was sleeping.",
          "نستخدم were مع الجمع (We, You, They، والاسم الجمع): We were playing, They were watching.",
          "قاعدة أداة الربط While (بينما): يأتي بعدها دائماً جملة ماضٍ مستمر، والحدث القاطع يكون ماضياً بسيطاً.",
          "قواعد إضافة ing: إذا انتهى الفعل بـ e تُحذف (make -> making, write -> writing)، وإذا انتهى بحرف صحيح قبله علة واحد يُضاعف (sit -> sitting, run -> running)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه للضمير (I)، في الماضي المستمر يأخذ was وليس were: I was watching TV.",
          "سؤال شهير في كتاب النشاط ص 8: While Ali was walking, it started to rain."
        ],
        commonMistakes: [
          "استخدام were مع المفرد: He were running (الصحيح He was running).",
          "نسيان حذف الـ e عند إضافة ing مثل writeing (الصحيح writing)."
        ],
        examples: [
          {
            en: "While Muna was doing her homework, the lights went out.",
            ar: "بينما كانت منى تحل واجبها، انطفأت الأضواء.",
            highlight: "was doing",
            note: "ماضٍ مستمر بعد While"
          },
          {
            en: "The boys were playing football at five o'clock yesterday.",
            ar: "كان الأولاد يلعبون كرة القدم في الساعة الخامسة أمس.",
            highlight: "were playing",
            note: "حدث مستمر في وقت محدد"
          }
        ],
        exercises: [
          {
            id: "1u1-ex3",
            question: "While we were having lunch, a bird ______ into the kitchen. (flew / was flying / flies)",
            options: ["flew", "was flying", "flies", "fly"],
            correctAnswer: "flew",
            explanation: "الحدث القاطع بعد جملة While المستمرة يكون في الماضي البسيط flew.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 9"
          }
        ]
      },
      {
        id: "1st-u1-l4",
        unitId: 11,
        lessonNumber: 4,
        titleAr: "الدرس الرابع: ضمائر الملكية وصفات الملكية (Possessive Pronouns)",
        titleEn: "Lesson 4: Possessive Pronouns (mine, yours, his, hers, ours, theirs)",
        category: "grammar",
        summary: "الفرق بين صفات التملك المتبوعة باسم، وضمائر التملك التي تأتي بمفردها في نهاية الجملة.",
        grammarRuleFormula: "Possessive Adjectives (+ Noun):\nmy, your, his, her, its, our, their + [اسم]\n\nPossessive Pronouns (بدون اسم بعده):\nmine, yours, his, hers, its, ours, theirs",
        detailedContent: [
          "صفة التملك يأتي بعدها اسم الشيء المملوك دائماً: This is my book. / That is her pen.",
          "ضمير التملك يحل محل (الصفة + الاسم) ويأتي منفرداً في نهاية الجملة دون اسم بعده: This book is mine. / That pen is hers.",
          "السؤال عن الملكية يبدأ بكلمة (Whose): Whose bag is this? It's mine.",
          "جدول التحويلات الحاسم من كتاب النشاط ص 11:\n- I -> my (صفة) -> mine (ضمير)\n- You -> your (صفة) -> yours (ضمير)\n- He -> his (صفة) -> his (ضمير)\n- She -> her (صفة) -> hers (ضمير)\n- We -> our (صفة) -> ours (ضمير)\n- They -> their (صفة) -> theirs (ضمير)"
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: إذا كان الفراغ في نهاية الجملة ولا يوجد بعده اسم، فاختر ضمير الملكية المنتهي بـ s (yours, hers, ours, theirs) أو mine.",
          "إذا كان بعد الفراغ اسم الشيء فاختر صفة الملكية (my, her, our...)."
        ],
        commonMistakes: [
          "كتابة mine book (الصحيح my book أو The book is mine).",
          "وضع فاصلة عليا بضمائر الملكية مثل her's (الصحيح hers بدون فاصلة)."
        ],
        examples: [
          {
            en: "Whose car is this? It's ours.",
            ar: "لمن هذه السيارة؟ إنها لنا.",
            highlight: "ours",
            note: "ضمير تملك جاء منفرداً"
          },
          {
            en: "This is my jacket, and that one on the chair is yours.",
            ar: "هذه سترتي، وتلك التي على الكرسي هي سترتك.",
            highlight: "my / yours",
            note: "مقارنة بين صفة التملك وضمير التملك"
          }
        ],
        exercises: [
          {
            id: "1u1-ex4",
            question: "I lost my pen. Can you lend me ______? (your / yours / you)",
            options: ["yours", "your", "you", "yours'"],
            correctAnswer: "yours",
            explanation: "جاء الفراغ في نهاية الجملة دون اسم بعده، لذا نختار ضمير التملك yours.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 11"
          }
        ]
      }
    ]
  },

  // -----------------------------------------------------------------------
  // UNIT 2: Seasons, Weather, Months & Future Simple
  // -----------------------------------------------------------------------
  {
    id: 12,
    number: 2,
    titleAr: "الوحدة الثانية: الفصول والطقس والأشهر (Seasons & Weather)",
    titleEn: "Unit 2: Seasons, Months & Future Simple",
    description: "فصول السنة الأربعة، أسماء الأشهر واختصاراتها، الأعداد الترتيبية وكتابة التواريخ، وقواعد المستقبل البسيط باستخدام (will / won't).",
    accentColor: "from-sky-600 to-blue-600",
    bgGradient: "bg-gradient-to-r from-sky-50 to-blue-50 border-sky-200",
    lessons: [
      {
        id: "1st-u2-l1",
        unitId: 12,
        lessonNumber: 1,
        titleAr: "الدرس الأول: فصول السنة وصفات الطقس (The Seasons & Weather)",
        titleEn: "Lesson 1: The Seasons of the Year & Weather Adjectives",
        category: "vocabulary",
        summary: "فصول السنة الأربعة (Winter, Spring, Summer, Autumn) ومفردات الطقس في إنجلترا والعراق.",
        detailedContent: [
          "فصول السنة الأربعة:\n1. Winter (الشتاء) - cold, snowy, rainy\n2. Spring (الربيع) - cool, warm, flowers grow\n3. Summer (الصيف) - hot, sunny, dry\n4. Autumn (الخريف) - windy, cool, leaves fall",
          "مفردات الطقس الأساسية:\n- cold (بارد) / cool (معتدل يميل للبرودة) / warm (دافئ) / hot (حار)\n- sunny (مشمس) / rainy (ممطر) / windy (عاصف برياح) / snowy (مثلج) / cloudy (غائم)",
          "الطقس في العراق:\n- In summer, it is always very hot and sunny.\n- In winter, it is cold and it sometimes rains.",
          "حروف الجر مع الفصول: نستخدم حرف الجر (in) دائماً قبل أسماء الفصول: in winter, in summer."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه لكلمة Autumn، حرف الـ n في نهايتها صامت لا يُلفظ (آوتَم).",
          "سؤال مطابقة متكرر من كتاب النشاط ص 14: Match the weather words with their seasons."
        ],
        commonMistakes: [
          "الخلط بين cool (معتدل منعش مائل للبرودة) و warm (دافئ مائل للحرارة).",
          "استخدام at بدلاً من in مع فصول السنة."
        ],
        examples: [
          {
            en: "In Iraq, it is hot and dry in summer.",
            ar: "في العراق، يكون الطقس حاراً وجافاً في الصيف.",
            highlight: "hot and dry",
            note: "صفات طقس الصيف العراقي"
          },
          {
            en: "It is often windy in autumn.",
            ar: "غالباً ما يكون الطقس عاصفاً في الخريف.",
            highlight: "windy",
            note: "صفة الرياح في الخريف"
          }
        ],
        exercises: [
          {
            id: "1u2-ex-vocab1",
            question: "In winter, it is always ______ and it often rains.",
            options: ["cold", "hot", "sunny", "warm"],
            correctAnswer: "cold",
            explanation: "فصل الشتاء (winter) يتصف بالبرودة الدائمة (cold).",
            type: "mcq",
            ministerialYear: "كتاب الطالب ص 14"
          }
        ]
      },
      {
        id: "1st-u2-l2",
        unitId: 12,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: أسماء الأشهر والأعداد الترتيبية (Months & Dates)",
        titleEn: "Lesson 2: Months of the Year & Ordinal Numbers",
        category: "spelling",
        summary: "حفظ أسماء واختصارات أشهر السنة الـ 12، وكتابة التواريخ بالأرقام الترتيبية وقواعد التنقيط.",
        detailedContent: [
          "أشهر السنة الـ 12 واختصاراتها الرسمية في كتاب النشاط ص 16:\n1. January (Jan.)\n2. February (Feb.)\n3. March (Mar.)\n4. April (Apr.)\n5. May (May)\n6. June (Jun.)\n7. July (Jul.)\n8. August (Aug.)\n9. September (Sep.)\n10. October (Oct.)\n11. November (Nov.)\n12. December (Dec.)",
          "قاعدة التنقيط والإملاء: تبدأ جميع أسماء الأشهر بحرف كبير (Capital Letter) دائماً أينما وردت في الجملة.",
          "الأعداد الترتيبية (Ordinal Numbers) لقراءة وكتابة الأيام:\n- 1st = first\n- 2nd = second\n- 3rd = third\n- 4th = fourth / 5th = fifth\n- 21st = twenty-first\n- 22nd = twenty-second\n- 23rd = twenty-third\n- 31st = thirty-first",
          "حرف الجر مع الأشهر والتواريخ:\n- مع الشهر بمفرده نستخدم: in (in January, in July).\n- مع التاريخ الكامل المحدد باليوم نستخدم: on (on 21st March, on 1st January)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه للفرق الحاسم في حروف الجر:\n- In July (شهر فقط)\n- On 5th July (تاريخ يوم محدد).",
          "سؤال الإملاء يتكرر كثيراً: 1st : first / 2nd : second / 3rd : third."
        ],
        commonMistakes: [
          "كتابة اسم الشهر بحرف صغير مثل april (الصحيح April دائماً).",
          "كتابة on July بدلاً من in July."
        ],
        examples: [
          {
            en: "Mother's Day in Iraq is on 21st March.",
            ar: "عيد الأم في العراق يصادف الحادي والعشرين من آذار.",
            highlight: "on 21st March",
            note: "تاريخ محدد يسبقه on ويكتب بالعدد الترتيبي"
          },
          {
            en: "July is the hottest month of the year in Baghdad.",
            ar: "تموز هو أكثر أشهر السنة حرارة في بغداد.",
            highlight: "July",
            note: "اسم شهر يبدأ بحرف كبير"
          }
        ],
        exercises: [
          {
            id: "1u2-ex-dates1",
            question: "My birthday is ______ 15th October. (in / on / at / for)",
            options: ["on", "in", "at", "to"],
            correctAnswer: "on",
            explanation: "مع التواريخ المحددة باليوم نستخدم حرف الجر on.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 17"
          },
          {
            id: "1u2-ex-spelling-ord",
            question: "one -> first ; three -> ______ [Spelling]",
            options: ["third", "threed", "threeth", "thirst"],
            correctAnswer: "third",
            explanation: "العدد الترتيبي للرقم three هو third.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          }
        ]
      },
      {
        id: "1st-u2-l3",
        unitId: 12,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: زمن المستقبل البسيط مع (will / won't)",
        titleEn: "Lesson 3: Future Simple with will / won't",
        category: "grammar",
        summary: "التنبؤ بأحداث الطقس والمستقبل، واستخدام will والمصدر المجرد في الإثبات والنفي.",
        grammarRuleFormula: "Affirmative (+):\nSubject + will ('ll) + Base Verb\nNegative (-):\nSubject + will not (won't) + Base Verb\nQuestion (?):\nWill + Subject + Base Verb...?",
        detailedContent: [
          "نستخدم will للتنبؤ بأحداث ستقع في المستقبل أو توقعات النشرة الجوية: It will rain tomorrow.",
          "اختصار will هو ('ll)، واختصار will not هو الصيغة الهامة (won't).",
          "القاعدة الذهبية: بعد will و won't يأتي دائماً فعل مجرد (infinitive) بدون أي إضافة (لا s ولا ed ولا ing).",
          "الظروف الدالة: tomorrow (غداً), next week / month (القادم), in the future (في المستقبل)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه لصيغة الاختصار won't، تأتي دائماً في سؤال الإملاء: will not = won't.",
          "بعد will نستخدم be للتعبير عن صفة: It will be cold (وليس It will cold)."
        ],
        commonMistakes: [
          "إضافة s الشخص الثالث بعد will مثل: It will rains (الصحيح It will rain).",
          "كتابة willn't بدلاً من won't."
        ],
        examples: [
          {
            en: "It will be cold and cloudy in Mosul tomorrow.",
            ar: "سيكون الطقس بارداً وغائماً في الموصل غداً.",
            highlight: "will be",
            note: "تنبؤ مستقبلي متبوع بالمصدر be"
          },
          {
            en: "We won't go swimming if it rains.",
            ar: "لن نذهب للسباحة إذا أمطرت السماء.",
            highlight: "won't go",
            note: "نفي المستقبل مع مصدر مجرد"
          }
        ],
        exercises: [
          {
            id: "1u2-ex1",
            question: "It ______ (snow) in the mountains next week.",
            options: ["will snow", "snows", "snowed", "is snowing"],
            correctAnswer: "will snow",
            explanation: "وجود ظرف المستقبل next week يتطلب صيغة المستقبل البسيط will + snow.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 19"
          }
        ]
      }
    ]
  },

  // -----------------------------------------------------------------------
  // UNIT 3: Great Activities & Present Perfect Simple
  // -----------------------------------------------------------------------
  {
    id: 13,
    number: 3,
    titleAr: "الوحدة الثالثة: الأنشطة العظيمة والمضارع التام (Great Activities)",
    titleEn: "Unit 3: Great Activities & Present Perfect Simple",
    description: "قواعد المضارع التام البسيط مع (have / has + P.P.)، مساعدة الأم والمهام المنزلية، والتصريف الثالث للأفعال الشاذة والقياسية.",
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
        summary: "التعبير عن إنجاز نشاط أو مهمة في الماضي ولها نتيجة أو أثر في الوقت الحاضر.",
        grammarRuleFormula: "Subject (I, We, You, They) + have ('ve) + Past Participle (P.P.)\nSubject (He, She, It) + has ('s) + Past Participle (P.P.)\nNegative: haven't / hasn't + P.P.\nQuestion: Have / Has + Subject + P.P...?",
        detailedContent: [
          "يستخدم المضارع التام للتعبير عن حدث تم وانتهى في وقت غير محدد ونتيجته واضحة الآن (مثل: لقد رتبت الغرفة، لقد غسلت الصحون).",
          "نستخدم have مع ضمائر المتكلم والجمع: I have, We have, They have.",
          "نستخدم has مع ضمائر المفرد الغائب: He has, She has, It has.",
          "الفعل بعد have أو has يجب أن يكون في صيغة التصريف الثالث (Past Participle - P.P.).",
          "الأفعال القياسية ينتهي تصريفها الثالث بـ ed مثل: tidy -> tidied, wash -> washed, clean -> cleaned.",
          "الأفعال الشاذة يتغير تصريفها: see -> seen, write -> written, eat -> eaten, drink -> drunk, do -> done, break -> broken."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: مفتاح الإجابة الصحيحة هو حفظ التصريف الثالث (P.P.)، فبمجرد رؤية have أو has بالجملة اختر فوراً التصريف الثالث.",
          "في السؤال نقدم have أو has على الفاعل: Have you finished your homework?"
        ],
        commonMistakes: [
          "وضع فعل ماضٍ بسيط بعد has مثل: She has wrote a letter (الصحيح She has written).",
          "استخدام have مع المفرد He أو She."
        ],
        examples: [
          {
            en: "Fatima has tidied her bedroom and washed the dishes.",
            ar: "لقد رتبت فاطمة غرفة نومها وغسلت الصحون.",
            highlight: "has tidied / washed",
            note: "مفرد + has + تصريف ثالث"
          },
          {
            en: "We have finished our English project.",
            ar: "لقد أنهينا مشروعنا في اللغة الإنكليزية.",
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
            ministerialYear: "كتاب النشاط ص 28"
          },
          {
            id: "1u3-ex2",
            question: "______ you ever ridden a camel? (Have / Has / Did / Are)",
            options: ["Have", "Has", "Did", "Do"],
            correctAnswer: "Have",
            explanation: "مع الفاعل you والتصريف الثالث ridden نستخدم أداة السؤال Have.",
            type: "mcq",
            ministerialYear: "كتاب الطالب ص 25"
          }
        ]
      },
      {
        id: "1st-u3-l2",
        unitId: 13,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: قائمة التصاريف الشاذة الهامة (Irregular Past Participles)",
        titleEn: "Lesson 2: Irregular Verbs Table (Base - Past - P.P.)",
        category: "spelling",
        summary: "الجدول الإملائي المعتمد للتصاريف الثلاثة للأفعال من كتاب النشاط ص 30.",
        detailedContent: [
          "أهم الأفعال الشاذة المقررة في المنهج وتصاريفها الثلاثة:\n1. see -> saw -> seen (يرى)\n2. write -> wrote -> written (يكتب)\n3. eat -> ate -> eaten (يأكل)\n4. drink -> drank -> drunk (يشرب)\n5. go -> went -> gone / been (يذهب)\n6. do -> did -> done (يفعل)\n7. break -> broke -> broken (يكسر)\n8. buy -> bought -> bought (يشتري)\n9. catch -> caught -> caught (يمسك / يصيد)\n10. take -> took -> taken (يأخذ)\n11. make -> made -> made (يصنع)\n12. give -> gave -> given (يعطي)"
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: هذا الجدول يأتي منه سؤال الإملاء بنسبة 100% في الامتحان: see -> seen ; eat -> ______ (الجواب eaten)."
        ],
        commonMistakes: [
          "كتابة eated بدلاً من eaten.",
          "كتابة drinked بدلاً من drunk."
        ],
        examples: [
          {
            en: "He has eaten all the apples.",
            ar: "لقد أكل كل التفاح.",
            highlight: "eaten",
            note: "تصريف ثالث شاذ من eat"
          }
        ],
        exercises: [
          {
            id: "1u3-ex-spelling-pp",
            question: "clean -> cleaned ; give -> ______ [Spelling]",
            options: ["given", "gaved", "gave", "giving"],
            correctAnswer: "given",
            explanation: "التصريف الثالث للفعل give هو given.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          }
        ]
      }
    ,
      {
        id: "1st-u3-l3",
        unitId: 13,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: أدوات الربط والأنشطة والقصص (Joining Words & Great Activities)",
        titleEn: "Lesson 3: Conjunctions (and, but, because, so, or) & Adventure Activities",
        category: "grammar",
        summary: "استخدام أدوات الربط (and, but, because, so, or) لربط الجمل المعبرة عن الهوايات والأنشطة اليومية في كتاب النشاط ص 24-28.",
        grammarRuleFormula: "Conjunctions Rules:\n- and: إضافة معلومة متوافقة (I like tennis and football.)\n- but: إظهار التناقض (He is clever, but he is lazy.)\n- because: بيان السبب وراء الحدث (We stayed home because it was raining.)\n- so: بيان النتيجة المترتبة (It was raining, so we stayed home.)\n- or: التخيير بين أمرين (Would you like tea or coffee?)",
        detailedContent: [
          "تمرين كتاب النشاط ص 26: دمج جملتين بسيطتين لتكوين جملة مركبة باستخدام أدوات الربط.",
          "التركيز على الفاصلة (comma) قبل but و so عند ربط جملتين كاملتين.",
          "التعبير عن الأنشطة والمغامرات: climbing mountains, exploring caves, camping in the wild."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تذكر دائماً: because يأتي بعدها السبب (reason)، بينما so يأتي بعدها النتيجة (result)."
        ],
        examples: [
          {
            en: "Ali wanted to buy the new camera, but he did not have enough money.",
            ar: "أراد علي شراء الكاميرا الجديدة، ولكنه لم يمتلك مالاً كافياً (تناقض).",
            highlight: "but he did not have",
            note: "ربط أداة but"
          }
        ],
        exercises: [
          {
            id: "1u3-l3-ex1",
            question: "I could not phone you ______ I lost my mobile phone.",
            options: ["because", "so", "but", "and"],
            correctAnswer: "because",
            explanation: "فقدان الهاتف هو سبب عدم الاتصال، لذا نستخدم because.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 26"
          }
        ]
      }
    ]
  },

  // -----------------------------------------------------------------------
  // UNIT 4: Fun with English & First Term Revision
  // -----------------------------------------------------------------------
  {
    id: 14,
    number: 4,
    titleAr: "الوحدة الرابعة: المراجعة الشاملة لنصف السنة (Revision 1)",
    titleEn: "Unit 4: Fun with English & Mid-Term Revision",
    description: "المراجعة الشاملة للوحدات الثلاث الأولى: الماضي البسيط والمستمر، المستقبل مع will، المضارع التام، وأسئلة امتحان نصف السنة.",
    accentColor: "from-teal-600 to-cyan-600",
    bgGradient: "bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200",
    lessons: [
      {
        id: "1st-u4-l1",
        unitId: 14,
        lessonNumber: 1,
        titleAr: "الدرس الأول: المراجعة القواعدية الشاملة للأزمنة",
        titleEn: "Lesson 1: Grammar Revision (Tenses & Pronouns)",
        category: "grammar",
        summary: "التمييز الدقيق بين الأزمنة الأربعة المقررة في الكورس الأول والضمائر.",
        detailedContent: [
          "1. الماضي البسيط: أحداث منتهية مع (yesterday, last, ago) -> الفعل فيه ed أو شاذ (went, played).",
          "2. الماضي المستمر: حدث مستمر في وقت محدد أو بعد While -> نستخدم (was/were + v-ing).",
          "3. المستقبل البسيط: تنبؤات وأحداث قادمة مع (tomorrow, next) -> نستخدم (will/won't + base verb).",
          "4. المضارع التام: إنجاز أحداث لها نتيجة حالية -> نستخدم (have/has + P.P.)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه للظرف الزمني في الجملة فهو الذي يحدد اختيار الزمن فوراً دون أي تردد."
        ],
        examples: [
          {
            en: "Yesterday I went (Past Simple), while today I have finished my task (Present Perfect).",
            ar: "أمس ذهبت (ماضٍ بسيط)، بينما اليوم أنهيت مهمتي (مضارع تام).",
            highlight: "went / have finished",
            note: "مقارنة الأزمنة"
          }
        ],
        exercises: [
          {
            id: "1u4-rev-ex1",
            question: "Look! Ali has ______ (break) his glasses.",
            options: ["broken", "broke", "breaks", "breaking"],
            correctAnswer: "broken",
            explanation: "بعد has نستخدم التصريف الثالث broken.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          }
        ]
      },
      {
        id: "1st-u4-l2",
        unitId: 14,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: مفردات الكورس الأول ونماذج أسئلة نصف السنة",
        titleEn: "Lesson 2: Term 1 Vocabulary, Stories & Midterm Practice",
        category: "vocabulary",
        summary: "تجميع شامل لمفردات العطلات والأنشطة والطقس والأشهر، ومراجعة قصة ريتشارد في العراق وأسئلة نصف السنة الرسمية.",
        grammarRuleFormula: "Key Vocabulary Recap:\n- scrapbook (دفتر القصاصات والصور)\n- ancient ruins (الآثار القديمة)\n- ordinal numbers (الأعداد الترتيبية: first, second, third)\n- seasons (spring, summer, autumn, winter)",
        detailedContent: [
          "مراجعة شاملة لجميع معاني الكلمات التي تأتي في سؤال الإسقاطات في امتحان نصف السنة.",
          "تمرين كتاب النشاط حول ربط الكلمات بتعاريفها الصحيحة.",
          "التركيز على قصة ريتشارد في العراق والأنشطة التي قام بها أثناء زيارته للبلاد."
        ],
        teacherNotes: [
          "احفظ كتابة الأعداد الترتيبية: 1st (first), 2nd (second), 3rd (third), 4th (fourth)."
        ],
        examples: [
          {
            en: "Richard took lots of colourful photos and put them in his scrapbook.",
            ar: "التقط ريتشارد الكثير من الصور الملونة ووضعها في دفتر قصاصاته.",
            highlight: "scrapbook",
            note: "مفردات الوحدة الأولى"
          }
        ],
        exercises: [
          {
            id: "1u4-rev-ex2",
            question: "A book with blank pages for sticking pictures is called a ______.",
            options: ["scrapbook", "magazine", "dictionary", "novel"],
            correctAnswer: "scrapbook",
            explanation: "دفتر القصاصات ولصق الصور يسمى scrapbook.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 8"
          }
        ]
      }
    ,
      {
        id: "1st-u4-l3",
        unitId: 14,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: قصة الكورس الأول ونموذج امتحان نصف السنة الشامل",
        titleEn: "Lesson 3: The World Youth Camp Story & Comprehensive Midterm Blueprint",
        category: "reading",
        summary: "قصة مخيم الشباب العالمي (Bob and Basim) المقررة في الكورس الأول، ونموذج كامل لأسئلة امتحان نصف السنة للأول المتوسط.",
        detailedContent: [
          "قصة بوب وباسم: لقاء بوب وباسم في الطائرة المتجهة إلى أستراليا للمشاركة في مخيم الشباب العالمي.",
          "حادثة حقيبة بوب الضائعة والمواقف الطريفة في المطار.",
          "هيكل امتحان نصف السنة الرسمي للأول المتوسط (60 درجة تحول إلى 100):\n1. القطعة الاستيعابية (10 درجات)\n2. القواعد والوظائف (20 درجة)\n3. المفردات والتنقيط (15 درجة)\n4. قصة الكورس الأول (5 درجات)\n5. الإنشاء المنهجي (10 درجات)."
        ],
        teacherNotes: [
          "احفظ أسئلة قصة بوب وباسم لأنها جزء أساسي وثابت في سؤال القصة (Story Time)."
        ],
        examples: [
          {
            en: "Where was the World Youth Camp held? It was held in Australia.",
            ar: "أين أقيم مخيم الشباب العالمي؟ في أستراليا.",
            highlight: "held in Australia",
            note: "سؤال قصة مقرر"
          }
        ],
        exercises: [
          {
            id: "1u4-l3-ex1",
            question: "Where were Bob and Basim travelling to for the youth camp?",
            options: ["Australia", "England", "Iraq", "France"],
            correctAnswer: "Australia",
            explanation: "كانا مسافرين إلى أستراليا (Australia).",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة الرسمي"
          }
        ]
      }
    ]
  },

  // -----------------------------------------------------------------------
  // UNIT 5: Other Countries, Comparative & Superlative
  // -----------------------------------------------------------------------
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
        grammarRuleFormula: "Short Adjectives (مقطع واحد):\nComparative: adj + -er + than (smaller than, bigger than)\nSuperlative: the + adj + -est (the smallest, the biggest)\n\nLong Adjectives (أكثر من مقطع):\nComparative: more + adj + than (more beautiful than)\nSuperlative: the most + adj (the most beautiful)",
        detailedContent: [
          "الصفات ذات المقطع الصوتي الواحد نضيف لها (er) عند المقارنة و (est) عند التفضيل.",
          "مضاعفة الحرف الصحيح: إذا انتهت الصفة بحرف صحيح قبله حرف علة واحد نضاعف الحرف الأخير: big -> bigger -> the biggest, hot -> hotter -> the hottest.",
          "قلب الـ y: إذا انتهت الصفة بـ y وقبلها حرف صحيح تُقلب إلى i: sunny -> sunnier -> the sunniest, dry -> drier -> the driest.",
          "الصفات الطويلة (مقطعان أو أكثر) نستخدم معها more / the most: interesting -> more interesting -> the most interesting.",
          "الصفات الشاذة الحفظ: good -> better -> the best / bad -> worse -> the worst / far -> farther -> the farthest."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: إذا وجدت كلمة (than) بعد الفراغ فاختر صيغة المقارنة (-er أو more).",
          "إذا وجدت أداة التعريف (the) قبل الفراغ فاختر صيغة التفضيل (-est أو most)."
        ],
        commonMistakes: [
          "كتابة more bigger (خطأ جمع طريقتين معاً؛ الصحيح bigger فقط).",
          "نسيان مضاعفة الحرف الأخير في big و hot."
        ],
        examples: [
          {
            en: "India is bigger than Oman, but France is the most interesting for shopping.",
            ar: "الهند أكبر من عُمان، ولكن فرنسا هي الأكثر متعة للتسوق.",
            highlight: "bigger than / the most interesting",
            note: "مقارنة صفة قصيرة وتفضيل صفة طويلة"
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
            ministerialYear: "كتاب النشاط ص 42"
          },
          {
            id: "1u5-ex-spelling-comp",
            question: "cold -> colder ; good -> ______ [Spelling]",
            options: ["better", "gooder", "best", "more good"],
            correctAnswer: "better",
            explanation: "المقارنة الشاذة من good هي better.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
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
          "أمثلة منهجية من كتاب الطالب ص 35:\n- Mr. Hazim has gone to London. He is in London now.\n- Jassim is back in Iraq now; he has been to England."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: ابحث عن عبارات مثل (He is not here / He is away / He will return next week) -> اختر gone فوراً.",
          "إذا وجدت (He is back / He is at home now / Welcome back) -> اختر been."
        ],
        commonMistakes: [
          "اختيار gone لشخص يتحدث معك وجهاً لوجه عن رحلته السابقة (الصحيح been لأنه عاد)."
        ],
        examples: [
          {
            en: "Jassim is not here at the moment. He has gone to the bank.",
            ar: "جاسم ليس هنا في هذه اللحظة؛ لقد ذهب إلى المصرف (ولم يعد بعد).",
            highlight: "has gone",
            note: "ذهب وما زال هناك"
          },
          {
            en: "Have you ever been to Lebanon? Yes, I went there last year.",
            ar: "هل زرت لبنان من قبل؟ نعم، ذهبت إلى هناك العام الماضي (وزرت وعُدت).",
            highlight: "been to",
            note: "زيارة سابقة وعودة"
          }
        ],
        exercises: [
          {
            id: "1u5-ex2",
            question: "Huda is back home now. She has ______ to the dentist. (been / gone)",
            options: ["been", "gone", "go", "went"],
            correctAnswer: "been",
            explanation: "هدى في البيت الآن (is back home)، أي أنها زارت طبيب الأسنان وعادت، فنختار been.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 45"
          }
        ]
      },
      {
        id: "1st-u5-l3",
        unitId: 15,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: نصوص ومعلومات البلدان الأربعة (Country Profiles)",
        titleEn: "Lesson 3: Four Countries (France, India, Oman, Japan)",
        category: "reading",
        summary: "القطعة الاستيعابية لكتاب الطالب ص 36-37: الموقع، السكان، الزراعة، والصناعة للبلدان الأربعة.",
        detailedContent: [
          "1. France (فرنسا):\n- بلد كبير في أوروبا، تشتهر بالمحلات والأزياء والعطور، وتزرع الفواكه والخضار وتصنع السيارات والطائرات.\n\n2. India (الهند):\n- بلد ضخم بعدد سكان هائل (huge population)، تشتهر بزراعة الأرز والشاي والقطن وصناعة السيارات والقطارات، وتشتهر بالفيلة والنمور.\n\n3. Oman (عُمان):\n- بلد عربي ليس كبيراً جداً، يشتهر بالقلاع التاريخية والحلي واللبان البخوري (frankincense)، وصناعة النفط والزراعة.\n\n4. Japan (اليابان):\n- بلد ليس كبيراً جداً ولكنه كثير السكان، يشتهر بالجبال والحدائق وصناعة السيارات وأجهزة الكمبيوتر والإلكترونيات."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: جدول المقارنة بين البلدان في كتاب النشاط ص 40 يأتي دائماً في أسئلة (True / False) وأسئلة الاختيارات."
        ],
        examples: [
          {
            en: "India grows tea, rice, and cotton.",
            ar: "الهند تزرع الشاي والأرز والقطن.",
            highlight: "grows tea, rice",
            note: "المنتجات الزراعية في الهند"
          }
        ],
        exercises: [
          {
            id: "1u5-ex-country1",
            question: "Which country has a huge population? (India / Oman / France)",
            options: ["India", "Oman", "France", "Japan"],
            correctAnswer: "India",
            explanation: "الهند تشتهر بكثافتها السكانية الهائلة (huge population).",
            type: "mcq",
            ministerialYear: "كتاب الطالب ص 36"
          }
        ]
      }
    ,
      {
        id: "1st-u5-l4",
        unitId: 15,
        lessonNumber: 4,
        titleAr: "الدرس الرابع: استيعاب قراءة البلدان وبنك الأسئلة الامتحانية",
        titleEn: "Lesson 4: Countries Reading Dossier & Question Bank (India, Oman, Japan, France)",
        category: "reading",
        summary: "جدول المقارنة وحقائق البلدان الأربعة (الهند، عمان، فرنسا، اليابان) في كتاب الطالب، والزراعة والصناعة وأسئلة الصح والخطأ.",
        detailedContent: [
          "الهند (India): دولة ضخمة يبلغ عدد سكانها مليار نسمة، تشتهر بزراعة الشاي والأرز والبهارات وصناعة السيارات والقطارات.",
          "عمان (Oman): تشتهر بصناعة المجوهرات الفضية واللبان وصيد الأسماك والقلاع التاريخية.",
          "اليابان (Japan): تشتهر بالصناعات التكنولوجية المتطورة (سيارات، أجهزة إلكترونية، حواسيب).",
          "فرنسا (France): تشتهر بالموضة والعطور وزراعة العنب والمتاحف العالمية مثل متحف اللوفر."
        ],
        teacherNotes: [
          "احفظ المنتجات الزراعية والصناعية لكل بلد لأنها تأتي في أسئلة (True / False) والإسقاطات."
        ],
        examples: [
          {
            en: "Which country is famous for growing tea and making cars? India.",
            ar: "أي بلد يشتهر بزراعة الشاي وصناعة السيارات؟ الهند.",
            highlight: "growing tea and making cars",
            note: "حقائق البلدان"
          }
        ],
        exercises: [
          {
            id: "1u5-l4-ex1",
            question: "Oman is famous for its ancient forts and beautiful ______ jewellery.",
            options: ["silver", "plastic", "wooden", "iron"],
            correctAnswer: "silver",
            explanation: "تشتهر سلطنة عمان بصياغة المجوهرات الفضية (silver jewellery).",
            type: "mcq",
            ministerialYear: "كتاب الطالب ص 38"
          }
        ]
      }
    ]
  },

  // -----------------------------------------------------------------------
  // UNIT 6: Meet Yuki & Future Continuous Tense
  // -----------------------------------------------------------------------
  {
    id: 16,
    number: 6,
    titleAr: "الوحدة السادسة: اليابان وصديق المراسلة يوكي (Meet Yuki)",
    titleEn: "Unit 6: Yuki's Letter & Future Continuous Tense",
    description: "رسالة يوكي لفواد، وصف الأشخاص ومظهرهم الخارجي، زمن المستقبل المستمر (will be + v-ing)، وثقافة وعادات الشعب الياباني.",
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
        summary: "التعبير عن حدث سيكون في طور الحدوث والاستمرار في وقت محدد في المستقبل.",
        grammarRuleFormula: "Affirmative (+):\nSubject + will be + Verb-ing\nNegative (-):\nSubject + won't be + Verb-ing\nQuestion (?):\nWill + Subject + be + Verb-ing...?",
        detailedContent: [
          "يستخدم للتأكيد على أن الحدث سيكون مستمراً في نقطة زمنية معينة في المستقبل.",
          "الصيغة: الفاعل + will be + الفعل مضافاً له ing.",
          "أمثلة شهيرة من رسالة يوكي في كتاب الطالب ص 44:\n- You will recognize my father easily. He will be wearing a dark suit.\n- I will be waiting for you at the airport.",
          "أمثلة شائعة: At 7 o'clock tonight, I will be doing my homework."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تذكر أن (be) ثابتة بعد will، ثم نضيف ing للفعل الرئيسي: will be wearing."
        ],
        commonMistakes: [
          "نسيان be وكتابة: will wearing (الصحيح will be wearing)."
        ],
        examples: [
          {
            en: "Yuki will be waiting for Fuad at the airport in Tokyo.",
            ar: "سيكون يوكي بانتظار فؤاد في المطار في طوكيو.",
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
            ministerialYear: "كتاب النشاط ص 52"
          }
        ]
      },
      {
        id: "1st-u6-l2",
        unitId: 16,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: وصف مظهر الأشخاص والملابس (Describing People)",
        titleEn: "Lesson 2: What Do They Look Like? (Appearance & Clothes)",
        category: "vocabulary",
        summary: "الصفات المستخدمة لوصف الطول والوزن والشعر والملابس من كتاب الطالب ص 45.",
        detailedContent: [
          "صفات المظهر الخارجي:\n- الطول والقامة: tall (طويل), short (قصير), of medium height (متوسط الطول).\n- الوزن والهيئة: slim (رشيق), thin (نحيف), plump (ممتلئ الجسم).\n- الشعر والملامح: dark hair (شعر داكن), grey hair (شعر رمادي), wears glasses (يرتدي نظارات).\n- الملابس: wearing a dark suit (بدلة داكنة), a traditional kimono (كيمونو تقليدي), a blue jacket (سترة زرقاء)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: سؤال مهم في الامتحان: What does Mr. Ono look like? (He is tall, plump and has grey hair)."
        ],
        examples: [
          {
            en: "Mr. Ono is tall and he wears glasses.",
            ar: "السيد أونو طويل ويرتدي نظارات.",
            highlight: "tall / wears glasses",
            note: "وصف المظهر الخارجي"
          }
        ],
        exercises: [
          {
            id: "1u6-ex-desc1",
            question: "What does Yuki look like? He is ______ and short.",
            options: ["slim", "tall", "very fat", "old"],
            correctAnswer: "slim",
            explanation: "وصف يوكي في الكتاب أنه رشيق وقصير القامة (slim and short).",
            type: "mcq",
            ministerialYear: "كتاب الطالب ص 44"
          }
        ]
      },
      {
        id: "1st-u6-l3",
        unitId: 16,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: العادات والتقاليد اليابانية (Japanese Customs)",
        titleEn: "Lesson 3: Japanese Food, House & Lifestyle",
        category: "reading",
        summary: "التقاليد اليابانية في الأكل والمنازل: عيدان الأكل، السمك النيئ، وحصائر التاتامي.",
        detailedContent: [
          "عادات الطعام والمنزل الياباني من كتاب الطالب ص 46:\n1. الجلوس على الأرض: People in Japan sit on cushions on the floor, not on chairs.\n2. عيدان الأكل: They eat with chopsticks instead of knives and forks.\n3. السمك النيئ: They sometimes eat raw fish called sashimi and sushi.\n4. الزي التقليدي: Japanese women sometimes wear a traditional dress called a kimono."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: احفظ الكلمات اليابانية الشهيرة في النص: chopsticks = عيدان الأكل، kimono = الزي التقليدي، raw fish = سمك غير مطبوخ."
        ],
        examples: [
          {
            en: "In Japan, people eat their food with chopsticks.",
            ar: "في اليابان، يأكل الناس طعامهم باستخدام عيدان الأكل.",
            highlight: "chopsticks",
            note: "عادات الأكل اليابانية"
          }
        ],
        exercises: [
          {
            id: "1u6-ex-customs1",
            question: "What do Japanese people use to eat their food?",
            options: ["Chopsticks", "Big spoons only", "Fingers only", "Knives only"],
            correctAnswer: "Chopsticks",
            explanation: "يأكل اليابانيون طعامهم بعيدان الأكل (chopsticks).",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 55"
          }
        ]
      }
    ,
      {
        id: "1st-u6-l4",
        unitId: 16,
        lessonNumber: 4,
        titleAr: "الدرس الرابع: كتابة رسالة إلى صديق المراسلة وتكوين الأسئلة",
        titleEn: "Lesson 4: Letter Writing to a Penfriend & Question Formation",
        category: "vocabulary",
        summary: "خطوات كتابة رسالة شخصية إلى صديق المراسلة (العنوان، التحية، المقدمة، الخاتمة)، وتدريبات كتاب النشاط ص 80-84.",
        grammarRuleFormula: "Informal Letter Structure:\n1. Sender Address & Date (Top Right)\n2. Salutation: Dear Yuki,\n3. Opening: Thank you for your letter...\n4. Body: Talking about life in Iraq and school...\n5. Sign-off: Best wishes, / Yours, + Name",
        detailedContent: [
          "كيفية كتابة إنشاء الوحدة السادسة المعتمد في المنهاج (A letter to a penfriend).",
          "تكوين الأسئلة للسؤال عن الهوايات والطقس والمدارس: What is your school like? What do you do in your free time?",
          "قواعد كتابة العنوان وتنسيق الفقرات في الرسائل غير الرسمية."
        ],
        teacherNotes: [
          "احفظ شكل الرسالة وترتيب العنوان والتاريخ في أعلى اليمين لأن له درجات محددة في سلم تصحيح الإنشاء."
        ],
        examples: [
          {
            en: "Dear Yuki, I was very glad to receive your interesting letter about Japan.",
            ar: "عزيزي يوكي، لقد سررت جداً باستلام رسالتك الممتعة حول اليابان.",
            highlight: "Dear Yuki ... glad to receive",
            note: "مقدمة رسالة نموذجية"
          }
        ],
        exercises: [
          {
            id: "1u6-l4-ex1",
            question: "In an informal letter, we usually start with ______ followed by the friend's first name.",
            options: ["Dear", "Yours faithfully", "To whom it may concern", "Sir"],
            correctAnswer: "Dear",
            explanation: "في الرسائل غير الرسمية للأصدقاء نبدأ دائماً بـ Dear.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 82"
          }
        ]
      }
    ]
  },

  // -----------------------------------------------------------------------
  // UNIT 7: Instructions, Warnings & Reflexive Pronouns
  // -----------------------------------------------------------------------
  {
    id: 17,
    number: 7,
    titleAr: "الوحدة السابعة: التعليمات والسلامة والضمائر الانعكاسية (Instructions & Safety)",
    titleEn: "Unit 7: Giving Instructions, Warnings & Reflexive Pronouns",
    description: "صيغة الأمر لإعطاء التعليمات والتحذيرات (Imperatives)، الضمائر الانعكاسية (myself, yourself...)، وقواعد السلامة في المنزل.",
    accentColor: "from-red-600 to-amber-600",
    bgGradient: "bg-gradient-to-r from-red-50 to-amber-50 border-red-200",
    lessons: [
      {
        id: "1st-u7-l1",
        unitId: 17,
        lessonNumber: 1,
        titleAr: "الدرس الأول: إعطاء التعليمات والأوامر والتحذيرات (Imperatives & Warnings)",
        titleEn: "Lesson 1: Giving Instructions & Warnings with Imperatives",
        category: "grammar",
        summary: "استخدام الفعل المجرد في بداية الجملة للأمر، واستخدام Don't أو Never للتحذير والنهي.",
        grammarRuleFormula: "Positive Imperative (الأمر الإيجابي):\nBase Verb + Complement (e.g., Wash your hands)\n\nNegative Warning (النهي والتحذير):\nDon't / Never + Base Verb (e.g., Don't touch the hot iron / Never play with matches)",
        detailedContent: [
          "جملة الأمر تبدأ دائماً بالمصدر المجرد دون وجود فاعل قبله: Open your book, Shake the bottle.",
          "للنهي أو التحذير نستخدم (Don't) أو (Never) متبوعة بمصدر مجرد.",
          "أهم إرشادات السلامة في المنزل من كتاب الطالب ص 53:\n- Keep medicines out of the reach of children. (احفظ الأدوية بعيداً عن متناول الأطفال).\n- Never leave matches near children. (إياك وترك أعواد الثقاب قرب الأطفال).\n- Don't touch hot saucepans with wet hands. (لا تلمس القدور الساخنة بأيدٍ مبللة).\n- Keep sharp knives away from babies. (احفظ السكاكين الحادة بعيداً عن الرضع)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: لا تضع أي إضافات للفعل في جملة الأمر (لا s ولا ed ولا ing)؛ الفعل مجرد دائماً."
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
            en: "Never play with matches in the kitchen.",
            ar: "إياك واللعب بأعواد الثقاب في المطبخ.",
            highlight: "Never play",
            note: "تحذير قطعي مع المصدر"
          }
        ],
        exercises: [
          {
            id: "1u7-ex1",
            question: "______ the medicine bottle well before taking it. (Shake / Shaking / Shook)",
            options: ["Shake", "Shaking", "Shook", "Shakes"],
            correctAnswer: "Shake",
            explanation: "جملة الأمر تبدأ دائماً بالمصدر المجرد Shake.",
            type: "mcq",
            ministerialYear: "كتاب النشاط ص 62"
          }
        ]
      },
      {
        id: "1st-u7-l2",
        unitId: 17,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: الضمائر الانعكاسية (Reflexive Pronouns)",
        titleEn: "Lesson 2: Reflexive Pronouns (myself, yourself, himself...)",
        category: "grammar",
        summary: "الضمائر التي تعود على فاعل الجملة للتأكيد أو عندما يقع الفعل على الفاعل نفسه.",
        grammarRuleFormula: "I -> myself\nYou (مفرد) -> yourself\nHe -> himself\nShe -> herself\nIt -> itself\nWe -> ourselves\nYou (جمع) -> yourselves\nThey -> themselves",
        detailedContent: [
          "نستخدم الضمير الانعكاسي عندما يكون الفاعل والمفعول به هما نفس الشخص: Ali cut himself with a sharp knife.",
          "تتحول self في المفرد إلى selves في صيغة الجمع: our + selves = ourselves / them + selves = themselves.",
          "سؤال الإملاء الوزاري الحاسم من كتاب النشاط ص 65:\n- I : myself\n- they : themselves\n- we : ourselves\n- she : herself\n- you : yourself (أو yourselves)"
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: سؤال وزاري وامتحاني يتكرر دائماً في الإملاء والتوصيل: I : myself / They : themselves."
        ],
        commonMistakes: [
          "كتابة theirselves (خطأ إملائي فادح؛ الصحيح themselves).",
          "كتابة ourself بدلاً من الجمع ourselves."
        ],
        examples: [
          {
            en: "I made this delicious cake myself.",
            ar: "صنعت هذه الكعكة اللذيذة بنفسي.",
            highlight: "myself",
            note: "ضمير انعكاسي للمتكلم المفرد I"
          },
          {
            en: "The children enjoyed themselves at the park yesterday.",
            ar: "استمتع الأطفال بوقتهم (بأنفسهم) في المتنزه أمس.",
            highlight: "themselves",
            note: "ضمير انعكاسي لجمع الغائب"
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
            ministerialYear: "كتاب النشاط ص 65"
          },
          {
            id: "1u7-ex-spelling-refl",
            question: "I -> myself ; we -> ______ [Spelling]",
            options: ["ourselves", "ourself", "themselves", "myself"],
            correctAnswer: "ourselves",
            explanation: "الضمير الانعكاسي للضمير we هو الجمع ourselves.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          }
        ]
      }
    ,
      {
        id: "1st-u7-l3",
        unitId: 17,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: إشارات التحذير والسلامة المنزلية (Warning Signs & Safety at Home)",
        titleEn: "Lesson 3: Safety at Home, Warning Signs & Fire Prevention",
        category: "reading",
        summary: "قواعد السلامة في المطبخ وغرفة المعيشة، معاني لافتات التحذير، وتجنب الحوادث والحرائق في كتاب الطالب والنشاط.",
        detailedContent: [
          "قواعد السلامة للأطفال: إبعاد علب الكبريت والأدوية والمواد المنظفة عن متناول الأطفال (Keep medicines out of reach).",
          "السلامة في المطبخ: عدم لمس المقالي الساخنة وعدم ترك السكاكين الحادة على حافة الطاولة.",
          "معاني إشارات التحذير: Danger (خطر), Do not touch (لا تلمس), Poisonous (سام)."
        ],
        teacherNotes: [
          "هذه القواعد تستخدم صيغة الأمر والنهي (Imperatives): Don't play with matches! Keep scissors away from children!"
        ],
        examples: [
          {
            en: "Always keep hot saucepans away from the edge of the cooker.",
            ar: "احرص دائماً على إبعاد القدور الساخنة عن حافة الطباخ.",
            highlight: "keep away from the edge",
            note: "قاعدة سلامة"
          }
        ],
        exercises: [
          {
            id: "1u7-l3-ex1",
            question: "Keep medicines out of the ______ of small children.",
            options: ["reach", "sight", "room", "floor"],
            correctAnswer: "reach",
            explanation: "المصطلح المعتمد هو out of the reach of children (بعيداً عن متناول الأطفال).",
            type: "mcq",
            ministerialYear: "كتاب الطالب ص 68"
          }
        ]
      }
    ]
  },

  // -----------------------------------------------------------------------
  // UNIT 8: Final Year Revision & Preparation
  // -----------------------------------------------------------------------
  {
    id: 18,
    number: 8,
    titleAr: "الوحدة الثامنة: المراجعة النهائية والامتحان الشامل (Final Revision)",
    titleEn: "Unit 8: Final Revision & Year-End Exam Preparation",
    description: "المراجعة النهائية لكامل مفردات وقواعد وقصص وإنشاءات كتاب الطالب والنشاط للصف الأول المتوسط، والاستعداد لامتحان نهاية السنة.",
    accentColor: "from-blue-600 to-indigo-600",
    bgGradient: "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200",
    lessons: [
      {
        id: "1st-u8-l1",
        unitId: 18,
        lessonNumber: 1,
        titleAr: "الدرس الأول: بنك القواعد الشامل لامتحان نهاية السنة",
        titleEn: "Lesson 1: Year-End Comprehensive Grammar Summary",
        category: "grammar",
        summary: "ملخص القواعد الأساسية: المقارنة والتفضيل، have been/gone، المستقبل المستمر، أفعال الأمر، والضمائر الانعكاسية.",
        detailedContent: [
          "1. المقارنة والتفضيل: than تتطلب -er أو more / the تتطلب -est أو most.",
          "2. have been (ذهب وعاد) / have gone (ذهب ولم يعد).",
          "3. المستقبل المستمر: will be + v-ing للتعبير عن استمرار حدث في نقطة مستقبلية.",
          "4. صيغة الأمر: الفعل المجرد في البداية، و Don't / Never للتحذير.",
          "5. الضمائر الانعكاسية: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: راجع هذا الملخص ليلة الامتحان لضمان الدرجة الكاملة في فرع القواعد (25 درجة)."
        ],
        examples: [
          {
            en: "An elephant is bigger than a camel, and cheetahs run the fastest.",
            ar: "الفيل أكبر من الجمل، والفهود تركض الأسرع على الإطلاق.",
            highlight: "bigger than / the fastest",
            note: "مقارنة وتفضيل"
          }
        ],
        exercises: [
          {
            id: "1u8-final-q1",
            question: "Don't ______ hot saucepans without gloves. (touch / touching / touched)",
            options: ["touch", "touching", "touched", "touches"],
            correctAnswer: "touch",
            explanation: "بعد Don't يأتي دائماً المصدر المجرد touch.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          }
        ]
      },
      {
        id: "1st-u8-l2",
        unitId: 18,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: مفردات الكورس الثاني والإملاء والامتحان النهائي",
        titleEn: "Lesson 2: Second Term Vocabulary, Spelling & Final Exam Readiness",
        category: "spelling",
        summary: "مراجعة شاملة لإملاء الكورس الثاني (إضافة er/est، تصاريف الأفعال الشاذة، الضمائر الانعكاسية) ونموذج الامتحان النهائي.",
        grammarRuleFormula: "Spelling Checklist:\n- big -> bigger -> the biggest\n- easy -> easier -> the easiest\n- good -> better -> the best\n- bad -> worse -> the worst\n- myself, yourself, himself, herself, ourselves, themselves",
        detailedContent: [
          "مراجعة قواعد مضاعفة الحرف الصحيح الأخير عند إضافة er أو est إذا سبقه حرف علة واحد: hot -> hotter -> hottest.",
          "قلب y إلى i عند الإضافة: happy -> happier -> happiest.",
          "مراجعة الضمائر الانعكاسية المقررة في الوحدة السابعة وكيفية تحويل الفاعل إلى ضمير انعكاسي."
        ],
        teacherNotes: [
          "احفظ تصاريف الأفعال الشاذة الشائعة: go -> went -> gone, see -> saw -> seen, write -> wrote -> written."
        ],
        examples: [
          {
            en: "Regular spelling practice guarantees the full 10 marks in the spelling question.",
            ar: "الممارسة الإملائية المنتظمة تضمن درجات فرع الإملاء العشر كاملة.",
            highlight: "spelling practice",
            note: "أهمية الإملاء"
          }
        ],
        exercises: [
          {
            id: "1u8-final-q2",
            question: "good -> better ; bad -> ______ [Spelling / Irregular Comparative]",
            options: ["worse", "badder", "worst", "baddest"],
            correctAnswer: "worse",
            explanation: "المقارنة الشاذة من الصفة bad هي worse.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          }
        ]
      }
    ,
      {
        id: "1st-u8-l3",
        unitId: 18,
        lessonNumber: 3,
        titleAr: "الدرس الثالث: النموذج النهائي الشامل لامتحان نهاية السنة للأول المتوسط",
        titleEn: "Lesson 3: Final Comprehensive Model Exam Paper & Revision Blueprint",
        category: "spelling",
        summary: "نموذج امتحاني شامل يحاكي أسئلة الدور الأول للعام الدراسي مع سلم الدرجات وتفكيك الفخاخ الإملائية والقواعدية.",
        grammarRuleFormula: "Final Examination Paper Blueprint (100 Marks):\nQ1. Reading Comprehension (Unseen & Textbook Texts - 20 Marks)\nQ2. Grammar & Linguistic Functions (30 Marks)\nQ3. Vocabulary, Collocations & Spelling (20 Marks)\nQ4. Story Time: Bob & Basim (10 Marks)\nQ5. Written Composition: Letter or Holiday (20 Marks)",
        detailedContent: [
          "مراجعة شاملة لجميع صيغ الأسئلة المعتمدة في امتحانات مديريات التربية لصف الأول المتوسط.",
          "تجميع قواعد التنقيط: الحروف الكبيرة، علامات الاستفهام، والنقاط والفواصل.",
          "جدول الأفعال الشاذة الأكثر تكراراً في السؤال الثالث فرع الإملاء (see -> saw, go -> went, eat -> ate)."
        ],
        teacherNotes: [
          "تأكد من مراجعة إملاء الأفعال الشاذة وإس التملك وصفات المقارنة (bigger, happier, more beautiful)."
        ],
        examples: [
          {
            en: "Comprehensive revision guarantees full marks and top academic performance.",
            ar: "المراجعة الشاملة تضمن الدرجات الكاملة والتفوق الأكاديمي.",
            highlight: "comprehensive revision",
            note: "توجيه تفوق"
          }
        ],
        exercises: [
          {
            id: "1u8-l3-ex1",
            question: "Spelling: small -> smaller ; easy -> ______",
            options: ["easier", "easyer", "more easy", "easiest"],
            correctAnswer: "easier",
            explanation: "الصفة المنتهية بـ y وقبلها حرف صحيح يقلب y إلى i ونضيف er: easier.",
            type: "mcq",
            ministerialYear: "امتحان الدور الأول"
          }
        ]
      }
    ]
  }
];

// =========================================================================
// قصص الأول المتوسط (Story Time) - المعتمدة في كتاب الطالب والنشاط
// 1. The Fox and the Bird (Unit 1)
// 2. The Heron and the Fish (Unit 2)
// 3. Danger at Sea (Unit 7)
// =========================================================================
export const FIRST_INTERMEDIATE_STORIES: LiteratureItem[] = [
  {
    id: "1st-story-fox",
    title: "The Fox and the Bird",
    titleAr: "قصة الثعلب والطائر (الغبي والحكيم)",
    author: "Aesop's Fable Adapted for Iraq",
    authorAr: "من حكايات إيسوب التراثية المقررة لمنهج العراق (كتاب الطالب ص 10)",
    genre: "Fable / Story Time",
    genreAr: "حكاية رمزية وعبرة أخلاقية",
    image: "https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=1200&q=80",
    imageCaptionAr: "الثعلب الماكر يمتدح الطائر للحصول على قطعة الجبن",
    summaryAr: "قصة مشهورة في الوحدة الأولى من كتاب الطالب؛ حيث يقف الطائر على غصن شجرة وفي منقاره قطعة جبن لذيذة. يأتي الثعلب الجائع ويستخدم كلمات المديح والإطراء الكاذب ليقنع الطائر بالغناء وسماع صوته الجميل. عندما يفتح الطائر منقاره ليسقط الجبن، يلتقطه الثعلب ويفر هارباً، لنتعلم درساً ألا نصدق المديح الخادع.",
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
        year: "كتاب النشاط ص 12"
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
    authorAr: "حكاية تربوية مقررة في الوحدة الثانية (كتاب الطالب ص 20)",
    genre: "Educational Story",
    genreAr: "قصة تربوية عن القناعة وعاقبة الطمع",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=80",
    imageCaptionAr: "طائر مالك الحزين يقف على ضفة النهر منتظراً صيد الأسماك",
    summaryAr: "يقف طائر مالك الحزين على ضفة نهر رقراق. مرت سمكة صغيرة فرفض صيدها قائلاً إنها صغيرة جداً، ثم مرت سمكة متوسطة فرفضها طمعاً بسمكة ضخمة. في النهاية غابت كل الأسماك وبقي جائعاً واضطر لأكل حلزون صغير على الشاطئ.",
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
        year: "كتاب النشاط ص 22"
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
  },
  {
    id: "1st-story-danger-sea",
    title: "Danger at Sea",
    titleAr: "خطر في البحر (قصة النجاة وإشارات الاستغاثة)",
    author: "English for Iraq Curriculum Writers",
    authorAr: "المقررة في الوحدة السابعة (كتاب الطالب ص 58 وكتاب النشاط ص 68)",
    genre: "Adventure & Safety Story",
    genreAr: "قصة مغامرة وتطبيق لقواعد السلامة",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    imageCaptionAr: "قارب الصيد في عرض البحر يواجه تعطل المحرك",
    summaryAr: "ذهب توم ودايف في رحلة صيد بالقارب في البحر. فجأة تعطل محرك القارب وتوقفت الأمواج وبدأت عاصفة تقترب. تذكر الصبيان تعليمات السلامة: لم يرميا نفسيهما في الماء، بل استخدما مرآة لعكس ضوء الشمس، وأشعلا إشارة دخان صغيرة بملابس قديمة، وأطلقا نداء الاستغاثة، حتى رصدهما قارب خفر السواحل وتم إنقاذهما بأمان.",
    moralLessonAr: "الهدوء والتفكير السليم واتباع إرشادات السلامة ينقذ الحياة في أصعب المواقف.",
    keyThemes: ["Safety rules at sea", "Staying calm in emergencies", "Signaling for rescue"],
    characters: [
      {
        name: "Tom and Dave",
        nameAr: "توم ودايف",
        role: "The resourceful boys",
        roleAr: "الصبيان الشجاعان اللذان طبقا قواعد السلامة",
        description: "Two sensible boys who managed to survive boat trouble by signaling.",
        descriptionAr: "صبيان حكيمان استخدما مرآة الإشارة والدخان لطلب النجدة."
      }
    ],
    ministerialQA: [
      {
        id: "1st-sea-q1",
        question: "What happened to the boys' boat in the sea?",
        questionAr: "ماذا حدث لقارب الصبيين في البحر؟",
        answer: "The engine stopped working.",
        answerAr: "تعطل المحرك وتوقف عن العمل.",
        year: "كتاب النشاط ص 69"
      },
      {
        id: "1st-sea-q2",
        question: "How did the boys signal for help?",
        questionAr: "كيف أرسل الصبيان إشارات لطلب المساعدة؟",
        answer: "By using a mirror to reflect sunlight and making smoke signals.",
        answerAr: "باستخدام مرآة لعكس أشعة الشمس وصنع إشارات دخانية.",
        year: "امتحان نهاية السنة"
      }
    ]
  }
];

// =========================================================================
// إنشاءات الأول المتوسط (Essays / Compositions)
// معتمدة نصاً وفق متطلبات الامتحانات المدرسية والنهائية:
// 1. عطلة قضيتها في العراق (الوحدة الأولى)
// 2. اكتب عن بلد: إسبانيا أو العراق (الوحدة الخامسة)
// 3. رسالة إلى يوكي / صديق مراسلة (الوحدة السادسة)
// 4. إرشادات السلامة في المنزل (الوحدة السابعة)
// =========================================================================
export const FIRST_INTERMEDIATE_ESSAYS: EssayItem[] = [
  {
    id: "1st-essay-holiday",
    unitId: 11,
    titleAr: "إنشاء الوحدة الأولى: عطلة قضيتها في العراق (A Holiday I Had)",
    titleEn: "A Holiday I Had in Iraq",
    ministerialWeight: "15 درجة في الامتحان المدرسي والنهائي",
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
      "قسّم الإنشاء إلى 3 فقرات مرتبة لتحصل على درجات التنسيق الكاملة."
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
  },
  {
    id: "1st-essay-safety",
    unitId: 17,
    titleAr: "إنشاء الوحدة السابعة: قواعد السلامة في المنزل (Safety Rules at Home)",
    titleEn: "Safety Rules at Home (Kitchen & Bathroom)",
    ministerialWeight: "15 درجة في الامتحان المدرسي",
    paragraphsEn: [
      "Home is where we live and feel comfortable, but there are also many dangers if we are not careful, especially for young children.",
      "In the kitchen, never let small children play with matches or touch hot saucepans on the cooker. Always keep sharp knives in drawers, and clean up spills immediately so people do not slip.",
      "In the bathroom, always keep medicines in a locked cabinet out of reach of children. Finally, test the water temperature before getting into the bath so you do not burn yourself."
    ],
    paragraphsAr: [
      "المنزل هو المكان الذي نعيش فيه ونشعر بالراحة، ولكن هناك أيضاً العديد من الأخطار إذا لم نكن حذرين، وخاصة بالنسبة للأطفال الصغار.",
      "في المطبخ، إياك وترك الأطفال الصغار يعبثون بأعواد الثقاب أو يلمسون القدور الساخنة على الموقد. احفظ السكاكين الحادة دائماً في الأدراج ونظف السوائل المسكوبة فوراً لمنع الانزلاق.",
      "في الحمام، احفظ الأدوية دائماً في خزانة مغلقة بعيداً عن متناول الأطفال. وأخيراً، اختبر درجة حرارة الماء قبل النزول في حوض الاستحمام حتى لا تحرق نفسك."
    ],
    keywords: [
      { word: "hot saucepans", meaning: "قدور ساخنة" },
      { word: "sharp knives", meaning: "سكاكين حادة" },
      { word: "locked cabinet", meaning: "خزانة مقفلة" },
      { word: "out of reach", meaning: "بعيداً عن متناول اليد" }
    ],
    goldenTips: [
      "استخدم أفعال الأمر والنهي (Keep, Never let, Always) لإعطاء التوجيهات بأسلوب سليم."
    ],
    clozeSentences: [
      {
        textWithBlanks: "Always keep medicines out of ______ of children.",
        missingWord: "reach",
        options: ["reach", "touch", "sight", "room"]
      }
    ]
  }
];

// =========================================================================
// بنك أسئلة امتحانات الأول المتوسط (مستخرجة مباشرة من كتابي الطالب والنشاط)
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
    topic: "Past Continuous with While",
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
    unitId: 11,
    topic: "Possessive Pronouns",
    year: "كتاب النشاط ص 11",
    session: "دور أول",
    questionText: "This is not my bag. It is ______ (her / hers / she).",
    correctAnswer: "hers",
    ruleExplanation: "جاء الفراغ في نهاية الجملة بدون اسم بعده، فنستخدم ضمير الملكية hers.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "1st-exam-q4",
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
    id: "1st-exam-q5",
    unitId: 13,
    topic: "Present Perfect Simple",
    year: "امتحان نصف السنة 2024",
    session: "دور أول",
    questionText: "Huda has already ______ (clean) her room.",
    correctAnswer: "cleaned",
    ruleExplanation: "بعد has نستخدم التصريف الثالث للفعل وهو cleaned.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "1st-exam-q6",
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
    id: "1st-exam-q7",
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
    id: "1st-exam-q8",
    unitId: 16,
    topic: "Future Continuous",
    year: "كتاب النشاط ص 52",
    session: "دور أول",
    questionText: "At 8 PM tonight, I will ______ (be doing / do / did) my homework.",
    correctAnswer: "be doing",
    ruleExplanation: "المستقبل المستمر يتطلب الصيغة will be + verb-ing.",
    difficulty: "medium",
    category: "Grammar"
  },
  {
    id: "1st-exam-q9",
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
    id: "1st-exam-q10",
    unitId: 17,
    topic: "Imperatives & Warnings",
    year: "كتاب النشاط ص 62",
    session: "دور أول",
    questionText: "______ with matches in the bedroom. (Don't play / Not play / No play)",
    correctAnswer: "Don't play",
    ruleExplanation: "التحذير والنهي يبدأ بـ Don't متبوعة بالمصدر المجرد play.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "1st-exam-q11",
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
    id: "1st-exam-q12",
    unitId: 12,
    topic: "Spelling - Months Abbreviation",
    year: "كتاب النشاط ص 16",
    session: "دور أول",
    questionText: "October -> Oct. ; February -> ______",
    correctAnswer: "Feb.",
    ruleExplanation: "اختصار شهر شباط هو Feb. مع النقطة.",
    difficulty: "easy",
    category: "Spelling"
  },
  {
    id: "1st-exam-q13",
    unitId: 15,
    topic: "Spelling - Irregular Comparison",
    year: "امتحان نهاية السنة",
    session: "دور أول",
    questionText: "good -> better ; bad -> ______",
    correctAnswer: "worse",
    ruleExplanation: "المقارنة الشاذة من الصفة bad هي worse.",
    difficulty: "easy",
    category: "Spelling"
  },
  {
    id: "1st-exam-q14",
    unitId: 17,
    topic: "Spelling - Reflexive Pronoun",
    year: "امتحان نهاية السنة",
    session: "دور أول",
    questionText: "I -> myself ; they -> ______",
    correctAnswer: "themselves",
    ruleExplanation: "الضمير الانعكاسي للضمير they هو themselves بالجمع.",
    difficulty: "easy",
    category: "Spelling"
  },
  {
    id: "1st-exam-q15",
    unitId: 11,
    topic: "Story Time - The Fox and the Bird",
    year: "امتحان نصف السنة",
    session: "دور أول",
    questionText: "The clever fox asked the bird to ______ so the cheese would drop.",
    correctAnswer: "sing",
    ruleExplanation: "طلب الثعلب من الطائر أن يغني (to sing) ليفتح منقاره وتسقط قطعة الجبن.",
    difficulty: "easy",
    category: "Literature"
  }
];

// =========================================================================
// نموذج الامتحان الشامل للأول المتوسط (Mock Exam Paper)
// مطابق لنظام امتحانات المدارس العراقية المعتمد لوزارة التربية (100 درجة)
// =========================================================================
export const FIRST_INTERMEDIATE_MOCK_PAPER: MockExamPaper = {
  id: "1st-full-mock-paper-official",
  title: "امتحان نهاية السنة الشامل • الأول المتوسط (وفق المنهج الرسمي المعتمد)",
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
      instructionsAr: "اقرأ القطعة بعناية ثم أجب عن 5 من الأسئلة التالية (لكل نقطة 4 درجات):",
      instructionsEn: "Read the following passage carefully, then answer (5) of the questions below:",
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
      titleAr: "السؤال الثاني: القواعد والوظائف اللغوية (Grammar & Functions)",
      titleEn: "Question 2: Grammar & Functions",
      instructionsAr: "اختر الجواب الصحيح أو أجب وفق ما هو مطلوب بين القوسين (5 فروع، 5 درجات لكل فرع):",
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
      titleAr: "السؤال الثالث: المفردات والتنقيط والإملاء (Vocabulary & Spelling)",
      titleEn: "Question 3: Vocabulary, Spelling & Punctuation",
      instructionsAr: "أجب عن فروع المفردات والإملاء والتنقيط:",
      instructionsEn: "Vocabulary, Spelling and Punctuation tasks:",
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
      titleEn: "Question 4: Story Time (The Fox, Heron & Danger at Sea)",
      instructionsAr: "أجب عن الأسئلة التالية حول قصص المطالعة المقررة في المنهج:",
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
