import { test, expect } from '@playwright/test';

// All 47 Curriculum Simulation IDs across 6 grades
const ALL_47_SIMULATION_IDS = [
  // First Intermediate (5)
  'physics-first-properties-of-matter',
  'physics-first-force',
  'physics-first-pressure',
  'physics-first-heat',
  'physics-first-thermal-effects',

  // Second Intermediate (6)
  'physics-second-motion',
  'physics-second-laws-of-motion',
  'physics-second-work-power-energy',
  'physics-second-levers',
  'physics-second-waves-sound',
  'physics-second-light',

  // Third Intermediate (9)
  'physics-third-electrostatics',
  'physics-third-magnetism',
  'physics-third-electric-current',
  'physics-third-battery-emf',
  'physics-third-electric-energy-power',
  'physics-third-electromagnetism',
  'physics-third-transformer',
  'physics-third-energy-sources',
  'physics-third-atmospheric-communications',

  // Fourth Scientific (9)
  'physics-fourth-main-parameters',
  'physics-fourth-mechanical-properties',
  'physics-fourth-static-fluids',
  'physics-fourth-thermal-properties',
  'physics-fourth-light',
  'physics-fourth-reflection-refraction',
  'physics-fourth-mirrors',
  'physics-fourth-thin-lenses',
  'physics-fourth-electrostatics',

  // Fifth Scientific (10)
  'physics-fifth-vectors',
  'physics-fifth-linear-motion',
  'physics-fifth-laws-of-motion',
  'physics-fifth-equilibrium-torques',
  'physics-fifth-work-energy-momentum',
  'physics-fifth-thermodynamics',
  'physics-fifth-circular-rotational-motion',
  'physics-fifth-oscillations-waves-sound',
  'physics-fifth-electric-current',
  'physics-fifth-magnetism',

  // Sixth Scientific (8)
  'physics-sixth-capacitors',
  'physics-sixth-electromagnetic-induction',
  'physics-sixth-alternating-current',
  'physics-sixth-physical-optics',
  'physics-sixth-modern-physics',
  'physics-sixth-solid-state-electronics',
  'physics-sixth-atomic-spectra-laser',
  'physics-sixth-nuclear-physics',
];

const REPRESENTATIVE_SIMS = [
  'physics-first-pressure',
  'physics-second-laws-of-motion',
  'physics-third-transformer',
  'physics-fourth-reflection-refraction',
  'physics-fifth-thermodynamics',
  'physics-sixth-modern-physics',
];

test.describe('Physics Deep Links & Navigation Suite', () => {
  // Test 1: All 47 simulation routes render cleanly without runtime exceptions
  for (const simId of ALL_47_SIMULATION_IDS) {
    test(`renders deep link for ${simId}`, async ({ page }) => {
      const pageErrors: string[] = [];
      const fatalErrors: string[] = [];

      page.on('pageerror', (err) => pageErrors.push(err.message));
      page.on('console', (msg) => {
        const text = msg.text();
        // Filter harmless messages
        if (msg.type() === 'error') {
          if (
            text.includes('favicon.ico') || 
            text.includes('chrome-extension') ||
            text.includes('Download the React DevTools')
          ) {
            return;
          }
          fatalErrors.push(text);
        }
      });

      await page.goto(`/subject/physics/simulations/${simId}`, { waitUntil: 'domcontentloaded' });

      // Wait for simulation container / title to be visible
      const heading = page.locator('h1, h2, h3').first();
      await expect(heading).toBeVisible({ timeout: 10000 });

      // Ensure no uncaught page error or fatal console errors
      expect(pageErrors, `Page errors found on ${simId}: ${pageErrors.join(', ')}`).toHaveLength(0);
      expect(fatalErrors, `Fatal console errors found on ${simId}: ${fatalErrors.join(', ')}`).toHaveLength(0);
    });
  }

  // Test 2: Representative Refresh Tests (6/6)
  for (const simId of REPRESENTATIVE_SIMS) {
    test(`preserves route on page reload for ${simId}`, async ({ page }) => {
      await page.goto(`/subject/physics/simulations/${simId}`, { waitUntil: 'domcontentloaded' });

      const headingBefore = await page.locator('h1, h2, h3').first().innerText();
      expect(headingBefore.length).toBeGreaterThan(0);

      // Perform reload
      await page.reload({ waitUntil: 'domcontentloaded' });

      // Ensure same route remains loaded
      expect(page.url()).toContain(`/subject/physics/simulations/${simId}`);
      const headingAfter = await page.locator('h1, h2, h3').first().innerText();
      expect(headingAfter).toBe(headingBefore);
    });
  }

  // Test 3: Back / Forward browser history navigation
  test('handles browser history back and forward navigation seamlessly', async ({ page }) => {
    // Navigate to Sim A
    await page.goto('/subject/physics/simulations/physics-first-pressure', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/physics-first-pressure/);

    // Navigate to Sim B
    await page.goto('/subject/physics/simulations/physics-sixth-capacitors', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/physics-sixth-capacitors/);

    // Go Back to Sim A
    await page.goBack({ waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/physics-first-pressure/);

    // Go Forward to Sim B
    await page.goForward({ waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/physics-sixth-capacitors/);
  });

  // Test 4: Invalid simulation route fallback
  test('gracefully redirects or renders fallback on invalid simulation ID', async ({ page }) => {
    const pageErrors: string[] = [];
    const fatalErrors: string[] = [];
    
    page.on('pageerror', (err) => pageErrors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (
          text.includes('favicon.ico') || 
          text.includes('chrome-extension') ||
          text.includes('Download the React DevTools')
        ) {
          return;
        }
        fatalErrors.push(text);
      }
    });

    await page.goto('/subject/physics/simulations/physics-invalid-simulation', { waitUntil: 'domcontentloaded' });

    // Should not crash and should fall back safely to simulations hub
    expect(pageErrors, `Page errors found on invalid route: ${pageErrors.join(', ')}`).toHaveLength(0);
    expect(fatalErrors, `Fatal console errors found on invalid route: ${fatalErrors.join(', ')}`).toHaveLength(0);
    expect(page.url()).toContain('/subject/physics/simulations');
    await expect(page.locator('body')).toBeVisible();
  });
});
