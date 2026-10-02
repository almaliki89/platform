/**
 * OMEGA V4.3 ACCEPTANCE AGGREGATOR
 * Runs and summarizes non-browser audit components:
 * 1. 47/47 Physics calculation modules and edge cases
 * 2. 47/47 Route and Registry integrity mappings
 */

import { execSync } from 'child_process';

console.log('====================================================');
console.log('RUNNING OMEGA V4.3 ACCEPTANCE AGGREGATOR');
console.log('====================================================');

try {
  console.log('\n[1/2] Executing Calculation & Physics Integrity Audit...');
  execSync('npx tsx scripts/audit_physics_simulations.ts', { stdio: 'inherit' });

  console.log('\n[2/2] Executing Physics Routes Audit...');
  execSync('npx tsx scripts/audit_physics_routes.ts', { stdio: 'inherit' });

  console.log('\n====================================================');
  console.log('✅ ALL NON-BROWSER ACCEPTANCE CHECKS PASSED');
  console.log('====================================================');
} catch (err) {
  console.error('\n❌ ACCEPTANCE AUDIT FAILED:', err);
  process.exit(1);
}
