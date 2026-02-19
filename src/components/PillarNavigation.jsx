import React from 'react';
import { Check, Circle } from 'lucide-react';

/**
 * Navegación breadcrumb por pilares
 */
const PillarNavigation = ({ 
  pillars, 
  currentPillarIdx, 
  isPillarComplete, 
  onNavigate 
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {pillars.map((pillar, idx) => {
        const isComplete = isPillarComplete(idx);
        const isCurrent = idx === currentPillarIdx;
        // Puede navegar si es el actual, es anterior, o el anterior está completo
        const canNavigate = idx <= currentPillarIdx || isPillarComplete(idx - 1);

        return (
          <button
            key={pillar.id}
            onClick={() => canNavigate && onNavigate(idx)}
            disabled={!canNavigate}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              isCurrent
                ? 'bg-blue-700 text-white shadow-lg'
                : isComplete
                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 cursor-pointer'
                  : canNavigate
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer'
                    : 'bg-slate-50 text-slate-300 cursor-not-allowed'
            }`}
          >
            {isComplete ? (
              <Check className="w-4 h-4" />
            ) : (
              <Circle className={`w-4 h-4 ${isCurrent ? 'fill-white' : ''}`} />
            )}
            <span className="hidden sm:inline">{pillar.name.split(' ')[0]}</span>
            <span className="sm:hidden">{idx + 1}</span>
          </button>
        );
      })}
    </div>
  );
};

export default PillarNavigation;
