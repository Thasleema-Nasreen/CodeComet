
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertTriangle,
  ArrowUpDown,
  BarChart3,
  Building,
  ChevronDown,
  Download,
  FileText,
  Loader2,
  Plus,
  Search,
  Settings,
  Trash2,
  Upload,
  Users
} from 'lucide-react';

const AdminPanelPage = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [uploadingJob, setUploadingJob] = useState(false);
  const [uploadingCurriculum, setUploadingCurriculum] = useState(false);
  
  // Mock data for admin dashboard
  const [mockUsers] = useState([
    { id: '1', name: 'John Student', email: 'student@example.com', university: 'Demo University', lastActive: '2 hours ago', skillMatch: 42 },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', university: 'Tech University', lastActive: '1 day ago', skillMatch: 68 },
    { id: '3', name: 'Robert Johnson', email: 'robert@example.com', university: 'City College', lastActive: '3 days ago', skillMatch: 35 },
    { id: '4', name: 'Alice Williams', email: 'alice@example.com', university: 'State University', lastActive: '5 hours ago', skillMatch: 72 },
    { id: '5', name: 'David Brown', email: 'david@example.com', university: 'National College', lastActive: '2 days ago', skillMatch: 54 },
  ]);
  
  const [mockJobs] = useState([
    { id: '1', title: 'Frontend Developer', company: 'TechCorp', source: 'LinkedIn', dateAdded: '2023-10-15', skillsCount: 12 },
    { id: '2', title: 'Data Scientist', company: 'DataWorks', source: 'Naukri', dateAdded: '2023-10-12', skillsCount: 15 },
    { id: '3', title: 'Full Stack Engineer', company: 'WebSolutions', source: 'LinkedIn', dateAdded: '2023-10-10', skillsCount: 18 },
    { id: '4', title: 'DevOps Engineer', company: 'CloudTech', source: 'Indeed', dateAdded: '2023-10-08', skillsCount: 14 },
    { id: '5', title: 'Product Manager', company: 'ProductHub', source: 'LinkedIn', dateAdded: '2023-10-05', skillsCount: 10 },
  ]);
  
  const [mockCurricula] = useState([
    { id: '1', name: 'Computer Science - Demo University', source: 'Standard Upload', dateAdded: '2023-10-15', skillsCount: 45 },
    { id: '2', title: 'Data Science - Tech University', source: 'Manual Entry', dateAdded: '2023-10-10', skillsCount: 38 },
    { id: '3', title: 'Information Technology - City College', source: 'Standard Upload', dateAdded: '2023-10-05', skillsCount: 42 },
    { id: '4', title: 'Software Engineering - State University', source: 'Standard Upload', dateAdded: '2023-09-28', skillsCount: 50 },
    { id: '5', title: 'Artificial Intelligence - National College', source: 'Manual Entry', dateAdded: '2023-09-25', skillsCount: 33 },
  ]);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/');
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, isAdmin, navigate, toast]);

  const simulateJobUpload = () => {
    setUploadingJob(true);
    setTimeout(() => {
      setUploadingJob(false);
      toast({
        title: "Job Data Uploaded",
        description: "Job market data has been successfully uploaded and processed.",
      });
    }, 2000);
  };

  const simulateCurriculumUpload = () => {
    setUploadingCurriculum(true);
    setTimeout(() => {
      setUploadingCurriculum(false);
      toast({
        title: "Standard Curriculum Uploaded",
        description: "Curriculum has been successfully uploaded and processed.",
      });
    }, 2000);
  };

  return (
    <Layout>
      <div className="py-8 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Admin Panel
            </h1>
            <p className="mt-2 text-gray-600">
              Manage skills, jobs, curricula, and users
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-edu-primary" />
            <span className="ml-3 text-lg text-gray-700">Loading admin dashboard...</span>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-lg bg-edu-light flex items-center justify-center mr-4">
                      <Users className="h-6 w-6 text-edu-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Users</p>
                      <p className="text-2xl font-bold">152</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-lg bg-edu-light flex items-center justify-center mr-4">
                      <Building className="h-6 w-6 text-edu-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Universities</p>
                      <p className="text-2xl font-bold">28</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-lg bg-edu-light flex items-center justify-center mr-4">
                      <FileText className="h-6 w-6 text-edu-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Curricula</p>
                      <p className="text-2xl font-bold">45</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-lg bg-edu-light flex items-center justify-center mr-4">
                      <BarChart3 className="h-6 w-6 text-edu-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Job Listings</p>
                      <p className="text-2xl font-bold">523</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Tabs */}
            <Tabs defaultValue="users" className="mb-6">
              <TabsList>
                <TabsTrigger value="users">
                  <Users className="h-4 w-4 mr-2" />
                  Users
                </TabsTrigger>
                <TabsTrigger value="jobs">
                  <Building className="h-4 w-4 mr-2" />
                  Job Market Data
                </TabsTrigger>
                <TabsTrigger value="curricula">
                  <FileText className="h-4 w-4 mr-2" />
                  Standard Curricula
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  System Settings
                </TabsTrigger>
              </TabsList>
              
              {/* Users Tab */}
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle>User Management</CardTitle>
                        <CardDescription>
                          View and manage all user accounts
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search users..."
                            className="pl-9 w-full md:w-60"
                          />
                        </div>
                        <Button variant="outline">
                          <ArrowUpDown className="mr-2 h-4 w-4" />
                          Sort
                        </Button>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Add User
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b bg-muted/50 font-medium">
                              <th className="py-3 px-4 text-left">User</th>
                              <th className="py-3 px-4 text-left">University</th>
                              <th className="py-3 px-4 text-left">Last Active</th>
                              <th className="py-3 px-4 text-left">Skill Match</th>
                              <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockUsers.map((user) => (
                              <tr key={user.id} className="border-b">
                                <td className="py-3 px-4">
                                  <div className="flex items-center">
                                    <div className="h-9 w-9 rounded-full bg-muted mr-3 flex items-center justify-center text-xs font-medium">
                                      {user.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                      <div className="font-medium">{user.name}</div>
                                      <div className="text-xs text-muted-foreground">{user.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-4">{user.university}</td>
                                <td className="py-3 px-4">{user.lastActive}</td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center">
                                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
                                      <div 
                                        className={`h-full rounded-full ${
                                          user.skillMatch >= 70 ? 'bg-green-500' :
                                          user.skillMatch >= 40 ? 'bg-yellow-500' :
                                          'bg-red-500'
                                        }`}
                                        style={{ width: `${user.skillMatch}%` }}
                                      />
                                    </div>
                                    <span>{user.skillMatch}%</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <Button variant="ghost" size="sm">
                                    View
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-red-600">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      Showing 5 of 152 users
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Jobs Tab */}
              <TabsContent value="jobs">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <CardTitle>Job Market Data</CardTitle>
                            <CardDescription>
                              Job descriptions used for skill extraction
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Search jobs..."
                                className="pl-9 w-full md:w-60"
                              />
                            </div>
                            <Button variant="outline">
                              <Download className="mr-2 h-4 w-4" />
                              Export
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b bg-muted/50 font-medium">
                                  <th className="py-3 px-4 text-left">Job Title</th>
                                  <th className="py-3 px-4 text-left">Company</th>
                                  <th className="py-3 px-4 text-left">Source</th>
                                  <th className="py-3 px-4 text-left">Date Added</th>
                                  <th className="py-3 px-4 text-left">Skills</th>
                                  <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {mockJobs.map((job) => (
                                  <tr key={job.id} className="border-b">
                                    <td className="py-3 px-4 font-medium">{job.title}</td>
                                    <td className="py-3 px-4">{job.company}</td>
                                    <td className="py-3 px-4">{job.source}</td>
                                    <td className="py-3 px-4">{job.dateAdded}</td>
                                    <td className="py-3 px-4">{job.skillsCount} skills</td>
                                    <td className="py-3 px-4 text-right">
                                      <Button variant="ghost" size="sm">
                                        View
                                      </Button>
                                      <Button variant="ghost" size="sm" className="text-red-600">
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="text-sm text-muted-foreground">
                          Showing 5 of 523 job listings
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" disabled>
                            Previous
                          </Button>
                          <Button variant="outline" size="sm">
                            Next
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Upload Job Data</CardTitle>
                        <CardDescription>
                          Upload new job descriptions for analysis
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="border-2 border-dashed rounded-lg p-6 text-center">
                            <div className="mx-auto h-12 w-12 rounded-full bg-edu-light flex items-center justify-center mb-4">
                              <Upload className="h-6 w-6 text-edu-primary" />
                            </div>
                            <h3 className="text-sm font-medium mb-2">Upload Job Descriptions</h3>
                            <p className="text-xs text-gray-500 mb-4">
                              Upload CSV, JSON or Excel files with job listings data
                            </p>
                            <Button 
                              size="sm"
                              disabled={uploadingJob}
                              onClick={simulateJobUpload}
                            >
                              {uploadingJob ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Uploading...
                                </>
                              ) : (
                                'Select Files'
                              )}
                            </Button>
                          </div>
                          
                          <div className="bg-muted rounded-lg p-4">
                            <h4 className="text-sm font-medium mb-2">Job Data Sources</h4>
                            <ul className="text-xs text-gray-600 space-y-2">
                              <li className="flex items-center">
                                <div className="h-2 w-2 rounded-full bg-edu-primary mr-2"></div>
                                <span>LinkedIn: 235 jobs</span>
                              </li>
                              <li className="flex items-center">
                                <div className="h-2 w-2 rounded-full bg-edu-primary mr-2"></div>
                                <span>Naukri: 156 jobs</span>
                              </li>
                              <li className="flex items-center">
                                <div className="h-2 w-2 rounded-full bg-edu-primary mr-2"></div>
                                <span>Indeed: 82 jobs</span>
                              </li>
                              <li className="flex items-center">
                                <div className="h-2 w-2 rounded-full bg-edu-primary mr-2"></div>
                                <span>Manual Entry: 50 jobs</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="bg-yellow-50 rounded-lg p-4 flex items-start">
                            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium text-yellow-800 mb-1">Data Processing Note</h4>
                              <p className="text-xs text-yellow-700">
                                Uploaded job data will be processed using NLP to extract skills, requirements, and trends.
                                This may take a few minutes for large datasets.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Job Market Insights</CardTitle>
                        <CardDescription>
                          Top skills in demand
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">React</span>
                              <span className="text-xs font-medium">95%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-edu-primary rounded-full" style={{ width: '95%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">AWS</span>
                              <span className="text-xs font-medium">87%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-edu-primary rounded-full" style={{ width: '87%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">Python</span>
                              <span className="text-xs font-medium">84%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-edu-primary rounded-full" style={{ width: '84%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">Machine Learning</span>
                              <span className="text-xs font-medium">76%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-edu-primary rounded-full" style={{ width: '76%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">Docker</span>
                              <span className="text-xs font-medium">72%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-edu-primary rounded-full" style={{ width: '72%' }}></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Curricula Tab */}
              <TabsContent value="curricula">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <CardTitle>Standard Curricula</CardTitle>
                            <CardDescription>
                              Manage standard curriculum templates
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Search curricula..."
                                className="pl-9 w-full md:w-60"
                              />
                            </div>
                            <Button variant="outline">
                              <Download className="mr-2 h-4 w-4" />
                              Export
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b bg-muted/50 font-medium">
                                  <th className="py-3 px-4 text-left">Curriculum</th>
                                  <th className="py-3 px-4 text-left">Source</th>
                                  <th className="py-3 px-4 text-left">Date Added</th>
                                  <th className="py-3 px-4 text-left">Skills</th>
                                  <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {mockCurricula.map((curriculum, index) => (
                                  <tr key={index} className="border-b">
                                    <td className="py-3 px-4 font-medium">{curriculum.name || curriculum.title}</td>
                                    <td className="py-3 px-4">{curriculum.source}</td>
                                    <td className="py-3 px-4">{curriculum.dateAdded}</td>
                                    <td className="py-3 px-4">{curriculum.skillsCount} skills</td>
                                    <td className="py-3 px-4 text-right">
                                      <Button variant="ghost" size="sm">
                                        View
                                      </Button>
                                      <Button variant="ghost" size="sm" className="text-red-600">
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="text-sm text-muted-foreground">
                          Showing 5 of 45 curricula
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" disabled>
                            Previous
                          </Button>
                          <Button variant="outline" size="sm">
                            Next
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Upload Standard Curriculum</CardTitle>
                        <CardDescription>
                          Add new standard curriculum templates
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="border-2 border-dashed rounded-lg p-6 text-center">
                            <div className="mx-auto h-12 w-12 rounded-full bg-edu-light flex items-center justify-center mb-4">
                              <Upload className="h-6 w-6 text-edu-primary" />
                            </div>
                            <h3 className="text-sm font-medium mb-2">Upload Curriculum</h3>
                            <p className="text-xs text-gray-500 mb-4">
                              Upload PDF or text files with curriculum content
                            </p>
                            <Button 
                              size="sm"
                              disabled={uploadingCurriculum}
                              onClick={simulateCurriculumUpload}
                            >
                              {uploadingCurriculum ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Uploading...
                                </>
                              ) : (
                                'Select Files'
                              )}
                            </Button>
                          </div>
                          
                          <div>
                            <Label htmlFor="curriculum-name" className="text-xs">Curriculum Name</Label>
                            <Input id="curriculum-name" placeholder="e.g., Computer Science - University Name" className="mt-1" />
                          </div>
                          
                          <div>
                            <Label htmlFor="curriculum-description" className="text-xs">Description</Label>
                            <textarea 
                              id="curriculum-description" 
                              placeholder="Brief description of the curriculum" 
                              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]"
                            />
                          </div>
                          
                          <div className="bg-yellow-50 rounded-lg p-4 flex items-start">
                            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium text-yellow-800 mb-1">Important Note</h4>
                              <p className="text-xs text-yellow-700">
                                Standard curricula are used as reference templates for comparison with user-uploaded 
                                curricula. Ensure they contain comprehensive skill information.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Curriculum Stats</CardTitle>
                        <CardDescription>
                          Overview of curriculum coverage
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">Computer Science</span>
                              <span className="text-xs font-medium">14 curricula</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-edu-primary rounded-full" style={{ width: '85%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">Data Science</span>
                              <span className="text-xs font-medium">8 curricula</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-edu-primary rounded-full" style={{ width: '65%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">Information Technology</span>
                              <span className="text-xs font-medium">12 curricula</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-edu-primary rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">Software Engineering</span>
                              <span className="text-xs font-medium">7 curricula</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-edu-primary rounded-full" style={{ width: '60%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">Artificial Intelligence</span>
                              <span className="text-xs font-medium">4 curricula</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-edu-primary rounded-full" style={{ width: '40%' }}></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>
                      Configure system parameters and AI models
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">AI Configuration</h3>
                        
                        <div>
                          <Label htmlFor="ai-model">NLP Model Selection</Label>
                          <div className="relative mt-1">
                            <select
                              id="ai-model"
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm appearance-none pr-10"
                            >
                              <option value="gpt-4">GPT-4 (Recommended)</option>
                              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                              <option value="cohere">Cohere Command</option>
                              <option value="bert">BERT Custom Fine-tuned</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="extraction-threshold">Skill Extraction Threshold</Label>
                          <div className="flex items-center mt-1">
                            <input
                              type="range"
                              id="extraction-threshold"
                              min="0"
                              max="1"
                              step="0.1"
                              defaultValue="0.7"
                              className="w-full"
                            />
                            <span className="ml-2 text-sm">0.7</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Higher values result in more precise but fewer extracted skills
                          </p>
                        </div>
                        
                        <div>
                          <Label htmlFor="api-keys">OpenAI API Key</Label>
                          <Input
                            id="api-keys"
                            type="password"
                            placeholder="sk-..."
                            className="mt-1"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Required for GPT-4 and GPT-3.5 Turbo models
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Data Settings</h3>
                        
                        <div>
                          <Label htmlFor="job-refresh">Job Data Refresh Interval</Label>
                          <div className="relative mt-1">
                            <select
                              id="job-refresh"
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm appearance-none pr-10"
                            >
                              <option value="daily">Daily</option>
                              <option value="weekly" selected>Weekly</option>
                              <option value="monthly">Monthly</option>
                              <option value="quarterly">Quarterly</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="data-retention">Data Retention Period</Label>
                          <div className="relative mt-1">
                            <select
                              id="data-retention"
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm appearance-none pr-10"
                            >
                              <option value="30">30 days</option>
                              <option value="60">60 days</option>
                              <option value="90" selected>90 days</option>
                              <option value="180">180 days</option>
                              <option value="365">1 year</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="anonymize-data"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <Label htmlFor="anonymize-data">Anonymize User Data in Reports</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="backup"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <Label htmlFor="backup">Enable Automatic Backups</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-4">
                    <Button variant="outline">Reset to Defaults</Button>
                    <Button>Save Settings</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </Layout>
  );
};

export default AdminPanelPage;
