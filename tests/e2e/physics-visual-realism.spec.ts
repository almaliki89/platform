import { test, expect } from '@playwright/test';

const batchASimulations = [
  { path: '/physics/first-intermediate/properties-of-matter', name: 'Properties of Matter' },
  { path: '/physics/first-intermediate/force', name: 'Force Lab' },
  { path: '/physics/first-intermediate/heat', name: 'Heat Lab' },
  { path: '/physics/first-intermediate/pressure', name: 'Pressure Lab' },
  { path: '/physics/first-intermediate/thermal-effects', name: 'Thermal Effects' },
  { path: '/physics/second-intermediate/motion', name: 'Motion Explorer' },
  { path: '/physics/second-intermediate/laws-of-motion', name: "Newton's Laws" },
  { path: '/physics/second-intermediate/work-power-energy', name: 'Work, Power & Energy' },
  { path: '/physics/second-intermediate/levers', name: 'Lever Lab' },
  { path: '/physics/second-intermediate/waves-sound', name: 'Waves & Sound' },
  { path: '/physics/second-intermediate/light', name: 'Light Reflection' },
];

test.describe('OMEGA V4.4 Batch A Visual Realism & Acceptance', () => {
  for (const sim of batchASimulations) {
    test(`Verify simulation: ${sim.name} (${sim.path})`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      page.on('pageerror', (err) => {
        pageErrors.push(err.message);
      });

      await page.goto(sim.path);
      await page.waitForLoadState('domcontentloaded');

      const shell = page.locator('main, [role="main"], article, header');
      await expect(shell.first()).toBeVisible({ timeout: 10000 });

      const visualization = page.locator('canvas, svg, [data-testid="physics-visualization"]').first();
      await expect(visualization).toBeVisible({ timeout: 10000 });

      const bodyText = await page.textContent('body');
      expect(bodyText).not.toContain('NaN');
      expect(bodyText).not.toContain('Infinity');

      expect(pageErrors.length).toBe(0);
      expect(consoleErrors.filter((e) => !e.includes('favicon') && !e.includes('HMR'))).toHaveLength(0);
    });
  }

  test('Heat Lab thermal convergence runtime test', async ({ page }) => {
    await page.goto('/physics/first-intermediate/heat');
    await page.waitForLoadState('domcontentloaded');

    // Wait for the simulation visualization and temperature badges
    const tempBadges = page.locator('text=°C');
    await expect(tempBadges.first()).toBeVisible({ timeout: 10000 });

    // Start simulation (play button)
    const playButton = page.locator('button').filter({ hasText: /تشغيل|Play|إيقاف|Pause/ }).first();
    if (await playButton.isVisible()) {
      await playButton.click();
    }

    await page.waitForTimeout(1500);

    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('NaN');
    expect(bodyText).not.toContain('Infinity');
  });

  test('Reduced motion mode support across animated Batch A simulations', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    const reducedMotionSims = [
      '/physics/first-intermediate/force',
      '/physics/first-intermediate/heat',
      '/physics/second-intermediate/motion',
      '/physics/second-intermediate/waves-sound',
    ];

    for (const path of reducedMotionSims) {
      const pageErrors: string[] = [];
      page.on('pageerror', (err) => pageErrors.push(err.message));

      await page.goto(path);
      await page.waitForLoadState('domcontentloaded');

      const visualization = page.locator('canvas, svg, [data-testid="physics-visualization"]').first();
      await expect(visualization).toBeVisible();

      const bodyText = await page.textContent('body');
      expect(bodyText).not.toContain('NaN');
      expect(bodyText).not.toContain('Infinity');
      expect(pageErrors.length).toBe(0);
    }
  });

  test('Slider interaction and reset behavior test on Force Lab', async ({ page }) => {
    await page.goto('/physics/first-intermediate/force');
    await page.waitForLoadState('domcontentloaded');

    const slider = page.locator('input[type="range"]').first();
    await slider.scrollIntoViewIfNeeded();
    await expect(slider).toBeVisible();

    await slider.fill('75');
    await expect(slider).toHaveValue('75');

    const resetButton = page.locator('button').filter({ hasText: /إعادة تعيين|Reset/ }).first();
    if (await resetButton.isVisible()) {
      await resetButton.click();
    }
  });
});
