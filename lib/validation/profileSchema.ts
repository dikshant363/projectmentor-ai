import { StudentProfile } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateStudentProfile(profile: Partial<StudentProfile>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!profile.branch || profile.branch.trim() === '') {
    errors.branch = 'Please select or enter your academic engineering branch.';
  }

  if (!profile.interests || profile.interests.length === 0) {
    errors.interests = 'Please select at least one engineering interest area.';
  }

  if (!profile.currentSkills || profile.currentSkills.length === 0) {
    errors.currentSkills = 'Please choose at least one programming skill or technology you know.';
  }

  if (!profile.availableMonths || profile.availableMonths < 1 || profile.availableMonths > 12) {
    errors.availableMonths = 'Available timeline must be between 1 and 12 months.';
  }

  if (!profile.weeklyHours || profile.weeklyHours < 2 || profile.weeklyHours > 60) {
    errors.weeklyHours = 'Weekly hours commitment must be between 2 and 60 hours.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
