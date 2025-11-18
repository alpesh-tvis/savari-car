import { useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  driversLicense?: string;
  idDocument?: string;
  createdAt: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('driveshare_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const existingUsers = JSON.parse(localStorage.getItem('driveshare_users') || '[]');
    if (existingUsers.find((u: User) => u.email === email)) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      createdAt: new Date().toISOString(),
    };

    existingUsers.push({ ...newUser, password });
    localStorage.setItem('driveshare_users', JSON.stringify(existingUsers));
    localStorage.setItem('driveshare_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const signIn = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const existingUsers = JSON.parse(localStorage.getItem('driveshare_users') || '[]');
    const foundUser = existingUsers.find((u: any) => u.email === email && u.password === password);
    
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    localStorage.setItem('driveshare_user', JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);
    return userWithoutPassword;
  };

  const signOut = () => {
    localStorage.removeItem('driveshare_user');
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('driveshare_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    // Update in users list too
    const existingUsers = JSON.parse(localStorage.getItem('driveshare_users') || '[]');
    const userIndex = existingUsers.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      existingUsers[userIndex] = { ...existingUsers[userIndex], ...updates };
      localStorage.setItem('driveshare_users', JSON.stringify(existingUsers));
    }
  };

  return { user, loading, signUp, signIn, signOut, updateProfile };
};
