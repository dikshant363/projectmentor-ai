import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { evaluateVivaDefenseLocally, VivaEvaluationResult } from '@/lib/ai/vivaEvaluator';

export async function POST(req: NextRequest) {
  try {
    let body: {
      question?: string;
      answerGuidance?: string;
      studentAnswer?: string;
      projectTitle?: string;
    };

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Malformed or invalid JSON payload' },
        { status: 400 }
      );
    }

    const { question, answerGuidance, studentAnswer, projectTitle } = body;

    if (!question || typeof question !== 'string' || !studentAnswer || typeof studentAnswer !== 'string') {
      return NextResponse.json(
        { error: 'Missing required parameters: question and studentAnswer' },
        { status: 400 }
      );
    }

    if (studentAnswer.trim().length < 5) {
      return NextResponse.json(
        { error: 'Answer is too short to evaluate. Please provide a meaningful response.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey.trim() === '') {
      // Deterministic evaluation engine
      const localResult = evaluateVivaDefenseLocally(
        question,
        answerGuidance || '',
        studentAnswer
      );
      return NextResponse.json(localResult, { status: 200 });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
You are an exacting University External Examiner conducting an oral viva defense for a final-year engineering capstone project.
Project: "${projectTitle || 'Capstone Project'}"
Examiner Question Asked: "${question}"
Recommended Benchmark Defense: "${answerGuidance || 'Standard architectural defense'}"
Student's Oral Defense Given: "${studentAnswer}"

Evaluate the student's defense realistically. Assess if they truly understand the engineering concepts or are bluffing.

Return ONLY a valid JSON object matching this schema:
{
  "score": 8.5,
  "verdict": "Distinction" | "Satisfactory" | "Needs Reinforcement",
  "examinerObservation": "1-2 sentence faculty reaction to the student's tone and technical precision",
  "identifiedStrengths": ["string"],
  "exposedWeaknesses": ["string"],
  "followUpCurveball": "A tough technical counter-question the examiner will immediately ask",
  "modelBenchmark": "${answerGuidance || 'Recommended model answer'}"
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const text = response.text?.trim() || '';
      if (text) {
        const parsed = JSON.parse(text) as VivaEvaluationResult;
        return NextResponse.json(parsed, { status: 200 });
      }
    } catch (aiErr) {
      console.warn('Gemini viva evaluation error, falling back to local heuristic:', aiErr);
    }

    // Fallback to local
    const fallbackResult = evaluateVivaDefenseLocally(
      question,
      answerGuidance || '',
      studentAnswer
    );
    return NextResponse.json(fallbackResult, { status: 200 });
  } catch (error) {
    console.error('API /api/evaluate-viva error:', error);
    return NextResponse.json(
      { error: 'Internal server error while evaluating viva defense' },
      { status: 500 }
    );
  }
}
