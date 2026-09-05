import { test, describe } from 'node:test';
import assert from 'node:assert';
import { validateStudentProfile } from '../../lib/validation/profileSchema';
import { generateMockProjectSuite } from '../../lib/ai/mockDecisionEngine';
import { evaluateVivaDefenseLocally } from '../../lib/ai/vivaEvaluator';
import { generateUniversitySynopsisMarkdown } from '../../lib/export/synopsisExporter';
import { StudentProfile } from '../../lib/types/index';

describe('Integration: End-to-End Capstone Workflow', () => {
  test('executes complete user journey from profiling to synopsis download', () => {
    // 1. Ingest Student Profile
    const profile: StudentProfile = {
      branch: 'Computer Science & Engineering',
      interests: ['Distributed Systems', 'Cloud Architecture & DevOps'],
      currentSkills: ['Go', 'TypeScript', 'Docker', 'PostgreSQL'],
      experienceLevel: 'Advanced',
      preferredDomains: ['Cloud & DevOps'],
      availableMonths: 4,
      weeklyHours: 15,
      careerGoal: 'Placements',
      preferredProjectScale: 'FullScale',
      preferredPlatform: 'Web',
      likesResearch: false,
      likesDesign: false,
      likesBackend: true,
      likesAI: false,
    };

    // 2. Validate Profile Constraints
    const validation = validateStudentProfile(profile);
    assert.strictEqual(validation.isValid, true, 'Profile must pass boundary validation');

    // 3. Synthesize 5-Idea Ranked Suite
    const suite = generateMockProjectSuite(profile);
    assert.strictEqual(suite.recommendedProjects.length, 5, 'Must generate exactly 5 ranked proposals');

    // 4. Select Proposal #1 and verify Blueprint Studio contents
    const activeProject = suite.recommendedProjects[0];
    assert.ok(activeProject.title.length > 0);
    assert.ok(activeProject.matchScore >= 90);

    const blueprint = suite.projectBlueprint;
    assert.ok(blueprint.coreModules.length >= 3, 'Must have at least 3 decoupled modules');
    assert.ok(blueprint.userPersonas.length >= 2, 'Must have target user personas');
    assert.ok(blueprint.folderStructure.length > 0, 'Must have folder structure');

    // 5. Verify 16-Week Roadmap Progression
    const roadmap = suite.developmentRoadmap;
    assert.ok(roadmap.length >= 5, 'Roadmap must contain structured milestones');
    const totalWeeklyHours = roadmap.reduce((acc, m) => acc + (m.estimatedHours || 0), 0);
    assert.ok(totalWeeklyHours >= 100, 'Total hours must be proportional to semester');

    // 6. Simulate Oral Viva Defense
    const vivaQuestion = suite.mentorReview.vivaQuestions[0];
    const defenseResponse = `
      In our architecture, we deliberately separated the write and read paths to handle high concurrency. 
      For concurrent state mutations, we implemented optimistic concurrency control utilizing database versioning 
      and an asynchronous Redis-backed queue. This isolates latency spikes, optimizes throughput, and ensures 
      idempotent updates without locking the persistent database tier or causing bottleneck failures.
    `;
    const vivaEval = evaluateVivaDefenseLocally(
      vivaQuestion.question,
      vivaQuestion.answerGuidance,
      defenseResponse
    );
    assert.ok(vivaEval.score >= 8.0, 'Substantive defense should receive high score');
    assert.strictEqual(vivaEval.verdict, 'Distinction');
    assert.ok(vivaEval.followUpCurveball.length > 10, 'Must generate curveball question');

    // 7. Compile Final University Synopsis
    const synopsis = generateUniversitySynopsisMarkdown(suite, profile);
    assert.ok(synopsis.includes(activeProject.title.toUpperCase()));
    assert.ok(synopsis.includes('### 5. CORE MODULES SPECIFICATION'));
    assert.ok(synopsis.includes('### 8. DEVELOPMENT MILESTONES & ROADMAP'));
    assert.ok(synopsis.includes('### 10. VIVA DEFENSE PREPARATION'));
  });
});
