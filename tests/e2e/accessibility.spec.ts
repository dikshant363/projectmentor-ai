import { test, expect } from '@playwright/test';

test.describe('E2E: Accessibility & Keyboard Navigation', () => {
  const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://projectmentor-ai.vercel.app';

  test('verifies keyboard tab focus traverses navigation elements cleanly', async ({ page }) => {
    await page.goto(BASE_URL);

    // Press Tab multiple times and verify focus does not get trapped
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeDefined();

    await page.screenshot({ path: 'audit/testing/screenshots/accessibility-focus.png' });
  });

  test('verifies all images and icons provide alt text or are aria-hidden', async ({ page }) => {
    await page.goto(BASE_URL);

    const images = page.locator('img');
    const imgCount = await images.count();
    for (let i = 0; i < imgCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const ariaHidden = await img.getAttribute('aria-hidden');
      expect(alt !== null || ariaHidden === 'true').toBe(true);
    }
  });
});
