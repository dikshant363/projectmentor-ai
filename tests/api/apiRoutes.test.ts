import { test, describe } from 'node:test';
import assert from 'node:assert';
import { POST as generateProjectHandler } from '../../app/api/generate-project/route';
import { POST as evaluateVivaHandler } from '../../app/api/evaluate-viva/route';
import { NextRequest } from 'next/server';

describe('API Routes: Server-side Security & Handlers', () => {
  test('POST /api/generate-project: handles valid profile and returns 200 with 5 ideas', async () => {
    const payload = {
      branch: 'Computer Science & Engineering',
      interests: ['Artificial Intelligence & ML'],
      currentSkills: ['Python', 'TypeScript'],
      experienceLevel: 'Intermediate',
      preferredDomains: ['AI/ML Applications'],
      availableMonths: 4,
      weeklyHours: 15,
      careerGoal: 'Placements',
      preferredProjectScale: 'FullScale',
      preferredPlatform: 'Web',
      likesResearch: false,
      likesDesign: false,
      likesBackend: true,
      likesAI: true,
    };

    const req = new NextRequest('http://localhost:3000/api/generate-project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const res = await generateProjectHandler(req);
    assert.strictEqual(res.status, 200);

    const data = await res.json();
    assert.ok(data.recommendedProjects);
    assert.strictEqual(data.recommendedProjects.length, 5);
    assert.ok(data.projectBlueprint);
    assert.ok(data.developmentRoadmap);
    assert.ok(data.mentorReview);
  });

  test('POST /api/generate-project: rejects malformed JSON with 400 Bad Request', async () => {
    const req = new NextRequest('http://localhost:3000/api/generate-project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{"invalidJson: true',
    });

    const res = await generateProjectHandler(req);
    assert.strictEqual(res.status, 400);

    const data = await res.json();
    assert.ok(data.error.includes('Malformed') || data.error.includes('invalid'));
  });

  test('POST /api/generate-project: rejects missing required fields with 400 Bad Request', async () => {
    const req = new NextRequest('http://localhost:3000/api/generate-project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ branch: '' }),
    });

    const res = await generateProjectHandler(req);
    assert.strictEqual(res.status, 400);

    const data = await res.json();
    assert.strictEqual(data.error, 'Invalid profile data');
    assert.ok(data.details.branch);
  });

  test('POST /api/evaluate-viva: returns 200 with score and curveball question', async () => {
    const payload = {
      question: 'Why choose Redis over an in-memory variable?',
      answerGuidance: 'Redis provides shared distributed state across microservices and persistence options.',
      studentAnswer: 'In our architecture, we needed distributed cache synchronization across multiple horizontally scaled containers. Using a shared Redis cluster allows atomic operations and prevents cache desynchronization.',
      projectTitle: 'NeuroSync',
    };

    const req = new NextRequest('http://localhost:3000/api/evaluate-viva', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const res = await evaluateVivaHandler(req);
    assert.strictEqual(res.status, 200);

    const data = await res.json();
    assert.ok(data.score >= 3.0 && data.score <= 10.0);
    assert.ok(data.verdict);
    assert.ok(data.examinerObservation);
    assert.ok(data.followUpCurveball);
    assert.ok(data.modelBenchmark);
  });

  test('POST /api/evaluate-viva: rejects short answers (< 5 chars) with 400 Bad Request', async () => {
    const req = new NextRequest('http://localhost:3000/api/evaluate-viva', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: 'What is your DB schema?',
        studentAnswer: 'hi',
      }),
    });

    const res = await evaluateVivaHandler(req);
    assert.strictEqual(res.status, 400);
  });
});
