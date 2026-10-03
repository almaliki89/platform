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
    await page.goto('/subject/physics/simulations/physics-first-heat');
    await page.waitForLoadState('domcontentloaded');

    const hotTemp = page.locator('[data-testid="thermal-hot-temperature"]');
    const coldTemp = page.locator('[data-testid="thermal-cold-temperature"]');
    await expect(hotTemp).toBeVisible();
    await expect(coldTemp).toBeVisible();

    const getVal = async (loc: any) => parseFloat((await loc.innerText()).replace(/[^0-9.]/g, ''));

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

  test('Reduced motion mode support across animated Batch A simulations', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    const reducedMotionSims = [
      '/subject/physics/simulations/physics-first-force',
      '/subject/physics/simulations/physics-first-heat',
      '/subject/physics/simulations/physics-second-motion',
      '/subject/physics/simulations/physics-second-waves-sound',
    ];

    for (const path of reducedMotionSims) {
      const pageErrors: string[] = [];
      const fatalErrors: string[] = [];
      
      page.on('pageerror', (err) => pageErrors.push(err.message));
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          const text = msg.text();
          if (!text.includes('favicon') && !text.includes('HMR')) {
            fatalErrors.push(text);
          }
        }
      });

      await page.goto(path);
      await page.waitForLoadState('domcontentloaded');

      const visualization = page.locator('[data-testid="physics-visualization"]');
      await expect(visualization).toBeVisible();

      const bodyText = await page.innerText('body');
      expect(bodyText).not.toContain('NaN');
      expect(bodyText).not.toContain('Infinity');
      expect(pageErrors).toHaveLength(0);
      expect(fatalErrors).toHaveLength(0);
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
    const initialOutputText = await page.locator('[data-testid="physics-visualization"]').innerText();

    // Change control
    await slider.fill('75');
    await expect(slider).toHaveValue('75');
    
    // Check output changed
    const afterChangeOutputText = await page.locator('[data-testid="physics-visualization"]').innerText();
    expect(afterChangeOutputText).not.toBe(initialOutputText);

    // Reset
    const resetButton = page.locator('button').filter({ hasText: /إعادة تعيين|Reset/ }).first();
    await resetButton.click();

    // Assert restored
    await expect(slider).toHaveValue(initialVal);
    const finalOutputText = await page.locator('[data-testid="physics-visualization"]').innerText();
    expect(finalOutputText).toBe(initialOutputText);
  });
});
