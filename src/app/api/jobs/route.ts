// src/app/api/jobs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Job from '@/models/Job';

export async function GET() {
  await dbConnect();
  try {
    const jobs = await Job.find({}).sort({ createdAt: -1 }); // Sort by newest
    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    const job = await Job.create(body);
    return NextResponse.json({ success: true, data: job }, { status: 201 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}