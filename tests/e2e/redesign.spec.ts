import { expect, test } from '@playwright/test';

test('dashboard renders the learning hub for the active grade', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /مسارك نحو إتقان الإنكليزية/ })).toBeVisible();
  await expect(page.getByText('التقدم محسوب لهذا الصف فقط.', { exact: false })).toBeVisible();
  await expect(page.getByRole('button', { name: /المراجعة المركّزة/ })).toBeVisible();
});

test('direct grade routes and the navbar grade switch stay in sync', async ({ page }) => {
  await page.goto('/grade/first-intermediate');
  await expect(page.getByRole('heading', { name: 'منهج اللغة الإنكليزية · الأول المتوسط' })).toBeVisible();

  await page.getByTitle('تغيير الصف الدراسي').click();
  await page.getByRole('button', { name: /الثاني المتوسط/ }).click();

  await expect(page).toHaveURL(/\/grade\/second-intermediate$/);
  await expect(page.getByRole('heading', { name: 'منهج اللغة الإنكليزية · الثاني المتوسط' })).toBeVisible();
});

test('mobile dashboard has no document-level horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /مسارك نحو إتقان الإنكليزية/ })).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport + 1);
});
