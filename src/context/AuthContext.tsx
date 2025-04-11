
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

// Mock user data for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Student',
    email: 'student@example.com',
    password: 'password123',
    role: 'student' as const,
    avatarUrl: 'https://ui-avatars.com/api/?name=John+Student&background=random'
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin' as const,
    avatarUrl: 'https://ui-avatars.com/api/?name=Admin+User&background=random'
  }
];

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('Skill Pilot_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function (mock implementation)
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (!foundUser) {
      setLoading(false);
      throw new Error('Invalid credentials');
    }
    
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('Skill Pilot_user', JSON.stringify(userWithoutPassword));
    setLoading(false);
  };

  // Register function (mock implementation)
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      setLoading(false);
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser = {
      id: (MOCK_USERS.length + 1).toString(),
      name,
      email,
      role: 'student' as const,
      avatarUrl: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=random`
    };
    
    setUser(newUser);
    localStorage.setItem('Skill Pilot_user', JSON.stringify(newUser));
    setLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('Skill Pilot_user');
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;
  
  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
