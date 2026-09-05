import { describe, test, expect, assert, vi } from 'vitest';
import { generateUniversitySynopsisMarkdown, downloadFile } from '../../lib/export/synopsisExporter';
import { generateMockProjectSuite } from '../../lib/ai/mockDecisionEngine';
import { StudentProfile } from '../../lib/types/index';

describe('Unit: University Synopsis Exporter', () => {
  const profile: StudentProfile = {
    branch: 'Information Technology',
    interests: ['Cybersecurity & Cryptography'],
    currentSkills: ['Python', 'Go', 'Linux'],
    experienceLevel: 'Intermediate',
    preferredDomains: ['Cloud & DevOps'],
    availableMonths: 4,
    weeklyHours: 12,
    careerGoal: 'Placements',
    preferredProjectScale: 'FullScale',
    preferredPlatform: 'Web',
    likesResearch: false,
    likesDesign: false,
    likesBackend: true,
    likesAI: false,
  };

  test('formats comprehensive academic markdown proposal', () => {
    const suite = generateMockProjectSuite(profile);
    const md = generateUniversitySynopsisMarkdown(suite, profile);

    assert.ok(md.includes('# UNIVERSITY FINAL-YEAR PROJECT SYNOPSIS'), 'Must have main synopsis heading');
    assert.ok(md.includes(profile.branch), 'Must contain academic track');
    assert.ok(md.includes('### 1. ABSTRACT & EXECUTIVE SUMMARY'), 'Must include abstract');
    assert.ok(md.includes('### 2. PROBLEM STATEMENT'), 'Must include problem statement');
    assert.ok(md.includes('### 5. CORE MODULES SPECIFICATION'), 'Must include core modules');
    assert.ok(md.includes('### 8. DEVELOPMENT MILESTONES & ROADMAP'), 'Must include roadmap table');
    assert.ok(md.includes('### 9. PRE-DEVELOPMENT RISK MITIGATION MATRIX'), 'Must include risk matrix');
    assert.ok(md.includes('### 10. VIVA DEFENSE PREPARATION (EXAMINER CURVEBALLS)'), 'Must include viva defense');
  });

  test('contains properly formatted markdown table headers', () => {
    const suite = generateMockProjectSuite(profile);
    const md = generateUniversitySynopsisMarkdown(suite, profile);

    assert.ok(md.includes('| Week / Milestone | Phase Objective | Key Deliverables | Estimated Hours |'));
    assert.ok(md.includes('| Anticipated Engineering Risk | Severity | Mitigation Strategy |'));
  });

  test('executes downloadFile DOM sequence with mock URL methods', () => {
    global.URL.createObjectURL = () => 'blob:mock-url';
    global.URL.revokeObjectURL = () => {};
    const clickSpy = vi.fn();
    HTMLAnchorElement.prototype.click = clickSpy;

    downloadFile('# Sample Synopsis', 'synopsis.md');
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });
});
