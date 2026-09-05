import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GlobalNav } from '../../components/layout/GlobalNav';
import { SubNavFrosted } from '../../components/layout/SubNavFrosted';
import { Footer } from '../../components/layout/Footer';
import { ProjectProvider } from '../../lib/context/ProjectContext';

describe('Component: Navigation & Layout System', () => {
  test('renders GlobalNav with brand logo and all primary route links', () => {
    render(
      <ProjectProvider>
        <GlobalNav />
      </ProjectProvider>
    );

    expect(screen.getByText('ProjectMentor AI')).toBeInTheDocument();
    expect(screen.getByText('PromptWars')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /discover/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /profile/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /recommendations/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^blueprint$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^roadmap$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^mentor review$/i })).toBeInTheDocument();
  });

  test('toggles mobile menu drawer on button click', () => {
    render(
      <ProjectProvider>
        <GlobalNav />
      </ProjectProvider>
    );

    const mobileMenuButton = screen.getByLabelText(/toggle navigation menu/i);
    expect(mobileMenuButton).toBeInTheDocument();

    fireEvent.click(mobileMenuButton);
    expect(screen.getByRole('button', { name: /build project blueprint/i })).toBeInTheDocument();
  });

  test('renders SubNavFrosted with section title and dynamic CTA', () => {
    render(
      <ProjectProvider>
        <SubNavFrosted />
      </ProjectProvider>
    );

    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  test('renders Footer with academic attribution and architecture specs', () => {
    render(<Footer />);

    expect(screen.getAllByText(/ProjectMentor AI/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Parul University/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Next\.js 15 App Router/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Strict Apple Minimalism/i)).toBeInTheDocument();
  });
});
