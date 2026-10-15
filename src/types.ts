export type PhaseNumber = 1 | 2 | 3 | 4 | 5;

export interface Objective {
  id: string;
  text: string;
  completed: boolean;
}

export interface HabitItem {
  id: string;
  name: string;
  days: boolean[]; // 7 booleans for Monday through Sunday
}

export interface WeekReflection {
  wins: string;
  challenges: string;
  learnings: string;
  energyRating: number; // 1 to 5
  satisfactionRating: number; // 1 to 5
}

export interface WeekData {
  weekNumber: number; // 1 to 30
  phase: PhaseNumber;
  title: string;
  subtitle: string;
  category: string;
  quote: {
    text: string;
    author: string;
  };
  deliverable: string;
  deliverableCompleted: boolean;
  externalLink?: {
    title: string;
    url: string;
  };
  objectives: Objective[];
  habits: HabitItem[];
  reflection: WeekReflection;
  notes: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completedAt?: string;
}

export interface PhaseInfo {
  number: PhaseNumber;
  name: string;
  range: string;
  description: string;
  color: string;
}

export type TemplateId = 'fenerbahce_champion' | 'personal_growth' | 'software_dev' | 'fitness_health' | 'language_b2' | 'custom';

export interface TemplateMeta {
  id: TemplateId;
  title: string;
  tagline: string;
  description: string;
  icon: string;
}

export interface UserSession {
  isLoggedIn: boolean;
  name: string;
  email: string;
  isGfbMember: boolean;
  gfbMemberNo?: string;
  isVip: boolean;
  vipTitle?: string;
  joinedDate?: string;
}

export interface UserProfile {
  name: string;
  visionStatement: string;
  startDate: string;
  activeTemplate: TemplateId;
}

export interface ResourceItem {
  id: string;
  weekNumber: number;
  title: string;
  url?: string;
  notes: string;
  category: string;
  createdAt: string;
}

export interface JourneyStore {
  session: UserSession;
  profile: UserProfile;
  activeWeek: number;
  weeks: WeekData[];
  resources: ResourceItem[];
  theme: 'light' | 'dark';
}

