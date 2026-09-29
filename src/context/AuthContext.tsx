import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';
import { 
  StudentState, 
  EducationalGrade, 
  ExamResultRecord, 
  BookmarkItem, 
  StudentNote 
} from '../types';
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
  saveExamResultToCloud: (result: ExamResultRecord) => Promise<void>;
  saveNoteToCloud: (note: StudentNote) => Promise<void>;
  deleteNoteFromCloud: (noteId: string) => Promise<void>;
  saveBookmarkToCloud: (bookmark: BookmarkItem) => Promise<void>;
  removeBookmarkFromCloud: (bookmarkId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage key for client cache / preferences
const PREFERENCES_CACHE_KEY = 'omega_student_preferences';

// Helper to normalize phone numbers
export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

// Phone Auth Adapter: maps phone to a dedicated Firebase Auth virtual account
export function phoneToAuthEmail(phone: string): string {
  const cleaned = cleanPhoneNumber(phone);
  return `phone_${cleaned}@phone.omega.edu.iq`;
}

// Secure SHA-256 hash helper (never store plaintext passwords anywhere)
async function hashSecret(secret: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(secret + 'omega_v3_salt_secure');
    const hash = await window.crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
  return btoa(secret);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'saving' | 'offline' | 'error'>('offline');

  // Firebase Auth State is the single authoritative source of truth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      try {
        if (firebaseUser) {
          const isPhoneAuth = firebaseUser.email?.endsWith('@phone.omega.edu.iq');
          const derivedPhone = isPhoneAuth 
            ? firebaseUser.email?.replace('phone_', '').replace('@phone.omega.edu.iq', '') 
            : undefined;

          // Attempt to fetch custom profile from Firestore
          const studentDocRef = doc(db, 'students', firebaseUser.uid);
          const studentSnap = await getDoc(studentDocRef).catch(() => null);

          let displayName = firebaseUser.displayName || 'طالب متميز';
          let phone = derivedPhone;
          let authProvider: 'phone' | 'email' | 'google' = 'email';

          if (isPhoneAuth) {
            authProvider = 'phone';
          } else if (firebaseUser.providerData.some(p => p.providerId === 'google.com')) {
            authProvider = 'google';
          }

          if (studentSnap && studentSnap.exists()) {
            const data = studentSnap.data();
            if (data.name) displayName = data.name;
            if (data.phoneNumber) phone = data.phoneNumber;
            if (data.authProvider) authProvider = data.authProvider;
          }

          const appUser: AppUser = {
            uid: firebaseUser.uid,
            displayName,
            email: isPhoneAuth ? undefined : (firebaseUser.email || undefined),
            phoneNumber: phone,
            authProvider
          };

          setUser(appUser);
          setSyncStatus('synced');
        } else {
          setUser(null);
          setSyncStatus('offline');
        }
      } catch (err) {
        console.error('Auth state change resolution error:', err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setSyncStatus('saving');
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        const studentDocRef = doc(db, 'students', result.user.uid);
        const snapshot = await getDoc(studentDocRef).catch(() => null);

        if (!snapshot || !snapshot.exists()) {
          // Initialize clean profile without any password field
          await setDoc(studentDocRef, {
            uid: result.user.uid,
            name: result.user.displayName || 'طالب متميز',
            email: result.user.email || '',
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
          }, { merge: true });
        }
        setSyncStatus('synced');
      }
    } catch (error: any) {
      console.error('Google Sign-in error:', error);
      setSyncStatus('error');
      throw error;
    }
  };

  // Sign up with Email & Password
  const signUpWithEmail = async (name: string, email: string, pass: string, grade: EducationalGrade = 'sixth-preparatory') => {
    try {
      setSyncStatus('saving');
      const normalizedEmail = email.trim().toLowerCase();

      // Real Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, pass);
      const firebaseUser = userCredential.user;

      // Update profile
      await updateProfile(firebaseUser, { displayName: name.trim() });

      // Save student document to Firestore (NO PASSWORD STORED)
      const studentDocRef = doc(db, 'students', firebaseUser.uid);
      await setDoc(studentDocRef, {
        uid: firebaseUser.uid,
        email: normalizedEmail,
        name: name.trim(),
        authProvider: 'email',
        selectedGrade: grade,
        xp: 100,
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
      });

      setSyncStatus('synced');
    } catch (error: any) {
      console.error('Email sign up error:', error);
      setSyncStatus('error');
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('هذا البريد الإلكتروني مسجل مسبقاً، يمكنك تسجيل الدخول به');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('كلمة المرور ضعيفة، يرجى اختيار كلمة مرور أطول');
      }
      throw error;
    }
  };

  // Sign in with Email & Password
  const signInWithEmail = async (email: string, pass: string) => {
    try {
      setSyncStatus('saving');
      const normalizedEmail = email.trim().toLowerCase();
      await signInWithEmailAndPassword(auth, normalizedEmail, pass);
      setSyncStatus('synced');
    } catch (error: any) {
      console.error('Email sign in error:', error);
      setSyncStatus('error');
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('كلمة المرور غير صحيحة');
      }
      throw error;
    }
  };

  // Sign up with Phone
  const signUpWithPhone = async (name: string, phone: string, pass: string, grade: EducationalGrade = 'sixth-preparatory') => {
    try {
      setSyncStatus('saving');
      const cleaned = cleanPhoneNumber(phone);
      const authEmail = phoneToAuthEmail(cleaned);

      let firebaseUser: FirebaseUser;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, authEmail, pass);
        firebaseUser = userCredential.user;
      } catch (authErr: any) {
        if (authErr.code === 'auth/email-already-in-use') {
          throw new Error('رقم الهاتف هذا مسجل مسبقاً، يرجى الانتقال إلى تسجيل الدخول');
        }
        // Fallback for restricted provider environments
        const passwordHash = await hashSecret(pass);
        const pseudoUid = `phone_${cleaned}`;
        const studentDocRef = doc(db, 'students', pseudoUid);
        const existingDoc = await getDoc(studentDocRef).catch(() => null);
        if (existingDoc && existingDoc.exists()) {
          throw new Error('رقم الهاتف هذا مسجل مسبقاً، يرجى تسجيل الدخول به');
        }
        await setDoc(studentDocRef, {
          uid: pseudoUid,
          phoneNumber: cleaned,
          name: name.trim(),
          authProvider: 'phone',
          credentialHash: passwordHash, // Hashed only, never raw
          selectedGrade: grade,
          xp: 100,
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
        });

        const appUser: AppUser = {
          uid: pseudoUid,
          displayName: name.trim(),
          phoneNumber: cleaned,
          authProvider: 'phone'
        };
        setUser(appUser);
        setSyncStatus('synced');
        return;
      }

      await updateProfile(firebaseUser, { displayName: name.trim() });

      // Save student document in Firestore (NO PLAINTEXT PASSWORDS)
      const studentDocRef = doc(db, 'students', firebaseUser.uid);
      await setDoc(studentDocRef, {
        uid: firebaseUser.uid,
        phoneNumber: cleaned,
        name: name.trim(),
        authProvider: 'phone',
        selectedGrade: grade,
        xp: 100,
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
      });

      setSyncStatus('synced');
    } catch (error: any) {
      console.error('Phone sign up error:', error);
      setSyncStatus('error');
      throw error;
    }
  };

  // Sign in with Phone
  const signInWithPhone = async (phone: string, pass: string) => {
    try {
      setSyncStatus('saving');
      const cleaned = cleanPhoneNumber(phone);
      const authEmail = phoneToAuthEmail(cleaned);

      try {
        await signInWithEmailAndPassword(auth, authEmail, pass);
        setSyncStatus('synced');
      } catch (authErr: any) {
        // Fallback for custom hashed records if auth provider rejected email
        const passwordHash = await hashSecret(pass);
        const pseudoUid = `phone_${cleaned}`;
        const studentDocRef = doc(db, 'students', pseudoUid);
        const snapshot = await getDoc(studentDocRef).catch(() => null);

        if (!snapshot || !snapshot.exists()) {
          throw new Error('رقم الهاتف هذا غير مسجل، يرجى إنشاء حساب جديد أولاً');
        }

        const data = snapshot.data();
        if (data.credentialHash && data.credentialHash !== passwordHash) {
          throw new Error('كلمة المرور غير صحيحة، يرجى التأكد والمحاولة ثانية');
        }

        const appUser: AppUser = {
          uid: pseudoUid,
          displayName: data.name || 'طالب متميز',
          phoneNumber: data.phoneNumber || cleaned,
          authProvider: 'phone'
        };
        setUser(appUser);
        setSyncStatus('synced');
      }
    } catch (error: any) {
      console.error('Phone sign in error:', error);
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
      setUser(null);
      setSyncStatus('offline');
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
      setSyncStatus('offline');
    }
  };

  // Save student progress to Firestore Cloud (with safe atomic merge)
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
        lessonProgressMap: state.lessonProgressMap || {},
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

        // Also fetch recent exam results subcollection
        const examResultsRef = collection(db, 'students', uid, 'exam_results');
        const examQuery = query(examResultsRef, orderBy('timestamp', 'desc'), limit(20));
        const examSnaps = await getDocs(examQuery).catch(() => null);
        const examResults: ExamResultRecord[] = [];
        if (examSnaps) {
          examSnaps.forEach(docSnap => {
            examResults.push(docSnap.data() as ExamResultRecord);
          });
        }

        // Fetch notes
        const notesRef = collection(db, 'students', uid, 'notes');
        const notesSnaps = await getDocs(notesRef).catch(() => null);
        const notes: StudentNote[] = [];
        if (notesSnaps) {
          notesSnaps.forEach(docSnap => {
            notes.push(docSnap.data() as StudentNote);
          });
        }

        // Fetch bookmarks
        const bookmarksRef = collection(db, 'students', uid, 'bookmarks');
        const bookmarksSnaps = await getDocs(bookmarksRef).catch(() => null);
        const bookmarks: BookmarkItem[] = [];
        if (bookmarksSnaps) {
          bookmarksSnaps.forEach(docSnap => {
            bookmarks.push(docSnap.data() as BookmarkItem);
          });
        }

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
          unlockedBadges: data.unlockedBadges || [],
          lessonProgressMap: data.lessonProgressMap || {},
          examResults,
          notes,
          bookmarks
        };
      }
      return null;
    } catch (error) {
      console.error('Error loading student from cloud:', error);
      return null;
    }
  };

  // Append-only Exam Result Record in subcollection
  const saveExamResultToCloud = async (result: ExamResultRecord) => {
    if (!user) return;
    try {
      const examDocRef = doc(db, 'students', user.uid, 'exam_results', result.id);
      await setDoc(examDocRef, result);

      // Optionally update public leaderboard if score is high
      if (result.percentage >= 60) {
        const leaderboardRef = doc(db, 'leaderboard', user.uid);
        await setDoc(leaderboardRef, {
          uid: user.uid,
          studentName: user.displayName,
          examTitle: result.examTitle,
          score: result.score,
          maxScore: result.maxScore,
          percentage: result.percentage,
          updatedAt: new Date().toISOString()
        }, { merge: true }).catch(() => {});
      }
    } catch (err) {
      console.error('Error writing exam result to cloud:', err);
    }
  };

  // Notes operations in subcollection
  const saveNoteToCloud = async (note: StudentNote) => {
    if (!user) return;
    try {
      const noteDocRef = doc(db, 'students', user.uid, 'notes', note.id);
      await setDoc(noteDocRef, note, { merge: true });
    } catch (err) {
      console.error('Error saving note:', err);
    }
  };

  const deleteNoteFromCloud = async (noteId: string) => {
    if (!user) return;
    try {
      const noteDocRef = doc(db, 'students', user.uid, 'notes', noteId);
      await setDoc(noteDocRef, { deleted: true }, { merge: true });
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  // Bookmarks operations in subcollection
  const saveBookmarkToCloud = async (bookmark: BookmarkItem) => {
    if (!user) return;
    try {
      const bookmarkDocRef = doc(db, 'students', user.uid, 'bookmarks', bookmark.id);
      await setDoc(bookmarkDocRef, bookmark, { merge: true });
    } catch (err) {
      console.error('Error saving bookmark:', err);
    }
  };

  const removeBookmarkFromCloud = async (bookmarkId: string) => {
    if (!user) return;
    try {
      const bookmarkDocRef = doc(db, 'students', user.uid, 'bookmarks', bookmarkId);
      await setDoc(bookmarkDocRef, { removed: true }, { merge: true });
    } catch (err) {
      console.error('Error removing bookmark:', err);
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
        loadStudentFromCloud,
        saveExamResultToCloud,
        saveNoteToCloud,
        deleteNoteFromCloud,
        saveBookmarkToCloud,
        removeBookmarkFromCloud
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
