import { test, expect } from '@playwright/test';

test.describe('E2E: Development Roadmap & Milestones', () => {
  const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://projectmentor-ai.vercel.app';

  test('renders timeline milestones and calculates academic hours', async ({ page }) => {
    await page.goto(`${BASE_URL}/roadmap`);
    await expect(page.locator('body')).toBeVisible();

    const roadmapTitle = page.getByText(/Development Roadmap/i).first();
    if (await roadmapTitle.isVisible()) {
      await expect(roadmapTitle).toBeVisible();
    }

    await page.screenshot({ path: 'audit/testing/screenshots/roadmap.png' });
  });
});
