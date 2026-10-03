import { BaseUnitInfo, DimensionalEquation, MeasurementErrorResult } from './types';

export const SI_BASE_UNITS: BaseUnitInfo[] = [
  {
    quantityAr: 'الطول / المسافة',
    quantityEn: 'Length',
    symbol: 'L, x, d',
    unitAr: 'المتر',
    unitEn: 'meter',
    unitSymbol: 'm',
    dimensionSymbol: '[L]',
    standardDefinitionAr: 'المسافة التي يقطعها الضوء في الفراغ خلال فاصل زمني مقداره 1 / 299,792,458 ثانية.',
  },
  {
    quantityAr: 'الكتلة',
    quantityEn: 'Mass',
    symbol: 'm',
    unitAr: 'الكيلوغرام',
    unitEn: 'kilogram',
    unitSymbol: 'kg',
    dimensionSymbol: '[M]',
    standardDefinitionAr: 'معيار الكتلة الأساسي ويعتمد حديثاً على ثابت بلانك الكوني h.',
  },
  {
    quantityAr: 'الزمن',
    quantityEn: 'Time',
    symbol: 't',
    unitAr: 'الثانية',
    unitEn: 'second',
    unitSymbol: 's',
    dimensionSymbol: '[T]',
    standardDefinitionAr: 'مدة 9,192,631,770 دورة من الإشعاع الصادر عن انتقال بين مستويين لذرة السيزيوم-133.',
  },
  {
    quantityAr: 'التيار الكهربائي',
    quantityEn: 'Electric Current',
    symbol: 'I',
    unitAr: 'الأمبير',
    unitEn: 'ampere',
    unitSymbol: 'A',
    dimensionSymbol: '[I]',
    standardDefinitionAr: 'تدفق شحنة كهربائية مقدارها كولوم واحد في الثانية الواحدة (1 C / s).',
  },
  {
    quantityAr: 'درجة الحرارة المطلقة',
    quantityEn: 'Thermodynamic Temperature',
    symbol: 'T',
    unitAr: 'الكلفن',
    unitEn: 'kelvin',
    unitSymbol: 'K',
    dimensionSymbol: '[θ]',
    standardDefinitionAr: 'مقياس درجة الحرارة الثرموديناميكية بالنسبة للصفر المطلق (-273.15 °C).',
  },
  {
    quantityAr: 'كمية المادة',
    quantityEn: 'Amount of Substance',
    symbol: 'n',
    unitAr: 'المول',
    unitEn: 'mole',
    unitSymbol: 'mol',
    dimensionSymbol: '[N]',
    standardDefinitionAr: 'كمية تحتوي على عدد أفوجادرو (6.022 × 10²³) من الكيانات الأولية.',
  },
  {
    quantityAr: 'شدة الإضاءة',
    quantityEn: 'Luminous Intensity',
    symbol: 'I_v',
    unitAr: 'الشمعة القياسية',
    unitEn: 'candela',
    unitSymbol: 'cd',
    dimensionSymbol: '[J]',
    standardDefinitionAr: 'شدة إضاءة تصدر في اتجاه معين من مصدر أحادي التردد محدد.',
  },
];

