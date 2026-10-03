import { AtmosphereLayerInfo, PropagationResult, WavePropagationType } from './types';

export const ATMOSPHERE_LAYERS: AtmosphereLayerInfo[] = [
  {
    id: 'troposphere',
    nameAr: 'طبقة التروبوسفير (Troposphere)',
    nameEn: 'Troposphere',
    minAltKm: 0,
    maxAltKm: 14,
    tempTrendAr: 'تنخفض درجة الحرارة مع الارتفاع بمعدل 6.5°C لكل كيلومتر',
    keyFeaturesAr: [
      'الطبقة الملاصقة لسطح الأرض، تشكل نحو 80% من كتلة الغلاف الجوي.',
      'تحدث فيها جميع الظواهر المناخية والجوية كالرياح والأمطار والغيوم والعواصف.',
      'تنتشر فيها الموجات اللاسلكية الأرضية (Ground Waves) متبعة انحناء الأرض.',
    ],
    color: '#38bdf8',
  },
  {
    id: 'stratosphere',
    nameAr: 'طبقة الستراتوسفير (Stratosphere)',
    nameEn: 'Stratosphere',
    minAltKm: 14,
    maxAltKm: 50,
    tempTrendAr: 'ترتفع درجة الحرارة مع الارتفاع بسبب امتصاص الأوزون للأشعة فوق البنفسجية',
    keyFeaturesAr: [
      'تمتد من 14 كم إلى 50 كم تقريباً، خالية من الغيوم والاضطرابات الجوية العنيفة.',
      'تحتوي على طبقة الأوزون (O₃) التي تمتص الأشعة فوق البنفسجية الضارة (UV).',
      'تُعد بيئة مثالية لطيران الطائرات النفاثة الحديثة ومناطيد الطقس.',
    ],
    color: '#06b6d4',
  },
  {
    id: 'mesosphere',
    nameAr: 'طبقة الميزوسفير (Mesosphere)',
    nameEn: 'Mesosphere',
    minAltKm: 50,
    maxAltKm: 85,
    tempTrendAr: 'أبرد طبقات الجو؛ تنخفض الحرارة لتصل إلى نحو 90°C تحت الصفر',
    keyFeaturesAr: [
      'تمتد من 50 كم حتى 85 كم، وتتكون من غازات خفيفة كالغازات النبيلة والهيليوم.',
      'تحمي الأرض من النيازك والشهب باحتراقها وتفتيتها بالاحتكاك قبل وصولها للأرض.',
    ],
    color: '#3b82f6',
  },
  {
    id: 'thermosphere',
    nameAr: 'طبقة الثرموسفير / الأيونوسفير (Thermosphere / Ionosphere)',
    nameEn: 'Thermosphere / Ionosphere',
    minAltKm: 85,
    maxAltKm: 500,
    tempTrendAr: 'ترتفع درجات الحرارة تدريجياً لتصل إلى مئات الدرجات المئوية',
    keyFeaturesAr: [
      'طبقة حرارية متأينة عالية الطاقة تحتوي على كميات هائلة من الإلكترونات والأيونات الحرة.',
      'تعكس الموجات اللاسلكية السماوية (Sky Waves) بترددات HF عائدة للأرض، مما يمكن من الاتصال القاري البعيد.',
      'تحدث فيها ظاهرة الشفق القطبي (الأورورا) الرائعة.',
    ],
    color: '#a855f7',
  },
  {
    id: 'exosphere',
    nameAr: 'طبقة الإكسوسفير (Exosphere)',
    nameEn: 'Exosphere',
    minAltKm: 500,
    maxAltKm: 1000,
    tempTrendAr: 'جزيئات غازية نادرة جداً ومتباعدة تندمج مع الفضاء الخارجي',
    keyFeaturesAr: [
      'أعلى طبقة جوية تمتد لأكثر من 500 كم فوق سطح الأرض.',
      'تدور فيها الأقمار الصناعية للاتصالات والطقس ومحطة الفضاء الدولية في مدارات منخفضة ومتوسطة.',
      'تخترقها الموجات الفضائية عالية التردد (Microwave / UHF) للتواصل بين الأرض والأقمار.',
    ],
    color: '#6366f1',
  },
];

