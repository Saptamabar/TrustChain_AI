import React, { createContext, useContext, useState, useCallback } from 'react';

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const VALID_CREDENTIALS = [
  { email: 'admin@corp.com', password: 'password123', name: 'Admin SSO', role: 'Administrator' },
  { email: 'analyst@corp.com', password: 'password123', name: 'Risk Analyst', role: 'Analyst' },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('tc_auth') === 'true';
  });
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('tc_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    // Simulate API delay
    await new Promise((res) => setTimeout(res, 1200));

    const found = VALID_CREDENTIALS.find(
      (c) => c.email === email && c.password === password
    );

    if (found) {
      const userData: User = { email: found.email, name: found.name, role: found.role };
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem('tc_auth', 'true');
      localStorage.setItem('tc_user', JSON.stringify(userData));
      return { success: true };
    }

    return { success: false, error: 'Email atau password salah. Gunakan: admin@corp.com / password123' };
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('tc_auth');
    localStorage.removeItem('tc_user');
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
