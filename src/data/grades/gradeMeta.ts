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
  // Age demographics & educational details
  ageRangeAr: string;
  ageRangeEn: string;
  typicalAge: string;
  targetStudentsAr: string;
  stageLevel: string;
  developmentStage: string;
  weeklyHours: string;
  officialBookCode: string;
  keySkills: string[];
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
    description: 'منهج اللغة الإنكليزية العراقي للصف الأول المتوسط معتمد رسمياً من كتاب الطالب (Student\'s Book) وكتاب النشاط (Activity Book): العطلات، الطقس والأشهر، المضارع التام، البلدان الأخرى، يوكي في اليابان، قواعد السلامة، وقصص المطالعة الثلاث المقررة.',
    curriculumBook: 'كتاب الطالب (Student\'s Book) + كتاب النشاط (Activity Book)',
    authorNote: 'اعتماد كامل ومطابق حرفياً للمنهج العراقي الرسمي المعتمد لوزارة التربية، شاملاً كافة تمارين كتاب الطالب والنشاط وبنك الأسئلة.',
    ageRangeAr: '12 - 13 سنة',
    ageRangeEn: '12 - 13 Years',
    typicalAge: '12-13',
    targetStudentsAr: 'طلبة سن 12 إلى 13 عاماً (الانتقال من الابتدائية إلى المتوسطة)',
    stageLevel: 'الصف الأول من التعليم المتوسط',
    developmentStage: 'التأسيس اللغوي السليم، التراكيب الجملية المبسطة، وبناء الثقة في التحدث والقراءة والكتابة.',
    weeklyHours: '4 إلى 5 حصص أسبوعية',
    officialBookCode: 'Student\'s Book & Activity Book - 1st Inter',
    keySkills: ['المضارع والماضي البسيط', 'كتابة الفقرات الوصفية', 'المفردات البيئية والجغرافية', 'قصص المغزى الأخلاقي']
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
    description: 'منهج اللغة الإنكليزية العراقي للصف الثاني المتوسط معتمد رسمياً وحصرياً من كتاب الطالب (Student\'s Book) وكتاب النشاط (Activity Book): مجلة المدرسة، اللياقة والصحة، الألعاب والرياضات، وسائل الاتصال والمبني للمجهول، الوظائف، والبيئة، ومغامرات بوب وباسم (Bob & Basim).',
    curriculumBook: 'English for Iraq - 2nd Intermediate (Student\'s Book & Activity Book)',
    authorNote: 'معتمد رسمياً وشاملاً لكتاب الطالب (SB) وكتاب النشاط (AB): التمارين التفاعلية، القصص الوزارية، والإنشاءات النموذجية.',
    ageRangeAr: '13 - 14 سنة',
    ageRangeEn: '13 - 14 Years',
    typicalAge: '13-14',
    targetStudentsAr: 'طلبة سن 13 إلى 14 عاماً (مرحلة التطور والتوسع اللغوي في المرحلة المتوسطة)',
    stageLevel: 'الصف الثاني من التعليم المتوسط',
    developmentStage: 'توسيع المخزون اللغوي، التعبير عن الرأي وتقديم النصائح والاقتراحات، أزمنة الماضي والمضارع التام والمستقبل، والمبني للمجهول.',
    weeklyHours: '4 إلى 5 حصص أسبوعية',
    officialBookCode: 'Student\'s Book & Activity Book - 2nd Inter (Official Adoption)',
    keySkills: ['المبني للمجهول الأساسي', 'إعطاء النصائح (should/shouldn\'t)', 'مفردات الرياضة واللياقة', 'قصص بوب وباسم التفاعلية']
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
    description: 'منهج اللغة الإنكليزية العراقي للصف الثالث المتوسط معتمد رسمياً وحصرياً من كتاب الطالب (Student\'s Book) وكتاب النشاط (Activity Book): سيارة البانثر Panther 3.0D، المقارنة والتفضيل، التفضيل والدعوات، الحياة في الأهوار، أخبار الصباح، مدارس المستقبل، ابن الهيثم، وقصص الأدب الثمانية والإنشاءات الوزارية.',
    curriculumBook: 'English for Iraq - 3rd Intermediate (Student\'s Book & Activity Book - الاعتماد الحصري)',
    authorNote: 'الاعتماد الحصري والشامل على كتاب الطالب (Student\'s Book) وكتاب النشاط (Activity Book) لجمهورية العراق - تغطية 100% للوحدات من 1 إلى 8 مع بنك الأسئلة والإنشاءات ونموذج الامتحان الوزاري.',
    ageRangeAr: '14 - 15 سنة',
    ageRangeEn: '14 - 15 Years',
    typicalAge: '14-15',
    targetStudentsAr: 'طلبة سن 14 إلى 15 عاماً (المرحلة الوزارية المنتهية - نيل الشهادة المتوسطة)',
    stageLevel: 'الصف المنتهي للمرحلة المتوسطة (امتحان وزاري عام)',
    developmentStage: 'إتقان صياغات الأسئلة الوزارية، الإجابات النموذجية، الإنشاءات المعتمدة، وقصص الأدب المقررة في كتابي الطالب والنشاط.',
    weeklyHours: '5 حصص أسبوعية مركزة',
    officialBookCode: 'Student\'s Book & Activity Book - 3rd Inter (Official Adoption)',
    keySkills: ['قواعد المقارنة والتفضيل والظروف والمبني للمجهول', 'قطع الكتاب المنهجية (البانثر، الأهوار، الصقور، ابن الهيثم)', 'قصص الأدب الثمانية والإنشاءات الوزارية النموذجية', 'حل الأسئلة الوزارية والامتحان الشامل المعتمد']
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
    description: 'منهج اللغة الإنكليزية العراقي للصف الرابع الإعدادي (العلمي والأدبي) معتمد رسمياً وشاملاً من كتاب الطالب (Student\'s Book) وكتاب النشاط (Activity Book): التواصل واللغات، الماضي مع used to، قضايا العالم المعاصر، عادات الأعراس، المستقبل والمبني للمجهول المتقدم، التنوع البيئي والشرط مع unless، وأدب شكسبير وروبرت فروست.',
    curriculumBook: 'كتاب الطالب (Student\'s Book) + كتاب النشاط (Activity Book) - English for Iraq (4th Preparatory)',
    authorNote: 'تغطية معتمدة 100% لجميع وحدات الكورسين الأول والثاني، تدريبات النشاط النموذجية، وبنك أسئلة الكورسات ونصف السنة ونهاية العام.',
    ageRangeAr: '15 - 16 سنة',
    ageRangeEn: '15 - 16 Years',
    typicalAge: '15-16',
    targetStudentsAr: 'طلبة سن 15 إلى 16 عاماً (المرحلة الإعدادية - الفرعان العلمي والأدبي)',
    stageLevel: 'الصف الأول من المرحلة الإعدادية (العلمي والأدبي)',
    developmentStage: 'التأسيس المتين لمنهج البكالوريا (السادس الإعدادي): إتقان أفعال الحالة، أدوات الوصل، المبني للمجهول المتقدم، المسرح العالمي (تاجر البندقية)، والشعر التحليلي.',
    weeklyHours: '4 إلى 5 حصص أسبوعية معتمدة',
    officialBookCode: 'English for Iraq - 4th Preparatory (Student\'s Book & Activity Book)',
    keySkills: ['أفعال الحالة والمضارع البسيط والمستمر والأسئلة غير المباشرة', 'اعتياد الماضي مع used to والماضي المستمر', 'ضمائر وجمل الوصل المعرفة وغير المعرفة (who/which/whose/where)', 'أفعال الإلزام والمبني للمجهول والشرط مع unless', 'مسرحية تاجر البندقية لشكسبير وقصيدة روبرت فروست']
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
    description: 'منهج اللغة الإنكليزية العراقي للصف الخامس الإعدادي (العلمي والأدبي) معتمد رسمياً وشاملاً من كتاب الطالب (Student\'s Book) وكتاب النشاط (Activity Book): رمضان في العراق، أفعال الحالة والحركة، الجمل الشرطية 2 و 3، التعبير عن الندم، الاستنتاج، الكلام المنقول، الأفعال السببية، صيغ المستقبل، وأدب لورد تينيسون وكاثرين مانسفيلد.',
    curriculumBook: 'English for Iraq - 5th Preparatory (Student\'s Book & Activity Book)',
    authorNote: 'الاعتماد الحصري لكتاب الطالب والنشاط بالكامل بإشراف الأستاذ مصطفى تركي: إعداد وتأهيل متقدم لضمان الـ 100 في البكالوريا.',
    ageRangeAr: '16 - 17 سنة',
    ageRangeEn: '16 - 17 Years',
    typicalAge: '16-17',
    targetStudentsAr: 'طلبة سن 16 إلى 17 عاماً (مرحلة ما قبل البكالوريا الوزارية)',
    stageLevel: 'الصف الثاني من المرحلة الإعدادية',
    developmentStage: 'التمكين التام من صياغات البكالوريا: الجمل الشرطية المعقدة، الكلام المنقول، المبني للمجهول والأفعال السببية، والتحليل الأدبي للقصائد والقصص القصيرة.',
    weeklyHours: '4 إلى 5 حصص أسبوعية',
    officialBookCode: 'English for Iraq - 5th Preparatory (SB & AB)',
    keySkills: ['أفعال الحالة وصفات ed/ing', 'الجمل الشرطية 2 و 3 والندم', 'الاستنتاج والكلام المنقول', 'الأفعال السببية والمبني للمجهول', 'أدب تينيسون ومانسفيلد', 'الإنشاءات الوزارية المعتمدة']
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
    curriculumBook: 'English for Iraq - 6th Preparatory (Baccalaureate 100%)',
    authorNote: 'المرجع الوزاري الكامل لضمان الدرجة 100 في الامتحان الوزاري العام لجمهورية العراق.',
    ageRangeAr: '17 - 18 سنة',
    ageRangeEn: '17 - 18 Years',
    typicalAge: '17-18',
    targetStudentsAr: 'طلبة سن 17 إلى 18 عاماً (البكالوريا الوزارية الحاسمة للقبول الجامعي)',
    stageLevel: 'الصف المنتهي للمرحلة الإعدادية (شهادة الدراسة الإعدادية العامة)',
    developmentStage: 'التدريب المكثف على بنك الأسئلة الوزارية لجميع الأدوار (2020-2026)، والسيطرة الكاملة على قطع الكتاب وقواعد الوحدات الثمانية وروايات الأدب.',
    weeklyHours: '5 إلى 6 حصص أسبوعية ومراجعة مكثفة',
    officialBookCode: 'English for Iraq - 6th Preparatory (Baccalaureate M.O.E)',
    keySkills: ['الوحدات الثمانية بكافة قواعدها', 'رواية كبرياء وتحامل ومسرحية كما تشاء', 'قطع الكتاب الوزارية السبع الرسمية', 'بنك الوزاريات 2020-2026 المحاكي']
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
