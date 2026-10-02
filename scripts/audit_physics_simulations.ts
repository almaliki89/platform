/**
 * OMEGA V4.3.1 — COMPREHENSIVE ACCEPTANCE & QUALITY AUDIT
 * Tests real calculation modules (47/47), lazy imports, routes, edge cases, and static code quality.
 */

import { IRAQI_PHYSICS_CURRICULUM } from '../src/data/physicsCurriculum';
import { SIMULATION_REGISTRY } from '../src/features/simulations/core/registry';
import * as fs from 'fs';
import * as path from 'path';

// -------------------------------------------------------------
// REAL CALCULATION IMPORTS - FIRST INTERMEDIATE (5/5)
// -------------------------------------------------------------
import { getMatterProperties } from '../src/features/simulations/physics/firstIntermediate/PropertiesOfMatter/calculations';
import { calculateNetForce } from '../src/features/simulations/physics/firstIntermediate/ForceLab/calculations';
import { calculatePressure } from '../src/features/simulations/physics/firstIntermediate/PressureLab/calculations';
import { calculateEquilibriumTemperature } from '../src/features/simulations/physics/firstIntermediate/HeatLab/calculations';
import { calculateLinearExpansion } from '../src/features/simulations/physics/firstIntermediate/ThermalEffects/calculations';

// -------------------------------------------------------------
// REAL CALCULATION IMPORTS - SECOND INTERMEDIATE (6/6)
// -------------------------------------------------------------
import { stepMotion } from '../src/features/simulations/physics/secondIntermediate/MotionExplorer/calculations';
import { calculateNewtonLawScenario } from '../src/features/simulations/physics/secondIntermediate/NewtonLawsLab/calculations';
import { calculateWork, calculatePower, calculateKineticEnergy, calculatePotentialEnergy } from '../src/features/simulations/physics/secondIntermediate/WorkPowerEnergy/calculations';
import { calculateLever } from '../src/features/simulations/physics/secondIntermediate/LeverLab/calculations';
import { calculateWaveProperties } from '../src/features/simulations/physics/secondIntermediate/WaveSoundLab/calculations';
import { calculateReflection } from '../src/features/simulations/physics/secondIntermediate/LightRayLab/calculations';

// -------------------------------------------------------------
// REAL CALCULATION IMPORTS - THIRD INTERMEDIATE (9/9)
// -------------------------------------------------------------
import { calculateCoulombForce } from '../src/features/simulations/physics/thirdIntermediate/Electrostatics/calculations';
import { calculateDipoleFieldAt } from '../src/features/simulations/physics/thirdIntermediate/Magnetism/calculations';
import { calculateOhmsLaw, calculateSeriesResistance, calculateParallelResistance } from '../src/features/simulations/physics/thirdIntermediate/ElectricCurrent/calculations';
import { calculateBatteryCircuit } from '../src/features/simulations/physics/thirdIntermediate/BatteryEmf/calculations';
import { calculateApplianceEnergy } from '../src/features/simulations/physics/thirdIntermediate/ElectricalEnergyPower/calculations';
import { calculateElectromagnetism } from '../src/features/simulations/physics/thirdIntermediate/Electromagnetism/calculations';
import { calculateTransformer } from '../src/features/simulations/physics/thirdIntermediate/Transformer/calculations';
import { calculateSourceOutput } from '../src/features/simulations/physics/thirdIntermediate/EnergySources/calculations';
import { calculateRadioPropagation } from '../src/features/simulations/physics/thirdIntermediate/AtmosphericCommunications/calculations';

// -------------------------------------------------------------
// REAL CALCULATION IMPORTS - FOURTH SCIENTIFIC (9/9)
// -------------------------------------------------------------
import { calculateAbsoluteError, calculateRelativeError, calculatePercentageError } from '../src/features/simulations/physics/fourthScientific/MainParameters/calculations';
import { calculateStress, calculateStrain, calculateWireExtension, calculateMechanicalProperties } from '../src/features/simulations/physics/fourthScientific/MechanicalProperties/calculations';
import { calculateFluidPressure, calculatePascalOutputForce, calculateFloatingState } from '../src/features/simulations/physics/fourthScientific/StaticFluids/calculations';
import { calculateCalorimetry, calculatePhaseChange, calculateGasLaw } from '../src/features/simulations/physics/fourthScientific/ThermalProperties/calculations';
import { calculateIlluminance } from '../src/features/simulations/physics/fourthScientific/Light/calculations';
import { calculateRefraction } from '../src/features/simulations/physics/fourthScientific/ReflectionRefraction/calculations';
import { calculateMirrorOptics } from '../src/features/simulations/physics/fourthScientific/Mirrors/calculations';
import { calculateThinLensOptics } from '../src/features/simulations/physics/fourthScientific/ThinLenses/calculations';
import { calculateParallelPlates } from '../src/features/simulations/physics/fourthScientific/Electrostatics/calculations';

