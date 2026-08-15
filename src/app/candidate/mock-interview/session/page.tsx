"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { 
  Mic, 
  MicOff, 
  Phone, 
  Send,
  PhoneOff, 
  Clock, 
  User,
  Bot,
  Loader2
} from 'lucide-react'

// Declare the SpeechRecognition interface for browser compatibility
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface ConversationEntry {
  role: 'user' | 'ai';
  text: string;
}

export default function MockInterviewSession() {
  const router = useRouter()
  const [interviewData, setInterviewData] = useState<any>(null)
  const [isInterviewStarted, setIsInterviewStarted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isMicOn, setIsMicOn] = useState(true)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [conversation, setConversation] = useState<ConversationEntry[]>([])
  const [isAiTyping, setIsAiTyping] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [isListening, setIsListening] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const recognitionRef = useRef<any>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedData = sessionStorage.getItem('mockInterviewData')
    if (storedData) {
      const data = JSON.parse(storedData)
      setInterviewData(data)
      setTimeRemaining(data.interviewDuration * 60)
    } else {
      router.push('/candidate/mock-interview')
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('')
        setUserInput(transcript)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start()
        }
      }
    }
  }, [router])

  useEffect(() => {
    if (isInterviewStarted && timeRemaining > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining(prev => prev - 1)
      }, 1000)
    } else if (timeRemaining <= 0 && isInterviewStarted) {
      endInterview()
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
    }
  }, [isInterviewStarted, timeRemaining])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ 
        top: scrollAreaRef.current.scrollHeight, 
        behavior: 'smooth' 
      })
    }
  }, [conversation])

  const speak = (text: string) => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.onend = () => {
      if (isInterviewStarted) {
        startListening()
      }
    }
    speechSynthesis.speak(utterance)
  }

  const getNextQuestion = async (currentConversation: ConversationEntry[]) => {
    setIsAiTyping(true)
    try {
      const response = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobRole: interviewData.candidateInfo.jobRole,
          jobDescription: interviewData.candidateInfo.jobDescription,
          resumeText: '...',
          conversationHistory: currentConversation,
        }),
      })
      if (!response.ok) throw new Error('API request failed')
      const result = await response.json()
      
      const aiResponse = result.question
      setConversation(prev => [...prev, { role: 'ai', text: aiResponse }])
      speak(aiResponse)
    } catch (error) {
      console.error("Failed to get next question:", error)
      const errorMessage = "I'm sorry, I encountered an error. Let's try that again."
      setConversation(prev => [...prev, { role: 'ai', text: errorMessage }])
      speak(errorMessage)
    } finally {
      setIsAiTyping(false)
    }
  }
  
  const startInterview = async () => {
    setIsInterviewStarted(true)
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      getNextQuestion([])
    } catch (error) {
      console.error("Error accessing media devices:", error)
      alert("Could not access camera and microphone. Please check your permissions.")
      setIsInterviewStarted(false)
    }
  }

  const endInterview = async () => {
    setIsInterviewStarted(false);
    setIsListening(false);
    if (recognitionRef.current) recognitionRef.current.stop();
    if (stream) stream.getTracks().forEach(track => track.stop());
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    speechSynthesis.cancel();

    sessionStorage.setItem('lastInterviewJobRole', interviewData.candidateInfo.jobRole);
    sessionStorage.setItem('lastInterviewConversation', JSON.stringify(conversation));
    
    router.push(`/candidate/mock-interview/completed`);
    
  try {
      const response = await fetch('/api/interview/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobRole: interviewData.candidateInfo.jobRole,
          conversation,
        }),
      })

      if (!response.ok) throw new Error('Failed to analyze interview.')
      const result = await response.json()

      sessionStorage.setItem('lastInterviewJobRole', interviewData.candidateInfo.jobRole)

      router.push(`/candidate/mock-interview/completed?reportId=${result.reportId}`)
    } catch (error) {
      console.error("Error during interview analysis:", error)
      alert("There was an error analyzing your interview. Please try again later.")
      router.push('/candidate')
    }
  }

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const handleSendAnswer = () => {
    if (!userInput.trim()) return
    
    stopListening()
    const newConversation = [...conversation, { role: 'user' as 'user', text: userInput }]
    setConversation(newConversation)
    setUserInput('')
    getNextQuestion(newConversation)
  }
  
  const toggleMicrophone = () => {
    setIsMicOn(!isMicOn)
    if (isMicOn) stopListening()
    else startListening()
  }
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <div className="flex h-[calc(100vh-8rem)] w-full p-4 gap-4 bg-background">
      {/* Main Content: Video Panels and Controls */}
      <div className="flex flex-col flex-1 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 flex-1 gap-4">
          {/* AI Interviewer Panel */}
          <Card className="flex flex-col items-center justify-center p-4 bg-muted/30">
            <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src="https://placehold.co/128x128/222/fff?text=AI" />
                <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold">HireMind AI</h3>
            <p className="text-muted-foreground">AI Powered Interviewer</p>
            {isAiTyping && <Loader2 className="mt-2 h-5 w-5 animate-spin" />}
          </Card>
          
          {/* Candidate Video Panel */}
          <Card className="relative overflow-hidden bg-black flex items-center justify-center">
            <video ref={videoRef} className="w-full h-full object-cover" muted autoPlay playsInline />
            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {interviewData?.candidateInfo?.name || "Candidate"}
            </div>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-4 p-2 bg-card rounded-full border">
            <Button variant={isMicOn ? "secondary" : "destructive"} size="icon" onClick={toggleMicrophone} disabled={!isInterviewStarted}>
                {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>
            {!isInterviewStarted ? (
              <Button size="lg" className="rounded-full w-48" onClick={startInterview}>
                <Phone className="h-5 w-5 mr-2" />
                Start Interview
              </Button>
            ) : (
              <div className="flex items-center gap-4">
                <Button size="lg" variant="destructive" className="rounded-full w-48" onClick={endInterview}>
                    <PhoneOff className="h-5 w-5 mr-2" />
                    End Interview
                </Button>
                <div className="flex items-center gap-2 text-lg font-semibold font-mono">
                    <Clock className="h-5 w-5 text-primary" />
                    {formatTime(timeRemaining)}
                </div>
              </div>
            )}
        </div>
      </div>
      
      {/* Right Panel: Chat/Transcript */}
      <Card className="w-full md:w-1/3 flex flex-col">
        <CardHeader>
            <CardTitle className="text-center">Interview Conversation</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4 overflow-y-auto">
            <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                    {conversation.map((entry, index) => (
                      <div key={index} className={`flex items-start gap-3 ${entry.role === 'user' ? 'justify-end' : ''}`}>
                        {entry.role === 'ai' && <Avatar className="w-8 h-8"><AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback></Avatar>}
                        <div className={`rounded-lg px-4 py-2 max-w-[80%] ${entry.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          <p className="text-sm">{entry.text}</p>
                        </div>
                        {entry.role === 'user' && <Avatar className="w-8 h-8"><AvatarFallback><User className="h-4 w-4" /></AvatarFallback></Avatar>}
                      </div>
                    ))}
                </div>
            </ScrollArea>
            <div className="flex items-center gap-2 border-t pt-4">
              <Input 
                placeholder="Your response..." 
                className="flex-1"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendAnswer()}
                disabled={!isInterviewStarted || isAiTyping || isListening} 
              />
              <Button size="icon" onClick={handleSendAnswer} disabled={!isInterviewStarted || isAiTyping || !userInput}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}