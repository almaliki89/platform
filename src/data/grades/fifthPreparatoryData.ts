import { Unit, LiteratureItem, EssayItem, MinisterialExamQuestion } from '../../types';
import { MockExamPaper } from '../mockExamPapers';

// =========================================================================
// وحدات الخامس الإعدادي - منهج English for Iraq (5th Preparatory)
// =========================================================================
export const FIFTH_PREPARATORY_UNITS: Unit[] = [
  {
    id: 51,
    number: 1,
    titleAr: "الوحدة الأولى: رمضان في العراق والصفات (Ramadan in Iraq & Adjectives)",
    titleEn: "Unit 1: Ramadan in Iraq, Dynamic Verbs & -ed/-ing Adjectives",
    description: "الأفعال الحركية وأفعال الحالة، الصفات المنتهية بـ -ed و -ing، والأسماء المركبة وتقاليد شهر رمضان في العراق.",
    accentColor: "from-fuchsia-600 to-pink-600",
    bgGradient: "bg-gradient-to-r from-fuchsia-50 to-pink-50 border-fuchsia-200",
    lessons: [
      {
        id: "5th-u1-l1",
        unitId: 51,
        lessonNumber: 1,
        titleAr: "الدرس الأول: الصفات المنتهية بـ (-ed) والصفات المنتهية بـ (-ing)",
        titleEn: "Lesson 1: Adjectives Ending in (-ed) vs (-ing)",
        category: "grammar",
        summary: "التمييز الدقيق بين الصفة التي تصف شعور وإحساس الشخص (-ed) والصفة التي تصف مسبب الشعور أو الشيء (-ing).",
        grammarRuleFormula: "-ed Adjectives: تصف شعور وإحساس الشخص الداخلي (كيف يشعر الشخص)\n(e.g., I was very excited / frightened / bored)\n\n-ing Adjectives: تصف الشيء أو الشخص الذي يسبب ذلك الشعور (مصدر الإثارة أو الملل)\n(e.g., It was an exciting match / a boring movie / a frightening experience)",
        detailedContent: [
          "تنتهي الصفة بـ (ed) عندما نتحدث عن شعور الكائن الحي (إنسان أو حيوان): He was frightened when he saw the spider.",
          "تنتهي الصفة بـ (ing) عندما تصف الاسم الذي يسبب هذا الشعور: That horror film was very frightening.",
          "انتبه: إذا كان بعد الفراغ اسم موصوف مباشرة نختار غالباً صفة الـ ing: It was an interesting book.",
          "هذه القاعدة تتكرر في الامتحان الوزاري للبكالوريا أيضاً."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انظر بعد الفراغ: إذا وجدت اسماً موصوفاً (movie, day, person, match) اختر (-ing) فوراً! إذا لم تجد اسماً، وكان الفاعل عاقلاً يشعر بالشيء فاختر (-ed)."
        ],
        commonMistakes: [
          "قول I am very boring (معناها أنا شخص ممل ومزعج، بينما الصحيح I am bored أي أشعر بالملل).",
          "اختيار ed مع جماد مثل: The match was excited (الصحيح exciting)."
        ],
        examples: [
          {
            en: "We were very tired after walking all day.",
            ar: "كنا متعبين جداً بعد المشي طوال اليوم (شعور داخلي).",
            highlight: "tired",
            note: "صفة شعور تنتهي بـ ed"
          },
          {
            en: "This documentary is so interesting; you should watch it.",
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
      }
    ]
  },
  {
    id: 52,
    number: 2,
    titleAr: "الوحدة الثانية: النصيحة القوية والحالة الشرطية الثانية (Second Conditional)",
    titleEn: "Unit 2: Second Conditional & Strong Advice",
    description: "إعطاء النصائح القوية (had better / should / ought to)، والحالة الشرطية الثانية للمواقف الخيالية غير الواقعية (Second Conditional).",
    accentColor: "from-rose-600 to-pink-600",
    bgGradient: "bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200",
    lessons: [
      {
        id: "5th-u2-l1",
        unitId: 52,
        lessonNumber: 1,
        titleAr: "الدرس الأول: الحالة الشرطية الثانية (Second Conditional)",
        titleEn: "Lesson 1: Second Conditional (Unreal Present / Future)",
        category: "grammar",
        summary: "التعبير عن مواقف خيالية أو افتراضية غير واقعية في الحاضر أو المستقبل.",
        grammarRuleFormula: "If + Subject + Past Simple, Subject + would / could / might + base verb\n(e.g., If I had a million dollars, I would travel around the world)",
        detailedContent: [
          "تستخدم الحالة الشرطية الثانية لمواقف خيالية وافتراضية غير متحققة في الواقع الآن.",
          "جملة فعل الشرط (بعد If) تأتي في زمن الماضي البسيط (Past Simple: had, played, were).",
          "جملة جواب الشرط تأتي بـ would / could / might + مصدر مجرد.",
          "قاعدة خاصة مع الضمير I: نفضل استخدام were بدلاً من was للنصيحة والتخيل: If I were you, I would study harder."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: تذكر صيغة النصيحة الخيالية المشهورة في الخامس والسادس الإعدادي: If I were you, I would...",
          "إذا كان فعل الشرط had، فجواب الشرط يكون would + مصدر وليس would have!"
        ],
        commonMistakes: [
          "وضع would في جملة If: If I would have money (خطأ؛ would تأتي في جواب الشرط فقط).",
          "خلط الحالة الثانية بالثالثة."
        ],
        examples: [
          {
            en: "If he studied regularly, he would pass all his exams with distinction.",
            ar: "لو كان يدرس بانتظام (افتراض)، لاجتاز جميع امتحاناته بتفوق.",
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
          }
        ]
      }
    ]
  },
  {
    id: 53,
    number: 3,
    titleAr: "الوحدة الثالثة: الحالة الشرطية الثالثة والتعبير عن الندم (Third Conditional & Regrets)",
    titleEn: "Unit 3: Third Conditional & Expressing Regrets",
    description: "الحالة الشرطية الثالثة لأحداث الماضي المستحيل تغييرها، والتعبير عن الندم باستخدام I wish / If only.",
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
        summary: "التعبير عن أحداث ماضية لم تقع ولا يمكن تغييرها (مستحيلة في الماضي).",
        grammarRuleFormula: "If + Subject + Past Perfect (had + P.P.), Subject + would have + P.P.\n(e.g., If you had driven carefully, you wouldn't have had that accident)",
        detailedContent: [
          "تستخدم للحديث عن أحداث مستحيلة في الماضي والندم على ما حدث.",
          "فعل الشرط: ماضٍ تام (had / hadn't + التصريف الثالث P.P.).",
          "جواب الشرط: would have / could have / might have + التصريف الثالث P.P.",
          "مثال: If I had known about your arrival, I would have met you at Baghdad airport."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: توازن الأزمنة في الحالة الثالثة: had + P.P. في البداية يقابلها would have + P.P. في النهاية!"
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
        grammarRuleFormula: "I wish / If only + Subject + had / hadn't + Past Participle (P.P.)\n(e.g., I ate too much sweets and got sick -> I wish I hadn't eaten so much sweets)",
        detailedContent: [
          "للندم على شيء فعلته وتتمنى لو لم تفعله: نستخدم hadn't + P.P.",
          "للندم على شيء لم تفعله وتتمنى لو أنك فعلته: نستخدم had + P.P.",
          "القاعدة ثابتة ومطابقة 100% لمنهج السادس الإعدادي الوحدة الثالثة."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: قاعدة عكس المعنى: إذا كانت الجملة الأصلية مثبتة نجعل الندم منفياً (hadn't)، وإذا كانت منفية نجعل الندم مثبتاً (had)!"
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
          }
        ],
        exercises: [
          {
            id: "5u3-ex2",
            question: "You drove through the red traffic light. Express regret: I wish I ______ (not drive) through it.",
            options: ["hadn't driven", "didn't drive", "haven't driven", "wouldn't drive"],
            correctAnswer: "hadn't driven",
            explanation: "الندم على تصرف خاطئ في الماضي يتطلب استخدام hadn't + التصريف الثالث driven.",
            type: "mcq",
            ministerialYear: "امتحان نصف السنة"
          }
        ]
      }
    ]
  },
  {
    id: 55,
    number: 5,
    titleAr: "الوحدة الخامسة: أفعال الاستنتاج والكلام المنقول (Deduction & Reported Speech)",
    titleEn: "Unit 5: Modals of Deduction & Reported Speech",
    description: "أفعال الاستنتاج والتأكد (must be, can't be, might be, must have been)، والكلام المنقول للعبارات والأسئلة (Reported Speech).",
    accentColor: "from-purple-600 to-indigo-600",
    bgGradient: "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200",
    lessons: [
      {
        id: "5th-u5-l1",
        unitId: 55,
        lessonNumber: 1,
        titleAr: "الدرس الأول: أفعال الاستنتاج (Modals of Deduction)",
        titleEn: "Lesson 1: Deduction (must, can't, might)",
        category: "grammar",
        summary: "التعبير عن اليقين الإيجابي (must be)، واليقين السلبي بالاستحالة (can't be)، والاحتمالية والشك (might be).",
        grammarRuleFormula: "Present Deduction (استنتاج في الحاضر):\nmust be (مؤكد 100% أنه كذلك)\ncan't be (مستحيل 100% أنه كذلك)\nmight be / could be (ربما ومحتمل 50%)\n\nPast Deduction (استنتاج عن حدث في الماضي):\nmust have + P.P. (مؤكد أنه حصل في الماضي)\ncan't have + P.P. (مستحيل أنه حصل في الماضي)\nmight have + P.P. (ربما حصل في الماضي)",
        detailedContent: [
          "نستخدم must be عندما نكون متأكدين تماماً من صحة الشيء بناءً على أدلة واضحة: His car is in the garage; he must be at home.",
          "نستخدم can't be عندما نكون متأكدين من استحالة الشيء: He is in Cairo today; that can't be Ahmed.",
          "نستخدم might be عندما نكون غير متأكدين (I am not sure / perhaps).",
          "في الماضي نضيف have + التصريف الثالث."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه! عكس must be في الاستنتاج هو can't be وليس mustn't be! لا تستخدم mustn't في الاستنتاج إطلاقاً."
        ],
        commonMistakes: [
          "استخدام mustn't be للدلالة على الاستحالة (الصحيح can't be).",
          "نسيان have في الاستنتاج الماضي."
        ],
        examples: [
          {
            en: "She has three cars and a private jet. She must be extremely wealthy.",
            ar: "تمتلك 3 سيارات وطائرة خاصة. لا بد وأنها ثرية للغاية (استنتاج مؤكد).",
            highlight: "must be",
            note: "استنتاج يقيني إيجابي"
          },
          {
            en: "The ground is wet everywhere; it must have rained last night.",
            ar: "الأرض مبللة في كل مكان؛ لا بد وأنها أمطرت الليلة الماضية.",
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
          }
        ]
      }
    ]
  },
  {
    id: 56,
    number: 6,
    titleAr: "الوحدة السادسة: المصارف والأفعال السببية (Banking & Causative Verbs)",
    titleEn: "Unit 6: Money, Banking & Causative Verbs (have / get / make)",
    description: "الأفعال السببية (have / get / make)، والمبني للمجهول في مختلف الأزمنة، والمفردات المصرفية والمالية.",
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
        summary: "التعبير عن خدمات يؤديها شخص آخر لك (have/get)، أو إجبار وتسبب في فعل شيء (make).",
        grammarRuleFormula: "have / get (شخص آخر ينجز الفعل لأجلك):\nSubject + had / got + Object + Past Participle (P.P.)\n(e.g., I had my car repaired = أصلحتُ سيارتي لدى الميكانيكي)\n\nmake (سبب أو إجبار):\nSubject + made + Object + Base Verb (مصدر مجرد)\n(e.g., The strong wind made the leaves fall)",
        detailedContent: [
          "have و get: تدلان على أن فاعل الجملة طلب من شخص مهني أو متخصص أن ينجز له عملاً (قص الشعر، تصليح السيارة، طلاء المنزل).",
          "بعد had / got يأتي المفعول به ثم التصريف الثالث (P.P.).",
          "make: تدل على السبب والإجبار، وبعد المفعول به يأتي مصدر مجرد خالٍ من أي إضافة (بدون to).",
          "أمثلة: Somebody stole my television -> I had my television stolen."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: قاعدة ذهبية: had / got يتبعها P.P. (تصريف ثالث). أما made فيتبعها base verb (مصدر مجرد)!"
        ],
        commonMistakes: [
          "وضع مصدر بعد had / got (الصحيح P.P.).",
          "وضع to بعد made مثل: made him to cry (الصحيح made him cry)."
        ],
        examples: [
          {
            en: "Mona had her computer fixed yesterday.",
            ar: "قامت منى بإصلاح حاسوبها بالأمس (لدى فني صيانة).",
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
            question: "The police officer made the driver ______ (stop) immediately.",
            options: ["stop", "stopped", "to stop", "stopping"],
            correctAnswer: "stop",
            explanation: "بعد made نستخدم دائماً المصدر المجرد stop.",
            type: "mcq",
            ministerialYear: "امتحان نهاية السنة"
          }
        ]
      }
    ]
  },
  {
    id: 57,
    number: 7,
    titleAr: "الوحدة السابعة: صيغ المستقبل والتكنولوجيا (Future Forms & Digital Tech)",
    titleEn: "Unit 7: Future Forms (will, going to, present cont, future cont)",
    description: "أشكال التعبير الخمسة عن المستقبل والفروق الدقيقة بينها، والتطور التكنولوجي والذكاء الاصطناعي.",
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
        grammarRuleFormula: "1) will + base: تنبؤات بدون دليل، وعود، قرارات سريعة (I will help you)\n2) be going to + base: خطط ونوايا مسبقة، تنبؤ مبني على دليل مرئي (Look at the clouds, it is going to rain)\n3) Present Continuous: مواعيد وترتيبات ثابتة مع أشخاص (I am meeting the minister tomorrow)\n4) Future Continuous (will be + v-ing): حدث مستمر في نقطة محددة في المستقبل (This time next week, I will be flying to London)",
        detailedContent: [
          "إذا كان هناك قرار لحظي سريع نستخدم will.",
          "إذا كان هناك دليل مرئي أو خطة نستخدم be going to.",
          "إذا كانت هناك ترتيبات رسمية أو تذاكر محجوزة نستخدم المضارع المستمر.",
          "هذا الموضوع تمهيد أساسي ومباشر للوحدة السابعة في مرحلة السادس الإعدادي."
        ],
        teacherNotes: [
          "ملاحظة الأستاذ مصطفى تركي: انتبه للكلمات الدالة: I think / probably -> will. I have decided / plan -> going to. Fixed schedule with time -> Present Continuous."
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
          }
        ]
      }
    ]
  }
];

