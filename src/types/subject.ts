export type SubjectId =
  | 'arabic'
  | 'islamic'
  | 'english'
  | 'mathematics'
  | 'physics'
  | 'chemistry'
  | 'history'
  | 'geography';

export type SubjectCategory = 'literary' | 'scientific' | 'language';

export interface Subject {
  id: SubjectId;
  titleAr: string;
  titleEn: string;
  description: string;
  category: SubjectCategory;
  icon: string;
  theme: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    gradient: string;
  };
  unitsCount: number;
  hasSimulations: boolean;
  isAvailable: boolean; // false for placeholders like Arabic, Islamic, History, Geography
}

export interface SimulationParameter {
  id: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  description?: string;
}

export interface SimulationOutput {
  id: string;
  label: string;
  unit: string;
  formatter?: (val: number) => string;
}

export interface SimulationDefinition {
  id: string;
  subjectId: SubjectId;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  parameters: SimulationParameter[];
  outputs: SimulationOutput[];
  renderer: '2d' | '3d';
}
