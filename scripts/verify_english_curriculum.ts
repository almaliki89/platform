/**
 * VERIFICATION SCRIPT FOR ENGLISH CURRICULUM PLATFORM
 * Validates integrity of all English language data, units, ministerial questions, 
 * literature, essays, irregular verbs, vocabulary atlas, and mock exams.
 */

import fs from 'node:fs';
import path from 'node:path';
import { CURRICULUM_UNITS } from '../src/data/curriculumData';
import { THIRD_INTERMEDIATE_UNITS } from '../src/data/thirdIntermediateData';
import { MINISTERIAL_QUESTIONS } from '../src/data/ministerialQuestions';
import { ESSAYS_DATA } from '../src/data/essaysData';
import { THIRD_INTERMEDIATE_ESSAYS } from '../src/data/thirdIntermediateEssays';
import { THIRD_INTERMEDIATE_STORIES } from '../src/data/thirdIntermediateStories';
import { IRREGULAR_VERBS } from '../src/data/verbsData';
import { VISUAL_VOCABULARY_ITEMS } from '../src/data/visualVocabData';
import { MOCK_EXAM_PAPERS } from '../src/data/mockExamPapers';
import { THIRD_INTERMEDIATE_MOCK_PAPER } from '../src/data/thirdMockExamPaper';
import { SUBJECTS } from '../src/data/subjectsData';

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

// 4. Ministerial Questions Bank
assert(MINISTERIAL_QUESTIONS.length >= 10, `Ministerial questions bank must contain questions, got ${MINISTERIAL_QUESTIONS.length}`);
for (const q of MINISTERIAL_QUESTIONS) {
  assert(!!q.id && !!q.questionText && !!q.correctAnswer, `Question ${q.id} must have id, text, and correctAnswer`);
}

// 5. Essays Data
assert(ESSAYS_DATA.length >= 3, `6th Prep Essays must contain essays, got ${ESSAYS_DATA.length}`);
assert(THIRD_INTERMEDIATE_ESSAYS.length >= 3, `3rd Intermediate Essays must contain essays, got ${THIRD_INTERMEDIATE_ESSAYS.length}`);

// 6. Literature & Stories
const literatureContent = fs.readFileSync(path.resolve('src/data/literatureData.ts'), 'utf8');
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
