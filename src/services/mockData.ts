
// Types
export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  importance: 'low' | 'medium' | 'high' | 'critical';
  inDemand: boolean;
  presentInCurriculum: boolean;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  url: string;
  description: string;
  duration: string;
  price: string;
  rating: number;
  skillsCovered: string[];
  image: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  badge?: 'popular' | 'trending' | 'best-value';
}

export interface Roadmap {
  id: string;
  title: string;
  duration: '3-month' | '6-month' | '12-month';
  skillGoals: string[];
  milestones: {
    title: string;
    description: string;
    courses: Course[];
    skills: string[];
    completed: boolean;
  }[];
}

export interface JobRole {
  id: string;
  title: string;
  description: string;
  averageSalary: string;
  requiredSkills: string[];
  matchPercentage: number;
}

// Mock Skill Categories with Skills
export const mockSkillCategories: SkillCategory[] = [
  {
    id: '1',
    name: 'Programming Languages',
    skills: [
      { id: '101', name: 'Python', level: 'intermediate', importance: 'critical', inDemand: true, presentInCurriculum: true },
      { id: '102', name: 'JavaScript', level: 'beginner', importance: 'high', inDemand: true, presentInCurriculum: false },
      { id: '103', name: 'Java', level: 'intermediate', importance: 'medium', inDemand: true, presentInCurriculum: true },
      { id: '104', name: 'C++', level: 'advanced', importance: 'low', inDemand: false, presentInCurriculum: true },
      { id: '105', name: 'R', level: 'beginner', importance: 'medium', inDemand: true, presentInCurriculum: false },
    ]
  },
  {
    id: '2',
    name: 'Web Development',
    skills: [
      { id: '201', name: 'HTML/CSS', level: 'intermediate', importance: 'high', inDemand: true, presentInCurriculum: true },
      { id: '202', name: 'React', level: 'beginner', importance: 'critical', inDemand: true, presentInCurriculum: false },
      { id: '203', name: 'Node.js', level: 'beginner', importance: 'high', inDemand: true, presentInCurriculum: false },
      { id: '204', name: 'Angular', level: 'beginner', importance: 'medium', inDemand: true, presentInCurriculum: false },
      { id: '205', name: 'Vue.js', level: 'beginner', importance: 'medium', inDemand: true, presentInCurriculum: false },
    ]
  },
  {
    id: '3',
    name: 'Data Science & Analytics',
    skills: [
      { id: '301', name: 'SQL', level: 'intermediate', importance: 'high', inDemand: true, presentInCurriculum: true },
      { id: '302', name: 'Data Visualization', level: 'beginner', importance: 'high', inDemand: true, presentInCurriculum: false },
      { id: '303', name: 'Machine Learning', level: 'beginner', importance: 'critical', inDemand: true, presentInCurriculum: false },
      { id: '304', name: 'Statistical Analysis', level: 'intermediate', importance: 'medium', inDemand: true, presentInCurriculum: true },
      { id: '305', name: 'Big Data Technologies', level: 'beginner', importance: 'medium', inDemand: true, presentInCurriculum: false },
    ]
  },
  {
    id: '4',
    name: 'DevOps & Cloud',
    skills: [
      { id: '401', name: 'Git', level: 'intermediate', importance: 'high', inDemand: true, presentInCurriculum: true },
      { id: '402', name: 'Docker', level: 'beginner', importance: 'high', inDemand: true, presentInCurriculum: false },
      { id: '403', name: 'AWS', level: 'beginner', importance: 'critical', inDemand: true, presentInCurriculum: false },
      { id: '404', name: 'CI/CD', level: 'beginner', importance: 'medium', inDemand: true, presentInCurriculum: false },
      { id: '405', name: 'Kubernetes', level: 'beginner', importance: 'medium', inDemand: true, presentInCurriculum: false },
    ]
  },
  {
    id: '5',
    name: 'Soft Skills',
    skills: [
      { id: '501', name: 'Communication', level: 'intermediate', importance: 'critical', inDemand: true, presentInCurriculum: true },
      { id: '502', name: 'Team Collaboration', level: 'intermediate', importance: 'high', inDemand: true, presentInCurriculum: true },
      { id: '503', name: 'Problem Solving', level: 'advanced', importance: 'critical', inDemand: true, presentInCurriculum: true },
      { id: '504', name: 'Project Management', level: 'beginner', importance: 'medium', inDemand: true, presentInCurriculum: false },
      { id: '505', name: 'Agile Methodologies', level: 'beginner', importance: 'high', inDemand: true, presentInCurriculum: false },
    ]
  }
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'React - The Complete Guide',
    provider: 'Udemy',
    url: 'https://www.udemy.com',
    description: 'Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!',
    duration: '40 hours',
    price: '$12.99',
    rating: 4.7,
    skillsCovered: ['React', 'JavaScript', 'Web Development'],
    image: 'https://ui-avatars.com/api/?name=React+Course&background=random',
    level: 'beginner',
    badge: 'popular'
  },
  {
    id: '2',
    title: 'The Complete Node.js Developer Course',
    provider: 'Udemy',
    url: 'https://www.udemy.com',
    description: 'Learn Node.js by building real-world applications with Node JS, Express, MongoDB, Jest, and more!',
    duration: '35 hours',
    price: '$9.99',
    rating: 4.6,
    skillsCovered: ['Node.js', 'JavaScript', 'Express', 'MongoDB'],
    image: 'https://ui-avatars.com/api/?name=Node+Course&background=random',
    level: 'intermediate'
  },
  {
    id: '3',
    title: 'Machine Learning A-Z™: Hands-On Python & R',
    provider: 'Udemy',
    url: 'https://www.udemy.com',
    description: 'Learn to create Machine Learning Algorithms in Python and R from two Data Science experts.',
    duration: '44 hours',
    price: '$14.99',
    rating: 4.5,
    skillsCovered: ['Machine Learning', 'Python', 'R', 'Data Science'],
    image: 'https://ui-avatars.com/api/?name=ML+Course&background=random',
    level: 'intermediate',
    badge: 'trending'
  },
  {
    id: '4',
    title: 'AWS Certified Solutions Architect',
    provider: 'A Cloud Guru',
    url: 'https://acloudguru.com',
    description: 'Everything you need to master Cloud Computing with Amazon Web Services.',
    duration: '27 hours',
    price: '$15.99',
    rating: 4.8,
    skillsCovered: ['AWS', 'Cloud Computing', 'DevOps'],
    image: 'https://ui-avatars.com/api/?name=AWS+Course&background=random',
    level: 'advanced'
  },
  {
    id: '5',
    title: 'Docker and Kubernetes: The Complete Guide',
    provider: 'Udemy',
    url: 'https://www.udemy.com',
    description: 'Build, test, and deploy Docker applications with Kubernetes while learning production-style development workflows.',
    duration: '22 hours',
    price: '$11.99',
    rating: 4.6,
    skillsCovered: ['Docker', 'Kubernetes', 'DevOps', 'CI/CD'],
    image: 'https://ui-avatars.com/api/?name=Docker+Course&background=random',
    level: 'intermediate',
    badge: 'best-value'
  },
  {
    id: '6',
    title: 'The Complete JavaScript Course',
    provider: 'Udemy',
    url: 'https://www.udemy.com',
    description: 'The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory.',
    duration: '69 hours',
    price: '$19.99',
    rating: 4.7,
    skillsCovered: ['JavaScript', 'ES6', 'Web Development'],
    image: 'https://ui-avatars.com/api/?name=JS+Course&background=random',
    level: 'beginner'
  },
  {
    id: '7',
    title: 'SQL - The Complete Developer\'s Guide',
    provider: 'Coursera',
    url: 'https://www.coursera.org',
    description: 'Master SQL Database Development for Web & Apps. Learn how to design, create and maintain SQL Databases.',
    duration: '20 hours',
    price: '$49',
    rating: 4.5,
    skillsCovered: ['SQL', 'Database Design', 'Data Management'],
    image: 'https://ui-avatars.com/api/?name=SQL+Course&background=random',
    level: 'intermediate'
  },
  {
    id: '8',
    title: 'Complete Guide to Product Management',
    provider: 'Udemy',
    url: 'https://www.udemy.com',
    description: 'Learn Product Management tools, frameworks, skills and insights needed to be a great Product Manager.',
    duration: '32 hours',
    price: '$12.99',
    rating: 4.4,
    skillsCovered: ['Project Management', 'Agile Methodologies', 'Product Management'],
    image: 'https://ui-avatars.com/api/?name=PM+Course&background=random',
    level: 'beginner'
  }
];

