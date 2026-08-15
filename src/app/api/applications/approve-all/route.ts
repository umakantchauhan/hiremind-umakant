import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';

export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        const { jobId } = await request.json();

        if (!jobId) {
            return NextResponse.json({ success: false, error: 'Job ID is required' }, { status: 400 });
        }

        // Update all applications for this job with status 'Approved' to 'Interviewing'
        await Application.updateMany(
            { jobId: jobId, status: 'Approved' },
            { $set: { status: 'Interviewing' } }
        );

        return NextResponse.json({ success: true, message: 'All approved candidates moved to interviewing stage.' });
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}