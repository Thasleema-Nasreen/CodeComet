
import { 
  mockSkillCategories, 
  mockCourses, 
  mockRoadmap, 
  mockJobRoles,
  mockExtractedSkills,
  mockSkillGapData
} from './mockData';

// Helper to simulate API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all skill categories with skills
export const getSkillCategories = async () => {
  await delay(1000);
  return mockSkillCategories;
};

// Get recommended courses
export const getRecommendedCourses = async () => {
  await delay(1000);
  return mockCourses;
};

// Get learning roadmap
export const getLearningRoadmap = async () => {
  await delay(1000);
  return mockRoadmap;
};

// Get job role recommendations
export const getJobRoleRecommendations = async () => {
  await delay(1500);
  return mockJobRoles;
};

// Simulate curriculum upload and analysis
export const uploadAndAnalyzeCurriculum = async (file: File) => {
  await delay(2000);
  console.log('Uploaded file:', file.name);
  return mockExtractedSkills;
};

// Get skill gap analysis data
export const getSkillGapAnalysis = async () => {
  await delay(1500);
  return mockSkillGapData;
};

// Update user profile
export const updateUserProfile = async (userData: any) => {
  await delay(1000);
  console.log('Updated user profile:', userData);
  return { success: true, message: 'Profile updated successfully' };
};

// Save learning progress
export const saveUserProgress = async (progress: any) => {
  await delay(800);
  console.log('Saved user progress:', progress);
  return { success: true };
};

// Generate a new roadmap based on selected skills
export const generateCustomRoadmap = async (selectedSkills: string[], duration: string) => {
  await delay(2000);
  console.log('Generating roadmap for skills:', selectedSkills, 'Duration:', duration);
  
  // Create a customized version of the roadmap based on selected skills
  const customRoadmap = {
    ...mockRoadmap,
    skillGoals: selectedSkills,
    duration: duration as '3-month' | '6-month' | '12-month'
  };
  
  return customRoadmap;
};

// Track skill improvements
export const trackSkillImprovements = async (skillId: string, newLevel: string) => {
  await delay(500);
  console.log('Tracking skill improvement:', skillId, 'New level:', newLevel);
  return { success: true, message: 'Skill updated successfully' };
};
