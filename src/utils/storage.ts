import { StudentState, Badge } from '../types';
import confetti from 'canvas-confetti';

const LEGACY_STORAGE_KEY = 'mustafa_turki_curriculum_student_state_2027';
const STORAGE_PREFIX = 'mustafa_turki_student_state_';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'first-step',
    title: 'الخطوة الأولى 🚀',
    description: 'إكمال أول درس بنجاح في المنصة',
    iconName: 'Award',
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'grammar-master',
    title: 'فارس القواعد ⚡',
    description: 'إكمال 5 دروس قواعد وزارية',
    iconName: 'Zap',
    unlocked: false,
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'quiz-ace',
    title: 'صياد المئة 🎯',
    description: 'الإجابة الصحيحة على 10 أسئلة وزارية',
    iconName: 'CheckCircle2',
    unlocked: false,
    progress: 0,
    maxProgress: 10
  },
  {
    id: 'literature-scholar',
    title: 'أديب السادس 📖',
    description: 'مراجعة قسمي الأدب (Pride & Prejudice و As You Like It)',
    iconName: 'BookOpen',
    unlocked: false,
    progress: 0,
    maxProgress: 2
  },
  {
    id: 'verbs-champion',
    title: 'ملك الأفعال الشاذة 🏆',
    description: 'إتقان تدريبات مختبر الأفعال الشاذة',
    iconName: 'Trophy',
    unlocked: false,
    progress: 0,
    maxProgress: 20
  }
];

export const INITIAL_STUDENT_STATE: StudentState = {
  name: 'طالب السادس المتفوق',
  xp: 150,
  completedLessonIds: [],
  bookmarkedQuestionIds: [],
  answeredExercises: {},
  totalQuestionsAttempted: 0,
  totalQuestionsCorrect: 0,
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  lastVisitedLessonId: 'u1-l1',
  unlockedBadges: []
};

export function getStudentStorageKey(uid?: string | null): string {
  if (!uid || uid === 'guest') {
    return `${STORAGE_PREFIX}guest`;
  }
  return `${STORAGE_PREFIX}${uid}`;
}

export function loadStudentStateForUser(uid?: string | null): StudentState {
  try {
    const userKey = getStudentStorageKey(uid);
    let data = localStorage.getItem(userKey);
    // If not found in user-scoped key and uid is not provided or guest, check legacy key
    if (!data && (!uid || uid === 'guest')) {
      data = localStorage.getItem(LEGACY_STORAGE_KEY);
    }
    if (data) {
      const parsed = JSON.parse(data);
      return { ...INITIAL_STUDENT_STATE, ...parsed };
    }
  } catch (e) {
    console.error("Failed to load student state from localStorage", e);
  }
  return INITIAL_STUDENT_STATE;
}

export function saveStudentStateForUser(state: StudentState, uid?: string | null): void {
  try {
    const userKey = getStudentStorageKey(uid);
    localStorage.setItem(userKey, JSON.stringify(state));
    // Also keep legacy key synced if guest
    if (!uid || uid === 'guest') {
      localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(state));
    }
  } catch (e) {
    console.error("Failed to save student state to localStorage", e);
  }
}

export function clearStudentStateForUser(uid?: string | null): void {
  try {
    const userKey = getStudentStorageKey(uid);
    localStorage.removeItem(userKey);
  } catch (e) {
    console.error("Failed to clear student state", e);
  }
}

export function loadStudentState(): StudentState {
  return loadStudentStateForUser(null);
}

export function saveStudentState(state: StudentState): void {
  saveStudentStateForUser(state, null);
}

export function triggerCelebration() {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  } catch (e) {
    // Canvas confetti might fail if canvas is blocked
  }
}
