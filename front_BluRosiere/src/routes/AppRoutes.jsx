/**
 * Configuração de rotas da aplicação
 * Define rotas públicas, protegidas e componentes de layout
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES, USER_TYPES } from '../constants';

// Componentes de layout
import { Sidebar } from '../components/Sidebar';
import { PublicNavbar } from '../components/PublicNavbar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Toaster } from 'react-hot-toast';

// Páginas públicas
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Contact } from '../pages/Contact';
import { NotFound } from '../pages/NotFound';

// Páginas protegidas
import { DashboardPsicologo } from '../pages/DashboardPsicologo';
import { DashboardPaciente } from '../pages/DashboardPaciente';
import { ChatIA } from '../pages/ChatIA';
import { Relatorios } from '../pages/Relatorios';
import { Agendamentos } from '../pages/Agendamentos';
import { Solicitacoes } from '../pages/Solicitacoes';
import { Pacientes } from '../pages/Pacientes';
import { PacienteDetalhes } from '../pages/PacienteDetalhes';
import { SessaoDetalhes } from '../pages/SessaoDetalhes';

/**
 * Componente de rota protegida
 * Verifica autenticação e redireciona se necessário
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner size="lg" />;
  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-8">
        {children}
      </main>
    </div>
  );
};

/**
 * Componente de rota pública
 * Redireciona usuários autenticados para dashboard
 */
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner size="lg" />;
  if (user) return <Navigate to={ROUTES.DASHBOARD} replace />;

  return (
    <div className="min-h-screen">
      <PublicNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

/**
 * Componente de dashboard condicional
 * Retorna dashboard específico baseado no tipo de usuário
 */
const Dashboard = () => {
  const { user } = useAuth();
  return user?.type === USER_TYPES.PSYCHOLOGIST ? 
    <DashboardPsicologo /> : 
    <DashboardPaciente />;
};

/**
 * Componente de rotas da aplicação
 * Define todas as rotas e seus componentes
 */
export const AppRoutes = () => {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Rotas Públicas */}
        <Route path={ROUTES.HOME} element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        } />

        <Route path={ROUTES.ABOUT} element={
          <PublicRoute>
            <About />
          </PublicRoute>
        } />

        <Route path={ROUTES.CONTACT} element={
          <PublicRoute>
            <Contact />
          </PublicRoute>
        } />

        <Route path={ROUTES.LOGIN} element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        <Route path={ROUTES.REGISTER} element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        {/* Rotas Protegidas */}
        <Route path={ROUTES.DASHBOARD} element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path={ROUTES.APPOINTMENTS} element={
          <ProtectedRoute>
            <Agendamentos />
          </ProtectedRoute>
        } />

        <Route path={ROUTES.CHAT_IA} element={
          <ProtectedRoute>
            <ChatIA />
          </ProtectedRoute>
        } />

        <Route path={ROUTES.REPORTS} element={
          <ProtectedRoute>
            <Relatorios />
          </ProtectedRoute>
        } />

        <Route path={ROUTES.REQUESTS} element={
          <ProtectedRoute>
            <Solicitacoes />
          </ProtectedRoute>
        } />

        <Route path={ROUTES.PATIENTS} element={
          <ProtectedRoute>
            <Pacientes />
          </ProtectedRoute>
        } />

        <Route path={ROUTES.PATIENT_DETAILS} element={
          <ProtectedRoute>
            <PacienteDetalhes />
          </ProtectedRoute>
        } />

        <Route path={ROUTES.SESSION_DETAILS} element={
          <ProtectedRoute>
            <SessaoDetalhes />
          </ProtectedRoute>
        } />

        {/* Rota 404 */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </Router>
  );
};
