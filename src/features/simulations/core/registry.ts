import React from 'react';
import { SimulationRegistryEntry } from './types';

export const SIMULATION_REGISTRY: SimulationRegistryEntry[] = [
  {
    id: 'physics-newton-second-law',
    subjectId: 'physics',
    topic: 'قوانين الحركة والتحريك (الميكانيكا)',
    grade: 'الصف الثالث المتوسط والصف الخامس العلمي',
    difficulty: 'intermediate',
    titleAr: 'قانون نيوتن الثاني في الحركة',
    titleEn: "Newton's Second Law of Motion",
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

export function getSimulationsForSubject(subjectId: 'physics' | 'mathematics' | 'chemistry'): SimulationRegistryEntry[] {
  return SIMULATION_REGISTRY.filter((sim) => sim.subjectId === subjectId);
}

export function getSimulationById(simulationId: string): SimulationRegistryEntry | undefined {
  return SIMULATION_REGISTRY.find((sim) => sim.id === simulationId);
}
