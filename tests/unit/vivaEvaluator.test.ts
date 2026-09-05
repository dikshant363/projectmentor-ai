import { test, describe } from 'node:test';
import assert from 'node:assert';
import { evaluateVivaDefenseLocally } from '../../lib/ai/vivaEvaluator';

describe('Unit: Viva Defense Evaluator Engine', () => {
  test('evaluates brief answers with low score and flags brevity weakness', () => {
    const result = evaluateVivaDefenseLocally(
      'Why did you choose PostgreSQL over MongoDB?',
      'PostgreSQL offers ACID guarantees and relational integrity for financial records.',
      'Because it is good.'
    );

    assert.ok(result.score <= 6.5, `Expected score <= 6.5, got ${result.score}`);
    assert.strictEqual(result.verdict, 'Needs Reinforcement');
    assert.ok(
      result.exposedWeaknesses.some((w) => w.includes('too brief')),
      'Expected weakness highlighting brevity'
    );
  });

  test('evaluates detailed technical answers with Distinction verdict', () => {
    const detailedDefense = `
      In our architecture, we deliberately chose an asynchronous message queue powered by Redis 
      and BullMQ to isolate heavy computational workloads from our HTTP gateway. This ensures low latency 
      for incoming client requests, eliminates blocking I/O bottlenecks, and provides fault-tolerant retry 
      mechanisms if downstream workers fail under high concurrency.
    `;

    const result = evaluateVivaDefenseLocally(
      'How does your system handle high concurrency spikes?',
      'Use asynchronous message queues to decouple ingestion from background processing.',
      detailedDefense
    );

    assert.ok(result.score >= 8.0, `Expected score >= 8.0, got ${result.score}`);
    assert.strictEqual(result.verdict, 'Distinction');
    assert.ok(result.identifiedStrengths.length > 0, 'Expected identified strengths');
    assert.ok(
      result.identifiedStrengths.some((s) => s.includes('trade-offs')),
      'Expected praise for architectural trade-offs'
    );
  });

  test('generates relevant curveball questions matching domain context', () => {
    const dataResult = evaluateVivaDefenseLocally(
      'How did you train and validate your dataset?',
      'Stratified k-fold cross-validation',
      'We cleaned the data and applied stratified k-fold cross-validation to prevent leakage across classes.'
    );
    assert.ok(
      dataResult.followUpCurveball.includes('dataset') || dataResult.followUpCurveball.includes('imbalance'),
      'Expected dataset-related curveball'
    );

    const secResult = evaluateVivaDefenseLocally(
      'What security mitigations are implemented for auth?',
      'JWT with short-lived tokens and refresh rotation',
      'We use short-lived access tokens with HttpOnly cookies and refresh token rotation to prevent replay attacks.'
    );
    assert.ok(
      secResult.followUpCurveball.includes('token') || secResult.followUpCurveball.includes('TLS') || secResult.followUpCurveball.includes('replay'),
      'Expected security-related curveball'
    );
  });

  test('enforces boundary clamping on scores (between 3.5 and 9.8)', () => {
    const emptyResult = evaluateVivaDefenseLocally('Q?', 'A', 'word');
    assert.ok(emptyResult.score >= 3.5, 'Score should not drop below 3.5');

    const superLong = 'concurrency latency scalability trade-off cache redis queue pipeline microservice security stateless resilience '.repeat(10);
    const maxResult = evaluateVivaDefenseLocally('Q?', 'A', superLong);
    assert.ok(maxResult.score <= 9.8, 'Score should not exceed 9.8');
  });
});
