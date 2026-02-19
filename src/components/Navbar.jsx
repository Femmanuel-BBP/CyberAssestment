import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Shield } from 'lucide-react';

/**
 * Detecta si la app está embebida en un iframe
 */
const isEmbedded = () => {
  try {
    // Detectar por parámetro URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('embedded') === 'true') return true;
    
    // Detectar si está en un iframe
    return window.self !== window.top;
  } catch (e) {
    // Si hay error de seguridad, probablemente está en iframe
    return true;
  }
};

/**
 * Navbar minimalista con branding de Neurallyz
 * Se oculta automáticamente cuando está embebido en un iframe
 */
const Navbar = ({ step, hasSavedProgress }) => {
  const [embedded, setEmbedded] = useState(false);

  useEffect(() => {
    setEmbedded(isEmbedded());
  }, []);

  // Si está embebido, no mostrar navbar (el sitio padre ya tiene uno)
  if (embedded) {
    return null;
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-blue-50 py-5 px-8 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div className="leading-none">
          <span className="text-lg font-black tracking-tighter text-slate-900 uppercase">
            NEURALLYZ
          </span>
          <p className="text-[10px] font-bold text-blue-400 tracking-[0.2em] uppercase">
            Cybersecurity Assessment
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {hasSavedProgress && step !== 'results' && (
          <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-600 font-bold">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            Guardado
          </div>
        )}
        <div className="hidden md:flex bg-slate-100 px-4 py-2 rounded-full text-[10px] font-black text-slate-500 tracking-widest uppercase">
          {step === 'results' ? 'Evaluación Completada' : 'Assessment en Curso'}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  step: PropTypes.oneOf(['welcome', 'assessment', 'results']).isRequired,
  hasSavedProgress: PropTypes.bool,
};

Navbar.defaultProps = {
  hasSavedProgress: false,
};

export default Navbar;
