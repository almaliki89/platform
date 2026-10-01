import { ReflectionCalculations } from './types';

/**
 * Pure calculations for Laws of Light Reflection:
 * Angle of Incidence (theta_i) = Angle of Reflection (theta_r)
 */
export function calculateReflection(incidenceAngleDeg: number): ReflectionCalculations {
  const clampedAngle = Math.max(0, Math.min(85, incidenceAngleDeg));
  const reflectionAngleDeg = clampedAngle;

  return {
    incidenceAngleDeg: clampedAngle,
    reflectionAngleDeg,
    isLawSatisfied: true,
    explanationAr: `وفق القانون الثاني للانعكاس: زاوية السقوط (${clampedAngle.toFixed(1)}°) = زاوية الانعكاس (${reflectionAngleDeg.toFixed(1)}°). كلاهما مقاس بالنسبة للعمود المقام على السطح العاكس.`,
  };
}
