import { Unit } from '../types';

export const CURRICULUM_UNITS: Unit[] = [
  {
    id: 1,
    number: 1,
    titleAr: "الوحدة الأولى: القواعد والقطع والاستيعاب",
    titleEn: "Unit 1: Health, Daily Habits & Past Actions",
    description: "أدوات الربط (While, As, When, And)، الصفات المنتهية بـ (ed/ing)، الأفعال المركبة، أدوات المقدار، وقاعدة (Used to)، بالإضافة لقصتي زيد طارق ومصطفى أحمد.",
    accentColor: "from-blue-600 to-indigo-600",
    bgGradient: "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200",
    lessons: [
      {
        id: "u1-l1",
        unitId: 1,
        lessonNumber: 1,
        titleAr: "أدوات الربط والماضي المستمر والماضي البسيط",
        titleEn: "Past Continuous & Past Simple with Connectors",
        category: "grammar",
        summary: "ربط حدثين في الماضي: أحدهما استغرق وقتاً أطول (ماضي مستمر) وقطعه حدث أقصر (ماضي بسيط).",
        grammarRuleFormula: "While / As + [Past Continuous (was/were + v-ing)] , [Past Simple (v-ed/irregular)]\nWhen / And + [Past Simple] , [Past Continuous]",
        detailedContent: [
          "نستخدم الماضي المستمر للحدث الأطول (Long action) وهو الحدث الذي كان مستمراً في وقت محدد بالماضي.",
          "نستخدم الماضي البسيط للحدث القصير المفاجئ الذي قطع الحدث المستمر (Short interrupting action).",
          "الأدوات (While / As) تدخل دائماً على جملة الماضي المستمر (was/were + v-ing).",
          "الأدوات (When / And) تدخل دائماً على جملة الماضي البسيط (تصريف ثانٍ ed أو شاذ)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: إذا جاءت (While أو As) في وسط الجملة، لا نضع فاصلة (comma)، ويبقى الماضي المستمر بعدها مباشرة.",
          "تنبيه وزاري: أداة الربط (And) لا تأتي أبداً في بداية الجملة في أسئلة الامتحان الوزاري، وموقعها دائماً في الوسط ويتبعها ماضي بسيط.",
          "احذر من تصريف الأفعال الشاذة الشائعة في هذا الموضوع: drive -> drove, sit -> sat, tell -> told, fall -> fell, break -> broke."
        ],
        commonMistakes: [
          "كتابة (was) مع ضمائر الجمع (They, We, You) أو العكس.",
          "نسيان مضاعفة الحرف الصحيح الأخير قبل إضافة ing مثل: sit -> sitting, swim -> swimming.",
          "وضع الماضي البسيط بعد أداة (While) وهذا خطأ وزاري متكرر."
        ],
        examples: [
          {
            en: "While Ali was having a shower, somebody knocked at the front door.",
            ar: "بينما كان علي يستحم، طرق أحدهم الباب الأمامي.",
            highlight: "While Ali was having ... knocked",
            note: "وزاري 2016 دور أول"
          },
          {
            en: "I was thinking about you and then you rang me.",
            ar: "كنت أفكر بك ثم رن هاتفي منك.",
            highlight: "was thinking ... rang",
            note: "وزاري 2018 دور ثانٍ"
          },
          {
            en: "A thief took our clothes as we were swimming.",
            ar: "سرق اللص ملابسنا بينما كنا نسبح.",
            highlight: "took ... as we were swimming",
            note: "وزاري 2020 دور أول"
          }
        ],
        exercises: [
          {
            id: "u1-ex1",
            question: "While she (read) a story, she fell asleep. (Correct the form)",
            options: ["was reading", "is reading", "readed", "reads"],
            correctAnswer: "was reading",
            explanation: "لأن أداة الربط (While) يتبعها دائماً ماضي مستمر، والفاعل مفرد (she) يأخذ was + reading.",
            type: "mcq",
            ministerialYear: "2017 دور أول"
          },
          {
            id: "u1-ex2",
            question: "I was eating breakfast when a bird (fly) into the kitchen.",
            options: ["flew", "flied", "was flying", "flies"],
            correctAnswer: "flew",
            explanation: "أداة الربط (when) يأتي بعدها ماضي بسيط، والتصريف الثاني للشاذ (fly) هو (flew).",
            type: "mcq",
            ministerialYear: "2019 دور ثالث"
          },
          {
            id: "u1-ex3",
            question: "She (tell) us to be quiet as we were making too much noise.",
            options: ["told", "was telling", "tell", "tells"],
            correctAnswer: "told",
            explanation: "جملة (as) تحتوي ماضي مستمر (were making)، فالطرف الآخر يكون ماضياً بسيطاً (told).",
            type: "mcq",
            ministerialYear: "2021 تمهيدي"
          }
        ]
      },
      {
        id: "u1-l2",
        unitId: 1,
        lessonNumber: 2,
        titleAr: "الصفات المنتهية بـ (ed) و (ing)",
        titleEn: "Adjectives Ending in -ed and -ing",
        category: "grammar",
        summary: "التمييز بين الصفة التي تصف الشعور الداخلي للشخص (-ed) والصفة التي تصف مسبب الشعور أو الشيء (-ing).",
        grammarRuleFormula: "Person + feels emotion => Adjective-ed\nCause of emotion / Non-human => Adjective-ing",
        detailedContent: [
          "الصفات المنتهية بـ (-ed) تصف شعور الشخص العاقل وتجربته الذاتية (كيف يشعر).",
          "الصفات المنتهية بـ (-ing) تصف الشيء أو الشخص الذي يسبب ذلك الشعور (ما الذي يجعله هكذا).",
          "القاعدة الذهبية السريعة: إذا كان بعد القوس اسم موصوف مباشرة (noun) مثل (film, person, day) نختار غالباً الصفة التي تنتهي بـ (-ing) بغض النظر عن الفاعل."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انظر بعد القوس مباشرة! إذا وجدت (in, on, with, at, when) وكان الفاعل عاقلاً، فاختر الصفة المنتهية بـ (-ed).",
          "إذا جاء بعد القوس كلمة (book, film, day, story) فاختر (-ing) فوراً لأنك تصف اسماً وليس شعوراً مجرداً."
        ],
        examples: [
          {
            en: "She is not very interested in fashion. She prefers books.",
            ar: "هي ليست مهتمة جداً بالأزياء، بل تفضل الكتب.",
            highlight: "interested in",
            note: "وزاري 2015 دور أول"
          },
          {
            en: "It was the most frightening day of my life.",
            ar: "كان أكثر يوم مرعب في حياتي.",
            highlight: "frightening day",
            note: "وزاري 2018 تمهيدي"
          }
        ],
        exercises: [
          {
            id: "u1-ex4",
            question: "This book is very (bored / boring). I fall asleep whenever I try to read it.",
            options: ["boring", "bored"],
            correctAnswer: "boring",
            explanation: "الكتاب جماد مسبب للشعور، لذا نستخدم الصفة المنتهية بـ ing.",
            type: "mcq",
            ministerialYear: "2016 دور ثانٍ"
          },
          {
            id: "u1-ex5",
            question: "We were very (frightened / frightening) when our car broke down in the desert.",
            options: ["frightened", "frightening"],
            correctAnswer: "frightened",
            explanation: "الفاعل (We) عاقل يصف شعوره بالخوف، وجاء بعد القوس أداة (when).",
            type: "mcq",
            ministerialYear: "2020 دور أول"
          }
        ]
      },
      {
        id: "u1-l3",
        unitId: 1,
        lessonNumber: 3,
        titleAr: "الأفعال المركبة (Phrasal Verbs)",
        titleEn: "Phrasal Verbs with Pronouns & Nouns",
        category: "grammar",
        summary: "تركيب الفعل مع حرف الجر (on, off, up, down, away) وموقع المفعول به سواء كان ضميراً أو اسماً.",
        grammarRuleFormula: "Verb + Pronoun (it / them) + Preposition [حالة إلزامية]\nVerb + Preposition + Noun OR Verb + Noun + Preposition [الاسم يقبل الحالتين]",
        detailedContent: [
          "إذا كان المفعول به ضميراً (it أو them)، يجب أن يوضع بين الفعل وحرف الجر حصراً.",
          "إذا كان المفعول به اسماً صريحاً (مثل the light, the music, smoking)، يجوز وضعه في المنتصف أو بعد حرف الجر."
        ],
        teacherNotes: [
          "سؤال وزاري مضمون 100%: يأتيك الفعل وحرف الجر والضمير ويطلب منك (Put in the correct order).",
          "احفظ ترتيب الضمير: (فعل + it/them + حرف الجر). مثال: turn it on / give it up / throw them away."
        ],
        examples: [
          {
            en: "Can you turn the television down? / Can you turn down the television?",
            ar: "هل يمكنك خفض صوت التلفاز؟ (الاسم يقبل الموقعين)",
            highlight: "turn the television down",
            note: "وزاري مكرر"
          },
          {
            en: "Smoking is terrible. You should give it up.",
            ar: "التدخين فظيع، يجب أن تقلع عنه.",
            highlight: "give it up",
            note: "وزاري 2017 دور أول"
          }
        ],
        exercises: [
          {
            id: "u1-ex6",
            question: "I can't remember when I took up it. (Put in the correct order)",
            options: ["took it up", "it took up", "took up it", "up took it"],
            correctAnswer: "took it up",
            explanation: "لأن (it) ضمير مفعول به، فيجب أن يتوسط بين الفعل (took) وحرف الجر (up).",
            type: "mcq",
            ministerialYear: "2019 دور أول"
          },
          {
            id: "u1-ex7",
            question: "These shoes are great. Can I (try on them / try them on)?",
            options: ["try them on", "try on them"],
            correctAnswer: "try them on",
            explanation: "الضمير them يوضع وجوباً في المنتصف قبل حرف الجر on.",
            type: "mcq",
            ministerialYear: "2022 تمهيدي"
          }
        ]
      },
      {
        id: "u1-l4",
        unitId: 1,
        lessonNumber: 4,
        titleAr: "قاعدة (Used to) والمقارنة مع الماضي",
        titleEn: "Used to & Past Habit Comparisons",
        category: "grammar",
        summary: "التعبير عن عادات أو حالات كانت موجودة في الماضي وتغيرت الآن، والمقارنة باستخدام than أو as...as.",
        grammarRuleFormula: "Affirmative: Sub + used to + Base\nNegative: Sub + didn't use to + Base\nQuestion: Did + Sub + use to + Base ?\nComparison 1: Sub + is/are + adj-er / more adj + than it/they used to be\nComparison 2: Sub + is/are not + as [adjective] as it/they used to be",
        detailedContent: [
          "نستخدم used to للتعبير عن شيء كان معتاداً في الماضي ولم يعد موجوداً في الحاضر.",
          "في النفي: didn't use to (حذف حرف d لأن didn't تجرد الفعل).",
          "في صيغة المقارنة: نستخدم (it used to be) للمفرد، و (they used to be) للجمع."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي الذهبية: في السؤال الوزاري عند وجود (but now)، انتبه للفعل بعد (now): إذا كان مضارعاً مع الفاعل المفرد نضع له (s الشخص الثالث)، وإذا كان الفاعل منفياً نضع (doesn't / don't).",
          "في صيغة as...as: يجب أن تكون الصفة مجردة تماماً (as cheap as / as clean as) بدون er وبدون more!"
        ],
        examples: [
          {
            en: "He used to have his hair cut at the barber's, but now his wife cuts it for him.",
            ar: "كان معتاداً أن يحلق شعره عند الحلاق، لكن زوجته تقصه له الآن.",
            highlight: "used to have ... but now cuts",
            note: "وزاري 2015 دور أول"
          },
          {
            en: "Cities are more crowded than they used to be.",
            ar: "المدن أكثر ازدحاماً مما كانت عليه في الماضي.",
            highlight: "more crowded than they used to be",
            note: "وزاري 2017 تمهيدي"
          }
        ],
        exercises: [
          {
            id: "u1-ex8",
            question: "She (not / be) so thin, but she got very ill last year and lost weight.",
            options: ["didn't use to be", "used to not be", "doesn't use to be", "wasn't"],
            correctAnswer: "didn't use to be",
            explanation: "نفي used to يكون بـ didn't use to يتبعها الفعل المجرد be.",
            type: "mcq",
            ministerialYear: "2016 دور أول"
          },
          {
            id: "u1-ex9",
            question: "Life is fast. (Compare using: as ... as)",
            options: [
              "Life isn't as fast as it used to be.",
              "Life is as fast than it used to be.",
              "Life wasn't as fast as they used to be.",
              "Life isn't as faster as it used to be."
            ],
            correctAnswer: "Life isn't as fast as it used to be.",
            explanation: "قاعدة as...as تتطلب النفي بالبداية (isn't) وصفة مجردة (fast) ثم it used to be لأن life غير معدود ومفرد.",
            type: "mcq",
            ministerialYear: "2018 دور ثانٍ"
          }
        ]
      },
      {
        id: "u1-l5",
        unitId: 1,
        lessonNumber: 5,
        titleAr: "القطع الاستيعابية: زيد طارق ومصطفى أحمد",
        titleEn: "Textbook Comprehension: Zaid Tariq & Mustafa Ahmed",
        category: "reading",
        summary: "أسئلة وزارية نموذجية ومتكررة عن قصة سائح العراق زيد طارق في شرم الشيخ، والطفل البطل مصطفى أحمد الذي أنقذ أمه.",
        detailedContent: [
          "زيد طارق (Zaid Tariq): سائح عراقي عمره 20 عاماً، هاجمه سمك القرش وعضه في ذراعه وهو يسبح على فراش هوائي، أنقذه 6 دلافين شكلت طوق حماية، وأسعفه جميل العلوي.",
          "مصطفى أحمد (Mustafa Ahmed): طفل عمره 4 سنوات، والدته لطيفة مصابة بالسكري وفقدت الوعي بسبب انخفاض السكر، اتصل برقم الطوارئ 999 بهدوء وتصرف بذكاء بطولي."
        ],
        teacherNotes: [
          "أسئلة زيد طارق تتكرر دائماً بالسؤال الأول (الفرع A أو B في الدفتر الامتحاني الوزاري).",
          "احفظ الأسئلة التالية نصاً: Why did Zaid scream? What protected Zaid? Who rescued him? Why was Latifa proud of Mustafa?"
        ],
        examples: [
          {
            en: "What saved Zaid Tariq? - Six dolphins protected him and frightened the shark away.",
            ar: "ما الذي حمى زيد طارق؟ ستة دلافين حمته وأخافت القرش بعيداً.",
            note: "وزاري 2014، 2017، 2021"
          },
          {
            en: "Why was Latifa proud of her son Mustafa? - Because he was calm and intelligent and he saved her life.",
            ar: "لماذا كانت لطيفة فخورة بابنها مصطفى؟ لأنه كان هادئاً وذكياً وأنقذ حياتها.",
            note: "وزاري 2015، 2019، 2023"
          }
        ],
        exercises: [
          {
            id: "u1-ex10",
            question: "Zaid Tariq was bitten by: (a dolphin / a shark / sea water)",
            options: ["a shark", "a dolphin", "sea water"],
            correctAnswer: "a shark",
            explanation: "القرش هو الذي عض زيد طارق في ذراعه، بينما الدلافين هي من أنقذته.",
            type: "mcq",
            ministerialYear: "2015 دور أول"
          },
          {
            id: "u1-ex11",
            question: "Mustafa's mother suffered from: (high blood pressure / diabetes / heart attack)",
            options: ["diabetes", "high blood pressure", "heart attack"],
            correctAnswer: "diabetes",
            explanation: "لطيفة تعاني من مرض السكري (diabetes).",
            type: "mcq",
            ministerialYear: "2018 دور أول"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    number: 2,
    titleAr: "الوحدة الثانية: الإلزام والتوقع والأفعال السببية",
    titleEn: "Unit 2: Necessity, Requests, Expectation & Causatives",
    description: "قواعد الإلزام (Must, Have to, Need to)، الطلب المهذب والعرض والاقتراح، التوقع (Should)، والأفعال السببية (Have, Get, Make)، وقطعة الرادار الوزارية.",
    accentColor: "from-emerald-600 to-teal-600",
    bgGradient: "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200",
    lessons: [
      {
        id: "u2-l1",
        unitId: 2,
        lessonNumber: 1,
        titleAr: "الإلزام وعدم الضرورة والمنع (Necessity & Prohibition)",
        titleEn: "Modal Verbs: Must, Have to, Need to, Mustn't",
        category: "grammar",
        summary: "التمييز بين الإلزام القاطع والضرورة (Must / Have to / Need to)، وعدم الضرورة (Don't have to / Needn't)، والمنع الصارم (Mustn't).",
        grammarRuleFormula: "Necessity: must / have to / need to + Base\nNo necessity: don't have to / needn't + Base (بدون to بعد needn't!)\nProhibition: mustn't + Base (ممنوع منعاً باتاً / خطر)",
        detailedContent: [
          "نستخدم (must / have to / need to) عندما يكون الأمر إلزامياً بقانون أو ضرورة ملحة.",
          "نستخدم (mustn't) للتحذير من فعل خطير أو ممنوع قانوناً وعقوبته وخيمة.",
          "نستخدم (don't have to / needn't) عندما يكون الفعل اختيارياً ولا ضرورة للقيام به."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: كلمة (needn't) لا تأخذ أبداً (to) بعدها! نقول: You needn't wash the car.",
          "الكلمات الدالة على mustn't: (dangerous, illegal, against the law, punish, secret)."
        ],
        examples: [
          {
            en: "You are driving too fast! You have to slow down.",
            ar: "أنت تقود بسرعة فائقة! يجب عليك تخفيف السرعة.",
            highlight: "have to slow down",
            note: "ضرورة ملحة"
          },
          {
            en: "You mustn't smoke in a petrol station.",
            ar: "يُمنع التدخين في محطة الوقود.",
            highlight: "mustn't smoke",
            note: "وزاري مكرر لمنع الخطر"
          }
        ],
        exercises: [
          {
            id: "u2-ex1",
            question: "There is petrol in the car, so you (must / needn't / mustn't) go to the petrol station.",
            options: ["needn't", "must", "mustn't"],
            correctAnswer: "needn't",
            explanation: "يوجد بنزين في السيارة، فلا حاجة للذهاب للمحطة (عدم ضرورة اختياري).",
            type: "mcq",
            ministerialYear: "2016 دور أول"
          },
          {
            id: "u2-ex2",
            question: "When you get into a car, you (must / needn't) put on your seat belt.",
            options: ["must", "needn't"],
            correctAnswer: "must",
            explanation: "وضع حزام الأمان إلزام قانوني للسلامة.",
            type: "mcq",
            ministerialYear: "2019 تمهيدي"
          }
        ]
      },
      {
        id: "u2-l2",
        unitId: 2,
        lessonNumber: 2,
        titleAr: "التوقع (Expectation with Should / Shouldn't)",
        titleEn: "Expectation using Should & Shouldn't",
        category: "grammar",
        summary: "التعبير عما تتوقع حدوثه بناءً على معرفتك أو دلائل منطقية.",
        grammarRuleFormula: "I think + [will] => Sub + should + Base\nI don't think + [will] => Sub + shouldn't + Base\nSub + is/are/am => Sub + should be",
        detailedContent: [
          "نحذف (I think) ونعوض عن الفاعل ونضع (should) مكان (will).",
          "نحذف (I don't think) ونضع (shouldn't).",
          "إذا كان الفعل (is / are / am) يتحول مع should إلى المصدر (be)."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: جملة التوقع من أسهل القواعد الوزارية المضمونة!",
          "دائماً احذف (I think / I don't think)، خذ الفاعل الذي بعدهما، وضع should/shouldn't متبوعة بالفعل المجرد."
        ],
        examples: [
          {
            en: "You have studied hard, so you should pass the exam.",
            ar: "لقد درست باجتهاد، لذا أتوقع أن تنجح بالامتحان.",
            highlight: "should pass",
            note: "وزاري 2017 دور أول"
          }
        ],
        exercises: [
          {
            id: "u2-ex3",
            question: "This is a new computer, so I think it is faster than the old one. (Expectation)",
            options: [
              "It should be faster than the old one.",
              "It shouldn't be faster than the old one.",
              "It should is faster than the old one.",
              "I think it should faster."
            ],
            correctAnswer: "It should be faster than the old one.",
            explanation: "تحويل is إلى المصدر be بعد أداة التوقع should.",
            type: "mcq",
            ministerialYear: "2020 دور ثانٍ"
          }
        ]
      },
      {
        id: "u2-l3",
        unitId: 2,
        lessonNumber: 3,
        titleAr: "الأفعال السببية (Have, Get, Make)",
        titleEn: "Causative Verbs: Have, Get & Make",
        category: "grammar",
        summary: "استخدام الأفعال السببية للدلالة على أن شخصاً قام بعمل شيء لك، أو أن سبباً جعل شخصاً يفعل شيئاً.",
        grammarRuleFormula: "Sub + had / got + Object + P.P (التصريف الثالث)\nSub (السبب) + made + Object + Base (فعل مجرد!)",
        detailedContent: [
          "مع (have / get) نستخدم التصريف في الماضي (had / got) ويتبعهما المفعول به ثم التصريف الثالث (P.P).",
          "مع (make) نستخدم (made) ويتبعها مفعول به ثم فعل مجرد تماماً من أي إضافة (Base)."
        ],
        teacherNotes: [
          "الفرق الجوهري الوزاري: had / got يتبعهما تصريف ثالث (P.P)، أما made فيتبعها فعل مجرد خالي من الإضافات!",
          "إذا وجدت (told someone to) استبدلها بـ (made someone + فعل مجرد)."
        ],
        examples: [
          {
            en: "She had her hair cut. / She got her picture taken.",
            ar: "قصت شعرها (قام الحلاق بقصه لها) / التُقطت لها صورة.",
            highlight: "had her hair cut",
            note: "وزاري 2015 دور أول"
          },
          {
            en: "The red signal made him stop.",
            ar: "الإشارة الحمراء جعلته يتوقف (فعل مجرد بعد made).",
            highlight: "made him stop",
            note: "وزاري 2019 دور أول"
          }
        ],
        exercises: [
          {
            id: "u2-ex4",
            question: "My father told me to clean the car. (Rewrite using: made)",
            options: [
              "My father made me clean the car.",
              "My father made me cleaned the car.",
              "My father made me to clean the car.",
              "My father had me clean the car."
            ],
            correctAnswer: "My father made me clean the car.",
            explanation: "بعد made يأتي المفعول به me ثم الفعل مجرد تماماً clean بدون to وبدون ed.",
            type: "mcq",
            ministerialYear: "2018 تمهيدي"
          },
          {
            id: "u2-ex5",
            question: "Somebody stole their television. (They ... / use: had)",
            options: [
              "They had their television stolen.",
              "They had their television steal.",
              "They made their television stolen.",
              "They got their television steal."
            ],
            correctAnswer: "They had their television stolen.",
            explanation: "فاعل (They) + had + مفعول به (their television) + تصريف ثالث (stolen).",
            type: "mcq",
            ministerialYear: "2021 دور أول"
          }
        ]
      },
      {
        id: "u2-l4",
        unitId: 2,
        lessonNumber: 4,
        titleAr: "قطعة الرادار (Radar Security & Speed Gun)",
        titleEn: "Textbook Comprehension: Security Tech - Radar",
        category: "reading",
        summary: "تاريخ اختراع الرادار في الحرب العالمية الثانية، استخدامه لكشف الطائرات والسفن، وكيف تستخدمه الشرطة لضبط السرعة.",
        detailedContent: [
          "اخترع الرادار خلال الحرب العالمية الثانية (WWII) لاكتشاف طائرات وسفن العدو.",
          "تستخدمه الشرطة لكشف السيارات المسرعة (speeders) لحماية الأرواح وتقليل الحوادث.",
          "يعمل الرادار بإرسال موجات راديوية (radio waves) ترتد من السيارة لحساب سرعتها.",
          "يستخدم السائقون أجهزة كاشف الرادار (Radar detector) لتحذيرهم بإصدار صوت بيب (beep)."
        ],
        teacherNotes: [
          "ملاحظة هامة: هل يمكن لصاحب السيارة تجنب مخالفة الرادار إذا كان يقود باتجاهه أو مبتعداً عنه؟ الجواب: كلا، فالرادار يقيس السرعة في الاتجاهين!",
          "تنبيه الصح والخطأ الوزاري: Radar guns can take pictures? نعم بعضها يلتقط صوراً للوحة السيارة."
        ],
        examples: [
          {
            en: "What is a radar detector? It is a machine used by drivers to detect radar speed guns.",
            ar: "ما هو كاشف الرادار؟ جهاز يستخدمه السائقون لكشف مسدسات قياس السرعة.",
            note: "وزاري مكرر"
          }
        ],
        exercises: [
          {
            id: "u2-ex6",
            question: "Radar was invented during: (World War I / World War II / 21st Century)",
            options: ["World War II", "World War I", "21st Century"],
            correctAnswer: "World War II",
            explanation: "اخترع الرادار خلال الحرب العالمية الثانية لكشف طائرات وسفن العدو.",
            type: "mcq",
            ministerialYear: "2016 دور أول"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    number: 3,
    titleAr: "الوحدة الثالثة: جمل الشرط (If Conditionals) والندم والكلام المنقول",
    titleEn: "Unit 3: Conditionals, Regret & Reported Questions",
    description: "حالات If الشرطية الأربعة (Zero, 1st, 2nd, 3rd)، أسلوب الندم (I wish / If only)، والأسئلة المنقولة (Reported Questions).",
    accentColor: "from-amber-600 to-orange-600",
    bgGradient: "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200",
    lessons: [
      {
        id: "u3-l1",
        unitId: 3,
        lessonNumber: 1,
        titleAr: "حالات If الشرطية الأربعة (All 4 Conditionals)",
        titleEn: "Mastering Zero, 1st, 2nd, and 3rd Conditionals",
        category: "grammar",
        summary: "الجدول الذهبي لحالات الشرط الأربعة: الأزمنة، المعاني، والدلالات الوزارية الدقيقة.",
        grammarRuleFormula: "Zero: If + Present Simple , Present Simple (حقائق عامة وثابتة)\nFirst: If + Present Simple , Sub + will/can/may + Base (مستقبل محتمل)\nSecond: If + Past Simple , Sub + would/could/might + Base (افتراض وخيال)\nThird: If + Past Perfect (had + p.p) , Sub + would have + p.p (ندم على الماضي المستحيل)",
        detailedContent: [
          "الحالة الصفرية (Zero): حقائق علمية مثل النباتات والماء، كلا الفعلين مضارع بسيط.",
          "الحالة الأولى (First): احتمالية حقيقية في المستقبل، فعل الشرط مضارع بسيط وجواب الشرط will + مجرد.",
          "الحالة الثانية (Second): خيالية غير واقعية في الحاضر، فعل الشرط ماضي بسيط وجواب الشرط would + مجرد.",
          "الحالة الثالثة (Third): مستحيلة في الماضي، فعل الشرط ماضي تام (had + p.p) وجواب الشرط would have + p.p."
        ],
        teacherNotes: [
          "مفتاح الحل الوزاري للأستاذ مصطفى تركي: انظر دائماً إلى جملة الشرط أو الجواب المكتملة لتعرف رقم الحالة!",
          "إذا وجدت (would + inf) فالحالة ثانية -> ضع ماضي بسيط.",
          "إذا وجدت (would have + p.p) فالحالة ثالثة -> ضع ماضي تام (had + p.p).",
          "في الحالة الثانية: مع الضمير I يفضل استخدام (were) بدلاً من was في سياق النصيحة: If I were you, I would..."
        ],
        examples: [
          {
            en: "If I had had enough money, I would have bought that luxury car.",
            ar: "لو كان لدي مال كافٍ (في الماضي)، لكنت اشتريت تلك السيارة الفارهة (حالة ثالثة).",
            highlight: "had had ... would have bought",
            note: "وزاري 2017 دور أول"
          },
          {
            en: "If I were you, I would apply for that scholarship.",
            ar: "لو كنت مكانك، لتقدمت لتلك المنحة الدراسية (حالة ثانية).",
            highlight: "were you ... would apply",
            note: "وزاري 2019 دور أول"
          }
        ],
        exercises: [
          {
            id: "u3-ex1",
            question: "If she (not get) a scholarship, she won't go to college.",
            options: ["doesn't get", "didn't get", "hadn't got", "won't get"],
            correctAnswer: "doesn't get",
            explanation: "جواب الشرط يحتوي won't (حالة أولى)، وفعل الشرط مضارع بسيط منفي مع المفرد doesn't get.",
            type: "mcq",
            ministerialYear: "2018 دور ثانٍ"
          },
          {
            id: "u3-ex2",
            question: "If I played tennis well, I (join) the sports club.",
            options: ["would join", "will join", "would have joined", "joined"],
            correctAnswer: "would join",
            explanation: "فعل الشرط played ماضي بسيط (حالة ثانية)، فيكون جواب الشرط would + مجرد.",
            type: "mcq",
            ministerialYear: "2020 تمهيدي"
          },
          {
            id: "u3-ex3",
            question: "If we had known about the traffic, we (take) the train.",
            options: ["would have taken", "would take", "will take", "took"],
            correctAnswer: "would have taken",
            explanation: "فعل الشرط had known ماضي تام (حالة ثالثة)، فالجواب would have + taken.",
            type: "mcq",
            ministerialYear: "2022 دور أول"
          }
        ]
      },
      {
        id: "u3-l2",
        unitId: 3,
        lessonNumber: 2,
        titleAr: "الندم (Regret with I wish & If only)",
        titleEn: "Expressing Regret in the Past",
        category: "grammar",
        summary: "التعبير عن الندم على حدث وقع في الماضي باستخدام الماضي التام المنفي أو المثبت بالعكس.",
        grammarRuleFormula: "If only / I wish + Subject + had / hadn't + P.P\nجملة مثبتة في الماضي => استخدم had NOT + P.P\nجملة منفية في الماضي => استخدم HAD + P.P",
        detailedContent: [
          "الندم يعبر عن عكس ما حدث بالماضي: إذا فعلت شيئاً سيئاً تندم وتتمنى لو لم تفعله (hadn't).",
          "إذا لم تفعل شيئاً وتندم على تركه، تتمنى لو فعلته (had).",
          "نحذف جمل النتيجة (that's why, so, unfortunately) ونطبق القاعدة على جملة السبب فقط."
        ],
        teacherNotes: [
          "الملاحظة الذهبية: جملة الندم دائماً عكس إثبات ونفي الجملة الأصلية!",
          "احذف كلمة (Unfortunately) وما بعدها فوراً من الحسابات وركز على الفعل الأساسي."
        ],
        examples: [
          {
            en: "Unfortunately, I ate three bars of chocolate. -> If only I hadn't eaten three bars of chocolate.",
            ar: "للأسف أكلت 3 قطع شوكولاتة -> ليتني لم آكلها.",
            highlight: "hadn't eaten",
            note: "وزاري 2015 دور أول"
          }
        ],
        exercises: [
          {
            id: "u3-ex4",
            question: "You drank too much coffee. Now you can't sleep. (Regret using: I wish)",
            options: [
              "I wish I hadn't drunk so much coffee.",
              "I wish I had drunk so much coffee.",
              "I wish I didn't drink coffee.",
              "I wish I drunk coffee."
            ],
            correctAnswer: "I wish I hadn't drunk so much coffee.",
            explanation: "الجملة الأصلية مثبتة (drank)، فالندم يكون بالماضي التام المنفي (hadn't drunk).",
            type: "mcq",
            ministerialYear: "2016 دور أول"
          }
        ]
      },
      {
        id: "u3-l3",
        unitId: 3,
        lessonNumber: 3,
        titleAr: "السؤال المنقول (Reported Questions)",
        titleEn: "Reported Speech: Reporting Questions",
        category: "grammar",
        summary: "نقل الأسئلة المباشرة إلى كلام منقول مع تحويل صيغة الاستفهام إلى جملة خبرية وتغيير الأزمنة والضمائر.",
        grammarRuleFormula: "Wh-question: Sub + asked + [Object] + Wh-word + Sub + Backshifted Verb\nYes/No-question: Sub + asked + [Object] + if/whether + Sub + Backshifted Verb",
        detailedContent: [
          "نبدأ بعبارة السؤال مثل (He asked me / She asked Ali).",
          "إذا بدأ السؤال بأداة استفهام (What, Where, How...) ننزل الأداة كما هي.",
          "إذا بدأ السؤال بفعل مساعد (Do, Is, Can, Have...) نضع (if).",
          "نحول الجملة من صيغة سؤال إلى صيغة خبرية: نضع الفاعل أولاً ثم نرجع زمن الفعل خطوة إلى الماضي."
        ],
        teacherNotes: [
          "احذر من الفخ الأكبر: تحويل do/does و did!",
          "إذا وجدت (do / does) احذفهما وحول الفعل الرئيسي لماضي بسيط.",
          "إذا وجدت (did) احذفها وحول الفعل لماضي تام (had + p.p)."
        ],
        examples: [
          {
            en: "'Where did you lose your purse?' He asked me. -> He asked me where I had lost my purse.",
            ar: "سألني أين فقدت محفظتي.",
            highlight: "where I had lost",
            note: "وزاري 2017 دور أول"
          }
        ],
        exercises: [
          {
            id: "u3-ex5",
            question: "'Can you fly a plane?' The officer asked him. (Report the question)",
            options: [
              "The officer asked him if he could fly a plane.",
              "The officer asked him if could he fly a plane.",
              "The officer asked him could he fly a plane.",
              "The officer asked him if he can fly a plane."
            ],
            correctAnswer: "The officer asked him if he could fly a plane.",
            explanation: "سؤال نعم/لا نضع if ثم الفاعل he ثم تحويل can إلى could.",
            type: "mcq",
            ministerialYear: "2019 دور أول"
          }
        ]
      }
    ]
  },
  {
    id: 4,
    number: 4,
    titleAr: "الوحدة الرابعة: المقارنة والمهارة والتواصل اليومي",
    titleEn: "Unit 4: Comparisons, Abilities & Everyday Communication",
    description: "قواعد المقارنة والمفاضلة، القدرة والمهارة، والمهارات اللغوية في التواصل اليومي مع أسئلة وزارية وتمارين تطبيقية.",
    accentColor: "from-sky-600 to-cyan-600",
    bgGradient: "bg-gradient-to-r from-sky-50 to-cyan-50 border-sky-200",
    lessons: [
      {
        id: "u4-l1",
        unitId: 4,
        lessonNumber: 1,
        titleAr: "المقارنة (Comparatives)",
        titleEn: "Comparatives and Short Adjectives",
        category: "grammar",
        summary: "التمييز بين المقارنة البسيطة والمتساوية والمفضلة في السياقات اليومية والوزارية.",
        grammarRuleFormula: "Short adjective + er + than\nMore + long adjective + than\nAs + adjective + as",
        detailedContent: [
          "نستخدم الصيغة (adj-er + than) مع الصفات القصيرة مثل: fast, cheap, small, old.",
          "نستخدم (more + adjective + than) مع الصفات الطويلة مثل: expensive, dangerous, beautiful.",
          "للتعبير عن التساوي نستخدم (as + adjective + as).",
          "الفرق بين (older) و (elder) مهم في بعض السياقات: elder يستخدم للأشخاص فقط، أما older فيستخدم للعمر العام." 
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: إذا كانت الصفة قصيرة ومكونة من حرفين أو ثلاثة أحرف، فغالباً نضيف er مباشرة.",
          "احذر من خطأ (more faster): لا نستطيع جمع more مع er، فعندها نختار الصفة الأساسية فقط." 
        ],
        examples: [
          {
            en: "This book is more interesting than that one.",
            ar: "هذا الكتاب أكثر إثارة من ذلك الكتاب.",
            highlight: "more interesting than",
            note: "وزاري 2019"
          },
          {
            en: "My brother is older than me.",
            ar: "أخي أكبر سناً مني.",
            highlight: "older than",
            note: "مكرر"
          }
        ],
        exercises: [
          {
            id: "u4-ex1",
            question: "This bag is (cheap / cheaper) than the other one.",
            options: ["cheaper", "cheaply", "more cheap", "cheapest"],
            correctAnswer: "cheaper",
            explanation: "الصفة قصيرة (cheap) نضيف er لتكوين المقارنة، لذلك الجملة الصحيحة هي cheaper.",
            type: "mcq",
            ministerialYear: "2018 دور أول"
          },
          {
            id: "u4-ex2",
            question: "My city is not as (clean / cleaner) as your city.",
            options: ["clean", "cleaner", "more clean", "cleanest"],
            correctAnswer: "clean",
            explanation: "في تركيب as + adjective + as نستخدم الصفة الأصلية دون er أو more.",
            type: "mcq",
            ministerialYear: "2021 تمهيدي"
          }
        ]
      },
      {
        id: "u4-l2",
        unitId: 4,
        lessonNumber: 2,
        titleAr: "التفضيل (Superlatives)",
        titleEn: "Superlatives and Relative Comparisons",
        category: "grammar",
        summary: "تكوين أعظم أو أقوى أو أكثر شيء في مجموعة مجموعة من الأشياء، مع استخدام the ومقارنة النسبية.",
        grammarRuleFormula: "the + adj-est\nthe most + adjective",
        detailedContent: [
          "مع الصفات القصيرة نستخدم (the + adjective + est) مثل: the tallest, the smallest.",
          "مع الصفات الطويلة نستخدم (the most + adjective) مثل: the most expensive, the most useful.",
          "تُستعمل صيغة التفضيل عندما نقارن شيئاً بشيء أو أكثر من مجموعة واحدة.",
          "يمكن أيضاً استخدام (one of the + superlative + plural noun) في أسئلة الكتاب الوزاري." 
        ],
        teacherNotes: [
          "إذا كان الاسم المتحدّث عنه محلّفاً أو جمعاً وتوجد في الجملة كلمة of the group فغالباً نختار superlative.",
          "احذر من استخدام the + more + adjective + est: هذا خطأ شائع في المقارنات." 
        ],
        examples: [
          {
            en: "Salma is the tallest girl in the class.",
            ar: "سلمى أطول فتاة في الصف.",
            highlight: "the tallest",
            note: "وزاري 2017"
          },
          {
            en: "The Sahara is one of the hottest deserts in the world.",
            ar: "الصحراء الكبرى واحدة من أكثر الصحاري حرارة في العالم.",
            highlight: "the hottest",
            note: "مكرر"
          }
        ],
        exercises: [
          {
            id: "u4-ex3",
            question: "Ahmad is the (good / better / best) student in our class.",
            options: ["best", "better", "good", "more good"],
            correctAnswer: "best",
            explanation: "عندما نحتاج إلى التفضيل بين شخص ومجموعة كاملة، نستخدم the best.",
            type: "mcq",
            ministerialYear: "2017 دور أول"
          },
          {
            id: "u4-ex4",
            question: "This is the (most / more) expensive phone in the market.",
            options: ["most", "more", "expensiver", "expensive"],
            correctAnswer: "most",
            explanation: "الصفة long (expensive) تحتاج إلى the most في صيغة التفضيل.",
            type: "mcq",
            ministerialYear: "2020 دور ثانٍ"
          }
        ]
      },
      {
        id: "u4-l3",
        unitId: 4,
        lessonNumber: 3,
        titleAr: "القدرة والمهارة (can, could, be able to)",
        titleEn: "Ability, Skill & Permission in the Present and Past",
        category: "grammar",
        summary: "التعبير عن القدرة في الحاضر والماضي والقدرة السابقة واللاحقة مع أدوات المودال والعبارة (be able to).",
        grammarRuleFormula: "can / could + Base\nbe able to + Base",
        detailedContent: [
          "نستخدم can للتعبير عن القدرة في الحاضر أو الوقت الحالي.",
          "نستخدم could للتعبير عن القدرة في الماضي أو الحالة المخططة غير المؤكدة.",
          "عندما لا يتوفر can/could في زمن معين نستخدم be able to مع الشكل المناسب.",
          "يمكن أيضاً استخدام can للتعبير عن الاستئذان أو الإذن في الجمل المختصرة." 
        ],
        teacherNotes: [
          "إذا كان الموضوع يدور حول مهارة مكتسبة في الماضي، فغالباً الإجابة هي could أو was/were able to.",
          "لا تقول: I can to swim. الجملة الصحيحة: I can swim أو I am able to swim." 
        ],
        examples: [
          {
            en: "I can speak English quite well.",
            ar: "أستطيع التحدث باللغة الإنجليزية جيداً.",
            highlight: "can speak",
            note: "حاضر"
          },
          {
            en: "When I was younger, I could run very fast.",
            ar: "عندما كنت أصغر سناً، كنت أستطيع الركض بسرعة كبيرة.",
            highlight: "could run",
            note: "ماضي"
          }
        ],
        exercises: [
          {
            id: "u4-ex5",
            question: "My grandfather (can / could) walk for miles when he was young.",
            options: ["could", "can", "is able", "must"],
            correctAnswer: "could",
            explanation: "الماضي يطلب could لأن الحدث حدث في الوقت السابق، لذلك الجملة الصحيحة هي could walk.",
            type: "mcq",
            ministerialYear: "2016 دور أول"
          },
          {
            id: "u4-ex6",
            question: "I (am able to / can) solve this problem now.",
            options: ["am able to", "can to", "could", "must"],
            correctAnswer: "am able to",
            explanation: "في الحاضر يمكن استخدام be able to، ولهذا الجواب صحيح في السياق الحالي.",
            type: "mcq",
            ministerialYear: "2022 تمهيدي"
          }
        ]
      },
      {
        id: "u4-l4",
        unitId: 4,
        lessonNumber: 4,
        titleAr: "المحادثة اليومية ومهارات القراءة",
        titleEn: "Daily Conversation & Reading Comprehension",
        category: "reading",
        summary: "أدوات الحوار اليومية، أسئلة التمييز، والتعرف على المعلومات الأساسية من نص قصير وزاري.",
        grammarRuleFormula: "Question words + be / do / can + subject + verb?\nMain idea + supporting detail + inference",
        detailedContent: [
          "في الحوار اليومي نستخدم questions about hobbies, travel, family, and daily routine.",
          "المعلومة الأساسية في القطعة تنقسم إلى فكرة رئيسية وتفاصيل داعمة، ويفهم السؤال عادة من الكلمة الرئيسية في الفقرة.",
          "أسئلة القراءة الوزارية تركز على فهم السبب، النتيجة، والسبب في الاستخدام المناسب لاسم أو فعل.",
          "من المهم تحديد الفكرة العامة قبل اختيار الإجابة الصحيحة، ثم التحقق من التفاصيل المساندة." 
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: أسئلة القراءة لا تحل بالتخمين، وإنما بالنظر إلى الكلمات المفتاحية في الجملة وأثرها على الفكرة العامة.",
          "إذا وجدت كلمة (because, so, therefore, as a result) فهذه إشارة قوية إلى سبب ونتيجة." 
        ],
        examples: [
          {
            en: "Why is travelling useful? Because it helps people learn about other cultures.",
            ar: "لماذا السفر مفيد؟ لأنه يساعد الناس على معرفة الثقافات الأخرى.",
            highlight: "Because it helps",
            note: "قراءة قصيرة"
          },
          {
            en: "I enjoy reading because it improves my vocabulary.",
            ar: "أنا أستمتع بالقراءة لأن ذلك يحسن مفرداتي.",
            highlight: "because it improves",
            note: "حوار يومي"
          }
        ],
        exercises: [
          {
            id: "u4-ex7",
            question: "Which sentence is correct for a daily conversation about hobbies?",
            options: [
              "I enjoy swimming because it keeps me fit.",
              "I enjoy swimming because it seen me fit.",
              "I am enjoy swimming because it keeps me fit.",
              "I enjoy to swim because it keeps me fit."
            ],
            correctAnswer: "I enjoy swimming because it keeps me fit.",
            explanation: "بعد enjoy يأتي الفعل المجرد swimming، وجملة السبب تدعم السبب المنطقي.",
            type: "mcq",
            ministerialYear: "2019 دور أول"
          },
          {
            id: "u4-ex8",
            question: "The main idea of a short reading text is usually: ",
            options: [
              "The general message of the paragraph.",
              "The exact last sentence only.",
              "The longest word in the text.",
              "The number of paragraphs."
            ],
            correctAnswer: "The general message of the paragraph.",
            explanation: "الفكرة العامة هي الرسالة الكبرى التي يركز عليها النص، وليس مجرد كلمة أو جملة واحدة فقط.",
            type: "mcq",
            ministerialYear: "2021 دور أول"
          }
        ]
      }
    ]
  },
  {
    id: 5,
    number: 5,
    titleAr: "الوحدة الخامسة: المضارع التام وعبارات الوصل",
    titleEn: "Unit 5: Present Perfect & Relative Clauses",
    description: "المضارع التام البسيط والمستمر، الأدوات (since, for, already, yet, ever, never)، وضمائر الوصل (who, which, that, where, whose).",
    accentColor: "from-purple-600 to-violet-600",
    bgGradient: "bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200",
    lessons: [
      {
        id: "u5-l1",
        unitId: 5,
        lessonNumber: 1,
        titleAr: "المضارع التام البسيط وأدواته (Present Perfect Simple)",
        titleEn: "Present Perfect Simple with Just, Already, Yet, Ever & Never",
        category: "grammar",
        summary: "الربط بين حدث في الماضي وله أثر أو نتيجة في الحاضر، واستخدام الكلمات الدالة.",
        grammarRuleFormula: "Sub + have/has + P.P\nEver: في السؤال فقط (Have you ever ...?)\nNever: في الإثبات لتعطي معنى النفي القطعي\nYet: في نهاية الجملة المنفية والاستفهام\nJust / Already: بين الفعل المساعد والتصريف الثالث",
        detailedContent: [
          "نستخدم ever للسؤال عن الخبرة الحياتية حتى الآن.",
          "نستخدم yet حصراً مع الجمل المنفية أو الأسئلة وتأتي دائماً في نهاية الجملة.",
          "الفرق بين have gone و have been: (gone) ذهب ولم يعد بعد، أما (been) ذهب وعاد أو لم يذهب أبداً."
        ],
        teacherNotes: [
          "تنبيه وزاري مصطفى تركي: الفرق بين (Since) و (For):",
          "Since: تأتي مع نقطة بداية محددة بالاسم (since 2010, since yesterday, since 3 o'clock, since October, since I was born).",
          "For: تأتي مع مدة زمنية مجمعة تحتوي رقماً أو كلمة بها s الجمع أو a/an (for 3 hours, for 5 years, for a long time)."
        ],
        examples: [
          {
            en: "Have you ever camped in the desert?",
            ar: "هل خيمت في الصحراء في حياتك؟",
            highlight: "Have you ever camped",
            note: "وزاري 2016 دور أول"
          },
          {
            en: "She hasn't finished her homework yet.",
            ar: "هي لم تكمل واجبها حتى الآن.",
            highlight: "hasn't finished ... yet",
            note: "وزاري 2018 دور ثانٍ"
          }
        ],
        exercises: [
          {
            id: "u5-ex1",
            question: "I haven't seen her (since / for) 2015.",
            options: ["since", "for"],
            correctAnswer: "since",
            explanation: "2015 سنة محددة تبدأ بها الفترة الزمنية فنختار since.",
            type: "mcq",
            ministerialYear: "2017 تمهيدي"
          },
          {
            id: "u5-ex2",
            question: "They have lived here (since / for) ten years.",
            options: ["for", "since"],
            correctAnswer: "for",
            explanation: "عشر سنوات مدة زمنية مجمعة معدودة فنختار for.",
            type: "mcq",
            ministerialYear: "2019 دور أول"
          }
        ]
      },
      {
        id: "u5-l2",
        unitId: 5,
        lessonNumber: 2,
        titleAr: "عبارات الوصل (Relative Clauses)",
        titleEn: "Defining & Non-Defining Relative Clauses",
        category: "grammar",
        summary: "ربط جملتين وتحديد الاسم باستخدام ضمائر الوصل: who, which/that, where, whose.",
        grammarRuleFormula: "Person + WHO + verb / pronoun\nThing + WHICH / THAT + verb / pronoun\nPlace + WHERE + noun / pronoun (بدون حرف جر!)\nPossession: Noun + WHOSE + noun (ملكية اسم لاسم)",
        detailedContent: [
          "who: تستخدم للعاقل.",
          "which / that: تستخدم لغير العاقل.",
          "where: تستخدم للمكان (بشرط ألا يتبعه فعل مباشرة ودون وجود حرف جر مكان مثل in/at في نهاية العبارة).",
          "whose: تستخدم للملكية بين اسمين."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انظر للكلمة قبل القوس وبعد القوس:",
          "اسم عاقل + (قوس) + فعل => نختار (who).",
          "اسم + (قوس) + اسم ممتلك (car, son, dog, house) => نختار (whose).",
          "اسم مكان + (قوس) + فعل => نختار (which) وليس where!"
        ],
        examples: [
          {
            en: "The engineer who designed the bridge is very famous.",
            ar: "المهندس الذي صمم الجسر مشهور جداً.",
            highlight: "engineer who designed",
            note: "وزاري 2016"
          },
          {
            en: "Babylon City, where tourists love to visit, is a historic place.",
            ar: "مدينة بابل حيث يحب السياح زيارتها مكان تاريخي.",
            highlight: "Babylon City, where",
            note: "وزاري 2018"
          }
        ],
        exercises: [
          {
            id: "u5-ex3",
            question: "Fatima, (who / whose) photo was in the newspaper, is a talented artist.",
            options: ["whose", "who", "which", "where"],
            correctAnswer: "whose",
            explanation: "قبل القوس اسم شخص (Fatima) وبعد القوس اسم ممتلك (photo صورتها) فتكون ملكية whose.",
            type: "mcq",
            ministerialYear: "2018 دور أول"
          }
        ]
      }
    ]
  },
  {
    id: 6,
    number: 6,
    titleAr: "الوحدة السادسة: المبني للمجهول والعمليات المصرفية",
    titleEn: "Unit 6: Passive Voice & Banking Terminology",
    description: "تحويل الجمل إلى المبني للمجهول في جميع الأزمنة الوزارية، ومصطلحات الحسابات والمصارف وشيكات الائتمان.",
    accentColor: "from-rose-600 to-pink-600",
    bgGradient: "bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200",
    lessons: [
      {
        id: "u6-l1",
        unitId: 6,
        lessonNumber: 1,
        titleAr: "قواعد المبني للمجهول في كافة الأزمنة (Passive Voice)",
        titleEn: "Complete Ministerial Passive Voice Rules",
        category: "grammar",
        summary: "خطوات التحويل الذهبية للمبني للمجهول وكيفية صياغة الفعل المساعد والتصريف الثالث.",
        grammarRuleFormula: "Step 1: حذف الفاعل وتقديم المفعول به في بداية الجملة\nStep 2: وضع فعل الكينونة المناسب للزمن (is/are, was/were, is/are being, was/were being, have/has been, will be)\nStep 3: تحويل الفعل الرئيسي إلى التصريف الثالث P.P",
        detailedContent: [
          "المضارع البسيط: Object + is/are + P.P",
          "الماضي البسيط: Object + was/were + P.P",
          "المضارع المستمر: Object + is/are + being + P.P",
          "الماضي المستمر: Object + was/were + being + P.P",
          "المضارع التام: Object + has/have + been + P.P",
          "المستقبل والمودال: Object + will / can / must + be + P.P"
        ],
        teacherNotes: [
          "ملاحظة مصطفى تركي: دائماً انتبه لجمع ومفرد المفعول به الجديد! إذا كان المفعول جمعاً (The cars) يأخذ were / are حتى لو كان الفاعل القديم مفرداً.",
          "في الأزمنة المستمرة نستخدم كلمة (being)، وفي التامة نستخدم كلمة (been)."
        ],
        examples: [
          {
            en: "Somebody is repairing the car. -> The car is being repaired.",
            ar: "شخص ما يصلح السيارة -> السيارة يتم تصليحها الآن.",
            highlight: "is being repaired",
            note: "مضارع مستمر مبني للمجهول"
          },
          {
            en: "They stole the money yesterday. -> The money was stolen yesterday.",
            ar: "المال سرق بالأمس (money غير معدود يأخذ was).",
            highlight: "was stolen",
            note: "وزاري 2017 دور أول"
          }
        ],
        exercises: [
          {
            id: "u6-ex1",
            question: "Somebody stole my wallet last week. (Change into passive)",
            options: [
              "My wallet was stolen last week.",
              "My wallet were stolen last week.",
              "My wallet is stolen last week.",
              "My wallet was steal last week."
            ],
            correctAnswer: "My wallet was stolen last week.",
            explanation: "الماضي البسيط مع المفعول المفرد (wallet) يأخذ was + stolen.",
            type: "mcq",
            ministerialYear: "2015 دور أول"
          },
          {
            id: "u6-ex2",
            question: "The bank will notify you tomorrow. (Passive)",
            options: [
              "You will be notified tomorrow.",
              "You will notified tomorrow.",
              "You will being notified tomorrow.",
              "You are notified tomorrow."
            ],
            correctAnswer: "You will be notified tomorrow.",
            explanation: "مع will نضع be ثم التصريف الثالث notified.",
            type: "mcq",
            ministerialYear: "2020 دور أول"
          }
        ]
      }
    ]
  },
  {
    id: 7,
    number: 7,
    titleAr: "الوحدة السابعة: صيغ المستقبل والمستقبل في الماضي",
    titleEn: "Unit 7: Future Forms & Future in the Past",
    description: "صيغ التعبير عن المستقبل الخمسة (will, going to, present continuous, present simple, future continuous)، وقاعدة المستقبل في الماضي.",
    accentColor: "from-cyan-600 to-blue-600",
    bgGradient: "bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200",
    lessons: [
      {
        id: "u7-l1",
        unitId: 7,
        lessonNumber: 1,
        titleAr: "صيغ المستقبل الخمسة (5 Future Forms)",
        titleEn: "Predicting, Planning, Scheduling & Fixed Arrangements",
        category: "grammar",
        summary: "التمييز الدقيق بين صيغ المستقبل وفق دلالات السياق الوزاري.",
        grammarRuleFormula: "1. Timetables (مواعيد الجداول الثابتة قطارات وبداية الدروس): Present Simple (starts, arrives)\n2. Plans/Intentions (خطط ونوايا مسبقة): am/is/are going to + Base\n3. Fixed Arrangements (مواعيد محددة مع أشخاص): Present Continuous (am/is/are + v-ing)\n4. Predictions / Hopes (توقعات مع I think / promise): will + Base\n5. Specific Time in future (وقت محدد مستمر): will be + v-ing",
        detailedContent: [
          "الجداول الرسمية (The term, The class, The plane) تأخذ مضارعاً بسيطاً مع s الشخص الثالث.",
          "النية الشخصية والقرار المسبق نستخدم له (going to).",
          "المواعيد المرتبة مع أشخاص آخرين نستخدم لها المضارع المستمر (meeting, leaving)."
        ],
        teacherNotes: [
          "ملاحظة مصطفى تركي: إذا كانت الجملة عن موعد دورة أو درس (course, lesson, term) اختر المضارع البسيط فوراً!",
          "المستقبل في الماضي (Future in the past) بسيط جداً: فقط حول الفعل المساعد إلى ماضيه (is/are -> was/were, will -> would, can -> could)."
        ],
        examples: [
          {
            en: "The match starts at 7:00 pm. (Timetable)",
            ar: "المباراة تبدأ في السابعة مساءً (جدول ثابت).",
            highlight: "starts",
            note: "وزاري مكرر"
          },
          {
            en: "I know he will pass. -> I knew he would pass. (Future in the past)",
            ar: "عرفت أنه سينجح (مستقبل في الماضي).",
            highlight: "would pass",
            note: "وزاري 2018 دور أول"
          }
        ],
        exercises: [
          {
            id: "u7-ex1",
            question: "The English course (starts / is starting) in October.",
            options: ["starts", "is starting"],
            correctAnswer: "starts",
            explanation: "بداية الدورات جدول رسمي ثابت (Timetable) فيأخذ المضارع البسيط starts.",
            type: "mcq",
            ministerialYear: "2019 تمهيدي"
          },
          {
            id: "u7-ex2",
            question: "I am going to learn Chinese. (Put into Future in the Past)",
            options: [
              "I was going to learn Chinese.",
              "I would learn Chinese.",
              "I had been going to learn Chinese.",
              "I am learned Chinese."
            ],
            correctAnswer: "I was going to learn Chinese.",
            explanation: "في المستقبل بالماضي نحول الفعل المساعد am إلى was فقط وتبقى باقي الجملة كما هي.",
            type: "mcq",
            ministerialYear: "2021 دور أول"
          }
        ]
      }
    ]
  },
  {
    id: 8,
    number: 8,
    titleAr: "الوحدة الثامنة: الموارد الطبيعية والطاقة المتجددة",
    titleEn: "Unit 8: Renewable Energy & Resource Conservation",
    description: "المصادر المتجددة (الرياح، الشمس، الوقود الحيوي)، مفردات الحفاظ على البيئة، وأسئلة وزارية للمراجعة النهائية.",
    accentColor: "from-lime-600 to-green-600",
    bgGradient: "bg-gradient-to-r from-lime-50 to-green-50 border-lime-200",
    lessons: [
      {
        id: "u8-l1",
        unitId: 8,
        lessonNumber: 1,
        titleAr: "المصادر المتجددة وحماية البيئة",
        titleEn: "Renewable vs Non-Renewable Energy",
        category: "vocabulary",
        summary: "المقارنة بين المصادر المستدامة (solar, wind, hydroelectric) والمصادر النافذة الملوثة (fossil fuels, oil).",
        detailedContent: [
          "الموارد المتجددة (Renewable resources): لا تنفد ولا تسبب تلوثاً كارثياً للغلاف الجوي.",
          "الوقود الحيوي (Biofuel): وقود يستخرج من الكائنات الحية والزيوت النباتية بدلاً من البترول.",
          "الحفاظ على المياه والغابات واجب عالمي لتقليل الاحتباس الحراري (Global warming)."
        ],
        teacherNotes: [
          "أسئلة الوحدة الثامنة تركز بالدرجة الأولى على الإسقاطات والتوصيل (Matching & Drop-in words) والإملاء في السؤال الثالث من الامتحان الوزاري."
        ],
        examples: [
          {
            en: "Wind energy is renewable because it will never run out.",
            ar: "طاقة الرياح متجددة لأنها لن تنفد أبداً.",
            highlight: "renewable",
            note: "وزاري 2017"
          }
        ],
        exercises: [
          {
            id: "u8-ex1",
            question: "Energy from the sun is called: (Solar energy / Nuclear energy / Coal)",
            options: ["Solar energy", "Nuclear energy", "Coal"],
            correctAnswer: "Solar energy",
            explanation: "الطاقة الشمسية هي المستمدة مباشرة من أشعة الشمس.",
            type: "mcq",
            ministerialYear: "2018 دور أول"
          }
        ]
      }
    ]
  }
];
