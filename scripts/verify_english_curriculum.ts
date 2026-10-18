/**
 * VERIFICATION SCRIPT FOR ENGLISH CURRICULUM PLATFORM
 * Validates integrity of all English language data, units, ministerial questions, 
 * literature, essays, irregular verbs, vocabulary atlas, and mock exams.
 */

import fs from 'node:fs';
import path from 'node:path';
import { CURRICULUM_UNITS } from '../src/data/curriculumData';
import { THIRD_INTERMEDIATE_UNITS, THIRD_INTERMEDIATE_QUESTIONS } from '../src/data/thirdIntermediateData';
import { MINISTERIAL_QUESTIONS } from '../src/data/ministerialQuestions';
import { ESSAYS_DATA } from '../src/data/essaysData';
import { THIRD_INTERMEDIATE_ESSAYS } from '../src/data/thirdIntermediateEssays';
import { THIRD_INTERMEDIATE_STORIES } from '../src/data/thirdIntermediateStories';
import { IRREGULAR_VERBS } from '../src/data/verbsData';
import { VISUAL_VOCABULARY_ITEMS } from '../src/data/visualVocabData';
import { MOCK_EXAM_PAPERS } from '../src/data/mockExamPapers';
import { THIRD_INTERMEDIATE_MOCK_PAPER } from '../src/data/thirdMockExamPaper';
import { SUBJECTS } from '../src/data/subjectsData';
import { ALL_GRADES_META, ORDERED_GRADES } from '../src/data/grades/gradeMeta';
import {
  FIRST_INTERMEDIATE_UNITS,
  FIRST_INTERMEDIATE_STORIES,
  FIRST_INTERMEDIATE_ESSAYS,
  FIRST_INTERMEDIATE_QUESTIONS,
  FIRST_INTERMEDIATE_MOCK_PAPER,
} from '../src/data/grades/firstIntermediateData';
import {
  SECOND_INTERMEDIATE_UNITS,
  SECOND_INTERMEDIATE_STORIES,
  SECOND_INTERMEDIATE_ESSAYS,
  SECOND_INTERMEDIATE_QUESTIONS,
  SECOND_INTERMEDIATE_MOCK_PAPER,
} from '../src/data/grades/secondIntermediateData';
import {
  FOURTH_PREPARATORY_UNITS,
  FOURTH_PREPARATORY_LITERATURE,
  FOURTH_PREPARATORY_ESSAYS,
  FOURTH_PREPARATORY_QUESTIONS,
  FOURTH_PREPARATORY_MOCK_PAPER,
} from '../src/data/grades/fourthPreparatoryData';
import {
  FIFTH_PREPARATORY_UNITS,
  FIFTH_PREPARATORY_LITERATURE,
  FIFTH_PREPARATORY_ESSAYS,
  FIFTH_PREPARATORY_QUESTIONS,
  FIFTH_PREPARATORY_MOCK_PAPER,
} from '../src/data/grades/fifthPreparatoryData';

let passed = 0;
let failed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    passed++;
  } else {
    failed++;
    console.error(`❌ FAILED: ${msg}`);
  }
}

console.log('========================================================');
console.log('VERIFYING ENGLISH LANGUAGE PLATFORM INTEGRITY');
console.log('========================================================');

// 1. Subject exclusivity
assert(SUBJECTS.length === 1, `Must have strictly 1 subject (English), found: ${SUBJECTS.length}`);
assert(SUBJECTS[0].id === 'english', `Subject ID must be 'english', got: ${SUBJECTS[0].id}`);
assert(SUBJECTS[0].titleAr === 'اللغة الإنكليزية', `Subject title must be 'اللغة الإنكليزية'`);

// 2. 6th Preparatory Units
assert(CURRICULUM_UNITS.length >= 7, `6th Prep must have at least 7 units, got ${CURRICULUM_UNITS.length}`);
const totalSixthLessons = CURRICULUM_UNITS.reduce((sum, u) => sum + u.lessons.length, 0);
assert(totalSixthLessons >= 20, `6th Prep must have at least 20 lessons, got ${totalSixthLessons}`);

// 3. 3rd Intermediate Units
assert(THIRD_INTERMEDIATE_UNITS.length >= 6, `3rd Intermediate must have at least 6 units, got ${THIRD_INTERMEDIATE_UNITS.length}`);
const totalThirdLessons = THIRD_INTERMEDIATE_UNITS.reduce((sum, u) => sum + u.lessons.length, 0);
assert(totalThirdLessons >= 15, `3rd Intermediate must have at least 15 lessons, got ${totalThirdLessons}`);

