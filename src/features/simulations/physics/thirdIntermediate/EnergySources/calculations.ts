import { EnergySourceInfo, EnergySourceResult, EnergySourceType } from './types';

export const ENERGY_SOURCES_INFO: EnergySourceInfo[] = [
  {
    id: 'solar',
    titleAr: 'الطاقة الشمسية (الخلايا الكهروضوئية)',
    categoryAr: 'متجددة (نظيفة)',
    isRenewable: true,
    conversionChainAr: ['طاقة إشعاعية شمسية (فوتونات)', 'إثارة إلكترونات في شبه موصل (سيليكون)', 'طاقة كهربائية مباشرة (تيار مستمر DC)'],
    dependabilityAr: 'تعتمد على سطوع الشمس وساعات النهار وتتأثر بالغيوم والغبار.',
    environmentalImpactAr: 'انبعاثات معدومة أثناء التشغيل، طاقة صديقة للمناخ.',
    sustainabilityRating: 5,
    formulaNoteAr: 'P_solar = الإشعاع الشمسي (W/m²) × مساحة الألواح (m²) × كفاءة الخلية (η)',
  },
  {
    id: 'wind',
    titleAr: 'طاقة الرياح (التوربينات الهوائية)',
    categoryAr: 'متجددة (نظيفة)',
    isRenewable: true,
    conversionChainAr: ['طاقة حركية للرياح (الهواء المتحرك)', 'دوران ريش التوربين والمحور', 'مولد كهرومغناطيسي', 'طاقة كهربائية (AC)'],
    dependabilityAr: 'تتطلب سرعات رياح مستمرة لا تقل عن 4 م/ث لتشغيل التوربين.',
    environmentalImpactAr: 'نظيفة ومستدامة، تتطلب دراسة مسارات هجرة الطيور والضوضاء الميكانيكية.',
    sustainabilityRating: 5,
    formulaNoteAr: 'P_wind = 0.5 × ρ_air × A_rotor × v³ × Cp (تتناسب طردياً مع مكعب سرعة الرياح v³)',
  },
  {
    id: 'hydro',
    titleAr: 'الطاقة الكهرومائية (المساقط والسدود)',
    categoryAr: 'متجددة (نظيفة)',
    isRenewable: true,
    conversionChainAr: ['طاقة كامنة ثقالية للماء المخزون خلف السد', 'طاقة حركية لتدفق الماء عبر الأنابيب', 'دوران التوربين المائي المغمور', 'طاقة كهربائية في المولد'],
    dependabilityAr: 'عالية جداً؛ يمكن التحكم بتدفق المياه وتوفير طاقة حمل أساسية مستقرة.',
    environmentalImpactAr: 'طاقة نظيفة عديمة الكربون، تتطلب إدارة مائية دقيقة لحفظ الموارد النهرية.',
    sustainabilityRating: 4,
    formulaNoteAr: 'P_hydro = كثافة الماء (ρ) × التعجيل الأرضي (g) × معدل التدفق (Q) × ارتفاع السقوط (h) × η',
  },
  {
    id: 'fossil',
    titleAr: 'الوقود الأحفوري (محطات النفط والغاز والفحم)',
    categoryAr: 'غير متجددة (أحفورية)',
    isRenewable: false,
    conversionChainAr: ['طاقة كيميائية كامنة في الوقود', 'طاقة حرارية بالاحتراق في المرجل', 'طاقة حركية للبخار عالي الضغط في التوربين', 'طاقة كهربائية بالمولد'],
    dependabilityAr: 'مستقرة وقابلة للتشغيل المستمر على مدار 24 ساعة دون الاعتماد على الطقس.',
    environmentalImpactAr: 'انبعاثات كربونية وغازات دفيئة تسبب الاحتباس الحراري وتلوث الهواء.',
    sustainabilityRating: 1,
    formulaNoteAr: 'P_thermal = معدل حرق الوقود (kg/s) × القيمة الحرارية للوقود (J/kg) × كفاءة الدورة الحرارية (η)',
  },
  {
    id: 'biomass',
    titleAr: 'طاقة الوقود الحيوي (Biomass)',
    categoryAr: 'متجددة (نظيفة)',
    isRenewable: true,
    conversionChainAr: ['طاقة كيميائية مخزونة في الكتلة الحيوية النباتية والحيوانية', 'تحلل لاهوائي أو تخمير كحولي لإنتاج الغاز الحيوي (Biogas)', 'احتراق نظيف أو وقود محركات', 'طاقة كهربائية أو حرارية'],
    dependabilityAr: 'متوسطة إلى عالية وفق توفر المخلفات والمحاصيل الزراعية.',
    environmentalImpactAr: 'دورة كربونية شبه محايدة بيئياً وإدارة فعالة للنفايات العضوية.',
    sustainabilityRating: 4,
    formulaNoteAr: 'طاقة متجددة من الكتلة الحيوية العضوية (وقود الإيثانول وغاز الميثان الحيوي)',
  },
];

