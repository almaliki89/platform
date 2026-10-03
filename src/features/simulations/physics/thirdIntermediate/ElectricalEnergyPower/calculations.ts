import { AppliancePreset, ElectricalEnergyResult } from './types';

export const APPLIANCE_PRESETS: AppliancePreset[] = [
  {
    id: 'heater',
    nameAr: 'مدفأة كهربائية (Electric Heater)',
    categoryAr: 'أجهزة تسخين ذات قدرة عالية',
    defaultPowerW: 2000,
    typicalHoursPerDay: 4,
    recommendedFuseA: 13,
  },
  {
    id: 'ac',
    nameAr: 'مكيف هواء / سبلت (Air Conditioner)',
    categoryAr: 'تبريد وتكييف',
    defaultPowerW: 2400,
    typicalHoursPerDay: 6,
    recommendedFuseA: 16,
  },
  {
    id: 'iron',
    nameAr: 'مكواة كهربائية (Electric Iron)',
    categoryAr: 'أجهزة كهرومنزلية حرارية',
    defaultPowerW: 1000,
    typicalHoursPerDay: 1,
    recommendedFuseA: 5,
  },
  {
    id: 'kettle',
    nameAr: 'غلاية ماء سريعة (Electric Kettle)',
    categoryAr: 'أجهزة غلي سريعة',
    defaultPowerW: 1800,
    typicalHoursPerDay: 0.5,
    recommendedFuseA: 10,
  },
  {
    id: 'tv',
    nameAr: 'شاشة تلفزيون (LED Television)',
    categoryAr: 'إلكترونيات وترفيه',
    defaultPowerW: 120,
    typicalHoursPerDay: 5,
    recommendedFuseA: 3,
  },
  {
    id: 'led',
    nameAr: 'مصباح إضاءة اقتصادي (LED Bulb)',
    categoryAr: 'إنارة موفرة للطاقة',
    defaultPowerW: 15,
    typicalHoursPerDay: 8,
    recommendedFuseA: 1,
  },
];

/**
 * Pure calculation for Electric Power and Energy:
 * P = V * I  =>  I = P / V
 * R = V^2 / P
 * E (Joules) = P (Watts) * t (seconds)
 * E (kWh) = (P (Watts) * t (hours)) / 1000
 */
export function calculateApplianceEnergy(
  voltageV: number,
  powerW: number,
  timeHours: number
): ElectricalEnergyResult {
  const safeV = Math.max(1, voltageV);
  const safeP = Math.max(0, powerW);
  const safeT = Math.max(0, timeHours);

  const currentA = safeP / safeV;
  const equivalentResistanceOhm = safeP > 0 ? (safeV * safeV) / safeP : 0;
  const energyJoules = safeP * (safeT * 3600);
  const energyKWh = (safeP * safeT) / 1000;

  // Fuse selection: fuse must be slightly higher than normal operating current
  const fuseOptions = [1, 3, 5, 10, 13, 16, 20, 30];
  const recommendedFuseA = fuseOptions.find((f) => f >= currentA * 1.25) || 30;

  let safetyAdviceAr = '';
  if (currentA > 10) {
    safetyAdviceAr =
      'تيار مرتفع (> 10A): يتطلب كابل توصيل سميك (مقطع عرضي 2.5 ملم² على الأقل) مع سلك تأريض متين ومأخذ ثلاثي لمنع الصعقات والحرائق الكهربائية.';
  } else if (currentA > 4) {
    safetyAdviceAr =
      'تيار متوسط: يجب التأكد من سلامة العازل الكهربائي واستخدام فاصم أمان مناسب.';
  } else {
    safetyAdviceAr =
      'تيار منخفض وآمن: جهاز اقتصادي لا يولد حرارة عالية في أسلاك التوصيل.';
  }

  return {
    currentA,
    equivalentResistanceOhm,
    powerW: safeP,
    powerKW: safeP / 1000,
    energyJoules,
    energyKWh,
    recommendedFuseA,
    safetyAdviceAr,
  };
}