export const DIMENSIONAL_EQUATIONS: DimensionalEquation[] = [
  {
    id: 'velocity',
    nameAr: 'معادلة السرعة (v = d / t)',
    formulaTex: 'v = d / t',
    lhsDimension: '[L T⁻¹]',
    rhsDimension: '[L] / [T] = [L T⁻¹]',
    isDimensionallyConsistent: true,
    stepExplanationAr: 'طرف السرعة [v] = [L T⁻¹] يطابق طرف المسافة مقسومة على الزمن [d/t] = [L]/[T] = [L T⁻¹]. المعادلة صحيحة بعدياً.',
  },
  {
    id: 'acceleration',
    nameAr: 'معادلة التعجيل الخطي (a = Δv / t)',
    formulaTex: 'a = Δv / t',
    lhsDimension: '[L T⁻²]',
    rhsDimension: '[L T⁻¹] / [T] = [L T⁻²]',
    isDimensionallyConsistent: true,
    stepExplanationAr: 'طرف التعجيل [a] = [L T⁻²] يطابق قسمة السرعة على الزمن [L T⁻¹]/[T] = [L T⁻²]. المعادلة صحيحة بعدياً.',
  },
  {
    id: 'force',
    nameAr: 'قانون نيوتن الثاني (F = m · a)',
    formulaTex: 'F = m · a',
    lhsDimension: '[M L T⁻²]',
    rhsDimension: '[M] · [L T⁻²] = [M L T⁻²]',
    isDimensionallyConsistent: true,
    stepExplanationAr: 'وحدة القوة نيوتن: طرف [F] = [M L T⁻²] يطابق حاصل ضرب الكتلة في التعجيل [m · a] = [M][L T⁻²].',
  },
  {
    id: 'pressure',
    nameAr: 'معادلة الضغط (P = F / A)',
    formulaTex: 'P = F / A',
    lhsDimension: '[M L⁻¹ T⁻²]',
    rhsDimension: '[M L T⁻²] / [L²] = [M L⁻¹ T⁻²]',
    isDimensionallyConsistent: true,
    stepExplanationAr: 'وحدة الضغط باسكال: قسمة القوة على المساحة [F]/[A] = [M L T⁻²]/[L²] = [M L⁻¹ T⁻²]. المعادلة صحيحة بعدياً.',
  },
  {
    id: 'density',
    nameAr: 'معادلة الكثافة (ρ = m / V)',
    formulaTex: 'ρ = m / V',
    lhsDimension: '[M L⁻³]',
    rhsDimension: '[M] / [L³] = [M L⁻³]',
    isDimensionallyConsistent: true,
    stepExplanationAr: 'الكثافة = الكتلة مقسومة على الحجم: [m]/[V] = [M]/[L³] = [M L⁻³]. المعادلة صحيحة بعدياً.',
  },
  {
    id: 'work_energy',
    nameAr: 'معادلة الشغل والطاقة (W = F · d)',
    formulaTex: 'W = F · d',
    lhsDimension: '[M L² T⁻²]',
    rhsDimension: '[M L T⁻²] · [L] = [M L² T⁻²]',
    isDimensionallyConsistent: true,
    stepExplanationAr: 'وحدة الشغل جول: القوة في الإزاحة [F][d] = [M L T⁻²][L] = [M L² T⁻²] وهي نفسها أبعاد الطاقة الحركية والكامنة.',
  },
];

/**
 * Pure function: Calculates Absolute, Relative, and Percentage Error safely.
 * Prevents division by zero when acceptedValue is 0.
 */
export function calculateAbsoluteError(measured: number, accepted: number): number {
  return Math.abs(measured - accepted);
}

export function calculateRelativeError(measured: number, accepted: number): number {
  const safeAccepted = Math.abs(accepted);
  if (safeAccepted < 1e-12) return 0;
  return calculateAbsoluteError(measured, accepted) / safeAccepted;
}

export function calculatePercentageError(measured: number, accepted: number): number {
  return calculateRelativeError(measured, accepted) * 100;
}

export function calculateMeasurementError(
  measuredValue: number,
  acceptedValue: number
): MeasurementErrorResult {
  const absError = calculateAbsoluteError(measuredValue, acceptedValue);
  const relError = calculateRelativeError(measuredValue, acceptedValue);
  const pctError = calculatePercentageError(measuredValue, acceptedValue);

  let accuracyGradeAr = 'دقة عالية جداً (ممتاز)';
  if (pctError > 10) {
    accuracyGradeAr = 'خطأ كبير نسبياً (يحتاج إعادة معايرة للأداة)';
  } else if (pctError > 5) {
    accuracyGradeAr = 'دقة متوسطة (مقبول تجريبياً)';
  } else if (pctError > 1) {
    accuracyGradeAr = 'دقة جيدة جداً (ضمن حدود الخطأ المخبري المسموح)';
  }

  const explanationAr =
    acceptedValue !== 0
      ? `الخطأ المطلق Δx = |${measuredValue} - ${acceptedValue}| = ${absError.toFixed(4)}. الخطأ النسبي = ${relError.toFixed(5)}، والخطأ المئوي = ${pctError.toFixed(2)}%.`
      : 'القيمة المقبولة صفر؛ تم تفادي القسمة على صفر.';

  return {
    measuredValue,
    acceptedValue,
    absoluteError: absError,
    relativeError: relError,
    percentageError: pctError,
    accuracyGradeAr,
    explanationAr,
  };
}
