import { test, expect } from '@playwright/test';

test.describe('E2E: Production API Health & Contracts', () => {
  const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://projectmentor-ai.vercel.app';

  test('POST /api/generate-project responds with HTTP 200 and complete recommendation suite', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/generate-project`, {
      data: {
        branch: 'Computer Science & Engineering',
        interests: ['Artificial Intelligence / LLMs'],
        currentSkills: ['Python', 'TypeScript'],
        experienceLevel: 'Intermediate',
        availableMonths: 4,
        weeklyHours: 15,
      },
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.recommendedProjects).toBeDefined();
    expect(data.recommendedProjects.length).toBe(5);
    expect(data.projectBlueprint).toBeDefined();
    expect(data.developmentRoadmap).toBeDefined();
    expect(data.mentorReview).toBeDefined();
  });

  test('POST /api/evaluate-viva evaluates response and returns structured verdict', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/evaluate-viva`, {
      data: {
        question: 'How do you handle dataset sparsity in your training pipeline?',
        studentAnswer: 'We implemented data augmentation with synthetic smote generation and cross-validation checkpoints.',
        projectCategory: 'Artificial Intelligence',
      },
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.score).toBeDefined();
    expect(data.verdict).toBeDefined();
    expect(data.followUpCurveball).toBeDefined();
  });
});
