import { test, describe } from 'node:test';
import assert from 'node:assert';
import { generateMockProjectSuite } from '../../lib/ai/mockDecisionEngine';
import { StudentProfile } from '../../lib/types/index';

describe('Unit: Recommendation & Synthesis Engine', () => {
  const sampleProfile: StudentProfile = {
    branch: 'Computer Science & Engineering',
    interests: ['Artificial Intelligence & ML', 'Distributed Systems'],
    currentSkills: ['Python', 'TypeScript', 'Docker'],
    experienceLevel: 'Intermediate',
    preferredDomains: ['AI/ML Applications'],
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

  test('synthesizes exactly 5 distinct project proposals', () => {
    const suite = generateMockProjectSuite(sampleProfile);
    assert.strictEqual(suite.recommendedProjects.length, 5);

    // Verify all IDs are unique
    const ids = suite.recommendedProjects.map((p) => p.id);
    const uniqueIds = new Set(ids);
    assert.strictEqual(uniqueIds.size, 5);
  });

  test('validates metric score bounds across all proposals', () => {
    const suite = generateMockProjectSuite(sampleProfile);
    for (const proj of suite.recommendedProjects) {
      assert.ok(proj.matchScore >= 0 && proj.matchScore <= 100, `Match score ${proj.matchScore} out of bounds`);
      assert.ok(proj.confidenceScore >= 0 && proj.confidenceScore <= 100, `Confidence score ${proj.confidenceScore} out of bounds`);
      assert.ok(proj.resumeValue >= 1 && proj.resumeValue <= 10, `Resume value ${proj.resumeValue} out of bounds`);
      assert.ok(proj.coreFeatures.length > 0, 'Project must have core features');
      assert.ok(proj.recommendedTech.length > 0, 'Project must have tech stack');
    }
  });

  test('generates a complete architectural blueprint with decoupled modules', () => {
    const suite = generateMockProjectSuite(sampleProfile);
    const bp = suite.projectBlueprint;

    assert.ok(bp.summary.length > 10, 'Summary must be substantive');
    assert.ok(bp.userPersonas.length >= 2, 'Must include user personas');
    assert.ok(bp.systemWorkflow.length >= 3, 'Must include workflow steps');
    assert.ok(bp.coreModules.length >= 3, 'Must define decoupled core modules');

    // Verify module contract integrity
    for (const mod of bp.coreModules) {
      assert.ok(mod.name, 'Module must have a name');
      assert.ok(mod.inputs, 'Module must have an input specification');
      assert.ok(mod.outputs, 'Module must have an output specification');
      assert.ok(['Low', 'Medium', 'High'].includes(mod.complexity), 'Valid complexity');
    }
  });

  test('generates a chronological roadmap spanning available semester weeks', () => {
    const suite = generateMockProjectSuite(sampleProfile);
    const roadmap = suite.developmentRoadmap;

    assert.ok(roadmap.length > 0, 'Roadmap must have milestones');
    const totalAllocatedHours = roadmap.reduce((acc, m) => acc + (m.estimatedHours || 0), 0);
    assert.ok(totalAllocatedHours > 0, 'Must allocate hours across milestones');

    // Verify milestone deliverables
    for (const m of roadmap) {
      assert.ok(m.week >= 1, 'Week number must be valid');
      assert.ok(m.phaseName, 'Must have phase name');
      assert.ok(m.deliverables.length > 0, 'Must have deliverables');
    }
  });

  test('generates pre-development mentor review with risk matrix and 5 viva questions', () => {
    const suite = generateMockProjectSuite(sampleProfile);
    const review = suite.mentorReview;

    assert.ok(review.strengths.length > 0, 'Must list strengths');
    assert.ok(review.weaknesses.length > 0, 'Must list weaknesses');
    assert.ok(review.risks.length > 0, 'Must define risk items');
    assert.strictEqual(review.vivaQuestions.length, 5, 'Must generate exactly 5 viva questions');

    for (const v of review.vivaQuestions) {
      assert.ok(v.question.length > 10, 'Question must be substantive');
      assert.ok(v.answerGuidance.length > 10, 'Answer guidance must be substantive');
    }
  });
});
