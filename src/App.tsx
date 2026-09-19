import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { LessonViewer } from './components/LessonViewer';
import { ExamEngine } from './components/ExamEngine';
import { LiteratureSection } from './components/LiteratureSection';
import { EssaysSection } from './components/EssaysSection';
import { IrregularVerbsLab } from './components/IrregularVerbsLab';
import { StudentProfileModal } from './components/StudentProfileModal';

import { CURRICULUM_UNITS } from './data/curriculumData';
import { Unit, Lesson, StudentState } from './types';
import { 
  loadStudentState, 
  saveStudentState, 
  triggerCelebration, 
  INITIAL_STUDENT_STATE 
} from './utils/storage';

export function App() {
  // Navigation tabs
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'lesson' | 'exam' | 'literature' | 'essays' | 'verbs'>('dashboard');

  // Currently viewed Unit and Lesson
  const [activeUnit, setActiveUnit] = useState<Unit>(CURRICULUM_UNITS[0]);
  const [activeLesson, setActiveLesson] = useState<Lesson>(CURRICULUM_UNITS[0].lessons[0]);

  // Modals state
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Student progress state
  const [studentState, setStudentState] = useState<StudentState>(loadStudentState);

  // Persist student state changes
  useEffect(() => {
    saveStudentState(studentState);
  }, [studentState]);

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
    const parentUnit = CURRICULUM_UNITS.find(u => u.id === lesson.unitId) || CURRICULUM_UNITS[0];
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

      return {
        ...prev,
        completedLessonIds: updated,
        xp: prev.xp + addedXp
      };
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

      return {
        ...prev,
        totalQuestionsAttempted: newAttempted,
        totalQuestionsCorrect: newCorrect,
        xp: prev.xp + gainedXp,
        answeredExercises: {
          ...prev.answeredExercises,
          [exerciseId]: isCorrect
        }
      };
    });
  };

  // Record exam or verb answer
  const handleRecordQuestionAnswer = (questionIdOrIsCorrect: string | boolean, maybeIsCorrect?: boolean) => {
    const isCorrect = typeof questionIdOrIsCorrect === 'boolean' 
      ? questionIdOrIsCorrect 
      : !!maybeIsCorrect;

    setStudentState(prev => ({
      ...prev,
      totalQuestionsAttempted: prev.totalQuestionsAttempted + 1,
      totalQuestionsCorrect: isCorrect ? prev.totalQuestionsCorrect + 1 : prev.totalQuestionsCorrect,
      xp: prev.xp + (isCorrect ? 15 : 5)
    }));
  };

  // Update student name
  const handleUpdateStudentName = (newName: string) => {
    setStudentState(prev => ({ ...prev, name: newName }));
  };

  // Reset progress
  const handleResetProgress = () => {
    setStudentState(INITIAL_STUDENT_STATE);
    setIsProfileOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        studentState={studentState}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentTab === 'dashboard' && (
          <Dashboard
            studentState={studentState}
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
            onRecordAnswer={(qId, isCorrect) => handleRecordQuestionAnswer(qId, isCorrect)}
          />
        )}

        {currentTab === 'literature' && (
          <LiteratureSection />
        )}

        {currentTab === 'essays' && (
          <EssaysSection />
        )}

        {currentTab === 'verbs' && (
          <IrregularVerbsLab
            onRecordAnswer={(isCorrect) => handleRecordQuestionAnswer(isCorrect)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-bold text-slate-700">
            المنصة الرقمية المتكاملة لملزمة «النموذجية في اللغة الإنكليزية - السادس الإعدادي 2027»
          </p>
          <p>
            إعداد وإشراف الأستاذ مصطفى تركي • صممت وبرمجت وفق أحدث المعايير الوزارية والتربوية
          </p>
        </div>
      </footer>

      {/* Modals */}
      <StudentProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        studentState={studentState}
        onUpdateName={handleUpdateStudentName}
        onResetProgress={handleResetProgress}
      />

    </div>
  );
}

export default App;
