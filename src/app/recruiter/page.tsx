import { Button } from '@/components/ui/button'
import { Users, Calendar, BarChart3, Plus, TrendingUp, Briefcase, FileText, Eye, MessageSquare, Calendar as CalendarIcon } from 'lucide-react'

export default function RecruiterDashboard() {
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your hiring process.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">My Jobs</p>
              <p className="text-2xl font-bold">8</p>
              <p className="text-xs text-green-600 mt-1">+2 this month</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
              <p className="text-2xl font-bold">156</p>
              <p className="text-xs text-blue-600 mt-1">+23 this week</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold">78%</p>
              <p className="text-xs text-green-600 mt-1">+5% from last month</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="bg-card rounded-lg border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Applications</h3>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-sm">Candidate</th>
                <th className="text-left p-4 font-medium text-sm">Position</th>
                <th className="text-left p-4 font-medium text-sm">Applied</th>
                <th className="text-left p-4 font-medium text-sm">Status</th>
                <th className="text-left p-4 font-medium text-sm">Match Score</th>
                <th className="text-left p-4 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">JD</span>
                    </div>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">Senior Developer</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <p className="font-medium">Senior Developer</p>
                  <p className="text-sm text-muted-foreground">TechCorp</p>
                </td>
                <td className="p-4 text-sm text-muted-foreground">2 hours ago</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Strong Match
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                    <span className="text-sm font-medium">95%</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-3 w-3" />
                    </Button>
                    <Button size="sm">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </td>
              </tr>
              
              <tr className="border-b">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">AS</span>
                    </div>
                    <div>
                      <p className="font-medium">Alice Smith</p>
                      <p className="text-sm text-muted-foreground">Full Stack Engineer</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <p className="font-medium">Full Stack Engineer</p>
                  <p className="text-sm text-muted-foreground">StartupXYZ</p>
                </td>
                <td className="p-4 text-sm text-muted-foreground">1 day ago</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    Good Match
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                    <span className="text-sm font-medium">82%</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </td>
              </tr>
              
              <tr className="border-b">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">RJ</span>
                    </div>
                    <div>
                      <p className="font-medium">Robert Johnson</p>
                      <p className="text-sm text-muted-foreground">React Developer</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <p className="font-medium">React Developer</p>
                  <p className="text-sm text-muted-foreground">BigTech</p>
                </td>
                <td className="p-4 text-sm text-muted-foreground">3 days ago</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                    Under Review
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-3 w-3" />
                    </Button>
                  </div>
                </td>
              </tr>
              
              <tr className="border-b">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">SW</span>
                    </div>
                    <div>
                      <p className="font-medium">Sarah Wilson</p>
                      <p className="text-sm text-muted-foreground">Product Manager</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <p className="font-medium">Product Manager</p>
                  <p className="text-sm text-muted-foreground">SaaS Company</p>
                </td>
                <td className="p-4 text-sm text-muted-foreground">5 days ago</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Strong Match
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-3 w-3" />
                    </Button>
                    <Button size="sm">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </td>
              </tr>
              
              <tr>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">MB</span>
                    </div>
                    <div>
                      <p className="font-medium">Mike Brown</p>
                      <p className="text-sm text-muted-foreground">Junior Developer</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <p className="font-medium">Junior Developer</p>
                  <p className="text-sm text-muted-foreground">Tech Startup</p>
                </td>
                <td className="p-4 text-sm text-muted-foreground">1 week ago</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                    Promising
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <span className="text-sm font-medium">70%</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-3 w-3" />
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 