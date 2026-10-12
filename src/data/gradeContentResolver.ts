import { EducationalGrade, Unit, LiteratureItem, EssayItem, MinisterialExamQuestion } from '../types';
import { MockExamPaper } from './mockExamPapers';
import { CURRICULUM_UNITS } from './curriculumData';
import { LITERATURE_DATA } from './literatureData';
import { ESSAYS_DATA } from './essaysData';
import { MINISTERIAL_QUESTIONS } from './ministerialQuestions';
import { MOCK_EXAM_PAPERS } from './mockExamPapers';

import { THIRD_INTERMEDIATE_UNITS, THIRD_INTERMEDIATE_STORIES, THIRD_INTERMEDIATE_ESSAYS, THIRD_INTERMEDIATE_QUESTIONS } from './thirdIntermediateData';
import { THIRD_INTERMEDIATE_MOCK_PAPER } from './thirdMockExamPaper';

import { FIRST_INTERMEDIATE_UNITS, FIRST_INTERMEDIATE_STORIES, FIRST_INTERMEDIATE_ESSAYS, FIRST_INTERMEDIATE_QUESTIONS, FIRST_INTERMEDIATE_MOCK_PAPER } from './grades/firstIntermediateData';
import { SECOND_INTERMEDIATE_UNITS, SECOND_INTERMEDIATE_STORIES, SECOND_INTERMEDIATE_ESSAYS, SECOND_INTERMEDIATE_QUESTIONS, SECOND_INTERMEDIATE_MOCK_PAPER } from './grades/secondIntermediateData';
import { FOURTH_PREPARATORY_UNITS, FOURTH_PREPARATORY_LITERATURE, FOURTH_PREPARATORY_ESSAYS, FOURTH_PREPARATORY_QUESTIONS, FOURTH_PREPARATORY_MOCK_PAPER } from './grades/fourthPreparatoryData';
import { FIFTH_PREPARATORY_UNITS, FIFTH_PREPARATORY_LITERATURE, FIFTH_PREPARATORY_ESSAYS, FIFTH_PREPARATORY_QUESTIONS, FIFTH_PREPARATORY_MOCK_PAPER } from './grades/fifthPreparatoryData';
import { ALL_GRADES_META, GradeMeta, ORDERED_GRADES } from './grades/gradeMeta';

export { ALL_GRADES_META, ORDERED_GRADES };
export type { GradeMeta };

export function getUnitsForGrade(grade: EducationalGrade): Unit[] {
  switch (grade) {
    case 'first-intermediate':
      return FIRST_INTERMEDIATE_UNITS;
    case 'second-intermediate':
      return SECOND_INTERMEDIATE_UNITS;
    case 'third-intermediate':
      return THIRD_INTERMEDIATE_UNITS;
    case 'fourth-preparatory':
      return FOURTH_PREPARATORY_UNITS;
    case 'fifth-preparatory':
      return FIFTH_PREPARATORY_UNITS;
    case 'sixth-preparatory':
    default:
      return CURRICULUM_UNITS;
  }
}

export function getStoriesForGrade(grade: EducationalGrade): LiteratureItem[] {
  switch (grade) {
    case 'first-intermediate':
      return FIRST_INTERMEDIATE_STORIES;
    case 'second-intermediate':
      return SECOND_INTERMEDIATE_STORIES;
    case 'third-intermediate':
      return THIRD_INTERMEDIATE_STORIES;
    case 'fourth-preparatory':
      return FOURTH_PREPARATORY_LITERATURE;
    case 'fifth-preparatory':
      return FIFTH_PREPARATORY_LITERATURE;
    case 'sixth-preparatory':
    default:
      return LITERATURE_DATA;
  }
}

export function getEssaysForGrade(grade: EducationalGrade): EssayItem[] {
  switch (grade) {
    case 'first-intermediate':
      return FIRST_INTERMEDIATE_ESSAYS;
    case 'second-intermediate':
      return SECOND_INTERMEDIATE_ESSAYS;
    case 'third-intermediate':
      return THIRD_INTERMEDIATE_ESSAYS;
    case 'fourth-preparatory':
      return FOURTH_PREPARATORY_ESSAYS;
    case 'fifth-preparatory':
      return FIFTH_PREPARATORY_ESSAYS;
    case 'sixth-preparatory':
    default:
      return ESSAYS_DATA;
  }
}

export function getQuestionsForGrade(grade: EducationalGrade): MinisterialExamQuestion[] {
  switch (grade) {
    case 'first-intermediate':
      return FIRST_INTERMEDIATE_QUESTIONS;
    case 'second-intermediate':
      return SECOND_INTERMEDIATE_QUESTIONS;
    case 'third-intermediate':
      return THIRD_INTERMEDIATE_QUESTIONS;
    case 'fourth-preparatory':
      return FOURTH_PREPARATORY_QUESTIONS;
    case 'fifth-preparatory':
      return FIFTH_PREPARATORY_QUESTIONS;
    case 'sixth-preparatory':
    default:
      return MINISTERIAL_QUESTIONS;
  }
}

export function getMockPapersForGrade(grade: EducationalGrade): MockExamPaper[] {
  switch (grade) {
    case 'first-intermediate':
      return [FIRST_INTERMEDIATE_MOCK_PAPER];
    case 'second-intermediate':
      return [SECOND_INTERMEDIATE_MOCK_PAPER];
    case 'third-intermediate':
      return [THIRD_INTERMEDIATE_MOCK_PAPER];
    case 'fourth-preparatory':
      return [FOURTH_PREPARATORY_MOCK_PAPER];
    case 'fifth-preparatory':
      return [FIFTH_PREPARATORY_MOCK_PAPER];
    case 'sixth-preparatory':
    default:
      return MOCK_EXAM_PAPERS;
  }
}

export const getMinisterialQuestionsForGrade = getQuestionsForGrade;

export function getAllUnitsWithGrade(): { grade: EducationalGrade; unit: Unit }[] {
  const result: { grade: EducationalGrade; unit: Unit }[] = [];
  ORDERED_GRADES.forEach(g => {
    const units = getUnitsForGrade(g);
    units.forEach(u => result.push({ grade: g, unit: u }));
  });
  return result;
}

export function getGradeMeta(grade: EducationalGrade): GradeMeta {
  return ALL_GRADES_META[grade] || ALL_GRADES_META['sixth-preparatory'];
}
