export type IraqiPhysicsGradeId =
  | 'first-intermediate'
  | 'second-intermediate'
  | 'third-intermediate'
  | 'fourth-scientific'
  | 'fifth-scientific'
  | 'sixth-scientific';

export interface IraqiPhysicsChapter {
  id: string;
  number: number;
  titleAr: string;
  simulationHint?: '2d' | '3d' | 'both' | 'none';
}

export interface IraqiPhysicsGrade {
  id: IraqiPhysicsGradeId;
  titleAr: string;
  stage: 'intermediate' | 'preparatory';
  chapters: IraqiPhysicsChapter[];
}

export const IRAQI_PHYSICS_CURRICULUM: IraqiPhysicsGrade[] = [
  {
    id: 'first-intermediate',
    titleAr: 'الأول المتوسط',
    stage: 'intermediate',
    chapters: [
      { id: 'properties-of-matter', number: 1, titleAr: 'خواص المادة', simulationHint: '3d' },
      { id: 'force', number: 2, titleAr: 'القوة', simulationHint: '3d' },
      { id: 'pressure', number: 3, titleAr: 'الضغط', simulationHint: 'both' },
      { id: 'heat', number: 4, titleAr: 'الحرارة', simulationHint: 'both' },
      { id: 'thermal-effects-on-matter', number: 5, titleAr: 'أثر الحرارة في المواد', simulationHint: '3d' },
    ],
  },
  {
    id: 'second-intermediate',
    titleAr: 'الثاني المتوسط',
    stage: 'intermediate',
    chapters: [
      { id: 'motion', number: 1, titleAr: 'الحركة', simulationHint: 'both' },
      { id: 'laws-of-motion', number: 2, titleAr: 'قوانين الحركة', simulationHint: '3d' },
      { id: 'work-power-energy', number: 3, titleAr: 'الشغل والقدرة والطاقة', simulationHint: 'both' },
      { id: 'levers', number: 4, titleAr: 'العتلات', simulationHint: '3d' },
      { id: 'wave-motion-and-sound', number: 5, titleAr: 'الحركة الموجية والصوت', simulationHint: 'both' },
      { id: 'light', number: 6, titleAr: 'الضوء', simulationHint: '3d' },
    ],
  },
  {
    id: 'third-intermediate',
    titleAr: 'الثالث المتوسط',
    stage: 'intermediate',
    chapters: [
      { id: 'electrostatics', number: 1, titleAr: 'الكهربائية الساكنة', simulationHint: '3d' },
      { id: 'magnetism', number: 2, titleAr: 'المغناطيسية', simulationHint: '3d' },
      { id: 'electric-current', number: 3, titleAr: 'التيار الكهربائي', simulationHint: 'both' },
      { id: 'battery-emf', number: 4, titleAr: 'البطارية والقوة الدافعة الكهربائية', simulationHint: 'both' },
      { id: 'electrical-energy-power', number: 5, titleAr: 'الطاقة والقدرة الكهربائية', simulationHint: '2d' },
      { id: 'electricity-and-magnetism', number: 6, titleAr: 'الكهربائية والمغناطيسية', simulationHint: '3d' },
      { id: 'transformer', number: 7, titleAr: 'المحولة الكهربائية', simulationHint: '3d' },
      { id: 'energy-source-technology', number: 8, titleAr: 'تكنولوجيا مصادر الطاقة', simulationHint: 'both' },
      { id: 'atmospheric-physics-communications', number: 9, titleAr: 'فيزياء الجو وتقنية الاتصالات الحديثة', simulationHint: '3d' },
    ],
  },
  {
    id: 'fourth-scientific',
    titleAr: 'الرابع العلمي',
    stage: 'preparatory',
    chapters: [
      { id: 'physics-main-parameters', number: 1, titleAr: 'معلمات رئيسة في الفيزياء', simulationHint: '2d' },
      { id: 'mechanical-properties-matter', number: 2, titleAr: 'الخصائص الميكانيكية للمادة', simulationHint: '3d' },
      { id: 'static-fluids', number: 3, titleAr: 'الموائع الساكنة', simulationHint: '3d' },
      { id: 'thermal-properties-matter', number: 4, titleAr: 'الخصائص الحرارية للمادة', simulationHint: 'both' },
      { id: 'light-introduction', number: 5, titleAr: 'الضوء', simulationHint: '3d' },
      { id: 'reflection-refraction', number: 6, titleAr: 'انعكاس وانكسار الضوء', simulationHint: '3d' },
      { id: 'mirrors', number: 7, titleAr: 'المرايا', simulationHint: '3d' },
      { id: 'thin-lenses', number: 8, titleAr: 'العدسات الرقيقة', simulationHint: '3d' },
      { id: 'electrostatics-fourth', number: 9, titleAr: 'الكهرباء الساكنة (المستقرة)', simulationHint: '3d' },
    ],
  },
  {
    id: 'fifth-scientific',
    titleAr: 'الخامس العلمي',
    stage: 'preparatory',
    chapters: [
      { id: 'vectors', number: 1, titleAr: 'المتجهات', simulationHint: '3d' },
      { id: 'linear-motion', number: 2, titleAr: 'الحركة الخطية', simulationHint: 'both' },
      { id: 'motion-laws', number: 3, titleAr: 'قوانين الحركة', simulationHint: '3d' },
      { id: 'equilibrium-torque', number: 4, titleAr: 'الاتزان والعزوم', simulationHint: '3d' },
      { id: 'work-power-energy-momentum', number: 5, titleAr: 'الشغل والقدرة والطاقة والزخم', simulationHint: 'both' },
      { id: 'thermodynamics', number: 6, titleAr: 'الديناميكا الحرارية (التحرك الحراري)', simulationHint: 'both' },
      { id: 'circular-rotational-motion', number: 7, titleAr: 'الحركة الدائرية والدورانية', simulationHint: '3d' },
      { id: 'oscillations-waves-sound', number: 8, titleAr: 'الحركة الاهتزازية والموجية والصوت', simulationHint: '3d' },
      { id: 'electric-current-fifth', number: 9, titleAr: 'التيار الكهربائي', simulationHint: 'both' },
      { id: 'magnetism-fifth', number: 10, titleAr: 'المغناطيسية', simulationHint: '3d' },
    ],
  },
  {
    id: 'sixth-scientific',
    titleAr: 'السادس العلمي',
    stage: 'preparatory',
    chapters: [
      { id: 'capacitors', number: 1, titleAr: 'المتسعات', simulationHint: '3d' },
      { id: 'electromagnetic-induction', number: 2, titleAr: 'الحث الكهرومغناطيسي', simulationHint: '3d' },
      { id: 'alternating-current', number: 3, titleAr: 'التيار المتناوب', simulationHint: 'both' },
      { id: 'physical-optics', number: 4, titleAr: 'البصريات الفيزيائية', simulationHint: '3d' },
      { id: 'modern-physics', number: 5, titleAr: 'الفيزياء الحديثة', simulationHint: '3d' },
      { id: 'solid-state-electronics', number: 6, titleAr: 'إلكترونيات الحالة الصلبة', simulationHint: '3d' },
      { id: 'atomic-spectra-laser', number: 7, titleAr: 'الأطياف الذرية والليزر', simulationHint: '3d' },
      { id: 'nuclear-physics', number: 8, titleAr: 'الفيزياء النووية', simulationHint: '3d' },
    ],
  },
];

export const TOTAL_IRAQI_PHYSICS_CHAPTERS = IRAQI_PHYSICS_CURRICULUM.reduce(
  (total, grade) => total + grade.chapters.length,
  0
);