// Mock Roadmap
export const mockRoadmap: Roadmap = {
  id: '1',
  title: 'Full Stack Developer Roadmap',
  duration: '6-month',
  skillGoals: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git', 'Docker'],
  milestones: [
    {
      title: 'Frontend Fundamentals',
      description: 'Master JavaScript and React fundamentals',
      courses: mockCourses.filter(course => course.id === '1' || course.id === '6'),
      skills: ['JavaScript', 'React', 'HTML/CSS'],
      completed: false
    },
    {
      title: 'Backend Development',
      description: 'Learn backend development with Node.js and Express',
      courses: mockCourses.filter(course => course.id === '2'),
      skills: ['Node.js', 'Express', 'API Development'],
      completed: false
    },
    {
      title: 'Database & DevOps',
      description: 'Master database management and deployment',
      courses: mockCourses.filter(course => course.id === '5' || course.id === '7'),
      skills: ['MongoDB', 'SQL', 'Docker', 'CI/CD'],
      completed: false
    }
  ]
};

// Mock Job Roles
export const mockJobRoles: JobRole[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    description: 'Build user interfaces and interactive web applications',
    averageSalary: '$85,000 - $120,000',
    requiredSkills: ['JavaScript', 'React', 'HTML/CSS', 'Git'],
    matchPercentage: 65
  },
  {
    id: '2',
    title: 'Data Scientist',
    description: 'Extract insights from data and build machine learning models',
    averageSalary: '$95,000 - $140,000',
    requiredSkills: ['Python', 'R', 'Machine Learning', 'Statistical Analysis'],
    matchPercentage: 50
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    description: 'Develop both client and server software for web applications',
    averageSalary: '$90,000 - $130,000',
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git'],
    matchPercentage: 60
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    description: 'Implement automation and streamline the integration and deployment process',
    averageSalary: '$100,000 - $150,000',
    requiredSkills: ['Docker', 'AWS', 'CI/CD', 'Git', 'Kubernetes'],
    matchPercentage: 30
  },
  {
    id: '5',
    title: 'Product Manager',
    description: 'Guide the development of products from conception to launch',
    averageSalary: '$90,000 - $140,000',
    requiredSkills: ['Agile Methodologies', 'Project Management', 'Communication', 'Problem Solving'],
    matchPercentage: 70
  }
];

