import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Lesson, Badge, Career } from '../types';
import { lessons, badges, careers } from '../data';

interface AppContextType {
  user: User;
  addPoints: (points: number) => void;
  completeLesson: (lessonId: string) => void;
  resetProgress: () => void;
  allLessons: Lesson[];
}

const initialUser: User = {
  id: '1',
  username: 'EcoLearner',
  points: 0,
  level: 1,
  badges: badges.map((badge: Badge) => ({ ...badge, unlocked: false })),
  completedLessons: [],
  careers: careers.map((career: Career) => ({ ...career, unlocked: false })),
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(initialUser);
  const [allLessons, setAllLessons] = useState<Lesson[]>(lessons);

  // Calculate level based on points
  useEffect(() => {
    const newLevel = Math.floor(user.points / 100) + 1;
    if (newLevel !== user.level) {
      setUser(prev => ({ ...prev, level: newLevel }));
    }
  }, [user.points]);

  // Check for badge unlocks
  useEffect(() => {
    const updatedBadges = user.badges.map(badge => {
      let shouldUnlock = false;
      
      if (badge.requirementType === 'points' && user.points >= badge.requirementValue) {
        shouldUnlock = true;
      } else if (badge.requirementType === 'lessons' && user.completedLessons.length >= badge.requirementValue) {
        shouldUnlock = true;
      }
      
      return { ...badge, unlocked: badge.unlocked || shouldUnlock };
    });

    // Check for career unlocks
    const updatedCareers = user.careers.map(career => {
      return { 
        ...career, 
        unlocked: career.unlocked || user.points >= career.pointsRequired 
      };
    });

    if (JSON.stringify(updatedBadges) !== JSON.stringify(user.badges) || 
        JSON.stringify(updatedCareers) !== JSON.stringify(user.careers)) {
      setUser(prev => ({ 
        ...prev, 
        badges: updatedBadges,
        careers: updatedCareers
      }));
    }
  }, [user.points, user.completedLessons]);

  const addPoints = (points: number) => {
    setUser(prev => ({ ...prev, points: prev.points + points }));
  };

  const completeLesson = (lessonId: string) => {
    if (!user.completedLessons.includes(lessonId)) {
      // Add to completed lessons
      setUser(prev => ({
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId]
      }));

      // Find the lesson and add its points
      const lesson = allLessons.find(l => l.id === lessonId);
      if (lesson) {
        addPoints(lesson.points);
        
        // Mark lesson as completed in allLessons
        setAllLessons(prev => 
          prev.map(l => l.id === lessonId ? { ...l, completed: true } : l)
        );
      }
    }
  };

  const resetProgress = () => {
    setUser(initialUser);
    setAllLessons(lessons.map((lesson: Lesson) => ({ ...lesson, completed: false })));
  };

  return (
    <AppContext.Provider value={{ user, addPoints, completeLesson, resetProgress, allLessons }}>
      {children}
    </AppContext.Provider>
  );
}; 