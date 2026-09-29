import React, { useState, useEffect, useRef } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar, NavTabId } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { LessonViewer } from './components/LessonViewer';
import { ExamEngine } from './components/ExamEngine';
import { LiteratureSection } from './components/LiteratureSection';
import { EssaysSection } from './components/EssaysSection';
import { IrregularVerbsLab } from './components/IrregularVerbsLab';
import { MinisterialMockSimulator } from './components/MinisterialMockSimulator';
import { VisualVocabAtlas } from './components/VisualVocabAtlas';
import { StudentProfileModal } from './components/StudentProfileModal';
import { MalzamaUploadLab } from './components/MalzamaUploadLab';
import { SmartReviewSection } from './components/SmartReviewSection';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AuthGate } from './components/AuthGate';

import { CURRICULUM_UNITS } from './data/curriculumData';
import { THIRD_INTERMEDIATE_UNITS } from './data/thirdIntermediateData';
import { Unit, Lesson, StudentState, EducationalGrade } from './types';
import { 
  loadStudentState, 
  saveStudentState, 
  triggerCelebration, 
  INITIAL_STUDENT_STATE 
} from './utils/storage';
import { GraduationCap, Loader2 } from 'lucide-react';

function MainAppContent() {
  const { user, loading, saveStudentToCloud, loadStudentFromCloud } = useAuth();

  // Navigation tabs with hash synchronization (PHASE 3)
  const [currentTab, setCurrentTab] = useState<NavTabId>(() => {
    const hash = window.location.hash.replace('#', '') as NavTabId;
    const validTabs: NavTabId[] = [
      'dashboard', 'lesson', 'exam', 'mock', 'literature', 
      'essays', 'verbs', 'vocab', 'malzama', 'review'
    ];
    return validTabs.includes(hash) ? hash : 'dashboard';
  });

  // Global Search Modal state (PHASE 14)
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Student progress state
  const [studentState, setStudentState] = useState<StudentState>(loadStudentState);

  // Active Grade selection
  const [selectedGrade, setSelectedGrade] = useState<EducationalGrade>(() => {
    return studentState.selectedGrade || 'sixth-preparatory';
  });

  const isThirdIntermediate = selectedGrade === 'third-intermediate';
  const currentUnits = isThirdIntermediate ? THIRD_INTERMEDIATE_UNITS : CURRICULUM_UNITS;

  // Currently viewed Unit and Lesson
  const [activeUnit, setActiveUnit] = useState<Unit>(currentUnits[0]);
  const [activeLesson, setActiveLesson] = useState<Lesson>(currentUnits[0].lessons[0]);

  // Modals state
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Sync hash routing with window history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as NavTabId;
      const validTabs: NavTabId[] = [
        'dashboard', 'lesson', 'exam', 'mock', 'literature', 
        'essays', 'verbs', 'vocab', 'malzama', 'review'
      ];
      if (validTabs.includes(hash) && hash !== currentTab) {
        setCurrentTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentTab]);

  const handleNavigateTab = (tab: NavTabId) => {
    setCurrentTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut for Search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync with Firestore when user logs in (Structured Merge Strategy)
  const prevUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    async function syncOnLogin() {
      if (user && user.uid !== prevUserIdRef.current) {
        prevUserIdRef.current = user.uid;
        const cloudData = await loadStudentFromCloud(user.uid);
        if (cloudData) {
          setStudentState(prev => {
            const merged: StudentState = {
              ...cloudData,
              name: cloudData.name || user.displayName || prev.name,
              xp: Math.max(cloudData.xp || 0, prev.xp || 0),
              completedLessonIds: Array.from(new Set([...(cloudData.completedLessonIds || []), ...(prev.completedLessonIds || [])])),
              bookmarkedQuestionIds: Array.from(new Set([...(cloudData.bookmarkedQuestionIds || []), ...(prev.bookmarkedQuestionIds || [])])),
              totalQuestionsAttempted: Math.max(cloudData.totalQuestionsAttempted || 0, prev.totalQuestionsAttempted || 0),
              totalQuestionsCorrect: Math.max(cloudData.totalQuestionsCorrect || 0, prev.totalQuestionsCorrect || 0),
              unlockedBadges: Array.from(new Set([...(cloudData.unlockedBadges || []), ...(prev.unlockedBadges || [])])),
              selectedGrade: cloudData.selectedGrade || prev.selectedGrade || selectedGrade,
              examResults: [
                ...(cloudData.examResults || []),
                ...(prev.examResults || []).filter(r => !cloudData.examResults?.some(cr => cr.id === r.id))
              ],
              notes: [
                ...(cloudData.notes || []),
                ...(prev.notes || []).filter(n => !cloudData.notes?.some(cn => cn.id === n.id))
              ]
            };
            if (merged.selectedGrade) {
              setSelectedGrade(merged.selectedGrade);
            }
            saveStudentState(merged);
            saveStudentToCloud(merged);
            return merged;
          });
        } else {
          // Initial cloud save for new account
          const initialCloudState = {
            ...studentState,
            name: user.displayName || studentState.name,
          };
          setStudentState(initialCloudState);
          saveStudentToCloud(initialCloudState);
        }
      } else if (!user) {
        prevUserIdRef.current = null;
      }
    }
    syncOnLogin();
  }, [user]);

  // Handle grade change
  const handleSelectGrade = (newGrade: EducationalGrade) => {
    setSelectedGrade(newGrade);
    setStudentState(prev => {
      const updated = { ...prev, selectedGrade: newGrade };
      if (user) saveStudentToCloud(updated);
      return updated;
    });
    const units = newGrade === 'third-intermediate' ? THIRD_INTERMEDIATE_UNITS : CURRICULUM_UNITS;
    setActiveUnit(units[0]);
    setActiveLesson(units[0].lessons[0]);
    handleNavigateTab('dashboard');
  };

  // Persist student state changes locally & to cloud
  useEffect(() => {
    const fullState = {
      ...studentState,
      selectedGrade,
    };
    saveStudentState(fullState);
    if (user) {
      saveStudentToCloud(fullState);
    }
  }, [studentState, selectedGrade, user]);

  // Handle selecting a unit from dashboard
  const handleSelectUnit = (unit: Unit) => {
    setActiveUnit(unit);
    if (unit.lessons.length > 0) {
      setActiveLesson(unit.lessons[0]);
      setStudentState(prev => ({ ...prev, lastVisitedLessonId: unit.lessons[0].id }));
    }
    handleNavigateTab('lesson');
  };

  // Handle selecting a specific lesson
  const handleSelectLesson = (lesson: Lesson) => {
    const parentUnit = currentUnits.find(u => u.id === lesson.unitId) || currentUnits[0];
    setActiveUnit(parentUnit);
    setActiveLesson(lesson);
    setStudentState(prev => ({ ...prev, lastVisitedLessonId: lesson.id }));
    handleNavigateTab('lesson');
  };

  // Toggle complete lesson with progress percentage
  const handleToggleCompleteLesson = (lessonId: string) => {
    setStudentState(prev => {
      const isAlreadyCompleted = prev.completedLessonIds.includes(lessonId);
      let updated: string[];
      let addedXp = 0;

      if (isAlreadyCompleted) {
        updated = prev.completedLessonIds.filter(id => id !== lessonId);
      } else {
        updated = [...prev.completedLessonIds, lessonId];
        addedXp = 50;
        triggerCelebration();
      }

      // Check badge unlock
      const newBadges = [...prev.unlockedBadges];
      if (updated.length >= 1 && !newBadges.includes('first-step')) {
        newBadges.push('first-step');
      }
      if (updated.length >= 5 && !newBadges.includes('grammar-master')) {
        newBadges.push('grammar-master');
      }

      return {
        ...prev,
        completedLessonIds: updated,
        xp: Math.max(0, prev.xp + addedXp),
        unlockedBadges: newBadges
      };
    });
  };

  // Handle answering interactive exercises
  const handleAnswerExercise = (exerciseId: string, isCorrect: boolean) => {
    setStudentState(prev => {
      const wasAlreadyAnswered = prev.answeredExercises[exerciseId];
      if (wasAlreadyAnswered !== undefined) return prev;

      const addedXp = isCorrect ? 20 : 5;
      if (isCorrect) triggerCelebration();

      const totalAttempted = prev.totalQuestionsAttempted + 1;
      const totalCorrect = prev.totalQuestionsCorrect + (isCorrect ? 1 : 0);

      const newBadges = [...prev.unlockedBadges];
      if (totalAttempted >= 10 && !newBadges.includes('dedicated-scholar')) {
        newBadges.push('dedicated-scholar');
      }

      return {
        ...prev,
        xp: prev.xp + addedXp,
        answeredExercises: { ...prev.answeredExercises, [exerciseId]: isCorrect },
        totalQuestionsAttempted: totalAttempted,
        totalQuestionsCorrect: totalCorrect,
        unlockedBadges: newBadges
      };
    });
  };

  // Handle ministerial question answers
  const handleRecordQuestionAnswer = (questionId: string, isCorrect: boolean) => {
    setStudentState(prev => ({
      ...prev,
      xp: prev.xp + (isCorrect ? 25 : 5),
      totalQuestionsAttempted: prev.totalQuestionsAttempted + 1,
      totalQuestionsCorrect: prev.totalQuestionsCorrect + (isCorrect ? 1 : 0)
    }));
  };

  // Update Student Name
  const handleUpdateStudentName = (newName: string) => {
    setStudentState(prev => ({ ...prev, name: newName }));
  };

  // Reset progress
  const handleResetProgress = () => {
    setStudentState(INITIAL_STUDENT_STATE);
  };

  // 1. Loading State while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center space-y-4" dir="rtl">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center animate-pulse">
          <GraduationCap className="w-8 h-8 text-indigo-400" />
        </div>
        <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>جاري فتح منصة النموذجية السحابية...</span>
        </div>
        <p className="text-xs text-indigo-200">إشراف الأستاذ مصطفى تركي • OMEGA V3</p>
      </div>
    );
  }

  // 2. Compulsory Authentication Gate (Blocks site until registered / logged in)
  if (!user) {
    return (
      <AuthGate
        onSuccessfulAuth={(name, grade) => {
          if (name) handleUpdateStudentName(name);
          if (grade) handleSelectGrade(grade);
        }}
      />
    );
  }

  // 3. Authenticated Full Platform Experience
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white" dir="rtl">
      
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleNavigateTab}
        studentState={studentState}
        selectedGrade={selectedGrade}
        onSelectGrade={handleSelectGrade}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAuth={() => setIsProfileOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Interactive Views */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {currentTab === 'dashboard' && (
          <Dashboard
            selectedGrade={selectedGrade}
            studentState={studentState}
            onSelectGrade={handleSelectGrade}
            onSelectUnit={handleSelectUnit}
            onSelectLesson={handleSelectLesson}
            onNavigateTab={handleNavigateTab}
          />
        )}

        {currentTab === 'review' && (
          <SmartReviewSection
            studentState={studentState}
            currentUnits={currentUnits}
            onSelectLesson={handleSelectLesson}
            onNavigateToTab={handleNavigateTab}
          />
        )}

        {currentTab === 'lesson' && activeUnit && activeLesson && (
          <LessonViewer
            unit={activeUnit}
            lesson={activeLesson}
            onBackToDashboard={() => handleNavigateTab('dashboard')}
            onSelectLesson={handleSelectLesson}
            isCompleted={studentState.completedLessonIds.includes(activeLesson.id)}
            onToggleComplete={handleToggleCompleteLesson}
            onAnswerExercise={handleAnswerExercise}
          />
        )}

        {currentTab === 'exam' && (
          <ExamEngine
            studentName={studentState.name}
            grade={selectedGrade}
            onRecordAnswer={(qId, isCorrect) => handleRecordQuestionAnswer(qId, isCorrect)}
          />
        )}

        {currentTab === 'mock' && (
          <div className="max-w-5xl mx-auto">
            <MinisterialMockSimulator
              studentName={studentState.name}
              grade={selectedGrade}
              onClose={() => handleNavigateTab('dashboard')}
              onRecordScore={(score) => {
                handleRecordQuestionAnswer('mock-exam-complete', score >= 50);
              }}
            />
          </div>
        )}

        {currentTab === 'literature' && (
          <LiteratureSection grade={selectedGrade} />
        )}

        {currentTab === 'essays' && (
          <EssaysSection grade={selectedGrade} />
        )}

        {currentTab === 'malzama' && (
          <MalzamaUploadLab 
            onNavigateToUnits={() => handleNavigateTab('dashboard')}
            onNavigateToMock={() => handleNavigateTab('mock')}
            onSelectGrade={handleSelectGrade}
          />
        )}

        {currentTab === 'verbs' && (
          <IrregularVerbsLab
            onRecordAnswer={(isCorrect) => handleRecordQuestionAnswer('verb-answer', isCorrect)}
          />
        )}

        {currentTab === 'vocab' && (
          <VisualVocabAtlas />
        )}
      </main>

      {/* Global Search & Command Palette Modal (Ctrl + K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLesson={handleSelectLesson}
        onNavigateToTab={handleNavigateTab}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-bold text-slate-700">
            المنصة الرقمية المتكاملة لملزمة «النموذجية في اللغة الإنكليزية - {isThirdIntermediate ? 'الثالث المتوسط 2027' : 'السادس الإعدادي 2027'}»
          </p>
          <p>
            إعداد وإشراف الأستاذ مصطفى تركي • OMEGA V3 Architecture
          </p>
        </div>
      </footer>

      {/* Profile & Achievements Modal */}
      <StudentProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        studentState={studentState}
        onUpdateName={handleUpdateStudentName}
        onResetProgress={handleResetProgress}
        onOpenAuth={() => setIsProfileOpen(true)}
      />

    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}

export default App;
