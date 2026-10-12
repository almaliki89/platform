import { EducationalGrade } from '../../types';

export interface GradeMeta {
  id: EducationalGrade;
  nameAr: string;
  shortName: string;
  nameEn: string;
  stage: 'intermediate' | 'preparatory';
  stageAr: string;
  isMinisterial: boolean;
  themeColor: string;
  accentGradient: string;
  badgeBg: string;
  description: string;
  curriculumBook: string;
  authorNote: string;
}

export const ALL_GRADES_META: Record<EducationalGrade, GradeMeta> = {
  'first-intermediate': {
    id: 'first-intermediate',
    nameAr: 'الأول المتوسط',
    shortName: 'الأول',
    nameEn: '1st Intermediate',
    stage: 'intermediate',
    stageAr: 'المرحلة المتوسطة',
    isMinisterial: false,
    themeColor: 'emerald',
    accentGradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    description: 'منهج اللغة الإنكليزية العراقي للصف الأول المتوسط: العطلات، الفصول والطقس، البلدان، رسائل يوكي، وقصص مالك الحزين والثعلب.',
    curriculumBook: 'English for Iraq - 1st Intermediate',
    authorNote: 'تأسيس متين للقواعد، الأزمنة البسيطة، وأساسيات التعبير والكتابة الإنشائية.'
  },
  'second-intermediate': {
    id: 'second-intermediate',
    nameAr: 'الثاني المتوسط',
    shortName: 'الثاني',
    nameEn: '2nd Intermediate',
    stage: 'intermediate',
    stageAr: 'المرحلة المتوسطة',
    isMinisterial: false,
    themeColor: 'cyan',
    accentGradient: 'from-cyan-600 via-sky-600 to-blue-600',
    badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800',
    description: 'منهج اللغة الإنكليزية العراقي للصف الثاني المتوسط: مجلة المدرسة، اللياقة والصحة، الألعاب الأولمبية، المبني للمجهول المبسط، ومغامرات بوب وباسم.',
    curriculumBook: 'English for Iraq - 2nd Intermediate',
    authorNote: 'تطوير المهارات التعبيرية، قواعد المبني للمجهول، وحكايات بوب وباسم الشهيرة.'
  },
  'third-intermediate': {
    id: 'third-intermediate',
    nameAr: 'الثالث المتوسط',
    shortName: 'الثالث',
    nameEn: '3rd Intermediate',
    stage: 'intermediate',
    stageAr: 'المرحلة المتوسطة (شهادة وزارية)',
    isMinisterial: true,
    themeColor: 'teal',
    accentGradient: 'from-teal-600 via-emerald-600 to-green-600',
    badgeBg: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800',
    description: 'المنهج الوزاري الرسمي للثالث المتوسط: سيارة النمر Panther 3.0D، المقارنة والتفضيل، التفضيل والدعوات، قطع الكتاب، وقصص لوسي وكريم والغزالة.',
    curriculumBook: 'English for Iraq - 3rd Intermediate (Ministerial)',
    authorNote: 'منهج الامتحان الوزاري الموحد لجمهورية العراق - تركيز 100% على أسئلة الامتحانات الوزارية.'
  },
  'fourth-preparatory': {
    id: 'fourth-preparatory',
    nameAr: 'الرابع الإعدادي',
    shortName: 'الرابع',
    nameEn: '4th Preparatory',
    stage: 'preparatory',
    stageAr: 'المرحلة الإعدادية (العلمي والأدبي)',
    isMinisterial: false,
    themeColor: 'violet',
    accentGradient: 'from-violet-600 via-purple-600 to-indigo-600',
    badgeBg: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-800',
    description: 'منهج اللغة الإنكليزية العراقي للصف الرابع الإعدادي: التواصل، قضايا العالم، عادات الأعراس، المبني للمجهول المتقدم، ومسرحية تاجر البندقية لشكسبير.',
    curriculumBook: 'English for Iraq - 4th Preparatory',
    authorNote: 'التمهيد العميق للسادس الإعدادي في قواعد الأزمنة وأدوات الربط والمسرح الأدبي العالمي.'
  },
  'fifth-preparatory': {
    id: 'fifth-preparatory',
    nameAr: 'الخامس الإعدادي',
    shortName: 'الخامس',
    nameEn: '5th Preparatory',
    stage: 'preparatory',
    stageAr: 'المرحلة الإعدادية (العلمي والأدبي)',
    isMinisterial: false,
    themeColor: 'fuchsia',
    accentGradient: 'from-fuchsia-600 via-pink-600 to-purple-600',
    badgeBg: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-950/40 dark:text-fuchsia-300 dark:border-fuchsia-800',
    description: 'منهج اللغة الإنكليزية العراقي للصف الخامس الإعدادي: رمضان في العراق، الجمل الشرطية الثانية والثالثة، الاستنتاج، الكلام المنقول، وأدب لورد تينيسون وكاثرين مانسفيلد.',
    curriculumBook: 'English for Iraq - 5th Preparatory',
    authorNote: 'قواعد دقيقة موازية لمنهج البكالوريا، دراسة الحالات الشرطية المتقدمة والتعبير النقدي.'
  },
  'sixth-preparatory': {
    id: 'sixth-preparatory',
    nameAr: 'السادس الإعدادي',
    shortName: 'السادس',
    nameEn: '6th Preparatory',
    stage: 'preparatory',
    stageAr: 'المرحلة الإعدادية (البكالوريا الوزارية)',
    isMinisterial: true,
    themeColor: 'indigo',
    accentGradient: 'from-indigo-600 via-blue-600 to-cyan-600',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800',
    description: 'المنهج الوزاري الشامل للبكالوريا وفق الكتاب المعتمد حصراً: الوحدات الثمانية، قطع (عمار وتقنية الهيكل الخارجي، نجلة عماد لفتة، الرادار، سميرة المحمود، تصاميم راشد ورنا، ونهر الفرات)، والأدب المقرّر (كبرياء وتحامل لجين أوستن، كما تشاء لشكسبير).',
    curriculumBook: 'English for Iraq - 6th Preparatory (Baccalaureate)',
    authorNote: 'المرجع الوزاري الكامل لضمان الدرجة 100 في الامتحان الوزاري العام لجمهورية العراق.'
  }
};

export const ORDERED_GRADES: EducationalGrade[] = [
  'first-intermediate',
  'second-intermediate',
  'third-intermediate',
  'fourth-preparatory',
  'fifth-preparatory',
  'sixth-preparatory'
];
