"use client"

import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  MapPin, 
  DollarSign,
  Eye,
  Send,
  Star
} from 'lucide-react'

export default function CandidateDashboard() {
  const stats = [
    {
      title: "Applications Submitted",
      value: "12",
      change: "+3 this week",
      icon: Send,
      color: "text-blue-600"
    },
    {
      title: "Interviews Scheduled",
      value: "4",
      change: "+2 this week",
      icon: Calendar,
      color: "text-green-600"
    },
    {
      title: "Response Rate",
      value: "67%",
      change: "+5% this month",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Average Match Score",
      value: "87%",
      change: "+2% this month",
      icon: Star,
      color: "text-yellow-600"
    }
  ]

  const recentApplications = [
    {
      id: 1,
      company: "TechCorp Inc.",
      position: "Senior Frontend Developer",
      status: "Under Review",
      appliedDate: "2024-01-15",
      matchScore: 92,
      location: "San Francisco, CA",
      salary: "$120k - $150k"
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "Full Stack Engineer",
      status: "Interview Scheduled",
      appliedDate: "2024-01-14",
      matchScore: 88,
      location: "Remote",
      salary: "$100k - $130k"
    },
    {
      id: 3,
      company: "BigTech",
      position: "React Developer",
      status: "Rejected",
      appliedDate: "2024-01-12",
      matchScore: 75,
      location: "Seattle, WA",
      salary: "$110k - $140k"
    },
    {
      id: 4,
      company: "SaaS Company",
      position: "Product Manager",
      status: "Accepted",
      appliedDate: "2024-01-10",
      matchScore: 95,
      location: "New York, NY",
      salary: "$130k - $160k"
    }
  ]

  const upcomingInterviews = [
    {
      id: 1,
      company: "TechCorp Inc.",
      position: "Senior Frontend Developer",
      date: "2024-01-20",
      time: "10:00 AM",
      type: "Technical Interview",
      interviewer: "Sarah Johnson"
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "Full Stack Engineer",
      date: "2024-01-22",
      time: "2:00 PM",
      type: "Behavioral Interview",
      interviewer: "Mike Chen"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-700'
      case 'Rejected':
        return 'bg-red-100 text-red-700'
      case 'Interview Scheduled':
        return 'bg-blue-100 text-blue-700'
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted':
        return <CheckCircle className="h-4 w-4" />
      case 'Rejected':
        return <XCircle className="h-4 w-4" />
      case 'Interview Scheduled':
        return <Calendar className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  // Consistent date formatting function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${month}/${day}/${year}`
  }

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, John!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your job search today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-green-600">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="bg-card rounded-lg border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Recent Applications</h3>
            <p className="text-sm text-muted-foreground">
              Your latest job applications and their status
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium">{application.position}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{application.company}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        {application.location}
                      </span>
                      <span className="flex items-center space-x-1">
                        <DollarSign className="h-3 w-3" />
                        {application.salary}
                      </span>
                      <span className="flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        {application.matchScore}% match
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="bg-card rounded-lg border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Upcoming Interviews</h3>
            <p className="text-sm text-muted-foreground">
              Your scheduled interviews and meetings
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="p-4 border rounded-lg hover:bg-muted/30">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{interview.position}</h4>
                      <p className="text-sm text-muted-foreground">{interview.company}</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {interview.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(interview.date)}
                      </span>
                      <span>{interview.time}</span>
                    </div>
                    <span>with {interview.interviewer}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule New Interview
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 