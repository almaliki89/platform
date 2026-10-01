export interface PhysicsChapter {
  id: string;
  chapterNumber: number;
  titleAr: string;
  titleEn: string;
  description: string;
  simulationId?: string;
  hasSimulation: boolean;
  keyFormulas?: string[];
  concepts?: string[];
}

export interface PhysicsGradeCurriculum {
  gradeId: string;
  gradeTitleAr: string;
  gradeTitleEn: string;
  stage: 'intermediate' | 'preparatory';
  description: string;
  chapters: PhysicsChapter[];
}

export const IRAQI_PHYSICS_CURRICULUM: PhysicsGradeCurriculum[] = [
  {
    gradeId: 'first-intermediate',
    gradeTitleAr: 'الصف الأول المتوسط',
    gradeTitleEn: 'First Intermediate Grade',
    stage: 'intermediate',
    description: 'الأسس الأولية للمادة، القوى، الضغط، والديناميكا الحرارية وفق المنهج العراقي الحديث.',
    chapters: [
      {
        id: 'properties-of-matter',
        chapterNumber: 1,
        titleAr: 'خواص المادة وحالاتها الجزيئية',
        titleEn: 'Properties of Matter & Molecular States',
        description: 'دراسة حالات المادة الثلاث (الصلبة، السائلة، والغازية)، المسافات البينية، حركة الجزيئات وقوى التماسك.',
        simulationId: 'physics-first-properties-of-matter',
        hasSimulation: true,
        keyFormulas: ['الكتلة / الحجم = الكثافة (ρ = m / V)'],
        concepts: ['حالات المادة', 'المسافات البينية', 'طاقة الحركة الجزيئية', 'الشكل والحجم'],
      },
      {
        id: 'force',
        chapterNumber: 2,
        titleAr: 'القوة ومحصلة القوى',
        titleEn: 'Force & Resultant of Forces',
        description: 'مفهوم القوة كسحب أو دفع، القوى المتزنة وغير المتزنة، وتمثيل متجهات القوة.',
        simulationId: 'physics-first-force',
        hasSimulation: true,
        keyFormulas: ['F_net = F₁ + F₂', 'F_net = |F₁ - F₂|'],
        concepts: ['القوة ككمية متجهة', 'القوى المتزنة', 'القوى غير المتزنة', 'محصلة القوى'],
      },
      {
        id: 'pressure',
        chapterNumber: 3,
        titleAr: 'الضغط وتطبيقاته',
        titleEn: 'Pressure & Area Applications',
        description: 'العلاقة بين القوة العمودية المؤثرة ومساحة السطح، وضغط الموائع الساكنة.',
        simulationId: 'physics-first-pressure',
        hasSimulation: true,
        keyFormulas: ['P = F / A (Pascal = N/m²)'],
        concepts: ['الضغط', 'مساحة السطح', 'القوة العمودية', 'باسكال'],
      },
      {
        id: 'heat',
        chapterNumber: 4,
        titleAr: 'الحرارة والاتزان الحراري',
        titleEn: 'Heat Transfer & Thermal Equilibrium',
        description: 'انتقال الطاقة الحرارية بين الأجسام، التوصيل والحمل والإشعاع، ومفهوم الاتزان الحراري.',
        simulationId: 'physics-first-heat',
        hasSimulation: true,
        keyFormulas: ['Q = mcΔT (مفهوم التبادل الحراري)'],
        concepts: ['الحرارة ودرجة الحرارة', 'الاتزان الحراري', 'طرق انتقال الحرارة'],
      },
      {
        id: 'thermal-effects',
        chapterNumber: 5,
        titleAr: 'أثر الحرارة في المواد وتغير الحالة',
        titleEn: 'Thermal Expansion & State Changes',
        description: 'التمدد الطولي والسطحي والحجمي للأجسام الصلبة والسائلة والغازية، وتغيرات الحالة الفيزيائية.',
        simulationId: 'physics-first-thermal-effects',
        hasSimulation: true,
        keyFormulas: ['ΔL = α L₀ ΔT'],
        concepts: ['التمدد والانكماش الحراري', 'الانصهار والغليان', 'التمدد الشاذ للماء'],
      },
    ],
  },
  {
    gradeId: 'second-intermediate',
    gradeTitleAr: 'الصف الثاني المتوسط',
    gradeTitleEn: 'Second Intermediate Grade',
    stage: 'intermediate',
    description: 'الميكانيكا الحركية، الشغل والطاقة، الآلات البسيطة، الأمواج والضوء.',
    chapters: [
      {
        id: 'motion',
        chapterNumber: 1,
        titleAr: 'الحركة والسرعة والانطلاق',
        titleEn: 'Kinematics & Motion',
        description: 'التمييز بين المسافة والإزاحة، والانطلاق والسرعة، والتعجيل المنتظم وغير المنتظم.',
        simulationId: 'physics-second-motion',
        hasSimulation: true,
        keyFormulas: ['v = d / t', 's = x / t', 'a = Δv / t'],
        concepts: ['المسافة والإزاحة', 'السرعة القياسية والمتجهة', 'التعجيل الخطي'],
      },
      {
        id: 'laws-of-motion',
        chapterNumber: 2,
        titleAr: 'قوانين الحركة لنيوتن',
        titleEn: "Newton's Laws of Motion",
        description: 'القانون الأول (الاستمرارية والقصور الذاتي)، القانون الثاني (F = ma)، والقانون الثالث (الفعل ورد الفعل).',
        simulationId: 'physics-second-laws-of-motion',
        hasSimulation: true,
        keyFormulas: ['F = m · a', 'F₁ = -F₂ (الفعل ورد الفعل)'],
        concepts: ['القصور الذاتي', 'القوة والكتلة والتعجيل', 'قوة الفعل ورد الفعل'],
      },
      {
        id: 'work-power-energy',
        chapterNumber: 3,
        titleAr: 'الشغل والقدرة والطاقة',
        titleEn: 'Work, Power & Energy',
        description: 'العلاقة بين الشغل المنجز والقوة والإزاحة، مفهوم القدرة الميكانيكية، وتحولات الطاقة الحركية والكامنة.',
        simulationId: 'physics-second-work-power-energy',
        hasSimulation: true,
        keyFormulas: ['W = F · d (Joule)', 'P = W / t (Watt)', 'Ek = ½ m v²', 'Ep = m g h'],
        concepts: ['الشغل الميكانيكي', 'القدرة', 'الطاقة الحركية', 'الطاقة الكامنة الثقالية'],
      },
      {
        id: 'levers',
        chapterNumber: 4,
        titleAr: 'العتلات والآلات البسيطة',
        titleEn: 'Levers & Simple Machines',
        description: 'قانون العتلات، النوع الأول والثاني والثالث من العتلات، نقطة الارتكاز والفائدة الميكانيكية.',
        simulationId: 'physics-second-levers',
        hasSimulation: true,
        keyFormulas: ['القوة × ذراعها = المقاومة × ذراعها (F₁ × d₁ = F₂ × d₂)', 'M.A = Load / Effort'],
        concepts: ['العتلة والارتكاز', 'ذراع القوة وذراع المقاومة', 'الفائدة الميكانيكية (MA)'],
      },
      {
        id: 'waves-sound',
        chapterNumber: 5,
        titleAr: 'الحركة الموجية والصوت',
        titleEn: 'Wave Motion & Sound',
        description: 'خصائص الأمواج المستعرضة والطولية، التردد والسعة والطول الموجي، وسرعة انتشار الصوت في الأوساط.',
        simulationId: 'physics-second-waves-sound',
        hasSimulation: true,
        keyFormulas: ['v = f · λ (سرعة الموجة = التردد × الطول الموجي)'],
        concepts: ['السعة والتردد', 'الطول الموجي', 'سرعة الصوت', 'درجة الصوت وشدته'],
      },
      {
        id: 'light',
        chapterNumber: 6,
        titleAr: 'الضوء وقوانين الانعكاس',
        titleEn: 'Light & Laws of Reflection',
        description: 'انتشار الضوء في خطوط مستقيمة، زاوية السقوط وزاوية الانعكاس، وتكون الصور في المرايا المستوية.',
        simulationId: 'physics-second-light',
        hasSimulation: true,
        keyFormulas: ['زاوية السقوط = زاوية الانعكاس (θᵢ = θᵣ)'],
        concepts: ['الشعاع الساقط والمنعكس', 'العمود المقام', 'قانونا الانعكاس'],
      },
    ],
  },
  {
    gradeId: 'third-intermediate',
    gradeTitleAr: 'الصف الثالث المتوسط',
    gradeTitleEn: 'Third Intermediate Grade',
    stage: 'intermediate',
    description: 'الكهربائية الساكنة والمتحركة، المغناطيسية، والمحولات الكهربائية.',
    chapters: [
      {
        id: 'electrostatics',
        chapterNumber: 1,
        titleAr: 'الكهربائية الساكنة وقانون كولوم',
        titleEn: 'Electrostatics',
        description: 'الشحنات الكهربائية، قانون كولوم والمجال الكهربائي.',
        hasSimulation: false,
      },
      {
        id: 'current-electricity',
        chapterNumber: 2,
        titleAr: 'التيار الكهربائي وقانون أوم',
        titleEn: 'Electric Current & Ohm’s Law',
        description: 'ربط المقاومات على التوالي والتوازي، وقانون أوم.',
        hasSimulation: false,
      },
      {
        id: 'magnetism',
        chapterNumber: 3,
        titleAr: 'المغناطيسية والمجال المغناطيسي',
        titleEn: 'Magnetism',
        description: 'المجالات المغناطيسية وخطوط القوى المغناطيسية.',
        hasSimulation: false,
      },
    ],
  },
  {
    gradeId: 'fourth-scientific',
    gradeTitleAr: 'الصف الرابع العلمي',
    gradeTitleEn: 'Fourth Scientific Grade',
    stage: 'preparatory',
    description: 'القياسات الفيزيائية، الميكانيكا، والحرارة المتقدمة.',
    chapters: [
      {
        id: 'measurements',
        chapterNumber: 1,
        titleAr: 'معادلات الأبعاد وأدوات القياس',
        titleEn: 'Physical Measurements',
        description: 'أنظمة الوحدات، الدقة والخطأ في القياس.',
        hasSimulation: false,
      },
    ],
  },
  {
    gradeId: 'fifth-scientific',
    gradeTitleAr: 'الصف الخامس العلمي',
    gradeTitleEn: 'Fifth Scientific Grade',
    stage: 'preparatory',
    description: 'الحركة الدائرية والدورانية، الموائع الساكنة والمتحركة، والحركة الاهتزازية.',
    chapters: [
      {
        id: 'circular-motion',
        chapterNumber: 1,
        titleAr: 'الحركة الدائرية والدورانية',
        titleEn: 'Circular Motion',
        description: 'التعجيل المركزي والقوة المركزية وعزم القصور الذاتي.',
        hasSimulation: false,
      },
    ],
  },
  {
    gradeId: 'sixth-scientific',
    gradeTitleAr: 'الصف السادس العلمي',
    gradeTitleEn: 'Sixth Scientific Grade',
    stage: 'preparatory',
    description: 'المتسعات، الحث الكهرومغناطيسي، دوائر التيار المتناوب، والفيزياء الحديثة والنووية.',
    chapters: [
      {
        id: 'capacitors',
        chapterNumber: 1,
        titleAr: 'المتسعات والمجال الكهربائي',
        titleEn: 'Capacitors',
        description: 'سعة المتسعة، ربط التوالي والتوازي، والعوازل القطبية وغير القطبية.',
        hasSimulation: false,
      },
    ],
  },
];