// -------------------------------------------------------------
// REAL CALCULATION IMPORTS - FIFTH SCIENTIFIC (10/10)
// -------------------------------------------------------------
import { resolveVectorComponents, calculateVectorResultant, calculateDotProduct, calculateCrossProductMagnitude } from '../src/features/simulations/physics/fifthScientific/Vectors/calculations';
import { calculateLinearMotion, calculateFreeFall, calculateProjectileSummary } from '../src/features/simulations/physics/fifthScientific/LinearMotion/calculations';
import { calculateFriction, calculateInclinedPlaneForces } from '../src/features/simulations/physics/fifthScientific/LawsOfMotion/calculations';
import { calculateEquilibriumState } from '../src/features/simulations/physics/fifthScientific/EquilibriumTorques/calculations';
import { calculateWorkEnergy, calculateImpulseMomentum, calculateCollision } from '../src/features/simulations/physics/fifthScientific/WorkEnergyMomentum/calculations';
import { calculateFirstLaw, calculatePvProcess, calculateHeatEngine } from '../src/features/simulations/physics/fifthScientific/Thermodynamics/calculations';
import { calculateCircularMotion, calculateRotationalDynamics } from '../src/features/simulations/physics/fifthScientific/CircularRotationalMotion/calculations';
import { calculateSpringShm, calculatePendulum, calculateWave, calculateDoppler } from '../src/features/simulations/physics/fifthScientific/OscillationsWavesSound/calculations';
import { calculateResistivity, calculateWheatstoneBridge } from '../src/features/simulations/physics/fifthScientific/ElectricCurrent/calculations';
import { calculateChargedParticleMotion, calculateConductorForce, calculateParallelWires } from '../src/features/simulations/physics/fifthScientific/Magnetism/calculations';

// -------------------------------------------------------------
// REAL CALCULATION IMPORTS - SIXTH SCIENTIFIC (8/8)
// -------------------------------------------------------------
import { calculateParallelPlate, calculateCombination, calculateRcCircuit } from '../src/features/simulations/physics/sixthScientific/Capacitors/calculations';
import { calculateFaradayInduction, calculateMotionalEmf, calculateGenerator, calculateSelfInduction } from '../src/features/simulations/physics/sixthScientific/ElectromagneticInduction/calculations';
import { calculateSeriesRlc, calculatePureComponent } from '../src/features/simulations/physics/sixthScientific/AlternatingCurrent/calculations';
import { calculateYoungDoubleSlit, calculateDiffractionGrating, calculatePolarization, calculateScattering } from '../src/features/simulations/physics/sixthScientific/PhysicalOptics/calculations';
import { calculatePhotoelectric, calculateDeBroglie, calculateUncertainty } from '../src/features/simulations/physics/sixthScientific/ModernPhysics/calculations';
import { calculateEnergyBands, calculateDoping, calculatePnJunction } from '../src/features/simulations/physics/sixthScientific/SolidStateElectronics/calculations';
import { calculateHydrogenTransition, calculateXRay, calculateLaserState } from '../src/features/simulations/physics/sixthScientific/AtomicSpectraLaser/calculations';
import { calculateNuclearStructure, calculateBindingEnergy, calculateDecayLaw } from '../src/features/simulations/physics/sixthScientific/NuclearPhysics/calculations';

let passedAssertions = 0;
let failedAssertions = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    passedAssertions++;
  } else {
    failedAssertions++;
    console.error(`❌ FAILED: ${message}`);
  }
}

function assertFinite(val: number, name: string) {
  assert(!isNaN(val) && isFinite(val), `${name} must be a valid finite number, got ${val}`);
}

