import { test, expect } from '@playwright/test';

test.describe('E2E: Landing Page', () => {
  const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://projectmentor-ai.vercel.app';

  test('loads home page, renders hero title, and captures screenshot', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/ProjectMentor AI/i);

    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    const startBtn = page.getByRole('link', { name: /Start Blueprint/i }).first();
    await expect(startBtn).toBeVisible();

    await page.screenshot({ path: 'audit/testing/screenshots/landing-hero.png', fullPage: true });
  });

  test('verifies global navigation links exist and are clickable', async ({ page }) => {
    await page.goto(BASE_URL);
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();

    await expect(page.getByRole('link', { name: /Discover/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Profile/i }).first()).toBeVisible();
  });
});
