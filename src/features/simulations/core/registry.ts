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
  // FIFTH SCIENTIFIC (10 Primary Simulations)
  // ==========================================
  {
    id: 'physics-fifth-vectors',
    subjectId: 'physics',
    gradeId: 'fifth-scientific',
    chapterId: 'fifth-vectors',
    chapterNumber: 1,
    curriculumTitle: 'المتجهات',
    topic: 'جمع وطرح المتجهات، تحليل المتجهات، والضرب القياسي والاتجاهي',
    grade: 'الصف الخامس العلمي',
    difficulty: 'advanced',
    titleAr: 'مختبر المتجهات والعمليات الاتجاهية',
    titleEn: 'Vectors & Vector Operations Lab',
    description: 'مختبر متقدم لدراسة تحليل المتجهات في المستوي الديكارتي، حساب المحصلة جبرياً وهندسياً، والضرب النقطي (القياسي) والضرب الاتجاهي.',
    learningObjectives: [
      'تحليل المتجه إلى مركبتين متعامدتين Ax = A cos θ و Ay = A sin θ',
      'حساب محصلة متجهين أو أكثر بالجمع الجبري للمركبات R = √(Rx² + Ry²)',
      'تطبيق الضرب القياسي A · B = |A||B| cos θ والضرب الاتجاهي |A × B| = |A||B| sin θ',
    ],
    requiredConcepts: ['المتجهات والكميات القياسية', 'تحليل المتجهات', 'محصلة المتجهات', 'الضرب القياسي والاتجاهي'],
    formulae: ['Ax = A cos θ', 'Ay = A sin θ', 'R = √(Rx² + Ry²)', 'A · B = |A||B| cos θ', '|A × B| = |A||B| sin θ'],
    conceptTags: ['متجهات', 'تحليل مركبات', 'محصلة', 'ضرب نقطي', 'ضرب اتجاهي'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/fifthScientific/Vectors/VectorsSimulation').then((m) => ({
        default: m.VectorsSimulation,
      }))
    ),
  },
  {
    id: 'physics-fifth-linear-motion',
    subjectId: 'physics',
    gradeId: 'fifth-scientific',
    chapterId: 'fifth-linear-motion',
    chapterNumber: 2,
    curriculumTitle: 'الحركة الخطية',
    topic: 'معادلات الحركة بتعجيل منتظم، السقوط الحر، وحركة المقذوفات',
    grade: 'الصف الخامس العلمي',
    difficulty: 'advanced',
    titleAr: 'مختبر الحركة الخطية والمقذوفات في بعدين',
    titleEn: 'Linear Motion & Projectiles Lab',
    description: 'مختبر تفاعلي لتطبيق معادلات الحركة الخطية بتعجيل منتظم، السقوط الحر تحت تأثير الجاذبية، وحركة المقذوفات في بعدين ورسم المخططات البيانية (x-t, v-t).',
    learningObjectives: [
      'تطبيق معادلات الحركة الأربعة بتعجيل منتظم v = v0 + at و Δx = v0 t + ½at²',
      'دراسة حركة السقوط الحر للأجسام بتعجيل الجاذبية الأرضية g = 9.8 m/s²',
      'تحليل حركة المقذوفات بزاوية وحساب المدى الأفقي وأقصى ارتفاع وزمن التحليق',
    ],
    requiredConcepts: ['الإزاحة والسرعة والتعجيل', 'التعجيل المنتظم', 'السقوط الحر', 'المقذوفات في بعدين'],
    formulae: ['v = v0 + at', 'Δx = v0 t + ½at²', 'v² = v0² + 2aΔx', 'R = (v0² sin 2θ) / g', 'H = (v0 sin θ)² / 2g'],
    conceptTags: ['حركة خطية', 'تعجيل منتظم', 'سقوط حر', 'مقذوفات', 'مخططات بيانية'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/fifthScientific/LinearMotion/LinearMotionSimulation').then((m) => ({
        default: m.LinearMotionSimulation,
      }))
    ),
  },
  {
    id: 'physics-fifth-laws-of-motion',
    subjectId: 'physics',
    gradeId: 'fifth-scientific',
    chapterId: 'fifth-laws-of-motion',
    chapterNumber: 3,
    curriculumTitle: 'قوانين الحركة',
    topic: 'تطبيقات قوانين نيوتن، الاحتكاك السكوني والانزلاقي، ومخطط الجسم الحر على السطح المائل',
    grade: 'الصف الخامس العلمي',
    difficulty: 'advanced',
    titleAr: 'مختبر قوانين الحركة وقوى الاحتكاك والسطح المائل',
    titleEn: "Newton's Laws & Friction on Inclined Plane Lab",
    description: 'مختبر متقدم لمخطط الجسم الحر (Free Body Diagram)، حساب القوة العمودية وقوى الاحتكاك السكوني والحركي وحركة الكتل على السطح المائل.',
    learningObjectives: [
      'رسم وتحليل مخطط الجسم الحر وتحديد مركبات الوزن موازية وعمودية على السطح',
      'التمييز بين قوة الاحتكاك السكوني العظمى fs = μs N والاحتكاك الحركي fk = μk N',
      'حساب التعجيل الصافي للكتلة بتطبيق قانون نيوتن الثاني ΣF = m · a',
    ],
    requiredConcepts: ['قانون نيوتن الثاني', 'الاحتكاك السكوني والحركي', 'السطح المائل', 'مخطط الجسم الحر'],
    formulae: ['ΣF = m · a', 'N = m · g · cos θ', 'Fg_parallel = m · g · sin θ', 'fs ≤ μs · N', 'fk = μk · N'],
    conceptTags: ['نيوتن', 'احتكاك', 'سطح مائل', 'قوة عمودية', 'مخطط حر'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/fifthScientific/LawsOfMotion/LawsOfMotionSimulation').then((m) => ({
        default: m.LawsOfMotionSimulation,
      }))
    ),
  },
  {
    id: 'physics-fifth-equilibrium-torques',
    subjectId: 'physics',
    gradeId: 'fifth-scientific',
    chapterId: 'fifth-equilibrium-torques',
    chapterNumber: 4,
    curriculumTitle: 'الاتزان والعزوم',
    topic: 'شرطا الاتزان السكوني، عزم القوة τ = r F sinθ، وذراع الرافعة والازدواج',
    grade: 'الصف الخامس العلمي',
    difficulty: 'advanced',
    titleAr: 'مختبر الاتزان والعزوم والازدواج',
    titleEn: 'Mechanical Equilibrium & Torques Lab',
    description: 'مختبر تفاعلي لاستكشاف شرطي الاتزان الانتقالي (ΣF = 0) والدوراني (Στ = 0)، حساب عزم القوة حول نقطة الارتكاز، ودراسة الازدواج.',
    learningObjectives: [
      'التحقق من شرطي الاتزان السكوني الميكانيكي (ΣF = 0 و Στ = 0)',
      'حساب عزم القوة τ = r F sin θ وتحديد اتجاه الدوران (عكس عقارب الساعة موجب)',
      'فهم مفهوم الازدواج (Couple) وعزم الازدواج الناتج عن قوتين متساويتين ومتعاكستين',
    ],
    requiredConcepts: ['الاتزان الانتقالي', 'الاتزان الدوراني', 'عزم القوة', 'ذراع القوة', 'الازدواج'],
    formulae: ['ΣF = 0', 'Στ = 0', 'τ = r · F · sin θ', 'τ_couple = F · d'],
    conceptTags: ['اتزان', 'عزوم', 'نقطة ارتكاز', 'ازدواج', 'ذراع رافعة'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/fifthScientific/EquilibriumTorques/EquilibriumTorquesSimulation').then((m) => ({
        default: m.EquilibriumTorquesSimulation,
      }))
    ),
  },
  {
    id: 'physics-fifth-work-energy-momentum',
    subjectId: 'physics',
    gradeId: 'fifth-scientific',
    chapterId: 'fifth-work-power-energy-momentum',
    chapterNumber: 5,
    curriculumTitle: 'الشغل والقدرة والطاقة والزخم',
    topic: 'مبرهنة الشغل والطاقة، الزخم الخطي والدفع، والتصادمات المرنة وغير المرنة',
    grade: 'الصف الخامس العلمي',
    difficulty: 'advanced',
    titleAr: 'مختبر الشغل والطاقة والزخم والتصادمات',
    titleEn: 'Work, Energy, Momentum & Collisions Lab',
    description: 'مختبر فيزيائي لدراسة مبرهنة الشغل والطاقة W = ΔKE، الدفع والزخم الخطي J = Δp، ومحاكاة التصادمات المرنة وغير المرنة في بعد واحد.',
    learningObjectives: [
      'تطبيق مبرهنة الشغل والطاقة W_net = ΔKE لحساب التغير في السرعة',
      'استكشاف علاقة الدفع بالتغير في الزخم الخطي J = F · Δt = Δp',
      'التحقق من حفظ الزخم الخطي ومقارنة فقدان الطاقة الحركية في التصادم غير المرن',
    ],
    requiredConcepts: ['الشغل الميكانيكي', 'مبرهنة الشغل والطاقة', 'الزخم الخطي', 'الدفع', 'التصادم المرن وغير المرن'],
    formulae: ['W = F · d · cos θ', 'W_net = ΔKE', 'p = m · v', 'J = F · Δt = Δp', 'Σp_before = Σp_after'],
    conceptTags: ['شغل', 'طاقة حركية', 'زخم', 'دفع', 'تصادمات', 'حفظ زخم'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/fifthScientific/WorkEnergyMomentum/WorkEnergyMomentumSimulation').then((m) => ({
        default: m.WorkEnergyMomentumSimulation,
      }))
    ),
  },
  {
    id: 'physics-fifth-thermodynamics',
    subjectId: 'physics',
    gradeId: 'fifth-scientific',
    chapterId: 'fifth-thermodynamics',
    chapterNumber: 6,
    curriculumTitle: 'الديناميكا الحرارية',
    topic: 'القانون الأول في الثرموداينمك، العمليات الغازية في مخطط P-V، وكفاءة المحركات الحرارية',
    grade: 'الصف الخامس العلمي',
    difficulty: 'advanced',
    titleAr: 'مختبر الديناميكا الحرارية ومخطط P-V',
    titleEn: 'Thermodynamics & PV Diagram Lab',
    description: 'مختبر تفاعلي لتطبيق القانون الأول للثرموداينمك ΔU = Q - W، استكشاف العمليات الآيزوباريكية والآيزوكوركية والآيزوثيرمية والأديباتية، وحساب كفاءة كارنو.',
    learningObjectives: [
      'تطبيق القانون الأول في الديناميكا الحرارية مع مراعاة الاصطلاح الإشاري للشغل والحرارة',
      'حساب الشغل الميكانيكي من المساحة تحت المنحنى في مخطط الضغط-الحجم P-V',
      'حساب أقصى كفاءة نظرية للمحرك الحراري (كفاءة كارنو) η = 1 - (Tc / Th)',
    ],
    requiredConcepts: ['الطاقة الداخلية', 'القانون الأول في الثرموداينمك', 'مخطط P-V', 'العمليات الغازية', 'كفاءة كارنو'],
    formulae: ['ΔU = Q - W', 'W = P · ΔV (آيزوباريك)', 'W = nRT ln(V2/V1) (آيزوثيرمال)', 'η = 1 - (Tc / Th)'],
    conceptTags: ['ديناميكا حرارية', 'طاقة داخلية', 'مخطط PV', 'محرك حراري', 'كارنو', 'أديباتي'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/fifthScientific/Thermodynamics/ThermodynamicsSimulation').then((m) => ({
        default: m.ThermodynamicsSimulation,
      }))
    ),
  },
  {
    id: 'physics-fifth-circular-rotational-motion',
    subjectId: 'physics',
    gradeId: 'fifth-scientific',
    chapterId: 'fifth-circular-rotational-motion',
    chapterNumber: 7,
    curriculumTitle: 'الحركة الدائرية والدورانية',
    topic: 'السرعة المماسية، التعجيل المركزي، القوة المركزية، وعزم القصور الذاتي والزخم الزاوي',
    grade: 'الصف الخامس العلمي',
    difficulty: 'advanced',
    titleAr: 'مختبر الحركة الدائرية والدورانية',
    titleEn: 'Circular & Rotational Motion Lab',
    description: 'مختبر متقدم لدراسة الحركة الدائرية المنتظمة، متجهات السرعة المماسية والقوة المركزية، وعزم القصور الذاتي للأجسام الجاسئة والزخم الزاوي.',
    learningObjectives: [
      'الربط بين الكميات الخطية والزاوية: v = ω · r و ac = ω² · r',
      'استيعاب اتجاه القوة المركزية نحو مركز الدوران ودورها في المنعطفات',
      'حساب عزم القصور الذاتي I للأشكال الهندسية وتطبيق معادلة التحريك الدوراني τ = I · α',
    ],
    requiredConcepts: ['السرعة الزاوية', 'التعجيل المركزي', 'القوة المركزية', 'عزم القصور الذاتي', 'الزخم الزاوي'],
    formulae: ['v = ω · r', 'ac = v² / r = ω² · r', 'Fc = m · v² / r', 'τ = I · α', 'L = I · ω'],
    conceptTags: ['حركة دائرية', 'سرعة مماسية', 'قوة مركزية', 'قصور ذاتي', 'زخم زاوي'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/fifthScientific/CircularRotationalMotion/CircularRotationalMotionSimulation').then((m) => ({
        default: m.CircularRotationalMotionSimulation,
      }))
    ),
  },
  {
    id: 'physics-fifth-oscillations-waves-sound',
    subjectId: 'physics',
    gradeId: 'fifth-scientific',
    chapterId: 'fifth-vibrational-wave-sound',
    chapterNumber: 8,
    curriculumTitle: 'الحركة الاهتزازية والموجية والصوت',
    topic: 'الحركة التوافقية البسيطة، البندول والنابض، الموجات الموقوفة، وتأثير دوبلر الصوتي',
    grade: 'الصف الخامس العلمي',
    difficulty: 'advanced',
    titleAr: 'مختبر الاهتزازات والأمواج والصوت وظاهرة دوبلر',
    titleEn: 'Oscillations, Waves, Sound & Doppler Lab',
    description: 'مختبر تفاعلي شامل لدراسة زمن دورة النابض والبندول البسيط، خصائص انتشار الأمواج والموجات الموقوفة والعقد والبطون، وظاهرة دوبلر الصوتية.',
    learningObjectives: [
      'حساب زمن دورة النابض T = 2π√(m/k) والبندول البسيط T = 2π√(L/g)',
      'استكشاف معادلة سرعة الموجة v = f · λ والشروط الحدية للموجات الموقوفة',
      'فهم الانزياح الترددي في ظاهرة دوبلر الصوتية عند اقتراب أو ابتعاد المصدر والمراقب',
    ],
    requiredConcepts: ['الحركة التوافقية البسيطة', 'البندول البسيط', 'الموجات المستعرضة', 'الموجات الموقوفة', 'تأثير دوبلر'],
    formulae: ['T = 2π √(m / k)', 'T = 2π √(L / g)', 'v = f · λ', "f' = f (v ± vo) / (v ∓ vs)"],
    conceptTags: ['اهتزاز', 'بندول', 'نابض', 'موجات موقوفة', 'عقد وبطون', 'دوبلر', 'صوت'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/fifthScientific/OscillationsWavesSound/OscillationsWavesSoundSimulation').then((m) => ({
        default: m.OscillationsWavesSoundSimulation,
      }))
    ),
  },
  {
    id: 'physics-fifth-electric-current',
    subjectId: 'physics',
    gradeId: 'fifth-scientific',
    chapterId: 'fifth-electric-current',
    chapterNumber: 9,
    curriculumTitle: 'التيار الكهربائي',
    topic: 'المقاومة النوعية وأبعاد السلك، قاعدتا كيرشوف للتيار والجهد، وقنطرة وتستون',
    grade: 'الصف الخامس العلمي',
    difficulty: 'advanced',
    titleAr: 'مختبر دوائر التيار وقوانين كيرشوف وقنطرة وتستون',
    titleEn: "Electric Circuits, Kirchhoff's Laws & Wheatstone Bridge Lab",
    description: 'مختبر كهربائي متقدم لدراسة المقاومة النوعية R = ρL/A، حل الدوائر متعددة الحلقات بقاعدتي كيرشوف (KCL & KVL)، وقياس المقاومات بقنطرة وتستون.',
    learningObjectives: [
      'استيعاب اعتماد مقاومة السلك على طوله ومساحة مقطعه والمقاومة النوعية للمادة',
      'تطبيق قاعدة كيرشوف الأولى (حفظ الشحنة) وقاعدة كيرشوف الثانية (حفظ الطاقة)',
      'استخدام قنطرة وتستون لإيجاد قيمة مقاومة مجهولة عند تصفير تيار الجلفانومتر',
    ],
    requiredConcepts: ['المقاومة النوعية', 'قاعدة كيرشوف الأولى (KCL)', 'قاعدة كيرشوف الثانية (KVL)', 'قنطرة وتستون'],
    formulae: ['R = ρ · (L / A)', 'ΣI_in = ΣI_out', 'ΣV = 0 (حول مسار مغلق)', 'R1 / R2 = R3 / Rx'],
    conceptTags: ['تيار كهربائي', 'مقاومة نوعية', 'كيرشوف', 'حلقات', 'قنطرة وتستون', 'جلفانومتر'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/fifthScientific/ElectricCurrent/ElectricCurrentSimulation').then((m) => ({
        default: m.ElectricCurrentSimulation,
      }))
    ),
  },
  {
    id: 'physics-fifth-magnetism',
    subjectId: 'physics',
    gradeId: 'fifth-scientific',
    chapterId: 'fifth-magnetism',
    chapterNumber: 10,
    curriculumTitle: 'المغناطيسية',
    topic: 'قوة لورنتز على الشحنة المتحركة، القوة على سلك حامل للتيار، والقوة المتبادلة بين تيارين',
    grade: 'الصف الخامس العلمي',
    difficulty: 'advanced',
    titleAr: 'مختبر المغناطيسية وقوة لورنتز والقوى الكهرومغناطيسية',
    titleEn: 'Magnetism, Lorentz Force & Ampere Law Lab',
    description: 'مختبر تفاعلي لاستكشاف القوة المغناطيسية المؤثرة في الشحنات المتحركة F = qvB sinθ والمسار الدائري، القوة على موصل مستقيم، والقوة المتبادلة بين تيارين.',
    learningObjectives: [
      'تطبيق قاعدة الكف اليمنى لتحديد اتجاه القوة المغناطيسية على الشحنات الموجبة والسالبة',
      'حساب نصف قطر المسار الدائري للشحنة داخل المجال المغناطيسي المنتظم r = mv / qB',
      'استكشاف القوة المغناطيسية على سلك يحمل تياراً والتجاذب والتنافر بين التيارات المتوازية',
    ],
    requiredConcepts: ['قوة لورنتز المغناطيسية', 'قاعدة الكف اليمنى', 'المسار الدائري للشحنة', 'القوة المتبادلة بين تيارين'],
    formulae: ['F_B = q · v · B · sin θ', 'r = (m · v) / (|q| · B)', 'F = I · L · B · sin θ', 'F/L = (μ0 · I1 · I2) / (2π · d)'],
    conceptTags: ['مغناطيسية', 'لورنتز', 'شحنة متحركة', 'كف يمنى', 'تيارات متوازية', 'أمبير'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/fifthScientific/Magnetism/MagnetismSimulation').then((m) => ({
        default: m.MagnetismSimulation,
      }))
    ),
  },

  // ==========================================
  // SIXTH SCIENTIFIC (8 Primary Simulations)
  // ==========================================
  {
    id: 'physics-sixth-capacitors',
    subjectId: 'physics',
    gradeId: 'sixth-scientific',
    chapterId: 'sixth-capacitors',
    chapterNumber: 1,
    curriculumTitle: 'المتسعات',
    topic: 'المتسعة ذات الصفيحتين المتوازيتين، العازل الكهربائي، وربط التوالي والتوازي والطاقة المختزنة',
    grade: 'الصف السادس العلمي',
    difficulty: 'advanced',
    titleAr: 'مختبر المتسعات والعوازل ودوائر الربط',
    titleEn: 'Capacitors, Dielectrics & Circuit Combinations Lab',
    description: 'مختبر تفاعلي شامل لدراسة العوامل المؤثرة في سعة المتسعة (المساحة والبعد ونوع العازل)، حساب المجال الكهربائي، دوائر ربط المتسعات على التوالي والتوازي، وحساب الطاقة الكامنة الكهربائية المختزنة U = ½C(ΔV)²',
    learningObjectives: [
      'حساب سعة المتسعة ذات الصفيحتين المتوازيتين C = ε₀ A / d وتأثير إدخال العازل C_k = k C₀',
      'فهم سلوك الشحنة وفرق الجهد عند إدخال عازل (المجموعة مفصولة مقابل متصلة بالمصدر)',
      'حساب السعة المكافئة في ربط التوازي (Ceq = ΣCi) وربط التوالي (1/Ceq = Σ(1/Ci))',
      'حساب الطاقة المختزنة في المجال الكهربائي للمتسعة U = ½Q(ΔV) = ½C(ΔV)² = Q²/(2C)',
    ],
    requiredConcepts: ['سعة المتسعة', 'ثابت العزل الكهربائي', 'قوة العزل الكهربائي', 'ربط التوالي والتوازي', 'الطاقة المختزنة'],
    formulae: ['C = Q / ΔV', 'C = ε₀ · (A / d)', 'C_k = k · C₀', 'E_k = E / k', 'U = ½ · C · (ΔV)²', 'C_eq_par = C1 + C2', '1/C_eq_ser = 1/C1 + 1/C2'],
    conceptTags: ['متسعات', 'صفيحتان متوازيتان', 'عازل', 'توالي وتوازي', 'طاقة مختزنة', 'سعة مكافئة'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/sixthScientific/Capacitors/CapacitorsSimulation').then((m) => ({
        default: m.CapacitorsSimulation,
      }))
    ),
  },
  {
    id: 'physics-sixth-electromagnetic-induction',
    subjectId: 'physics',
    gradeId: 'sixth-scientific',
    chapterId: 'sixth-electromagnetic-induction',
    chapterNumber: 2,
    curriculumTitle: 'الحث الكهرومغناطيسي',
    topic: 'قانون فرداي، قانون لنز، القوة الدافعة الحركية، الحث الذاتي، والحث المتبادل',
    grade: 'الصف السادس العلمي',
    difficulty: 'advanced',
    titleAr: 'مختبر الحث الكهرومغناطيسي وقانوني فرداي ولنز',
    titleEn: 'Electromagnetic Induction & Faraday-Lenz Lab',
    description: 'مختبر متقدم لمحاكاة الفيض المغناطيسي Φ_B = B A cos θ، قانون فرداي في الحث، قانون لنز لتحديد اتجاه التيار المحتث، القوة الدافعة الحركية (Motional EMF) لساق موصلة، والحث الذاتي في الملفات.',
    learningObjectives: [
      'حساب الفيض المغناطيسي وتغيره عبر مساحة الحلقة أو الملف',
      'تطبيق قانون فرداي ε_ind = -N (ΔΦ_B / Δt) وحساب القوة الدافعة الكهربائية المحتثة',
      'تطبيق قانون لنز لتحديد القطبية المعاكسة للمسبب الذي ولد التيار المحتث',
      'حساب القوة الدافعة الكهربائية الحركية لساق تنزلق على سكة ε_mot = B L v',
      'استكشاف ظاهرة الحث الذاتي ومعامل الحث الذاتي L = -ε / (ΔI/Δt) والطاقة المغناطيسية المختزنة',
    ],
    requiredConcepts: ['الفيض المغناطيسي', 'قانون فرداي', 'قانون لنز', 'القوة الدافعة الحركية', 'الحث الذاتي والمتبادل'],
    formulae: ['Φ_B = B · A · cos θ', 'ε_ind = -N · (ΔΦ_B / Δt)', 'ε_mot = B · L · v', 'ε_L = -L · (ΔI / Δt)', 'U_B = ½ · L · I²'],
    conceptTags: ['حث كهرومغناطيسي', 'فرداي', 'لنز', 'ساق موصلة', 'حث ذاتي', 'فيض مغناطيسي'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/sixthScientific/ElectromagneticInduction/ElectromagneticInductionSimulation').then((m) => ({
        default: m.ElectromagneticInductionSimulation,
      }))
    ),
  },
  {
    id: 'physics-sixth-alternating-current',
    subjectId: 'physics',
    gradeId: 'sixth-scientific',
    chapterId: 'sixth-alternating-current',
    chapterNumber: 3,
    curriculumTitle: 'التيار المتناوب',
    topic: 'دوائر التيار المتناوب (R-L-C)، الممانعة الكلية، الرنين الكهربائي، ومخطط الطور للجهد والتيار',
    grade: 'الصف السادس العلمي',
    difficulty: 'advanced',
    titleAr: 'مختبر دوائر التيار المتناوب والرنين الكهربائي (R-L-C)',
    titleEn: 'AC Circuits, Impedance Phasors & Resonance Lab',
    description: 'مختبر كهربائي متقدم لدراسة دوائر التيار المتناوب المتوالية والمتوازية، الرادة الحثية والرادة السعوية، مخطط المتجهات الطورية للجهد والممانعة، وحالة الرنين الكهربائي وعامل النوعية QF.',
    learningObjectives: [
      'حساب الرادة الحثية XL = 2πfL والرادة السعوية XC = 1/(2πfC) واعتمادهما على التردد',
      'حساب الممانعة الكلية للدائرة Z = √(R² + (XL - XC)²) وزاوية فرق الطور φ',
      'استكشاف خواص الدائرة (حثية أو سعوية أو أومية مقاومة صرفة)',
      'التحقق من حالة الرنين الكهربائي عند XL = XC وتردد الرنين fr = 1 / (2π√(LC))',
      'حساب عامل القدرة pf = cos φ والقدرة الحقيقية والظاهرية',
    ],
    requiredConcepts: ['المتجه الطوري', 'الرادة الحثية والسعوية', 'الممانعة الكلية', 'الرنين الكهربائي', 'عامل القدرة وعامل النوعية'],
    formulae: ['XL = 2π · f · L', 'XC = 1 / (2π · f · C)', 'Z = √(R² + (XL - XC)²)', 'tan φ = (XL - XC) / R', 'fr = 1 / (2π · √(L · C))', 'pf = cos φ = R / Z'],
    conceptTags: ['تيار متناوب', 'رادة حثية', 'رادة سعوية', 'ممانعة', 'رنين كهربائي', 'طور'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/sixthScientific/AlternatingCurrent/AlternatingCurrentSimulation').then((m) => ({
        default: m.AlternatingCurrentSimulation,
      }))
    ),
  },
  {
    id: 'physics-sixth-physical-optics',
    subjectId: 'physics',
    gradeId: 'sixth-scientific',
    chapterId: 'sixth-physical-optics',
    chapterNumber: 4,
    curriculumTitle: 'البصريات الفيزيائية',
    topic: 'تداخل الضوء، تجربة شقي يونك، حيود الضوء ومحزز الحيود، والاستقطاب بقانون بروستر',
    grade: 'الصف السادس العلمي',
    difficulty: 'advanced',
    titleAr: 'مختبر البصريات الفيزيائية وتجربة يونك والحيود',
    titleEn: 'Physical Optics, Young Double Slit & Diffraction Lab',
    description: 'مختبر بصري شامل لدراسة التداخل البناء والإتلاف في الضوء، قياس الطول الموجي بتجربة يونك y = (m λ L)/d، الحيود في الشق المفرد ومحزز الحيود، والاستقطاب بالانعكاس بزاوية بروستر.',
    learningObjectives: [
      'التمييز بين التداخل البناء (فرق المسار البصري δ = m λ) والتداخل الإتلافي (δ = (m + ½)λ)',
      'حساب الطول الموجي للضوء والفاصلة بين الأهداب المتتالية Δy = (λ L) / d في تجربة يونك',
      'استكشاف ظاهرة الحيود من شق مفرد وتأثير عرض الشق على اتساع الهدب المركزي المضيء',
      'تطبيق معادلة محزز الحيود d sin θ = m λ لحساب زوايا التفريق الطيفي',
      'فهم الاستقطاب بالانعكاس وزاوية بروستر tan θp = n',
    ],
    requiredConcepts: ['التداخل البناء والإتلافي', 'فرق المسار البصري', 'تجربة شقي يونك', 'محزز الحيود', 'الاستقطاب وزاوية بروستر'],
    formulae: ['Δy = (λ · L) / d', 'y = (m · λ · L) / d', 'd · sin θ = m · λ', 'tan θp = n'],
    conceptTags: ['بصريات فيزيائية', 'يونك', 'تداخل', 'حيود', 'محزز الحيود', 'استقطاب', 'بروستر'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/sixthScientific/PhysicalOptics/PhysicalOpticsSimulation').then((m) => ({
        default: m.PhysicalOpticsSimulation,
      }))
    ),
  },
  {
    id: 'physics-sixth-modern-physics',
    subjectId: 'physics',
    gradeId: 'sixth-scientific',
    chapterId: 'sixth-modern-physics',
    chapterNumber: 5,
    curriculumTitle: 'الفيزياء الحديثة',
    topic: 'إشعاع الجسم الأسود وفرضية بلانك، الظاهرة الكهروضوئية، فرضية دي برولي، ومبدأ اللادقة لهايزنبرغ',
    grade: 'الصف السادس العلمي',
    difficulty: 'advanced',
    titleAr: 'مختبر الفيزياء الحديثة والظاهرة الكهروضوئية',
    titleEn: 'Modern Physics, Photoelectric Effect & Quantum Lab',
    description: 'مختبر فيزيائي متقدم لتطبيق معادلة آينشتاين للظاهرة الكهروضوئية KE_max = hf - W0، جهد الإيقاف (القطع)، الطول الموجي لموجات المادة لدي برولي λ = h/p، ومبدأ اللادقة لهايزنبرغ.',
    learningObjectives: [
      'فهم فرضية بلانك لتكميم الطاقة E = hf ودراسة منحنى إشعاع الجسم الأسود وقانون فين',
      'استقصاء الظاهرة الكهروضوئية واعتماد الطاقة الحركية العظمى على تردد الضوء الساقط وليس شدته',
      'حساب جهد القطع (الإيقاف) Vs = KE_max / e وتردد العتبة وطول موجة العتبة لمعدن الهدف',
      'حساب طول موجة دي برولي المرافقة للجسيمات المادية λ = h / (m · v)',
      'تطبيق مبدأ اللادقة لهايزنبرغ في الموضع والزخم Δx · Δp ≥ h / 4π',
    ],
    requiredConcepts: ['تكميم الطاقة', 'الظاهرة الكهروضوئية', 'دالة العمل وتردد العتبة', 'موجات دي برولي', 'مبدأ اللادقة'],
    formulae: ['E = h · f = h · c / λ', 'KE_max = h · f - W0', 'KE_max = e · Vs', 'λ_dB = h / (m · v)', 'Δx · Δp ≥ h / (4π)'],
    conceptTags: ['فيزياء حديثة', 'بلانك', 'كهروضوئية', 'جهد القطع', 'دي برولي', 'هايزنبرغ', 'تكميم'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/sixthScientific/ModernPhysics/ModernPhysicsSimulation').then((m) => ({
        default: m.ModernPhysicsSimulation,
      }))
    ),
  },
  {
    id: 'physics-sixth-solid-state-electronics',
    subjectId: 'physics',
    gradeId: 'sixth-scientific',
    chapterId: 'sixth-solid-state-electronics',
    chapterNumber: 6,
    curriculumTitle: 'إلكترونيات الحالة الصلبة',
    topic: 'حزم الطاقة، أشباه الموصلات النقية والمشوبة، الثنائي البلوري (P-N)، وحاجز الجهد والانحياز',
    grade: 'الصف السادس العلمي',
    difficulty: 'advanced',
    titleAr: 'مختبر إلكترونيات الحالة الصلبة والثنائي البلوري P-N',
    titleEn: 'Solid State Electronics & P-N Junction Diode Lab',
    description: 'مختبر تفاعلي لاستكشاف حزم الطاقة في الموصلات وأشباه الموصلات والعوازل، عملية التطعيم لإنتاج بلورة نوع N ونوع P، تركيب الثنائي البلوري P-N وحاجز الجهد والانحياز الأمامي والعكسي.',
    learningObjectives: [
      'مقارنة حزم الطاقة (حزمة التكافؤ، حزمة التوصيل، وفجوة الطاقة المحظورة) بين المواد',
      'فهم آلية التطعيم بالشوائب الخماسية (توليد إلكترونات حرة ومستوى مانح) والثلاثية (توليد فجوات ومستوى قابل)',
      'استيعاب تكوّن منطقة الاستنزاف وحاجز الجهد في الثنائي البلوري P-N (0.7V للسيليكون و 0.3V للجرمانيوم)',
      'دراسة سلوك الثنائي تحت الانحياز الأمامي (توصيل عالي) والانحياز العكسي (حجب التيار)',
    ],
    requiredConcepts: ['حزم الطاقة', 'فجوة الطاقة المحظورة', 'التطعيم والشوائب', 'بلورة نوع N و P', 'الثنائي البلوري P-N', 'حاجز الجهد والانحياز'],
    formulae: ['Eg(Si) = 1.1 eV', 'Eg(Ge) = 0.72 eV', 'V0(Si) = 0.7 V', 'V0(Ge) = 0.3 V'],
    conceptTags: ['إلكترونيات', 'حزم طاقة', 'سيليكون', 'تطعيم', 'ثنائي بلوري', 'انحياز أمامي', 'حاجز جهد'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/sixthScientific/SolidStateElectronics/SolidStateElectronicsSimulation').then((m) => ({
        default: m.SolidStateElectronicsSimulation,
      }))
    ),
  },
  {
    id: 'physics-sixth-atomic-spectra-laser',
    subjectId: 'physics',
    gradeId: 'sixth-scientific',
    chapterId: 'sixth-atomic-spectra-laser',
    chapterNumber: 7,
    curriculumTitle: 'الأطياف الذرية والليزر',
    topic: 'نموذج بور لذرة الهيدروجين، السلاسل الطيفية، طيف الأشعة السينية، ومنظومة الليزر والتوزيع المعكوس',
    grade: 'الصف السادس العلمي',
    difficulty: 'advanced',
    titleAr: 'مختبر الأطياف الذرية والأشعة السينية والليزر',
    titleEn: 'Atomic Spectra, X-Rays & Laser Principles Lab',
    description: 'مختبر علمي متقدم لدراسة نموذج بور لذرة الهيدروجين وانتقالات الإلكترونات بين المدارات، السلاسل الطيفية الخمس (لايمان، بالمر، باشن، براكت، فوند)، طيف الأشعة السينية المستمر والخطي، ومبدأ عمل الليزر والمجاوب البصري.',
    learningObjectives: [
      'حساب طاقة المستويات في ذرة الهيدروجين En = -13.6 / n² وتردد وطول موجة الفوتون المنبعث',
      'استكشاف السلاسل الطيفية للهيدروجين والمناطق الطيفية المقابلة لكل منها',
      'حساب أقصر طول موجي للأشعة السينية λ_min = hc / (eV) ودراسة طيف الأشعة المميز',
      'فهم شروط توليد شعاع الليزر: الوسط الفعال، الضخ، التوزيع المعكوس، والمجاوب الرنيني',
    ],
    requiredConcepts: ['نموذج بور', 'طاقة المدارات', 'السلاسل الطيفية للهيدروجين', 'أشعة الكبح والأشعة السينية', 'الليزر والتوزيع المعكوس', 'المجاوب البصري'],
    formulae: ['En = -13.6 / n² (eV)', 'ΔE = h · f = h · c / λ', 'λ_min = (h · c) / (e · V)', 'f_max = (e · V) / h'],
    conceptTags: ['أطياف ذرية', 'بور', 'هيدروجين', 'بالمر', 'أشعة سينية', 'ليزر', 'توزيع معكوس', 'مجاوب'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/sixthScientific/AtomicSpectraLaser/AtomicSpectraLaserSimulation').then((m) => ({
        default: m.AtomicSpectraLaserSimulation,
      }))
    ),
  },
  {
    id: 'physics-sixth-nuclear-physics',
    subjectId: 'physics',
    gradeId: 'sixth-scientific',
    chapterId: 'sixth-nuclear-physics',
    chapterNumber: 8,
    curriculumTitle: 'الفيزياء النووية',
    topic: 'خواص وحجم النواة، طاقة الارتباط النووي والنقص الكتلي، وقانون الانحلال الإشعاعي وعمر النصف',
    grade: 'الصف السادس العلمي',
    difficulty: 'advanced',
    titleAr: 'مختبر الفيزياء النووية وطاقة الارتباط والانحلال الإشعاعي',
    titleEn: 'Nuclear Physics, Binding Energy & Radioactive Decay Lab',
    description: 'مختبر نووي تفاعلي لحساب نصف قطر النواة R = R₀ A^(1/3) وحجمها وشحنتها، حساب النقص الكتلي وطاقة الارتباط النووي Eb = Δm × 931.5 MeV ومنحنى طاقة الارتباط لكل نيوكليون، وتطبيق قانون الانحلال الإشعاعي وعمر النصف T½.',
    learningObjectives: [
      'حساب نصف القطر النووي وحجم وكثافة النواة والاعتماد على العدد الكتلي A',
      'حساب النقص الكتلي Δm وطاقة الارتباط النووي Eb بوحدة MeV وطاقة الارتباط لكل نيوكليون Eb / A',
      'تحديد قمة استقرار الأنوية حول نواة الحديد Fe-56 والتفريق بين مناطق الانشطار والاندماج النووي',
      'تطبيق قانون الانحلال الإشعاعي N(t) = N₀ e^(-λt) وحساب ثابت الانحلال وعمر النصف T½ والنشاط الإشعاعي',
    ],
    requiredConcepts: ['نصف القطر النووي', 'النقص الكتلي', 'طاقة الارتباط النووي', 'استقرار النواة', 'الانحلال الإشعاعي', 'عمر النصف'],
    formulae: ['R = R₀ · A^(1/3)', 'Q = Z · e', 'Δm = (Z·mH + N·mn) - M_nucleus', 'Eb = Δm · 931.5 MeV', 'N(t) = N₀ · e^(-λ · t)', 'λ = ln(2) / T½ ≈ 0.693 / T½'],
    conceptTags: ['فيزياء نووية', 'نصف قطر نووي', 'نقص كتلي', 'طاقة ارتباط', 'انحلال إشعاعي', 'عمر نصف', 'نظائر'],
    mode: '2d',
    component: React.lazy(() =>
      import('../physics/sixthScientific/NuclearPhysics/NuclearPhysicsSimulation').then((m) => ({
        default: m.NuclearPhysicsSimulation,
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