// 4. All-grade content isolation and resolver integrity
// Keep this verifier independent from gradeContentResolver: that UI resolver
// also imports image assets, which Node's tsx runner cannot load outside Vite.
const literatureContent = fs.readFileSync(path.resolve('src/data/literatureData.ts'), 'utf8');
assert(ORDERED_GRADES.length === 6, `Expected six supported grades, found: ${ORDERED_GRADES.length}`);

const gradeFixtures = [
  {
    grade: 'first-intermediate',
    meta: ALL_GRADES_META['first-intermediate'],
    units: FIRST_INTERMEDIATE_UNITS,
    storiesCount: FIRST_INTERMEDIATE_STORIES.length,
    essays: FIRST_INTERMEDIATE_ESSAYS,
    questions: FIRST_INTERMEDIATE_QUESTIONS,
    mockPapers: [FIRST_INTERMEDIATE_MOCK_PAPER],
  },
  {
    grade: 'second-intermediate',
    meta: ALL_GRADES_META['second-intermediate'],
    units: SECOND_INTERMEDIATE_UNITS,
    storiesCount: SECOND_INTERMEDIATE_STORIES.length,
    essays: SECOND_INTERMEDIATE_ESSAYS,
    questions: SECOND_INTERMEDIATE_QUESTIONS,
    mockPapers: [SECOND_INTERMEDIATE_MOCK_PAPER],
  },
  {
    grade: 'third-intermediate',
    meta: ALL_GRADES_META['third-intermediate'],
    units: THIRD_INTERMEDIATE_UNITS,
    storiesCount: THIRD_INTERMEDIATE_STORIES.length,
    essays: THIRD_INTERMEDIATE_ESSAYS,
    questions: THIRD_INTERMEDIATE_QUESTIONS,
    mockPapers: [THIRD_INTERMEDIATE_MOCK_PAPER],
  },
  {
    grade: 'fourth-preparatory',
    meta: ALL_GRADES_META['fourth-preparatory'],
    units: FOURTH_PREPARATORY_UNITS,
    storiesCount: FOURTH_PREPARATORY_LITERATURE.length,
    essays: FOURTH_PREPARATORY_ESSAYS,
    questions: FOURTH_PREPARATORY_QUESTIONS,
    mockPapers: [FOURTH_PREPARATORY_MOCK_PAPER],
  },
  {
    grade: 'fifth-preparatory',
    meta: ALL_GRADES_META['fifth-preparatory'],
    units: FIFTH_PREPARATORY_UNITS,
    storiesCount: FIFTH_PREPARATORY_LITERATURE.length,
    essays: FIFTH_PREPARATORY_ESSAYS,
    questions: FIFTH_PREPARATORY_QUESTIONS,
    mockPapers: [FIFTH_PREPARATORY_MOCK_PAPER],
  },
  {
    grade: 'sixth-preparatory',
    meta: ALL_GRADES_META['sixth-preparatory'],
    units: CURRICULUM_UNITS,
    storiesCount: literatureContent.includes('Pride and Prejudice') && literatureContent.includes('As You Like It') ? 2 : 0,
    essays: ESSAYS_DATA,
    questions: MINISTERIAL_QUESTIONS,
    mockPapers: MOCK_EXAM_PAPERS,
  },
] as const;

const lessonOwnerById = new Map<string, string>();
const questionOwnerById = new Map<string, string>();

for (const grade of ORDERED_GRADES) {
  const fixture = gradeFixtures.find((item) => item.grade === grade);
  assert(!!fixture, `A structural data fixture must exist for ${grade}`);
  if (!fixture) continue;

  const { meta, units, storiesCount, essays, questions, mockPapers } = fixture;
  const gradeName = meta.nameAr || grade;

  assert(meta.id === grade, `Grade metadata id must match resolver key for ${grade}`);
  assert(!!meta.nameAr && !!meta.shortName && !!meta.description, `Grade metadata must be complete for ${grade}`);
  assert(units.length > 0, `${gradeName} must contain curriculum units`);
  assert(storiesCount > 0, `${gradeName} must contain literature or reading content`);
  assert(essays.length > 0, `${gradeName} must contain writing content`);
  assert(questions.length > 0, `${gradeName} must contain a question bank`);
  assert(mockPapers.length > 0, `${gradeName} must contain at least one practice paper`);

  const allLessons = units.flatMap((unit) => unit.lessons);
  assert(allLessons.length > 0, `${gradeName} must contain lessons`);

  for (const unit of units) {
    assert(Number.isFinite(unit.id) && unit.id > 0, `Unit id must be positive for ${gradeName}: ${unit.titleAr}`);
    assert(Number.isFinite(unit.number) && unit.number > 0, `Unit number must be positive for ${gradeName}: ${unit.titleAr}`);
    assert(!!unit.titleAr && !!unit.titleEn && !!unit.description, `Unit metadata must be complete for ${gradeName}: unit ${unit.number}`);
    assert(unit.lessons.length > 0, `${gradeName} unit ${unit.number} must contain at least one lesson`);

    for (const lesson of unit.lessons) {
      assert(!!lesson.id && !!lesson.titleAr && !!lesson.titleEn && !!lesson.summary, `Lesson metadata must be complete for ${gradeName}: ${lesson.id}`);
      assert(Array.isArray(lesson.detailedContent) && Array.isArray(lesson.examples) && Array.isArray(lesson.exercises), `Lesson collections must be arrays for ${gradeName}: ${lesson.id}`);
      const previousGrade = lessonOwnerById.get(lesson.id);
      assert(!previousGrade, `Lesson id ${lesson.id} is shared by ${previousGrade} and ${gradeName}; progress may bleed across grades`);
      if (!previousGrade) lessonOwnerById.set(lesson.id, gradeName);
    }
  }

  for (const question of questions) {
    assert(!!question.id && !!question.questionText && !!question.correctAnswer, `Question must contain id, prompt and answer for ${gradeName}: ${question.id}`);
    const previousGrade = questionOwnerById.get(question.id);
    assert(!previousGrade, `Question id ${question.id} is shared by ${previousGrade} and ${gradeName}; saved-question state may bleed across grades`);
    if (!previousGrade) questionOwnerById.set(question.id, gradeName);
  }
}

