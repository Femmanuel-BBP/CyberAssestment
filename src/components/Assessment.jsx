import React from 'react';
import { ChevronLeft, ChevronRight, BarChart3, AlertTriangle } from 'lucide-react';
import PillarNavigation from './PillarNavigation';
import QuestionCard from './QuestionCard';
import PillarIcon from './PillarIcon';

/**
 * Pantalla principal del assessment con preguntas
 */
const Assessment = ({
  currentPillar,
  currentPillarIdx,
  totalPillars,
  pillars,
  maturityLevels,
  responses,
  progress,
  validationError,
  isSubmitting,
  isPillarComplete,
  isAssessmentComplete,
  onResponse,
  onNextPillar,
  onPrevPillar,
  onFinish,
  onNavigateToPillar,
}) => {
  const answeredCount = currentPillar.questions.filter(
    q => responses[q.id] !== undefined
  ).length;

  const isLastPillar = currentPillarIdx === totalPillars - 1;
  const isFirstPillar = currentPillarIdx === 0;
  const currentPillarIsComplete = isPillarComplete(currentPillarIdx);
  const assessmentComplete = isAssessmentComplete();

  return (
    <div className="max-w-4xl mx-auto p-6 mt-4">
      {/* Barra de Progreso y Navegación */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-slate-500">
            Progreso del Assessment
          </span>
          <span className="font-black text-blue-700 text-lg">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Barra de progreso */}
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-blue-700 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Navegación por pilares */}
        <PillarNavigation
          pillars={pillars}
          currentPillarIdx={currentPillarIdx}
          isPillarComplete={isPillarComplete}
          onNavigate={onNavigateToPillar}
        />
      </div>

      {/* Contenedor principal */}
      <div className="bg-white rounded-3xl shadow-xl border border-blue-50 overflow-hidden">
        {/* Header del pilar */}
        <div className="bg-blue-800 p-8 flex items-center gap-4 text-white">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
            <PillarIcon iconName={currentPillar.icon} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase opacity-70 tracking-widest">
              Sección {currentPillarIdx + 1} de {totalPillars}
            </p>
            <h2 className="text-2xl font-black">{currentPillar.name}</h2>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold uppercase opacity-70 tracking-widest">
              Respondidas
            </div>
            <div className="text-2xl font-black">
              {answeredCount}/{currentPillar.questions.length}
            </div>
          </div>
        </div>

        {/* Preguntas */}
        <div className="p-10 space-y-12">
          {currentPillar.questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              selectedValue={responses[question.id]}
              maturityLevels={maturityLevels}
              onResponse={onResponse}
            />
          ))}
        </div>

        {/* Mensaje de error */}
        {validationError && (
          <div className="mx-8 mt-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
            <p className="text-rose-700 font-medium text-sm">{validationError}</p>
          </div>
        )}

        {/* Navegación inferior */}
        <div className="bg-slate-50 p-8 border-t border-slate-100 flex justify-between">
          <button
            disabled={isFirstPillar}
            onClick={onPrevPillar}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold disabled:opacity-0 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" /> Atrás
          </button>

          {!isLastPillar ? (
            <button
              onClick={onNextPillar}
              className={`px-10 py-4 rounded-2xl font-black flex items-center gap-2 shadow-lg transition-all ${
                currentPillarIsComplete
                  ? 'bg-blue-700 text-white hover:bg-blue-800 shadow-blue-100'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              Siguiente <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onFinish}
              disabled={isSubmitting}
              className={`px-10 py-4 rounded-2xl font-black flex items-center gap-2 shadow-lg transition-all ${
                assessmentComplete && !isSubmitting
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100'
                  : 'bg-slate-300 text-slate-500'
              }`}
            >
              {isSubmitting ? 'Procesando...' : 'Generar Mapa de Calor'}
              <BarChart3 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
