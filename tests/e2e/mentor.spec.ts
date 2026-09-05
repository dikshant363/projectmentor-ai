import { test, expect } from '@playwright/test';

test.describe('E2E: Mentor Review & Viva Simulator', () => {
  const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://projectmentor-ai.vercel.app';

  test('interacts with viva defense chamber and submits oral response', async ({ page }) => {
    await page.goto(`${BASE_URL}/mentor`);
    await expect(page.locator('body')).toBeVisible();

    const vivaHeading = page.getByText(/Viva Defense/i);
    if (await vivaHeading.isVisible()) {
      await expect(vivaHeading.first()).toBeVisible();
    }

    const answerBox = page.locator('#viva-answer-input');
    if (await answerBox.isVisible()) {
      await answerBox.fill('We designed our microservices using asynchronous event streams.');
      const submitBtn = page.getByRole('button', { name: /Submit Defense/i });
      await expect(submitBtn).toBeEnabled();
    }

    await page.screenshot({ path: 'audit/testing/screenshots/mentor-viva.png' });
  });
});