/**
 * Finds active atmospheric layer based on altitude in kilometers.
 */
export function getLayerByAltitude(altitudeKm: number): AtmosphereLayerInfo {
  const safeAlt = Math.max(0, altitudeKm);
  const found = ATMOSPHERE_LAYERS.find(
    (layer) => safeAlt >= layer.minAltKm && safeAlt < layer.maxAltKm
  );
  return found || ATMOSPHERE_LAYERS[ATMOSPHERE_LAYERS.length - 1];
}

/**
 * Calculates radio wave propagation characteristics according to Iraqi curriculum:
 * - Ground wave (الموجات الأرضية): Low / Medium frequency, follows Earth's curve, short distance.
 * - Sky wave (الموجات السماوية): HF, reflects off Ionosphere, long continent-wide distance.
 * - Satellite space wave (الموجات الفضائية والأقمار الصناعية): UHF / Microwaves, penetrates Ionosphere to satellite and back.
 */
export function calculateRadioPropagation(type: WavePropagationType): PropagationResult {
  switch (type) {
    case 'ground-wave':
      return {
        waveTypeAr: 'موجات أرضية (Ground Waves)',
        frequencyBandAr: 'ترددات منخفضة ومتوسطة (530 kHz - 2 MHz)',
        propagationPathAr: 'تنتشر ملاصقة لسطح الأرض وتتبع انحناء تضاريس الكرة الأرضية.',
        ionosphereInteractionAr: 'لا تصل للأيونوسفير؛ حيث تنحني مع سطح الأرض وتتعرض لامتصاص متزايد من التربة.',
        maxCoverageRangeKm: 300,
        practicalApplicationsAr: 'البث الإذاعي المحلي (AM)، الاتصالات الساحلية والملاحية القريبة.',
      };
    case 'sky-wave':
      return {
        waveTypeAr: 'موجات سماوية (Sky Waves)',
        frequencyBandAr: 'ترددات عالية HF (من 2 MHz إلى 30 MHz)',
        propagationPathAr: 'تنطلق نحو طبقات الجو العليا وتنعكس على طبقة الأيونوسفير المتأينة عائدة إلى سطح الأرض لمسافات شاسعة.',
        ionosphereInteractionAr: 'انعكاس كلي على الطبقة المتأينة المشحونة نهاراً وليلاً مما يسمح بتجاوز انحناء الأرض.',
        maxCoverageRangeKm: 3500,
        practicalApplicationsAr: 'البث الإذاعي الدولي، اتصالات الهواة عبر القارات، والاتصالات البحرية العابرة للمحيطات.',
      };
    case 'satellite-space':
      return {
        waveTypeAr: 'موجات فضائية وأقمار صناعية (Space Waves & Satellites)',
        frequencyBandAr: 'ترددات فائقة العلو UHF و Microwaves (> 30 MHz)',
        propagationPathAr: 'تنتشر في خطوط مستقيمة مستقيمة مباشرة (Line of Sight)، تخترق طبقة الأيونوسفير لتصل إلى القمر الصناعي.',
        ionosphereInteractionAr: 'تنفذ وتخترق طبقة الأيونوسفير دون أن تنعكس، فيستقبلها القمر الصناعي ويكبرها ويعيد بثها للمحطات الأرضية.',
        maxCoverageRangeKm: 12000,
        practicalApplicationsAr: 'الاتصالات الخلوية الحديثة، الإنترنت الفضائي، البث التلفزيوني الفضائي (الدش)، ونظام تحديد المواقع GPS.',
      };
  }
}
