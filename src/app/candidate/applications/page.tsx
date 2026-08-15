"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Briefcase, Star, Calendar, Loader2, Trash2 } from 'lucide-react';
import { IInterviewReport } from '@/models/InterviewReport';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Application {
  _id: string;
  jobId: { _id: string; title: string; company: string; };
  status: string;
  createdAt: string;
}

// Helper function for status colors, consistent with recruiter page
const getStatusClass = (status: string) => {
  switch (status) {
    case 'Approved':
      return 'bg-blue-100 text-blue-800';
    case 'Interviewing':
      return 'bg-green-100 text-green-800';
    case 'Rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function ApplicationsPage() {
  const router = useRouter();
  const [reports, setReports] = useState<IInterviewReport[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/applications');
      const result = await res.json();
      if (result.success) setApplications(result.data);
    } catch (error) {
      console.error("Failed to fetch applications", error);
    }
  };

  const fetchReports = async () => {
    try {
      const res = await fetch('/api/interview/reports');
      const result = await res.json();
      if (result.success) setReports(result.data);
    } catch (error) {
      console.error("Failed to fetch reports", error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([fetchApplications(), fetchReports()]);
      setLoading(false);
    };
    fetchAllData();
  }, []);

  const handleDelete = async (reportId: string) => {
    await fetch(`/api/interview/reports/${reportId}`, { method: 'DELETE' });
    fetchReports();
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-4">My Applications</h1>
      <Tabs defaultValue="real-jobs">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="real-jobs">Real Job Applications</TabsTrigger>
          <TabsTrigger value="mock-interviews">Mock Interview Evaluations</TabsTrigger>
        </TabsList>

        <TabsContent value="real-jobs" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Real Job Applications</CardTitle></CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-40"><Loader2 className="h-8 w-8 animate-spin" /></div>
              ) : applications.length === 0 ? (
                <p className="text-center text-muted-foreground">You haven't applied to any jobs yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium text-sm">Job Title</th>
                        <th className="text-left p-4 font-medium text-sm">Company</th>
                        <th className="text-left p-4 font-medium text-sm">Status</th>
                        <th className="text-left p-4 font-medium text-sm">Applied Date</th>
                        <th className="text-left p-4 font-medium text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr key={app._id} className="border-b">
                          <td className="p-4">{app.jobId.title}</td>
                          <td className="p-4">{app.jobId.company}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(app.status)}`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="p-4">{formatDate(app.createdAt)}</td>
                          <td className="p-4 flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => router.push(`/jobs/${app.jobId._id}`)}>View Job</Button>
                            <Button variant="secondary" size="sm" disabled={app.status !== 'Interviewing'}>Give Interview</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mock-interviews" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Mock Interview Evaluations</CardTitle></CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-40"><Loader2 className="h-8 w-8 animate-spin" /></div>
              ) : reports.length === 0 ? (
                <p className="text-center text-muted-foreground">You haven't completed any mock interviews yet.</p>
              ) : (
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={String(report._id)} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex-1 mb-4 md:mb-0">
                        <h3 className="font-semibold text-lg text-primary">Job Title: {report.jobRole}</h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1.5">
                            <Star className="h-4 w-4" />
                            <span>Overall Score: {report.feedback.overallScore}%</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            <span>Date: {formatDate(report.interviewDate.toString())}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button onClick={() => router.push(`/candidate/mock-interview/feedback/${report._id}`)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Analysis
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your interview report analysis.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(String(report._id))}>
                                Yes
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}