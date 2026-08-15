import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  UserCheck, 
  BrainCircuit, 
  Bot, 
  FileCode,
  BarChart3,
  Video,
  ClipboardCheck
} from "lucide-react";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


const TechGlobe = dynamic(() => import("@/components/TechGlobe"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-muted/20 rounded-lg animate-pulse" />,
});

export default function Home() {
  const features = [
    {
      icon: BrainCircuit,
      title: "ATS Resume Analyzer",
      description: "Optimize resumes for Applicant Tracking Systems with AI-powered analysis and scoring.",
      for: "Candidates",
      href: "/candidate/ats"
    },
    {
      icon: Bot,
      title: "AI-Powered Mock Interviews",
      description: "Practice technical and behavioral interviews with an intelligent AI that provides real-time feedback.",
      for: "Candidates",
      href: "/candidate/mock-interview"
    },
    {
      icon: FileCode,
      title: "Smart Job Matching",
      description: "Discover job opportunities that match your skills and experience with our intelligent matching algorithm.",
      for: "Candidates",
      href: "/candidate/jobs"
    },
    {
      icon: BarChart3,
      title: "Automated Candidate Shortlisting",
      description: "Automatically screen and shortlist the most qualified candidates based on ATS scores and job requirements.",
      for: "Recruiters",
      href: "/recruiter/applications"
    },
    {
      icon: Video,
      title: "Streamlined Interview Process",
      description: "Manage the entire interview lifecycle, from scheduling to feedback, all in one centralized platform.",
      for: "Recruiters",
      href: "/recruiter/applications"
    },
    {
      icon: ClipboardCheck,
      title: "In-Depth Performance Analytics",
      description: "Gain valuable insights into candidate performance with detailed interview reports and analytics.",
      for: "Recruiters",
      href: "/recruiter/applications"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                H
              </span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Hiremind</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            AI-Powered Interview Automation
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Transform Your
              <span className="text-primary block">Hiring Process</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-12">
              An advanced AI-powered platform designed to modernize and
              streamline the technical hiring process for both recruiters and
              candidates.
            </p>

            {/* Sign In Options */}
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/recruiter">
                <Button
                  size="lg"
                  className="w-full h-16 text-lg font-semibold group"
                >
                  <Users className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                  For Recruiters
                </Button>
              </Link>

              <Link href="/candidate">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-16 text-lg font-semibold group"
                >
                  <UserCheck className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                  For Candidates
                </Button>
              </Link>
            </div>
          </div>
          <div className="h-[450px] w-full rounded-lg overflow-hidden border">
            <TechGlobe />
          </div>
        </div>

        {/* Features Section */}
        <section className="py-24">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-foreground">Everything You Need to Succeed</h2>
                <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                    Whether you're hiring top talent or landing your dream job, Hiremind provides the tools to get you there.
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature) => (
                    <Link href={feature.href} key={feature.title}>
                        <Card className="h-full hover:border-primary hover:scale-105 transition-all duration-300">
                            <CardHeader>
                                <div className="flex items-center justify-between mb-4">
                                    <feature.icon className="h-8 w-8 text-primary" />
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${feature.for === 'Candidates' ? 'bg-blue-900/20 text-blue-400 border border-blue-500/20' : 'bg-green-900/20 text-green-400 border border-green-500/20'}`}>
                                        {feature.for}
                                    </span>
                                </div>
                                <CardTitle>{feature.title}</CardTitle>
                                <CardDescription>{feature.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
      </main>
    </div>
  );
}