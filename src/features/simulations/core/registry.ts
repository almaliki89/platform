import React from 'react';
import { SimulationRegistryEntry } from './types';

export const SIMULATION_REGISTRY: SimulationRegistryEntry[] = [
  // ==========================================
  // FIRST INTERMEDIATE PHYSICS SIMULATIONS (5)
  // ==========================================
  {
    id: 'physics-first-properties-of-matter',
    subjectId: 'physics',
    gradeId: 'first-intermediate',
    chapterId: 'properties-of-matter',
    chapterNumber: 1,
    curriculumTitle: 'خواص المادة وحالاتها الجزيئية',
    topic: 'خواص المادة والنموذج الجزيئي',
    grade: 'الصف الأول المتوسط',
    difficulty: 'beginner',
    titleAr: 'حالات المادة والنموذج الجزيئي',
    titleEn: 'Matter States & Particle Model',
    description: 'تجربة بصرية تفاعلية توضح خصائص الحالات الثلاث للمادة (الصلبة، السائلة، الغازية) والمسافات البينية وقوى التماسك.',
    learningObjectives: [
      'فهم خصائص الحالات الثلاث للمادة وحركة الجزيئات',
      'ملاحظة تأثير الحرارة على طاقة حركة الجزيئات',
      'التمييز بين الشكل والحجم الثابت والمتغير',
    ],
    requiredConcepts: ['المسافات البينية', 'قوى التماسك', 'الطاقة الحركية الجزيئية'],
    formulae: ['ρ = m / V'],
    conceptTags: ['صلب', 'سائل', 'غاز', 'جزيئات'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/firstIntermediate/PropertiesOfMatter/PropertiesOfMatterSimulation').then((m) => ({
        default: m.PropertiesOfMatterSimulation,
      }))
    ),
  },
  {
    id: 'physics-first-force',
    subjectId: 'physics',
    gradeId: 'first-intermediate',
    chapterId: 'force',
    chapterNumber: 2,
    curriculumTitle: 'القوة ومحصلة القوى',
    topic: 'القوة والمتجهات',
    grade: 'الصف الأول المتوسط',
    difficulty: 'beginner',
    titleAr: 'مختبر القوة ومحصلة القوى',
    titleEn: 'Force & Resultant Vector Lab',
    description: 'مختبر تفاعلي لتطبيق مفهوم القوة كسحب ودفع، واستكشاف القوى المتزنة وغير المتزنة وتأثيرها على الحركة.',
    learningObjectives: [
      'تمثيل القوة ككمية متجهة بمقدار واتجاه',
      'حساب محصلة القوى المتعاكسة والمتوافقة',
      'التمييز بين القوى المتزنة والقوى غير المتزنة',
    ],
    requiredConcepts: ['القوة المتجهة', 'القوى المتزنة', 'محصلة القوى'],
    formulae: ['F_net = F₁ + F₂', 'F_net = |F₁ - F₂|'],
    conceptTags: ['قوة', 'محصلة', 'نيوتن', 'اتزان'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/firstIntermediate/ForceLab/ForceLabSimulation').then((m) => ({
        default: m.ForceLabSimulation,
      }))
    ),
  },
  {
    id: 'physics-first-pressure',
    subjectId: 'physics',
    gradeId: 'first-intermediate',
    chapterId: 'pressure',
    chapterNumber: 3,
    curriculumTitle: 'الضغط وتطبيقاته',
    topic: 'الضغط ومساحة السطح',
    grade: 'الصف الأول المتوسط',
    difficulty: 'beginner',
    titleAr: 'مختبر الضغط ومساحة السطح',
    titleEn: 'Pressure & Area Lab (P = F / A)',
    description: 'مختبر تفاعلي لدراسة العلاقة بين القوة الضاغطة ومساحة السطح ووحدة الباسكال وتطبيقات الحياة اليومية.',
    learningObjectives: [
      'تطبيق قانون الضغط P = F / A',
      'استيعاب التناسب العكسي بين الضغط ومساحة السطح',
      'تفسير التطبيقات العملية للضغط في الأدوات اليومية',
    ],
    requiredConcepts: ['الضغط', 'مساحة السطح', 'القوة العمودية', 'باسكال'],
    formulae: ['P = F / A (Pascal)'],
    conceptTags: ['ضغط', 'مساحة', 'قوة', 'باسكال'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/firstIntermediate/PressureLab/PressureLabSimulation').then((m) => ({
        default: m.PressureLabSimulation,
      }))
    ),
  },
  {
    id: 'physics-first-heat',
    subjectId: 'physics',
    gradeId: 'first-intermediate',
    chapterId: 'heat',
    chapterNumber: 4,
    curriculumTitle: 'الحرارة والاتزان الحراري',
    topic: 'انتقال الحرارة والاتزان',
    grade: 'الصف الأول المتوسط',
    difficulty: 'beginner',
    titleAr: 'مختبر انتقال الحرارة والاتزان الحراري',
    titleEn: 'Heat Transfer & Thermal Equilibrium',
    description: 'مختبر تفاعلي يوضح سريان الطاقة الحرارية من الجسم الساخن إلى البارد حتى الوصول للاتزان الحراري.',
    learningObjectives: [
      'التمييز العلمي بين الحرارة ودرجة الحرارة',
      'ملاحظة اتجاه السريان التلقائي للحرارة',
      'استيعاب مفهوم الاتزان الحراري ورسم منحنى التغير الزمني',
    ],
    requiredConcepts: ['الحرارة', 'درجة الحرارة', 'الاتزان الحراري'],
    formulae: ['Q = mcΔT', 'T_eq'],
    conceptTags: ['حرارة', 'اتزان حراري', 'توصيل', 'درجة حرارة'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/firstIntermediate/HeatLab/HeatLabSimulation').then((m) => ({
        default: m.HeatLabSimulation,
      }))
    ),
  },
  {
    id: 'physics-first-thermal-effects',
    subjectId: 'physics',
    gradeId: 'first-intermediate',
    chapterId: 'thermal-effects',
    chapterNumber: 5,
    curriculumTitle: 'أثر الحرارة في المواد',
    topic: 'التمدد والانكماش الحراري',
    grade: 'الصف الأول المتوسط',
    difficulty: 'beginner',
    titleAr: 'مختبر أثر الحرارة وتمدد المواد',
    titleEn: 'Thermal Expansion & Material Effects',
    description: 'مختبر تفاعلي لاستكشاف التمدد الطولي للمعادن عند التسخين والانكماش بالتبريد والمقارنة بين معاملات التمدد.',
    learningObjectives: [
      'تطبيق قانون التمدد الطولي: ΔL = α · L₀ · ΔT',
      'المقارنة بين معاملات التمدد للنحاس والألمنيوم والحديد',
      'تفسير الفواصل الهندسية في الجسور وسكك الحديد',
    ],
    requiredConcepts: ['التمدد الطولي', 'معامل التمدد', 'فرق درجات الحرارة'],
    formulae: ['ΔL = α L₀ ΔT'],
    conceptTags: ['تمدد', 'انكماش', 'معادن', 'معامل تمدد'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/firstIntermediate/ThermalEffects/ThermalEffectsSimulation').then((m) => ({
        default: m.ThermalEffectsSimulation,
      }))
    ),
  },

  // ==========================================
  // SECOND INTERMEDIATE PHYSICS SIMULATIONS (6)
  // ==========================================
  {
    id: 'physics-second-motion',
    subjectId: 'physics',
    gradeId: 'second-intermediate',
    chapterId: 'motion',
    chapterNumber: 1,
    curriculumTitle: 'الحركة والسرعة والانطلاق',
    topic: 'علم الحركة والتمثيل البياني',
    grade: 'الصف الثاني المتوسط',
    difficulty: 'intermediate',
    titleAr: 'مستكشف الحركة: المسافة والإزاحة والسرعة',
    titleEn: 'Kinematics & Motion Explorer',
    description: 'مختبر تفاعلي للتمييز العملي بين المسافة والإزاحة والسرعة والانطلاق والتعجيل مع الرسم البياني اللحظي.',
    learningObjectives: [
      'التمييز بين المسافة القياسية والإزاحة المتجهة',
      'حساب السرعة والانطلاق والتعجيل الخطي',
      'قراءة المخطط البياني للموقع والزمن (x - t)',
    ],
    requiredConcepts: ['المسافة', 'الإزاحة', 'السرعة المتجهة', 'التعجيل'],
    formulae: ['v = Δx / Δt', 's = d / t', 'a = Δv / t'],
    conceptTags: ['حركة', 'إزاحة', 'مسافة', 'سرعة', 'تعجيل'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/secondIntermediate/MotionExplorer/MotionExplorerSimulation').then((m) => ({
        default: m.MotionExplorerSimulation,
      }))
    ),
  },
  {
    id: 'physics-second-laws-of-motion',
    subjectId: 'physics',
    gradeId: 'second-intermediate',
    chapterId: 'laws-of-motion',
    chapterNumber: 2,
    curriculumTitle: 'قوانين الحركة لنيوتن',
    topic: 'قوانين نيوتن الثلاثة',
    grade: 'الصف الثاني المتوسط',
    difficulty: 'intermediate',
    titleAr: 'مختبر قوانين الحركة لنيوتن',
    titleEn: "Newton's Laws of Motion Lab",
    description: 'مختبر شامل يدمج قوانين نيوتن الثلاثة (القصور الذاتي، F = ma، الفعل ورد الفعل) في سيناريوهات تفاعلية.',
    learningObjectives: [
      'استيعاب مفهوم القصور الذاتي ومقاومة تغيير الحالة الحركية',
      'تطبيق قانون نيوتن الثاني رياضياً وعملياً: F = m · a',
      'التحقق من قانون الفعل ورد الفعل: لكل فعل رد فعل مساوٍ ومعاكس',
    ],
    requiredConcepts: ['القصور الذاتي', 'القوة والتعجيل', 'الفعل ورد الفعل'],
    formulae: ['F = m · a', 'F₁ = -F₂'],
    conceptTags: ['نيوتن', 'قصور ذاتي', 'قوة', 'تسارع', 'رد فعل'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/secondIntermediate/NewtonLawsLab/NewtonLawsLabSimulation').then((m) => ({
        default: m.NewtonLawsLabSimulation,
      }))
    ),
  },
  {
    id: 'physics-second-work-power-energy',
    subjectId: 'physics',
    gradeId: 'second-intermediate',
    chapterId: 'work-power-energy',
    chapterNumber: 3,
    curriculumTitle: 'الشغل والقدرة والطاقة',
    topic: 'الشغل الميكانيكي والقدرة والطاقة',
    grade: 'الصف الثاني المتوسط',
    difficulty: 'intermediate',
    titleAr: 'مختبر الشغل والقدرة وتحولات الطاقة',
    titleEn: 'Work, Power & Energy Lab',
    description: 'مختبر تفاعلي لحساب الشغل والقدرة ومقارنة الطاقة الحركية والطاقة الكامنة الثقالية ومبدأ حفظ الطاقة.',
    learningObjectives: [
      'تطبيق قانون الشغل المنجز W = F · d وقانون القدرة P = W / t',
      'حساب الطاقة الحركية Ek = ½ m v² والكامنة Ep = m g h',
      'ملاحظة تحولات الطاقة الميكانيكية وثبات الطاقة الكلية',
    ],
    requiredConcepts: ['الشغل', 'القدرة', 'الطاقة الحركية', 'الطاقة الكامنة'],
    formulae: ['W = F · d', 'P = W / t', 'Ek = ½ m v²', 'Ep = m g h'],
    conceptTags: ['شغل', 'قدرة', 'طاقة حركية', 'طاقة كامنة', 'جول', 'واط'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/secondIntermediate/WorkPowerEnergy/WorkPowerEnergySimulation').then((m) => ({
        default: m.WorkPowerEnergySimulation,
      }))
    ),
  },
  {
    id: 'physics-second-levers',
    subjectId: 'physics',
    gradeId: 'second-intermediate',
    chapterId: 'levers',
    chapterNumber: 4,
    curriculumTitle: 'العتلات والآلات البسيطة',
    topic: 'قانون العتلات والاتزان',
    grade: 'الصف الثاني المتوسط',
    difficulty: 'intermediate',
    titleAr: 'مختبر العتلات وقانون الاتزان',
    titleEn: 'Levers & Mechanical Advantage Lab',
    description: 'مختبر تفاعلي لتطبيق قانون العتلات (القوة × ذراعها = المقاومة × ذراعها) وحساب الفائدة الميكانيكية وأنواع العتلات.',
    learningObjectives: [
      'تطبيق قانون العتلات: F₁ · d₁ = F₂ · d₂',
      'حساب الفائدة الميكانيكية (MA) للعتلة',
      'التمييز بين الأنواع الثلاثة للعتلات',
    ],
    requiredConcepts: ['العتلة', 'نقطة الارتكاز', 'ذراع القوة', 'ذراع المقاومة', 'الفائدة الميكانيكية'],
    formulae: ['F₁ · d₁ = F₂ · d₂', 'MA = Load / Effort'],
    conceptTags: ['عتلات', 'ارتكاز', 'فائدة ميكانيكية', 'عزم'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/secondIntermediate/LeverLab/LeverLabSimulation').then((m) => ({
        default: m.LeverLabSimulation,
      }))
    ),
  },
  {
    id: 'physics-second-waves-sound',
    subjectId: 'physics',
    gradeId: 'second-intermediate',
    chapterId: 'waves-sound',
    chapterNumber: 5,
    curriculumTitle: 'الحركة الموجية والصوت',
    topic: 'الأمواج والصوت وسرعة الانتشار',
    grade: 'الصف الثاني المتوسط',
    difficulty: 'intermediate',
    titleAr: 'مختبر الحركة الموجية والصوت',
    titleEn: 'Wave Motion & Sound Lab (v = f · λ)',
    description: 'مختبر تفاعلي لاستكشاف خصائص الأمواج المستعرضة والطولية والتحقق من قانون سرعة انتشار الموجة وخصائص الصوت.',
    learningObjectives: [
      'تطبيق القانون العام لانتشار الأمواج: v = f · λ',
      'التمييز بين الموجات المستعرضة والموجات الطولية',
      'ربط التردد بطبقة الصوت والسعة بشدة الصوت',
    ],
    requiredConcepts: ['التردد', 'الطول الموجي', 'السعة', 'سرعة الموجة', 'الصوت'],
    formulae: ['v = f · λ', 'T = 1 / f'],
    conceptTags: ['أمواج', 'صوت', 'تردد', 'طول موجي', 'سعة'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/secondIntermediate/WaveSoundLab/WaveSoundLabSimulation').then((m) => ({
        default: m.WaveSoundLabSimulation,
      }))
    ),
  },
  {
    id: 'physics-second-light',
    subjectId: 'physics',
    gradeId: 'second-intermediate',
    chapterId: 'light',
    chapterNumber: 6,
    curriculumTitle: 'الضوء وقوانين الانعكاس',
    topic: 'البصريات الهندسية وانعكاس الضوء',
    grade: 'الصف الثاني المتوسط',
    difficulty: 'intermediate',
    titleAr: 'مختبر الضوء وقوانين الانعكاس',
    titleEn: 'Light & Laws of Reflection Lab',
    description: 'مختبر بصري تفاعلي يوضح انتشار أشعة الضوء وسقوطها على المرايا المستوية والتحقق من قانوني الانعكاس.',
    learningObjectives: [
      'التحقق من قانوني الانعكاس في المرايا المستوية',
      'إثبات أن زاوية السقوط تساوي زاوية الانعكاس (θᵢ = θᵣ)',
      'قياس زوايا الأشعة بالنسبة للعمود المقام على السطح العاكس',
    ],
    requiredConcepts: ['الشعاع الساقط', 'الشعاع المنعكس', 'العمود المقام', 'زاوية السقوط والانعكاس'],
    formulae: ['θ_incidence = θ_reflection'],
    conceptTags: ['ضوء', 'انعكاس', 'مرآة مستوية', 'شعاع'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/secondIntermediate/LightRayLab/LightRayLabSimulation').then((m) => ({
        default: m.LightRayLabSimulation,
      }))
    ),
  },

  // ==========================================
  // THIRD INTERMEDIATE PHYSICS SIMULATIONS (9)
  // ==========================================
  {
    id: 'physics-third-electrostatics',
    subjectId: 'physics',
    gradeId: 'third-intermediate',
    chapterId: 'third-electrostatics',
    chapterNumber: 1,
    curriculumTitle: 'الكهربائية الساكنة',
    topic: 'الكهربائية الساكنة وقانون كولوم',
    grade: 'الصف الثالث المتوسط',
    difficulty: 'intermediate',
    titleAr: 'مختبر الكهربائية الساكنة',
    titleEn: 'Electrostatics Lab',
    description: 'مختبر تفاعلي لاستكشاف تفاعل الشحنات الكهربائية، طرائق الشحن بالدلك والتماس والحث، وقانون كولوم.',
    learningObjectives: [
      'استيعاب أنواع الشحنات وقوى التجاذب والتنافر',
      'فهم طرائق الشحن الكهربائي (الدلك، التماس، الحث)',
      'حساب القوة المتبادلة بين الشحنات بقانون كولوم',
    ],
    requiredConcepts: ['الشحنات الكهربائية', 'قانون كولوم', 'المجال الكهربائي'],
    formulae: ['F = k · |q₁ · q₂| / r²'],
    conceptTags: ['شحنة', 'كولوم', 'تجاذب', 'تنافر', 'حث'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/thirdIntermediate/Electrostatics/ElectrostaticsSimulation').then((m) => ({
        default: m.ElectrostaticsSimulation,
      }))
    ),
  },
  {
    id: 'physics-third-magnetism',
    subjectId: 'physics',
    gradeId: 'third-intermediate',
    chapterId: 'third-magnetism',
    chapterNumber: 2,
    curriculumTitle: 'المغناطيسية',
    topic: 'المغناطيسية والمجال المغناطيسي',
    grade: 'الصف الثالث المتوسط',
    difficulty: 'intermediate',
    titleAr: 'مختبر المغناطيسية والمجال المغناطيسي',
    titleEn: 'Magnetism & Magnetic Field Lab',
    description: 'مختبر تفاعلي لدراسة أقطاب المغناطيس، قوى التجاذب والتنافر، خطوط المجال المغناطيسي، وسلوك إبرة البوصلة.',
    learningObjectives: [
      'التعرف على القطبين الشمالي والجنوبي وقانون الأقطاب',
      'تتبع خطوط المجال المغناطيسي واتجاهها من N إلى S',
      'ملاحظة استجابة إبرة البوصلة وتصنيف المواد المغناطيسية',
    ],
    requiredConcepts: ['الأقطاب المغناطيسية', 'خطوط المجال', 'المواد الفيرومغناطيسية'],
    conceptTags: ['مغناطيس', 'مجال مغناطيسي', 'بوصلة', 'قطب شمالي'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/thirdIntermediate/Magnetism/MagnetismSimulation').then((m) => ({
        default: m.MagnetismSimulation,
      }))
    ),
  },
  {
    id: 'physics-third-electric-current',
    subjectId: 'physics',
    gradeId: 'third-intermediate',
    chapterId: 'third-electric-current',
    chapterNumber: 3,
    curriculumTitle: 'التيار الكهربائي',
    topic: 'التيار الكهربائي وقانون أوم',
    grade: 'الصف الثالث المتوسط',
    difficulty: 'intermediate',
    titleAr: 'مختبر التيار الكهربائي وقانون أوم',
    titleEn: 'Electric Current & Ohm’s Law Lab',
    description: 'مختبر الدوائر الكهربائية لدراسة ربط المقاومات على التوالي والتوازي، قانون أوم، ومنحنى الجهد والتيار.',
    learningObjectives: [
      'فهم قانون أوم والعلاقة بين الجهد والتيار والمقاومة',
      'حساب المقاومة المكافئة لربط التوالي والتوازي',
      'تحليل توزع التيارات وفروق الجهد في الدوائر',
    ],
    requiredConcepts: ['قانون أوم', 'ربط التوالي', 'ربط التوازي', 'المقاومة المكافئة'],
    formulae: ['V = I · R', 'R_eq (توالي وتوازي)'],
    conceptTags: ['تيار', 'جهد', 'مقاومة', 'أوم', 'توالي', 'توازي'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/thirdIntermediate/ElectricCurrent/ElectricCurrentSimulation').then((m) => ({
        default: m.ElectricCurrentSimulation,
      }))
    ),
  },
  {
    id: 'physics-third-battery-emf',
    subjectId: 'physics',
    gradeId: 'third-intermediate',
    chapterId: 'third-battery-emf',
    chapterNumber: 4,
    curriculumTitle: 'البطارية والقوة الدافعة الكهربائية',
    topic: 'البطارية والقوة الدافعة الكهربائية',
    grade: 'الصف الثالث المتوسط',
    difficulty: 'intermediate',
    titleAr: 'مختبر البطارية والقوة الدافعة الكهربائية',
    titleEn: 'Battery & Electromotive Force (EMF) Lab',
    description: 'مختبر تفاعلي لدراسة القوة الدافعة الكهربائية (emf)، المقاومة الداخلية للبطارية، وفرق الجهد بين طرفي البطارية.',
    learningObjectives: [
      'التمييز بين القوة الدافعة الكهربائية وفرق جهد القطبين',
      'ملاحظة تأثير المقاومة الداخلية للبطارية على الجهد النهائي',
      'فهم حالة الدائرة المفتوحة والمغلقة وقانون الدائرة الكاملة',
    ],
    requiredConcepts: ['القوة الدافعة الكهربائية', 'المقاومة الداخلية', 'فرق جهد القطبين'],
    formulae: ['V_terminal = ε - I · r', 'I = ε / (R + r)'],
    conceptTags: ['بطارية', 'emf', 'مقاومة داخلية', 'فولطميتر'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/thirdIntermediate/BatteryEmf/BatteryEmfSimulation').then((m) => ({
        default: m.BatteryEmfSimulation,
      }))
    ),
  },
  {
    id: 'physics-third-electric-energy-power',
    subjectId: 'physics',
    gradeId: 'third-intermediate',
    chapterId: 'third-energy-power',
    chapterNumber: 5,
    curriculumTitle: 'الطاقة والقدرة الكهربائية',
    topic: 'الطاقة والقدرة الكهربائية',
    grade: 'الصف الثالث المتوسط',
    difficulty: 'intermediate',
    titleAr: 'مختبر الطاقة والقدرة الكهربائية',
    titleEn: 'Electrical Energy & Power Lab',
    description: 'مختبر استهلاك الطاقة المنزلية وحساب القدرة الكهربائية وقراءة مقياس الكيلوواط.ساعة وتدابير السلامة والتأريض.',
    learningObjectives: [
      'تطبيق قوانين القدرة الكهربائية المختلفة',
      'حساب استهلاك الطاقة بالجول وبالكيلوواط.ساعة',
      'معرفة معايير اختيار فاصم الأمان المناسب للأجهزة',
    ],
    requiredConcepts: ['القدرة الكهربائية', 'الطاقة الكهربائية', 'فاصم الأمان', 'سلك التأريض'],
    formulae: ['P = V · I', 'P = I² · R', 'E = P · t'],
    conceptTags: ['قدرة', 'طاقة', 'واط', 'كيلوواط.ساعة', 'أمان كهربائي'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/thirdIntermediate/ElectricalEnergyPower/ElectricalEnergyPowerSimulation').then((m) => ({
        default: m.ElectricalEnergyPowerSimulation,
      }))
    ),
  },
  {
    id: 'physics-third-electromagnetism',
    subjectId: 'physics',
    gradeId: 'third-intermediate',
    chapterId: 'third-electromagnetism',
    chapterNumber: 6,
    curriculumTitle: 'الكهربائية والمغناطيسية',
    topic: 'الكهربائية والمغناطيسية',
    grade: 'الصف الثالث المتوسط',
    difficulty: 'intermediate',
    titleAr: 'مختبر الكهربائية والمغناطيسية',
    titleEn: 'Electromagnetism & Oersted Lab',
    description: 'مختبر تفاعلي لاستكشاف تجربة أورستد، المجال المغناطيسي المحيط بسلك مستقيم، والمغناطيس الكهربائي وتطبيقاته.',
    learningObjectives: [
      'استيعاب تجربة أورستد لتوليد المجال المغناطيسي من التيار',
      'تطبيق قاعدة الكف اليمنى لتحديد اتجاه المجال والقطبية',
      'معرفة العوامل المؤثرة على قوة المغناطيس الكهربائي',
    ],
    requiredConcepts: ['تجربة أورستد', 'المغناطيس الكهربائي', 'قاعدة الكف اليمنى', 'القلب الحديدي'],
    formulae: ['B ∝ I', 'B ∝ N'],
    conceptTags: ['أورستد', 'كهرومغناطيسية', 'ملف', 'قلب حديدي'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/thirdIntermediate/Electromagnetism/ElectromagnetismSimulation').then((m) => ({
        default: m.ElectromagnetismSimulation,
      }))
    ),
  },
  {
    id: 'physics-third-transformer',
    subjectId: 'physics',
    gradeId: 'third-intermediate',
    chapterId: 'third-transformer',
    chapterNumber: 7,
    curriculumTitle: 'المحولة الكهربائية',
    topic: 'المحولة الكهربائية والحث المتبادل',
    grade: 'الصف الثالث المتوسط',
    difficulty: 'intermediate',
    titleAr: 'مختبر المحولة الكهربائية',
    titleEn: 'Electric Transformer Lab',
    description: 'مختبر تفاعلي لدراسة مبدأ الحث المتبادل في المحولة الكهربائية، المحولة الخافضة والرافعة، وكفاءة نقل الطاقة.',
    learningObjectives: [
      'التمييز بين المحولة الرافعة والمحولة الخافضة للفولتية',
      'حساب الفولتية والتيار في الملفين الابتدائي والثانوي',
      'فهم كفاءة المحولة وأسباب ضياع الطاقة في القلب والملفات',
    ],
    requiredConcepts: ['الحث المتبادل', 'المحولة الرافعة', 'المحولة الخافضة', 'كفاءة المحولة'],
    formulae: ['V₂ / V₁ = N₂ / N₁', 'η = (P₂ / P₁) × 100%'],
    conceptTags: ['محولة', 'حث متبادل', 'قلب حديدي', 'فولتية ثانوية'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/thirdIntermediate/Transformer/TransformerSimulation').then((m) => ({
        default: m.TransformerSimulation,
      }))
    ),
  },
  {
    id: 'physics-third-energy-sources',
    subjectId: 'physics',
    gradeId: 'third-intermediate',
    chapterId: 'third-energy-sources',
    chapterNumber: 8,
    curriculumTitle: 'تكنولوجيا مصادر الطاقة',
    topic: 'تكنولوجيا مصادر الطاقة',
    grade: 'الصف الثالث المتوسط',
    difficulty: 'intermediate',
    titleAr: 'مختبر تكنولوجيا مصادر الطاقة',
    titleEn: 'Energy Source Technology Lab',
    description: 'مستكشف تفاعلي لسلاسل تحول الطاقة، مقارنة الطاقة المتجددة (الشمسية، الرياح، المائية) والوقود الأحفوري والأثر البيئي.',
    learningObjectives: [
      'التمييز بين مصادر الطاقة المتجددة وغير المتجددة',
      'تتبع سلاسل تحولات الطاقة من المصدر الأولي إلى الكهرباء',
      'تقييم الأثر البيئي لكل مصدر والجدوى المستدامة',
    ],
    requiredConcepts: ['الطاقة المتجددة', 'الخلايا الشمسية', 'توربينات الرياح', 'الطاقة الكهرومائية'],
    conceptTags: ['طاقة متجددة', 'شمسية', 'رياح', 'وقود أحفوري', 'استدامة'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/thirdIntermediate/EnergySources/EnergySourcesSimulation').then((m) => ({
        default: m.EnergySourcesSimulation,
      }))
    ),
  },
  {
    id: 'physics-third-atmospheric-communications',
    subjectId: 'physics',
    gradeId: 'third-intermediate',
    chapterId: 'third-atmospheric-physics',
    chapterNumber: 9,
    curriculumTitle: 'فيزياء الجو وتقنية الاتصالات الحديثة',
    topic: 'فيزياء الجو وتقنيات الاتصالات الحديثة',
    grade: 'الصف الثالث المتوسط',
    difficulty: 'intermediate',
    titleAr: 'مختبر فيزياء الجو وتقنيات الاتصالات الحديثة',
    titleEn: 'Atmospheric Physics & Communications Lab',
    description: 'مختبر تفاعلي لاستكشاف طبقات الغلاف الجوي الخمس، ومسارات انتشار الموجات اللاسلكية الأرضية والسماوية والفضائية.',
    learningObjectives: [
      'التعرف على طبقات الغلاف الجوي (تروبوسفير، ستراتوسفير، ميزوسفير، ثرموسفير، إكسوسفير)',
      'فهم دور طبقة الأيونوسفير في عكس الموجات السماوية',
      'استيعاب مسارات الاتصال عبر الأقمار الصناعية بالترددات العالية',
    ],
    requiredConcepts: ['طبقات الجو', 'الأيونوسفير', 'الموجات الأرضية', 'الموجات السماوية', 'الأقمار الصناعية'],
    conceptTags: ['غلاف جوي', 'أيونوسفير', 'موجات لاسلكية', 'أقمار صناعية'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/thirdIntermediate/AtmosphericCommunications/AtmosphericCommunicationsSimulation').then((m) => ({
        default: m.AtmosphericCommunicationsSimulation,
      }))
    ),
  },

  // ==========================================
  // FOURTH SCIENTIFIC PHYSICS SIMULATIONS (9)
  // ==========================================
  {
    id: 'physics-fourth-main-parameters',
    subjectId: 'physics',
    gradeId: 'fourth-scientific',
    chapterId: 'fourth-main-parameters',
    chapterNumber: 1,
    curriculumTitle: 'معلمات رئيسة في الفيزياء',
    topic: 'الوحدات الأساسية، معادلات الأبعاد، والخطأ التجريبي',
    grade: 'الصف الرابع العلمي',
    difficulty: 'intermediate',
    titleAr: 'مختبر القياس والمعلمات الفيزيائية ومعادلات الأبعاد',
    titleEn: 'Physics Key Parameters & Error Analysis Lab',
    description: 'مختبر تفاعلي لدراسة النظام الدولي للوحدات SI، التحليل البعدي ومطابقة صيغ الأبعاد، وحساب نسبة الخطأ المطلق والنسبي والمئوي.',
    learningObjectives: [
      'التعرف على الوحدات الأساسية السبع في النظام الدولي SI',
      'تطبيق معادلات الأبعاد [M], [L], [T] والتحقق من صحة القوانين فيزيائياً',
      'حساب الخطأ المطلق والنسبي والنسبي المئوي في القياسات المعملية',
    ],
    requiredConcepts: ['الوحدات الأساسية والمشتقة', 'صيغة الأبعاد', 'الخطأ المطلق والنسبي'],
    formulae: ['Δx = |x_meas - x_true|', 'Relative Error = Δx / x_true', 'Percentage Error = Rel × 100%'],
    conceptTags: ['وحدات SI', 'معادلة الأبعاد', 'خطأ القياس'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/fourthScientific/MainParameters/MainParametersSimulation').then((m) => ({
        default: m.MainParametersSimulation,
      }))
    ),
  },
  {
    id: 'physics-fourth-mechanical-properties',
    subjectId: 'physics',
    gradeId: 'fourth-scientific',
    chapterId: 'fourth-mechanical-properties',
    chapterNumber: 2,
    curriculumTitle: 'الخصائص الميكانيكية للمادة',
    topic: 'المرونة، قانون هوك، الإجهاد، المطاوعة، ومعامل يونك',
    grade: 'الصف الرابع العلمي',
    difficulty: 'intermediate',
    titleAr: 'مختبر الخصائص الميكانيكية للمادة ومعامل يونك',
    titleEn: "Mechanical Properties & Young's Modulus Lab",
    description: 'مختبر تفاعلي لاستكشاف قانون هوك لنوابض الشد والأسلاك المعدنية، وحساب الإجهاد الطولي والمطاوعة النسبية ومعامل يونك للمواد.',
    learningObjectives: [
      'تطبيق قانون هوك F = k · Δx والتحقق من حد المرونة',
      'حساب الإجهاد الطولي (Stress = F / A) والمطاوعة الطولية (Strain = ΔL / L₀)',
      'تحديد معامل يونك Y لمواد مختلفة ومقارنة صلابتها',
    ],
    requiredConcepts: ['المرونة وحد المرونة', 'قانون هوك', 'الإجهاد والمطاوعة', 'معامل يونك'],
    formulae: ['F = k · Δx', 'Stress = F / A', 'Strain = ΔL / L₀', 'Y = (F · L₀) / (A · ΔL)'],
    conceptTags: ['مرونة', 'هوك', 'إجهاد', 'مطاوعة', 'معامل يونك'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/fourthScientific/MechanicalProperties/MechanicalPropertiesSimulation').then((m) => ({
        default: m.MechanicalPropertiesSimulation,
      }))
    ),
  },
  {
    id: 'physics-fourth-static-fluids',
    subjectId: 'physics',
    gradeId: 'fourth-scientific',
    chapterId: 'fourth-static-fluids',
    chapterNumber: 3,
    curriculumTitle: 'الموائع الساكنة',
    topic: 'ضغط السائل، مبدأ باسكال، وقاعدة أرخميدس والطفو',
    grade: 'الصف الرابع العلمي',
    difficulty: 'intermediate',
    titleAr: 'مختبر الموائع الساكنة وقاعدة أرخميدس',
    titleEn: 'Static Fluids & Archimedes Principle Lab',
    description: 'مختبر تفاعلي لدراسة الضغط الهيدروستاتيكي في السوائل، مضاعفة القوة في المكبس الهيدروليكي لباسكال، وقوة الطفو وشروط طفو وغمر الأجسام.',
    learningObjectives: [
      'حساب ضغط السائل P = ρ · g · h عند أعماق مختلفة ولسوائل متعددة',
      'استيعاب مبدأ باسكال ومضاعفة القوة في المكبس الهيدروليكي F₂ = F₁ · (A₂ / A₁)',
      'تطبيق قاعدة أرخميدس وحساب قوة الطفو وتفسير طفو أو غوص الأجسام',
    ],
    requiredConcepts: ['ضغط السائل', 'مبدأ باسكال', 'قوة الطفو', 'قاعدة أرخميدس'],
    formulae: ['P = ρ · g · h', 'F₁ / A₁ = F₂ / A₂', 'F_buoyant = ρ_fluid · g · V_sub'],
    conceptTags: ['موائع ساكنة', 'باسكال', 'أرخميدس', 'طفو', 'ضغط هيدروستاتيكي'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/fourthScientific/StaticFluids/StaticFluidsSimulation').then((m) => ({
        default: m.StaticFluidsSimulation,
      }))
    ),
  },
  {
    id: 'physics-fourth-thermal-properties',
    subjectId: 'physics',
    gradeId: 'fourth-scientific',
    chapterId: 'fourth-thermal-properties',
    chapterNumber: 4,
    curriculumTitle: 'الخصائص الحرارية للمادة',
    topic: 'السعة الحرارية، الحرارة النوعية، التحولات الطورية، والغاز المثالي',
    grade: 'الصف الرابع العلمي',
    difficulty: 'intermediate',
    titleAr: 'مختبر الخصائص الحرارية للمادة والاتزان الحراري',
    titleEn: 'Thermal Properties & Calorimetry Lab',
    description: 'مختبر تفاعلي لدراسة التبادل الحراري والحرارة النوعية بالمسعر، منحنى التسخين والحرارة الكامنة للانصهار والتبخر، وقوانين الغاز المثالي.',
    learningObjectives: [
      'تطبيق قانون التبادل الحراري لحساب درجة حرارة الاتزان في المسعر الحراري',
      'فهم ثبوت درجة الحرارة أثناء الانصهار والغليان وحساب الحرارة الكامنة (L_f, L_v)',
      'استكشاف معادلة الحالة للغاز المثالي P · V = n · R · T',
    ],
    requiredConcepts: ['الحرارة النوعية', 'المسعر الحراري', 'الحرارة الكامنة', 'الغاز المثالي'],
    formulae: ['Q = m · c · ΔT', 'Q_f = m · L_f', 'Q_v = m · L_v', 'P · V = n · R · T'],
    conceptTags: ['حرارة نوعية', 'اتزان حراري', 'حرارة كامنة', 'غاز مثالي'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/fourthScientific/ThermalProperties/ThermalPropertiesSimulation').then((m) => ({
        default: m.ThermalPropertiesSimulation,
      }))
    ),
  },
  {
    id: 'physics-fourth-light',
    subjectId: 'physics',
    gradeId: 'fourth-scientific',
    chapterId: 'fourth-light',
    chapterNumber: 5,
    curriculumTitle: 'الضوء',
    topic: 'السيل الضوئي، شدة الإضاءة، وقانون التربيع العكسي للاستضاءة',
    grade: 'الصف الرابع العلمي',
    difficulty: 'intermediate',
    titleAr: 'مختبر الضوء وشدة الاستضاءة وقانون التربيع العكسي',
    titleEn: 'Light & Photometry Lab',
    description: 'مختبر تفاعلي لاستكشاف السيل الضوئي، شدة الإضاءة بالشمعة القياسية، قانون التربيع العكسي للاستضاءة E = I / r²، ومقارنة كفاءة المصابيح.',
    learningObjectives: [
      'التمييز بين شدة الإضاءة (I) والسيل الضوئي (Φ) وشدة الاستضاءة (E)',
      'التحقق العملي من قانون التربيع العكسي: تناقص الاستضاءة مع مربع المسافة',
      'مقارنة الكفاءة الضوئية (lm/W) لمصابيح التوهج والليد والهالوجين',
    ],
    requiredConcepts: ['السيل الضوئي', 'شدة الإضاءة', 'شدة الاستضاءة', 'قانون التربيع العكسي'],
    formulae: ['Φ = 4π · I', 'E = I / r²', 'E = (I · cos θ) / r²'],
    conceptTags: ['ضوء', 'استضاءة', 'تربيع عكسي', 'كانديلا', 'لومن', 'لوكس'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/fourthScientific/Light/LightSimulation').then((m) => ({
        default: m.LightSimulation,
      }))
    ),
  },
  {
    id: 'physics-fourth-reflection-refraction',
    subjectId: 'physics',
    gradeId: 'fourth-scientific',
    chapterId: 'fourth-reflection-refraction',
    chapterNumber: 6,
    curriculumTitle: 'انعكاس وانكسار الضوء',
    topic: 'قوانين الانكسار، قانون سنيل، والانعكاس الكلي الداخلي',
    grade: 'الصف الرابع العلمي',
    difficulty: 'intermediate',
    titleAr: 'مختبر انعكاس وانكسار الضوء وقانون سنيل',
    titleEn: 'Reflection, Refraction & Snell Law Lab',
    description: 'مختبر تفاعلي لتطبيق قانون سنيل n₁·sin θ₁ = n₂·sin θ₂، وحساب سرعة الضوء في الأوساط، واكتشاف الزاوية الحرجة وتطبيقات الألياف البصرية.',
    learningObjectives: [
      'تطبيق قانون سنيل لحساب زاوية الانكسار بين أوساط ضوئية مختلفة',
      'استيعاب العلاقة بين معامل الانكسار وسرعة الضوء في الوسط v = c / n',
      'تحديد الزاوية الحرجة θ_c وشروط حدوث الانعكاس الكلي الداخلي في الألياف البصرية',
    ],
    requiredConcepts: ['معامل الانكسار', 'قانون سنيل', 'الزاوية الحرجة', 'الانعكاس الكلي الداخلي'],
    formulae: ['n₁ · sin θ₁ = n₂ · sin θ₂', 'n = c / v', 'sin θ_c = n₂ / n₁'],
    conceptTags: ['انكسار', 'سنيل', 'زاوية حرجة', 'انعكاس كلي', 'ألياف بصرية'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/fourthScientific/ReflectionRefraction/ReflectionRefractionSimulation').then((m) => ({
        default: m.ReflectionRefractionSimulation,
      }))
    ),
  },
  {
    id: 'physics-fourth-mirrors',
    subjectId: 'physics',
    gradeId: 'fourth-scientific',
    chapterId: 'fourth-mirrors',
    chapterNumber: 7,
    curriculumTitle: 'المرايا',
    topic: 'المرايا المقعرة والمحدبة والمستوية، وتكون الصور وتكبيرها',
    grade: 'الصف الرابع العلمي',
    difficulty: 'intermediate',
    titleAr: 'مختبر المرايا الكروية والمستوية وتكون الصور',
    titleEn: 'Spherical & Plane Mirrors Lab',
    description: 'مختبر بصري تفاعلي لتتبع مسارات الأشعة الخاصة في المرايا المقعرة والمحدبة، وتطبيق معادلة المرايا العامة 1/f = 1/u + 1/v وحساب التكبير.',
    learningObjectives: [
      'رسم وتتبع الأشعة الضوئية الخاصة الساقطة على المرايا الكروية',
      'تطبيق قانون المرايا العام وحساب موضع الصورة المتكونة وطولها',
      'استنتاج صفات الصورة (حقيقية/خيالية، مقلوبة/معتدلة، مكبرة/مصغرة) حسب موضع الجسم',
    ],
    requiredConcepts: ['البؤرة والبعد البؤري', 'مركز التكور', 'معادلة المرايا', 'التكبير'],
    formulae: ['1 / f = 1 / u + 1 / v', 'M = -v / u = h_i / h_o', 'R = 2 · f'],
    conceptTags: ['مرايا', 'مرآة مقعرة', 'مرآة محدبة', 'بؤرة', 'تكبير'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/fourthScientific/Mirrors/MirrorsSimulation').then((m) => ({
        default: m.MirrorsSimulation,
      }))
    ),
  },
  {
    id: 'physics-fourth-thin-lenses',
    subjectId: 'physics',
    gradeId: 'fourth-scientific',
    chapterId: 'fourth-thin-lenses',
    chapterNumber: 8,
    curriculumTitle: 'العدسات الرقيقة',
    topic: 'العدسات المحدبة والمقعرة، قانون العدسات، والقدرة بالديوبتر',
    grade: 'الصف الرابع العلمي',
    difficulty: 'intermediate',
    titleAr: 'مختبر العدسات الرقيقة والمنظومات البصرية',
    titleEn: 'Thin Lenses & Optical Systems Lab',
    description: 'مختبر بصري تفاعلي لاستكشاف العدسات المحدبة المجمعة والمقعرة المفرقة، تطبيق قانون العدسات 1/f = 1/u + 1/v، وحساب القدرة بالديوبتر.',
    learningObjectives: [
      'تتبع مسارات الأشعة البصرية عبر المركز البصري والبؤرة في العدسات المحدبة والمقعرة',
      'تطبيق معادلة العدسات العامة وحساب موضع وتكبير الصورة الناتجة',
      'حساب قدرة العدسة بالديوبتر P = 1 / f(m) وتطبيقات تصحيح عيوب البصر',
    ],
    requiredConcepts: ['العدسة المحدبة والمقعرة', 'قانون العدسات', 'التكبير', 'قدرة العدسة بالديوبتر'],
    formulae: ['1 / f = 1 / u + 1 / v', 'M = -v / u = h_i / h_o', 'P = 1 / f(m) (Diopter)'],
    conceptTags: ['عدسات رقيقة', 'عدسة محدبة', 'عدسة مقعرة', 'ديوبتر', 'تكبير'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/fourthScientific/ThinLenses/ThinLensesSimulation').then((m) => ({
        default: m.ThinLensesSimulation,
      }))
    ),
  },
  {
    id: 'physics-fourth-electrostatics',
    subjectId: 'physics',
    gradeId: 'fourth-scientific',
    chapterId: 'fourth-electrostatics',
    chapterNumber: 9,
    curriculumTitle: 'الكهرباء الساكنة',
    topic: 'المجال الكهربائي المنتظم، الجهد الكهربائي، وتأثير المجال على حركة الشحنات',
    grade: 'الصف الرابع العلمي',
    difficulty: 'intermediate',
    titleAr: 'مختبر المجال والجهد الكهربائي وانحراف الشحنات',
    titleEn: 'Electric Field & Charged Particle Deflection Lab',
    description: 'مختبر تفاعلي لدراسة شدة المجال الكهربائي المنتظم بين لوحين متوازيين E = ΔV / d، انحراف الجسيمات المشحونة، وتوزيع الشحنات على الرؤوس المدببة.',
    learningObjectives: [
      'حساب شدة المجال الكهربائي المنتظم بين لوحين متوازيين E = ΔV / d',
      'استكشاف مسار القذف القطعي المكافئ للإلكترونات والبروتونات داخل المجال المنتظم',
      'استيعاب مفهوم سطوح تساوي الجهد وتوزيع الشحنات على سطوح الموصلات المعزولة',
    ],
    requiredConcepts: ['المجال الكهربائي المنتظم', 'فرق الجهد الكهربائي', 'انحراف الشحنات', 'سطوح تساوي الجهد'],
    formulae: ['E = ΔV / d', 'F = q · E', 'a = (q · E) / m', 'y = ½ · a · t²'],
    conceptTags: ['مجال كهربائي', 'جهد كهربائي', 'ألواح متوازية', 'انحراف شحنات'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/fourthScientific/Electrostatics/ElectrostaticsSimulation').then((m) => ({
        default: m.ElectrostaticsSimulation,
      }))
    ),
  },

  // ==========================================
  // ADVANCED SIMULATIONS PRESERVED FROM V4.1
  // ==========================================
  {
    id: 'physics-newton-second-law',
    subjectId: 'physics',
    gradeId: 'third-intermediate',
    topic: 'قوانين الحركة والتحريك (الميكانيكا)',
    grade: 'الصف الثالث المتوسط والصف الخامس العلمي',
    difficulty: 'intermediate',
    titleAr: 'قانون نيوتن الثاني في الحركة 3D',
    titleEn: "Newton's Second Law 3D Simulation",
    description: 'تجربة بصرية تفاعلية ثلاثية الأبعاد لدراسة العلاقة بين القوة والكتلة والتعجيل والتكامل الزمني الحركي.',
    learningObjectives: [
      'فهم التناسب الطردي بين القوة والتعجيل',
      'فهم التناسب العكسي بين الكتلة والتعجيل',
      'تطبيق معادلات الحركة الخطية بتعجيل منتظم',
    ],
    requiredConcepts: ['القوة المحصلة', 'الكتلة والقصور الذاتي', 'التعجيل الخطي'],
    mode: '3d',
    component: React.lazy(() =>
      import('../physics/NewtonSecondLaw/NewtonSecondLawSimulation').then((m) => ({
        default: m.NewtonSecondLawSimulation,
      }))
    ),
  },
  {
    id: 'math-quadratic-graph',
    subjectId: 'mathematics',
    topic: 'الجبر والدوال الحقيقية',
    grade: 'الصف الثالث المتوسط والصف الرابع العلمي',
    difficulty: 'intermediate',
    titleAr: 'منحنى الدالة التربيعية والمميز',
    titleEn: 'Quadratic Functions & Discriminant Grapher',
    description: 'مختبر رياضي تفاعلي لتحليل القطع المكافئ، إحداثيات الرأس، محور التناظر، وجذور المعادلة بالدستور.',
    learningObjectives: [
      'دراسة اتجاه وسلوك الدالة التربيعية حسب إشارة a',
      'حساب وتحليل المميز العام Δ',
      'استنتاج إحداثيات الرأس ومحور التناظر بيانيا',
    ],
    requiredConcepts: ['الدالة التربيعية', 'المميز العام', 'رأس القطع المكافئ'],
    mode: '2d',
    component: React.lazy(() =>
      import('../mathematics/QuadraticGraph/QuadraticGraphSimulation').then((m) => ({
        default: m.QuadraticGraphSimulation,
      }))
    ),
  },
  {
    id: 'chemistry-molecule-viewer',
    subjectId: 'chemistry',
    topic: 'الروابط الكيميائية والتناسق الفراغي',
    grade: 'الصف الثالث المتوسط والصف الخامس العلمي',
    difficulty: 'intermediate',
    titleAr: 'عارض الجزيئات والروابط 3D',
    titleEn: '3D Molecular Geometry & Hybridization Viewer',
    description: 'مختبر كيميائي ثلاثي الأبعاد لاستكشاف نظرية تنافر أزواج الإلكترونات (VSEPR) والتهجين وزوايا الروابط.',
    learningObjectives: [
      'استيعاب التوزيع الفراغي للجزيئات الشائعة (الماء، الميثان، ثنائي أكسيد الكربون، الأمونيا، الإيثيلين)',
      'الربط بين نوع التهجين وشكل الجزيء الهندسي والزاوية بين الروابط',
      'تحديد قطبية الجزيئات',
    ],
    requiredConcepts: ['الروابط التساهمية', 'التهجين المداري', 'الأزواج الإلكترونية الحرة والرابطة'],
    mode: '3d',
    component: React.lazy(() =>
      import('../chemistry/MoleculeViewer/MoleculeViewerSimulation').then((m) => ({
        default: m.MoleculeViewerSimulation,
      }))
    ),
  },
];

export function getSimulationsForSubject(
  subjectId: 'physics' | 'mathematics' | 'chemistry',
  gradeId?: string
): SimulationRegistryEntry[] {
  let sims = SIMULATION_REGISTRY.filter((sim) => sim.subjectId === subjectId);
  if (gradeId) {
    sims = sims.filter((sim) => sim.gradeId === gradeId);
  }
  return sims;
}

export function getSimulationById(simulationId: string): SimulationRegistryEntry | undefined {
  return SIMULATION_REGISTRY.find((sim) => sim.id === simulationId);
}
