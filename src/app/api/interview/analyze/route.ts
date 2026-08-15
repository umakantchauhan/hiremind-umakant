import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dbConnect from '@/lib/mongodb';
import InterviewReport from '@/models/InterviewReport';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { jobRole, conversation } = await request.json();

    const transcript = conversation.map((msg: any) => `${msg.role === 'ai' ? 'Interviewer' : 'Candidate'}: ${msg.text}`).join('\n');

    const prompt = `
      Analyze the following mock interview transcript for a "${jobRole}" position.
      Based on the transcript, provide a detailed performance evaluation.
      Return the analysis as a structured JSON object. DO NOT include any markdown or extra text outside the JSON object.
      
      The JSON object must have the following structure:
      {
        "overallScore": <a number between 0 and 100 representing the ATS-style score>,
        "overallImpression": "<a short paragraph summarizing the candidate's performance>",
        "ratings": {
          "technicalSkills": <a number between 0 and 5>,
          "communication": <a number between 0 and 5>,
          "problemSolving": <a number between 0 and 5>,
          "cultureFit": <a number between 0 and 5>
        },
        "strengths": [
          "<short, one-liner strength>",
          "<another short, one-liner strength>",
          "<up to 5 total strengths>"
        ],
        "improvements": [
          "<short, one-liner area for improvement>",
          "<another short, one-liner area for improvement>",
          "<up to 5 total areas for improvement>"
        ]
      }

      **Interview Transcript:**
      ${transcript}
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    let feedback;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        feedback = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (e) {
      console.error("Failed to parse Gemini response:", responseText);
      throw new Error("Failed to parse analysis from AI.");
    }
    
    const newReport = new InterviewReport({
      jobRole,
      conversation,
      feedback,
    });

    await newReport.save();
    
    return NextResponse.json({ success: true, reportId: newReport._id });

  } catch (error) {
    console.error('Analysis API error:', error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}