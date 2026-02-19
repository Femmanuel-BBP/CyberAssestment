import React from 'react';

/**
 * Tarjeta de pregunta con opciones de nivel de madurez
 */
const QuestionCard = ({ question, selectedValue, maturityLevels, onResponse }) => {
  return (
    <div className="space-y-6">
      <p className="text-xl font-bold text-slate-800 leading-tight">
        {question.text}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {maturityLevels.map((level) => {
          const isSelected = selectedValue === level.value;
          
          return (
            <button
              key={level.value}
              onClick={() => onResponse(question.id, level.value)}
              className={`group p-5 rounded-2xl text-left transition-all border-2 relative ${
                isSelected
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-slate-100 bg-slate-50 hover:border-blue-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`font-black uppercase text-xs ${
                  isSelected ? 'text-blue-600' : 'text-slate-400'
                }`}>
                  Nivel {level.value}
                </span>
                {isSelected && (
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                )}
              </div>
              
              <p className={`font-bold ${
                isSelected ? 'text-blue-900' : 'text-slate-700'
              }`}>
                {level.label}
              </p>
              
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {level.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
