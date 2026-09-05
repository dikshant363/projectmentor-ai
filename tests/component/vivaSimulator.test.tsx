import React from 'react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { VivaSimulator } from '../../components/mentor/VivaSimulator';

describe('Component: VivaSimulator', () => {
  const mockQuestions = [
    {
      question: 'How do you handle dataset sparsity in your training pipeline?',
      answerGuidance: 'Discuss data augmentation, synthetic generation, and cross-validation techniques.',
    },
    {
      question: 'Why did you select FastAPI over Express for the backend microservice?',
      answerGuidance: 'Discuss asynchronous async/await support, Pydantic type validation, and automatic OpenAPI schema generation.',
    },
  ];

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders viva questions, current question card, and defense input', () => {
    render(<VivaSimulator questions={mockQuestions} projectTitle="NeuroSync AI" />);

    expect(screen.getByText('Final-Year Viva Defense Simulator')).toBeInTheDocument();
    expect(screen.getByText(/How do you handle dataset sparsity in your training pipeline\?/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Formulate your defense here/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit Defense/i })).toBeInTheDocument();
  });

  test('switches active question when clicking question tabs', () => {
    render(<VivaSimulator questions={mockQuestions} projectTitle="NeuroSync AI" />);

    const buttons = screen.getAllByRole('button');
    const q2Btn = buttons.find((b) => b.textContent?.includes('2'));
    expect(q2Btn).toBeDefined();
    fireEvent.click(q2Btn!);

    expect(screen.getByText(/Why did you select FastAPI over Express/)).toBeInTheDocument();
  });

  test('populates template response when clicking Sample Starter button', () => {
    render(<VivaSimulator questions={mockQuestions} projectTitle="NeuroSync AI" />);

    const templateBtn = screen.getByRole('button', { name: /Sample Starter/i });
    fireEvent.click(templateBtn);

    const textarea = screen.getByPlaceholderText(/Formulate your defense here/i) as HTMLTextAreaElement;
    expect(textarea.value).toContain('NeuroSync AI');
  });

  test('shows validation warning when submitting answer shorter than 10 characters', () => {
    render(<VivaSimulator questions={mockQuestions} projectTitle="NeuroSync AI" />);

    const textarea = screen.getByPlaceholderText(/Formulate your defense here/i);
    fireEvent.change(textarea, { target: { value: 'Too short' } });

    const submitBtn = screen.getByRole('button', { name: /Submit Defense/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/substantive oral defense of at least 10 characters/i)).toBeInTheDocument();
  });

  test('successfully evaluates defense via mock API and renders score verdict card', async () => {
    const mockApiResponse = {
      score: 9.4,
      verdict: 'Distinction',
      examinerObservation: 'Comprehensive technical grasp demonstrated with verifiable trade-offs.',
      identifiedStrengths: ['Articulated decoupled worker architecture', 'Addressed latency isolation'],
      exposedWeaknesses: [],
      followUpCurveball: 'What is the maximum payload threshold before worker threads queue up?',
      modelBenchmark: 'Distinction level defense',
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    });

    render(<VivaSimulator questions={mockQuestions} projectTitle="NeuroSync AI" />);

    const textarea = screen.getByPlaceholderText(/Formulate your defense here/i);
    fireEvent.change(textarea, {
      target: {
        value: 'In our architecture, we deliberately chose an asynchronous message queue powered by Redis and BullMQ to isolate heavy computational workloads.',
      },
    });

    const submitBtn = screen.getByRole('button', { name: /Submit Defense/i });
    expect(submitBtn).not.toBeDisabled();
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('Viva Defense Verdict: Distinction'))).toBeInTheDocument();
      expect(screen.getByText('Comprehensive technical grasp demonstrated with verifiable trade-offs.')).toBeInTheDocument();
      expect(screen.getByText(/What is the maximum payload threshold before worker threads queue up/)).toBeInTheDocument();
    });
  });
});
