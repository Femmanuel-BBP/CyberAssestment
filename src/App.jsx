import React, { useEffect } from 'react';
import { Navbar, Welcome, Assessment, Results, RecoveryModal, ErrorBoundary } from './components';
import { useAssessment } from './hooks/useAssessment';

/**
 * Componente interno que contiene la lógica del assessment
 */
function AssessmentApp() {
  const {
    // Estados
    step,
    currentPillarIdx,
    responses,
    clientInfo,
    isSubmitting,
    validationError,
    showRecoveryModal,
    
    // Datos calculados
    currentPillar,
    pillars,
    maturityLevels,
    totalPillars,
    scores,
    averageScore,
    progress,
    
    // Setters
    setClientInfo,
    
    // Funciones de validación
    isPillarComplete,
    isAssessmentComplete,
    
    // Acciones
    handleResponse,
    handleNextPillar,
    handlePrevPillar,
    handleFinish,
    navigateToPillar,
    startAssessment,
    saveProgress,
    restoreProgress,
    startFresh,
    checkSavedProgress,
    
    // Estado de progreso guardado
    hasSavedProgress,
  } = useAssessment();

  // Verificar si hay progreso guardado al cargar (solo una vez)
  useEffect(() => {
    checkSavedProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intencionalmente vacío - solo al montar

  // Guardar progreso cuando cambian las respuestas
  useEffect(() => {
    if (step === 'assessment' && Object.keys(responses).length > 0) {
      saveProgress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responses, currentPillarIdx]); // Solo cuando cambian respuestas o pilar

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Modal de Recuperación de Progreso */}
      {showRecoveryModal && (
        <RecoveryModal
          onRestore={restoreProgress}
          onStartFresh={startFresh}
        />
      )}

      {/* Navbar */}
      <Navbar step={step} hasSavedProgress={hasSavedProgress} />

      {/* Contenido Principal */}
      <main className="animate-in fade-in duration-700">
        {step === 'welcome' && (
          <Welcome
            clientInfo={clientInfo}
            setClientInfo={setClientInfo}
            onStart={startAssessment}
          />
        )}

        {step === 'assessment' && (
          <Assessment
            currentPillar={currentPillar}
            currentPillarIdx={currentPillarIdx}
            totalPillars={totalPillars}
            pillars={pillars}
            maturityLevels={maturityLevels}
            responses={responses}
            progress={progress}
            validationError={validationError}
            isSubmitting={isSubmitting}
            isPillarComplete={isPillarComplete}
            isAssessmentComplete={isAssessmentComplete}
            onResponse={handleResponse}
            onNextPillar={handleNextPillar}
            onPrevPillar={handlePrevPillar}
            onFinish={handleFinish}
            onNavigateToPillar={navigateToPillar}
          />
        )}

        {step === 'results' && (
          <Results
            clientInfo={clientInfo}
            pillars={pillars}
            scores={scores}
            averageScore={averageScore}
          />
        )}
      </main>
    </div>
  );
}

/**
 * Neurallyz - Cybersecurity Assessment Tool
 * Componente principal envuelto en ErrorBoundary
 */
function App() {
  return (
    <ErrorBoundary>
      <AssessmentApp />
    </ErrorBoundary>
  );
}

export default App;
