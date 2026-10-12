import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
  Navigate,
} from 'react-router-dom';
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
import { SmartReviewSection } from './components/SmartReviewSection';
import { AuthGate } from './components/AuthGate';
import { SubjectDetailView } from './components/SubjectDetailView';
import { GradePageView } from './components/GradePageView';
import { NotFound } from './components/NotFound';

import { getUnitsForGrade, getGradeMeta, ORDERED_GRADES } from './data/gradeContentResolver';
import { Unit, Lesson, StudentState, EducationalGrade } from './types';
import { SubjectId } from './types/subject';
import {
  loadStudentState,
  saveStudentState,
  triggerCelebration,
  INITIAL_STUDENT_STATE,
} from './utils/storage';
import { isValidSubjectId } from './routes';
import { GraduationCap, Loader2 } from 'lucide-react';

function SubjectDetailRouteWrapper({
  studentState,
  onSelectLesson,
}: {
  studentState: StudentState;
  onSelectLesson: (lesson: Lesson) => void;
}) {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();

  if (!isValidSubjectId(subjectId)) {
    return <Navigate to="/subjects" replace />;
  }

  return (
    <SubjectDetailView
      subjectId={subjectId}
      studentState={studentState}
      onBack={() => navigate('/subjects')}
      onSelectLesson={onSelectLesson}
    />
  );
}

function LessonRouteWrapper({
  currentUnits,
  studentState,
  onSelectLesson,
  onToggleComplete,
  onAnswerExercise,
}: {
  currentUnits: Unit[];
  studentState: StudentState;
  onSelectLesson: (lesson: Lesson) => void;
  onToggleComplete: (lessonId: string) => void;
  onAnswerExercise: (exerciseId: string, isCorrect: boolean) => void;
}) {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();

  // Search in current grade units first, then fallback across all known units
  const allUnits = ORDERED_GRADES.flatMap((g) => getUnitsForGrade(g));
  let foundUnit: Unit | undefined;
  let foundLesson: Lesson | undefined;

  for (const unit of currentUnits) {
    const l = unit.lessons.find((item: Lesson) => item.id === lessonId);
    if (l) {
      foundUnit = unit;
      foundLesson = l;
      break;
    }
  }

  if (!foundLesson) {
    for (const unit of allUnits) {
      const l = unit.lessons.find((item: Lesson) => item.id === lessonId);
      if (l) {
        foundUnit = unit;
        foundLesson = l;
        break;
      }
    }
  }

  if (!foundUnit || !foundLesson) {
    return <NotFound />;
  }

  return (
    <LessonViewer
      unit={foundUnit}
      lesson={foundLesson}
      onBackToDashboard={() => navigate('/')}
      onSelectLesson={onSelectLesson}
      isCompleted={studentState.completedLessonIds.includes(foundLesson.id)}
      onToggleComplete={onToggleComplete}
      onAnswerExercise={onAnswerExercise}
    />
  );
}

