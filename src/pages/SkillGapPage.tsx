
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  FileText,
  LayoutGrid,
  Lightbulb,
  LineChart,
  List,
  Loader2,
  BarChart3,
  Target,
  X,
  BookText
} from 'lucide-react';

import { getSkillGapAnalysis } from '@/services/api';

interface SkillGapCategory {
  category: string;
  match: number;
  present: string[];
  missing: string[];
}

interface TopMissingSkill {
  name: string;
  importance: string;
  difficulty: string;
  demand: number;
}

interface SkillGapData {
  overallMatch: number;
  skillsByCategory: SkillGapCategory[];
  topMissingSkills: TopMissingSkill[];
}

const SkillGapPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SkillGapData | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const fetchSkillGapData = async () => {
      try {
        setLoading(true);
        const result = await getSkillGapAnalysis();
        setData(result);
        
        // Expand the first category by default
        if (result.skillsByCategory.length > 0) {
          setExpandedCategories([result.skillsByCategory[0].category]);
        }
      } catch (error) {
        console.error('Error fetching skill gap data:', error);
        toast({
          title: "Error",
          description: "Failed to load skill gap analysis. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchSkillGapData();
  }, [isAuthenticated, navigate, toast]);

  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter(c => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  const getMatchColor = (match: number) => {
    if (match >= 70) return 'bg-green-500';
    if (match >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const downloadAnalysisPDF = () => {
    toast({
      title: "Download Started",
      description: "Your skill gap analysis report is being generated for download.",
    });
    
    // In a real application, this would trigger a PDF generation and download
    setTimeout(() => {
      toast({
        title: "Feature Coming Soon",
        description: "PDF download functionality will be available in the next update.",
      });
    }, 2000);
  };

  return (
    <Layout>
      <div className="py-8 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Skill Gap Analysis
            </h1>
            <p className="mt-2 text-gray-600">
              Detailed analysis of your curriculum compared to job market demands
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Button 
              variant="outline" 
              onClick={downloadAnalysisPDF}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button onClick={() => navigate('/recommendations')}>
              View Recommendations
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-edu-primary" />
            <span className="ml-3 text-lg text-gray-700">Loading analysis...</span>
          </div>
        ) : data ? (
          <>
            {/* Summary Card */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">Overall Skill Match</h2>
                    <div className="flex items-center mb-4">
                      <div className="relative h-28 w-28 flex items-center justify-center rounded-full border-8 border-gray-200">
                        <div 
                          className="absolute h-full w-full rounded-full border-8 border-transparent"
                          style={{
                            background: `conic-gradient(${getMatchColor(data.overallMatch)} ${data.overallMatch}%, transparent 0)`,
                            transform: 'rotate(-90deg)',
                            borderRadius: '50%'
                          }}
                        />
                        <span className="text-2xl font-bold z-10">{data.overallMatch}%</span>
                      </div>
                      <div className="ml-6">
                        {data.overallMatch >= 70 ? (
                          <div className="flex items-center space-x-2">
                            <div className="h-4 w-4 rounded-full bg-green-500" />
                            <span className="font-medium">Strong match with job market</span>
                          </div>
                        ) : data.overallMatch >= 40 ? (
                          <div className="flex items-center space-x-2">
                            <div className="h-4 w-4 rounded-full bg-yellow-500" />
                            <span className="font-medium">Moderate match with job market</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <div className="h-4 w-4 rounded-full bg-red-500" />
                            <span className="font-medium">Significant skill gaps detected</span>
                          </div>
                        )}
                        
                        <p className="text-gray-600 mt-2">
                          Your curriculum covers {data.overallMatch}% of skills required in the current job market. 
                          {data.overallMatch < 60 && " Significant opportunities for improvement exist."}
                        </p>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3 mt-8">Analysis Summary</h3>
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                        <p className="text-gray-700">
                          <span className="font-medium">Strengths: </span>
                          Strong foundation in {data.skillsByCategory.find(c => c.match >= 65)?.category || 'Core Competencies'} with {
                            data.skillsByCategory.filter(c => c.match >= 50).length
                          } skill categories having more than 50% match.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                        <p className="text-gray-700">
                          <span className="font-medium">Gaps: </span>
                          {data.skillsByCategory.filter(c => c.match < 40).length} skill categories 
                          have significant gaps, particularly in {
                            data.skillsByCategory.find(c => c.match < 40)?.category || 'Modern Technologies'
                          }.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <Lightbulb className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                        <p className="text-gray-700">
                          <span className="font-medium">Recommendation: </span>
                          Focus on the {data.topMissingSkills.length} critical skills identified below to 
                          significantly improve your job readiness.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-3">Top Skills to Acquire</h3>
                    <div className="space-y-3">
                      {data.topMissingSkills.slice(0, 5).map((skill, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium mr-2">
                              {index + 1}
                            </div>
                            <span className="font-medium">{skill.name}</span>
                          </div>
                          <div className={`text-xs px-2 py-0.5 rounded-full ${getImportanceColor(skill.importance)}`}>
                            {skill.importance}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-medium mb-3">Quick Actions</h4>
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-left"
                          onClick={() => navigate('/recommendations')}
                        >
                          <BookText className="h-4 w-4 mr-2" />
                          View Course Recommendations
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-left"
                          onClick={() => navigate('/recommendations')}
                        >
                          <Target className="h-4 w-4 mr-2" />
                          Generate Learning Roadmap
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis Tabs */}
            <Tabs defaultValue="category" className="w-full mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <TabsList className="mb-4 sm:mb-0">
                  <TabsTrigger value="category">
                    <LayoutGrid className="h-4 w-4 mr-2" />
                    By Category
                  </TabsTrigger>
                  <TabsTrigger value="missing">
                    <List className="h-4 w-4 mr-2" />
                    Missing Skills
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">View:</span>
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="h-8 w-8 p-0"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <TabsContent value="category">
                <Card>
                  <CardHeader>
                    <CardTitle>Skill Match by Category</CardTitle>
                    <CardDescription>
                      Detailed breakdown of your skills match by category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {viewMode === 'grid' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.skillsByCategory.map((category, index) => (
                          <Card key={index} className="border shadow-sm">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-base">{category.category}</CardTitle>
                                <div className={`text-xs px-2 py-0.5 rounded-full ${
                                  category.match >= 70 ? 'bg-green-100 text-green-800' :
                                  category.match >= 40 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {category.match}% match
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-2">
                              <div className="mb-4">
                                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                  <span>Match with Job Market</span>
                                  <span>{category.match}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${getMatchColor(category.match)} rounded-full`}
                                    style={{ width: `${category.match}%` }}
                                  />
                                </div>
                              </div>
                              
                              <div className="space-y-4">
                                <div>
                                  <h4 className="text-sm font-medium flex items-center">
                                    <Check className="h-4 w-4 text-green-600 mr-1" />
                                    Present in Curriculum ({category.present.length})
                                  </h4>
                                  <div className="mt-2 flex flex-wrap gap-1">
                                    {category.present.map((skill, i) => (
                                      <span key={i} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium flex items-center">
                                    <X className="h-4 w-4 text-red-600 mr-1" />
                                    Missing Skills ({category.missing.length})
                                  </h4>
                                  <div className="mt-2 flex flex-wrap gap-1">
                                    {category.missing.map((skill, i) => (
                                      <span key={i} className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {data.skillsByCategory.map((category, index) => (
                          <div key={index} className="border rounded-lg overflow-hidden">
                            <div 
                              className="flex items-center justify-between bg-gray-50 p-4 cursor-pointer"
                              onClick={() => toggleCategory(category.category)}
                            >
                              <div className="flex items-center">
                                {expandedCategories.includes(category.category) ? (
                                  <ChevronDown className="h-5 w-5 text-gray-500 mr-2" />
                                ) : (
                                  <ChevronRight className="h-5 w-5 text-gray-500 mr-2" />
                                )}
                                <h3 className="font-medium">{category.category}</h3>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-1">
                                  <span className="text-sm font-medium">{category.match}%</span>
                                  <div className="h-2 w-10 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full ${getMatchColor(category.match)} rounded-full`}
                                      style={{ width: `${category.match}%` }}
                                    />
                                  </div>
                                </div>
                                <div className={`text-xs px-2 py-0.5 rounded-full ${
                                  category.match >= 70 ? 'bg-green-100 text-green-800' :
                                  category.match >= 40 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {category.match >= 70 ? 'Strong' : 
                                   category.match >= 40 ? 'Moderate' : 'Weak'}
                                </div>
                              </div>
                            </div>
                            
                            {expandedCategories.includes(category.category) && (
                              <div className="p-4 border-t">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="text-sm font-medium mb-2 flex items-center">
                                      <Check className="h-4 w-4 text-green-600 mr-1" />
                                      Present in Curriculum
                                    </h4>
                                    <div className="space-y-2">
                                      {category.present.map((skill, i) => (
                                        <div key={i} className="flex items-center bg-green-50 p-2 rounded-lg">
                                          <Check className="h-4 w-4 text-green-600 mr-2" />
                                          <span className="text-sm">{skill}</span>
                                        </div>
                                      ))}
                                      {category.present.length === 0 && (
                                        <p className="text-sm text-gray-500 italic">No skills found in this category</p>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="text-sm font-medium mb-2 flex items-center">
                                      <X className="h-4 w-4 text-red-600 mr-1" />
                                      Missing Skills
                                    </h4>
                                    <div className="space-y-2">
                                      {category.missing.map((skill, i) => (
                                        <div key={i} className="flex items-center bg-red-50 p-2 rounded-lg">
                                          <X className="h-4 w-4 text-red-600 mr-2" />
                                          <span className="text-sm">{skill}</span>
                                        </div>
                                      ))}
                                      {category.missing.length === 0 && (
                                        <p className="text-sm text-gray-500 italic">No missing skills in this category</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="missing">
                <Card>
                  <CardHeader>
                    <CardTitle>Missing Skills Analysis</CardTitle>
                    <CardDescription>
                      Critical skills that are missing from your curriculum
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {viewMode === 'grid' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.topMissingSkills.map((skill, index) => (
                          <Card key={index} className="border shadow-sm">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">{skill.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="flex flex-wrap gap-2 mb-3">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${getImportanceColor(skill.importance)}`}>
                                  {skill.importance} importance
                                </span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(skill.difficulty)}`}>
                                  {skill.difficulty} difficulty
                                </span>
                              </div>
                              
                              <div className="mt-3">
                                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                  <span>Market Demand</span>
                                  <span>{skill.demand}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-edu-primary rounded-full"
                                    style={{ width: `${skill.demand}%` }}
                                  />
                                </div>
                              </div>
                              
                              <div className="mt-4 pt-3 border-t">
                                <Button 
                                  variant="outline" 
                                  className="w-full"
                                  onClick={() => navigate('/recommendations')}
                                >
                                  Find Courses
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium">Skill</th>
                              <th className="text-left py-3 px-4 font-medium">Importance</th>
                              <th className="text-left py-3 px-4 font-medium">Difficulty</th>
                              <th className="text-left py-3 px-4 font-medium">Market Demand</th>
                              <th className="text-right py-3 px-4 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.topMissingSkills.map((skill, index) => (
                              <tr key={index} className="border-b">
                                <td className="py-3 px-4 font-medium">{skill.name}</td>
                                <td className="py-3 px-4">
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${getImportanceColor(skill.importance)}`}>
                                    {skill.importance}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(skill.difficulty)}`}>
                                    {skill.difficulty}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center">
                                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
                                      <div 
                                        className="h-full bg-edu-primary rounded-full"
                                        style={{ width: `${skill.demand}%` }}
                                      />
                                    </div>
                                    <span className="text-xs font-medium">{skill.demand}%</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <Button 
                                    size="sm"
                                    variant="outline"
                                    onClick={() => navigate('/recommendations')}
                                  >
                                    Find Courses
                                  </Button>
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
            </Tabs>
            
            {/* Action Card */}
            <Card className="bg-edu-light">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold text-edu-dark">Ready to bridge your skill gaps?</h3>
                    <p className="text-edu-dark/80 max-w-xl">
                      Based on your skill gap analysis, we've prepared personalized recommendations to help you 
                      become job-ready. Explore courses, certifications, and a learning roadmap tailored to your needs.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/upload-curriculum')}
                      className="bg-white"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Update Curriculum
                    </Button>
                    <Button onClick={() => navigate('/recommendations')}>
                      <ChevronRight className="mr-2 h-4 w-4" />
                      View Recommendations
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Analysis Available</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't find any curriculum analysis for your profile. Upload your curriculum to get started with the analysis.
              </p>
              <Button onClick={() => navigate('/upload-curriculum')}>
                Upload Curriculum
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default SkillGapPage;
