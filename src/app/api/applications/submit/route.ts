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

    // --- START: DUPLICATE APPLICATION CHECK ---
    // Check if an application with the same email already exists for this job
    const existingApplication = await Application.findOne({
      jobId: jobId,
      candidateEmail: candidateEmail,
    });

    // If an application is found, return an error
    if (existingApplication) {
      return NextResponse.json(
        { success: false, error: 'You have already applied for this job.' },
        { status: 409 } // Using 409 Conflict status code
      );
    }
    // --- END: DUPLICATE APPLICATION CHECK ---

    // Prepare FormData to call the existing ATS analysis route
    const atsFormData = new FormData();
    atsFormData.append('resumeFile', resumeFile);

    // Call the internal ATS analysis API route
    const atsResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/ats/analyze`, {
      method: 'POST',
      body: atsFormData,
    });

    const atsResult = await atsResponse.json();

    if (!atsResponse.ok) {
      throw new Error(atsResult.error || 'ATS analysis failed');
    }

    // Save the new application to the database
    const application = await Application.create({
      jobId,
      candidateName,
      candidateEmail,
      resumeUrl: "placeholder", // In a real app, upload to S3 and store the URL
      atsScore: atsResult.analysis.atsScore,
      status: 'Pending',
    });

    // Increment the application count for the job
    await Job.findByIdAndUpdate(jobId, { $inc: { applications: 1 } });

    return NextResponse.json({ success: true, data: application }, { status: 201 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}