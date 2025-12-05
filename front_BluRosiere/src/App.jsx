import { Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import ErrorBoundary from './components/ErrorBoundary';
import { PageLoader } from './components/LoadingSpinner';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Suspense fallback={<PageLoader message="Carregando aplicação..." />}>
          <AppRoutes />
        </Suspense>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
