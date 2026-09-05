export interface VivaEvaluationResult {
  score: number; // 1 to 10
  verdict: 'Distinction' | 'Satisfactory' | 'Needs Reinforcement';
  examinerObservation: string;
  identifiedStrengths: string[];
  exposedWeaknesses: string[];
  followUpCurveball: string;
  modelBenchmark: string;
}

export function evaluateVivaDefenseLocally(
  question: string,
  answerGuidance: string,
  studentAnswer: string
): VivaEvaluationResult {
  const cleanAnswer = studentAnswer.trim().toLowerCase();
  const wordCount = studentAnswer.trim().split(/\s+/).filter(Boolean).length;

  // Concept keyword analysis
  const technicalKeywords = [
    'latency', 'throughput', 'concurrency', 'scalability', 'trade-off', 'tradeoff',
    'cache', 'redis', 'queue', 'asynchronous', 'async', 'pipeline', 'schema',
    'normalization', 'index', 'microservice', 'monolith', 'security', 'sanitize',
    'authentication', 'stateless', 'resilience', 'fallback', 'edge', 'benchmark'
  ];

  const matchedKeywords = technicalKeywords.filter(k => cleanAnswer.includes(k));

  let score = 5.0;

  // Length and depth calibration
  if (wordCount >= 25) score += 1.5;
  if (wordCount >= 60) score += 1.0;
  if (wordCount >= 100) score += 0.5;

  // Keyword richness
  if (matchedKeywords.length >= 2) score += 1.0;
  if (matchedKeywords.length >= 4) score += 1.0;

  // Cap score between 3.0 and 9.8
  score = Math.min(9.8, Math.max(3.5, Number(score.toFixed(1))));

  let verdict: 'Distinction' | 'Satisfactory' | 'Needs Reinforcement' = 'Satisfactory';
  if (score >= 8.0) verdict = 'Distinction';
  else if (score < 6.0) verdict = 'Needs Reinforcement';

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (wordCount >= 40) {
    strengths.push('Articulated response with adequate technical substance rather than single-sentence brevity.');
  } else {
    weaknesses.push('Response is too brief; external examiners will press for deeper implementation specifics.');
  }

  if (matchedKeywords.length > 0) {
    strengths.push(`Addressed relevant architectural trade-offs referencing ${matchedKeywords.slice(0, 3).join(', ')}.`);
  } else {
    weaknesses.push('Lacks concrete architectural terminology; quantify numbers or explain protocol choices.');
  }

  // Generate dynamic follow-up curveball based on question context
  let followUpCurveball = "How would this component behave if concurrent requests spike 100x during a college-wide demo?";
  if (question.toLowerCase().includes('data') || question.toLowerCase().includes('dataset')) {
    followUpCurveball = "What happens when your dataset has a 30% class imbalance or missing categorical fields?";
  } else if (question.toLowerCase().includes('security') || question.toLowerCase().includes('auth')) {
    followUpCurveball = "How does your token validation survive replay attacks if the TLS certificate is compromised?";
  } else if (question.toLowerCase().includes('scale') || question.toLowerCase().includes('architecture')) {
    followUpCurveball = "If your backend server crashes mid-transaction, how do you prevent orphaned records or state desynchronization?";
  }

  return {
    score,
    verdict,
    examinerObservation:
      score >= 8.0
        ? "The student demonstrated a firm grasp of underlying architectural trade-offs. Defended decisions rationally without getting defensive."
        : score >= 6.0
        ? "Acceptable fundamental reasoning, but failed to address boundary conditions and production failure modes."
        : "Superficial answer. Relied on buzzwords without explaining the core engineering mechanism.",
    identifiedStrengths: strengths,
    exposedWeaknesses: weaknesses,
    followUpCurveball,
    modelBenchmark: answerGuidance,
  };
}
