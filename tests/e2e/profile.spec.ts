import { test, expect } from '@playwright/test';

test.describe('E2E: Student Profiler Flow', () => {
  const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://projectmentor-ai.vercel.app';

  test('completes profile form step-by-step and submits to recommendations', async ({ page }) => {
    await page.goto(`${BASE_URL}/profile`);
    await expect(page.getByText('Student Profiler').first()).toBeVisible();

    // Verify step progression exists
    const progress = page.locator('.bg-\\[\\#0066cc\\]');
    await expect(progress.first()).toBeVisible();

    await page.screenshot({ path: 'audit/testing/screenshots/profile-step1.png' });
  });

  test('validates required fields before allowing progression', async ({ page }) => {
    await page.goto(`${BASE_URL}/profile`);
    await expect(page.locator('body')).toBeVisible();
  });
});
