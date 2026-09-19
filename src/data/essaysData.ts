import { EssayItem } from '../types';

export const ESSAYS_DATA: EssayItem[] = [
  {
    id: "essay-u1",
    unitId: 1,
    titleAr: "إعلانات السجائر يجب أن تكون غير قانونية",
    titleEn: "Cigarette Advertising Should Be Illegal",
    ministerialWeight: "20 درجة وزارية - السؤال الخامس فرع A/B",
    paragraphsEn: [
      "Smoking is one of the most dangerous habits that damages people's health severely. Every year, millions of people worldwide die from smoking-related illnesses such as lung cancer, heart attacks, and respiratory diseases. Furthermore, passive smoking causes terrible harm to non-smokers, especially innocent children.",
      "Cigarette advertisements are extremely deceptive and attractive. They usually show successful, attractive, and famous people smoking in luxurious settings. This gives young teenagers the false impression that smoking is a symbol of maturity, freedom, and coolness. Consequently, many school students start smoking early and become addicted easily.",
      "In conclusion, governments should ban all forms of cigarette advertising on television, social media, streets, and magazines. Health campaigns must replace these advertisements to educate the youth about the deadly dangers of tobacco. In this way, we can protect future generations and build a healthier society."
    ],
    paragraphsAr: [
      "يعد التدخين واحداً من أخطر العادات التي تدمر صحة الإنسان بشدة. في كل عام، يموت ملايين الأشخاص حول العالم من أمراض مرتبطة بالتدخين مثل سرطان الرئة والنوبات القلبية وأمراض الجهاز التنفسي. علاوة على ذلك، يسبب التدخين السلبي ضرراً مروعاً لغير المدخنين، وبخاصة الأطفال الأبرياء.",
      "إن إعلانات السجائر مضللة وجذابة للغاية. فهي تُظهر في العادة أشخاصاً ناجحين وجذابين ومشاهير يدخنون في أجواء مترفة. يعطي هذا انطباعاً زائفاً للمراهقين الصغار بأن التدخين رمز للنضج والحرية والجاذبية. ونتيجة لذلك، يبدأ العديد من طلاب المدارس التدخين مبكراً ويصبحون مدمنين عليه بسهولة.",
      "ختاماً، يجب على الحكومات حظر جميع أشكال إعلانات السجائر في التلفاز ووسائل التواصل الاجتماعي والشوارع والمجلات. ويجب استبدال هذه الإعلانات بحملات توعية صحية لتثقيف الشباب حول الأخطار المميتة للتبغ. وبهذه الطريقة، يمكننا حماية الأجيال القادمة وبناء مجتمع أكثر صحة."
    ],
    keywords: [
      { word: "Dangerous habit", meaning: "عادة خطيرة" },
      { word: "Lung cancer", meaning: "سرطان الرئة" },
      { word: "Passive smoking", meaning: "التدخين السلبي" },
      { word: "Deceptive & attractive", meaning: "مضللة وجذابة" },
      { word: "Teenagers", meaning: "المراهقون" },
      { word: "Addicted easily", meaning: "مدمنون بسهولة" },
      { word: "Ban all forms", meaning: "حظر جميع الأشكال" }
    ],
    goldenTips: [
      "اكتب العنوان في منتصف السطر الأول بخط واضح مع وضع خط تحته.",
      "اترك مسافة كلمة واحدة (Indentation) في أول سطر من كل فقرة.",
      "قسّم الإنشاء إلى 3 فقرات واضحة: مقدمة، أسباب وضرر، وخاتمة وحلول.",
      "احرص على ألا يقل عدد الكلمات عن 100 إلى 120 كلمة."
    ],
    clozeSentences: [
      {
        textWithBlanks: "Smoking is a very _____ habit that damages people's lungs.",
        missingWord: "dangerous",
        options: ["dangerous", "healthy", "pleasant", "useful"]
      },
      {
        textWithBlanks: "Passive smoking harms children and _____ people.",
        missingWord: "innocent",
        options: ["innocent", "guilty", "careless", "cruel"]
      },
      {
        textWithBlanks: "Governments must _____ all cigarette advertisements.",
        missingWord: "ban",
        options: ["ban", "allow", "support", "encourage"]
      }
    ]
  },
  {
    id: "essay-u2",
    unitId: 2,
    titleAr: "نصائح للحصول على وظيفة حارس أمني",
    titleEn: "Advice on How to Get a Job (Security Guard)",
    ministerialWeight: "20 درجة وزارية - مكرر في عدة أدوار",
    paragraphsEn: [
      "Dear Ahmed, I was delighted to hear that you have applied for a job as a security guard at a large company. This job requires vigilance, fitness, and reliability, so here are some practical tips to help you pass the interview successfully.",
      "First of all, you should arrive fifteen minutes before the scheduled time, dressed smartly in a formal suit. During the interview, you must listen carefully to the questions, look confident, and make eye contact with the interviewers. Emphasize that you are physically fit, possess a clean driving licence, and can handle emergencies calmly under pressure.",
      "Finally, remember to be polite, thank the interviewers for their time, and show genuine enthusiasm for maintaining security. If you follow these instructions, I am confident you will get the job. Good luck! Best wishes, Ali."
    ],
    paragraphsAr: [
      "عزيزي أحمد، لقد سررت كثيراً بسماع أنك تقدمت لوظيفة حارس أمني في شركة كبرى. تتطلب هذه الوظيفة اليقظة واللياقة البدنية والاعتمادية، لذا إليك بعض النصائح العملية لمساعدتك على اجتياز المقابلة بنجاح.",
      "أولاً وقبل كل شيء، يجب أن تصل قبل الموعد المحدد بخمس عشرة دقيقة مرتدياً زياً رسمياً أنيقاً. خلال المقابلة، يجب أن تصغي بعناية للأسئلة وتبدو واثقاً من نفسك وتتواصل بصرياً مع المقابلين. أكد على أنك لائق بدنياً وتمتلك رخصة قيادة نظيفة وتستطيع التعامل مع الطوارئ بهدوء تحت الضغط.",
      "أخيراً، تذكر أن تكون مهذباً وتشكر لجنة المقابلة على وقتهم وتظهر حماساً حقيقياً للحفاظ على الأمن. إذا اتبعت هذه الإرشادات، فأنا واثق بأنك ستحصل على الوظيفة. حظاً موفقاً! مع أطيب التمنيات، علي."
    ],
    keywords: [
      { word: "Security guard", meaning: "حارس أمني" },
      { word: "Vigilance & fitness", meaning: "اليقظة واللياقة" },
      { word: "Scheduled time", meaning: "الموعد المحدد" },
      { word: "Formal suit", meaning: "بدلة رسمية" },
      { word: "Handle emergencies", meaning: "التعامل مع الطوارئ" },
      { word: "Under pressure", meaning: "تحت الضغط" }
    ],
    goldenTips: [
      "هذا الإنشاء بصيغة رسالة نصائح (Advice Letter)، ابدأ بـ Dear [Name] واختم بـ Best wishes.",
      "استخدم أفعال الإلزام والنصيحة التي تعلمتها في الوحدة الثانية مثل (You should, You must, You have to).",
      "أظهر تسلسلاً منطقياً في النصائح باستخدام (First of all, Furthermore, Finally)."
    ],
    clozeSentences: [
      {
        textWithBlanks: "You should arrive on time dressed in a _____ suit.",
        missingWord: "formal",
        options: ["formal", "dirty", "casual", "torn"]
      },
      {
        textWithBlanks: "A security guard must be physically _____.",
        missingWord: "fit",
        options: ["fit", "weak", "lazy", "sick"]
      }
    ]
  },
  {
    id: "essay-u3",
    unitId: 3,
    titleAr: "فوائد دراسة اللغة الإنجليزية في بريطانيا",
    titleEn: "The Advantages of Studying English in the UK",
    ministerialWeight: "20 درجة وزارية - شائع جداً في الدور الأول",
    paragraphsEn: [
      "Studying English in the United Kingdom is a golden opportunity for any student seeking true fluency. Britain is the birthplace of the English language, making it the ideal environment to immerse oneself in genuine linguistic culture.",
      "The greatest advantage is that you hear and speak English all day long. From buying groceries to conversing with native speakers on trains and buses, everyday life becomes a continuous classroom. Moreover, staying with an English host family provides invaluable exposure to native pronunciation, idioms, and domestic customs, helping you overcome shyness rapidly.",
      "In addition, British language schools offer world-class certified teachers and modern communicative methodologies. After class, students can visit museums, historical castles, and libraries, combining rigorous academic progress with unforgettable cultural adventures. Therefore, studying in Britain is undoubtedly a transformative investment in your career."
    ],
    paragraphsAr: [
      "إن دراسة اللغة الإنجليزية في المملكة المتحدة فرصة ذهبية لأي طالب يبحث عن الطلاقة الحقيقية. فبريطانيا هي مهد اللغة الإنجليزية، مما يجعلها البيئة المثالية للانغماس في ثقافة لغوية أصيلة.",
      "الميزة الكبرى تكمن في أنك تسمع وتتحدث الإنجليزية طوال اليوم. فمن شراء البقالة إلى التحدث مع المتحدثين الأصليين في القطارات والحافلات، تصبح الحياة اليومية فصلاً دراسياً متواصلاً. فضلاً عن ذلك، فإن الإقامة مع عائلة بريطانية مضيفة تمنحك احتكاكاً لا يقدر بثمن بالنطق الأصلي والمصطلحات والتقاليد المنزلية، مما يساعدك على كسر حاجز الخجل بسرعة.",
      "بالإضافة إلى ذلك، توفر معاهد اللغات البريطانية معلمين معتمدين على مستوى عالمي وطرائق تدريس تواصلية حديثة. وبعد الدروس، يمكن للطلاب زيارة المتاحف والقلاع التاريخية والمكتبات، ليمزجوا بين التقدم الأكاديمي الرصين والمغامرات الثقافية التي لا تُنسى. لذا، فإن الدراسة في بريطانيا استثمار حقيقي ومغير لمستقبلك المهني."
    ],
    keywords: [
      { word: "Golden opportunity", meaning: "فرصة ذهبية" },
      { word: "Fluency", meaning: "الطلاقة" },
      { word: "Native speakers", meaning: "المتحدثون الأصليون" },
      { word: "Host family", meaning: "عائلة مضيفة" },
      { word: "Native pronunciation", meaning: "النطق الأصلي" },
      { word: "Overcome shyness", meaning: "التغلب على الخجل" }
    ],
    goldenTips: [
      "ركز على فوائد الإقامة مع عائلة إنجليزية مضيفة (Host family).",
      "استخدم روابط ربط ثرية مثل: Moreover, In addition, Consequently, Therefore.",
      "احرص على الإملاء الصحيح لكلمات شائعة مثل: Language, Opportunity, British, Environment."
    ],
    clozeSentences: [
      {
        textWithBlanks: "Living with an English host family helps you hear native _____.",
        missingWord: "pronunciation",
        options: ["pronunciation", "silence", "noise", "shouting"]
      },
      {
        textWithBlanks: "Studying abroad helps students overcome their _____.",
        missingWord: "shyness",
        options: ["shyness", "happiness", "health", "cleverness"]
      }
    ]
  },
  {
    id: "essay-u5",
    unitId: 5,
    titleAr: "عطلة رائعة قضيتها",
    titleEn: "A Wonderful Holiday I Have Had",
    ministerialWeight: "20 درجة وزارية - من أسهل وأكثر الإنشاءات تكراراً",
    paragraphsEn: [
      "Last summer, I spent an unforgettable holiday in the northern city of Erbil with my family. The weather there was wonderfully cool and refreshing, providing a delightful escape from the scorching summer heat of Baghdad.",
      "We stayed at a comfortable hotel overlooking the majestic Citadel of Erbil. During our trip, we visited spectacular waterfalls like Gali Ali Bag and Bekhal. The breathtaking scenery of green mountains and crystal-clear streams was truly mesmerizing. We also enjoyed delicious traditional Kurdish dishes, especially kebab and fresh bread, and the local people were exceptionally warm and hospitable.",
      "In the evenings, we strolled through vibrant traditional bazaars and purchased beautiful souvenirs. It was indeed a magical vacation full of joy, relaxation, and memorable moments. I genuinely hope to visit this paradise again soon."
    ],
    paragraphsAr: [
      "في الصيف الماضي، قضيت عطلة لا تُنسى في مدينة أربيل الشمالية مع عائلتي. كان الطقس هناك معتدلاً ومنعشاً بشكل رائع، مما وفر لنا ملاذاً ممتعاً من حرارة صيف بغداد اللاهبة.",
      "أقمنا في فندق مريح يطل على قلعة أربيل المهيبة. وخلال رحلتنا، قمنا بزيارة شلالات مذهلة مثل كلي علي بك وبيخال. كانت المناظر الخلابة للجبال الخضراء والجداول الرقراقة الصافية تسحر الألباب حقاً. استمتعنا أيضاً بالأطباق الكردية التقليدية اللذيذة، وبخاصة الكباب والخبز الطازج، وكان الأهالي في غاية الدفء وكرم الضيافة.",
      "في المساء، كنا نتجول في الأسواق الشعبية النابضة بالحياة ونشتري تذكارات جميلة. لقد كانت حقاً إجازة ساحرة مفعمة بالفرح والاسترخاء واللحظات الخالدة. آمل بصدق أن أزور هذه الجنة مجدداً في القريب العاجل."
    ],
    keywords: [
      { word: "Unforgettable holiday", meaning: "عطلة لا تُنسى" },
      { word: "Delightful escape", meaning: "ملاذ ممتع" },
      { word: "Spectacular waterfalls", meaning: "شلالات مذهلة" },
      { word: "Breathtaking scenery", meaning: "مناظر تأسر الأنفاس" },
      { word: "Warm and hospitable", meaning: "كرماء وودودون" },
      { word: "Memorable moments", meaning: "لحظات خالدة" }
    ],
    goldenTips: [
      "استخدم أزمنة الماضي البسيط (spent, stayed, visited, enjoyed) لأنك تسرد أحداث عطلة مكتملة.",
      "استخدم صفات جذابة ترفع درجتك مثل: spectacular, breathtaking, mesmerizing, memorable.",
      "احرص على ذكر المكان (Erbil أو Turkey أو Lebanon)، الأنشطة، والطقس."
    ],
    clozeSentences: [
      {
        textWithBlanks: "The scenery of the green mountains was _____.",
        missingWord: "breathtaking",
        options: ["breathtaking", "boring", "ugly", "dark"]
      },
      {
        textWithBlanks: "The local people were warm and _____ to visitors.",
        missingWord: "hospitable",
        options: ["hospitable", "hostile", "rude", "cold"]
      }
    ]
  }
];