// =========================================================================
// أدب الخامس الإعدادي (Literature: Tennyson & Katherine Mansfield)
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
      "تينيسون هو أحد أعظم شعراء العصر الفيكتوري في بريطانيا وتولى منصب شاعر البلاط الملكي.",
      "تتميز قصائده بالموسيقى الإيقاعية القوية والتصوير الحماسي للواجب والشرف الإنساني."
    ],
    genre: "Heroic Narrative Poetry",
    genreAr: "شعر ملحمي حماسي عن التضحية والواجب العسكري",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
    imageCaptionAr: "فرسان اللواء الخفيف يتقدمون بشجاعة في معركة بالاكلافا التاريخية",
    summaryAr: "قصيدة ملحمية خالدة تخلد ذكرى هجوم 600 فارس بريطاني في معركة بالاكلافا (حرب القرم عام 1854). على الرغم من إدراك الفرسان أن قائدهم العسكري أصدر أمراً خاطئاً وكارثياً، وأنهم يركضون نحو وادي الموت بين مدافع العدو الروسي المحيطة بهم من اليمين واليسار والأمام، إلا أنهم أطاعوا الواجب بشجاعة أسطورية دون تردد. يصف تينيسون بطولتهم العظيمة ويدعو العالم لتكريم شجاعتهم الخالدة.",
    moralLessonAr: "الشجاعة الفائقة، الإخلاص المطلق للواجب، والتضحية بالروح رغم الأخطاء القيادية القاتلة.",
    keyThemes: ["Duty and Obedience", "Heroism facing inevitable death", "The Tragic Cost of War"],
    characters: [
      {
        name: "The Six Hundred Horsemen",
        nameAr: "الفرسان الستمائة (اللواء الخفيف)",
        role: "The heroic cavalrymen",
        roleAr: "فرسان اللواء الخفيف الذين ضحوا بأرواحهم",
        description: "Rode courageously into the Valley of Death obeying military command without fear.",
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
        question: "Why did the soldiers charge although someone had blundered?",
        questionAr: "لماذا تقدم الجنود رغم معرفتهم أن خطأً عسكرياً فادحاً قد وقع؟",
        answer: "Because it was their duty to obey orders and fight bravely, not to reason why or hesitate.",
        answerAr: "لأن واجبهم العسكري هو طاعة الأوامر والقتال بشجاعة دون تردد أو مجادلة.",
        year: "امتحان الفصل الأول"
      },
      {
        id: "5th-tenn-q3",
        question: "What does the poet ask people to do at the end of the poem?",
        questionAr: "ماذا يطلب الشاعر من الناس في نهاية القصيدة؟",
        answer: "To honour the charge they made and honour the noble six hundred.",
        answerAr: "أن يكرموا هذا الهجوم البطولي ويكرموا الستمائة النبلاء وتضحيتهم.",
        year: "امتحان نهاية السنة"
      }
    ]
  },
  {
    id: "5th-lit-dollshouse",
    title: "The Doll's House",
    titleAr: "قصة: بيت الدمية (كاثرين مانسفيلد)",
    author: "Katherine Mansfield",
    authorAr: "كاثرين مانسفيلد (رائدة القصة القصيرة الحديثة)",
    authorYears: "1888 - 1923",
    authorBioAr: [
      "كاتبة نيوزيلندية شهيرة تميزت بأسلوبها النفسي الحديث ونقد الطبقية الاجتماعية في المجتمعات.",
      "مقررة أيضاً في منهج الأدب للسادس الإعدادي (قصة الكناري)."
    ],
    genre: "Social Realism / Short Story",
    genreAr: "واقعية اجتماعية ونقد للطبقية والتعالي",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
    imageCaptionAr: "بيت الدمية الخشبي الفاخر مع المصباح الأصفر الصغير الذي يرمز للأمل",
    summaryAr: "تتلقى فتيات عائلة برنل الغنية (إيزابيل، لوتي، وكيزيا) هدية فاخرة عبارة عن بيت دمى خشبي رائع مطلي بالألوان وفيه مصباح زيتي مصغر تقع في حبه الطفلة البريئة كيزيا. في المدرسة، تتفاخر الفتيات بالبيت ويدعون جميع زميلاتهن لرؤيته باستثناء الشقيقتين الفقيرتين ليل وإلسي كيلفي، لأن والدتهما عاملة غسيل ووالدهما في السجن. تتحدى كيزيا القوانين الطبقية الصارمة وتدعو الشقيقتين لرؤية البيت والمصباح، مما يسعد الطفلة إلسي كيلفي التي تبتسم وتقول: 'لقد رأيت المصباح الصغير'، رمزاً للأمل والمساواة الإنسانية.",
    moralLessonAr: "البراءة الإنسانية والمساواة تعلو على الفوارق الطبقية والغرور الاجتماعي، وأن التعاطف الصادق ينير قلوب المحرومين.",
    keyThemes: ["Social snobbery and class cruelty", "Childhood innocence", "The little lamp as a symbol of hope"],
    characters: [
      {
        name: "Kezia Burnell",
        nameAr: "كيزيا برنل",
        role: "The kind innocent girl",
        roleAr: "الطفلة الرقيقة التي ترفض الطبقية",
        description: "Fascinated by the little lamp and breaks social rules to invite the poor Kelvey girls.",
        descriptionAr: "أعجبت بالمصباح الصغير وتتحدى قيود عائلتها الطبقية لتدعو بنات كيلفي الفقيرات."
      },
      {
        name: "Else Kelvey",
        nameAr: "إلسي كيلفي (الصغيرة)",
        role: "The silent poor sister",
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
      }
    ]
  }
];

