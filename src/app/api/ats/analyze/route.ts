import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export const runtime = 'nodejs' // Ensure Node.js runtime
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // Check if Gemini API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not configured')
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // Parse the FormData
    const formData = await request.formData()
    const file = formData.get('resumeFile') as File
    const jobRole = formData.get('jobRole') as string
    const jobDescription = formData.get('jobDescription') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    console.log('Processing file:', file.name, 'Type:', file.type, 'Size:', file.size)

    // Validate file type
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only PDF and DOCX files are allowed' },
        { status: 400 }
      )
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    console.log('Buffer created, size:', buffer.length, 'bytes')

    // Parse file to text based on file type
    let resumeText = ''
    
    try {
      if (file.type === 'application/pdf') {
        console.log('Parsing PDF...')
        // Parse PDF using dynamic import
        const pdfParse = (await import('pdf-parse')).default
        const pdfData = await pdfParse(buffer)
        resumeText = pdfData.text
        console.log('PDF parsed successfully, text length:', resumeText.length)
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        console.log('Parsing DOCX...')
        // Parse DOCX using dynamic import
        const mammoth = (await import('mammoth')).default
        const docxResult = await mammoth.extractRawText({ buffer })
        resumeText = docxResult.value
        console.log('DOCX parsed successfully, text length:', resumeText.length)
      }
    } catch (parseError: any) {
      console.error('File parsing error:', parseError)
      console.error('Error details:', parseError.message)
      console.error('Error stack:', parseError.stack)
      return NextResponse.json(
        { error: 'Could not read this file, please upload a valid PDF/DOCX under 10MB' },
        { status: 400 }
      )
    }

    // Validate extracted text
    if (!resumeText || resumeText.trim().length === 0) {
      console.error('No text extracted from file')
      return NextResponse.json(
        { error: 'Could not read this file, please upload a valid PDF/DOCX under 10MB' },
        { status: 400 }
      )
    }

    console.log('Text extraction successful. Length:', resumeText.length, 'characters')

    // Prepare the prompt for Gemini
    let prompt = `Analyze this resume for job readiness. Give:
Overall Resume Score out of 100
ATS Score out of 100
Scores (out of 100) for: Tone & Style, Content, Structure, Skills
For each section, provide a mix of 2 or 3 checks (positives) and 2 or 3 warnings (negatives)
Return as structured JSON with the following format:
{
  "score": number,
  "atsScore": number,
  "toneScore": number,
  "contentScore": number,
  "structureScore": number,
  "skillsScore": number,
  "toneDetails": {
    "checks": ["positive1", "positive2"],
    "warnings": ["negative1", "negative2"]
  },
  "contentDetails": {
    "checks": ["positive1", "positive2"],
    "warnings": ["negative1", "negative2"]
  },
  "structureDetails": {
    "checks": ["positive1", "positive2"],
    "warnings": ["negative1", "negative2"]
  },
  "skillsDetails": {
    "checks": ["positive1", "positive2"],
    "warnings": ["negative1", "negative2"]
  }
}

Resume text:
${resumeText}`

    // Add job context if provided
    if (jobRole || jobDescription) {
      prompt += `\n\nJob Context:`
      if (jobRole) {
        prompt += `\nJob Role: ${jobRole}`
      }
      if (jobDescription) {
        prompt += `\nJob Description: ${jobDescription}`
      }
    }

    console.log('Sending request to Gemini API...')

    // Generate analysis using Gemini
    let analysisText = ''
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })
      const result = await model.generateContent(prompt)
      const response = await result.response
      analysisText = response.text()
      console.log('Received response from Gemini:', analysisText.substring(0, 200) + '...')
    } catch (geminiError: any) {
      console.error('Gemini API error:', geminiError)
      return NextResponse.json(
        { error: 'Failed to analyze resume with AI: ' + geminiError.message },
        { status: 500 }
      )
    }

    // Parse the JSON response
    let analysis
    try {
      // Remove markdown code blocks if present
      let cleanedText = analysisText.trim()
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '')
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/```\n?/g, '')
      }
      
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError: any) {
      console.error('Failed to parse Gemini response:', parseError)
      console.error('Raw response:', analysisText)
      return NextResponse.json(
        { error: 'Failed to analyze resume - invalid response format from AI' },
        { status: 500 }
      )
    }

    // Validate the analysis structure
    const requiredFields = [
      'score', 'atsScore', 'toneScore', 'contentScore', 
      'structureScore', 'skillsScore', 'toneDetails', 
      'contentDetails', 'structureDetails', 'skillsDetails'
    ]

    for (const field of requiredFields) {
      if (!(field in analysis)) {
        console.error(`Missing required field: ${field}`)
        return NextResponse.json(
          { error: `Invalid analysis response: missing ${field}` },
          { status: 500 }
        )
      }
    }

    console.log('Analysis completed successfully')
    console.log('Scores - Overall:', analysis.score, 'ATS:', analysis.atsScore)

    // Return the structured analysis
    return NextResponse.json({
      success: true,
      analysis: {
        score: analysis.score,
        atsScore: analysis.atsScore,
        toneScore: analysis.toneScore,
        contentScore: analysis.contentScore,
        structureScore: analysis.structureScore,
        skillsScore: analysis.skillsScore,
        toneDetails: analysis.toneDetails,
        contentDetails: analysis.contentDetails,
        structureDetails: analysis.structureDetails,
        skillsDetails: analysis.skillsDetails,
      }
    }, { status: 200 })

  } catch (error: any) {
    console.error('ATS analysis error:', error)
    console.error('Error stack:', error.stack)
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}