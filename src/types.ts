export type LessonCategory = 'grammar' | 'vocabulary' | 'reading' | 'spelling';

export interface Example {
  en: string;
  ar: string;
  highlight?: string;
  note?: string;
}

export interface Exercise {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  type: 'mcq' | 'fill' | 'correction';
  ministerialYear?: string;
}

export interface Lesson {
  id: string;
  unitId: number;
  lessonNumber: number;
  titleAr: string;
  titleEn: string;
  category: LessonCategory;
  summary: string;
  grammarRuleFormula?: string;
  detailedContent: string[];
  teacherNotes: string[]; // ملاحظات الأستاذ مصطفى تركي الذهبية
  commonMistakes?: string[]; // فخاخ وزارية احذر منها
  examples: Example[];
  exercises: Exercise[];
}

export interface Unit {
  id: number;
  number: number;
  titleAr: string;
  titleEn: string;
  description: string;
  accentColor: string;
  bgGradient: string;
  lessons: Lesson[];
}

export interface MinisterialExamQuestion {
  id: string;
  unitId: number;
  topic: string;
  year: string;
  session: 'دور أول' | 'دور ثاني' | 'دور ثانٍ' | 'دور ثالث' | 'تمهيدي' | 'خارج القطر';
  questionText: string;
  correctAnswer: string;
  ruleExplanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'Grammar' | 'Vocabulary' | 'Spelling' | 'Literature' | 'Reading';
}

export interface CharacterInfo {
  name: string;
  role: string;
  description: string;
}

export interface LiteratureItem {
  id: string;
  title: string;
  titleAr: string;
  author: string;
  genre: string;
  summaryAr: string;
  characters: CharacterInfo[];
  keyThemes: string[];
  ministerialQA: {
    question: string;
    answer: string;
    year: string;
  }[];
}

export interface EssayItem {
  id: string;
  unitId: number;
  titleAr: string;
  titleEn: string;
  ministerialWeight: string;
  paragraphsEn: string[];
  paragraphsAr: string[];
  keywords: { word: string; meaning: string }[];
  goldenTips: string[];
  clozeSentences: { textWithBlanks: string; missingWord: string; options: string[] }[];
}

export interface IrregularVerb {
  base: string;
  past: string;
  pastParticiple: string;
  arabicMeaning: string;
  group: 'all-same' | 'two-same' | 'all-different';
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export interface StudentState {
  name: string;
  xp: number;
  completedLessonIds: string[];
  bookmarkedQuestionIds: string[];
  answeredExercises: Record<string, boolean>;
  totalQuestionsAttempted: number;
  totalQuestionsCorrect: number;
  streakDays: number;
  lastActiveDate: string;
  lastVisitedLessonId?: string;
  unlockedBadges: string[];
}

export interface AiChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
