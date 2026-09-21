import { Unit } from '../../types';

export const UNIT_8: Unit = {
  id: 8,
  number: 8,
  titleAr: "الوحدة الثامنة: الموارد الطبيعية، طاقة الرياح، والبيئة",
  titleEn: "Unit 8: Natural Resources, Wind Power & Environment",
  description: "الموارد الطبيعية المتجددة وغير المتجددة، استنزاف الموارد وإزالة الغابات (Deforestation)، البادئة (dis-)، قطعة مورد متجدد: طاقة الرياح (Wind Power)، حماية البيئة وإعادة التدوير، مع جدول السوابق واللواحق الشامل.",
  accentColor: "from-teal-600 to-emerald-600",
  bgGradient: "bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200",
  lessons: [
    {
      id: "u8-l1",
      unitId: 8,
      lessonNumber: 1,
      titleAr: "الدرس الأول: مواردنا الطبيعية والبادئة المعاكسة (dis-)",
      titleEn: "Lesson 1: Natural Resources & Prefix 'dis-'",
      category: "vocabulary",
      summary: "الموارد المتجددة وغير المتجددة، استنزاف الموارد وإزالة الغابات، والبادئة المعاكسة (dis-) للأفعال والصفات (ص 158 - 159 من الملزمة).",
      grammarRuleFormula: "Renewable Resources: wind, sunlight, water\nNon-renewable Resources: oil, gas, coal\nPrefix 'dis-': like -> dislike | agree -> disagree | approve -> disapprove | obey -> disobey | trust -> distrust",
      detailedContent: [
        "1. الموارد الطبيعية (Natural Resources - ص 158 من الملزمة):",
        "- الموارد المتجددة (Renewable resources): موارد لا تنفد وتتجدد طبيعياً مثل طاقة الرياح (wind)، الطاقة الشمسية (sunlight)، والماء (water).",
        "- الموارد غير المتجددة (Non-renewable resources): موارد محدودة تنفد مع الاستهلاك مثل النفط (oil)، الغاز الطبيعي (gas)، والفحم (coal).",
        "- إزالة الغابات (Deforestation): قطع الأشجار وتدمير الغابات يهدد الحياة البرية ويضر بالبيئة.",
        "2. البادئة المعاكسة (dis-) - ص 159 (تمرين A ص 173 كتاب النشاط):",
        "- agree -> disagree (يوافق / يعارض).",
        "- approve -> disapprove (يستحسن / يستهجن).",
        "- like -> dislike (يحب / يكره).",
        "- obey -> disobey (يطيع / يعصي).",
        "- trust -> distrust (يثق / لا يثق).",
        "- appear -> disappear (يظهر / يختفي).",
        "- please -> displease (يرضي / يسخط).",
        "- connect -> disconnect (يتصل / ينقطع)."
      ],
      teacherNotes: [
        "ملاحظة الأستاذ مصطفى تركي: في سؤال الإملاء الوزاري (سؤال 3 فرع C)، تأتي أفعال البادئة dis- باستمرار:",
        "مثل: like -> dislike ; agree -> disagree ; appear -> disappear.",
        "انتبه: نضيف dis- للأفعال بدون مضاعفة الحروف."
      ],
      commonMistakes: [
        "إضافة un- بدلاً من dis- لكلمات مثل disagree أو dislike.",
        "الخطأ في إملاء disappear (بحرف s واحد وحرفي p)."
      ],
      examples: [
        {
          en: "agree -> disagree ; appear -> disappear",
          ar: "يوافق -> يعارض ؛ يظهر -> يختفي",
          highlight: "disagree / disappear",
          note: "وزاري 2017 و 2021"
        },
        {
          en: "Trees are cut down to provide wood and land, which leads to deforestation.",
          ar: "تُقطع الأشجار لتوفير الخشب والأراضي، مما يؤدي إلى إزالة الغابات.",
          highlight: "leads to deforestation",
          note: "ص 158"
        }
      ],
      exercises: [
        {
          id: "u8-l1-ex1",
          question: "appear -> disappear ; approve -> _________ (Add negative prefix)",
          options: ["disapprove", "unapprove", "inapprove", "imapprove"],
          correctAnswer: "disapprove",
          explanation: "الفعل approve يأخذ البادئة dis- ليعطي معنى المعارضة (disapprove).",
          type: "mcq",
          ministerialYear: "وزاري 2019 دور أول"
        },
        {
          id: "u8-l1-ex2",
          question: "Wind and sunlight are examples of _________ energy resources.",
          options: ["renewable", "non-renewable", "harmful", "expensive"],
          correctAnswer: "renewable",
          explanation: "الرياح والشمس من مصادر الطاقة المتجددة (renewable resources).",
          type: "mcq",
          ministerialYear: "تمرين A ص 173"
        }
      ]
    },
    {
      id: "u8-l2",
      unitId: 8,
      lessonNumber: 2,
      titleAr: "الدرس الثاني: حماية البيئة وإعادة التدوير والمبني للمجهول",
      titleEn: "Lesson 2: Environmental Protection & Recycling",
      category: "vocabulary",
      summary: "مصطلحات البيئة وإعادة تدوير النفايات واستخدام المبني للمجهول للتوعية بالاستدامة (تمرين B ص 176 كتاب النشاط).",
      grammarRuleFormula: "Environmental Collocations:\nrecycle waste materials | reduce pollution | conserve water | plant trees",
      detailedContent: [
        "حماية البيئة والمفردات البيئية (ص 160 - 161 من ملزمة الأستاذ مصطفى تركي):",
        "- تدوير النفايات (Recycling): إعادة استخدام الزجاج والبلاستيك والورق لتقليل النفايات والتلوث.",
        "- ترشيد استهلاك المياه والكهرباء (Conserving water and electricity).",
        "- زراعة الأشجار لمكافحة التصحر وزيادة الأكسجين.",
        "جمل المبني للمجهول البيئية:",
        "- Millions of plastic bottles are thrown away every year.",
        "- More trees must be planted to protect the soil from erosion."
      ],
      teacherNotes: [
        "ملاحظة الأستاذ مصطفى تركي: تأتي هذه المصطلحات في أسئلة الإسقاطات والتوصيلات الوزارية."
      ],
      commonMistakes: [
        "الخلط بين recycle (تدوير) و reuse (إعادة استخدام)."
      ],
      examples: [
        {
          en: "Waste materials should be recycled to save natural resources.",
          ar: "ينبغي إعادة تدوير النفايات للحفاظ على الموارد الطبيعية.",
          highlight: "should be recycled",
          note: "ص 160"
        }
      ],
      exercises: [
        {
          id: "u8-l2-ex1",
          question: "Processing used materials so they can be used again is called _________.",
          options: ["recycling", "deforestation", "drilling", "wasting"],
          correctAnswer: "recycling",
          explanation: "إعادة معالجة المواد المستخدمة للاستفادة منها ثانية تسمى تدوير النفايات (recycling).",
          type: "mcq",
          ministerialYear: "تمرين B ص 176"
        }
      ]
    },
    {
      id: "u8-l3",
      unitId: 8,
      lessonNumber: 3,
      titleAr: "الدرس الثالث: قطعة مورد متجدد - طاقة الرياح (Wind Power)",
      titleEn: "Lesson 3: A Renewable Resource - Wind Power",
      category: "reading",
      summary: "قطعة الكتاب الوزارية الرسمية حول طاقة الرياح: تاريخ استخدامها، طريقة عمل توربينات الرياح، المزايا البيئية النظيفة، الانتقادات، وأثرها على الطيور وقوارب الصيد.",
      grammarRuleFormula: "Wind Power Key Points:\n- Used for thousands of years (windmills for grain and water)\n- Wind turbines: wind turns blades -> generates clean electricity\n- Advantages: renewable, green, no greenhouse gases, uses little land\n- Disadvantages: needs constant wind, visual impact, noise, danger to birds",
      detailedContent: [
        "قطعة الكتاب الرسمية: طاقة الرياح (ص 162 - 165 من ملزمة الأستاذ مصطفى تركي):",
        "1. التاريخ: استُخدمت طاقة الرياح لآلاف السنين في تسيير السفن الشراعية، وفي طواحين الهواء القديمة لطحن الحبوب وضخ المياه من الآبار.",
        "2. توربينات الرياح الحديثة (Wind turbines): أبراج عملاقة مزودة بشفرات تديرها الرياح، تقوم بتدوير مولد يولد الكهرباء.",
        "3. مزايا طاقة الرياح (Advantages):",
        "   - طاقة متجددة نظيفة لا تنفد (renewable and clean).",
        "   - لا تنتج غازات دفيئة ولا تلوث الهواء (no greenhouse gases / zero pollution).",
        "   - تشغل مساحة صغيرة من الأرض؛ فيمكن للمزارعين استخدام الأرض حول التوربينات للزراعة أو الرعي.",
        "4. عيوب وانتقادات طاقة الرياح (Disadvantages):",
        "   - الرياح ليست ثابتة دائماً (wind does not blow all the time).",
        "   - التوربينات تصدر ضوضاء وتغير المنظر الطبيعي (spoil the landscape).",
        "   - قد تشكل خطراً على الطيور التي قد تصطدم بالشفرات المتحركة.",
        "   - التوربينات البحرية قد تزعج قوارب الصيد.",
        "أسئلة وزارية نموذجية:",
        "- Why is wind power clean energy? Because it doesn't produce any waste or greenhouse gases.",
        "- What are the main disadvantages of wind turbines? They can be noisy, look unattractive to some people, and the wind is not constant.",
        "- Can farmers use the land around wind turbines? Yes, because the towers take up very little land on the ground."
      ],
      teacherNotes: [
        "ملاحظة الأستاذ مصطفى تركي: قطعة طاقة الرياح من القطع الوزارية المكررة في السؤال الأول فرع B.",
        "سؤال صح وخطأ وزاري: Wind power produces greenhouse gases. (False - it produces zero greenhouse gases).",
        "سؤال وزاري: Wind power is a (renewable) source of energy."
      ],
      commonMistakes: [
        "القول بأن طاقة الرياح تلوث البيئة؛ بل هي طاقة خضراء ونظيفة تماماً.",
        "القول بأن التوربينات تمنع الزراعة؛ بينما يمكن للمزارعين ممارسة الزراعة والرعي حولها بحرية."
      ],
      examples: [
        {
          en: "Why is wind energy good for the environment? Because it is renewable and doesn't pollute the air.",
          ar: "لماذا طاقة الرياح جيدة للبيئة؟ لأنها متجددة ولا تلوث الهواء.",
          highlight: "renewable and doesn't pollute",
          note: "وزاري 2018 و 2020"
        },
        {
          en: "People who live near wind farms complain that the turbines are (noisy).",
          ar: "يشتكي السكان القريبون من مزارع الرياح من أن التوربينات تصدر ضجيجاً (noisy).",
          highlight: "turbines are noisy",
          note: "وزاري 2019 دور أول"
        }
      ],
      exercises: [
        {
          id: "u8-l3-ex1",
          question: "Wind turbines do not produce any _________ gases.",
          options: ["greenhouse", "natural", "fresh", "clean"],
          correctAnswer: "greenhouse",
          explanation: "توربينات الرياح لا تنتج غازات دفيئة (greenhouse gases).",
          type: "mcq",
          ministerialYear: "وزاري 2017 دور أول"
        },
        {
          id: "u8-l3-ex2",
          question: "Farmers can still use the land around wind turbines for _________.",
          options: ["farming and grazing animals", "parking airplanes", "building high-rise towers", "swimming"],
          correctAnswer: "farming and grazing animals",
          explanation: "يمكن للمزارعين استغلال الأراضي حول التوربينات للزراعة ورعي الحيوانات.",
          type: "mcq",
          ministerialYear: "وزاري 2021 دور أول"
        }
      ]
    },
    {
      id: "u8-l4",
      unitId: 8,
      lessonNumber: 4,
      titleAr: "الدرس الرابع: مفردات الوديان والمحاصيل والبيئة",
      titleEn: "Lesson 4: Valleys, Crops & Environment Vocabulary",
      category: "vocabulary",
      summary: "مصطلحات الجغرافيا والزراعة واستصلاح الأراضي (تمرين C ص 180 كتاب النشاط).",
      grammarRuleFormula: "Geography & Crops:\nvalley = low land between mountains\ncrops = plants grown by farmers for food (wheat, barley)\nfertile soil = rich land good for growing plants",
      detailedContent: [
        "مصطلحات الأرض والمحاصيل (ص 166 من الملزمة):",
        "- valley (وادي): low land between hills or mountains.",
        "- crops (محاصيل): plants grown for food by farmers.",
        "- fertile (خصب): land that produces good crops.",
        "- drought (جفاف): a long period without rain.",
        "- irrigation (ري الأراضي): supplying water to dry land."
      ],
      teacherNotes: [
        "ملاحظة الأستاذ مصطفى تركي: تأتي هذه المصطلحات في السؤال الثالث فرع B (توصيلات) أو فرع A (إسقاطات)."
      ],
      commonMistakes: [
        "الخلط بين drought (جفاف) و draught (تيار هواء بارد)."
      ],
      examples: [
        {
          en: "low land between hills or mountains = valley.",
          ar: "أرض منخفضة بين التلال أو الجبال = وادي.",
          highlight: "valley",
          note: "تمرين C ص 180"
        }
      ],
      exercises: [
        {
          id: "u8-l4-ex1",
          question: "Plants like wheat and barley grown by farmers are called _________.",
          options: ["crops", "valleys", "turbines", "resources"],
          correctAnswer: "crops",
          explanation: "النباتات مثل القمح والشعير التي يزرعها الفلاحون تسمى محاصيل (crops).",
          type: "mcq",
          ministerialYear: "تمرين C ص 180"
        }
      ]
    },
    {
      id: "u8-l5",
      unitId: 8,
      lessonNumber: 5,
      titleAr: "الدرس الخامس: اختبار الوحدة الثامنة وجدول السوابق واللواحق الشامل",
      titleEn: "Lesson 5: Unit 8 Test & Comprehensive Prefixes/Suffixes",
      category: "spelling",
      summary: "حل الاختبار الشامل للوحدة الثامنة وجدول الإملاء الوزاري لكافة السوابق (un-, in-, im-, il-, ir-, dis-) واللواحق (ment, tion, sion, able, ful, fully) في المنهج (ص 167 - 170 من الملزمة).",
      grammarRuleFormula: "Master Spelling Table:\nPrefixes: im-, il-, ir-, in-, un-, dis-\nSuffixes: -ment, -tion, -sion, -ance, -ence, -able, -al, -ful, -fully",
      detailedContent: [
        "جدول السوابق واللواحق الوزاري الشامل (ص 167 - 170 من ملزمة الأستاذ مصطفى تركي):",
        "1. سوابق المعاكسات (Negative Prefixes):",
        "- im-: polite -> impolite, possible -> impossible, moral -> immoral.",
        "- il-: legal -> illegal, literate -> illiterate.",
        "- ir-: regular -> irregular, responsible -> irresponsible.",
        "- in-: correct -> incorrect, expensive -> inexpensive, efficient -> inefficient.",
        "- dis-: agree -> disagree, approve -> disapprove, appear -> disappear, like -> dislike.",
        "- un-: happy -> unhappy, healthy -> unhealthy, popular -> unpopular, usual -> unusual.",
        "2. لواحق تكوين الأسماء (Noun Suffixes):",
        "- -ment: enhance -> enhancement, enrol -> enrolment, entertain -> entertainment.",
        "- -tion / -sion: apply -> application, register -> registration, admit -> admission.",
        "- -ance: attend -> attendance, endure -> endurance.",
        "3. لواحق تكوين الصفات والظروف (Adjectives & Adverbs):",
        "- -ful: beauty -> beautiful, peace -> peaceful, care -> careful.",
        "- -fully: beautifully, carefully, successfully.",
        "- -able / -ible: comfort -> comfortable, flex -> flexible."
      ],
      teacherNotes: [
        "ملاحظة الأستاذ مصطفى تركي: هذا الجدول الشامل يضمن لك الدرجة الكاملة (20/20) في سؤال الإملاء والمشتقات الوزاري!"
      ],
      commonMistakes: [
        "الخلط بين السوابق وإضافة بادئة خاطئة للكلمة الشاذة."
      ],
      examples: [
        {
          en: "happy -> unhappy ; legal -> illegal ; moral -> immoral ; agree -> disagree",
          ar: "سوابق المعاكسات الوزارية المتكررة",
          highlight: "unhappy, illegal, immoral, disagree",
          note: "سؤال الإملاء الوزاري ص 168"
        }
      ],
      exercises: [
        {
          id: "u8-l5-ex1",
          question: "correct -> incorrect ; legal -> _________ (Complete the spelling)",
          options: ["illegal", "unlegal", "inlegal", "dislegal"],
          correctAnswer: "illegal",
          explanation: "الصفة legal تبدأ بحرف l فتأخذ البادئة il- لتصبح illegal.",
          type: "mcq",
          ministerialYear: "وزاري 2020 دور أول"
        },
        {
          id: "u8-l5-ex2",
          question: "entertain -> entertainment ; enhance -> _________ (Noun form)",
          options: ["enhancement", "enhancing", "enhancation", "enhancable"],
          correctAnswer: "enhancement",
          explanation: "الاسم من enhance بإضافة لاحقة -ment هو enhancement.",
          type: "mcq",
          ministerialYear: "وزاري 2022 تمهيدي"
        }
      ]
    }
  ]
};
