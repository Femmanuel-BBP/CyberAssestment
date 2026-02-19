import React from 'react';
import PropTypes from 'prop-types';
import { Shield, Users, Mail, Settings, ChevronRight } from 'lucide-react';
import { sanitize, isValidEmail } from '../utils/helpers';

/**
 * Pantalla de bienvenida con formulario de datos del cliente
 */
const Welcome = ({ clientInfo, setClientInfo, onStart }) => {
  const isFormValid = clientInfo.name && 
                      clientInfo.company && 
                      (!clientInfo.email || isValidEmail(clientInfo.email));

  const handleInputChange = (field, value) => {
    if (field === 'email') {
      // Email no se sanitiza igual para permitir @ y .
      setClientInfo({ ...clientInfo, [field]: value.trim().slice(0, 100) });
    } else if (field === 'cloud_provider') {
      setClientInfo({ ...clientInfo, [field]: value });
    } else {
      setClientInfo({ ...clientInfo, [field]: sanitize(value) });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-10 bg-white rounded-3xl shadow-2xl border border-blue-50 mt-10">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="p-5 bg-blue-700 rounded-2xl shadow-lg shadow-blue-200">
          <Shield className="w-12 h-12 text-white" />
        </div>
      </div>

      {/* Título */}
      <h1 className="text-4xl font-black text-center text-slate-900 mb-2">
        Neurallyz
      </h1>
      <p className="text-blue-600/60 text-center mb-2 font-bold text-sm tracking-widest uppercase">
        Cybersecurity Assessment
      </p>
      <p className="text-slate-500 text-center mb-10 text-lg">
        Diagnóstico profundo de postura basado en CSPR v3 y NIST CSF 2.0.
      </p>

      {/* Formulario */}
      <div className="space-y-4 mb-10">
        {/* Nombre */}
        <div className="relative">
          <Users className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Nombre completo del Responsable"
            className="w-full pl-12 pr-4 py-4 bg-blue-50/50 border border-blue-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
            value={clientInfo.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            maxLength={100}
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
          <input
            type="email"
            placeholder="Correo electrónico (opcional)"
            className={`w-full pl-12 pr-4 py-4 bg-blue-50/50 border rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all ${
              clientInfo.email && !isValidEmail(clientInfo.email) 
                ? 'border-rose-300' 
                : 'border-blue-100'
            }`}
            value={clientInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            maxLength={100}
          />
          {clientInfo.email && !isValidEmail(clientInfo.email) && (
            <p className="text-rose-500 text-xs mt-1 ml-2">
              Formato de email inválido
            </p>
          )}
        </div>

        {/* Empresa */}
        <div className="relative">
          <Settings className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Empresa / Organización"
            className="w-full pl-12 pr-4 py-4 bg-blue-50/50 border border-blue-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
            value={clientInfo.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            maxLength={100}
          />
        </div>

        {/* Proveedor Cloud */}
        <select
          className="w-full p-4 bg-blue-50/50 border border-blue-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none cursor-pointer"
          value={clientInfo.cloud_provider}
          onChange={(e) => handleInputChange('cloud_provider', e.target.value)}
        >
          <option value="GCP">Google Cloud Platform (GCP)</option>
          <option value="AWS">Amazon Web Services (AWS)</option>
          <option value="AZURE">Microsoft Azure</option>
          <option value="HYBRID">Híbrido / On-Premise</option>
        </select>
      </div>

      {/* Botón de inicio */}
      <button
        onClick={onStart}
        disabled={!isFormValid}
        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
      >
        COMENZAR DIAGNÓSTICO <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

Welcome.propTypes = {
  clientInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    company: PropTypes.string.isRequired,
    cloud_provider: PropTypes.oneOf(['GCP', 'AWS', 'AZURE', 'HYBRID']).isRequired,
  }).isRequired,
  setClientInfo: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
};

export default Welcome;
