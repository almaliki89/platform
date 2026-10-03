import { MagneticFieldPoint, MagnetInteraction, MagnetismResult, MaterialType } from './types';

/**
 * Calculates magnetic field vector (Bx, By) at point (px, py)
 * due to a bar magnet centered at (cx, cy) with length L and angle theta.
 * North pole at (cx + (L/2)*cos(theta), cy + (L/2)*sin(theta))
 * South pole at (cx - (L/2)*cos(theta), cy - (L/2)*sin(theta))
 */
export function calculateDipoleFieldAt(
  px: number,
  py: number,
  cx: number,
  cy: number,
  length: number,
  angleRad: number,
  strength: number = 10000
): { bx: number; by: number; magnitude: number } {
  const halfL = length / 2;
  const nx = cx + halfL * Math.cos(angleRad);
  const ny = cy + halfL * Math.sin(angleRad);

  const sx = cx - halfL * Math.cos(angleRad);
  const sy = cy - halfL * Math.sin(angleRad);

  // Field from North pole (points away from N)
  const rnx = px - nx;
  const rny = py - ny;
  const distN2 = rnx * rnx + rny * rny + 100; // softening
  const distN = Math.sqrt(distN2);
  const fn = strength / (distN * distN2);
  const bnx = fn * rnx;
  const bny = fn * rny;

  // Field from South pole (points towards S)
  const rsx = px - sx;
  const rsy = py - sy;
  const distS2 = rsx * rsx + rsy * rsy + 100; // softening
  const distS = Math.sqrt(distS2);
  const fs = strength / (distS * distS2);
  const bsx = -fs * rsx;
  const bsy = -fs * rsy;

  const bx = bnx + bsx;
  const by = bny + bsy;
  const magnitude = Math.sqrt(bx * bx + by * by);

  return { bx, by, magnitude };
}

/**
 * Calculates complete magnetism state including compass angle,
 * interaction between two magnets, and response of test materials.
 */
export function calculateMagnetismState(
  hasSecondMagnet: boolean,
  magnet1AngleDeg: number,
  magnet2AngleDeg: number,
  magnet2DistancePx: number,
  compassX: number,
  compassY: number,
  selectedMaterial: MaterialType
): MagnetismResult {
  const m1Center = { x: 200, y: 160 };
  const rad1 = (magnet1AngleDeg * Math.PI) / 180;
  const f1 = calculateDipoleFieldAt(compassX, compassY, m1Center.x, m1Center.y, 110, rad1);

  let bxTotal = f1.bx;
  let byTotal = f1.by;

  let interaction: MagnetInteraction = 'none';
  let forceDescriptionAr = 'مغناطيس دائم منفرد في حيز التجربة.';

  if (hasSecondMagnet) {
    const m2Center = { x: m1Center.x + magnet2DistancePx, y: m1Center.y };
    const rad2 = (magnet2AngleDeg * Math.PI) / 180;
    const f2 = calculateDipoleFieldAt(compassX, compassY, m2Center.x, m2Center.y, 110, rad2);
    bxTotal += f2.bx;
    byTotal += f2.by;

    // Check poles facing each other:
    // Right pole of Magnet 1:
    const pole1Facing = Math.cos(rad1) > 0 ? 'N' : 'S';
    // Left pole of Magnet 2:
    const pole2Facing = Math.cos(rad2) > 0 ? 'S' : 'N';

    if (pole1Facing === pole2Facing) {
      interaction = 'repulsion';
      forceDescriptionAr = `تنافر بين القطبين المتقابلين المتماثلين (${pole1Facing === 'N' ? 'شمالي-شمالي' : 'جنوبي-جنوبي'}).`;
    } else {
      interaction = 'attraction';
      forceDescriptionAr = 'تجاذب بين القطبين المتقابلين المختلفين (شمالي-جنوبي).';
    }
  }

  const compassAngleRad = Math.atan2(byTotal, bxTotal);
  const compassAngleDeg = (compassAngleRad * 180) / Math.PI;
  const fieldStrengthRelative = Math.min(100, Math.round(Math.sqrt(bxTotal * bxTotal + byTotal * byTotal) * 10) / 10);

  let materialResponseAr = '';
  switch (selectedMaterial) {
    case 'ferromagnetic':
      materialResponseAr =
        'مادة فيرومغناطيسية (كالحديد والفولاذ): تنجذب بقوة شديدة نحو المغناطيس الدائم وتمتلك نفاذية مغناطيسية عالية.';
      break;
    case 'paramagnetic':
      materialResponseAr =
        'مادة بارامغناطيسية (كالألمنيوم والبلاتين): تنجذب نحو المغناطيس القوي تجاذباً ضعيفاً جداً يكاد لا يُرى بالعين المجردة.';
      break;
    case 'diamagnetic':
      materialResponseAr =
        'مادة دايامغناطيسية (كالنحاس والفسفور والبزموث): تتنافر مع المجال المغناطيسي القوي تنافراً ضعيفاً جداً.';
      break;
  }

  return {
    interaction,
    forceDescriptionAr,
    compassAngleDeg,
    fieldStrengthRelative,
    materialResponseAr,
  };
}
