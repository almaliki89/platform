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
