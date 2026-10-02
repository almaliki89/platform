/**
 * OMEGA V4.3.2 — AUTOMATED ROUTE AUDIT FOR PHYSICS ENGINE
 * Programmatically validates all 47 routes, grade ownership, registry alignment, and invalid route handling.
 */

import { IRAQI_PHYSICS_CURRICULUM } from '../src/data/physicsCurriculum';
import { SIMULATION_REGISTRY } from '../src/features/simulations/core/registry';
import { getSimulationsForSubject } from '../src/features/simulations';

let passed = 0;
let failed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    passed++;
  } else {
    failed++;
    console.error(`❌ ROUTE AUDIT FAILED: ${msg}`);
  }
}

console.log('====================================================');
console.log('AUDITING ALL 47 PHYSICS SIMULATION ROUTES');
console.log('====================================================');

const physicsSimulations = getSimulationsForSubject('physics');
assert(physicsSimulations.length >= 47, `Must have at least 47 physics simulations, found ${physicsSimulations.length}`);

// Check 1: 47 curriculum IDs
const curriculumIds: string[] = [];
const idToGradeMap = new Map<string, string>();
const idToChapterMap = new Map<string, number>();

for (const grade of IRAQI_PHYSICS_CURRICULUM) {
  for (const ch of grade.chapters) {
    if (ch.simulationId) {
      curriculumIds.push(ch.simulationId);
      idToGradeMap.set(ch.simulationId, grade.gradeId);
      idToChapterMap.set(ch.simulationId, ch.chapterNumber);
    }
  }
}

assert(curriculumIds.length === 47, `Curriculum simulation IDs count must be 47, got ${curriculumIds.length}`);

// Check 2: No duplicates
const uniqueIds = new Set(curriculumIds);
assert(uniqueIds.size === 47, `All 47 IDs must be strictly unique (size: ${uniqueIds.size})`);

// Check 3: Every ID exists in Registry with exact matching grade and chapter
const routeList: string[] = [];
for (const id of curriculumIds) {
  const regEntry = SIMULATION_REGISTRY.find((r) => r.id === id);
  assert(Boolean(regEntry), `Registry must contain ID: ${id}`);

  if (regEntry) {
    assert(regEntry.subjectId === 'physics', `Registry entry ${id} must have subjectId 'physics'`);
    assert(regEntry.gradeId === idToGradeMap.get(id), `Registry entry ${id} gradeId must match curriculum (${idToGradeMap.get(id)})`);
    assert(regEntry.chapterNumber === idToChapterMap.get(id), `Registry entry ${id} chapterNumber must match curriculum (${idToChapterMap.get(id)})`);

    const routeUrl = `/subject/physics/simulations/${id}`;
    assert(!routeList.includes(routeUrl), `Route URL must be unique: ${routeUrl}`);
    routeList.push(routeUrl);
  }
}

assert(routeList.length === 47, `Total unique validated route paths must be 47, got ${routeList.length}`);

// Check 4: Invalid ID rejection behavior check
const invalidIds = ['physics-invalid-simulation', 'non-existent-sim', 'physics-tenth-something'];
for (const badId of invalidIds) {
  const found = physicsSimulations.some((s) => s.id === badId);
  assert(!found, `Invalid simulation ID '${badId}' must NOT exist in registered simulations`);
}

console.log('====================================================');
console.log(`ROUTE AUDIT COMPLETED: ${passed} assertions OK, ${failed} failures.`);
console.log('====================================================');

if (failed > 0) {
  process.exit(1);
}
