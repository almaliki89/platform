import { LiteratureItem } from '../types';

export const LITERATURE_DATA: LiteratureItem[] = [
  {
    id: "lit-pride",
    title: "Pride and Prejudice",
    titleAr: "رواية كبرياء وتحامل (جين أوستن)",
    author: "Jane Austen (جين أوستن)",
    genre: "Romantic Novel / Classic Fiction (رواية رومانسية اجتماعية)",
    summaryAr: "تدور أحداث الرواية حول عائلة بينيت (Bennet Family) وبناتها الخمس، وخاصة الابنة الثانية الذكية والمستقلة إليزابيث (Elizabeth Bennet)، وصراعها الفكري والعاطفي مع السيد فيتزويليام دارسي (Mr. Darcy) الثري الأرستقراطي. تناقش الرواية عواقب الأحكام المتسرعة (Prejudice) والغرور الاجتماعي (Pride)، وكيف يتعلم الطرفان التغلب على عيوبهما لتحقيق الحب الحقيقي والاحترام المتبادل.",
    characters: [
      {
        name: "Elizabeth Bennet (إليزابيث بينيت)",
        role: "البطلة الرئيسية (Protagonist)",
        description: "شابة ذكية، حادة الذكاء، مستقلة الرأي، ترفض الزواج للمصلحة المالية فقط، لكنها تقع في فخ الحكم المسبق والتسرع ضد السيد دارسي."
      },
      {
        name: "Mr. Fitzwilliam Darcy (السيد دارسي)",
        role: "البطل المحوري (Leading Male Protagonist)",
        description: "رجل نبيل، شديد الثراء والوسامة، يبدو في البداية مغروراً ومتحفظاً وبارداً، لكنه يحمل قلباً نبيلاً ومستعداً للتضحية من أجل من يحب."
      },
      {
        name: "Jane Bennet (جين بينيت)",
        role: "الأخت الكبرى",
        description: "الابنة الأجمل والأكثر طيبة وتسامحاً، لا تظن السوء بأحد، وتقع في حب السيد بينغلي (Mr. Bingley)."
      },
      {
        name: "Mr. Charles Bingley (تشارلز بينغلي)",
        role: "صديق دارسي المقرب",
        description: "شاب ثري، لطيف المعشر، متواضع واجتماعي، يقع في حب جين من أول نظرة."
      },
      {
        name: "Mrs. Bennet (السيدة بينيت)",
        role: "والدة الفتيات",
        description: "امرأة سطحية وثرثارة، همها الوحيد في الحياة تزويج بناتها الخمس من رجال أثرياء لتأمين مستقبلهن."
      },
      {
        name: "Mr. Wickham (السيد ويكهام)",
        role: "ضابط عسكري مضلل",
        description: "شخص ساحر الحديث في الظاهر، لكنه كاذب وخائن، شوه سمعة دارسي وهرب مع ليديا الصغرى."
      }
    ],
    keyThemes: [
      "الكبرياء والحكم المسبق (Pride & Prejudice) وعواقبهما على تدمير العلاقات الصادقة.",
      "الزواج والمكانة الاجتماعية (Marriage & Social Status) في المجتمع الإنجليزي بالقرن التاسع عشر.",
      "أهمية النقد الذاتي والاعتراف بالخطأ للتطور الإنساني والنضج."
    ],
    ministerialQA: [
      {
        question: "Who wrote 'Pride and Prejudice'?",
        answer: "Jane Austen wrote 'Pride and Prejudice'.",
        year: "2016 دور أول"
      },
      {
        question: "Why did Elizabeth reject Mr. Darcy's first marriage proposal?",
        answer: "Because she thought he was arrogant, proud, and responsible for ruining her sister Jane's happiness with Bingley, and hurting Wickham.",
        year: "2018 دور أول"
      },
      {
        question: "How did Mr. Darcy change Elizabeth's opinion of him?",
        answer: "By sending her an explanatory letter revealing Wickham's true dishonest character, and later secretly saving the Bennet family's honour by paying Wickham's debts.",
        year: "2020 دور ثانٍ"
      },
      {
        question: "What is Mrs. Bennet's main obsession in life?",
        answer: "Her main goal and obsession is to see all her five daughters married to wealthy gentlemen.",
        year: "2022 تمهيدي"
      },
      {
        question: "Describe Mr. Darcy when people first saw him at the ball.",
        answer: "They admired his handsome appearance and wealth, but soon disliked him because he was proud, aloof, and refused to dance with Elizabeth.",
        year: "2023 دور أول"
      }
    ]
  },
  {
    id: "lit-asyoulikeit",
    title: "As You Like It",
    titleAr: "مسرحية كما تشاء (ويليام شكسبير)",
    author: "William Shakespeare (ويليام شكسبير)",
    genre: "Pastoral Comedy (كوميديا رعوية)",
    summaryAr: "مسرحية كوميدية شهيرة تدور في إنجلترا وفرنسا، حيث يُطرد الدوق الأكبر (Duke Senior) إلى غابة آردن (Forest of Arden) على يد شقيقه الشرير فريدريك. تلحق به ابنته روزاليند (Rosalind) بعد نفيها متخفية بزي شاب اسمه غانيميد (Ganymede) بصحبة ابنة عمها سيليا. في الغابة، تلتقي روزاليند بحبيبها أورلاندو (Orlando) وتختبر حبه ونقاء قلبه بسلسلة من الحوارات الفلسفية الذكية والمضحكة حتى تنتهي المسرحية بالمصالحة وأربعة أعراس سعيدة.",
    characters: [
      {
        name: "Rosalind / Ganymede (روزاليند)",
        role: "البطلة الرئيسية الأكثر سحراً وذكاءً",
        description: "ابنة الدوق المنفي، شجاعة وفطنة وجميلة، تتنكر كرجل لحماية نفسها وتعلّم أورلاندو جوهر الحب الصادق."
      },
      {
        name: "Orlando (أورلاندو)",
        role: "الفارس الشاب والشجاع",
        description: "الابن الأصغر للسير رولاند دي بويز، ظلمه شقيقه الأكبر أوليفر وحرمه من التعليم، لكنه يثبت شهامته وينقذ شقيقه ويفوز بقلب روزاليند."
      },
      {
        name: "Duke Senior (الدوق الأكبر)",
        role: "الحاكم الشرعي المنفي",
        description: "والد روزاليند، رجل حكيم ورؤوف يجد في حياة الغابة البسيطة حرية وسلاماً أعمق من نفاق البلاط."
      },
      {
        name: "Duke Frederick (الدوق فريدريك)",
        role: "المغتصب للعرش",
        description: "شقيق الدوق الأكبر الأصغر، طاغية حاسد ينفي شقيقه ثم يندم في النهاية ويتخلى عن السلطة بعد لقائه بناسك ديني."
      },
      {
        name: "Celia (سيليا)",
        role: "ابنة فريدريك والصديقة الوفية",
        description: "ابنة عم روزاليند المقربة، تضحي برفاهية القصر لترافق روزاليند في منفاها متخفية باسم ألينا (Aliena)."
      }
    ],
    keyThemes: [
      "التناقض بين حياة البلاط القاسية الفاسدة وبساطة الطبيعة الشافية في غابة آردن.",
      "قوة الحب الحقيقي والولاء العائلي القادر على التغلب على الكراهية.",
      "التنكر واكتشاف الذات من خلال الحوار الصريح والفكاهة الراقية."
    ],
    ministerialQA: [
      {
        question: "Who wrote 'As You Like It'?",
        answer: "William Shakespeare wrote 'As You Like It'.",
        year: "2015 دور أول"
      },
      {
        question: "Why did Rosalind disguise herself as a young man named Ganymede?",
        answer: "To travel safely to the Forest of Arden without being recognized or harmed as a defenseless woman.",
        year: "2017 دور أول"
      },
      {
        question: "Where was Duke Senior living after his brother banished him?",
        answer: "He was living in the Forest of Arden with some loyal followers, like the legendary Robin Hood.",
        year: "2019 دور ثانٍ"
      },
      {
        question: "How did Duke Frederick change at the end of the play?",
        answer: "He met a holy hermit in the forest, converted to a religious life, gave up his usurped dukedom, and restored everything to Duke Senior.",
        year: "2021 دور أول"
      },
      {
        question: "Why did Oliver hate his younger brother Orlando?",
        answer: "Because Orlando was brave, loved by all the people, and naturally gentle, which made Oliver intensely jealous.",
        year: "2024 تمهيدي"
      }
    ]
  }
];
