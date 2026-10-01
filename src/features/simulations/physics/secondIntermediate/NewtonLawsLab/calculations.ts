import { NewtonLawScenario, NewtonLawResult } from './types';

export function calculateNewtonLawScenario(
  scenario: NewtonLawScenario,
  appliedForce: number,
  massA: number,
  massB: number
): NewtonLawResult {
  const safeMassA = Math.max(0.1, massA);
  const safeMassB = Math.max(0.1, massB);

  switch (scenario) {
    case 'inertia':
      return {
        scenario: 'inertia',
        lawNameAr: 'قانون نيوتن الأول (الاستمرارية والقصور الذاتي)',
        accelerationA: 0,
        explanationAr:
          '«الجسم الساكن يبقى ساكناً، والمتحرك بسرعة منتظمة يبقى متحركاً ما لم تؤثر فيه قوة خارجية تغير من حالته الحركية». القصور الذاتي هو مقاومة الجسم لتغيير حالته.',
      };

    case 'f_ma': {
      const accel = appliedForce / safeMassA;
      return {
        scenario: 'f_ma',
        lawNameAr: 'قانون نيوتن الثاني (F = m · a)',
        accelerationA: accel,
        explanationAr: `القوة المحصلة (${appliedForce} N) تكسب الكتلة تعجيلاً طردياً مع القوة وعكسياً مع الكتلة: a = ${accel.toFixed(2)} m/s².`,
      };
    }

    case 'action_reaction': {
      const accelA = appliedForce / safeMassA;
      const accelB = appliedForce / safeMassB;
      return {
        scenario: 'action_reaction',
        lawNameAr: 'قانون نيوتن الثالث (الفعل ورد الفعل)',
        accelerationA: accelA,
        accelerationB: accelB,
        explanationAr:
          '«لكل قوة فعل قوة رد فعل مساوية لها في المقدار ومعاكسة لها في الاتجاه وتؤثران في جسمين مختلفين». (F_A = -F_B).',
      };
    }
  }
}
