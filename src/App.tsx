import React, { useState, useEffect } from 'react';
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

import { CURRICULUM_UNITS } from './data/curriculumData';
import { THIRD_INTERMEDIATE_UNITS } from './data/thirdIntermediateData';
import { Unit, Lesson, StudentState, EducationalGrade } from './types';
import { 
  loadStudentState, 
  saveStudentState, 
  triggerCelebration, 
  INITIAL_STUDENT_STATE 
} from './utils/storage';

export function App() {
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

  // Handle grade change
  const handleSelectGrade = (newGrade: EducationalGrade) => {
    setSelectedGrade(newGrade);
    setStudentState(prev => ({ ...prev, selectedGrade: newGrade }));
    const units = newGrade === 'third-intermediate' ? THIRD_INTERMEDIATE_UNITS : CURRICULUM_UNITS;
    setActiveUnit(units[0]);
    setActiveLesson(units[0].lessons[0]);
    setCurrentTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Persist student state changes
  useEffect(() => {
    saveStudentState({
      ...studentState,
      selectedGrade,
    });
  }, [studentState, selectedGrade]);

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
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white flex flex-col w-full max-w-full overflow-x-hidden">
      
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        studentState={studentState}
        selectedGrade={selectedGrade}
        onSelectGrade={handleSelectGrade}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-5 sm:pt-8 min-w-0">
        {currentTab === 'dashboard' && (
          <Dashboard
            studentState={studentState}
            selectedGrade={selectedGrade}
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
              onRecordScore={(score, total) => {
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
