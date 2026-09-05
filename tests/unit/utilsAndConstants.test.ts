import { describe, test, expect } from 'vitest';
import { cn } from '../../lib/utils/cn';
import {
  SUPPORTED_BRANCHES,
  TECHNICAL_INTERESTS,
  COMMON_SKILLS,
  EXPERIENCE_LEVELS,
  CAREER_GOALS as DOMAIN_CAREER_GOALS,
  PROJECT_SCALES,
  PLATFORM_TARGETS,
} from '../../lib/constants/domains';
import {
  BRANCH_OPTIONS,
  DOMAIN_OPTIONS,
  SKILL_OPTIONS,
  DEFAULT_STUDENT_PROFILE,
} from '../../lib/constants/index';

describe('Unit: Utilities & Domain Constants', () => {
  describe('cn (Tailwind Class Merger)', () => {
    test('merges standard classes correctly', () => {
      const result = cn('px-4', 'py-2', 'text-white');
      expect(result).toBe('px-4 py-2 text-white');
    });

    test('resolves conflicting Tailwind utility classes in favor of last argument', () => {
      const result = cn('px-4 text-red-500', 'px-6 text-blue-500');
      expect(result).toBe('px-6 text-blue-500');
    });

    test('handles conditional and falsy classes gracefully', () => {
      const isPrimary = true;
      const isLarge = false;
      const result = cn(
        'base-class',
        isPrimary && 'primary-class',
        isLarge && 'large-class',
        null,
        undefined
      );
      expect(result).toBe('base-class primary-class');
    });
  });

  describe('Domain Constants Integrity', () => {
    test('SUPPORTED_BRANCHES and BRANCH_OPTIONS contain canonical engineering branches', () => {
      expect(SUPPORTED_BRANCHES.length).toBeGreaterThanOrEqual(6);
      expect(SUPPORTED_BRANCHES).toContain('Computer Science & Engineering');
      expect(BRANCH_OPTIONS).toContain('Computer Science & Engineering');
      expect(BRANCH_OPTIONS).toContain('Information Technology');
    });

    test('TECHNICAL_INTERESTS and DOMAIN_OPTIONS provide structured domains', () => {
      expect(TECHNICAL_INTERESTS.length).toBeGreaterThanOrEqual(6);
      expect(DOMAIN_OPTIONS.length).toBeGreaterThanOrEqual(6);
      expect(TECHNICAL_INTERESTS).toContain('Artificial Intelligence & ML');
      expect(DOMAIN_OPTIONS).toContain('Artificial Intelligence / LLMs');
    });

    test('COMMON_SKILLS and SKILL_OPTIONS provide multi-domain technology items', () => {
      expect(COMMON_SKILLS.length).toBeGreaterThanOrEqual(15);
      expect(COMMON_SKILLS).toContain('Python');
      expect(COMMON_SKILLS).toContain('TypeScript');
      expect(SKILL_OPTIONS).toContain('Python');
    });

    test('EXPERIENCE_LEVELS covers academic progression', () => {
      expect(EXPERIENCE_LEVELS.map(t => t.value)).toEqual(['Beginner', 'Intermediate', 'Advanced']);
    });

    test('CAREER_GOALS contains distinct post-graduation pathways', () => {
      expect(DOMAIN_CAREER_GOALS.length).toBeGreaterThanOrEqual(4);
      expect(DOMAIN_CAREER_GOALS.map(c => c.value)).toContain('Placements');
      expect(DOMAIN_CAREER_GOALS.map(c => c.value)).toContain('Startup');
      expect(DOMAIN_CAREER_GOALS.map(c => c.value)).toContain('Research');
    });

    test('PROJECT_SCALES and PLATFORM_TARGETS define architectural bounds', () => {
      expect(PROJECT_SCALES.length).toBe(3);
      expect(PLATFORM_TARGETS.length).toBeGreaterThanOrEqual(4);
    });

    test('DEFAULT_STUDENT_PROFILE provides fully valid initial state', () => {
      expect(DEFAULT_STUDENT_PROFILE.branch).toBe('Computer Science & Engineering');
      expect(DEFAULT_STUDENT_PROFILE.availableMonths).toBe(4);
      expect(DEFAULT_STUDENT_PROFILE.weeklyHours).toBe(15);
    });
  });
});
