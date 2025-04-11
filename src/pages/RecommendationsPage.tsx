import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Filter,
  Globe,
  Loader2,
  MapPin,
  Clock,
  Star,
  ChevronDown,
  Search,
  SlidersHorizontal,
  X,
  Download
} from 'lucide-react';

import { 
  getRecommendedCourses, 
  getLearningRoadmap,
  getJobRoleRecommendations,
  generateCustomRoadmap,
} from '@/services/api';
import { Course, Roadmap, JobRole } from '@/services/mockData';

const RecommendationsPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [jobRoles, setJobRoles] = useState<JobRole[]>([]);
  
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string>('6-month');
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);
  
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [providers, setProviders] = useState<string[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const fetchRecommendationData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data concurrently
        const [coursesResult, roadmapResult, jobRolesResult] = await Promise.all([
          getRecommendedCourses(),
          getLearningRoadmap(),
          getJobRoleRecommendations()
        ]);
        
        setCourses(coursesResult);
        setRoadmap(roadmapResult);
        setJobRoles(jobRolesResult);
        
        // Extract unique providers for filtering
        const uniqueProviders = Array.from(new Set(coursesResult.map(course => course.provider)));
        setProviders(uniqueProviders);
        
      } catch (error) {
        console.error('Error fetching recommendation data:', error);
        toast({
          title: "Error",
          description: "Failed to load recommendations. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecommendationData();
  }, [isAuthenticated, navigate, toast]);

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const generateCustomizedRoadmap = async () => {
    if (selectedSkills.length === 0) {
      toast({
        title: "No Skills Selected",
        description: "Please select at least one skill for your customized roadmap.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setGeneratingRoadmap(true);
      const customRoadmap = await generateCustomRoadmap(selectedSkills, selectedDuration);
      setRoadmap(customRoadmap);
      
      toast({
        title: "Roadmap Generated",
        description: "Your customized learning roadmap has been created successfully.",
      });
    } catch (error) {
      console.error('Error generating roadmap:', error);
      toast({
        title: "Error",
        description: "Failed to generate custom roadmap. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setGeneratingRoadmap(false);
    }
  };

  const toggleProviderFilter = (provider: string) => {
    if (selectedProviders.includes(provider)) {
      setSelectedProviders(selectedProviders.filter(p => p !== provider));
    } else {
      setSelectedProviders([...selectedProviders, provider]);
    }
  };

  const resetFilters = () => {
    setSelectedProviders([]);
    setSearchQuery('');
  };

  const filteredCourses = courses.filter(course => {
    // Apply search filter
    const matchesSearch = searchQuery === '' || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skillsCovered.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Apply provider filter
    const matchesProvider = selectedProviders.length === 0 || selectedProviders.includes(course.provider);
    
    return matchesSearch && matchesProvider;
  });

  const allSkills = Array.from(
    new Set(courses.flatMap(course => course.skillsCovered))
  ).sort();

  return (
    <Layout>
      <div className="py-8 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Personalized Recommendations
            </h1>
            <p className="mt-2 text-gray-600">
              Tailored courses, learning roadmaps, and career suggestions
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={() => navigate('/skill-gap')}
              variant="outline"
            >
              Back to Skill Gap Analysis
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-edu-primary" />
            <span className="ml-3 text-lg text-gray-700">Loading recommendations...</span>
          </div>
        ) : (
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="courses">
                <BookOpen className="h-4 w-4 mr-2" />
                Recommended Courses
              </TabsTrigger>
              <TabsTrigger value="roadmap">
                <CalendarDays className="h-4 w-4 mr-2" />
                Learning Roadmap
              </TabsTrigger>
              <TabsTrigger value="career">
                <BriefcaseBusiness className="h-4 w-4 mr-2" />
                Career Paths
              </TabsTrigger>
            </TabsList>
            
            {/* Courses Tab */}
            <TabsContent value="courses">
              <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div>
                          <CardTitle>Recommended Courses</CardTitle>
                          <CardDescription>
                            Courses tailored to your skill gaps and learning needs
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <div className="relative w-full sm:w-auto">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                              type="text"
                              placeholder="Search courses..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full sm:w-60 pl-9 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                            />
                            {searchQuery && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                                onClick={() => setSearchQuery('')}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => setFiltersOpen(!filtersOpen)}
                            size="sm"
                            className="md:hidden"
                          >
                            <Filter className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {filteredCourses.map((course) => (
                            <div key={course.id} className="border rounded-lg overflow-hidden flex flex-col">
                              <div className="h-40 bg-gray-100 relative">
                                <img 
                                  src={course.image} 
                                  alt={course.title}
                                  className="w-full h-full object-cover"
                                />
                                {course.badge && (
                                  <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${
                                    course.badge === 'popular' ? 'bg-blue-100 text-blue-800' :
                                    course.badge === 'trending' ? 'bg-purple-100 text-purple-800' :
                                    'bg-green-100 text-green-800'
                                  }`}>
                                    {course.badge === 'popular' ? 'Popular' : 
                                    course.badge === 'trending' ? 'Trending' : 'Best Value'}
                                  </div>
                                )}
                              </div>
                              <div className="p-4 flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="font-semibold text-base line-clamp-1">{course.title}</h3>
                                  <div className="flex items-center ml-2 shrink-0">
                                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                    <span className="text-sm font-medium ml-1">{course.rating}</span>
                                  </div>
                                </div>
                                <div className="flex items-center mb-3">
                                  <Globe className="h-4 w-4 text-gray-500 mr-1" />
                                  <span className="text-sm text-gray-600">{course.provider}</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {course.skillsCovered.map((skill, i) => (
                                    <span key={i} className="text-xs bg-edu-light text-edu-primary px-2 py-0.5 rounded-full">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span>{course.duration}</span>
                                  </div>
                                  <div className="font-medium">{course.price}</div>
                                </div>
                              </div>
                              <div className="p-4 border-t">
                                <a 
                                  href={course.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="w-full"
                                >
                                  <Button className="w-full">View Course</Button>
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                            <Search className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-1">No courses found</h3>
                          <p className="text-sm text-gray-600 mb-4">
                            {searchQuery 
                              ? `No courses match "${searchQuery}"` 
                              : "No courses match your current filters"}
                          </p>
                          <Button variant="outline" onClick={resetFilters}>
                            Reset Filters
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                <div className={`md:block ${filtersOpen ? 'block' : 'hidden'}`}>
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Filters</CardTitle>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={resetFilters}
                          className="h-8 px-2 text-xs"
                        >
                          Reset
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Provider Filter */}
                        <div>
                          <h3 className="text-sm font-medium mb-3 flex items-center">
                            <Globe className="h-4 w-4 mr-2" />
                            Course Provider
                          </h3>
                          <div className="space-y-2">
                            {providers.map((provider) => (
                              <label key={provider} className="flex items-center">
                                <input 
                                  type="checkbox"
                                  checked={selectedProviders.includes(provider)}
                                  onChange={() => toggleProviderFilter(provider)}
                                  className="h-4 w-4 rounded border-gray-300 text-edu-primary focus:ring-edu-primary"
                                />
                                <span className="ml-2 text-sm">{provider}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Roadmap Tab */}
            <TabsContent value="roadmap">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Roadmap View */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>{roadmap?.title || 'Your Learning Roadmap'}</CardTitle>
                      <CardDescription>
                        A {roadmap?.duration || '6-month'} learning plan to bridge your skill gaps
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {roadmap ? (
                        <div className="space-y-8">
                          {/* Skill Goals */}
                          <div>
                            <h3 className="text-sm font-medium mb-3">Skills You'll Acquire</h3>
                            <div className="flex flex-wrap gap-2">
                              {roadmap.skillGoals.map((skill, index) => (
                                <div 
                                  key={index}
                                  className="px-3 py-1 rounded-full bg-edu-light text-edu-primary text-sm"
                                >
                                  {skill}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Roadmap Timeline */}
                          <div className="relative">
                            <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200"></div>
                            
                            <div className="space-y-12">
                              {roadmap.milestones.map((milestone, index) => (
                                <div key={index} className="relative">
                                  <div className="flex items-start">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center z-10 ${
                                      milestone.completed ? 'bg-green-100 text-green-600' : 'bg-edu-light text-edu-primary'
                                    }`}>
                                      {milestone.completed ? (
                                        <Check className="h-5 w-5" />
                                      ) : (
                                        <span className="text-sm font-medium">{index + 1}</span>
                                      )}
                                    </div>
                                    <div className="ml-6">
                                      <h3 className="text-lg font-medium">{milestone.title}</h3>
                                      <p className="text-sm text-gray-600 mt-1 mb-3">
                                        {milestone.description}
                                      </p>
                                      
                                      {/* Skills in this milestone */}
                                      <div className="mb-3">
                                        <h4 className="text-sm font-medium mb-2">Skills to learn:</h4>
                                        <div className="flex flex-wrap gap-1">
                                          {milestone.skills.map((skill, i) => (
                                            <span key={i} className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                                              {skill}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                      
                                      {/* Courses in this milestone */}
                                      <div className="space-y-3">
                                        <h4 className="text-sm font-medium">Recommended courses:</h4>
                                        {milestone.courses.map((course) => (
                                          <div key={course.id} className="border rounded-lg p-3 bg-gray-50">
                                            <div className="flex justify-between items-start mb-2">
                                              <h5 className="font-medium text-sm">{course.title}</h5>
                                              <div className="flex items-center ml-2">
                                                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                                                <span className="text-xs font-medium ml-1">{course.rating}</span>
                                              </div>
                                            </div>
                                            <div className="flex items-center text-xs text-gray-600 mb-2">
                                              <Globe className="h-3 w-3 mr-1" />
                                              <span>{course.provider}</span>
                                              <span className="mx-2">•</span>
                                              <Clock className="h-3 w-3 mr-1" />
                                              <span>{course.duration}</span>
                                              <span className="mx-2">•</span>
                                              <span className="font-medium">{course.price}</span>
                                            </div>
                                            <a 
                                              href={course.url} 
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-xs text-edu-primary hover:underline"
                                            >
                                              View course details →
                                            </a>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              
                              {/* Final step */}
                              <div className="relative">
                                <div className="flex items-start">
                                  <div className="h-10 w-10 rounded-full flex items-center justify-center z-10 bg-green-100 text-green-600">
                                    <Award className="h-5 w-5" />
                                  </div>
                                  <div className="ml-6">
                                    <h3 className="text-lg font-medium">Completion</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                      Congratulations! You've completed your learning roadmap and acquired all the target skills.
                                      You're now equipped with the skills needed for your target career paths.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                          <div className="h-16 w-16 rounded-full bg-edu-light flex items-center justify-center mb-4">
                            <CalendarDays className="h-8 w-8 text-edu-primary" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No Roadmap Found</h3>
                          <p className="text-sm text-gray-600 mb-6 text-center max-w-md">
                            We couldn't find a learning roadmap for your profile. Please customize your roadmap or contact support.
                          </p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0">
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download as PDF
                      </Button>
                      <Button>
                        <CalendarDays className="mr-2 h-4 w-4" />
                        Track Your Progress
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                {/* Roadmap Customization */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Customize Your Roadmap</CardTitle>
                      <CardDescription>
                        Select skills and timeframe for a personalized roadmap
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Duration Selection */}
                        <div>
                          <h3 className="text-sm font-medium mb-3">Learning Duration</h3>
                          <div className="flex space-x-2">
                            {['3-month', '6-month', '12-month'].map((duration) => (
                              <Button
                                key={duration}
                                variant={selectedDuration === duration ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedDuration(duration)}
                              >
                                {duration}
                              </Button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Skill Selection */}
                        <div>
                          <h3 className="text-sm font-medium mb-3">Select Skills to Focus On</h3>
                          <div className="h-64 overflow-y-auto pr-2 space-y-2">
                            {allSkills.map((skill, index) => (
                              <label key={index} className="flex items-center">
                                <input 
                                  type="checkbox"
                                  checked={selectedSkills.includes(skill)}
                                  onChange={() => handleSkillToggle(skill)}
                                  className="h-4 w-4 rounded border-gray-300 text-edu-primary focus:ring-edu-primary"
                                />
                                <span className="ml-2 text-sm">{skill}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        
                        {/* Selected Skills */}
                        <div>
                          <h3 className="text-sm font-medium mb-3">
                            Selected Skills ({selectedSkills.length})
                          </h3>
                          {selectedSkills.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {selectedSkills.map((skill, index) => (
                                <div 
                                  key={index}
                                  className="px-2 py-1 rounded-full bg-edu-light text-edu-primary text-xs flex items-center"
                                >
                                  {skill}
                                  <button
                                    onClick={() => handleSkillToggle(skill)}
                                    className="ml-1 h-4 w-4 rounded-full flex items-center justify-center hover:bg-edu-primary/10"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500 italic">
                              No skills selected yet
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full"
                        onClick={generateCustomizedRoadmap}
                        disabled={generatingRoadmap || selectedSkills.length === 0}
                      >
                        {generatingRoadmap ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          'Generate Custom Roadmap'
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Career Paths Tab */}
            <TabsContent value="career">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Career Paths</CardTitle>
                  <CardDescription>
                    Career options aligned with your skills and learning path
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobRoles.map((role) => (
                      <Card key={role.id} className="border shadow-sm">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-xl">{role.title}</CardTitle>
                            <div className={`text-xs px-2 py-1 rounded-full ${
                              role.matchPercentage >= 70 ? 'bg-green-100 text-green-800' :
                              role.matchPercentage >= 50 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {role.matchPercentage}% match
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-0">
                          <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                          
                          <div className="mb-4">
                            <h3 className="text-sm font-medium mb-2 flex items-center">
                              <SlidersHorizontal className="h-4 w-4 mr-2" />
                              Skills Match
                            </h3>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
                              <div 
                                className={`h-full rounded-full ${
                                  role.matchPercentage >= 70 ? 'bg-green-500' :
                                  role.matchPercentage >= 50 ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${role.matchPercentage}%` }}
                              />
                            </div>
                            <div className="flex justify-between items-center text-xs text-gray-500">
                              <span>Your match</span>
                              <span>{role.matchPercentage}%</span>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <h3 className="text-sm font-medium mb-2 flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                Average Salary Range
                              </h3>
                              <p className="text-sm font-medium">{role.averageSalary}</p>
                            </div>
                            
                            <div>
                              <h3 className="text-sm font-medium mb-2 flex items-center">
                                <Check className="h-4 w-4 mr-2" />
                                Required Skills
                              </h3>
                              <div className="flex flex-wrap gap-1">
                                {role.requiredSkills.map((skill, i) => (
                                  <span 
                                    key={i}
                                    className={`text-xs px-2 py-0.5 rounded-full ${
                                      selectedSkills.includes(skill) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between mt-6">
                          <Button 
                            variant="outline"
                            onClick={() => {
                              const missingSkills = role.requiredSkills.filter(
                                skill => !selectedSkills.includes(skill)
                              );
                              setSelectedSkills([...selectedSkills, ...missingSkills]);
                            }}
                          >
                            Add Missing Skills
                          </Button>
                          <Button>Explore Path</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
};

export default RecommendationsPage;
