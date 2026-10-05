import React from 'react';

interface SubstitutionStep {
  symbol: string;
  value: string | number;
  unit?: string;
}

interface FormulaSubstitutionProps {
  formula: string;
  substitutions: SubstitutionStep[];
  result: string | number;
  unit?: string;
}

export const FormulaSubstitution: React.FC<FormulaSubstitutionProps> = ({
  formula,
  substitutions,
  result,
  unit = '',
}) => {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 space-y-3 font-mono text-xs sm:text-sm">
      <div className="flex items-center gap-3 text-slate-400 border-b border-slate-800 pb-2">
        <span className="font-bold text-cyan-500">Symbolic:</span>
        <span className="text-slate-200">{formula}</span>
      </div>
      
      <div className="space-y-1.5">
        <div className="font-bold text-amber-500 mb-1">Substitution:</div>
        {substitutions.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-slate-300 pl-2 border-l-2 border-slate-800 ml-1">
            <span className="w-4 text-cyan-400">{s.symbol}</span>
            <span className="text-slate-500">=</span>
            <span>{s.value} {s.unit}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
        <span className="font-bold text-emerald-500">Result:</span>
        <span className="text-white text-base sm:text-lg font-bold">
          {result} {unit}
        </span>
      </div>
    </div>
  );
};
