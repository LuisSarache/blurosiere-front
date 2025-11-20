/**
 * Error Boundary - Captura erros em componentes filhos
 * Exibe interface de erro amigável ao usuário
 */

import { Component } from 'react';
import { AlertCircle } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Erro capturado por ErrorBoundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700 p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-16 h-16 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Algo deu errado
            </h1>
            <p className="text-gray-600 text-center mb-4">
              Desculpe, ocorreu um erro inesperado. Por favor, tente novamente.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <details className="mb-4 p-3 bg-gray-100 rounded text-sm">
                <summary className="cursor-pointer font-semibold text-gray-700">
                  Detalhes do erro
                </summary>
                <pre className="mt-2 text-xs text-red-600 overflow-auto">
                  {this.state.error?.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={this.resetError}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
