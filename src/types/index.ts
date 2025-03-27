export interface Lesson {
  id: string;
  title: string;
  description: string;
  topic: string;
  points: number;
  content: string;
  questions: Question[];
  completed: boolean;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  unlocked: boolean;
  requirementType: 'points' | 'lessons' | 'quizzes';
  requirementValue: number;
}

export interface Career {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  unlocked: boolean;
  pointsRequired: number;
}

export interface User {
  id: string;
  username: string;
  points: number;
  level: number;
  badges: Badge[];
  completedLessons: string[];
  careers: Career[];
}

export type RootStackParamList = {
  Home: undefined;
  Lessons: undefined;
  LessonDetail: { lessonId: string };
  Quiz: { lessonId: string };
  Profile: undefined;
  Careers: undefined;
  Achievements: undefined;
}; 