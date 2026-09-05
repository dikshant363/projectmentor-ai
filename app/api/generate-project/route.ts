import { NextRequest, NextResponse } from 'next/server';
import { StudentProfile } from '@/lib/types';
import { validateStudentProfile } from '@/lib/validation/profileSchema';
import { generateProjectSuiteWithGemini } from '@/lib/ai/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const profile = body as Partial<StudentProfile>;

    const validation = validateStudentProfile(profile);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Invalid profile data', details: validation.errors },
        { status: 400 }
      );
    }

    const suite = await generateProjectSuiteWithGemini(profile as StudentProfile);

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
