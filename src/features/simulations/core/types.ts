import { ComponentType, LazyExoticComponent } from 'react';
import { SubjectId } from '../../../types/subject';

export type SimulationId =
  | 'physics-newton-second-law'
  | 'math-quadratic-graph'
  | 'chemistry-molecule-viewer';

export type SimulationMode = '2d' | '3d' | 'hybrid';

export interface SimulationMetadata {
  id: SimulationId;
  subjectId: 'physics' | 'mathematics' | 'chemistry';
  topic: string;
  grade: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  titleAr: string;
  titleEn: string;
  description: string;
  learningObjectives: string[];
  requiredConcepts: string[];
  mode: SimulationMode;
  iconName?: string;
}

export interface SimulationRegistryEntry extends SimulationMetadata {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: LazyExoticComponent<ComponentType<any>>;
}
