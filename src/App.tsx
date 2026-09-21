import React, { useState, useEffect, useRef } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
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

  // Navigation tabs
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'lesson' | 'exam' | 'mock' | 'literature' | 'essays' | 'verbs' | 'vocab' | 'malzama'>('dashboard');

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

  // Sync with Firestore when user logs in
  const prevUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    async function syncOnLogin() {
      if (user && user.uid !== prevUserIdRef.current) {
        prevUserIdRef.current = user.uid;
        const cloudData = await loadStudentFromCloud(user.uid);
        if (cloudData) {
          // Merge local and cloud progress smartly (take highest XP/progress)
          setStudentState(prev => {
            const merged: StudentState = {
              ...cloudData,
              name: cloudData.name || user.displayName || prev.name,
              xp: Math.max(cloudData.xp || 0, prev.xp || 0),
              completedLessonIds: Array.from(new Set([...cloudData.completedLessonIds, ...prev.completedLessonIds])),
              bookmarkedQuestionIds: Array.from(new Set([...cloudData.bookmarkedQuestionIds, ...prev.bookmarkedQuestionIds])),
              totalQuestionsAttempted: Math.max(cloudData.totalQuestionsAttempted || 0, prev.totalQuestionsAttempted || 0),
              totalQuestionsCorrect: Math.max(cloudData.totalQuestionsCorrect || 0, prev.totalQuestionsCorrect || 0),
              unlockedBadges: Array.from(new Set([...cloudData.unlockedBadges, ...prev.unlockedBadges])),
              selectedGrade: cloudData.selectedGrade || prev.selectedGrade || selectedGrade
            };
            if (merged.selectedGrade) {
              setSelectedGrade(merged.selectedGrade);
            }
            saveStudentState(merged);
            saveStudentToCloud(merged);
            return merged;
          });
        } else {
          // First time cloud user -> Upload current progress
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
    setCurrentTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    setCurrentTab('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle selecting a specific lesson
  const handleSelectLesson = (lesson: Lesson) => {
    const parentUnit = currentUnits.find(u => u.id === lesson.unitId) || currentUnits[0];
    setActiveUnit(parentUnit);
    setActiveLesson(lesson);
    setStudentState(prev => ({ ...prev, lastVisitedLessonId: lesson.id }));
    setCurrentTab('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle complete lesson
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

      const newState = {
        ...prev,
        completedLessonIds: updated,
        xp: prev.xp + addedXp
      };
      if (user) saveStudentToCloud(newState);
      return newState;
    });
  };

  // Record exercise answer
  const handleAnswerExercise = (exerciseId: string, isCorrect: boolean) => {
    setStudentState(prev => {
      const newAttempted = prev.totalQuestionsAttempted + 1;
      const newCorrect = isCorrect ? prev.totalQuestionsCorrect + 1 : prev.totalQuestionsCorrect;
      const gainedXp = isCorrect ? 25 : 5;

      if (isCorrect) {
        triggerCelebration();
      }

      const newState = {
        ...prev,
        totalQuestionsAttempted: newAttempted,
        totalQuestionsCorrect: newCorrect,
        xp: prev.xp + gainedXp,
        answeredExercises: {
          ...prev.answeredExercises,
          [exerciseId]: isCorrect
        }
      };
      if (user) saveStudentToCloud(newState);
      return newState;
    });
  };

  // Record exam or verb answer
  const handleRecordQuestionAnswer = (questionIdOrIsCorrect: string | boolean, maybeIsCorrect?: boolean) => {
    const isCorrect = typeof questionIdOrIsCorrect === 'boolean' 
      ? questionIdOrIsCorrect 
      : !!maybeIsCorrect;

    setStudentState(prev => {
      const newAttempted = prev.totalQuestionsAttempted + 1;
      const newCorrect = isCorrect ? prev.totalQuestionsCorrect + 1 : prev.totalQuestionsCorrect;
      const gainedXp = isCorrect ? 20 : 5;

      if (isCorrect) {
        triggerCelebration();
      }

      const newState = {
        ...prev,
        totalQuestionsAttempted: newAttempted,
        totalQuestionsCorrect: newCorrect,
        xp: prev.xp + gainedXp
      };
      if (user) saveStudentToCloud(newState);
      return newState;
    });
  };

  // Update student name
  const handleUpdateStudentName = (newName: string) => {
    setStudentState(prev => {
      const newState = { ...prev, name: newName };
      if (user) saveStudentToCloud(newState);
      return newState;
    });
  };

  // Reset student progress
  const handleResetProgress = () => {
    const resetState = {
      ...INITIAL_STUDENT_STATE,
      name: studentState.name
    };
    setStudentState(resetState);
    saveStudentState(resetState);
    if (user) saveStudentToCloud(resetState);
  };

  // 1. Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-white" dir="rtl">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center mb-4 shadow-xl shadow-indigo-500/20">
          <GraduationCap className="w-8 h-8 text-white animate-pulse" />
        </div>
        <div className="flex items-center gap-2 font-black text-lg text-white mb-2">
          <Loader2 className="w-5 h-5 animate-spin text-amber-300" />
          <span>جاري فتح منصة النموذجية السحابية...</span>
        </div>
        <p className="text-xs text-indigo-200">إشراف الأستاذ مصطفى تركي • 2027</p>
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
        setCurrentTab={setCurrentTab}
        studentState={studentState}
        selectedGrade={selectedGrade}
        onSelectGrade={handleSelectGrade}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAuth={() => setIsProfileOpen(true)}
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
            onNavigateTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'lesson' && activeUnit && activeLesson && (
          <LessonViewer
            unit={activeUnit}
            lesson={activeLesson}
            onBackToDashboard={() => setCurrentTab('dashboard')}
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
              onClose={() => setCurrentTab('dashboard')}
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
            onNavigateToUnits={() => {
              setCurrentTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToMock={() => {
              setCurrentTab('mock');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectGrade={handleSelectGrade}
          />
        )}

        {currentTab === 'verbs' && (
          <IrregularVerbsLab
            onRecordAnswer={(isCorrect) => handleRecordQuestionAnswer(isCorrect)}
          />
        )}

        {currentTab === 'vocab' && (
          <VisualVocabAtlas />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-bold text-slate-700">
            المنصة الرقمية المتكاملة لملزمة «النموذجية في اللغة الإنكليزية - {isThirdIntermediate ? 'الثالث المتوسط 2027' : 'السادس الإعدادي 2027'}»
          </p>
          <p>
            إعداد وإشراف الأستاذ مصطفى تركي • صممت وبرمجت وفق أحدث المعايير الوزارية والتربوية
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
