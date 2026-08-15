import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import InterviewReport from '@/models/InterviewReport';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  await dbConnect();
  try {
    const reports = await InterviewReport.find({}).sort({ interviewDate: -1 });
    return NextResponse.json({ success: true, data: reports });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}