// Mock upload curriculum response
export const mockExtractedSkills = {
  totalSkills: 23,
  relevantSkills: 15,
  missingSkills: 18,
  categories: [
    {
      name: 'Programming Languages',
      extracted: ['Python', 'Java', 'C++'],
      relevant: true
    },
    {
      name: 'Computer Science Fundamentals',
      extracted: ['Data Structures', 'Algorithms', 'Operating Systems', 'Computer Architecture'],
      relevant: true
    },
    {
      name: 'Mathematics',
      extracted: ['Calculus', 'Linear Algebra', 'Discrete Mathematics', 'Statistics'],
      relevant: true
    },
    {
      name: 'Software Engineering',
      extracted: ['Software Development Life Cycle', 'Git', 'Testing Fundamentals'],
      relevant: true
    },
    {
      name: 'Database Management',
      extracted: ['SQL Basics', 'Database Design'],
      relevant: true
    },
    {
      name: 'Web Development Fundamentals',
      extracted: ['HTML/CSS Basics', 'HTTP Protocol'],
      relevant: true
    },
    {
      name: 'Electives',
      extracted: ['Computer Graphics', 'Theory of Computation', 'Computer Networks'],
      relevant: false
    }
  ]
};

// Mock skill gap data
export const mockSkillGapData = {
  overallMatch: 42,
  skillsByCategory: [
    {
      category: 'Programming Languages',
      match: 65,
      present: ['Python', 'Java', 'C++'],
      missing: ['JavaScript', 'R', 'Go', 'TypeScript']
    },
    {
      category: 'Web Development',
      match: 25,
      present: ['HTML/CSS Basics'],
      missing: ['React', 'Angular', 'Node.js', 'Vue.js', 'Modern JavaScript Frameworks']
    },
    {
      category: 'Data Science & Analytics',
      match: 30,
      present: ['Statistics', 'SQL Basics'],
      missing: ['Data Visualization', 'Machine Learning', 'Big Data Technologies', 'Advanced SQL']
    },
    {
      category: 'DevOps & Cloud',
      match: 20,
      present: ['Git'],
      missing: ['Docker', 'AWS', 'CI/CD', 'Kubernetes', 'Cloud Architecture']
    },
    {
      category: 'Soft Skills',
      match: 70,
      present: ['Communication', 'Team Collaboration', 'Problem Solving'],
      missing: ['Project Management', 'Agile Methodologies']
    }
  ],
  topMissingSkills: [
    { name: 'React', importance: 'critical', difficulty: 'medium', demand: 95 },
    { name: 'JavaScript', importance: 'critical', difficulty: 'medium', demand: 90 },
    { name: 'Machine Learning', importance: 'high', difficulty: 'high', demand: 85 },
    { name: 'AWS', importance: 'high', difficulty: 'medium', demand: 80 },
    { name: 'Node.js', importance: 'high', difficulty: 'medium', demand: 78 },
    { name: 'Docker', importance: 'medium', difficulty: 'medium', demand: 75 },
    { name: 'Agile Methodologies', importance: 'medium', difficulty: 'low', demand: 70 },
    { name: 'Data Visualization', importance: 'medium', difficulty: 'low', demand: 68 }
  ]
};
