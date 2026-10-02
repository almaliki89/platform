import { CoulombResult, ChargingMethodInfo } from './types';

// Coulomb constant k = 1 / (4 * pi * epsilon_0) ≈ 8.98755e9 N·m²/C²
export const COULOMB_CONSTANT = 8.98755e9;

/**
 * Pure calculation for Coulomb's Law:
 * F = k * |q1 * q2| / r^2
 * Handles r = 0 safely by clamping to minimum 0.01m.
 */
export function calculateCoulombForce(
  q1MicroC: number,
  q2MicroC: number,
  distanceM: number
): CoulombResult {
  const safeDistance = Math.max(0.01, Math.abs(distanceM));
  const q1C = q1MicroC * 1e-6;
  const q2C = q2MicroC * 1e-6;

  if (q1MicroC === 0 || q2MicroC === 0) {
    return {
      forceN: 0,
      isRepulsive: false,
      isAttractive: false,
      isZero: true,
      descriptionAr: 'لا توجد قوة كهربائية لعدم وجود شحنة على أحد الجسمين (جسم متعادل كهربائياً).',
      fieldAtMidpointN_C: 0,
    };
  }

  const rawForce = (COULOMB_CONSTANT * Math.abs(q1C * q2C)) / (safeDistance * safeDistance);
  // Same sign charges repel, opposite sign attract
  const isRepulsive = (q1MicroC > 0 && q2MicroC > 0) || (q1MicroC < 0 && q2MicroC < 0);
  const isAttractive = !isRepulsive;

  // Electric field at midpoint (r/2 from each)
  const rMid = safeDistance / 2;
  const E1 = (COULOMB_CONSTANT * q1C) / (rMid * rMid);
  const E2 = (COULOMB_CONSTANT * q2C) / (rMid * rMid);
  const netFieldAtMid = Math.abs(E1 - E2);

  const descriptionAr = isRepulsive
    ? `قوة تنافر كهربائية بمقدار ${rawForce >= 1000 ? rawForce.toExponential(2) : rawForce.toFixed(2)} نيوتن؛ لأن الشحنتين من نفس النوع (${q1MicroC > 0 ? 'موجبتان' : 'سالبتان'}).`
    : `قوة تجاذب كهربائية بمقدار ${rawForce >= 1000 ? rawForce.toExponential(2) : rawForce.toFixed(2)} نيوتن؛ لأن الشحنتين مختلفتان في النوع (موجبة وسالبة).`;

  return {
    forceN: Number.isFinite(rawForce) ? rawForce : 0,
    isRepulsive,
    isAttractive,
    isZero: false,
    descriptionAr,
    fieldAtMidpointN_C: Number.isFinite(netFieldAtMid) ? netFieldAtMid : 0,
  };
}

export const CHARGING_METHODS: ChargingMethodInfo[] = [
  {
    id: 'friction',
    titleAr: 'الشحن بالدلك (Friction)',
    subtitleAr: 'انتقال الإلكترونات بين مادتين عازلتين مختلفتين',
    stepDescriptionAr:
      'عند دلك ساق من الزجاج بالحرير، يفقد الزجاج إلكترونات ليصبح موجب الشحنة، ويكتسب الحرير الإلكترونات ليصبح سالب الشحنة. وكذلك ساق المطاط مع الصوف.',
    chargeCarrierAr: 'انتقال مباشر للإلكترونات السطحية نتيجة الاحتكاك الميكانيكي',
    finalStateAr: 'جسمان مشحونان بشحنتين متساويتين في المقدار ومتعاكستين في النوع',
  },
  {
    id: 'contact',
    titleAr: 'الشحن بالتماس (Contact)',
    subtitleAr: 'ملامسة جسم مشحون لجسم موصل معزول متعادل',
    stepDescriptionAr:
      'عند ملامسة ساق مشحونة بشحنة سالبة لكرة معدنية متعادلة، تنتقل كمية من الإلكترونات إلى الكرة وتكتسب شحنة مماثلة لشحنة الساق بالتماس.',
    chargeCarrierAr: 'تدفق حر للإلكترونات الحرة بين الموصلين حتى يتساوى الجهد',
    finalStateAr: 'يكتسب الجسم المتعادل شحنة من نفس نوع شحنة الجسم الشاحن',
  },
  {
    id: 'induction',
    titleAr: 'الشحن بالحَث (Induction)',
    subtitleAr: 'تقريب جسم مشحون دون ملامسة وتأريض الشحنة الطليقة',
    stepDescriptionAr:
      'عند تقريب ساق سالبة من كرة موصلة معزولة، تتنافر الإلكترونات نحو الطرف البعيد (شحنة طليقة) وتبقى الشحنات الموجبة في الطرف القريب (شحنة مقيدة). عند تأريض الطرف البعيد ثم قطع التأريض وإبعاد الساق، تشحن الكرة بشحنة مخالفة.',
    chargeCarrierAr: 'إعادة توزيع الشحنات الحرة داخل الموصل وتصريف الشحنة الطليقة للأرض',
    finalStateAr: 'يكتسب الموصل شحنة مخالفة في النوع لشحنة الجسم المؤثر (الشاحن)',
  },
];
