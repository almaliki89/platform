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

      // 2. Verify range inputs have actual accessible labels (id is not enough without <label for>)
      const rangeInputs = page.locator('input[type="range"]');
      const inputCount = await rangeInputs.count();
      for (let i = 0; i < inputCount; i++) {
        const input = rangeInputs.nth(i);
        const ariaLabel = await input.getAttribute('aria-label');
        const ariaLabelledBy = await input.getAttribute('aria-labelledby');
        
        // Check if there's a label associated via 'for' attribute
        const id = await input.getAttribute('id');
        let hasAssociatedLabel = false;
        if (id) {
          const associatedLabel = page.locator(`label[for="${id}"]`);
          if (await associatedLabel.count() > 0) {
            const labelText = await associatedLabel.innerText();
            hasAssociatedLabel = labelText.trim().length > 0;
          }
        }

        const validAssociatedLabel = hasAssociatedLabel;
        expect(Boolean(ariaLabel || ariaLabelledBy || validAssociatedLabel), `Range input #${i} on ${simId} lacks accessible label`).toBe(true);
      }
    });
  }

  // Test 2: Error Boundary Behavior Test
  test('SimulationErrorBoundary catches intentional failure and displays fallback UI', async ({ page }) => {
    const pageErrors: string[] = [];
    const fatalErrors: string[] = [];
    
    page.on('pageerror', (err) => {
      pageErrors.push(err.stack || err.message);
    });
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        fatalErrors.push(msg.text());
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
      console.log('FATAL ERRORS:', fatalErrors);
      throw error;
    }
  });

  // Test 3: Interactive Controls & Reactive State Validation (4/4)
  test('interactive controls in physics-first-pressure respond reactively', async ({ page }) => {
    await page.goto('/subject/physics/simulations/physics-first-pressure', { waitUntil: 'domcontentloaded' });

    // Locate slider
    const slider = page.locator('input[type="range"]').first();
    await expect(slider).toBeVisible({ timeout: 10000 });
    
    // 1. Capture output BEFORE
    const initialVal = await slider.inputValue();
    const initialText = await page.locator('body').innerText();

    // 2. Change control
    const targetVal = '250';
    await slider.fill(targetVal);
    await slider.dispatchEvent('input');
    await slider.dispatchEvent('change');

    // 3. Assert output AFTER is different
    const afterVal = await slider.inputValue();
    expect(afterVal).toBe(targetVal);
    const afterText = await page.locator('body').innerText();
    expect(afterText).not.toBe(initialText);

    // 4. Press reset
    const resetBtn = page.locator('button:has-text("إعادة ضبط"), button:has-text("إعادة الضبط")').first();
    await expect(resetBtn).toBeVisible();
    await resetBtn.click();
    
    // 5. Assert original/default state restored
    const finalVal = await slider.inputValue();
    expect(finalVal).toBe(initialVal);
    const finalText = await page.locator('body').innerText();
    expect(finalText).toBe(initialText);
  });

  test('interactive controls in physics-fourth-reflection-refraction respond reactively', async ({ page }) => {
    await page.goto('/subject/physics/simulations/physics-fourth-reflection-refraction', { waitUntil: 'domcontentloaded' });

    const slider = page.locator('input[type="range"]').first();
    await expect(slider).toBeVisible({ timeout: 10000 });
    
    const initialVal = await slider.inputValue();
    const initialText = await page.locator('body').innerText();

    await slider.fill('60');
    await slider.dispatchEvent('input');
    await slider.dispatchEvent('change');
    
    expect(await slider.inputValue()).not.toBe(initialVal);
    expect(await page.locator('body').innerText()).not.toBe(initialText);

    const resetBtn = page.locator('button:has-text("إعادة ضبط"), button:has-text("إعادة الضبط")').first();
    await expect(resetBtn).toBeVisible();
    await resetBtn.click();
    
    expect(await slider.inputValue()).toBe(initialVal);
    expect(await page.locator('body').innerText()).toBe(initialText);
  });

  test('interactive controls in physics-fifth-thermodynamics respond reactively', async ({ page }) => {
    await page.goto('/subject/physics/simulations/physics-fifth-thermodynamics', { waitUntil: 'domcontentloaded' });

    const slider = page.locator('input[type="range"]').first();
    await expect(slider).toBeVisible({ timeout: 10000 });
    
    const initialVal = await slider.inputValue();
    const initialText = await page.locator('body').innerText();

    await slider.fill('400');
    await slider.dispatchEvent('input');
    await slider.dispatchEvent('change');
    
    expect(await slider.inputValue()).not.toBe(initialVal);
    expect(await page.locator('body').innerText()).not.toBe(initialText);

    const resetBtn = page.locator('button:has-text("إعادة ضبط"), button:has-text("إعادة الضبط")').first();
    await expect(resetBtn).toBeVisible();
    await resetBtn.click();
    
    expect(await slider.inputValue()).toBe(initialVal);
    expect(await page.locator('body').innerText()).toBe(initialText);
  });

  test('interactive controls in physics-sixth-capacitors respond reactively', async ({ page }) => {
    await page.goto('/subject/physics/simulations/physics-sixth-capacitors', { waitUntil: 'domcontentloaded' });

    const slider = page.locator('input[type="range"]').first();
    await expect(slider).toBeVisible({ timeout: 10000 });
    
    const initialVal = await slider.inputValue();
    const initialText = await page.locator('body').innerText();

    await slider.fill('15');
    await slider.dispatchEvent('input');
    await slider.dispatchEvent('change');
    
    expect(await slider.inputValue()).not.toBe(initialVal);
    expect(await page.locator('body').innerText()).not.toBe(initialText);

    const resetBtn = page.locator('button:has-text("إعادة ضبط"), button:has-text("إعادة الضبط")').first();
    await expect(resetBtn).toBeVisible();
    await resetBtn.click();
    
    expect(await slider.inputValue()).toBe(initialVal);
    expect(await page.locator('body').innerText()).toBe(initialText);
  });
});
