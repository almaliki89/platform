import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'mobile (375x812)', width: 375, height: 812 },
  { name: 'tablet (768x1024)', width: 768, height: 1024 },
  { name: 'small-desktop (1280x800)', width: 1280, height: 800 },
  { name: 'large-desktop (1440x900)', width: 1440, height: 900 },
];

const REPRESENTATIVE_SIMS = [
  'physics-first-pressure',
  'physics-second-laws-of-motion',
  'physics-third-transformer',
  'physics-fourth-reflection-refraction',
  'physics-fifth-thermodynamics',
  'physics-sixth-modern-physics',
];

test.describe('Physics Responsive Matrix (24 Viewport Checks)', () => {
  for (const simId of REPRESENTATIVE_SIMS) {
    for (const vp of VIEWPORTS) {
      test(`${simId} on ${vp.name}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(`/subject/physics/simulations/${simId}`, { waitUntil: 'domcontentloaded' });

        // Ensure page is rendered
        const heading = page.locator('h1, h2, h3').first();
        await expect(heading).toBeVisible({ timeout: 10000 });

        // Check horizontal overflow: scrollWidth should not exceed viewport width by more than 2px
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        expect(scrollWidth).toBeLessThanOrEqual(vp.width + 2);

        // Verify reset button is in DOM and visible (strictly required for physics contract)
        const resetButton = page.locator('button:has-text("إعادة ضبط"), button:has-text("إعادة الضبط"), button[aria-label*="reset"], button[aria-label*="إعادة"]').first();
        await expect(resetButton).toBeVisible();
      });
    }
  }
});
