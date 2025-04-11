
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { 
  Award, BookText, FileBox, LineChart, BarChart4, GraduationCap, 
  Upload, Target, BookOpen, Lightbulb, PanelRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

import { getSkillGapAnalysis, getRecommendedCourses, getJobRoleRecommendations } from '@/services/api';
import { Course, JobRole } from '@/services/mockData';

interface SkillGapData {
  overallMatch: number;
  topMissingSkills: Array<{
    name: string;
    importance: string;
    difficulty: string;
    demand: number;
  }>;
  skillsByCategory: Array<{
    category: string;
    match: number;
    present: string[];
    missing: string[];
  }>;
}

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [skillGapData, setSkillGapData] = useState<SkillGapData | null>(null);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [jobRoles, setJobRoles] = useState<JobRole[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data concurrently
        const [skillGapResult, coursesResult, jobRolesResult] = await Promise.all([
          getSkillGapAnalysis(),
          getRecommendedCourses(),
          getJobRoleRecommendations()
        ]);
        
        setSkillGapData(skillGapResult);
        setRecommendedCourses(coursesResult.slice(0, 3)); // Just display top 3
        setJobRoles(jobRolesResult.slice(0, 3)); // Just display top 3
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [isAuthenticated, navigate, toast]);

  // Format date for last update
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Layout>
      <div className="py-8 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Welcome back, {user?.name || 'Student'}!
            </h1>
            <p className="mt-2 text-gray-600">
              Here's an overview of your skill analysis and recommendations
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/upload-curriculum')}
            >
              <Upload className="mr-2 h-4 w-4" />
              Update Curriculum
            </Button>
            <Button 
              onClick={() => navigate('/recommendations')}
            >
              View All Recommendations
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-96 animate-pulse">
            <div className="bg-gray-200 rounded-lg"></div>
            <div className="bg-gray-200 rounded-lg"></div>
            <div className="bg-gray-200 rounded-lg"></div>
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Skill Match</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{skillGapData?.overallMatch || 0}%</div>
                  <p className="text-xs text-muted-foreground">
                    Match to current job market
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Skills to Acquire</CardTitle>
                  <Lightbulb className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{skillGapData?.topMissingSkills.length || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Critical and high-importance skills
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recommended Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{recommendedCourses.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Based on your skill gaps
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
                  <FileBox className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-md font-medium">{formattedDate}</div>
                  <p className="text-xs text-muted-foreground">
                    Curriculum analysis
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Content */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="overview">
                  <LineChart className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="skills">
                  <BarChart4 className="h-4 w-4 mr-2" />
                  Skill Gaps
                </TabsTrigger>
                <TabsTrigger value="courses">
                  <BookText className="h-4 w-4 mr-2" />
                  Recommended Courses
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Skill Match Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Skill Match by Category</CardTitle>
                      <CardDescription>
                        Your curriculum's alignment with job market demands
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {skillGapData?.skillsByCategory.map((category, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium">{category.category}</div>
                              <div className="text-sm font-medium">{category.match}%</div>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  category.match >= 70 ? 'bg-green-500' : 
                                  category.match >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${category.match}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate('/skill-gap')}
                      >
                        View Detailed Analysis
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Top Courses */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Recommended Courses</CardTitle>
                      <CardDescription>
                        Based on your skill gaps
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recommendedCourses.map((course) => (
                          <div key={course.id} className="border-b pb-4 last:border-0 last:pb-0">
                            <div className="flex items-start">
                              <div className="h-10 w-10 rounded-md bg-gray-200 flex-shrink-0 overflow-hidden mr-3">
                                <img 
                                  src={course.image} 
                                  alt={course.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium line-clamp-1">{course.title}</h4>
                                <div className="flex items-center space-x-3 mt-1">
                                  <span className="text-xs bg-edu-light text-edu-primary px-2 py-0.5 rounded-full">
                                    {course.provider}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {course.duration}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate('/recommendations')}
                      >
                        View All Courses
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Career Match */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Potential Career Paths</CardTitle>
                      <CardDescription>
                        Job roles that match your skills and learning path
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {jobRoles.map((role) => (
                          <div key={role.id} className="border-b pb-4 last:border-0 last:pb-0">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="text-sm font-medium">{role.title}</h4>
                              <div className={`text-xs px-2 py-0.5 rounded-full ${
                                role.matchPercentage >= 70 ? 'bg-green-100 text-green-800' :
                                role.matchPercentage >= 50 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {role.matchPercentage}% match
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                              {role.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {role.requiredSkills.slice(0, 3).map((skill, i) => (
                                <span key={i} className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                                  {skill}
                                </span>
                              ))}
                              {role.requiredSkills.length > 3 && (
                                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                                  +{role.requiredSkills.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate('/recommendations')}
                      >
                        View All Career Paths
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-edu-light border-edu-primary">
                    <CardContent className="p-4 flex gap-3 items-center">
                      <div className="h-10 w-10 rounded-full bg-edu-primary flex items-center justify-center text-white">
                        <Upload className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">Upload Curriculum</h3>
                        <p className="text-xs text-gray-600 mt-1">Update your academic profile</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="shrink-0" 
                        onClick={() => navigate('/upload-curriculum')}
                      >
                        Go
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 flex gap-3 items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800">
                        <Target className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">Skill Gap Analysis</h3>
                        <p className="text-xs text-gray-600 mt-1">View your detailed analysis</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="shrink-0" 
                        onClick={() => navigate('/skill-gap')}
                      >
                        Go
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 flex gap-3 items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">Recommendations</h3>
                        <p className="text-xs text-gray-600 mt-1">View personalized suggestions</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="shrink-0" 
                        onClick={() => navigate('/recommendations')}
                      >
                        Go
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 flex gap-3 items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800">
                        <PanelRight className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">Learning Progress</h3>
                        <p className="text-xs text-gray-600 mt-1">Track your skill improvements</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="shrink-0" 
                        onClick={() => navigate('/profile')}
                      >
                        Go
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="skills" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Critical Skill Gaps</CardTitle>
                    <CardDescription>
                      Top skills you need to acquire for job readiness
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {skillGapData?.topMissingSkills.map((skill, i) => (
                        <div key={i} className="flex items-center">
                          <div className="w-40 md:w-48 shrink-0">
                            <h4 className="text-sm font-medium">{skill.name}</h4>
                            <div className="flex space-x-2 mt-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                skill.importance === 'critical' ? 'bg-red-100 text-red-800' :
                                skill.importance === 'high' ? 'bg-orange-100 text-orange-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {skill.importance}
                              </span>
                              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                                {skill.difficulty}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 ml-4">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-500">Demand</span>
                              <span className="text-xs font-medium">{skill.demand}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-edu-primary rounded-full"
                                style={{ width: `${skill.demand}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => navigate('/skill-gap')}
                      className="w-full"
                    >
                      View Full Skill Gap Analysis
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="courses" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedCourses.map((course) => (
                    <Card key={course.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription>
                          {course.provider} • {course.duration} • ${course.price}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">
                          {course.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {course.skillsCovered.map((skill, i) => (
                            <span key={i} className="text-xs bg-edu-light text-edu-primary px-2 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <div className="text-sm font-medium mr-2">{course.rating}</div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                          {course.badge && (
                            <div className={`text-xs px-2 py-1 rounded-full ${
                              course.badge === 'popular' ? 'bg-blue-100 text-blue-800' :
                              course.badge === 'trending' ? 'bg-purple-100 text-purple-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {course.badge === 'popular' ? 'Popular' : 
                               course.badge === 'trending' ? 'Trending' : 'Best Value'}
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <a 
                          href={course.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full"
                        >
                          <Button className="w-full">View Course</Button>
                        </a>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/recommendations')}
                    className="mx-auto"
                  >
                    View All Recommended Courses
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;
