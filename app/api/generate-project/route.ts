import { NextRequest, NextResponse } from 'next/server';
import { StudentProfile } from '@/lib/types';
import { validateStudentProfile } from '@/lib/validation/profileSchema';
import { generateProjectSuiteWithGemini } from '@/lib/ai/gemini';

export async function POST(req: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Malformed or invalid JSON payload' },
        { status: 400 }
      );
    }
    const profile = body as Partial<StudentProfile>;

    const validation = validateStudentProfile(profile);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Invalid profile data', details: validation.errors },
        { status: 400 }
      );
    }

    const normalizedProfile: StudentProfile = {
      branch: profile.branch!,
      interests: profile.interests || ['Computer Science & Engineering'],
      currentSkills: profile.currentSkills || ['Full-Stack Development'],
      experienceLevel: profile.experienceLevel || 'Intermediate',
      preferredDomains: profile.preferredDomains && profile.preferredDomains.length > 0 ? profile.preferredDomains : (profile.interests || ['Software Engineering']),
      availableMonths: profile.availableMonths || 4,
      weeklyHours: profile.weeklyHours || 15,
      careerGoal: profile.careerGoal || 'Placements',
      preferredProjectScale: profile.preferredProjectScale || 'FullScale',
      preferredPlatform: profile.preferredPlatform || 'Web',
      likesResearch: profile.likesResearch ?? false,
      likesDesign: profile.likesDesign ?? false,
      likesBackend: profile.likesBackend ?? true,
      likesAI: profile.likesAI ?? (profile.interests?.some(i => i.toLowerCase().includes('ai') || i.toLowerCase().includes('intelligence')) ?? false),
    };

    const suite = await generateProjectSuiteWithGemini(normalizedProfile);

    return NextResponse.json(suite, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    });
  } catch (error) {
    console.error('API /api/generate-project internal error:', error);
    return NextResponse.json(
      { error: 'Internal server error while generating recommendations' },
      { status: 500 }
    );
  }
}
