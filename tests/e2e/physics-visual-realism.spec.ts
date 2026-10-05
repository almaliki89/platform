import { test, expect } from '@playwright/test';

const batchASimulations = [
  { path: '/subject/physics/simulations/physics-first-properties-of-matter', name: 'Properties of Matter' },
  { path: '/subject/physics/simulations/physics-first-force', name: 'Force Lab' },
  { path: '/subject/physics/simulations/physics-first-heat', name: 'Heat Lab' },
  { path: '/subject/physics/simulations/physics-first-pressure', name: 'Pressure Lab' },
  { path: '/subject/physics/simulations/physics-first-thermal-effects', name: 'Thermal Effects' },
  { path: '/subject/physics/simulations/physics-second-motion', name: 'Motion Explorer' },
  { path: '/subject/physics/simulations/physics-second-laws-of-motion', name: "Newton's Laws" },
  { path: '/subject/physics/simulations/physics-second-work-power-energy', name: 'Work, Power & Energy' },
  { path: '/subject/physics/simulations/physics-second-levers', name: 'Lever Lab' },
  { path: '/subject/physics/simulations/physics-second-waves-sound', name: 'Waves & Sound' },
  { path: '/subject/physics/simulations/physics-second-light', name: 'Light Reflection' },
];

const batchBSimulations = [
  { path: '/subject/physics/simulations/physics-third-electrostatics', name: 'Third Electrostatics' },
  { path: '/subject/physics/simulations/physics-third-magnetism', name: 'Third Magnetism' },
  { path: '/subject/physics/simulations/physics-third-electric-current', name: 'Third Electric Current' },
  { path: '/subject/physics/simulations/physics-third-battery-emf', name: 'Third Battery EMF' },
  { path: '/subject/physics/simulations/physics-third-electric-energy-power', name: 'Third Energy Power' },
  { path: '/subject/physics/simulations/physics-third-electromagnetism', name: 'Third Electromagnetism' },
  { path: '/subject/physics/simulations/physics-third-transformer', name: 'Third Transformer' },
  { path: '/subject/physics/simulations/physics-third-energy-sources', name: 'Third Energy Sources' },
  { path: '/subject/physics/simulations/physics-third-atmospheric-communications', name: 'Third Atmospheric' },
  { path: '/subject/physics/simulations/physics-fourth-main-parameters', name: 'Fourth Main Parameters' },
  { path: '/subject/physics/simulations/physics-fourth-mechanical-properties', name: 'Fourth Mechanical' },
  { path: '/subject/physics/simulations/physics-fourth-static-fluids', name: 'Fourth Static Fluids' },
  { path: '/subject/physics/simulations/physics-fourth-thermal-properties', name: 'Fourth Thermal' },
  { path: '/subject/physics/simulations/physics-fourth-light', name: 'Fourth Light' },
  { path: '/subject/physics/simulations/physics-fourth-reflection-refraction', name: 'Fourth Reflection Refraction' },
  { path: '/subject/physics/simulations/physics-fourth-mirrors', name: 'Fourth Mirrors' },
  { path: '/subject/physics/simulations/physics-fourth-thin-lenses', name: 'Fourth Thin Lenses' },
  { path: '/subject/physics/simulations/physics-fourth-electrostatics', name: 'Fourth Electrostatics' },
];

async function verifySimulation(page: any, path: string) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on('console', (msg: any) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', (err: any) => {
    pageErrors.push(err.message);
  });

  await page.goto(path);
  await page.waitForLoadState('domcontentloaded');

  const shell = page.locator('main, [role="main"], article, header');
  await expect(shell.first()).toBeVisible({ timeout: 15000 });

  const visualization = page.locator('canvas, svg, [data-testid="physics-visualization"]').first();
  await expect(visualization).toBeVisible({ timeout: 15000 });

  const bodyText = await page.textContent('body');
  expect(bodyText).not.toContain('NaN');
  expect(bodyText).not.toContain('Infinity');

  expect(pageErrors.length).toBe(0);
  expect(consoleErrors.filter((e) => !e.includes('favicon') && !e.includes('HMR'))).toHaveLength(0);
}

