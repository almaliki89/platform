import { SubjectId } from './types/subject';

export const VALID_SUBJECT_IDS: SubjectId[] = [
  'arabic',
  'islamic',
  'english',
  'mathematics',
  'physics',
  'chemistry',
  'history',
  'geography',
];

export function isValidSubjectId(id: string | undefined): id is SubjectId {
  return typeof id === 'string' && VALID_SUBJECT_IDS.includes(id as SubjectId);
}

export const APP_ROUTES = {
  home: '/',
  subjects: '/subjects',
  subject: (id: SubjectId | string) => `/subject/${id}`,
  subjectSimulations: (id: SubjectId | string) => `/subject/${id}/simulations`,
  simulation: (subjectId: SubjectId | string, simulationId: string) =>
    `/subject/${subjectId}/simulations/${simulationId}`,
  lesson: (lessonId: string) => `/lesson/${lessonId}`,
  exam: '/exam',
  mock: '/mock',
  literature: '/literature',
  essays: '/essays',
  verbs: '/verbs',
  vocab: '/vocab',
  review: '/review',
} as const;
