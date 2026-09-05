import { CareerGoal, ExperienceLevel, PreferredPlatform, ProjectScale } from '@/lib/types';

export const SUPPORTED_BRANCHES: string[] = [
  'Computer Science & Engineering',
  'Information Technology',
  'Artificial Intelligence & Data Science',
  'Electronics & Communication Engineering',
  'Electrical & Electronics Engineering',
  'Mechanical & Mechatronics Engineering',
];

export const TECHNICAL_INTERESTS: string[] = [
  'Artificial Intelligence & ML',
  'Distributed Systems',
  'Cloud Architecture & DevOps',
  'Cybersecurity & Cryptography',
  'IoT & Embedded Hardware',
  'Full-Stack Web Engineering',
  'Mobile Application Systems',
  'Data Engineering & Pipelines',
];

export const COMMON_SKILLS: string[] = [
  'Python',
  'TypeScript',
  'JavaScript',
  'Java',
  'C++',
  'React',
  'Next.js',
  'Node.js',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Docker',
  'PyTorch',
  'TensorFlow',
  'FastAPI',
  'Tailwind CSS',
];

export const EXPERIENCE_LEVELS: { label: string; value: ExperienceLevel; description: string }[] = [
  { label: 'Beginner', value: 'Beginner', description: 'Academic coursework and guided tutorial projects' },
  { label: 'Intermediate', value: 'Intermediate', description: 'Independent side-projects and framework familiarity' },
  { label: 'Advanced', value: 'Advanced', description: 'Production deployments, internships, and distributed systems' },
];

export const CAREER_GOALS: { label: string; value: CareerGoal; description: string }[] = [
  { label: 'Campus Placements', value: 'Placements', description: 'Targeting Tier-1 Product Companies (PBCs) & Tech Consultancies' },
  { label: 'Tech Startup / MVP', value: 'Startup', description: 'Launching a functional, market-tested venture' },
  { label: 'Research & Publications', value: 'Research', description: 'Academic paper publication for IEEE/ACM conferences' },
  { label: 'Higher Studies (MS/MTech)', value: 'HigherStudies', description: 'Portfolio project for top international university admissions' },
  { label: 'High-Ticket Freelance', value: 'Freelance', description: 'Client-grade deliverables and open-source authority' },
];

export const PROJECT_SCALES: { label: string; value: ProjectScale }[] = [
  { label: 'Focused (High Depth, Single Domain)', value: 'Focused' },
  { label: 'FullScale (End-to-End Full-Stack System)', value: 'FullScale' },
  { label: 'Enterprise (Distributed & Microservice-Ready)', value: 'Enterprise' },
];

export const PLATFORM_TARGETS: { label: string; value: PreferredPlatform }[] = [
  { label: 'Web Application', value: 'Web' },
  { label: 'Mobile Application', value: 'Mobile' },
  { label: 'Cloud API / Microservice', value: 'Cloud/API' },
  { label: 'Cross-Platform', value: 'CrossPlatform' },
  { label: 'Embedded & IoT Gateway', value: 'Embedded/IoT' },
];
