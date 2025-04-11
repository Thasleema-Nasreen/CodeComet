
import { Link } from 'react-router-dom';
import { GraduationCap, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-edu-primary" />
              <span className="ml-2 text-xl font-bold text-edu-dark">Skill Pilot</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Bridging the gap between academic curricula and industry demands with AI-powered skill analysis and personalized recommendations.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Navigate</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/" className="text-base text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-base text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/upload-curriculum" className="text-base text-gray-600 hover:text-gray-900">
                  Upload Curriculum
                </Link>
              </li>
              <li>
                <Link to="/skill-gap" className="text-base text-gray-600 hover:text-gray-900">
                  Skill Gap Analysis
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/recommendations" className="text-base text-gray-600 hover:text-gray-900">
                  Recommendations
                </Link>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-gray-900">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-gray-900">
                  Resources
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-gray-900">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-gray-900">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-gray-900">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between items-center pt-8 border-t border-gray-200">
          <p className="text-base text-gray-500">
            &copy; {new Date().getFullYear()} Skill Pilot. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
