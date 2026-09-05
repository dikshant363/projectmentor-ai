import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import HomePage from '../../app/page';
import NotFound from '../../app/not-found';
import ProfilePage from '../../app/profile/page';
import RecommendationsPage from '../../app/recommendations/page';
import BlueprintPage from '../../app/blueprint/page';
import RoadmapPage from '../../app/roadmap/page';
import MentorPage from '../../app/mentor/page';
import { ProjectProvider } from '../../lib/context/ProjectContext';
import { projectStore } from '../../lib/context/projectStore';
import { generateMockProjectSuite } from '../../lib/ai/mockDecisionEngine';
import { StudentProfile } from '../../lib/types/index';

const testProfile: StudentProfile = {
  branch: 'Computer Science & Engineering',
  interests: ['Artificial Intelligence / LLMs', 'Web Development'],
  currentSkills: ['Python', 'TypeScript', 'React'],
  experienceLevel: 'Intermediate',
  preferredDomains: ['Artificial Intelligence', 'Full Stack Development'],
  availableMonths: 4,
  weeklyHours: 15,
  careerGoal: 'Placements',
  preferredProjectScale: 'FullScale',
  preferredPlatform: 'Web',
  likesResearch: true,
  likesDesign: true,
  likesBackend: true,
  likesAI: true,
};

describe('Component: Core Next.js Application Pages', () => {
  test('renders HomePage with hero titles and action buttons', () => {
    render(
      <ProjectProvider>
        <HomePage />
      </ProjectProvider>
    );

    expect(screen.getByText('Think. Build. Defend.')).toBeInTheDocument();
    expect(screen.getByText('Start Student Profiler')).toBeInTheDocument();
    expect(screen.getByText('Explore Recommendations')).toBeInTheDocument();
  });

  test('renders NotFound (404) page with Return to Overview button', () => {
    render(<NotFound />);

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('Return to Overview')).toBeInTheDocument();
    expect(screen.getByText('Error 404')).toBeInTheDocument();
  });

  test('renders ProfilePage multi-step profiler and supports step traversal', () => {
    render(
      <ProjectProvider>
        <ProfilePage />
      </ProjectProvider>
    );

    expect(screen.getAllByText('Student Profiler').length).toBeGreaterThan(0);
    expect(screen.getByText('Academic & Domain Interests')).toBeInTheDocument();

    // Advance to Step 2
    const nextBtn1 = screen.getByRole('button', { name: /Continue to Step 2/i });
    expect(nextBtn1).toBeInTheDocument();
    fireEvent.click(nextBtn1);

    expect(screen.getByText('Existing Technical Arsenal')).toBeInTheDocument();

    // Advance to Step 3
    const nextBtn2 = screen.getByRole('button', { name: /Continue to Step 3/i });
    expect(nextBtn2).toBeInTheDocument();
    fireEvent.click(nextBtn2);

    expect(screen.getByText('Timeline & Commitment')).toBeInTheDocument();

    // Step back to Step 2
    const prevBtn = screen.getByRole('button', { name: /Previous Step/i });
    fireEvent.click(prevBtn);
    expect(screen.getByText('Existing Technical Arsenal')).toBeInTheDocument();
  });

  test('renders RecommendationsPage empty state when no active project exists', () => {
    act(() => {
      projectStore.reset();
    });

    render(
      <ProjectProvider>
        <RecommendationsPage />
      </ProjectProvider>
    );

    expect(screen.getByText(/No Project Ideas Evaluated Yet/i)).toBeInTheDocument();
  });

  test('renders RecommendationsPage populated state with project cards', () => {
    act(() => {
      const suite = generateMockProjectSuite(testProfile);
      projectStore.setState((prev) => ({ ...prev, suite, profile: testProfile }));
    });

    render(
      <ProjectProvider>
        <RecommendationsPage />
      </ProjectProvider>
    );

    expect(screen.getByText(/Curated Project Ideas/i)).toBeInTheDocument();
  });

  test('renders BlueprintPage empty state when no active project exists', () => {
    act(() => {
      projectStore.reset();
    });

    render(
      <ProjectProvider>
        <BlueprintPage />
      </ProjectProvider>
    );

    expect(screen.getByText(/No Active Project Selected/i)).toBeInTheDocument();
  });

  test('renders BlueprintPage populated state with technical architecture sections', () => {
    act(() => {
      const suite = generateMockProjectSuite(testProfile);
      projectStore.setState((prev) => ({ ...prev, suite, profile: testProfile }));
    });

    render(
      <ProjectProvider>
        <BlueprintPage />
      </ProjectProvider>
    );

    expect(screen.getByText(/Technology Stack/i)).toBeInTheDocument();
    expect(screen.getByText(/System Architecture & Workflow/i)).toBeInTheDocument();
    expect(screen.getByText(/Core Architectural Modules/i)).toBeInTheDocument();
  });

  test('renders RoadmapPage empty state when no active project exists', () => {
    act(() => {
      projectStore.reset();
    });

    render(
      <ProjectProvider>
        <RoadmapPage />
      </ProjectProvider>
    );

    expect(screen.getByText(/No Project Selected/i)).toBeInTheDocument();
  });

  test('renders RoadmapPage populated state with weekly milestone cards', () => {
    act(() => {
      const suite = generateMockProjectSuite(testProfile);
      projectStore.setState((prev) => ({ ...prev, suite, profile: testProfile }));
    });

    render(
      <ProjectProvider>
        <RoadmapPage />
      </ProjectProvider>
    );

    expect(screen.getByText(/Milestone Roadmap/i)).toBeInTheDocument();
  });

  test('renders MentorPage empty state when no active project exists', () => {
    act(() => {
      projectStore.reset();
    });

    render(
      <ProjectProvider>
        <MentorPage />
      </ProjectProvider>
    );

    expect(screen.getByText(/No Project Available for Mentorship/i)).toBeInTheDocument();
  });

  test('renders MentorPage populated state with pre-development review and competitive strengths', () => {
    act(() => {
      const suite = generateMockProjectSuite(testProfile);
      projectStore.setState((prev) => ({ ...prev, suite, profile: testProfile }));
    });

    render(
      <ProjectProvider>
        <MentorPage />
      </ProjectProvider>
    );

    expect(screen.getByText(/AI Mentor Review & Critique/i)).toBeInTheDocument();
    expect(screen.getByText(/Competitive Strengths/i)).toBeInTheDocument();
  });
});
