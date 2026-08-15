"use client"

import { Button } from '@/components/ui/button'
import { 
  Search, 
  MapPin, 
  Building, 
  DollarSign, 
  Calendar, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  Briefcase,
  Star,
  Eye,
  Send,
  Loader2
} from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation' // Make sure this is imported
import dayjs from 'dayjs'
import type { Job } from '@/components/jobs/types'

export default function CandidateJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTitle, setSearchTitle] = useState('')
  const [searchSkills, setSearchSkills] = useState('')
  const [expandedJobs, setExpandedJobs] = useState<Set<string>>(new Set())
  const router = useRouter(); // Call the hook at the top level of the component

  // Fetch jobs from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/jobs');
        const data = await res.json();
        if (data.success) {
          // Only show active jobs to candidates
          const activeJobs = data.data.filter((job: Job) => 
            !dayjs().isAfter(dayjs(job.expiryDate))
          );
          setJobs(activeJobs);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  
  // Filter jobs based on search criteria
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesTitle = !searchTitle || 
        job.title.toLowerCase().includes(searchTitle.toLowerCase())
      const matchesSkills = !searchSkills || 
        job.skills.some(skill => 
          skill.toLowerCase().includes(searchSkills.toLowerCase())
        )
      return matchesTitle && matchesSkills
    })
  }, [jobs, searchTitle, searchSkills]);


  const toggleJobExpansion = (jobId: string) => {
    setExpandedJobs(prev => {
      const newSet = new Set(prev)
      if (newSet.has(jobId)) {
        newSet.delete(jobId)
      } else {
        newSet.add(jobId)
      }
      return newSet
    })
  }

  const handleApply = (jobId: string) => {
    // Now you can use the router object here without calling the hook again
    router.push(`/jobs/${jobId}/apply`);
  }

  const handleViewDetails = (jobId: string) => {
     window.open(`/jobs/${jobId}`, '_blank');
  }

  const formatDate = (dateString: string) => dayjs(dateString).format("DD/MM/YYYY")

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400'
    if (score >= 80) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Job Listings
        </h1>
        <p className="text-muted-foreground">
          Find your next opportunity from below job listings
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by Job Role..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="pl-10 pr-4 py-2 bg-muted rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full border border-input"
          />
        </div>
        <div className="relative flex-1 max-w-md">
          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by skills..."
            value={searchSkills}
            onChange={(e) => setSearchSkills(e.target.value)}
            className="pl-10 pr-4 py-2 bg-muted rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full border border-input"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredJobs.length} jobs found
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Job Cards Grid */}
      {!loading && filteredJobs.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredJobs.map((job) => (
            <div key={job._id} className="bg-card rounded-2xl border hover:shadow-lg transition-shadow">
              <div className="p-6 border-b">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center space-x-1">
                        <Building className="h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        {/* <DollarSign className="h-4 w-4" /> */}
                        <span className="font-semibold">Rs</span>
                        <span>{job.salaryRange || 'N/A'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{job.applications} applications</span>
                      </div>
                    </div>
                  </div>
                  {/* You can add back the match score logic here if needed */}
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <div className={`text-sm text-muted-foreground ${!expandedJobs.has(job._id) ? 'line-clamp-3' : ''}`}>
                    {job.description}
                  </div>
                  <button
                    onClick={() => toggleJobExpansion(job._id)}
                    className="text-primary text-sm font-medium hover:underline mt-2 flex items-center space-x-1"
                  >
                    {expandedJobs.has(job._id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    <span>{expandedJobs.has(job._id) ? 'Show less' : 'Show more'}</span>
                  </button>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Expires: {formatDate(job.expiryDate)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(job._id)}>
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                    <Button size="sm" onClick={() => handleApply(job._id)}>
                      <Send className="h-3 w-3 mr-1" />
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredJobs.length === 0 && (
        <div className="text-center py-12 col-span-1 lg:col-span-2">
          <div className="text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No Jobs Found</p>
            <p className="text-sm">
              Try adjusting your search criteria or check back later for new opportunities.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}