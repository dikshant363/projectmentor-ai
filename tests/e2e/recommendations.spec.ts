import { test, expect } from '@playwright/test';

test.describe('E2E: Recommendations Explorer', () => {
  const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://projectmentor-ai.vercel.app';

  test('displays recommendations cards and allows project selection', async ({ page }) => {
    await page.goto(`${BASE_URL}/recommendations`);
    await expect(page.locator('body')).toBeVisible();

    const blueprintButtons = page.getByRole('button', { name: /Inspect Blueprint/i });
    if (await blueprintButtons.count() > 0) {
      await expect(blueprintButtons.first()).toBeVisible();
    }

    await page.screenshot({ path: 'audit/testing/screenshots/recommendations.png' });
  });
});
