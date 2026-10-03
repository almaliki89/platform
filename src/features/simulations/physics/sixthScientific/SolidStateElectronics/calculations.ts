import {
  MaterialType,
  DopingType,
  BiasType,
  EnergyBandResult,
  DopingResult,
  PnJunctionResult,
} from './types';

/**
 * Energy Band analysis for conductors, semiconductors, and insulators
 */
export function calculateEnergyBands(material: MaterialType): EnergyBandResult {
  switch (material) {
    case 'copper':
      return {
        material,
        materialNameAr: 'النحاس (Copper - موصل)',
        valenceBandFilled: true,
        energyGapEv: 0,
        conductionBandOccupancy: 'حزمة التوصيل متداخلة مع حزمة التكافؤ (إلكترونات حرة وفيرة)',
        classificationAr: 'مادة موصلة (Conductor)',
      };
    case 'silicon':
      return {
        material,
        materialNameAr: 'السيليكون (Silicon - شبه موصل)',
        valenceBandFilled: true,
        energyGapEv: 1.1,
        conductionBandOccupancy: 'فجوة طاقة محظورة ضيقة (1.1 eV) تسمح بالانتقال الحراري',
        classificationAr: 'شبه موصل نقي (Semiconductor)',
      };
    case 'germanium':
      return {
        material,
        materialNameAr: 'الجرمانيوم (Germanium - شبه موصل)',
        valenceBandFilled: true,
        energyGapEv: 0.72,
        conductionBandOccupancy: 'فجوة طاقة محظورة ضيقة جداً (0.72 eV) عند درجة حرارة الغرفة',
        classificationAr: 'شبه موصل نقي (Semiconductor)',
      };
    case 'glass':
    default:
      return {
        material,
        materialNameAr: 'الزجاج / الماس (Insulator - عازل)',
        valenceBandFilled: true,
        energyGapEv: 5.4,
        conductionBandOccupancy: 'حزمة التوصيل خالية تماماً، فجوة محظورة واسعة جداً (> 5 eV)',
        classificationAr: 'مادة عازلة (Insulator)',
      };
  }
}

/**
 * Semiconductor Doping Characteristics
 */
export function calculateDoping(
  dopingType: DopingType,
  baseMaterial: 'silicon' | 'germanium'
): DopingResult {
  if (dopingType === 'n-type') {
    return {
      dopingType,
      baseMaterial,
      impurityNameAr: 'شائبة خماسية التكافؤ مثل الفسفور (P) أو الأنتيمون (Sb)',
      dopantValence: 5,
      majorityCarriersAr: 'الإلكترونات الحرة (Free Electrons)',
      minorityCarriersAr: 'الفجوات الموجبة (Holes)',
      extraEnergyLevelAr: 'المستوى المانح (Donor Level ED) يقع مباشرة تحت حزمة التوصيل',
    };
  } else if (dopingType === 'p-type') {
    return {
      dopingType,
      baseMaterial,
      impurityNameAr: 'شائبة ثلاثية التكافؤ مثل البورون (B) أو الإنديوم (In)',
      dopantValence: 3,
      majorityCarriersAr: 'الفجوات الموجبة (Holes)',
      minorityCarriersAr: 'الإلكترونات الحرة (Free Electrons)',
      extraEnergyLevelAr: 'المستوى القابل (Acceptor Level EA) يقع مباشرة فوق حزمة التكافؤ',
    };
  } else {
    return {
      dopingType,
      baseMaterial,
      impurityNameAr: 'شبه موصل نقي بدون شوائب (Intrinsic)',
      dopantValence: 4,
      majorityCarriersAr: 'أزواج (إلكترون - فجوة) متساوية بالعدد بالتوليد الحراري',
      minorityCarriersAr: 'لا توجد حاملات أغلبية أو أقلية (توازن تام)',
      extraEnergyLevelAr: 'لا توجد مستويات إضافية داخل فجوة الطاقة المحظورة',
    };
  }
}

/**
 * P-N Junction & Diode Biasing:
 * Silicon Barrier Potential V0 = 0.7 V
 * Germanium Barrier Potential V0 = 0.3 V
 */
export function calculatePnJunction(
  baseSemiconductor: 'silicon' | 'germanium',
  biasType: BiasType,
  appliedVoltageV: number
): PnJunctionResult {
  const v0 = baseSemiconductor === 'silicon' ? 0.7 : 0.3;
  const safeV = Math.max(0, appliedVoltageV);

  let depletionWidth = 1.0; // microns
  let netCurrent = 0; // mA
  let conductionState = '';

  if (biasType === 'forward') {
    // Forward bias: V opposes V0
    if (safeV >= v0) {
      depletionWidth = 0.1; // very narrow
      netCurrent = ((safeV - v0) / 0.05) * 20; // steep forward conduction in mA
      conductionState = `انحياز أمامي موصل: الجهد المطبق (${safeV}V) تجاوز حاجز الجهد (${v0}V)`;
    } else {
      depletionWidth = Math.max(0.2, 1.0 - (safeV / v0) * 0.8);
      netCurrent = (safeV / v0) * 0.5;
      conductionState = `انحياز أمامي دون عتبة التوصيل (${safeV}V < ${v0}V)`;
    }
  } else if (biasType === 'reverse') {
    // Reverse bias: V widens depletion layer
    depletionWidth = 1.0 + Math.min(2.5, safeV * 0.3);
    netCurrent = 0.001; // tiny reverse saturation current ~ 1 μA
    conductionState = 'انحياز عكسي غير موصل: اتساع منطقة الاستنزاف وزيادة حاجز الجهد';
  } else {
    // Unbiased
    depletionWidth = 1.0;
    netCurrent = 0;
    conductionState = `حالة اتزان سكوني: حاجز الجهد الطبيعي = ${v0} V`;
  }

  return {
    baseSemiconductor,
    barrierPotentialV0: v0,
    biasType,
    appliedVoltageV: safeV,
    depletionWidthMicrons: depletionWidth,
    netCurrentMa: netCurrent,
    conductionStateAr: conductionState,
  };
}
