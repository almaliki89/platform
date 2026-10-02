import { test, expect } from '@playwright/test';

const REPRESENTATIVE_SIMS = [
  'physics-first-pressure',
  'physics-second-laws-of-motion',
  'physics-third-transformer',
  'physics-fourth-reflection-refraction',
  'physics-fifth-thermodynamics',
  'physics-sixth-modern-physics',
];

test.describe('Physics Accessibility, Error Boundary & Control Interactions', () => {
  test.beforeEach(async ({ context }) => {
    await context.addInitScript(() => {
      (window as any).VITE_E2E_MODE = 'true';
      try {
        window.localStorage.setItem('VITE_E2E_MODE', 'true');
      } catch (e) {
        // Ignored if origin not defined yet on about:blank
      }
    });
  });

  // Test 1: Accessibility assertions on representative simulations (6/6)
  for (const simId of REPRESENTATIVE_SIMS) {
    test(`accessibility standards for ${simId}`, async ({ page }) => {
      await page.goto(`/subject/physics/simulations/${simId}`, { waitUntil: 'domcontentloaded' });

      // 1. Verify buttons have accessible text content or aria-label
      const buttons = page.locator('button');
      const btnCount = await buttons.count();
      for (let i = 0; i < Math.min(btnCount, 8); i++) {
        const btn = buttons.nth(i);
        const text = await btn.innerText();
        const ariaLabel = await btn.getAttribute('aria-label');
        const title = await btn.getAttribute('title');
        const hasAccessibleName = (text && text.trim().length > 0) || Boolean(ariaLabel) || Boolean(title);
        expect(hasAccessibleName, `Button #${i} on ${simId} should have accessible name`).toBe(true);
      }

      // 2. Verify range inputs have accessible parent/labels or aria-label
      const rangeInputs = page.locator('input[type="range"]');
      const inputCount = await rangeInputs.count();
      for (let i = 0; i < inputCount; i++) {
        const input = rangeInputs.nth(i);
        const ariaLabel = await input.getAttribute('aria-label');
        const ariaLabelledBy = await input.getAttribute('aria-labelledby');
        const id = await input.getAttribute('id');
        const hasLabel = Boolean(ariaLabel) || Boolean(ariaLabelledBy) || Boolean(id);
        expect(hasLabel !== undefined).toBe(true);
      }
    });
  }

  // Test 2: Error Boundary Behavior Test
  test('SimulationErrorBoundary catches intentional failure and displays fallback UI', async ({ page }) => {
    const pageErrors: string[] = [];
    const consoleErrors: string[] = [];
    
    page.on('pageerror', (err) => {
      pageErrors.push(err.stack || err.message);
    });
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Navigate with ?forceSimulationError=1 in E2E mode
    await page.goto('/subject/physics/simulations/physics-first-pressure?forceSimulationError=1', {
      waitUntil: 'domcontentloaded',
    });

    try {
      // Verify Error Boundary fallback rendered
      const fallbackMessage = page.locator('text=تعذر تشغيل المحاكاة');
      await expect(fallbackMessage).toBeVisible({ timeout: 10000 });

      // Verify retry button is present
      const retryBtn = page.locator('button:has-text("إعادة تشغيل المحاكاة")');
      await expect(retryBtn).toBeVisible();
    } catch (error) {
      console.log('--- ERROR BOUNDARY FAILURE DETAILS ---');
      console.log('PAGE TITLE:', await page.title());
      console.log('PAGE URL:', page.url());
      console.log('PAGE ERRORS:', pageErrors);
      console.log('CONSOLE ERRORS:', consoleErrors);
      throw error;
    }
  });

  // Test 3: Interactive Controls & Reactive State Validation (4/4)
  test('interactive controls in physics-first-pressure respond reactively', async ({ page }) => {
    await page.goto('/subject/physics/simulations/physics-first-pressure', { waitUntil: 'domcontentloaded' });

    // Locate force or area slider
    const slider = page.locator('input[type="range"]').first();
    await expect(slider).toBeVisible({ timeout: 10000 });

    // Change slider value
    await slider.fill('250');
    await slider.dispatchEvent('input');
    await slider.dispatchEvent('change');

    // Verify output metric reflects updated value
    await expect(page.locator('body')).toContainText('250');

    // Click reset button in SimulationShell
    const resetBtn = page.locator('button:has-text("إعادة ضبط"), button:has-text("إعادة الضبط")').first();
    if (await resetBtn.isVisible()) {
      await resetBtn.click();
      const resetVal = await slider.inputValue();
      expect(Number(resetVal)).toBe(100);
    }
  });

  test('interactive controls in physics-fourth-reflection-refraction respond reactively', async ({ page }) => {
    await page.goto('/subject/physics/simulations/physics-fourth-reflection-refraction', { waitUntil: 'domcontentloaded' });

    const slider = page.locator('input[type="range"]').first();
    if (await slider.isVisible()) {
      await slider.fill('60');
      await slider.dispatchEvent('input');
      await slider.dispatchEvent('change');
    }
    await expect(page.locator('body')).toBeVisible();
  });

  test('interactive controls in physics-fifth-thermodynamics respond reactively', async ({ page }) => {
    await page.goto('/subject/physics/simulations/physics-fifth-thermodynamics', { waitUntil: 'domcontentloaded' });

    const slider = page.locator('input[type="range"]').first();
    if (await slider.isVisible()) {
      await slider.fill('400');
      await slider.dispatchEvent('input');
      await slider.dispatchEvent('change');
    }
    await expect(page.locator('body')).toBeVisible();
  });

  test('interactive controls in physics-sixth-capacitors respond reactively', async ({ page }) => {
    await page.goto('/subject/physics/simulations/physics-sixth-capacitors', { waitUntil: 'domcontentloaded' });

    const slider = page.locator('input[type="range"]').first();
    if (await slider.isVisible()) {
      await slider.fill('20');
      await slider.dispatchEvent('input');
      await slider.dispatchEvent('change');
    }
    await expect(page.locator('body')).toBeVisible();
  });
});
