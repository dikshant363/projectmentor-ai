import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateProjectSuiteWithGemini } from '../../lib/ai/gemini';
import { StudentProfile } from '../../lib/types/index';

describe('Unit: Gemini AI Integration & Fallback Engine', () => {
  const sampleProfile: StudentProfile = {
    branch: 'Computer Science & Engineering',
    interests: ['Artificial Intelligence / LLMs'],
    currentSkills: ['Python', 'PyTorch'],
    experienceLevel: 'Intermediate',
    preferredDomains: ['Artificial Intelligence'],
    availableMonths: 4,
    weeklyHours: 15,
    careerGoal: 'Placements',
    preferredProjectScale: 'FullScale',
    preferredPlatform: 'Web',
    likesResearch: true,
    likesDesign: false,
    likesBackend: true,
    likesAI: true,
  };

  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  test('falls back gracefully to deterministic engine when GEMINI_API_KEY is missing', async () => {
    delete process.env.GEMINI_API_KEY;
    const suite = await generateProjectSuiteWithGemini(sampleProfile);

    expect(suite).toBeDefined();
    expect(suite.recommendedProjects).toHaveLength(5);
    expect(suite.isFallback).toBe(true);
  });

  test('falls back when Gemini API returns HTTP error status', async () => {
    process.env.GEMINI_API_KEY = 'test-fake-key';
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
    });

    const suite = await generateProjectSuiteWithGemini(sampleProfile);
    expect(suite).toBeDefined();
    expect(suite.isFallback).toBe(true);
  });

  test('falls back when Gemini response contains empty candidates or invalid payload', async () => {
    process.env.GEMINI_API_KEY = 'test-fake-key';
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ candidates: [] }),
    });

    const suite = await generateProjectSuiteWithGemini(sampleProfile);
    expect(suite).toBeDefined();
    expect(suite.isFallback).toBe(true);
  });

  test('falls back when network request throws or aborts', async () => {
    process.env.GEMINI_API_KEY = 'test-fake-key';
    global.fetch = vi.fn().mockRejectedValue(new Error('Connection timed out'));

    const suite = await generateProjectSuiteWithGemini(sampleProfile);
    expect(suite).toBeDefined();
    expect(suite.isFallback).toBe(true);
  });

  test('parses and returns valid Gemini JSON response and marks isFallback=false', async () => {
    process.env.GEMINI_API_KEY = 'test-fake-key';
    const mockJson = {
      profileAnalysis: { studentSummary: 'High talent', inferredStrengths: ['Python'], feasibilityVerdict: 'Feasible' },
      recommendedProjects: [{ id: 'p1', title: 'Smart LLM', matchScore: 99 }],
      selectedProjectIndex: 0,
      technologyStack: { frontend: { name: 'Next.js' } },
      projectBlueprint: { summary: 'Architected system' },
      developmentRoadmap: [],
      mentorReview: { strengths: [] },
      careerAlignment: { track: 'AI Engineer' },
      improvementSuggestions: [],
      nextActions: [],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        candidates: [{ content: { parts: [{ text: JSON.stringify(mockJson) }] } }],
      }),
    });

    const suite = await generateProjectSuiteWithGemini(sampleProfile);
    expect(suite).toBeDefined();
    expect(suite.isFallback).toBe(false);
    expect(suite.profileAnalysis.studentSummary).toBe('High talent');
  });

  test('strips markdown code blocks (```json ... ```) and parses cleanly', async () => {
    process.env.GEMINI_API_KEY = 'test-fake-key';
    const mockJson = {
      profileAnalysis: { studentSummary: 'Markdown Stripped', inferredStrengths: [], feasibilityVerdict: 'Optimal' },
      recommendedProjects: [],
      selectedProjectIndex: 0,
      technologyStack: {},
      projectBlueprint: {},
      developmentRoadmap: [],
      mentorReview: {},
      careerAlignment: {},
      improvementSuggestions: [],
      nextActions: [],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        candidates: [{ content: { parts: [{ text: '```json\n' + JSON.stringify(mockJson) + '\n```' }] } }],
      }),
    });

    const suite = await generateProjectSuiteWithGemini(sampleProfile);
    expect(suite).toBeDefined();
    expect(suite.isFallback).toBe(false);
    expect(suite.profileAnalysis.studentSummary).toBe('Markdown Stripped');
  });
});
