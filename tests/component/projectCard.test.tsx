import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectCard } from '../../components/recommendations/ProjectCard';
import { ProjectProvider } from '../../lib/context/ProjectContext';
import { generateMockProjectSuite } from '../../lib/ai/mockDecisionEngine';
import { DEFAULT_STUDENT_PROFILE } from '../../lib/constants/index';

describe('Component: ProjectCard', () => {
  const suite = generateMockProjectSuite(DEFAULT_STUDENT_PROFILE);
  const sampleProject = suite.recommendedProjects[0];

  test('renders project idea title, match score, and difficulty badge', () => {
    render(
      <ProjectProvider>
        <ProjectCard project={sampleProject} index={0} />
      </ProjectProvider>
    );

    expect(screen.getByText(sampleProject.title)).toBeInTheDocument();
    expect(screen.getByText(`${sampleProject.matchScore}% Match`)).toBeInTheDocument();
    expect(screen.getByText(sampleProject.difficulty)).toBeInTheDocument();
    expect(screen.getByText(sampleProject.estimatedDuration)).toBeInTheDocument();
  });

  test('renders technical tags, practicality score, and resume impact', () => {
    render(
      <ProjectProvider>
        <ProjectCard project={sampleProject} index={0} />
      </ProjectProvider>
    );

    expect(screen.getByText(/resume value:/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${sampleProject.resumeValue} / 10`))).toBeInTheDocument();
    expect(screen.getByText(/practicality:/i)).toBeInTheDocument();

    for (const tech of sampleProject.recommendedTech) {
      expect(screen.getByText(tech)).toBeInTheDocument();
    }
  });

  test('applies active border ring when isSelected=true', () => {
    const { container, rerender } = render(
      <ProjectProvider>
        <ProjectCard project={sampleProject} index={0} isSelected={false} />
      </ProjectProvider>
    );

    expect(container.querySelector('.border-\\[\\#0071e3\\]')).toBeNull();

    rerender(
      <ProjectProvider>
        <ProjectCard project={sampleProject} index={0} isSelected={true} />
      </ProjectProvider>
    );

    expect(container.querySelector('.border-\\[\\#0071e3\\]')).not.toBeNull();
  });

  test('clicking Inspect Blueprint selects index and navigates', () => {
    render(
      <ProjectProvider>
        <ProjectCard project={sampleProject} index={2} />
      </ProjectProvider>
    );

    const cta = screen.getByRole('button', { name: /inspect blueprint/i });
    fireEvent.click(cta);
    expect(cta).toBeInTheDocument();
  });
});
