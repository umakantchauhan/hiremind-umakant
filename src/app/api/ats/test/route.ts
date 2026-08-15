import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function GET() {
  try {
    // Check if Gemini API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured' },
        { status: 500 }
      )
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    
    // Test with a simple prompt
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    const result = await model.generateContent('Say "Hello World" in JSON format: {"message": "Hello World"}')
    const response = await result.response
    const text = response.text()

    return NextResponse.json({
      success: true,
      message: 'Gemini API is working',
      response: text,
      apiKeyConfigured: !!process.env.GEMINI_API_KEY
    })

  } catch (error) {
    console.error('Test API error:', error)
    return NextResponse.json(
      { 
        error: 'Gemini API test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        apiKeyConfigured: !!process.env.GEMINI_API_KEY
      },
      { status: 500 }
    )
  }
} 