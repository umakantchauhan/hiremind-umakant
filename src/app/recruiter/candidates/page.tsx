import { Button } from '@/components/ui/button'
import { Search, Filter, Eye, MessageSquare, Calendar, Star, MapPin, Briefcase } from 'lucide-react'

export default function Candidates() {
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Candidates
        </h1>
        <p className="text-muted-foreground">
          Browse and manage your candidate database
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search candidates..."
            className="pl-10 pr-4 py-2 bg-muted rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Candidate Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Top Candidate */}
        <div className="bg-card p-6 rounded-lg border border-green-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">JD</span>
              </div>
              <div>
                <h3 className="font-semibold">John Doe</h3>
                <p className="text-sm text-muted-foreground">Senior Developer</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">4.9</span>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              <span>8 years experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                Available
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                Strong Match
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>
        </div>

        {/* Good Candidate */}
        <div className="bg-card p-6 rounded-lg border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">AS</span>
              </div>
              <div>
                <h3 className="font-semibold">Alice Smith</h3>
                <p className="text-sm text-muted-foreground">Full Stack Engineer</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">4.7</span>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Remote</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              <span>5 years experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                Available
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                Good Match
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>
        </div>

        {/* Promising Candidate */}
        <div className="bg-card p-6 rounded-lg border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">RJ</span>
              </div>
              <div>
                <h3 className="font-semibold">Robert Johnson</h3>
                <p className="text-sm text-muted-foreground">React Developer</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">4.5</span>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>New York, NY</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              <span>3 years experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                Available
              </span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                Promising
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>
        </div>

        {/* Experienced Candidate */}
        <div className="bg-card p-6 rounded-lg border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">SW</span>
              </div>
              <div>
                <h3 className="font-semibold">Sarah Wilson</h3>
                <p className="text-sm text-muted-foreground">Product Manager</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">4.8</span>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Seattle, WA</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              <span>10 years experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                Available
              </span>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                Experienced
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>
        </div>

        {/* Junior Candidate */}
        <div className="bg-card p-6 rounded-lg border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">MB</span>
              </div>
              <div>
                <h3 className="font-semibold">Mike Brown</h3>
                <p className="text-sm text-muted-foreground">Junior Developer</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">4.2</span>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Austin, TX</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              <span>2 years experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                Available
              </span>
              <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                Junior
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>
        </div>

        {/* Senior Candidate */}
        <div className="bg-card p-6 rounded-lg border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">LD</span>
              </div>
              <div>
                <h3 className="font-semibold">Lisa Davis</h3>
                <p className="text-sm text-muted-foreground">Senior Engineer</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">4.9</span>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Boston, MA</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              <span>12 years experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                Available
              </span>
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                Senior
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 