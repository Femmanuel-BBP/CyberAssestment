/**
 * Sanitiza strings para prevenir XSS
 * @param {string} str - String a sanitizar
 * @returns {string} String sanitizado
 */
export const sanitize = (str) => {
  if (!str) return '';
  return str
    .replace(/<[^>]*>/g, '')     // Eliminar tags HTML
    .replace(/[<>"'&]/g, '')     // Eliminar caracteres peligrosos
    .trim()
    .slice(0, 100);              // Limitar longitud
};

/**
 * Valida formato de email (RFC 5322 simplificado)
 * @param {string} email - Email a validar
 * @returns {boolean} true si es válido o vacío
 */
export const isValidEmail = (email) => {
  if (!email) return true; // Email es opcional
  // Regex más robusto que valida:
  // - Caracteres permitidos en local part
  // - Al menos un punto en el dominio
  // - TLD de 2-10 caracteres
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,10})+$/;
  return emailRegex.test(email);
};

/**
 * Calcula los scores por pilar
 * @param {Object} responses - Respuestas del usuario
 * @param {Array} pillars - Array de pilares con preguntas
 * @returns {Object} Scores por pilar (0-100)
 */
export const calculateScores = (responses, pillars) => {
  const scores = {};
  pillars.forEach(pillar => {
    const pillarQuestions = pillar.questions;
    const answered = pillarQuestions.filter(q => responses[q.id]);
    
    if (answered.length === 0) {
      scores[pillar.id] = 0;
      return;
    }
    
    const sum = answered.reduce((acc, q) => acc + (responses[q.id] * q.weight), 0);
    const maxPossible = pillarQuestions.reduce((acc, q) => acc + (4 * q.weight), 0);
    scores[pillar.id] = (sum / maxPossible) * 100;
  });
  return scores;
};

/**
 * Obtiene el color según el valor del score
 * @param {number} val - Valor del score (0-100)
 * @returns {string} Clase de Tailwind para el color
 */
export const getScoreColor = (val) => {
  if (val < 40) return 'bg-rose-500';
  if (val < 70) return 'bg-amber-500';
  return 'bg-emerald-500';
};

/**
 * Obtiene el texto del nivel según el score
 * @param {number} val - Valor del score (0-100)
 * @returns {string} Descripción del nivel
 */
export const getScoreLevel = (val) => {
  if (val < 40) return "Riesgo Crítico";
  if (val < 70) return "Mejora Necesaria";
  return "Nivel Resiliente";
};

/**
 * Obtiene descripción del pilar según score
 * @param {number} score - Score del pilar (0-100)
 * @returns {string} Descripción
 */
export const getPillarDescription = (score) => {
  if (score < 40) return "Brechas críticas detectadas en infraestructura.";
  if (score < 70) return "Existen controles, pero falta automatización.";
  return "Proceso optimizado con estándares internacionales.";
};

/**
 * Formatea fecha para mostrar
 * @param {string} isoDate - Fecha en formato ISO
 * @returns {string} Fecha formateada
 */
export const formatDate = (isoDate) => {
  if (!isoDate) return '';
  return new Date(isoDate).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
