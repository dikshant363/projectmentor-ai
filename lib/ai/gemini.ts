import { StudentProfile, GeneratedProjectSuite } from '../types/index';
import { generateMockProjectSuite } from './mockDecisionEngine';

export async function generateProjectSuiteWithGemini(
  profile: StudentProfile
): Promise<GeneratedProjectSuite> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    // Graceful fallback when no key is configured
    return generateMockProjectSuite(profile);
  }

  const prompt = `
You are ProjectMentor AI, a Senior Engineering Architect, Faculty Project Guide, and PromptWars Judge.
Analyze the following StudentProfile and generate a comprehensive, highly personalized, production-grade final-year project recommendation suite.

Student Profile:
- Branch: ${profile.branch}
- Interests: ${profile.interests.join(', ')}
- Current Skills: ${profile.currentSkills.join(', ')}
- Experience Level: ${profile.experienceLevel}
- Preferred Domains: ${profile.preferredDomains.join(', ')}
- Available Timeline: ${profile.availableMonths} Months
- Weekly Hours: ${profile.weeklyHours} Hours/week
- Career Destination: ${profile.careerGoal}
- Preferred Scale: ${profile.preferredProjectScale}
- Preferred Platform: ${profile.preferredPlatform}
- Preferences: Likes AI: ${profile.likesAI}, Likes Backend: ${profile.likesBackend}, Likes Design: ${profile.likesDesign}, Likes Research: ${profile.likesResearch}

Generate exactly 5 distinct, practical, resume-worthy project ideas tailored to their skills, with the #1 ranked idea receiving a complete architecture blueprint, development roadmap (with milestones spanning their ${profile.availableMonths * 4} weeks), pre-development mentor review, and viva defense guidance.

Return ONLY a valid, parseable JSON object matching this exact TypeScript structure:
{
  "profileAnalysis": {
    "studentSummary": "string",
    "inferredStrengths": ["string"],
    "feasibilityVerdict": "string"
  },
  "recommendedProjects": [
    {
      "id": "proj-1",
      "title": "string",
      "tagline": "string",
      "category": "string",
      "problemStatement": "string",
      "targetAudience": "string",
      "matchScore": 95,
      "confidenceScore": 90,
      "difficulty": "Beginner | Intermediate | Advanced",
      "estimatedDuration": "string",
      "resumeValue": 9.5,
      "innovationScore": 9.0,
      "practicalityScore": 9.2,
      "matchReason": "string",
      "recommendedTech": ["string"],
      "coreFeatures": ["string"]
    }
  ],
  "selectedProjectIndex": 0,
  "technologyStack": {
    "frontend": { "name": "string", "reason": "string", "alternatives": ["string"] },
    "backend": { "name": "string", "reason": "string", "alternatives": ["string"] },
    "aiLayer": { "name": "string", "reason": "string", "alternatives": ["string"] },
    "database": { "name": "string", "reason": "string", "alternatives": ["string"] },
    "deployment": { "name": "string", "reason": "string", "alternatives": ["string"] },
    "auth": { "name": "string", "reason": "string" },
    "externalApis": [{ "name": "string", "purpose": "string", "freeTier": true }],
    "devTools": ["string"],
    "testingTools": ["string"]
  },
  "projectBlueprint": {
    "summary": "string",
    "problemStatement": "string",
    "userPersonas": [{ "role": "string", "painPoint": "string", "solution": "string" }],
    "systemWorkflow": [{ "step": 1, "title": "string", "description": "string" }],
    "coreModules": [{ "name": "string", "description": "string", "inputs": "string", "outputs": "string", "complexity": "Low | Medium | High" }],
    "architectureSummary": "string",
    "suggestedDatasets": [{ "name": "string", "source": "string", "url": "string", "description": "string" }],
    "suggestedApis": [{ "name": "string", "provider": "string", "url": "string", "freeTierNotes": "string" }],
    "folderStructure": ["string"],
    "mvpFeatures": [{ "title": "string", "priority": "P0 | P1", "effort": "string" }],
    "v2Features": [{ "title": "string", "priority": "P1 | P2", "effort": "string" }]
  },
  "developmentRoadmap": [
    {
      "week": 1,
      "phaseName": "string",
      "goal": "string",
      "deliverables": ["string"],
      "learningTopics": ["string"],
      "estimatedHours": 15,
      "risks": "string",
      "successCriteria": "string",
      "completed": false
    }
  ],
  "mentorReview": {
    "strengths": ["string"],
    "weaknesses": ["string"],
    "risks": [{ "risk": "string", "severity": "Low | Medium | High", "mitigation": "string" }],
    "technicalChallenges": ["string"],
    "learningChallenges": ["string"],
    "portfolioImpact": "string",
    "vivaQuestions": [{ "question": "string", "answerGuidance": "string" }],
    "improvementPriorities": [{ "action": "string", "impact": "High | Medium", "effort": "Low | Medium | High" }]
  },
  "careerAlignment": {
    "track": "string",
    "score": 92,
    "rationale": "string",
    "interviewTalkingPoints": ["string"]
  },
  "improvementSuggestions": ["string"],
  "nextActions": ["string"]
}
`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s safety timeout

    // We try gemini-2.5-flash first, then fallback to gemini-1.5-flash
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: 'application/json',
        }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Gemini API returned status ${response.status}. Using high-fidelity fallback.`);
      return generateMockProjectSuite(profile);
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return generateMockProjectSuite(profile);
    }

    const parsed: GeneratedProjectSuite = JSON.parse(rawText);
    parsed.generatedAt = new Date().toISOString();
    parsed.isFallback = false;
    return parsed;
  } catch (error) {
    console.warn('Gemini request failed or timed out. Falling back to local engine.', error);
    return generateMockProjectSuite(profile);
  }
}
