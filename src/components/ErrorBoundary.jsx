import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

/**
 * Error Boundary para capturar errores de React
 * Evita que un error rompa toda la aplicación
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    // Aquí podrías enviar el error a un servicio de logging
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    // Limpiar localStorage para evitar errores persistentes
    try {
      localStorage.removeItem('neurallyz_assessment_progress');
    } catch (e) {
      console.error('Error limpiando localStorage:', e);
    }
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-rose-100 rounded-2xl">
                <AlertTriangle className="w-12 h-12 text-rose-500" />
              </div>
            </div>
            
            <h1 className="text-2xl font-black text-slate-900 mb-2">
              ¡Ups! Algo salió mal
            </h1>
            
            <p className="text-slate-500 mb-6">
              Ha ocurrido un error inesperado. Puedes intentar recargar la página o reiniciar el assessment.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left bg-slate-100 rounded-xl p-4">
                <summary className="cursor-pointer text-sm font-bold text-slate-700">
                  Detalles del error (dev only)
                </summary>
                <pre className="mt-2 text-xs text-rose-600 overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            
            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                <RefreshCcw className="w-5 h-5" /> Reiniciar Aplicación
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 rounded-2xl transition-all"
              >
                Solo Recargar
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
