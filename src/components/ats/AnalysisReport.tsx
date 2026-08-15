"use client"

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react'

interface AnalysisResult {
  score: number
  atsScore: number
  toneDetails: { checks: string[]; warnings: string[] }
  contentDetails: { checks: string[]; warnings: string[] }
  structureDetails: { checks: string[]; warnings: string[] }
  skillsDetails: { checks: string[]; warnings: string[] }
}

interface AnalysisReportProps {
  data: AnalysisResult
}

const getScoreColor = (score: number) => {
  if (score >= 75) return '#10b981' // green
  if (score >= 50) return '#f59e0b' // yellow
  return '#ef4444' // red
}

const getScoreDescription = (score: number) => {
  if (score >= 90) return 'Excellent'
  if (score >= 75) return 'Good'
  if (score >= 50) return 'Fair'
  return 'Needs Improvement'
}

export default function AnalysisReport({ data }: AnalysisReportProps) {
    const allWarnings = [
        ...data.toneDetails.warnings,
        ...data.contentDetails.warnings,
        ...data.structureDetails.warnings,
        ...data.skillsDetails.warnings,
    ];

  return (
    <div className="space-y-6">
      {/* Overall Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
        <div>
          <div className="w-32 h-32 mx-auto">
            <CircularProgressbar
              value={data.score}
              text={`${data.score}%`}
              styles={buildStyles({ pathColor: getScoreColor(data.score), textColor: 'hsl(var(--foreground))', trailColor: 'hsl(var(--muted))' })}
            />
          </div>
          <h3 className="text-lg font-semibold mt-2">Overall Score</h3>
          <p className="text-sm text-muted-foreground">{getScoreDescription(data.score)}</p>
        </div>
        <div>
          <div className="w-32 h-32 mx-auto">
            <CircularProgressbar
              value={data.atsScore}
              text={`${data.atsScore}%`}
              styles={buildStyles({ pathColor: getScoreColor(data.atsScore), textColor: 'hsl(var(--foreground))', trailColor: 'hsl(var(--muted))' })}
            />
          </div>
          <h3 className="text-lg font-semibold mt-2">ATS Compatibility</h3>
          <p className="text-sm text-muted-foreground">{getScoreDescription(data.atsScore)}</p>
        </div>
      </div>

      {/* Strong/Weak Points */}
      <div className="space-y-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-800/50">
          <h4 className="font-semibold text-green-700 dark:text-green-400 flex items-center mb-2"><CheckCircle className="h-5 w-5 mr-2" />Strong Points</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            {data.contentDetails.checks.map((check, i) => <li key={i}>{check}</li>)}
            {data.skillsDetails.checks.map((check, i) => <li key={i}>{check}</li>)}
          </ul>
        </div>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800/50">
          <h4 className="font-semibold text-red-700 dark:text-red-400 flex items-center mb-2"><XCircle className="h-5 w-5 mr-2" />Weak Points</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
             {data.contentDetails.warnings.map((warning, i) => <li key={i}>{warning}</li>)}
             {data.structureDetails.warnings.map((warning, i) => <li key={i}>{warning}</li>)}
          </ul>
        </div>
      </div>

      {/* Key Improvements */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800/50">
        <h4 className="font-semibold text-blue-700 dark:text-blue-400 flex items-center mb-2"><Lightbulb className="h-5 w-5 mr-2" />Key Improvements</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          {allWarnings.slice(0, 4).map((warning, i) => (
            <li key={i}>{warning}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}