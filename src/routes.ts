import { SubjectId } from './types/subject';

export const VALID_SUBJECT_IDS: SubjectId[] = ['english'];

export function isValidSubjectId(id: string | undefined): id is SubjectId {
  return id === 'english';
}

export const APP_ROUTES = {
  home: '/',
  subjects: '/subjects',
  subject: (id: SubjectId | string) => `/subject/${id}`,
  lesson: (lessonId: string) => `/lesson/${lessonId}`,
  exam: '/exam',
  mock: '/mock',
  literature: '/literature',
  essays: '/essays',
  verbs: '/verbs',
  vocab: '/vocab',
  review: '/review',
  malzama: '/malzama',
} as const;
