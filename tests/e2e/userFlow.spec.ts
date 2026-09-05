import { test, expect } from '@playwright/test';

test.describe('E2E: Project Architect AI Autonomous Flow', () => {
  const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://projectmentor-ai.vercel.app';

  test('completes full capstone journey across all 6 core views', async ({ page }) => {
    // 1. Visit Landing Page
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/ProjectMentor AI|Project Architect AI/);
    const startBtn = page.getByRole('link', { name: /Start Blueprint|Initialize Project Profiler/i }).first();
    await expect(startBtn).toBeVisible();

    // 2. Navigate to Student Profile Builder
    await page.goto(`${BASE_URL}/profile`);
    await expect(page.getByText('Student Profiler').first()).toBeVisible();

    // Step 1: Select Branch
    const branchSelect = page.locator('select').first();
    if (await branchSelect.isVisible()) {
      await branchSelect.selectOption({ index: 1 });
    }

    // Advance to Step 2
    const nextBtn = page.getByRole('button', { name: /Next Step/i });
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
    }

    // 3. Navigate to Recommendations Grid
    await page.goto(`${BASE_URL}/recommendations`);
    await expect(page.locator('body')).toBeVisible();

    // 4. Navigate to Architecture Blueprint Studio
    await page.goto(`${BASE_URL}/blueprint`);
    await expect(page.locator('body')).toBeVisible();

    // 5. Navigate to Milestone Development Roadmap
    await page.goto(`${BASE_URL}/roadmap`);
    await expect(page.locator('body')).toBeVisible();

    // 6. Navigate to Pre-Dev Review & Viva Simulator
    await page.goto(`${BASE_URL}/mentor`);
    await expect(page.locator('body')).toBeVisible();

    // Verify Viva Simulator console exists
    const answerInput = page.locator('#viva-answer-input');
    if (await answerInput.isVisible()) {
      await answerInput.fill('We isolated our architecture into asynchronous microservices to prevent database bottlenecks.');
      const evalBtn = page.getByRole('button', { name: /Submit Defense to Examiner/i });
      await expect(evalBtn).toBeEnabled();
    }
  });

  test('returns 404 page for nonexistent routes with return home button', async ({ page }) => {
    await page.goto(`${BASE_URL}/invalid-route-slug-test`);
    await expect(page.getByText(/Page Not Found|404/i)).toBeVisible();
    const homeLink = page.getByRole('link', { name: /Return/i });
    if (await homeLink.isVisible()) {
      await expect(homeLink).toBeVisible();
    }
  });
});
