import React from 'react';
import { Shield, Target, FileSpreadsheet } from 'lucide-react';
import PillarIcon from './PillarIcon';
import { getScoreColor, getScoreLevel, getPillarDescription } from '../utils/helpers';

/**
 * Pantalla de resultados con mapa de calor
 */
const Results = ({ clientInfo, pillars, scores, averageScore }) => {
  return (
    <div className="max-w-6xl mx-auto p-6 mt-4 pb-24">
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100 relative overflow-hidden">
        {/* Header del Reporte */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
          <div className="space-y-2">
            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              Reporte Ejecutivo
            </span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              Postura de Ciberseguridad
            </h2>
            <p className="text-slate-500 text-lg">
              Análisis de madurez para{' '}
              <span className="text-blue-700 font-bold">{clientInfo.company}</span>
            </p>
          </div>

          {/* Score Global */}
          <div className="flex items-center gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <div
              className={`text-5xl font-black text-white w-24 h-24 flex items-center justify-center rounded-4xl shadow-lg ${getScoreColor(averageScore)}`}
            >
              {Math.round(averageScore)}%
            </div>
            <div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Score Global
              </div>
              <div className="text-xl font-black text-slate-800">
                {getScoreLevel(averageScore)}
              </div>
            </div>
          </div>
        </div>

        {/* Título Mapa de Calor */}
        <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
          <div className="w-1.5 h-8 bg-blue-700 rounded-full"></div>
          Mapa de Calor de Madurez (NIST CSF 2.0 & CSPR)
        </h3>

        {/* Grid de Pilares */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar) => {
            const score = scores[pillar.id] || 0;
            
            return (
              <div
                key={pillar.id}
                className="group bg-slate-50 hover:bg-white hover:shadow-xl rounded-3xl p-8 border border-slate-100 transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-700">
                    <PillarIcon iconName={pillar.icon} />
                  </div>
                  <div
                    className={`text-xs font-black px-3 py-1.5 rounded-full text-white ${getScoreColor(score)}`}
                  >
                    {Math.round(score)}%
                  </div>
                </div>

                <h4 className="font-black text-slate-800 mb-2">{pillar.name}</h4>

                {/* Visualizador de Calor */}
                <div className="flex items-center gap-1.5 h-12 mb-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
                    const threshold = i * 12.5;
                    const active = score >= threshold;
                    return (
                      <div
                        key={i}
                        className={`flex-1 rounded-md transition-all duration-700 ${
                          active ? getScoreColor(score) : 'bg-slate-200 opacity-20'
                        }`}
                        style={{ height: `${20 + i * 10}%` }}
                      ></div>
                    );
                  })}
                </div>

                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {getPillarDescription(score)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Sección de Recomendaciones */}
        <RecommendationsSection clientInfo={clientInfo} />
      </div>
    </div>
  );
};

/**
 * Sección de recomendaciones
 */
const RecommendationsSection = ({ clientInfo }) => {
  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 p-10 opacity-10">
        <Shield className="w-64 h-64" />
      </div>

      <div className="relative z-10">
        <h4 className="text-2xl font-black mb-8 flex items-center gap-3 text-emerald-400">
          <Target className="w-8 h-8" /> Recomendaciones de Neurallyz
        </h4>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <RecommendationItem
              number="01"
              title="Cierre de Brechas Críticas"
              description={`Implementar remediación automatizada en ${clientInfo.cloud_provider} para políticas de organización (Org Policies).`}
            />
            <RecommendationItem
              number="02"
              title="Gestión de Identidades"
              description="Reforzar el uso de llaves de seguridad físicas para cuentas con rol de Propietario o Super Admin."
            />
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
            <h5 className="font-bold mb-4 text-emerald-400 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5" /> Estado de Sincronización
            </h5>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Sus respuestas han sido mapeadas contra los controles CIS v8 e ISO
              27001 y guardadas en su tablero de control corporativo.
            </p>
            <button
              onClick={() => window.print()}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-black py-4 rounded-2xl transition-all"
            >
              Exportar Reporte Ejecutivo PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Item de recomendación individual
 */
const RecommendationItem = ({ number, title, description }) => {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
        <span className="text-emerald-400 font-black">{number}</span>
      </div>
      <p className="text-slate-300 text-sm">
        <strong className="text-white block mb-1">{title}:</strong>
        {description}
      </p>
    </div>
  );
};

export default Results;
