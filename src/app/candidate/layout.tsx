// "use client"

// import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import { 
//   Home, 
//   Briefcase, 
//   FileText, 
//   Brain, 
//   Video, 
//   Search, 
//   Bell, 
//   User,
//   Menu,
//   X
// } from 'lucide-react'
// import { useState } from 'react'

// export default function CandidateLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Top Navbar */}
//       <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="flex h-16 items-center px-4">
//           {/* Mobile menu button */}
//           <Button
//             variant="ghost"
//             size="sm"
//             className="md:hidden"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//           </Button>

//           {/* Logo */}
//           <div className="flex items-center space-x-2 px-4">
//             <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
//               <span className="text-primary-foreground font-bold text-sm">H</span>
//             </div>
//             <span className="font-semibold text-lg">Hiremind</span>
//           </div>

//           {/* Search Bar */}
//           <div className="flex-1 max-w-md mx-4 hidden md:block">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <input
//                 type="text"
//                 placeholder="Search jobs..."
//                 className="w-full pl-10 pr-4 py-2 bg-muted rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//             </div>
//           </div>

//           {/* Right side items */}
//           <div className="flex items-center space-x-2 ml-auto">
//             <Button variant="ghost" size="sm">
//               <Bell className="h-4 w-4" />
//             </Button>
//             <Button variant="ghost" size="sm">
//               <User className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </nav>

//       <div className="flex">
//         {/* Sidebar */}
//         <aside className={`
//           fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out
//           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static
//         `}>
//           <div className="flex flex-col h-full">
//             {/* Sidebar Header */}
//             <div className="p-6 border-b">
//               <h2 className="text-lg font-semibold">Candidate Dashboard</h2>
//               <p className="text-sm text-muted-foreground">Manage your job search</p>
//             </div>

//             {/* Navigation */}
//             <nav className="flex-1 p-4 space-y-2">
//               <Link href="/candidate">
//                 <Button variant="ghost" className="w-full justify-start">
//                   <Home className="h-4 w-4 mr-3" />
//                   Home
//                 </Button>
//               </Link>
              
//               <Link href="/candidate/jobs">
//                 <Button variant="ghost" className="w-full justify-start">
//                   <Briefcase className="h-4 w-4 mr-3" />
//                   Jobs
//                 </Button>
//               </Link>
              
//               <Link href="/candidate/applications">
//                 <Button variant="ghost" className="w-full justify-start">
//                   <FileText className="h-4 w-4 mr-3" />
//                   Applications
//                 </Button>
//               </Link>
              
//               <Link href="/candidate/ats">
//                 <Button variant="ghost" className="w-full justify-start">
//                   <Brain className="h-4 w-4 mr-3" />
//                   ATS
//                 </Button>
//               </Link>
              
//               <Link href="/candidate/mock-interview">
//                 <Button variant="ghost" className="w-full justify-start">
//                   <Video className="h-4 w-4 mr-3" />
//                   Mock Interview
//                 </Button>
//               </Link>
//             </nav>

//             {/* Sidebar Footer */}
//             <div className="p-4 border-t">
//               <div className="text-xs text-muted-foreground">
//                 <p>Hiremind Platform</p>
//                 <p>AI-Powered Job Search</p>
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* Overlay for mobile */}
//         {sidebarOpen && (
//           <div 
//             className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Main Content */}
//         <main className="flex-1 md:ml-0">
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// } 
"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Briefcase, 
  FileText, 
  Brain, 
  Video, 
  Search,
  Bell, 
  User,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from '@/components/theme-toggle' 

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo */}
          <Link href="/">
          <div className="flex items-center space-x-2 px-4">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">H</span>
            </div>
            <span className="font-semibold text-lg">Hiremind</span>
          </div>
          </Link>

          {/* Right side items */}
          <div className="flex items-center space-x-2 ml-auto">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            
            <ThemeToggle />
            
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out mt-16
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0 md:mt-0 md:h-full
        `}>
          <div className="flex flex-col h-full">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Candidate Dashboard</h2>
              <p className="text-sm text-muted-foreground">Manage your job search</p>
            </div>

            {/* Navigation (made scrollable) */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              <Link href="/candidate">
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="h-4 w-4 mr-3" />
                  Home
                </Button>
              </Link>
              
              <Link href="/candidate/jobs">
                <Button variant="ghost" className="w-full justify-start">
                  <Briefcase className="h-4 w-4 mr-3" />
                  Jobs
                </Button>
              </Link>
              
              <Link href="/candidate/applications">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-3" />
                  My Applications
                </Button>
              </Link>
                    
              <Link href="/candidate/mock-interview">
                <Button variant="ghost" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-3" />
                  Mock Interview
                </Button>
              </Link>

              <Link href="/candidate/ats">
                <Button variant="ghost" className="w-full justify-start">
                  <Brain className="h-4 w-4 mr-3" />
                  Resume Analysis
                </Button>
              </Link>
              
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t">
              <div className="text-xs text-muted-foreground">
                <p>Hiremind Platform</p>
                <p>AI-Powered Job Search</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content (made scrollable) */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}