/**
 * Hook customizado para autenticação
 * Encapsula lógica de autenticação reutilizável
 */

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Hook para acessar contexto de autenticação
 * @returns {object} Contexto de autenticação
 * @throws {Error} Se usado fora de AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

/**
 * Hook para verificar se usuário é psicólogo
 * @returns {boolean} True se é psicólogo
 */
export const useIsPsychologist = () => {
  const { user } = useAuth();
  return user?.type === 'psicologo';
};

/**
 * Hook para verificar se usuário é paciente
 * @returns {boolean} True se é paciente
 */
export const useIsPatient = () => {
  const { user } = useAuth();
  return user?.type === 'paciente';
};

/**
 * Hook para verificar se usuário está autenticado
 * @returns {boolean} True se autenticado
 */
export const useIsAuthenticated = () => {
  const { user } = useAuth();
  return !!user;
};

/**
 * Hook para obter ID do usuário
 * @returns {number|null} ID do usuário ou null
 */
export const useUserId = () => {
  const { user } = useAuth();
  return user?.id || null;
};

/**
 * Hook para obter nome do usuário
 * @returns {string|null} Nome do usuário ou null
 */
export const useUserName = () => {
  const { user } = useAuth();
  return user?.name || null;
};

/**
 * Hook para obter email do usuário
 * @returns {string|null} Email do usuário ou null
 */
export const useUserEmail = () => {
  const { user } = useAuth();
  return user?.email || null;
};
