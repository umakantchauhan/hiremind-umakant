import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';
import Job from '@/models/Job';

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const formData = await request.formData();
    const jobId = formData.get('jobId') as string;
    const candidateName = formData.get('candidateName') as string;
    const candidateEmail = formData.get('candidateEmail') as string;
    const resumeFile = formData.get('resumeFile') as File;

    if (!jobId || !candidateName || !candidateEmail || !resumeFile) {
        return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Call ATS analysis route
    const atsFormData = new FormData();
    atsFormData.append('resumeFile', resumeFile);

    const atsResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/ats/analyze`, {
        method: 'POST',
        body: atsFormData,
    });
    
    const atsResult = await atsResponse.json();
    
    if (!atsResponse.ok) {
        throw new Error(atsResult.error || 'ATS analysis failed');
    }

    const application = await Application.create({
      jobId,
      candidateName,
      candidateEmail,
      resumeUrl: "placeholder", // In a real app, you'd upload to S3 and store the URL
      atsScore: atsResult.analysis.atsScore,
      status: 'Pending',
    });

    // Increment applications count on the Job model
    await Job.findByIdAndUpdate(jobId, { $inc: { applications: 1 } });

    return NextResponse.json({ success: true, data: application }, { status: 201 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function GET() {
    await dbConnect();
    try {
        const applications = await Application.find({}).populate('jobId');
        return NextResponse.json({ success: true, data: applications });
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({ success: false, error: err.message }, { status: 400 });
    }
}