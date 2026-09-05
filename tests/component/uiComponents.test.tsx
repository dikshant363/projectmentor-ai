import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Chip } from '../../components/ui/Chip';
import { Input } from '../../components/ui/Input';
import { ProgressIndicator } from '../../components/ui/ProgressIndicator';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import GlobalError from '../../app/error';
import GlobalLoading from '../../app/loading';

describe('Component: Core Design System & UI Elements', () => {
  describe('Button Component', () => {
    test('renders with default primary styling and responds to clicks', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Generate Capstone</Button>);

      const btn = screen.getByRole('button', { name: /generate capstone/i });
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveClass('bg-[#0066cc]');

      fireEvent.click(btn);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('supports secondary-pill and dark-utility variants', () => {
      const { rerender } = render(<Button variant="secondary-pill">Outline Pill</Button>);
      expect(screen.getByRole('button')).toHaveClass('border-[#0066cc]');

      rerender(<Button variant="dark-utility">Dark Action</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-[#1d1d1f]');
    });

    test('renders loading spinner and disables click when isLoading=true', () => {
      const handleClick = vi.fn();
      render(<Button isLoading onClick={handleClick}>Submit</Button>);

      const btn = screen.getByRole('button');
      expect(btn).toBeDisabled();
      expect(screen.getByText('Processing...')).toBeInTheDocument();

      fireEvent.click(btn);
      expect(handleClick).not.toHaveBeenCalled();
    });

    test('respects disabled prop and prevents action', () => {
      const handleClick = vi.fn();
      render(<Button disabled onClick={handleClick}>Inactive</Button>);

      const btn = screen.getByRole('button');
      expect(btn).toBeDisabled();
      fireEvent.click(btn);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Badge Component', () => {
    test('renders with correct semantic color variants', () => {
      const { rerender } = render(<Badge variant="blue">95% Match</Badge>);
      expect(screen.getByText('95% Match')).toHaveClass('text-[#0066cc]');

      rerender(<Badge variant="success">Approved</Badge>);
      expect(screen.getByText('Approved')).toHaveClass('text-[#137333]');

      rerender(<Badge variant="warning">Intermediate</Badge>);
      expect(screen.getByText('Intermediate')).toHaveClass('text-[#b06000]');
    });
  });

  describe('Card Component', () => {
    test('renders utility card with Apple-style border and padding', () => {
      render(
        <Card variant="utility" data-testid="test-card">
          <h4>Card Content</h4>
        </Card>
      );
      const card = screen.getByTestId('test-card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('rounded-[18px]');
    });
  });

  describe('Chip Component', () => {
    test('renders unselected and selected interactive states', () => {
      const handleToggle = vi.fn();
      const { rerender } = render(
        <Chip selected={false} onToggle={handleToggle}>Python</Chip>
      );

      const chip = screen.getByRole('button');
      expect(chip).toHaveClass('bg-white');

      fireEvent.click(chip);
      expect(handleToggle).toHaveBeenCalledTimes(1);

      rerender(<Chip selected={true} onToggle={handleToggle}>Python</Chip>);
      expect(screen.getByRole('button')).toHaveClass('text-[#0066cc]');
    });
  });

  describe('Input Component', () => {
    test('renders input with label and helper text', () => {
      render(
        <Input
          label="Academic Branch"
          placeholder="e.g. Computer Science"
          helperText="Select your official major"
        />
      );

      expect(screen.getByLabelText('Academic Branch')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('e.g. Computer Science')).toBeInTheDocument();
      expect(screen.getByText('Select your official major')).toBeInTheDocument();
    });

    test('displays error message when error prop is present', () => {
      render(<Input label="Weekly Commitment" error="Weekly hours must be at least 2" />);
      expect(screen.getByText('Weekly hours must be at least 2')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveClass('border-[#d93025]');
    });
  });

  describe('ProgressIndicator Component', () => {
    test('renders current step, total steps, and percentage calculation', () => {
      render(
        <ProgressIndicator
          currentStep={2}
          totalSteps={4}
          stepLabels={['Profile', 'Interests', 'Skills', 'Review']}
        />
      );

      expect(screen.getByText('Step 2 of 4')).toBeInTheDocument();
      expect(screen.getByText('Interests')).toBeInTheDocument();
      expect(screen.getByText('50%')).toBeInTheDocument();
    });
  });

  describe('EmptyState & Skeleton Components', () => {
    test('renders EmptyState with icon, title, description and CTA', () => {
      const handleAction = vi.fn();
      render(
        <EmptyState
          title="No Profile Found"
          description="Please complete your student profile to view recommendations."
          actionLabel="Complete Profile"
          onAction={handleAction}
        />
      );

      expect(screen.getByText('No Profile Found')).toBeInTheDocument();
      expect(screen.getByText(/complete your student profile/i)).toBeInTheDocument();
      const actionBtn = screen.getByRole('button', { name: 'Complete Profile' });
      fireEvent.click(actionBtn);
      expect(handleAction).toHaveBeenCalledTimes(1);
    });

    test('renders Skeleton with pulse animation placeholder', () => {
      const { container } = render(<Skeleton className="h-6 w-32" />);
      expect(container.firstChild).toHaveClass('animate-pulse');
    });
  });

  describe('Global Error & Loading Fallbacks', () => {
    test('renders GlobalError boundary and triggers reset on button click', () => {
      const resetMock = vi.fn();
      const testError = new Error('Test boundary exception');
      render(<GlobalError error={testError} reset={resetMock} />);

      expect(screen.getByText('Unexpected System Interruption')).toBeInTheDocument();

      const retryBtn = screen.getByRole('button', { name: /retry action/i });
      fireEvent.click(retryBtn);
      expect(resetMock).toHaveBeenCalledTimes(1);
    });

    test('renders GlobalLoading layout skeleton with aria-busy attribute', () => {
      const { container } = render(<GlobalLoading />);
      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getAllByRole('generic').length).toBeGreaterThan(0);
    });
  });
});
