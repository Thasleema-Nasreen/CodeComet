
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
  BookOpen,
  Camera,
  Check,
  Clock,
  Edit,
  FileText,
  Loader2,
  LucideIcon,
  MoreHorizontal,
  Pencil,
  Save,
  Settings,
  Shield,
  User,
  X,
  Award
} from 'lucide-react';

import { getSkillCategories, trackSkillImprovements, updateUserProfile } from '@/services/api';
import { SkillCategory, Skill } from '@/services/mockData';

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingSkill, setEditingSkill] = useState<string | null>(null);
  const [savingSkill, setSavingSkill] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    avatarUrl: '',
    university: 'Demo University',
    major: 'Computer Science',
    graduationYear: '2023',
    bio: 'Computer Science student passionate about software development and AI.'
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user) {
      setProfileData({
        ...profileData,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl || ''
      });
    }
    
    const fetchSkillData = async () => {
      try {
        setLoading(true);
        const skills = await getSkillCategories();
        setSkillCategories(skills);
      } catch (error) {
        console.error('Error fetching skill data:', error);
        toast({
          title: "Error",
          description: "Failed to load skill data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchSkillData();
  }, [isAuthenticated, navigate, toast, user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const saveProfile = async () => {
    try {
      setEditingProfile(false);
      await updateUserProfile(profileData);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const updateSkillLevel = async (skillId: string, newLevel: string) => {
    try {
      setSavingSkill(true);
      await trackSkillImprovements(skillId, newLevel);
      
      // Update local state
      const updatedCategories = skillCategories.map(category => {
        const updatedSkills = category.skills.map(skill => {
          if (skill.id === skillId) {
            return { ...skill, level: newLevel as 'beginner' | 'intermediate' | 'advanced' };
          }
          return skill;
        });
        return { ...category, skills: updatedSkills };
      });
      
      setSkillCategories(updatedCategories);
      setEditingSkill(null);
      
      toast({
        title: "Skill Updated",
        description: "Your skill level has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating skill:', error);
      toast({
        title: "Error",
        description: "Failed to update skill level. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSavingSkill(false);
    }
  };

  return (
    <Layout>
      <div className="py-8 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Your Profile
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your personal information and skill progress
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-edu-primary" />
            <span className="ml-3 text-lg text-gray-700">Loading profile data...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Personal Information</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setEditingProfile(!editingProfile)}
                      className="h-8 w-8 p-0"
                    >
                      {editingProfile ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                      <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200">
                        {profileData.avatarUrl ? (
                          <img
                            src={profileData.avatarUrl}
                            alt={profileData.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-edu-light text-edu-primary">
                            <User className="h-12 w-12" />
                          </div>
                        )}
                      </div>
                      {editingProfile && (
                        <button className="absolute bottom-0 right-0 bg-edu-primary text-white rounded-full p-1.5">
                          <Camera className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    
                    {editingProfile ? (
                      <Input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        className="mt-4 text-center text-lg font-medium"
                      />
                    ) : (
                      <h2 className="mt-4 text-lg font-medium">{profileData.name}</h2>
                    )}
                    
                    <p className="text-sm text-gray-600">{profileData.email}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs text-gray-500">University</Label>
                      {editingProfile ? (
                        <Input
                          type="text"
                          name="university"
                          value={profileData.university}
                          onChange={handleProfileChange}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-sm font-medium">{profileData.university}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label className="text-xs text-gray-500">Major</Label>
                      {editingProfile ? (
                        <Input
                          type="text"
                          name="major"
                          value={profileData.major}
                          onChange={handleProfileChange}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-sm font-medium">{profileData.major}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label className="text-xs text-gray-500">Graduation Year</Label>
                      {editingProfile ? (
                        <Input
                          type="text"
                          name="graduationYear"
                          value={profileData.graduationYear}
                          onChange={handleProfileChange}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-sm font-medium">{profileData.graduationYear}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label className="text-xs text-gray-500">Bio</Label>
                      {editingProfile ? (
                        <textarea
                          name="bio"
                          value={profileData.bio}
                          onChange={handleProfileChange}
                          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          rows={4}
                        />
                      ) : (
                        <p className="text-sm">{profileData.bio}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
                {editingProfile && (
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={saveProfile}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                )}
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button 
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => navigate('/upload-curriculum')}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Upload New Curriculum
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => navigate('/recommendations')}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      View Recommendations
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => navigate('/skill-gap')}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Skill Gap Analysis
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Account Settings
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Privacy Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your Skills Progress</CardTitle>
                  <CardDescription>
                    Track and update your skills as you learn
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all">
                    <TabsList className="mb-6">
                      <TabsTrigger value="all">All Skills</TabsTrigger>
                      <TabsTrigger value="learning">Currently Learning</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all">
                      <div className="space-y-6">
                        {skillCategories.map((category) => (
                          <div key={category.id}>
                            <h3 className="text-lg font-medium mb-3">{category.name}</h3>
                            <div className="space-y-3">
                              {category.skills.map((skill) => (
                                <div 
                                  key={skill.id} 
                                  className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                                >
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <div className="font-medium">{skill.name}</div>
                                      <div className="text-sm text-gray-600 flex items-center mt-1">
                                        {skill.inDemand && (
                                          <span className="flex items-center text-green-600 mr-3">
                                            <Check className="h-3 w-3 mr-1" />
                                            <span>In demand</span>
                                          </span>
                                        )}
                                        <span>Current level: </span>
                                        {editingSkill === skill.id ? (
                                          <div className="ml-2 flex space-x-2">
                                            {(['beginner', 'intermediate', 'advanced'] as const).map(level => (
                                              <button
                                                key={level}
                                                onClick={() => !savingSkill && updateSkillLevel(skill.id, level)}
                                                className={`text-xs px-2 py-0.5 rounded-md ${
                                                  skill.level === level
                                                    ? 'bg-edu-primary text-white'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                                disabled={savingSkill}
                                              >
                                                {level.charAt(0).toUpperCase() + level.slice(1)}
                                              </button>
                                            ))}
                                            {savingSkill ? (
                                              <Loader2 className="h-4 w-4 animate-spin ml-2" />
                                            ) : (
                                              <button
                                                onClick={() => setEditingSkill(null)}
                                                className="text-xs text-gray-500 hover:text-gray-700"
                                              >
                                                <X className="h-4 w-4" />
                                              </button>
                                            )}
                                          </div>
                                        ) : (
                                          <span 
                                            className="font-medium ml-1 cursor-pointer hover:underline"
                                            onClick={() => setEditingSkill(skill.id)}
                                          >
                                            {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <div className={`text-xs px-2 py-1 rounded-full ${
                                        skill.importance === 'critical' ? 'bg-red-100 text-red-800' :
                                        skill.importance === 'high' ? 'bg-orange-100 text-orange-800' :
                                        skill.importance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-blue-100 text-blue-800'
                                      }`}>
                                        {skill.importance}
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        onClick={() => setEditingSkill(skill.id === editingSkill ? null : skill.id)}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="learning">
                      <div className="space-y-4">
                        {skillCategories.map((category) => {
                          const learningSkills = category.skills.filter(
                            skill => skill.level === 'beginner' || skill.level === 'intermediate'
                          );
                          
                          if (learningSkills.length === 0) return null;
                          
                          return (
                            <div key={category.id}>
                              <h3 className="text-lg font-medium mb-3">{category.name}</h3>
                              <div className="space-y-3">
                                {learningSkills.map((skill) => (
                                  <div 
                                    key={skill.id} 
                                    className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                                  >
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <div className="font-medium">{skill.name}</div>
                                        <div className="text-sm text-gray-600 flex items-center mt-1">
                                          <Clock className="h-3 w-3 mr-1" />
                                          <span>Learning in progress - </span>
                                          <span 
                                            className="font-medium ml-1 cursor-pointer hover:underline"
                                            onClick={() => setEditingSkill(skill.id)}
                                          >
                                            {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-8 w-8 p-0"
                                          onClick={() => setEditingSkill(skill.id === editingSkill ? null : skill.id)}
                                        >
                                          <Edit className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                    
                                    {editingSkill === skill.id && (
                                      <div className="mt-3 pt-3 border-t flex items-center">
                                        <span className="text-sm mr-3">Update level:</span>
                                        <div className="flex space-x-2">
                                          {(['beginner', 'intermediate', 'advanced'] as const).map(level => (
                                            <button
                                              key={level}
                                              onClick={() => !savingSkill && updateSkillLevel(skill.id, level)}
                                              className={`text-xs px-2 py-1 rounded-md ${
                                                skill.level === level
                                                  ? 'bg-edu-primary text-white'
                                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                              }`}
                                              disabled={savingSkill}
                                            >
                                              {level.charAt(0).toUpperCase() + level.slice(1)}
                                            </button>
                                          ))}
                                          {savingSkill ? (
                                            <Loader2 className="h-4 w-4 animate-spin ml-2" />
                                          ) : (
                                            <button
                                              onClick={() => setEditingSkill(null)}
                                              className="text-xs text-gray-500 hover:text-gray-700"
                                            >
                                              <X className="h-4 w-4" />
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                        
                        {skillCategories.every(category => 
                          !category.skills.some(skill => 
                            skill.level === 'beginner' || skill.level === 'intermediate'
                          )
                        ) && (
                          <div className="text-center py-12">
                            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                              <BookOpen className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Skills In Progress</h3>
                            <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
                              You don't have any skills marked as currently learning. Visit the recommendations
                              page to find courses and start learning new skills.
                            </p>
                            <Button 
                              variant="outline"
                              onClick={() => navigate('/recommendations')}
                            >
                              Find Skills to Learn
                            </Button>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="completed">
                      <div className="space-y-4">
                        {skillCategories.map((category) => {
                          const completedSkills = category.skills.filter(
                            skill => skill.level === 'advanced'
                          );
                          
                          if (completedSkills.length === 0) return null;
                          
                          return (
                            <div key={category.id}>
                              <h3 className="text-lg font-medium mb-3">{category.name}</h3>
                              <div className="space-y-3">
                                {completedSkills.map((skill) => (
                                  <div 
                                    key={skill.id} 
                                    className="border rounded-lg p-3 bg-green-50 hover:bg-green-100 transition-colors"
                                  >
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <div className="font-medium">{skill.name}</div>
                                        <div className="text-sm text-gray-600 flex items-center mt-1">
                                          <Check className="h-3 w-3 text-green-600 mr-1" />
                                          <span className="text-green-600 font-medium">Advanced level achieved</span>
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <div className={`text-xs px-2 py-1 rounded-full ${
                                          skill.importance === 'critical' ? 'bg-red-100 text-red-800' :
                                          skill.importance === 'high' ? 'bg-orange-100 text-orange-800' :
                                          skill.importance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                          'bg-blue-100 text-blue-800'
                                        }`}>
                                          {skill.importance}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                        
                        {skillCategories.every(category => 
                          !category.skills.some(skill => skill.level === 'advanced')
                        ) && (
                          <div className="text-center py-12">
                            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                              <Award className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Completed Skills Yet</h3>
                            <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
                              You haven't marked any skills as advanced level yet. Keep learning and update your skill 
                              levels as you progress.
                            </p>
                            <Button 
                              variant="outline"
                              onClick={() => navigate('/skill-gap')}
                            >
                              View Skill Gap Analysis
                            </Button>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Learning Activity</CardTitle>
                  <CardDescription>
                    Your recent learning progress and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-2 border-edu-primary pl-4 pb-4 relative">
                      <div className="absolute w-3 h-3 rounded-full bg-edu-primary -left-[7px] top-0"></div>
                      <div className="text-sm text-gray-500 mb-1">Today</div>
                      <p className="font-medium">Updated skill level: JavaScript to Intermediate</p>
                    </div>
                    
                    <div className="border-l-2 border-edu-primary pl-4 pb-4 relative">
                      <div className="absolute w-3 h-3 rounded-full bg-edu-primary -left-[7px] top-0"></div>
                      <div className="text-sm text-gray-500 mb-1">Yesterday</div>
                      <p className="font-medium">Uploaded new curriculum document</p>
                    </div>
                    
                    <div className="border-l-2 border-edu-primary pl-4 pb-4 relative">
                      <div className="absolute w-3 h-3 rounded-full bg-edu-primary -left-[7px] top-0"></div>
                      <div className="text-sm text-gray-500 mb-1">3 days ago</div>
                      <p className="font-medium">Generated custom learning roadmap</p>
                    </div>
                    
                    <div className="border-l-2 border-edu-primary pl-4 relative">
                      <div className="absolute w-3 h-3 rounded-full bg-edu-primary -left-[7px] top-0"></div>
                      <div className="text-sm text-gray-500 mb-1">1 week ago</div>
                      <p className="font-medium">Completed Skill Gap Analysis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
