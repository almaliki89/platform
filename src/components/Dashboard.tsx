import React from 'react';
import { EducationalGrade, StudentState, Unit, Lesson } from '../types';
import { SubjectId } from '../types/subject';
import { PinterestPlatformFeed } from './PinterestPlatformFeed';
import { GradeSelectorBar } from './GradeSelectorBar';

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
      <GradeSelectorBar
        selectedGrade={effectiveGrade}
        onSelectGrade={onSelectGrade}
      />
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
