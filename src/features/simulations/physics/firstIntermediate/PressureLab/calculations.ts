import { PressureResult, PressurePreset } from './types';

export const PRESSURE_PRESETS: PressurePreset[] = [
  {
    id: 'nail',
    nameAr: 'رأس مسمار مدبب',
    descriptionAr: 'مساحة صغيرة جداً تولد ضغطاً هائلاً يسهل اختراق السطوح.',
    defaultForce: 50,
    defaultArea: 0.0001, // 1 cm^2 or less
  },
  {
    id: 'brick-flat',
    nameAr: 'قالب طابوق (مستوٍ عريض)',
    descriptionAr: 'مساحة تماس كبيرة توزع الثقل فيقل الضغط المسلط على الأرض.',
    defaultForce: 30,
    defaultArea: 0.03, // 300 cm^2
  },
  {
    id: 'snowshoe',
    nameAr: 'حذاء التزلج العريض',
    descriptionAr: 'زيادة مساحة القدم تقلل الضغط وتمنع الغوص في الثلج أو الرمال.',
    defaultForce: 600,
    defaultArea: 0.15,
  },
];

/**
 * Pure calculation for Pressure: P = F / A
 */
export function calculatePressure(forceN: number, areaM2: number): PressureResult {
  const safeArea = Math.max(0.00001, areaM2);
  const safeForce = Math.max(0, forceN);

  const pressurePa = safeForce / safeArea;
  const pressureKPa = pressurePa / 1000;

  let effectDescriptionAr = '';
  if (pressureKPa > 100) {
    effectDescriptionAr = 'ضغط شديد جداً (تركيز قوي للقوة على مساحة دقيقة، يسبب اختراقاً سهلاً للسطح).';
  } else if (pressureKPa > 10) {
    effectDescriptionAr = 'ضغط متوسط إلى مرتفع (تأثير ملموس على السطح).';
  } else {
    effectDescriptionAr = 'ضغط منخفض وآمن (توزيع فعال للقوة على مساحة واسعة يمنع الغوص والتشوه).';
  }

  // Visual penetration depth scale (0 to 1)
  const relativePenetration = Math.min(1, Math.max(0.05, Math.log10(Math.max(1, pressurePa)) / 6));

  return {
    pressurePa,
    pressureKPa,
    effectDescriptionAr,
    relativePenetration,
  };
}
