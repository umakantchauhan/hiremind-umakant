"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, Calendar, CheckCircle, Clock } from 'lucide-react';
import dayjs from 'dayjs';
import { Job } from '@/components/jobs/types';

export default function JobApplicationsOverview() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/jobs');
        const data = await res.json();
        if (data.success) {
          setJobs(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const getStatus = (expiryDate: string) => {
    return dayjs().isAfter(dayjs(expiryDate)) ? "Expired" : "Active";
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Job Applications</h1>
        <p className="text-muted-foreground">Review and manage candidate applications by job posting.</p>
      </div>

      <div className="space-y-6">
        {jobs.map((job) => (
          <Card key={job._id}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription>{job.company}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{job.applications} Applicants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Expires: {dayjs(job.expiryDate).format('MMMM D, YYYY')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatus(job.expiryDate) === 'Active' ? 
                      <CheckCircle className="h-4 w-4 text-green-500" /> : 
                      <Clock className="h-4 w-4 text-red-500" />}
                    <span>{getStatus(job.expiryDate)}</span>
                  </div>
                </div>
                <Button onClick={() => router.push(`/recruiter/applications/${job._id}`)}>
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}