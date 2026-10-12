import React from 'react';
import { 
  BookOpen, Sparkles, Trophy, CheckCircle2, ChevronLeft, ArrowRight,
  HelpCircle, Compass, FileText, Bookmark, Star, ArrowUpRight, Flame,
  Target, GraduationCap, Clock, Award, CheckCircle, ShieldCheck, Eye,
  Languages
} from 'lucide-react';
import { SUBJECTS } from '../data/subjectsData';
import { SubjectId } from '../types/subject';
import { getUnitsForGrade, getGradeMeta, ORDERED_GRADES, ALL_GRADES_META } from '../data/gradeContentResolver';
import { StudentState, Unit, Lesson, EducationalGrade } from '../types';
import { PinterestPlatformFeed } from './PinterestPlatformFeed';

interface DashboardProps {
  studentState: StudentState;
  onSelectUnit: (unit: Unit) => void;
  onSelectLesson: (lesson: Lesson) => void;
  onNavigateTab: (tab: 'exam' | 'mock' | 'literature' | 'essays' | 'verbs' | 'vocab' | 'review') => void;
  onSelectSubject?: (subjectId: SubjectId) => void;
  selectedGrade?: EducationalGrade;
  onSelectGrade?: (grade: EducationalGrade) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  studentState,
  onSelectUnit,
  onSelectLesson,
  onNavigateTab,
  onSelectSubject,
  selectedGrade = 'sixth-preparatory',
  onSelectGrade = () => {},
}) => {
  const effectiveGrade: EducationalGrade = selectedGrade || studentState.selectedGrade || 'sixth-preparatory';

  return (
    <div className="w-full">
      <PinterestPlatformFeed
        selectedGrade={effectiveGrade}
        onSelectGrade={onSelectGrade}
        onSelectLesson={onSelectLesson}
        onNavigateTab={onNavigateTab}
        studentState={studentState}
      />
    </div>
  );
};
