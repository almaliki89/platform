export interface AtomData {
  element: string;
  symbol: string;
  nameAr: string;
  position: [number, number, number];
  radius: number;
  color: number;
}

export interface BondData {
  from: number; // index of first atom
  to: number; // index of second atom
  order: 1 | 2 | 3;
}

export interface MoleculeData {
  id: string;
  formula: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  geometryType: string;
  hybridState: string;
  bondAngle: string;
  polarity: string;
  curriculumGrade: string;
  atoms: AtomData[];
  bonds: BondData[];
}
