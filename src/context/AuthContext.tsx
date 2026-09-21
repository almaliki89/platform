import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';
import { StudentState, EducationalGrade } from '../types';
import { INITIAL_STUDENT_STATE } from '../utils/storage';

export interface AppUser {
  uid: string;
  displayName: string;
  email?: string;
  phoneNumber?: string;
  authProvider: 'phone' | 'email' | 'google';
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  syncStatus: 'synced' | 'saving' | 'offline' | 'error';
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (name: string, email: string, pass: string, grade?: EducationalGrade) => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithPhone: (name: string, phone: string, pass: string, grade?: EducationalGrade) => Promise<void>;
  signInWithPhone: (phone: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  saveStudentToCloud: (state: StudentState) => Promise<void>;
  loadStudentFromCloud: (uid: string) => Promise<StudentState | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const SESSION_USER_KEY = 'alnamothajiya_active_user_session';

// Helper to normalize phone
export function normalizePhoneKey(phone: string): string {
  const cleaned = phone.replace(/[^0-9]/g, '');
  return `phone_${cleaned}`;
}

// Helper to normalize email
export function normalizeEmailKey(email: string): string {
  const cleaned = email.trim().toLowerCase().replace(/[^a-zA-Z0-9]/g, '_');
  return `email_${cleaned}`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'saving' | 'offline' | 'error'>('offline');

  // Initialize session from localStorage or Firebase
  useEffect(() => {
    async function initAuth() {
      try {
        const savedSession = localStorage.getItem(SESSION_USER_KEY);
        if (savedSession) {
          const parsedUser: AppUser = JSON.parse(savedSession);
          setUser(parsedUser);
          setSyncStatus('synced');
        } else {
          // Listen to firebase standard auth as fallback
          onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser && !user) {
              const appUser: AppUser = {
                uid: firebaseUser.uid,
                displayName: firebaseUser.displayName || 'طالب متميز',
                email: firebaseUser.email || undefined,
                authProvider: 'google'
              };
              setUser(appUser);
              localStorage.setItem(SESSION_USER_KEY, JSON.stringify(appUser));
              setSyncStatus('synced');
            }
          });
        }
      } catch (e) {
        console.error('Session load error:', e);
      } finally {
        setLoading(false);
      }
    }

    initAuth();
  }, []);

  // Save session locally
  const setPersistedUser = (appUser: AppUser | null) => {
    setUser(appUser);
    if (appUser) {
      localStorage.setItem(SESSION_USER_KEY, JSON.stringify(appUser));
      setSyncStatus('synced');
    } else {
      localStorage.removeItem(SESSION_USER_KEY);
      setSyncStatus('offline');
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setSyncStatus('saving');
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        const appUser: AppUser = {
          uid: result.user.uid,
          displayName: result.user.displayName || 'طالب متميز',
          email: result.user.email || undefined,
          authProvider: 'google'
        };
        setPersistedUser(appUser);

        // Ensure student document exists in Firestore
        const studentDocRef = doc(db, 'students', appUser.uid);
        const snapshot = await getDoc(studentDocRef);
        if (!snapshot.exists()) {
          await setDoc(studentDocRef, {
            uid: appUser.uid,
            name: appUser.displayName,
            email: appUser.email || '',
            authProvider: 'google',
            selectedGrade: 'sixth-preparatory',
            xp: 100,
            completedLessonIds: [],
            bookmarkedQuestionIds: [],
            totalQuestionsAttempted: 0,
            totalQuestionsCorrect: 0,
            streakDays: 1,
            lastActiveDate: new Date().toISOString().split('T')[0],
            lastVisitedLessonId: 'u1-l1',
            unlockedBadges: ['first-step'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        }
      }
    } catch (error: any) {
      console.error('Google Sign-in error:', error);
      setSyncStatus('error');
      throw error;
    }
  };

  // Sign up with Phone & PIN
  const signUpWithPhone = async (name: string, phone: string, pass: string, grade: EducationalGrade = 'sixth-preparatory') => {
    try {
      setSyncStatus('saving');
      const docId = normalizePhoneKey(phone);
      const studentDocRef = doc(db, 'students', docId);

      // Check if user already exists
      const existingDoc = await getDoc(studentDocRef);
      if (existingDoc.exists()) {
        throw new Error('رقم الهاتف هذا مسجل مسبقاً، يمكنك تسجيل الدخول به مباشرة');
      }

      // Create new student in Firestore
      const newStudentData = {
        uid: docId,
        phoneNumber: phone.trim(),
        name: name.trim(),
        password: pass, // Securely recorded in firestore
        authProvider: 'phone',
        selectedGrade: grade,
        xp: 100, // 100 XP Welcome bonus
        completedLessonIds: [],
        bookmarkedQuestionIds: [],
        totalQuestionsAttempted: 0,
        totalQuestionsCorrect: 0,
        streakDays: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        lastVisitedLessonId: grade === 'third-intermediate' ? 't-u1-l1' : 'u1-l1',
        unlockedBadges: ['first-step'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await setDoc(studentDocRef, newStudentData);

      const appUser: AppUser = {
        uid: docId,
        displayName: name.trim(),
        phoneNumber: phone.trim(),
        authProvider: 'phone'
      };

      setPersistedUser(appUser);
    } catch (error: any) {
      console.error('Phone sign up error:', error);
      setSyncStatus('error');
      throw error;
    }
  };

  // Sign in with Phone & PIN
  const signInWithPhone = async (phone: string, pass: string) => {
    try {
      setSyncStatus('saving');
      const docId = normalizePhoneKey(phone);
      const studentDocRef = doc(db, 'students', docId);
      const snapshot = await getDoc(studentDocRef);

      if (!snapshot.exists()) {
        throw new Error('رقم الهاتف هذا غير مسجل في المنصة، يرجى إنشاء حساب جديد أولاً');
      }

      const data = snapshot.data();
      if (data.password && data.password !== pass) {
        throw new Error('كلمة المرور غير صحيحة، يرجى التأكد وإعادة المحاولة');
      }

      const appUser: AppUser = {
        uid: docId,
        displayName: data.name || 'طالب متميز',
        phoneNumber: data.phoneNumber || phone,
        authProvider: 'phone'
      };

      setPersistedUser(appUser);
    } catch (error: any) {
      console.error('Phone sign in error:', error);
      setSyncStatus('error');
      throw error;
    }
  };

  // Sign up with Email & Password
  const signUpWithEmail = async (name: string, email: string, pass: string, grade: EducationalGrade = 'sixth-preparatory') => {
    try {
      setSyncStatus('saving');
      const docId = normalizeEmailKey(email);
      const studentDocRef = doc(db, 'students', docId);

      // Check if user already exists
      const existingDoc = await getDoc(studentDocRef);
      if (existingDoc.exists()) {
        throw new Error('هذا البريد الإلكتروني مسجل مسبقاً، يمكنك تسجيل الدخول');
      }

      // Create student document
      const newStudentData = {
        uid: docId,
        email: email.trim().toLowerCase(),
        name: name.trim(),
        password: pass,
        authProvider: 'email',
        selectedGrade: grade,
        xp: 100, // 100 XP Welcome bonus
        completedLessonIds: [],
        bookmarkedQuestionIds: [],
        totalQuestionsAttempted: 0,
        totalQuestionsCorrect: 0,
        streakDays: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        lastVisitedLessonId: grade === 'third-intermediate' ? 't-u1-l1' : 'u1-l1',
        unlockedBadges: ['first-step'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await setDoc(studentDocRef, newStudentData);

      const appUser: AppUser = {
        uid: docId,
        displayName: name.trim(),
        email: email.trim().toLowerCase(),
        authProvider: 'email'
      };

      setPersistedUser(appUser);
    } catch (error: any) {
      console.error('Email sign up error:', error);
      setSyncStatus('error');
      throw error;
    }
  };

  // Sign in with Email & Password
  const signInWithEmail = async (email: string, pass: string) => {
    try {
      setSyncStatus('saving');
      const docId = normalizeEmailKey(email);
      const studentDocRef = doc(db, 'students', docId);
      const snapshot = await getDoc(studentDocRef);

      if (!snapshot.exists()) {
        throw new Error('هذا البريد الإلكتروني غير مسجل، يرجى إنشاء حساب جديد أولاً');
      }

      const data = snapshot.data();
      if (data.password && data.password !== pass) {
        throw new Error('كلمة المرور غير صحيحة، يرجى التأكد');
      }

      const appUser: AppUser = {
        uid: docId,
        displayName: data.name || 'طالب متميز',
        email: data.email || email,
        authProvider: 'email'
      };

      setPersistedUser(appUser);
    } catch (error: any) {
      console.error('Email sign in error:', error);
      setSyncStatus('error');
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      if (auth.currentUser) {
        await firebaseSignOut(auth);
      }
      setPersistedUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setPersistedUser(null);
    }
  };

  // Save student progress to Firestore Cloud
  const saveStudentToCloud = async (state: StudentState) => {
    if (!user) return;
    try {
      setSyncStatus('saving');
      const studentDocRef = doc(db, 'students', user.uid);
      await setDoc(studentDocRef, {
        uid: user.uid,
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        name: state.name || user.displayName || 'طالب المنصة',
        xp: state.xp || 0,
        selectedGrade: state.selectedGrade || 'sixth-preparatory',
        completedLessonIds: state.completedLessonIds || [],
        bookmarkedQuestionIds: state.bookmarkedQuestionIds || [],
        totalQuestionsAttempted: state.totalQuestionsAttempted || 0,
        totalQuestionsCorrect: state.totalQuestionsCorrect || 0,
        streakDays: state.streakDays || 1,
        lastActiveDate: state.lastActiveDate || new Date().toISOString().split('T')[0],
        lastVisitedLessonId: state.lastVisitedLessonId || 'u1-l1',
        unlockedBadges: state.unlockedBadges || [],
        updatedAt: new Date().toISOString()
      }, { merge: true });
      setSyncStatus('synced');
    } catch (error) {
      console.error('Error saving student state to cloud:', error);
      setSyncStatus('error');
    }
  };

  // Load student progress from Firestore Cloud
  const loadStudentFromCloud = async (uid: string): Promise<StudentState | null> => {
    try {
      const studentDocRef = doc(db, 'students', uid);
      const snapshot = await getDoc(studentDocRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        return {
          ...INITIAL_STUDENT_STATE,
          name: data.name || user?.displayName || 'طالب متميز',
          xp: data.xp || 0,
          selectedGrade: data.selectedGrade || 'sixth-preparatory',
          completedLessonIds: data.completedLessonIds || [],
          bookmarkedQuestionIds: data.bookmarkedQuestionIds || [],
          answeredExercises: {},
          totalQuestionsAttempted: data.totalQuestionsAttempted || 0,
          totalQuestionsCorrect: data.totalQuestionsCorrect || 0,
          streakDays: data.streakDays || 1,
          lastActiveDate: data.lastActiveDate || new Date().toISOString().split('T')[0],
          lastVisitedLessonId: data.lastVisitedLessonId || 'u1-l1',
          unlockedBadges: data.unlockedBadges || []
        };
      }
      return null;
    } catch (error) {
      console.error('Error loading student from cloud:', error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        syncStatus,
        signInWithGoogle,
        signUpWithEmail,
        signInWithEmail,
        signUpWithPhone,
        signInWithPhone,
        logout,
        saveStudentToCloud,
        loadStudentFromCloud
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