const resolverSource = fs.readFileSync(path.resolve('src/data/gradeContentResolver.ts'), 'utf8');
for (const grade of ORDERED_GRADES) {
  assert(resolverSource.includes(`case '${grade}':`) || grade === 'sixth-preparatory',
    `Grade resolver must explicitly map ${grade}`);
}

// 5. Ministerial Questions Bank
assert(MINISTERIAL_QUESTIONS.length >= 10, `Ministerial questions bank must contain questions, got ${MINISTERIAL_QUESTIONS.length}`);
for (const q of MINISTERIAL_QUESTIONS) {
  assert(!!q.id && !!q.questionText && !!q.correctAnswer, `Question ${q.id} must have id, text, and correctAnswer`);
}

// 5. Essays Data
assert(ESSAYS_DATA.length >= 3, `6th Prep Essays must contain essays, got ${ESSAYS_DATA.length}`);
assert(THIRD_INTERMEDIATE_ESSAYS.length >= 3, `3rd Intermediate Essays must contain essays, got ${THIRD_INTERMEDIATE_ESSAYS.length}`);

// 6. Literature & Stories
assert(literatureContent.includes('Pride and Prejudice') && literatureContent.includes('Jane Austen'), '6th Prep Literature must contain Pride and Prejudice');
assert(literatureContent.includes('As You Like It') && literatureContent.includes('William Shakespeare'), '6th Prep Literature must contain As You Like It');
const sectionsContent = fs.readFileSync(path.resolve('src/data/literatureSectionsData.ts'), 'utf8');
assert(sectionsContent.includes('PRIDE_AND_PREJUDICE_SECTIONS') && sectionsContent.includes('AS_YOU_LIKE_IT_SECTIONS'), 'Must have literature sections data');
assert(THIRD_INTERMEDIATE_STORIES.length >= 3, `3rd Intermediate Stories must contain story times, got ${THIRD_INTERMEDIATE_STORIES.length}`);

// 7. Irregular Verbs Lab
assert(IRREGULAR_VERBS.length >= 50, `Irregular verbs must have at least 50 verbs, got ${IRREGULAR_VERBS.length}`);
for (const v of IRREGULAR_VERBS) {
  assert(!!v.base && !!v.past && !!v.pastParticiple && !!v.arabicMeaning, `Verb ${v.base} must have all principal parts and Arabic meaning`);
}

// 8. Visual Vocabulary Atlas
assert(VISUAL_VOCABULARY_ITEMS.length >= 10, `Visual Vocab Atlas must contain items, got ${VISUAL_VOCABULARY_ITEMS.length}`);

// 9. Ministerial Mock Exams (100 Marks Blueprint)
assert(MOCK_EXAM_PAPERS.length >= 1, `6th Prep Mock Exam papers must exist, got ${MOCK_EXAM_PAPERS.length}`);
assert(!!THIRD_INTERMEDIATE_MOCK_PAPER.id, `3rd Intermediate Mock Exam paper must exist`);
assert(THIRD_INTERMEDIATE_MOCK_PAPER.sections.length >= 5, `3rd Mock Exam must have at least 5 sections (Q1-Q5), got ${THIRD_INTERMEDIATE_MOCK_PAPER.sections.length}`);

console.log('--------------------------------------------------------');
console.log(`Results: ${passed} assertions passed, ${failed} failed.`);
console.log('========================================================');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('✅ ALL ENGLISH CURRICULUM VERIFICATIONS PASSED SUCCESSFULLY!');
}
