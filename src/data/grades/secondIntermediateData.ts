import { Unit, LiteratureItem, EssayItem, MinisterialExamQuestion } from '../../types';
import { MockExamPaper } from '../mockExamPapers';

// =========================================================================
// وحدات الثاني المتوسط - منهج English for Iraq (2nd Intermediate)
// =========================================================================
export const SECOND_INTERMEDIATE_UNITS: Unit[] = [
  {
    id: 21,
    number: 1,
    titleAr: "الوحدة الأولى: مجلة المدرسة وتقديم النصائح والاقتراحات (A School Magazine)",
    titleEn: "Unit 1: A School Magazine, Advice & Suggestions",
    description: "أس الملكية (Possessive 's / s')، تقديم الاقتراحات (Suggestions)، إعطاء النصائح باستخدام should / shouldn't، وإجراء مقابلات المجلات.",
    accentColor: "from-cyan-600 to-blue-600",
    bgGradient: "bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200",
    lessons: [
      {
        id: "2nd-u1-l1",
        unitId: 21,
        lessonNumber: 1,
        titleAr: "الدرس الأول: إس التملك (Possessive 's & s')",
        titleEn: "Lesson 1: Possessive Apostrophe ('s / s')",
        category: "grammar",
        summary: "وضع الفاصلة العليا للتملك مع الاسم المفرد والجمع النظامي والشاذ.",
        grammarRuleFormula: "Singular (مفرد):\nNoun + 's (e.g., the boy's bag = حقيبة الولد الواحد)\nRegular Plural (جمع ينتهي بـ s):\nNoun-s + ' (e.g., the boys' bags = حقائب الأولاد)\nIrregular Plural (جمع شاذ لا ينتهي بـ s):\nPlural Noun + 's (e.g., children's books, men's room)",
        detailedContent: [
          "تستخدم الفاصلة العليا ('s) لبيان ملكية الشيء لشخص أو جهة معينة.",
          "مع الاسم المفرد نضع ('s) قبل الـ s: the girl's coat.",
          "مع الاسم الجمع الذي ينتهي بحرف s نضع الفاصلة فقط بعد الـ s: the girls' coats.",
          "مع الجمع الشاذ (الذي لا ينتهي بـ s مثل men, women, children) نضع ('s): the children's magazine."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه لسؤال الجمع الشاذ (men, women, children)، يُعامل معاملة المفرد ونضع له ('s) وليس (s').",
          "سؤال امتحاني متكرر: The teacher picked up the (students' / student's) exam papers."
        ],
        commonMistakes: [
          "كتابة childrens' (خطأ فادح، الصحيح children's).",
          "نسيان موقع الفاصلة مع جمع s النظامي."
        ],
        examples: [
          {
            en: "This is the doctor's bag.",
            ar: "هذه حقيبة الطبيب (مفرد).",
            highlight: "doctor's",
            note: "مفرد + 's"
          },
          {
            en: "The teachers' room is on the second floor.",
            ar: "غرفة المعلمين (جمع) في الطابق الثاني.",
            highlight: "teachers'",
            note: "جمع ينتهي بـ s + فاصلة فقط"
          }
        ],
        exercises: [
          {
            id: "2u1-ex1",
            question: "These are the ______ (girls' / girl's) books; all three girls forgot them here.",
            options: ["girls'", "girl's", "girls", "girles'"],
            correctAnswer: "girls'",
            explanation: "الحديث عن 3 فتيات (جمع ينتهي بـ s) لذا نضع الفاصلة بعد الـ s: girls'.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الأول"
          }
        ]
      },
      {
        id: "2nd-u1-l2",
        unitId: 21,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: تقديم الاقتراحات وإعطاء النصائح (Suggestions & Advice)",
        titleEn: "Lesson 2: Making Suggestions & Giving Advice",
        category: "grammar",
        summary: "استخدام Why not / Shall we / Let's للاقتراح، واستخدام You should / shouldn't للنصيحة.",
        grammarRuleFormula: "Suggestions (الاقتراحات):\nWhy not + base verb...?\nShall we + base verb...?\nLet's + base verb.\n\nGiving Advice (النصيحة):\nYou should + base verb (ينبغي أن)\nYou shouldn't + base verb (لا ينبغي أن)",
        detailedContent: [
          "لتقديم اقتراح لصديق نستخدم صيغاً قياسية يتبعها جميعاً مصدر مجرد (base verb).",
          "انتبه: Why not و Shall we تنتهيان بعلامة استفهام (?)، بينما Let's تنتهي بنقطة (.).",
          "لإعطاء نصيحة طبية أو دراسية نستخدم should للإيجاب و shouldn't للتحذير من سلوك خاطئ."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تذكر دائماً أن الفعل بعد should و shouldn't و Let's يكون مجرداً خالياً من أي إضافة."
        ],
        commonMistakes: [
          "إضافة to بعد should مثل: You should to study (الصحيح You should study).",
          "وضع ing بعد Let's مثل: Let's going (الصحيح Let's go)."
        ],
        examples: [
          {
            en: "Why not start a school poetry corner?",
            ar: "لم لا نبدأ ركناً للشعر في مجلة المدرسة؟",
            highlight: "Why not start",
            note: "صيغة اقتراح مع مصدر مجرد"
          },
          {
            en: "You should brush your teeth twice a day.",
            ar: "ينبغي عليك تنظيف أسنانك مرتين يومياً.",
            highlight: "should brush",
            note: "نصيحة إيجابية"
          }
        ],
        exercises: [
          {
            id: "2u1-ex2",
            question: "You look tired. You ______ go to bed early tonight. (should / shouldn't / must to)",
            options: ["should", "shouldn't", "must to", "can't"],
            correctAnswer: "should",
            explanation: "الشخص يبدو متعباً، النصيحة الملائمة هي الذهاب للنوم مبكراً باستخدام should.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          }
        ]
      }
    ]
  },
  {
    id: 22,
    number: 2,
    titleAr: "الوحدة الثانية: اللياقة البدنية والنمط الغذائي الصحي (Keep Fit & Nutrition)",
    titleEn: "Unit 2: Health, Fitness & Quantifiers",
    description: "محددات الكمية (too much, too many, a few, a little)، وأفعال الإلزام have to / don't have to، وأهمية التمارين الرياضية والطعام الصحي.",
    accentColor: "from-emerald-600 to-green-600",
    bgGradient: "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200",
    lessons: [
      {
        id: "2nd-u2-l1",
        unitId: 22,
        lessonNumber: 1,
        titleAr: "الدرس الأول: أدوات الكمية والعدد (Quantifiers)",
        titleEn: "Lesson 1: Quantifiers (too much / too many / a few / a little)",
        category: "grammar",
        summary: "التمييز بين الأسماء المعدودة (Countable) وغير المعدودة (Uncountable) واستخدام محددات الكمية الدقيقة.",
        grammarRuleFormula: "Countable Nouns (الأسماء المعدودة - التي تجمع):\ntoo many (أكثر من اللازم للكثرة)\na few (قليل ويكفي)\n\nUncountable Nouns (الأسماء غير المعدودة - الكميات كالسكر والماء والدهون):\ntoo much (أكثر من اللازم للكمية)\na little (كمية قليلة)",
        detailedContent: [
          "نستخدم too many و a few مع الأسماء المعدودة التي لها جمع (crisps, apples, sweets, biscuits).",
          "نستخدم too much و a little مع الأسماء غير المعدودة (sugar, salt, fat, water, money, time).",
          "نصيحة صحية منهجية: You should eat a little sugar and not too much fat.",
          "Eat a few vegetables every day."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه للأسماء التالية غير معدودة في الامتحانات: fruit (إذا عنت فاكهة عامة), salt, sugar, time, money, fat."
        ],
        commonMistakes: [
          "استخدام too much مع اسم جمع: too much crisps (الصحيح too many crisps).",
          "استخدام a few مع sugar (الصحيح a little sugar)."
        ],
        examples: [
          {
            en: "You shouldn't drink too much fizzy soda.",
            ar: "لا ينبغي أن تشرب الكثير جداً من المياه الغازية (غير معدود).",
            highlight: "too much",
            note: "كمية غير معدودة"
          },
          {
            en: "There are too many cars in the city centre.",
            ar: "يوجد عدد كبير جداً من السيارات في مركز المدينة (معدود).",
            highlight: "too many cars",
            note: "اسم معدود جمع"
          }
        ],
        exercises: [
          {
            id: "2u2-ex1",
            question: "Eating ______ (too much / too many) chocolate is bad for your teeth.",
            options: ["too much", "too many", "a few", "many"],
            correctAnswer: "too much",
            explanation: "الشوكولاتة هنا كمية غير معدودة لذا نستخدم too much.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الأول"
          }
        ]
      }
    ]
  },
  {
    id: 23,
    number: 3,
    titleAr: "الوحدة الثالثة: الرياضة وظروف الحال (Sports & Adverbs of Manner)",
    titleEn: "Unit 3: Sports, The Olympics & Adverbs",
    description: "أفعال الرياضات (play, go, do)، وتكوين ظروف الحال بإضافة -ly والظروف الشاذة (well, fast, hard).",
    accentColor: "from-amber-600 to-yellow-600",
    bgGradient: "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200",
    lessons: [
      {
        id: "2nd-u3-l1",
        unitId: 23,
        lessonNumber: 1,
        titleAr: "الدرس الأول: أفعال الرياضة (play / go / do with sports)",
        titleEn: "Lesson 1: Using play, go & do with Sports",
        category: "vocabulary",
        summary: "متى نستخدم play ومتى go ومتى do مع الأنشطة والرياضات المختلفة.",
        grammarRuleFormula: "play: مع الرياضات التنافسية التي فيها كرة (football, basketball, tennis, volleyball)\ngo: مع الرياضات والأنشطة التي تنتهي بـ -ing (swimming, running, cycling, fishing)\ndo: مع رياضات القوة والقتال الفردية (judo, karate, gymnastics, boxing)",
        detailedContent: [
          "نستخدم الفعل play للرياضات التنافسية التي تعتمد على الكرة أو الألعاب الجماعية.",
          "نستخدم الفعل go مع الأنشطة المنتهية بـ ing (ما عدا boxing نستخدم معها do).",
          "نستخدم الفعل do مع الفنون القتالية والجمباز وألعاب اللياقة البدنية الفردية."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تذكر قاعدة الـ ing = go (go swimming). ولكن كاراتيه وجيودو = do karate, do judo."
        ],
        commonMistakes: [
          "قول I play swimming (الصحيح I go swimming).",
          "قول I go karate (الصحيح I do karate)."
        ],
        examples: [
          {
            en: "We play tennis every Friday afternoon.",
            ar: "نلعب كرة التنس كل عصر جمعة.",
            highlight: "play tennis",
            note: "لعبة كرة تنافسية"
          },
          {
            en: "My sister does gymnastics at school.",
            ar: "تمارس أختي رياضة الجمباز في المدرسة.",
            highlight: "does gymnastics",
            note: "رياضة فردية ولياقة"
          }
        ],
        exercises: [
          {
            id: "2u3-ex1",
            question: "Ahmed likes to ______ judo twice a week. (play / go / do)",
            options: ["do", "play", "go", "make"],
            correctAnswer: "do",
            explanation: "رياضة الجودو فن قتالي فردي يأخذ الفعل do.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
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
        summary: "تحويل الصفات إلى ظروف لوصف كيفية حدوث الفعل، والظروف الشاذة.",
        grammarRuleFormula: "Adjective + -ly -> Adverb\nquick -> quickly, quiet -> quietly, careful -> carefully\nEnding in -y: easy -> easily, happy -> happily\n\nIrregular Adverbs (ظروف شاذة):\ngood -> well\nfast -> fast\nhard -> hard",
        detailedContent: [
          "الصفة تصف الاسم (He is a careful driver)، بينما الظرف يصف طريقة حدوث الفعل (He drives carefully).",
          "معظم الصفات نضيف لها -ly لتصبح ظرف حال.",
          "إذا انتهت الصفة بـ y مسبوقة بحرف صحيح تقلب إلى i ونضيف ly: happy -> happily.",
          "انتبه للظروف الشاذة: good تصبح well، و fast تبقى fast، و hard تبقى hard."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه لسؤال الإملاء: slow : slowly / good : well / fast : fast."
        ],
        commonMistakes: [
          "كتابة fastly (خطأ شائع؛ الظرف من fast هو fast بدون أي إضافة).",
          "استخدام good لوصف الفعل: He speaks English good (الصحيح speaks English well)."
        ],
        examples: [
          {
            en: "The champion ran very fast and won the race.",
            ar: "ركض البطل بسرعة فائقة وفاز بالسباق.",
            highlight: "ran very fast",
            note: "ظرف شاذ يصف فعل الركض"
          },
          {
            en: "She answered all the difficult questions easily.",
            ar: "أجابت عن جميع الأسئلة الصعبة بسهولة.",
            highlight: "easily",
            note: "ظرف حال منتهٍ بـ ily"
          }
        ],
        exercises: [
          {
            id: "2u3-ex2",
            question: "Nour plays the piano very ______ (good / well / nicely good).",
            options: ["well", "good", "goodly", "better"],
            correctAnswer: "well",
            explanation: "لوصف طريقة العزف (الفعل plays) نحتاج إلى ظرف الحال الشاذ من good وهو well.",
            type: "mcq",
            ministerialYear: "امتحان نهاية الكورس الأول"
          }
        ]
      }
    ]
  },
  {
    id: 25,
    number: 5,
    titleAr: "الوحدة الخامسة: إرسال المعلومات والمبني للمجهول (Sending Information & Passive Voice)",
    titleEn: "Unit 5: Old Ways of Communication & Passive Voice",
    description: "تاريخ نقل المعلومات والاتصالات، وقواعد المبني للمجهول في المضارع البسيط والماضي البسيط.",
    accentColor: "from-blue-600 to-indigo-600",
    bgGradient: "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200",
    lessons: [
      {
        id: "2nd-u5-l1",
        unitId: 25,
        lessonNumber: 1,
        titleAr: "الدرس الأول: المبني للمجهول في المضارع والماضي (Passive Voice)",
        titleEn: "Lesson 1: Present & Past Simple Passive",
        category: "grammar",
        summary: "التركيز على الفعل والنتيجة بدلاً من الفاعل باستخدام is/are + P.P. أو was/were + P.P.",
        grammarRuleFormula: "Present Simple Passive (المضارع البسيط):\nObject + is / are + Past Participle (P.P.)\n(e.g., Information is sent across the internet)\n\nPast Simple Passive (الماضي البسيط):\nObject + was / were + Past Participle (P.P.)\n(e.g., The telephone was invented by Alexander Graham Bell)",
        detailedContent: [
          "نستخدم المبني للمجهول عندما يكون المفعول به أو الفعل نفسه أكثر أهمية من الفاعل أو عندما يكون الفاعل مجهولاً.",
          "خطوات التحويل: 1) نحذف الفاعل، 2) نضع المفعول به في بداية الجملة، 3) نستخدم فعل كينونة مناسب (is/are للمضارع، was/were للماضي)، 4) نحول الفعل الرئيسي إلى التصريف الثالث (P.P.).",
          "أمثلة منهجية: Smoke signals were used to send messages in the past.",
          "Newspapers are printed every morning."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: احفظ التصريف الثالث للأفعال الشاذة: write -> written, send -> sent, make -> made, invent -> invented."
        ],
        commonMistakes: [
          "نسيان فعل الكينونة: The letter written (الصحيح The letter was written).",
          "استخدام was مع الجمع: Letters was sent (الصحيح Letters were sent)."
        ],
        examples: [
          {
            en: "English is spoken in many countries around the world.",
            ar: "يتم التحدث باللغة الإنكليزية في العديد من بلدان العالم.",
            highlight: "is spoken",
            note: "مضارع مبني للمجهول"
          },
          {
            en: "The ancient fortress was built thousands of years ago.",
            ar: "بُنيت القلعة القديمة قبل آلاف السنين.",
            highlight: "was built",
            note: "ماضٍ مبني للمجهول"
          }
        ],
        exercises: [
          {
            id: "2u5-ex1",
            question: "Millions of mobile phones ______ (sell) every year worldwide.",
            options: ["are sold", "sold", "is sold", "selling"],
            correctAnswer: "are sold",
            explanation: "فاعل المجهول جمع (mobile phones) في زمن المضارع البسيط، يأخذ are + التصريف الثالث sold.",
            type: "mcq",
            ministerialYear: "امتحان نهاية الكورس الثاني"
          }
        ]
      }
    ]
  },
  {
    id: 26,
    number: 6,
    titleAr: "الوحدة السادسة: المهن والخطط المستقبلية (What will they be?)",
    titleEn: "Unit 6: Careers, Jobs, be going to & Relative Pronouns",
    description: "الوظائف والمهن والخطط المستقبلية باستخدام be going to، وضمائر الوصل (who / which).",
    accentColor: "from-violet-600 to-purple-600",
    bgGradient: "bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200",
    lessons: [
      {
        id: "2nd-u6-l1",
        unitId: 26,
        lessonNumber: 1,
        titleAr: "الدرس الأول: التعبير عن النوايا والخطط المستقبلية (be going to)",
        titleEn: "Lesson 1: Future Plans with (be going to)",
        category: "grammar",
        summary: "التعبير عن خطط ونوايا مستقبلية مؤكدة ومخطط لها مسبقاً.",
        grammarRuleFormula: "Subject + am / is / are + going to + base verb\n(e.g., I am going to be a doctor when I finish school)",
        detailedContent: [
          "نستخدم (be going to) عندما نكون قد اتخذنا قراراً أو خطة مسبقة للقيام بالشيء.",
          "بعد going to يأتي دائماً فعل مجرد (infinitive).",
          "تستخدم بكثرة عند الحديث عن الطموح المهني: What are you going to be?",
          "I am going to study medicine."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تذكر تصريف am/is/are قبل going to حسب الفاعل: I am, He/She is, We/They are."
        ],
        commonMistakes: [
          "نسيان فعل الكينونة وكتابة: I going to study (الصحيح I am going to study)."
        ],
        examples: [
          {
            en: "Layla is going to be a software engineer.",
            ar: "ليلى تخطط لتكون مهندسة برمجيات.",
            highlight: "is going to be",
            note: "خطة مهنية مستقبلية"
          }
        ],
        exercises: [
          {
            id: "2u6-ex1",
            question: "Zaid is interested in planes. He ______ (be) a pilot in the future.",
            options: ["is going to be", "will is", "going to be", "was be"],
            correctAnswer: "is going to be",
            explanation: "خطة مستقبلية ونية واضحة تتطلب استخدام is going to + المصدر be.",
            type: "mcq",
            ministerialYear: "امتحان الفصل الثاني"
          }
        ]
      },
      {
        id: "2nd-u6-l2",
        unitId: 26,
        lessonNumber: 2,
        titleAr: "الدرس الثاني: ضمائر الوصل (who / which / that)",
        titleEn: "Lesson 2: Defining Relative Pronouns",
        category: "grammar",
        summary: "ربط الجمل باستخدام who للعاقل و which / that لغير العاقل.",
        grammarRuleFormula: "Person (شخص عاقل) + who + verb / clause\nThing (شيء غير عاقل) + which / that + verb / clause",
        detailedContent: [
          "نستخدم who عندما نشير إلى إنسان أو شخصية: An architect is a person who designs buildings.",
          "نستخدم which أو that عندما نشير إلى جماد أو حيوان أو فكرة: A stethoscope is an instrument which doctors use.",
          "تدمج الجملتين وتزيل الضمير المكرر."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انظر إلى الكلمة التي قبل الفراغ مباشرة: إذا كانت عاقلاً (doctor, person, student) -> اختر who. إذا كانت غير عاقل (car, book, animal) -> اختر which."
        ],
        commonMistakes: [
          "اختيار which مع شخص عاقل مثل: The man which helped me (الصحيح who helped me)."
        ],
        examples: [
          {
            en: "A vet is a doctor who treats sick animals.",
            ar: "الطبيب البيطري هو طبيب يعالج الحيوانات المريضة.",
            highlight: "who treats",
            note: "ضمير وصل لعاقل"
          },
          {
            en: "That is the dictionary which I bought yesterday.",
            ar: "هذا هو القاموس الذي اشتريته بالأمس.",
            highlight: "which I bought",
            note: "ضمير وصل لغير عاقل"
          }
        ],
        exercises: [
          {
            id: "2u6-ex2",
            question: "A mechanic is someone ______ fixes broken cars. (who / which / whose)",
            options: ["who", "which", "whose", "where"],
            correctAnswer: "who",
            explanation: "الميكانيكي (someone / mechanic) شخص عاقل يأخذ ضمير الوصل who.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          }
        ]
      }
    ]
  },
  {
    id: 27,
    number: 7,
    titleAr: "الوحدة السابعة: العالم والبيئة والجمل الشرطية (The World Around Us)",
    titleEn: "Unit 7: Environment & First Conditional",
    description: "حماية الحيوانات المهددة بالانقراض، تدوير النفايات، والجمل الشرطية من النوع الأول (First Conditional).",
    accentColor: "from-teal-600 to-emerald-600",
    bgGradient: "bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200",
    lessons: [
      {
        id: "2nd-u7-l1",
        unitId: 27,
        lessonNumber: 1,
        titleAr: "الدرس الأول: الحالة الشرطية الأولى (First Conditional)",
        titleEn: "Lesson 1: First Conditional (If + Present, will + base)",
        category: "grammar",
        summary: "التعبير عن نتائج محتملة في المستقبل إذا تحقق شرط في الحاضر.",
        grammarRuleFormula: "If + Subject + Present Simple, Subject + will + base verb\n(e.g., If we recycle plastic, we will save the environment)",
        detailedContent: [
          "تستخدم الحالة الشرطية الأولى لأحداث ومواقف حقيقية ممكنة الحدوث في المستقبل.",
          "جملة فعل الشرط (بعد If) تأتي في زمن المضارع البسيط (مع s المفرد للفاعل He/She/It).",
          "جملة جواب الشرط تأتي في زمن المستقبل مع will ومصدر مجرد.",
          "يمكن أن تأتي If في وسط الجملة بدون فاصلة: We will protect animals if we stop cutting trees."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تذكر إضافة s الشخص الثالث في جملة If إذا كان الفاعل مفرداً: If it rains, we will stay at home."
        ],
        commonMistakes: [
          "وضع will في جملة If مثل: If it will rain (خطأ شائع؛ will تأتي في جواب الشرط فقط)."
        ],
        examples: [
          {
            en: "If you study hard, you will pass your final exams easily.",
            ar: "إذا درست بجد، ستجتاز امتحاناتك النهائية بسهولة.",
            highlight: "If you study ... will pass",
            note: "حالة شرطية أولى محتملة"
          }
        ],
        exercises: [
          {
            id: "2u7-ex1",
            question: "If Sami trains every day, he ______ (win) the gold medal.",
            options: ["will win", "won", "wins", "would win"],
            correctAnswer: "will win",
            explanation: "فعل الشرط مضارع بسيط (trains)، لذا جواب الشرط يكون will + المصدر win.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          }
        ]
      }
    ]
  }
];

// =========================================================================
// قصص الثاني المتوسط (Story Time: Bob and Basim)
// =========================================================================
export const SECOND_INTERMEDIATE_STORIES: LiteratureItem[] = [
  {
    id: "2nd-story-pitcher",
    title: "Bob and Basim: The Pitcher",
    titleAr: "قصة بوب وباسم: إبريق الماء في المخيم الكشفي",
    author: "English for Iraq Official Curriculum",
    authorAr: "سلسلة قصص بوب وباسم المقررة رسمياً لمنهج العراق",
    genre: "Humorous Adventure / Story Time",
    genreAr: "مغامرة كشفية كوميدية شيقة",
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
    imageCaptionAr: "المخيم الكشفي العالمي للشباب في أستراليا",
    summaryAr: "بوب وباسم شابان يمثلان العراق والوطن العربي في المخيم الكشفي العالمي للشباب في أستراليا (World Youth Camp). في هذه القصة يقع بوب في مواقف محرجة وكوميدية بسبب سوء حظه الدائم، حيث يسقط إبريق الماء الكبير ويحدث فوضى مرحة أثناء التخييم، لكن صداقة باسم ودعمه الدائم يساعدانه على تجاوز الموقف بابتسامة.",
    moralLessonAr: "الصداقة الحقيقية، روح العمل الجماعي في الكشافة، والقدرة على الضحك والتفاؤل رغم العثرات.",
    keyThemes: ["Scouting spirit", "True international friendship", "Optimism and resilience"],
    characters: [
      {
        name: "Bob",
        nameAr: "بوب",
        role: "The unlucky adventurous scout",
        roleAr: "الكشاف طيب القلب ولكنه قليل الحظ وتحدث معه المقالب",
        description: "Always experiences funny accidents and mishaps during their adventures in Australia.",
        descriptionAr: "شاب طيب تحدث معه دائماً مواقف طريفة ومحرجة وغير متوقعة."
      },
      {
        name: "Basim",
        nameAr: "باسم",
        role: "Bob's loyal Iraqi best friend",
        roleAr: "صديق بوب المخلص من العراق",
        description: "Calm, helpful, and supportive scout who stands by Bob in every situation.",
        descriptionAr: "شاب هادئ ووفي يرافق بوب ويسانده في جميع مغامرات المخيم."
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
        answer: "Two friendly scouts participating in the World Youth Camp.",
        answerAr: "كشافان ودودان يشاركان في المخيم الكشفي العالمي للشباب.",
        year: "امتحان الفصل الأول"
      },
      {
        id: "2nd-q3",
        question: "Why does Bob always say: 'Why do these things always happen to me?'",
        questionAr: "لماذا يقول بوب دائماً: 'لماذا تحدث هذه الأمور معي دائماً؟'",
        answer: "Because he is very unlucky and funny accidents happen to him all the time.",
        answerAr: "لأنه قليل الحظ وتحدث معه حوادث ومقالب كوميدية طوال الوقت.",
        year: "امتحان نهاية السنة"
      }
    ]
  },
  {
    id: "2nd-story-icecream",
    title: "Bob and Basim: The Ice Cream",
    titleAr: "قصة بوب وباسم: مغامرة الآيس كريم في بريزبان",
    author: "English for Iraq Official Curriculum",
    authorAr: "منهاج وزارة التربية العراقية",
    genre: "Comic Story Time",
    genreAr: "قصة كوميدية ممتعة",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1200&q=80",
    imageCaptionAr: "رحلة الكشافة إلى المدينة وتناول الآيس كريم في يوم مشمس",
    summaryAr: "في يوم عطلة حار ومشمس في أستراليا، ذهب الفتيان إلى متجر لبيع الآيس كريم. اشترى بوب مخروط آيس كريم عملاقاً بـ 5 نكهات ملونة. بينما كان يمشي فخوراً به، اصطدم فجأة وسقط الآيس كريم بأكمله على قميصه ووجهه وسط ضحكات أصدقائه، معلقاً بعبارته الشهيرة: 'لماذا تحدث هذه الأشياء معي دائماً؟'.",
    moralLessonAr: "تقبل المواقف المحرجة بروح رياضية والمرح مع الأصدقاء.",
    keyThemes: ["Good humor", "Friendship", "Memorable shared moments"],
    characters: [
      {
        name: "Bob",
        nameAr: "بوب",
        role: "The main character",
        roleAr: "البطل الكوميدي للقصة",
        description: "Buys a huge 5-scoop ice cream that melts and spills all over him.",
        descriptionAr: "يشتري آيس كريم ضخم بخمس نكهات وينتهي به الأمر مسكوباً عليه."
      }
    ],
    ministerialQA: [
      {
        id: "2nd-ice-q1",
        question: "How many scoops of ice cream did Bob buy?",
        questionAr: "كم كرة آيس كريم اشترى بوب؟",
        answer: "Five scoops of different flavours.",
        answerAr: "خمس كرات بنكهات مختلفة.",
        year: "امتحان الفصل الثاني"
      },
      {
        id: "2nd-ice-q2",
        question: "What happened to Bob's ice cream in the end?",
        questionAr: "ماذا حدث لآيس كريم بوب في النهاية؟",
        answer: "It fell and spilt all over his clothes and face.",
        answerAr: "سقط وانسكب بالكامل على ملابسه ووجهه.",
        year: "امتحان نهاية السنة"
      }
    ]
  }
];

// =========================================================================
// إنشاءات الثاني المتوسط (Essays / Compositions)
// =========================================================================
export const SECOND_INTERMEDIATE_ESSAYS: EssayItem[] = [
  {
    id: "2nd-essay-interview",
    unitId: 21,
    titleAr: "إنشاء الوحدة الأولى: مقابلة مع شخصية محلية (An Interview with a Local Person)",
    titleEn: "An Interview with a Local Teacher (Mr. Tariq)",
    ministerialWeight: "15 درجة في الامتحان النهائي",
    paragraphsEn: [
      "Last Tuesday, our school magazine team conducted an inspiring interview with Mr. Tariq, a beloved English teacher who has been teaching in our city for over twenty years.",
      "Mr. Tariq said he loves teaching because helping young Iraqi students learn a global language gives him immense joy. In his spare time, he enjoys reading historical books and gardening in his backyard.",
      "When we asked him for advice for the school magazine, he smiled and said: 'Always work hard, read every single day, and never be afraid of making mistakes because that is how we truly learn.'"
    ],
    paragraphsAr: [
      "في يوم الثلاثاء الماضي، أجرى فريق مجلة مدرستنا مقابلة ملهمة مع الأستاذ طارق، وهو مدرس لغة إنكليزية محبوب يدرّس في مدينتنا منذ أكثر من عشرين عاماً.",
      "قال الأستاذ طارق إنه يعشق مهنة التدريس لأن مساعدة الطلبة العراقيين على تعلم لغة عالمية تمنحه سعادة غامرة. وفي أوقات فراغه، يستمتع بقراءة كتب التاريخ والاعتناء بحديقة منزله.",
      "وعندما طلبنا منه نصيحة لمجلة المدرسة، ابتسم وقال: 'اعملوا بجد دائماً، واقرؤوا كل يوم، ولا تخافوا أبداً من ارتكاب الأخطاء لأنها السبيل الحقيقي للتعلم.'"
    ],
    keywords: [
      { word: "inspiring interview", meaning: "مقابلة ملهمة" },
      { word: "beloved teacher", meaning: "مدرس محبوب" },
      { word: "immense joy", meaning: "سعادة غامرة" },
      { word: "spare time", meaning: "وقت الفراغ" },
      { word: "work hard", meaning: "العمل والاجتهاد بجد" }
    ],
    goldenTips: [
      "نصيحة الأستاذ مصطفى تركي: قسّم المقابلة إلى: 1) التعريف بالشخص، 2) هواياته ولماذا يحب عمله، 3) نصيحته الذهبية للطلاب.",
      "استخدم علامات الاقتباس (\"...\") عند ذكر كلام الضيف المباشر لضمان درجات التنقيط الكاملة."
    ],
    clozeSentences: [
      {
        textWithBlanks: "Our school magazine team conducted an ______ with Mr. Tariq.",
        missingWord: "interview",
        options: ["interview", "exam", "accident", "operation"]
      }
    ]
  },
  {
    id: "2nd-essay-fitness",
    unitId: 22,
    titleAr: "إنشاء الوحدة الثانية: كيف تحافظ على صحتك ولياقتك (How to Keep Fit and Healthy)",
    titleEn: "How to Keep Fit and Healthy",
    ministerialWeight: "15 درجة في الامتحان النهائي",
    paragraphsEn: [
      "Fitness and good health are essential for every student to succeed in life and study effectively. People who are unfit get tired quickly and cannot enjoy sports or daily activities.",
      "To stay healthy, you should eat balanced meals with plenty of fresh fruit and vegetables. You must not eat too much fat, sugar, or junk food, and drink at least eight glasses of clean water daily.",
      "Moreover, doing regular exercise like swimming, jogging, or walking for thirty minutes a day keeps your heart strong and boosts your energy. Finally, make sure you get eight hours of restful sleep every night."
    ],
    paragraphsAr: [
      "تعتبر اللياقة البدنية والصحة الجيدة أمراً أساسياً لكل طالب للنجاح في الحياة والدراسة بكفاءة. فالأشخاص غير اللائقين بدنياً يتعبون بسرعة ولا يستطيعون الاستمتاع بالرياضة أو الأنشطة اليومية.",
      "للبقاء بصحة جيدة، ينبغي عليك تناول وجبات متوازنة تحتوي على الكثير من الفواكه والخضروات الطازجة. ويجب ألا تكثر من تناول الدهون والسكريات والوجبات السريعة، وأن تشرب 8 أكواب من الماء النظيف يومياً.",
      "علاوة على ذلك، فإن ممارسة التمارين الرياضية بانتظام مثل السباحة أو الركض أو المشي لمدة 30 دقيقة يومياً تقوي قلبك وتزيد نشاطك. وأخيراً، احرص على نيل 8 ساعات من النوم المريح كل ليلة."
    ],
    keywords: [
      { word: "essential", meaning: "أساسي وضروري" },
      { word: "balanced meals", meaning: "وجبات غذائية متوازنة" },
      { word: "junk food", meaning: "الوجبات السريعة غير الصحية" },
      { word: "regular exercise", meaning: "تمارين رياضية منتظمة" },
      { word: "boosts energy", meaning: "يزيد الطاقة والنشاط" }
    ],
    goldenTips: [
      "استخدم أدوات النصيحة التي درستها في الوحدة: You should eat..., You shouldn't drink too much..., You must get enough sleep."
    ],
    clozeSentences: [
      {
        textWithBlanks: "To keep fit, you should do regular ______ every day.",
        missingWord: "exercise",
        options: ["exercise", "sugar", "sleeping", "smoking"]
      }
    ]
  },
  {
    id: "2nd-essay-dream-job",
    unitId: 26,
    titleAr: "إنشاء الوحدة السادسة: مهنتي المستقبلية (My Dream Career / Future Job)",
    titleEn: "My Future Career: A Doctor",
    ministerialWeight: "15 درجة في الامتحان النهائي",
    paragraphsEn: [
      "When I finish my studies, I am going to be a dedicated doctor because I want to heal sick people and serve my beloved country, Iraq.",
      "Doctors work in hospitals and clinics, examining patients, diagnosing diseases, and prescribing the right medicine. This noble career requires being patient, caring, and studying very hard for many years at medical college.",
      "In school, I am focusing on Biology, Chemistry, and English to achieve top marks. I believe that being a doctor is not just a job, but a lifelong mission to bring hope and smiles to people's faces."
    ],
    paragraphsAr: [
      "عندما أنهي دراستي، أخطط أن أكون طبيباً مخلصاً لأنني أريد علاج المرضى وخدمة بلدي الحبيب العراق.",
      "يعمل الأطباء في المستشفيات والعيادات، حيث يفحصون المرضى ويشخصون الأمراض ويصفون الدواء المناسب. وتتطلب هذه المهنة النبيلة الصبر والرحمة والدراسة بجد لسنوات عديدة في كلية الطب.",
      "في المدرسة، أركز على دراسة الأحياء والكيمياء واللغة الإنكليزية لتحقيق أعلى الدرجات. وأؤمن بأن الطب ليس مجرد وظيفة، بل رسالة حياة لزرع الأمل والابتسامة على وجوه الناس."
    ],
    keywords: [
      { word: "dedicated doctor", meaning: "طبيب مخلص ومتفانٍ" },
      { word: "noble career", meaning: "مهنة نبيلة وإنسانية" },
      { word: "diagnosing diseases", meaning: "تشخيص الأمراض" },
      { word: "prescribing medicine", meaning: "وصف الدواء المناسب" },
      { word: "lifelong mission", meaning: "رسالة حياة دائمة" }
    ],
    goldenTips: [
      "استخدم صيغة المستقبل: I am going to be a... because I want to...",
      "اذكر الصفات الشخصية المطلوبة للمهنة (patient, caring, hard-working)."
    ],
    clozeSentences: [
      {
        textWithBlanks: "I want to be a doctor because I want to ______ sick people.",
        missingWord: "heal",
        options: ["heal", "break", "forget", "lose"]
      }
    ]
  }
];

// =========================================================================
// بنك أسئلة امتحانات الثاني المتوسط
// =========================================================================
export const SECOND_INTERMEDIATE_QUESTIONS: MinisterialExamQuestion[] = [
  {
    id: "2nd-exam-q1",
    unitId: 21,
    topic: "Possessive Apostrophe",
    year: "امتحان الفصل الأول 2024",
    session: "دور أول",
    questionText: "This is the ______ (boy's / boys') room. (Only one boy lives here)",
    correctAnswer: "boy's",
    ruleExplanation: "الحديث عن ولد واحد فقط (مفرد)، لذا نضع الفاصلة قبل حرف s: boy's.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "2nd-exam-q2",
    unitId: 21,
    topic: "Giving Advice with should",
    year: "امتحان نصف السنة 2024",
    session: "دور أول",
    questionText: "You have a bad toothache. You ______ go to the dentist. (should / shouldn't / must to)",
    correctAnswer: "should",
    ruleExplanation: "إعطاء نصيحة إيجابية ومفيدة باستخدام should متبوعة بالمصدر go.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "2nd-exam-q3",
    unitId: 22,
    topic: "Quantifiers too much vs too many",
    year: "امتحان نصف السنة",
    session: "دور أول",
    questionText: "You shouldn't eat ______ (too much / too many) sugar in your tea.",
    correctAnswer: "too much",
    ruleExplanation: "السكر (sugar) اسم غير معدود يدل على كمية، فنستخدم معه too much.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "2nd-exam-q4",
    unitId: 23,
    topic: "Sports verbs play / go / do",
    year: "امتحان الفصل الأول",
    session: "دور أول",
    questionText: "My brother likes to ______ (play / go / do) swimming on hot summer days.",
    correctAnswer: "go",
    ruleExplanation: "الأنشطة الرياضية المنتهية بـ ing مثل swimming تأخذ الفعل go.",
    difficulty: "easy",
    category: "Vocabulary"
  },
  {
    id: "2nd-exam-q5",
    unitId: 23,
    topic: "Adverbs of Manner",
    year: "امتحان نهاية الكورس الأول",
    session: "دور أول",
    questionText: "Ali is a careful driver. He drives his car ______ (careful / carefully / care).",
    correctAnswer: "carefully",
    ruleExplanation: "لوصف الفعل drives نحتاج إلى ظرف حال مشتق من الصفة بإضافة ly وهو carefully.",
    difficulty: "medium",
    category: "Grammar"
  },
  {
    id: "2nd-exam-q6",
    unitId: 25,
    topic: "Past Simple Passive",
    year: "امتحان نهاية السنة 2024",
    session: "دور أول",
    questionText: "The television ______ (invent) by John Logie Baird. [Past Passive]",
    correctAnswer: "was invented",
    ruleExplanation: "المفعول به مفرد (The television) في زمن الماضي، لذا نستخدم was + التصريف الثالث invented.",
    difficulty: "medium",
    category: "Grammar"
  },
  {
    id: "2nd-exam-q7",
    unitId: 26,
    topic: "Relative Pronouns who vs which",
    year: "امتحان نهاية السنة",
    session: "دور أول",
    questionText: "That is the friendly teacher ______ taught us English last year. (who / which / where)",
    correctAnswer: "who",
    ruleExplanation: "المعلم (teacher) عاقل يأخذ ضمير الوصل who.",
    difficulty: "easy",
    category: "Grammar"
  },
  {
    id: "2nd-exam-q8",
    unitId: 27,
    topic: "First Conditional",
    year: "امتحان نهاية السنة",
    session: "دور أول",
    questionText: "If we recycle paper and glass, we ______ (save) trees.",
    correctAnswer: "will save",
    ruleExplanation: "الحالة الشرطية الأولى: فعل الشرط مضارع (recycle)، جواب الشرط مستقبل will save.",
    difficulty: "medium",
    category: "Grammar"
  }
];

// =========================================================================
// نموذج الامتحان الشامل للثاني المتوسط (Mock Exam Paper)
// =========================================================================
export const SECOND_INTERMEDIATE_MOCK_PAPER: MockExamPaper = {
  id: "2nd-full-mock-paper-2025",
  title: "امتحان نهاية السنة الشامل • الثاني المتوسط (اعتماداً على أسئلة 2020 إلى 2026)",
  subtitle: "إشراف الأستاذ مصطفى تركي • الاعتماد الحصري على كتاب الطالب (Student's Book) وكتاب النشاط (Activity Book)",
  session: "الدور الأول • المنهج العراقي الرسمي (2020-2026)",
  year: "2020 - 2026",
  durationMinutes: 120,
  totalMarks: 100,
  sections: [
    {
      id: "sec-1",
      sectionCode: "Q1-A",
      titleAr: "السؤال الأول (أ): القطعة الخارجية الاستيعابية",
      titleEn: "Question 1 (A): Reading Comprehension - Unseen Passage",
      instructionsAr: "اقرأ القطعة بعناية ثم أجب عن الأسئلة التالية:",
      instructionsEn: "Read the passage carefully, then answer the questions below:",
      totalMarks: 20,
      unseenPassage: "Good fitness is essential for young people. When teenagers are fit, they have more energy, perform better in school, and sleep soundly at night. Unfortunately, many students nowadays spend too much time sitting on sofas playing video games and eating unhealthy junk food like crisps, burgers, and sugary sodas. Doctors in Iraq advise students to exercise for at least 45 minutes every day. You don't have to join an expensive gym; walking to school, riding a bicycle, or playing football with friends in the park are wonderful ways to stay strong and healthy.",
      items: [
        {
          id: "2nd-mock-q1-1",
          number: 1,
          questionText: "Why is good fitness essential for teenagers?",
          type: "text",
          correctAnswer: "It gives them more energy and helps them perform better in school",
          alternativeAnswers: ["More energy and better in school"],
          explanation: "السطر الثاني: اللياقة تمنح طاقة وتساعد على الأداء الأفضل في المدرسة.",
          maxScore: 4
        },
        {
          id: "2nd-mock-q1-2",
          number: 2,
          questionText: "What bad habits do many students have nowadays?",
          type: "text",
          correctAnswer: "Sitting too long playing video games and eating junk food",
          alternativeAnswers: ["Playing video games and junk food"],
          explanation: "الجلوس طويلاً أمام ألعاب الفيديو وتناول الطعام غير الصحي.",
          maxScore: 4
        },
        {
          id: "2nd-mock-q1-3",
          number: 3,
          questionText: "How long should students exercise every day according to Iraqi doctors?",
          type: "text",
          correctAnswer: "At least 45 minutes every day",
          alternativeAnswers: ["45 minutes every day", "45 minutes"],
          explanation: "45 دقيقة يومياً على الأقل.",
          maxScore: 4
        },
        {
          id: "2nd-mock-q1-4",
          number: 4,
          questionText: "You must join an expensive gym to get fit. (True / False)",
          type: "choice",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "النص يقول: You don't have to join an expensive gym.",
          maxScore: 4
        },
        {
          id: "2nd-mock-q1-5",
          number: 5,
          questionText: "Give two easy ways mentioned in the text to stay healthy without a gym.",
          type: "text",
          correctAnswer: "Walking to school and playing football",
          alternativeAnswers: ["Riding a bicycle and walking", "Playing football"],
          explanation: "المشي إلى المدرسة أو لعب كرة القدم في المتنزه.",
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
          id: "2nd-mock-q2-1",
          number: 1,
          questionText: "You ______ drink too much fizzy soda; it ruins your teeth. (should / shouldn't / can)",
          type: "choice",
          options: ["shouldn't", "should", "can"],
          correctAnswer: "shouldn't",
          explanation: "نصيحة تحذيرية بعدم الإكثار من المشروبات الغازية باستخدام shouldn't.",
          maxScore: 5
        },
        {
          id: "2nd-mock-q2-2",
          number: 2,
          questionText: "The message ______ (send) by email yesterday. [Past Passive]",
          type: "choice",
          options: ["was sent", "is sent", "sent"],
          correctAnswer: "was sent",
          explanation: "ماضٍ بسيط مبني للمجهول للمفرد was + sent.",
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
          questionText: "An engineer is a person ______ builds bridges and roads. (who / which / whose)",
          type: "choice",
          options: ["who", "which", "whose"],
          correctAnswer: "who",
          explanation: "المهندس شخص عاقل يأخذ ضمير الوصل who.",
          maxScore: 5
        },
        {
          id: "2nd-mock-q2-5",
          number: 5,
          questionText: "If it rains tomorrow, we ______ (stay) at home. [First Conditional]",
          type: "choice",
          options: ["will stay", "stayed", "would stay"],
          correctAnswer: "will stay",
          explanation: "حالة شرطية أولى: جواب الشرط يكون will stay.",
          maxScore: 5
        }
      ]
    },
    {
      id: "sec-3",
      sectionCode: "Q3",
      titleAr: "السؤال الثالث: المفردات والتنقيط والإملاء",
      titleEn: "Question 3: Vocabulary & Spelling",
      instructionsAr: "أجب عن فروع المفردات والإملاء:",
      instructionsEn: "Answer the vocabulary and spelling questions:",
      totalMarks: 20,
      items: [
        {
          id: "2nd-mock-q3-1",
          number: 1,
          questionText: "Which sport takes the verb 'do'? (karate / football / swimming)",
          type: "choice",
          options: ["karate", "football", "swimming"],
          correctAnswer: "karate",
          explanation: "الفنون القتالية الفردية كاراتيه تأخذ الفعل do.",
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
      titleAr: "السؤال الرابع: قصص المطالعة (Story Time: بوب وباسم)",
      titleEn: "Question 4: Story Time (Bob & Basim)",
      instructionsAr: "أجب عن الأسئلة الخاصة بقصص بوب وباسم في أستراليا:",
      instructionsEn: "Answer the questions about the story of Bob and Basim:",
      totalMarks: 15,
      items: [
        {
          id: "2nd-mock-q4-1",
          number: 1,
          questionText: "What camp were Bob and Basim attending in Australia?",
          type: "choice",
          options: ["The World Youth Camp", "A music camp", "A football camp"],
          correctAnswer: "The World Youth Camp",
          explanation: "المخيم الكشفي العالمي للشباب (World Youth Camp).",
          maxScore: 5
        },
        {
          id: "2nd-mock-q4-2",
          number: 2,
          questionText: "What is Bob's famous repeated question whenever an accident happens?",
          type: "choice",
          options: [
            "'Why do these things always happen to me?'",
            "'Where is my money?'",
            "'What time is the bus?'"
          ],
          correctAnswer: "'Why do these things always happen to me?'",
          explanation: "عبارته الشهيرة: لماذا تحدث هذه الأشياء معي دائماً؟",
          maxScore: 5
        },
        {
          id: "2nd-mock-q4-3",
          number: 3,
          questionText: "In the Ice Cream story, what happened to Bob's 5-scoop ice cream?",
          type: "choice",
          options: [
            "It spilt all over his clothes and face",
            "A dog ate it",
            "He gave it to Basim"
          ],
          correctAnswer: "It spilt all over his clothes and face",
          explanation: "انسكب الآيس كريم بالكامل على ملابسه ووجهه.",
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
      prompt: "Write a short article for your school magazine about how teenagers can stay fit and healthy.",
      suggestedModel: "Fitness and good health are essential for every student to study effectively. To stay healthy, you should eat balanced meals with fresh fruit and vegetables. Avoid eating too much junk food and sugary soda. Doing regular exercise like swimming or jogging strengthens your heart and boosts your energy. Finally, get eight hours of restful sleep every night.",
      keywords: ["fitness", "balanced meals", "junk food", "regular exercise", "restful sleep"],
      maxScore: 20
    },
    {
      id: "2nd-essay-opt-b",
      optionLetter: "B",
      titleEn: "My Future Career: A Doctor",
      titleAr: "مهنتي المستقبلية: طبيب (الوحدة السادسة)",
      prompt: "Write a paragraph about a career you would like to have in the future and explain why.",
      suggestedModel: "When I finish school, I am going to be a doctor because I want to heal sick people and serve Iraq. Doctors work in hospitals, examining patients and prescribing medicine. It requires being patient and studying hard at medical college. I believe medicine is a noble mission that brings smiles to people's faces.",
      keywords: ["doctor", "hospitals", "patients", "medicine", "noble mission"],
      maxScore: 20
    }
  ]
};
