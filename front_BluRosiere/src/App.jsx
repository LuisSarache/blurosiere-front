/**
 * Componente principal da aplicação
 * Configura providers e estrutura global
 */

import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import ErrorBoundary from './components/ErrorBoundary';

/**
 * Componente App
 * Envolve toda a aplicação com providers necessários
 */
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
