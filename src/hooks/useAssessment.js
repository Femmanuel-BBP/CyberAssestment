import { useState, useCallback, useMemo } from 'react';
import { ASSESSMENT_DATA, STORAGE_KEY } from '../data/assessmentData';
import { useLocalStorage } from './useLocalStorage';
import { calculateScores } from '../utils/helpers';

/**
 * Hook principal para manejar toda la lógica del assessment
 * @returns {Object} Estado y funciones del assessment
 */
export const useAssessment = () => {
  // Estados principales
  const [step, setStep] = useState('welcome');
  const [currentPillarIdx, setCurrentPillarIdx] = useState(0);
  const [responses, setResponses] = useState({});
  const [clientInfo, setClientInfo] = useState({ 
    name: '', 
    email: '', 
    company: '', 
    cloud_provider: 'GCP' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);

  // localStorage para persistencia
  const [savedProgress, setSavedProgress, removeSavedProgress] = useLocalStorage(STORAGE_KEY, null);

  // Datos del assessment
  const { pillars, maturityLevels } = ASSESSMENT_DATA;
  const currentPillar = pillars[currentPillarIdx];
  const totalPillars = pillars.length;

  // Cálculos memoizados para optimizar rendimiento
  const scores = useMemo(() => 
    calculateScores(responses, pillars), 
    [responses, pillars]
  );

  const averageScore = useMemo(() => {
    const values = Object.values(scores);
    if (values.length === 0) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
  }, [scores]);

  const progress = useMemo(() => 
    ((currentPillarIdx + 1) / totalPillars) * 100,
    [currentPillarIdx, totalPillars]
  );

  // Verificar si un pilar está completo
  const isPillarComplete = useCallback((pillarIdx) => {
    const pillar = pillars[pillarIdx];
    return pillar.questions.every(q => responses[q.id] !== undefined);
  }, [pillars, responses]);

  // Verificar si TODO el assessment está completo
  const isAssessmentComplete = useCallback(() => {
    return pillars.every((_, idx) => isPillarComplete(idx));
  }, [pillars, isPillarComplete]);

  // Contar preguntas sin responder en un pilar
  const getUnansweredCount = useCallback((pillarIdx) => {
    const pillar = pillars[pillarIdx];
    return pillar.questions.filter(q => responses[q.id] === undefined).length;
  }, [pillars, responses]);

  // Contar TOTAL de preguntas sin responder
  const getTotalUnanswered = useCallback(() => {
    return pillars.reduce((total, pillar) => {
      return total + pillar.questions.filter(q => responses[q.id] === undefined).length;
    }, 0);
  }, [pillars, responses]);

  // Manejar respuesta a una pregunta
  const handleResponse = useCallback((questionId, value) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
    setValidationError('');
  }, []);

  // Navegar a un pilar específico
  const navigateToPillar = useCallback((idx) => {
    if (idx >= 0 && idx < totalPillars) {
      setCurrentPillarIdx(idx);
      setValidationError('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [totalPillars]);

  // Avanzar al siguiente pilar con validación
  const handleNextPillar = useCallback(() => {
    if (!isPillarComplete(currentPillarIdx)) {
      const unanswered = getUnansweredCount(currentPillarIdx);
      setValidationError(`Por favor responde todas las preguntas. Faltan ${unanswered} pregunta${unanswered > 1 ? 's' : ''} por responder.`);
      return false;
    }
    setValidationError('');
    setCurrentPillarIdx(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return true;
  }, [currentPillarIdx, isPillarComplete, getUnansweredCount]);

  // Retroceder al pilar anterior
  const handlePrevPillar = useCallback(() => {
    if (currentPillarIdx > 0) {
      setCurrentPillarIdx(prev => prev - 1);
      setValidationError('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPillarIdx]);

  // Guardar progreso actual
  const saveProgress = useCallback(() => {
    const dataToSave = {
      responses,
      clientInfo,
      currentPillarIdx,
      step,
      savedAt: new Date().toISOString()
    };
    setSavedProgress(dataToSave);
  }, [responses, clientInfo, currentPillarIdx, step, setSavedProgress]);

  // Restaurar progreso guardado
  const restoreProgress = useCallback(() => {
    if (savedProgress) {
      setResponses(savedProgress.responses || {});
      setClientInfo(savedProgress.clientInfo || { name: '', email: '', company: '', cloud_provider: 'GCP' });
      setCurrentPillarIdx(savedProgress.currentPillarIdx || 0);
      setStep(savedProgress.step || 'assessment');
    }
    setShowRecoveryModal(false);
  }, [savedProgress]);

  // Empezar de nuevo (limpiar todo)
  const startFresh = useCallback(() => {
    removeSavedProgress();
    setResponses({});
    setClientInfo({ name: '', email: '', company: '', cloud_provider: 'GCP' });
    setCurrentPillarIdx(0);
    setStep('welcome');
    setShowRecoveryModal(false);
    setValidationError('');
  }, [removeSavedProgress]);

  // Finalizar assessment con validación
  const handleFinish = useCallback(async () => {
    if (!isAssessmentComplete()) {
      const totalUnanswered = getTotalUnanswered();
      setValidationError(`No puedes finalizar. Hay ${totalUnanswered} pregunta${totalUnanswered > 1 ? 's' : ''} sin responder.`);
      return false;
    }

    setIsSubmitting(true);
    setValidationError('');

    try {
      // Aquí iría la llamada real a la API
      // await sendToAPI({ clientInfo, responses, scores });
      
      // Simulación de envío
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      removeSavedProgress();
      setStep('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return true;
    } catch (error) {
      setValidationError('Error al enviar los datos. Por favor intenta de nuevo.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [isAssessmentComplete, getTotalUnanswered, removeSavedProgress]);

  // Iniciar el assessment
  const startAssessment = useCallback(() => {
    setStep('assessment');
    saveProgress();
  }, [saveProgress]);

  // Verificar si hay progreso guardado
  const checkSavedProgress = useCallback(() => {
    if (savedProgress && savedProgress.responses && Object.keys(savedProgress.responses).length > 0) {
      setShowRecoveryModal(true);
      return true;
    }
    return false;
  }, [savedProgress]);

  return {
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
    setStep,
    setClientInfo,
    setShowRecoveryModal,
    
    // Funciones de validación
    isPillarComplete,
    isAssessmentComplete,
    getUnansweredCount,
    getTotalUnanswered,
    
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
    hasSavedProgress: !!savedProgress && Object.keys(savedProgress.responses || {}).length > 0,
  };
};

export default useAssessment;