/**
 * Calculates estimated educational outputs for the active energy source.
 */
export function calculateSourceOutput(
  type: EnergySourceType,
  param1: number, // sunlight (W/m²) OR wind speed (m/s) OR water flow (m³/s) OR fuel burn rate (kg/s)
  param2: number  // area (m²) OR blade radius (m) OR dam height (m) OR thermal efficiency (%)
): EnergySourceResult {
  let outputPowerKW = 0;
  let efficiencyPercent = 0;
  let statusDescriptionAr = '';

  if (type === 'solar') {
    const irradiance = Math.max(0, param1); // W/m²
    const area = Math.max(1, param2); // m²
    efficiencyPercent = 20; // 20% typical commercial solar panel
    outputPowerKW = (irradiance * area * (efficiencyPercent / 100)) / 1000;
    statusDescriptionAr = `توليد شمسي بمعدل إشعاع ${irradiance} W/m² على مساحة ${area} م².`;
  } else if (type === 'wind') {
    const windSpeed = Math.max(0, param1); // m/s
    const radius = Math.max(1, param2); // m
    const area = Math.PI * radius * radius;
    const airDensity = 1.225; // kg/m^3
    const cp = 0.40; // Betz limit fraction
    efficiencyPercent = 40;
    const rawWatts = 0.5 * airDensity * area * Math.pow(windSpeed, 3) * cp;
    outputPowerKW = rawWatts / 1000;
    statusDescriptionAr =
      windSpeed < 3
        ? 'سرعة الرياح أقل من حد بدء الدوران (Cut-in speed). التوربين متوقف حالياً.'
        : `رياح بسرعة ${windSpeed} م/ث تدير مروحة قطرها ${(radius * 2).toFixed(0)} متر.`;
  } else if (type === 'hydro') {
    const flow = Math.max(0, param1); // m³/s
    const head = Math.max(1, param2); // m
    efficiencyPercent = 85;
    const rho = 1000; // kg/m^3
    const g = 9.8;
    const rawWatts = rho * g * flow * head * (efficiencyPercent / 100);
    outputPowerKW = rawWatts / 1000;
    statusDescriptionAr = `مسقط مائي بارتفاع ${head} متر وتدفق هيدروليكي ${flow} م³/ثانية.`;
  } else if (type === 'fossil') {
    const fuelRate = Math.max(0, param1); // kg/s
    efficiencyPercent = Math.min(60, Math.max(20, param2)); // %
    const fuelEnergy = 42e6; // 42 MJ/kg for natural gas/diesel
    const rawWatts = fuelRate * fuelEnergy * (efficiencyPercent / 100);
    outputPowerKW = rawWatts / 1000;
    statusDescriptionAr = `محطة حرارية باستهلاك ${fuelRate} كغم/ثانية وكفاءة دورة حرارية ${efficiencyPercent}%.`;
  } else {
    // Biomass
    const wasteTonsPerDay = Math.max(0, param1);
    efficiencyPercent = 35;
    outputPowerKW = (wasteTonsPerDay * 12e9 * (efficiencyPercent / 100)) / (24 * 3600 * 1000);
    statusDescriptionAr = `محطة وقود حيوي تعالج ${wasteTonsPerDay} طن نفايات عضوية يومياً.`;
  }

  const outputPowerMW = outputPowerKW / 1000;
  const dailyEnergyMWh = (outputPowerKW * 24) / 1000;
  const isClean = type !== 'fossil';
  const annualCO2AvoidedTons = isClean ? Math.round(dailyEnergyMWh * 365 * 0.7) : 0;

  return {
    outputPowerKW,
    outputPowerMW,
    dailyEnergyMWh,
    annualCO2AvoidedTons,
    efficiencyPercent,
    statusDescriptionAr,
  };
}
