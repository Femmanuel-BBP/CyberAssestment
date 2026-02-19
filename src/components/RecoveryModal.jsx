import React from 'react';
import { RefreshCcw, Check } from 'lucide-react';

/**
 * Modal para recuperar progreso guardado
 */
const RecoveryModal = ({ onRestore, onStartFresh }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-blue-100 rounded-2xl">
            <RefreshCcw className="w-8 h-8 text-blue-700" />
          </div>
        </div>
        
        <h3 className="text-2xl font-black text-center text-slate-900 mb-2">
          ¡Progreso Encontrado!
        </h3>
        
        <p className="text-slate-500 text-center mb-8">
          Tienes un assessment sin terminar. ¿Deseas continuar donde lo dejaste?
        </p>
        
        <div className="space-y-3">
          <button
            onClick={onRestore}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" /> Continuar Assessment
          </button>
          
          <button
            onClick={onStartFresh}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 rounded-2xl transition-all"
          >
            Empezar de Nuevo
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecoveryModal;
