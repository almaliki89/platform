import React, { useState } from 'react';
import { SubjectId } from '../types/subject';
import { NewtonSecondLawSimulation } from '../features/simulations/physics/NewtonSecondLaw/NewtonSecondLawSimulation';
import { QuadraticGraphSimulation } from '../features/simulations/mathematics/QuadraticGraph/QuadraticGraphSimulation';
import { MoleculeViewerSimulation } from '../features/simulations/chemistry/MoleculeViewer/MoleculeViewerSimulation';
import { Zap, Calculator, FlaskConical, PlayCircle, ArrowLeft } from 'lucide-react';

interface SimulationsHubProps {
  subjectId: SubjectId;
  onBack: () => void;
}

export const SimulationsHub: React.FC<SimulationsHubProps> = ({ subjectId, onBack }) => {
  const [activeSim, setActiveSim] = useState<string>(() => {
    if (subjectId === 'physics') return 'newton';
    if (subjectId === 'mathematics') return 'quadratic';
    if (subjectId === 'chemistry') return 'molecule';
    return 'newton';
  });

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>العودة للقسم</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">المختبر التفاعلي والمحاكاة العلمية</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">تجارب بصرية تفاعلية تفيد فهم القوانين الفيزيائية، والرياضية، والكيميائية.</p>
          </div>
        </div>

        {/* Sim Tabs */}
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl">
          <button
            onClick={() => setActiveSim('newton')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${
              activeSim === 'newton'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>قانون نيوتن الثاني</span>
          </button>
          <button
            onClick={() => setActiveSim('quadratic')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${
              activeSim === 'quadratic'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>الدالة التربيعية</span>
          </button>
          <button
            onClick={() => setActiveSim('molecule')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${
              activeSim === 'molecule'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>عارض الجزيئات 3D</span>
          </button>
        </div>
      </div>

      {/* Active Simulation View */}
      <div>
        {activeSim === 'newton' && <NewtonSecondLawSimulation />}
        {activeSim === 'quadratic' && <QuadraticGraphSimulation />}
        {activeSim === 'molecule' && <MoleculeViewerSimulation />}
      </div>
    </div>
  );
};
