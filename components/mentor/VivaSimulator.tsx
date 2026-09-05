'use client';

import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Send,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ShieldAlert,
  Flame,
} from 'lucide-react';
import { VivaQuestion } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { VivaEvaluationResult } from '@/lib/ai/vivaEvaluator';

interface VivaSimulatorProps {
  questions: VivaQuestion[];
  projectTitle: string;
}

export function VivaSimulator({ questions, projectTitle }: VivaSimulatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<VivaEvaluationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 2-minute mock viva timer
  const [timeLeft, setTimeLeft] = useState(120);
  const [timerRunning, setTimerRunning] = useState(false);

  // Evaluated history map
  const [scores, setScores] = useState<Record<number, number>>({});

  const currentQ = questions[activeIndex] || questions[0];

  useEffect(() => {
    if (!timerRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerRunning]);

  const handleSelectQuestion = (idx: number) => {
    setActiveIndex(idx);
    setStudentAnswer('');
    setEvaluation(null);
    setErrorMsg(null);
    setTimeLeft(120);
    setTimerRunning(false);
  };

  const handleResetTimer = () => {
    setTimeLeft(120);
    setTimerRunning(false);
  };

  const handleUseTemplate = () => {
    setStudentAnswer(
      `In ${projectTitle}, we deliberately chose this architecture to decouple compute bottlenecks from persistent storage. By introducing asynchronous job processing and strict schema validation at the edge, we isolate latency spikes and protect system reliability during unexpected traffic surges.`
    );
  };

  const handleSubmitDefense = async () => {
    if (!studentAnswer.trim() || studentAnswer.trim().length < 10) {
      setErrorMsg('Please formulate a substantive oral defense of at least 10 characters.');
      return;
    }

    setIsEvaluating(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/evaluate-viva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQ.question,
          answerGuidance: currentQ.answerGuidance,
          studentAnswer,
          projectTitle,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to evaluate defense');
      }

      const data: VivaEvaluationResult = await res.json();
      setEvaluation(data);
      setScores((prev) => ({ ...prev, [activeIndex]: data.score }));
      setTimerRunning(false);
    } catch {
      setErrorMsg('Defense evaluation service unavailable. Please try again.');
    } finally {
      setIsEvaluating(false);
    }
  };

  const attemptedCount = Object.keys(scores).length;
  const avgScore =
    attemptedCount > 0
      ? (Object.values(scores).reduce((a, b) => a + b, 0) / attemptedCount).toFixed(1)
      : '0.0';

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <Card variant="utility" className="p-8 sm:p-10 border border-[#e0e0e0]">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#f0f0f0]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] uppercase tracking-wider text-[#0066cc] font-semibold">
              Live Interactive Simulation
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#e8f0fe] text-[#0066cc]">
              Examiner AI
            </span>
          </div>
          <h2 className="text-[24px] font-semibold text-[#1d1d1f] tracking-tight">
            Final-Year Viva Defense Simulator
          </h2>
          <p className="text-[14px] text-[#555555] mt-1">
            Test your verbal preparedness against a simulated external university examiner. Answer under timed pressure.
          </p>
        </div>

        {/* Viva Scorecard Pill */}
        <div className="flex items-center gap-3 bg-[#fafafc] border border-[#e0e0e0] px-4 py-2.5 rounded-full">
          <Flame className="w-4 h-4 text-[#b06000]" aria-hidden="true" />
          <span className="text-[13px] font-medium text-[#1d1d1f]">
            Attempted: <strong className="text-[#0066cc]">{attemptedCount}/{questions.length}</strong>
          </span>
          <span className="text-[#d2d2d7]">|</span>
          <span className="text-[13px] font-medium text-[#1d1d1f]">
            Avg Score: <strong className="text-[#137333]">{avgScore}/10</strong>
          </span>
        </div>
      </div>

      {/* Question Selector Tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {questions.map((q, idx) => {
          const isSelected = activeIndex === idx;
          const score = scores[idx];
          return (
            <button
              key={idx}
              onClick={() => handleSelectQuestion(idx)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-[#0066cc] text-white shadow-sm'
                  : 'bg-[#f5f5f7] text-[#333333] hover:bg-[#e8e8ed]'
              }`}
            >
              <span>Q{idx + 1}</span>
              {score !== undefined && (
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#137333]/10 text-[#137333]'
                  }`}
                >
                  {score}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Question Display */}
      <div className="mt-6 p-6 bg-[#fafafc] border border-[#e0e0e0] rounded-[14px] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#1d1d1f] text-white text-[12px] font-bold flex items-center justify-center shrink-0">
              {activeIndex + 1}
            </span>
            <span className="text-[12px] font-semibold text-[#555555] uppercase tracking-wider">
              External Examiner Viva Question
            </span>
          </div>

          {/* Defense Timer */}
          <div className="flex items-center gap-2 bg-white border border-[#e0e0e0] px-3 py-1 rounded-full text-[13px]">
            <span className="font-mono font-bold text-[#1d1d1f]">{formatTime(timeLeft)}</span>
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className="p-1 text-[#555555] hover:text-[#0066cc] transition-colors"
              title={timerRunning ? 'Pause timer' : 'Start timer'}
              aria-label={timerRunning ? 'Pause timer' : 'Start timer'}
            >
              {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleResetTimer}
              className="p-1 text-[#555555] hover:text-[#0066cc] transition-colors"
              title="Reset timer"
              aria-label="Reset timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <h3 className="text-[18px] font-semibold text-[#1d1d1f] leading-snug">
          &ldquo;{currentQ.question}&rdquo;
        </h3>

        {/* Student Response Console */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[12px] text-[#555555]">
            <label htmlFor="viva-answer-input" className="font-medium text-[#333333]">
              Your Oral Defense Response:
            </label>
            <div className="flex items-center gap-3">
              <span>{studentAnswer.trim().split(/\s+/).filter(Boolean).length} words</span>
              <button
                type="button"
                onClick={handleUseTemplate}
                className="text-[#0066cc] hover:underline flex items-center gap-1 font-medium"
              >
                <Sparkles className="w-3 h-3" />
                Sample Starter
              </button>
            </div>
          </div>

          <textarea
            id="viva-answer-input"
            rows={4}
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            placeholder="Formulate your defense here. Explain your architectural justification, trade-offs, scalability, or failure mitigation..."
            className="w-full p-4 rounded-[11px] border border-[#e0e0e0] bg-white text-[#1d1d1f] text-[14px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all resize-none placeholder:text-[#999999]"
          />
        </div>

        {errorMsg && (
          <div className="p-3 bg-[#fce8e6] border border-[#f5c6cb] rounded-[8px] text-[13px] text-[#d93025] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <span className="text-[12px] text-[#555555]">
            Evaluates technical depth, architectural trade-offs & poise.
          </span>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmitDefense}
            disabled={isEvaluating || !studentAnswer.trim()}
          >
            {isEvaluating ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Examiner Analyzing...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                Submit Defense to Examiner
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Real-time Evaluation Results */}
      {evaluation && (
        <div className="mt-8 space-y-6 animate-fadeIn">
          <div className="p-6 bg-white border-2 border-[#0066cc]/20 rounded-[14px] shadow-sm space-y-5">
            {/* Score Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#f0f0f0]">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-[18px] ${
                    evaluation.score >= 8.0
                      ? 'bg-[#e6f4ea] text-[#137333]'
                      : evaluation.score >= 6.0
                      ? 'bg-[#e8f0fe] text-[#0066cc]'
                      : 'bg-[#fce8e6] text-[#d93025]'
                  }`}
                >
                  {evaluation.score}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] font-semibold text-[#1d1d1f]">
                      Viva Defense Verdict: {evaluation.verdict}
                    </span>
                    <Badge
                      variant={
                        evaluation.score >= 8.0 ? 'success' : evaluation.score >= 6.0 ? 'blue' : 'warning'
                      }
                    >
                      {evaluation.score}/10
                    </Badge>
                  </div>
                  <p className="text-[13px] text-[#555555] mt-0.5">
                    Evaluated by AI University Examination Panel
                  </p>
                </div>
              </div>
            </div>

            {/* Examiner Observation */}
            <div className="p-4 bg-[#f5f5f7] rounded-[11px] text-[14px] text-[#333333] leading-relaxed border border-[#e0e0e0]">
              <strong className="text-[#1d1d1f] block mb-1 font-semibold">
                Faculty Examiner Observation:
              </strong>
              {evaluation.examinerObservation}
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#f8fdf9] border border-[#d2edd6] rounded-[11px] space-y-2">
                <span className="text-[12px] font-semibold text-[#137333] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  What the Panel Liked
                </span>
                <ul className="text-[13px] text-[#333333] space-y-1.5 list-disc list-inside">
                  {evaluation.identifiedStrengths.map((str, idx) => (
                    <li key={idx}>{str}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-[#fef9f8] border border-[#fcdad5] rounded-[11px] space-y-2">
                <span className="text-[12px] font-semibold text-[#d93025] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  Vulnerabilities & Blindspots
                </span>
                <ul className="text-[13px] text-[#333333] space-y-1.5 list-disc list-inside">
                  {evaluation.exposedWeaknesses.map((weak, idx) => (
                    <li key={idx}>{weak}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Examiner Follow-up Curveball */}
            <div className="p-4 bg-[#fff9ed] border border-[#ffe0b2] rounded-[11px] space-y-1.5">
              <span className="text-[12px] font-semibold text-[#b06000] uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4" />
                Examiner Follow-Up Curveball (Be Prepared!)
              </span>
              <p className="text-[14px] text-[#1d1d1f] font-medium">
                &ldquo;{evaluation.followUpCurveball}&rdquo;
              </p>
            </div>

            {/* Benchmark Model Defense */}
            <div className="p-4 bg-white border border-[#e0e0e0] rounded-[11px] space-y-1.5">
              <span className="text-[12px] font-semibold text-[#0066cc] uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                Benchmark Model Defense (Gold Standard)
              </span>
              <p className="text-[14px] text-[#555555] leading-relaxed">
                {evaluation.modelBenchmark}
              </p>
            </div>

            {/* Next Question Shortcut */}
            {activeIndex < questions.length - 1 && (
              <div className="pt-2 flex justify-end">
                <Button
                  variant="secondary-pill"
                  size="sm"
                  onClick={() => handleSelectQuestion(activeIndex + 1)}
                >
                  Proceed to Next Question (Q{activeIndex + 2})
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
