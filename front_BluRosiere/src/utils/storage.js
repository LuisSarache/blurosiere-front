/**
 * Utilitários de armazenamento local
 * Funções seguras para manipular localStorage
 */

import { STORAGE_KEYS } from '../constants';

/**
 * Recupera dados do localStorage com tratamento de erro
 * @param {string} key - Chave do localStorage
 * @param {any} defaultValue - Valor padrão se não existir
 * @returns {any} Dados recuperados ou valor padrão
 */
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Erro ao recuperar ${key} do localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Salva dados no localStorage com tratamento de erro
 * @param {string} key - Chave do localStorage
 * @param {any} value - Valor a salvar
 * @returns {boolean} True se salvo com sucesso
 */
export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Erro ao salvar ${key} no localStorage:`, error);
    return false;
  }
};

/**
 * Remove item do localStorage
 * @param {string} key - Chave a remover
 * @returns {boolean} True se removido com sucesso
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Erro ao remover ${key} do localStorage:`, error);
    return false;
  }
};

/**
 * Limpa todo o localStorage
 * @returns {boolean} True se limpo com sucesso
 */
export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Erro ao limpar localStorage:', error);
    return false;
  }
};

/**
 * Recupera token de autenticação
 * @returns {string|null} Token ou null
 */
export const getAuthToken = () => {
  return getFromStorage(STORAGE_KEYS.TOKEN);
};

/**
 * Salva token de autenticação
 * @param {string} token - Token a salvar
 * @returns {boolean} True se salvo com sucesso
 */
export const saveAuthToken = (token) => {
  return saveToStorage(STORAGE_KEYS.TOKEN, token);
};

/**
 * Remove token de autenticação
 * @returns {boolean} True se removido com sucesso
 */
export const removeAuthToken = () => {
  return removeFromStorage(STORAGE_KEYS.TOKEN);
};

/**
 * Recupera dados do usuário
 * @returns {object|null} Dados do usuário ou null
 */
export const getUser = () => {
  return getFromStorage(STORAGE_KEYS.USER);
};

/**
 * Salva dados do usuário
 * @param {object} user - Dados do usuário
 * @returns {boolean} True se salvo com sucesso
 */
export const saveUser = (user) => {
  return saveToStorage(STORAGE_KEYS.USER, user);
};

/**
 * Remove dados do usuário
 * @returns {boolean} True se removido com sucesso
 */
export const removeUser = () => {
  return removeFromStorage(STORAGE_KEYS.USER);
};

/**
 * Verifica se há sessão ativa
 * @returns {boolean} True se há sessão
 */
export const hasActiveSession = () => {
  return !!getAuthToken() && !!getUser();
};

/**
 * Limpa dados de autenticação
 * @returns {boolean} True se limpo com sucesso
 */
export const clearAuthData = () => {
  const token = removeAuthToken();
  const user = removeUser();
  return token && user;
};
