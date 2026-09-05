import { StudentProfile } from '../types/index';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Sanitizes input strings against XSS, null bytes, script tags and HTML injection.
 */
export function sanitizeInputString(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // strip script tags AND contents
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '') // strip style tags AND contents
    .replace(/\0/g, '') // strip null bytes
    .replace(/<[^>]*>/g, '') // strip remaining HTML/SVG tags
    .replace(/javascript:/gi, '') // strip pseudo-protocols
    .trim();
}

/**
 * Validates payload against prompt injection signatures and malicious payloads.
 */
export function isPayloadSecure(input: string): boolean {
  if (typeof input !== 'string') return false;
  const injectionPatterns = [
    /ignore\s+(all\s+)?(previous|prior)\s+instructions/i,
    /system\s+prompt\s+override/i,
    /<script\b[^>]*>/i,
    /<svg\b[^>]*onload/i,
    /drop\s+table\s+/i,
    /union\s+select\s+/i,
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(input)) {
      return false;
    }
  }

  return true;
}

/**
 * Validates a student profile submission against boundary conditions.
 */
export function validateStudentProfile(profile: Partial<StudentProfile>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!profile.branch || profile.branch.trim() === '') {
    errors.branch = 'Please select or enter your academic engineering branch.';
  } else if (!isPayloadSecure(profile.branch)) {
    errors.branch = 'Branch input contains suspicious or invalid characters.';
  } else if (profile.branch.length > 150) {
    errors.branch = 'Branch input exceeds maximum character limit.';
  }

  if (!profile.interests || !Array.isArray(profile.interests) || profile.interests.length === 0) {
    errors.interests = 'Please select at least one engineering interest area.';
  } else {
    for (const interest of profile.interests) {
      if (!isPayloadSecure(interest)) {
        errors.interests = 'Interests contain invalid or disallowed characters.';
        break;
      }
    }
  }

  if (!profile.currentSkills || !Array.isArray(profile.currentSkills) || profile.currentSkills.length === 0) {
    errors.currentSkills = 'Please choose at least one programming skill or technology you know.';
  } else {
    for (const skill of profile.currentSkills) {
      if (!isPayloadSecure(skill)) {
        errors.currentSkills = 'Skills contain invalid or disallowed characters.';
        break;
      }
    }
  }

  if (!profile.availableMonths || typeof profile.availableMonths !== 'number' || profile.availableMonths < 1 || profile.availableMonths > 12) {
    errors.availableMonths = 'Available timeline must be between 1 and 12 months.';
  }

  if (!profile.weeklyHours || typeof profile.weeklyHours !== 'number' || profile.weeklyHours < 2 || profile.weeklyHours > 60) {
    errors.weeklyHours = 'Weekly hours commitment must be between 2 and 60 hours.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
