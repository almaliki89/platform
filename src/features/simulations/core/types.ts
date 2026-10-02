import { ComponentType, LazyExoticComponent } from 'react';

export type PhysicsFirstIntermediateSimId =
  | 'physics-first-properties-of-matter'
  | 'physics-first-force'
  | 'physics-first-pressure'
  | 'physics-first-heat'
  | 'physics-first-thermal-effects';

export type PhysicsSecondIntermediateSimId =
  | 'physics-second-motion'
  | 'physics-second-laws-of-motion'
  | 'physics-second-work-power-energy'
  | 'physics-second-levers'
  | 'physics-second-waves-sound'
  | 'physics-second-light';

export type PhysicsThirdIntermediateSimId =
  | 'physics-third-electrostatics'
  | 'physics-third-magnetism'
  | 'physics-third-electric-current'
  | 'physics-third-battery-emf'
  | 'physics-third-electric-energy-power'
  | 'physics-third-electromagnetism'
  | 'physics-third-transformer'
  | 'physics-third-energy-sources'
  | 'physics-third-atmospheric-communications';

export type PhysicsFourthScientificSimId =
  | 'physics-fourth-main-parameters'
  | 'physics-fourth-mechanical-properties'
  | 'physics-fourth-static-fluids'
  | 'physics-fourth-thermal-properties'
  | 'physics-fourth-light'
  | 'physics-fourth-reflection-refraction'
  | 'physics-fourth-mirrors'
  | 'physics-fourth-thin-lenses'
  | 'physics-fourth-electrostatics';

export type SimulationId =
  | PhysicsFirstIntermediateSimId
  | PhysicsSecondIntermediateSimId
  | PhysicsThirdIntermediateSimId
  | PhysicsFourthScientificSimId
  | 'physics-newton-second-law'
  | 'math-quadratic-graph'
  | 'chemistry-molecule-viewer';

export type SimulationMode = '2d' | '3d' | 'hybrid';

export interface SimulationMetadata {
  id: SimulationId;
  subjectId: 'physics' | 'mathematics' | 'chemistry';
  gradeId?:
    | 'first-intermediate'
    | 'second-intermediate'
    | 'third-intermediate'
    | 'fourth-scientific'
    | 'fifth-scientific'
    | 'sixth-scientific';
  chapterId?: string;
  chapterNumber?: number;
  curriculumTitle?: string;
  simulationType?: 'virtual-lab' | 'interactive-graph' | '3d-particle' | 'ray-optics';
  topic: string;
  grade: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  titleAr: string;
  titleEn: string;
  description: string;
  learningObjectives: string[];
  requiredConcepts: string[];
  formulae?: string[];
  conceptTags?: string[];
  mode: SimulationMode;
  iconName?: string;
}

export interface SimulationRegistryEntry extends SimulationMetadata {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: LazyExoticComponent<ComponentType<any>>;
}
