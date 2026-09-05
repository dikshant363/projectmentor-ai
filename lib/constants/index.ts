export const BRANCH_OPTIONS = [
  'Computer Science & Engineering',
  'Information Technology',
  'Artificial Intelligence & Data Science',
  'Electronics & Communication Engineering',
  'Electrical Engineering',
  'Mechanical / Mechatronics',
  'Civil Engineering / GIS',
  'Biotechnology / Bioinformatics',
  'Other Engineering Discipline',
];

export const DOMAIN_OPTIONS = [
  'Artificial Intelligence / LLMs',
  'Computer Vision & Multimodal',
  'Full-Stack Cloud & Web Apps',
  'Mobile Applications (iOS / Android)',
  'Cybersecurity & Network Defense',
  'IoT, Robotics & Hardware Integration',
  'Fintech, Web3 & Distributed Ledger',
  'Healthcare AI & Bio-Computing',
  'EdTech & Developer Productivity',
  'Green Tech & Smart City Sustainability',
];

export const SKILL_OPTIONS = [
  'Python',
  'JavaScript / TypeScript',
  'React / Next.js',
  'Node.js / Express',
  'FastAPI / Flask',
  'PyTorch / TensorFlow',
  'PostgreSQL / SQL',
  'MongoDB',
  'Docker / Containers',
  'AWS / Cloud Basics',
  'Flutter / React Native',
  'OpenCV / MediaPipe',
  'C / C++',
  'Java / Spring Boot',
  'Git / GitHub',
  'Tailwind CSS',
];

export const CAREER_GOALS = [
  {
    id: 'Placements',
    label: 'Campus Placements & SDE Roles',
    description: 'High emphasis on clean architecture, system design, scalability, and algorithms.',
  },
  {
    id: 'Startup',
    label: 'Startup Prototype / MVP',
    description: 'Prioritize commercial viability, rapid user feedback, and market problem-solving.',
  },
  {
    id: 'Research',
    label: 'Research Paper & Conferences',
    description: 'Novel methodology, rigorous benchmarking, IEEE/ACM publication suitability.',
  },
  {
    id: 'HigherStudies',
    label: 'Higher Studies & MS Portfolio',
    description: 'Deep theoretical foundations, technical breadth, and academic credibility.',
  },
  {
    id: 'Freelance',
    label: 'Freelance & Contract Engineering',
    description: 'Immediate utility, production quality, and client-ready deliverables.',
  },
] as const;

export const DEFAULT_STUDENT_PROFILE = {
  branch: 'Computer Science & Engineering',
  interests: ['Artificial Intelligence / LLMs', 'Full-Stack Cloud & Web Apps'],
  currentSkills: ['Python', 'JavaScript / TypeScript', 'React / Next.js', 'FastAPI / Flask'],
  experienceLevel: 'Intermediate' as const,
  preferredDomains: ['Artificial Intelligence / LLMs', 'Developer Productivity'],
  availableMonths: 4,
  weeklyHours: 15,
  careerGoal: 'Placements' as const,
  preferredProjectScale: 'FullScale' as const,
  preferredPlatform: 'Web' as const,
  likesResearch: false,
  likesDesign: true,
  likesBackend: true,
  likesAI: true,
};
