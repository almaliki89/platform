import { MoleculeData } from './types';

// Element Standard CPK Colors
const CPK_COLORS = {
  H: 0xffffff, // White
  C: 0x334155, // Dark slate
  O: 0xef4444, // Red
  N: 0x3b82f6, // Blue
  Cl: 0x22c55e, // Green
};

export const MOLECULES_CATALOG: MoleculeData[] = [
  {
    id: 'h2o',
    formula: 'H₂O',
    nameAr: 'جزيء الماء',
    nameEn: 'Water',
    descriptionAr: 'جزيء قطبي زاوي منحني ناتج عن زوجين غير رابطين من الإلكترونات على ذرة الأكسجين.',
    geometryType: 'زاوي منحني (Bent)',
    hybridState: 'sp³',
    bondAngle: '104.5°',
    polarity: 'قطبي قوي (ثنائي قطب دائم)',
    curriculumGrade: 'الثالث المتوسط والخامس العلمي',
    atoms: [
      { element: 'Oxygen', symbol: 'O', nameAr: 'أكسجين', position: [0, 0.2, 0], radius: 0.65, color: CPK_COLORS.O },
      { element: 'Hydrogen', symbol: 'H', nameAr: 'هيدروجين', position: [-0.95, -0.65, 0], radius: 0.38, color: CPK_COLORS.H },
      { element: 'Hydrogen', symbol: 'H', nameAr: 'هيدروجين', position: [0.95, -0.65, 0], radius: 0.38, color: CPK_COLORS.H },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
    ],
  },
  {
    id: 'co2',
    formula: 'CO₂',
    nameAr: 'ثنائي أكسيد الكربون',
    nameEn: 'Carbon Dioxide',
    descriptionAr: 'جزيء خطي مستقيم غير قطبي برغم قطبية الروابط، بسبب تعاكس عزمي ثنائي القطب.',
    geometryType: 'خطي مستقيم (Linear)',
    hybridState: 'sp',
    bondAngle: '180°',
    polarity: 'غير قطبي (محصلة العزم = 0)',
    curriculumGrade: 'الثالث المتوسط والخامس العلمي',
    atoms: [
      { element: 'Carbon', symbol: 'C', nameAr: 'كربون', position: [0, 0, 0], radius: 0.6, color: CPK_COLORS.C },
      { element: 'Oxygen', symbol: 'O', nameAr: 'أكسجين', position: [-1.45, 0, 0], radius: 0.55, color: CPK_COLORS.O },
      { element: 'Oxygen', symbol: 'O', nameAr: 'أكسجين', position: [1.45, 0, 0], radius: 0.55, color: CPK_COLORS.O },
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 2 },
    ],
  },
  {
    id: 'ch4',
    formula: 'CH₄',
    nameAr: 'الميثان (أبسط هيدروكربون)',
    nameEn: 'Methane',
    descriptionAr: 'جزيء رباعي السطوح منتظم ذو أربع روابط تساهمية أحادية متكافئة وموزعة في الفضاء.',
    geometryType: 'رباعي السطوح منتظم (Tetrahedral)',
    hybridState: 'sp³',
    bondAngle: '109.5°',
    polarity: 'غير قطبي متماثل',
    curriculumGrade: 'الثالث المتوسط والكيمياء العضوية',
    atoms: [
      { element: 'Carbon', symbol: 'C', nameAr: 'كربون', position: [0, 0, 0], radius: 0.65, color: CPK_COLORS.C },
      { element: 'Hydrogen', symbol: 'H', nameAr: 'هيدروجين', position: [0, 1.15, 0], radius: 0.38, color: CPK_COLORS.H },
      { element: 'Hydrogen', symbol: 'H', nameAr: 'هيدروجين', position: [1.08, -0.38, 0], radius: 0.38, color: CPK_COLORS.H },
      { element: 'Hydrogen', symbol: 'H', nameAr: 'هيدروجين', position: [-0.54, -0.38, 0.94], radius: 0.38, color: CPK_COLORS.H },
      { element: 'Hydrogen', symbol: 'H', nameAr: 'هيدروجين', position: [-0.54, -0.38, -0.94], radius: 0.38, color: CPK_COLORS.H },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
    ],
  },
  {
    id: 'nh3',
    formula: 'NH₃',
    nameAr: 'الأمونيا (الغاز النشادر)',
    nameEn: 'Ammonia',
    descriptionAr: 'جزيء هرمي ثلاثي القاعدة بسبب وجود زوج إلكتروني حر واحد يضغط على الروابط N-H.',
    geometryType: 'هرمي ثلاثي القاعدة (Trigonal Pyramidal)',
    hybridState: 'sp³',
    bondAngle: '107.3°',
    polarity: 'قطبي',
    curriculumGrade: 'الثالث المتوسط والخامس العلمي',
    atoms: [
      { element: 'Nitrogen', symbol: 'N', nameAr: 'نيتروجين', position: [0, 0.35, 0], radius: 0.62, color: CPK_COLORS.N },
      { element: 'Hydrogen', symbol: 'H', nameAr: 'هيدروجين', position: [0, -0.45, 1.0], radius: 0.38, color: CPK_COLORS.H },
      { element: 'Hydrogen', symbol: 'H', nameAr: 'هيدروجين', position: [0.86, -0.45, -0.5], radius: 0.38, color: CPK_COLORS.H },
      { element: 'Hydrogen', symbol: 'H', nameAr: 'هيدروجين', position: [-0.86, -0.45, -0.5], radius: 0.38, color: CPK_COLORS.H },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
    ],
  },
  {
    id: 'c2h4',
    formula: 'C₂H₄',
    nameAr: 'الإيثيلين (الألكينات)',
    nameEn: 'Ethylene',
    descriptionAr: 'جزيء مستوٍ يحتوي على رابطة تساهمية مزدوجة (واحدة سيجما σ وواحدة باي π) بين ذرتي الكربون.',
    geometryType: 'مثلث مستوٍ (Trigonal Planar)',
    hybridState: 'sp²',
    bondAngle: '120°',
    polarity: 'غير قطبي',
    curriculumGrade: 'الثالث المتوسط والكيمياء العضوية',
    atoms: [
      { element: 'Carbon', symbol: 'C', nameAr: 'كربون 1', position: [-0.75, 0, 0], radius: 0.58, color: CPK_COLORS.C },
      { element: 'Carbon', symbol: 'C', nameAr: 'كربون 2', position: [0.75, 0, 0], radius: 0.58, color: CPK_COLORS.C },
      { element: 'Hydrogen', symbol: 'H', nameAr: 'هيدروجين', position: [-1.4, 0.95, 0], radius: 0.38, color: CPK_COLORS.H },
      { element: 'Hydrogen', symbol: 'H', nameAr: 'هيدروجين', position: [-1.4, -0.95, 0], radius: 0.38, color: CPK_COLORS.H },
      { element: 'Hydrogen', symbol: 'H', nameAr: 'هيدروجين', position: [1.4, 0.95, 0], radius: 0.38, color: CPK_COLORS.H },
      { element: 'Hydrogen', symbol: 'H', nameAr: 'هيدروجين', position: [1.4, -0.95, 0], radius: 0.38, color: CPK_COLORS.H },
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 1, to: 4, order: 1 },
      { from: 1, to: 5, order: 1 },
    ],
  },
];
