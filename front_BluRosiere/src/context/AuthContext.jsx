/**
 * Contexto de Autenticação
 * Gerencia estado global de autenticação e sessão do usuário
 */

import { createContext, useState, useEffect, useCallback } from 'react';
import { getAuthToken, saveAuthToken, removeAuthToken, getUser, saveUser, removeUser } from '../utils/storage';

export const AuthContext = createContext();

/**
 * Provider de autenticação
 * Fornece contexto de autenticação para toda a aplicação
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Inicializa autenticação ao montar
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = getAuthToken();
        const userData = getUser();

        if (token && userData && userData.email) {
          setUser(userData);
        } else {
          // Limpa dados inválidos
          removeAuthToken();
          removeUser();
          setUser(null);
        }
      } catch (err) {
        console.error('Erro ao inicializar autenticação:', err);
        setError(err.message);
        removeAuthToken();
        removeUser();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Realiza login do usuário
   * @param {object} userData - Dados do usuário
   * @param {string} token - Token de autenticação
   */
  const login = useCallback((userData, token) => {
    try {
      if (!userData || !userData.email) {
        throw new Error('Dados de usuário inválidos');
      }
      saveAuthToken(token);
      saveUser(userData);
      setUser(userData);
      setError(null);
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError(err.message);
      throw err;
    }
  }, []);

  /**
   * Realiza logout do usuário
   */
  const logout = useCallback(() => {
    try {
      removeAuthToken();
      removeUser();
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
      setError(err.message);
    }
  }, []);

  /**
   * Atualiza dados do usuário
   * @param {object} userData - Novos dados do usuário
   */
  const updateUser = useCallback((userData) => {
    try {
      if (!user) {
        throw new Error('Usuário não autenticado');
      }
      const updated = { ...user, ...userData };
      saveUser(updated);
      setUser(updated);
      setError(null);
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err);
      setError(err.message);
      throw err;
    }
  }, [user]);

  /**
   * Limpa erro
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    user: user || null,
    loading,
    error,
    login,
    logout,
    updateUser,
    clearError,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
