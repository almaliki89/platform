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
import { SmartReviewSection } from './components/SmartReviewSection';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AuthGate } from './components/AuthGate';
import { SubjectDetailView } from './components/SubjectDetailView';
import { SimulationsHub } from './components/SimulationsHub';

import { CURRICULUM_UNITS } from './data/curriculumData';
import { THIRD_INTERMEDIATE_UNITS } from './data/thirdIntermediateData';
import { Unit, Lesson, StudentState, EducationalGrade } from './types';
import { SubjectId } from './types/subject';
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
      'essays', 'verbs', 'vocab', 'review'
    ];
    return validTabs.includes(hash) ? hash : 'dashboard';
  });

  // OMEGA V4 Multi-subject & Simulation states
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId | null>(null);
  const [selectedSimulationId, setSelectedSimulationId] = useState<string | undefined>(undefined);
  const [isSimulationsOpen, setIsSimulationsOpen] = useState(false);

  // Global Search Modal state
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
        'essays', 'verbs', 'vocab', 'review'
      ];
      if (validTabs.includes(hash) && hash !== currentTab) {
        setCurrentTab(hash);
        setSelectedSubjectId(null);
        setIsSimulationsOpen(false);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentTab]);

  const handleNavigateTab = (tab: NavTabId) => {
    setCurrentTab(tab);
    setSelectedSubjectId(null);
    setIsSimulationsOpen(false);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSubject = (subjectId: SubjectId) => {
    setSelectedSubjectId(subjectId);
    setSelectedSimulationId(undefined);
    setIsSimulationsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSimulations = (subjectId: SubjectId, simulationId?: string) => {
    setSelectedSubjectId(subjectId);
    setSelectedSimulationId(simulationId);
    setIsSimulationsOpen(true);
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

  // Sync with Firestore when user logs in
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

  const handleSelectGrade = (newGrade: EducationalGrade) => {
    setSelectedGrade(newGrade);
    const newUnitsList = newGrade === 'third-intermediate' ? THIRD_INTERMEDIATE_UNITS : CURRICULUM_UNITS;
    setActiveUnit(newUnitsList[0]);
    setActiveLesson(newUnitsList[0].lessons[0]);
    setStudentState(prev => {
      const updated = { ...prev, selectedGrade: newGrade };
      saveStudentState(updated);
      if (user) saveStudentToCloud(updated);
      return updated;
    });
  };

  const handleSelectLesson = (lesson: Lesson) => {
    const unit = currentUnits.find(u => u.id === lesson.unitId) || currentUnits[0];
    setActiveUnit(unit);
    setActiveLesson(lesson);
    setCurrentTab('lesson');
    setSelectedSubjectId(null);
    setIsSimulationsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setStudentState(prev => {
      const updated = { ...prev, lastVisitedLessonId: lesson.id };
      saveStudentState(updated);
      if (user) saveStudentToCloud(updated);
      return updated;
    });
  };

  const handleSelectUnit = (unit: Unit) => {
    setActiveUnit(unit);
    if (unit.lessons.length > 0) {
      handleSelectLesson(unit.lessons[0]);
    }
  };

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

      const newBadges = [...prev.unlockedBadges];
      if (updated.length >= 1 && !newBadges.includes('first-step')) {
        newBadges.push('first-step');
      }
      if (updated.length >= 5 && !newBadges.includes('grammar-master')) {
        newBadges.push('grammar-master');
      }

      const nextState = {
        ...prev,
        completedLessonIds: updated,
        xp: Math.max(0, prev.xp + addedXp),
        unlockedBadges: newBadges
      };

      saveStudentState(nextState);
      if (user) saveStudentToCloud(nextState);
      return nextState;
    });
  };

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

      const nextState = {
        ...prev,
        xp: prev.xp + addedXp,
        answeredExercises: { ...prev.answeredExercises, [exerciseId]: isCorrect },
        totalQuestionsAttempted: totalAttempted,
        totalQuestionsCorrect: totalCorrect,
        unlockedBadges: newBadges
      };

      saveStudentState(nextState);
      if (user) saveStudentToCloud(nextState);
      return nextState;
    });
  };

  const handleRecordQuestionAnswer = (questionId: string, isCorrect: boolean) => {
    setStudentState(prev => {
      const nextState = {
        ...prev,
        xp: prev.xp + (isCorrect ? 25 : 5),
        totalQuestionsAttempted: prev.totalQuestionsAttempted + 1,
        totalQuestionsCorrect: prev.totalQuestionsCorrect + (isCorrect ? 1 : 0)
      };
      saveStudentState(nextState);
      if (user) saveStudentToCloud(nextState);
      return nextState;
    });
  };

  const handleUpdateStudentName = (newName: string) => {
    setStudentState(prev => {
      const nextState = { ...prev, name: newName };
      saveStudentState(nextState);
      if (user) saveStudentToCloud(nextState);
      return nextState;
    });
  };

  const handleResetProgress = () => {
    setStudentState(INITIAL_STUDENT_STATE);
    saveStudentState(INITIAL_STUDENT_STATE);
    if (user) saveStudentToCloud(INITIAL_STUDENT_STATE);
  };

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
        <p className="text-xs text-indigo-200">إشراف الأستاذ مصطفى تركي • OMEGA V4</p>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white" dir="rtl">
      
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

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {selectedSubjectId && isSimulationsOpen ? (
          <SimulationsHub
            subjectId={selectedSubjectId}
            initialSimulationId={selectedSimulationId}
            onBack={() => setIsSimulationsOpen(false)}
          />
        ) : selectedSubjectId && !isSimulationsOpen ? (
          <SubjectDetailView
            subjectId={selectedSubjectId}
            studentState={studentState}
            onBack={() => setSelectedSubjectId(null)}
            onSelectLesson={handleSelectLesson}
            onOpenSimulations={handleOpenSimulations}
          />
        ) : currentTab === 'dashboard' ? (
          <Dashboard
            selectedGrade={selectedGrade}
            studentState={studentState}
            onSelectGrade={handleSelectGrade}
            onSelectUnit={handleSelectUnit}
            onSelectLesson={handleSelectLesson}
            onNavigateTab={handleNavigateTab}
            onSelectSubject={handleSelectSubject}
            onOpenSimulations={handleOpenSimulations}
          />
        ) : currentTab === 'review' ? (
          <SmartReviewSection
            studentState={studentState}
            currentUnits={currentUnits}
            onSelectLesson={handleSelectLesson}
            onNavigateToTab={handleNavigateTab}
          />
        ) : currentTab === 'lesson' && activeUnit && activeLesson ? (
          <LessonViewer
            unit={activeUnit}
            lesson={activeLesson}
            onBackToDashboard={() => handleNavigateTab('dashboard')}
            onSelectLesson={handleSelectLesson}
            isCompleted={studentState.completedLessonIds.includes(activeLesson.id)}
            onToggleComplete={handleToggleCompleteLesson}
            onAnswerExercise={handleAnswerExercise}
          />
        ) : currentTab === 'exam' ? (
          <ExamEngine
            onRecordAnswer={handleRecordQuestionAnswer}
            grade={selectedGrade}
          />
        ) : currentTab === 'mock' ? (
          <MinisterialMockSimulator
            studentName={studentState.name}
            onClose={() => handleNavigateTab('dashboard')}
            grade={selectedGrade}
          />
        ) : currentTab === 'literature' ? (
          <LiteratureSection
            grade={selectedGrade}
          />
        ) : currentTab === 'essays' ? (
          <EssaysSection
            grade={selectedGrade}
          />
        ) : currentTab === 'verbs' ? (
          <IrregularVerbsLab
            onRecordAnswer={(isCorrect) => handleRecordQuestionAnswer('verb', isCorrect)}
          />
        ) : currentTab === 'vocab' ? (
          <VisualVocabAtlas />
        ) : null}

      </main>

      {isProfileOpen && (
        <StudentProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          studentState={studentState}
          onUpdateName={handleUpdateStudentName}
          onResetProgress={handleResetProgress}
          onOpenAuth={() => {}}
        />
      )}

      {isSearchOpen && (
        <GlobalSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectLesson={handleSelectLesson}
          onNavigateToTab={handleNavigateTab}
        />
      )}

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-bold text-slate-700 dark:text-slate-300">
            منصة النموذجية التعليمية العراقية • OMEGA V4 Multi-Subject Platform & 3D Science Engine
          </p>
          <p>إشراف الأستاذ مصطفى تركي • جميع الحقوق محفوظة © 2027</p>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
