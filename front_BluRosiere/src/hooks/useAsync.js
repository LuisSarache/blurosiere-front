/**
 * Hook customizado para operações assíncronas
 * Gerencia estado de loading, erro e dados
 */

import { useState, useCallback, useEffect } from 'react';

/**
 * Hook para gerenciar operações assíncronas
 * @param {Function} asyncFunction - Função assíncrona a executar
 * @param {boolean} immediate - Se deve executar imediatamente
 * @returns {object} Estado e funções de controle
 */
export const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setStatus('pending');
    setData(null);
    setError(null);

    try {
      const response = await asyncFunction(...args);
      setData(response);
      setStatus('success');
      return response;
    } catch (err) {
      setError(err);
      setStatus('error');
      throw err;
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    execute,
    status,
    data,
    error,
    isLoading: status === 'pending',
    isError: status === 'error',
    isSuccess: status === 'success',
    isIdle: status === 'idle',
  };
};

/**
 * Hook para operações assíncronas com dependências
 * @param {Function} asyncFunction - Função assíncrona a executar
 * @param {Array} dependencies - Dependências para re-executar
 * @returns {object} Estado e funções de controle
 */
export const useAsyncEffect = (asyncFunction, dependencies = []) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const execute = async () => {
      setStatus('pending');
      setData(null);
      setError(null);

      try {
        const response = await asyncFunction();
        if (isMounted) {
          setData(response);
          setStatus('success');
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setStatus('error');
        }
      }
    };

    execute();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return {
    status,
    data,
    error,
    isLoading: status === 'pending',
    isError: status === 'error',
    isSuccess: status === 'success',
    isIdle: status === 'idle',
  };
};
