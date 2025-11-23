export interface MissionDevice {
  id: string;
  name: string;
  status: 'on' | 'off';
  icon: string;
  powerUsage?: number; // kWh
  temperature?: number; // °C
  type: 'light' | 'heating' | 'cooling';
}

export interface SavingsData {
  todaySavings: number; // kWh
  participatedMissions: number;
  acquiredPoints: number;
  departmentAverage: number; // percentage
}

export interface CharacterData {
  level: number;
  growthRate: number; // percentage
}

export interface LocationData {
  currentLocation: string;
  totalPowerUsage: number; // kWh
}

export interface CharacterProgress {
  currentLevel: number;
  nextLevel: number;
  progress: number; // percentage (0-100)
  missionsToNextLevel: number;
  characterName: string;
  characterEmoji: string;
}

export interface StatusCardData {
  icon: string;
  label: string;
  value: string;
}

export interface StreakData {
  days: number;
  completedDays: number[];
  message: string;
}

export interface RankProgress {
  currentRank: string;
  nextRank: string;
  currentPoints: number;
  pointsToNextRank: number;
  progress: number; // percentage (0-100)
}

export interface MissionItem {
  id: string;
  title: string;
  emoji: string;
  category: 'all' | 'recycle' | 'quiz' | 'content' | 'contest';
  points: number;
  progress: number; // 0-100
  totalSteps: number;
  currentStep: number;
  status: 'available' | 'in-progress' | 'completed';
}

export interface CampusStats {
  todaySavings: number; // kWh
  studentParticipation: number; // 회
  wasteRooms: number; // 개
}

export type MissionFilter = 'all' | 'recycle' | 'quiz' | 'content' | 'contest';