test.describe('OMEGA V4.4 Batch A Visual Realism & Acceptance', () => {
  for (const sim of batchASimulations) {
    test(`Verify simulation: ${sim.name} (${sim.path})`, async ({ page }) => {
      await verifySimulation(page, sim.path);
    });
  }
});

test.describe('OMEGA V4.4 Batch B Visual Realism & Acceptance', () => {
  for (const sim of batchBSimulations) {
    test(`Verify simulation: ${sim.name} (${sim.path})`, async ({ page }) => {
      await verifySimulation(page, sim.path);
    });
  }
});

test.describe('OMEGA V4.4 Specialized Functional Tests', () => {
  test('Heat Lab thermal convergence runtime test', async ({ page }) => {
    await page.goto('/subject/physics/simulations/physics-first-heat');
    await page.waitForLoadState('domcontentloaded');

    const hotTemp = page.locator('[data-testid="thermal-hot-temperature"]');
    const coldTemp = page.locator('[data-testid="thermal-cold-temperature"]');
    await expect(hotTemp).toBeVisible();
    await expect(coldTemp).toBeVisible();

    const getVal = async (loc: any) => {
      const text = await loc.innerText();
      return parseFloat(text.replace(/[^0-9.-]/g, ''));
    };

    const hotBefore = await getVal(hotTemp);
    const coldBefore = await getVal(coldTemp);

    const playButton = page.locator('button').filter({ hasText: /تشغيل|Play|إيقاف|Pause/ }).first();
    await playButton.click();

    await page.waitForTimeout(2000);

    const hotAfter = await getVal(hotTemp);
    const coldAfter = await getVal(coldTemp);

    expect(hotAfter).toBeLessThan(hotBefore);
    expect(coldAfter).toBeGreaterThan(coldBefore);
    expect(Math.abs(hotAfter - coldAfter)).toBeLessThan(Math.abs(hotBefore - coldBefore));
  });

  test('Reduced motion mode support across animated simulations', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    const animatedSims = [
      '/subject/physics/simulations/physics-first-force',
      '/subject/physics/simulations/physics-first-heat',
      '/subject/physics/simulations/physics-second-motion',
      '/subject/physics/simulations/physics-second-waves-sound',
      '/subject/physics/simulations/physics-third-electric-current',
      '/subject/physics/simulations/physics-third-atmospheric-communications',
    ];

    for (const path of animatedSims) {
      await verifySimulation(page, path);
    }
  });

  test('Slider interaction and reset behavior test on Force Lab', async ({ page }) => {
    await page.goto('/subject/physics/simulations/physics-first-force');
    await page.waitForLoadState('domcontentloaded');

    const slider = page.locator('input[type="range"]').first();
    await slider.scrollIntoViewIfNeeded();
    await expect(slider).toBeVisible();

    // Capture initial state
    const initialVal = await slider.inputValue();
    const initialOutputText = await page.locator('[data-testid="physics-visualization"]').first().innerText();

    // Change control
    await slider.fill('15');
    await expect(slider).toHaveValue('15');
    
    // Check output changed
    const afterChangeOutputText = await page.locator('[data-testid="physics-visualization"]').first().innerText();
    expect(afterChangeOutputText).not.toBe(initialOutputText);

    // Reset
    const resetButton = page.locator('button').filter({ hasText: /إعادة تعيين|إعادة ضبط|Reset/ }).first();
    await resetButton.click();

    // Assert restored
    await expect(slider).toHaveValue(initialVal);
    const finalOutputText = await page.locator('[data-testid="physics-visualization"]').first().innerText();
    expect(finalOutputText).toBe(initialOutputText);
  });
});