function MainAppContent() {
  const { user, loading, saveStudentToCloud, loadStudentFromCloud } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  // Student progress state
  const [studentState, setStudentState] = useState<StudentState>(loadStudentState);

  // Active Grade selection
  const [selectedGrade, setSelectedGrade] = useState<EducationalGrade>(() => {
    return studentState.selectedGrade || 'sixth-preparatory';
  });

  const currentUnits = getUnitsForGrade(selectedGrade);
  const currentGradeMeta = getGradeMeta(selectedGrade);

  // Profile Modal state
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Backward Compatibility: Translate old hash navigation to real React Router paths on initial load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const hashMap: Record<string, string> = {
        dashboard: '/',
        subjects: '/subjects',
        review: '/review',
        mock: '/mock',
        exam: '/exam',
        literature: '/literature',
        essays: '/essays',
        verbs: '/verbs',
        vocab: '/vocab',
      };
      const targetPath = hashMap[hash];
      if (targetPath) {
        navigate(targetPath, { replace: true });
        window.history.replaceState(null, '', targetPath);
      }
    }
  }, [navigate]);


  // Sync with Firestore when user logs in
  const prevUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function syncOnLogin() {
      if (user && user.uid !== prevUserIdRef.current) {
        prevUserIdRef.current = user.uid;
        const cloudData = await loadStudentFromCloud(user.uid);
        if (isCancelled) return;

        if (cloudData) {
          const currentLocal = loadStudentState();
          const merged: StudentState = {
            ...cloudData,
            name: cloudData.name || user.displayName || currentLocal.name,
            xp: Math.max(cloudData.xp || 0, currentLocal.xp || 0),
            completedLessonIds: Array.from(
              new Set([...(cloudData.completedLessonIds || []), ...(currentLocal.completedLessonIds || [])])
            ),
            bookmarkedQuestionIds: Array.from(
              new Set([...(cloudData.bookmarkedQuestionIds || []), ...(currentLocal.bookmarkedQuestionIds || [])])
            ),
            totalQuestionsAttempted: Math.max(
              cloudData.totalQuestionsAttempted || 0,
              currentLocal.totalQuestionsAttempted || 0
            ),
            totalQuestionsCorrect: Math.max(
              cloudData.totalQuestionsCorrect || 0,
              currentLocal.totalQuestionsCorrect || 0
            ),
            unlockedBadges: Array.from(
              new Set([...(cloudData.unlockedBadges || []), ...(currentLocal.unlockedBadges || [])])
            ),
            selectedGrade: cloudData.selectedGrade || currentLocal.selectedGrade || selectedGrade,
            answeredExercises: {
              ...(cloudData.answeredExercises || {}),
              ...(currentLocal.answeredExercises || {}),
            },
          };

          if (cloudData.selectedGrade) {
            setSelectedGrade(cloudData.selectedGrade);
          }
          setStudentState(merged);
          saveStudentState(merged);
          await saveStudentToCloud(merged);
        } else {
          const currentLocal = loadStudentState();
          const initialCloudState: StudentState = {
            ...currentLocal,
            name: user.displayName || currentLocal.name,
          };
          setStudentState(initialCloudState);
          saveStudentState(initialCloudState);
          await saveStudentToCloud(initialCloudState);
        }
      } else if (!user) {
        prevUserIdRef.current = null;
      }
    }

    syncOnLogin();

    return () => {
      isCancelled = true;
    };
  }, [user]);

  // Synchronize studentState to cloud after state transitions (never during render)
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (user) {
      saveStudentToCloud(studentState);
    }
  }, [studentState, user]);

  const handleSelectGrade = (newGrade: EducationalGrade) => {
    setSelectedGrade(newGrade);
    setStudentState((prev) => {
      const updated = { ...prev, selectedGrade: newGrade };
      saveStudentState(updated);
      return updated;
    });
  };

  const handleSelectLesson = (lesson: Lesson) => {
    navigate(`/lesson/${lesson.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setStudentState((prev) => {
      const updated = { ...prev, lastVisitedLessonId: lesson.id };
      saveStudentState(updated);
      return updated;
    });
  };

  const handleSelectUnit = (unit: Unit) => {
    if (unit.lessons.length > 0) {
      handleSelectLesson(unit.lessons[0]);
    }
  };

  const handleToggleCompleteLesson = (lessonId: string) => {
    setStudentState((prev) => {
      const isAlreadyCompleted = prev.completedLessonIds.includes(lessonId);
      let updated: string[];
      let addedXp = 0;

      if (isAlreadyCompleted) {
        updated = prev.completedLessonIds.filter((id) => id !== lessonId);
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
        unlockedBadges: newBadges,
      };

      saveStudentState(nextState);
      return nextState;
    });
  };

  const handleAnswerExercise = (exerciseId: string, isCorrect: boolean) => {
    setStudentState((prev) => {
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
        unlockedBadges: newBadges,
      };

      saveStudentState(nextState);
      return nextState;
    });
  };

  const handleRecordQuestionAnswer = (questionId: string, isCorrect: boolean) => {
    setStudentState((prev) => {
      const nextState = {
        ...prev,
        xp: prev.xp + (isCorrect ? 25 : 5),
        totalQuestionsAttempted: prev.totalQuestionsAttempted + 1,
        totalQuestionsCorrect: prev.totalQuestionsCorrect + (isCorrect ? 1 : 0),
      };
      saveStudentState(nextState);
      return nextState;
    });
  };

  const handleUpdateStudentName = (newName: string) => {
    setStudentState((prev) => {
      const nextState = { ...prev, name: newName };
      saveStudentState(nextState);
      return nextState;
    });
  };

  const handleResetProgress = () => {
    setStudentState(INITIAL_STUDENT_STATE);
    saveStudentState(INITIAL_STUDENT_STATE);
  };

  if (loading) {
    return (
      <div
        className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center space-y-4"
        dir="rtl"
      >
        <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center animate-pulse">
          <GraduationCap className="w-8 h-8 text-indigo-400" />
        </div>
        <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>جاري فتح منصة النموذجية السحابية...</span>
        </div>
        <p className="text-xs text-indigo-200">إشراف الأستاذ مصطفى تركي</p>
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
    <div
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white"
      dir="rtl"
    >
      <Navbar
        studentState={studentState}
        selectedGrade={selectedGrade}
        onSelectGrade={handleSelectGrade}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAuth={() => setIsProfileOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-x-hidden">
        <Routes>
          {/* Dashboard / English Hub */}
          <Route
            path="/"
            element={
              <Dashboard
                selectedGrade={selectedGrade}
                studentState={studentState}
                onSelectGrade={handleSelectGrade}
                onSelectUnit={handleSelectUnit}
                onSelectLesson={handleSelectLesson}
                onNavigateTab={(tab) => navigate(`/${tab}`)}
                onSelectSubject={(sId) => navigate(`/subject/${sId}`)}
              />
            }
          />
          <Route
            path="/subjects"
            element={
              <Dashboard
                selectedGrade={selectedGrade}
                studentState={studentState}
                onSelectGrade={handleSelectGrade}
                onSelectUnit={handleSelectUnit}
                onSelectLesson={handleSelectLesson}
                onNavigateTab={(tab) => navigate(`/${tab}`)}
                onSelectSubject={(sId) => navigate(`/subject/${sId}`)}
              />
            }
          />

          <Route
            path="/grade/:gradeId"
            element={
              <GradePageView
                studentState={studentState}
                onSelectGrade={handleSelectGrade}
                onSelectUnit={handleSelectUnit}
                onSelectLesson={handleSelectLesson}
                onNavigateTab={(tab) => navigate(`/${tab}`)}
              />
            }
          />

          {/* Subject Detail View (English) */}
          <Route
            path="/subject/:subjectId"
            element={
              <SubjectDetailRouteWrapper
                studentState={studentState}
                onSelectLesson={handleSelectLesson}
              />
            }
          />

          {/* Specific Lesson View */}
          <Route
            path="/lesson/:lessonId"
            element={
              <LessonRouteWrapper
                currentUnits={currentUnits}
                studentState={studentState}
                onSelectLesson={handleSelectLesson}
                onToggleComplete={handleToggleCompleteLesson}
                onAnswerExercise={handleAnswerExercise}
              />
            }
          />

          {/* Dedicated Study Sections */}
          <Route
            path="/review"
            element={
              <SmartReviewSection
                studentState={studentState}
                currentUnits={currentUnits}
                onSelectLesson={handleSelectLesson}
                onNavigateToTab={(tab) => navigate(`/${tab}`)}
              />
            }
          />
          <Route
            path="/exam"
            element={
              <ExamEngine
                onRecordAnswer={handleRecordQuestionAnswer}
                grade={selectedGrade}
                onSelectGrade={setSelectedGrade}
              />
            }
          />
          <Route
            path="/mock"
            element={
              <MinisterialMockSimulator
                studentName={studentState.name}
                onClose={() => navigate('/')}
                grade={selectedGrade}
                onSelectGrade={setSelectedGrade}
              />
            }
          />
          <Route path="/literature" element={<LiteratureSection grade={selectedGrade} onSelectGrade={setSelectedGrade} />} />
          <Route path="/essays" element={<EssaysSection grade={selectedGrade} onSelectGrade={setSelectedGrade} />} />
          <Route
            path="/verbs"
            element={
              <IrregularVerbsLab
                onRecordAnswer={(isCorrect) => handleRecordQuestionAnswer('verb', isCorrect)}
              />
            }
          />
          <Route path="/vocab" element={<VisualVocabAtlas />} />

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {isProfileOpen && (
        <StudentProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          studentState={studentState}
          onUpdateName={handleUpdateStudentName}
          onResetProgress={handleResetProgress}
          onOpenAuth={() => {}}
          onSelectGrade={setSelectedGrade}
        />
      )}


      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 text-center text-xs text-slate-500 mt-auto overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-bold text-slate-700 dark:text-slate-300">
            منصة النموذجية في اللغة الإنكليزية • المراحل المتوسطة والإعدادية (المنهج العراقي الرسمي حصراً)
          </p>
          <p>الصف الأول والثاني والثالث المتوسط • الرابع والخامس والسادس الإعدادي • إشراف الأستاذ مصطفى تركي</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainAppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
