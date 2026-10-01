import { ForceResult } from './types';

export function calculateNetForce(leftForce: number, rightForce: number, mass: number): ForceResult {
  const safeMass = Math.max(0.1, mass);
  const rawNet = rightForce - leftForce;
  const netForce = Math.abs(rawNet);

  let direction: 'left' | 'right' | 'balanced' = 'balanced';
  let directionAr = 'قوى متزنة (المحصلة = 0 N)';
  let isBalanced = true;

  if (rawNet > 0.001) {
    direction = 'right';
    directionAr = `باتجاه اليمين (${netForce.toFixed(1)} N)`;
    isBalanced = false;
  } else if (rawNet < -0.001) {
    direction = 'left';
    directionAr = `باتجاه اليسار (${netForce.toFixed(1)} N)`;
    isBalanced = false;
  }

  const acceleration = netForce / safeMass;

  let explanationAr = '';
  if (isBalanced) {
    explanationAr = 'القوتان متساويتان في المقدار ومتعاكستان في الاتجاه، لذا تكون محصلة القوى صفراً والجسم متزن وساكن.';
  } else {
    explanationAr = `القوى غير متزنة: القوة الأكبر تتغلب وتتحرك الكتلة بتعجيل مقداره ${acceleration.toFixed(2)} m/s² نحو اتجاه القوة الأكبر.`;
  }

  return {
    netForce,
    direction,
    directionAr,
    isBalanced,
    acceleration,
    explanationAr,
  };
}
