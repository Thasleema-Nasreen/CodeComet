
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { 
  Award, BookOpen, Brain, Cpu, FileText, GraduationCap, 
  Layers, LineChart, Upload, Users 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="md:w-2/3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
              Bridge Your Academic Skills to Industry Demands
            </h1>
            <p className="mt-6 text-xl md:text-2xl font-medium max-w-3xl">
              Skill Pilot uses AI to analyze your curriculum, identify skill gaps, and recommend personalized learning paths to make you job-ready.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <Button 
                  size="lg" 
                  className="bg-white text-edu-primary hover:bg-gray-100"
                  onClick={() => navigate('/upload-curriculum')}
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Your Curriculum
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  className="bg-white text-edu-primary hover:bg-gray-100"
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </Button>
              )}
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => {
                  const featuresSection = document.getElementById('features');
                  featuresSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-edu-primary">96%</p>
              <p className="mt-2 text-gray-600">Improved Job Readiness</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-edu-primary">500+</p>
              <p className="mt-2 text-gray-600">Curriculums Analyzed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-edu-primary">15K+</p>
              <p className="mt-2 text-gray-600">Student Users</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-edu-primary">250+</p>
              <p className="mt-2 text-gray-600">Universities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How Skill Pilot Works
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform helps students bridge the gap between academic learning and industry requirements
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 flex flex-col">
              <div className="h-12 w-12 rounded-md flex items-center justify-center bg-edu-light text-edu-primary mb-5">
                <Upload className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Upload Curriculum</h3>
              <p className="mt-4 text-gray-600 flex-grow">
                Upload your academic curriculum as a PDF or text file. Our AI will extract and categorize the skills and knowledge areas.
              </p>
              <div className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => navigate('/upload-curriculum')}
                >
                  Try It Out
                </Button>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 flex flex-col">
              <div className="h-12 w-12 rounded-md flex items-center justify-center bg-edu-light text-edu-primary mb-5">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Skill Gap Analysis</h3>
              <p className="mt-4 text-gray-600 flex-grow">
                Our AI compares your academic skills against current job market requirements to identify critical skill gaps.
              </p>
              <div className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => navigate('/skill-gap')}
                >
                  View Demo
                </Button>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 flex flex-col">
              <div className="h-12 w-12 rounded-md flex items-center justify-center bg-edu-light text-edu-primary mb-5">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Personalized Recommendations</h3>
              <p className="mt-4 text-gray-600 flex-grow">
                Get tailored course recommendations, certification paths, and a learning roadmap to make you job-ready.
              </p>
              <div className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => navigate('/recommendations')}
                >
                  Explore
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              The Skill Pilot Process
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our step-by-step approach to making students job-ready
            </p>
          </div>

          <div className="mt-16">
            <div className="relative">
              {/* Process Steps */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>
              
              <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-16">
                {/* Step 1 */}
                <div className="md:ml-auto md:pr-16 relative">
                  <div className="hidden md:block absolute right-0 top-4 transform translate-x-1/2 -translate-y-1/2 rounded-full h-8 w-8 bg-edu-primary text-white flex items-center justify-center">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center md:justify-end">
                    <span className="md:hidden inline-flex items-center justify-center h-6 w-6 rounded-full bg-edu-primary text-white text-xs mr-2">1</span>
                    <span>Curriculum Upload & Analysis</span>
                  </h3>
                  <p className="mt-3 text-gray-600 md:text-right">
                    Upload your academic curriculum documents. Our AI extracts topics, techniques, and skills you've learned.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="md:mr-auto md:pl-16 relative">
                  <div className="hidden md:block absolute left-0 top-4 transform -translate-x-1/2 -translate-y-1/2 rounded-full h-8 w-8 bg-edu-primary text-white flex items-center justify-center">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="md:hidden inline-flex items-center justify-center h-6 w-6 rounded-full bg-edu-primary text-white text-xs mr-2">2</span>
                    <span>Job Market Analysis</span>
                  </h3>
                  <p className="mt-3 text-gray-600">
                    Our system analyzes thousands of job descriptions to identify the most in-demand skills for your target career.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="md:ml-auto md:pr-16 relative">
                  <div className="hidden md:block absolute right-0 top-4 transform translate-x-1/2 -translate-y-1/2 rounded-full h-8 w-8 bg-edu-primary text-white flex items-center justify-center">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center md:justify-end">
                    <span className="md:hidden inline-flex items-center justify-center h-6 w-6 rounded-full bg-edu-primary text-white text-xs mr-2">3</span>
                    <span>Skill Gap Detection</span>
                  </h3>
                  <p className="mt-3 text-gray-600 md:text-right">
                    We compare your academic knowledge with industry requirements to identify critical skill gaps.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="md:mr-auto md:pl-16 relative">
                  <div className="hidden md:block absolute left-0 top-4 transform -translate-x-1/2 -translate-y-1/2 rounded-full h-8 w-8 bg-edu-primary text-white flex items-center justify-center">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="md:hidden inline-flex items-center justify-center h-6 w-6 rounded-full bg-edu-primary text-white text-xs mr-2">4</span>
                    <span>Personalized Recommendations</span>
                  </h3>
                  <p className="mt-3 text-gray-600">
                    Receive tailored course suggestions, certification paths, and learning resources to bridge your skill gaps.
                  </p>
                </div>

                {/* Step 5 */}
                <div className="md:ml-auto md:pr-16 relative">
                  <div className="hidden md:block absolute right-0 top-4 transform translate-x-1/2 -translate-y-1/2 rounded-full h-8 w-8 bg-edu-primary text-white flex items-center justify-center">
                    <span className="text-sm font-bold">5</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center md:justify-end">
                    <span className="md:hidden inline-flex items-center justify-center h-6 w-6 rounded-full bg-edu-primary text-white text-xs mr-2">5</span>
                    <span>Learning Roadmap</span>
                  </h3>
                  <p className="mt-3 text-gray-600 md:text-right">
                    Get a structured 3/6/12-month learning plan tailored to your pace and priorities.
                  </p>
                </div>

                {/* Step 6 */}
                <div className="md:mr-auto md:pl-16 relative">
                  <div className="hidden md:block absolute left-0 top-4 transform -translate-x-1/2 -translate-y-1/2 rounded-full h-8 w-8 bg-edu-primary text-white flex items-center justify-center">
                    <span className="text-sm font-bold">6</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="md:hidden inline-flex items-center justify-center h-6 w-6 rounded-full bg-edu-primary text-white text-xs mr-2">6</span>
                    <span>Progress Tracking</span>
                  </h3>
                  <p className="mt-3 text-gray-600">
                    Track your learning progress and get updated recommendations as you acquire new skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Success Stories
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from students who bridged their skill gaps with Skill Pilot
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
              <div className="flex items-center mb-6">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://ui-avatars.com/api/?name=Priya+Sharma&background=random"
                  alt="Priya Sharma"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Priya Sharma</h4>
                  <p className="text-gray-600">Computer Science graduate</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Skill Pilot identified my lack of practical DevOps experience and recommended specific courses. Within 3 months, I secured a job at a tech startup with a 30% higher salary than my peers."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
              <div className="flex items-center mb-6">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://ui-avatars.com/api/?name=Alex+Johnson&background=random"
                  alt="Alex Johnson"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Alex Johnson</h4>
                  <p className="text-gray-600">Information Systems student</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I was struggling to find internships until Skill Pilot helped me identify that I needed practical data analytics skills. The recommended Tableau course made all the difference in my interviews."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
              <div className="flex items-center mb-6">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://ui-avatars.com/api/?name=Raj+Patel&background=random"
                  alt="Raj Patel"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Raj Patel</h4>
                  <p className="text-gray-600">Electrical Engineering graduate</p>
                </div>
              </div>
              <p className="text-gray-700">
                "My curriculum was theory-heavy, but Skill Pilot showed me I needed practical IoT experience. Following their roadmap helped me transition into a smart home automation role within 6 months."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-edu-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to Bridge Your Skill Gap?
          </h2>
          <p className="mt-4 text-xl max-w-3xl mx-auto">
            Join thousands of students who are using Skill Pilot to become job-ready and advance their careers.
          </p>
          <div className="mt-8">
            <Button 
              size="lg"
              className="bg-white text-edu-primary hover:bg-gray-100"
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started for Free'}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
