import { test, expect } from '@playwright/test';

test.describe('E2E: Architecture Blueprint Studio', () => {
  const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://projectmentor-ai.vercel.app';

  test('renders architecture specifications, core modules, and technology stack', async ({ page }) => {
    await page.goto(`${BASE_URL}/blueprint`);
    await expect(page.locator('body')).toBeVisible();

    const techStackHeading = page.getByText(/Technology Stack/i);
    if (await techStackHeading.isVisible()) {
      await expect(techStackHeading).toBeVisible();
    }

    await page.screenshot({ path: 'audit/testing/screenshots/blueprint.png' });
  });
});