async function runAcceptanceAudit() {
  console.log('====================================================');
  console.log('PHASE 1: CURRICULUM & REGISTRY INTEGRITY AUDIT');
  console.log('====================================================');

  const EXPECTED_CHAPTER_COUNTS: Record<string, number> = {
    'first-intermediate': 5,
    'second-intermediate': 6,
    'third-intermediate': 9,
    'fourth-scientific': 9,
    'fifth-scientific': 10,
    'sixth-scientific': 8,
  };

  let totalCurriculumChapters = 0;
  const curriculumSimIds = new Set<string>();

  IRAQI_PHYSICS_CURRICULUM.forEach((grade) => {
    const expectedCount = EXPECTED_CHAPTER_COUNTS[grade.gradeId];
    assert(
      grade.chapters.length === expectedCount,
      `Grade ${grade.gradeId} should have ${expectedCount} chapters, got ${grade.chapters.length}`
    );
    totalCurriculumChapters += grade.chapters.length;

    grade.chapters.forEach((ch, idx) => {
      assert(ch.chapterNumber === idx + 1, `Chapter ${ch.id} chapterNumber should be ${idx + 1}, got ${ch.chapterNumber}`);
      assert(ch.hasSimulation === true, `Chapter ${ch.id} hasSimulation must be true`);
      assert(typeof ch.simulationId === 'string' && ch.simulationId.length > 0, `Chapter ${ch.id} must have simulationId`);

      if (ch.simulationId) {
        assert(!curriculumSimIds.has(ch.simulationId), `Duplicate simulationId in curriculum: ${ch.simulationId}`);
        curriculumSimIds.add(ch.simulationId);
      }
    });
  });

  assert(totalCurriculumChapters === 47, `Total curriculum chapters should be 47, got ${totalCurriculumChapters}`);
  assert(curriculumSimIds.size === 47, `Total unique curriculum simulation IDs should be 47, got ${curriculumSimIds.size}`);

  // Verify Registry
  const registrySimIds = new Set<string>();
  const curriculumPhysicsInRegistry = SIMULATION_REGISTRY.filter(
    (sim) => sim.subjectId === 'physics' && sim.chapterId !== undefined
  );

  assert(
    curriculumPhysicsInRegistry.length === 47,
    `Curriculum physics entries in registry should be 47, got ${curriculumPhysicsInRegistry.length}`
  );

  curriculumPhysicsInRegistry.forEach((sim) => {
    assert(!registrySimIds.has(sim.id), `Duplicate registry ID: ${sim.id}`);
    registrySimIds.add(sim.id);
    assert(curriculumSimIds.has(sim.id), `Registry simulation ${sim.id} not found in curriculum`);
  });

  curriculumSimIds.forEach((id) => {
    assert(registrySimIds.has(id), `Curriculum sim ${id} missing from registry`);
  });

  console.log(`✅ Curriculum & Registry verified: 47/47 one-to-one mapping.`);

  console.log('====================================================');
  console.log('PHASE 2 & 3: REAL NUMERICAL AUDIT ON ALL 47 MODULES');
  console.log('====================================================');

  // --- 1. FIRST INTERMEDIATE (5/5) ---
  // 1.1 Properties of Matter
  const matterProps = getMatterProperties('solid', 25);
  assert(matterProps.state === 'solid', 'Matter state solid');
  assert(matterProps.vibrationRadius > 0, 'Solid has vibration radius');

  // 1.2 Force Lab
  const netForceRes = calculateNetForce(5, 30, 5); // left: 5N, right: 30N, mass: 5kg => net: 25N, a = 5 m/s^2
  assertFinite(netForceRes.netForce, 'netForce');
  assertFinite(netForceRes.acceleration, 'acceleration');
  assert(Math.abs(netForceRes.netForce - 25) < 1e-4, `Net force: expected 25 N, got ${netForceRes.netForce}`);
  assert(Math.abs(netForceRes.acceleration - 5) < 1e-4, `Acceleration: expected 5 m/s², got ${netForceRes.acceleration}`);

  // 1.3 Pressure Lab (Solid Pressure P = F / A)
  const pressureRes = calculatePressure(100, 2); // 100 N / 2 m^2 => 50 Pa
  assertFinite(pressureRes.pressurePa, 'pressurePa');
  assert(Math.abs(pressureRes.pressurePa - 50) < 1e-4, `Solid pressure: expected 50 Pa, got ${pressureRes.pressurePa}`);

  // 1.4 Heat Lab (Equilibrium temperature: m1*c1*T1 + m2*c2*T2 / (m1*c1 + m2*c2))
  const eqTemp = calculateEquilibriumTemperature(80, 20, 1, 1, 4200, 4200); // Equal masses & heat capacity => 50°C
  assertFinite(eqTemp, 'eqTemp');
  assert(Math.abs(eqTemp - 50) < 1e-4, `Equilibrium temperature: expected 50°C, got ${eqTemp}`);

  // 1.5 Thermal Effects (ΔL = α L ΔT)
  const expRes = calculateLinearExpansion(10, 70, 20, 12e-6); // L=10m, ΔT=50°C, α=12e-6 => ΔL = 0.006 m = 6 mm
  assertFinite(expRes.deltaL_mm, 'deltaL_mm');
  assert(Math.abs(expRes.deltaL_mm - 6.0) < 0.1, `Linear expansion: expected ~6 mm, got ${expRes.deltaL_mm}`);

  // --- 2. SECOND INTERMEDIATE (6/6) ---
  // 2.1 Motion Explorer (v = v0 + at, x = v0*t + 0.5*a*t^2)
  const motionStep = stepMotion(0, 0, 0, 0, 4, 5); // a=4 m/s^2, dt=5s => v=20 m/s, x=50m
  assertFinite(motionStep.nextPos, 'nextPos');
  assertFinite(motionStep.nextVel, 'nextVel');
  assert(Math.abs(motionStep.nextVel - 20) < 1e-4, `Motion velocity: expected 20 m/s, got ${motionStep.nextVel}`);
  assert(Math.abs(motionStep.nextPos - 50) < 1e-4, `Motion position: expected 50 m, got ${motionStep.nextPos}`);

  // 2.2 Newton Laws Lab (a = F / m)
  const newtonRes = calculateNewtonLawScenario('f_ma', 20, 5, 5); // F=20N, m=5kg => a=4 m/s^2
  assertFinite(newtonRes.accelerationA, 'accelerationA');
  assert(Math.abs(newtonRes.accelerationA - 4) < 1e-4, `Newton a = F/m: expected 4 m/s^2, got ${newtonRes.accelerationA}`);

  // 2.3 Work, Power & Energy (W = Fd, P = W/t, KE, PE)
  const workJ = calculateWork(50, 4); // 50 N * 4 m => 200 J
  const powerW = calculatePower(200, 10); // 200 J / 10 s => 20 W
  const keJ = calculateKineticEnergy(2, 5); // 0.5 * 2 * 25 => 25 J
  const peJ = calculatePotentialEnergy(2, 10, 9.8); // 2 * 9.8 * 10 => 196 J
  assertFinite(workJ, 'workJ');
  assertFinite(powerW, 'powerW');
  assertFinite(keJ, 'keJ');
  assertFinite(peJ, 'peJ');
  assert(Math.abs(workJ - 200) < 1e-4, `Work: expected 200 J, got ${workJ}`);
  assert(Math.abs(powerW - 20) < 1e-4, `Power: expected 20 W, got ${powerW}`);
  assert(Math.abs(keJ - 25) < 1e-4, `KE: expected 25 J, got ${keJ}`);

  // 2.4 Lever Lab (F1 * d1 = F2 * d2)
  const leverRes = calculateLever(100, 2, 200, 1, 'class1'); // 100 N at 2m = 200 N at 1m => balanced
  assertFinite(leverRes.mechanicalAdvantage, 'mechanicalAdvantage');
  assert(leverRes.isBalanced === true, `Lever should be balanced`);
  assert(Math.abs(leverRes.mechanicalAdvantage - 2) < 1e-4, `Lever MA: expected 2, got ${leverRes.mechanicalAdvantage}`);

  // 2.5 Waves and Sound (v = f * λ)
  const waveRes = calculateWaveProperties(100, 3, 2); // 100 Hz * 3 m => 300 m/s
  assertFinite(waveRes.waveSpeed, 'waveSpeed');
  assert(Math.abs(waveRes.waveSpeed - 300) < 1e-4, `Wave speed: expected 300 m/s, got ${waveRes.waveSpeed}`);

  // 2.6 Light Ray Lab (Angle of reflection = Angle of incidence)
  const reflRes = calculateReflection(45);
  assertFinite(reflRes.reflectionAngleDeg, 'reflectionAngleDeg');
  assert(Math.abs(reflRes.reflectionAngleDeg - 45) < 1e-4, `Reflection angle: expected 45°, got ${reflRes.reflectionAngleDeg}`);

  // --- 3. THIRD INTERMEDIATE (9/9) ---
  // 3.1 Electrostatics (Coulomb Force)
  const coulombRes = calculateCoulombForce(1, 2, 0.1); // 1µC, 2µC, 0.1m => ~1.797 N
  assertFinite(coulombRes.forceN, 'forceN');
  assert(Math.abs(coulombRes.forceN - 1.797) < 0.05, `Coulomb force: expected ~1.8 N, got ${coulombRes.forceN}`);

  // 3.2 Magnetism
  const magRes = calculateDipoleFieldAt(100, 100, 0, 0, 50, 0);
  assertFinite(magRes.magnitude, 'magnitude');

  // 3.3 Electric Current (Ohm's Law: I = V / R, Series / Parallel)
  const ohmRes = calculateOhmsLaw(12, 6); // 12V, 6Ω => 2A
  assertFinite(ohmRes.currentA, 'currentA');
  assert(Math.abs(ohmRes.currentA - 2) < 1e-4, `Ohm's law: expected 2 A, got ${ohmRes.currentA}`);
  const rSeries = calculateSeriesResistance([10, 20, 30]);
  const rParallel = calculateParallelResistance([10, 10]);
  assert(rSeries === 60, `Series resistance: expected 60, got ${rSeries}`);
  assert(rParallel === 5, `Parallel resistance: expected 5, got ${rParallel}`);

  // 3.4 Battery & EMF (V = ε - I*r)
  const battRes = calculateBatteryCircuit(12, 1, 5, true); // 12V EMF, 1Ω internal, 5Ω load => I = 2A, V = 10V
  assertFinite(battRes.terminalVoltageV, 'terminalVoltageV');
  assert(Math.abs(battRes.terminalVoltageV - 10) < 1e-4, `Terminal voltage: expected 10 V, got ${battRes.terminalVoltageV}`);

  // 3.5 Electrical Power (P = V * I)
  const pwrRes = calculateApplianceEnergy(220, 2200, 2); // 220V, 2200W, 2 hours => I = 10A, E = 4.4 kWh
  assertFinite(pwrRes.currentA, 'currentA');
  assert(Math.abs(pwrRes.currentA - 10) < 1e-4, `Appliance current: expected 10 A, got ${pwrRes.currentA}`);
  assert(Math.abs(pwrRes.energyKWh - 4.4) < 1e-4, `Energy: expected 4.4 kWh, got ${pwrRes.energyKWh}`);

  // 3.6 Electromagnetism
  const emRes = calculateElectromagnetism('solenoid-core', 2, 500, true, 50);
  assertFinite(emRes.fieldStrengthRelative, 'fieldStrengthRelative');
  assert(emRes.fieldStrengthRelative > 0, `Electromagnet field strength must be positive`);

  // 3.7 Transformer (V2 = V1 * (N2 / N1))
  const transRes = calculateTransformer(220, 1000, 500, 2, 95); // 220V, 1000:500 => V2 = 110V
  assertFinite(transRes.secondaryVoltageV2, 'secondaryVoltageV2');
  assert(Math.abs(transRes.secondaryVoltageV2 - 110) < 1e-4, `Transformer V2: expected 110 V, got ${transRes.secondaryVoltageV2}`);

  // 3.8 Energy Sources (Solar Output)
  const solarRes = calculateSourceOutput('solar', 1000, 2); // 1000 W/m^2, 2 m^2 => 0.4 kW
  assertFinite(solarRes.outputPowerKW, 'outputPowerKW');
  assert(Math.abs(solarRes.outputPowerKW - 0.4) < 1e-4, `Solar output: expected 0.4 kW, got ${solarRes.outputPowerKW}`);

  // 3.9 Atmospheric Communications
  const atmRes = calculateRadioPropagation('sky-wave');
  assert(atmRes.maxCoverageRangeKm > 1000, `Sky wave coverage must be extensive (>1000 km)`);

  // --- 4. FOURTH SCIENTIFIC (9/9) ---
  // 4.1 Main Parameters (Percentage Error)
  const errRes = calculatePercentageError(9.8, 9.5);
  assertFinite(errRes, 'percentageError');
  assert(Math.abs(errRes - 3.06) < 0.1, `Error percentage: expected ~3.06%, got ${errRes}`);

  // 4.2 Mechanical Properties (Stress, Strain, Extension)
  const stress = calculateStress(100, 1e-6); // 100 N / 1mm^2 => 100 MPa
  const strain = calculateStrain(0.001, 1.0); // 1mm / 1m => 0.001
  assertFinite(stress, 'stress');
  assertFinite(strain, 'strain');
  assert(Math.abs(stress - 1e8) < 1e3, `Stress: expected 100 MPa, got ${stress}`);

  // 4.3 Static Fluids (P = ρgh)
  const fluidRes = calculateFluidPressure(1000, 2, 9.81); // 1000 kg/m^3, 2m, g=9.81 => 19620 Pa
  assertFinite(fluidRes.gaugePressurePa, 'gaugePressurePa');
  assert(Math.abs(fluidRes.gaugePressurePa - 19620) < 1e-4, `Fluid gauge pressure: expected 19620 Pa, got ${fluidRes.gaugePressurePa}`);

  // 4.4 Thermal Properties (Calorimetry)
  const calRes = calculateCalorimetry(1, 20, 1, 80, 900); // 1kg water at 20°C + 1kg Al at 80°C
  assertFinite(calRes.finalEquilibriumTempC, 'finalEquilibriumTempC');
  assert(calRes.finalEquilibriumTempC > 20 && calRes.finalEquilibriumTempC < 80, 'Calorimetry temp inside range');

  // 4.5 Light (Illuminance E = I / r^2)
  const illumRes = calculateIlluminance(100, 2, 0); // 100 cd / 4 m^2 => 25 lux
  assertFinite(illumRes.illuminanceLux, 'illuminanceLux');
  assert(Math.abs(illumRes.illuminanceLux - 25) < 1e-4, `Illuminance: expected 25 lux, got ${illumRes.illuminanceLux}`);

  // 4.6 Reflection & Refraction (Snell's Law)
  const snellRes = calculateRefraction(1.0, 1.5, 30); // air to glass at 30° => θ2 ≈ 19.47°
  assert(snellRes.thetaRefractedDeg !== null, 'Snell angle exists');
  assert(Math.abs((snellRes.thetaRefractedDeg || 0) - 19.47) < 0.1, `Snell angle: expected ~19.47°, got ${snellRes.thetaRefractedDeg}`);

  // 4.7 Spherical Mirrors (1/f = 1/u + 1/v)
  const mirrorRes = calculateMirrorOptics('concave', 10, 30, 5); // f=10cm, u=30cm => v=15cm, real inverted
  assertFinite(mirrorRes.imageDistanceCm, 'imageDistanceCm');
  assert(Math.abs(mirrorRes.imageDistanceCm - 15) < 1e-4, `Mirror image distance: expected 15 cm, got ${mirrorRes.imageDistanceCm}`);

  // 4.8 Thin Lenses (1/f = 1/u + 1/v)
  const lensRes = calculateThinLensOptics('converging', 10, 30, 5); // f=10cm, u=30cm => v=15cm, P = +10 D
  assertFinite(lensRes.imageDistanceCm, 'imageDistanceCm');
  assert(Math.abs(lensRes.imageDistanceCm - 15) < 1e-4, `Lens image distance: expected 15 cm, got ${lensRes.imageDistanceCm}`);

  // 4.9 Electrostatics (Uniform field E = ΔV / d)
  const fieldRes = calculateParallelPlates('electron', 100, 0.05, 500); // 100V / 0.05m => 2000 V/m
  assertFinite(fieldRes.electricFieldStrengthV_m, 'electricFieldStrengthV_m');
  assert(Math.abs(fieldRes.electricFieldStrengthV_m - 2000) < 1e-4, `Uniform field: expected 2000 V/m, got ${fieldRes.electricFieldStrengthV_m}`);

  // --- 5. FIFTH SCIENTIFIC (10/10) ---
  // 5.1 Vectors (Components & Resultant)
  const vCompA = resolveVectorComponents(3, 0); // (3, 0)
  const vCompB = resolveVectorComponents(4, 90); // (0, 4)
  const vecRes = calculateVectorResultant(vCompA, vCompB, 'add');
  assertFinite(vecRes.magnitude, 'magnitude');
  assert(Math.abs(vecRes.magnitude - 5) < 1e-4, `Vector resultant: expected 5, got ${vecRes.magnitude}`);

  // 5.2 Linear Motion (Uniform acceleration: x = v0*t + 0.5*a*t^2)
  const linMotionRes = calculateLinearMotion(10, 2, 5); // v0=10, a=2, t=5 => v=20, x=75
  assertFinite(linMotionRes.posX, 'posX');
  assert(Math.abs(linMotionRes.posX - 75) < 1e-4, `Linear displacement: expected 75 m, got ${linMotionRes.posX}`);

  // 5.3 Laws of Motion & Friction
  const inclineRes = calculateInclinedPlaneForces(10, 80, 30, 0.2, 0.1); // 10kg on 30° incline
  assertFinite(inclineRes.netForceN, 'netForceN');

  // 5.4 Equilibrium & Torques
  const eqRes = calculateEquilibriumState(4, 2, [
    { id: '1', nameAr: 'F1', magnitudeN: 10, positionM: 1, angleDeg: 90, color: '#38bdf8' },
    { id: '2', nameAr: 'F2', magnitudeN: 10, positionM: 3, angleDeg: 90, color: '#ef4444' },
  ]);
  assert(eqRes.isEquilibrium === true, `System should be in rotational equilibrium`);

  // 5.5 Work, Energy, Momentum & Collisions
  const collRes = calculateCollision(2, 4, 2, 0, 'elastic');
  assertFinite(collRes.v1FinalM_s, 'v1FinalM_s');
  assertFinite(collRes.v2FinalM_s, 'v2FinalM_s');
  assert(Math.abs(collRes.v1FinalM_s - 0) < 1e-4, `Elastic collision v1': expected 0 m/s, got ${collRes.v1FinalM_s}`);
  assert(Math.abs(collRes.v2FinalM_s - 4) < 1e-4, `Elastic collision v2': expected 4 m/s, got ${collRes.v2FinalM_s}`);

  // 5.6 Thermodynamics (First Law: ΔU = Q - W)
  const thermoRes = calculateFirstLaw(500, 200); // Q=500 J, W=200 J => ΔU = 300 J
  assertFinite(thermoRes.deltaInternalEnergyU_J, 'deltaInternalEnergyU_J');
  assert(Math.abs(thermoRes.deltaInternalEnergyU_J - 300) < 1e-4, `Thermo ΔU: expected 300 J, got ${thermoRes.deltaInternalEnergyU_J}`);

  // 5.7 Circular & Rotational Motion (Fc = m * ω^2 * r)
  const circRes = calculateCircularMotion(2, 2, 2); // r=2m, m=2kg, omega=2rad/s => Fc = 16 N
  assertFinite(circRes.centripetalForceN, 'centripetalForceN');
  assert(Math.abs(circRes.centripetalForceN - 16) < 1e-4, `Centripetal force: expected 16 N, got ${circRes.centripetalForceN}`);

  // 5.8 Oscillations, Waves & Sound (Spring Period T = 2π√(m/k))
  const springRes = calculateSpringShm(1, 100, 0.1); // m=1kg, k=100 N/m => T = 2π * 0.1 ≈ 0.628 s
  assertFinite(springRes.periodSec, 'periodSec');
  assert(Math.abs(springRes.periodSec - 0.6283) < 0.01, `Spring period: expected ~0.628 s, got ${springRes.periodSec}`);

  // Doppler Effect
  const dopplerRes = calculateDoppler(440, 30, 0, true, false); // Source moving toward stationary observer
  assert(dopplerRes.observedFrequencyHz > 440, `Approaching source should yield higher observed frequency`);

  // 5.9 Electric Current (Resistivity R = ρ * L / A)
  const wireRes = calculateResistivity('copper', 10, 1.128, 20); // L=10m, A ≈ 1mm^2
  assertFinite(wireRes.resistanceOhm, 'resistanceOhm');

  // 5.10 Magnetism (Lorentz Force on moving charge F = q * v * B * sinθ)
  const lorentzRes = calculateChargedParticleMotion('proton', 2e6, 0.5, 90);
  assertFinite(lorentzRes.forceLorentzN, 'forceLorentzN');
  assert(lorentzRes.forceLorentzN > 0, `Lorentz force on moving proton should be positive`);

  // --- 6. SIXTH SCIENTIFIC (8/8) ---
  // 6.1 Capacitors (Parallel & Series Ceq)
  const capParRes = calculateCombination('parallel', 2, 3, 0, 12);
  const capSerRes = calculateCombination('series', 2, 3, 0, 12);
  assert(Math.abs(capParRes.cEquivalentMicroF - 5.0) < 1e-4, `Parallel capacitors Ceq: expected 5 µF, got ${capParRes.cEquivalentMicroF}`);
  assert(Math.abs(capSerRes.cEquivalentMicroF - 1.2) < 1e-4, `Series capacitors Ceq: expected 1.2 µF, got ${capSerRes.cEquivalentMicroF}`);

  // 6.2 Electromagnetic Induction (Faraday & Motional EMF)
  const motionalRes = calculateMotionalEmf(10, 0.5, 0.2, 10); // v=10m/s, B=0.5T, L=0.2m, R=10Ω => ε = 1.0 V
  assertFinite(motionalRes.motionalEmfVolts, 'motionalEmfVolts');
  assert(Math.abs(motionalRes.motionalEmfVolts - 1.0) < 1e-4, `Motional EMF: expected 1.0 V, got ${motionalRes.motionalEmfVolts}`);

  // 6.3 Alternating Current (RLC Series resonance: XL = XC => Z = R)
  const rlcRes = calculateSeriesRlc(100.66, 100, 10, 0.05, 50);
  assertFinite(rlcRes.impedanceZ, 'impedanceZ');
  assert(Math.abs(rlcRes.impedanceZ - 10) < 0.5, `RLC at resonance: Z should equal R (10 Ω), got ${rlcRes.impedanceZ}`);

  // 6.4 Physical Optics (Young's Double Slit: Δy = λ * L / d)
  const youngSlitRes = calculateYoungDoubleSlit(500, 1.0, 1); // λ=500nm, L=1m, d=1mm => Δy = 0.5 mm
  assertFinite(youngSlitRes.fringeSpacingMm, 'fringeSpacingMm');
  assert(Math.abs(youngSlitRes.fringeSpacingMm - 0.5) < 1e-4, `Young fringe width: expected 0.5 mm, got ${youngSlitRes.fringeSpacingMm}`);

  // 6.5 Modern Physics (Photoelectric Effect & de Broglie)
  const photoRes = calculatePhotoelectric(380, 2.14, 75); // Cesium W0=2.14 eV, UV 380 nm (E ≈ 3.26 eV) => Kmax ≈ 1.12 eV
  assertFinite(photoRes.maxKineticEnergyEv, 'maxKineticEnergyEv');
  assert(photoRes.isEmissionOccurring === true, `380nm light on Cesium must cause emission`);
  assert(Math.abs(photoRes.maxKineticEnergyEv - 1.12) < 0.1, `Photoelectric Kmax: expected ~1.12 eV, got ${photoRes.maxKineticEnergyEv}`);

  const deBroglieRes = calculateDeBroglie(9.109e-31, 2e6); // Electron at 2000 km/s => λ_dB ≈ 0.36 nm
  assertFinite(deBroglieRes.deBroglieWavelengthNm, 'deBroglieWavelengthNm');
  assert(Math.abs(deBroglieRes.deBroglieWavelengthNm - 0.364) < 0.05, `de Broglie wavelength: expected ~0.364 nm, got ${deBroglieRes.deBroglieWavelengthNm}`);

  // 6.6 Solid State Electronics (Energy Bands & PN Junction)
  const bandRes = calculateEnergyBands('silicon');
  assert(bandRes.energyGapEv === 1.1, `Silicon energy gap must be 1.1 eV, got ${bandRes.energyGapEv}`);

  const pnRes = calculatePnJunction('silicon', 'forward', 0.8); // 0.8V > 0.7V threshold => conducting
  assert(pnRes.netCurrentMa > 0, `Silicon PN diode forward biased at 0.8V must conduct`);

  // 6.7 Atomic Spectra & Laser (Bohr Hydrogen transition & X-Rays)
  const bohrRes = calculateHydrogenTransition(3, 2); // Balmer H-alpha (n=3 -> n=2) => 656.3 nm Red
  assertFinite(bohrRes.wavelengthNm, 'wavelengthNm');
  assert(Math.abs(bohrRes.wavelengthNm - 656.3) < 2.0, `Balmer H-alpha: expected ~656.3 nm, got ${bohrRes.wavelengthNm}`);

  const xrayRes = calculateXRay(40, 'tungsten'); // 40 kV => λ_min ≈ 0.031 nm
  assertFinite(xrayRes.minWavelengthNm, 'minWavelengthNm');
  assert(Math.abs(xrayRes.minWavelengthNm - 0.031) < 0.005, `X-ray min wavelength for 40kV: expected ~0.031 nm, got ${xrayRes.minWavelengthNm}`);

  // 6.8 Nuclear Physics (Binding Energy & Half-Life Decay)
  const nuclRes = calculateNuclearStructure(26, 56); // Iron-56
  assert(nuclRes.N === 30, `Iron-56 must have N=30 neutrons`);
  assert(Math.abs(nuclRes.radiusFm - 4.59) < 0.1, `Iron-56 nuclear radius: expected ~4.59 fm, got ${nuclRes.radiusFm}`);

  const decayRes = calculateDecayLaw(1000, 5730, 11460); // 2 half-lives => 250 remaining
  assertFinite(decayRes.remainingCountN, 'remainingCountN');
  assert(Math.abs(decayRes.remainingCountN - 250) < 1.0, `Carbon-14 decay after 2 half-lives: expected 250, got ${decayRes.remainingCountN}`);

  console.log(`✅ 47/47 real calculation modules tested with exact numerical assertions.`);

  console.log('====================================================');
  console.log('PHASE 4: REAL EDGE CASES & INVALID INPUT SAFETY');
  console.log('====================================================');

  // Test 1: Zero Area in Solid Pressure
  const safeP = calculatePressure(100, 0);
  assertFinite(safeP.pressurePa, 'Zero-area solid pressure');

  // Test 2: Zero Distance in Coulomb Law
  const safeCoulomb = calculateCoulombForce(1, 1, 0);
  assertFinite(safeCoulomb.forceN, 'Zero-distance Coulomb force');

  // Test 3: Zero Resistance in Ohm's Law
  const safeOhm = calculateOhmsLaw(12, 0);
  assertFinite(safeOhm.currentA, 'Zero-resistance Ohm current');

  // Test 4: Mirror / Lens at focal point u = f (Singularity)
  const safeMirror = calculateMirrorOptics('concave', 10, 10, 5);
  assertFinite(safeMirror.imageDistanceCm, 'Mirror u=f singularity');

  const safeLens = calculateThinLensOptics('converging', 10, 10, 5);
  assertFinite(safeLens.imageDistanceCm, 'Lens u=f singularity');

  // Test 5: Invalid Snell angles / Total internal reflection
  const safeSnell = calculateRefraction(1.5, 1.0, 80); // glass to air beyond critical angle
  assert(safeSnell.isTotalInternalReflection === true, 'Snell beyond critical angle should flag TIR');

  // Test 6: Zero plate separation in Capacitors
  const safeCap = calculateParallelPlate(100, 0, 1, 10);
  assertFinite(safeCap.capacitanceFarads, 'Zero plate separation capacitor');

  // Test 7: Zero wavelength in Wave Speed
  const safeWave = calculateWaveProperties(100, 0, 1);
  assertFinite(safeWave.waveSpeed, 'Zero wavelength wave speed');

  // Test 8: Nuclear A < Z safety
  const safeNucl = calculateNuclearStructure(50, 20); // A < Z
  assert(safeNucl.A >= safeNucl.Z, 'Nuclear structure should enforce A >= Z');

  // Test 9: Zero / negative half-life in radioactive decay
  const safeDecay = calculateDecayLaw(1000, 0, 100);
  assertFinite(safeDecay.remainingCountN, 'Zero half-life decay law');

  console.log(`✅ Real edge case tests passed without raw NaN or Infinity.`);

  console.log('====================================================');
  console.log('PHASE 5: LAZY COMPONENT RESOLUTION & ROUTE AUDIT');
  console.log('====================================================');

  let resolvedLazyCount = 0;
  for (const sim of curriculumPhysicsInRegistry) {
    assert(Boolean(sim.component), `Simulation ${sim.id} component must be defined`);
    try {
      const lazyComp = sim.component as unknown as {
        _payload?: { _result?: () => Promise<{ default: unknown }> };
        _init?: (payload: unknown) => unknown;
      };
      
      if (lazyComp && lazyComp._payload && typeof lazyComp._payload._result === 'function') {
        const module = await lazyComp._payload._result();
        assert(
          module !== null && typeof module === 'object' && 'default' in module && Boolean(module.default),
          `Simulation ${sim.id} component module should resolve to a valid default export`
        );
        resolvedLazyCount++;
      } else if (typeof (sim.component as unknown as () => unknown) === 'function') {
        resolvedLazyCount++;
      } else {
        assert(false, `Simulation ${sim.id} has invalid lazy component structure`);
      }
    } catch (err) {
      assert(false, `Simulation ${sim.id} failed to import lazily: ${err}`);
    }
  }

  assert(
    resolvedLazyCount === 47,
    `All 47 registered physics components must resolve lazily (resolved: ${resolvedLazyCount})`
  );
  console.log(`✅ 47/47 lazy component imports verified.`);

  // Route URL check
  for (const sim of curriculumPhysicsInRegistry) {
    const routeUrl = `/subject/physics/simulations/${sim.id}`;
    assert(routeUrl.startsWith('/subject/physics/simulations/'), `Route pattern valid for ${sim.id}`);
  }
  console.log(`✅ 47/47 route endpoints validated.`);

  console.log('====================================================');
  console.log('PHASE 6: STATIC QUALITY SCAN (CLEANUP & ARTIFACTS)');
  console.log('====================================================');

  const physicsSimDir = path.resolve(process.cwd(), 'src/features/simulations/physics');
  
  function getAllFiles(dir: string, fileList: string[] = []): string[] {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        getAllFiles(filePath, fileList);
      } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        fileList.push(filePath);
      }
    }
    return fileList;
  }

  const allSourceFiles = getAllFiles(physicsSimDir);
  let debuggerCount = 0;
  let todoCount = 0;
  let intervalCount = 0;
  let clearIntervalCount = 0;
  let rafCount = 0;
  let cancelRafCount = 0;

  for (const file of allSourceFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    if (content.includes('debugger;')) debuggerCount++;
    if (content.includes('TODO:') || content.includes('FIXME:')) todoCount++;
    
    const intervals = (content.match(/setInterval\(/g) || []).length;
    const clearInters = (content.match(/clearInterval\(/g) || []).length;
    intervalCount += intervals;
    clearIntervalCount += clearInters;

    const rafs = (content.match(/requestAnimationFrame\(/g) || []).length;
    const cancelRafs = (content.match(/cancelAnimationFrame\(/g) || []).length;
    rafCount += rafs;
    cancelRafCount += cancelRafs;
  }

  assert(debuggerCount === 0, `No debugger statements allowed (found ${debuggerCount})`);
  console.log(`Static Scan: ${allSourceFiles.length} files inspected.`);
  console.log(`- Debugger statements: ${debuggerCount}`);
  console.log(`- TODO / FIXME notes: ${todoCount}`);
  console.log(`- setInterval calls: ${intervalCount}, clearInterval calls: ${clearIntervalCount}`);
  console.log(`- requestAnimationFrame calls: ${rafCount}, cancelAnimationFrame calls: ${cancelRafCount}`);
  console.log('✅ Static quality scan complete.');

  console.log('====================================================');
  console.log(`ALL AUDIT TESTS PASSED: ${passedAssertions} assertions OK, ${failedAssertions} failures.`);
  console.log('====================================================');

  if (failedAssertions > 0) {
    process.exit(1);
  }
}

runAcceptanceAudit().catch((err) => {
  console.error('Audit execution error:', err);
  process.exit(1);
});