// =========================================================================
// إنشاءات الخامس الإعدادي (Essays / Compositions)
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
  }
];

// =========================================================================
// بنك أسئلة امتحانات الخامس الإعدادي
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
  }
];

// =========================================================================
// نموذج الامتحان الشامل للخامس الإعدادي (Mock Exam Paper)
// =========================================================================
export const FIFTH_PREPARATORY_MOCK_PAPER: MockExamPaper = {
  id: "5th-full-mock-paper-2025",
  title: "امتحان نهاية السنة الشامل • الخامس الإعدادي (اعتماداً على أسئلة 2020 إلى 2026)",
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
          questionText: "He has lived in Baghdad for 30 years; he ______ know every street in the city. (must / can\x27t / mustn\x27t)",
          type: "choice",
          options: ["must", "can\x27t", "mustn\x27t"],
          correctAnswer: "must",
          explanation: "استنتاج مؤكد إيجابي (Deduction): must.",
          maxScore: 5
        },
        {
          id: "5th-mock-q2-5",
          number: 5,
          questionText: "\x27I am writing an analytical essay,\x27 Zaid said. -> Zaid said that he ______ an analytical essay. [Reported Speech]",
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
          options: ["hadn\x27t spent", "didn\x27t spend", "wouldn\x27t spend"],
          correctAnswer: "hadn\x27t spent",
          explanation: "الندم على أمر في الماضي بعد wish يتطلب ماضياً تاماً: hadn\x27t spent.",
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
          questionText: "In \x27The Charge of the Light Brigade\x27, how many cavalry soldiers rode into the valley?",
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
          questionText: "In Katherine Mansfield\x27s \x27The Doll\x27s House\x27, what did the little amber lamp symbolize for Kezia and Else?",
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
      suggestedModel: "Held amid the magnificent ruins of ancient Mesopotamia, the Babylon International Festival stands as a testament to Iraq\x27s enduring role as the cradle of human civilization. Artists, poets, musicians, and theatrical troupes from dozens of countries gather in the ancient amphitheatre where Nebuchadnezzar once walked. The festival showcases folkloric dances, classical symphonies, and contemporary art exhibitions that unite diverse cultures under the Babylonian night sky. For the Iraqi youth, the festival is not merely entertainment; it is a proud reaffirmation of resilience, peace, and timeless cultural glory.",
      keywords: ["Mesopotamia", "amphitheatre", "theatrical troupes", "cultural glory", "Nebuchadnezzar", "resilience"],
      maxScore: 20
    }
  ]
};
