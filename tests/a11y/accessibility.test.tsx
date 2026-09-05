import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GlobalNav } from '../../components/layout/GlobalNav';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { ProjectProvider } from '../../lib/context/ProjectContext';

describe('Accessibility: Standards & WCAG AA Verification', () => {
  test('header contains accessible landmark and branded home link with title', () => {
    render(
      <ProjectProvider>
        <GlobalNav />
      </ProjectProvider>
    );

    const banner = screen.getByRole('banner');
    expect(banner).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: /ProjectMentor AI/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  test('navigation elements provide accessible role="navigation"', () => {
    render(
      <ProjectProvider>
        <GlobalNav />
      </ProjectProvider>
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  test('interactive icon buttons provide unambiguous aria-label attributes', () => {
    render(
      <ProjectProvider>
        <GlobalNav />
      </ProjectProvider>
    );

    const menuToggle = screen.getByLabelText(/toggle navigation menu/i);
    expect(menuToggle).toBeInTheDocument();
    expect(menuToggle.tagName.toLowerCase()).toBe('button');
  });

  test('form inputs are programmatically coupled to accessible label elements', () => {
    render(
      <Input
        id="test-branch-input"
        label="Engineering Specialization"
        placeholder="Enter branch"
      />
    );

    const input = screen.getByLabelText('Engineering Specialization');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test-branch-input');
  });

  test('buttons enforce focus-visible outline rings for keyboard-only navigation', () => {
    const { container } = render(<Button variant="primary">Access Architecture</Button>);
    const btn = container.querySelector('button');
    expect(btn?.className).toContain('focus-visible:outline-2');
  });

  test('badges preserve contrast tokens without low-contrast foreground colors', () => {
    const { container } = render(<Badge variant="blue">98% Fit</Badge>);
    const badge = container.querySelector('span');
    expect(badge?.className).toContain('text-[#0066cc]');
  });

  test('footer provides landmark contentinfo with semantic structure', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
});
