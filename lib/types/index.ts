export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type CareerGoal = 'Placements' | 'Startup' | 'Research' | 'HigherStudies' | 'Freelance';
export type ProjectScale = 'Focused' | 'FullScale' | 'Enterprise';
export type PreferredPlatform = 'Web' | 'Mobile' | 'Cloud/API' | 'CrossPlatform' | 'Embedded/IoT';

export interface StudentProfile {
  branch: string;
  interests: string[];
  currentSkills: string[];
  experienceLevel: ExperienceLevel;
  preferredDomains: string[];
  availableMonths: number;
  weeklyHours: number;
  careerGoal: CareerGoal;
  preferredProjectScale: ProjectScale;
  preferredPlatform: PreferredPlatform;
  likesResearch: boolean;
  likesDesign: boolean;
  likesBackend: boolean;
  likesAI: boolean;
}

export interface ProjectIdea {
  id: string;
  title: string;
  tagline: string;
  category: string;
  problemStatement: string;
  targetAudience: string;
  matchScore: number; // 0-100
  confidenceScore: number; // 0-100
  difficulty: ExperienceLevel;
  estimatedDuration: string;
  resumeValue: number; // 1-10
  innovationScore: number; // 1-10
  practicalityScore: number; // 1-10
  matchReason: string;
  recommendedTech: string[];
  coreFeatures: string[];
}

export interface TechItem {
  name: string;
  reason: string;
  alternatives: string[];
}

export interface ExternalApiItem {
  name: string;
  purpose: string;
  freeTier: boolean;
}

export interface TechnologyStack {
  frontend: TechItem;
  backend: TechItem;
  aiLayer: TechItem;
  database: TechItem;
  deployment: TechItem;
  auth: { name: string; reason: string };
  externalApis: ExternalApiItem[];
  devTools: string[];
  testingTools: string[];
}

export interface UserPersona {
  role: string;
  painPoint: string;
  solution: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}

export interface CoreModule {
  name: string;
  description: string;
  inputs: string;
  outputs: string;
  complexity: 'Low' | 'Medium' | 'High';
}

export interface SuggestedDataset {
  name: string;
  source: string;
  url: string;
  description: string;
}

export interface SuggestedApi {
  name: string;
  provider: string;
  url: string;
  freeTierNotes: string;
  description?: string;
}

export interface FeatureItem {
  title: string;
  priority: 'P0' | 'P1' | 'P2';
  effort: string;
}

export interface ProjectBlueprint {
  summary: string;
  problemStatement: string;
  userPersonas: UserPersona[];
  systemWorkflow: WorkflowStep[];
  coreModules: CoreModule[];
  architectureSummary: string;
  suggestedDatasets: SuggestedDataset[];
  suggestedApis: SuggestedApi[];
  folderStructure: string[];
  mvpFeatures: FeatureItem[];
  v2Features: FeatureItem[];
}

export interface Milestone {
  week: number;
  phaseName: string;
  goal: string;
  deliverables: string[];
  learningTopics: string[];
  estimatedHours: number;
  risks: string;
  successCriteria: string;
  completed?: boolean;
}

export interface RiskItem {
  risk: string;
  severity: 'Low' | 'Medium' | 'High';
  mitigation: string;
}

export interface VivaQuestion {
  question: string;
  answerGuidance: string;
}

export interface ImprovementPriority {
  action: string;
  impact: 'High' | 'Medium';
  effort: 'Low' | 'Medium' | 'High';
}

export interface MentorReview {
  strengths: string[];
  weaknesses: string[];
  risks: RiskItem[];
  technicalChallenges: string[];
  learningChallenges: string[];
  portfolioImpact: string;
  vivaQuestions: VivaQuestion[];
  improvementPriorities: ImprovementPriority[];
}

export interface CareerAlignment {
  track: string;
  score: number; // 0-100
  rationale: string;
  interviewTalkingPoints: string[];
}

export interface GeneratedProjectSuite {
  profileAnalysis: {
    studentSummary: string;
    inferredStrengths: string[];
    feasibilityVerdict: string;
  };
  recommendedProjects: ProjectIdea[];
  selectedProjectIndex: number;
  technologyStack: TechnologyStack;
  projectBlueprint: ProjectBlueprint;
  developmentRoadmap: Milestone[];
  mentorReview: MentorReview;
  careerAlignment: CareerAlignment;
  improvementSuggestions: string[];
  nextActions: string[];
  generatedAt: string;
  isFallback?: boolean;
}
