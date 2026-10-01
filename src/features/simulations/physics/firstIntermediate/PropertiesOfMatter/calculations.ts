import { MatterState, MatterProperties, Particle } from './types';

export function getMatterProperties(state: MatterState, temperatureC: number): MatterProperties {
  switch (state) {
    case 'solid':
      return {
        state: 'solid',
        stateAr: 'الحالة الصلبة',
        shapeAr: 'ثابت ومحدد',
        volumeAr: 'ثابت ومحدد',
        intermolecularDistanceAr: 'صغيرة جداً (متراصة)',
        cohesiveForceAr: 'كبيرة جداً وقوية',
        kineticEnergyLevelAr: 'حركة اهتزازية مقيدة حول موضع الاستقرار',
        particleSpeedMultiplier: Math.max(0.4, (temperatureC + 50) / 100),
        vibrationRadius: 3,
      };
    case 'liquid':
      return {
        state: 'liquid',
        stateAr: 'الحالة السائلة',
        shapeAr: 'متغير (يأخذ شكل الإناء)',
        volumeAr: 'ثابت ومحدد',
        intermolecularDistanceAr: 'متوسطة (أكبر من الصلبة)',
        cohesiveForceAr: 'متوسطة (أضعف من الصلبة)',
        kineticEnergyLevelAr: 'حركة انزلاقية وانتقالية محدودة',
        particleSpeedMultiplier: Math.max(0.8, (temperatureC + 50) / 80),
        vibrationRadius: 12,
      };
    case 'gas':
      return {
        state: 'gas',
        stateAr: 'الحالة الغازية',
        shapeAr: 'متغير (يملأ الإناء الحاوي)',
        volumeAr: 'متغير (قابل للانضغاط)',
        intermolecularDistanceAr: 'كبيرة جداً مقارنة بحجم الجزيئات',
        cohesiveForceAr: 'تكاد تكون معدومة',
        kineticEnergyLevelAr: 'حركة عشوائية سريعة في جميع الاتجاهات',
        particleSpeedMultiplier: Math.max(1.5, (temperatureC + 50) / 40),
        vibrationRadius: 50,
      };
  }
}

export function generateInitialParticles(count: number, width: number, height: number, state: MatterState): Particle[] {
  const particles: Particle[] = [];
  const cols = Math.ceil(Math.sqrt(count * 1.5));
  const rows = Math.ceil(count / cols);
  const spacingX = width / (cols + 1);
  const spacingY = height / (rows + 1);

  let id = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (id >= count) break;
      const baseX = (c + 1) * spacingX;
      let baseY = (r + 1) * spacingY;

      if (state === 'solid') {
        // Packed at the bottom center
        baseY = height * 0.55 + r * (spacingY * 0.65);
      } else if (state === 'liquid') {
        // Pool at bottom
        baseY = height * 0.5 + r * (spacingY * 0.7);
      }

      particles.push({
        id,
        x: baseX,
        y: baseY,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        baseX,
        baseY,
      });
      id++;
    }
  }

  return particles;
}
